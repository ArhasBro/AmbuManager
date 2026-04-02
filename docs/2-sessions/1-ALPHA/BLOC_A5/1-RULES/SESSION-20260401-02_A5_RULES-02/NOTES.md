# NOTES

## Méthode / observations
- Relecture de la documentation maître autorisée avant contrôle.
- Vérification croisée du schéma Prisma, de la migration SQL et des usages réels dans le code.
- Vérification spécifique des deux usages prouvés :
  - `PLANNING_MIN_REST_HOURS`
  - `PLANNING_VIEW_MODE`
- Vérification du rôle réel de `mode` selon les flux déjà branchés.

## Constats de travail
- `CompanyRule` existe réellement dans le schéma Prisma, rattaché à `Company`.
- `RuleMode` existe réellement avec les valeurs `OFF`, `ALERT`, `BLOCK`, `BOTH`.
- La migration SQL est alignée sur le schéma Prisma contrôlé.
- L’unicité `(companyId, key)` est bien présente en Prisma et en SQL.
- Le champ `value` stocké en texte supporte correctement les deux usages prouvés :
  - valeur numérique pour `PLANNING_MIN_REST_HOURS`
  - valeur textuelle pour `PLANNING_VIEW_MODE`
- Le champ `mode` est réellement exploité pour la règle de repos minimum.
- Le champ `mode` n’est pas nécessaire au fonctionnement prouvé de `PLANNING_VIEW_MODE` ; il reste stocké mais non pilotant pour ce réglage UI.
- La route `PATCH /api/company/rules` ne permet pas de modifier `mode` et crée une nouvelle règle en `OFF`.
- Cette limite affecte la montée vers un futur module métier plus riche, mais ne casse pas le modèle actuel pour les usages déjà prouvés.

## Conclusion de travail
Le bon verdict pour `RULES-02` est :
**NO_PATCH — MODÈLE ACTUEL CONFORME POUR LES USAGES RÉELS DÉJÀ BRANCHÉS**
