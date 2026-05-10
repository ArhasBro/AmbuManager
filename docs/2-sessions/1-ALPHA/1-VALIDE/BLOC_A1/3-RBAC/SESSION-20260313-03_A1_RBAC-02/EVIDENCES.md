# EVIDENCES

## Preuves utilisées pour RBAC-02

---

## 1. Cadrage officiel et plan

### 1.1 Rôle officiel attendu
Preuves documentaires :
- `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md:272-281`

Constat :
- le cadrage officiel vise `ADE` comme rôle métier terrain ;
- `DEA` correspond à l’écart à corriger, pas à la cible officielle.

### 1.2 Session prévue au plan
Preuves documentaires :
- `docs/master/PLAN_DE_DEVELOPPEMENT.md:247-249`

Constat :
- `RBAC-02` est explicitement prévue comme correction `DEA` → `ADE`.

---

## 2. Ce que RBAC-01 a réellement prouvé

### 2.1 Décalage confirmé
Preuves documentaires :
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260313-02_A1_RBAC-01/RESULTATS.md:123-127`
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260313-02_A1_RBAC-01/SESSION.md:115-116`

Constat :
- `RBAC-01` a déjà établi que le code porte `DEA` alors que le cadrage vise `ADE`.

### 2.2 Usage distinct non prouvé pour ce rôle terrain
Preuves documentaires :
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260313-02_A1_RBAC-01/RESULTATS.md:64-72`
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260313-02_A1_RBAC-01/NOTES.md:159-164`

Constat :
- aucun usage produit distinct spécifique à `DEA` n’est prouvé ;
- la correction attendue est donc nominale et structurelle, pas fonctionnelle au sens permissionnaire.

---

## 3. Occurrences réelles de `DEA` dans le dépôt avant correction

### 3.1 Enum source métier
Preuves code :
- `prisma/schema.prisma:12-20`

Constat :
- l’enum `Role` contenait encore `DEA`.

### 3.2 Migration historique d’initialisation
Preuves code :
- `prisma/migrations/20260224175839_init/migration.sql:2`

Constat :
- la migration historique crée l’enum PostgreSQL avec la valeur `DEA`.

Qualification :
- élément historique à conserver ;
- ne doit pas être réécrit dans cette session.

### 3.3 Type local UI réellement concerné
Preuves code :
- `app/planning/planning-client.tsx:33`

Constat :
- un type local `Role` côté UI planning portait encore `DEA`.

### 3.4 Absence d’autres usages source `DEA`
Preuves d’inspection :
- recherche textuelle du dépôt hors archives et dépendances

Constat :
- aucune branche auth/session/API/service source supplémentaire contenant `DEA` n’a été trouvée dans le périmètre inspecté ;
- les autres zones utiles consomment `Role` de manière dérivée via Prisma.

---

## 4. Correction réellement appliquée

### 4.1 Enum Prisma réaligné
Preuves code :
- `prisma/schema.prisma:12-20`

Constat :
- la valeur source du rôle est désormais `ADE`.

### 4.2 Migration additive de persistance
Preuves code :
- `prisma/migrations/20260313120000_rename_role_dea_to_ade/migration.sql:1`

Constat :
- la persistance est traitée explicitement par renommage de valeur d’enum PostgreSQL.

### 4.3 Type UI local réaligné
Preuves code :
- `app/planning/planning-client.tsx:33`

Constat :
- le type local `Role` du planning est désormais aligné sur `ADE`.

---

## 5. Éléments explicitement laissés inchangés

### 5.1 Migration initiale
Preuves code :
- `prisma/migrations/20260224175839_init/migration.sql:2`

Constat :
- laissée intacte car historique.

### 5.2 Seed
Preuves code :
- `prisma/seed.ts:189-285`

Constat :
- aucune donnée `DEA` seedée n’était prouvée ;
- aucun changement de seed n’était nécessaire pour la correction nominale demandée.

### 5.3 Auth / session / RBAC utilitaire
Preuves code :
- `lib/auth.ts:1-116`
- `types/next-auth.d.ts:1-28`
- `lib/rbac.ts:1-4`

Constat :
- ces zones reposent sur l’enum `Role` mais ne contenaient pas d’occurrence textuelle `DEA` à corriger manuellement.

---

## 6. État final prouvé du dépôt cible

### 6.1 Patch appliqué
Résultat :
- OK

Constat :
- le patch `.diff` a bien été appliqué dans le dépôt cible.

### 6.2 `npm run lint`
Résultat :
- OK

Constat :
- la vérification `lint` a été exécutée avec succès dans l’état final du dépôt cible.

### 6.3 `npm run build`
Résultat :
- OK

Constat :
- la vérification `build` a été exécutée avec succès dans l’état final du dépôt cible.
