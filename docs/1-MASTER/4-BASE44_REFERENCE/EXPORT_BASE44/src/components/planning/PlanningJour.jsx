import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Truck, Plus, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import AssignmentFormDialog from "@/components/planning/AssignmentFormDialog";
import { useAuth } from "@/lib/AuthContext";
import { can } from "@/lib/userPermissions";
import { writeAuditLog } from "@/lib/auditLogger";
import { isoDate, dayLabel, shiftDay, isTodayDate, timeToFloat, badgeClass } from "@/lib/planningUtils";
import { getPlanningEligibleUsers } from "@/lib/planningEligibility";

const HOURS = Array.from({ length: 25 }, (_, i) => i);
const START_HOUR = 6;
const VISIBLE_HOURS = 18;
const ROW_LABEL_W = 140;

export default function PlanningJour() {
  const { user } = useAuth();
  const canEdit   = can(user, "PLANNING_EDIT");
  const canCancel = can(user, "PLANNING_CANCEL");
  const qc = useQueryClient();
  const [day, setDay] = useState(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const dayStr = isoDate(day);

  const { data: entries = [], isLoading } = useQuery({
    queryKey: ["planningEntries", "day", dayStr],
    queryFn: () => base44.entities.PlanningEntry.filter({ shift_date: dayStr }, "start_time", 500),
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
        resource: `Affectation : ${p.employee_name || "—"} le ${p.shift_date || dayStr}`,
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

  const activeEntries = useMemo(() => entries.filter((e) => e.publication_status !== "Annulé"), [entries]);
  const kpis = useMemo(() => ({
    teams: activeEntries.length,
    amb: activeEntries.filter((e) => e.type_badge === "AMB" || e.vehicle_type === "AMBULANCE").length,
    vsl: activeEntries.filter((e) => e.type_badge === "VSL").length,
    garde: activeEntries.filter((e) => (e.type_badge || "").startsWith("GARDE")).length,
  }), [activeEntries]);

  const toX = (h) => ((h - START_HOUR) / VISIBLE_HOURS) * 100;
  const toW = (d) => (d / VISIBLE_HOURS) * 100;
  const nowFloat = isTodayDate(day) ? new Date().getHours() + new Date().getMinutes() / 60 : null;

  const openEntry = (e) => { setEditing(e); setDialogOpen(true); };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setDay(shiftDay(day, -1))}><ChevronLeft size={14} /></Button>
          <div className="px-4 py-1.5 bg-card border border-border rounded-lg text-sm font-medium text-foreground capitalize min-w-[200px] text-center">
            {dayLabel(day)}
          </div>
          <Button variant="outline" size="sm" onClick={() => setDay(shiftDay(day, 1))}><ChevronRight size={14} /></Button>
          <Button variant="ghost" size="sm" onClick={() => setDay(new Date())}>Aujourd'hui</Button>
        </div>
        {canEdit && <Button size="sm" className="gap-1.5" onClick={() => { setEditing(null); setDialogOpen(true); }}><Plus size={13} />Créer une affectation</Button>}
      </div>

      {/* KPIs day */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Équipes actives", value: kpis.teams, color: "text-green-600" },
          { label: "Ambulances", value: kpis.amb, color: "text-primary" },
          { label: "VSL", value: kpis.vsl, color: "text-blue-600" },
          { label: "Gardes de nuit", value: kpis.garde, color: "text-purple-600" },
        ].map((k, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-3 text-center">
            <div className={`text-2xl font-bold ${k.color}`}>{k.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{k.label}</div>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="bg-card border border-border rounded-xl p-5 overflow-x-auto">
        <div className="min-w-[700px]">
          {/* Hours ruler */}
          <div className="relative h-8 mb-1" style={{ marginLeft: ROW_LABEL_W }}>
            {HOURS.slice(START_HOUR, START_HOUR + VISIBLE_HOURS + 1).map((h, i) => (
              <div key={h} className="absolute text-[10px] text-muted-foreground font-medium" style={{ left: `${(i / VISIBLE_HOURS) * 100}%`, transform: "translateX(-50%)" }}>
                {String(h).padStart(2, "0")}h
              </div>
            ))}
          </div>

          <div className="relative">
            {/* Grid lines */}
            <div className="absolute top-0 bottom-0 right-0" style={{ left: ROW_LABEL_W }}>
              {HOURS.slice(START_HOUR, START_HOUR + VISIBLE_HOURS + 1).map((h, i) => (
                <div key={h} className="absolute top-0 bottom-0 border-l border-border/40" style={{ left: `${(i / VISIBLE_HOURS) * 100}%` }} />
              ))}
              {nowFloat !== null && nowFloat >= START_HOUR && nowFloat <= START_HOUR + VISIBLE_HOURS && (
                <div className="absolute top-0 bottom-0 w-0.5 bg-red-400 z-10" style={{ left: `${toX(nowFloat)}%` }}>
                  <div className="w-2 h-2 rounded-full bg-red-400 -translate-x-[3px] -translate-y-1" />
                </div>
              )}
            </div>

            {/* Rows */}
            <div className="space-y-2 py-2 relative">
              {isLoading ? (
                <div className="py-12 text-center text-muted-foreground"><Loader2 className="animate-spin inline mr-2" size={18} />Chargement...</div>
              ) : activeEntries.length === 0 ? (
                <div className="py-12 text-center text-sm text-muted-foreground">Aucune affectation ce jour. Cliquez sur « Créer une affectation ».</div>
              ) : activeEntries.map((e) => {
                const s = timeToFloat(e.start_time);
                const end = timeToFloat(e.end_time);
                const hasTime = s !== null && end !== null && end > s;
                const left = hasTime ? Math.max(0, Math.min(100, toX(s))) : 0;
                const width = hasTime ? Math.max(4, Math.min(100 - left, toW(end - s))) : 100;
                return (
                  <div key={e.id} className="relative h-12">
                    <div className="absolute left-0 top-0 flex items-center gap-2 h-12" style={{ width: ROW_LABEL_W }}>
                      <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <span className="text-[9px] font-bold text-white">{e.employee_initials || "?"}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-foreground truncate">{(e.employee_name || "—").split(" ")[0]}</div>
                        <div className="text-[9px] text-muted-foreground truncate">{e.employee_role || ""}</div>
                      </div>
                    </div>
                    <div
                      onClick={() => canEdit && openEntry(e)}
                      className={`absolute top-0 h-12 rounded-lg flex items-center px-2 overflow-hidden ${canEdit ? "cursor-pointer hover:opacity-90" : "cursor-default"} transition-opacity ${badgeClass(e.type_badge)}`}
                      style={{ left: `calc(${ROW_LABEL_W}px + (100% - ${ROW_LABEL_W}px) * ${left / 100})`, width: `calc((100% - ${ROW_LABEL_W}px) * ${width / 100})` }}
                    >
                      <div className="min-w-0">
                        <div className="text-[10px] font-bold leading-tight truncate">
                          {e.type_badge}{hasTime ? ` · ${e.start_time}-${e.end_time}` : ""}
                        </div>
                        {e.vehicle_name && (
                          <div className="flex items-center gap-1 text-[9px] opacity-80">
                            <Truck size={8} /><span className="truncate">{e.vehicle_name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {canEdit && (
        <AssignmentFormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          entry={editing}
          defaultDate={dayStr}
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