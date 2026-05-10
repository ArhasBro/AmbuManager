# EVIDENCES

## Sources utilisees

### Documentation officielle reellement relue
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/3-templates/TEMPLATE_DEBUT_SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-01_A18_BDD-01/SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-01_A18_BDD-01/NOTES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-01_A18_BDD-01/EVIDENCES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-01_A18_BDD-01/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-01_A18_BDD-01/FIN_SESSION.md`

### Code reellement inspecte / modifie
- `prisma/schema.prisma`
- `prisma/seed.ts`
- `prisma.config.ts`
- `.env`
- `prisma/migrations/20260224175839_init/migration.sql`
- `prisma/migrations/20260407120000_tpl07_13_templates_admin_module/migration.sql`
- `docs/BDD_OPERATIONS_SENSIBLES.md`

## Commandes reellement executees

### 1. Verification pre-patch utile
Commande :
```text
node (pg) : SELECT u.email, c.name AS company_name ...
```

Resultat exact :
```json
[
  { "email": "admin@ambulance.local", "company_name": "SC Ambulances" },
  { "email": "admin-b@ambulance.local", "company_name": "Ambulance Manager - B" },
  { "email": "planner@ambulance.local", "company_name": "SC Ambulances" },
  { "email": "planner-b@ambulance.local", "company_name": "Ambulance Manager - B" }
]
```

### 2. Patch principal
Commandes :
```text
git apply --check docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-02_A18_BDD-LOT-02/PATCH/PATCH__SESSION-20260424-02_A18_BDD-LOT-02.diff
git apply docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-02_A18_BDD-LOT-02/PATCH/PATCH__SESSION-20260424-02_A18_BDD-LOT-02.diff
```

Resultat :
- `git apply --check` : **OK**
- `git apply` : **OK**

### 3. Validations terminales
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

Commande :
```text
npx prisma generate
```

Resultat determinant :
- Prisma Client genere avec succes (`v7.7.0`)

Commande :
```text
npx prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma --exit-code
```

Resultat exact :
```text
No difference detected.

Loaded Prisma config from prisma.config.ts.
```

Code retour :
- `0`

Commande :
```text
npx prisma db seed
```

Resultats determinants :
- `Company preserved: SC Ambulances ... (matched by admin-email)`
- `Company preserved: Ambulance Manager - B ... (matched by admin-email)`
- `Seed OK (support + A/B ready for DoD 4.4 tests)`
- message informatif final : le compte support reste non seed car `SEED_SUPPORT_*` ne sont pas definies

Commande :
```text
npx prisma migrate diff --from-migrations prisma/migrations --to-config-datasource --script
```

Resultat exact :
```text
Loaded Prisma config from prisma.config.ts.

Error: You must pass the `--shadow-database-url` flag or set `datasource.shadowDatabaseUrl` in your `prisma.config.ts` if you want to diff a migrations directory.
```

Interpretation factuelle :
- le code supporte desormais `SHADOW_DATABASE_URL` ;
- aucune shadow database reelle n'est fournie dans l'environnement courant, donc le diff reste non executable.

Commande :
```text
npm run lint
```

Resultat :
- **OK**

Commande :
```text
npm run build
```

Resultat determinant :
- build Next.js terminee avec succes ;
- environnement charge : `.env`.

### 4. Verification post-seed
Commande :
```text
node (pg) : SELECT name FROM "Company" ORDER BY name;
```

Resultat exact :
```json
[
  { "name": "Ambulance Manager - B" },
  { "name": "SC Ambulances" }
]
```

Conclusion :
- aucun doublon `Ambulance Manager` n'a ete cree ;
- le tenant A audite reste `SC Ambulances`.
