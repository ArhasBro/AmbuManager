# README_PATCH — SESSION-20260319-12_A3_USERS-04

## Patch retenu
`PATCH__SESSION-20260319-12_A3_USERS-04_FIX_V2.diff`

## Objet
Livrer l’API de création utilisateur dans le périmètre de la session USERS-04.

## Fichiers concernés
- `app/api/users/route.ts`
- `lib/validators/user.ts`

## Mode d’application
```bash
git apply --check ".\docs\3-patches\1-ALPHA\BLOC_A3\1-USER\SESSION-20260319-12_A3_USERS-04\PATCH__SESSION-20260319-12_A3_USERS-04_FIX_V2.diff"
git apply ".\docs\3-patches\1-ALPHA\BLOC_A3\1-USER\SESSION-20260319-12_A3_USERS-04\PATCH__SESSION-20260319-12_A3_USERS-04_FIX_V2.diff"
```

## Validations prouvées
- `git apply --check` : OK
- `git apply` : OK
- `npx prisma validate` : OK
- `npx prisma generate` : OK
- `npm run lint` : OK
- `npm run build` : OK
