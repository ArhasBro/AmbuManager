# EVIDENCES.md

# EVIDENCES — `SESSION-20260422-04_A14_CLOTURE_A14`

## 1. Résiduel constaté en clôture avant correction

### `npm run build`
Retour observé avant stabilisation finale :

- `Failed to compile`
- fichier concerné : `./app/api/audit/route.ts`
- erreur constatée :
  - problème de typage TypeScript sur la route audit
  - blocage de compilation en phase `Running TypeScript`

Ce constat justifie la production d’un correctif final minimal dans la session de clôture.

---

## 2. Validation Prisma finale

### Commande
```bash
npx prisma validate
Retour
Loaded Prisma config from prisma.config.ts.
Prisma schema loaded from prisma\schema.prisma.
The schema at prisma\schema.prisma is valid 🚀
Statut

OK

3. Validation lint finale
Commande
npm run lint
Retour
> ambulance-manager@0.1.0 lint
> eslint .
Statut

OK

4. Validation build finale
Commande
npm run build
Retour
> ambulance-manager@0.1.0 build
> next build

▲ Next.js 16.1.6 (Turbopack)
- Environments: .env
  Creating an optimized production build ...
✓ Compiled successfully in 6.0s
✓ Finished TypeScript in 8.2s
✓ Collecting page data using 15 workers in 3.7s
✓ Generating static pages using 15 workers (28/28) in 437.2ms
✓ Finalizing page optimization in 16.4ms

Le build final liste notamment :

ƒ /api/audit
ƒ Proxy (Middleware)
Statut

OK

5. Validation qualité finale
Commande
npm run test:quality
Retour synthétique fidèle
> ambulance-manager@0.1.0 test:quality
> npm run test:smoke && npm run test:targeted
Smoke tests
✔ users API keeps auth, tenant scoping and support exclusion
✔ templates API keeps auth, permission gate and company-scoped persistence
✔ planning shifts API keeps scope validation and company-scoped dependencies
✔ planning exports API keeps export permission and single-scope rule
✔ autoschedule runs API keeps cursor validation and company scoping
✔ vehicles flow now exposes archive-only standard lifecycle

pass 6
fail 0
Targeted tests
✔ API response helpers return the expected status codes and shapes
✔ serializeDates converts nested Date values into ISO strings
✔ template rules keep ALPHA defaults and normalize colors
✔ template slot and vehicle role compatibility stays coherent
✔ planning quality calculation keeps a meaningful quality score and explanations

pass 5
fail 0
Warning non bloquant observé
[MODULE_TYPELESS_PACKAGE_JSON]
Statut

OK