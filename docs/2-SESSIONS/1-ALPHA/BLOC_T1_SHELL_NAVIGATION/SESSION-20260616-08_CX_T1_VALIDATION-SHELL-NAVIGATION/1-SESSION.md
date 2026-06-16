# 1 - Session

## 1. Identification

- Session : SESSION-20260616-08_CX_T1_VALIDATION-SHELL-NAVIGATION
- Date : 16/06/2026
- Phase : 1-ALPHA
- Bloc : T1
- Nature : CX
- Type métier : VALIDATION
- Intitulé : Validation shell navigation

## 2. Contexte

Projet : Ambulance Manager.

Le repo officiel est la source technique de vérité. Base44 reste une référence fonctionnelle, visuelle et métier, sans copie de code.

Cette session valide le shell connecté, la navigation visible, les routes T1, les libellés, le contexte connecté, l'accès direct non autorisé et le traitement visible `Accès refusé`.

## 3. Objectif unique

Valider le périmètre T1 shell/navigation après les sessions précédentes, sans correction applicative par défaut.

## 4. Périmètre autorisé

- Lecture des documents MASTER obligatoires.
- Lecture des sessions T1 précédentes.
- Lecture seule des fichiers shell, permissions, RBAC, proxy et pages connectées utiles.
- Contrôles `npm run lint` et `npm run build`.
- Contrôle navigateur sur serveur local.
- Création et remplissage de ce dossier de session.
- Création de `PATCH/NO_PATCH` si aucun code applicatif n'est modifié.

## 5. Périmètre interdit

- Correction lourde ou refonte shell/sidebar/topbar/navigation.
- Modification RBAC profonde ou matrice module-permission.
- Modification Prisma.
- Modification Base44.
- Modification maquettes, PNG, templates.
- Modification de `create_session.ps1`.
- Modification de `04-PLAN_DE_DEVELOPPEMENT.md`.
- Modification de `05-BLOCS_SESSIONS_PRODUCTION.md`.
- Renommage technique de routes.
- Refonte de pages métier.

## 6. Fichiers à lire

- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- Sessions T1 précédentes du dossier `BLOC_T1_SHELL_NAVIGATION`
- `app/layout.tsx`
- `app/app-shell.tsx`
- `app/ui/access-denied-state.tsx`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `lib/rbac.ts`
- `proxy.ts`
- Pages connectées T1 utiles.

## 7. Fichiers modifiables

- Ce dossier de session uniquement :
  - `1-SESSION.md`
  - `2-PREUVES.md`
  - `3-FIN_DE_SESSION.md`
  - `PATCH/README_PATCH.md`
  - `PATCH/NO_PATCH`

## 8. Livrable attendu

- Preuves de validation T1.
- Verdict explicite VALIDABLE / NON VALIDABLE.
- `NO_PATCH` en l'absence de modification applicative.

## 9. Contrôles attendus

- Structure documentaire.
- Shell connecté.
- Libellés navigation.
- Navigation visible selon droits disponibles.
- Routes visibles.
- Accès direct non autorisé.
- RBAC / permissions en lecture seule.
- Hors périmètre.
- `npm run lint`.
- `npm run build`.
- Navigateur.
- Encodage.
- Patch ou `NO_PATCH`.

## 10. Point de cadrage RBAC

MATRICE MODULE-PERMISSION NON STABILISÉE — VALIDATION LIMITÉE AUX DROITS DISPONIBLES.
