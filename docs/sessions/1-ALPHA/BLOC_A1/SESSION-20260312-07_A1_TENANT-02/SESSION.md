# SESSION

## ID SESSION

SESSION-20260312-07_A1_TENANT-02

## Date

12/03/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A1  
Type : CORRECTION

## Intitulé

TENANT-02 — CORRECTION — Correction des routes/API non correctement cloisonnées

## Objectif

Corriger uniquement les routes/API réellement insuffisamment cloisonnées côté multi-tenant, à partir des constats prouvés par `TENANT-01` et du code réel, sans ouvrir de refonte ni déborder du périmètre.

## Périmètre strict

Inclus :
- correction des lectures inter-tenant non justifiées si elles existent réellement ;
- correction des mutations finales insuffisamment bornées par tenant si le code réel le prouve ;
- production d’un patch minimal, lisible et défendable ;
- mise à jour de la documentation de session.

Exclus :
- refonte architecture ;
- RBAC global hors lien strict avec l’isolation tenant ;
- auth hors ce qui sert à porter ou contrôler le tenant ;
- création utilisateur ;
- reset password hors dimension cloisonnement tenant ;
- migrations non strictement nécessaires ;
- optimisation technique ;
- autres sessions.

## Constats de départ réellement visés

À partir de `TENANT-01`, les défauts réellement ciblés étaient :

1. `app/api/health/prisma/route.ts`
   - exposition de compteurs globaux non bornés par tenant ;

2. mutations finales avec borne tenant surtout implicite via pré-vérification applicative, puis écriture finale par `id` seul :
   - `app/api/vehicles/route.ts`
   - `app/api/users/[id]/reset-password/route.ts`
   - `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`

## Fichiers code modifiés

- `app/api/health/prisma/route.ts`
- `app/api/vehicles/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`

## Résumé des corrections appliquées

- `health/prisma` :
  - remplacement des compteurs globaux par des compteurs bornés à `session.user.companyId` ;

- `vehicles DELETE` :
  - suppression finale bornée par `id + companyId` ;

- `users/[id]/reset-password` :
  - mise à jour finale bornée par `id + companyId` ;
  - relecture finale bornée au même tenant ;

- `planning/autoschedule/runs/[id]/cancel` :
  - annulation finale bornée par `id + companyId`.

## Résultat final prouvé

Sur le dépôt cible après application contrôlée du patch code via le `.diff`, avec exclusion volontaire des fichiers de documentation :

- application du patch code via le `.diff` avec exclusion des fichiers de documentation : OK
- `npm run lint` : OK
- `npm run build` : OK

## Verdict session

conforme