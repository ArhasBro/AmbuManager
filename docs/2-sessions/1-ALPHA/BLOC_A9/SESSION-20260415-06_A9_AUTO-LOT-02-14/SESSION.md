# SESSION

## ID SESSION

SESSION-20260415-06_A9_AUTO-LOT-02-14

## Date

15/04/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A9 — Autoschedule  
Type : CORRECTION-COMPLÉTION  
Intitulé : Correction ciblée des générations, de l’auto-affectation et des contraintes autoschedule ALPHA

## Objectif de la session

Corriger et compléter l’autoschedule existant sur le code réel pour le lot `AUTO-LOT-02-14`, sans dériver vers A10, afin de réaligner le bloc A9 sur le cadrage ALPHA concernant :
- le choix gérant entre génération de shifts seuls et génération avec auto-affectation ;
- la couverture réelle des indisponibilités utilisateurs ;
- la couverture réelle des indisponibilités véhicules ;
- la prise en compte des contraintes rôles / véhicules ;
- la conservation du repos minimum ;
- la lisibilité métier et la traduction française des éléments autoschedule.

## Périmètre exact traité

### Code modifié par le patch principal
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`
- `app/planning/planning-client.tsx`
- `lib/services/planning/matching.service.ts`
- `lib/services/planning/matching-quality.ts`
- `lib/templates/template-rules.ts`

### Code modifié par le fix complémentaire
- `lib/services/planning/matching.service.ts`

### Code relu sans modification complémentaire
- `app/api/planning/autoschedule/runs/route.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
- `app/planning/page.tsx`
- `lib/services/planning/autoschedule-match.ts`
- `lib/services/planning/user-absence.ts`
- `lib/services/planning/planning-audit.ts`
- `lib/company-rules/runtime.ts`
- `lib/company-rules/catalog.ts`
- `lib/types/planning.ts`
- `prisma/schema.prisma`

## Patchs rattachés à la session

- patch principal : `PATCH__SESSION-20260415-06_A9_AUTO-LOT-02-14.diff`
- fix complémentaire : `PATCH__SESSION-20260415-06_A9_AUTO-LOT-02-14_FIX-01.diff`

## Résultat synthétique de session

Le lot `AUTO-LOT-02-14` est livré sur le code réel avec un patch principal A9, puis un correctif minimal `FIX-01` strictement local à `matching.service.ts` pour corriger une erreur de build prouvée sur la portée de `draftState`.

Le correctif cumulé apporte :
- un mode explicite `SHIFTS_ONLY` / `AUTO_ASSIGN` au lancement JOUR et SEMAINE ;
- une auto-affectation réelle des employés **et** des véhicules en mode `AUTO_ASSIGN` ;
- une prise en compte renforcée des absences utilisateur, des chevauchements existants, du repos minimum et des contraintes rôles / véhicules ;
- une revalidation côté publication sur l’état des véhicules, leur type et la compatibilité rôles / véhicules ;
- une amélioration nette des messages UI et des résumés d’audit en français ;
- une correction locale de build sur la transmission de `draftState` dans le flux de choix véhicule.

Les validations terminales réellement prouvées à l’issue du code validé sont :
- `npx prisma validate` : **OK**
- `npx prisma generate` : **OK**
- `npm run lint` : **OK**
- `npm run build` : **OK**

Le résiduel prouvé principal reste l’absence de modèle dédié d’indisponibilité véhicule déclarative dans le schéma courant ; la couverture véhicule reste donc partiellement bornée au statut actif / inactif et aux conflits de planning.

## Dossiers liés

- Session : `docs/2-sessions/1-ALPHA/BLOC_A9/SESSION-20260415-06_A9_AUTO-LOT-02-14`
- Patchs  : `docs/3-patches/1-ALPHA/BLOC_A9/SESSION-20260415-06_A9_AUTO-LOT-02-14`
