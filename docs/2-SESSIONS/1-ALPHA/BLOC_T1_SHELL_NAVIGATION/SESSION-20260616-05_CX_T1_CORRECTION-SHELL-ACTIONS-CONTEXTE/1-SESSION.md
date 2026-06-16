# 1 - Session

## 1. Identification

- Session : SESSION-20260616-05_CX_T1_CORRECTION-SHELL-ACTIONS-CONTEXTE
- Date : 16/06/2026
- Phase : 1-ALPHA
- Bloc : T1
- Type : CX
- Intitule : Correction shell actions contexte

## 2. Contexte

Projet : Ambulance Manager.

Session ouverte avec `create_session.ps1` pour corriger ou stabiliser les actions visibles du shell/topbar et l'affichage du contexte utilisateur/societe, apres la session `SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION`.

## 3. Objectif unique

Corriger uniquement les incoherences visibles du shell connecte et de la topbar concernant :

- actions visibles ;
- contexte utilisateur courant ;
- contexte societe courante ;
- affichage shell/topbar.

## 4. Perimetre autorise

- `app/app-shell.tsx`
- `app/globals.css`, uniquement pour les styles directement lies au shell/topbar.
- Fichiers de session et patch dans le dossier de session courant.

## 5. Perimetre interdit

- RBAC fin et matrice de permissions.
- Routes techniques.
- Page `Acces refuse`.
- Ajout de `Suivi des vehicules`.
- Modules metier.
- Refonte globale shell/sidebar/topbar/layout.
- Prisma.
- Fichiers Base44.
- Maquettes / PNG.
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- Templates.
- `create_session.ps1`.

## 6. Fichiers a lire

- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-02_DX_T1_AUDIT-SHELL-NAVIGATION/`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION/`
- `app/layout.tsx`
- `app/app-shell.tsx`
- `app/globals.css`

## 7. Livrable attendu

- Patch applicatif minimal.
- Fichiers de session renseignes.
- Patch `.diff` dans `PATCH/`.
- Controle build/lint documente.
- Controle navigateur documente.

## 8. Critere de validation

Le shell connecte reste accessible, la navigation existante reste stable, `Tableau de bord` et `Depots / Bases` restent conserves, le contexte utilisateur/societe reste coherent avec les donnees disponibles, et aucune action visible fantome du shell/topbar ne reste sans justification.
