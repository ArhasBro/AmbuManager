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
### UI paramètres métier ALPHA réellement ajoutée
Le résultat final retenu repose sur :
- `app/company/page.tsx`
- `app/company/company-rules-panel.tsx`
- `app/api/company/rules/route.ts`
- `lib/company-rules/api.ts`
- `lib/company-rules/catalog.ts`
- `lib/company-rules/runtime.ts`

La page société expose désormais un panneau dédié qui affiche les paramètres métier de façon lisible, avec valeur, statut, type, nature, éditabilité et séparation explicite entre moteur et UI.

### Compatibilité réelle conservée
- `PLANNING_MIN_REST_HOURS` reste la règle métier ALPHA réellement branchée dans le périmètre contrôlé.
- `PLANNING_VIEW_MODE` reste consommé comme réglage UI / exploitation dans `app/planning/planning-client.tsx`.
- Les règles préparées sans stockage prouvé ne sont pas artificiellement présentées comme moteur réel.
- Aucun changement de permission n’a été nécessaire pour valider le besoin de `RULES-07`.

## Chaîne de patchs finale retenue
### Patch principal
- `PATCH__SESSION-20260401-07_A5_RULES-07.diff`
- objet : ajouter une UI paramètres métier ALPHA lisible sur la page société existante, branchée sur l’API réelle, sans rejouer `RULES-05` / `RULES-06` et sans ajouter de nouveau moteur.

## Éléments prouvés par terminal
### Patch principal
- `git apply --check ".\\docs\\3-patches\\1-ALPHA\\BLOC_A5\\1-RULES\\SESSION-20260401-07_A5_RULES-07\\PATCH__SESSION-20260401-07_A5_RULES-07.diff"` : OK
- `git apply ".\\docs\\3-patches\\1-ALPHA\\BLOC_A5\\1-RULES\\SESSION-20260401-07_A5_RULES-07\\PATCH__SESSION-20260401-07_A5_RULES-07.diff"` : OK
- `npm run lint` : OK
- `npm run build` : OK

## Interprétations à ne pas écrire comme faits prouvés
- que les règles préparées seraient désormais enforced par le moteur ;
- que `RULES-07` aurait absorbé `RULES-08` ou `RULES-09` ;
- qu’une refonte RBAC aurait été nécessaire pour cette session ;
- que la page société aurait été refondue au-delà du besoin strict de paramètres métier ALPHA.
