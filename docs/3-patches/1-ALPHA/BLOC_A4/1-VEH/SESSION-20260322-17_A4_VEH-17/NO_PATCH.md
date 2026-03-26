# NO_PATCH

Session : `SESSION-20260322-17_A4_VEH-17`

Type : `VALIDATION`

## Décision
Aucun correctif code n’est produit dans cette session.

## Raisons
- la session demandée est une validation globale du bloc A4, pas une correction du module véhicules ;
- le code courant permet de conclure le diagnostic sans correction supplémentaire ;
- les résiduels encore présents (`DELETE /api/vehicles` sans garde-fou visible « jamais utilisé » et absence de garde-fou / signal sur véhicule indisponible dans le flux planning) sont réels mais ne doivent pas être masqués par un patch opportuniste dans `VEH-17` ;
- le cadrage classe `07.5` comme non bloquant, ce qui autorise une conclusion de validation sans correction immédiate ;
- le verdict attendu de cette session porte sur l’état réel du bloc, pas sur sa remise en conformité finale.

## Conséquences
- aucun fichier `.diff` ;
- `README_PATCH.md` : non applicable en `NO_PATCH`, car `PLAN_DE_DEVELOPPEMENT.md` le prévoit seulement « si nécessaire » et aucun patch `.diff` n’est produit dans cette session ;
- `git apply --check` : non applicable ;
- `git apply` : non applicable ;
- le dossier patch est conservé pour la traçabilité documentaire de la validation.
