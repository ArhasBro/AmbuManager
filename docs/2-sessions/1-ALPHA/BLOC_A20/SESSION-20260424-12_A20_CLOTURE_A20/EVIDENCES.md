# EVIDENCES

Elements factuels utilises pendant la session.

---

## Sources utilisees

### Documentation projet relue (obligatoire)
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md` : fichier absent constate (`MISSING_TEMPLATE`).

### Sessions A20 relues (base de cloture)
- `docs/2-sessions/1-ALPHA/BLOC_A20/SESSION-20260424-09_A20_RH-01/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A20/SESSION-20260424-10_A20_RH-LOT-02/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A20/SESSION-20260424-11_A20_RH-03/RESULTATS.md`

### Documentation complementaire utile
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md` (sections module users : creation utilisateur, modification utilisateur, gestion indisponibilites / absences)
- `docs/1-master/RECAP_DISCUSSIONS.md` (priorites post-ALPHA et rappel A20 : demandes d'absence, stagiaires, creation prenom/nom/initiales, horaires journaliers)

### Code reel controle
- `prisma/schema.prisma`
- `prisma/migrations/20260424100000_a20_rh_lot02_user_rh_fields/migration.sql`
- `lib/validators/user.ts`
- `app/users/page.tsx`
- `app/users/user-creation-client.tsx`
- `app/users/users-list-client.tsx`
- `app/users/users-client-shared.ts`
- `app/users/user-edit-client.tsx`
- `app/users/user-absence-client.tsx`
- `app/api/users/route.ts`
- `app/api/users/[id]/route.ts`
- `app/api/users/[id]/absences/route.ts`
- `app/api/users/[id]/absences/[absenceId]/route.ts`
- `lib/services/users/user-absence.ts`
- `lib/services/planning/user-absence.ts`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/assign-draftshift.ts`
- `lib/services/planning/matching.service.ts`

## Preuves de controle code

- Champs RH utilisateur presents dans Prisma : `firstName`, `lastName`, `initials`, `phone`, `isTrainee`, `dailyWorkStartTime`, `dailyWorkEndTime`.
- Migration A20 RH-LOT-02 presente : `20260424100000_a20_rh_lot02_user_rh_fields`.
- Validation serveur creation/mise a jour users : controle identite et controle horaires journaliers par paire.
- Creation utilisateur enrichie branchee en UI + API (`user-creation-client.tsx` / `app/api/users/route.ts`).
- Liste users enrichie (recherche prenom/nom/initiales/telephone + affichage RH stagiaire/horaires).
- API absences users (`GET/POST/PATCH/DELETE`) presente et branchee sur service tenant-aware.
- Services planning consomment les absences utilisateurs dans les checks de conflits d'affectation/matching.

## Validations terminales executees

- `npm.cmd run lint` : exit code 0.
- `npm.cmd run build` : exit code 0.
- `npx.cmd prisma validate` : exit code 0.
- `npx.cmd prisma generate` :
  - tentative 1 exit code 1 (download Prisma engine impossible en sandbox reseau) ;
  - tentative 2 avec permission reseau elevee exit code 0.

## Contexte execution shell

- `npm run ...` et `npx ...` directs : bloques par policy PowerShell (`npm.ps1` / `npx.ps1`), donc utilisation des equivalents `npm.cmd` / `npx.cmd`.
