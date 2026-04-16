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

### Génération JOUR / SEMAINE
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`

Éléments prouvés :
- génération `DAY` et `WEEK` réelles ;
- blocage du double brouillon `DRAFT_ALREADY_EXISTS` ;
- filtrage `ShiftTemplate` sur `isActive: true`, `archivedAt: null`, `isTimeDefined: true` ;
- choix `assignmentMode: "SHIFTS_ONLY" | "AUTO_ASSIGN"` ;
- audit `AUTOSCHEDULE_RUN_CREATED`.

### Lancement depuis le planning
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`

Éléments prouvés :
- calcul serveur `canAutoSchedule` ;
- surface `/planning` réellement branchée sur les actions autoschedule ;
- libellés UI principaux en français.

### Matching / auto-affectation
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
- `lib/services/planning/matching.service.ts`
- `lib/services/planning/matching-quality.ts`
- `lib/templates/template-rules.ts`

Éléments prouvés :
- simulation et application réelles ;
- couverture employés + véhicules ;
- prise en compte des rôles requis et rôles secondaires ;
- prise en compte des absences utilisateur ;
- prise en compte du repos minimum ;
- prise en compte des restrictions rôles ↔ type véhicule ;
- messages métier et score qualité majoritairement en français.

### Publication / contrôles finaux
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`

Éléments prouvés :
- revalidation des absences utilisateur ;
- revalidation des chevauchements utilisateur / véhicule ;
- revalidation véhicule actif / statut `ACTIVE` ;
- revalidation compatibilité type véhicule / template ;
- revalidation compatibilité rôles / véhicule ;
- revalidation du repos minimum via `PLANNING_MIN_REST_HOURS`.

### Company rules / schéma
- `lib/company-rules/runtime.ts`
- `lib/company-rules/catalog.ts`
- `app/api/company/rules/route.ts`
- `prisma/schema.prisma`

Éléments prouvés :
- `RuleMode` existe bien dans le schéma courant ;
- la règle de repos minimum est réellement branchée ;
- `VEHICLE_UNAVAILABILITY` reste `PREPARED` ;
- aucun modèle dédié d’indisponibilité véhicule déclarative n’est présent dans le schéma.

### Permissions / multi-tenant
- `lib/permissions.ts`
- `lib/permission-catalog.ts`

Éléments prouvés :
- contrôle session + `companyId` sur les routes A9 ;
- permissions dédiées autoschedule / publish / cancel ;
- cloisonnement multi-tenant conservé.

## Patchs et documentation A9 contrôlés

- `SESSION-20260415-05_A9_AUTO-01`
- `SESSION-20260415-06_A9_AUTO-LOT-02-14`
- `SESSION-20260415-07_A9_AUTO-15`

### Cohérence patchs / code
- le code réel actuel conserve bien les effets fonctionnels annoncés par `AUTO-LOT-02-14` :
  - `assignmentMode` sur `day` / `week`
  - auto-affectation employés + véhicules
  - messages français côté matching / qualité
  - contrôles véhicule au publish
- le correctif `FIX-01` sur `matching.service.ts` est cohérent avec la signature actuelle de `chooseBestVehicle(..., draftState, ...)`.

## Qualification des validations terminales retenues

### Validations vertes antérieures retenues comme preuves bloc
Issues de `AUTO-LOT-02-14` :
- `npx prisma validate` : **OK**
- `npx prisma generate` : **OK**
- `npm run lint` : **OK**
- `npm run build` : **OK**

### Validations `AUTO-15` conservées telles quelles
- `npx prisma validate` : **KO**
- `npx prisma generate` : **KO**
- `npm run lint` : **OK**
- `npm run build` : **KO**

### Requalification stricte
- les `KO` Prisma de `AUTO-15` sont documentés comme échecs de téléchargement d’engine ;
- le `build KO` documenté dans `AUTO-15` touche `app/api/company/rules/route.ts`, hors A9 strict, dans une session où `prisma generate` était déjà `KO` ;
- ces `KO` ne suffisent donc pas, à eux seuls, à prouver un nouveau résiduel code A9 bloquant.

## Validations réellement exécutées dans la présente session

Aucune validation terminale applicative n’a été relancée dans cette session `NO_PATCH`.
