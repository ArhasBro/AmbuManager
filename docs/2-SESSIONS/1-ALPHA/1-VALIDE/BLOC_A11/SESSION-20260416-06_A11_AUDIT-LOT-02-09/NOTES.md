# NOTES

## Méthode retenue
Finalisation documentaire strictement recalée sur l’état final validé côté code : patch principal retenu + `FIX-03` + `FIX-04`.

## Points structurants retenus
1. `FIX-01` et `FIX-02` sont explicitement **abandonnés / non retenus**.
2. La correction TypeScript sur `resolveRunMatchingVariant(...)` est retenue via `FIX-03`.
3. La correction de build sur `canViewAudit` manquant dans `PlanningClient(...)` est retenue via `FIX-04`.
4. Les validations terminales finales à documenter sont celles fournies comme état final retenu, avec **build final OK**.
5. La documentation ne doit pas suraffirmer un audit utilisateurs / véhicules / dépôts complet si non prouvé par le patch retenu.
6. La lecture audit et la page dédiée audit doivent être qualifiées comme **minimales**.

## Portée documentaire
- aucun changement code ;
- aucun nouveau fix ;
- aucune réouverture de `AUDIT-10` ;
- aucune réouverture de `CLOTURE_A11`.
