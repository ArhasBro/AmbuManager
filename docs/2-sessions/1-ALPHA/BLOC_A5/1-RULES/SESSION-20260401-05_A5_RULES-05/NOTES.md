# NOTES

## Méthode documentaire retenue
Cette clôture documentaire ne rejoue pas la session.
Elle se limite à consigner les faits prouvés et validés officiellement pour `RULES-05` :
- patch principal appliqué ;
- défaut build réel constaté ;
- correctif minimal `FIX-01` appliqué ;
- validations finales OK après fix.

## Défaut réel retenu dans l’historique
Le patch principal de `RULES-05` était valide sur l’intention métier, mais il conservait un résidu technique :
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- erreur build : `Cannot find name 'MIN_REST_RULE_KEY'`

Ce défaut ne remettait pas en cause la logique de centralisation ; il nécessitait un correctif minimal uniquement.

## Ce que `RULES-05` valide réellement
`RULES-05` valide la mise en place d’une couche métier centrale réelle et minimale, compatible avec le stockage `CompanyRule`.

Points validés :
- représentation centrale des paramètres métier ALPHA préparés pour la suite ;
- séparation explicite entre règle métier et réglage UI ;
- conservation du branchement réel de `PLANNING_MIN_REST_HOURS` ;
- maintien du fonctionnement de `PLANNING_VIEW_MODE`, clairement séparé du moteur ;
- absence de faux enforcement moteur sur les règles non branchées.

## Ce que `RULES-05` ne valide pas
À ne pas écrire comme fait prouvé pour cette session :
- API finale produit complète des paramètres société ;
- UI finale des paramètres société ;
- enforcement moteur des règles ALPHA encore non branchées ;
- absorption de `RULES-06`, `RULES-07` ou `RULES-08`.
