# 2 - Preuves

## 1. Fichiers lus

### Gouvernance

- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/1-MASTER/01-APPLICATION_WEB.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`

### Base44

- `docs/1-MASTER/4-BASE44_REFERENCE/README_BASE44_REFERENCE.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/SYNTHESE_FINALE_BASE44_AMBULANCE_MANAGER.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/MANIFEST_BASE44_REFERENCE.json`

### Base44 entities read

- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/base44/entities/Company.jsonc`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/base44/entities/Depot.jsonc`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/base44/entities/User.jsonc`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/base44/entities/Employee.jsonc`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/base44/entities/ShiftTemplate.jsonc`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/base44/entities/Vehicle.jsonc`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/base44/entities/AbsenceRequest.jsonc`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/base44/entities/AuditLog.jsonc`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/base44/entities/CompanyContact.jsonc`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/base44/entities/DashboardPreference.jsonc`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/base44/entities/VehicleCheck.jsonc`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/base44/entities/Disinfection.jsonc`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/base44/entities/VehicleAnomaly.jsonc`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/base44/entities/OnboardingStep.jsonc`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/base44/entities/PlanningEntry.jsonc`

### Prisma and official code

- `prisma/schema.prisma`
- `lib/validators/company-profile.ts`
- `lib/validators/company-rules.ts`
- `lib/validators/depot.ts`
- `lib/validators/user.ts`
- `lib/validators/user-absence.ts`
- `lib/validators/vehicle.ts`
- `lib/validators/planning-assign.ts`
- `lib/services/company/update-company-profile.ts`
- `lib/services/depots/create-depot.ts`
- `lib/services/depots/update-depot.ts`
- `lib/services/depots/archive-depot.ts`
- `lib/services/vehicles/archive-vehicle.ts`
- `lib/services/vehicles/assign-vehicle-depot.ts`
- `lib/services/users/archive-user.ts`
- `lib/services/users/assign-user-depot.ts`
- `lib/services/users/user-absence.ts`
- `lib/services/planning/user-absence.ts`
- `lib/services/planning/planning-audit.ts`
- `lib/services/planning/assign-draftshift.ts`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/autoschedule-match.ts`
- `lib/services/planning/matching-quality.ts`
- `lib/services/planning/matching.service.ts` via targeted `rg`
- `lib/services/audit/audit-context.ts`
- `lib/services/audit/login-audit.ts`
- `lib/services/audit/personal-data-audit.ts`
- `lib/services/audit/support-action-trace.ts`
- `lib/services/templates/archive-template.ts`

### App files surfaced by targeted searches

- `app/api/audit/route.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/api/planning/shifts/route.ts`
- `app/planning/planning-client.tsx`

## 2. Fichiers utilises comme reference

- `prisma/schema.prisma` as the technical source of truth.
- Base44 JSONC entities as functional and metier references only.
- Official validators and services as the server side contract for the mapping.
- `create_session.ps1` to create the session folder and patch folder.

## 3. Fichiers crees

- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-15_DX_T5_AUDIT-MAPPING-ENTITES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-15_DX_T5_AUDIT-MAPPING-ENTITES/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-15_DX_T5_AUDIT-MAPPING-ENTITES/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-15_DX_T5_AUDIT-MAPPING-ENTITES/PATCH/NO_PATCH.md`

## 4. Fichiers modifies

- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-15_DX_T5_AUDIT-MAPPING-ENTITES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-15_DX_T5_AUDIT-MAPPING-ENTITES/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-15_DX_T5_AUDIT-MAPPING-ENTITES/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-15_DX_T5_AUDIT-MAPPING-ENTITES/PATCH/NO_PATCH.md`

## 5. Fichiers supprimes

- Aucun.

## 6. Fichiers deplaces ou renommes

- Aucun.

## 7. Dossiers explicitement non modifies

- `app/`
- `lib/`
- `prisma/`
- `docs/1-MASTER/`
- `public/`
- `scripts/`
- `types/`
- `package.json`
- `package-lock.json`
- `next.config.ts`
- `create_session.ps1`

## 8. Commandes executees

- `git status --short`
- `Get-ChildItem -Force docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT | Select-Object Name,Mode`
- `rg --files docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/base44/entities`
- `rg --files lib/validators lib/services`
- `rg -n "^model " prisma/schema.prisma`
- `rg -n "CompanyContact|DashboardPreference|VehicleCheck|Disinfection|VehicleAnomaly|OnboardingStep|PlanningEntry|TPMR|Employee|AbsenceRequest|AuditLog|companyId|@@index|@@unique|@relation" prisma/schema.prisma`
- `rg -n "CompanyContact|DashboardPreference|VehicleCheck|Disinfection|VehicleAnomaly|OnboardingStep|PlanningEntry|TPMR|Employee|AbsenceRequest|AuditLog|companyId" lib/validators lib/services`
- `Get-Content -Raw docs/2-SESSIONS/README_SESSIONS.md`
- `Get-Content -Raw docs/1-MASTER/01-APPLICATION_WEB.md`
- `Get-Content -Raw docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `Get-Content -Raw docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `Get-Content -Raw docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `Get-Content -Raw docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `Get-Content -Raw docs/1-MASTER/4-BASE44_REFERENCE/README_BASE44_REFERENCE.md`
- `Get-Content -Raw docs/1-MASTER/4-BASE44_REFERENCE/SYNTHESE_FINALE_BASE44_AMBULANCE_MANAGER.md`
- `Get-Content -Raw docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/MANIFEST_BASE44_REFERENCE.json`
- `Get-Content -Raw` on the listed Base44 entity files
- `Get-Content -Raw` on the listed validators
- `Get-Content -Raw` on the listed service files
- `rg -n "\b(CompanyContact|DashboardPreference|VehicleCheck|Disinfection|VehicleAnomaly|OnboardingStep|PlanningEntry|TPMR|Employee|AbsenceRequest)\b" app lib prisma --glob '!prisma/migrations/**'`
- `./create_session.ps1 -Stage 1-ALPHA -Block T5 -SessionCode AUDIT-MAPPING-ENTITES -Type 'DX+AUDIT+CADRAGE' -Title 'Matrice Base44 vers Prisma officiel'`
- `Get-Content -Raw docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-15_DX_T5_AUDIT-MAPPING-ENTITES/1-SESSION.md`
- `Get-Content -Raw docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-15_DX_T5_AUDIT-MAPPING-ENTITES/2-PREUVES.md`
- `Get-Content -Raw docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-15_DX_T5_AUDIT-MAPPING-ENTITES/3-FIN_DE_SESSION.md`
- `Get-Content -Raw docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-15_DX_T5_AUDIT-MAPPING-ENTITES/PATCH/NO_PATCH.md`
- `Get-ChildItem -Force docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-15_DX_T5_AUDIT-MAPPING-ENTITES | Select-Object Name,Mode`

## 9. Resultats des commandes

- `git status --short` avant creation de session : sortie vide.
- `create_session.ps1` a cree `SESSION-20260619-15_DX_T5_AUDIT-MAPPING-ENTITES` et `PATCH/NO_PATCH.md`.
- `Get-ChildItem` sur le dossier de session a confirme la presence de `PATCH`, `1-SESSION.md`, `2-PREUVES.md` et `3-FIN_DE_SESSION.md`.
- `rg -n "^model " prisma/schema.prisma` a retourne les modeles officiels utilises pour le mapping : `PlanningAuditLog`, `LoginAuditLog`, `Company`, `Depot`, `User`, `UserAbsence`, `Permission`, `UserPermission`, `CompanyRule`, `ShiftTemplate`, `MaintenanceType`, `Vehicle`, `AutoScheduleRun`, `DraftShift`, `Shift`.
- Les lectures Base44 ont confirme les entites prototypes utiles : `Company`, `Depot`, `User`, `Employee`, `ShiftTemplate`, `Vehicle`, `AbsenceRequest`, `AuditLog`, `CompanyContact`, `DashboardPreference`, `VehicleCheck`, `Disinfection`, `VehicleAnomaly`, `OnboardingStep`, `PlanningEntry`.
- Les validators et services lus confirment les contrats officiels `Company`, `Depot`, `User`, `UserAbsence`, `Vehicle`, `ShiftTemplate`, `DraftShift`, `Shift` et les audits officiels.
- Le search exact sur les noms Base44 a retourne exit code 1, sans correspondance exacte dans `app`, `lib` ou `prisma` pour les entites candidates non officielles.
- Les recherches app / audit ont mis en evidence l usage officiel de `PlanningAuditLog`, `LoginAuditLog`, `AutoScheduleRun`, `DraftShift` et `Shift`, ce qui confirme le split officiel du planning et de l audit.

## 10. Controles Git

- `git status --short` avant creation : vide.
- `git status --short` apres les ecritures de session : `?? docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/`

## 11. Controles techniques

- T5 est bien traite comme un bloc donnees, multi-tenant et mapping Base44 vers officiel.
- Le schema Prisma officiel reste la source technique de verite.
- Base44 reste uniquement une reference fonctionnelle, metier et visuelle.
- `PlanningEntry` Base44 ne remplace pas `Shift`, `DraftShift` ou `AutoScheduleRun`.
- Les modeles candidats absents du schema officiel sont bien distingues des modeles officiels existants.
- `companyId` est present sur les modeles multi-tenant officiels et sur les services qui appliquent la barriere tenant.
- Les services de planning et d audit valident le split officiel entre `PlanningAuditLog`, `LoginAuditLog`, `DraftShift`, `Shift` et `AutoScheduleRun`.

## 12. Controles d encodage

- Les fichiers de session ont ete re-ecrits en ASCII lisible.
- Aucun caractere accentue n a ete introduit dans les fichiers de session modifies.

## 13. Controles de perimetre

- Aucun fichier applicatif hors session n a ete modifie.
- Aucun fichier Prisma n a ete modifie.
- Aucun document MASTER n a ete modifie.
- Aucune migration n a ete creee.
- Aucune commande Prisma n a ete executee.
- Aucun navigateur, Playwright, build, lint ou test de qualite n a ete lance.
- Aucun patch applicatif `.diff` n a ete produit.

## 14. Limites / commandes non executees

- `npm install` non execute.
- `npm run dev` non execute.
- `npm run build` non execute.
- `npm run lint` non execute.
- `npm run test:quality` non execute.
- `npx prisma generate` non execute.
- `npx prisma validate` non execute.
- `npm run db:migrate` non execute.
- `npm run db:seed` non execute.
- `npm run db:reset` non execute.
- Aucun lancement navigateur.
- Aucune connexion a l application.
- Aucune capture.

## 15. Informations non fournies

- `CompanyContact` : A CONFIRMER.
- `DashboardPreference` : REPORTER vers `P-DASHBOARD`.
- `VehicleCheck` : REPORTER vers `P-SUIVI-VEHICULES`.
- `Disinfection` : REPORTER vers `P-SUIVI-VEHICULES`.
- `VehicleAnomaly` : REPORTER vers `P-SUIVI-VEHICULES`.
- `OnboardingStep` : REFUSER pour Alpha, progression calculee.
- `TPMR` / `TPMR VSL` / `TPMR TAXI` : A CONFIRMER.
- `PlanningEntry` : REFUSER comme remplacement de `Shift`, `DraftShift` ou `AutoScheduleRun`.

Regles obligatoires :

- Une commande non montree = non prouvee.
- Un fichier non liste = non prouve.
- Une information absente = A CONFIRMER.
