# SESSION

## ID SESSION
`SESSION-20260416-06_A11_AUDIT-LOT-02-09`

## Date
16/04/2026

## Contexte
Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : `1-ALPHA`  
Bloc : `A11 — Audit / traçabilité`  
Type : `CORRECTION-COMPLÉTION`

## Objet retenu
Correction et/ou complétion strictement bornée de l’existant A11 sur les écarts réellement traités, avec finalisation par patch principal retenu complété par `FIX-03` puis `FIX-04`.

## Patchs retenus
- `PATCH__SESSION-20260416-06_A11_AUDIT-LOT-02-09.diff`
- `PATCH__SESSION-20260416-06_A11_AUDIT-LOT-02-09_FIX-03.diff`
- `PATCH__SESSION-20260416-06_A11_AUDIT-LOT-02-09_FIX-04.diff`

## Patchs abandonnés
- `PATCH__SESSION-20260416-06_A11_AUDIT-LOT-02-09_FIX-01.diff`
- `PATCH__SESSION-20260416-06_A11_AUDIT-LOT-02-09_FIX-02.diff`

## Périmètre réellement livré
- audit des connexions persistant ;
- lecture audit dédiée minimale ;
- page dédiée audit minimale ;
- protection de `includeHistory=1` par le droit audit ;
- ouverture minimale de l’accès audit au support global ;
- amélioration partielle de la traçabilité après publication ;
- correction TypeScript de `resolveRunMatchingVariant(...)` ;
- correction de build liée à `canViewAudit` dans `PlanningClient(...)`.

## Limites conservées
- audit utilisateurs / véhicules / dépôts complet : **non prouvé comme livré complètement** ;
- lecture audit dédiée : **minimale** ;
- page audit : **minimale** ;
- session bornée à une **correction-complétion**, sans validation de bloc.
