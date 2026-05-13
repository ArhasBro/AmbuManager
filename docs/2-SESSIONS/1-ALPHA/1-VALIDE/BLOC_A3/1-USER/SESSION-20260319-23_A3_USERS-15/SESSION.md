# SESSION — SESSION-20260319-23_A3_USERS-15

## Date
20/03/2026

## Contexte
Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A3  
Type : COMPLÉTION  
Intitulé : Consultation du planning utilisateur / collègues selon permissions

## Objectif unique de la session
Implémenter une consultation réelle du planning centrée utilisateur, avec accès à son propre planning et à celui des collègues uniquement si la permission adaptée est effectivement présente.

## Périmètre exact traité
- branchement des permissions `PLANNING_VIEW_SELF` et `PLANNING_VIEW_GLOBAL` sur la lecture planning ;
- filtrage de `GET /api/planning/shifts` sur l’utilisateur ciblé ;
- adaptation minimale de `app/planning/page.tsx` et `app/planning/planning-client.tsx` pour consulter son planning ou sélectionner un collègue autorisé ;
- cohérence UI minimale sur la consultation ;
- mise à jour finale de la documentation de session et du `README_PATCH.md`.

## Résultat synthétique
USERS-15 transforme la lecture planning générique en consultation permissionnée. Sans permission globale, l’utilisateur est borné à son propre planning. Avec permission globale, l’UI permet de choisir un collègue et la route API filtre strictement sur cet utilisateur cible.

## Validation finale retenue
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK

## Hors périmètre confirmé
- refonte globale du module planning ;
- élargissement vers édition métier complète ;
- refonte des routes autoschedule ;
- export planning, audit élargi, dashboard, RH avancées ;
- USERS-16.
