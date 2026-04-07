# EVIDENCES.md

## Preuves réelles retenues

### Patch principal
- `PATCH__SESSION-20260407-06_A6_TPL-06.diff`

### Fichier réellement modifié
- `app/api/templates/[id]/route.ts`

### Route réellement ajoutée
- `PATCH /api/templates/[id]`

### Comportements livrés observables sur le périmètre TPL-06
- authentification obligatoire via session ;
- borne multi-tenant stricte via `session.user.companyId` ;
- aucun `companyId` accepté du client ;
- gouvernance cohérente via logique existante :
  - `ADMIN` / `GERANT`
  - sinon permission `TEMPLATES_MANAGE`
  - pas d’ouverture support global ;
- validation minimale cohérente des champs réels :
  - `name`
  - `category`
  - `requiredRole`
  - `isActive`
  - `startTime`
  - `endTime`
  - `crossesMidnight` ;
- gestion cohérente de :
  - `INVALID_JSON`
  - `VALIDATION_ERROR`
  - `NOT_FOUND`
  - conflit d’unicité ;
- format de réponse projet respecté.

### Validations terminales prouvées
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK

### Preuve build utile
- la route `/api/templates/[id]` apparaît dans la sortie de build.

## Limite des preuves
Aucune autre preuve n’est ajoutée au-delà des éléments explicitement fournis et validés pour `TPL-06`.
