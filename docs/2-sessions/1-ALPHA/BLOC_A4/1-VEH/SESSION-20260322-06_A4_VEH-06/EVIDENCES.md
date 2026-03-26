# EVIDENCES

Éléments factuels retenus pour la clôture documentaire finale de `VEH-06`.

---

## Sources utilisées

### Cadrage produit et plan
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:454-461`
  - `07.3 Édition d’un véhicule` exige la modification des données d’un véhicule.
  - utilisateur cible : `gérant, admin`.
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md:439-440`
  - `VEH-06` correspond bien à l’API modification véhicule.
  - `VEH-07` reste séparée pour l’UI modification véhicule.

### Contexte amont prouvé
- `docs/2-sessions/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-05_A4_VEH-05/RESULTATS.md:20-27`
  - l’édition véhicule n’était volontairement pas traitée dans `VEH-05`.
- `app/api/vehicles/route.ts:73-133`
  - la création véhicule existe déjà réellement.
- `app/api/vehicles/[id]/depot/route.ts:27-66`
  - un flux dédié de rattachement base existe déjà réellement sur `PATCH /api/vehicles/[id]/depot`.

### Contrôle d’accès et borne permission
- `lib/permission-catalog.ts:57-60`
  - le module véhicules est exposé via `VEHICLES_MANAGE`.
- `lib/permissions.ts:6-8`
  - accès natif véhicules : `ADMIN` ou `GERANT`.
- `lib/permissions.ts:89-90`
  - `canManageVehicles(...)` est l’entrée de contrôle existante du module.

### Socle métier déjà présent côté modèle
- `prisma/schema.prisma:304-327`
  - le modèle `Vehicle` contient déjà `immatriculation`, `type`, `status`, `companyId`, `depotId`.
  - l’unicité `@@unique([companyId, immatriculation])` justifie le traitement de conflit sur édition.

### Validation dédiée ajoutée pour l’édition
- `lib/validators/vehicle.ts:14-31`
  - ajout de `updateVehicleBodySchema`.
  - édition limitée à `immatriculation`, `type`, `status`.
  - corps vide refusé par `refine(...)`.
  - `depotId` n’entre pas dans ce schéma.

### Endpoint réel ajouté
- `app/api/vehicles/[id]/route.ts:77-178`
  - ajout de `PATCH /api/vehicles/[id]`.
- `app/api/vehicles/[id]/route.ts:84-99`
  - contrôle session + permission + validation params/body.
- `app/api/vehicles/[id]/route.ts:101-109`
  - vérification de présence du véhicule dans la société courante ; retour `NOT_FOUND` sinon.
- `app/api/vehicles/[id]/route.ts:111-120`
  - mise à jour Prisma limitée aux seuls champs métier autorisés.
- `app/api/vehicles/[id]/route.ts:122-163`
  - traçabilité support alignée sur le pattern existant avec `changedFields`, `previous`, `next`.
- `app/api/vehicles/[id]/route.ts:170-174`
  - conflit Prisma mappé en `409` avec message métier sur l’immatriculation déjà existante dans la société.

### Pattern audit support conservé
- `lib/services/audit/support-action-trace.ts:18-30`
  - le traçage support ne s’exécute que pour `PlatformRole.SUPPORT`.
- `app/api/vehicles/route.ts:100-121`
  - le pattern de création véhicule traçait déjà `module`, `changedFields`, `previous`, `next`.

### Validations réellement exécutées / constatées
Commandes réellement lancées / constatées dans cet environnement :

```bash
git apply --check /mnt/data/ambu-work/docs/3-patches/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-06_A4_VEH-06/PATCH__SESSION-20260322-06_A4_VEH-06.diff
git apply /mnt/data/ambu-work/docs/3-patches/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-06_A4_VEH-06/PATCH__SESSION-20260322-06_A4_VEH-06.diff
npm run lint
npm run build
```

Résultats réels à jour consignés pour la clôture documentaire finale :
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK
