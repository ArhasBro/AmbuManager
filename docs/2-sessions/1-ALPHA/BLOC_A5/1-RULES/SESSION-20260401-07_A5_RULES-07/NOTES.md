# NOTES

## Méthode documentaire retenue
Cette clôture documentaire ne rejoue pas la session.
Elle consigne uniquement les faits prouvés et retenus dans la chaîne finale validée de `RULES-07` :
- patch principal produit et validé ;
- aucune correction code supplémentaire retenue ;
- validations terminales finales OK ;
- clôture documentaire réalisée séparément via un patch docs unique.

## Défaut réel retenu dans l’historique
Le besoin métier réel de `RULES-07` était l’absence d’une UI paramètres métier ALPHA exploitable sur la page société, malgré la présence :
- d’une couche centrale validée en `RULES-05` ;
- d’une API lisible validée en `RULES-06`.

Le défaut retenu n’était donc pas moteur ni RBAC, mais bien un manque d’interface métier lisible pour exposer correctement les paramètres déjà préparés.

## Ce que `RULES-07` valide réellement
- une UI paramètres métier ALPHA existe réellement dans le code ;
- cette UI est branchée sur l’API `company rules` existante ;
- `PLANNING_MIN_REST_HOURS` reste éditable via le stockage réel déjà prouvé ;
- `PLANNING_VIEW_MODE` reste fonctionnel comme réglage UI / exploitation, distinct du moteur ;
- les règles préparées sans stockage prouvé restent visibles mais non éditables ;
- aucune permission supplémentaire n’a été introduite ;
- aucun nouveau moteur n’a été ajouté.

## Ce que `RULES-07` ne valide pas
À ne pas écrire comme fait prouvé pour cette session :
- enforcement moteur réel des règles encore non branchées ;
- gestion avancée des droits au-delà de `COMPANY_RULES_MANAGE` ;
- absorption de `RULES-08` ou `RULES-09` ;
- refonte large de la page société hors scope strict des paramètres métier ALPHA.
