# README_PATCH

## Session liée
SESSION-20260312-08_A1_TENANT-03

## Type
CORRECTION

## Dossier patch
docs/patches/1-ALPHA/BLOC_A1/SESSION-20260312-08_A1_TENANT-03

## Patch officiel
PATCH__SESSION-20260312-08_A1_TENANT-03.diff

## Fichier code concerné
- `app/planning/page.tsx`

## Objet du patch
Ajouter une garde serveur explicite sur la page `/planning` pour exiger une session valide rattachée à un tenant (`session.user.id` + `session.user.companyId`) avant rendu de la UI.

## Commandes d'application

```bash
git apply --check docs/patches/1-ALPHA/BLOC_A1/SESSION-20260312-08_A1_TENANT-03/PATCH__SESSION-20260312-08_A1_TENANT-03.diff
git apply docs/patches/1-ALPHA/BLOC_A1/SESSION-20260312-08_A1_TENANT-03/PATCH__SESSION-20260312-08_A1_TENANT-03.diff
```

## Vérifications réellement prouvées

- patch appliqué dans le dépôt cible
- `git apply --check` : OK
- `npm run lint` : OK
- `npm run build` : OK

## Statut
- patch produit ;
- patch appliqué ;
- documentation finale recalée sur l’état réel prouvé ;
- session : `conforme`.
