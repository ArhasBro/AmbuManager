# EVIDENCES

## Sources utilisées

### Documentation
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`

### Code réel
- `prisma/schema.prisma`
- `prisma/migrations/20260224175839_init/migration.sql`
- `prisma/seed.ts`
- `lib/auth.ts`
- `types/next-auth.d.ts`
- `app/api/company/rules/route.ts`
- `app/api/health/prisma/route.ts`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`

## Extraits documentaires déterminants

### Cadrage officiel du profil société
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:151-169`
  - module `03 — Multi-tenant / sociétés / profil société`
  - `03.2 Profil société`
  - besoin minimal explicite : `nom société`, `nom des gérants`, `adresse`, `téléphone`, `SIRET`
  - statut actuel produit : `partiel`

### Ordonnancement officiel du plan
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md:273-281`
  - `ORG-01 — AUDIT`
  - `ORG-02 — COMPLÉTION`
  - `ORG-03 — COMPLÉTION`
  - `ORG-04 — VALIDATION`

## Extraits code déterminants

### Modèle `Company` réellement présent
- `prisma/schema.prisma:88-114`
  - champs visibles : `id`, `name`, `createdAt`, `updatedAt`
  - aucune trace de `gerants`, `adresse`, `telephone`, `siret`
  - le reste du modèle porte uniquement des relations métier

### Migration initiale confirmant la structure minimale
- `prisma/migrations/20260224175839_init/migration.sql:11-17`
  - table `Company` créée avec :
    - `id`
    - `name`
    - `createdAt`
    - `updatedAt`
- `prisma/migrations/20260224175839_init/migration.sql:48`
  - index unique sur `Company.name`

### Rattachement multi-tenant par société
- `prisma/schema.prisma:116-149`
  - `User.companyId` obligatoire
  - relation `User -> Company`
- `lib/auth.ts:43-66`
  - lecture de `companyId` au login
- `lib/auth.ts:72-117`
  - injection de `companyId` dans le JWT puis dans `session.user.companyId`
- `types/next-auth.d.ts:6-27`
  - typings enrichis avec `companyId`

### API `company` réellement visible
- `app/api/company/rules/route.ts:10-18`
  - route documentée pour des règles `company/rules`
- `app/api/company/rules/route.ts:47-71`
  - lecture des `CompanyRule`
- `app/api/company/rules/route.ts:107-128`
  - upsert d’une règle par `companyId` + `key`

Constat probant :
- cette route gère des réglages clé/valeur ;
- elle ne lit ni n’édite le profil société lui-même.

### Usage technique de `Company` hors profil société
- `app/api/health/prisma/route.ts:19-29`
  - contrôle technique fondé sur `companyId`
- recherches transversales de `prisma.company.*`
  - usages réels trouvés surtout dans `seed.ts` et `health/prisma`
  - absence de service métier dédié à la fiche société

### Seed / bootstrap société
- `prisma/seed.ts:30-44`
  - type `SeedCompany` ne porte que :
    - `name`
    - `admin`
    - `users`
    - `vehicles`
    - `templates`
- `prisma/seed.ts:46-64`
  - `upsertCompany(name)` travaille sur le seul champ `name`
- `prisma/seed.ts:189-255`
  - sociétés seedées avec `name` uniquement au niveau société
- `prisma/seed.ts:258-323`
  - rattachement des autres données via `company.id`

## Absences significatives prouvées

### Champs minimaux non trouvés dans le schéma
Recherche ciblée sur le dépôt métier inspecté :
- `SIRET` : non trouvé sur le modèle `Company`
- `adresse` / `address` : non trouvé sur le modèle `Company`
- `téléphone` / `telephone` / `phone` : non trouvé sur le modèle `Company`
- `gérant` / `gerant` / champ équivalent société : non trouvé sur le modèle `Company`

### UI profil société non trouvée
Constat de structure :
- aucun fichier applicatif dédié du type `app/company/page.tsx`, `app/company/[...]`, `app/settings/company/*` ou équivalent n’a été trouvé dans le dépôt inspecté ;
- le seul sous-arbre `app/api/company/*` visible est `app/api/company/rules/route.ts`.

## Vérifications techniques réellement exécutées

- relecture documentaire du pack imposé ;
- inspection statique ciblée du schéma Prisma ;
- inspection ciblée des migrations liées à `Company` ;
- inspection ciblée de `seed.ts` ;
- recherche transversale des usages `Company` / `companyId` ;
- `npm run lint` ;
- `npm run build`.

## Résultats des vérifications techniques

- `npm run lint` : **échec**
  - `sh: 1: eslint: not found`
- `npm run build` : **échec**
  - `sh: 1: next: not found`

Motif factuel visible dans l’environnement extrait :
- `package.json` déclare bien `eslint` et `next`,
- mais `node_modules/.bin` est absent dans l’archive fournie,
- donc les exécutables ne sont pas disponibles localement dans cette session.
