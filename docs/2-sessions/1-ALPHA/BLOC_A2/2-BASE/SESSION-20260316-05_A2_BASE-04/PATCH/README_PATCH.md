# README_PATCH

## Session liée

`SESSION-20260316-05_A2_BASE-04`

## Type

`COMPLÉTION`

## Dossier patch

`docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-05_A2_BASE-04/`

## Patch d’origine

`BASE-04.diff`

## Correctif appliqué

Correctif minimal réalisé en complément du patch d’origine, sans régénérer `BASE-04.diff`.

## Périmètre exact retenu

`BASE-04` est strictement limité à l’ajout de l’API de modification d’un dépôt existant :

- route `PATCH /api/depots/[id]`
- body autorisé limité à :
  - `name`
  - `address`

## Recalage effectué

Le correctif final retire `isActive` du périmètre `BASE-04`.

Le périmètre retenu est donc strictement :

- `name`
- `address`

## Règles conservées

- `companyId` ne vient jamais du client
- modification bornée au tenant courant via `session.user.companyId`
- cross-tenant interdit
- accès limité à `ADMIN` / `GERANT`
- validation Zod stricte
- contrat API standard :
  - succès : `{ ok:true, data }`
  - erreur : `{ ok:false, error }` ou `{ ok:false, error, details }`

## Fichiers code concernés par BASE-04

- `app/api/depots/[id]/route.ts`
- `lib/services/depots/update-depot.ts`
- `lib/validators/depot.ts`

## Éléments hors périmètre

Le correctif ne fait pas :

- de UI dépôts
- de listing dépôts
- de suppression dépôt
- d’archivage dépôt
- de rattachements `Vehicle` / `User` / `Shift`
- de permissions catalogue dédiées
- de multi-agence
- de modification du modèle Prisma hors nécessité factuelle
- de modification des documents master
- d’ouverture de `BASE-05+`

## Résultats terminaux confirmés

- `git apply --check` : OK
- `git apply` : OK
- `npx prisma validate` : OK
- `npx prisma generate` : OK
- `npm run lint` : OK
- `npm run build` : OK

## Statut final

- patch d’origine conservé
- code `BASE-04` corrigé sur le dépôt réel
- périmètre recalé strictement à `name` et `address`
- session documentée et clôturée proprement