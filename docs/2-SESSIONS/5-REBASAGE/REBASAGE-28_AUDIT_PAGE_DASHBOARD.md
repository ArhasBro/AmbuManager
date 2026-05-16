# REBASAGE-28 - Audit page Dashboard

## 1. Résumé de la session

Objectif : auditer la page Dashboard reelle en lecture seule pour qualifier son role, ses fonctionnalites, ses dependances et ses dettes.

Resultat : page Dashboard analysee ; flux session/permissions/module-links confirme ; dettes de preuve fonctionnelle detaillee maintenues.

## 2. Périmètre lu

- `docs/1-MASTER/DOCUMENT_MAITRE.md`
- `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE_GLOBAL_ALPHA.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-19_FONCTIONNALITES_PAR_PAGE.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-23_CARTOGRAPHIE_GLOBALE_PROJET.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-24_MATRICE_PAGE_FONCTIONNALITES_CODE_DOCUMENTATION_MAQUETTE.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-25_CLASSEMENT_DETTES_PRIORITES.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-26_INVENTAIRE_PAGES_ROUTES_APPLICATIVES.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-27_AUDIT_PAGE_LOGIN.md`
- Code lu : `app/dashboard/page.tsx`, `lib/permissions.ts`, `app/ui/index.ts`, `app/ui/page-header.tsx`, `app/ui/status-badge.tsx`, `app/ui/empty-state.tsx`, `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_DASHBOARD.md`.

## 3. Route et fichiers Dashboard identifiés

- Route applicative : `/dashboard`
- Fichier principal : `app/dashboard/page.tsx`
- Fichiers associés principaux :
  - `lib/auth.ts` (session NextAuth, via `getServerSession`)
  - `lib/permissions.ts`
  - `lib/prisma.ts`
  - composants UI `PageHeader`, `StatusBadge`, `EmptyState` (via `@/app/ui`)
- Composants locaux internes : `SectionCard` (dans `page.tsx`).

## 4. Rôle réel de la page Dashboard

- Portail d'accueil connecte vers modules metier selon permissions.
- Affichage contexte utilisateur (profil, role, societe).
- Affichage KPI synthetiques si session societe et role natif admin/gerant.
- Affichage d'etats vides/alerte si acces restreint ou compte sans societe courante.

## 5. Fonctionnalités attendues

Attendus prouvables :
- Portail d'accueil produit : OUI
- Point d'entree vers modules selon permissions : OUI
- Orientation utilisateur par role/session : OUI
- KPI simples si donnees disponibles : OUI
- Cohérence avec logique plan/cadrage (dashboard comme hub) : OUI
- Cohérence UI/UX cible dashboard : OUI (sur intention documentaire)

Attendus non prouvables totalement dans ce perimetre :
- Fiabilite metier complete de tous indicateurs (qualite des donnees sources) : INFORMATION NON FOURNIE — À CONFIRMER
- Exhaustivite des modules attendus par profil metier reel : INFORMATION NON FOURNIE — À CONFIRMER

## 6. Fonctionnalités présentes dans le code

Dans `app/dashboard/page.tsx` :
- Controle session : redirection `/login` si session absente ou `user.id` absent.
- Evaluation permissions asynchrones via `Promise.all`.
- Evaluation contexte `companyId`, `platformRole`, `companyProfileAllowed`.
- Calcul KPI (users, vehicles, depots, templates) via Prisma si droits admin/gerant et session societe.
- Construction liens terrain/admin conditionnels : `/planning`, `/users`, `/vehicles`, `/templates`, `/company`, `/depots`, `/onboarding`, `/audit`.
- Tri stable des liens modules par ordre metier.
- Affichage profile card + meta user/role/societe.
- Etats de fallback :
  - compte sans societe courante,
  - aucun module disponible,
  - aucun acces module exploitable.
- Pas d'appel direct a `app/api/*` depuis cette page (acces donnees serveur via Prisma).

## 7. APIs / services / modules liés

- Session/auth : `getServerSession(authOptions)`
- Permissions :
  - `canAccessAdminDashboard`
  - `canAccessTerrainDashboard`
  - `canViewSelfPlanning`
  - `canViewGlobalPlanning`
  - `canManageUsers`
  - `canManageVehicles`
  - `canManageTemplates`
  - `canManageCompanyRules`
  - `canViewAudit`
- Donnees : `prisma.user.count`, `prisma.vehicle.count`, `prisma.depot.count`, `prisma.shiftTemplate.count`, `prisma.company.findUnique`
- APIs directes `app/api` consommees : INFORMATION NON FOURNIE — À CONFIRMER (non detectees dans cette page)
- Modules relies : planning, users/RH, vehicules, templates, societe/regles, depots, onboarding, audit.

## 8. Comparaison avec REBASAGE-23 / 24 / 25 / 26 / 27

- REBASAGE-23 : confirme la route `/dashboard` comme hub principal.
- REBASAGE-24 : confirme statut `partiel` justifie par dependance aux permissions et donnees ; audit present affine les preuves techniques.
- REBASAGE-25 : dette `liaisons API implicites` reste valide (dashboard ne passe pas directement par API publique ; logique serveur interne predominante).
- REBASAGE-26 : inventaire route/fichier confirme sans ecart.
- REBASAGE-27 (login) : coherence de chaine d'entree `/login` -> session -> `/dashboard` maintenue.

Ecart nouveau detecte : aucun bloquant nouveau ; le principal risque reste la verification metier des KPI et des droits effectifs par profil.

## 9. Écarts, dettes et points à confirmer

| Priorité | Périmètre | Constat | Risque | Action recommandée |
|---|---|---|---|---|
| Important | Dashboard + permissions | Forte dependance au mapping permissions/roles pour visibilite modules | Hub incoherent selon profils si mapping incomplet | auditer |
| Important | Dashboard + donnees | KPI derives de requetes serveur sans preuve metier complete dans ce perimetre | Lecture de pilotage potentiellement trompeuse | clarifier avec Nathan |
| Amélioration | UX Dashboard | Presence et wording des etats vides peuvent diverger de la cible UX finale | Experience utilisateur moins explicite | completer plus tard |
| À confirmer | API/dashboard | Absence d'appels API publics directs : architecture voulue ou transitoire | Mauvaise interpretation de l'architecture data-flow | a confirmer |
| Plus tard | Observabilite | Traçabilite fine des decisions de modules affiches non detaillee au niveau UI | Debug profils plus difficile | documenter |

## 10. Verdict d’audit de la page Dashboard

- Statut d'audit page Dashboard : **incomplet**

Justification : structure et logique principales sont claires et cohérentes, mais la validation metier complete des permissions et de la fiabilite des indicateurs reste a prouver.

## 11. Recommandations pour la suite

- Dashboard : pret pour validation ulterieure conditionnelle, apres verification metier des droits/KPI.
- Correction immediate : NON (session audit uniquement).
- Prochaine page recommandee : **REBASAGE-29 - Audit page Planning**.

## 12. Verdicts de sortie

- REBASAGE-28 VALIDABLE : OUI
- AUDIT PAGE DASHBOARD CRÉÉ : OUI
- CODE MODIFIÉ : NON
- DOCUMENTS MAÎTRES MODIFIÉS : NON
- PAGE DASHBOARD STATUT AUDIT : incomplet
- SUITE RECOMMANDÉE : REBASAGE-29
