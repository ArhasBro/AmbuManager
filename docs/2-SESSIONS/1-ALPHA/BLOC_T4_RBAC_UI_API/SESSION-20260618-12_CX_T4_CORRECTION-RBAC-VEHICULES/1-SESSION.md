# 1 - Session

## 1. Identification

- Session : CORRECTION-RBAC-VEHICULES
- Date : 18/06/2026
- Phase : 1-ALPHA
- Bloc : BLOC_T4_RBAC_UI_API
- Nature : CX
- Type metier : CORRECTION
- Intitule : Correction RBAC vehicules

## 2. Contexte

Projet : Ambulance Manager.

Le repo officiel reste la source technique de verite. Base44 reste une reference fonctionnelle, metier et visuelle uniquement.

Cette session reste ciblee sur les surfaces vehicules deja presentes dans le repo officiel. Aucun autre module n'est ouvert.

## 3. Objectif unique

Corriger uniquement les actions RBAC vehicules deja existantes:

- creation vehicule;
- modification vehicule;
- archivage vehicule;
- affectation depot vehicule.

L'objectif est d'aligner les controles serveur et les actions visibles avec la matrice T4 validee, en supprimant le gate trop restrictif sur la creation vehicule sans ouvrir la disponibilite avancee, le suivi vehicule, une UI transversale ou une refonte globale RBAC.

## 4. Perimetre autorise

- Creer la session officielle dans `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API`.
- Renseigner `1-SESSION.md`, `2-PREUVES.md`, `3-FIN_DE_SESSION.md`.
- Produire `PATCH/PATCH__SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES.diff`.
- Produire `PATCH/README_PATCH.md`.
- Lire `docs/2-SESSIONS/README_SESSIONS.md`.
- Lire `docs/3-TEMPLATES/TEMPLATE_SESSION_CODEX.md`.
- Lire la session T4 `DX_T4_AUDIT-MATRICE-RBAC`.
- Lire la session T4 `DX_T4_CADRAGE-PERMISSIONS-MANQUANTES`.
- Lire la session T4 referentiels precedente si utile pour coherence de methode.
- Lire `lib/permission-catalog.ts`, `lib/permissions.ts`, `lib/rbac.ts`.
- Lire les routes API vehicules existantes sous `app/api/vehicles/**`.
- Lire les pages et composants vehicules existants sous `app/vehicles/**`.
- Lire la fiche fonctionnelle vehicules utile au cadrage.
- Executer uniquement les commandes utiles et sobres de preuve et de qualite.

## 5. Perimetre interdit

- Ouvrir la disponibilite avancee vehicule.
- Creer ou corriger le suivi vehicule.
- Modifier un bloc suivi vehicule.
- Modifier planning.
- Modifier dashboard preferences.
- Modifier les referentiels users, societe ou depots sauf lecture necessaire.
- Modifier la navigation ou le shell.
- Modifier des composants communs.
- Modifier une UI transversale.
- Refaire le RBAC globalement.
- Activer `ROLES_PERMISSIONS_MANAGE`.
- Creer une permission non cadree par T4.
- Creer `COMPANY_MANAGE`.
- Modifier Prisma.
- Creer une migration.
- Lancer un seed.
- Modifier `package.json`, `package-lock.json` ou `next.config.ts`.
- Lancer `npm install`, `npm run dev`, Playwright, navigateur, captures ou commandes Prisma.
- Creer une session FIX separee.
- Auto-valider la session.

## 6. Fichiers a lire

- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/3-TEMPLATES/TEMPLATE_SESSION_CODEX.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-09_DX_T4_AUDIT-MATRICE-RBAC/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-09_DX_T4_AUDIT-MATRICE-RBAC/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-09_DX_T4_AUDIT-MATRICE-RBAC/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-10_DX_T4_CADRAGE-PERMISSIONS-MANQUANTES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-10_DX_T4_CADRAGE-PERMISSIONS-MANQUANTES/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-10_DX_T4_CADRAGE-PERMISSIONS-MANQUANTES/3-FIN_DE_SESSION.md`
- `docs/1-MASTER/3-FONCTIONNALITES/6-FONCTIONNALITES_DETAILLEES_VEHICULES_V1.1.md`
- `lib/permission-catalog.ts`
- `lib/permissions.ts`
- `lib/rbac.ts`
- `app/api/vehicles/route.ts`
- `app/api/vehicles/[id]/route.ts`
- `app/api/vehicles/[id]/archive/route.ts`
- `app/api/vehicles/[id]/depot/route.ts`
- `app/vehicles/page.tsx`
- `app/vehicles/vehicles-client.tsx`
- `app/vehicles/add-vehicle-form.tsx`

## 7. Fichiers modifiables

- `lib/permissions.ts`
- `app/api/vehicles/route.ts`
- `app/vehicles/page.tsx`
- `app/vehicles/vehicles-client.tsx`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES/PATCH/README_PATCH.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES/PATCH/PATCH__SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES.diff`

## 8. Fichiers a ne pas modifier

- `app/api/vehicles/[id]/route.ts`
- `app/api/vehicles/[id]/archive/route.ts`
- `app/api/vehicles/[id]/depot/route.ts`
- `app/vehicles/add-vehicle-form.tsx`
- `lib/permission-catalog.ts`
- `lib/rbac.ts`
- `docs/1-MASTER/**`
- `prisma/**`
- `package.json`
- `package-lock.json`
- `next.config.ts`
- `create_session.ps1`
- toute session precedente
- tout fichier hors dossier de session

## 9. Livrable attendu

- Correctif cible sur la creation vehicule et l'alignement des surfaces RBAC vehicules deja existantes.
- Patch applicatif `.diff` dans `PATCH/`.
- Preuves documentees dans `2-PREUVES.md`.
- Synthese de cloture dans `3-FIN_DE_SESSION.md`.

## 10. Controles attendus

- `git status --short` initial et final.
- `git diff --name-only`.
- `git diff -- <fichiers_modifies>`.
- `npx eslint <fichiers_TS_TSX_modifies>`.
- Verification du patch avec `git apply --check` sur le fichier de patch.
- Verification du patch sur index propre si le contexte du workspace le requiert.

## 11. Criteres de validation

- La creation vehicule n'est plus bloquee par un gate ADMIN-only.
- Le serveur et l'UI utilisent la meme regle de creation vehicule.
- Les actions modification, archivage et affectation depot restent bornees aux routes existantes.
- Aucun fichier hors perimetre n'est modifie.
- Le patch est present dans `PATCH/`.

## 12. Points a confirmer

- `INFORMATION NON FOURNIE - A CONFIRMER` : existence d'une autre surface de creation vehicule hors `app/vehicles/**` et `app/api/vehicles/**`.
- `INFORMATION NON FOURNIE - A CONFIRMER` : besoin futur d'ouvrir la creation vehicule aux profils permission-driven au lieu des seuls roles natifs ADMIN/GERANT.
