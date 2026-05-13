# EVIDENCES

Éléments factuels utilisés pendant la session.

---

## Sources utilisées

### Documents maîtres / gouvernance
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`
- `docs/4-templates/TEMPLATE_FIN_SESSION.md`

### Documentation produit / qualité
- `README.md`
- `docs/README.md`
- `docs/USAGE_USERS.md`
- `docs/USAGE_VEHICLES.md`
- `docs/USAGE_TEMPLATES.md`
- `docs/USAGE_PLANNING_AUTOSCHEDULE.md`
- `docs/SCENARIOS_MANUELS_ALPHA.md`
- `docs/QUALITY_TESTS.md`

### Sessions et patchs A13
- `docs/2-sessions/1-ALPHA/BLOC_A13/SESSION-20260416-13_A13_A13-01/*`
- `docs/2-sessions/1-ALPHA/BLOC_A13/SESSION-20260416-14_A13_A13-LOT-02-13/*`
- `docs/2-sessions/1-ALPHA/BLOC_A13/SESSION-20260416-15_A13_A13-14/*`
- `docs/3-patches/1-ALPHA/BLOC_A13/SESSION-20260416-14_A13_A13-LOT-02-13/PATCH__SESSION-20260416-14_A13_A13-LOT-02-13_FIX-01.diff`
- `docs/3-patches/1-ALPHA/BLOC_A13/SESSION-20260416-14_A13_A13-LOT-02-13/README_PATCH.md`
- `docs/3-patches/1-ALPHA/BLOC_A13/SESSION-20260416-15_A13_A13-14/NO_PATCH.md`

### Code / scripts contrôlés
- `package.json`
- `package-lock.json`
- `app/users/*`
- `app/vehicles/*`
- `app/templates/*`
- `app/planning/*`
- `app/api/users/*`
- `app/api/vehicles/*`
- `app/api/templates/*`
- `app/api/planning/*`
- `lib/*`
- `scripts/quality/*`

---

## Preuves factuelles retenues

### Livrables A13-LOT-02-13 réellement présents
Fichiers réellement trouvés dans le ZIP courant :
- `docs/USAGE_USERS.md`
- `docs/USAGE_VEHICLES.md`
- `docs/USAGE_TEMPLATES.md`
- `docs/USAGE_PLANNING_AUTOSCHEDULE.md`
- `docs/SCENARIOS_MANUELS_ALPHA.md`
- `docs/QUALITY_TESTS.md`
- `scripts/quality/smoke-api-critical-contracts.test.mjs`
- `scripts/quality/targeted-sensitive-blocks.test.mjs`

### Code et UI réellement présents sur le périmètre documenté
Présences confirmées :
- pages `app/users/page.tsx`, `app/vehicles/page.tsx`, `app/templates/page.tsx`, `app/planning/page.tsx`
- routes `app/api/users/*`, `app/api/vehicles/*`, `app/api/templates/*`, `app/api/planning/*`
- export planning dans `app/planning/manual-planning-panel.tsx`
- audit run et matching qualité dans `app/planning/planning-client.tsx`
- archivage véhicule via `app/api/vehicles/[id]/archive/route.ts`
- archivage template via `app/api/templates/[id]/archive/route.ts`
- archivage utilisateur via `app/api/users/[id]/archive/route.ts`

### Validations terminales réellement exécutées dans la présente session
- `npm run test:smoke` → `OK` (`6 tests`, `0 fail`)
- `npm run test:targeted` → `OK` (`5 tests`, `0 fail`)
- warning Node non bloquant sur `test:targeted` :
  - `ExperimentalWarning: Type Stripping is an experimental feature`
  - `MODULE_TYPELESS_PACKAGE_JSON`
- `npm run lint` → `KO ENVIRONNEMENT`
  - sortie : `sh: 1: eslint: not found`
- `npm run build` → `KO ENVIRONNEMENT`
  - sortie : `sh: 1: next: not found`

### Validations de référence déjà acquises sur `A13-LOT-02-13`
D’après la documentation de session et le `README_PATCH.md` contrôlé :
- `git apply --check <FIX-01.diff>` → `OK`
- `git apply <FIX-01.diff>` → `OK`
- `npm run test:smoke` → `OK`
- `npm run test:targeted` → `OK`
- `npm run lint` → `OK`
- `npm run build` → `OK`
- `npx prisma validate` → `NON EXÉCUTÉ` (`aucune modification Prisma dans ce fix`)
- `npx prisma generate` → `NON EXÉCUTÉ` (`aucune modification Prisma dans ce fix`)

### Prisma
Dans la présente session :
- `npx prisma validate` → `NON EXÉCUTÉ`
- `npx prisma generate` → `NON EXÉCUTÉ`

Justification :
- aucun patch code produit ;
- aucune modification Prisma dans cette session de validation.

### Décision patch
- aucun correctif code strictement nécessaire n’a été prouvé ;
- la session reste donc en `NO_PATCH`.
