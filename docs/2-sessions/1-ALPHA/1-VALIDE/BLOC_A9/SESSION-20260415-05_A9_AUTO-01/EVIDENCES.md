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

### Code réellement inspecté
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`
- `app/api/planning/autoschedule/runs/route.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `lib/services/planning/autoschedule-match.ts`
- `lib/services/planning/matching.service.ts`
- `lib/services/planning/matching-quality.ts`
- `lib/services/planning/user-absence.ts`
- `lib/services/planning/planning-audit.ts`
- `lib/company-rules/runtime.ts`
- `lib/company-rules/catalog.ts`
- `lib/types/planning.ts`
- `prisma/schema.prisma`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`

### Documentation de session contrôlée
- `docs/2-sessions/1-ALPHA/BLOC_A9/SESSION-20260415-05_A9_AUTO-01/*`
- `docs/3-patches/1-ALPHA/BLOC_A9/SESSION-20260415-05_A9_AUTO-01/*`

## Extraits documentaires déterminants

### Plan A9
`docs/1-master/PLAN_DE_DEVELOPPEMENT.md:611-614`
- `AUTO-01` doit auditer génération JOUR / SEMAINE, contraintes ALPHA, signalements métier et traduction française.
- la session suivante attendue après audit est `AUTO-LOT-02-14 — CORRECTION-COMPLÉTION`.

### Cadrage officiel autoschedule
`docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:763-835`
- 11.1 : génération jour présente.
- 11.2 : génération semaine présente.
- 11.4 : le gérant doit pouvoir choisir entre shifts seuls et génération avec affectation automatique employés + véhicules.
- 11.5 : contraintes minimales attendues : templates actifs, véhicules disponibles, rôles requis, repos minimum, indisponibilités salarié et véhicule, restrictions rôles/véhicules.
- 11.6 : le moteur doit produire des signalements métier.
- 11.7 : les libellés autoschedule doivent être en français.

### État global projet
`docs/1-master/ETAT_GLOBAL_PROJET.md:103-122`
- le projet maître confirme déjà l’existence réelle des routes `match/preview`, `match/apply`, `day`, `week`, `publish`, `cancel` et de la consultation audit du run.

## Extraits de code déterminants

### 1. Génération JOUR réelle
`app/api/planning/autoschedule/day/route.ts`
- contrôle session + `companyId` + permission `canAutoSchedule` ;
- empêche le double brouillon `DAY` en `DRAFT` sur le même jour ;
- charge `ShiftTemplate` avec `isActive: true`, `archivedAt: null`, `isTimeDefined: true` ;
- crée un `AutoScheduleRun` + des `DraftShift` ;
- écrit un log d’audit `AUTOSCHEDULE_RUN_CREATED`.

### 2. Génération SEMAINE réelle
`app/api/planning/autoschedule/week/route.ts`
- normalise la date au lundi ;
- empêche le double brouillon `WEEK` ;
- génère 7 jours de `DraftShift` à partir des templates actifs ;
- écrit un log d’audit `AUTOSCHEDULE_RUN_CREATED`.

### 3. Lancement depuis `/planning`
`app/planning/page.tsx` + `app/planning/planning-client.tsx`
- `canAutoSchedule` est calculé côté serveur ;
- la surface planning expose réellement :
  - `Générer cette semaine`
  - `Générer ce jour`
  - `Simuler auto-assign`
  - `Appliquer auto-assign`
  - `Publier le brouillon`
  - `Annuler le brouillon`

### 4. Matching réel mais centré utilisateurs
`app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
`app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
`lib/services/planning/matching.service.ts`
- preview + apply existent réellement ;
- la simulation calcule un plan et un score qualité ;
- le service utilise `requiredRole`, `secondaryAllowedRoles`, `minStaffCount`, absences utilisateur et équité ;
- les types `MatchingPlanItem` / `MatchingApplyItem` ne portent aucun champ d’affectation véhicule ;
- l’auto-assign prouvée est donc une auto-affectation utilisateurs, pas véhicules.

### 5. Absences utilisateur réellement prises en compte
`lib/services/planning/user-absence.ts`
`lib/services/planning/matching.service.ts`
`app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- les absences utilisateur sont lues par fenêtre de temps ;
- le matching exclut les utilisateurs absents ;
- le publish bloque sur `USER_ABSENCE_CONFLICT` si un draft affecté chevauche une absence.

### 6. Repos minimum réellement branché
`lib/company-rules/runtime.ts`
`lib/company-rules/catalog.ts`
`app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- la règle société `PLANNING_MIN_REST_HOURS` est réellement chargée ;
- le publish calcule des `warnings` de `MIN_REST_VIOLATION` ;
- la publication bloque en mode `BLOCK` ou `BOTH`.

### 7. Indisponibilité véhicule seulement partiellement couverte
`app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- le publish bloque les chevauchements de véhicule avec des `Shift` existants (`CONFLICT_VEHICLE`) ;
- aucune logique moteur explicite n’a été trouvée pour `vehicle.status`, maintenance ou indisponibilité véhicule dédiée dans l’autoschedule.

### 8. Restrictions rôles / véhicules non prouvées
`lib/company-rules/catalog.ts:138-151`
- `VEHICLE_ROLE_RESTRICTIONS` est déclaré `PREPARED` et non `BRANCHED`.
- aucune implémentation autoschedule dédiée n’a été trouvée dans `matching.service.ts` ou les routes autoschedule.

### 9. Traduction française partielle
`app/planning/planning-client.tsx`
`lib/services/planning/planning-audit.ts`
- UI visible largement en français ;
- mais plusieurs messages exposent des codes techniques bruts (`MATCHED`, `NO_REQUIRED_ROLE`, `USER_CONFLICT`, `run.status=...`) ;
- les logs/résumés d’audit sont majoritairement rédigés en anglais.

## Validations terminales réellement exécutées

### Validations applicatives
- `git apply --check` : non exécutée
- `git apply` : non exécutée
- `npx prisma validate` : non exécutée
- `npx prisma generate` : non exécutée
- `npm run lint` : non exécutée
- `npm run build` : non exécutée

### Motif
Session d’audit `NO_PATCH` sans correction de code. La présente session a consisté en relecture des documents maîtres, inspection du code réel, mise à jour documentaire et génération du ZIP final.
