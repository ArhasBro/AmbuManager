# EVIDENCES

## Référence produit officielle

- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:591-666`
  - module 09 officiel
  - composition minimale d’équipe
  - type de véhicule requis
  - nombre minimal de personnes
  - couleurs libres
  - archivage
  - récurrence hebdomadaire non bloquante
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md:485-509`
  - plan A6 officiel
  - résultat attendu : `templates réellement administrables`
  - résultat attendu : `fondation correcte pour planning, autoschedule, matching`

## Sessions / patchs A6 réellement présents

- Sessions réelles : `docs/2-sessions/1-ALPHA/BLOC_A6/*`
- Patchs réels : `docs/3-patches/1-ALPHA/BLOC_A6/*`
- `docs/3-patches/1-ALPHA/BLOC_A6/SESSION-20260407-14_A6_TPL-14/README_PATCH.md:16-38`
  - résiduel matching identifié puis corrigé en TPL-14
- `docs/3-patches/1-ALPHA/BLOC_A6/SESSION-20260407-15_A6_CLOTURE-A6/NO_PATCH.md`
  - session de clôture annoncée sans patch code

## Code réel — Prisma / migrations

- `prisma/schema.prisma:257-285`
  - modèle `ShiftTemplate` avec `secondaryAllowedRoles`, `minStaffCount`, `requiredVehicleType`, `archivedAt`, `isTimeDefined`, `color`
- `prisma/migrations/20260407093000_tpl03_enforce_template_company_integrity/migration.sql:1-106`
  - garde-fous multi-tenant réels
- `prisma/migrations/20260407120000_tpl07_13_templates_admin_module/migration.sql:5-43`
  - ajout des champs A6 et index d’archivage

## Code réel — API / UI templates

- `app/api/templates/route.ts:35-66`
  - `GET /api/templates`, filtrage `companyId`, `isActive`, `includeArchived`
- `app/api/templates/route.ts:80-119`
  - `POST /api/templates`, création avec champs A6
- `app/api/templates/[id]/route.ts:48-96` et `101-156`
  - `PATCH /api/templates/[id]`, merge + validation + update champs A6
- `app/api/templates/[id]/archive/route.ts:34-48`
  - archivage logique
- `app/templates/page.tsx:19-56`
  - page `/templates` branchée sur les données réelles
- `app/templates/templates-client.tsx:68-119`
  - formulaire create/edit avec catégorie, effectif, véhicule, horaire, couleur
- `app/templates/templates-client.tsx:133-183`
  - statuts actif / désactivé / archivé
- `app/templates/templates-client.tsx:636-698`
  - rendu liste avec couleur, statut, règles d’équipe, véhicule, archivage

## Code réel — règles métier templates

- `lib/templates/template-api.ts:16-18`
  - `minStaffCount` borné au scope actuel
- `lib/templates/template-api.ts:126-170`
  - résolution / validation état template (horodaté vs non horodaté, couleur, staff)
- `lib/templates/template-rules.ts:16-24`
  - résolution du nombre de slots
- `lib/templates/template-rules.ts:50-78`
  - rôles autorisés par slot
- `lib/templates/template-rules.ts:80-112`
  - presets par catégorie (AMBULANCE/GARDE, VSL, TAXI)

## Code réel — impacts planning / autoschedule / matching

- `app/api/planning/autoschedule/day/route.ts:130-156`
  - autoschedule DAY ne prend que templates actifs, non archivés, horodatés
- `app/api/planning/autoschedule/week/route.ts:155-181`
  - idem autoschedule WEEK
- `lib/services/planning/assign-draftshift.ts:60-140`
  - assignation DraftShift respecte composition et type véhicule
- `lib/services/planning/assign-shift.ts:62-138`
  - assignation Shift respecte composition et type véhicule
- `app/api/planning/shifts/[id]/assign/route.ts:103-117`
  - blocage `user2` si le template n’exige qu’un slot
- `app/api/planning/shifts/[id]/assign/route.ts:203-212`
  - réponses planning enrichies avec données template A6
- `app/api/planning/shifts/route.ts:128-130`
  - listing planning expose `minStaffCount`, `requiredVehicleType`, `color`
- `app/planning/planning-client.tsx:1712-1774`
  - carte planning mono ou bi-slot selon `minStaffCount`
- `app/planning/planning-client.tsx:1840-1884`
  - affichage couleur et type véhicule requis
- `lib/services/planning/matching.service.ts:124-162`
  - calcul des slots requis / manquants / prochain slot assignable
- `lib/services/planning/matching.service.ts:178-380`
  - matching par slot avec pools de rôles issus du template
- `lib/services/planning/matching.service.ts:389-518`
  - application du plan sur le prochain slot libre

## Validations terminales

### Historiques documentées
- `docs/3-patches/1-ALPHA/BLOC_A6/SESSION-20260407-14_A6_TPL-14/README_PATCH.md:40-50`
  - `git apply --check` → OK
  - `git apply` → OK
  - `npx prisma validate` → OK
  - `npx prisma generate` → OK
  - `npm run lint` → OK
  - `npm run build` → OK

### Rejeu pendant cette clôture
- tentative `npm ci --cache /tmp/npm-cache --no-audit --no-fund`
- installation non exploitable dans l’environnement de contrôle du ZIP :
  - `node_modules/next/package.json` absent après installation partielle
  - `npm ls --depth=0` remonte `next@ invalid` et de nombreux modules `extraneous`
- conséquence :
  - rejeu local complet de `npx prisma validate`, `npx prisma generate`, `npm run lint`, `npm run build` non prouvé dans cette session de clôture
