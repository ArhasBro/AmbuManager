# 1 - Session

## 1. Identification

- Session : VALIDATION-CLOTURE-RBAC-SENSIBLE
- Date : 19/06/2026
- Phase : 1-ALPHA
- Bloc : BLOC_T4_RBAC_UI_API
- Nature : DX
- Type metier : VALIDATION+CLOTURE
- Intitule : Controle RBAC sensible T4 et cloture documentaire

## 2. Contexte

Ambulance Manager est un SaaS interne de gestion de societe de transport sanitaire.

Le repo officiel reste la source technique de verite. Base44 reste une reference fonctionnelle, metier et visuelle uniquement. Cette session ne reprend aucun correctif et ne produit aucun patch applicatif.

## 3. Objectif unique

Controler les contrats RBAC critiques apres les corrections T4, sans corriger le code, puis conclure si le bloc T4 est cloturable cote RBAC sensible. Le controle doit couvrir les gates serveur, les routes API sensibles, les actions UI critiques, le comportement support / support global, les scripts qualite existants, et la classification des ecarts.

## 4. Perimetre inclus

- Creation de la session dans `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API`.
- Renseignement des fichiers `1-SESSION.md`, `2-PREUVES.md`, `3-FIN_DE_SESSION.md`.
- Lecture des sessions T4 utiles :
  - `SESSION-20260618-09_DX_T4_AUDIT-MATRICE-RBAC`
  - `SESSION-20260618-10_DX_T4_CADRAGE-PERMISSIONS-MANQUANTES`
  - `SESSION-20260618-11_CX_T4_CORRECTION-RBAC-REFERENTIELS`
  - `SESSION-20260618-12_CX_T4_CORRECTION-RBAC-VEHICULES`
- Lecture de `scripts/quality/`.
- Lecture de `package.json` pour lister les scripts existants.
- Lecture de `lib/permissions.ts`, `lib/permission-catalog.ts`, `lib/rbac.ts`.
- Lecture ciblee des routes API sensibles T4 dans `app/api/**`.
- Lecture ciblee des pages et composants UI critiques associes.
- Lecture de `prisma/seed.ts` pour verifier la forme des comptes support.

## 5. Perimetre interdit

- Aucun correctif code.
- Aucun patch applicatif.
- Aucun fichier `.diff`.
- Aucune modification de `PATCH/`.
- Aucune modification de `app/api/**`, `app/**`, `lib/**`, `prisma/**`, `scripts/**`, `package.json`, `package-lock.json`, `next.config.ts`, `create_session.ps1` ou des MASTER.
- Aucun nouveau test.
- Aucun navigateur.
- Aucun Playwright.
- Aucun dev server.
- Aucun `npm install`.
- Aucune commande Prisma.
- Aucun build sauf necessite exceptionnelle, non retenue ici.
- Aucune auto-validation.

## 6. Regle de non-correction

Cette session est une session DX de validation et cloture. Si un ecart bloquant est detecte, il ne doit pas etre corrige ici. Il doit etre classe, documente, puis renvoye vers une session CX ciblee avec un perimetre precis. Si aucun ecart bloquant n est detecte, la conclusion doit rester une conclusion de cloture documentaire, pas une auto-validation.

## 7. Zones lues

- `package.json`
- `scripts/quality/smoke-api-critical-contracts.test.mjs`
- `scripts/quality/targeted-sensitive-blocks.test.mjs`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `lib/rbac.ts`
- `lib/services/audit/audit-context.ts`
- `lib/services/audit/support-action-trace.ts`
- `prisma/seed.ts`
- `app/api/users/route.ts`
- `app/api/users/[id]/route.ts`
- `app/api/users/[id]/archive/route.ts`
- `app/api/users/[id]/depot/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/api/users/[id]/absences/route.ts`
- `app/api/users/[id]/absences/[absenceId]/route.ts`
- `app/api/depots/route.ts`
- `app/api/depots/[id]/route.ts`
- `app/api/depots/[id]/archive/route.ts`
- `app/api/vehicles/route.ts`
- `app/api/vehicles/[id]/route.ts`
- `app/api/vehicles/[id]/archive/route.ts`
- `app/api/vehicles/[id]/depot/route.ts`
- `app/api/templates/route.ts`
- `app/api/templates/[id]/route.ts`
- `app/api/templates/[id]/archive/route.ts`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/route.ts`
- `app/api/planning/shifts/[id]/cancel/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/api/planning/exports/route.ts`
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`
- `app/api/planning/autoschedule/runs/route.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
- `app/api/company/profile/route.ts`
- `app/api/company/rules/route.ts`
- `app/api/audit/route.ts`
- `app/layout.tsx`
- `app/dashboard/page.tsx`
- `app/users/page.tsx`
- `app/users/user-creation-client.tsx`
- `app/users/user-edit-client.tsx`
- `app/users/user-depot-assignment-client.tsx`
- `app/users/reset-password-client.tsx`
- `app/users/user-archive-client.tsx`
- `app/vehicles/page.tsx`
- `app/vehicles/vehicles-client.tsx`
- `app/templates/page.tsx`
- `app/depots/page.tsx`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/planning/manual-planning-panel.tsx`
- `app/company/page.tsx`
- `app/company/company-profile-form.tsx`
- `app/company/company-rules-panel.tsx`
- `app/audit/page.tsx`
- `app/audit/audit-client.tsx`

## 8. Fichiers modifiables

- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260619-13_DX_T4_VALIDATION-CLOTURE-RBAC-SENSIBLE/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260619-13_DX_T4_VALIDATION-CLOTURE-RBAC-SENSIBLE/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260619-13_DX_T4_VALIDATION-CLOTURE-RBAC-SENSIBLE/3-FIN_DE_SESSION.md`

## 9. Criteres de validation

- Les scripts qualite existants sont identifies et documentes.
- `npm run test:quality` est execute si disponible, puis son resultat est consigne.
- Les gates serveur sensibles sont controles.
- Les routes API sensibles sont reliees aux bons helpers RBAC.
- Le comportement support / support global est controle.
- Les actions UI critiques sont alignees avec le serveur.
- `ROLES_PERMISSIONS_MANAGE` reste inactif.
- `COMPANY_MANAGE` n est pas cree.
- Aucun fichier applicatif ou technique hors session n est modifie.
- Le statut Git initial et final est consigne.
- Les ecarts sont classes en bloquants et non bloquants.
- La conclusion explicite distingue cloture ou non-cloture.

## 10. Preuves attendues

- Etat Git avant et apres controle.
- Liste des scripts qualite disponibles.
- Resultat de `npm run test:quality` ou justification si non complet.
- Resultat de `npm run test:targeted`.
- Extraits de gates serveur et de gates UI.
- Verification du support global.
- Verification de l absence de `ROLES_PERMISSIONS_MANAGE` active.
- Verification de l absence de `COMPANY_MANAGE`.
- Verification de l absence de navigateur, Playwright, dev server, `npm install`, commandes Prisma et build.
- Classement clair des ecarts et des risques residuels.

