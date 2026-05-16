# REBASAGE-26 - Inventaire reel des pages/routes applicatives avant audit detaille

## 1. Resume de la session

Objectif : etablir un inventaire reel, precis et verifiable des pages/routes applicatives et routes API avant les audits page par page.

Resultat : inventaire consolide produit sur base du code present dans `app/` et `app/api/`, avec statuts de confiance et zones a confirmer.

## 2. Perimetre lu

- `docs/1-MASTER/DOCUMENT_MAITRE.md`
- `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE_GLOBAL_ALPHA.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-23_CARTOGRAPHIE_GLOBALE_PROJET.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-24_MATRICE_PAGE_FONCTIONNALITES_CODE_DOCUMENTATION_MAQUETTE.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-25_CLASSEMENT_DETTES_PRIORITES.md`
- Lecture technique : `app/`, `app/api/`, fichiers `page.tsx`, `layout.tsx`, et clients principaux.

## 3. Regles de lecture de l'inventaire

- Inventaire descriptif uniquement, sans correction.
- Code reel prioritaire pour l'existence des routes/fichiers.
- Si une attribution n'est pas prouvable : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Statuts utilises : `clair`, `partiel`, `a confirmer`.

## 4. Inventaire des routes applicatives reelles

| Route | Type | Fichier principal | Fichier client associe | Role suppose | Module associe | Statut |
|---|---|---|---|---|---|---|
| `/` | interne technique | `app/page.tsx` | INFORMATION NON FOURNIE — À CONFIRMER | Redirection selon session | Auth / shell | clair |
| `/login` | publique | `app/login/page.tsx` | integre dans page | Authentification | Auth / session | clair |
| `/dashboard` | interne | `app/dashboard/page.tsx` | integre dans page | Hub modules + KPI | Dashboard / RBAC | clair |
| `/planning` | interne | `app/planning/page.tsx` | `app/planning/planning-client.tsx` | Planification operationnelle | Planning / autoschedule / export | clair |
| `/users` | interne | `app/users/page.tsx` | `app/users/users-list-client.tsx` (+ autres clients RH) | Gestion users/RH | Users / RH / permissions | clair |
| `/vehicles` | interne | `app/vehicles/page.tsx` | `app/vehicles/vehicles-client.tsx` | Gestion flotte | Vehicules | clair |
| `/templates` | interne | `app/templates/page.tsx` | `app/templates/templates-client.tsx` | Gestion templates shifts | Templates | clair |
| `/company` | interne | `app/company/page.tsx` | `app/company/company-profile-form.tsx` (rattachement principal) | Profil societe + regles | Societe / regles metier | partiel |
| `/depots` | interne | `app/depots/page.tsx` | `app/depots/depots-client.tsx` | Gestion depots/bases | Depots / bases | clair |
| `/onboarding` | interne | `app/onboarding/page.tsx` | `app/onboarding/onboarding-client.tsx` | Checklist pre-exploitation | Onboarding | clair |
| `/audit` | interne | `app/audit/page.tsx` | `app/audit/audit-client.tsx` | Journal d'audit | Audit | clair |
| `/privacy` | publique/info | `app/privacy/page.tsx` | INFORMATION NON FOURNIE — À CONFIRMER | Mentions d'information / privacy | Privacy / RGPD | clair |

Route structurelle detectee :
- `app/layout.tsx` (layout global) : route directe INFORMATION NON FOURNIE — À CONFIRMER, role shell/navigation global clair.

## 5. Inventaire des routes API reelles

