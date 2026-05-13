# SESSION

## ID SESSION

SESSION-20260506-08_A24_A24-UI-08

## Date

2026-05-09

## Contexte

Projet : Investissement
Sous-projet : Ambulance Manager
Stage : 1-ALPHA
Bloc : A24 - Realignement UI/UX global sur MAQUETTE
Type : AUDIT
Intitule : A24-UI-08 - Audit preparatoire Planning pour A25

## Objectif unique

Auditer la page Planning apres socle UI A24, sans correction profonde du planning, pour preparer A25.

## Perimetre traite

- page `/planning`
- vues planning presentes dans le code
- navigation planning
- lisibilite metier
- densite visuelle
- grilles/tableaux
- filtres
- actions principales/secondaires
- etats visuels
- coherence avec references A24
- ecarts a reserver pour A25
- zones sensibles fonctionnelles
- risques de regression

## Exclusions appliquees

- aucun patch code planning
- aucune refonte moteur planning/autoschedule/matching
- aucune modification RBAC/Prisma/API metier

## Verdict audit

NON CONFORME (sur le plan UI/UX vis-a-vis de `Planning_V1.2.png`) avec cartographie exploitable pour A25.

## Dossiers session

- Session : `docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-08_A24_A24-UI-08`
- Patch : `docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-08_A24_A24-UI-08/PATCH`
- Captures avant : `docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-08_A24_A24-UI-08/CAPTURES_AVANT`