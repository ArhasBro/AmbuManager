# NO_PATCH

Session : SESSION-20260401-02_A5_RULES-02  
Type : VALIDATION

## Décision
Aucun patch code minimal n’est légitime dans le périmètre strict de cette session.

## Justification
La vérification formelle du modèle actuel montre que :
- `CompanyRule` existe réellement ;
- `RuleMode` existe réellement ;
- le schéma Prisma, la migration SQL et les requêtes du code sont cohérents ;
- l’unicité `(companyId, key)` est correctement en place ;
- le stockage `value: String` supporte les usages prouvés `PLANNING_MIN_REST_HOURS` et `PLANNING_VIEW_MODE` ;
- le champ `mode` est sain pour l’existant :
  - réellement exploité pour `PLANNING_MIN_REST_HOURS`
  - toléré sans impact pour `PLANNING_VIEW_MODE`

Les écarts constatés concernent surtout le futur enrichissement du module A5 et non un défaut bloquant du modèle actuel.

## Verdict
**NO_PATCH — MODÈLE ACTUEL CONFORME POUR LES USAGES RÉELS DÉJÀ BRANCHÉS**
