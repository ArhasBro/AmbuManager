# RESULTATS

## 1. Decision patch

- `NO_PATCH`

Motif :
- la validation du bloc BDD ne met en evidence aucun residuel bloquant necessitant un correctif de code ;
- la derive schema/base constatee en `BDD-01` reste corrigee apres `BDD-LOT-02`.

## 2. Perimetre reellement controle

### Fichiers et dossiers verifies
- `prisma/schema.prisma`
- `prisma/migrations/`
- `prisma/seed.ts`
- `prisma.config.ts`
- `.env`
- `docs/BDD_OPERATIONS_SENSIBLES.md`
- dossier documentaire `docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-03_A18_BDD-03/`

### Base locale verifiee
- PostgreSQL `ambulance_db`
- schema `public`
- `16` tables `BASE TABLE`
- `25` migrations appliquees
- derniere migration constatee : `20260416143000_add_login_audit_log`

## 3. Constat de validation

### Points conformes
- `npx prisma validate` confirme un schema Prisma valide.
- `npx prisma migrate status` confirme `25 migrations found in prisma/migrations` et `Database schema is up to date!`.
- `npx prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma --exit-code` retourne `No difference detected.`
- `prisma.config.ts` charge bien `DATABASE_URL` et supporte `SHADOW_DATABASE_URL` via l'environnement.
- `.env` contient `DATABASE_URL`, `SEED_ADMIN_PASSWORD` et `SEED_USER_PASSWORD`, ce qui permet l'execution normale du seed local.
- `npx prisma db seed` se relance avec succes.
- le seed preserve le tenant A deja rattache a `admin@ambulance.local` :
  - `Company preserved: SC Ambulances ... (matched by admin-email)`
- la base locale reste coherente avec la documentation BDD sensible :
  - `SC Ambulances` et `Ambulance Manager - B` presentes ;
  - `0` compte support seed en l'absence des variables `SEED_SUPPORT_*`.
- `npm run lint` et `npm run build` passent.

### Points non conformes
- aucun point non conforme bloquant n'a ete constate dans le perimetre `BDD-03`.

### Points a confirmer
- `SHADOW_DATABASE_URL` n'est pas renseignee dans `.env`, donc le diff Prisma direct `migrations -> datasource` reste indisponible dans l'environnement courant.
- ce point est deja documente comme optionnel dans `docs/BDD_OPERATIONS_SENSIBLES.md` et ne remet pas en cause les validations terminales obligatoires de `BDD-03`.

## 4. Validations terminales

### Commandes executees et resultats exacts
- `npx prisma validate` : `OK`
- `npx prisma generate` : `OK`
- `npx prisma migrate status` : `OK` / base `ambulance_db` a jour / `25 migrations found in prisma/migrations`
- `npx prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma --exit-code` : `OK` / `No difference detected.`
- `npx prisma migrate diff --from-migrations prisma/migrations --to-config-datasource --script` : `NON EXECUTABLE DANS L'ENVIRONNEMENT COURANT`
- `npx prisma db seed` : `OK`
- lecture SQL `pg` en lecture seule : `OK`
- `npm run lint` : `OK`
- `npm run build` : `OK`

### Justification factuelle de l'impossibilite constatee
- message retourne par Prisma :
  - `Error: You must pass the --shadow-database-url flag or set datasource.shadowDatabaseUrl in your prisma.config.ts if you want to diff a migrations directory.`
- cause constatee dans le depot :
  - `prisma.config.ts` reference bien `process.env.SHADOW_DATABASE_URL`, mais la variable n'est pas renseignee dans `.env`.

## 5. Traitement correctif eventuel

- `AUCUN`
- aucun patch principal `.diff` n'a ete genere ni applique car aucun residuel bloquant n'a ete prouve.

## 6. Verdict de session

- `BDD-03 validee`

Motif :
- le bloc BDD controle est coherent entre schema Prisma, migrations, base locale et seed dans l'environnement reel verifie ;
- toutes les validations terminales obligatoires demandees pour la session passent ;
- le seul point restant est un controle complementaire optionnel lie a une `SHADOW_DATABASE_URL` non provisionnee.

## 7. Livrables production

- `PATCH/NO_PATCH.md`
- documentation finale de session :
  - `SESSION.md`
  - `NOTES.md`
  - `EVIDENCES.md`
  - `RESULTATS.md`
  - `FIN_SESSION.md`
- ZIP documentaire final attendu :
  - `SESSION-20260424-03_A18_BDD-03_DOCS.zip`
