# EVIDENCES

Éléments factuels utilisés pendant la session.

---

## 1. Sources documentaires autorisées utilisées

- `docs/SOURCES_AUTORISEES.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A1/1-AUTH/SESSION-20260312-02_A1_AUTH-03/*`
- `docs/2-sessions/1-ALPHA/BLOC_A1/2-TENANT/SESSION-20260313-01_A1_TENANT-04/*`
- `docs/2-sessions/1-ALPHA/BLOC_A1/3-RBAC/SESSION-20260313-10_A1_RBAC-09/*`
- `docs/2-sessions/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-11_A1_API-01/*`
- `docs/2-sessions/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-12_A1_API-02/*`

## 2. Cadrage documentaire — preuves utiles

### 2.1 Document maître
Source : `docs/1-master/DOCUMENT_MAITRE.md`

Preuves :
- principe non négociable : `Convention API homogène`
- section `7. Conventions API (format unique)`
- format attendu :
  - succès : `{ ok:true, data }`
  - erreur : `{ ok:false, error, details? }`

Constat factuel :
- le projet dispose bien d’un contrat API officiel unique.

### 2.2 Cadrage fonctionnel
Source : `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`

Preuves :
- `MODULE 18 — API / conventions`
- `18.1 Convention API homogène`
- statut actuel : `partiel`
- arbitrage : `le dépôt montre encore plusieurs styles de réponses`

Constat factuel :
- le cadrage officiel attend explicitement des erreurs homogènes ;
- un état encore partiel était déjà admis au niveau documentaire.

### 2.3 Plan officiel
Source : `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`

Preuves :
- `API-01 — AUDIT — Audit du format API existant`
- `API-02 — CORRECTION — Correction des routes non conformes au format API cible`
- `API-03 — AUDIT — Audit de cohérence des erreurs API`
- `API-04 — CORRECTION — Harmonisation minimale des erreurs critiques`

Constat factuel :
- `API-03` est bien une session d’audit d’après correction structurelle, avant harmonisation `API-04`.

### 2.4 Registre des décisions
Source : `docs/1-master/REGISTRE_DECISIONS.md`

Preuve :
- `Format API : { ok:true, data } / { ok:false, error, details? }`

Constat factuel :
- le contrat cible est aussi enregistré comme décision projet.

## 3. Historique prouvé repris sans réouverture

### 3.1 `AUTH-03`
Preuve utile :
- session validée `conforme` sur `role` et `companyId`.

Impact sur `API-03` :
- l’audit des erreurs API ne remet pas en cause la chaîne auth / JWT / session.

### 3.2 `TENANT-04`
Preuve utile :
- session validée `conforme` sur le cloisonnement multi-tenant ALPHA inspecté.

Impact sur `API-03` :
- l’audit des erreurs API ne juge pas ici le cloisonnement comme sujet principal.

### 3.3 `RBAC-09`
Preuve utile :
- session retenue `partiellement conforme` sur le bloc rôles / permissions ALPHA.

Impact sur `API-03` :
- les `401/403` observés sont lus dans un contexte RBAC déjà documenté, sans rouvrir le bloc.

### 3.4 `API-01`
Preuves utiles :
- format cible officiel déjà prouvé ;
- hétérogénéité initiale des erreurs déjà prouvée ;
- verdict `partiellement conforme`.

### 3.5 `API-02`
Preuves utiles :
- correction structurelle validée `conforme` ;
- suppression des écarts top-level hors contrat (`runId`, `message`, `debug`) sur les routes corrigées ;
- `API-02` bornée à la structure, pas à l’harmonisation fine des erreurs.

Constat factuel :
- `API-03` doit donc juger l’état post-correction structurelle, pas refaire `API-02`.

## 4. Fichiers code réellement inspectés

Routes métier inspectées : **16** fichiers `app/api/**/route.ts` hors route NextAuth.

Fichiers inspectés en priorité :
- `lib/api/response.ts`
- `lib/api/prisma-error.ts`
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
- `app/api/health/prisma/route.ts`
- `app/api/users/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/api/vehicles/route.ts`

## 5. Preuves code — structure externe des erreurs

### 5.1 Contrat helper partagé
Source : `lib/api/response.ts`

