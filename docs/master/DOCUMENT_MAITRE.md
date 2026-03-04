# Ambulance Manager — DOCUMENT_MAITRE

Version : V1.5.7 (MASTER)  
Date : 04/03/2026

## Sommaire
- [1. Vision du projet](#1-vision-du-projet)
- [2. Principes non négociables](#2-principes-non-négociables)
- [3. Architecture technique cible](#3-architecture-technique-cible)
- [4. Stack technologique](#4-stack-technologique)
- [5. Modélisation des données (Prisma)](#5-modélisation-des-données-prisma)
- [6. Conventions API (format unique)](#6-conventions-api-format-unique)
- [7. Modules fonctionnels (périmètre)](#7-modules-fonctionnels-périmètre)
- [8. Roadmap technique 4.4 → 5.0 (statuts alignés)](#8-roadmap-technique-44--50-statuts-alignés)
- [9. Phases Alpha / Beta / Versions](#9-phases-alpha--beta--versions)
- [10. Décisions techniques validées](#10-décisions-techniques-validées)
- [11. Points en attente](#11-points-en-attente)
- [12. Prochaine étape logique unique](#12-prochaine-étape-logique-unique)
- [13. Incidents & corrections connus](#13-incidents--corrections-connus)
- [14. Procédure de reprise standard](#14-procédure-de-reprise-standard)
- [15. Commandes & arborescence (références)](#15-commandes--arborescence-références)
- [Vérifications par le code (ZIP)](#vérifications-par-le-code-zip)

## 1. Vision du projet
Ambulance Manager est une plateforme SaaS destinée à la gestion opérationnelle d’une société de transport sanitaire (planning, flotte, conformité, traçabilité). L’objectif est de fournir un outil métier robuste qui limite les erreurs tout en restant **100% paramétrable par entreprise**.

## 2. Principes non négociables
- **Multi-tenant strict** via `companyId`.
- **Aucune donnée métier prédéfinie** (templates, gardes, horaires).
- **Architecture obligatoire** : **Data → Services → API → UI**.
- **Règles entreprise** : `CompanyRule` en modes **OFF / ALERT / BLOCK / BOTH**.
- **Sécurité** : session NextAuth + RBAC + permissions, côté serveur.

## 3. Architecture technique cible
### 3.1 Couches (ordre de travail obligatoire)
- **Data (Prisma)** : schéma unique, migrations propres, index multi-tenant.
- **Services (`lib/services/*`)** : logique métier.
- **API (`app/api/*`)** : handlers fins (Zod + sécurité + délégation services).
- **UI (`app/*`)** : consommation API, aucun accès direct Prisma.

## 4. Stack technologique
- Next.js (App Router)
- TypeScript strict
- Prisma 7 + PostgreSQL (**adapter PG**)
- NextAuth Credentials (JWT) avec session enrichie (`role` + `companyId`)
- Zod (validation runtime)

## 5. Modélisation des données (Prisma)
### 5.1 Modèles identifiés (schéma Prisma)
- `Company`
- `User`
- `Permission`, `UserPermission`
- `CompanyRule`
- `ShiftTemplate`
- `Vehicle`
- `AutoScheduleRun`
- `DraftShift`
- `Shift`
- `MaintenanceType`

### 5.2 Notes de stabilité (data)
- Incident “données corrompues via Prisma Studio (ex : id vide)” : **DOCUMENTÉ — À CONFIRMER** (rapporté dans les récapitulatifs, pas de guard explicite retrouvé).

## 6. Conventions API (format unique)
Format unique attendu (et à utiliser dans toute la documentation) :
- **Succès** : `{ ok:true, data }`
- **Erreur** : `{ ok:false, error, details? }`

> Note : certaines routes historiques peuvent encore renvoyer des variantes (ex : `message`). Harmonisation à maintenir dans les prochaines sessions.

## 7. Modules fonctionnels (périmètre)
### 7.1 Fondation SaaS
- Auth (NextAuth Credentials)
- Multi-tenant strict
- Format réponses API standardisées
- Sérialisation dates (ISO côté client)

### 7.2 Paramétrage entreprise
- `CompanyRule` (OFF/ALERT/BLOCK/BOTH)
- `ShiftTemplate` paramétrable par entreprise

### 7.3 Véhicules (factuel code)
**CRUD partiel confirmé** :
- `GET/POST/DELETE /api/vehicles` via `app/api/vehicles/route.ts`

UI confirmée :
- Page : `app/vehicles/page.tsx`
- Client : `app/vehicles/VehiclesClient.tsx`
- Form : `app/vehicles/AddVehicleForm.tsx`

Le reste (PUT/PATCH, détails avancés, conformité flotte) : **À CONFIRMER / non présent comme module complet**.

### 7.4 Planning — Autoschedule (Jour/Semaine) + Runs + Drafts + Publish
- Génération **DAY/WEEK** → `AutoScheduleRun` + `DraftShift`
- Runs : list/read/cancel/publish
- `DRAFT_ALREADY_EXISTS` : retour `runId` pour reprise UI

### 7.5 Planning — Assignation (Logique métier)
- Assignation sur `DraftShift` et/ou `Shift`
- Validations : conflits user/véhicule + repos minimum via règle entreprise

### 7.6 Planning — Pré-IA (matching)
- Matching preview/apply par rôle requis (confirmé)
- Score qualité planning : **À CONFIRMER** (objectif explicite ; non identifié comme calcul complet)

## 8. Roadmap technique 4.4 → 5.0 (statuts alignés)
> **Source de vérité statuts : `ETAT_GLOBAL_PROJET.md`** (décision de pilotage 04/03/2026).

### 8.1 4.4 — Stabilisation Planning
**Statut : EN COURS**

Items visés :
- Publish intégré dans `/planning`
- Refresh automatique après publish
- Génération DAY depuis la grille
- Cancel run (DRAFT → CANCELLED)
- `DRAFT_ALREADY_EXISTS` : retour `runId` + reprise UI

Gap de clôture : voir **PLAN_DE_DEVELOPPEMENT → DoD 4.4 (Checklist officielle)**.

### 8.2 4.5 — Logique Métier
**Statut : VALIDÉ**

### 8.3 4.6 — Pré-IA (matching)
**Statut : EN COURS**

### 8.4 4.7 — Pré-version commerciale
**Statut : À FAIRE**

### 8.5 5.0 — SaaS production
**Statut : À FAIRE**

### Convention de rattachement (V1.5.7)
- Si des documents historiques mentionnent “4.3” : **convention V1.5.7** = rattacher “Publish UI / Refresh / DAY / Cancel / reprise runId” à **4.4 (Stabilisation)**.

## 9. Phases Alpha / Beta / Versions
- **Alpha** : stabiliser le cœur planning (autoschedule + publish + UI + logique métier essentielle).
- **Beta** : enrichir vers 4.6/4.7 avant 5.0.
- **MASTER** : référentiel documentaire unique (V1.5.7).

## 10. Décisions techniques validées
- Multi-tenant strict `companyId`.
- Architecture **Data → Services → API → UI**.
- `CompanyRule` (OFF/ALERT/BLOCK/BOTH).
- Format API `{ ok:true, data } / { ok:false, error, details? }`.
- Dates : sérialisation ISO côté client.
- `DRAFT_ALREADY_EXISTS` renvoie `runId`.

Permissions confirmées par le seed actuel :
- `PLANNING_AUTOSCHEDULE`
- `PLANNING_AUTOSCHEDULE_PUBLISH`

Autres permissions historiquement citées (ex : `PLANNING_EDIT`, `RULES_EDIT`, `FLEET_EDIT`, `USERS_MANAGE`) : **À CONFIRMER / non présentes dans le seed actuel**.

## 11. Points en attente
- Clôture officielle 4.4 via DoD + scénarios (checklist à cocher).
- Règles avancées planning : à planifier.
- Score qualité planning (4.6) : à implémenter.
- Flotte & conformité : à modéliser/implémenter.
- Audit/logging : définir niveau minimal et implémenter (actuellement “audit futur” commenté).

## 12. Prochaine étape logique unique
Clôturer 4.4 via **PLAN_DE_DEVELOPPEMENT → DoD 4.4 (Checklist officielle)**.  
**La session suivante est dédiée à la validation DoD 4.4 (exécution + documentation des scénarios), pas à du dev feature.**  
Ensuite seulement : compléter 4.6 (score qualité + explications UI).

## 13. Incidents & corrections connus
- Routes dynamiques `[id]` : fallback extraction id via `req.nextUrl.pathname` (présent sur routes runs).
- Données corrompues via Prisma Studio : documenté — **À CONFIRMER**.
- Adapter PG : **documenté dans les récapitulatifs + confirmé par le code** (présence d’un setup adapter/driver côté Prisma).

## 14. Procédure de reprise standard
1. Fixer version + phase (ex : V1.5.7, 4.4 EN COURS).
2. Vérifier migrations Prisma + seed.
3. Contrôler tenant-safety (filtres `companyId`) sur endpoints touchés.
4. Travailler : Data → Services → API → UI.
5. Valider par résultat observable + lint/build.

## 15. Commandes & arborescence (références)
### 15.1 Commande tree (Windows)
- `tree /F /A > structure.txt`

## Vérifications par le code (ZIP)
### ✅ Confirmé par le code
- Vehicles :
  - `app/api/vehicles/route.ts` (GET/POST/DELETE)
  - `app/vehicles/page.tsx`
  - `app/vehicles/VehiclesClient.tsx`
  - `app/vehicles/AddVehicleForm.tsx`
- Format API helpers :
  - `lib/api/response.ts` (helpers `ok(...)` / `err(...)`, base du format)
- Sérialisation dates ISO :
  - `lib/serializers.ts` (fonction `serializeDates`)
- Planning matching preview/apply + UI :
  - `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
  - `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
  - `app/planning/planning-client.tsx`
  - `lib/services/planning/matching.service.ts`

### ⚠️ Documenté mais non vérifié dans le code
- Incident Prisma Studio “ShiftTemplate.id vide” : documenté, pas de guard explicite repéré.
- Score qualité planning : objectif explicite, non identifié comme complet.

### ❌ Non retrouvé / à confirmer
- Audit effectif (écritures DB/logs structurés) : non retrouvé ; “audit futur” commenté dans services d’assignation.
- Modules flotte & conformité : non présents en modèles dédiés.
- Exports PDF/CSV, historique/versioning planning (4.7) : non retrouvés comme modules complets.
- Billing/observabilité/onboarding (5.0) : non retrouvés.