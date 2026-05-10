# EVIDENCES — SESSION-20260319-14_A3_USERS-06

## Éléments code retenus

### Fichiers modifiés
- `app/api/users/[id]/route.ts` (nouveau)
- `lib/validators/user.ts`

### Comportement ajouté
- `PATCH /api/users/[id]`
- validation stricte du body avec au moins un champ parmi `name`, `email`, `role`
- recherche du compte cible dans la société courante uniquement
- exclusion des comptes support globaux
- réponse homogène `{ ok:true, data }` / `{ ok:false, error, details? }`

## Sorties de validation finales retenues

### `git apply --check`
Succès sans erreur affichée.

### `git apply`
Succès sans erreur affichée.

### `npx prisma validate`
OK.

### `npx prisma generate`
OK.

### `npm run lint`
OK.

### `npm run build`
OK.

## Conclusion probante
La chaîne de validation technique finale communiquée localement est complète et verte sur le patch retenu.
