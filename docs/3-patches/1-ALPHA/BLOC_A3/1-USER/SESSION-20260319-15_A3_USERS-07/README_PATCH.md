# README_PATCH — SESSION-20260319-15_A3_USERS-07

## Patch concerné
`PATCH__SESSION-20260319-15_A3_USERS-07.diff`

## Objet
Livrer l’UI minimale de modification utilisateur sur `/users`, en continuité directe de l’API USERS-06.

## Périmètre couvert
- sélection d’un utilisateur depuis la liste existante ;
- formulaire dédié et séparé de modification ;
- édition de `name`, `email`, `role` ;
- préremplissage des données ;
- appel de l’API de modification déjà disponible ;
- affichage des états UI ;
- rafraîchissement de la liste après succès.

## Hors périmètre confirmé
- aucun changement mot de passe ;
- aucun changement dépôt ;
- aucun archivage / désactivation ;
- aucune refonte API ;
- aucune extension vers USERS-08.

## Validation retenue
Validation locale confirmée sur le patch applicatif :
- `git apply --check` : OK ;
- `git apply` : OK ;
- `npm run lint` : OK ;
- `npm run build` : OK.

## Statut
Patch applicatif USERS-07 validé.
