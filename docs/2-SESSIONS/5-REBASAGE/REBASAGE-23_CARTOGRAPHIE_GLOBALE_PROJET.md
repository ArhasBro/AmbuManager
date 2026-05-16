# REBASAGE-23 — Cartographie globale repo / docs / pages / routes / APIs / maquettes

## 1. Résumé de la session

Objectif : produire une cartographie globale du projet réel (repo, docs, pages, routes, API, maquettes) avant la matrice détaillée REBASAGE-24.

Résultat : cartographie produite en lecture seule, sans correction de fond et sans modification du code applicatif.

## 2. Périmètre lu

- Gouvernance et master :
  - `docs/1-MASTER/DOCUMENT_MAITRE.md`
  - `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md`
  - `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- Rebasage :
  - `docs/2-SESSIONS/5-REBASAGE/REBASAGE_GLOBAL_ALPHA.md`
  - `docs/2-SESSIONS/5-REBASAGE/REBASAGE-18_CADRAGE_AUDIT_PAGE_PAR_PAGE.md`
  - `docs/2-SESSIONS/5-REBASAGE/REBASAGE-19_FONCTIONNALITES_PAR_PAGE.md`
  - `docs/2-SESSIONS/5-REBASAGE/REBASAGE-21_AUDIT_COHERENCE_METHODOLOGIQUE.md`
  - `docs/2-SESSIONS/5-REBASAGE/REBASAGE-22_CORRECTIONS_DOCUMENTAIRES_CIBLEES.md`
- Arborescence et code réel :
  - `app/`
  - `lib/`
  - `prisma/`
  - `docs/`
  - `components/` : INFORMATION NON FOURNIE — À CONFIRMER (dossier absent)

## 3. Structure générale du dépôt

| Zone | Chemin | Rôle réel observé | Statut |
|---|---|---|---|
| UI applicative App Router | `app/` | Pages, layouts, clients UI, routes API Next | clair |
| Composants partagés dédiés | `components/` | INFORMATION NON FOURNIE — À CONFIRMER (absent) | à confirmer |
| Logique métier et sécurité | `lib/` | Auth, permissions, services métier (planning, templates, imports, sécurité), validateurs | clair |
| Base de données | `prisma/` | Schéma, migrations, seed | clair |
| Documentation maîtres | `docs/1-MASTER/` | Cadrage produit, plan officiel, décisions, état global, index master | clair |
| Sessions et historique | `docs/2-SESSIONS/` | Historique, gouvernance sessions, rebasage, formulaires décisionnels | clair |
| Templates de session | `docs/3-TEMPLATES/` | Templates opérationnels de prompts/DoD/récap | clair |
| Archives | `docs/4-ARCHIVES/` | Archives documentaires non actives | partiel |

## 4. Cartographie des pages/routes applicatives

| Route | Fichier principal | Rôle supposé | Module fonctionnel associé | Statut compréhension |
|---|---|---|---|---|
| `/` | `app/page.tsx` | Redirection selon session vers dashboard/login | Auth / shell | clair |
| `/login` | `app/login/page.tsx` | Authentification utilisateur (credentials/next-auth) | Auth / session | clair |
| `/dashboard` | `app/dashboard/page.tsx` | Vue synthèse accès modules + KPI | Dashboard / RBAC | clair |
| `/planning` | `app/planning/page.tsx` | Consultation/édition planning + autoschedule + export | Planning | clair |
| `/users` | `app/users/page.tsx` | Gestion utilisateurs RH (CRUD, absences, rôles, rattachements) | Users / RH / permissions | clair |
| `/vehicles` | `app/vehicles/page.tsx` | Gestion flotte véhicules et rattachement dépôts | Véhicules | clair |
| `/templates` | `app/templates/page.tsx` | Gestion templates de shifts | Templates | clair |
| `/company` | `app/company/page.tsx` | Profil société + règles métier société | Société / règles métier | clair |
| `/depots` | `app/depots/page.tsx` | Gestion dépôts/bases | Dépôts / bases | clair |
| `/onboarding` | `app/onboarding/page.tsx` | Checklist de mise en route société pilote | Onboarding | clair |
| `/audit` | `app/audit/page.tsx` | Journal d’audit fonctionnel/technique | Audit | clair |
| `/privacy` | `app/privacy/page.tsx` | Mentions d’information / privacy | Privacy / RGPD | clair |

Notes UI transverses :
- CSS global et couches A24 : `app/globals.css`, `app/a24-vehicles-templates.css`, `app/a24-complementary-pages.css`, `app/a24-users-rh.css`.
- Shell applicatif : `app/layout.tsx`, `app/app-shell.tsx`, `app/providers.tsx`.

## 5. Cartographie des routes API

| Route API | Fichier principal | Module lié | Pages potentiellement consommatrices | Statut |
|---|---|---|---|---|
| `/api/auth/[...nextauth]` | `app/api/auth/[...nextauth]/route.ts` | Auth/session NextAuth | `/login`, shell global | clair |
| `/api/audit` | `app/api/audit/route.ts` | Audit | `/audit`, `/planning` (lecture contextuelle) | partiel |
| `/api/company/profile` | `app/api/company/profile/route.ts` | Société profil | `/company`, `/onboarding` | clair |
| `/api/company/rules` | `app/api/company/rules/route.ts` | Règles métier société | `/company`, `/planning` | clair |
| `/api/depots` | `app/api/depots/route.ts` | Dépôts/bases | `/depots`, `/users`, `/vehicles` | clair |
| `/api/depots/[id]` + `/archive` | `app/api/depots/[id]/route.ts`, `.../archive/route.ts` | Dépôts/bases | `/depots` | clair |
| `/api/users` | `app/api/users/route.ts` | Users/RH | `/users` | clair |
| `/api/users/[id]` (+ absences/archive/depot/reset-password) | `app/api/users/**/route.ts` | Users/RH | `/users` | clair |
| `/api/vehicles` | `app/api/vehicles/route.ts` | Véhicules | `/vehicles` | clair |
| `/api/vehicles/[id]` (+ archive/depot) | `app/api/vehicles/**/route.ts` | Véhicules | `/vehicles` | clair |
| `/api/templates` | `app/api/templates/route.ts` | Templates | `/templates` | clair |
| `/api/templates/[id]` + `/archive` | `app/api/templates/**/route.ts` | Templates | `/templates` | clair |
| `/api/planning/shifts` + sous-routes id/assign/cancel | `app/api/planning/shifts/**/route.ts` | Planning opérationnel | `/planning` | clair |
| `/api/planning/autoschedule/**` | `app/api/planning/autoschedule/**/route.ts` | Autoschedule / matching / runs | `/planning` | partiel |
| `/api/planning/exports` | `app/api/planning/exports/route.ts` | Exports planning | `/planning` | clair |
| `/api/imports` | `app/api/imports/route.ts` | Imports | `/planning` (et potentiellement autres) | à confirmer |
| `/api/health/prisma` | `app/api/health/prisma/route.ts` | Santé technique BDD | INFORMATION NON FOURNIE — À CONFIRMER | partiel |

## 6. Cartographie des documents de référence

| Domaine | Documents principaux | Rôle | Statut |
|---|---|---|---|
| Cadre produit officiel | `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md` | Référence produit validée | exploitable |
| Principes globaux | `docs/1-MASTER/DOCUMENT_MAITRE.md` | Règles non négociables et orientation | exploitable |
| Planification officielle | `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md` | Seul plan officiel | exploitable |
| État/decisions | `ETAT_GLOBAL_PROJET.md`, `REGISTRE_DECISIONS.md`, `RECAP_DISCUSSIONS.md` | Synthèse/traçabilité décisionnelle | partiel |
| Index master | `docs/1-MASTER/_INDEX_MASTER.md` | Porte d’entrée docs master | exploitable |
| Support rebasage | `docs/2-SESSIONS/5-REBASAGE/REBASAGE-18...` `REBASAGE-19...` `REBASAGE-21...` `REBASAGE-22...` | Méthode et support temporaire | exploitable |
| Suivi central rebasage | `docs/2-SESSIONS/5-REBASAGE/REBASAGE_GLOBAL_ALPHA.md` | Journal de séquence du chantier | exploitable |
| Gouvernance sessions | `_INDEX_SESSIONS.md`, `GOUVERNANCE_SESSIONS.md`, checklists/decision/forms | Cadre de lecture historique | exploitable |

## 7. Cartographie des maquettes / références UI/UX

| Chemin | Type | Pages concernées (supposées) | Statut |
|---|---|---|---|
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_LOGIN.md` | Référence UI | Login | exploitable |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_DASHBOARD.md` | Référence UI | Dashboard | exploitable |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_A25_PLANNING.md` | Référence UI | Planning | exploitable |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_USERS_RH.md` | Référence UI | Users/RH | exploitable |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_VEHICLES.md` | Référence UI | Véhicules | exploitable |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_TEMPLATES.md` | Référence UI | Templates | exploitable |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_COMPANY.md` | Référence UI | Société | exploitable |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_DEPOTS_BASES.md` | Référence UI | Dépôts/bases | exploitable |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_ONBOARDING.md` | Référence UI | Onboarding | exploitable |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_AUDIT.md` | Référence UI | Audit | exploitable |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_PRIVACY.md` | Référence UI | Privacy | exploitable |
| `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_SHELL_GLOBAL.md` | Référence UI | Shell global | exploitable |
| `docs/1-MASTER/2-REFERENCE_UI_UX/MATRICE_CANONIQUE_UI_UX.md` | Matrice UI/UX | Lien pages ↔ maquettes ↔ routes | exploitable |
| `docs/1-MASTER/1-MAQUETTE/MAQUETTES_FONDATRICES_IMAGES_V1.0/**` | PNG maquettes | Dashboard, Planning, Users/RH, Véhicules | exploitable |
| `docs/1-MASTER/1-MAQUETTE/MAQUETTES_COMPLEMENTAIRES_IMAGES_V1.0/**` | PNG maquettes | Templates, Société, Dépôts, Onboarding, Audit | exploitable |
| `docs/1-MASTER/1-MAQUETTE/PAGES_SIMPLES_FINITIONS_IMAGE_V1.0/**` | PNG maquettes | Login, Privacy | exploitable |

