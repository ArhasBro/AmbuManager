# SESSION

## ID SESSION

SESSION-20260503-02_A23_A23-LOGIN-02

## Date

03/05/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturite : 1-ALPHA  
Bloc : A23  
Type : CORRECTION  
Intitule : Correction de l'hydratation session / shell apres connexion

## Objectif de la session

Corriger le flux post-login pour obtenir, des l'arrivee sur le dashboard, un shell coherent (sidebar, topbar, utilisateur, role, societe) sans refresh manuel.

## Perimetre exact traite

- Flux de connexion dans `app/login/page.tsx`
- Navigation immediate apres `signIn("credentials", { redirect:false })`
- Coherence de l'affichage shell post-login (dashboard/sidebar/topbar/session)

Exclusions respectees (non traitees) :
- module users et erreurs `GET /api/users` 500 ;
- migration RH/Prisma large ;
- planning, templates, regles societe ;
- refonte UI/UX globale.

## Resultat synthetique de session

- Cause confirmee : le shell est calcule dans le layout serveur racine (`app/layout.tsx`) et la navigation client depuis `/login` conservait un contexte pouvant rester obsolet jusqu'au refresh manuel.
- Correction appliquee : redirection post-login forcee en navigation navigateur (`window.location.replace`) pour forcer un nouveau rendu serveur immediat avec session hydratee.
- DoD cible atteint sur validation fonctionnelle disponible : plus de fallback shell non connecte au premier rendu dashboard apres login.

## Dossiers lies

- Session : docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-02_A23_A23-LOGIN-02
- PATCH   : docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-02_A23_A23-LOGIN-02/PATCH