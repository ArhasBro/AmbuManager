# EVIDENCES — SESSION-20260322-17_A4_VEH-17

## Sources documentaires relues
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`
- `docs/4-templates/TEMPLATE_FIN_SESSION.md`
- `docs/4-templates/TEMPLATE_DOD_4_4.md`
- `docs/4-templates/TEMPLATE_RECAP_SESSION.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- sessions `VEH-01` à `VEH-16`
- patchs `VEH-01` à `VEH-16`

## Extraits factuels retenus

### Base produit et plan
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md` :
  - `07.1` à `07.4`, `07.6`, `07.7`, `07.9` et `07.10` sont cadrés comme besoins indispensables pré-version commerciale ;
  - `07.5 Suppression définitive d’un véhicule non utilisé` est cadré comme `IMPORTANT MAIS NON BLOQUANT` avec arbitrage explicite indiquant que le dépôt supprime physiquement aujourd’hui alors que la cible veut un encadrement strict ;
  - `07.8` exige les types initiaux `Ambulance`, `VSL`, `Taxi`.
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md` : le bloc A4 vise une flotte complète, une conformité documentaire minimale intégrée et une affectation planning vérifiée et stabilisée ; `VEH-17` y est bien positionnée comme session de validation du bloc.

### Historique documentaire A4
- `VEH-10` conclut explicitement à un résiduel réel de suppression physique non encadrée, livré en `NO_PATCH`.
- `VEH-12` conclut explicitement à une affectation véhicule → planning seulement partiellement conforme, avec absence de garde-fou statut véhicule et incohérence permission / erreurs UI.
- `VEH-13` documente un correctif réel sur l’accès à `/api/vehicles` depuis le planning et sur l’alignement des erreurs UI/API, tout en indiquant ne pas rouvrir `07.7 Statut véhicule`.
- `VEH-14` documente l’ajout des 4 champs minimaux de conformité documentaire au modèle véhicule et aux flux API.
- `VEH-15` documente l’édition UI minimale de ces données.
- `VEH-16` documente l’ajout du calcul et de l’affichage `conforme / bientôt expiré / expiré` dans l’UI véhicules.

### Code réel — flotte
- `prisma/schema.prisma` :
  - `enum VehicleType` contient `AMBULANCE`, `VSL`, `TAXI` ;
  - `enum VehicleStatus` contient `ACTIVE`, `MAINTENANCE`, `OUT_OF_SERVICE` ;
  - `model Vehicle` contient `insuranceExpiresAt`, `technicalInspectionExpiresAt`, `registrationDocumentPresent`, `sanitaryApprovalExpiresAt`, `isActive`, `depotId`.
- `app/vehicles/page.tsx` : la page liste les véhicules actifs de la société courante avec leurs champs documentaires et les dépôts actifs.
- `app/vehicles/vehicles-client.tsx` :
  - la création, l’édition, l’archivage, la suppression et l’enregistrement de la base sont réellement branchés sur des appels API ;
  - l’UI expose bien l’état documentaire simple `Conformité : conforme / bientôt expiré / expiré` ;
  - l’action `Supprimer` est toujours présente dans le flux standard.
- `app/api/vehicles/route.ts` :
  - `GET` accepte désormais `canManageVehicles(...)` ou `canEditPlanning(...)` ;
  - `POST` crée un véhicule ;
  - `DELETE` supprime physiquement un véhicule via `tx.vehicle.delete(...)` ;
  - aucun garde-fou visible « véhicule jamais utilisé » n’est appliqué avant suppression.
- `app/api/vehicles/[id]/route.ts` : route réelle de modification véhicule.
- `app/api/vehicles/[id]/archive/route.ts` + `lib/services/vehicles/archive-vehicle.ts` : archivage logique réel via `isActive = false`.
- `app/api/vehicles/[id]/depot/route.ts` + `lib/services/vehicles/assign-vehicle-depot.ts` : rattachement véhicule → dépôt actif de la société réellement présent.

### Code réel — planning
- `app/api/planning/shifts/[id]/assign/route.ts` : route réelle d’affectation qui traite `DraftShift` ou `Shift`, valide l’appartenance société des utilisateurs / véhicule / dépôt et appelle les services métier dédiés.
- `lib/services/planning/assign-draftshift.ts` et `lib/services/planning/assign-shift.ts` : contrôles réels des conflits utilisateurs, conflits véhicules, absences et repos minimum.
- `app/planning/planning-client.tsx` :
  - la page charge la liste véhicules via `/api/vehicles?limit=500` ;
  - l’UI permet bien d’affecter, modifier et retirer un véhicule ;
  - les options véhicule affichent `immatriculation` et `type`, sans signal de statut d’indisponibilité.
- `app/api/planning/shifts/[id]/assign/route.ts`, `lib/services/planning/assign-draftshift.ts` et `lib/services/planning/assign-shift.ts` : aucun contrôle réel n’empêche l’affectation d’un véhicule `MAINTENANCE` ou `OUT_OF_SERVICE` ; le véhicule est seulement vérifié comme appartenant à la société.

### Cohérence patchs / documentation
- Les patchs réels présents pour A4 sont cohérents avec les surfaces actuellement visibles dans le code :
  - `VEH-03` : listing UI ;
  - `VEH-05` : création ;
  - `VEH-06` / `VEH-07` : modification API/UI ;
  - `VEH-08` / `VEH-09` : archivage logique ;
  - `VEH-13` : remise à niveau planning ciblée ;
  - `VEH-14` à `VEH-16` : conformité documentaire minimale + état visuel.
- Incohérence documentaire mineure constatée : `VEH-08` contient un texte de clôture et un verdict libellés `VEH-09`, alors que le patch réel `VEH-08` est bien présent.

## Validations réellement exécutées / constatées
### Dans l’environnement courant du ZIP joint
- `git apply --check` : non applicable (`NO_PATCH`)
- `git apply` : non applicable (`NO_PATCH`)
- `npm run lint` → échec d’environnement : `sh: 1: eslint: not found`
- `npm run build` → échec d’environnement : `sh: 1: next: not found`

### Validations historiques constatées dans la documentation précédente
- `VEH-13` : `git apply --check` OK, `git apply` OK, `npm run lint` OK, `npm run build` OK.
- `VEH-14` : `npx prisma validate` OK, `npx prisma generate` OK, `npm run lint` OK, `npm run build` OK.
- `VEH-15` : `git apply --check` OK, `git apply` OK, `npm run lint` OK, `npm run build` OK.
- `VEH-16` : `git apply --check` OK, `git apply` OK, `npm run lint` OK, `npm run build` OK.
