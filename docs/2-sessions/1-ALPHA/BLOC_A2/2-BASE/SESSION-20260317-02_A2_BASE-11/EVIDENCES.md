# EVIDENCES

Éléments factuels utilisés pendant la session.

---

## Sources utilisées

### Documentation master / templates

- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`
- `docs/4-templates/TEMPLATE_DOD_4_4.md`
- `docs/4-templates/TEMPLATE_FIN_SESSION.md`
- `docs/4-templates/TEMPLATE_RECAP_SESSION.md`
- `docs/3-patches/README.md`

### Sessions inspectées

- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-03_A2_BASE-02/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-04_A2_BASE-03/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-05_A2_BASE-04/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-06_A2_BASE-05/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-07_A2_BASE-06/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-08_A2_BASE-07/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-09_A2_BASE-08/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-10_A2_BASE-09/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260317-01_A2_BASE-10/RESULTATS.md`

### Artefacts patch inspectés

- `docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-03_A2_BASE-02/BASE-02.diff`
- `docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-04_A2_BASE-03/BASE-03.diff`
- `docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-05_A2_BASE-04/BASE-04.diff`
- `docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-06_A2_BASE-05/BASE-05.diff`
- `docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-07_A2_BASE-06/BASE-06.diff`
- `docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-08_A2_BASE-07/BASE-07.diff`
- `docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-08_A2_BASE-07/PATCH__SESSION-20260316-08_A2_BASE-07_FIX-01.diff`
- `docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-09_A2_BASE-08/BASE-08.diff`
- `docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260316-10_A2_BASE-09/BASE-09.diff`
- `docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260317-01_A2_BASE-10/NO_PATCH.md`

### Code réel inspecté

- `prisma/schema.prisma`
- `prisma/migrations/20260316153000_base02_create_depot_model/migration.sql`
- `prisma/migrations/20260316203000_base08_attach_user_to_depot/migration.sql`
- `app/api/depots/route.ts`
- `app/api/depots/[id]/route.ts`
- `app/api/depots/[id]/archive/route.ts`
- `app/api/vehicles/route.ts`
- `app/api/users/route.ts`
- `app/api/users/[id]/depot/route.ts`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/depots/page.tsx`
- `app/depots/depots-client.tsx`
- `app/vehicles/page.tsx`
- `app/vehicles/vehicles-client.tsx`
- `app/users/page.tsx`
- `app/users/user-depot-assignment-client.tsx`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `lib/api/response.ts`
- `lib/api/prisma-error.ts`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `lib/rbac.ts`
- `lib/serializers.ts`
- `lib/services/depots/create-depot.ts`
- `lib/services/depots/update-depot.ts`
- `lib/services/depots/archive-depot.ts`
- `lib/services/users/assign-user-depot.ts`
- `lib/services/planning/assign-shift.ts`
- `lib/validators/depot.ts`
- `lib/validators/user.ts`
- `lib/validators/vehicle.ts`

### Fichiers explicitement recherchés mais absents

- `app/api/vehicles/[id]/depot/route.ts`
- `lib/services/vehicles/assign-vehicle-depot.ts`
- `prisma/migrations/20260316193000_base07_attach_vehicle_to_depot/migration.sql`
- `prisma/migrations/20260316213000_base09_attach_shift_to_depot/migration.sql`

## Faits saillants retenus

1. `Depot` est réellement modélisé avec relation `Company -> Depot`.
2. `POST /api/depots` existe réellement et respecte le tenant + RBAC `ADMIN/GERANT`.
3. `PATCH /api/depots/[id]` existe, mais accepte encore `isActive`, ce qui déborde le bornage documentaire de `BASE-04`.
4. L’archivage logique `/api/depots/[id]/archive` existe et bascule `isActive` à `false`.
5. L’UI `/depots` existe réellement et consomme les routes de création / édition / archivage.
6. `User -> Depot` est réellement présent côté schéma, migration, API et UI.
7. `Vehicle -> Depot` n’est pas validable comme livré :
   - la route dédiée attendue n’existe pas réellement ;
   - le service dédié annoncé n’existe pas ;
   - la migration dédiée annoncée n’existe pas ;
   - l’UI appelle pourtant cette route absente.
8. `Shift -> Depot` existe partiellement côté schéma / API / UI, mais la migration dédiée annoncée n’existe pas réellement.
9. `DraftShift` n’a pas été étendu ; la route planning refuse explicitement `depotId` sur draft.
10. `BASE-10` reste bien un audit borné sans patch code, avec `NO_PATCH.md` présent.
