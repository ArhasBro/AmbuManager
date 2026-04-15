# SESSION

## ID SESSION

SESSION-20260415-01_A8_PLAN-01

## Date

15/04/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A8 — Planning manuel  
Type : AUDIT  
Intitulé : Audit complet du planning manuel existant : vue semaine, vue jour, vue mois, navigation mensuelle, lisibilité métier, ajout/modification/annulation de shifts publiés, historique minimal et traçabilité après publication

## Objectif de la session

Auditer strictement l’état réel du planning manuel existant sans correction de code, sans élargissement vers le bloc A9 autoschedule, et avec décision `NO_PATCH` par défaut.

## Périmètre exact traité

- documents maîtres et protocole de session ;
- page `/planning` et client principal de l’écran ;
- API réelle des shifts publiés ;
- API d’affectation d’un shift publié ou d’un draft déjà existant ;
- service métier d’affectation d’un shift publié ;
- helper d’audit planning ;
- types métier planning ;
- modèle Prisma des entités planning ;
- lecture ponctuelle des routes autoschedule uniquement pour comprendre ce que l’écran planning mélange déjà, sans auditer le bloc A9.

## Résultat synthétique de session

Le planning manuel existant est **partiellement exploitable** : une vraie vue semaine centrée utilisateur est présente, la modification d’affectations sur shift publié existe partiellement, mais il n’existe ni vraie vue jour UI, ni vue mois, ni navigation mensuelle, ni ajout manuel de shift publié, ni suppression métier / annulation logique d’un shift publié. L’historique et la traçabilité existent seulement sous forme minimale et mélangée au support autoschedule.

## Dossiers liés

- Session : `docs/2-sessions/1-ALPHA/BLOC_A8/SESSION-20260415-01_A8_PLAN-01`
- Patchs  : `docs/3-patches/1-ALPHA/BLOC_A8/SESSION-20260415-01_A8_PLAN-01`
