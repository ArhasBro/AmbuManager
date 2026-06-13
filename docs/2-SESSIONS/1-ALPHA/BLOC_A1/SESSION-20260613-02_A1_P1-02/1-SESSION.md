# 1 - Session

## 1. Identification

- Session : SESSION-20260613-02_A1_P1-02
- Code session : P1-02
- Date : 13/06/2026
- Phase : PHASE 1 - Structuration du plan de reprise Base44
- Bloc script : A1
- Type : CADRAGE
- Intitule : Plan final de reprise Base44

## 2. Contexte

Projet : Ambulance Manager.

Le repo officiel Next.js / TypeScript reste la base technique finale. Base44 est uniquement une reference prototype fonctionnelle, visuelle, UX et metier. Le code Base44 ne doit pas etre copie-colle techniquement.

La session P1-01 a produit l'audit de depart : routes officielles detectees, pages Base44, correspondances probables, sujets transversaux, anciens blocs a remplacer et decisions humaines restantes.

## 3. Objectif unique

Transformer l'audit P1-01 en proposition structuree de plan de reprise Base44, sans coder et sans modifier les documents MASTER actifs.

## 4. Perimetre autorise

- Creation de la session P1-02 via `create_session.ps1`.
- Lecture des livrables P1-01.
- Lecture des quatre documents MASTER actifs.
- Lecture ciblee de la reference Base44.
- Redaction des livrables de session P1-02 uniquement.
- Conservation de `PATCH/NO_PATCH.md` comme preuve d'absence de patch.

## 5. Perimetre interdit

- Aucune modification de code.
- Aucune modification de `app/`, `lib/`, `prisma/`, `package.json`, `package-lock.json`.
- Aucune modification des documents MASTER actifs.
- Aucune modification de la reference Base44.
- Aucun renommage.
- Aucune migration.
- Aucune refonte documentaire massive.
- Aucun patch code.

## 6. Fichiers a lire

- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-01_A1_P1-01/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-01_A1_P1-01/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-01_A1_P1-01/3-FIN_DE_SESSION.md`
- `docs/1-MASTER/01-APPLICATION_WEB.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/README_BASE44_REFERENCE.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/SYNTHESE_FINALE_BASE44_AMBULANCE_MANAGER.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/App.jsx`

## 7. Fichiers modifiables

- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-02_A1_P1-02/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-02_A1_P1-02/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-02_A1_P1-02/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260613-02_A1_P1-02/PATCH/NO_PATCH.md` si necessaire uniquement.

## 8. Fichiers a ne pas modifier

- `app/`
- `lib/`
- `prisma/`
- `package.json`
- `package-lock.json`
- `docs/1-MASTER/01-APPLICATION_WEB.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/`

## 9. Livrable attendu

- Plan P1 propose, structure en blocs transversaux, blocs page par page et blocs finaux.
- Sessions proposees petites, unitaires et controlables.
- Ordre recommande de reprise.
- Dependances et decisions humaines restantes.
- Identification des anciens blocs ou anciennes logiques a ne plus utiliser comme plan principal.
- Confirmation d'absence de modification code et MASTER.

## 10. Controles attendus

- `git status --short` initial et final.
- `git status --short --untracked-files=all` final.
- `git diff --name-only -- app lib prisma package.json package-lock.json`
- `git diff --name-only -- docs/1-MASTER`
- Preuve de structure de session.
- Controle UTF-8 sans BOM des Markdown crees/modifies.
- Controle absence de sequences suspectes/mojibake dans les Markdown crees/modifies.

## 11. Criteres de validation

- Plan P1 propose : OUI.
- Blocs transversaux proposes : OUI.
- Blocs page proposes : OUI.
- Dependances proposees : OUI.
- Sessions unitaires proposees : OUI.
- Modification code : NON.
- Renommage effectue : NON.
- MASTER modifies : NON.

## 12. Points a confirmer

- Routes anglaises ou routes francaises.
- Statut cible de `Suivi des vehicules`.
- Strategie de renommage `templates` / `modeles-horaires`.
- Strategie de renommage `onboarding` / `mise-en-route`.
- Place de `Privacy`.
- Granularite RBAC.
- Reprise des preferences dashboard.
- Reprise des contacts societe.
- Remplacement officiel des anciens plans.
