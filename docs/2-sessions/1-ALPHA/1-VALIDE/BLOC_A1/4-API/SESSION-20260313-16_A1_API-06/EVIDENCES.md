# EVIDENCES

## Sources utilisées

### Référentiel documentaire
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`
- sessions précédentes utiles `AUTH-03`, `TENANT-04`, `RBAC-09`, `API-01`, `API-02`, `API-03`, `API-04`, `API-05`

## Rappels documentaires clés

### Contrat officiel du socle API
- `docs/1-master/DOCUMENT_MAITRE.md:78-81`
  - convention API unique : succès `{ ok:true, data }`, erreur `{ ok:false, error, details? }`
- `docs/1-master/REGISTRE_DECISIONS.md:19-28`
  - même contrat API confirmé au registre des décisions ; ordre obligatoire `Data → Services → API → UI`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md:257-262`
  - séquence officielle `API-01` à `API-06`, avec `API-06` en session de `VALIDATION`

### Sessions amont déjà validées
- `docs/2-sessions/1-ALPHA/BLOC_A1/1-AUTH/SESSION-20260312-02_A1_AUTH-03/RESULTATS.md:14-18`
  - `role` et `companyId` sont bien présents dans la session finale consommée par l’application
- `docs/2-sessions/1-ALPHA/BLOC_A1/2-TENANT/SESSION-20260313-01_A1_TENANT-04/RESULTATS.md:17-31`
  - les routes API métier inspectées restent bornées par `companyId` sur le périmètre ALPHA
- `docs/2-sessions/1-ALPHA/BLOC_A1/3-RBAC/SESSION-20260313-10_A1_RBAC-09/RESULTATS.md:7-29`
  - bloc RBAC retenu `partiellement conforme`, mais sans contradiction bloquante prouvée sur le socle réellement présent
- `docs/2-sessions/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-11_A1_API-01/RESULTATS.md:7-28`
  - `API-01` a retenu le socle API ALPHA comme `partiellement conforme` avec structure globale dominante `ok / data / error`
- `docs/2-sessions/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-12_A1_API-02/RESULTATS.md:5-10,89-96`
  - `API-02` a corrigé les routes non conformes au format API cible sur son périmètre et a conclu `conforme`
- `docs/2-sessions/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-13_A1_API-03/RESULTATS.md:11-24,193-200`
  - `API-03` a montré que la structure externe des erreurs était globalement tenue, mais avec une hétérogénéité sémantique résiduelle du champ `error`
- `docs/2-sessions/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-14_A1_API-04/RESULTATS.md:7-18,45-49,99-105`
  - `API-04` a réaligné la doctrine critique du champ `error` et le mapping Prisma minimal ; verdict `conforme`
- `docs/2-sessions/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-15_A1_API-05/RESULTATS.md:11-24,82-88,154-160`
  - `API-05` a laissé deux incohérences API/UI réelles, mais sans rupture généralisée du socle API/UI

## Fichiers code réellement inspectés
- `lib/api/response.ts`
- `lib/api/prisma-error.ts`
- `lib/services/planning/autoschedule-match.ts`
- `app/api/company/rules/route.ts`
- `app/api/health/prisma/route.ts`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`
- `app/api/planning/autoschedule/runs/route.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
- `app/api/users/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/api/vehicles/route.ts`
- `app/planning/planning-client.tsx` (relecture ponctuelle des résidus `API-05`)

## Preuves directes sur le socle API actuel

### 1. Le helper partagé de réponse matérialise explicitement le contrat cible
- `lib/api/response.ts:1-2`
  - types `ApiOk<T> = { ok: true; data: T }` et `ApiErr = { ok: false; error: string; details?: unknown }`
- `lib/api/response.ts:4-12`
  - helper `json()` + helper `ok()`
- `lib/api/response.ts:15-37`
  - helpers d’erreur `badRequest`, `unauthorized`, `forbidden`, `notFound`, `conflict`, `serverError`

Conclusion probante :
- le contrat API cible est bien codé dans un helper partagé unique et actuel.

### 2. Le helper Prisma partagé fournit un mapping minimal cohérent avec la doctrine `API-04`
- `lib/api/prisma-error.ts:27-36`
  - `P2002` → `409 / CONFLICT`
  - `P2025` → `404 / NOT_FOUND`
  - `duplicate key` → `409 / CONFLICT`

Conclusion probante :
- un mapping Prisma partagé existe bien et n’introduit plus les wordings concurrents signalés avant `API-04`.

### 3. Des routes métier utilisent directement le helper partagé `lib/api/response.ts`
- `app/api/health/prisma/route.ts:6-7,11-17,27-31`
  - imports directs `ok`, `unauthorized`, `forbidden`, `serverError` ; réponses alignées via helper
- `app/api/users/route.ts:5-6,29-39,59-61`
  - imports directs `ok`, `badRequest`, `unauthorized`, `forbidden`, `serverError`
- `app/api/users/[id]/reset-password/route.ts:7-8,42-58,75-108`
  - imports directs du helper partagé et réponses structurées via ce helper
