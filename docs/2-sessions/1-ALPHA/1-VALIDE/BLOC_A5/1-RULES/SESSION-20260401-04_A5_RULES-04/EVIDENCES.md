# EVIDENCES

## Documentation utilisée
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

## Écarts réels confirmés avant correction
- `lib/services/planning/assign-shift.ts` (état audité `RULES-03`) : la règle repos minimum était lue, mais une valeur invalide revenait implicitement à ignorer la règle.
- `lib/services/planning/assign-draftshift.ts` (état audité `RULES-03`) : même constat.
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts:240-263`
  - `OFF` désactive explicitement la règle ;
  - valeur invalide => `RULE_CONFIG_ERROR`.
- `app/api/planning/shifts/[id]/assign/route.ts` (état audité `RULES-03`) : la route renvoyait l’item mis à jour, pas les `issues`.
- `app/planning/planning-client.tsx` (état audité `RULES-03`) : le client affichait `Affectation enregistrée ✅` sans exploiter les alertes calculées.

## Preuves après correction
### Typage des issues planning
- `lib/types/planning.ts:3-20`
  - ajout de `RULE_CONFIG_ERROR` dans `PlanningIssueCode`.

### Harmonisation manuelle de `PLANNING_MIN_REST_HOURS`
- `lib/services/planning/assign-shift.ts:34-57`
  - `OFF` => règle désactivée ;
  - absence => règle désactivée ;
  - valeur invalide => `CONFIG_ERROR` explicite.
- `lib/services/planning/assign-shift.ts:209-244`
  - `CONFIG_ERROR` remonté en `RULE_CONFIG_ERROR` ;
  - `ALERT` / `BOTH` continuent de produire `MIN_REST_VIOLATION` ;
  - `BLOCK` / `BOTH` continuent de bloquer via `RULE_BLOCKED`.
- `lib/services/planning/assign-draftshift.ts:33-56`
  - même harmonisation sur le draft.
- `lib/services/planning/assign-draftshift.ts:217-259`
  - même conservation de la logique `ALERT` / `BLOCK`.

### Remontée API des alertes manuelles
- `app/api/planning/shifts/[id]/assign/route.ts:185-223`
  - la route draft renvoie désormais `RULE_CONFIG_ERROR` en 400 ;
  - la réponse succès draft inclut `issues`.
- `app/api/planning/shifts/[id]/assign/route.ts:267-323`
  - même correction pour le chemin shift publié.

### Remontée UI lisible
- `app/planning/planning-client.tsx:57-61`
  - type local `ManualAssignIssue`.
- `app/planning/planning-client.tsx:281-292`
  - fonction de formatage des alertes manuelles.
- `app/planning/planning-client.tsx:1143-1166`
  - affichage lisible de `RULE_BLOCKED` et `RULE_CONFIG_ERROR`.
- `app/planning/planning-client.tsx:1192-1200`
  - affichage d’un succès enrichi quand `issues` contient `MIN_REST_VIOLATION`.

## Éléments explicitement laissés hors scope
- `app/api/company/rules/route.ts`
  - aucune refonte nécessaire pour `PLANNING_VIEW_MODE` dans cette session.
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
  - le comportement existant était déjà la référence la plus stricte pour la configuration invalide ; il n’a pas été modifié.

## Validations réelles consolidées
### Intégration confirmée
- `git apply --check` du patch principal : OK
- `git apply` du patch principal : OK
- `npm run lint` : OK
- `npm run build` : OK

### À confirmer
- `npx prisma validate`
  - non rejoué dans l’intégration finale de clôture documentaire.
- `npx prisma generate`
  - non rejoué dans l’intégration finale de clôture documentaire.
