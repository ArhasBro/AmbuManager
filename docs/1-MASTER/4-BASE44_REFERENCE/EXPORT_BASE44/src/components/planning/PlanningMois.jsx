import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AssignmentFormDialog from "@/components/planning/AssignmentFormDialog";
import { useAuth } from "@/lib/AuthContext";
import { can } from "@/lib/userPermissions";
import { writeAuditLog } from "@/lib/auditLogger";
import {
  monthLabel, monthGrid, isoDate, isSameMonth, isTodayDate, getISOWeek,
  startOfMonth, endOfMonth, badgeClass, BADGE_STYLE,
} from "@/lib/planningUtils";
import { getPlanningEligibleUsers } from "@/lib/planningEligibility";
import { addMonths } from "date-fns";

const DAY_HEADERS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const GRID = "grid grid-cols-[60px_1fr_1fr_1fr_1fr_1fr_1fr_1fr]";

export default function PlanningMois() {
  const { user } = useAuth();
  const canEdit   = can(user, "PLANNING_EDIT");
  const canCancel = can(user, "PLANNING_CANCEL");
  const qc = useQueryClient();
  const [month, setMonth] = useState(new Date());
  const [employeeId, setEmployeeId] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [defaultDate, setDefaultDate] = useState("");

  const grid = useMemo(() => monthGrid(month), [month]);
  const fromStr = isoDate(startOfMonth(month));
  const toStr = isoDate(endOfMonth(month));

  const { data: _employees = [] } = useQuery({ queryKey: ["planning-users"], queryFn: () => base44.entities.User.filter({ is_archived: false }, "full_name", 500) });
  const employees = getPlanningEligibleUsers(_employees);
  const { data: vehicles = [] } = useQuery({ queryKey: ["planning-vehicles"], queryFn: () => base44.entities.Vehicle.filter({ admin_status: "Actif", availability: "Disponible", is_archived: false }, "-created_date", 500) });

  const effectiveEmployee = employeeId || (employees[0]?.id ?? "");
  const { data: entries = [], isLoading } = useQuery({
    queryKey: ["planningEntries", "month", fromStr, toStr, effectiveEmployee],
    queryFn: () => base44.entities.PlanningEntry.filter({ employee_id: effectiveEmployee, shift_date: { $gte: fromStr, $lte: toStr } }, "shift_date", 500),
    enabled: !!effectiveEmployee,
  });

  const entryByDate = useMemo(() => {
    const m = {};
    entries.forEach((e) => { if (!m[e.shift_date]) m[e.shift_date] = e; });
    return m;
  }, [entries]);

  const invalidate = () => qc.invalidateQueries({ queryKey: ["planningEntries"] });
  const emp = employees.find((e) => e.id === effectiveEmployee);
  const saveMutation = useMutation({
    mutationFn: (p) => (editing ? base44.entities.PlanningEntry.update(editing.id, p) : base44.entities.PlanningEntry.create(p)),
    onSuccess: (_, p) => {
      const isCreate = !editing;
      const wasPublished = editing?.publication_status === "Publié";
      writeAuditLog({
        action: isCreate ? "Création affectation" : wasPublished ? "Modification après publication" : "Modification affectation",
        actionType: isCreate ? "create" : "update",
        module: "Planning",
        resource: `Affectation : ${p.employee_name || emp?.full_name || "—"} le ${p.shift_date || "—"}`,
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

  const openDay = (date) => {
    const ds = isoDate(date);
    const existing = entryByDate[ds];
    setEditing(existing || null);
    setDefaultDate(ds);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setMonth(addMonths(month, -1))}><ChevronLeft size={14} /></Button>
          <div className="px-4 py-1.5 bg-card border border-border rounded-lg text-sm font-medium text-foreground min-w-[140px] text-center capitalize">{monthLabel(month)}</div>
          <Button variant="outline" size="sm" onClick={() => setMonth(addMonths(month, 1))}><ChevronRight size={14} /></Button>
          <Button variant="ghost" size="sm" onClick={() => setMonth(new Date())}>Aujourd'hui</Button>
        </div>
        <Select value={effectiveEmployee} onValueChange={setEmployeeId}>
          <SelectTrigger className="h-8 text-xs w-auto min-w-[180px]"><SelectValue placeholder="Utilisateur" /></SelectTrigger>
          <SelectContent>{employees.map((e) => <SelectItem key={e.id} value={e.id} className="text-xs">{e.full_name} · {e.business_role || ""}</SelectItem>)}</SelectContent>
        </Select>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden relative">
        {isLoading && <div className="absolute inset-0 bg-card/60 flex items-center justify-center z-10"><Loader2 className="animate-spin text-muted-foreground" size={20} /></div>}
        <div className={`${GRID} border-b border-border bg-muted/30`}>
          <div className="px-3 py-2.5 text-xs font-medium text-muted-foreground">Sem.</div>
          {DAY_HEADERS.map((d) => <div key={d} className="px-3 py-2.5 text-xs font-medium text-muted-foreground text-center">{d}</div>)}
        </div>
        {grid.map((week, wi) => (
          <div key={wi} className={`${GRID} border-b border-border last:border-0`}>
            <div className="px-3 py-3 text-xs font-medium text-muted-foreground border-r border-border flex items-center">S{getISOWeek(week[0])}</div>
            {week.map((date, di) => {
              const inMonth = isSameMonth(date, month);
              const today = isTodayDate(date);
              const entry = entryByDate[isoDate(date)];
              return (
                <div
                  key={di}
                  onClick={() => inMonth && canEdit && openDay(date)}
                  className={`px-2 py-3 border-r border-border last:border-0 min-h-[64px] ${today ? "bg-blue-50/50" : ""} ${!inMonth ? "bg-muted/10" : canEdit ? "cursor-pointer hover:bg-muted/20" : "cursor-default"}`}
                >
                  {inMonth && (
                    <div className="flex flex-col items-center gap-1">
                      <span className={`text-xs font-semibold ${today ? "text-primary" : "text-foreground"}`}>{date.getDate()}</span>
                      {entry && <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap ${badgeClass(entry.type_badge)} ${entry.publication_status === "Annulé" ? "line-through opacity-50" : ""}`}>{entry.type_badge}</span>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
        {Object.keys(BADGE_STYLE).filter((k) => !["AMBULANCE", "GARDE NUIT"].includes(k)).map((k) => (
          <span key={k} className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${badgeClass(k)}`}>{k}</span>
        ))}
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