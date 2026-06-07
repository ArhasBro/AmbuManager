import React from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { publicationClass } from "@/lib/planningUtils";

// Barre de publication par semaine + récapitulatif des statuts de publication.
// active=affectations non annulées de la semaine ; onPublish publie toute la semaine.
export default function WeekPublishBar({ entries = [], onPublish, publishing }) {
  const active = entries.filter((e) => e.publication_status !== "Annulé");
  const counts = active.reduce((acc, e) => {
    const s = e.publication_status || "Brouillon";
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});
  const cancelled = entries.length - active.length;
  const toPublish = active.filter((e) => e.publication_status === "Brouillon" || e.publication_status === "Modifié après publication");

  return (
    <div className="bg-card border border-border rounded-xl px-4 py-3 flex items-center justify-between flex-wrap gap-3">
      <div className="flex items-center gap-2 flex-wrap text-xs">
        <span className="text-muted-foreground">Statuts semaine :</span>
        {Object.entries(counts).map(([s, n]) => (
          <span key={s} className={`px-2 py-0.5 rounded font-medium ${publicationClass(s)}`}>{s} · {n}</span>
        ))}
        {cancelled > 0 && <span className={`px-2 py-0.5 rounded font-medium ${publicationClass("Annulé")}`}>Annulé · {cancelled}</span>}
        {active.length === 0 && <span className="text-muted-foreground">Aucune affectation</span>}
      </div>
      <Button size="sm" className="gap-1.5" onClick={onPublish} disabled={publishing || toPublish.length === 0}>
        {publishing ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
        Publier la semaine{toPublish.length > 0 ? ` (${toPublish.length})` : ""}
      </Button>
    </div>
  );
}