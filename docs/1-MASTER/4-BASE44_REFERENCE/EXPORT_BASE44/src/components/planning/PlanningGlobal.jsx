import React, { useState, useMemo } from "react";
import { Plus, ChevronLeft, ChevronRight, RefreshCw, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AssignmentFormDialog from "@/components/planning/AssignmentFormDialog";
import {
  weekRange, weekStart, isoDate, shiftWeek, badgeClass, getYear,
} from "@/lib/planningUtils";
import { getPlanningEligibleUsers } from "@/lib/planningEligibility";
import { can } from "@/lib/userPermissions";
import { useAuth } from "@/lib/AuthContext";
import { writeAuditLog } from "@/lib/auditLogger";

const VISIBLE_WEEKS = 7;

export default function PlanningGlobal() {
  const { user } = useAuth();
  const canEdit   = can(user, "PLANNING_EDIT");
  const canCancel = can(user, "PLANNING_CANCEL");
  const qc = useQueryClient();
  const [refDate, setRefDate] = useState(new Date());
  const [filterEmployee, setFilterEmployee] = useState("Tous");
  const [filterRole, setFilterRole] = useState("Tous");
  const [filterDepot, setFilterDepot] = useState("Tous");
  const [filterType, setFilterType] = useState("Tous");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [cellCtx, setCellCtx] = useState(null);

  const weeks = useMemo(() => weekRange(refDate, VISIBLE_WEEKS), [refDate]);
  const year = getYear(refDate);
  const fromStr = isoDate(weeks[0].start);
  const toStr = isoDate(shiftWeek(weeks[weeks.length - 1].start, 1));

  const { data: entries = [], isLoading } = useQuery({
    queryKey: ["planningEntries", "global", fromStr, toStr],
    queryFn: () => base44.entities.PlanningEntry.filter({ shift_date: { $gte: fromStr, $lt: toStr } }, "shift_date", 2000),
  });
  const { data: _employees = [] } = useQuery({ queryKey: ["planning-users"], queryFn: () => base44.entities.User.filter({ is_archived: false }, "full_name", 500) });
  const employees = getPlanningEligibleUsers(_employees);
  const { data: vehicles = [] } = useQuery({ queryKey: ["planning-vehicles"], queryFn: () => base44.entities.Vehicle.filter({ admin_status: "Actif", availability: "Disponible", is_archived: false }, "-created_date", 500) });
  const { data: depots = [] } = useQuery({ queryKey: ["depots"], queryFn: () => base44.entities.Depot.list("name", 200) });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["planningEntries"] });
  const saveMutation = useMutation({
    mutationFn: (p) => (editing ? base44.entities.PlanningEntry.update(editing.id, p) : base44.entities.PlanningEntry.create(p)),
    onSuccess: (_, p) => {
      const isEdit = !!editing;
      const empName = p.employee_name || cellCtx?.emp?.full_name || "?";
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

  // Apply filters
  const filtered = entries.filter((e) => {
    if (filterEmployee !== "Tous" && e.employee_id !== filterEmployee) return false;
    if (filterRole !== "Tous" && (e.employee_role || "") !== filterRole) return false;
    if (filterDepot !== "Tous" && (e.depot_name || "") !== filterDepot) return false;
    if (filterType !== "Tous" && (e.type_badge || "") !== filterType) return false;
    return true;
  });

  // Representative badge per employee/week (first match)
  const cellFor = (employeeId, weekNumber) =>
    filtered.find((e) => e.employee_id === employeeId && e.week_number === weekNumber && e.year === year);

  // Rows: employees that have at least one entry in range, or all if no filter narrows
  const rows = employees.filter((emp) => {
    if (filterEmployee !== "Tous") return emp.id === filterEmployee;
    if (filterRole !== "Tous") return emp.business_role === filterRole;
    if (filterDepot !== "Tous") return emp.depot_name === filterDepot;
    return true;
  });

  const openCell = (emp, week) => {
    const existing = cellFor(emp.id, week.weekNumber);
    setCellCtx({ emp, week });
    setEditing(existing || null);
    setDialogOpen(true);
  };

  const resetFilters = () => { setFilterEmployee("Tous"); setFilterRole("Tous"); setFilterDepot("Tous"); setFilterType("Tous"); };

  const roleOpts = ["Tous", ...Array.from(new Set(employees.map((e) => e.business_role).filter(Boolean)))];
  const typeOpts = ["Tous", "AMB", "VSL", "TAXI", "TPMR", "GARDE", "REPOS", "ABSENT", "À AFFECTER"];

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setRefDate(shiftWeek(refDate, -VISIBLE_WEEKS))}><ChevronLeft size={14} /></Button>
          <div className="px-3 py-1.5 bg-card border border-border rounded-lg text-sm font-medium text-foreground">
            {weeks[0].label} – {weeks[weeks.length - 1].label} · {year}
          </div>
          <Button variant="outline" size="sm" onClick={() => setRefDate(shiftWeek(refDate, VISIBLE_WEEKS))}><ChevronRight size={14} /></Button>
          <Button variant="ghost" size="sm" onClick={() => setRefDate(new Date())}>Aujourd'hui</Button>
        </div>
        {canEdit && <Button size="sm" className="gap-1.5" onClick={() => { setCellCtx(null); setEditing(null); setDialogOpen(true); }}><Plus size={13} />Créer une affectation</Button>}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <Select value={filterEmployee} onValueChange={setFilterEmployee}>
          <SelectTrigger className="h-8 text-xs w-auto min-w-[120px]"><SelectValue placeholder="Utilisateur" /></SelectTrigger>
          <SelectContent><SelectItem value="Tous" className="text-xs">Tous les utilisateurs</SelectItem>{employees.map((e) => <SelectItem key={e.id} value={e.id} className="text-xs">{e.full_name}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="h-8 text-xs w-auto min-w-[100px]"><SelectValue placeholder="Rôle" /></SelectTrigger>
          <SelectContent>{roleOpts.map((o) => <SelectItem key={o} value={o} className="text-xs">{o === "Tous" ? "Tous rôles" : o}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={filterDepot} onValueChange={setFilterDepot}>
          <SelectTrigger className="h-8 text-xs w-auto min-w-[110px]"><SelectValue placeholder="Dépôt" /></SelectTrigger>
          <SelectContent><SelectItem value="Tous" className="text-xs">Tous dépôts</SelectItem>{depots.map((d) => <SelectItem key={d.id} value={d.name} className="text-xs">{d.name}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="h-8 text-xs w-auto min-w-[90px]"><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent>{typeOpts.map((o) => <SelectItem key={o} value={o} className="text-xs">{o === "Tous" ? "Tous types" : o}</SelectItem>)}</SelectContent>
        </Select>
        <Button variant="ghost" size="sm" className="gap-1 h-8 text-xs text-muted-foreground" onClick={resetFilters}><RefreshCw size={12} />Réinitialiser</Button>
      </div>

      {/* Grid */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-4 py-2.5 border-b border-border">
          <span className="text-sm font-semibold text-foreground">Planning annuel {year}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5 min-w-[200px]">Utilisateur</th>
                {weeks.map((w) => <th key={w.key} className="text-center text-xs font-medium text-muted-foreground px-3 py-2.5 min-w-[80px]">{w.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={VISIBLE_WEEKS + 1} className="py-16 text-center text-muted-foreground"><Loader2 className="animate-spin inline mr-2" size={18} />Chargement...</td></tr>
              ) : rows.length === 0 ? (
                <tr><td colSpan={VISIBLE_WEEKS + 1} className="py-16 text-center text-sm text-muted-foreground">Aucun utilisateur. Ajoutez des utilisateurs puis créez des affectations.</td></tr>
              ) : rows.map((emp) => (
                <tr key={emp.id} className="border-b border-border last:border-0 hover:bg-muted/10">
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <span className="text-[9px] font-bold text-white">{emp.initials || "?"}</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground leading-tight">{emp.full_name}</div>
                        <div className="text-[10px] text-muted-foreground">{emp.business_role || ""}{emp.depot_name ? ` · ${emp.depot_name}` : ""}</div>
                      </div>
                    </div>
                  </td>
                  {weeks.map((w) => {
                    const cell = cellFor(emp.id, w.weekNumber);
                    return (
                      <td key={w.key} className={`px-3 py-2.5 text-center ${canEdit ? "cursor-pointer" : "cursor-default"}`} onClick={() => canEdit && openCell(emp, w)}>
                        {cell ? (
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded whitespace-nowrap ${badgeClass(cell.type_badge)} ${cell.publication_status === "Annulé" ? "line-through opacity-50" : ""}`}>{cell.type_badge}</span>
                        ) : (
                          <span className="text-muted-foreground/30 text-xs">+</span>
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
          defaultDate={cellCtx ? isoDate(weekStart(cellCtx.week.start)) : ""}
          defaultEmployeeId={cellCtx ? cellCtx.emp.id : ""}
          employees={employees}
          vehicles={vehicles}
          lockEmployee={!!cellCtx}
          weekContext={cellCtx ? `${cellCtx.week.label} · ${year}` : null}
          onSave={(p) => saveMutation.mutate(cellCtx && !editing ? { ...p, employee_id: cellCtx.emp.id, employee_name: cellCtx.emp.full_name, employee_initials: cellCtx.emp.initials, employee_role: cellCtx.emp.business_role || "" } : p)}
          onCancelEntry={canCancel ? (e, reason) => cancelMutation.mutate({ e, reason }) : undefined}
          onRestoreEntry={canCancel ? (e) => restoreMutation.mutate(e) : undefined}
          saving={saveMutation.isPending || cancelMutation.isPending || restoreMutation.isPending}
        />
      )}
    </div>
  );
}