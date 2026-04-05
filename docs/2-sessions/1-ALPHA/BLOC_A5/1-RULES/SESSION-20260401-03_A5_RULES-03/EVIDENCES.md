# EVIDENCES

## Documentation utilisée
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:544-590`
  - module 08 cadré comme “Paramètres société / règles métier”
  - 08.2 : règles ALPHA attendues plus larges que l’existant prouvé
  - 08.4 : `OFF / ALERT / BLOCK / BOTH` présents en data, mais partiels
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md:461-475`
  - bloc A5 et séquençage `RULES-01` à `RULES-09`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`

## Schéma / data
- `prisma/schema.prisma:38-42`
  - enum réel `RuleMode = OFF | ALERT | BLOCK | BOTH`
- `prisma/schema.prisma:105`
  - relation `Company.rules`
- `prisma/schema.prisma:242-255`
  - modèle `CompanyRule`
  - unique `(companyId, key)`
- `prisma/migrations/20260226173427_add_company_rules/migration.sql:1-24`
  - création SQL réelle de `RuleMode` et `CompanyRule`

## Lectures / écritures réelles de `CompanyRule`
- `app/api/company/rules/route.ts:22-75`
  - lecture multi-tenant des règles via `GET /api/company/rules`
- `app/api/company/rules/route.ts:77-132`
  - écriture via `PATCH /api/company/rules`
  - `upsert` sur `(companyId, key)`
  - création en `mode: RuleMode.OFF`
- `lib/services/planning/assign-shift.ts:34-47`
  - lecture de `PLANNING_MIN_REST_HOURS`
- `lib/services/planning/assign-draftshift.ts:33-46`
  - lecture de `PLANNING_MIN_REST_HOURS`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts:240-263`
  - lecture de `PLANNING_MIN_REST_HOURS`

## Clés réellement prouvées
- `app/planning/planning-client.tsx:591-648`
  - `PLANNING_VIEW_MODE`
- `lib/services/planning/assign-shift.ts:38`
  - `PLANNING_MIN_REST_HOURS`
- `lib/services/planning/assign-draftshift.ts:37`
  - `PLANNING_MIN_REST_HOURS`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts:16`
  - `PLANNING_MIN_REST_HOURS`

## Différence règle moteur / réglage UI
### `PLANNING_VIEW_MODE`
- `app/planning/planning-client.tsx:591-607`
  - lecture du réglage
- `app/planning/planning-client.tsx:643-648`
  - écriture du réglage
- `app/planning/planning-client.tsx:1583-1607`
  - impact réel limité au choix du composant d’affichage (`ShiftCardSimple` / `ShiftCardAmbulance`)
- `app/api/company/rules/route.ts:112-117`
  - commentaire explicite : création en `RuleMode.OFF` “pour un setting UI”

### `PLANNING_MIN_REST_HOURS`
- `lib/services/planning/assign-shift.ts:199-244`
  - lecture + application en affectation manuelle shift
- `lib/services/planning/assign-draftshift.ts:208-259`
  - lecture + application en affectation manuelle draft
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts:466-485`
  - lecture + application à la publication autoschedule

## Détail réel de `RuleMode`
### Affectation manuelle `assign-shift`
- `lib/services/planning/assign-shift.ts:230-239`
  - `ALERT` / `BOTH` => ajout d’un `issue`
  - `BLOCK` / `BOTH` => retour `RULE_BLOCKED`
- `lib/services/planning/assign-shift.ts:205-226`
  - recherche uniquement du précédent shift/draft avant `startAt`

### Affectation manuelle `assign-draftshift`
- `lib/services/planning/assign-draftshift.ts:243-255`
  - même logique `ALERT` / `BLOCK` que `assign-shift`
- `lib/services/planning/assign-draftshift.ts:214-241`
  - recherche uniquement du précédent draft/shift avant `startAt`

### Publication autoschedule
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts:249-262`
  - `OFF` => règle désactivée
  - valeur invalide => `CONFIG_ERROR`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts:331-358`
  - calcul des warnings sur paires adjacentes
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts:476-483`
  - `BLOCK` / `BOTH` => publication bloquée
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts:554-577`
  - warnings réellement renvoyés à l’API en succès/échec

## Alerte manuelle non réellement exposée
- `lib/services/planning/assign-shift.ts:19-21`
  - le service prévoit un retour `issues`
- `lib/services/planning/assign-draftshift.ts:18-20`
  - le service prévoit un retour `issues`
- `app/api/planning/shifts/[id]/assign/route.ts:200-234`
  - réponse succès draft : l’item est renvoyé, pas `issues`
- `app/api/planning/shifts/[id]/assign/route.ts:277-313`
  - réponse succès shift : l’item est renvoyé, pas `issues`
- `app/planning/planning-client.tsx:1123-1156`
  - sur succès, le client affiche `Affectation enregistrée ✅`
- conclusion factuelle : `ALERT` n’a pas d’effet utilisateur réel prouvé sur l’affectation manuelle courante

## Permissions / cohérence planning
- `lib/permissions.ts:33-39`
  - `ADMIN` / `GERANT` = accès natif
- `lib/permissions.ts:93-95`
  - helper réel `canManageCompanyRules(...)`
- `lib/permission-catalog.ts:68-71`
  - permission réelle `COMPANY_RULES_MANAGE`
- `app/planning/page.tsx:22-27`
  - la page planning calcule réellement `canManageCompanyRules(...)`
- `app/planning/page.tsx:78-86`
  - le droit est transmis au client comme `canManageCompanyMode`

## Écart avec les autres règles cadrées module 08
- `lib/services/planning/user-absence.ts` + usages dans assign/matching/publish
  - l’indisponibilité salarié existe, mais via `UserAbsence`, pas via `CompanyRule`
- `lib/services/planning/assign-shift.ts:25-27`
  - composition équipage partielle via logique codée en dur : `AMBULANCE` / `GARDE` = 2 slots, sinon 1
- `lib/services/planning/matching.service.ts:98-260`
  - restriction par rôle via `template.requiredRole`, pas via `CompanyRule`
- recherche réelle `CompanyRule` / `PLANNING_*`
  - aucune autre règle cadrée du module 08 n’est réellement branchée via `CompanyRule`

## Validations réellement exécutées / constatées
Contexte d’environnement constaté :
- `package-lock.json` présent
- `node_modules` absent dans le ZIP contrôlé

Commandes tentées :
- `npx prisma validate`
  - constat : `npx` tente d’installer `prisma@7.6.0`
  - la validation locale n’aboutit pas dans l’environnement contrôlé
- `npx prisma generate`
  - constat : `npx` tente d’installer `prisma@7.6.0`
  - la génération locale n’aboutit pas dans l’environnement contrôlé
- `npm run lint`
  - échec d’environnement : `eslint: not found`
- `npm run build`
  - échec d’environnement : `next: not found`

## Qualification factuelle retenue
- usage réel des règles dans le moteur : **partiel**
- cohérence inter-flux : **partielle**
- correctif minimal potentiellement justifiable : **oui sur le fond**, mais non produit dans cette session d’audit
