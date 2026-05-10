# EVIDENCES

## Sources utilisées

Sources contrôlées directement dans le dépôt :
- `app/planning/manual-planning-panel.tsx`
- `app/planning/planning-client.tsx`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/api/planning/shifts/[id]/cancel/route.ts`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/planning-audit.ts`

## Éléments factuels retenus

### Surface manuelle principale A8
`app/planning/manual-planning-panel.tsx` prouve directement :
- les vues `Jour`, `Semaine`, `Mois`
- la navigation `Précédent / Aujourd’hui / Suivant`
- la création manuelle d’un shift publié via `POST /api/planning/shifts`
- l’édition structurelle d’un shift publié via `PATCH /api/planning/shifts/[id]`
- les champs visibles d’édition : `date`, `startTime`, `endTime`, `templateId`, `depotId`, `notes`
- l’annulation logique via `POST /api/planning/shifts/[id]/cancel`
- l’affichage d’un historique minimal par shift

### Point retiré car non prouvé sur la surface principale A8
La surface `app/planning/manual-planning-panel.tsx` ne montre pas d’édition visible de `userId`, `user2Id` ou `vehicleId`.

La modification des affectations est seulement prouvée côté API / service par :
- `app/api/planning/shifts/[id]/assign/route.ts`
- `lib/services/planning/assign-shift.ts`

Ce point ne permet donc pas d’affirmer que la surface manuelle principale A8 prouve elle-même la modification des affectations publiées.

### Isolement du legacy
`app/planning/planning-client.tsx` place `ManualPlanningPanel` en tête puis affiche séparément une zone intitulée `Zone legacy / autoschedule`, explicitement marquée comme hors surface principale A8.

### Traçabilité
- `app/api/planning/shifts/route.ts` charge `historyByShiftId` quand `includeHistory=1`
- `app/api/planning/shifts/[id]/route.ts` écrit un audit `SHIFT_UPDATED_MANUALLY`
- `app/api/planning/shifts/[id]/cancel/route.ts` écrit une trace d’annulation logique
- `lib/services/planning/planning-audit.ts` centralise l’écriture de `PlanningAuditLog`
