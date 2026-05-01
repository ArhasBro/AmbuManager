# NOTES

## Methode appliquee

- Lecture documentaire obligatoire et ciblee avant toute modification.
- Analyse du code reel Company/Depots + composants UI communs existants.
- Production patch-first : creation du patch principal `.diff` puis verification `git apply --check` puis application `git apply`.
- Validation terminale via `npm.cmd run lint` et `npm.cmd run build`.

## Notes techniques

- Harmonisation UI faite par reutilisation de composants existants : `PageHeader`, `StatCard`, `ActionButton`, `StatusBadge`, `DataTable`, `FilterBar`, `EmptyState`, `ErrorMessage`.
- Aucun changement de logique metier (meme endpoints, meme operations create/edit/archive, meme controles d'acces cote page).
- `build` KO constate pour dependances manquantes de l'environnement (`@prisma/client`, `bcrypt`, `pg`) hors perimetre de cette session UI.

## Observation de contexte depot

- `docs/CMD.md` est deja modifie hors perimetre de cette session et n'a pas ete touche.
