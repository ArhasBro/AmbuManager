# README_PATCH

## Session liée
`SESSION-20260318-04_A2_SUP-04`

## Type
`COMPLETION`

## Dossier patch
`docs/3-patches/1-ALPHA/BLOC_A2/3-SUP/SESSION-20260318-04_A2_SUP-04`

## Patch officiel retenu
`SUP-04.diff`

## Portée du patch

Patch unique strictement borné à `SUP-04` :
- exclusion explicite des comptes support globaux des flux client `users` réellement présents ;
- passage explicite de `platformRole` aux contrôles `canManageUsers(...)` ciblés ;
- durcissement des routes client de reset mot de passe et de rattachement dépôt ;
- clarification minimale des textes UI côté client ;
- aucune modification Prisma, auth / NextAuth, audit renforcé `SUP-05` ou back-office support.

## Fichiers code modifiés

- `app/api/users/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/api/users/[id]/depot/route.ts`
- `lib/services/users/assign-user-depot.ts`
- `app/users/page.tsx`
- `app/users/reset-password-client.tsx`
- `app/users/user-depot-assignment-client.tsx`

## Commandes d’application

```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A2/3-SUP/SESSION-20260318-04_A2_SUP-04/SUP-04.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A2/3-SUP/SESSION-20260318-04_A2_SUP-04/SUP-04.diff"
```

## Validation d’application réellement obtenue

```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A2/3-SUP/SESSION-20260318-04_A2_SUP-04/SUP-04.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A2/3-SUP/SESSION-20260318-04_A2_SUP-04/SUP-04.diff"
```

Résultats conservés :
- `git apply --check` : **OK**
- `git apply` : **OK**

## Validation terminale visée

```bash
npx prisma validate
npx prisma generate
npm run lint
npm run build
```

## Statut de validation dans ce conteneur

Validations terminales **non confirmées** ici, car les tentatives d’installation npm locale ont été interrompues par `SIGTERM` pendant `reify`.

Journaux constatés :
- `/home/oai/.npm/_logs/2026-03-19T13_12_25_972Z-debug-0.log`
- `/home/oai/.npm/_logs/2026-03-19T13_14_25_205Z-debug-0.log`

## Statut

- patch code `SUP-04` produit ;
- documentation finale de session produite ;
- revalidation terminale requise sur environnement npm stable avant verdict `conforme`.
