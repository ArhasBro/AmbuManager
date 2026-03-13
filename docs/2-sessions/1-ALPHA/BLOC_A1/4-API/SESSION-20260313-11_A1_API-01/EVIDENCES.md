# EVIDENCES

## Sources documentaires officielles

### Cadrage maître et fonctionnel
- `docs/1-master/DOCUMENT_MAITRE.md:78-81`
  - fixe le format attendu :
    - succès `{ ok:true, data }`
    - erreur `{ ok:false, error, details? }`
- `docs/1-master/REGISTRE_DECISIONS.md:19-27`
  - réaffirme le format API unique attendu.
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:1087-1096`
  - module `18.1 Convention API homogène`
  - statut actuel : `partiel`
  - arbitrage explicite : *le dépôt montre encore plusieurs styles de réponses*.
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md:257-262`
  - confirme la séquence `API-01` à `API-06` et borne `API-01` comme audit.

### Historique prouvé repris
- `docs/2-sessions/1-ALPHA/BLOC_A1/1-AUTH/SESSION-20260312-02_A1_AUTH-03/RESULTATS.md:14-18`
  - `role` et `companyId` validés dans auth / JWT / session.
- `docs/2-sessions/1-ALPHA/BLOC_A1/2-TENANT/SESSION-20260313-01_A1_TENANT-04/RESULTATS.md:1-13`
  - cloisonnement multi-tenant ALPHA déjà validé sur le périmètre inspecté.
- `docs/2-sessions/1-ALPHA/BLOC_A1/3-RBAC/SESSION-20260313-10_A1_RBAC-09/RESULTATS.md:5-18`
  - bloc rôles / permissions validé comme `partiellement conforme`, sans réouverture ici.

## Socle partagé réellement présent

### Helper de réponse API
- `lib/api/response.ts:1-37`
  - définit `ApiOk<T>` et `ApiErr`
  - impose :
    - `ok(data)`
    - `badRequest(error, details?)`
    - `unauthorized()`
    - `forbidden()`
    - `notFound()`
    - `conflict(error, details?)`
    - `serverError(details?)`

### Mapper Prisma partagé
- `lib/api/prisma-error.ts:27-36`
  - mappe `P2002` → `409`
  - mappe `P2025` → `404`
  - retourne `null` sinon

## Routes déjà partiellement standardisées via helper partagé

### Health
- `app/api/health/prisma/route.ts:6-31`
  - utilise `unauthorized()`, `forbidden()`, `ok()`, `serverError()`.

### Users
- `app/api/users/route.ts:5-6`
  - importe le helper partagé.
- `app/api/users/route.ts:29-39`
  - `401`, `403`, `400` via helper.
- `app/api/users/route.ts:59-61`
  - succès via `ok(...)`, erreur technique via `serverError(...)`.

### Reset password user
- `app/api/users/[id]/reset-password/route.ts:7-8`
  - importe le helper partagé.
- `app/api/users/[id]/reset-password/route.ts:42-58`
  - `401`, `403`, `400` via helper.
- `app/api/users/[id]/reset-password/route.ts:75-108`
  - `404`, succès `ok(...)`, erreur technique `serverError(...)`.

### Vehicles
- `app/api/vehicles/route.ts:5-6`
  - importe le helper partagé + le mapper Prisma partagé.
- `app/api/vehicles/route.ts:31-42`
  - `401`, `403`, `400` via helper.
- `app/api/vehicles/route.ts:95-100`
  - succès `201` via `ok(...)` ; conflit via `conflict(...)`.
- `app/api/vehicles/route.ts:124-130`
  - `404` via helper ; `500` via `serverError(...)`.

### Match preview / apply
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts:8-9`
  - importe `ok` et `json` depuis `lib/api/response`.
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts:29-58`
  - erreurs renvoyées via `json(...)` avec `details`.
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts:73-74`
  - succès via `ok({ plan, quality }, 200)`.
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts:8-10`
  - importe `ok` et `json` depuis `lib/api/response`.
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts:58-85`
  - erreurs `401`, `403`, `400` via `json(...)`.
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts:114-130`
  - succès via `ok(...)`, erreurs `404`, `409`, `500` via `json(...)`.

## Routes encore construites localement

