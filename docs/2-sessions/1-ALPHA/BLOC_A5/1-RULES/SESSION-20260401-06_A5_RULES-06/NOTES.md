# NOTES

## Méthode documentaire retenue
Cette clôture documentaire ne rejoue pas la session.
Elle consigne uniquement les faits prouvés et retenus dans la chaîne finale validée de `RULES-06` :
- patch principal produit ;
- correctif retenu de typage `FIX-03` ;
- patch de régularisation `FIX-04` pour aligner la chaîne officielle avec l’état réellement validé ;
- validations terminales finales OK sur repo équipé.

## Défaut réel retenu dans l’historique
Le besoin métier de `RULES-06` était bien l’exposition d’une API paramètres métier lisible au-dessus de la couche centrale validée en `RULES-05`.

Le point de correction réellement retenu dans la chaîne finale est un défaut de typage dans `lib/company-rules/api.ts`, corrigé par `FIX-03` :
- `DEFINITIONS_BY_ID` était inférée avec une clé littérale trop stricte ;
- `getCompanyParameterDefinitionById()` recevait `id: string | null | undefined` ;
- la régularisation finale `FIX-04` formalise ensuite l’existence correcte de `lib/company-rules/api.ts` dans la chaîne officielle, sans changement fonctionnel.

## Tentatives intermédiaires à ne pas retenir comme chaîne finale
- `FIX-01` ne doit pas être présenté comme correctif retenu final.
- Aucun `FIX-02` appliqué n’est prouvé.
- Si `FIX-01` est mentionné, il doit l’être uniquement comme tentative intermédiaire non retenue dans la chaîne finale validée.

## Ce que `RULES-06` valide réellement
- une API paramètres métier ALPHA compréhensible existe réellement dans le code ;
- cette API reste compatible avec `CompanyRule` comme stockage réel ;
- `PLANNING_MIN_REST_HOURS` reste compatible avec le comportement réellement branché ;
- `PLANNING_VIEW_MODE` reste fonctionnel mais séparé du moteur ;
- aucune fausse implémentation moteur n’a été ajoutée pour les règles non branchées ;
- `RULES-07`, `RULES-08` et `RULES-09` ne sont pas absorbées par cette session.

## Ce que `RULES-06` ne valide pas
À ne pas écrire comme fait prouvé pour cette session :
- écran final de paramètres société ;
- élargissement abusif du moteur ;
- enforcement moteur réel des règles encore non branchées ;
- refonte de permissions/RBAC au-delà du strict nécessaire.
