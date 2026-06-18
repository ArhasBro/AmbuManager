# 1 - Session

## 1. Identification

- Session : CORRECTION-ETATS-COMMUNS
- Identifiant technique : SESSION-20260618-04_CX_T3_CORRECTION-ETATS-COMMUNS
- Date : 18/06/2026
- Phase : 1-ALPHA
- Bloc : BLOC_T3_DESIGN_SYSTEM_COMPOSANTS
- Type de session : CX
- Type metier : CORRECTION
- Intitule : Correction des etats communs

## 2. Contexte

- Projet : Ambulance Manager
- Source technique de verite : repo officiel
- Prototype Base44 : reference fonctionnelle et visuelle uniquement, sans copie technique
- T2 : cloture manuelle, ne pas le rouvrir

## 3. Objectif unique

Corriger les etats UI communs insuffisants dans `app/ui/` sans modifier les regles metier, les routes, l'API, Prisma ou le RBAC, et sans refondre une page metier complete.

## 4. Perimetre autorise

- Modifier uniquement les composants UI communs de `app/ui/`
- Ajouter des composants UI communs strictement necessaires a la correction des etats communs
- Apporter des ajustements minimaux dans les pages consommatrices uniquement si cela remplace un etat local repetitif par une primitive commune
- Mettre a jour `app/ui/index.ts` si un export est necessaire
- Produire les preuves de session, le patch et le verdict final

## 5. Perimetre interdit

- Refonte de page metier
- Modification des regles metier
- Modification des routes
- Modification du RBAC
- Modification de Prisma
- Modification d'une API
- Modification de `next.config.ts`
- Modification de `package.json` ou `package-lock.json`
- Creation d'un dossier `components/`
- Copie de Base44
- Copie de shadcn
- Refonte de `app/globals.css`
- Traitement de la palette, de la typographie, du spacing global ou de la navigation
- Traitement principal des tableaux, filtres, badges, actions, headers ou stat cards
- Audit global hors T3
- Correction de warnings ESLint sans lien direct avec le patch

## 6. Fichiers a lire

- `create_session.ps1`
- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/3-TEMPLATES/TEMPLATE_SESSION_CODEX.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T3_DESIGN_SYSTEM_COMPOSANTS/SESSION-20260618-03_DX_T3_AUDIT-COMPOSANTS-ETATS/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T3_DESIGN_SYSTEM_COMPOSANTS/SESSION-20260618-03_DX_T3_AUDIT-COMPOSANTS-ETATS/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T3_DESIGN_SYSTEM_COMPOSANTS/SESSION-20260618-03_DX_T3_AUDIT-COMPOSANTS-ETATS/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T3_DESIGN_SYSTEM_COMPOSANTS/SESSION-20260618-03_DX_T3_AUDIT-COMPOSANTS-ETATS/PATCH/NO_PATCH.md`
- `app/ui/access-denied-state.tsx`
- `app/ui/empty-state.tsx`
- `app/ui/error-message.tsx`
- `app/ui/index.ts`
- `app/ui/data-table.tsx`
- `app/ui/filter-bar.tsx`
- `app/ui/action-button.tsx`
- `app/ui/page-header.tsx`
- `app/ui/stat-card.tsx`
- `app/ui/status-badge.tsx`
- `app/ui/loading-state.tsx`
- `app/ui/disabled-state.tsx`
- `app/planning/manual-planning-panel.tsx`
- `app/users/user-edit-client.tsx`
- `app/users/user-depot-assignment-client.tsx`
- `app/users/users-side-panel-client.tsx`
- `app/users/user-absence-client.tsx`
- `app/users/reset-password-client.tsx`

## 7. Fichiers modifiables

- `app/ui/access-denied-state.tsx`
- `app/ui/data-table.tsx`
- `app/ui/index.ts`
- `app/ui/loading-state.tsx`
- `app/ui/disabled-state.tsx`
- `app/planning/manual-planning-panel.tsx`
- `app/users/user-edit-client.tsx`
- `app/users/user-depot-assignment-client.tsx`
- `app/users/users-side-panel-client.tsx`
- `app/users/user-absence-client.tsx`
- `app/users/reset-password-client.tsx`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T3_DESIGN_SYSTEM_COMPOSANTS/SESSION-20260618-04_CX_T3_CORRECTION-ETATS-COMMUNS/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T3_DESIGN_SYSTEM_COMPOSANTS/SESSION-20260618-04_CX_T3_CORRECTION-ETATS-COMMUNS/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T3_DESIGN_SYSTEM_COMPOSANTS/SESSION-20260618-04_CX_T3_CORRECTION-ETATS-COMMUNS/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T3_DESIGN_SYSTEM_COMPOSANTS/SESSION-20260618-04_CX_T3_CORRECTION-ETATS-COMMUNS/PATCH/README_PATCH.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T3_DESIGN_SYSTEM_COMPOSANTS/SESSION-20260618-04_CX_T3_CORRECTION-ETATS-COMMUNS/PATCH/PATCH__SESSION-20260618-04_CX_T3_CORRECTION-ETATS-COMMUNS.diff`

## 8. Livrable attendu

- Composants `loading` et `disabled` communs disponibles dans `app/ui/`
- `access-denied-state` contextualisable
- Remplacements minimaux des etats textuels repetitifs par primitives communes
- Patch applicatif cible dans `PATCH/`
- Preuves terminales et documentaires a jour

## 9. Controles attendus

- `npm run lint`
- `npm run build`
- `npx eslint` cible sur les fichiers modifies
- `git diff --name-only`
- `git diff -- app/ui`
- `git status --short`

## 10. Criteres de validation

- Les etats communs sont plus reutilisables
- Les composants restent non specifiques a un module
- Aucune regle metier n'est deplacee dans `app/ui/`
- Aucune page metier n'est refondue
- Aucune route, API, Prisma ou RBAC n'est modifie
- Base44 n'est pas copie techniquement
- La CX suivante `CX_T3_COMPLETION-TABLEAUX-FILTRES-BADGES` reste separee
- Le diff est cible
- Le patch est produit dans `PATCH/`

## 11. Points a confirmer

- Dossier technique cree par le script sous `BLOC_T3_DESIGN_SYSTEM_COMPOSANTS` alors que le bloc logique documente reste `BLOC_T3_DESIGN_SYSTEM_COMPOSANTS`
- Lint global et build peuvent rester pollues par des ecarts historiques hors perimetre
