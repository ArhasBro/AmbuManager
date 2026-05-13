# NOTES

Notes de travail de la session.

---

## Méthode d’audit retenue

Session de type **AUDIT**.

Méthode appliquée :
1. repartir du cadrage officiel `MODULE 18 — API / conventions` ;
2. reprendre la convention officielle `{ ok:true, data } / { ok:false, error, details? }` ;
3. tenir `AUTH-03`, `TENANT-04`, `RBAC-09`, `API-01` et `API-02` comme historique prouvé ;
4. inspecter uniquement les routes métier réellement présentes ;
5. distinguer explicitement :
   - structure externe du payload ;
   - sémantique du champ `error` ;
   - statuts HTTP ;
   - validations ;
   - mapping Prisma ;
   - usage des helpers ;
6. ne tirer aucune conclusion non prouvée.

Règles appliquées :
- aucune correction de code ;
- aucun patch correctif ;
- aucune réouverture de `API-02` ;
- aucune anticipation de patch `API-04` ;
- en cas de contradiction : **CODE > DOCUMENTATION**.

## Cadre de lecture imposé par `API-03`

`API-03` ne devait pas réauditer tout le socle API comme `API-01`, ni corriger structurellement les routes comme `API-02`.

Le bon angle d’analyse était donc :
- vérifier si la structure `{ ok:false, error, details? }` est désormais tenue ;
- puis juger si le **contenu** de `error` et de `details` est réellement cohérent d’une route à l’autre.

## Constat de structure

### Structure externe
Le point majeur de la session est positif :
- les routes inspectées renvoient bien un objet d’erreur centré sur `ok:false` + `error` + `details?` ;
- les anciens champs top-level hors contrat mis en évidence par `API-01` ne sont plus retrouvés comme écarts ouverts sur les routes inspectées ;
- les enrichissements désormais observés passent sous `details`.

Conclusion locale :
- la **cohérence de structure** est désormais globalement acquise sur le périmètre inspecté.

## Constat sur la sémantique du champ `error`

### Groupe 1 — style symbolique uppercase
Plusieurs routes suivent une convention assez nette de type code symbolique :
- `company/rules`
- `planning/shifts`
- `planning/shifts/[id]/assign`
- `planning/autoschedule/day`
- `planning/autoschedule/week`
- `planning/autoschedule/runs`
- `planning/autoschedule/runs/[id]`
- `planning/autoschedule/runs/[id]/publish`
- `planning/autoschedule/runs/[id]/cancel`
- `planning/autoschedule/runs/[id]/match`
- `planning/autoschedule/runs/[id]/match/preview`
- `planning/autoschedule/runs/[id]/match/apply`

Exemples :
- `UNAUTHORIZED`
- `FORBIDDEN`
- `NOT_FOUND`
- `VALIDATION_ERROR`
- `RUN_NOT_DRAFT`
- `MIN_REST_BLOCKED`

### Groupe 2 — style message texte via helper partagé
Les helpers spécialisés de `lib/api/response.ts` portent une autre doctrine :
- `Unauthorized`
- `Forbidden`
- `Not found`
- `Server error`
- `Conflict`

