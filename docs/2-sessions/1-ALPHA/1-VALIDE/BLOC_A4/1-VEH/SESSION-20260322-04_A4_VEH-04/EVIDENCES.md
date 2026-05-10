# EVIDENCES — SESSION-20260322-04_A4_VEH-04

## Cadrage produit
`docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `07.2 Création d’un véhicule`
- description : créer un véhicule avec `immatriculation`, `type`, `statut`
- utilisateur cible : `admin`

## Modèle de données
`prisma/schema.prisma`
- `model Vehicle`
  - `immatriculation String`
  - `type VehicleType`
  - `status VehicleStatus @default(ACTIVE)`
  - `@@unique([companyId, immatriculation])`
- enums présents :
  - `VehicleType = AMBULANCE | VSL | TAXI`
  - `VehicleStatus = ACTIVE | MAINTENANCE | OUT_OF_SERVICE`

## API création
`app/api/vehicles/route.ts`
- `export async function POST(req: Request)` existe.
- garde d’accès :
  - `if (!actorUserId || !companyId) return unauthorized();`
  - `if (session.user.role !== "ADMIN") return forbidden();`
- validation :
  - `createVehicleBodySchema.safeParse(jsonBody)`
- écriture réelle :
  - `tx.vehicle.create({ data: { companyId, immatriculation, type, status: "ACTIVE" } ... })`
- gestion doublon :
  - `return conflict(..., { message: "Véhicule déjà existant" })`

## Validation d’entrée
`lib/validators/vehicle.ts`
- `immatriculation` : string trim, min 1, transform uppercase
- `type` : `z.nativeEnum(VehicleType)`
- aucun champ `status` accepté dans le schéma de création

## UI création
`app/vehicles/add-vehicle-form.tsx`
- formulaire réel avec :
  - input `immatriculation`
  - select `type` (`AMBULANCE`, `VSL`, `TAXI`)
- au submit :
  - trim + uppercase de l’immatriculation
  - appel `onSubmit(payload)`
- aucun champ `status` dans le formulaire

## Chaîne UI -> API -> liste
`app/vehicles/vehicles-client.tsx`
- `handleAddVehicle(...)` fait :
  - `fetch("/api/vehicles", { method: "POST", ... })`
  - lecture JSON
  - en succès : `setVehicles((prev) => [...prev, data.data])`
- la liste affichée repose sur `vehicles` puis `displayVehicles`
- la création rafraîchit donc réellement la liste côté client sans rechargement complet

## Contrôle d’accès UI page
`app/vehicles/page.tsx`
- accès page : `canManageVehicles(user.id, user.role, user.platformRole)`

`lib/permissions.ts`
- `hasNativeAccess` retourne `true` pour `ADMIN` ou `GERANT`
- `canManageVehicles(...)` délègue à `hasPermissionAccess(..., ["VEHICLES_MANAGE"])`

## Écart de cohérence accès
- la page et donc le formulaire de création peuvent être visibles à `GERANT` ou à un utilisateur avec `VEHICLES_MANAGE`
- mais `POST /api/vehicles` refuse tout profil non `ADMIN`
- l’accès de création n’est donc pas aligné de bout en bout

## Validations techniques réellement lancées
Depuis le ZIP fourni :
- `npm run lint` → non exécutable dans l’environnement du ZIP : `sh: 1: eslint: not found`
- `npm run build` → non exécutable dans l’environnement du ZIP : `sh: 1: next: not found`

Conclusion : validations demandées tentées, mais non exécutables dans l’environnement du ZIP faute de dépendances installées. Cela ne constitue pas un échec réel du code applicatif.
