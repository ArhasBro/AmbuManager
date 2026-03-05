# RESULTATS

## Résultats obtenus

- DoD 4.4 : **VALIDÉ**
- Scénarios exécutés + preuves consignées dans `docs/sessions/SESSION-20260304-01/EVIDENCES.md` :
  - T1 WEEK (ADMIN A) : run `cmmdblltx0000b47kad73zl8v` → publish `PUBLISHED` → shifts visibles
  - T2 CANCEL (ADMIN A) : run `cmmdbqyow0018b47kzdyl38tn` → `CANCELLED`
  - T3 DRAFT_ALREADY_EXISTS (ADMIN A) : run `cmmdbsq3n0022b47kxia55tpl` → reprise du même runId
  - T4 403 publish (PLANNER A) : run `cmmdcq34e00005g7kt80mmpyh` → `FORBIDDEN` + `PLANNING_AUTOSCHEDULE_PUBLISH requis`
  - T5 403 autoschedule (VIEWER A) : `FORBIDDEN`
  - T6 401 sans session : `UNAUTHORIZED` sur lecture run
  - T7 cross-tenant : run_B `cmmdcyp17000u5g7kvoe9hws7` vu depuis tenant A → `NOT_FOUND`

## Documents modifiés

### Session
- `docs/sessions/SESSION-20260304-01/EVIDENCES.md` (preuves d’exécution ajoutées)
- `docs/sessions/SESSION-20260304-01/RESULTATS.md` (ce fichier)

### Master (clôture 4.4)
- `docs/master/ETAT_GLOBAL_PROJET.md` (4.4 → VALIDÉ)
- `docs/master/REGISTRE_DECISIONS.md` (décisions 4.4 + alignement statuts)

## Patchs appliqués (4.4)

- `SESSION-20260304-01__4.4__rbac-publish_seed-tenants_dbreset.diff` : RBAC publish + seed A/B + db reset + docs
- `SESSION-20260304-01__4.4__ui-autoschedule-buttons.diff` : UI tests (boutons visibles pour rôles non-admin)
- `SESSION-20260304-01__4.4__cloture-docs.diff` : clôture docs master (statut 4.4 VALIDÉ)

## Prochaine étape logique unique

- Passer au bloc **4.6 — score qualité planning + explications** (selon `ETAT_GLOBAL_PROJET.md` / `PLAN_DE_DEVELOPPEMENT.md`).