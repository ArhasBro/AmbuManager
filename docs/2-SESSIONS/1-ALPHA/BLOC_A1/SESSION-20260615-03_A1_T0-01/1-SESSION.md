# 1 - Session

## 1. Identification

- Session : SESSION-20260615-03_A1_T0-01
- Date : 15/06/2026
- Phase : 1-ALPHA
- Bloc : A1 / T0 - Gouvernance P1
- Type : AUDIT
- Intitule : Audit cible coherence P1-02 a P1-07-FIX-01

## 2. Contexte

Projet : Ambulance Manager.

Cette session audite la coherence documentaire et operationnelle de la reprise P1 apres les sessions P1-02, P1-03, P1-04, P1-05, P1-06, P1-07 et P1-07-FIX-01.

## 3. Objectif unique

Verifier que `04-PLAN_DE_DEVELOPPEMENT.md`, `05-BLOCS_SESSIONS_PRODUCTION.md` et les sessions P1 recentes restent coherents pour preparer proprement T0/T2/T1, sans modifier le code ni les documents MASTER actifs.

## 4. Perimetre autorise

- Creer la session T0-01 via `create_session.ps1`.
- Lire les documents MASTER, les documents de gouvernance de session, les sessions P1 demandees et les references Base44 demandees.
- Produire un audit documentaire de coherence P1.
- Renseigner uniquement les fichiers de la session T0-01.
- Produire `PATCH/NO_PATCH_CODE.md`.
- Conserver `PATCH/NO_PATCH.md` car aucun patch documentaire n'est produit.

## 5. Perimetre interdit

- Code applicatif.
- `app/`, `lib/`, `prisma/`.
- `package.json`, `package-lock.json`.
- Fichiers Base44.
- Fichiers MASTER actifs, dont `04-PLAN_DE_DEVELOPPEMENT.md` et `05-BLOCS_SESSIONS_PRODUCTION.md`.
- Dossiers supports `1-MAQUETTE`, `2-REFERENCE_UI_UX`, `3-FONCTIONNALITES`, `4-BASE44_REFERENCE`, `5-AUDIT`, sauf lecture seule.
- Renommage, suppression, migration, generation Prisma, nouveau plan, nouveau MASTER, fusion de `04` et `05`.

## 6. Fichiers a lire

- `create_session.ps1`
- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/3-TEMPLATES/TEMPLATE_SESSION_CODEX.md`
- `docs/1-MASTER/01-APPLICATION_WEB.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- Sessions P1-02 a P1-07-FIX-01 si presentes.
- `docs/1-MASTER/4-BASE44_REFERENCE/README_BASE44_REFERENCE.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/SYNTHESE_FINALE_BASE44_AMBULANCE_MANAGER.md`

## 7. Fichiers modifiables

Uniquement :

- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-03_A1_T0-01/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-03_A1_T0-01/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-03_A1_T0-01/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-03_A1_T0-01/PATCH/NO_PATCH.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-03_A1_T0-01/PATCH/NO_PATCH_CODE.md`

## 8. Livrable attendu

Audit T0-01 structure avec resume, fichiers lus, fichiers crees/modifies, constats `04`, constats `05`, constats P1, ecarts, informations manquantes, questions utilisateur, recommandation T0-02 et verdict final.

## 9. Controles attendus

- `git status --short` initial et final.
- Structure de session.
- Absence de modification code, Prisma, package, Base44 et MASTER.
- Absence de renommage.
- UTF-8 sans BOM pour les Markdown crees/modifies.
- Absence de sequences suspectes/mojibake.
- Presence de `PATCH/NO_PATCH_CODE.md`.
- Presence de `PATCH/NO_PATCH.md`.

## 10. Critere de validation

La session est documentee proprement, sans modification hors perimetre, avec constats et questions utilisateur exploitables pour cadrer T0-02.

## 11. Points a confirmer

- Alignement de la prochaine session recommandee dans `04` avec la sequence actuelle T0-01/T0-02/T0-03.
- Niveau de detail acceptable pour les sessions previsionnelles de `P-VEHICLE-FOLLOWUP`.
- Statut technique futur exact de `Suivi des vehicules`.
- Arbitrages metier encore ouverts avant reprise code.
