# 1 - Session

## 1. Identification

- Session : SESSION-20260616-06_CX_T1_CREATION-ACCES-REFUSE
- Date : 16/06/2026
- Phase : 1-ALPHA
- Bloc : T1
- Type : CX
- Intitule : Creation acces refuse

## 2. Contexte

Projet : Ambulance Manager.

Session CX T1 de creation/stabilisation du traitement visible `Acces refuse` pour utilisateur authentifie mais non autorise, apres audit T1 shell/navigation et apres les sessions T1 de renommage navigation et correction actions/contexte.

## 3. Objectif unique

Creer ou stabiliser le traitement visible `Acces refuse` selon la decision disponible apres audit, sans transformer la session en RBAC T4.

## 4. Perimetre autorise

- Shell connecte.
- Traitement visible pour utilisateur authentifie mais non autorise.
- Page, composant ou route dediee `Acces refuse` si necessaire.
- Integration minimale dans l'architecture existante.
- Preuve documentaire de la decision retenue.

## 5. Perimetre interdit

- Matrice RBAC complete T4.
- Refonte des protections metier.
- Refonte globale shell/sidebar/topbar.
- Refonte navigation globale.
- Modification massive du systeme de permissions.
- Creation d'une matrice module-permission.
- Modification des regles metier des modules.
- Modification Prisma.
- Modification seed.
- Modification Base44.
- Modification des maquettes ou PNG.
- Modification des templates.
- Modification de `create_session.ps1`.
- Modification de `04-PLAN_DE_DEVELOPPEMENT.md`.
- Modification de `05-BLOCS_SESSIONS_PRODUCTION.md`.
- Ajout de `Suivi des vehicules`.

## 6. Fichiers a lire

- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-02_DX_T1_AUDIT-SHELL-NAVIGATION/`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION/`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-05_CX_T1_CORRECTION-SHELL-ACTIONS-CONTEXTE/`
- `app/layout.tsx`
- `app/app-shell.tsx`
- `app/ui/access-denied-state.tsx`
- `app/ui/error-message.tsx`
- Pages connectees utilisant `AccessDeniedState`.
- Fichiers de permissions/protection utiles.

## 7. Fichiers modifiables

- `app/ui/access-denied-state.tsx`
- `app/planning/page.tsx` uniquement pour stabiliser le message `Acces refuse` existant.
- Fichiers de session courante.
- `PATCH/README_PATCH.md`
- Patch applicatif `.diff`.

## 8. Fichiers a ne pas modifier

- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/`
- `docs/1-MASTER/1-MAQUETTE/`
- `docs/3-TEMPLATES/`
- `create_session.ps1`
- `prisma/`
- `lib/permissions.ts`
- `lib/rbac.ts`
- `lib/permission-catalog.ts`
- Modules metier hors message d'acces refuse existant.

## 9. Decision retenue

Decision explicite route dediee vs composant non trouvee dans les documents lus.

Decision appliquee :

`DECISION EXPLICITE NON TROUVEE - SOLUTION MINIMALE CX APPLIQUEE`

Le composant existant `AccessDeniedState` est stabilise, sans creation de route dediee, car les pages connectees l'utilisent deja pour le cas utilisateur authentifie mais non autorise.

## 10. Livrable attendu

- Traitement visible `Acces refuse` stabilise.
- Aucune action fantome.
- Action visible unique et reelle : retour vers `/dashboard`.
- Patch applicatif `.diff`.
- Preuves documentees.

## 11. Controles attendus

- `git status --short` initial et final.
- Creation de session via `create_session.ps1`.
- `git diff --name-only`.
- `git diff` sur fichiers modifies.
- Absence modification Base44, maquettes/PNG, templates, `create_session.ps1`, `04`, `05`.
- Absence matrice RBAC complete.
- Absence modification module metier hors perimetre.
- Controle encodage UTF-8 sans BOM.
- Absence des quatre sequences suspectes listees dans le prompt.
- `npm run lint`.
- `npm run build`.
- Controle navigateur si possible.

## 12. Points a confirmer / reports

- Route dediee `/access-denied` : INFORMATION NON FOURNIE - A CONFIRMER.
- Politique RBAC fine par module : report T4.
- Parcours complet de validation acces direct non autorise sur tous les modules : report session `CX_T1_VALIDATION-SHELL-NAVIGATION`.