Preuves visibles :
- ligne 2 : `type ApiErr = { ok: false; error: string; details?: unknown }`
- lignes 15-37 : tous les helpers d’erreur retournent `ok:false` + `error` + `details?`

Constat :
- le helper partagé matérialise bien la structure cible.

### 5.2 Exemples de routes directes structurellement conformes
Sources :
- `app/api/company/rules/route.ts`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`

Preuves visibles :
- `company/rules` : erreurs `UNAUTHORIZED`, `VALIDATION_ERROR`, `INVALID_JSON`, `SERVER_ERROR`
- `planning/shifts` : erreurs `UNAUTHORIZED`, `VALIDATION_ERROR`, `SERVER_ERROR`
- `day` : erreurs `UNAUTHORIZED`, `FORBIDDEN`, `INVALID_JSON`, `VALIDATION_ERROR`, `NO_TEMPLATES`, `DRAFT_ALREADY_EXISTS`
- `publish` : erreurs `UNAUTHORIZED`, `FORBIDDEN`, `VALIDATION_ERROR`, `NOT_FOUND`, `RUN_NOT_DRAFT`, `NO_DRAFTS`, `CONFLICT_USER`, `CONFLICT_VEHICLE`, `RULE_CONFIG_ERROR`, `MIN_REST_BLOCKED`

Constat :
- sur les routes inspectées, les erreurs gardent bien le contrat externe `ok:false` + `error` + `details?`.

### 5.3 Absence d’écart top-level encore prouvé
Constat de recherche :
- aucune réponse d’erreur inspectée ne réintroduit un top-level `message`, `debug` ou `runId` hors `details` ;
- les enrichissements observés sont désormais sous `details` :
  - `details.runId` dans `day` / `week`
  - `details.debug` dans `runs/[id]`, `publish`, `cancel`
  - `details.message` dans `planning/shifts` et `publish`

Conclusion factuelle :
- `API-02` a bien corrigé le problème de structure externe visé.

## 6. Preuves code — le champ `error` reste sémantiquement hétérogène

### 6.1 Doctrine texte dans `lib/api/response.ts`
Source : `lib/api/response.ts`

Preuves visibles :
- ligne 20 : `Unauthorized`
- ligne 24 : `Forbidden`
- ligne 28 : `Not found`
- ligne 32 : `Conflict`
- ligne 37 : `Server error`

Constat :
- le helper spécialisé porte une doctrine `error = message texte`.

### 6.2 Doctrine code symbolique sur de nombreuses routes
Sources :
- `app/api/company/rules/route.ts`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/api/planning/autoschedule/*`

Preuves visibles :
- `UNAUTHORIZED`
- `FORBIDDEN`
- `NOT_FOUND`
- `VALIDATION_ERROR`
- `INVALID_BODY`
- `INVALID_JSON`
- `RUN_NOT_DRAFT`
- `MIN_REST_BLOCKED`
- `RULE_CONFIG_ERROR`

Constat :
- une large partie du dépôt suit plutôt une doctrine `error = code symbolique`.

### 6.3 Message métier libre dans `vehicles`
Source : `app/api/vehicles/route.ts`

Preuves visibles :
- ligne 99 : `conflict("Véhicule déjà existant")`

Constat :
- `vehicles` introduit un troisième style : message métier libre en français dans `error`.

## 7. Preuves code — hétérogénéité par familles de statuts

