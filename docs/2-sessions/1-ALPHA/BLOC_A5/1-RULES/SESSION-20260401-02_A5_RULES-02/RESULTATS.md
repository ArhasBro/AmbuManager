# RESULTATS

## Résultat principal
Verdict de validation :
**NO_PATCH — MODÈLE ACTUEL CONFORME POUR LES USAGES RÉELS DÉJÀ BRANCHÉS**

## Vérification réelle du modèle
### 1. Existence et structure
Le dépôt prouve réellement :
- l’existence du modèle `CompanyRule`
- l’existence du type `RuleMode`
- une relation correcte vers `Company`
- l’unicité `(companyId, key)`
- un index par `companyId`

### 2. Cohérence schéma / migration
La migration `20260226173427_add_company_rules` est cohérente avec le schéma Prisma contrôlé :
- même enum
- même table
- même clé étrangère
- même index
- même unique composite

### 3. Cohérence schéma / requêtes réelles
Les requêtes réelles utilisent correctement la structure actuelle :
- lecture multi-tenant via `companyId`
- `upsert` sur `companyId_key`
- lecture ciblée des champs `value` et `mode`
- exploitation cohérente de `value` comme texte libre convertible selon la clé

### 4. Validation des usages prouvés
#### `PLANNING_MIN_REST_HOURS`
- supporté correctement par `value` stocké en texte puis converti en nombre
- `mode` réellement utilisé comme sévérité métier
- comportement cohérent dans :
  - affectation manuelle `Shift`
  - affectation manuelle `DraftShift`
  - publication d’un run autoschedule

#### `PLANNING_VIEW_MODE`
- supporté correctement par `value` stocké en texte
- comportement prouvé côté UI planning
- `mode` non requis pour cet usage et sans impact négatif prouvé sur l’existant

## Écarts réels vs cadrage
### Écarts qui relèvent du module A5 futur, pas de `RULES-02`
- le dépôt reste sur une logique technique clé/valeur
- il n’existe pas encore d’écran complet de paramètres métier compréhensibles
- la couverture ALPHA des règles 08.2 est loin d’être complète
- l’API actuelle ne permet pas de piloter `mode` pour une nouvelle règle via l’interface existante

### Pourquoi ces écarts ne justifient pas de patch ici
- la session est une **VALIDATION du modèle**, pas une refonte du module
- aucun défaut bloquant du **modèle de données actuel** n’est démontré pour les usages réellement branchés
- les écarts observés concernent surtout les futures sessions `RULES-03` à `RULES-08`

## Fichiers contrôlés
- `prisma/schema.prisma`
- `prisma/migrations/20260226173427_add_company_rules/migration.sql`
- `app/api/company/rules/route.ts`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/assign-draftshift.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- documents maîtres et documents méthodologiques requis

## Fichiers modifiés
- `docs/2-sessions/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-02_A5_RULES-02/SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-02_A5_RULES-02/NOTES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-02_A5_RULES-02/EVIDENCES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-02_A5_RULES-02/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-02_A5_RULES-02/FIN_SESSION.md`
- `docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-02_A5_RULES-02/NO_PATCH.md`

## Patch retenu
Aucun patch code n’est légitime dans le périmètre strict de `RULES-02`.  
Livrable retenu : **NO_PATCH**.
