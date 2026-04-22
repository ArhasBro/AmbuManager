# README_PATCH — SESSION-20260319-20_A3_USERS-12

## Mode retenu
`NO_PATCH`

## Objet
Tracer proprement l’absence justifiée de patch applicatif pour USERS-12 : audit du besoin `absences / indisponibilités utilisateur`.

## Périmètre couvert
- contrôle du schéma Prisma ;
- contrôle des routes users ;
- contrôle de l’UI users ;
- contrôle des routes planning / autoschedule ;
- contrôle des services planning, matching et publication ;
- comparaison avec le cadrage produit et avec USERS-01 à USERS-11.

## Constat retenu
Le dépôt inspecté ne contient pas encore de gestion réelle des absences / indisponibilités utilisateur :
- aucun modèle dédié ;
- aucune route API dédiée ;
- aucune UI dédiée ;
- aucune intégration d’une source d’indisponibilités dans les contrôles planning.

Le planning fournit toutefois déjà un socle partiel de cohérence :
- conflits utilisateurs ;
- conflits véhicules ;
- repos minimum ;
- matching par rôle et créneaux occupés.

La qualification officielle retenue pour l’existant est donc : `INCOMPLET`.

## Fichiers patch retenus
- `NO_PATCH.md`
- `README_PATCH.md`

## Commandes / actions réellement exécutées pour la session
- inspection du dépôt extrait ;
- recherches ciblées (`find`, `rg`) ;
- lectures ciblées des fichiers (`sed`, `nl`).

## Validations terminales applicatives
- `lint` : non lancé
- `build` : non lancé
- `tests` : non lancés
- `prisma validate / generate` : non lancés

Aucune validation terminale applicative n’était requise pour justifier un `NO_PATCH` dans cette session d’audit pur.

## Statut
Aucun patch applicatif à produire pour USERS-12. Le dossier patch documente explicitement cette absence.
