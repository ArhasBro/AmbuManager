# SESSION — SESSION-20260319-22_A3_USERS-14

## Date
20/03/2026

## Contexte
Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A3  
Type : COMPLÉTION  
Intitulé : UI indisponibilités / absences

## Objectif unique de la session
Implémenter l’UI minimale réelle des indisponibilités / absences utilisateur dans `app/users/**`, cohérente avec l’architecture existante et branchée sur l’API validée de USERS-13.

## Périmètre exact traité
- ajout d’un composant UI dédié dans `app/users` ;
- consommation des routes API absences de USERS-13 ;
- consultation des absences du salarié sélectionné dans la liste users existante ;
- création, modification et suppression minimales d’absence ;
- mise à jour finale de la documentation de session et du `README_PATCH.md`.

## Résultat synthétique
USERS-14 ajoute une brique UI réelle et bornée pour les absences utilisateur. Le composant s’appuie sur la sélection déjà exposée par `UsersListClient`, charge les absences du salarié courant, affiche la liste, et permet les actions CRUD minimales via l’API déjà existante, avec garde-fous UI simples sur les dates et restitution lisible des erreurs backend.

## Validation finale retenue
- `git apply --check` sur copie propre : OK ;
- `git apply` sur copie propre : OK ;
- `npm run lint` : OK ;
- `npm run build` : OK.

## Hors périmètre confirmé
- refonte de l’API USERS-13 ;
- intégration planning / matching / autoschedule ;
- consultation du planning utilisateur (USERS-15) ;
- refonte globale de la page users ;
- contrats, temps de travail, documents employés.
