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
- sessions précédentes utiles `AUTH-03`, `TENANT-04`, `RBAC-09`, `API-01`, `API-02`, `API-03`, `API-04`

### Rappels documentaires clés
- `docs/1-master/DOCUMENT_MAITRE.md:78-81`
  - contrat API attendu : succès `{ ok:true, data }`, erreur `{ ok:false, error, details? }`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md:257-262`
  - `API-05` est bien une `VALIDATION` de cohérence API/UI
- `docs/1-master/REGISTRE_DECISIONS.md:19-27`
  - format API et ordre `Data → Services → API → UI`
- `docs/2-sessions/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-14_A1_API-04/RESULTATS.md:5-31`
  - `API-04` a réaligné les erreurs critiques sur la doctrine uppercase
- `docs/2-sessions/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-14_A1_API-04/RESULTATS.md:99-107`
  - verdict `API-04` : `conforme` sur son périmètre
- `docs/2-sessions/1-ALPHA/BLOC_A1/1-AUTH/SESSION-20260312-02_A1_AUTH-03/RESULTATS.md:14-18`
  - `role` et `companyId` présents dans la session consommée par l’application
- `docs/2-sessions/1-ALPHA/BLOC_A1/2-TENANT/SESSION-20260313-01_A1_TENANT-04/RESULTATS.md:17-24`
  - routes `users` et `vehicles` inspectées comme tenantisées
- `docs/2-sessions/1-ALPHA/BLOC_A1/3-RBAC/SESSION-20260313-10_A1_RBAC-09/RESULTATS.md:7-24`
  - bloc RBAC retenu `partiellement conforme`, sans réouverture ici

## Fichiers code réellement inspectés
- `app/planning/planning-client.tsx`
- `app/users/reset-password-client.tsx`
- `app/vehicles/vehicles-client.tsx`
- `app/api/users/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/api/vehicles/route.ts`
- `app/api/company/rules/route.ts`
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
- `lib/api/response.ts`
- `lib/api/prisma-error.ts`

## Preuves de compatibilité API/UI

### 1. Le planning consomme bien le contrat `{ ok, data } / { ok, error }`
Preuves UI :
- `app/planning/planning-client.tsx:259-263`
  - garde dédiée `jsonOkPayload()` / `jsonErrPayload()`
- `app/planning/planning-client.tsx:397-400`
  - `GET /api/planning/shifts` vérifie `res.ok` puis `json.ok`
- `app/planning/planning-client.tsx:491-531`
  - listes `users` / `vehicles` chargées avec contrôle du contrat JSON
- `app/planning/planning-client.tsx:815-823`
  - preview matching contrôlé via `res.ok` + `json.ok`
- `app/planning/planning-client.tsx:896-903`
  - apply matching contrôlé via `res.ok` + `json.ok`
- `app/planning/planning-client.tsx:978-985`
  - publish contrôlé via `res.ok` + `json.ok`
- `app/planning/planning-client.tsx:1071-1076`
  - cancel contrôlé via `res.ok` + `json.ok`

Preuves API :
- `app/api/planning/shifts/route.ts:47-59,100-118`
  - route conforme au contrat attendu
- `app/api/company/rules/route.ts:28-38,65-72,84-101,122-129`
  - `GET` et `PATCH` conformes au contrat attendu
- `app/api/planning/autoschedule/runs/[id]/route.ts:135-169`
  - détail run conforme au contrat attendu
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts:460-504`
  - publish conforme au contrat attendu
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts:140-148`
  - cancel conforme au contrat attendu
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts:31-58`
  - preview conforme au contrat attendu
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts:60-130`
  - apply conforme au contrat attendu

### 2. Le planning exploite réellement `details` sur certains cas critiques
Preuves UI :
- `app/planning/planning-client.tsx:985-1019`
  - `MIN_REST_BLOCKED`, `CONFLICT_USER`, `CONFLICT_VEHICLE` lisent `json.details`

Preuves API :
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts:464-491`
  - la route renvoie bien les détails utiles pour ces cas

### 3. `users` et `vehicles` consomment le contrat structurellement
Preuves UI :
- `app/users/reset-password-client.tsx:53-58,120-130`
  - contrôle `res.ok` puis lecture de `json.error`
- `app/vehicles/vehicles-client.tsx:18-20,40-50,68-75`
  - contrôle `res.ok` et `data.ok`, lecture de `error` sur échec

Preuves API :
- `app/api/users/route.ts` s’appuie sur `lib/api/response.ts`
- `app/api/users/[id]/reset-password/route.ts` s’appuie sur `lib/api/response.ts`
- `app/api/vehicles/route.ts` s’appuie sur `lib/api/response.ts`
- `lib/api/response.ts:1-37`
  - helper partagé conforme au contrat officiel

