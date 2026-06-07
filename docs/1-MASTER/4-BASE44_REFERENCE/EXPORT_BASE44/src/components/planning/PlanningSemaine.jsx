import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import AssignmentFormDialog from "@/components/planning/AssignmentFormDialog";
import WeekPublishBar from "@/components/planning/WeekPublishBar";
import { useAuth } from "@/lib/AuthContext";
import { can } from "@/lib/userPermissions";
import { writeAuditLog } from "@/lib/auditLogger";
import {
  weekDays, weekStart, weekEnd, weekLabel, shiftWeek, isoDate, dayHeaderLabel,
  isTodayDate, badgeClass, groupByEmployee, findEntry, coverageClass,
} from "@/lib/planningUtils";
import { getPlanningEligibleUsers } from "@/lib/planningEligibility";

export default function PlanningSemaine() {
  const { user } = useAuth();
  const canEdit    = can(user, "PLANNING_EDIT");
  const canPublish = can(user, "PLANNING_PUBLISH");
  const canCancel  = can(user, "PLANNING_CANCEL");
  const qc = useQueryClient();
  const [refDate, setRefDate] = useState(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [defaultDate, setDefaultDate] = useState("");

  const days = weekDays(refDate);
  const fromStr = isoDate(weekStart(refDate));
  const toStr = isoDate(weekEnd(refDate));

  const { data: entries = [], isLoading } = useQuery({
    queryKey: ["planningEntries", fromStr, toStr],
    queryFn: () => base44.entities.PlanningEntry.filter({ shift_date: { $gte: fromStr, $lte: toStr } }, "shift_date", 1000),
  });
  const { data: _employees = [] } = useQuery({ queryKey: ["planning-users"], queryFn: () => base44.entities.User.filter({ is_archived: false }, "full_name", 500) });
  const employees = getPlanningEligibleUsers(_employees);
  const { data: vehicles = [] } = useQuery({ queryKey: ["planning-vehicles"], queryFn: () => base44.entities.Vehicle.filter({ admin_status: "Actif", availability: "Disponible", is_archived: false }, "-created_date", 500) });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["planningEntries"] });
  const saveMutation = useMutation({
    mutationFn: (p) => (editing ? base44.entities.PlanningEntry.update(editing.id, p) : base44.entities.PlanningEntry.create(p)),
    onSuccess: (_, p) => {
      const isCreate = !editing;
      const wasPublished = editing?.publication_status === "Publié";
      writeAuditLog({
        action: isCreate ? "Création affectation" : wasPublished ? "Modification après publication" : "Modification affectation",
        actionType: isCreate ? "create" : "update",
        module: "Planning",
        resource: `Affectation : ${p.employee_name || "—"} le ${p.shift_date || "—"}`,
        details: isCreate ? "Nouvelle affectation créée" : wasPublished ? "Affectation modifiée après publication" : "Affectation modifiée",
        actor: user,
      });
      invalidate(); setDialogOpen(false); setEditing(null);
    },
  });
  const cancelMutation = useMutation({
    mutationFn: ({ e, reason }) => base44.entities.PlanningEntry.update(e.id, { publication_status: "Annulé", coverage_status: "Non affecté", cancellation_reason: reason || "Annulation manuelle" }),
    onSuccess: (_, { e, reason }) => {
      writeAuditLog({
        action: "Annulation affectation",
        actionType: "update",
        module: "Planning",
        resource: `Affectation : ${e.employee_name || "—"} le ${e.shift_date || "—"}`,
        details: reason || "Annulation manuelle",
        actor: user,
      });
      invalidate(); setDialogOpen(false); setEditing(null);
    },
  });
  const restoreMutation = useMutation({
    mutationFn: (e) => base44.entities.PlanningEntry.update(e.id, { publication_status: "Brouillon", cancellation_reason: "" }),
    onSuccess: (_, e) => {
      writeAuditLog({
        action: "Restauration affectation",
        actionType: "update",
        module: "Planning",
        resource: `Affectation : ${e.employee_name || "—"} le ${e.shift_date || "—"}`,
        details: "Affectation restaurée (brouillon)",
        actor: user,
      });
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
      writeAuditLog({
        action: "Publication planning semaine",
        actionType: "update",
        module: "Planning",
        resource: `Semaine : ${weekLabel(refDate)}`,
        details: `${count} affectation(s) publiée(s)`,
        actor: user,
      });
      invalidate();
    },
  });

  const openCell = (employeeId, dateStr) => {
    const existing = findEntry(entries, employeeId, dateStr);
    setEditing(existing || null);
    setDefaultDate(dateStr);
    if (existing) setEditing({ ...existing, employee_id: employeeId });
    else setEditing(null);
    setDialogOpen(true);
  };
  const openCreate = () => { setEditing(null); setDefaultDate(isoDate(days[0])); setDialogOpen(true); };

  const rows = groupByEmployee(entries);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setRefDate(shiftWeek(refDate, -1))}><ChevronLeft size={14} /></Button>
          <div className="px-4 py-1.5 bg-card border border-border rounded-lg text-sm font-medium text-foreground">{weekLabel(refDate)}</div>
          <Button variant="outline" size="sm" onClick={() => setRefDate(shiftWeek(refDate, 1))}><ChevronRight size={14} /></Button>
          <Button variant="ghost" size="sm" onClick={() => setRefDate(new Date())}>Aujourd'hui</Button>
        </div>
        {canEdit && <Button size="sm" className="gap-1.5" onClick={openCreate}><Plus size={13} />Créer une affectation</Button>}
      </div>

      {canPublish && <WeekPublishBar entries={entries} onPublish={() => publishMutation.mutate()} publishing={publishMutation.isPending} />}

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5 min-w-[180px]">Équipe</th>
                {days.map((d) => (
                  <th key={d} className={`text-center text-xs font-medium px-3 py-2.5 min-w-[110px] capitalize ${isTodayDate(d) ? "text-primary" : "text-muted-foreground"}`}>{dayHeaderLabel(d)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={8} className="py-16 text-center text-muted-foreground"><Loader2 className="animate-spin inline mr-2" size={18} />Chargement...</td></tr>
              ) : rows.length === 0 ? (
                <tr><td colSpan={8} className="py-16 text-center text-sm text-muted-foreground">Aucune affectation cette semaine. Cliquez sur « Créer une affectation ».</td></tr>
              ) : rows.map((emp) => (
                <tr key={emp.employee_id || emp.name} className="border-b border-border last:border-0 hover:bg-muted/10">
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <span className="text-[9px] font-bold text-white">{emp.initials || "?"}</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground leading-tight">{emp.name || "—"}</div>
                        <div className="text-[10px] text-muted-foreground">{emp.role || ""}</div>
                      </div>
                    </div>
                  </td>
                  {days.map((d) => {
                    const dateStr = isoDate(d);
                    const e = findEntry(entries, emp.employee_id, dateStr);
                    return (
                      <td key={dateStr} className={`px-3 py-2.5 ${canEdit ? "cursor-pointer" : "cursor-default"} ${isTodayDate(d) ? "bg-blue-50/30" : ""}`} onClick={() => canEdit && openCell(emp.employee_id, dateStr)}>
                        {e ? (
                          <div className="flex flex-col items-center gap-1">
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${badgeClass(e.type_badge)} ${e.publication_status === "Annulé" ? "line-through opacity-50" : ""}`}>{e.type_badge}</span>
                            {e.start_time && <span className="text-[9px] text-muted-foreground">{e.start_time}{e.end_time ? `-${e.end_time}` : ""}</span>}
                            {e.coverage_status && e.publication_status !== "Annulé" && <span className={`text-[8px] px-1 py-0.5 rounded ${coverageClass(e.coverage_status)}`}>{e.coverage_status}</span>}
                          </div>
                        ) : (
                          <div className="flex justify-center"><span className="text-muted-foreground/30 text-xs">+</span></div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {canEdit && (
        <AssignmentFormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          entry={editing}
          defaultDate={defaultDate}
          employees={employees}
          vehicles={vehicles}
          onSave={(p) => saveMutation.mutate(p)}
          onCancelEntry={canCancel ? (e, reason) => cancelMutation.mutate({ e, reason }) : undefined}
          onRestoreEntry={canCancel ? (e) => restoreMutation.mutate(e) : undefined}
          saving={saveMutation.isPending || cancelMutation.isPending || restoreMutation.isPending}
        />
      )}
    </div>
  );
}