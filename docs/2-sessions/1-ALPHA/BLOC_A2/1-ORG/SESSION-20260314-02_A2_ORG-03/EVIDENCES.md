# EVIDENCES

## Sources de vérité retenues

- état réellement validé du dépôt local ;
- patch final de référence : `ORG-03-codehotfix-01.diff` ;
- vérifications réelles validées sur le dépôt local.

## Patch final de référence

Patch valide final retenu :
- `ORG-03-codehotfix-01.diff`

Nature du patch final :
- `code-only`
- correction technique minimale
- aucune modification documentaire incluse dans le patch validé

## Fichiers code réellement concernés par le correctif final

- `app/api/company/profile/route.ts`
- `app/company/page.tsx`

## Périmètre final réellement validé

- UI minimale profil société ALPHA ;
- champs pris en charge : `name`, `managerNames`, `address`, `phone`, `siret` ;
- cohérence `companyId` conservée ;
- aucune migration ;
- aucun changement de schéma Prisma ;
- aucun élargissement de périmètre.

## Vérifications finales réellement validées

- `git apply --check` : `OK`
- `git apply` : `OK`
- `npm run lint` : `OK`
- `npm run build` : `OK`
