# README_PATCH

## Patch principal

Nom :

- `PATCH__SESSION-20260424-10_A20_RH-LOT-02.diff`

Objet :

- correction/completion RH-LOT-02 du module utilisateurs avance ;
- ajout de champs RH utilisateur ;
- creation utilisateur enrichie ;
- affichage liste utilisateurs enrichi ;
- validation API et migration Prisma associees.

## Fichiers couverts

- `prisma/schema.prisma`
- `prisma/migrations/20260424100000_a20_rh_lot02_user_rh_fields/migration.sql`
- `lib/validators/user.ts`
- `app/api/users/route.ts`
- `app/api/users/[id]/route.ts`
- `app/users/page.tsx`
- `app/users/user-creation-client.tsx`
- `app/users/users-client-shared.ts`
- `app/users/users-list-client.tsx`

## Correctif minimal

Aucun correctif minimal code separe n'a ete necessaire.

Correctif documentaire de tracabilite ajoute apres controle qualite :

- `PATCH_DOCS_FIX_TRACEABILITE__SESSION-20260424-10_A20_RH-LOT-02.diff`

## Validations

- `npx.cmd prisma validate` : OK.
- `npm.cmd run lint` : OK.
- `npx.cmd prisma generate` : OK apres autorisation reseau.
- `npm.cmd run build` : OK apres regeneration Prisma Client.

## Tracabilite archive

`AmbuManager-main.zip` doit etre considere comme une archive source pre-patch.

Sur cette archive, le patch principal s'applique en sens normal.

Le controle `git apply --check --reverse` mentionne dans les evidences provient du depot local post-patch de production et verifie seulement que le patch correspondait a l'etat deja applique localement.
