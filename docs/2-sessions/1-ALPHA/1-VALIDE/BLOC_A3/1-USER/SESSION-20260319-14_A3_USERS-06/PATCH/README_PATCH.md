# README_PATCH — SESSION-20260319-14_A3_USERS-06

## Patch retenu
`PATCH__SESSION-20260319-14_A3_USERS-06.diff`

## Objet
Ajouter l’API minimale de modification utilisateur pour USERS-06.

## Fichiers concernés
- `app/api/users/[id]/route.ts`
- `lib/validators/user.ts`

## Mode d’application
```bash
git apply --check ".\docs\3-patches\1-ALPHA\BLOC_A3\1-USER\SESSION-20260319-14_A3_USERS-06\PATCH__SESSION-20260319-14_A3_USERS-06.diff"
git apply ".\docs\3-patches\1-ALPHA\BLOC_A3\1-USER\SESSION-20260319-14_A3_USERS-06\PATCH__SESSION-20260319-14_A3_USERS-06.diff"
```

## Validations finales retenues localement
- `git apply --check` : OK
- `git apply` : OK
- `npx prisma validate` : OK
- `npx prisma generate` : OK
- `npm run lint` : OK
- `npm run build` : OK
