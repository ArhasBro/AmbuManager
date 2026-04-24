# EVIDENCES

Elements factuels utilises pendant la session.

---

## Sources utilisees

Documentation obligatoire :

- `docs/1-master/DOCUMENT_MAITRE.md` : principes non negociables, priorite `CODE > DOCUMENTATION`, API uniforme, cloture de bloc.
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md` : bloc A20, session `RH-01`, session attendue `RH-LOT-02`, verdict obligatoire AUDIT.
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md` : absent lors du controle (`TEMPLATE_DEBUT_SESSION.md absent`).

Documentation complementaire utile :

- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md` : creation utilisateur avec prenom, nom, email, telephone, role principal, permissions, base, statut actif/inactif, mot de passe initial ; gestion des indisponibilites / absences ; donnees RH avancees.
- `docs/1-master/RECAP_DISCUSSIONS.md` : besoins remontes incluant demandes d'absence, gestion des stagiaires, creation utilisateur avec nom/prenom/initiales, horaires journaliers avec cadrage legal separe.
- `docs/1-master/REGISTRE_DECISIONS.md` : integration future des demandes d'absence, stagiaires, enrichissement utilisateurs et horaires journaliers.

Code et mecanismes examines :

- `prisma/schema.prisma` :
  - `User` observe avec `email`, `password`, `name`, `role`, `companyId`, `depotId`, `isActive` ;
  - `UserAbsence` observe avec `companyId`, `userId`, `reason`, `startAt`, `endAt` ;
  - `ShiftTemplate`, `DraftShift` et `Shift` portent des horaires de planning, pas des horaires journaliers RH utilisateur.
- `lib/validators/user.ts` :
  - `createUserBodySchema` accepte `email`, `password`, `name`, `role` seulement ;
  - `updateUserBodySchema` accepte `email`, `name`, `role`, `permissionCodes`.
- `app/api/users/route.ts` :
  - creation utilisateur par `POST /api/users` avec `email`, `password`, `name`, `role`, `companyId`.
- `app/api/users/[id]/route.ts` :
  - edition utilisateur avec `name`, `email`, `role`, `permissionCodes`.
- `app/users/user-creation-client.tsx` :
  - formulaire de creation avec nom complet, email, role et mot de passe initial.
- `app/users/user-edit-client.tsx` :
  - edition nom, email, role principal et permissions applicatives ALPHA.
- `app/users/user-absence-client.tsx` :
  - UI minimale de lecture, creation, modification et suppression des absences pour l'utilisateur selectionne.
- `app/api/users/[id]/absences/route.ts` et `app/api/users/[id]/absences/[absenceId]/route.ts` :
  - routes GET/POST/PATCH/DELETE des absences, avec controle `canManageUsers`.
- `lib/services/users/user-absence.ts` :
  - verification utilisateur actif du tenant, controle de chevauchement, transactions, audit personnel.
- `lib/services/planning/user-absence.ts` :
  - lecture des fenetres d'absence et detection de chevauchement pour le planning.
- `lib/services/planning/assign-shift.ts`, `lib/services/planning/assign-draftshift.ts`, `lib/services/planning/matching.service.ts` :
  - prise en compte de `USER_ABSENCE_CONFLICT`, conflits horaires et repos minimum.
- `lib/company-rules/catalog.ts` :
  - `MIN_REST_BETWEEN_SHIFTS` branche ;
  - `EMPLOYEE_UNAVAILABILITY` marque `PREPARED`, sans cle de stockage dediee observee.

Commandes lancees et resultats :

- `Get-Content -LiteralPath .\docs\1-master\DOCUMENT_MAITRE.md` : exit code 0 ; document lu.
- `Get-Content -LiteralPath .\docs\1-master\PLAN_DE_DEVELOPPEMENT.md` : exit code 0 ; document lu.
- `if (Test-Path -LiteralPath .\docs\4-templates\TEMPLATE_DEBUT_SESSION.md) { Get-Content ... } else { 'TEMPLATE_DEBUT_SESSION.md absent' }` : exit code 0 ; sortie exacte `TEMPLATE_DEBUT_SESSION.md absent`.
- `rg --files` : exit code 0 ; inventaire repo obtenu.
- `rg` cibles sur absences, stagiaires, horaires, creation utilisateur : exit code 0 ; occurrences pertinentes observees, aucune occurrence code probante pour stagiaires.
- `npx prisma validate` : exit code 1 ; echec PowerShell avant Prisma, sortie : `Impossible de charger le fichier C:\Program Files\nodejs\npx.ps1, car l'execution de scripts est desactivee sur ce systeme.`
- `npx.cmd prisma validate` : exit code 0 ; sortie principale : `The schema at prisma\schema.prisma is valid`, config chargee depuis `prisma.config.ts`, schema charge depuis `prisma\schema.prisma`, information de mise a jour Prisma `7.7.0 -> 7.8.0`.
- `Test-Path -LiteralPath ...\LIVRABLES__SESSION-20260424-09_A20_RH-01_A_PLAT.zip` : exit code 0 ; sortie exacte `False` avant generation.
- Generation ZIP documentaire final : exit code 0 ; archive creee dans `docs/2-sessions/1-ALPHA/BLOC_A20/SESSION-20260424-09_A20_RH-01/PATCH/`.
- Lecture du contenu ZIP via `System.IO.Compression.ZipFile` : exit code 0 ; entrees observees `EVIDENCES.md`, `FIN_SESSION.md`, `NOTES.md`, `NO_PATCH.md`, `RESULTATS.md`, `SESSION.md`.

Commandes non lancees :

- `npm run build` : non lance, car session AUDIT sans patch code et validation statique ciblee suffisante pour le constat.
- `npm run lint` : non lance, car session AUDIT sans patch code.
- `npm run test:quality` : non lance, car aucun scenario de correction ou regression code n'a ete introduit.
