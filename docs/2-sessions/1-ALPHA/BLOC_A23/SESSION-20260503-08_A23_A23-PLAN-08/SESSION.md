# SESSION

## ID SESSION

SESSION-20260503-08_A23_A23-PLAN-08

## Date

04/05/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Stage : 1-ALPHA  
Bloc : A23  
Type : CORRECTION+COMPLETION  
SessionCode : A23-PLAN-08  
Intitule : Correction / completion du planning manuel prioritaire

## Objectif de la session

Corriger et completer uniquement le parcours planning manuel ADMIN sur le perimetre prioritaire :
- affectation utilisateur exploitable ;
- coherence template -> horaires ;
- preservation modification shift ;
- preservation annulation logique.

## Perimetre exact traite

- `app/planning/manual-planning-panel.tsx`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/route.ts`
- script de preuve session : `.codex-temp/a23-plan08-validate.mjs`

Hors perimetre : RBAC global, module users/RH, migrations Prisma, autoschedule, refonte UI globale.

## Decision patch

`PATCH`

Justification :
- bug/defaut de comportement confirme sur `template -> horaires` ;
- completion requise pour rendre l'affectation utilisable dans le panneau manuel ;
- corrections code necessaires pour atteindre la DoD.

## Resultat synthetique de session

- Cause reelle du `assign_status=400` A23-PLAN-07 identifiee : payload vide `{}` construit par le script d'audit precedent (parsing incorrect de `GET /api/users`, qui retourne `data.items`).
- Affectation utilisateur rendue exploitable dans le panneau manuel (slot 1 + slot 2 si template a 2 slots), avec persistence verifiee.
- Synchronisation template -> horaires appliquee cote UI (formulaire creation/edition) et verrouillee cote API (`TEMPLATE_TIME_MISMATCH` en cas d'ecart).
- Cas traversant minuit `16:00-00:00` preserve sur creation, edition et persistence.
- Annulation logique preservee (`isCancelled=true`, `cancelledAt`, `cancellationReason`, sans suppression physique).

## Dossiers lies

- Session : docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-08_A23_A23-PLAN-08
- Patch principal : docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-08_A23_A23-PLAN-08/PATCH/PATCH__SESSION-20260503-08_A23_A23-PLAN-08.diff
- Annexe brute : docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-08_A23_A23-PLAN-08/ANNEXE_PREUVE_BRUTE_NODE.md
