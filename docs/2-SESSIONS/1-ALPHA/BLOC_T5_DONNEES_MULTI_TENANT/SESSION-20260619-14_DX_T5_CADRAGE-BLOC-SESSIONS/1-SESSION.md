# 1 - Session

## 1. Identification

- Session : CADRAGE-BLOC-SESSIONS
- Identifiant dossier : SESSION-20260619-14_DX_T5_CADRAGE-BLOC-SESSIONS
- Date : 19/06/2026
- Phase : 1-ALPHA
- Bloc : BLOC_T5_DONNEES_MULTI_TENANT
- Nature : DX
- Type metier : AUDIT+CADRAGE
- Intitule : Analyse de la coherence du bloc T5 et de ses sessions avant demarrage

## 2. Contexte

Projet : Ambulance Manager.

Le repo officiel reste la source technique de verite. Base44 reste une reference fonctionnelle, metier et visuelle uniquement.

Le bloc T5 couvre les donnees, le multi-tenant et le mapping Base44 vers le modele officiel. Cette session ne corrige rien, ne modifie pas Prisma, ne modifie pas le MASTER et ne touche pas au code applicatif.

## 3. Objectif unique

Analyser la coherence du bloc T5 et de ses sessions avant demarrage, verifier si le decoupage est suffisant, identifier les sessions manquantes, trop larges, redondantes ou a reporter, puis produire les questions d arbitrage necessaires.

## 4. Perimetre autorise

- Lire les documents MASTER actifs utiles au T5.
- Lire le plan de developpement, le plan des blocs/sessions, la methode de travail et les fiches fonctionnelles utiles.
- Lire la reference Base44 comme support fonctionnel, metier et visuel.
- Lire `prisma/schema.prisma`.
- Lire en lecture seule les surfaces applicatives strictement necessaires au cadrage, via recherche ciblee.
- Analyser les relations `companyId`, les index, les contraintes, les modeles candidats et les risques de migration.
- Classer les sessions T5 prevues et proposer un ordre d execution recommande.
- Produire uniquement les preuves et questions de cadrage dans le dossier de session courant.

## 5. Perimetre interdit

- Correction de code.
- Creation de code.
- Modification applicative.
- Modification de `prisma/schema.prisma`.
- Toute commande Prisma.
- Modification des documents MASTER.
- Modification des fiches fonctionnelles.
- Lancement navigateur, connexion app web, captures, Playwright.
- `npm install`, `npm run dev`, `npm run build`, `npm run lint`, `npm run test:quality`.
- Creation d une session CX, FIX ou d un patch applicatif `.diff`.
- Toute modification hors du dossier de session courant.

## 6. Livrable attendu

Plan de sessions recommande pour T5 + questions d arbitrage classees.

## 7. Fichiers a lire

- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/1-MASTER/01-APPLICATION_WEB.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/1-MASTER/3-FONCTIONNALITES/LISTE_FONCTIONNALITES_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/8-FONCTIONNALITES_DETAILLEES_SOCIETE_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/2-FONCTIONNALITES_DETAILLEES_TABLEAU_DE_BORD_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/6.1-FONCTIONNALITES_DETAILLEES_SUIVI_DES_VEHICULES_V1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/9-FONCTIONNALITES_DETAILLEES_MISE_EN_ROUTE_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/4-FONCTIONNALITES_DETAILLEES_PLANNING_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/6-FONCTIONNALITES_DETAILLEES_VEHICULES_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/3-FONCTIONNALITES_DETAILLEES_MODELES_HORAIRES_V1.1.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/README_BASE44_REFERENCE.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/SYNTHESE_FINALE_BASE44_AMBULANCE_MANAGER.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/MANIFEST_BASE44_REFERENCE.json`
- Base44 entities utiles : `Company.jsonc`, `Vehicle.jsonc`, `ShiftTemplate.jsonc`, `User.jsonc`, `CompanyContact.jsonc`, `DashboardPreference.jsonc`, `VehicleCheck.jsonc`, `Disinfection.jsonc`, `VehicleAnomaly.jsonc`, `OnboardingStep.jsonc`, `PlanningEntry.jsonc`
- `prisma/schema.prisma`
- Recherches ciblees sur `app/`, `lib/` et `prisma/` pour les modeles candidats et les surfaces tenant

## 8. Fichiers a ne pas modifier

- `docs/1-MASTER/`
- `app/`
- `lib/`
- `prisma/`
- `public/`
- `scripts/`
- `types/`
- `create_session.ps1`
- `package.json`
- `package-lock.json`
- `next.config.ts`

## 9. Controles attendus

- Verifier que T5 est compris comme donnees / multi-tenant / mapping Base44 vers officiel.
- Verifier que le schema Prisma officiel reste la source technique de verite.
- Verifier que Base44 reste une reference fonctionnelle, metier et visuelle uniquement.
- Verifier que les entites Base44 ne sont pas reprises techniquement.
- Verifier que `PlanningEntry` Base44 ne remplace pas `Shift`, `DraftShift` ou `AutoScheduleRun`.
- Verifier que les modeles candidats sont classes sans etre crees.
- Verifier que `TPMR` / `TPMR VSL` / `TPMR TAXI` restent a confirmer si non statures.
- Verifier les risques `companyId`, tenant, relations, index et contraintes avant toute future migration.
- Identifier les sessions trop larges, redondantes, manquantes, a reporter ou a confirmer.
- Produire les questions d arbitrage classees par priorite.

## 10. Points a confirmer

- INFORMATION NON FOURNIE - A CONFIRMER : creation ou report de `CompanyContact`.
- INFORMATION NON FOURNIE - A CONFIRMER : creation ou report de `DashboardPreference`.
- INFORMATION NON FOURNIE - A CONFIRMER : creation ou report de `VehicleCheck`, `Disinfection`, `VehicleAnomaly`.
- INFORMATION NON FOURNIE - A CONFIRMER : creation ou refus de `OnboardingStep`.
- INFORMATION NON FOURNIE - A CONFIRMER : gestion de `TPMR` / `TPMR VSL` / `TPMR TAXI`.
- INFORMATION NON FOURNIE - A CONFIRMER : existence ou non d une session specifique d audit des surfaces `companyId` avant correction.
