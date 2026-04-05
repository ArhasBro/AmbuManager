# NO_PATCH

Session : SESSION-20260401-03_A5_RULES-03  
Type : AUDIT

## Décision
Aucun patch code officiel n’est produit dans cette session.

## Justification
L’audit factuel du dépôt montre que :
- `CompanyRule` est réellement utilisé ;
- la seule vraie règle moteur prouvée est `PLANNING_MIN_REST_HOURS` ;
- `PLANNING_VIEW_MODE` est un réglage UI entreprise, pas une règle moteur ;
- `RuleMode` est exploité de manière réelle mais non homogène selon les flux ;
- l’affectation manuelle, la publication autoschedule et la remontée UI ne sont pas parfaitement alignées.

Ces écarts sont suffisamment réels pour être documentés, mais leur correction propre ne relève plus d’un simple audit :
- elle toucherait plusieurs fichiers et plusieurs couches ;
- elle nécessiterait une correction dédiée plutôt qu’un patch opportuniste embarqué dans `RULES-03`.

## État retenu
**PARTIEL — usage moteur réel prouvé, mais comportement non homogène selon les flux**

## Verdict
**NO_PATCH — USAGE RÉEL PARTIEL ET HÉTÉROGÈNE DES RÈGLES DANS LE MOTEUR**
