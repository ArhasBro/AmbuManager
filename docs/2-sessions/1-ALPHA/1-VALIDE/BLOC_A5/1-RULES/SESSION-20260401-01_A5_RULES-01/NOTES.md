# NOTES

## Constats de travail
- Le module `company rules` existe réellement en data, migration Prisma et route API.
- Le stockage réel est un modèle clé/valeur technique (`key`, `value`) avec `mode`.
- Les usages métier réellement prouvés sont limités à :
  - `PLANNING_VIEW_MODE`
  - `PLANNING_MIN_REST_HOURS`
- Aucun écran dédié de paramètres métier compréhensibles n’a été trouvé.
- `app/company/page.tsx` concerne le profil société, pas les règles métier.
- Le `PATCH /api/company/rules` ne permet pas de renseigner `mode` et crée les nouvelles règles en `OFF`.
- Les validations terminales n’ont pas pu être menées à terme dans ce sandbox faute de dépendances installées.
