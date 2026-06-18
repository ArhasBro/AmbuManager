# 1 - Session

## 1. Identification

- Session : CORRECTION-RBAC-REFERENTIELS
- Session dossier : SESSION-20260618-11_CX_T4_CORRECTION-RBAC-REFERENTIELS
- Date : 18/06/2026
- Phase : 1-ALPHA
- Bloc : BLOC_T4_RBAC_UI_API
- Nature : CX
- Type metier : CORRECTION
- Intitule : Correction RBAC referentiels

## 2. Contexte

Projet : Ambulance Manager.

Le repo officiel reste la source technique de verite. Base44 reste une reference fonctionnelle et metier uniquement.

## 3. Objectif unique

Corriger uniquement les surfaces RBAC referentiels users, societe et depots / bases sur les actions sensibles deja existantes, en alignant les controles serveur et les actions visibles avec la matrice T4 validee, sans ouvrir de lot transversal.

## 4. Perimetre autorise

- Creer la session dans `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/`.
- Modifier uniquement si necessaire les fichiers code suivants :
  - `lib/permission-catalog.ts`
  - `lib/permissions.ts`
  - `app/api/depots/route.ts`
  - `app/api/depots/[id]/route.ts`
  - `app/api/depots/[id]/archive/route.ts`
  - `app/depots/page.tsx`
- Verifier sans modifier les surfaces users :
  - `app/api/users/route.ts`
  - `app/api/users/[id]/route.ts`
  - `app/api/users/[id]/archive/route.ts`
  - `app/api/users/[id]/depot/route.ts`
  - `app/api/users/[id]/reset-password/route.ts`
  - `app/users/page.tsx`
  - `app/users/user-archive-client.tsx`
  - `app/users/reset-password-client.tsx`
  - `app/users/user-depot-assignment-client.tsx`
  - `app/users/user-creation-client.tsx`
  - `app/users/user-edit-client.tsx`
  - `app/users/user-absence-client.tsx`
- Verifier sans modifier les surfaces societe :
  - `app/api/company/profile/route.ts`
  - `app/api/company/rules/route.ts`
  - `app/company/page.tsx`
  - `app/company/company-profile-form.tsx`
  - `app/company/company-rules-panel.tsx`
- Produire un patch cible dans `PATCH/*.diff`.
- Produire les preuves de diff, commandes qualite et `git status --short`.

## 5. Perimetre interdit

- `app/api/vehicles/**`
- `app/vehicles/**`
- `app/planning/**`
- `app/dashboard/**`
- `lib/rbac.ts`, sauf necessite stricte et prouvee
- `docs/1-MASTER/**`
- `prisma/**`
- `package.json`
- `package-lock.json`
- `next.config.ts`
- `create_session.ps1`
- navigateur, captures, Playwright, `npm run dev`
- refonte globale RBAC, gestion dynamique complete des roles et permissions
- activation de `ROLES_PERMISSIONS_MANAGE`
- creation de `COMPANY_MANAGE`
- toute nouvelle permission hors `DEPOTS_MANAGE`
- lot transversal ou refonte UI

## 6. Fichiers a lire

- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/3-TEMPLATES/TEMPLATE_SESSION_CODEX.md`
- `docs/1-MASTER/01-APPLICATION_WEB.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-09_DX_T4_AUDIT-MATRICE-RBAC/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-09_DX_T4_AUDIT-MATRICE-RBAC/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-09_DX_T4_AUDIT-MATRICE-RBAC/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-10_DX_T4_CADRAGE-PERMISSIONS-MANQUANTES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-10_DX_T4_CADRAGE-PERMISSIONS-MANQUANTES/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-10_DX_T4_CADRAGE-PERMISSIONS-MANQUANTES/3-FIN_DE_SESSION.md`
- `lib/permission-catalog.ts`
- `lib/permissions.ts`
- `lib/rbac.ts`
- `app/api/depots/route.ts`
- `app/api/depots/[id]/route.ts`
- `app/api/depots/[id]/archive/route.ts`
- `app/depots/page.tsx`
- `app/depots/depots-client.tsx`
- `app/api/users/route.ts`
- `app/api/users/[id]/route.ts`
- `app/api/users/[id]/archive/route.ts`
- `app/api/users/[id]/depot/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/users/page.tsx`
- `app/users/user-archive-client.tsx`
- `app/users/reset-password-client.tsx`
- `app/users/user-depot-assignment-client.tsx`
- `app/users/user-creation-client.tsx`
- `app/users/user-edit-client.tsx`
- `app/users/user-absence-client.tsx`
- `app/users/users-list-client.tsx`
- `app/users/users-side-panel-client.tsx`
- `app/api/company/profile/route.ts`
- `app/api/company/rules/route.ts`
- `app/company/page.tsx`
- `app/company/company-profile-form.tsx`
- `app/company/company-rules-panel.tsx`

## 7. Fichiers modifiables

- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-11_CX_T4_CORRECTION-RBAC-REFERENTIELS/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-11_CX_T4_CORRECTION-RBAC-REFERENTIELS/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-11_CX_T4_CORRECTION-RBAC-REFERENTIELS/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-11_CX_T4_CORRECTION-RBAC-REFERENTIELS/PATCH/*.diff`

## 8. Fichiers a ne pas modifier

- `app/api/users/**`
- `app/users/**`
- `app/api/company/**`
- `app/company/**`
- `app/api/vehicles/**`
- `app/vehicles/**`
- `app/planning/**`
- `app/dashboard/**`
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

- Une session CX complete et ciblee.
- Un patch `.diff` dans `PATCH/`.
- Un controle serveur coherent avec la matrice T4 validee.
- Des actions visibles UI alignees avec les memes permissions que le serveur.
- Une preuve explicite qu'aucun lot transversal n'a ete ouvert.

## 10. Contrôles attendus

- `git status --short` avant et apres.
- `git diff --name-only`.
- `git diff -- <fichiers_modifies>`.
- `npm run lint` si fichiers TypeScript, API ou React modifies.
- `npm run build` seulement si utile pour valider le routing, les exports critiques ou les types partages.
- verification du perimetre : aucun fichier hors bloc T4 referentiels ne doit etre modifie.

## 11. Criteres de validation

- Session creee dans le bon dossier.
- Champ `Session` egal a `CORRECTION-RBAC-REFERENTIELS`.
- Nature CX respectee.
- Type metier CORRECTION respecte.
- `DEPOTS_MANAGE` cable seulement si necessaire.
- Aucun fichier vehicles, planning, dashboard ou MASTER modifie.
- Aucun navigateur, capture ou Playwright.
- Patch `.diff` produit.

## 12. Points a confirmer

- Aucune confirmation bloquante supplementaire dans le perimetre de cette correction.
- Les sujets hors perimetre restent a traiter dans les blocs dedies.
