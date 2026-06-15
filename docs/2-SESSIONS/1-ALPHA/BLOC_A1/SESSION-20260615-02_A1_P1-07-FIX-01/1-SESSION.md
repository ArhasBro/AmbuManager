# 1 — Session

## 1. Identification

- Session : SESSION-20260615-02_A1_P1-07-FIX-01
- Date : 15/06/2026
- Phase : 1-ALPHA
- Bloc : A1
- Type : CORRECTION_DOCUMENTAIRE
- Intitulé : Correction encodage P1-07 et questions audit

## 2. Contexte

P1-07 a produit une refonte lisible de `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`, mais des écarts documentaires bloquent la validation : patch documentaire encodé en UTF-16 LE avec BOM, fichiers P1-07 contenant des caractères dégradés, et preuve mojibake contradictoire.

## 3. Objectif unique

Corriger uniquement la propreté documentaire et l'encodage de P1-07, régénérer le patch documentaire en UTF-8 sans BOM, et ajouter dans `05-BLOCS_SESSIONS_PRODUCTION.md` la règle validée sur les questions à poser pendant les audits ciblés.

## 4. Périmètre autorisé

- Créer et renseigner cette session via `create_session.ps1`.
- Corriger les fichiers de session P1-07 si nécessaire.
- Régénérer `PATCH_DOCUMENTAIRE_05.diff` de P1-07 en UTF-8 sans BOM.
- Modifier uniquement `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md` côté MASTER actif.
- Renseigner `1-SESSION.md`, `2-PREUVES.md`, `3-FIN_DE_SESSION.md` et `PATCH/` de la session FIX.
- Produire `PATCH/NO_PATCH_CODE.md`.

## 5. Périmètre interdit

- Aucun code applicatif.
- Aucune modification `app/`, `lib/`, `prisma/`, `package.json`, `package-lock.json`.
- Aucune modification Base44.
- Aucune modification d'un autre MASTER actif, notamment `04-PLAN_DE_DEVELOPPEMENT.md`.
- Aucun renommage.
- Aucune suppression.
- Aucune migration.
- Aucune génération Prisma.
- Aucun lint ni build, car la correction est documentaire et sans code.
- Aucun changement d'ordre des blocs.
- Aucun changement métier non demandé.

## 6. Fichiers lus

- `create_session.ps1`
- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/3-TEMPLATES/TEMPLATE_SESSION_CODEX.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/PATCH/PATCH_DOCUMENTAIRE_05.diff`
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-01_A1_P1-07/PATCH/NO_PATCH_CODE.md`

## 7. Fichiers modifiables

- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- fichiers de session P1-07 autorisés par la demande
- `docs/2-SESSIONS/1-ALPHA/BLOC_A1/SESSION-20260615-02_A1_P1-07-FIX-01/`

## 8. Livrable attendu

- Règle questions d'audit ajoutée dans `05`.
- Fichiers P1-07 corrigés des caractères dégradés visibles.
- `PATCH_DOCUMENTAIRE_05.diff` P1-07 régénéré en UTF-8 sans BOM.
- Session FIX documentée.
- `NO_PATCH_CODE.md` présent.

## 9. Contrôles attendus

- Git status initial et final.
- Structure de session FIX.
- Diff ou preuve de diff pour `05` et P1-07.
- Preuve encodage du patch corrigé.
- Absence modification code, Prisma, package, Base44.
- Absence modification autre MASTER actif.
- UTF-8 sans BOM.
- Absence de séquences suspectes et motifs dégradés demandés.

## 10. Critères de validation

- Aucun code modifié.
- Aucun Base44 modifié.
- Aucun autre MASTER modifié volontairement.
- Patch P1-07 en UTF-8 sans BOM.
- Fichiers P1-07 sans caractères dégradés visibles.
- `05` contient la règle des questions d'audit ciblé.
- Aucun gros tableau, ordre de blocs et fond métier inchangés.