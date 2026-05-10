# EVIDENCES

Éléments factuels retenus pour la clôture documentaire finale de `VEH-07`.

---

## Sources utilisées

### Cadrage produit et plan
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:454-461`
  - `07.3 Édition d’un véhicule` exige la modification des données d’un véhicule.
  - utilisateur cible : `gérant, admin`.
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md:439-441`
  - `VEH-06` correspond à l’API modification véhicule.
  - `VEH-07` correspond bien à l’UI modification véhicule.

### Contexte amont prouvé
- `docs/2-sessions/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-06_A4_VEH-06/RESULTATS.md:6-15`
  - le socle API d’édition a été livré en session séparée.
- `app/api/vehicles/[id]/route.ts:77-178`
  - `PATCH /api/vehicles/[id]` existe réellement dans le dépôt.
- `app/api/vehicles/[id]/route.ts:117-120`
  - l’édition générale backend est limitée à `immatriculation`, `type`, `status`.
- `app/api/vehicles/[id]/depot/route.ts:27-66`
  - le rattachement base reste sur un flux dédié séparé.

### Contrôle d’accès conservé
- `lib/permission-catalog.ts:46-49`
  - le module véhicules est exposé via `VEHICLES_MANAGE`.
- `lib/permissions.ts:49-51`
  - `canManageVehicles(...)` est le contrôle d’accès existant du module.
- `app/vehicles/page.tsx:15-18`
  - la page `/vehicles` est déjà bornée par `canManageVehicles(...)` et `companyId`.

### UI réelle ajoutée dans cette session
- `app/vehicles/vehicles-client.tsx:27-31`
  - ajout des options UI locales pour les types et statuts éditables.
- `app/vehicles/vehicles-client.tsx:70-79`
  - ajout des états UI nécessaires à l’édition (`successMessage`, `editingVehicleId`, champs du formulaire, chargement).
- `app/vehicles/vehicles-client.tsx:96-101`
  - ouverture de l’édition avec préremplissage depuis le véhicule sélectionné.
- `app/vehicles/vehicles-client.tsx:138-170`
  - appel réel à `PATCH /api/vehicles/[id]` avec `immatriculation`, `type`, `status`.
- `app/vehicles/vehicles-client.tsx:159-165`
  - mise à jour locale de la liste après succès.
- `app/vehicles/vehicles-client.tsx:248-249`
  - affichage des messages d’erreur / succès.
- `app/vehicles/vehicles-client.tsx:305-317`
  - bouton `Modifier` ajouté dans la liste existante.
- `app/vehicles/vehicles-client.tsx:334-402`
  - formulaire inline d’édition réellement ajouté.
- `app/vehicles/vehicles-client.tsx:173-201`
  - le flux base reste distinct via `PATCH /api/vehicles/[id]/depot`.

### Absence volontaire d’élargissement de périmètre
- `app/vehicles/page.tsx:1-51`
  - aucun changement nécessaire au câblage serveur de la page.
- `app/vehicles/add-vehicle-form.tsx:1-82`
  - création véhicule laissée inchangée.
- `app/api/vehicles/[id]/route.ts:1-178`
  - backend VEH-06 uniquement relu, non modifié.
- `prisma/schema.prisma`
  - aucune modification.

### Validations réellement exécutées / constatées
Commandes réellement lancées / constatées dans cet environnement :

```bash
git apply --check /tmp/veh07_applytest/AmbuManager-main/docs/3-patches/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-07_A4_VEH-07/PATCH__SESSION-20260322-07_A4_VEH-07.diff
git apply /tmp/veh07_applytest/AmbuManager-main/docs/3-patches/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-07_A4_VEH-07/PATCH__SESSION-20260322-07_A4_VEH-07.diff
npm run lint
npm run build
```

Résultats réels à jour consignés pour la clôture documentaire finale :
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK
