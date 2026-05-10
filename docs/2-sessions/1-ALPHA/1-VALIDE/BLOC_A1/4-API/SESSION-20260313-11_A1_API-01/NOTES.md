# NOTES

## Nature de la session

Session de type **AUDIT**.
Aucune correction code n’est ouverte dans `API-01`.
Le travail consiste uniquement à constater l’état réellement livré du format API sur le périmètre ALPHA inspecté.

## Rappel du cadrage utile

Le cadrage officiel et les décisions maîtres convergent sur une cible simple :
- succès : `{ ok:true, data }`
- erreur : `{ ok:false, error, details? }`

Le cadrage fonctionnel précise en plus que le statut actuel du module `18.1 Convention API homogène` est déjà **`partiel`** et que **le dépôt montre encore plusieurs styles de réponses**.

Conséquence méthodologique :
- l’audit ne doit pas inventer une conformité globale que le code ne prouve pas ;
- il ne doit pas non plus conclure `non conforme` si un socle identifiable existe réellement déjà ;
- le jugement doit donc distinguer la **présence d’une convention cible** de son **niveau réel d’adoption**.

## Observations sur le code réel

### 1. Un noyau de standardisation existe réellement
Le dépôt contient un helper partagé `lib/api/response.ts` qui formalise exactement le contrat :
- `ApiOk<T> = { ok: true; data: T }`
- `ApiErr = { ok: false; error: string; details?: unknown }`

Ce helper expose :
- `ok()`
- `badRequest()`
- `unauthorized()`
- `forbidden()`
- `notFound()`
- `conflict()`
- `serverError()`

Le dépôt contient aussi un mapper Prisma partagé `lib/api/prisma-error.ts`, mais son usage réel reste très limité.

### 2. Le succès est globalement plus homogène que l’erreur
Sur les routes métier inspectées, les succès reviennent de façon globalement cohérente sous la forme :
- `ok: true`
- `data: ...`

Ce point vaut aussi bien pour :
- les routes helperisées (`users`, `vehicles`, `health`) ;
- plusieurs routes planning/autoschedule construites à la main.

Autrement dit :
- le **format succès** est déjà assez stabilisé ;
- la vraie hétérogénéité porte surtout sur le **format erreur**.

### 3. Le helper partagé n’est adopté que partiellement
Le socle `lib/api/response.ts` est utilisé sur un sous-ensemble seulement :
- `app/api/health/prisma/route.ts`
- `app/api/users/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/api/vehicles/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`

Le reste du périmètre inspecté continue à construire les réponses directement via :
- `NextResponse.json(...)`
- `Response.json(...)`
- ou un mini-helper local `json(status, payload)` dans `app/api/planning/shifts/[id]/assign/route.ts`

Conclusion :
- il existe bien un **socle identifiable** ;
- il n’existe pas encore une **industrialisation homogène** sur tout le dépôt.

### 4. Les conventions d’erreur sont concurrentes
L’audit met en évidence plusieurs styles d’erreurs en concurrence :

#### Style helper partagé
Exemples :
- `Unauthorized`
- `Forbidden`
- `Not found`
- `Conflict`
- `Server error`

#### Style codes symboliques uppercase
Exemples :
- `UNAUTHORIZED`
- `FORBIDDEN`
- `NOT_FOUND`
- `CONFLICT`
- `SERVER_ERROR`
- `VALIDATION_ERROR`

#### Styles enrichis localement
Exemples :
- ajout de `details`
- ajout de `message`
- ajout de `debug`
- erreurs métier très spécifiques (`RUN_NOT_DRAFT`, `MIN_REST_BLOCKED`, `MATCH_FAILED`, etc.)

Le problème n’est pas l’existence d’erreurs métier spécifiques.
Le problème est que leur **forme** n’est pas pilotée par une convention unique réellement adoptée partout.

### 5. Les validations Zod ne sortent pas un format d’erreur unique
Le dépôt utilise bien Zod sur plusieurs routes, mais sans mapper commun.

