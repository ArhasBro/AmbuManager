# EVIDENCES — SESSION-20260322-11_A4_VEH-11

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
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:220-227`
  - `04.5 Rattachement d’un véhicule à une base` attend qu’un véhicule puisse être rattaché à une base.
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md:438-445`
  - `VEH-11` est bien la session de `COMPLÉTION` dédiée au rattachement véhicule à une base.

## Preuves code retenues
- `app/api/vehicles/[id]/depot/route.ts:27-63`
  - endpoint dédié `PATCH /api/vehicles/[id]/depot` réellement présent ;
  - session, `companyId` et permission `canManageVehicles(...)` contrôlés avant exécution ;
  - payload validé par `assignVehicleDepotBodySchema` ;
  - appel réel au service `assignVehicleDepot(...)` ;
  - réponse HTTP de succès retournant le véhicule mis à jour.
- `lib/validators/vehicle.ts:33-37`
  - le payload attendu est strictement `{ depotId: uuid | null }`, ce qui couvre à la fois l’affectation et le retrait de base.
- `lib/services/vehicles/assign-vehicle-depot.ts:53-77`
  - recherche du véhicule bornée à `id + companyId` ;
  - absence véhicule → `VEHICLE_NOT_FOUND`.
- `lib/services/vehicles/assign-vehicle-depot.ts:81-97`
  - le dépôt cible doit appartenir à la même société et être `isActive: true` ;
  - dépôt invalide/inactif/hors société → `DEPOT_NOT_FOUND`.
- `lib/services/vehicles/assign-vehicle-depot.ts:99-150`
  - mise à jour réelle de `depotId`, avec retour du véhicule enrichi (`depot`) et traçabilité support si applicable.
- `app/vehicles/page.tsx:17-18`
  - la page `/vehicles` refuse l’accès sans permission de gestion véhicules ou sans `companyId`.
- `app/vehicles/page.tsx:22-52`
  - la page charge les véhicules actifs de la société courante et les dépôts actifs de cette même société.
- `app/vehicles/vehicles-client.tsx:174-203`
  - l’action UI `handleSaveDepot(...)` appelle réellement `PATCH /api/vehicles/[id]/depot` avec `{ depotId }` puis met à jour l’état local depuis la réponse API.
- `app/vehicles/vehicles-client.tsx:293-343`
  - l’UI expose `Base actuelle`, un sélecteur contenant `Aucune base`, puis le bouton `Enregistrer base` ;
  - l’enregistrement n’est activable que si un changement réel est détecté.
- `lib/permissions.ts:6-8` et `lib/permissions.ts:89-90`
  - accès natif `ADMIN`/`GERANT` et borne permissionnelle `VEHICLES_MANAGE`.
- `lib/permission-catalog.ts:57-60`
  - la permission catalogue réelle pour ce module est `VEHICLES_MANAGE`.
- `prisma/schema.prisma`
  - la relation `Vehicle.depotId -> Depot.id` existe réellement dans le modèle de données du dépôt.

## Résultat probant de la validation
Le dépôt contient déjà un flux standard complet et cohérent de rattachement véhicule → base. Aucun patch applicatif minimal supplémentaire n’est justifié dans le périmètre strict de VEH-11.

## Preuves terminales retenues
- `npm run lint` : échec d’environnement (`eslint: not found`) ;
- `npm run build` : échec d’environnement (`next: not found`) ;
- `git apply --check` : non applicable (`NO_PATCH`) ;
- `git apply` : non applicable (`NO_PATCH`).
