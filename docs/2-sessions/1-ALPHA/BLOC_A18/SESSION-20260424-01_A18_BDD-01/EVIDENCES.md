# EVIDENCES

## Sources utilisees

### Documentation officielle reellement relue
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/3-templates/TEMPLATE_DEBUT_SESSION.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`

### Code reellement inspecte
- `prisma.config.ts`
- `prisma/schema.prisma`
- `prisma/seed.ts`
- `prisma/migrations/migration_lock.toml`
- `prisma/migrations/*/migration.sql`
- `.env`
- `scripts/db-backup.ps1`
- `scripts/db-restore.ps1`
- `lib/permission-catalog.ts`

## Commandes reellement executees

### 1. Validation du schema Prisma
Commande :
```text
npx prisma validate
```

Resultat exact :
```text
The schema at prisma\schema.prisma is valid 🚀
Loaded Prisma config from prisma.config.ts.

Prisma schema loaded from prisma\schema.prisma.
```

### 2. Statut des migrations sur la base locale
Commande :
```text
npx prisma migrate status
```

Resultat exact :
```text
Datasource "db": PostgreSQL database "ambulance_db", schema "public" at "localhost:5432"

25 migrations found in prisma/migrations

Database schema is up to date!
Loaded Prisma config from prisma.config.ts.

Prisma schema loaded from prisma\schema.prisma.
```

### 3. Diff explicite base locale -> schema Prisma
Commande :
```text
npx prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma --exit-code
```

Resultat exact :
```text
[*] Changed the `ShiftTemplate` table
  [*] Altered column `secondaryAllowedRoles` (default changed from `Some(Value(List([])))` to `None`)

[*] Changed the `User` table
  [-] Removed foreign key on columns (companyId)
  [+] Added foreign key on columns (companyId)
Loaded Prisma config from prisma.config.ts.
```

Code retour :
- `2`

### 4. Diff direct migrations -> datasource
Commande :
```text
npx prisma migrate diff --from-migrations prisma/migrations --to-config-datasource --script
```

Resultat exact :
```text
Loaded Prisma config from prisma.config.ts.

Error: You must pass the `--shadow-database-url` flag or set `datasource.shadowDatabaseUrl` in your `prisma.config.ts` if you want to diff a migrations directory.
```

### 5. Introspection lecture seule de la base locale
Commande :
```text
npx prisma db pull --print
```

Resultat determinant observe :
- `User.company` introspecte avec `onDelete: Restrict`
- `ShiftTemplate.secondaryAllowedRoles` introspecte avec `@default([])`
- avertissement Prisma :
  - `User_role_scope_check` n'est pas pleinement supporte dans Prisma Client

### 6. Lecture SQL de la base locale
Lecture `pg` executee en lecture seule.

Resultats observes :
- base : `ambulance_db`
- schema : `public`
- version : `PostgreSQL 16.12`
- tables : 16
- migrations : 25
- rollback constates : 0
- derniere migration : `20260416143000_add_login_audit_log`

Comptages observes :
- `Company` : 2
- `User` : 6
- `Permission` : 18
- `UserPermission` : 24
- `Vehicle` : 4
- `ShiftTemplate` : 9
- `Depot` : 2
- `AutoScheduleRun` : 20
- `DraftShift` : 273
- `Shift` : 86
- `PlanningAuditLog` : 33
- `LoginAuditLog` : 5
- `UserAbsence` : 0

### 7. Verification d'environnement seed
Lecture Node + dotenv executee sans ecriture.

Resultat exact :
```json
{
  "required": {
    "DATABASE_URL": true,
    "SEED_ADMIN_PASSWORD": true,
    "SEED_USER_PASSWORD": false,
    "SEED_ADMIN_B_PASSWORD": false,
    "ALLOW_INSECURE_SEED_DEFAULTS": null,
    "SEED_SUPPORT_NAME": false,
    "SEED_SUPPORT_EMAIL": false,
    "SEED_SUPPORT_PASSWORD": false
  },
  "seedUserPasswordMissingWouldThrow": true
}
```

## Extraits de code determinants

### 1. Configuration Prisma
`prisma.config.ts:4-12`
- schema : `./prisma/schema.prisma`
- migrations : `./prisma/migrations`
- seed : `tsx prisma/seed.ts`
- datasource : `process.env.DATABASE_URL`

### 2. Ecart `User.company`
`prisma/schema.prisma:175-183`
- relation optionnelle `company` sans `onDelete`

`prisma/migrations/20260224175839_init/migration.sql:62-63`
- FK `User_companyId_fkey` creee avec `ON DELETE RESTRICT`

`npx prisma db pull --print`
- relation introspectee avec `onDelete: Restrict`

### 3. Ecart `ShiftTemplate.secondaryAllowedRoles`
`prisma/schema.prisma:281-290`
- `secondaryAllowedRoles Role[]`

`prisma/migrations/20260407120000_tpl07_13_templates_admin_module/migration.sql:5-10`
- colonne ajoutee avec `DEFAULT ARRAY[]::"Role"[]`

`npx prisma db pull --print`
- champ introspecte avec `@default([])`

### 4. Seed
`prisma/seed.ts:16-27`
- `readSeedPassword()` leve une erreur si la variable manque et si `ALLOW_INSECURE_SEED_DEFAULTS` n'est pas a `true`

`prisma/seed.ts:44-60`
- compte support seulement si les trois variables `SEED_SUPPORT_*` sont toutes presentes

`prisma/seed.ts:286-290`
- lecture de `SEED_ADMIN_PASSWORD`
- fallback `SEED_ADMIN_B_PASSWORD`
- lecture obligatoire de `SEED_USER_PASSWORD`

`prisma/seed.ts:312-387`
- seed cible les societes `Ambulance Manager` et `Ambulance Manager - B`

`.env:12-15`
- `DATABASE_URL` present
- `NEXTAUTH_URL` present
- `NEXTAUTH_SECRET` present
- `SEED_ADMIN_PASSWORD` present
- aucune preuve dans `.env` de `SEED_USER_PASSWORD`
- aucune preuve dans `.env` de `ALLOW_INSECURE_SEED_DEFAULTS`

### 5. Contraintes SQL non portees integralement par le schema Prisma
`prisma/migrations/20260318203000_sup02_platform_support_role/migration.sql:11-25`
- ajout du `CHECK` `User_role_scope_check`

`prisma/migrations/20260407093000_tpl03_enforce_template_company_integrity/migration.sql`
- fonctions SQL + triggers de garde sur `DraftShift`, `Shift`, `ShiftTemplate`

Verification SQL reelle :
- `User_role_scope_check` existe en base
- triggers presents :
  - `DraftShift_template_company_guard`
  - `Shift_template_company_guard`
  - `ShiftTemplate_company_update_guard`

## Elements reels de base locale

### Societes observees
- `SC Ambulances`
- `Ambulance Manager - B`

### Utilisateurs observes
- `admin@ambulance.local`
- `admin-b@ambulance.local`
- `justine.28062001@gmail.com`
- `planner@ambulance.local`
- `planner-b@ambulance.local`
- `viewer@ambulance.local`

Constat :
- aucun utilisateur `platformRole=SUPPORT` observe dans la base locale controlee.
