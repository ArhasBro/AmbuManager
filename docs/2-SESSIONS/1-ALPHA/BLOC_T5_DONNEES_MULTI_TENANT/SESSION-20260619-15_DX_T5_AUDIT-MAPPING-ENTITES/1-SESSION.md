# 1 - Session

## 1. Identification

- Session : AUDIT-MAPPING-ENTITES
- Identifiant dossier : SESSION-20260619-15_DX_T5_AUDIT-MAPPING-ENTITES
- Date : 19/06/2026
- Phase : 1-ALPHA
- Bloc : BLOC_T5_DONNEES_MULTI_TENANT
- Nature : DX
- Type metier : AUDIT+CADRAGE
- Intitule : Matrice Base44 vers Prisma officiel

## 2. Contexte

Projet : Ambulance Manager.

Le repo officiel reste la source technique de verite. Base44 reste une reference fonctionnelle, metier et visuelle seulement.

Cette session produit une matrice Base44 -> Prisma officiel pour le bloc T5, sans modifier Prisma, sans migration, sans correction applicative et sans copie technique Base44.

## 3. Objectif unique

Produire une matrice Base44 -> Prisma officiel pour toutes les entites utiles, classer chaque entite en GARDER, ADAPTER, REFUSER, REPORTER ou A CONFIRMER, et lister les risques multi-tenant ainsi que les points a confirmer.

## 4. Perimetre autorise

- Lire la gouvernance des sessions et les MASTER actifs utiles au T5.
- Lire la reference Base44 utile au mapping.
- Lire `prisma/schema.prisma`.
- Lire les validators officiels utiles.
- Lire les services officiels utiles.
- Identifier les correspondances directes, adaptations, refus, reports et confirmations.
- Identifier les risques `companyId`, tenant, relations, indexes et contraintes.
- Renseigner uniquement les fichiers de session du dossier courant.

## 5. Perimetre interdit

- Ne pas modifier `prisma/schema.prisma`.
- Ne pas modifier le code applicatif.
- Ne pas modifier les MASTER.
- Ne pas creer de migration.
- Ne pas lancer de commande Prisma.
- Ne pas lancer navigateur, Playwright, build, lint ou tests.
- Ne pas modifier `package.json`, `package-lock.json`, `next.config.ts` ou `create_session.ps1`.
- Ne pas creer de patch applicatif `.diff`.
- Ne pas copier Base44.
- Ne pas valider `CompanyContact`, `DashboardPreference`, `VehicleCheck`, `Disinfection`, `VehicleAnomaly`, `OnboardingStep`, `TPMR`, `TPMR VSL` ou `TPMR TAXI` sans arbitrage humain explicite.
- Ne pas accepter `PlanningEntry` comme remplacement de `Shift`, `DraftShift` ou `AutoScheduleRun`.

## 6. Fichiers a lire

- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/1-MASTER/01-APPLICATION_WEB.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/README_BASE44_REFERENCE.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/SYNTHESE_FINALE_BASE44_AMBULANCE_MANAGER.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/MANIFEST_BASE44_REFERENCE.json`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/base44/entities/*.jsonc` utiles au T5
- `prisma/schema.prisma`
- `lib/validators/` utiles au T5
- `lib/services/` utiles au T5

## 7. Fichiers modifiables

Uniquement les fichiers de la session courante :

- `1-SESSION.md`
- `2-PREUVES.md`
- `3-FIN_DE_SESSION.md`
- `PATCH/NO_PATCH.md`

## 8. Fichiers a ne pas modifier

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

## 9. Livrable attendu

- Matrice Base44 -> Prisma officiel pour les entites utiles.
- Synthese des impacts multi-tenant.
- Synthese des reports, refus et points a confirmer.
- Questions d arbitrage si necessaire.
- Preuves de lecture et de recherche sobres.

## 10. Controles attendus

- Verifier que la session est creee dans le bon bloc T5.
- Verifier que le champ `Session` contient `AUDIT-MAPPING-ENTITES` et non `DX_T5_AUDIT-MAPPING-ENTITES`.
- Verifier l absence de doublon de nommage `DX_T5_DX_T5`.
- Verifier que `prisma/schema.prisma` est lu.
- Verifier que les entites Base44 ciblees sont lues.
- Verifier que `lib/validators/` est lu.
- Verifier que les services officiels utiles sont lus.
- Verifier que Base44 est traite comme reference uniquement.
- Verifier que Prisma officiel reste la source technique de verite.
- Verifier que chaque entite Base44 utile est classee.
- Verifier que `PlanningEntry` est explicitement refuse comme remplacement de `Shift`, `DraftShift` ou `AutoScheduleRun`.
- Verifier que `CompanyContact` reste A CONFIRMER.
- Verifier que `DashboardPreference` reste REPORTER.
- Verifier que `VehicleCheck`, `Disinfection`, `VehicleAnomaly` restent REPORTER vers `P-SUIVI-VEHICULES`.
- Verifier que `OnboardingStep` reste REFUSER pour Alpha et progression calculee.
- Verifier que `TPMR`, `TPMR VSL` et `TPMR TAXI` restent A CONFIRMER.
- Verifier que les risques `companyId`, tenant, relations, indexes et contraintes sont listes.
- Verifier qu aucune modification applicative n est faite.
- Verifier qu aucune modification Prisma n est faite.
- Verifier qu aucune migration n est creee.
- Verifier qu aucune commande Prisma n est executee.
- Verifier qu aucun MASTER n est modifie.
- Verifier qu aucun patch applicatif `.diff` n est cree.
- Verifier `git status --short` avant et apres.

## 11. Criteres de validation

- La matrice Base44 -> Prisma officiel est produite.
- Les statuses GARDER, ADAPTER, REFUSER, REPORTER et A CONFIRMER sont utilises.
- Les risques multi-tenant sont listes.
- Les reports, refus et points a confirmer sont explicites.
- Les preuves de lecture et de recherche sont presentes.
- Aucune modification hors du dossier de session n est faite.

## 12. Points a confirmer

- `CompanyContact` : A CONFIRMER.
- `DashboardPreference` : REPORTER vers `P-DASHBOARD`.
- `VehicleCheck` : REPORTER vers `P-SUIVI-VEHICULES`.
- `Disinfection` : REPORTER vers `P-SUIVI-VEHICULES`.
- `VehicleAnomaly` : REPORTER vers `P-SUIVI-VEHICULES`.
- `OnboardingStep` : REFUSER pour Alpha, progression calculee.
- `TPMR` / `TPMR VSL` / `TPMR TAXI` : A CONFIRMER.
- `PlanningEntry` : REFUSER comme remplacement de `Shift`, `DraftShift` ou `AutoScheduleRun`.
