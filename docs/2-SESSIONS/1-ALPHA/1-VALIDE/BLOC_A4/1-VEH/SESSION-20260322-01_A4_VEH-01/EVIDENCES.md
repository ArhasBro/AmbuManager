# EVIDENCES

Éléments factuels utilisés pendant la session.

---

## Sources utilisées

### 1. Cadrage / plan
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/PROTOCOLE_SESSION.md`

### 2. Fichiers réellement présents dans le module audité
```txt
app/api/vehicles/[id]/depot/route.ts
app/api/vehicles/route.ts
app/vehicles/add-vehicle-form.tsx
app/vehicles/page.tsx
app/vehicles/vehicles-client.tsx
lib/services/vehicles/assign-vehicle-depot.ts
lib/validators/vehicle.ts
```

### 3. Preuves code — schéma véhicule
`prisma/schema.prisma`
- `VehicleType` et `VehicleStatus` existent : lignes 26-36
- modèle `Vehicle` : lignes 304-329
- `depotId` nullable + relation `Depot` : lignes 313-314
- `isActive Boolean @default(true)` : ligne 316
- unicité `[companyId, immatriculation]` : ligne 328

### 4. Preuves code — listing / création / suppression
`app/api/vehicles/route.ts`
- route `GET` listant les véhicules par `companyId` : lignes 44-70
- route `POST` créant un véhicule avec `status: "ACTIVE"` : lignes 73-133
- route `DELETE` supprimant physiquement via `tx.vehicle.delete(...)` : lignes 136-223

### 5. Preuves code — rattachement à une base
`app/api/vehicles/[id]/depot/route.ts`
- route `PATCH` de rattachement véhicule ↔ dépôt : lignes 27-64

`lib/services/vehicles/assign-vehicle-depot.ts`
- contrôle que le véhicule appartient à la société : lignes 52-72 et 75-77
- contrôle que le dépôt ciblé est actif et dans la société : lignes 81-97
- mise à jour de `depotId` sur `vehicle.update` : lignes 99-104

### 6. Preuves code — UI véhicules
`app/vehicles/page.tsx`
- page protégée par `canManageVehicles` : lignes 9-17
- chargement véhicules + dépôts actifs : lignes 21-50
- libellé produit : « Gestion minimale des véhicules et rattachement optionnel à une base active » : lignes 52-64

`app/vehicles/vehicles-client.tsx`
- appel `POST /api/vehicles` : lignes 56-86
- appel `PATCH /api/vehicles/:id/depot` : lignes 88-116
- appel `DELETE /api/vehicles?id=...` : lignes 118-147
- bouton UI `Supprimer` : lignes 207-218
- aucune UI d’édition complète constatée sur immatriculation / type / status : pas d’autre action visible dans le composant

### 7. Preuves code — validateurs disponibles
`lib/validators/vehicle.ts`
- schéma création : lignes 4-11
- schéma rattachement dépôt : lignes 13-17
- schéma suppression : lignes 19-21
- aucun schéma d’édition complète / archivage logique visible dans ce fichier

### 8. Bornage simple planning
`app/api/planning/shifts/[id]/assign/route.ts`
- le body accepte `vehicleId` : lignes 11-20
- contrôle simple d’appartenance société pour `vehicleId` : lignes 128-153
- preuve qu’un usage planning existe déjà, sans audit détaillé dans cette session

### 9. Validations terminales réellement exécutées
Commandes lancées :
```bash
npm run lint
npm run build
```

Résultats constatés :
```txt
> ambulance-manager@0.1.0 lint
> eslint .
sh: 1: eslint: not found
```

```txt
> ambulance-manager@0.1.0 build
> next build
sh: 1: next: not found
```

Interprétation factuelle : `package.json` déclare bien `eslint` et `next`, mais le ZIP audité ne fournit pas un environnement installé/exécutable (`node_modules` absent ou dépendances non installées).
