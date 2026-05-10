# EVIDENCES

## Documentation
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:544-590`
  - module 08 cadré comme “Paramètres société / règles métier”
  - cible attendue : écran compréhensible, règles ALPHA cadrées, permissions de modification, modes OFF/ALERT/BLOCK/BOTH
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:809-833`
  - autoschedule ALPHA doit tenir compte au minimum du repos minimum, indisponibilités salarié/véhicule, rôles interdits selon véhicule
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md:466-474`
  - RULES-01 à RULES-09 planifiés pour le bloc A5
- `docs/PROTOCOLE_SESSION.md`
  - audit factuel, sources autorisées, clôture de bloc séparée

## Schéma / migration
- `prisma/schema.prisma:38-42`
  - enum `RuleMode` = `OFF | ALERT | BLOCK | BOTH`
- `prisma/schema.prisma:242-255`
  - modèle `CompanyRule` avec `companyId`, `key`, `value`, `mode`, timestamps, unique `(companyId, key)`
- `prisma/migrations/20260226173427_add_company_rules/migration.sql:1-24`
  - migration réelle de création enum + table + index + FK

## API rules
- `app/api/company/rules/route.ts:22-75`
  - `GET /api/company/rules` lit les règles de la société courante
  - filtre optionnel `keys=...`
  - lecture autorisée à tout utilisateur authentifié disposant d’un `companyId`
- `app/api/company/rules/route.ts:77-132`
  - `PATCH /api/company/rules` protégé par `canManageCompanyRules(...)`
  - body réel limité à `{ key, value }`
  - `upsert` crée toute nouvelle règle avec `mode: RuleMode.OFF`
  - la route ne permet ni de choisir ni de modifier `mode`

## Permissions
- `lib/permission-catalog.ts:63-71`
  - permission réelle `COMPANY_RULES_MANAGE`
- `lib/permissions.ts:93-95`
  - helper `canManageCompanyRules(...)`
  - accès natif pour `ADMIN` / `GERANT`, sinon permission explicite

## UI
- `app/company/page.tsx:22-67`
  - page “Profil société”, pas module de règles métier
- `app/planning/page.tsx:19-70`
  - le planning calcule `canManageCompanyRules` et transmet `canManageCompanyMode`
- `app/planning/planning-client.tsx:589-617`
  - lecture de `PLANNING_VIEW_MODE` via `/api/company/rules`
- `app/planning/planning-client.tsx:638-662`
  - écriture de `PLANNING_VIEW_MODE`
- `app/planning/planning-client.tsx:1267-1281`
  - seul bouton visible lié aux règles : “Sauvegarder (entreprise)” pour la vue planning

## Usages moteur / planning
- `lib/services/planning/assign-shift.ts:34-47`
  - chargement de `PLANNING_MIN_REST_HOURS`
- `lib/services/planning/assign-shift.ts:208-240`
  - repos minimum traité en signalement / blocage selon `mode`
- `lib/services/planning/assign-draftshift.ts:33-46`
  - même chargement côté draft shift
- `lib/services/planning/assign-draftshift.ts:208-255`
  - même logique repos minimum côté draft
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts:234-263`
  - chargement repos minimum à la publication
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts:466-485`
  - blocage éventuel de publication si `mode` = `BLOCK` ou `BOTH`

## Non-usages prouvés
- recherche globale du dépôt :
  - aucune autre clé métier prouvée en dehors de `PLANNING_VIEW_MODE` et `PLANNING_MIN_REST_HOURS`
  - aucun usage prouvé des règles pour composition équipage ambulance/VSL/taxi
  - aucun usage prouvé des règles pour indisponibilité véhicule via `CompanyRule`
  - aucun usage prouvé des règles pour interdiction de certains rôles sur certains véhicules
  - matching `lib/services/planning/matching.service.ts` utilise rôles et absences, pas `CompanyRule`

## Validations terminales
- `npx prisma validate`
  - échec dans l’environnement de contrôle : tentative d’installation `prisma@7.6.0` via `npx`, arrêt sur `@prisma/engines` (`SIGTERM`)
- `npm run lint`
  - échec environnement : `eslint: not found`
- `npm run build`
  - échec environnement : `next: not found`
