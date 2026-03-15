# NOTES

## Observation de départ

Le message de cadrage indiquait que plusieurs fichiers `ORG-03` existaient déjà dans le working tree.
L'inspection du ZIP réellement reçu montre l'inverse : ces fichiers n'étaient pas présents côté application.

## Conséquence méthodologique

Le ZIP reçu a été pris comme source de vérité.
Le correctif livré n'est donc pas une micro-rectification sur des fichiers déjà présents, mais la mise en place minimale de `ORG-03` sur l'état réel du dépôt fourni.

## Choix techniques retenus

Pour éviter de retomber sur le blocage `managerNames` signalé dans l'historique précédent, la lecture et la mise à jour du profil société utilisent des requêtes SQL via `prisma.$queryRaw` plutôt qu'un `select` Prisma typé sur `managerNames`.

## Périmètre volontairement non ouvert

Aucun élargissement n'a été fait vers :
- `ORG-04`
- `BASE-*`
- `SUP-*`
- onboarding société
- multi-sociétés
- nouveaux champs
- migrations Prisma
