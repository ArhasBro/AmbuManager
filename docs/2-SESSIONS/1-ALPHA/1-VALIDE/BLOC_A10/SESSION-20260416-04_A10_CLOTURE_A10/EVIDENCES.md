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

### Matching preview / apply
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`

Éléments prouvés :
- `variant` optionnelle acceptée sur preview et apply ;
- fallback strict `VARIANT_1` si non fournie ;
- preview renvoie `quality` + métadonnée `variant` ;
- apply transmet la variante au moteur et l’écrit dans l’audit `AUTOSCHEDULE_MATCH_APPLIED`.

### Lecture du run
- `app/api/planning/autoschedule/runs/[id]/route.ts`

Éléments prouvés :
- cloisonnement `companyId` conservé via `findFirst({ where: { id, companyId }})` ;
- séparation `canViewRun` / `canViewAudit` ;
- calcul `matching: { variant, quality }` réellement renvoyé ;
- `resolveRunMatchingVariant(...)` relit la dernière variante prouvable depuis l’audit et confirme l’effet réel de `FIX-01`.

### Service de matching
- `lib/services/planning/matching.service.ts`
- `lib/templates/template-rules.ts`

Éléments prouvés :
- `MATCHING_VARIANTS` expose 3 variantes simples ;
- `computeDraftShiftMatchingByRole(...)` et `autoMatchRunDraftShifts(...)` propagent la variante ;
- `sortUserCandidatesForVariant(...)` et `sortVehicleCandidatesForVariant(...)` différencient bien les comportements `LOAD_BALANCED` / `STABLE` ;
- la composition minimale d’équipe utilise `resolveTemplateMinStaffCount(...)`, `getAllowedRolesForFirstSlot(...)`, `getAllowedRolesForSecondSlot(...)` ;
- les véhicules requis utilisent `requiredVehicleType`, `vehiclesByType`, `validateAssignedRolesForVehicle(...)` ;
- les compteurs `userAssignmentCounts` et `vehicleAssignmentCounts` confirment la logique d’équilibrage de charge.

### Score qualité
- `lib/services/planning/matching-quality.ts`

Éléments prouvés :
- `computePlanningQuality(...)` calcule `coverage`, `vehicleCoverage`, `stability`, `equity`, `overall`, `countsByReason`, `explanations` ;
- `computeShiftPlanningQuality(...)` calcule `shiftScores` par shift ;
- pondérations réelles actuelles :
  - `coverage = 0.4`
  - `vehicleCoverage = 0.2`
  - `stability = 0.25`
  - `equity = 0.15`

### UI réelle
- `app/planning/planning-client.tsx`

Éléments prouvés :
- sélecteur UI de variantes alimenté par `MATCHING_VARIANTS` ;
- simulation et application branchées sur la variante sélectionnée ;
- panneau `Score matching du run` affichant score global + sous-scores ;
- liste UI des `shiftScores` du run ;
- panneau `Score qualité planning` affichant le score de preview et les explications ;
- cohérence run / preview / UI sans recalcul autonome contradictoire côté client.

### Permissions / multi-tenant
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `lib/services/planning/planning-audit.ts`
- `lib/company-rules/runtime.ts`
- `prisma/schema.prisma`

Éléments prouvés :
- session valide + `companyId` requis sur les routes A10 ;
- `PLANNING_AUTOSCHEDULE` requis pour preview/apply ;
- `AUDIT_VIEW` requis pour lecture audit ;
- support global non bypassant ;
- aucune migration Prisma supplémentaire nécessaire pour A10 ;
- le score run reste recalculé à la lecture sans persistance dédiée, conformément au patch réel livré.

## Patchs et documentation A10 contrôlés

- `SESSION-20260416-01_A10_MATCH-01`
- `SESSION-20260416-02_A10_MATCH-LOT-02-09`
- `SESSION-20260416-03_A10_MATCH-10`

### Cohérence patchs / code

- le code réel courant conserve bien les effets fonctionnels annoncés par `PATCH__SESSION-20260416-02_A10_MATCH-LOT-02-09.diff` :
  - variantes simples `VARIANT_1` / `VARIANT_2` / `VARIANT_3`
  - score qualité visible au niveau run
  - score qualité visible au niveau shift
  - intégration UI minimale de ces compléments
- le code réel courant conserve bien les effets fonctionnels annoncés par `PATCH__SESSION-20260416-02_A10_MATCH-LOT-02-09_FIX-01.diff` :
  - variante run relue depuis l’audit existant avec fallback `VARIANT_1`
  - libellé `VARIANT_2` réaligné sur l’ordre stable par identifiant.
- `MATCH-10` reste cohérente avec l’état final retenu :
  - `NO_PATCH`
  - validation fonctionnelle A10 positive
  - résiduel documentaire limité au `REGISTRE_DECISIONS.md`.

## Qualification des validations terminales retenues

### Validations vertes antérieures retenues comme preuves bloc
Issues de `MATCH-LOT-02-09` :
- `git apply --check` : **OK**
- `git apply` : **OK**
- `npx prisma validate` : **OK**
- `npx prisma generate` : **OK**
- `npm run lint` : **OK**
- `npm run build` : **OK**

### Sessions sans relance terminale applicative
- `MATCH-01` : session d’audit en `NO_PATCH`, sans relance terminale
- `MATCH-10` : session de validation en `NO_PATCH`, sans relance terminale
- `CLOTURE_A10` : présente session en `NO_PATCH`, sans relance terminale

## Résiduel final strictement prouvé

### Résiduel 1 — registre des décisions non réaligné sur le score qualité réel
Dans `docs/1-master/REGISTRE_DECISIONS.md` :
- le score qualité 4.6 reste décrit avec `coverage=0.5`, `stability=0.3`, `equity=0.2` ;
- aucune mention de `vehicleCoverage` ;
- la stabilité reste décrite autour de `USER_CONFLICT`.

Dans `lib/services/planning/matching-quality.ts` :
- pondérations réelles : `coverage=0.4`, `vehicleCoverage=0.2`, `stability=0.25`, `equity=0.15` ;
- stabilité réelle basée sur `USER_UNAVAILABLE`, `MIN_REST_CONFLICT`, `VEHICLE_UNAVAILABLE`, `ROLE_VEHICLE_RESTRICTION`.

Conclusion de preuve :
- écart documentaire réel ;
- écart externe au code A10 final ;
- résiduel non bloquant pour la clôture du bloc ;
- ne justifie pas un patch code dans la présente session.
