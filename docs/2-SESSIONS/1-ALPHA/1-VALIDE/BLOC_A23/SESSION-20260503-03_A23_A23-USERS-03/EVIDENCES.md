# EVIDENCES

Elements factuels utilises pendant la session.

---

## Logs terminaux bruts / extraits precis

### 1) `git apply --check` / `git apply`

Commande executee (sequence neutre de preuve) :
```powershell
git restore -- app/users/user-creation-client.tsx app/users/user-edit-client.tsx
git apply --check docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-03_A23_A23-USERS-03/PATCH/PATCH__SESSION-20260503-03_A23_A23-USERS-03.diff
git apply docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-03_A23_A23-USERS-03/PATCH/PATCH__SESSION-20260503-03_A23_A23-USERS-03.diff
```
Sortie brute :
```text
APPLY_SEQUENCE_OK
```
Statut : `0`

### 2) `npx prisma validate`
Sortie brute :
```text
The schema at prisma\schema.prisma is valid 🚀
Loaded Prisma config from prisma.config.ts.

Prisma schema loaded from prisma\schema.prisma.
```
Statut : `0`

### 3) `npx prisma generate`
Sortie brute :
```text
✔ Generated Prisma Client (v7.7.0) to .\node_modules\@prisma\client in 507ms

Start by importing your Prisma Client (See: https://pris.ly/d/importing-client)


Loaded Prisma config from prisma.config.ts.

Prisma schema loaded from prisma\schema.prisma.
```
Statut : `0`

### 4) `npx prisma migrate status` (avant deploy, extrait historique de session)
Sortie brute :
```text
Datasource "db": PostgreSQL database "ambulance_db", schema "public" at "localhost:5432"

26 migrations found in prisma/migrations
Following migration have not yet been applied:
20260424100000_a20_rh_lot02_user_rh_fields

To apply migrations in development run prisma migrate dev.
To apply migrations in production run prisma migrate deploy.
Loaded Prisma config from prisma.config.ts.

Prisma schema loaded from prisma\schema.prisma.
```
Statut : `1`

### 5) `npx prisma migrate deploy`
Sortie brute (moment de correction) :
```text
Datasource "db": PostgreSQL database "ambulance_db", schema "public" at "localhost:5432"

26 migrations found in prisma/migrations

Applying migration `20260424100000_a20_rh_lot02_user_rh_fields`

The following migration(s) have been applied:

migrations/
  └─ 20260424100000_a20_rh_lot02_user_rh_fields/
    └─ migration.sql

All migrations have been successfully applied.
Loaded Prisma config from prisma.config.ts.

Prisma schema loaded from prisma\schema.prisma.
```
Statut : `0`

### 6) `npx prisma migrate status` (apres deploy)
Sortie brute :
```text
Datasource "db": PostgreSQL database "ambulance_db", schema "public" at "localhost:5432"

26 migrations found in prisma/migrations

Database schema is up to date!
Loaded Prisma config from prisma.config.ts.

Prisma schema loaded from prisma\schema.prisma.
```
Statut : `0`

### 7) `npm run lint`
Sortie brute :
```text
> ambulance-manager@0.1.0 lint
> eslint .
```
Statut : `0`

### 8) `npm run build`
Sortie brute (extrait) :
```text
> ambulance-manager@0.1.0 build
> next build

▲ Next.js 16.1.6 (Turbopack)
- Environments: .env

Creating an optimized production build ...
✓ Compiled successfully in 8.9s
Running TypeScript ...
Collecting page data using 15 workers ...
Generating static pages using 15 workers (29/29)
Finalizing page optimization ...
```
Statut : `0`

### 9) `npm run test:smoke`
Sortie brute (extrait) :
```text
> ambulance-manager@0.1.0 test:smoke
> node --test scripts/quality/smoke-api-critical-contracts.test.mjs

✔ users API keeps auth, tenant scoping and support exclusion
✔ users personal-data mutations keep an audit trail
✖ privacy mentions stay reachable from login
...
AssertionError [ERR_ASSERTION]: privacy page must expose RGPD information
```
Statut : `1`

### 10) `npm run test:targeted`
Sortie brute (extrait) :
```text
> ambulance-manager@0.1.0 test:targeted
> node --experimental-strip-types --test scripts/quality/targeted-sensitive-blocks.test.mjs

✔ API response helpers return the expected status codes and shapes
✔ serializeDates converts nested Date values into ISO strings
✔ template rules keep ALPHA defaults and normalize colors
✔ template slot and vehicle role compatibility stays coherent
✔ planning quality calculation keeps a meaningful quality score and explanations
✔ password policy rejects weak passwords and accepts hardened ones
✔ proxy covers sensitive authenticated application pages
```
Statut : `0`

### 11) `npm run test:quality`
Sortie brute (extrait) :
```text
> ambulance-manager@0.1.0 test:quality
> npm run test:smoke && npm run test:targeted

> ambulance-manager@0.1.0 test:smoke
> node --test scripts/quality/smoke-api-critical-contracts.test.mjs

✖ privacy mentions stay reachable from login
AssertionError [ERR_ASSERTION]: privacy page must expose RGPD information
```
Statut : `1`

---

## Confirmation explicite du KO smoke/quality

Le KO observe sur `test:smoke` et `test:quality` est strictement hors perimetre `A23-USERS-03` : il concerne `privacy` (assertion RGPD sur page login/privacy), et non le module users ADMIN corrige dans cette session.

Suivi : a traiter dans une session dediee hors A23-USERS-03 (audit/correction UI/privacy selon plan de bloc approprie).

---

## Limites conservees (non demontrees)

- Rattachement a un depot actif reel : INFORMATION NON FOURNIE — A CONFIRMER.
- Preuve UI navigateur ADMIN : INFORMATION NON FOURNIE — A CONFIRMER.
- Appels HTTP authentifies ADMIN de bout en bout : INFORMATION NON FOURNIE — A CONFIRMER.
