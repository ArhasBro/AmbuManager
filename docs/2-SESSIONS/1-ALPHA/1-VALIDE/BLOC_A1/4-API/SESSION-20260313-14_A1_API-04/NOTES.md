# NOTES

## Méthode / observations

### 1. Relecture documentaire préalable
- scan global de l’ensemble des fichiers `.md` sous `./docs` pour relecture transversale du corpus ;
- priorité absolue donnée à `docs/1-master` conformément aux règles de session ;
- rappel du protocole : `CODE > DOCUMENTATION` en cas de contradiction ;
- rappel du plan officiel : `API-04` est une **CORRECTION** minimale d’harmonisation des erreurs critiques, après `API-03`.

### 2. Point de départ factuel repris depuis `API-03`
`API-03` avait déjà établi que :
- la structure externe des erreurs est globalement réalignée depuis `API-02` ;
- le problème ouvert n’est plus structurel mais sémantique ;
- la doctrine majoritaire du dépôt réel est déjà en codes symboliques uppercase ;
- le helper `lib/api/response.ts` reste en texte anglais libre ;
- `lib/api/prisma-error.ts` reste aussi en wording texte ;
- `vehicles` garde au moins un message métier libre dans `error` ;
- plusieurs validations critiques exposent encore `error` en texte libre côté routes utilisant le helper.

### 3. Décision de bornage pour `API-04`
Ont été retenus comme cibles **critiques** :
- la doctrine du champ `error` dans le helper partagé ;
- le mapping Prisma minimal partagé ;
- les routes encore dépendantes de ces helpers textuels ;
- les validations critiques encore libres sur ces mêmes routes.

N’ont pas été retenus comme cible `API-04` :
- l’unification exhaustive de toutes les variantes `BAD_REQUEST` / `INVALID_BODY` / `VALIDATION_ERROR` du projet ;
- les routes déjà symboliquement cohérentes ;
- les wording présents dans `details` quand `error` reste déjà symbolique ;
- toute refonte large des routes autoschedule ;
- toute cohérence API/UI, hors cible `API-05`.

### 4. Doctrine de correction retenue
Doctrine principale retenue, conforme à la majorité du dépôt réel :
- `error = code symbolique uppercase`

Codes génériques retenus sur les helpers :
- `UNAUTHORIZED`
- `FORBIDDEN`
- `NOT_FOUND`
- `CONFLICT`
- `SERVER_ERROR`
- `BAD_REQUEST` par défaut pour `badRequest()`

Règle complémentaire retenue :
- les explications utiles restent possibles mais doivent passer par `details`, pas par `error`.

### 5. Correction de `lib/api/response.ts`
Constat avant correction :
- `unauthorized()` renvoyait `Unauthorized` ;
- `forbidden()` renvoyait `Forbidden` ;
- `notFound()` renvoyait `Not found` ;
- `conflict()` renvoyait `Conflict` par défaut ;
- `serverError()` renvoyait `Server error`.

Correction appliquée :
- réalignement intégral sur la doctrine uppercase ;
- ajout d’un défaut `BAD_REQUEST` sur `badRequest()` pour éviter un retour implicite libre.

Effet attendu :
- toutes les routes qui utilisent déjà ces helpers convergent sans refactor large.

### 6. Correction de `lib/api/prisma-error.ts`
Constat avant correction :
- `P2002` renvoyait `Duplicate` ;
- `P2025` renvoyait `Not found` ;
- le fallback `duplicate key` renvoyait aussi `Duplicate`.

Correction appliquée :
- `P2002` => `CONFLICT` ;
- `P2025` => `NOT_FOUND` ;
- fallback `duplicate key` => `CONFLICT`.

Décision de bornage :
- pas de centralisation globale supplémentaire ;
- pas de migration forcée des mappers Prisma locaux autoschedule déjà symboliques.

### 7. Routes réellement modifiées
#### `app/api/users/route.ts`
Correction appliquée :
- `Invalid query` => `VALIDATION_ERROR`.

Motif :
- route directement dépendante du helper partagé ;
- `error` libre non cohérent avec la doctrine majoritaire.

#### `app/api/users/[id]/reset-password/route.ts`
Corrections appliquées :
- `Invalid JSON` => `INVALID_JSON` ;
- `Invalid body` => `VALIDATION_ERROR` ;
- `Missing user id` => `BAD_REQUEST` avec explication en `details.message` ;
- `Self password change is out of scope for this route` => `BAD_REQUEST` avec explication en `details.message`.

Motif :
- route critique d’administration utilisateur ;
- plusieurs erreurs libres encore exposées via le helper.

#### `app/api/vehicles/route.ts`
Corrections appliquées :
- `Invalid query` / `Invalid body` => `VALIDATION_ERROR` ;
- `Véhicule déjà existant` ne reste plus dans `error` ;
- le conflit véhicule devient `error: "CONFLICT"` avec l’explication utile conservée sous `details.message`.

Motif :
- `API-03` avait explicitement identifié `vehicles` comme source d’un message métier libre critique.

### 8. Routes relues mais laissées intactes
Aucune modification sur :
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

Motif :
- ces routes utilisent déjà des codes symboliques uppercase pour `error` ;
- les variations restantes relèvent du wording secondaire ou d’un autre scope ;
- les retoucher aurait élargi artificiellement `API-04`.

### 9. Effet indirect assumé sur les routes utilisant déjà `lib/api/response.ts`
Sans modification de fichier route, le réalignement du helper corrige aussi le comportement des branches suivantes :
- `health/prisma` sur `401`, `403`, `500` ;
- `users` sur `401`, `403`, `500` ;
- `users/[id]/reset-password` sur `401`, `403`, `404`, `500` ;
- `vehicles` sur `401`, `403`, `404`, `409`, `500`.

### 10. Vérifications techniques réellement prouvées
Vérifications prouvées :
- patch officiel `.diff` généré ;
- `git apply --check` sur copie propre : `OK` ;
- `git apply` sur copie propre : `OK` ;
- `npm run lint` : `OK` ;
- `npm run build` : échec hors périmètre `API-04` sur `app/api/company/rules/route.ts` (`RuleMode` non exporté par `@prisma/client`).
