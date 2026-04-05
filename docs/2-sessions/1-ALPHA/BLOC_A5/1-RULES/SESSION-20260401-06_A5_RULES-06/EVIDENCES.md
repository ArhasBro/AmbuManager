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

## Éléments prouvés par le code final retenu
### API paramètres métier ALPHA exposée via une couche dédiée
Le résultat final retenu repose sur :
- `app/api/company/rules/route.ts`
- `lib/company-rules/api.ts`
- `lib/company-rules/catalog.ts`
- `lib/company-rules/runtime.ts`

Le stockage réel reste basé sur `CompanyRule`, tandis que l’API expose une couche dédiée plus lisible pour les paramètres métier ALPHA.

### Compatibilité réelle conservée
- `PLANNING_MIN_REST_HOURS` reste compatible avec le moteur réellement branché.
- `PLANNING_VIEW_MODE` reste fonctionnel, mais explicitement séparé du moteur comme réglage UI/exploitation.
- Aucune règle non branchée n’a été artificiellement implémentée comme moteur réel.

## Chaîne de patchs finale retenue
### Patch principal
- `PATCH__SESSION-20260401-06_A5_RULES-06.diff`
- objet : exposer une API paramètres métier ALPHA lisible au-dessus de la couche centrale existante.

### Correctif retenu de typage
- `PATCH__SESSION-20260401-06_A5_RULES-06_FIX-03.diff`
- objet : corriger le typage de `DEFINITIONS_BY_ID` dans `lib/company-rules/api.ts` pour accepter une clé `string`.

### Patch de régularisation finale
- `PATCH__SESSION-20260401-06_A5_RULES-06_FIX-04.diff`
- objet : formaliser proprement dans la chaîne officielle l’existence correcte de `lib/company-rules/api.ts` dans sa version finale validée.
- nature : aucun changement fonctionnel, aucun changement moteur.

## Éléments prouvés par terminal
### Patch principal
- `git apply --check` : OK
- `git apply` : OK

### Correctif retenu `FIX-03`
- `git apply --check` : OK
- `git apply` : OK

### Validations terminales finales sur repo équipé
- `npm run lint` : OK
- `npm run build` : OK

## Interprétations à ne pas écrire comme faits prouvés
- que `FIX-01` serait le correctif final retenu ;
- qu’un `FIX-02` aurait été appliqué ;
- que `RULES-06` a absorbé `RULES-07`, `RULES-08` ou `RULES-09` ;
- que les règles non branchées seraient désormais enforced par le moteur.
