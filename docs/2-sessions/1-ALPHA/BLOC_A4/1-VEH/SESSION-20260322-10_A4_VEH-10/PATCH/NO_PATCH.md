# NO_PATCH

Session : `SESSION-20260322-10_A4_VEH-10`

Type : `VALIDATION`

## Décision
Aucun correctif code n’est produit dans cette session.

## Raisons
- la session demandée est une validation ciblée, pas une correction du flux de suppression ;
- une suppression physique véhicule est réellement présente dans le dépôt via `DELETE /api/vehicles` ;
- l’UI `/vehicles` expose encore une action `Supprimer` branchée sur ce flux ;
- le flux d’archivage logique VEH-08 / VEH-09 existe en parallèle, ce qui prouve une coexistence réelle entre archivage logique et suppression physique ;
- aucun garde-fou explicite « véhicule jamais utilisé » n’est visible avant suppression dans le périmètre contrôlé ;
- masquer ce résiduel par un patch opportuniste serait contraire au périmètre de validation demandé.

## Conséquences
- aucun fichier `.diff` ;
- `README_PATCH.md` : non applicable ;
- `git apply --check` : non applicable ;
- `git apply` : non applicable ;
- le dossier patch est conservé pour la traçabilité documentaire de la validation.
