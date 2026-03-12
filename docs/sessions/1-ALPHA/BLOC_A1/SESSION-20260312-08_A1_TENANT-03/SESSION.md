# SESSION

## ID SESSION

SESSION-20260312-08_A1_TENANT-03

## Date

12/03/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A1  
Type : CORRECTION

## Intitulé

TENANT-03 — CORRECTION — Vérification et remise à niveau du cloisonnement UI si nécessaire

## Objectif

Vérifier le cloisonnement UI réellement existant après `TENANT-01` et `TENANT-02`, puis corriger uniquement les zones d’interface qui restent insuffisamment cloisonnées si le code réel le prouve, sans ouvrir de refonte ni déborder du périmètre.

## Périmètre strict

Inclus :
- inspection des pages UI prioritaires liées au tenant ;
- contrôle des gardes serveur sur les pages applicatives ;
- contrôle des composants/flux UI strictement utiles au cloisonnement tenant ;
- correction minimale si une page expose encore une UI produit sans garde tenant explicite ;
- mise à jour de la documentation de session ;
- production du patch `.diff`.

Exclus :
- refonte UX/UI ;
- RBAC global hors lien strict avec l’isolation tenant ;
- auth au sens large hors portage/contrôle du tenant ;
- création utilisateur ;
- reset password hors dimension cloisonnement tenant ;
- optimisation technique ;
- autres sessions.

## Constats de départ réellement visés

À partir des sessions précédentes utiles :

1. `TENANT-01` avait retenu un cloisonnement UI planning réel mais plus indirect que sur `/vehicles`, car `/planning` reposait surtout sur `proxy.ts` et sur les APIs planning ;
2. `TENANT-02` a corrigé les routes/API insuffisamment cloisonnées et a été validée `conforme` ;
3. les pages `/vehicles` et `/users` portent déjà une garde serveur explicite liée à la session et au tenant ;
4. la zone réellement à remettre à niveau côté UI restait donc prioritairement `app/planning/page.tsx`.

## Fichier code modifié

- `app/planning/page.tsx`

## Résumé de la correction appliquée

- ajout d’un contrôle serveur explicite sur `/planning` via `getServerSession(authOptions)` ;
- redirection vers `/login` si `session.user.id` ou `session.user.companyId` est absent ;
- conservation du comportement produit existant pour les utilisateurs correctement rattachés à un tenant.

## Résultat final prouvé

Sur le dépôt cible :

- défaut UI réellement visé identifié et corrigé sur `/planning` ;
- patch TENANT-03 appliqué dans le dépôt ;
- `git apply --check` du patch : OK ;
- `npm run lint` : OK ;
- `npm run build` : OK.

## Verdict session

conforme
