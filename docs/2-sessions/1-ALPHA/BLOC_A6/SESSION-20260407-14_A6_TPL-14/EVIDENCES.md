# EVIDENCES

Éléments factuels utilisés pendant la session.

---

## Sources utilisées

Documentation maître relue :
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`

Sessions / patchs A6 contrôlés :
- `docs/2-sessions/1-ALPHA/BLOC_A6/SESSION-20260407-01_A6_TPL-01/*`
- `docs/2-sessions/1-ALPHA/BLOC_A6/SESSION-20260407-02_A6_TPL-02/*`
- `docs/2-sessions/1-ALPHA/BLOC_A6/SESSION-20260407-03_A6_TPL-03/*`
- `docs/2-sessions/1-ALPHA/BLOC_A6/SESSION-20260407-04_A6_TPL-04/*`
- `docs/2-sessions/1-ALPHA/BLOC_A6/SESSION-20260407-05_A6_TPL-05/*`
- `docs/2-sessions/1-ALPHA/BLOC_A6/SESSION-20260407-06_A6_TPL-06/*`
- `docs/2-sessions/1-ALPHA/BLOC_A6/SESSION-20260407-07_13_A6_TPL-LOT-07-13/*`
- `docs/3-patches/1-ALPHA/BLOC_A6/SESSION-20260407-01_A6_TPL-01/*`
- `docs/3-patches/1-ALPHA/BLOC_A6/SESSION-20260407-02_A6_TPL-02/*`
- `docs/3-patches/1-ALPHA/BLOC_A6/SESSION-20260407-03_A6_TPL-03/*`
- `docs/3-patches/1-ALPHA/BLOC_A6/SESSION-20260407-04_A6_TPL-04/*`
- `docs/3-patches/1-ALPHA/BLOC_A6/SESSION-20260407-05_A6_TPL-05/*`
- `docs/3-patches/1-ALPHA/BLOC_A6/SESSION-20260407-06_A6_TPL-06/*`
- `docs/3-patches/1-ALPHA/BLOC_A6/SESSION-20260407-07_13_A6_TPL-LOT-07-13/*`

Code réellement contrôlé :
- `prisma/schema.prisma`
- `prisma/migrations/20260407120000_tpl07_13_templates_admin_module/migration.sql`
- `app/api/templates/route.ts`
- `app/api/templates/[id]/route.ts`
- `app/api/templates/[id]/archive/route.ts`
- `app/templates/page.tsx`
- `app/templates/templates-client.tsx`
- `lib/templates/template-api.ts`
- `lib/templates/template-rules.ts`
- `lib/services/templates/archive-template.ts`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`
- `lib/services/planning/assign-draftshift.ts`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/matching.service.ts`

## Constat factuel sur l'état A6 avant correctif TPL-14

Constats positifs réellement observés :
- `ShiftTemplate` contient bien `secondaryAllowedRoles`, `minStaffCount`, `requiredVehicleType`, `archivedAt`, `isTimeDefined`, `color` dans `prisma/schema.prisma`.
- L'API templates lit et écrit ces champs dans `app/api/templates/route.ts` et `app/api/templates/[id]/route.ts`.
- L'archivage logique existe via `app/api/templates/[id]/archive/route.ts`.
- L'UI `/templates` permet bien la gestion métier de ces champs dans `app/templates/templates-client.tsx`.
- Le planning exploite déjà `minStaffCount`, `requiredVehicleType` et `color` dans `app/planning/planning-client.tsx`.
- L'autoschedule jour / semaine filtre les templates sur la notion de templates horodatés dans `app/api/planning/autoschedule/day/route.ts` et `week/route.ts`.
- L'assignation manuelle côté planning tient déjà compte de la composition minimale et du véhicule requis dans `lib/services/planning/assign-draftshift.ts` et `lib/services/planning/assign-shift.ts`.

Résiduel strictement prouvé avant correctif :
- `lib/services/planning/matching.service.ts` ne portait pas complètement la logique de composition d'équipe des templates.
- Le matching n'était donc pas au même niveau fonctionnel que le reste du bloc A6 sur la partie fondation matching.

## Validations réellement exécutées

Validation patch sur copie reconstituée à l'état avant correctif :

```text
$ git apply --check PATCH__SESSION-20260407-14_A6_TPL-14.diff
__EXIT:0__

$ git apply PATCH__SESSION-20260407-14_A6_TPL-14.diff
__EXIT:0__
```

Validations terminales réelles communiquées pour la session :

```text
$ npx prisma validate
__EXIT:0__

$ npx prisma generate
__EXIT:0__

$ npm run lint
__EXIT:0__

$ npm run build
__EXIT:0__
```
