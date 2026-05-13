# EVIDENCES

## Sources documentaires utilisées
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`

## Éléments prouvés par le code produit
### Couche métier centrale réelle et minimale
Le patch principal `PATCH__SESSION-20260401-05_A5_RULES-05.diff` introduit une couche dédiée au-dessus de `CompanyRule` :
- `lib/company-rules/catalog.ts`
- `lib/company-rules/runtime.ts`

Cette couche centralise la définition métier minimale et distingue explicitement :
- les paramètres métier ALPHA ;
- le réglage UI `PLANNING_VIEW_MODE`.

### Compatibilité réelle conservée
Le code de `RULES-05` maintient les usages déjà branchés :
- `PLANNING_MIN_REST_HOURS` reste branché dans les flux planning/autoschedule ;
- `PLANNING_VIEW_MODE` reste fonctionnel côté planning ;
- aucune fausse implémentation moteur n’a été ajoutée pour les règles non branchées.

## Éléments prouvés par terminal
### Patch principal
- `git apply --check` patch principal : OK
- `git apply` patch principal : OK
- `npm run lint` : OK
- `npm run build` : échec initial sur `Cannot find name 'MIN_REST_RULE_KEY'`

### Correctif minimal `FIX-01`
- `git apply --check` fix : OK
- `git apply` fix : OK
- `npm run lint` après fix : OK
- `npm run build` après fix : OK

## Élément corrigé par `FIX-01`
Le correctif minimal `PATCH__SESSION-20260401-05_A5_RULES-05_FIX-01.diff` corrige uniquement le résidu suivant :
- fichier : `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- défaut : usage résiduel de `MIN_REST_RULE_KEY`
- résultat : correction ciblée sans refaire le patch principal et sans casser la centralisation de `RULES-05`

## Interprétations à ne pas écrire comme faits prouvés
- que le patch principal était parfait du premier coup ;
- que `RULES-05` a livré l’API finale produit ;
- que `RULES-05` a livré l’UI finale produit ;
- que les règles non branchées sont désormais réellement enforced par le moteur ;
- que `RULES-06`, `RULES-07` ou `RULES-08` auraient été absorbés.
