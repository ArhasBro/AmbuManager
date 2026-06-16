# 1 - Session

## 1. Identification

- Session : SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION
- Date : 16/06/2026
- Phase : 1-ALPHA
- Bloc : T1
- Type : CX
- Type metier : RENOMMAGE
- Intitule : Renommage libelles navigation

## 2. Contexte

Projet : Ambulance Manager.

La session DX precedente `SESSION-20260616-02_DX_T1_AUDIT-SHELL-NAVIGATION` a identifie deux ecarts de libelles visibles dans la navigation du shell :

- `/dashboard` affiche `Dashboard` au lieu de `Tableau de bord`.
- `/depots` affiche `Depots / bases` au lieu de `Depots / Bases`.

`Suivi des vehicules`, les routes techniques historiques `/templates` et `/onboarding`, le RBAC visible et `Acces refuse` sont hors perimetre de cette session.

## 3. Objectif unique

Corriger uniquement les libelles visibles de navigation/shell actuellement presents dans le code, afin d'aligner l'interface sur les libelles francais valides.

## 4. Perimetre autorise

- Libelles UI francais visibles dans la navigation.
- Libelles visibles du shell/sidebar/topbar uniquement si directement lies a la navigation.
- Corrections textuelles minimales.
- Verification des libelles actuellement codes.
- Documentation de session et patch applicatif minimal.

## 5. Perimetre interdit

- Changement de comportement.
- Changement de route.
- Changement RBAC.
- Refonte shell/sidebar/topbar.
- Ajout ou suppression d'entree de navigation.
- Renommage technique de `/dashboard`, `/depots`, `/templates`, `/onboarding`.
- Ajout de `Suivi des vehicules`.
- Correction ou creation d'`Acces refuse`.
- Matrice module-permission.
- Donnees utilisateur/societe.
- Base44 technique.

## 6. Fichiers a lire

- `create_session.ps1`
- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/3-TEMPLATES/TEMPLATE_SESSION_CODEX.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-02_DX_T1_AUDIT-SHELL-NAVIGATION/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-02_DX_T1_AUDIT-SHELL-NAVIGATION/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-02_DX_T1_AUDIT-SHELL-NAVIGATION/3-FIN_DE_SESSION.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/0-REFERENCE_UI_UX_SHELL_GLOBAL.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/2-REFERENCE_UI_UX_DASHBOARD.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/7-REFERENCE_UI_UX_DEPOTS_BASES.md`
- `app/layout.tsx`
- `app/app-shell.tsx`

## 7. Fichiers modifiables

- `app/layout.tsx`, uniquement pour les libelles visibles de navigation confirmes.
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION/PATCH/README_PATCH.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION/PATCH/PATCH__SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION.diff`

## 8. Fichiers a ne pas modifier

- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/3-TEMPLATES/`
- `create_session.ps1`
- `prisma/`
- `lib/permissions.ts`
- `lib/rbac.ts`
- `package.json`
- `package-lock.json`
- fichiers Base44
- PNG / maquettes
- tout fichier non necessaire aux libelles visibles de navigation.

## 9. Livrable attendu

- Remplacement de `Dashboard` par `Tableau de bord` si confirme dans le code.
- Remplacement de `Depots / bases` par `Depots / Bases` si confirme dans le code.
- Aucun changement de route, permission, entree de navigation ou structure shell.
- Preuves et controles documentes.

## 10. Controles attendus

- `git diff --name-only`
- `git diff -- <fichiers modifies>`
- controle qu'aucun fichier interdit n'est modifie
- controle qu'aucune route technique n'a ete renommee
- controle qu'aucune entree de navigation n'a ete ajoutee ou supprimee
- controle qu'aucun RBAC n'a ete modifie
- controle qu'aucun fichier Base44, maquette ou PNG n'a ete modifie
- controle UTF-8 sans BOM sur les fichiers de session
- controle absence des sequences suspectes de mojibake demandees par la session

## 11. Criteres de validation

- Les deux libelles attendus sont corriges uniquement s'ils etaient presents dans le code.
- Les `href` de navigation restent identiques.
- Le nombre d'entrees de navigation codees reste identique.
- Aucun fichier interdit n'est modifie.
- Le patch applicatif est minimal et documente.

## 12. Points a confirmer

- Aucun point bloquant identifie pour cette session.
- `Suivi des vehicules` reste hors perimetre.
- Les routes techniques `/templates` et `/onboarding` restent hors perimetre.
