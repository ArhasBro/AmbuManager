# SESSION — SESSION-20260319-13_A3_USERS-05

## Identification
- Projet : Investissement
- Sous-projet : Ambulance Manager
- Maturité : 1-ALPHA
- Bloc : A3
- Code session : USERS-05
- Type : COMPLETION
- Intitulé : UI création utilisateur

## Objet
Documenter la livraison finale validée de la session USERS-05 concernant l’UI de création utilisateur.

## Portée réelle
- ajout d’une UI de création utilisateur sur `/users` ;
- formulaire minimal strictement aligné sur l’API de création déjà livrée en USERS-04 ;
- champs exposés : `name`, `email`, `role`, `password` ;
- appel direct à `POST /api/users` ;
- conservation des actions existantes de la page utilisateurs ;
- aucun élargissement vers l’édition, l’archivage, Prisma, RBAC ou une refonte globale du module.

## Livraison finale retenue
Le patch retenu pour la session est :

`PATCH__SESSION-20260319-13_A3_USERS-05.diff`

## Statut validé retenu
La session code USERS-05 est validée dans le dépôt intégré.

Validations terminales retenues :
- `git apply --check` : OK ;
- `git apply` : OK ;
- `npm run lint` : OK ;
- `npm run build` : OK.