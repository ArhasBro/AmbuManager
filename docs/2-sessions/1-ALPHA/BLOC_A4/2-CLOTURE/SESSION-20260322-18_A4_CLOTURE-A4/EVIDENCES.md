# EVIDENCES — SESSION-20260322-18_A4_CLOTURE-A4

## Référentiel maître relu
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`
- `docs/4-templates/TEMPLATE_FIN_SESSION.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`

## Sessions et patchs A4 effectivement contrôlés
- sessions `VEH-01` à `VEH-17` sous `docs/2-sessions/1-ALPHA/BLOC_A4/1-VEH/`
- patchs réels `VEH-01` à `VEH-17` sous `docs/3-patches/1-ALPHA/BLOC_A4/1-VEH/`
- dossier de clôture `docs/2-sessions/1-ALPHA/BLOC_A4/2-CLOTURE/SESSION-20260322-18_A4_CLOTURE-A4/`
- dossier patch de clôture `docs/3-patches/1-ALPHA/BLOC_A4/2-CLOTURE/SESSION-20260322-18_A4_CLOTURE-A4/`

## Preuves de couverture du bloc
### Sessions / patchs réels présents
- `VEH-01` : `NO_PATCH.md`
- `VEH-02` : `NO_PATCH.md`
- `VEH-03` : `PATCH__SESSION-20260322-03_A4_VEH-03.diff` + `README_PATCH.md`
- `VEH-04` : `NO_PATCH.md`
- `VEH-05` : `PATCH__SESSION-20260322-05_A4_VEH-05.diff` + `README_PATCH.md`
- `VEH-06` : `PATCH__SESSION-20260322-06_A4_VEH-06.diff` + `README_PATCH.md`
- `VEH-07` : `PATCH__SESSION-20260322-07_A4_VEH-07.diff` + `README_PATCH.md`
- `VEH-08` : `PATCH__SESSION-20260322-08_A4_VEH-08.diff` + `README_PATCH.md`
- `VEH-09` : `PATCH__SESSION-20260322-09_A4_VEH-09.diff` + `README_PATCH.md`
- `VEH-10` : `NO_PATCH.md`
- `VEH-11` : `NO_PATCH.md`
- `VEH-12` : `NO_PATCH.md`
- `VEH-13` : `PATCH__SESSION-20260322-13_A4_VEH-13.diff` + `README_PATCH.md`
- `VEH-14` : `PATCH__SESSION-20260322-14_A4_VEH-14.diff` + `README_PATCH.md`
- `VEH-15` : `PATCH__SESSION-20260322-15_A4_VEH-15.diff` + `README_PATCH.md`
- `VEH-16` : `PATCH__SESSION-20260322-16_A4_VEH-16.diff` + `README_PATCH.md`
- `VEH-17` : `NO_PATCH.md`

### Verdict documentaire consolidé déjà établi avant clôture
- `VEH-03`, `VEH-05`, `VEH-06`, `VEH-07`, `VEH-13`, `VEH-14`, `VEH-15`, `VEH-16` : correctifs/completions validés sur leur périmètre ;
- `VEH-11` : `NO_PATCH — CONFORME SUR LE PÉRIMÈTRE CONTRÔLÉ` ;
- `VEH-12` : `NO_PATCH — PARTIELLEMENT CONFORME SUR LE PÉRIMÈTRE CONTRÔLÉ` ;
- `VEH-17` : `NO_PATCH — PARTIELLEMENT CONFORME` avec deux résiduels officiels retenus : `07.5` et `07.7`.

## Preuves de code des résiduels bloquants
### 1. Suppression physique encore exposée
- `app/api/vehicles/route.ts:167-262` → route `DELETE` réelle avec `tx.vehicle.delete(...)`
- `app/vehicles/vehicles-client.tsx:349-381` → handler UI `handleDeleteVehicle(...)`
- `app/vehicles/vehicles-client.tsx:534-548` → bouton `Supprimer` visible dans le flux standard

### 2. Statut véhicule non exploité comme garde-fou / signal dans le planning
- `prisma/schema.prisma:32-36` → enum `VehicleStatus` réelle (`ACTIVE`, `MAINTENANCE`, `OUT_OF_SERVICE`)
- `app/api/planning/shifts/[id]/assign/route.ts:151-153` → contrôle limité à `assertVehicleInCompany(vehicleId)`
- `app/api/planning/shifts/[id]/assign/route.ts:163-172` et `240-251` → transmission du `vehicleId` aux services sans validation statutaire supplémentaire
- `lib/services/planning/assign-draftshift.ts:172-205` → contrôle sur conflits véhicule, pas sur statut indisponible
- `lib/services/planning/assign-shift.ts:171-204` → même logique côté shift publié
- `app/planning/planning-client.tsx:551-566` → mapping des véhicules de liste sans conserver le `status`
- `app/planning/planning-client.tsx:1698-1714` et `1848-1864` → sélecteurs véhicule sans signal métier sur indisponibilité

## Revalidation de la couverture fonctionnelle `07.1` à `07.10`
- `07.1 Registre de flotte` : **présent**
- `07.2 Création d’un véhicule` : **présent**
- `07.3 Édition d’un véhicule` : **présent**
- `07.4 Désactivation / archivage` : **présent**
- `07.5 Suppression définitive d’un véhicule non utilisé` : **non conforme / partiel**
- `07.6 Affectation d’un véhicule au planning` : **présent**
- `07.7 Statut véhicule empêchant ou signalant l’usage indisponible` : **partiel**
- `07.8 Types de véhicule gérés` : **présent** (`AMBULANCE`, `VSL`, `TAXI`)
- `07.9 Conformité documentaire minimale` : **présent**
- `07.10 État visuel simple documentaire` : **présent**

## Validations terminales réellement constatées
- `git apply --check` / `git apply` : non applicables (`NO_PATCH`)
- `npm ci` : OK
- `npx prisma validate` : KO (`getaddrinfo EAI_AGAIN binaries.prisma.sh`)
- `npx prisma generate` : KO (`getaddrinfo EAI_AGAIN binaries.prisma.sh`)
- `npm run lint` : OK
- `npm run build` : KO sur `app/api/company/rules/route.ts:4` (`RuleMode` non exporté depuis `@prisma/client`)