### 7.1 `401`
Sources :
- `app/api/company/rules/route.ts` : `UNAUTHORIZED`
- `app/api/planning/autoschedule/day/route.ts` : `UNAUTHORIZED`
- `app/api/health/prisma/route.ts` via `unauthorized()` : `Unauthorized`
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts` : `UNAUTHORIZED` + `details` texte

Constat :
- même statut, payloads de `error` différents.

### 7.2 `403`
Sources :
- routes directes : `FORBIDDEN`
- helper `forbidden()` : `Forbidden`
- `match`, `match/preview`, `match/apply` : `FORBIDDEN` + `details` texte

Constat :
- même logique de mélange que pour `401`.

### 7.3 `404`
Sources :
- routes directes : `NOT_FOUND`
- helper `notFound()` : `Not found`
- `match/apply` : `RUN_NOT_FOUND`

Constat :
- le dépôt mélange code générique, message générique et code métier spécifique.

### 7.4 `409`
Sources :
- `day` / `week` : `DRAFT_ALREADY_EXISTS`
- `publish` : `RUN_NOT_DRAFT`, `NO_DRAFTS`, `CONFLICT_USER`, `CONFLICT_VEHICLE`, `MIN_REST_BLOCKED`
- `cancel` : `RUN_ALREADY_PUBLISHED`
- `vehicles` : `Véhicule déjà existant`
- helper `conflict()` par défaut : `Conflict`

Constat :
- le `409` est sémantiquement la famille la plus hétérogène.

### 7.5 `500`
Sources :
- routes directes : `SERVER_ERROR`
- `planning/shifts/[id]/assign` : `INTERNAL_ERROR`
- `match/apply` : `MATCH_FAILED`
- helper `serverError()` : `Server error`

Constat :
- coexistence de plusieurs doctrines pour l’erreur interne.

## 8. Preuves code — validations d’entrée encore hétérogènes

### 8.1 Zod + `flatten()`
Sources :
- `company/rules`
- `planning/shifts`
- `day`
- `week`
- `runs`
- `runs/[id]`
- `publish`
- `cancel`
- `users`
- `users/[id]/reset-password`
- `vehicles`

Constat :
- cette stratégie est fréquente, mais pas exclusive.

### 8.2 `INVALID_BODY` + `flatten()`
Source : `planning/shifts/[id]/assign`

### 8.3 `INVALID_BODY` + `issues`
Sources :
- `match/preview`
- `match/apply`

### 8.4 `INVALID_JSON` sans détails
Sources :
- `company/rules`
- `day`
- `week`

### 8.5 `BAD_REQUEST` + détail texte
Sources :
- `match/preview`
- `match/apply`

### 8.6 `details.message`
Sources :
- `planning/shifts` : `Use day OR weekStart, not both.`
- `publish` : `RULE_CONFIG_ERROR` avec `details.message`

Conclusion factuelle :
- la validation n’a pas encore de convention unique de payload.

## 9. Preuves code — usage réel des helpers

### 9.1 `lib/api/response.ts`
Constat de recherche sur les 16 routes métier :
- import direct prouvé dans **6 routes** :
  - `app/api/health/prisma/route.ts`
  - `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
  - `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
  - `app/api/users/[id]/reset-password/route.ts`
  - `app/api/users/route.ts`
  - `app/api/vehicles/route.ts`

Conclusion :
- le helper existe, mais n’est pas le point de convergence majoritaire des erreurs.

### 9.2 `lib/api/prisma-error.ts`
Constat de recherche :
- import prouvé seulement dans `app/api/vehicles/route.ts`

Conclusion :
- le mapping Prisma partagé n’est pas utilisé de façon cohérente à l’échelle du périmètre inspecté.

### 9.3 Mappings Prisma locaux
Constat de recherche :
- six routes redéfinissent localement `prismaToApiError()` :
  - `day`
  - `week`
  - `runs`
  - `runs/[id]`
  - `publish`
  - `cancel`

Conclusion :
- le mapping Prisma est partiellement convergent dans l’intention, mais pas centralisé.

## 10. Vérifications techniques réellement exécutées

### 10.1 Inspection statique
Réellement exécutée :
- lecture des documents maîtres ;
- lecture des sessions antérieures utiles ;
- inspection des routes API métier présentes ;
- recherches textuelles ciblées sur les payloads d’erreur, les helpers et les mappings Prisma.

### 10.2 Commandes techniques
Réellement exécutées :
- `npm run lint`
- `npm run build`

Résultats :
- `npm run lint` : échec — `sh: 1: eslint: not found`
- `npm run build` : échec — `sh: 1: next: not found`

Contexte prouvé :
- `node_modules` absent dans l’environnement de travail de cette session.

## 11. Conclusion probatoire

Conclusion établie par les preuves :
1. la structure externe des erreurs est désormais conforme sur le périmètre inspecté ;
2. le champ `error` reste utilisé selon plusieurs doctrines concurrentes ;
3. les validations d’entrée restent hétérogènes ;
4. les mappings Prisma restent seulement partiellement convergents ;
5. `lib/api/response.ts` et `lib/api/prisma-error.ts` existent mais ne constituent pas encore une convergence majoritaire des erreurs API.

Verdict probatoire retenu :
- **`partiellement conforme`**
