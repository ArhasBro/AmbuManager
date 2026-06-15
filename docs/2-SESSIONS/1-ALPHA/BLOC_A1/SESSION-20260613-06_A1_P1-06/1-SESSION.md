# 1 - Session

## 1. Identification

- Session : SESSION-20260613-06_A1_P1-06
- Date : 13/06/2026
- Phase : 1-ALPHA
- Bloc : A1
- Type : DOCUMENTATION
- Intitule : Creation du fichier MASTER 05-BLOCS_SESSIONS_PRODUCTION

## 2. Contexte

Projet : Ambulance Manager.

P1-02 est la base officielle de reprise operationnelle. P1-03 integre les decisions humaines. P1-04 prepare la refonte ciblee du plan. P1-05 a refondu le plan MASTER actif `04-PLAN_DE_DEVELOPPEMENT.md`.

## 3. Objectif unique

Creer le fichier MASTER separe `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md` pour suivre la declinaison operationnelle des blocs et sessions Codex, sans alourdir le plan maitre court `04-PLAN_DE_DEVELOPPEMENT.md`.

## 4. Perimetre autorise

- Creer et renseigner le dossier de session P1-06 via `create_session.ps1`.
- Lire les documents obligatoires demandes.
- Creer `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`.
- Modifier minimalement `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md` pour ajouter une reference vers le fichier 05.
- Renseigner `1-SESSION.md`, `2-PREUVES.md`, `3-FIN_DE_SESSION.md` et `PATCH/`.
- Produire `PATCH/NO_PATCH_CODE.md`.

## 5. Perimetre interdit

- Aucun code applicatif.
- Aucune modification `app/`, `lib/`, `prisma/`, `package.json`, `package-lock.json`.
- Aucune modification Base44.
- Aucune modification des dossiers supports MASTER hors lecture.
- Aucun renommage.
- Aucune suppression.
- Aucune migration.
- Aucune generation Prisma.
- Aucun plan concurrent.

## 6. Fichiers a lire

- `create_session.ps1`
- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/3-TEMPLATES/TEMPLATE_SESSION_CODEX.md`
- `docs/1-MASTER/01-APPLICATION_WEB.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- Sessions P1-02, P1-03, P1-04, P1-05
- `docs/1-MASTER/4-BASE44_REFERENCE/README_BASE44_REFERENCE.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/SYNTHESE_FINALE_BASE44_AMBULANCE_MANAGER.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/App.jsx`

## 7. Fichiers modifiables

- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-06_A1_P1-06/`

## 8. Fichiers a ne pas modifier

- `app/`
- `lib/`
- `prisma/`
- `package.json`
- `package-lock.json`
- `docs/1-MASTER/4-BASE44_REFERENCE/`
- autres MASTER actifs : `01`, `02`, `03`, `RGPD_BASE_MINIMALE.md`
- dossiers `1-MAQUETTE`, `2-REFERENCE_UI_UX`, `3-FONCTIONNALITES`, `5-AUDIT`

## 9. Livrable attendu

- `05-BLOCS_SESSIONS_PRODUCTION.md` cree avec les blocs et sessions de production.
- Reference courte ajoutee dans `04-PLAN_DE_DEVELOPPEMENT.md`.
- Fichiers de session P1-06 renseignes.
- `PATCH/NO_PATCH_CODE.md` present.

## 10. Controles attendus

- Git status initial et final.
- Diff du MASTER 04.
- Diff du nouveau MASTER 05.
- Absence modification code, Prisma, package, Base44.
- Autres MASTER actifs non modifies.
- Structure de session presente.
- UTF-8 sans BOM.
- Absence de mojibake.

## 11. Criteres de validation

- Fichier 05 cree : OUI.
- Reference 04 ajoutee : OUI.
- Aucun code modifie : OUI.
- Aucune modification Base44 : OUI.
- Aucun renommage : OUI.
- Session P1-06 documentee : OUI.

## 12. Points a confirmer

- Le fichier 04 et le dossier P1-05 etaient deja modifies/non suivis au debut de P1-06 ; ces elements sont conserves comme etat initial.