# EVIDENCES

Éléments factuels retenus pour la clôture documentaire finale de `VEH-08`.

---

## Sources utilisées

### Cadrage produit et plan
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:463-470`
  - `07.4 Désactivation / archivage d’un véhicule` exige de désactiver un véhicule sans perdre son historique.
  - utilisateur cible : `gérant, admin`.
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md:439-442`
  - `VEH-08` correspond bien à l’API désactivation / archivage véhicule.
  - `VEH-09` reste séparée pour l’UI d’archivage.

### Contexte amont prouvé
- `docs/2-sessions/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-06_A4_VEH-06/RESULTATS.md:21-27`
  - l’archivage véhicule n’était volontairement pas traité dans `VEH-06`.
- `docs/2-sessions/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-07_A4_VEH-07/RESULTATS.md:25-31`
  - l’archivage / désactivation véhicule restait explicitement hors du périmètre de `VEH-07`.

### Socle réel déjà présent avant correction
- `prisma/schema.prisma:304-330`
  - le modèle `Vehicle` contient déjà `isActive Boolean @default(true)`.
  - aucun changement Prisma n’est requis pour l’archivage logique minimal.
- `lib/permission-catalog.ts:57-60`
  - le module véhicules est exposé via `VEHICLES_MANAGE`.
- `lib/permissions.ts:36-45`
  - l’accès passe par le socle `hasPermissionAccess(...)`.
- `lib/permissions.ts:89-90`
  - `canManageVehicles(...)` est l’entrée de contrôle existante du module.
- `lib/services/audit/support-action-trace.ts:18-30`
  - le traçage support existe déjà et ne s’exécute que pour `PlatformRole.SUPPORT`.

### Endpoint réel ajouté
- `app/api/vehicles/[id]/archive/route.ts:11-15`
  - validation stricte d’un paramètre `id` UUID.
- `app/api/vehicles/[id]/archive/route.ts:27-39`
  - contrôle session + permission + validation params.
- `app/api/vehicles/[id]/archive/route.ts:41-56`
  - appel du service dédié, retour `NOT_FOUND` si véhicule absent dans la société courante, réponse sérialisée sinon.

### Service réel ajouté
- `lib/services/vehicles/archive-vehicle.ts:29-45`
  - sélection dédiée incluant `isActive` et les dates.
- `lib/services/vehicles/archive-vehicle.ts:47-57`
  - recherche du véhicule dans la société courante + idempotence si déjà archivé.
- `lib/services/vehicles/archive-vehicle.ts:59-64`
  - archivage logique via `isActive: false`.
- `lib/services/vehicles/archive-vehicle.ts:66-88`
  - traçabilité support alignée sur le pattern existant avec `changedFields`, `previous`, `next`, `details`.

### Alignement minimal du flux standard après rafraîchissement
- `app/api/vehicles/route.ts:63-68`
  - le listing API standard filtre désormais `isActive: true`.
- `app/vehicles/page.tsx:22-42`
  - la page `/vehicles` n’hydrate plus les véhicules archivés après rafraîchissement.

### Validations réelles finales retenues

Commandes retenues pour la documentation finale :

```bash
git apply --check ".\\docs\\3-patches\\1-ALPHA\\BLOC_A4\\1-VEH\\SESSION-20260322-08_A4_VEH-08\\PATCH__SESSION-20260322-08_A4_VEH-08.diff"
git apply ".\\docs\\3-patches\\1-ALPHA\\BLOC_A4\\1-VEH\\SESSION-20260322-08_A4_VEH-08\\PATCH__SESSION-20260322-08_A4_VEH-08.diff"
npm run lint
npm run build
```

Résultats réels finaux à reporter :
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK
