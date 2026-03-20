# NOTES — SESSION-20260319-19_A3_USERS-11

## Point de départ réel
Le besoin USERS-11 était déjà largement couvert dans le code réel avant correction :
- `User.depotId` et la relation avec `Depot` existaient déjà ;
- la route dédiée de rattachement existait déjà ;
- le service métier dédié existait déjà ;
- le validateur dédié existait déjà ;
- la page `/users` intégrait déjà le bloc de rattachement.

## Résiduel retenu
Après changement de base, `app/users/user-depot-assignment-client.tsx` mettait à jour son état local mais ne republiait pas la sélection utilisateur mise à jour et ne relançait pas le refresh partagé du module users. L'écran pouvait donc conserver un état partiellement obsolète jusqu'à une autre action ou un rechargement.

## Correctif appliqué
Le correctif retenu est strictement borné à `app/users/user-depot-assignment-client.tsx` :
- construction de l'utilisateur sélectionné mis à jour après réponse API ;
- republication de cette sélection ;
- relance du refresh partagé du module users.

## Arbitrage
- aucun changement Prisma ;
- aucun changement backend ;
- aucun changement de cadrage produit ;
- aucun élargissement du scope hors rattachement utilisateur ↔ base.
