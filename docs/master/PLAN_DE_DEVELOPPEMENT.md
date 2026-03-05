# Ambulance Manager — PLAN_DE_DEVELOPPEMENT

Version : V1.5.7 (MASTER)  
Date : 04/03/2026

## Sommaire
- [1. Règles d’exécution](#1-règles-dexécution)
- [2. Source de vérité statuts](#2-source-de-vérité-statuts)
- [3. Roadmap exécutable (4.4 → 5.0)](#3-roadmap-exécutable-44--50)
- [4. DoD minimal par phase](#4-dod-minimal-par-phase)
- [5. DoD 4.4 — Checklist officielle à cocher](#5-dod-44--checklist-officielle-à-cocher)
- [6. Risques & mitigations](#6-risques--mitigations)
- [7. Prochaine étape logique unique](#7-prochaine-étape-logique-unique)
- [Vérifications par le code (ZIP)](#vérifications-par-le-code-zip)

## 1. Règles d’exécution
- Ordre obligatoire : **Data → Services → API → UI**
- Multi-tenant strict : filtre `companyId` partout.
- Validation runtime : Zod sur inputs API.
- Sécurité : session NextAuth + RBAC + permissions.
- Format API (doc unique) : `{ ok:true, data } / { ok:false, error, details? }`
- Dates : sérialisation ISO côté client.

## 2. Source de vérité statuts
- **Statuts officiels** : `ETAT_GLOBAL_PROJET.md`
- Tous les statuts mentionnés ici s’alignent dessus (décision de pilotage 04/03/2026).

## 3. Roadmap exécutable (4.4 → 5.0)
### 3.1 Convention V1.5.7 (rattachement)
- Si des documents historiques mentionnent “4.3” : **convention V1.5.7** = rattacher “Publish UI / Refresh / DAY / Cancel / reprise runId” à **4.4 (Stabilisation)**.

### 3.2 4.4 — Stabilisation Planning
**Statut officiel : EN COURS**

Objectif : fiabiliser le cycle complet “autoschedule → draft → publish → refresh UI”.

Implémentations attendues (périmètre 4.4) :
- Publish intégré dans `/planning`
- Refresh automatique après publish
- Génération DAY depuis la grille
- Cancel run (DRAFT → CANCELLED)
- `DRAFT_ALREADY_EXISTS` : retour `runId` + reprise UI

**Gap de clôture** : tant que la **Checklist DoD 4.4** (section 5) n’est pas cochée, 4.4 reste EN COURS.

### 3.3 4.5 — Logique Métier
**Statut officiel : VALIDÉ**

### 3.4 4.6 — Pré-IA (matching)
**Statut officiel : EN COURS**

### 3.5 4.7 — Pré-version commerciale
**Statut officiel : À FAIRE**

### 3.6 5.0 — SaaS production
**Statut officiel : À FAIRE**

## 4. DoD minimal par phase
### 4.4 (EN COURS)
- Voir section 5 (DoD checklist officielle).

### 4.5 (VALIDÉ)
- Assignation observable + validations actives.
- Lint OK + Build OK.
- Zéro accès cross-tenant sur endpoints assignation.

### 4.6 (EN COURS)
- Preview renvoie un plan exploitable.
- Apply applique uniquement après preview.
- UI déclenche preview/apply et affiche résultat.
- Score qualité : à livrer avant clôture 4.6.

## 5. DoD 4.4 — Checklist officielle à cocher
> Objectif : clôturer 4.4 sans ambiguïté.  
> Tant qu’au moins un item n’est pas coché, statut = EN COURS.

### 5.1 Pré-requis (environnement)
- [ ] Procédure standardisée (max 5 lignes) pour : reset DB / migrate / seed
  1) Vérifier `.env` : `DATABASE_URL` (PostgreSQL) + `NEXTAUTH_SECRET`
  2) `npm install`
  3) `npm run db:reset`
  4) `npm run dev`
- [ ] Compte ADMIN tenant A opérationnel
- [ ] Compte ADMIN tenant B opérationnel (tests cross-tenant) — **VALIDATION NÉCESSAIRE**

### 5.2 Scénarios manuels (fonctionnels) — à documenter et exécuter
- [ ] DAY : autoschedule DAY → run DRAFT → UI `/planning` → publish → refresh UI
- [ ] WEEK : autoschedule WEEK → run DRAFT → UI `/planning` → publish → refresh UI
- [ ] Cancel : cancel run DRAFT → status = CANCELLED → UI reflète l’état
- [ ] DRAFT_ALREADY_EXISTS : relancer autoschedule → API renvoie `runId` → UI reprend le run

### 5.3 Edge cases (robustesse)
- [ ] Routes dynamiques `[id]` robustes (id extrait, pas de crash)
- [ ] Timezone/ISO : affichage cohérent vs stockage
- [ ] Templates invalides/corrompus : erreur claire, pas de corruption

### 5.4 Sécurité (tenant-safety + RBAC/permissions)
- [ ] Tenant A ne peut pas lire un run Tenant B
- [ ] Tenant A ne peut pas publish/cancel un run Tenant B
- [ ] Accès sans session : 401
- [ ] Accès sans permission : 403 (autoschedule/publish selon permission)

### 5.5 Performance minimale
Statut pour clôture 4.4 : **NON BLOQUANT** (optimisations perf prioritaires en 4.7).  
- [ ] Mesure indicative autoschedule WEEK (ex : 14 drafts) — **VALIDATION NÉCESSAIRE**
- [ ] Mesure indicative liste runs / refresh UI — **VALIDATION NÉCESSAIRE**

### 5.6 Clôture documentaire
- [ ] ETAT_GLOBAL_PROJET : 4.4 → VALIDÉ
- [ ] DOCUMENT_MAITRE/PLAN/REGISTRE alignés

## 6. Risques & mitigations
- **Fuite multi-tenant (leak `companyId`)**
  - Mitigation : filtrer `companyId` en services + endpoints ; tests A/B ; mismatch run.companyId = refus.
- **RBAC/permissions insuffisantes**
  - Mitigation : centraliser checks (role + permission) ; tests unauthorized/forbidden.
- **Corruption seed / incohérences données**
  - Mitigation : seed idempotent ; reset+migrate+seed reproductible ; variables d’env.
- **Insertions Prisma Studio non maîtrisées**
  - Mitigation : scripts Prisma dédiés ; conventions d’exploitation.
- **Edge cases temps (timezone/ISO, minuit)**
  - Mitigation : conventions ISO ; tests semaine ; affichage contrôlé UI.

## 7. Prochaine étape logique unique
Valider/Documenter/Cocher DoD 4.4 → passer 4.4 en VALIDÉ → compléter 4.6.

## Vérifications par le code (ZIP)
### ✅ Confirmé par le code
- Base format API :
  - `lib/api/response.ts`
- Matching preview/apply + UI :
  - `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
  - `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
  - `app/planning/planning-client.tsx`