## 8. Premières incohérences ou zones à confirmer

### Bloquant
- INFORMATION NON FOURNIE — À CONFIRMER

### Important
- Héritage massif de chemins `MAQUETTE_DA` dans des sessions historiques (`docs/2-SESSIONS/1-ALPHA/**`) alors que la structure active de maquettes est `docs/1-MASTER/1-MAQUETTE/**`.
- Dossier `components/` absent : pas bloquant immédiat, mais dette de structuration UI partagée.

### Amélioration
- Plusieurs routes API ont des méthodes/sous-comportements non cartographiables depuis l’index seul sans audit ligne à ligne approfondi (statut `partiel`).
- Imports/exports et health-check ont un rattachement fonctionnel page-à-page encore partiel.

### À confirmer
- Couverture explicite API pour certaines pages simples (ex: `privacy`) : INFORMATION NON FOURNIE — À CONFIRMER.
- Correspondance exhaustive module ↔ page pour fonctionnalités non UI directes (matching, sécurité fine, RGPD détaillé) : INFORMATION NON FOURNIE — À CONFIRMER.

### Plus tard
- Clarification finale des traces historiques A24/A25/A26 pour éviter toute confusion opérationnelle pendant les futures sessions de production.

## 9. Limites de la cartographie

- Session volontairement non corrective : aucune validation de conformité métier finale n’est prononcée.
- Lecture ciblée de cartographie : pas d’audit exhaustif ligne à ligne de toutes les routes API.
- Les statuts `partiel` et `à confirmer` signalent un besoin d’approfondissement en REBASAGE-24.

## 10. Recommandations pour REBASAGE-24

1. Créer la matrice détaillée `page / fonctionnalités / code / documentation / maquette` à partir de cette cartographie.
2. Prioriser les pages cœur : `login`, `dashboard`, `planning`, `users`, `vehicles`, `templates`, `company`, `depots`.
3. Pour chaque page prioritaire, rattacher explicitement les routes API consommées et le statut fonctionnel (présent/partiel/absent).
4. Isoler les zones `INFORMATION NON FOURNIE — À CONFIRMER` pour validation Nathan avant toute correction.

## 11. Verdicts de sortie

- REBASAGE-23 VALIDABLE : OUI
- CARTOGRAPHIE GLOBALE CRÉÉE : OUI
- CODE MODIFIÉ : NON
- DOCUMENTS MAÎTRES MODIFIÉS : NON
- MATRICE REBASAGE-24 PRÊTE À ÊTRE PRÉPARÉE : OUI