Formats observés :
- `details: parsed.error.flatten()`
- `details: parsed.error.issues`
- `INVALID_JSON`
- `INVALID_BODY`
- `VALIDATION_ERROR`
- `details: { message: "..." }`

Conclusion :
- il existe une pratique de validation réelle ;
- il n’existe pas encore de **normalisation uniforme** du rendu d’erreur de validation.

### 6. Les mappings Prisma / base ne sont pas homogènes
Le dépôt prouve :
- un mapper partagé `lib/api/prisma-error.ts`
- plusieurs mappers locaux redéfinis dans des routes autoschedule (`day`, `week`, `runs`, `runs/[id]`, `cancel`, `publish`)

Cela montre :
- une volonté de mapper `P2002` / `P2025` ;
- mais pas encore une centralisation effective.

Les conséquences concrètes sont visibles :
- certains flux renvoient `Conflict` / `Not found` ;
- d’autres `CONFLICT` / `NOT_FOUND` ;
- la forme de retour n’est donc pas homogène.

### 7. Lecture factuelle des statuts HTTP demandés

#### `401`
Globalement cohérent sur le plan du statut.
En revanche, le payload varie entre :
- `Unauthorized`
- `UNAUTHORIZED`
- parfois avec `details`
- parfois avec `message`

#### `403`
Même constat que pour `401` :
- statut globalement cohérent ;
- payload non homogène.

#### `404`
Présent sur plusieurs routes et souvent pertinent métier.
Mais il est produit via plusieurs chaînes différentes :
- helper partagé ;
- mappers Prisma locaux ;
- retours métier locaux.

#### `409`
Très présent sur autoschedule / assignation / conflits métier.
Le statut est globalement bien employé pour les conflits.
En revanche, le format n’est pas homogène :
- parfois simple code d’erreur ;
- parfois `details` ;
- parfois message métier local.

#### `422`
Aucune prise en charge `422` n’a été trouvée sur le périmètre inspecté.
Les validations d’entrée sont traitées en `400`.

#### `500`
Le statut est bien présent.
Mais là encore, le payload varie :
- `Server error`
- `SERVER_ERROR`
- `MATCH_FAILED`
- `INTERNAL_ERROR`

### 8. Certaines routes sont déjà plus propres que d’autres
Le dépôt montre deux sous-ensembles assez nets :

#### Sous-ensemble plus standardisé
- `health/prisma`
- `users`
- `users/[id]/reset-password`
- `vehicles`
- `match/preview`
- `match/apply`

#### Sous-ensemble encore plus hétérogène
- `company/rules`
- `planning/shifts`
- `planning/shifts/[id]/assign`
- `autoschedule/day`
- `autoschedule/week`
- `autoschedule/runs`
- `autoschedule/runs/[id]`
- `autoschedule/runs/[id]/cancel`
- `autoschedule/runs/[id]/publish`
- `autoschedule/runs/[id]/match`

### 9. Contradiction prouvée entre cadrage et code réel
Oui, une contradiction **partielle** est prouvée.

Le cadrage maître et le registre des décisions annoncent un **format unique attendu**.
Le code réel montre au contraire :
- un helper partagé conforme à cette cible ;
- mais aussi plusieurs implémentations parallèles qui ne respectent pas toutes le même style d’erreur.

La contradiction n’est pas totale car :
- le format succès est déjà largement cohérent ;
- la structure générale `ok` / `data` / `error` reste dominante.

Elle est néanmoins suffisamment prouvée pour empêcher un verdict `conforme`.

## Conclusion de travail

Le bon verdict n’est ni :
- `conforme`, car l’homogénéité promise n’est pas réellement atteinte ;
- ni `non conforme`, car un socle standardisé réel existe déjà ;
- ni `incomplet`, car la matière probante est suffisante pour juger.

Le bon verdict de session est donc : **`partiellement conforme`**.
