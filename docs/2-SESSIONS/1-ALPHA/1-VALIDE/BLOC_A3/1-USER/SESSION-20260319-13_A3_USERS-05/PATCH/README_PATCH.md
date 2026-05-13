# README_PATCH — SESSION-20260319-13_A3_USERS-05

## Patch retenu
`PATCH__SESSION-20260319-13_A3_USERS-05.diff`

## Objet
Ajouter l’UI de création utilisateur sur `/users`, en continuité directe de l’API de création déjà livrée et validée en USERS-04.

## Périmètre couvert
- formulaire minimal de création utilisateur ;
- champs exposés : `name`, `email`, `role`, `password` ;
- appel direct à `POST /api/users` ;
- gestion des états UI utiles : saisie, chargement, succès, erreur ;
- maintien de l’exploitabilité de la page utilisateurs après création.

## Hors périmètre confirmé
- aucune modification Prisma ;
- aucune refonte API ;
- aucune modification RBAC ;
- aucune édition utilisateur ;
- aucun archivage / désactivation ;
- aucun rôle support attribuable côté client.

## Validation retenue
- `git apply --check` : OK ;
- `git apply` : OK ;
- `npm run lint` : OK ;
- `npm run build` : OK.

## Statut
Patch retenu, intégré et validé pour la session USERS-05.