- `app/api/vehicles/route.ts:5-6,31-34,42,61,68-73,96-102,110-132`
  - `ok`, `badRequest`, `unauthorized`, `forbidden`, `notFound`, `conflict`, `serverError` utilisés directement
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts:8,29-31,37-38,45-58,74`
  - import direct `ok, json` depuis `lib/api/response.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts:8,58-60,66-67,74-85,114,118-130`
  - import direct `ok, json` depuis `lib/api/response.ts`

Conclusion probante :
- le helper partagé n’est pas théorique ; il est réellement utilisé sur plusieurs routes métier importantes du périmètre ALPHA.

### 4. Les routes non helperisées restent néanmoins alignées sur le contrat `{ ok, data/error, details? }`
- `app/api/company/rules/route.ts:27-40,64-73,83-101,121-130`
  - `GET` et `PATCH` renvoient des succès `{ ok: true, data }` et des erreurs `{ ok: false, error, details? }`
- `app/api/planning/shifts/route.ts:46-60,66-69,99-119`
  - lecture planning alignée sur le contrat cible
- `app/api/planning/shifts/[id]/assign/route.ts:38-62,98-105,143-177,194-214,231-251,268-280`
  - affectation renvoie systématiquement un objet structuré `ok/data` ou `ok/error/details?`
- `app/api/planning/autoschedule/day/route.ts:83-105,126-127,210-223`
  - génération jour aligne succès et erreurs sur le contrat cible
- `app/api/planning/autoschedule/week/route.ts:108-129,151-152,251-265`
  - génération semaine aligne succès et erreurs sur le contrat cible
- `app/api/planning/autoschedule/runs/route.ts:48-53,63-70,82-93,137-156`
  - liste des runs alignée sur le contrat cible malgré mapper local
- `app/api/planning/autoschedule/runs/[id]/route.ts:41-45,55-64,79-95,134-172`
  - détail run aligné sur le contrat cible malgré mapper local
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts:35-43,314-323,339-355,459-513`
  - publish renvoie des erreurs structurées avec `details` sur les cas métier critiques et un succès `{ ok:true, data }`
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts:31-40,50-58,73-89,138-151`
  - cancel aligne succès et erreurs sur le contrat cible
- `app/api/planning/autoschedule/runs/[id]/match/route.ts:13-35`
  - route dépréciée, mais toujours dans le contrat d’erreur structuré (`ok:false`, `error`, `details`)

Conclusion probante :
- même en dehors du helper partagé, les routes métier inspectées restent structurellement alignées sur le même contrat externe.

## Preuves des fragilités résiduelles encore visibles

### 5. `DRAFT_ALREADY_EXISTS` reste une incohérence locale API/UI, pas une rupture du socle API
Preuves API :
- `app/api/planning/autoschedule/day/route.ts:16-18,126-127,215-216`
  - le sentinel et la réponse HTTP portent `details: { runId }`
- `app/api/planning/autoschedule/week/route.ts:17-19,151-152,257-258`
  - même structure `details: { runId }`

Preuves UI :
- `app/planning/planning-client.tsx:686-693`
  - génération semaine : l’UI cherche `runId` à la racine du JSON
- `app/planning/planning-client.tsx:746-753`
  - génération jour : même hypothèse `runId` à la racine

Conclusion probante :
- l’API respecte son contrat d’erreur structuré ;
- la fragilité résiduelle provient de l’UI qui ne lit pas le bon emplacement du détail.

### 6. Les conflits d’assignation restent une incohérence locale API/UI, pas une rupture du socle API
Preuves API :
- `app/api/planning/shifts/[id]/assign/route.ts:169-175,243-248`
  - la route renvoie `USER_OVERLAP_CONFLICT` / `VEHICLE_OVERLAP_CONFLICT` avec `details`

Preuves UI :
- `app/planning/planning-client.tsx:1106-1125`
  - l’UI teste `USER_CONFLICT` / `VEHICLE_CONFLICT` / `RUN_NOT_DRAFT`

Conclusion probante :
- l’API renvoie bien un code structuré cohérent ;
- l’UI n’est pas alignée sur les codes réellement renvoyés ;
- le défaut est réel, mais il n’est pas structurant pour le socle API lui-même.

### 7. Dispersion résiduelle des implémentations, sans format concurrent prouvé
- `app/api/planning/autoschedule/runs/route.ts:48-53`
  - mapper local `prismaToApiError()`
- `app/api/planning/autoschedule/runs/[id]/route.ts:41-45`
  - mapper local `prismaToApiError()`
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts:31-40`
  - mapper local `prismaToApiError()`
- `app/api/planning/autoschedule/day/route.ts:47-53`
  - mapper local `prismaToApiError()`
- `app/api/planning/autoschedule/week/route.ts:70-78`
  - mapper local `prismaToApiError()`

Conclusion probante :
- l’uniformisation d’implémentation n’est pas parfaite ;
- aucune divergence de contrat externe suffisante pour requalifier le socle en `partiellement conforme` n’a été prouvée sur le périmètre relu.

## Point de bornage utile
- `app/api/auth/[...nextauth]/route.ts:1-6`
  - route NextAuth relue pour bornage seulement ; non retenue pour juger la normalisation du socle API métier ALPHA

## Vérifications techniques réellement exécutées
- relecture documentaire ciblée réalisée sur les documents pertinents de `./docs`, avec priorité donnée au dossier `./docs/1-master` ;
- inspection statique croisée des helpers API, des routes métier et des résidus déjà pointés par `API-05` ;
- recherche textuelle ponctuelle des usages du helper partagé et des codes d’erreur de conflit.

Tentative d'exécution de vérification technique dans l'environnement extrait :
- `npm run lint` → échec (`eslint: not found`)
- `npm run build` → échec (`next: not found`)

Ces vérifications n'ont donc pas pu être exécutées dans cet environnement.
