# README_PATCH

## Session liée
SESSION-20260312-04_A1_AUTH-05

## Type
COMPLÉTION

## Dossier patch
`docs/patches/1-ALPHA/BLOC_A1/SESSION-20260312-04_A1_AUTH-05`

## Patch officiel
`PATCH__SESSION-20260312-04_A1_AUTH-05.diff`

## Périmètre exact du patch
Le patch est strictement limité à `AUTH-05` :
- ajout d’une route API de réinitialisation de mot de passe par admin/gérant ;
- ajout d’une UI minimale dédiée côté produit ;
- ajout du point d’accès dashboard ;
- protection middleware de la nouvelle page UI.

## Justification de ces ajouts dans le périmètre exact
Le cadrage officiel indique : `support validé ; UI admin métier à construire`.

Conséquence :
- une route API seule n’aurait pas suffi pour rendre `AUTH-05` conforme côté produit ;
- la page `/users`, le lien dashboard et la protection middleware constituent le support minimal nécessaire pour exposer ce reset admin/gérant dans l’application, sans ouvrir un module users complet.

## Fichiers inclus dans le patch
- `app/api/users/[id]/reset-password/route.ts`
- `app/users/page.tsx`
- `app/users/reset-password-client.tsx`
- `app/dashboard/page.tsx`
- `proxy.ts`

## Commandes d’application

```bash
git apply --check "docs/patches/1-ALPHA/BLOC_A1/SESSION-20260312-04_A1_AUTH-05/PATCH__SESSION-20260312-04_A1_AUTH-05.diff"
git apply         "docs/patches/1-ALPHA/BLOC_A1/SESSION-20260312-04_A1_AUTH-05/PATCH__SESSION-20260312-04_A1_AUTH-05.diff"
```

## Vérifications constatées après application
- patch appliqué sans erreur
- `npm run lint` : OK
- `npm run build` : OK
- routes `/api/users/[id]/reset-password` et `/users` présentes

## Statut
- patch produit
- patch techniquement validé dans son périmètre exact
- aucun `NO_PATCH.md`