### Company rules
- `app/api/company/rules/route.ts:27-40`
  - `401` et `400 VALIDATION_ERROR` construits en direct avec `NextResponse.json`.
- `app/api/company/rules/route.ts:64-73`
  - succès manuel `{ ok: true, data: ... }`.
- `app/api/company/rules/route.ts:83-103`
  - `401`, `403`, `400 INVALID_JSON`, `400 VALIDATION_ERROR` manuels.
- `app/api/company/rules/route.ts:121-130`
  - succès manuel + `500 SERVER_ERROR`.

### Planning shifts
- `app/api/planning/shifts/route.ts:46-69`
  - `401` et `400 VALIDATION_ERROR` manuels, avec `details`.
- `app/api/planning/shifts/route.ts:99-119`
  - succès manuel ; `500 SERVER_ERROR` manuel.

### Assignation de shift
- `app/api/planning/shifts/[id]/assign/route.ts:21-23`
  - helper local `json(status, payload)` défini dans la route.
- `app/api/planning/shifts/[id]/assign/route.ts:38-62`
  - `401`, `403`, `400 INVALID_PARAMS`, `400 INVALID_BODY`.
- `app/api/planning/shifts/[id]/assign/route.ts:103-114`
  - `400 USER2_NOT_ALLOWED`, `400 SAME_USER_BOTH_SLOTS`.
- `app/api/planning/shifts/[id]/assign/route.ts:231-251`
  - `404`, `403`, `400`, `409`, `500` gérés localement selon erreurs métier.
- `app/api/planning/shifts/[id]/assign/route.ts:194-214`
  - succès manuel `{ ok: true, data: ... }` côté draft.
- `app/api/planning/shifts/[id]/assign/route.ts:268-280`
  - succès manuel `{ ok: true, data: ... }` côté shift publié.

### Autoschedule day / week / runs / run detail / cancel / publish
- `app/api/planning/autoschedule/day/route.ts:47-52`
  - mapper Prisma local `prismaToApiError(...)`.
- `app/api/planning/autoschedule/day/route.ts:76-96`
  - `401`, `403`, `400 INVALID_JSON`, `400 VALIDATION_ERROR` manuels.
- `app/api/planning/autoschedule/day/route.ts:203-212`
  - `409 NO_TEMPLATES`, `409 DRAFT_ALREADY_EXISTS`, succès manuel.
- `app/api/planning/autoschedule/week/route.ts:70-77`
  - mapper Prisma local dupliqué.
- `app/api/planning/autoschedule/week/route.ts:101-120`
  - `401`, `403`, `400 INVALID_JSON`, `400 VALIDATION_ERROR` manuels.
- `app/api/planning/autoschedule/week/route.ts:245-254`
  - `409 NO_TEMPLATES`, `409 DRAFT_ALREADY_EXISTS`, succès manuel.
- `app/api/planning/autoschedule/runs/route.ts:48-53`
  - mapper Prisma local dupliqué.
- `app/api/planning/autoschedule/runs/route.ts:64-85`
  - `401`, `403`, `400 VALIDATION_ERROR` manuels.
- `app/api/planning/autoschedule/runs/route.ts:93-93`
  - `400 INVALID_CURSOR`.
- `app/api/planning/autoschedule/runs/route.ts:138-145`
  - succès manuel `{ ok: true, data: ... }`.
- `app/api/planning/autoschedule/runs/[id]/route.ts:41-45`
  - mapper Prisma local.
- `app/api/planning/autoschedule/runs/[id]/route.ts:55-64`
  - `401` / `403` manuels.
- `app/api/planning/autoschedule/runs/[id]/route.ts:79-92`
  - `400 VALIDATION_ERROR` avec `details` **et** `debug`.
- `app/api/planning/autoschedule/runs/[id]/route.ts:132-167`
  - `404 NOT_FOUND`, succès manuel.
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts:31-40`
  - mapper Prisma local dupliqué.
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts:51-77`
  - `401`, `403`, `400 VALIDATION_ERROR` manuels.
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts:136-149`
  - `404`, `409`, `500`, succès manuel.
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts:33-44`
  - mapper Prisma local dupliqué.
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts:314-352`
  - `401`, `403`, `400 VALIDATION_ERROR` avec `details` **et** `debug`.
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts:457-508`
  - `404`, `409`, `400 RULE_CONFIG_ERROR` avec `message`, succès manuel.

