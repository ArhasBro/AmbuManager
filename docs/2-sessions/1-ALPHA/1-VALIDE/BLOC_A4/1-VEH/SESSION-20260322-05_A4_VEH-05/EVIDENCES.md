# EVIDENCES

Éléments factuels retenus pour la clôture documentaire finale de `VEH-05`.

---

## Sources utilisées

### Cadrage produit et plan
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:445-452`
  - `07.2 Création d’un véhicule` exige explicitement `immatriculation`, `type`, `statut`.
  - utilisateur cible : `admin`.
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md:437-439`
  - `VEH-05` correspond bien à la correction de la création véhicule si nécessaire.

### Résiduel prouvé par VEH-04
- `docs/2-sessions/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-04_A4_VEH-04/RESULTATS.md:14-22`
  - `statut` non saisi à la création et forcé à `ACTIVE` côté serveur ;
  - surface UI de création non alignée avec la restriction produit/API à `admin` ;
  - correction attendue en `VEH-05`.

### Socle de statut déjà présent dans le modèle
- `prisma/schema.prisma:32-35`
  - l’enum `VehicleStatus` existe déjà avec `ACTIVE`, `MAINTENANCE`, `OUT_OF_SERVICE`.
  - aucune migration Prisma n’était nécessaire pour corriger `VEH-05`.

### Contrôle d’accès module conservé comme borne de lecture
- `lib/permission-catalog.ts:57-60`
  - le module véhicules reste exposé via la permission `VEHICLES_MANAGE`.
- `lib/permissions.ts:36-45`
  - accès module = accès natif `ADMIN` / `GERANT` ou permission dédiée.
- `lib/permissions.ts:89-90`
  - `canManageVehicles(...)` continue de piloter l’accès au module.

### Validation et API de création corrigées
- `lib/validators/vehicle.ts:1-12`
  - le schéma `createVehicleBodySchema` exige désormais `status` en plus de `immatriculation` et `type`.
- `app/api/vehicles/route.ts:73-97`
  - le `POST /api/vehicles` reste réservé à `ADMIN` ;
  - le `status` validé est désormais extrait du body puis persisté tel quel.
- `app/api/vehicles/route.ts:100-110`
  - la traçabilité conserve `changedFields: ["immatriculation", "type", "status"]`.

### UI de création corrigée
- `app/vehicles/add-vehicle-form.tsx:5-42`
  - ajout du type local `VehicleStatus`, d’un état `status`, et inclusion du champ dans le payload.
- `app/vehicles/add-vehicle-form.tsx:68-80`
  - ajout d’un sélecteur réel de `status` dans le formulaire.
- `app/vehicles/vehicles-client.tsx:43-50`
  - ajout du flag `canCreateVehicle`.
- `app/vehicles/vehicles-client.tsx:64-77`
  - le payload envoyé au `POST /api/vehicles` contient désormais `status`.
- `app/vehicles/vehicles-client.tsx:162-166`
  - le formulaire de création n’est rendu que si `canCreateVehicle` vaut vrai ; sinon un message indique que la création est réservée à `ADMIN`.
- `app/vehicles/page.tsx:60-64`
  - la page transmet `canCreateVehicle={user.role === "ADMIN"}`.

### Flux de rafraîchissement conservé
- `app/vehicles/vehicles-client.tsx:79-91`
  - après création réussie, le véhicule créé est toujours ajouté à l’état local et à la sélection de base, donc la mise à jour immédiate de la liste est conservée.

### Validations réellement exécutées
Commandes lancées / constatées :

```bash
git apply --check ".\docs\3-patches\1-ALPHA\BLOC_A4\1-VEH\SESSION-20260322-05_A4_VEH-05\PATCH__SESSION-20260322-05_A4_VEH-05.diff"
git apply ".\docs\3-patches\1-ALPHA\BLOC_A4\1-VEH\SESSION-20260322-05_A4_VEH-05\PATCH__SESSION-20260322-05_A4_VEH-05.diff"
npm run lint
npm run build
```

Résultats réels consignés :
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK
