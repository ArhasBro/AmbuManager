# EVIDENCES — SESSION-20260319-21_A3_USERS-13

## Sources relues pour la session
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
- `docs/2-sessions/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-20_A3_USERS-12/*`

## Références documentaires de cadrage
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md` : le module users doit couvrir la gestion des indisponibilités / absences.
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md` : `USERS-13` est explicitement la session `API indisponibilités / absences`, avant `USERS-14` pour l’UI.
- `docs/2-sessions/.../USERS-12/*` : absence confirmée de modèle / API / UI dédiée avant la présente session.

## Fichiers applicatifs réellement ajoutés / modifiés par USERS-13
- `prisma/schema.prisma`
- `prisma/migrations/20260320190000_users13_add_user_absence_model/migration.sql`
- `lib/validators/user-absence.ts`
- `lib/services/users/user-absence.ts`
- `app/api/users/[id]/absences/route.ts`
- `app/api/users/[id]/absences/[absenceId]/route.ts`

## Preuves fonctionnelles issues du code validé
- `prisma/schema.prisma` : ajout du modèle `UserAbsence` et des relations depuis `Company` et `User`.
- `lib/validators/user-absence.ts` : validation des payloads de liste / création / modification avec garde-fous sur les dates.
- `lib/services/users/user-absence.ts` : contrôle multi-tenant, vérification de l’utilisateur cible et détection de chevauchement.
- `app/api/users/[id]/absences/route.ts` : exposition API liste / création avec RBAC `canManageUsers`.
- `app/api/users/[id]/absences/[absenceId]/route.ts` : exposition API modification / suppression avec RBAC `canManageUsers`.

## Contrôle final validé
Le contrôle qualité final a retenu les validations terminales suivantes comme **OK** sur le code réellement présent :
- `npx prisma validate` : OK ;
- `npx prisma generate` : OK ;
- `npm run lint` : OK ;
- `npm run build` : OK.

## Interprétation des messages de réapplication du patch
Des messages de type `patch does not apply` / `already exists in working directory` ont pu apparaître lors d’une tentative de réapplication du diff principal. Leur signification retenue est la suivante :
- le patch ciblé était déjà intégré dans l’arbre de travail ;
- les fichiers attendus existaient déjà ;
- ces messages ne remettent pas en cause la conformité du code final ;
- le contrôle final validé doit être lu sur l’état réel du dépôt, pas sur une réapplication redondante d’un diff déjà absorbé.

## Consistance de périmètre
- aucune UI ajoutée ;
- aucune refonte planning ;
- aucune extension vers USERS-14 ou USERS-15 ;
- aucun fix code supplémentaire requis après validation finale.
