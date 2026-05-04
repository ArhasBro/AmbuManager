# SESSION

## ID SESSION

SESSION-20260503-09_A23_A23-ROLES-RH-09

## Date

03/05/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturite : 1-ALPHA  
Bloc : A23  
Type : AUDIT  
Intitule : Audit des besoins metier complementaires roles RH et suppression controlee

## Objectif de la session

Auditer et arbitrer 4 besoins metier complementaires sans modification applicative :
- statut de `PSC1` ;
- possibilite de plusieurs gerants ;
- enrichissement de la fiche salarie ;
- suppression definitive controlee.

## Perimetre exact traite

Audit documentaire + verification code reel ciblee sur :
- documentation officielle (master + session) ;
- modele Prisma (roles, users, archivage/suppression) ;
- routes API users/company/vehicles ;
- services d'archivage users/depots/vehicles/templates ;
- validation de l'absence de patch code pour cette session.

## Resultat synthetique de session

Decision patch : `NO_PATCH` (aucune modification applicative).

Arbitrage des 4 sujets :
- `PSC1` : `BACKLOG` (qualification/competence RH a cadrer, pas un role ALPHA immediat).
- Plusieurs gerants : `ALPHA` (deja possible dans le modele et la gestion users actuelle).
- Fiche salarie enrichie (date entree, taux horaire, primes) : `BACKLOG`.
- Suppression definitive controlee : `BETA` (garde-fous et gouvernance a definir avant implementation).

Verdict AUDIT global : `INCOMPLET` sur le plan implementation (decisions prises, evolutions reportees).

## Dossiers lies

- Session : docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-09_A23_A23-ROLES-RH-09
- PATCH   : docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-09_A23_A23-ROLES-RH-09/PATCH
