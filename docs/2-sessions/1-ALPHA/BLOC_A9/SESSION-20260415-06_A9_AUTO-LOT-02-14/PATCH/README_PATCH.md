# README_PATCH

## Session liée

`SESSION-20260415-06_A9_AUTO-LOT-02-14`

## Type

`CORRECTION-COMPLÉTION`

## Patchs officiels rattachés

- patch principal : `PATCH__SESSION-20260415-06_A9_AUTO-LOT-02-14.diff`
- fix complémentaire : `PATCH__SESSION-20260415-06_A9_AUTO-LOT-02-14_FIX-01.diff`

## Périmètre exact du patch principal

Le patch principal est strictement borné aux fichiers code suivants :
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`
- `app/planning/planning-client.tsx`
- `lib/services/planning/matching.service.ts`
- `lib/services/planning/matching-quality.ts`
- `lib/templates/template-rules.ts`

## Périmètre exact du fix `FIX-01`

Le fix `PATCH__SESSION-20260415-06_A9_AUTO-LOT-02-14_FIX-01.diff` est strictement local à :
- `lib/services/planning/matching.service.ts`

Effet exact du fix :
- correction de la portée / transmission de `draftState` dans le flux de choix véhicule ;
- suppression de l’erreur de build prouvée `Cannot find name 'draftState'` ;
- aucun élargissement fonctionnel hors A9.

## Effet fonctionnel retenu après patch principal + fix

Après application du patch principal puis du fix :
- la génération JOUR / SEMAINE accepte un mode `shifts seuls` ou `génération + auto-affectation` ;
- l’auto-affectation couvre les employés et les véhicules ;
- le matching tient compte des absences utilisateur, des conflits existants, du repos minimum et des contraintes rôles / véhicules ;
- la publication revalide les véhicules actifs / disponibles et la compatibilité type / rôles ;
- l’UI planning autoschedule expose des messages français plus exploitables ;
- le build n’est plus bloqué par la portée de `draftState` dans `matching.service.ts`.

## Validations terminales réellement prouvées

Sur le code validé après application du patch principal puis du fix `FIX-01` :
- `npx prisma validate` : **OK**
- `npx prisma generate` : **OK**
- `npm run lint` : **OK**
- `npm run build` : **OK**

## Réserve restante

Le résiduel strictement prouvé conservé à l’issue de la session est :
- absence de modèle dédié d’indisponibilité véhicule déclarative dans `prisma/schema.prisma` ;
- traduction française encore partielle sur certains codes techniques internes.

## Statut

- patch principal livré ;
- fix `FIX-01` livré ;
- code validé ;
- documentation finale alignée sur l’état réellement validé ;
- prochaine session attendue : `AUTO-15 — VALIDATION`.
