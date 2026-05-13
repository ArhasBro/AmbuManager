# EVIDENCES

## 1. Sources documentaires autorisées utilisées

### 1.1 Corpus maître prioritaire
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`

### 1.2 Règles documentaires et structure
- `docs/SOURCES_AUTORISEES.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`

### 1.3 Sessions précédentes utiles relues
- `docs/2-sessions/1-ALPHA/BLOC_A1/1-AUTH/SESSION-20260312-02_A1_AUTH-03/*`
- `docs/2-sessions/1-ALPHA/BLOC_A1/2-TENANT/SESSION-20260313-01_A1_TENANT-04/*`
- `docs/2-sessions/1-ALPHA/BLOC_A1/3-RBAC/SESSION-20260313-10_A1_RBAC-09/*`
- `docs/2-sessions/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-11_A1_API-01/*`
- `docs/2-sessions/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-12_A1_API-02/*`
- `docs/2-sessions/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-13_A1_API-03/*`

## 2. Preuves documentaires de cadrage

### 2.1 Contrat API officiel
Sources :
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/REGISTRE_DECISIONS.md`

Preuve retenue :
- le format cible officiel est bien :
  - succès : `{ ok:true, data }`
  - erreur : `{ ok:false, error, details? }`

Conséquence méthodologique :
- `API-04` ne réouvre pas la structure externe ;
- la cible est la cohérence sémantique minimale du champ `error`.

### 2.2 Position officielle de la session dans le plan
Source :
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`

Preuve retenue :
- `API-04` est bien définie comme :
  - `CORRECTION`
  - `Harmonisation minimale des erreurs critiques`

Conséquence méthodologique :
- la session doit corriger le minimum utile ;
- elle ne doit pas devenir une refonte globale des erreurs API.

### 2.3 Héritage prouvé de `API-03`
Source :
- `docs/2-sessions/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-13_A1_API-03/*`

Preuve retenue :
- `API-03` a déjà conclu que :
  - la structure externe des erreurs est globalement cohérente ;
  - la sémantique du champ `error` reste hétérogène ;
  - `lib/api/response.ts` est encore en style texte anglais ;
  - `lib/api/prisma-error.ts` n’est pas encore cohérent avec la doctrine majoritaire ;
  - `vehicles` expose au moins un message métier libre dans `error`.

## 3. Fichiers code réellement inspectés
- `lib/api/response.ts`
- `lib/api/prisma-error.ts`
- `app/api/health/prisma/route.ts`
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

## 4. Preuves code — helpers désormais alignés

### 4.1 `lib/api/response.ts`
Preuves actuelles :
- lignes 15-16 : `badRequest(error = "BAD_REQUEST", details?: unknown)`
- lignes 19-20 : `UNAUTHORIZED`
- lignes 23-24 : `FORBIDDEN`
- lignes 27-28 : `NOT_FOUND`
- lignes 31-32 : `CONFLICT`
- lignes 35-37 : `SERVER_ERROR`

Conclusion probante :
- le helper partagé n’introduit plus de wording anglais concurrent sur les erreurs critiques génériques.

### 4.2 `lib/api/prisma-error.ts`
Preuves actuelles :
- ligne 30 : `P2002` => `CONFLICT`
- ligne 31 : `P2025` => `NOT_FOUND`
- ligne 34 : fallback `duplicate key` => `CONFLICT`

Conclusion probante :
- le mapping Prisma partagé suit désormais la même doctrine symbolique que la majorité du dépôt.

## 5. Preuves code — routes critiques corrigées

### 5.1 `app/api/users/route.ts`
Preuve actuelle :
- ligne 39 : la validation de query renvoie `VALIDATION_ERROR` avec `parsed.error.flatten()` en `details`.

Conclusion :
- `Invalid query` n’est plus exposé dans `error`.

### 5.2 `app/api/users/[id]/reset-password/route.ts`
Preuves actuelles :
- ligne 49 : `INVALID_JSON`
- ligne 53 : `VALIDATION_ERROR`
- ligne 56 : `BAD_REQUEST` avec `details.message = "Missing user id"`
- lignes 57-58 : `BAD_REQUEST` avec `details.message = "Self password change is out of scope for this route"`

Conclusion :
- les erreurs critiques de parsing / validation / requête ne sont plus libres dans `error`.

### 5.3 `app/api/vehicles/route.ts`
Preuves actuelles :
- ligne 42 : `VALIDATION_ERROR` pour la query de liste
- ligne 73 : `VALIDATION_ERROR` pour le body de création
- lignes 99-100 : conflit véhicule rendu sous `error: "CONFLICT"` avec explication métier conservée dans `details.message`
- ligne 117 : `VALIDATION_ERROR` pour la query de suppression

Conclusion :
- le message libre `Véhicule déjà existant` n’est plus utilisé comme valeur du champ `error`.

## 6. Routes relues mais volontairement laissées intactes

Routes laissées intactes car déjà symboliquement cohérentes :
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

Motif factuel :
- `error` y est déjà majoritairement sous forme de code uppercase ;
- les écarts restants ne justifient pas une réécriture dans `API-04`.

## 7. Patch et vérifications réellement exécutées

### 7.1 Patch officiel produit
Fichier généré :
- `docs/3-patches/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-14_A1_API-04/PATCH__SESSION-20260313-14_A1_API-04.diff`

Périmètre exact du patch :
- `lib/api/response.ts`
- `lib/api/prisma-error.ts`
- `app/api/users/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/api/vehicles/route.ts`

### 7.2 Vérification de patch sur copie propre
Vérifications réellement exécutées :
- `git apply --check` : `OK`
- `git apply` : `OK`

Conclusion :
- le patch officiel est applicable sur copie propre du dépôt extrait.

### 7.3 Vérifications techniques de build/lint
Vérifications réellement exécutées :
- `npm run lint`
- `npm run build`

Résultats réels :
- `npm run lint` : `OK`
- `npm run build` : échec hors périmètre `API-04` sur `app/api/company/rules/route.ts`

Erreur factuelle observée au build :
- `Type error: Module "@prisma/client" has no exported member 'RuleMode'.`

Motif factuel :
- les dépendances ont été installées localement ;
- `lint` passe ;
- `build` échoue sur une erreur TypeScript préexistante hors des 5 fichiers `API-04`.
