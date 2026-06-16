# 1 - Session

## 1. Identification

- Session : SESSION-20260616-07_CX_T1_COMPLETION-NAVIGATION-DROITS
- Date : 16/06/2026
- Phase : 1-ALPHA
- Bloc : T1
- Type : CX+COMPLETION
- Intitule : Completion navigation visible selon droits disponibles

## 2. Contexte

Projet : Investissement
Sous-projet : Ambulance Manager

Le repo officiel est la source technique de verite. Base44 reste une reference prototype fonctionnelle, visuelle et metier, sans copie directe. La session complete la navigation visible selon les droits deja disponibles, sans creer de matrice RBAC complete.

## 3. Objectif unique

Completer la navigation visible du shell connecte selon les droits deja presents dans le code, en coherence avec les decisions T1 deja documentees.

## 4. Perimetre autorise

- Shell connecte.
- Sidebar/navigation visible.
- Visibilite des entrees de navigation.
- Coherence utilisateur courant, droits disponibles et entrees affichees.
- Integration minimale avec les permissions existantes.
- Documentation de la dependance T4/RBAC si la matrice module-permission reste insuffisante.

## 5. Perimetre interdit

- Matrice RBAC complete.
- Logique complete T4.
- Modification Prisma.
- Refonte globale shell/sidebar/topbar.
- Renommage de routes techniques.
- Ajout de module metier.
- Modification des pages metier hors lecture.
- Modification Base44, maquettes/PNG, templates, `create_session.ps1`.
- Modification de `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`.
- Modification de `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`.

## 6. Fichiers a lire

- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- Sessions T1 precedentes : audit shell/navigation, renommage libelles, correction shell actions/contexte, creation acces refuse.
- `app/layout.tsx`
- `app/app-shell.tsx`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `lib/rbac.ts`
- `proxy.ts`
- Pages connectees lues uniquement pour verifier routes et protections existantes.

## 7. Fichiers modifiables

- `app/layout.tsx`
- Dossier de session courant :
  - `1-SESSION.md`
  - `2-PREUVES.md`
  - `3-FIN_DE_SESSION.md`
  - `PATCH/README_PATCH.md`
  - `PATCH/PATCH__SESSION-20260616-07_CX_T1_COMPLETION-NAVIGATION-DROITS.diff`

## 8. Fichiers a ne pas modifier

- `docs/1-MASTER/4-BASE44_REFERENCE/`
- `docs/1-MASTER/1-MAQUETTE/`
- `docs/3-TEMPLATES/`
- `create_session.ps1`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `prisma/`
- `lib/permissions.ts`, `lib/rbac.ts`, `lib/permission-catalog.ts`
- Pages metier.

## 9. Livrable attendu

- Session documentaire complete.
- Patch applicatif minimal.
- Audit de navigation visible et decision documentee.
- Preuves lint/build, diff, perimetre interdit et navigateur si possible.

## 10. Controles attendus

- `git status --short` initial et final.
- Lecture/audit utiles.
- `git diff --name-only`.
- `git diff`.
- Controle explicite de non-modification des fichiers interdits.
- `npm run lint`.
- `npm run build`.
- Controle navigateur local si possible.

## 11. Criteres de validation

- Aucune entree qui pointe vers une route inexistante.
- Aucune entree `Suivi des vehicules`.
- Conservation des libelles `Tableau de bord` et `Depots / Bases`.
- Navigation visible coherente avec les droits disponibles existants.
- Aucun ajout de matrice RBAC complete.
- Acces direct non autorise toujours traite par `Acces refuse`.

## 12. Points a confirmer

- MATRICE MODULE-PERMISSION NON STABILISEE - COMPLETION LIMITEE AUX DROITS DISPONIBLES.
- Granularite finale RBAC a traiter en T4.
- Politique finale pour le dashboard d'un utilisateur sans module visible a confirmer en T4/RBAC.
