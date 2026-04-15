# EVIDENCES

## Sources maîtres relues

- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`

## Code réel contrôlé

### Surface manuelle principale A8
`app/planning/manual-planning-panel.tsx` prouve directement :
- la bascule `day / week / month`
- la navigation `Précédent / Aujourd’hui / Suivant`
- la création manuelle via `POST /api/planning/shifts`
- l’édition structurelle via `PATCH /api/planning/shifts/[id]`
- l’annulation logique via `POST /api/planning/shifts/[id]/cancel`
- l’affichage d’un historique minimal par shift

### API / services manuels publiés
- `app/api/planning/shifts/route.ts` :
  - lecture `day`, `weekStart`, `month`
  - chargement optionnel de `historyByShiftId`
  - création manuelle de `Shift` publié
- `app/api/planning/shifts/[id]/route.ts` :
  - modification structurelle du shift publié
  - audit `SHIFT_UPDATED_MANUALLY`
- `app/api/planning/shifts/[id]/cancel/route.ts` :
  - annulation logique d’un shift publié
  - audit `SHIFT_CANCELLED_MANUALLY`
- `app/api/planning/shifts/[id]/assign/route.ts` + `lib/services/planning/assign-shift.ts` :
  - modification des affectations publiées
  - audit `SHIFT_ASSIGNED_MANUALLY`

### Traçabilité
- `lib/services/planning/planning-audit.ts` centralise l’écriture de `PlanningAuditLog`
- `prisma/schema.prisma` contient :
  - `Shift.isCancelled`
  - `Shift.cancelledAt`
  - `Shift.cancellationReason`
  - `PlanningAuditLog`

## Patchs et documentation A8 contrôlés

- `SESSION-20260415-01_A8_PLAN-01` :
  - audit initial cohérent avec l’état antérieur du code
  - `NO_PATCH` cohérent
- `SESSION-20260415-02_A8_PLAN-LOT-02-18` :
  - patch principal + `FIX-01` cohérents avec le code réel actuel
- `SESSION-20260415-03_A8_PLAN-19` :
  - correction documentaire minimale cohérente
  - maintien explicite du constat :
    - édition structurelle du shift publié : OUI
    - modification des affectations depuis la surface manuelle principale A8 : NON PROUVÉE

## Point de qualification final retenu

La modification des affectations publiées existe bien sur le produit `/planning`, mais elle n’est pas prouvée par la surface manuelle principale `ManualPlanningPanel`.  
Le constat final correct est donc :
- fonctionnalité de modification des affectations publiée : prouvée dans le produit / API
- modification des affectations depuis la surface manuelle principale A8 : `NON PROUVÉE`
