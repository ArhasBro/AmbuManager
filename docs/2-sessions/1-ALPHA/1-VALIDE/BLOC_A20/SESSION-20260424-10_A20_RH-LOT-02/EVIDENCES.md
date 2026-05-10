# EVIDENCES

## Sources lues

- `docs/1-master/DOCUMENT_MAITRE.md` : priorite `CODE > DOCUMENTATION`, format API, gouvernance patchs et preuves.
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md` : bloc A20, session `RH-LOT-02`.
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md` : absent.
- `docs/2-sessions/1-ALPHA/BLOC_A20/SESSION-20260424-09_A20_RH-01/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A20/SESSION-20260424-09_A20_RH-01/EVIDENCES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A20/SESSION-20260424-09_A20_RH-01/FIN_SESSION.md`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md` : section `05.2 Creation d'un utilisateur`, section `05.6 Gestion des indisponibilites / absences`, section `05.8 Donnees RH avancees`.
- `docs/1-master/RECAP_DISCUSSIONS.md` : besoins remontes `demandes d'absence`, `gestion des stagiaires`, `creation utilisateur avec nom / prenom / initiales`, `horaires journaliers avec cadrage legal separe`.
- `docs/1-master/REGISTRE_DECISIONS.md` : integration future de ces sujets.

## Preuves code avant patch

RH-01 avait etabli :

- `User` ne contenait que `name` comme identite utilisateur exploitable ;
- aucune colonne `firstName`, `lastName`, `initials`, `phone` n'etait presente sur `User` ;
- aucun champ ou role dedie aux stagiaires n'etait present ;
- aucun champ RH utilisateur pour horaires journaliers n'etait present ;
- `UserAbsence` et les routes absences existaient deja.

## Preuves code apres patch

- `prisma/schema.prisma` contient maintenant les champs RH utilisateur ajoutes.
- `prisma/migrations/20260424100000_a20_rh_lot02_user_rh_fields/migration.sql` cree les colonnes correspondantes.
- `lib/validators/user.ts` accepte les nouveaux champs a la creation et a la modification.
- `app/api/users/route.ts` expose, recherche et cree les nouveaux champs.
- `app/api/users/[id]/route.ts` expose et modifie les nouveaux champs.
- `app/users/user-creation-client.tsx` fournit le formulaire de creation enrichi.
- `app/users/users-list-client.tsx` affiche les informations RH ajoutees.

## Validations terminales realisees

1. `npx.cmd prisma validate`

Resultat : exit code 0.

Sortie principale :

- `The schema at prisma\schema.prisma is valid`
- `Loaded Prisma config from prisma.config.ts.`
- `Prisma schema loaded from prisma\schema.prisma.`

2. `npm.cmd run lint`

Resultat : exit code 0.

Sortie principale :

- `> ambulance-manager@0.1.0 lint`
- `> eslint .`

3. `npx.cmd prisma generate`

Premier lancement : exit code 1.

Sortie d'echec :

- `Error: request to https://binaries.prisma.sh/all_commits/75cbdc1eb7150937890ad5465d861175c6624711/windows/schema-engine.exe.gz.sha256 failed, reason:`

Relance avec autorisation reseau : exit code 0.

Sortie principale :

- `Generated Prisma Client (v7.7.0) to .\node_modules\@prisma\client in 323ms`
- `Loaded Prisma config from prisma.config.ts.`
- `Prisma schema loaded from prisma\schema.prisma.`

4. `npm.cmd run build`

Premier lancement : exit code 1.

Cause factuelle : Prisma Client non regenere ne connaissait pas encore `User.firstName`.

Sortie principale :

- `Type error: Object literal may only specify known properties, and 'firstName' does not exist in type 'UserSelect<DefaultArgs>'.`

Relance apres `npx.cmd prisma generate` : exit code 0.

Sortie principale :

- `Compiled successfully`
- `Running TypeScript ...`
- `Generating static pages using 15 workers (29/29)`
- liste des routes generees incluant `/api/users`, `/api/users/[id]`, `/users`.

5. `git apply --check --reverse docs/2-sessions/1-ALPHA/BLOC_A20/SESSION-20260424-10_A20_RH-LOT-02/PATCH/PATCH__SESSION-20260424-10_A20_RH-LOT-02.diff`

Resultat : exit code 0.

Objet : verification locale que le patch principal correspondait bien a l'etat deja applique du depot de travail post-patch utilise pendant la session.

Precision de tracabilite ajoutee apres controle qualite :

- cette preuve `--reverse` ne qualifie pas l'archive source `AmbuManager-main.zip` transmise au controle qualite ;
- `AmbuManager-main.zip` doit etre consideree comme une archive pre-patch ;
- sur cette archive source pre-patch, le patch principal est attendu en sens normal, pas en sens reverse ;
- la preuve `git apply --check --reverse` provient uniquement du depot local post-patch de production.

## Observation hors perimetre

`git status` signale une modification sur `docs/CMD.md` non realisee dans cette session. Elle n'est pas incluse dans le patch RH-LOT-02.
