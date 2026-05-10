# NOTES

## Méthode / observations
- Relecture de la documentation maître autorisée avant contrôle.
- Recherche réelle sur `CompanyRule`, `RuleMode`, `PLANNING_MIN_REST_HOURS`, `PLANNING_VIEW_MODE`.
- Vérification croisée schéma Prisma / migration SQL / API company rules / services moteur / UI planning.
- Vérification explicite des flux demandés :
  - `assign-shift`
  - `assign-draftshift`
  - publication autoschedule
- Vérification complémentaire du routeur réellement exécuté pour l’affectation manuelle : `app/api/planning/shifts/[id]/assign/route.ts`.

## Constats de travail
- Les seules lectures/écritures réelles de `CompanyRule` trouvées dans le code contrôlé sont :
  - `app/api/company/rules/route.ts`
  - `lib/services/planning/assign-shift.ts`
  - `lib/services/planning/assign-draftshift.ts`
  - `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- Les seules clés effectivement prouvées dans le dépôt sont :
  - `PLANNING_MIN_REST_HOURS`
  - `PLANNING_VIEW_MODE`
- `PLANNING_VIEW_MODE` est un réglage d’affichage entreprise côté planning, pas une règle moteur.
- `PLANNING_MIN_REST_HOURS` est la seule règle réellement branchée dans le moteur planning au sens strict.
- La permission de modification est cohérente : `ADMIN` / `GERANT` natifs ou permission `COMPANY_RULES_MANAGE`.
- La lecture des règles via `GET /api/company/rules` n’exige pas cette permission de gestion ; elle exige seulement une session authentifiée avec `companyId`.

## Divergences réelles constatées
### 1. Affectation manuelle vs publication autoschedule
- `assign-shift` et `assign-draftshift` ne contrôlent que le **repos avant** le shift courant (recherche du dernier shift/draft se terminant avant `startAt`).
- `publish` calcule au contraire les écarts adjacents sur une timeline complète et peut donc détecter un manque de repos **avant ou après** un draft publié.
- Il existe donc une divergence réelle de portée métier sur la même règle `PLANNING_MIN_REST_HOURS`.

### 2. Usage réel de `RuleMode`
- En affectation manuelle :
  - `OFF` = aucun effet visible
  - `BLOCK` = blocage réel
  - `BOTH` = blocage réel (la partie alerte n’est pas exploitée côté client)
  - `ALERT` = l’alerte est calculée dans le service, mais non réellement remontée au client
- En publication autoschedule :
  - `OFF` = règle désactivée explicitement
  - `ALERT` = publication autorisée avec warnings retournés
  - `BLOCK` / `BOTH` = publication bloquée avec détails explicites

### 3. Valeurs absentes / invalides
- `assign-shift` et `assign-draftshift` :
  - règle absente => ignorée
  - valeur invalide => ignorée silencieusement
- `publish` :
  - règle absente => désactivée
  - `mode=OFF` => désactivée
  - valeur invalide => `RULE_CONFIG_ERROR`
- Le traitement des configurations invalides n’est donc pas harmonisé.

### 4. Alerte manuelle non surfacée
- Les services d’affectation manuelle renvoient un tableau `issues`.
- Le routeur `app/api/planning/shifts/[id]/assign/route.ts` n’expose pas ces `issues` dans sa réponse de succès.
- Le client planning affiche simplement `Affectation enregistrée ✅` sur succès.
- Conclusion : le mode `ALERT` n’a pas d’effet utilisateur réel prouvé sur l’affectation manuelle actuelle.

## Conclusion de travail
Le bon état réel à retenir pour `RULES-03` est :
**PARTIEL — usage moteur réel prouvé, mais comportement non homogène selon les flux**.

Le bon livrable officiel pour cette session d’audit reste :
**NO_PATCH — AUDIT FACTUEL, ÉCARTS DOCUMENTÉS**
