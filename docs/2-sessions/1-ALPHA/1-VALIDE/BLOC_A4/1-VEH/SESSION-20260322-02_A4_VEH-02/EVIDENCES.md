# EVIDENCES

Éléments factuels utilisés pendant la session.

---

## Sources utilisées

### Cadrage / plan
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:436-443`
  - 07.1 Registre de flotte : `lister les véhicules de la société`
  - cible : `gérant, admin, régulateur selon permissions`
  - dépendance : `multi-tenant`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md:433-436`
  - `VEH-02` est bien une session de `VALIDATION` du listing existant
  - `VEH-03` est réservé à la correction / stabilisation si nécessaire

### API listing réelle
- `app/api/vehicles/route.ts:13-15`
  - query `limit` existante, bornée entre 1 et 500, valeur par défaut 200
- `app/api/vehicles/route.ts:17-32`
  - champs réellement exposés par l'API : `id`, `immatriculation`, `type`, `status`, `depotId`, `createdAt`, `updatedAt`, `depot{id,name,isActive}`
- `app/api/vehicles/route.ts:44-70`
  - `GET /api/vehicles` existe réellement
  - refus si absence de `companyId` ou `userId`
  - contrôle d'accès via `canManageVehicles(...)`
  - filtre multi-tenant via `where: { companyId }`
  - tri API : `immatriculation asc`

### UI listing réelle
- `app/vehicles/page.tsx:9-18`
  - page protégée par session, permission `canManageVehicles`, et présence d'un `companyId`
- `app/vehicles/page.tsx:21-40`
  - la liste initiale est chargée directement via `prisma.vehicle.findMany(...)`
  - filtre multi-tenant via `where: { companyId }`
  - tri page : `createdAt desc`
  - champs initiaux : `id`, `immatriculation`, `type`, `status`, `depotId`, `createdAt`, `depot{id,name,isActive}`
- `app/vehicles/vehicles-client.tsx:149-225`
  - rendu réel de la liste côté UI
  - état vide visible : `Aucun véhicule pour le moment.`
  - affichage visible par item : `immatriculation`, `type`, `status`, `base actuelle`
  - aucune interface de chargement initial dédiée visible dans le périmètre contrôlé
- `app/vehicles/vehicles-client.tsx:49-52` et `153-154`
  - état d'erreur visible uniquement pour les actions client (création / base / suppression)

### Permissions
- `lib/permissions.ts:6-8`
  - accès natif pour `ADMIN` et `GERANT`
- `lib/permissions.ts:36-45` et `89-90`
  - `canManageVehicles` repose sur `VEHICLES_MANAGE`
  - les comptes `platformRole = SUPPORT` sont explicitement refusés par `hasPermissionAccess`
- `lib/permission-catalog.ts:57-60`
  - permission catalogue réelle : `VEHICLES_MANAGE`

### Modèle véhicule
- `prisma/schema.prisma:304-330`
  - le modèle `Vehicle` contient bien `immatriculation`, `type`, `status`, `companyId`, `depotId`, `isActive`, `createdAt`, `updatedAt`
  - la contrainte multi-tenant est cohérente avec `@@unique([companyId, immatriculation])`

### Validations techniques réellement lancées
- `npm run lint` → échec : `sh: 1: eslint: not found`
- `npm run build` → échec : `sh: 1: next: not found`
- cause constatée : `node_modules` absent dans le ZIP contrôlé
