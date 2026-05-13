# EVIDENCES

## Documentation utilisée
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:544-590`
  - module 08 cadré comme “Paramètres société / règles métier”
  - 08.1 : écran métier compréhensible encore attendu
  - 08.2 : règles ALPHA cadrées plus larges que l’existant prouvé
  - 08.4 : modes `OFF / ALERT / BLOCK / BOTH` présents en data, non exigés complètement en ALPHA
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md:461-474`
  - `RULES-02` = validation ciblée du modèle actuel
- `docs/PROTOCOLE_SESSION.md`
  - sources autorisées, validation factuelle, pas de reconstruction non sourcée
- `docs/SOURCES_AUTORISEES.md`
  - priorité donnée au code réel et à la documentation autorisée

## Schéma Prisma
- `prisma/schema.prisma:38-42`
  - enum `RuleMode` réel : `OFF | ALERT | BLOCK | BOTH`
- `prisma/schema.prisma:92-105`
  - relation `Company.rules`
- `prisma/schema.prisma:242-255`
  - modèle `CompanyRule`
  - champs : `id`, `companyId`, `key`, `value`, `mode`, `createdAt`, `updatedAt`
  - relation vers `Company`
  - contrainte `@@unique([companyId, key])`
  - index `@@index([companyId])`

## Migration SQL
- `prisma/migrations/20260226173427_add_company_rules/migration.sql:1-24`
  - création SQL réelle de l’enum `RuleMode`
  - création table `CompanyRule`
  - index `CompanyRule_companyId_idx`
  - unique `CompanyRule_companyId_key_key`
  - FK `companyId -> Company(id)` avec `ON DELETE CASCADE`

## API company rules
- `app/api/company/rules/route.ts:22-75`
  - `GET /api/company/rules` lit les règles de la société courante
  - filtre optionnel `keys=...`
  - renvoie `id`, `key`, `value`, `mode`, `createdAt`, `updatedAt`
- `app/api/company/rules/route.ts:77-132`
  - `PATCH /api/company/rules` protégé par `canManageCompanyRules(...)`
  - `upsert` basé sur `companyId_key`
  - création d’une nouvelle règle avec `mode: RuleMode.OFF`
  - mise à jour limitée à `value`

## Permissions
- `lib/permissions.ts:36-45`
  - accès natif `ADMIN` / `GERANT`, sinon permission explicite
- `lib/permissions.ts:93-95`
  - helper réel `canManageCompanyRules(...)`
- `lib/permission-catalog.ts:68-70`
  - permission réelle `COMPANY_RULES_MANAGE`

## Usage réel : PLANNING_VIEW_MODE
- `app/planning/page.tsx:22-27`
  - calcul réel de `canManageCompanyRules(...)`
- `app/planning/planning-client.tsx:589-607`
  - lecture de `PLANNING_VIEW_MODE`
- `app/planning/planning-client.tsx:638-662`
  - écriture de `PLANNING_VIEW_MODE`
- Constat :
  - valeur stockée en texte (`SIMPLE` / `AMBULANCE`)
  - `mode` n’est pas utilisé pour piloter ce comportement UI

## Usage réel : PLANNING_MIN_REST_HOURS
- `lib/services/planning/assign-shift.ts:34-47`
  - lecture de `PLANNING_MIN_REST_HOURS`
  - conversion `value -> Number`
- `lib/services/planning/assign-shift.ts:231-239`
  - `ALERT/BOTH` => signalement
  - `BLOCK/BOTH` => blocage
- `lib/services/planning/assign-draftshift.ts:33-46`
  - même lecture côté draft shift
- `lib/services/planning/assign-draftshift.ts:245-253`
  - même exploitation de `mode`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts:240-262`
  - `OFF` => règle désactivée
  - valeur invalide => erreur de configuration
  - sinon activation avec `hours` + `mode`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts:472-483`
  - blocage de publication si `mode = BLOCK` ou `BOTH`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts:554-565`
  - réponse API explicite `MIN_REST_BLOCKED`

## Validations réellement exécutées / constatées
- `npx prisma validate`
  - échec d’environnement avant validation du schéma :
  - `npx` tente d’installer `prisma@7.6.0`
  - erreur `npm error code E401`
- `npx prisma generate`
  - échec d’environnement :
  - tentative d’installation `prisma@7.6.0`
  - arrêt sur `@prisma/engines` avec `SIGTERM`
- `npm run lint`
  - échec d’environnement : `eslint: not found`
- `npm run build`
  - échec d’environnement : `next: not found`

## Qualification factuelle retenue
- **modèle actuel** : conforme pour les usages réellement prouvés
- **module A5 global** : encore partiel au regard du cadrage du module 08