Cette doctrine est visible notamment sur :
- `app/api/health/prisma/route.ts`
- `app/api/users/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- une partie de `app/api/vehicles/route.ts`

### Groupe 3 — message métier libre
`app/api/vehicles/route.ts` pousse encore plus loin l’écart :
- `conflict("Véhicule déjà existant")`

Conclusion locale :
- le champ `error` n’est pas encore stabilisé sur un contrat unique ;
- l’écart n’est donc pas seulement cosmétique.

## Constat sur les statuts HTTP

### 401 / 403
L’intention HTTP est globalement cohérente :
- `401` pour absence de session / companyId ;
- `403` pour défaut de permission.

Mais les payloads restent hétérogènes :
- `UNAUTHORIZED` / `FORBIDDEN` sur la majorité des routes directes ;
- `Unauthorized` / `Forbidden` sur les helpers spécialisés ;
- parfois `details` texte explicatif sur `match`, `match/preview`, `match/apply`.

### 404
Même logique de mélange :
- `NOT_FOUND`
- `Not found`
- `RUN_NOT_FOUND`

Une partie de cette variation est un simple wording, mais la coexistence entre code générique et code métier spécifique montre aussi que la doctrine `error` n’est pas figée.

### 409
Le `409` est le statut le plus hétérogène sémantiquement :
- codes métiers explicites (`DRAFT_ALREADY_EXISTS`, `RUN_ALREADY_PUBLISHED`, `MIN_REST_BLOCKED`, `CONFLICT_USER`, `CONFLICT_VEHICLE`) ;
- message libre via helper (`Conflict`) ;
- message métier français dans `vehicles`.

Ici, l’hétérogénéité ne relève pas seulement d’un écart de casse.

### 500
Les stratégies observées coexistent :
- `SERVER_ERROR`
- `Server error`
- `INTERNAL_ERROR`
- `MATCH_FAILED`

Conclusion locale :
- les statuts HTTP ne sont pas aberrants ;
- la non-cohérence porte surtout sur le contenu de `error`.

## Constat sur les validations

Les validations restent structurellement conformes mais hétérogènes :
- `VALIDATION_ERROR` + `parsed.error.flatten()`
- `INVALID_JSON`
- `INVALID_BODY` + `flatten()`
- `INVALID_BODY` + `issues`
- `BAD_REQUEST` + `details` texte
- `details.message` sur certains cas métiers ou de requête

Le dépôt ne prouve donc pas une stratégie unique de validation.

## Constat sur le mapping Prisma / base

`lib/api/prisma-error.ts` existe mais n’est pas le point de convergence réel :
- usage prouvé seulement dans `app/api/vehicles/route.ts`.

En parallèle, six routes autoschedule redéfinissent localement `prismaToApiError()` :
- `day`
- `week`
- `runs`
- `runs/[id]`
- `publish`
- `cancel`

Le résultat global est :
- des mappings voisins ;
- mais non centralisés ;
- donc non complètement cohérents.

## Constat sur les helpers

### `lib/api/response.ts`
Le helper matérialise bien le contrat de structure, mais pas une doctrine sémantique unique :
- certaines routes utilisent `unauthorized()` / `forbidden()` / `notFound()` ;
- d’autres importent `json()` et y mettent des codes uppercase ;
- beaucoup de routes ne l’utilisent pas du tout.

Conclusion :
- `lib/api/response.ts` n’est pas encore le point de convergence principal des erreurs.

### `lib/api/prisma-error.ts`
Même constat :
- existence prouvée ;
- usage marginal ;
- absence de convergence réelle.

## Ce qui est déjà propre et ne demande pas de réouverture structurelle

Les routes inspectées ne montrent plus de non-conformité structurelle prouvée au contrat externe `{ ok:false, error, details? }`.

Cela signifie que `API-04`, si ouverte plus tard, devrait viser :
- la doctrine du champ `error` ;
- l’harmonisation minimale des validations ;
- le recentrage des mappings Prisma ;
et non une nouvelle correction structurelle large type `API-02`.

## Ce qui paraît prioritaire pour une future `API-04`

Priorités réellement justifiées par l’audit :
1. fixer une doctrine unique du champ `error` :
   - code symbolique
   - ou message texte
   - mais pas mélange durable des deux ;
2. réaligner `lib/api/response.ts` sur cette doctrine ;
3. harmoniser les erreurs de validation (`INVALID_JSON`, `BAD_REQUEST`, `INVALID_BODY`, `VALIDATION_ERROR`) ;
4. centraliser ou normaliser le mapping Prisma minimal ;
5. réduire les variations sur `500`.

## Ce qui ne justifie pas à lui seul une non-conformité critique

Écarts mineurs de wording seulement :
- `UNAUTHORIZED` vs `Unauthorized`
- `FORBIDDEN` vs `Forbidden`
- `NOT_FOUND` vs `Not found`
- `SERVER_ERROR` vs `Server error`

Ces écarts sont réels, mais ne signifient pas à eux seuls que la structure API soit à nouveau cassée.

## Conclusion de travail

L’audit `API-03` ne prouve pas une API d’erreur incohérente au point d’être structurellement non conforme.
En revanche, il prouve clairement une **cohérence sémantique encore partielle**, suffisante pour retenir **`partiellement conforme`** et préparer une `API-04` ciblée.
