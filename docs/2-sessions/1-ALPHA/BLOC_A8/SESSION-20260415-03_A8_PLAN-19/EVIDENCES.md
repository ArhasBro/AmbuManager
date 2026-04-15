# EVIDENCES

## Sources utilisées

### Documents maîtres et protocole
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`

### Code réel contrôlé
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/planning/manual-planning-panel.tsx`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/api/planning/shifts/[id]/cancel/route.ts`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/assign-draftshift.ts`
- `lib/services/planning/planning-audit.ts`
- `lib/types/planning.ts`
- `prisma/schema.prisma`

### Patchs / documentation A8 relus
- `docs/3-patches/1-ALPHA/BLOC_A8/SESSION-20260415-02_A8_PLAN-LOT-02-18/PATCH__SESSION-20260415-02_A8_PLAN-LOT-02-18.diff`
- `docs/3-patches/1-ALPHA/BLOC_A8/SESSION-20260415-02_A8_PLAN-LOT-02-18/PATCH__SESSION-20260415-02_A8_PLAN-LOT-02-18_FIX-01.diff`
- `docs/2-sessions/1-ALPHA/BLOC_A8/SESSION-20260415-01_A8_PLAN-01/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A8/SESSION-20260415-02_A8_PLAN-LOT-02-18/RESULTATS.md`

## Preuves fonctionnelles retenues

### 1. Vue jour / semaine / mois
Preuves :
- `app/planning/manual-planning-panel.tsx`
  - état `viewMode` avec valeurs `day | week | month`
  - paramètres d’appel construits selon le mode actif (`day`, `weekStart`, `month`)
  - sélecteur UI `Jour / Semaine / Mois`
- `app/api/planning/shifts/route.ts`
  - validation des trois scopes `day`, `weekStart`, `month`
  - requête Prisma adaptée au scope actif

### 2. Navigation mensuelle claire
Preuves :
- `app/planning/manual-planning-panel.tsx`
  - boutons `← Précédent`, `Aujourd’hui`, `Suivant →`
  - en mode mois, déplacement par `new Date(current.getFullYear(), current.getMonth() + offset, 1)`
  - libellé mensuel français via `toLocaleDateString("fr-FR", { month: "long", year: "numeric" })`

### 3. Ajout manuel de shift publié
Preuves :
- `app/planning/manual-planning-panel.tsx`
  - bloc `Ajouter un shift publié`
  - `fetch("/api/planning/shifts", { method: "POST" })`
- `app/api/planning/shifts/route.ts`
  - `CreateShiftSchema`
  - `prisma.shift.create(...)`
  - audit `SHIFT_CREATED_MANUALLY`

### 4. Modification de shift publié
Preuves :
- `app/planning/manual-planning-panel.tsx`
  - formulaire `Modifier le shift publié`
  - `fetch("/api/planning/shifts/${editingShiftId}", { method: "PATCH" })`
- `app/api/planning/shifts/[id]/route.ts`
  - recalcul date / horaires
  - mise à jour `templateId`, `depotId`, `notes`
  - audit `SHIFT_UPDATED_MANUALLY`
- `app/api/planning/shifts/[id]/assign/route.ts`
  - conservation de la mutation d’affectation manuelle publiée
- `lib/services/planning/assign-shift.ts`
  - audit `SHIFT_ASSIGNED_MANUALLY` avec `previous` / `next`

### 5. Suppression métier / annulation logique
Preuves :
- `app/planning/manual-planning-panel.tsx`
  - action `Annuler`
  - prompt du motif d’annulation
- `app/api/planning/shifts/[id]/cancel/route.ts`
  - mise à jour logique `isCancelled`, `cancelledAt`, `cancellationReason`
  - audit `SHIFT_CANCELLED_MANUALLY`
- `prisma/schema.prisma`
  - champs `isCancelled`, `cancelledAt`, `cancellationReason`

### 6. Historique minimal et traçabilité consultable
Preuves :
- `app/api/planning/shifts/route.ts`
  - lecture conditionnelle des `planningAuditLog`
  - regroupement `historyByShiftId`
- `app/planning/manual-planning-panel.tsx`
  - bloc `Historique minimal`
  - affichage de la date, du résumé et de l’acteur
- `lib/services/planning/planning-audit.ts`
  - helper d’écriture uniforme
- `prisma/schema.prisma`
  - modèle `PlanningAuditLog` avec `action`, `summary`, `payload`, `actorUserId`, `runId`

### 7. Isolement du périmètre A8 vis-à-vis du legacy / autoschedule
Preuves :
- `app/planning/planning-client.tsx`
  - `ManualPlanningPanel` rendu avant le legacy
  - section `Zone legacy / autoschedule`
  - affichage legacy conditionné par `showLegacyPlanning`

## Validations terminales

### Réellement exécutées dans cette session
- Aucune validation terminale applicative relancée.

### Fait fourni par l’utilisateur à conserver comme source antérieure
- validité locale du correctif précédent confirmée sur :
  - `npx prisma validate` : OK
  - `npx prisma generate` : OK
  - `npm run lint` : OK
  - `npm run build` : OK

Ce constat antérieur n’est pas présenté comme une exécution de la présente session.
