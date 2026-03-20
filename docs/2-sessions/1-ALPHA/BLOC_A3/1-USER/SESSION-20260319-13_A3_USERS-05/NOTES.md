# NOTES — SESSION-20260319-13_A3_USERS-05

## Stratégie retenue
La session a été traitée en continuité directe de USERS-04, sans reprise de l’API.

Le choix retenu est une implémentation UI minimale, exploitable et cohérente avec l’existant :
- interface de création sur `/users` ;
- formulaire borné aux champs réellement supportés ;
- soumission directe vers `POST /api/users` ;
- messages de chargement, succès et erreur en français ;
- maintien de l’exploitabilité de la page après création.

## Bornage respecté
- UI création utilisateur uniquement ;
- aucun rôle support exposé côté client ;
- aucune modification Prisma ;
- aucune modification RBAC ;
- aucune extension vers édition, archivage ou workflow d’invitation ;
- aucune refonte globale du module users.

## Cohérence fonctionnelle
La session USERS-05 complète le bloc A3 sur le point prévu : après la stabilisation de la liste en USERS-03 et l’API de création en USERS-04, l’utilisateur autorisé dispose désormais d’une création exploitable côté interface.