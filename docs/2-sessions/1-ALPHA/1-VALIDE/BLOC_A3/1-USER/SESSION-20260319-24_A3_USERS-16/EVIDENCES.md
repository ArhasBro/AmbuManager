# EVIDENCES — SESSION-20260319-24_A3_USERS-16

## Sources utilisées
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/4-templates/*`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-09_A3_USERS-01` à `SESSION-20260319-23_A3_USERS-15`
- `docs/3-patches/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-09_A3_USERS-01` à `SESSION-20260319-23_A3_USERS-15`

## Code réel contrôlé
### Module users présent
- `app/api/users/route.ts`
- `app/api/users/[id]/route.ts`
- `app/api/users/[id]/archive/route.ts`
- `app/api/users/[id]/depot/route.ts`
- `app/api/users/[id]/absences/route.ts`
- `app/api/users/[id]/absences/[absenceId]/route.ts`
- `app/users/page.tsx`
- `app/users/users-list-client.tsx`
- `app/users/user-creation-client.tsx`
- `app/users/user-edit-client.tsx`
- `app/users/user-archive-client.tsx`
- `app/users/user-depot-assignment-client.tsx`
- `app/users/user-absence-client.tsx`
- `lib/services/users/archive-user.ts`
- `lib/services/users/assign-user-depot.ts`
- `lib/services/users/user-absence.ts`
- `lib/validators/user.ts`
- `lib/validators/user-absence.ts`

### Permissions / planning contrôlés
- `lib/permission-catalog.ts`
- `lib/permissions.ts`
- `app/api/planning/shifts/route.ts`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `lib/services/planning/assign-draftshift.ts`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/autoschedule-match.ts`
- `lib/services/planning/matching.service.ts`
- `lib/services/planning/matching-quality.ts`

## Constats prouvés
### 1. Administration users réellement présente
- la liste utilisateurs filtre `companyId`, `isActive: true`, `platformRole: null` et `role != null` dans `app/api/users/route.ts` ;
- la création utilisateur existe réellement via `POST /api/users` ;
- la modification utilisateur + permissions existe réellement via `PATCH /api/users/[id]` ;
- l’archivage est logique via `isActive: false` dans `lib/services/users/archive-user.ts` ;
- le rattachement à une base existe via `PATCH /api/users/[id]/depot` ;
- les absences sont persistées dans `UserAbsence` et exposées via l’API dédiée ;
- l’UI `users` charge tous les composants réels sur `app/users/page.tsx`.

### 2. Consultation planning selon permissions réellement présente
- `lib/permissions.ts` expose `canViewSelfPlanning` et `canViewGlobalPlanning` ;
- `app/api/planning/shifts/route.ts` refuse l’accès sans permission de lecture planning ;
- la même route bloque explicitement l’ouverture du planning d’un collègue sans permission globale ;
- `app/planning/page.tsx` prépare soit l’utilisateur courant seul, soit une liste d’utilisateurs consultables ;
- `app/planning/planning-client.tsx` affiche un sélecteur collègue uniquement si `canViewGlobal` est vrai.

### 3. Résiduel structurant sur l’intégration des absences
- `prisma/schema.prisma` contient bien `model UserAbsence` ;
- `lib/services/users/user-absence.ts` gère uniquement le CRUD absences côté module `users` ;
- aucune occurrence de `UserAbsence`, `userAbsence`, `absence` ou `indispon` n’a été trouvée dans :
  - `lib/services/planning/assign-draftshift.ts`
  - `lib/services/planning/assign-shift.ts`
  - `lib/services/planning/autoschedule-match.ts`
  - `lib/services/planning/matching.service.ts`
  - `lib/services/planning/matching-quality.ts`
  - `app/api/planning/shifts/route.ts`
  - `app/api/planning/autoschedule/**`
- ce constat confirme qu’une absence déclarée dans `users` n’est pas encore intégrée dans la logique de planification / matching / autoschedule.

### 4. Sessions / patchs réellement vérifiés
- `USERS-01` : audit, `NO_PATCH` présent.
- `USERS-02` : validation liste, `NO_PATCH` présent.
- `USERS-03` : patchs réels présents pour stabilisation liste.
- `USERS-04` : patchs réels présents pour API création utilisateur.
- `USERS-05` : patch réel présent pour UI création utilisateur.
- `USERS-06` : patch réel présent pour API modification utilisateur.
- `USERS-07` : patch réel présent pour UI modification utilisateur.
- `USERS-08` : patch réel présent pour archivage logique.
- `USERS-09` : `NO_PATCH` documenté sur vérification absence de suppression physique.
- `USERS-10` : patchs réels présents pour rôle principal + permissions à l’édition.
- `USERS-11` : patch réel présent pour rattachement base.
- `USERS-12` : `NO_PATCH` documenté pour audit absences.
- `USERS-13` : patch réel Prisma/API absences présent.
- `USERS-14` : patch réel UI absences présent.
- `USERS-15` : patchs réels présents pour consultation planning permissionnée.

## Validations terminales
### Relance locale actuelle
```text
$ npm run lint
> ambulance-manager@0.1.0 lint
> eslint .
sh: 1: eslint: not found

$ npm run build
> ambulance-manager@0.1.0 build
> next build
sh: 1: next: not found
```

### Constat complémentaire
- `package.json` déclare bien `eslint` et `next`, mais `node_modules` est absent dans l’environnement extrait.
- Les traces documentaires précédentes montrent des validations réussies sur plusieurs sessions, notamment `USERS-13`, `USERS-14` et `USERS-15`.
