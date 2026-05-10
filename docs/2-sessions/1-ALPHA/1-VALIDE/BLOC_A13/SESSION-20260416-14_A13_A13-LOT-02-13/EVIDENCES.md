# EVIDENCES

## Patch validé de référence

Patch retenu et validé pour la session :

`PATCH__SESSION-20260416-14_A13_A13-LOT-02-13_FIX-01.diff`

Ce patch remplace le patch initial corrompu et sert de référence documentaire finale pour `SESSION-20260416-14_A13_A13-LOT-02-13`.

## Validations factuelles retenues

### Application du patch validé

- `git apply --check <FIX-01.diff>` → `OK`
- `git apply <FIX-01.diff>` → `OK`

### Smoke tests API critiques

- `npm run test:smoke` → `OK`
- Détail : `6 pass / 0 fail`

Routes et comportements critiques couverts par les smoke tests :
- `/api/users`
- `/api/templates`
- `/api/planning/shifts`
- `/api/planning/exports`
- `/api/planning/autoschedule/runs`
- `/api/vehicles`

Nature des contrôles couverts :
- authentification ;
- permissions ;
- cloisonnement `companyId` ;
- validation de certaines règles critiques ;
- cohérence du flux standard véhicules par archivage.

### Tests ciblés sur blocs sensibles

- `npm run test:targeted` → `OK`
- Détail : `5 pass / 0 fail`
- Warning non bloquant signalé : `MODULE_TYPELESS_PACKAGE_JSON`

Blocs couverts par les tests ciblés :
- helpers de réponse API ;
- sérialisation de dates ;
- règles templates ;
- compatibilité rôle véhicule / slots template ;
- calcul de qualité planning et explications associées.

### Validations générales de dépôt

- `npm run lint` → `OK`
- `npm run build` → `OK`

### Prisma

- `npx prisma validate` → `NON EXÉCUTÉ`
  - justification : `aucune modification Prisma dans ce fix`
- `npx prisma generate` → `NON EXÉCUTÉ`
  - justification : `aucune modification Prisma dans ce fix`

## Rappel synthétique du périmètre prouvé

Le contrôle final a validé, sur le périmètre réellement traité, les points suivants :

- `SCÉNARIOS MANUELS DOCUMENTÉS : CONFORME`
- `SMOKE TESTS API CRITIQUES : CONFORME`
- `TESTS CIBLÉS SUR BLOCS SENSIBLES : CONFORME`
- `DOCUMENTATION D’USAGE PRODUIT : CONFORME`
- `COHÉRENCE FINALE ALPHA SUR LE PÉRIMÈTRE CONTRÔLÉ : CONFORME`