### Route match dépréciée
- `app/api/planning/autoschedule/runs/[id]/match/route.ts:13-35`
  - erreurs manuelles avec champ `message`
  - retour `410 GONE`
  - ne suit pas la forme cible `details?`

## Hétérogénéité prouvée des formats d’erreur

### Casing / vocabulaire concurrent
- `lib/api/response.ts:19-37`
  - renvoie `Unauthorized`, `Forbidden`, `Not found`, `Conflict`, `Server error`.
- `app/api/company/rules/route.ts:27-29`
  - renvoie `UNAUTHORIZED`.
- `app/api/planning/autoschedule/runs/[id]/route.ts:43-45`
  - renvoie `NOT_FOUND`, `SERVER_ERROR`.
- `app/api/planning/shifts/[id]/assign/route.ts:251-251`
  - renvoie `INTERNAL_ERROR`.
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts:130-130`
  - renvoie `MATCH_FAILED`.

### Champs d’erreur concurrents
- `app/api/company/rules/route.ts:37-40`
  - `details: parsed.error.flatten()`
- `app/api/planning/shifts/route.ts:66-68`
  - `details: { message: ... }`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts:479-481`
  - `message: result.message`
- `app/api/planning/autoschedule/runs/[id]/route.ts:84-90`
  - `details: ...` + `debug: ...`
- `app/api/planning/autoschedule/runs/[id]/match/route.ts:15-33`
  - `message: ...`

### Client helper planning tolérant mais non aligné sur `details`
- `lib/services/planning/autoschedule-match.ts:3-9`
  - définit une forme d’erreur locale avec `message?` et `issues?`, pas `details`.
- `lib/services/planning/autoschedule-match.ts:11-21`
  - schéma client accepte `message` / `issues`, pas `details`.
- `lib/services/planning/autoschedule-match.ts:24-29`
  - l’extraction d’erreur lit `message` puis `error`.

## Statuts HTTP demandés par la session

### `401`
- helper partagé : `lib/api/response.ts:19-20`
- style direct uppercase : `app/api/company/rules/route.ts:27-29`, `app/api/planning/shifts/route.ts:46-48`

### `403`
- helper partagé : `lib/api/response.ts:23-24`
- style direct uppercase : `app/api/company/rules/route.ts:87-89`, `app/api/planning/autoschedule/runs/[id]/route.ts:62-64`

### `404`
- helper partagé : `lib/api/response.ts:27-28`
- mapper Prisma partagé : `lib/api/prisma-error.ts:30-31`
- styles locaux : `app/api/planning/autoschedule/runs/[id]/publish/route.ts:40-41`, `app/api/planning/autoschedule/runs/[id]/route.ts:132-133`

### `409`
- helper partagé : `lib/api/response.ts:31-32`
- mapper Prisma partagé : `lib/api/prisma-error.ts:30-34`
- styles locaux : `app/api/planning/autoschedule/day/route.ts:49-50`, `app/api/planning/autoschedule/runs/[id]/publish/route.ts:461-497`

### `422`
- aucune occurrence trouvée sur `app/api` et `lib` lors de la recherche textuelle ciblée.

### `500`
- helper partagé : `lib/api/response.ts:35-37`
- style direct uppercase : `app/api/company/rules/route.ts:73-73`, `app/api/planning/shifts/route.ts:118-119`
- styles métier spécifiques : `app/api/planning/shifts/[id]/assign/route.ts:251-251`, `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts:130-130`

## Vérifications techniques réellement exécutées

- relecture documentaire des sources officielles `.md` demandées ;
- inspection statique du code réel ;
- recherche textuelle ciblée sur les formats de réponses ;
- exécution de `npm run lint` ;
- exécution de `npm run build`.

## Vérifications techniques et résultats réels

- `npm run lint` : **échec**
  - message observé : `sh: 1: eslint: not found`
- `npm run build` : **échec**
  - message observé : `sh: 1: next: not found`

Motif factuel :
- dépendances exécutables absentes dans l’environnement local de cette session (`node_modules` non installé / non exploitable ici).
