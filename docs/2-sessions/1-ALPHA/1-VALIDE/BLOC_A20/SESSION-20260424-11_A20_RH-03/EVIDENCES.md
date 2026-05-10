# EVIDENCES

Elements factuels utilises pendant la session.

---

## Sources utilisees

- `docs/1-master/DOCUMENT_MAITRE.md` : principes `CODE > DOCUMENTATION`, multi-tenant, API homogene et validation sans preuve interdite.
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md` : bloc A20, sessions `RH-01`, `RH-LOT-02`, `RH-03`, `CLOTURE_A20`.
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md` : absent.
- `docs/2-sessions/1-ALPHA/BLOC_A20/SESSION-20260424-09_A20_RH-01/RESULTATS.md` : audit incomplet avant lot RH.
- `docs/2-sessions/1-ALPHA/BLOC_A20/SESSION-20260424-10_A20_RH-LOT-02/RESULTATS.md` : patch RH produit.
- `docs/2-sessions/1-ALPHA/BLOC_A20/SESSION-20260424-10_A20_RH-LOT-02/EVIDENCES.md` : preuves de validation du lot precedent.
- `docs/2-sessions/1-ALPHA/BLOC_A20/SESSION-20260424-10_A20_RH-LOT-02/FIN_SESSION.md` : validations terminales finales du lot precedent.
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md` : sections `05.2 Creation d'un utilisateur`, `05.6 Gestion des indisponibilites / absences`, `04.6 Rattachement d'un utilisateur a une base`.
- `docs/1-master/RECAP_DISCUSSIONS.md` : liste des besoins remontes, dont demandes d'absence, stagiaires, creation utilisateur avec nom / prenom / initiales et horaires journaliers avec cadrage legal separe.
- `docs/1-master/REGISTRE_DECISIONS.md` : integration future des sujets RH avances.

## Preuves code controlees

- `prisma/schema.prisma` contient sur `User` : `firstName`, `lastName`, `initials`, `phone`, `isTrainee`, `dailyWorkStartTime`, `dailyWorkEndTime`.
- `prisma/schema.prisma` contient `UserAbsence` avec `companyId`, `userId`, `reason`, `startAt`, `endAt`.
- `prisma/migrations/20260424100000_a20_rh_lot02_user_rh_fields/migration.sql` ajoute les colonnes RH utilisateur et l'index `User_companyId_isTrainee_idx`.
- `lib/validators/user.ts` valide les nouveaux champs RH, l'identite minimale et les horaires journaliers par paire au format `HH:mm`.
- `app/api/users/route.ts` expose, recherche et cree les champs RH utilisateur ; la creation verifie la base active et la delegation des permissions sensibles.
- `app/api/users/[id]/route.ts` expose et modifie les champs RH utilisateur ; les changements sont traces via `writePersonalDataAudit`.
- `app/users/user-creation-client.tsx` contient les controles UI de creation enrichie : prenom, nom, initiales, telephone, role, permissions, base, statut actif, stagiaire, horaires journaliers et mot de passe initial.
- `app/users/users-list-client.tsx` affiche les champs RH : initiales, telephone, stagiaire/titulaire, horaires journaliers et base.
- `lib/services/users/user-absence.ts` controle l'appartenance tenant, les intervalles invalides, les chevauchements et l'audit personnel sur creation/modification/suppression.
- `app/api/users/[id]/absences/route.ts` et `app/api/users/[id]/absences/[absenceId]/route.ts` exposent les operations d'absence en API.
- `lib/services/planning/assign-shift.ts`, `lib/services/planning/assign-draftshift.ts`, `lib/services/planning/matching.service.ts` et `app/api/planning/autoschedule/runs/[id]/publish/route.ts` consultent les absences pour bloquer ou eviter des affectations incompatibles.

## Validations terminales realisees

1. `npx.cmd prisma validate`

Resultat : exit code 0.

Sortie exacte :

```text
The schema at prisma\schema.prisma is valid 🚀
Loaded Prisma config from prisma.config.ts.

Prisma schema loaded from prisma\schema.prisma.
```

2. `npm.cmd run lint`

Resultat : exit code 0.

Sortie exacte :

```text
> ambulance-manager@0.1.0 lint
> eslint .
```

3. `npx.cmd prisma generate`

Premier lancement : exit code 1.

Cause factuelle : acces reseau sandbox bloque vers `https://binaries.prisma.sh/all_commits/75cbdc1eb7150937890ad5465d861175c6624711/windows/schema-engine.exe.gz.sha256`.

Sortie exacte :

```text
Loaded Prisma config from prisma.config.ts.

Error: request to https://binaries.prisma.sh/all_commits/75cbdc1eb7150937890ad5465d861175c6624711/windows/schema-engine.exe.gz.sha256 failed, reason:
```

Relance autorisee avec acces reseau : exit code 0.

Sortie exacte :

```text
✔ Generated Prisma Client (v7.7.0) to .\node_modules\@prisma\client in 351ms

Start by importing your Prisma Client (See: https://pris.ly/d/importing-client)


Loaded Prisma config from prisma.config.ts.

Prisma schema loaded from prisma\schema.prisma.
```

4. `npm.cmd run build`

Resultat : exit code 0.

Sortie principale exacte :

```text
> ambulance-manager@0.1.0 build
> next build

▲ Next.js 16.1.6 (Turbopack)
- Environments: .env

  Creating an optimized production build ...
✓ Compiled successfully in 9.4s
  Running TypeScript ...
  Collecting page data using 15 workers ...
  Generating static pages using 15 workers (0/29) ...
  Generating static pages using 15 workers (7/29)
  Generating static pages using 15 workers (14/29)
  Generating static pages using 15 workers (21/29)
✓ Generating static pages using 15 workers (29/29) in 405.1ms
  Finalizing page optimization ...
```

Routes RH presentes dans la sortie build :

- `/api/users`
- `/api/users/[id]`
- `/api/users/[id]/absences`
- `/api/users/[id]/absences/[absenceId]`
- `/users`
