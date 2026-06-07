import React from "react";
import { cn } from "@/lib/utils";

const STYLES = {
  // Statuts véhicules
  "Disponible": "bg-green-100 text-green-700",
  "Réservé": "bg-blue-100 text-blue-700",
  "Maintenance": "bg-amber-100 text-amber-600",
  "Hors service": "bg-red-100 text-red-600",
  // Résultats vérification
  "Conforme": "bg-green-100 text-green-700",
  "Non conforme": "bg-red-100 text-red-600",
  "Sous réserve": "bg-amber-100 text-amber-600",
  "À vérifier": "bg-gray-100 text-gray-500",
  // Anomalies
  "Bloquante": "bg-red-100 text-red-600",
  "Majeure": "bg-amber-100 text-amber-600",
  "Non bloquante": "bg-gray-100 text-gray-500",
  "Ouverte": "bg-red-50 text-red-600",
  "En cours de traitement": "bg-blue-100 text-blue-600",
  "Résolue": "bg-green-100 text-green-700",
  "Annulée/Classée sans suite": "bg-gray-100 text-gray-400",
  "Indisponible": "bg-red-100 text-red-600",
  // Statuts utilisateurs
  "Actif": "bg-green-100 text-green-700",
  "Inactif": "bg-gray-100 text-gray-500",
  "Absent": "bg-amber-100 text-amber-600",
  // Statuts modèles
  "Brouillon": "bg-amber-50 text-amber-600",
  "Publié": "bg-green-100 text-green-700",
  "Annulé": "bg-red-100 text-red-600",
  // Rôles
  "Administrateur": "bg-violet-100 text-violet-700",
  "Gérant": "bg-blue-100 text-blue-700",
  "Bureau": "bg-sky-100 text-sky-700",
  "Ambulancier DE": "bg-green-100 text-green-700",
  "Auxiliaire Ambulancier": "bg-teal-100 text-teal-700",
  // Types véhicules
  "Ambulance": "bg-green-100 text-green-700",
  "VSL": "bg-blue-100 text-blue-700",
  "TAXI": "bg-orange-100 text-orange-700",
  "AMBULANCE": "bg-green-100 text-green-700",
  // Désinfection
  "Totale": "bg-teal-100 text-teal-700",
  "Partielle": "bg-sky-100 text-sky-700",
  "Contre-vérifiée": "bg-green-100 text-green-700",
  "Complète": "bg-green-100 text-green-700",
  "En attente": "bg-amber-100 text-amber-600",
  "A refaire": "bg-red-100 text-red-600",
  "Validée": "bg-green-100 text-green-700",
  "Refusée": "bg-red-100 text-red-600",
  "Annulée": "bg-gray-100 text-gray-500",
  // Audit
  "Succès": "bg-green-100 text-green-700",
  "Échec": "bg-red-100 text-red-600",
  "Avertissement": "bg-amber-100 text-amber-600",
  // États de suivi véhicules
  "OK": "bg-green-100 text-green-700",
  "À traiter": "bg-amber-100 text-amber-600",
  "À désinfecter": "bg-teal-100 text-teal-700",
  "Anomalie ouverte": "bg-red-100 text-red-600",
  "TPMR": "bg-violet-100 text-violet-700",
  // Mise en route
  "Terminé": "bg-green-100 text-green-700",
  "En cours": "bg-blue-100 text-blue-700",
  "À faire": "bg-gray-100 text-gray-500",
  "À planifier": "bg-violet-100 text-violet-700",
};

const DOT_COLOR = {
  "Disponible": "bg-green-500",
  "Actif": "bg-green-500",
  "Complète": "bg-green-500",
  "Contre-vérifiée": "bg-green-500",
  "Résolue": "bg-green-500",
  "Succès": "bg-green-500",
  "Réservé": "bg-blue-500",
  "En cours de traitement": "bg-blue-500",
  "En attente": "bg-amber-500",
  "Absent": "bg-amber-500",
  "Maintenance": "bg-amber-500",
  "Sous réserve": "bg-amber-500",
  "Hors service": "bg-red-500",
  "Indisponible": "bg-red-500",
  "A refaire": "bg-red-500",
  "Échec": "bg-red-500",
  "Inactif": "bg-gray-400",
};

export default function StatusBadge({ status, withDot = false, className }) {
  if (!status) return null;
  const style = STYLES[status] || "bg-gray-100 text-gray-500";
  const dotColor = DOT_COLOR[status] || "bg-gray-400";

  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded whitespace-nowrap", style, className)}>
      {withDot && <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", dotColor)} />}
      {status}
    </span>
  );
}