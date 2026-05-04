# EVIDENCES

Elements factuels utilises pendant la session.

---

## Sources utilisees

### Documentation officielle lue
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/3-templates/TEMPLATE_DEBUT_SESSION.md`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md` (extraits cibles)
- `docs/1-master/ETAT_GLOBAL_PROJET.md` (extraits cibles)
- `docs/1-master/REGISTRE_DECISIONS.md` (extraits cibles)
- `docs/1-master/RECAP_DISCUSSIONS.md` (extraits cibles)

### Fichiers session lus
- `docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-09_A23_A23-ROLES-RH-09/SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-09_A23_A23-ROLES-RH-09/NOTES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-09_A23_A23-ROLES-RH-09/EVIDENCES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-09_A23_A23-ROLES-RH-09/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-09_A23_A23-ROLES-RH-09/FIN_SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-09_A23_A23-ROLES-RH-09/PATCH/NO_PATCH.md`

### Code inspecte (lecture seule)
- `prisma/schema.prisma`
- `app/api/users/route.ts`
- `app/api/users/[id]/route.ts`
- `app/api/users/[id]/archive/route.ts`
- `app/api/users/[id]/absences/[absenceId]/route.ts`
- `lib/services/users/archive-user.ts`
- `lib/services/users/user-absence.ts`
- `lib/validators/user.ts`
- `lib/permissions.ts`
- `app/api/company/profile/route.ts`
- `app/company/company-profile-form.tsx`
- `app/company/page.tsx`
- `lib/validators/company-profile.ts`
- `lib/services/depots/archive-depot.ts`
- `lib/services/vehicles/archive-vehicle.ts`
- `lib/services/templates/archive-template.ts`

---

## Commandes de consultation executees

- `Get-ChildItem -Force`
- `Get-ChildItem -Force docs/1-master`
- `Get-ChildItem -Force docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-09_A23_A23-ROLES-RH-09`
- `Get-Content -Raw <fichiers .md cibles>`
- `Select-String -Path docs/1-master/*.md -Pattern "..."`
- `Get-Content` avec affichage de plages de lignes pour preuves cibles
- `Get-ChildItem -Recurse -File ... | Select-String -Pattern "PSC1|GERANT|archive|delete|..."`

Note outillage : `rg` non executable dans cet environnement (`Acces refuse`), remplacement par `Select-String`.

---

## Extraits de preuve determinant (synthese)

- Cadrage roles : `GERANT, ADMIN, REGULATEUR, BUREAU, ADE, AA, TAXI` (pas de `PSC1`).
- Cadrage RH avance : hors perimetre ALPHA immediat (vision long terme).
- Cadrage suppression : priorite a l'archivage logique, suppression definitive exceptionnelle/encadree.
- Plan A23 : session `A23-ROLES-RH-09` = arbitrage ALPHA/BETA/backlog sans ajout de champ/role.
- Code reel : pas de `PSC1`, multi-gerants techniquement possible, archivage logique generalise, deletion physique tres limitee.
