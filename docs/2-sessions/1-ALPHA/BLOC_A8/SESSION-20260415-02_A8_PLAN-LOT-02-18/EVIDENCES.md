# EVIDENCES

## Sources utilisées

### Documentation officielle
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`

### Code réellement inspecté
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
- `prisma/migrations/20260415120500_a8_manual_published_shift_management/migration.sql`

## Extraits documentaires déterminants

### Cadrage officiel planning manuel
`docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- le bloc A8 concerne le planning manuel ;
- la surface ne doit pas dériver vers le moteur autoschedule ;
- l’exploitation attendue porte sur consultation, lisibilité, modifications métier et traçabilité minimale.

### Référence plan de développement
`docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `PLAN-LOT-02-18` vise la correction / complétion de la vue semaine, vue jour, vraie vue mois, navigation mensuelle, lisibilité métier globale, ajout manuel de shift publié, modification de shift publié, annulation logique tracée et historique minimal.

## Extraits de code déterminants

### 1. La page `/planning` prépare désormais explicitement le panneau manuel A8
`app/planning/page.tsx`
- calcule les permissions réelles ;
- charge les dépôts et utilisateurs accessibles ;
- injecte ces données dans `PlanningClient` pour la surface manuelle.

### 2. Le panneau manuel est une surface dédiée
`app/planning/manual-planning-panel.tsx`
- gère trois vues `day`, `week`, `month` ;
- alimente la navigation temporelle et la consultation ;
- permet la création, l’édition et l’annulation logique d’un shift publié ;
- affiche l’historique minimal par shift.

### 3. La page planning isole maintenant le legacy / autoschedule
`app/planning/planning-client.tsx`
- le composant `ManualPlanningPanel` est affiché en premier ;
- le bloc `Zone legacy / autoschedule` est présenté comme hors surface principale A8 ;
- ce bloc est repliable / masquable pour éviter la confusion métier.

### 4. L’API crée des shifts publiés manuels
`app/api/planning/shifts/route.ts`
- supporte la création manuelle publiée hors autoschedule ;
- conserve le cloisonnement société / permissions ;
- alimente la traçabilité planning.

### 5. L’API modifie un shift publié existant
`app/api/planning/shifts/[id]/route.ts`
- permet la mise à jour métier du shift publié ;
- reste cohérente avec les contraintes de rôle, affectation et règles planning.

### 6. L’annulation est logique et tracée
`app/api/planning/shifts/[id]/cancel/route.ts`
- annule sans suppression physique ;
- écrit `isCancelled`, `cancelledAt`, `cancellationReason` ;
- journalise l’action `SHIFT_CANCELLED_MANUALLY`.

### 7. Le schéma Prisma supporte l’annulation logique
`prisma/schema.prisma`
- ajout de `isCancelled` ;
- ajout de `cancelledAt` ;
- ajout de `cancellationReason` ;
- index dédié sur `companyId, isCancelled, startAt`.

## Validations terminales retenues pour clôture

### Production du patch et correctif
- patch principal produit : `PATCH__SESSION-20260415-02_A8_PLAN-LOT-02-18.diff`
- correctif minimal appliqué : `PATCH__SESSION-20260415-02_A8_PLAN-LOT-02-18_FIX-01.diff`
- `FIX-01` validé explicitement par l’utilisateur.

### Validations locales confirmées par l’utilisateur
- `git apply --check` : OK
- `git apply` : OK
- `npx prisma validate` : OK
- `npx prisma generate` : OK
- `npm run lint` : OK
- `npm run build` : OK

### Interprétation
La clôture documentaire repose sur l’état final du code après `FIX-01` et sur la validation locale explicite de l’utilisateur, qui prévaut pour la conformité terminale réelle de cette session.
