# Ambulance Manager — ETAT_GLOBAL_PROJET

Version : V1.5.7 (MASTER)  
Date : 05/03/2026

## Sommaire
- [1. Rôle](#1-rôle)
- [2. Décision de pilotage au 05/03/2026](#2-décision-de-pilotage-au-05032026)
- [3. Statut officiel par phase](#3-statut-officiel-par-phase)
- [4. 4.4 — Gap de clôture (EN COURS → VALIDÉ)](#4-44--gap-de-clôture-en-cours--validé)
- [5. Convention de rattachement (V1.5.7)](#5-convention-de-rattachement-v157)
- [6. Points à confirmer](#6-points-à-confirmer)
- [7. Prochaine étape logique unique](#7-prochaine-étape-logique-unique)
- [Vérifications par le code (ZIP)](#vérifications-par-le-code-zip)

## 1. Rôle
Document **autonome** de **statut officiel** (source de vérité).  
Les autres documents (Document maître, Plan, Registre) **s’alignent** sur ces statuts.

## 2. Décision de pilotage au 05/03/2026
Les statuts ci-dessous sont fixés par décision de pilotage au **05/03/2026** selon :
- état de livraison observable (code + flux existants),
- présence/absence de DoD formalisée,
- validations manuelles non formalisées (→ VALIDATION NÉCESSAIRE).

## 3. Statut officiel par phase
### 3.1 Socle
- **0 — Fondation SaaS** : **VALIDÉ**
- **1 — Permissions & Paramétrage entrep'** : **VALIDÉ**
- **2 — Modules “core”** : **VALIDÉ**
- **3 — Périmètre initial (Planning)** : **VALIDÉ**

### 3.2 Roadmap 4.4 → 5.0
- **4.4 — Stabilisation Planning** : **VALIDÉ**  
  Motif : DoD 4.4 cochée + preuves d’exécution consignées (session `docs/sessions/SESSION-20260304-01/EVIDENCES.md`).  
  Note : performance minimale est NON BLOQUANTE pour clôture 4.4 (priorité 4.7).

- **4.5 — Logique Métier** : **VALIDÉ**
- **4.6 — Pré-IA (matching)** : **VALIDÉ**  
  Motif : score qualité planning + explications livrés (UI) + preview renvoie `{ plan, quality }` + apply conservé, build validé.  
  Preuves : session `docs/sessions/SESSION-20260305-01/EVIDENCES.md`.
- **4.7 — Pré-version commerciale** : **À FAIRE**
- **5.0 — SaaS production** : **À FAIRE**

## 4. 4.4 — Gap de clôture (EN COURS → VALIDÉ)
4.4 est considéré **VALIDÉ** après exécution des scénarios de la DoD 4.4 et consignation des preuves dans :
- `docs/sessions/SESSION-20260304-01/EVIDENCES.md`

Éléments validés :
- Scénarios : WEEK (generate → publish → shifts visibles), CANCEL, DRAFT_ALREADY_EXISTS.
- Sécurité : 401 sans session, 403 autoschedule (viewer), 403 publish (planner), cross-tenant (A ne voit pas un run B).
- Pré-requis de test : seed multi-tenant A/B + ShiftTemplates actifs.

Performance : **NON BLOQUANT** en 4.4 (suivi indicatif seulement).

## 5. Convention de rattachement (V1.5.7)
- Si des documents historiques mentionnent “4.3” : **convention V1.5.7** = rattacher “Publish UI / Refresh / Génération DAY / Cancel / reprise runId” à **4.4 (Stabilisation)**.

## 6. Points à confirmer
- Audit/journalisation minimale : **À CONFIRMER**
- Incident Prisma Studio (ShiftTemplate.id vide) : **À CONFIRMER**

## 7. Prochaine étape logique unique
4.6 validé → commencer 4.7 (pré-version commerciale).

## Vérifications par le code (ZIP)
### ✅ Confirmé par le code
- Preview/apply matching + UI :
  - `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
  - `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
  - `app/planning/planning-client.tsx`
  - `lib/services/planning/matching.service.ts`
  - `lib/services/planning/matching-quality.ts`