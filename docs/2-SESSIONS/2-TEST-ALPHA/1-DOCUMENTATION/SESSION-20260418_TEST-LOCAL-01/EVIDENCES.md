# EVIDENCES — SESSION-20260418_TEST-LOCAL-01

## Commandes et constats réels

### Tentative d’application du patch initial
```text
git apply --check ".\docs\2-sessions\2-TEST-ALPHA\2-PATCHS\SESSION-20260418_TEST-LOCAL-01\PATCH__SESSION-20260418_TEST-LOCAL-01.diff"
git apply ".\docs\2-sessions\2-TEST-ALPHA\2-PATCHS\SESSION-20260418_TEST-LOCAL-01\PATCH__SESSION-20260418_TEST-LOCAL-01.diff"
```

Résultat observé :
```text
error: api/audit/route.ts: No such file or directory
error: api/audit/route.ts: No such file or directory
```

### Vérifications Prisma
```text
npx prisma validate
npx prisma generate
```

Résultats observés :
```text
Loaded Prisma config from prisma.config.ts.
Prisma schema loaded from prisma\schema.prisma.
The schema at prisma\schema.prisma is valid 🚀
```

```text
Loaded Prisma config from prisma.config.ts.
Prisma schema loaded from prisma\schema.prisma.
✔ Generated Prisma Client (v7.7.0) to .
ode_modules\@prisma\client in 345ms
```

### Vérifications qualité
```text
npm run lint
npm run build
```

Résultats observés :
```text
> ambulance-manager@0.1.0 lint
> eslint .
```

```text
> ambulance-manager@0.1.0 build
> next build
▲ Next.js 16.1.6 (Turbopack)
- Environments: .env
Creating an optimized production build ...
✓ Compiled successfully
✓ Finished TypeScript
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization
```

### Vérification état Git réel
```text
git status
git diff -- app/api/audit/route.ts
```

Résultat observé :
```text
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

## Constats antérieurs conservés dans la session
Les éléments suivants ont été constatés précédemment dans le cadre de cette même session et restent documentés comme observés :
- `npm run dev` : démarrage observé
- accès utile à `/login` : observé
- Prisma Studio : démarrage observé
