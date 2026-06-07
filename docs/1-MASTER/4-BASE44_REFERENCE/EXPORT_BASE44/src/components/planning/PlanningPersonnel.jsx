import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Clock, MapPin, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AssignmentFormDialog from "@/components/planning/AssignmentFormDialog";
import WeekPublishBar from "@/components/planning/WeekPublishBar";
import {
  weekDays, weekStart, weekEnd, weekLabel, isoDate, shiftWeek, dayHeaderLabel,
  isTodayDate, badgeClass, timeToFloat, publicationClass,
} from "@/lib/planningUtils";
import { getPlanningEligibleUsers } from "@/lib/planningEligibility";
import { can } from "@/lib/userPermissions";
import { useAuth } from "@/lib/AuthContext";
import { writeAuditLog } from "@/lib/auditLogger";

const WORK_TYPES = ["AMB", "VSL", "TAXI", "TPMR", "GARDE"];

export default function PlanningPersonnel() {
  const { user } = useAuth();
  const canEdit    = can(user, "PLANNING_EDIT");
  const canPublish = can(user, "PLANNING_PUBLISH");
  const canCancel  = can(user, "PLANNING_CANCEL");
  const qc = useQueryClient();
  const [refDate, setRefDate] = useState(new Date());
  const [employeeId, setEmployeeId] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [defaultDate, setDefaultDate] = useState("");

  const days = useMemo(() => weekDays(refDate), [refDate]);
  const fromStr = isoDate(weekStart(refDate));
  const toStr = isoDate(weekEnd(refDate));

  const { data: _employees = [] } = useQuery({ queryKey: ["planning-users"], queryFn: () => base44.entities.User.filter({ is_archived: false }, "full_name", 500) });
  const employees = getPlanningEligibleUsers(_employees);
  const { data: vehicles = [] } = useQuery({ queryKey: ["planning-vehicles"], queryFn: () => base44.entities.Vehicle.filter({ admin_status: "Actif", availability: "Disponible", is_archived: false }, "-created_date", 500) });

  const effectiveEmployee = employeeId || (employees[0]?.id ?? "");
  const emp = employees.find((e) => e.id === effectiveEmployee);

  const { data: entries = [], isLoading } = useQuery({
    queryKey: ["planningEntries", "personnel", fromStr, toStr, effectiveEmployee],
    queryFn: () => base44.entities.PlanningEntry.filter({ employee_id: effectiveEmployee, shift_date: { $gte: fromStr, $lte: toStr } }, "shift_date", 500),
    enabled: !!effectiveEmployee,
  });

  const entryByDate = useMemo(() => {
    const m = {};
    entries.forEach((e) => { if (!m[e.shift_date]) m[e.shift_date] = e; });
    return m;
  }, [entries]);

  const summary = useMemo(() => {
    let worked = 0, rest = 0, hours = 0;
    entries.forEach((e) => {
      if (WORK_TYPES.includes(e.type_badge)) {
        worked += 1;
        const s = timeToFloat(e.start_time), end = timeToFloat(e.end_time);
        if (s !== null && end !== null && end > s) hours += end - s;
      } else if (e.type_badge === "REPOS") rest += 1;
    });
    return { worked, rest, hours: Math.round(hours * 10) / 10 };
  }, [entries]);

  const invalidate = () => qc.invalidateQueries({ queryKey: ["planningEntries"] });
  const saveMutation = useMutation({
    mutationFn: (p) => (editing ? base44.entities.PlanningEntry.update(editing.id, p) : base44.entities.PlanningEntry.create(p)),
    onSuccess: (_, p) => {
      const isEdit = !!editing;
      const empName = p.employee_name || emp?.full_name || "?";
      const prevStatus = editing?.publication_status;
      const afterStatus = p.publication_status;
      if (isEdit && prevStatus === "Publié" && afterStatus === "Modifié après publication") {
        writeAuditLog({ action: "Modification après publication", actionType: "update", module: "Planning", resource: `Agent : ${empName} · ${p.shift_date}`, details: `Type : ${p.type_badge}`, actor: user });
      } else {
        writeAuditLog({ action: isEdit ? "Modification affectation planning" : "Création affectation planning", actionType: isEdit ? "update" : "create", module: "Planning", resource: `Agent : ${empName} · ${p.shift_date}`, details: `Type : ${p.type_badge}`, actor: user });
      }
      invalidate(); setDialogOpen(false); setEditing(null);
    },
  });
  const cancelMutation = useMutation({
    mutationFn: ({ e, reason }) => base44.entities.PlanningEntry.update(e.id, { publication_status: "Annulé", coverage_status: "Non affecté", cancellation_reason: reason || "Annulation manuelle" }),
    onSuccess: (_, vars) => {
      writeAuditLog({ action: "Annulation affectation planning", actionType: "update", module: "Planning", resource: `Agent : ${vars.e.employee_name} · ${vars.e.shift_date}`, details: vars.reason || "Annulation manuelle", actor: user });
      invalidate(); setDialogOpen(false); setEditing(null);
    },
  });
  const restoreMutation = useMutation({
    mutationFn: (e) => base44.entities.PlanningEntry.update(e.id, { publication_status: "Brouillon", cancellation_reason: "" }),
    onSuccess: (_, e) => {
      writeAuditLog({ action: "Restauration affectation planning", actionType: "update", module: "Planning", resource: `Agent : ${e.employee_name} · ${e.shift_date}`, actor: user });
      invalidate(); setDialogOpen(false); setEditing(null);
    },
  });
  const publishMutation = useMutation({
    mutationFn: async () => {
      const toPublish = entries.filter((e) => e.publication_status === "Brouillon" || e.publication_status === "Modifié après publication");
      await Promise.all(toPublish.map((e) => base44.entities.PlanningEntry.update(e.id, { publication_status: "Publié" })));
      return toPublish.length;
    },
    onSuccess: (count) => {
      writeAuditLog({ action: "Publication planning semaine", actionType: "update", module: "Planning", resource: `Semaine : ${weekLabel(refDate)}`, details: `${count} affectation(s) publiée(s)`, actor: user });
      invalidate();
    },
  });

  const openDay = (date) => {
    const ds = isoDate(date);
    setEditing(entryByDate[ds] || null);
    setDefaultDate(ds);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setRefDate(shiftWeek(refDate, -1))}><ChevronLeft size={14} /></Button>
          <div className="px-4 py-1.5 bg-card border border-border rounded-lg text-sm font-medium text-foreground">{weekLabel(refDate)}</div>
          <Button variant="outline" size="sm" onClick={() => setRefDate(shiftWeek(refDate, 1))}><ChevronRight size={14} /></Button>
          <Button variant="ghost" size="sm" onClick={() => setRefDate(new Date())}>Aujourd'hui</Button>
        </div>
        <Select value={effectiveEmployee} onValueChange={setEmployeeId}>
          <SelectTrigger className="h-8 text-xs w-auto min-w-[180px]"><SelectValue placeholder="Utilisateur" /></SelectTrigger>
          <SelectContent>{employees.map((e) => <SelectItem key={e.id} value={e.id} className="text-xs">{e.full_name} · {e.business_role || ""}</SelectItem>)}</SelectContent>
        </Select>
      </div>

      {canPublish && <WeekPublishBar entries={entries} onPublish={() => publishMutation.mutate()} publishing={publishMutation.isPending} />}

      {/* Weekly grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 relative">
        {isLoading && <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10"><Loader2 className="animate-spin text-muted-foreground" size={20} /></div>}
        {days.map((date) => {
          const ds = isoDate(date);
          const shift = entryByDate[ds];
          const today = isTodayDate(date);
          return (
            <div
              key={ds}
              onClick={() => canEdit && openDay(date)}
              className={`bg-card border rounded-xl p-3 space-y-2.5 transition-shadow min-h-[120px] ${today ? "border-primary shadow-sm" : "border-border"} ${canEdit ? "cursor-pointer hover:shadow-sm" : "cursor-default"}`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold capitalize ${today ? "text-primary" : "text-muted-foreground"}`}>{dayHeaderLabel(date)}</span>
                {today && <span className="text-[9px] bg-primary text-primary-foreground rounded px-1.5 py-0.5">Auj.</span>}
              </div>
              {shift ? (
                <>
                  <div className={`text-xs font-bold px-2 py-0.5 rounded w-fit ${badgeClass(shift.type_badge)} ${shift.publication_status === "Annulé" ? "line-through opacity-50" : ""}`}>{shift.type_badge}</div>
                  {shift.publication_status && <div className={`text-[9px] px-1.5 py-0.5 rounded w-fit ${publicationClass(shift.publication_status)}`}>{shift.publication_status}</div>}
                  {shift.start_time && shift.end_time && (
                    <div className="flex items-center gap-1 text-xs text-foreground">
                      <Clock size={11} className="text-muted-foreground" />{shift.start_time} – {shift.end_time}
                    </div>
                  )}
                  {shift.vehicle_name && <div className="text-[10px] text-muted-foreground font-mono truncate">{shift.vehicle_name}</div>}
                  {shift.depot_name && <div className="flex items-center gap-1 text-[10px] text-muted-foreground"><MapPin size={10} />{shift.depot_name}</div>}
                  {shift.type_badge === "REPOS" && <div className="text-xs text-muted-foreground italic">Jour de repos</div>}
                </>
              ) : (
                <div className="text-[10px] text-muted-foreground/40">+ Ajouter</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="text-sm font-semibold text-foreground mb-3">Récapitulatif de la semaine</div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Jours travaillés", value: summary.worked, color: "text-green-600" },
            { label: "Heures totales", value: `${summary.hours}h`, color: "text-primary" },
            { label: "Jours de repos", value: summary.rest, color: "text-gray-500" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {canEdit && (
        <AssignmentFormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          entry={editing}
          defaultDate={defaultDate}
          defaultEmployeeId={effectiveEmployee}
          lockEmployee
          employees={employees}
          vehicles={vehicles}
          onSave={(p) => saveMutation.mutate(editing ? p : { ...p, employee_id: effectiveEmployee, employee_name: emp?.full_name, employee_initials: emp?.initials, employee_role: emp?.business_role || "" })}
          onCancelEntry={canCancel ? (e, reason) => cancelMutation.mutate({ e, reason }) : undefined}
          onRestoreEntry={canCancel ? (e) => restoreMutation.mutate(e) : undefined}
          saving={saveMutation.isPending || cancelMutation.isPending || restoreMutation.isPending}
        />
      )}
    </div>
  );
}