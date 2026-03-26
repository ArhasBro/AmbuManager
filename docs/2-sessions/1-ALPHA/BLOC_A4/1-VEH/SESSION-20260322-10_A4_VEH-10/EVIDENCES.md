# EVIDENCES — SESSION-20260322-10_A4_VEH-10

## Sources de référence relues pour la session
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/4-templates/*`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`

## Preuves documentaires retenues
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
  - `07.4` : l’archivage véhicule vise à désactiver sans perdre l’historique ;
  - `07.5` : la suppression définitive ne doit exister que si le véhicule n’a jamais été utilisé ;
  - arbitrage explicite : le dépôt supprime physiquement aujourd’hui, mais la cible veut un encadrement strict.
- `docs/1-master/PLAN_DEVELOPPEMENT.md`
  - `VEH-10` est bien une session `VALIDATION` ciblée sur la non-suppression physique non souhaitée.

## Preuves code retenues
- `app/api/vehicles/route.ts`
  - `GET` filtre `where: { companyId, isActive: true }` ;
  - `DELETE` existe réellement ;
  - la suppression passe par `tx.vehicle.delete({ where: { id: existingVehicle.id } })` ;
  - aucune vérification d’usage antérieur du véhicule n’est visible avant suppression.
- `app/vehicles/vehicles-client.tsx`
  - `handleDeleteVehicle()` confirme « Supprimer ce véhicule ? » puis appelle `fetch('/api/vehicles?id=...', { method: 'DELETE' })` ;
  - l’UI affiche un bouton `Archiver` et un bouton `Supprimer` dans la même liste.
- `app/vehicles/page.tsx`
  - la page `/vehicles` ne charge que les véhicules `isActive: true` et alimente `VehiclesClient`.
- `app/api/vehicles/[id]/archive/route.ts`
  - l’archivage logique est bien exposé via `POST`.
- `lib/services/vehicles/archive-vehicle.ts`
  - l’archivage passe par `tx.vehicle.update({ data: { isActive: false } })` ;
  - aucune suppression physique dans ce service.
- `prisma/schema.prisma`
  - `Vehicle.isActive` existe réellement ;
  - `DraftShift.vehicle` et `Shift.vehicle` référencent `Vehicle` avec `onDelete: SetNull`.

## Résultat probant de la validation
Le module `vehicles` introduit encore une suppression physique réelle dans le flux standard société, malgré l’existence parallèle d’un archivage logique dédié. Aucun garde-fou explicite « véhicule jamais utilisé » n’a été trouvé dans le périmètre contrôlé.

## Preuves terminales retenues
- `npm run lint` : échec d’environnement (`eslint: not found`) ;
- `npm run build` : échec d’environnement (`next: not found`) ;
- `git apply --check` : non applicable (`NO_PATCH`) ;
- `git apply` : non applicable (`NO_PATCH`).
