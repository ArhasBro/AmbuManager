# EVIDENCES

Éléments factuels utilisés pendant la session.

---

## Sources utilisées

### Documentation
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
- `docs/2-sessions/1-ALPHA/BLOC_A10/SESSION-20260416-01_A10_MATCH-01/*`
- `docs/2-sessions/1-ALPHA/BLOC_A10/SESSION-20260416-02_A10_MATCH-LOT-02-09/*`
- `docs/3-patches/1-ALPHA/BLOC_A10/SESSION-20260416-02_A10_MATCH-LOT-02-09/README_PATCH.md`

### Code
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/planning/planning-client.tsx`
- `lib/services/planning/matching.service.ts`
- `lib/services/planning/matching-quality.ts`
- `lib/templates/template-rules.ts`
- `lib/types/planning.ts`
- `lib/services/planning/planning-audit.ts`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `lib/company-rules/runtime.ts`
- `prisma/schema.prisma`

## Preuves documentaires

### Preuve A — Cadrage fonctionnel A10
Dans `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md` :
- `12.1` : matching = cœur de l’ALPHA ;
- `12.2` : couvrir les shifts, respecter les rôles, équilibrer la charge, tenir compte de la disponibilité véhicule ;
- `12.3` : proposer 2 à 3 variantes simples ;
- `12.4` : score visible au niveau du run et de chaque shift.

### Preuve B — Plan A10
Dans `docs/1-master/PLAN_DE_DEVELOPPEMENT.md` :
- `MATCH-10` = validation complète du bloc matching ALPHA ;
- périmètre attendu : scoring, équipe / véhicule / charge, lisibilité du score, variantes simples.

### Preuve C — Audit initial `MATCH-01`
Dans `docs/2-sessions/1-ALPHA/BLOC_A10/SESSION-20260416-01_A10_MATCH-01/RESULTATS.md` :
- variantes simples : `NON` ;
- score run visible : `PARTIEL` ;
- score shift visible : `NON`.

### Preuve D — Correctifs `MATCH-LOT-02-09`
Dans `docs/2-sessions/1-ALPHA/BLOC_A10/SESSION-20260416-02_A10_MATCH-LOT-02-09/RESULTATS.md` et `README_PATCH.md` :
- variantes 1 / 2 / 3 livrées ;
- score qualité run livré ;
- score qualité shift livré ;
- `FIX-01` aligne la variante du run et le libellé réel de `VARIANT_2`.

## Preuves code

### Preuve E — Variantes simples réellement disponibles
Dans `lib/services/planning/matching.service.ts` :
- `MatchingVariantKey = "VARIANT_1" | "VARIANT_2" | "VARIANT_3"` ;
- `MATCHING_VARIANTS` expose 3 variantes avec comportements distincts :
  - `VARIANT_1` : équilibrée ;
  - `VARIANT_2` : stable ;
  - `VARIANT_3` : inverse.

Dans `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts` :
- `variant` est accepté dans le body ;
- la preview transmet la variante au service ;
- la réponse renvoie `variant`.

Dans `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts` :
- `variant` est accepté dans le body ;
- l’apply transmet la variante au service ;
- l’audit persiste la `variant` dans `payload`.

Dans `app/planning/planning-client.tsx` :
- sélecteur `Matching` alimenté par `MATCHING_VARIANTS` ;
- la simulation et l’application utilisent la variante sélectionnée.

### Preuve F — Équilibre de charge réellement exploité
Dans `lib/services/planning/matching.service.ts` :
- `sortUserCandidatesForVariant()` trie selon `userAssignmentCounts` pour les variantes `LOAD_BALANCED` ;
- `sortVehicleCandidatesForVariant()` trie selon `vehicleAssignmentCounts` pour les variantes `LOAD_BALANCED` ;
- les compteurs sont mis à jour pendant le calcul du plan et pendant l’application.

### Preuve G — Composition minimale d’équipe réellement prise en compte
Dans `lib/templates/template-rules.ts` :
- `resolveTemplateMinStaffCount()` ;
- `getAllowedRolesForFirstSlot()` ;
- `getAllowedRolesForSecondSlot()`.

Dans `lib/services/planning/matching.service.ts` :
- `getRequiredSlots()` exploite `minStaffCount` ;
- `getRolePoolForSlot()` exploite `requiredRole` et `secondaryAllowedRoles` ;
- `chooseBestUser()` traite slot 1 / slot 2 selon la composition minimale réelle.

### Preuve H — Véhicules requis réellement pris en compte
Dans `lib/services/planning/matching.service.ts` :
- `loadResources()` charge les véhicules actifs filtrés sur `requiredVehicleType` ;
- `chooseBestVehicle()` traite :
  - absence de véhicule requis ;
  - indisponibilité véhicule ;
  - rôle ↔ véhicule incompatible ;
  - disponibilité véhicule selon les chevauchements.

Dans `lib/templates/template-rules.ts` :
- `getAllowedRolesForVehicleType()` ;
- `isRoleAllowedForVehicleType()`.

### Preuve I — Score qualité réellement cohérent entre service, API et UI
Dans `lib/services/planning/matching-quality.ts` :
- `computePlanningQuality()` calcule :
  - `overall` ;
  - `coverage` ;
  - `vehicleCoverage` ;
  - `stability` ;
  - `equity` ;
  - `shiftScores` ;
  - `explanations`.

Dans `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts` :
- la route renvoie `quality = computePlanningQuality(plan)`.

Dans `app/api/planning/autoschedule/runs/[id]/route.ts` :
- la lecture du run renvoie `matching: { variant, quality: computePlanningQuality(plan) }`.

Dans `app/planning/planning-client.tsx` :
- les garde-fous `isPlanningQuality()` et `isMatchingVariantDefinition()` valident la structure reçue ;
- `runMatchQuality` et `matchQuality` sont affichés sans recalcul UI autonome.

### Preuve J — Score qualité visible au niveau run et shift
Dans `app/api/planning/autoschedule/runs/[id]/route.ts` :
- la réponse du run contient `data.matching = { variant, quality }`.

Dans `app/planning/planning-client.tsx` :
- panneau `Score matching du run : {runMatchQuality.overall}/100` ;
- synthèse des sous-scores du run ;
- liste des `shiftScores` du run ;
- colonne `Score shift` dans le tableau de simulation / application.

### Preuve K — Cohérence multi-tenant / permissions préservée
Dans `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts` et `match/apply/route.ts` :
- session valide obligatoire avec `companyId` ;
- `canAutoSchedule()` obligatoire.

Dans `app/api/planning/autoschedule/runs/[id]/route.ts` :
- `findFirst({ where: { id: runId, companyId }})` ;
- séparation `canViewRun` / `canViewAudit`.

Dans `lib/permissions.ts` :
- `canAutoSchedule()` = permission `PLANNING_AUTOSCHEDULE` ;
- `canViewAudit()` = permission `AUDIT_VIEW` ;
- `PlatformRole` global support ne bypass pas ces droits.

## Résiduel documentaire strictement prouvé

### Preuve L — Registre des décisions encore désaligné
Dans `docs/1-master/REGISTRE_DECISIONS.md` :
- pondérations encore décrites comme `coverage=0.5`, `stability=0.3`, `equity=0.2` ;
- aucune mention de `vehicleCoverage` ;
- stabilité encore décrite autour de `USER_CONFLICT`.

Dans `lib/services/planning/matching-quality.ts` :
- pondérations réelles : `coverage=0.4`, `vehicleCoverage=0.2`, `stability=0.25`, `equity=0.15` ;
- stabilité réelle basée sur `USER_UNAVAILABLE`, `MIN_REST_CONFLICT`, `VEHICLE_UNAVAILABLE`, `ROLE_VEHICLE_RESTRICTION`.

Conclusion de preuve :
- écart documentaire réel ;
- écart externe à la décision de patch de `MATCH-10` ;
- pas d’écart code A10 strictement prouvé sur le périmètre de validation.
