# EVIDENCES.md

## Lecture et préparation
- Dossiers historiques présents : `docs/1-master/*`, `docs/2-sessions/*`, `docs/3-patches/*`, `docs/4-templates/*`
- Dossiers `2-TEST-ALPHA` absents au départ dans le dépôt extrait : création effectuée pour cette session.

## Installation dépendances
### Tentative standard
```txt
npm ci --no-audit --no-fund
npm error path .../node_modules/@prisma/engines
npm error command failed
npm error signal SIGTERM
npm error command sh -c node scripts/postinstall.js
```

### Fallback utilisé pour poursuivre les constats
```txt
npm ci --ignore-scripts --no-audit --no-fund
added 512 packages
```

## Scripts qualité observés
### Smoke
```txt
npm run test:smoke
# tests 6
# pass 6
# fail 0
```

### Targeted
```txt
npm run test:targeted
# tests 5
# pass 5
# fail 0
```
Avertissements observés mais non bloquants :
- `ExperimentalWarning: Type Stripping is an experimental feature`
- `MODULE_TYPELESS_PACKAGE_JSON`

## Build avant correction
```txt
npm run build
Failed to compile.
./app/api/audit/route.ts:38:26
Type error: Parameter 'log' implicitly has an 'any' type.
```

## Démarrage local Next.js
Variables locales de test utilisées pour le constat runtime :
- `PORT=3005`
- `DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/ambulance_manager`
- `NEXTAUTH_URL=http://127.0.0.1:3005`
- `NEXTAUTH_SECRET=testsecret`
- `SEED_ADMIN_PASSWORD=testpassword`

Constats observés :
```txt
npm run dev -> démarrage observé
GET /login -> HTTP 200
GET /dashboard -> HTTP 307 -> /login?callbackUrl=%2Fdashboard
GET / -> HTTP 500
```

Erreur terminale corrélée au `HTTP 500` sur `/` dans l’environnement de fallback :
```txt
Cannot find module '.prisma/client/default'
Require stack:
- node_modules/@prisma/client/default.js
- lib/prisma.ts
```

## Prisma Studio
```txt
npm run db:studio
Loaded Prisma config from prisma.config.ts.
Prisma Studio is running at: http://localhost:51212
```
Constat HTTP supplémentaire :
```txt
GET http://localhost:51212 -> HTTP 200
content-type: text/html
```
