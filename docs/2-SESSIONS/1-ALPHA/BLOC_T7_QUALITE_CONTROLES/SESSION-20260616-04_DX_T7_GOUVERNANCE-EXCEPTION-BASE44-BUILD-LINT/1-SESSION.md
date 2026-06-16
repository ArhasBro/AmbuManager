# 1 — Session

## 1. Identification

- Session : SESSION-20260616-04_DX_T7_GOUVERNANCE-EXCEPTION-BASE44-BUILD-LINT
- Date : 16/06/2026
- Phase : 1-ALPHA
- Bloc : T7
- Type : CADRAGE+VALIDATION
- Famille : DX
- Intitulé : Gouvernance exception Base44 build lint

## 2. Contexte

Projet : Investissement
Sous-projet : Ambulance Manager

La session `SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION` a modifié uniquement deux libellés visibles dans `app/layout.tsx`.

Les commandes obligatoires `npm run build` et `npm run lint` ont été exécutées et échouent sur le dépôt global à cause du référentiel documentaire Base44 situé dans `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44`.

Ce dossier est une référence documentaire/prototype Base44 intouchable.

## 3. Objectif unique

Acter officiellement la règle de gouvernance documentaire permettant de considérer non bloquants les échecs `npm run build` et `npm run lint` exclusivement liés à `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44`, sous conditions documentées.

## 4. Périmètre autorisé

- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION/3-FIN_DE_SESSION.md`
- fichiers de la présente session DX T7.

## 5. Périmètre interdit

- aucun fichier applicatif ;
- aucun fichier dans `app/`, `lib/`, `prisma/`, `components/` ;
- aucun fichier `package.json`, `package-lock.json`, `tsconfig.json`, `eslint.config.*` ;
- aucun fichier Base44 ;
- aucun fichier dans `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44` ;
- aucune maquette, aucun PNG ;
- aucun template ;
- aucun fichier `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md` ou `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`.

## 6. Fichiers à lire

- `create_session.ps1`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION/3-FIN_DE_SESSION.md`

## 7. Fichiers modifiables

- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION/3-FIN_DE_SESSION.md`
- fichiers de la présente session DX T7.

## 8. Fichiers à ne pas modifier

- `app/`
- `lib/`
- `prisma/`
- `components/`
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `eslint.config.*`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/3-TEMPLATES/`
- maquettes et PNG.

## 9. Livrable attendu

- règle ajoutée dans `03-METHODE_DE_TRAVAIL.md` ;
- décision courte ajoutée dans `02-DOCUMENT_MAITRE_PROJET.md` ;
- mention d'exception Base44 ajoutée dans la session CX existante ;
- session DX T7 complétée ;
- aucun patch applicatif.

## 10. Contrôles attendus

- lecture des fichiers concernés ;
- création de session via `create_session.ps1` ;
- `git diff --name-only` ;
- `git diff` sur les fichiers modifiés ;
- contrôle qu'aucun fichier Base44 n'a été modifié ;
- contrôle qu'aucun fichier applicatif n'a été modifié par cette session ;
- contrôle UTF-8 sans BOM ;
- contrôle absence des quatre séquences suspectes demandées dans le prompt ;
- `git status --short`.

## 11. Critères de validation

- règle Base44 explicitement actée ;
- périmètre documentaire respecté ;
- aucune correction technique build/lint ;
- aucune exclusion TypeScript ou ESLint ;
- aucun fichier Base44 modifié ;
- aucun fichier applicatif modifié par cette session ;
- preuves terminales listées.

## 12. Points à confirmer

INFORMATION NON FOURNIE — À CONFIRMER : validation humaine finale de la décision de gouvernance après lecture des preuves.
