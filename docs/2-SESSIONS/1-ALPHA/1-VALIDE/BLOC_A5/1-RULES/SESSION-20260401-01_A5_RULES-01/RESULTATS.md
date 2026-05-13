# RESULTATS

## Résultat principal
Verdict d’audit : **NO_PATCH — MODULE PRÉSENT MAIS PARTIEL**

## Qualification de l’état réel
- **présent** :
  - data `CompanyRule`
  - enum `RuleMode`
  - migration dédiée
  - API lecture/écriture
  - garde permission d’écriture `COMPANY_RULES_MANAGE`
- **partiel** :
  - usage réel dans le produit
  - modes avancés réellement exploitables depuis l’API/UI
  - écran de paramètres métier compréhensible
- **manquant / non prouvé dans le périmètre inspecté** :
  - UI dédiée règles métier société
  - API métier structurée en paramètres compréhensibles
  - couverture ALPHA des règles 08.2 hors repos minimum
  - gestion explicite des modes `ALERT/BLOCK/BOTH` depuis l’interface de gestion

## Constats consolidés
1. Le modèle réel est un stockage **technique clé/valeur** avec sévérité, pas un module métier compréhensible.
2. La seule règle purement UI prouvée est `PLANNING_VIEW_MODE`.
3. La seule règle métier opérationnelle prouvée est `PLANNING_MIN_REST_HOURS`.
4. Le repos minimum est utilisé :
   - en affectation manuelle `Shift`
   - en affectation manuelle `DraftShift`
   - à la publication d’un run autoschedule
5. Le matching / auto-assign n’utilise pas `CompanyRule` dans le dépôt inspecté.
6. Le `PATCH /api/company/rules` crée une nouvelle règle en `OFF` et ne permet pas de modifier `mode` :
   - conséquence réelle : l’API existante ne suffit pas à activer une nouvelle règle métier opérationnelle.
7. `app/company/page.tsx` ne couvre pas les règles métier ; elle couvre le profil société.

## Correctif
Aucun correctif minimal immédiat n’est légitime dans cette session d’audit.  
Livrable retenu : **NO_PATCH**.
