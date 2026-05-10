# EVIDENCES

## Sources utilisées

### Documentation officielle
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

### Code réellement inspecté / modifié
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`
- `app/planning/planning-client.tsx`
- `lib/services/planning/matching.service.ts`
- `lib/services/planning/matching-quality.ts`
- `lib/templates/template-rules.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
- `lib/services/planning/user-absence.ts`
- `lib/company-rules/runtime.ts`
- `lib/company-rules/catalog.ts`
- `prisma/schema.prisma`

## Faits de code déterminants

### 1. Génération JOUR / SEMAINE avec mode explicite
Les routes DAY et WEEK reçoivent `assignmentMode` et, en mode `AUTO_ASSIGN`, déclenchent `autoMatchRunDraftShifts()` après création du run.

### 2. Auto-affectation employés + véhicules réellement branchée
`matching.service.ts` calcule des plans contenant :
- `target` (`USER_1`, `USER_2`, `VEHICLE`) ;
- les besoins de rôle et de type véhicule ;
- les propositions utilisateur et véhicule ;
- un message métier français associé.

### 3. Couverture utilisateurs renforcée
Le matching prend en compte :
- absences utilisateur déclarées ;
- conflits avec les shifts publiés existants ;
- conflits internes au run ;
- repos minimum, lorsqu’une règle société valide est présente.

### 4. Couverture véhicules renforcée
Le matching et la publication prennent en compte :
- occupation véhicule existante ;
- occupation véhicule dans le run courant ;
- `Vehicle.isActive` ;
- `Vehicle.status=ACTIVE` ;
- cohérence `requiredVehicleType` du template.

### 5. Contraintes rôles / véhicules réellement prises en compte
Le patch ajoute :
- `getAllowedRolesForVehicleType()` ;
- `isRoleAllowedForVehicleType()` ;
- leur utilisation dans le matching et au publish.

### 6. Traduction et lisibilité
La surface `/planning` passe à :
- un sélecteur français du mode autoschedule ;
- des messages explicites en cas de ressources manquantes ou incompatibles ;
- un tableau de simulation en français avec cibles, besoins et propositions.

### 7. Fix de build strictement local prouvé
Le fix `PATCH__SESSION-20260415-06_A9_AUTO-LOT-02-14_FIX-01.diff` montre une correction minimale dans `lib/services/planning/matching.service.ts` :
- ajout de `draftState: Map<string, DraftShiftState>` à la signature de `chooseBestVehicle(...)` ;
- transmission de `draftState` depuis l’appelant avant calcul du plan véhicule.

Ce fix corrige l’erreur de build prouvée `Cannot find name 'draftState'` sans modifier le périmètre fonctionnel A9.

## Validations terminales réellement prouvées

Les validations terminales réellement prouvées sur le code validé après application du patch principal puis du fix `FIX-01` sont :
- `npx prisma validate` : **OK**
- `npx prisma generate` : **OK**
- `npm run lint` : **OK**
- `npm run build` : **OK**

## Réserves strictement prouvées conservées

- aucun modèle dédié d’indisponibilité véhicule déclarative n’existe dans `prisma/schema.prisma` ;
- la couverture véhicule reste donc **partielle** au sens strict, même après renforcement des contrôles d’occupation, d’état et de type ;
- la traduction française reste **partielle** car certains codes techniques internes, notamment `action` dans l’audit, restent présents.