## Preuves de fragilités réelles

### 4. Génération jour/semaine — incohérence sur `DRAFT_ALREADY_EXISTS`
Preuves UI :
- `app/planning/planning-client.tsx:686-693`
  - génération semaine : le client cherche `json.runId` au niveau racine
- `app/planning/planning-client.tsx:746-754`
  - génération jour : le client cherche `json.runId` au niveau racine

Preuves API :
- `app/api/planning/autoschedule/week/route.ts:151-152`
  - le sentinel interne porte `details: { runId: existingDraft.id }`
- `app/api/planning/autoschedule/week/route.ts:257-258`
  - la réponse HTTP finale renvoie `details: result.details`
- `app/api/planning/autoschedule/day/route.ts:126-127`
  - le sentinel interne porte `details: { runId: existingDraft.id }`
- `app/api/planning/autoschedule/day/route.ts:215-216`
  - la réponse HTTP finale renvoie `details: result.details`

Conclusion probante :
- l’API fournit `details.runId` ;
- l’UI attend `runId` à la racine ;
- la branche de récupération du brouillon existant n’est donc pas correctement alignée.

### 5. Assignation planning — incohérence de codes d’erreur de conflit
Preuves UI :
- `app/planning/planning-client.tsx:1106-1125`
  - l’UI attend `USER_CONFLICT`, `VEHICLE_CONFLICT`, `RUN_NOT_DRAFT`

Preuves API / service :
- `app/api/planning/shifts/[id]/assign/route.ts:167-174`
  - la route renvoie `RUN_NOT_DRAFT`, `USER_OVERLAP_CONFLICT`, `VEHICLE_OVERLAP_CONFLICT`, `RULE_BLOCKED`
- `lib/services/planning/assign-draftshift.ts:121-143`
  - le service produit `USER_OVERLAP_CONFLICT`
- `lib/services/planning/assign-draftshift.ts:162-178`
  - le service produit `VEHICLE_OVERLAP_CONFLICT`

Conclusion probante :
- l’UI ne teste pas les codes réellement renvoyés pour les conflits d’assignation ;
- les messages spécialisés prévus côté frontend ne couvrent donc pas les vrais codes API.

### 6. Le détail run est compatible mais l’UI écrase l’erreur détaillée
Preuve UI :
- `app/planning/planning-client.tsx:415-416`
  - tout échec de `GET /api/planning/autoschedule/runs/[id]` devient `RUN_INFO_ERROR`

Preuve API :
- `app/api/planning/autoschedule/runs/[id]/route.ts:83-85,135-169`
  - la route renvoie pourtant un contrat structuré avec `error` et `details`

Conclusion probante :
- pas de rupture de contrat ;
- mais consommation UI moins riche que l’API réellement fournie.

### 7. `users` / `vehicles` affichent encore souvent le `error` brut
Preuves UI :
- `app/users/reset-password-client.tsx:56-58,128-130`
  - l’erreur affichée provient directement de `json.error`
- `app/vehicles/vehicles-client.tsx:18-20,48-49,74-75`
  - l’erreur affichée provient directement de `payload.error`

Preuves API :
- `app/api/users/[id]/reset-password/route.ts:49-58`
  - la route renvoie aussi des détails exploitables (`VALIDATION_ERROR`, `BAD_REQUEST` avec `details.message`)
- `app/api/vehicles/route.ts:97-100`
  - la route renvoie `error: "CONFLICT"` avec `details.message = "Véhicule déjà existant"`

Conclusion probante :
- la structure est cohérente ;
- l’exploitation UX des erreurs harmonisées reste partielle.

## Routes relues mais non couvertes UI
- `app/api/planning/autoschedule/runs/route.ts`
  - aucune consommation UI directe prouvée sur le périmètre inspecté
- `app/api/planning/autoschedule/runs/[id]/match/route.ts`
  - route dépréciée, aucune consommation UI directe prouvée

Conséquence :
- elles sont relues pour bornage ;
- elles ne fondent pas un défaut API/UI de `API-05`.

## Vérifications techniques réellement documentées
- Relecture documentaire ciblée réalisée sur les documents pertinents de `./docs`, avec priorité donnée au dossier `./docs/1-master` conformément aux règles du dépôt ;
- recherche textuelle des consommateurs UI réels ;
- inspection statique croisée API/UI.

Tentative d'exécution de vérification technique dans l'environnement extrait :
- `npm run lint` → échec (`eslint: not found`)
- `npm run build` → échec (`next: not found`)

Ces vérifications n'ont donc pas pu être exécutées dans cet environnement.
