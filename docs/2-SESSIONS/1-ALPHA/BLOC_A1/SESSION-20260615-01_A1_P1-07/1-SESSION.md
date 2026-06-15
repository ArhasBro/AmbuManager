# 1 — Session

## 1. Identification

- Session : SESSION-20260615-01_A1_P1-07
- Date : 15/06/2026
- Phase : 1-ALPHA
- Bloc : A1
- Type : DOCUMENTATION
- Intitulé : Refonte lisible 05 blocs sessions production

## 2. Contexte

Projet : Ambulance Manager.

P1-05 a refondu le plan court `04-PLAN_DE_DEVELOPPEMENT.md`. P1-06 a créé `05-BLOCS_SESSIONS_PRODUCTION.md`, mais sa version actuelle est trop lourde et trop tabulaire pour piloter humainement les blocs.

## 3. Objectif unique

Refondre uniquement `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md` sous forme de fiches de blocs courtes, lisibles et alignées avec `04-PLAN_DE_DEVELOPPEMENT.md`.

## 4. Périmètre autorisé

- Créer et renseigner le dossier de session P1-07 via le script officiel.
- Lire les documents obligatoires de la demande.
- Modifier uniquement `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md` côté MASTER actif.
- Renseigner `1-SESSION.md`, `2-PREUVES.md`, `3-FIN_DE_SESSION.md` et `PATCH/`.
- Produire un patch documentaire et `NO_PATCH_CODE.md`.

## 5. Périmètre interdit

- Aucun code applicatif.
- Aucune modification `app/`, `lib/`, `prisma/`, `package.json`, `package-lock.json`.
- Aucune modification Base44.
- Aucune modification des dossiers supports MASTER hors lecture.
- Aucune modification volontaire d'un autre MASTER actif.
- Aucun renommage.
- Aucune suppression.
- Aucune migration.
- Aucune génération Prisma.
- Aucun plan concurrent.

## 6. Fichiers à lire

- `create_session.ps1`
- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/3-TEMPLATES/TEMPLATE_SESSION_CODEX.md`
- `docs/1-MASTER/01-APPLICATION_WEB.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- sessions P1-02, P1-03, P1-04, P1-05, P1-06
- `docs/1-MASTER/4-BASE44_REFERENCE/README_BASE44_REFERENCE.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/SYNTHESE_FINALE_BASE44_AMBULANCE_MANAGER.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/App.jsx` en lecture ciblée routes/pages prototype.

## 7. Fichiers modifiables

- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/`

## 8. Fichiers à ne pas modifier

- `app/`
- `lib/`
- `prisma/`
- `package.json`
- `package-lock.json`
- `docs/1-MASTER/4-BASE44_REFERENCE/`
- autres MASTER actifs, sauf État initial déjà présent sur `04-PLAN_DE_DEVELOPPEMENT.md` non modifié volontairement pendant P1-07.

## 9. Livrable attendu

- `05-BLOCS_SESSIONS_PRODUCTION.md` refondu en fiches de blocs lisibles.
- 24 blocs de `04` conservés.
- Audit ciblé prévu pour chaque bloc.
- Sessions détaillées non inventées lorsque l'existant réel n'est pas prouvé.
- `PATCH/PATCH_DOCUMENTAIRE_05.diff` présent.
- `PATCH/NO_PATCH_CODE.md` présent.

## 10. Contrôles attendus

- `git status --short` initial et final.
- Commande de création de session.
- Liste des fichiers lus.
- Liste des fichiers créés/modifiés.
- Structure de session.
- Diff complet du fichier modifié ou patch documentaire complet.
- Absence modification code, Prisma, package et Base44.
- Contrôle des autres MASTER actifs.
- UTF-8 sans BOM.
- Absence de mojibake.

## 11. Critères de validation

- `05` est clair, lisible et utile pour piloter Codex.
- `05` reste une déclinaison opérationnelle de `04`.
- `05` ne devient ni copie de P1-02 ni copie de `04`.
- `05` n'utilise pas de gros tableaux par bloc.
- Chaque bloc contient une fiche et un audit ciblé obligatoire.
- Les incertitudes restent visibles.
- Aucun code, Prisma, package ou Base44 n'est modifié.

## 12. Points à confirmer

- Détail réel des sessions de production bloc par bloc après audit ciblé.
- Statut technique exact futur de `Suivi des véhicules`.
- Les modifications de `04` et les dossiers P1-05/P1-06 étaient déjà présents dans le statut initial de P1-07.
