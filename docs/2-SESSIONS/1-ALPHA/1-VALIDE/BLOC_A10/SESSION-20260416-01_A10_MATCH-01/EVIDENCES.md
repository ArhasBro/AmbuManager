# EVIDENCES

Éléments factuels utilisés pendant la session.

---

## Sources utilisées

### Documentation maître et protocole
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

### Code contrôlé en priorité
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
- `app/planning/planning-client.tsx`
- `lib/services/planning/matching.service.ts`
- `lib/services/planning/matching-quality.ts`
- `lib/templates/template-rules.ts`
- `prisma/schema.prisma`

### Complément strictement nécessaire
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `lib/services/planning/planning-audit.ts`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `lib/company-rules/runtime.ts`
- `lib/types/planning.ts`

---

## Preuves directes retenues

### Preuve A — Preview matching avec retour qualité
Dans `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts` :
- body optionnel `includeAlreadyAssigned`
- appel de `computeDraftShiftMatchingByRole(...)`
- calcul `const quality = computePlanningQuality(plan)`
- réponse `ok({ plan, quality }, 200)`

### Preuve B — Apply matching réel
Dans `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts` :
- confirmation explicite `confirm: true`
- appel `autoMatchRunDraftShifts(...)`
- audit `AUTOSCHEDULE_MATCH_APPLIED`
- payload d’audit avec compteurs appliqués / non appliqués / véhicules

### Preuve C — Score qualité réellement implémenté
Dans `lib/services/planning/matching-quality.ts` :
- structure `PlanningQuality`
- sous-scores `coverage`, `vehicleCoverage`, `stability`, `equity`
- score final `overall`
- explications textuelles
- `countsByReason`

### Preuve D — Équilibrage de charge réellement implémenté
Dans `lib/services/planning/matching.service.ts` :
- tri employés par `userAssignmentCounts`
- tri véhicules par `vehicleAssignmentCounts`
- choix du candidat libre avec plus faible charge actuelle

### Preuve E — Composition minimale d’équipe réellement prise en compte
Dans `lib/services/planning/matching.service.ts` et `lib/templates/template-rules.ts` :
- slot 1 / slot 2 distingués ;
- `minStaffCount` résout le nombre de slots ;
- `requiredRole` + `secondaryAllowedRoles` alimentent les pools de rôles ;
- le moteur remplit seulement les slots requis et manquants.

### Preuve F — Véhicule requis réellement pris en compte
Dans `lib/services/planning/matching.service.ts` :
- chargement des véhicules par `requiredVehicleType`
- filtrage `isActive` + `VehicleStatus.ACTIVE`
- contrôle de disponibilité véhicule
- contrôle de restriction rôle ↔ véhicule
- motifs `NO_VEHICLE_WITH_REQUIRED_TYPE`, `VEHICLE_UNAVAILABLE`, `ROLE_VEHICLE_RESTRICTION`

### Preuve G — Visibilité UI réelle
Dans `app/planning/planning-client.tsx` :
- message de preview avec score global et sous-scores
- bloc `Score qualité planning`
- affichage des `explanations`
- tableau des propositions / signalements par cible

### Preuve H — Score par shift non matérialisé
Aucun objet dédié `shiftQuality`, aucun score numérique par shift et aucun rendu UI d’un score par shift n’ont été trouvés dans le périmètre contrôlé.
Le rendu détaillé est un tableau de plan items, pas une note par shift.

### Preuve I — Variantes simples absentes
Aucune route, aucun service et aucune UI du périmètre contrôlé ne portent :
- variantes 1 / 2 / 3 ;
- tableau de variantes ;
- comparateur ;
- paramètre de stratégie multiple ;
- sortie multi-plans.

### Preuve J — Multi-tenant / permissions conservés
Les routes preview/apply :
- exigent une session valide avec `companyId`
- contrôlent `canAutoSchedule(...)`
- bornent les lectures et écritures au `companyId` du run

Le service borne les accès via :
- `loadDraftState(... where: { runId, run: { companyId } })`
- `updateMany(... run: { companyId })`
- requêtes users / vehicles / shifts toutes filtrées par `companyId`.