| Route API | Fichier principal | Methode(s) detectee(s) | Module associe | Page(s) probablement liee(s) | Statut |
|---|---|---|---|---|---|
| `/api/auth/[...nextauth]` | `app/api/auth/[...nextauth]/route.ts` | INFORMATION NON FOURNIE — À CONFIRMER (handlers exportes) | Auth/session | `/login`, shell | partiel |
| `/api/audit` | `app/api/audit/route.ts` | GET | Audit | `/audit`, `/planning` | clair |
| `/api/company/profile` | `app/api/company/profile/route.ts` | PATCH | Societe | `/company`, `/onboarding` | clair |
| `/api/company/rules` | `app/api/company/rules/route.ts` | GET, PATCH | Regles metier | `/company`, `/planning` | clair |
| `/api/depots` | `app/api/depots/route.ts` | POST | Depots | `/depots` | partiel |
| `/api/depots/[id]` | `app/api/depots/[id]/route.ts` | INFORMATION NON FOURNIE — À CONFIRMER | Depots | `/depots` | a confirmer |
| `/api/depots/[id]/archive` | `app/api/depots/[id]/archive/route.ts` | INFORMATION NON FOURNIE — À CONFIRMER | Depots | `/depots` | a confirmer |
| `/api/health/prisma` | `app/api/health/prisma/route.ts` | GET | Sante technique BDD | INFORMATION NON FOURNIE — À CONFIRMER | partiel |
| `/api/imports` | `app/api/imports/route.ts` | POST | Imports | `/planning` probable | partiel |
| `/api/planning/shifts` | `app/api/planning/shifts/route.ts` | GET, POST | Planning | `/planning` | clair |
| `/api/planning/shifts/[id]` | `app/api/planning/shifts/[id]/route.ts` | INFORMATION NON FOURNIE — À CONFIRMER | Planning | `/planning` | a confirmer |
| `/api/planning/shifts/[id]/assign` | `app/api/planning/shifts/[id]/assign/route.ts` | INFORMATION NON FOURNIE — À CONFIRMER | Planning | `/planning` | a confirmer |
| `/api/planning/shifts/[id]/cancel` | `app/api/planning/shifts/[id]/cancel/route.ts` | INFORMATION NON FOURNIE — À CONFIRMER | Planning | `/planning` | a confirmer |
| `/api/planning/autoschedule/day` | `app/api/planning/autoschedule/day/route.ts` | POST | Autoschedule | `/planning` | partiel |
| `/api/planning/autoschedule/week` | `app/api/planning/autoschedule/week/route.ts` | POST | Autoschedule | `/planning` | partiel |
| `/api/planning/autoschedule/runs` | `app/api/planning/autoschedule/runs/route.ts` | GET | Autoschedule runs | `/planning` | partiel |
| `/api/planning/autoschedule/runs/[id]/**` | `app/api/planning/autoschedule/runs/[id]/*/route.ts` | INFORMATION NON FOURNIE — À CONFIRMER | Autoschedule / matching / publish | `/planning` | a confirmer |
| `/api/planning/exports` | `app/api/planning/exports/route.ts` | GET | Exports | `/planning` | partiel |
| `/api/templates` | `app/api/templates/route.ts` | GET, POST | Templates | `/templates` | clair |
| `/api/templates/[id]` + `/archive` | `app/api/templates/[id]/**/route.ts` | INFORMATION NON FOURNIE — À CONFIRMER | Templates | `/templates` | a confirmer |
| `/api/users` | `app/api/users/route.ts` | GET, POST | Users/RH | `/users` | clair |
| `/api/users/[id]/**` | `app/api/users/[id]/**/route.ts` | INFORMATION NON FOURNIE — À CONFIRMER | Users/RH | `/users` | a confirmer |
| `/api/vehicles` | `app/api/vehicles/route.ts` | GET, POST | Vehicules | `/vehicles` | clair |
| `/api/vehicles/[id]/**` | `app/api/vehicles/[id]/**/route.ts` | INFORMATION NON FOURNIE — À CONFIRMER | Vehicules | `/vehicles` | a confirmer |

## 6. Pages techniques ou secondaires detectees

- `app/page.tsx` : point d'entree technique de redirection.
- `app/layout.tsx` : layout global, navigation conditionnelle par permissions.
- `app/privacy/page.tsx` : page informationnelle (non coeur de production operationnelle).
- Routes techniques API : `/api/health/prisma`, `/api/imports`.
- Fichiers `loading.tsx`, `error.tsx`, `not-found.tsx`, `template.tsx`, `default.tsx` : INFORMATION NON FOURNIE — À CONFIRMER (non detectes dans l'etat lu).

## 7. Comparaison avec REBASAGE-23 / REBASAGE-24 / REBASAGE-25

- REBASAGE-23 confirme : la liste des routes pages detectees est coherente avec la cartographie.
- REBASAGE-24 confirme : les pages coeur et leurs rattachements modules/API principaux restent valides.
- REBASAGE-25 confirme : les dettes prioritaires `planning`, `users`, `liaisons API implicites`, `heritage MAQUETTE_DA` restent les axes avant correction.

Complements apportes par REBASAGE-26 :
- inventaire explicite des fichiers techniques detectes (`layout.tsx`, page racine) ;
- inventaire API consolidé par chemin, avec niveau de preuve des methodes ;
- identification claire des zones `a confirmer` pour methods non visibles par lecture rapide.

## 8. Routes ou pages a confirmer

- Methodes exactes de plusieurs routes dynamiques `.../[id]/...` (depots, planning runs, templates, users, vehicles).
- Couplage exact `/api/imports` avec pages consommatrices hors planning.
- Presence fonctionnelle attendue de certaines pages secondaires non listees explicitement dans REBASAGE-19 : INFORMATION NON FOURNIE — À CONFIRMER.

## 9. Proposition d'ordre d'audit page par page a partir de REBASAGE-27

1. `/login` (acces/session)
2. `/dashboard` (pivot navigation/permissions)
3. `/planning` (coeur operationnel)
4. `/users`
5. `/vehicles`
6. `/templates`
7. `/company`
8. `/depots`
9. `/onboarding`
10. `/audit`
11. `/privacy`
12. routes/pages techniques transverses (`/`, `layout`, API techniques)

## 10. Limites de l'inventaire

- Inventaire structurel uniquement, sans test runtime ni validation metier complete.
- Plusieurs methodes API restent `a confirmer` en l'absence d'analyse ligne-a-ligne exhaustive de chaque route dynamique.
- L'inventaire ne remplace ni le cadrage fonctionnel ni le plan officiel.

## 11. Recommandations pour REBASAGE-27

- Démarrer l'audit page par page sur `/login` avec verification route/page/API/doc/UI associees.
- Conserver la regle : toute zone non prouvee reste `INFORMATION NON FOURNIE — À CONFIRMER`.
- Documenter les ecarts sans corriger tant que la session reste en mode audit.

## 12. Verdicts de sortie

- REBASAGE-26 VALIDABLE : OUI
- INVENTAIRE PAGES / ROUTES CRÉÉ : OUI
- CODE MODIFIÉ : NON
- DOCUMENTS MAÎTRES MODIFIÉS : NON
- AUDITS PAGE PAR PAGE REBASAGE-27 PRÊTS : OUI
