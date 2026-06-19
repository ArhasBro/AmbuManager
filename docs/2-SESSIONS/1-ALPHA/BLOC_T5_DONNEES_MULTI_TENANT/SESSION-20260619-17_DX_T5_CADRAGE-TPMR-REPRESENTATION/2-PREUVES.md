# 2 - Preuves

## 1. Fichiers lus

### Gouvernance

- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`

### Sessions T5 amont lues

- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-14_DX_T5_CADRAGE-BLOC-SESSIONS/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-14_DX_T5_CADRAGE-BLOC-SESSIONS/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-14_DX_T5_CADRAGE-BLOC-SESSIONS/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-15_DX_T5_AUDIT-MAPPING-ENTITES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-15_DX_T5_AUDIT-MAPPING-ENTITES/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-15_DX_T5_AUDIT-MAPPING-ENTITES/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-16_DX_T5_AUDIT-COMPANYID-SURFACES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-16_DX_T5_AUDIT-COMPANYID-SURFACES/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-16_DX_T5_AUDIT-COMPANYID-SURFACES/3-FIN_DE_SESSION.md`

### Schema, fiches fonctionnelles et code lu

- `prisma/schema.prisma`
- `docs/1-MASTER/3-FONCTIONNALITES/6-FONCTIONNALITES_DETAILLEES_VEHICULES_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/4-FONCTIONNALITES_DETAILLEES_PLANNING_V1.1.md`
- `app/vehicles/vehicles-client.tsx`
- `app/templates/templates-client.tsx`
- `app/api/planning/shifts/[id]/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `lib/templates/template-rules.ts`
- `lib/company-rules/catalog.ts`
- `prisma/seed.ts`
- `lib/imports/import-engine.ts`

## 2. Fichiers utilises comme reference

- `prisma/schema.prisma` comme source technique de verite.
- Les fiches fonctionnelles vehicles et planning comme reference metier.
- Les sessions T5 amont comme contexte documentaire utile.
- Les fichiers `app/*`, `lib/*` et `prisma/*` ci-dessus comme surfaces d impact futures, en lecture seule.
- `create_session.ps1` comme outil officiel de creation de session.

## 3. Fichiers crees

- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-17_DX_T5_CADRAGE-TPMR-REPRESENTATION/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-17_DX_T5_CADRAGE-TPMR-REPRESENTATION/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-17_DX_T5_CADRAGE-TPMR-REPRESENTATION/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-17_DX_T5_CADRAGE-TPMR-REPRESENTATION/PATCH/NO_PATCH.md`

## 4. Fichiers modifies

- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-17_DX_T5_CADRAGE-TPMR-REPRESENTATION/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-17_DX_T5_CADRAGE-TPMR-REPRESENTATION/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-17_DX_T5_CADRAGE-TPMR-REPRESENTATION/3-FIN_DE_SESSION.md`

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
- `Get-Content -Raw docs/2-SESSIONS/README_SESSIONS.md`
- `Get-Content -Raw docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `Get-Content -Raw docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `Get-Content -Raw docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `Get-Content -Raw docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-14_DX_T5_CADRAGE-BLOC-SESSIONS/1-SESSION.md`
- `Get-Content -Raw docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-14_DX_T5_CADRAGE-BLOC-SESSIONS/2-PREUVES.md`
- `Get-Content -Raw docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-14_DX_T5_CADRAGE-BLOC-SESSIONS/3-FIN_DE_SESSION.md`
- `Get-Content -Raw docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-15_DX_T5_AUDIT-MAPPING-ENTITES/1-SESSION.md`
- `Get-Content -Raw docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-15_DX_T5_AUDIT-MAPPING-ENTITES/2-PREUVES.md`
- `Get-Content -Raw docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-15_DX_T5_AUDIT-MAPPING-ENTITES/3-FIN_DE_SESSION.md`
- `Get-Content -Raw docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-16_DX_T5_AUDIT-COMPANYID-SURFACES/1-SESSION.md`
- `Get-Content -Raw docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-16_DX_T5_AUDIT-COMPANYID-SURFACES/2-PREUVES.md`
- `Get-Content -Raw docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-16_DX_T5_AUDIT-COMPANYID-SURFACES/3-FIN_DE_SESSION.md`
- `Get-Content -Raw prisma/schema.prisma`
- `Get-Content -Raw docs/1-MASTER/3-FONCTIONNALITES/6-FONCTIONNALITES_DETAILLEES_VEHICULES_V1.1.md`
- `Get-Content -Raw docs/1-MASTER/3-FONCTIONNALITES/4-FONCTIONNALITES_DETAILLEES_PLANNING_V1.1.md`
- `Get-Content -Raw app/vehicles/vehicles-client.tsx`
- `Get-Content -Raw app/templates/templates-client.tsx`
- `Get-Content -Raw app/api/planning/shifts/[id]/route.ts`
- `Get-Content -Raw app/api/planning/shifts/[id]/assign/route.ts`
- `Get-Content -Raw app/api/planning/autoschedule/day/route.ts`
- `Get-Content -Raw app/api/planning/autoschedule/week/route.ts`
- `Get-Content -Raw app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `Get-Content -Raw lib/templates/template-rules.ts`
- `Get-Content -Raw lib/company-rules/catalog.ts`
- `Get-Content -Raw prisma/seed.ts`
- `Get-Content -Raw lib/imports/import-engine.ts`
- `rg -n "TPMR|VSL|TAXI|vehicleType|VehicleType|activity|planning|compatibilit|CompanyRule|DraftShift|PlanningShift|ShiftTemplate|Vehicle" prisma/schema.prisma`
- `rg -n "TPMR|VSL|TAXI|vehicleType|compatibilit|activity|planning|Vehicle|ShiftTemplate|role|CompanyRule" docs/1-MASTER/3-FONCTIONNALITES/6-FONCTIONNALITES_DETAILLEES_VEHICULES_V1.1.md docs/1-MASTER/3-FONCTIONNALITES/4-FONCTIONNALITES_DETAILLEES_PLANNING_V1.1.md`
- `rg -n "TPMR|VSL|TAXI|vehicleType|VehicleType|activity|planning|compatibilit|CompanyRule|DraftShift|PlanningShift|ShiftTemplate|Vehicle" app lib prisma --glob '!prisma/migrations/**'`
- `rg -n "TPMR" app lib prisma`
- `rg -n "VEHICLE_TYPE_OPTIONS|CategoryOption|requiredVehicleType|getVehicleTypeLabel|getAllowedRolesForVehicleType|isRoleAllowedForVehicleType|PlanningTemplateCategory|VehicleType" app/vehicles/vehicles-client.tsx app/templates/templates-client.tsx app/api/planning/shifts/[id]/route.ts app/api/planning/autoschedule/runs/[id]/publish/route.ts lib/templates/template-rules.ts prisma/schema.prisma`
- `Get-Content -Raw create_session.ps1`
- `./create_session.ps1 -Stage 1-ALPHA -Block T5 -SessionCode CADRAGE-TPMR-REPRESENTATION -Type CADRAGE -Title 'Cadrage de la representation metier et technique TPMR / TPMR VSL / TPMR TAXI'`
- `git status --short`

## 9. Resultats des commandes

- `git status --short` avant creation de session : sortie vide.
- `create_session.ps1` a cree `SESSION-20260619-17_DX_T5_CADRAGE-TPMR-REPRESENTATION` et `PATCH/NO_PATCH.md`.
- `Get-ChildItem` sur le dossier T5 a confirme les sessions amont 14, 15, 16 et le nouveau dossier 17.
- `rg -n "TPMR" app lib prisma` a retourne aucun resultat, ce qui confirme que `TPMR` n est pas encore present dans le schema ni dans le code.
- `prisma/schema.prisma` expose `VehicleType` avec `AMBULANCE`, `VSL`, `TAXI` seulement, et `PlanningTemplateCategory` avec `VSL`, `AMBULANCE`, `TAXI`, `GARDE` seulement.
- Les fiches fonctionnelles vehicles et planning mentionnent explicitement `TPMR`, `TPMR VSL` et `TPMR TAXI`, et la fiche planning laisse ouvert le niveau exact de distinction dans le referentiel vehicules.
- `app/vehicles/vehicles-client.tsx` et `app/templates/templates-client.tsx` hard-codent encore uniquement `AMBULANCE`, `VSL`, `TAXI`.
- `app/api/planning/shifts/[id]/route.ts`, `app/api/planning/autoschedule/runs/[id]/publish/route.ts` et `lib/templates/template-rules.ts` valident le type vehicule de facon stricte sur les enums actuels.
- `lib/company-rules/catalog.ts` propose des regles VSL/TAXI mais aucune regle TPMR dediee.
- `prisma/seed.ts` et `lib/imports/import-engine.ts` consomment les enums actuels et ne prevoient pas encore `TPMR`.
- `git status --short` apres creation puis apres redaction des preuves montre uniquement le dossier de session 17 non suivi.

## 10. Controles Git

- Avant intervention : repo propre.
- Apres creation de session : un seul dossier de session non suivi sous `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-17_DX_T5_CADRAGE-TPMR-REPRESENTATION/`.
- Apres redaction des preuves : pas de fichier hors session ajoute.

## 11. Controles techniques

- La session est bien creee dans le bloc T5.
- Le champ `Session` attendu est `CADRAGE-TPMR-REPRESENTATION`.
- Le type de session est `DX`.
- Le type metier est `CADRAGE`.
- `prisma/schema.prisma` a ete lu uniquement pour le cadrage.
- Les fiches vehicles et planning utiles ont ete lues.
- Les surfaces UI, API, seed et import concernes ont ete lues en lecture seule.
- Aucun fichier applicatif n a ete modifie.
- Aucun fichier Prisma n a ete modifie.
- Aucune migration n a ete creee.
- Aucune commande Prisma n a ete executee.
- Aucune commande npm n a ete executee.
- Aucun navigateur, Playwright ou capture n a ete utilise.

## 12. Controles d encodage

- Les trois fichiers de session ont ete ecrits en ASCII lisible.
- Aucune correction de code n a ete produite.
- Aucun patch applicatif `.diff` n a ete cree.

## 13. Controles de perimetre

- Aucun MASTER n a ete modifie.
- Aucune fiche fonctionnelle n a ete modifiee.
- Aucun fichier applicatif n a ete modifie.
- Aucun fichier Prisma n a ete modifie.
- Aucun script n a ete modifie.
- Aucun dossier hors session n a ete modifie.

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

- `TPMR` : type de vehicule, capacite, activite, prestation, ou contrainte de planning ? `INFORMATION NON FOURNIE - A CONFIRMER`
- `TPMR VSL` / `TPMR TAXI` : deux types distincts ou variantes sous `TPMR` ? `INFORMATION NON FOURNIE - A CONFIRMER`
- Planning autonome de la mission `TPMR` sans vehicule ? `INFORMATION NON FOURNIE - A CONFIRMER`
- Integrer `TPMR` aux compatibilites role / activite / vehicule ? `INFORMATION NON FOURNIE - A CONFIRMER`
- Regles societe dediees pour autoriser ou bloquer `TPMR` ? `INFORMATION NON FOURNIE - A CONFIRMER`
- Import et seed a adapter maintenant ? `INFORMATION NON FOURNIE - A CONFIRMER`
- Decision Prisma necessaire avant `P-VEHICULES` et `P-PLANNING` ? `INFORMATION NON FOURNIE - A CONFIRMER`

Regles obligatoires :

- Une commande non montree = non prouvee.
- Un fichier non liste = non prouve.
- Une information absente = INFORMATION NON FOURNIE - A CONFIRMER.
