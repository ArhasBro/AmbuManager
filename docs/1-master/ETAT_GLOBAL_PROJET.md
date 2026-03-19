# Ambulance Manager — ETAT_GLOBAL_PROJET

Version : V1.5.8 (MASTER)  
Date : 19/03/2026

## Sommaire
- [1. Rôle](#1-rôle)
- [2. Décision de pilotage au 06/03/2026](#2-décision-de-pilotage-au-06032026)
- [3. Décision de pilotage au 09/03/2026](#3-décision-de-pilotage-au-09032026)
- [4. Décision de pilotage au 19/03/2026](#4-décision-de-pilotage-au-19032026)
- [5. Statut officiel par phase](#5-statut-officiel-par-phase)
- [6. 4.4 — Gap de clôture (EN COURS → VALIDÉ)](#6-44--gap-de-clôture-en-cours--validé)
- [7. Convention de rattachement (V1.5.8)](#7-convention-de-rattachement-v158)
- [8. Points à confirmer](#8-points-à-confirmer)
- [9. Prochaine étape logique unique](#9-prochaine-étape-logique-unique)
- [Vérifications par le code (ZIP)](#vérifications-par-le-code-zip)

## 1. Rôle
Document **autonome** de **statut officiel** (source de vérité).  
Les autres documents (Document maître, Plan, Registre) **s’alignent** sur ces statuts.

## 2. Décision de pilotage au 06/03/2026
Les statuts ci-dessous sont fixés par décision de pilotage au **06/03/2026** selon :
- état de livraison observable (code + flux existants),
- présence/absence de DoD formalisée,
- validations manuelles non formalisées (→ VALIDATION NÉCESSAIRE).

## 3. Décision de pilotage au 09/03/2026
- `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md` est validé comme base officielle produit.
- Ce document est figé et ne doit pas être modifié sans validation explicite.
- Pour la suite, ne pas revenir sur ce cadrage sans demande explicite.
- La prochaine étape attendue est la refonte du plan de développement.
- Cette refonte devra respecter strictement :
  - 1 session = 1 point clair
  - 1 fonctionnalité
  - 1 patch
  - 1 DoD
  - 1 validation

## 4. Décision de pilotage au 19/03/2026
- chaque bloc du plan doit désormais se terminer par une session dédiée de clôture de bloc ;
- cette session contrôle le code réel, les patchs réels, la documentation finale et les validations terminales ;
- cette session rend un verdict explicite de clôture définitive ;
- si un résiduel subsiste, un unique correctif final minimal peut être produit avant verdict ;
- aucun passage au bloc suivant n’est autorisé sans verdict explicite de clôture.

Conséquence immédiate de pilotage :
- avant toute ouverture du bloc suivant après A2, une session `CLOTURE_A2` doit exister et rendre le verdict :
  - `BLOC A2 CLÔTURABLE DÉFINITIVEMENT : OUI`
  - ou `BLOC A2 CLÔTURABLE DÉFINITIVEMENT : NON`

## 5. Statut officiel par phase
### 4.1 Socle
- **0 — Fondation SaaS** : **VALIDÉ**
- **1 — Permissions & Paramétrage entrep'** : **VALIDÉ**
- **2 — Modules “core”** : **VALIDÉ**
- **3 — Périmètre initial (Planning)** : **VALIDÉ**

### 4.2 Roadmap 4.4 → 5.0
- **4.4 — Stabilisation Planning** : **VALIDÉ**  
  Motif : DoD 4.4 cochée + preuves d’exécution consignées (session `docs/sessions/SESSION-20260304-01/EVIDENCES.md`).  
  Note : performance minimale est NON BLOQUANTE pour clôture 4.4 (priorité 4.7).

- **4.5 — Logique Métier** : **VALIDÉ**
- **4.6 — Pré-IA (matching)** : **VALIDÉ**  
  Motif : score qualité planning + explications livrés (UI) + preview renvoie `{ plan, quality }` + apply conservé, build validé.  
  Preuves : session `docs/sessions/SESSION-20260305-01/EVIDENCES.md`.
- **4.7 — Pré-version commerciale** : **EN COURS**  
  Motif : 4.7.1 — traçabilité planning minimale validée + 4.7.2 — consultation minimale de l’audit planning validée (lecture API du run courant + affichage UI read-only dans `/planning`).  
  Preuves : sessions `docs/sessions/SESSION-20260306-01/EVIDENCES.md` et `docs/sessions/SESSION-20260307-01/EVIDENCES.md`.
- **Le cadrage fonctionnel produit** : **VALIDÉ**  
  Motif : `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md` validé comme base officielle produit.
- **Refonte du plan de développement** : **VALIDÉE**
  Motif : le plan maître intègre désormais une étape finale de clôture explicite pour chaque bloc.
- **Clôture méthodologique de bloc** : **VALIDÉE**
  Motif : règle de clôture de bloc décidée le 19/03/2026 et reportée dans les documents maîtres et templates.
- **5.0 — SaaS production** : **À FAIRE**

## 6. 4.4 — Gap de clôture (EN COURS → VALIDÉ)
4.4 est considéré **VALIDÉ** après exécution des scénarios de la DoD 4.4 et consignation des preuves dans :
- `docs/sessions/SESSION-20260304-01/EVIDENCES.md`

Éléments validés :
- Scénarios : WEEK (generate → publish → shifts visibles), CANCEL, DRAFT_ALREADY_EXISTS.
- Sécurité : 401 sans session, 403 autoschedule (viewer), 403 publish (planner), cross-tenant (A ne voit pas un run B).
- Pré-requis de test : seed multi-tenant A/B + ShiftTemplates actifs.

Performance : **NON BLOQUANT** en 4.4 (suivi indicatif seulement).

## 7. Convention de rattachement (V1.5.8)
- Si des documents historiques mentionnent “4.3” : **convention V1.5.8** = rattacher “Publish UI / Refresh / Génération DAY / Cancel / reprise runId” à **4.4 (Stabilisation)**.

## 8. Points à confirmer
- Suite 4.7 hors 4.7.2 : **INFORMATION NON FOURNIE — À CONFIRMER**
- Incident Prisma Studio (ShiftTemplate.id vide) : **À CONFIRMER**
- Les points restant réellement ouverts du cadrage fonctionnel demeurent portés par `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md`.

## 9. Prochaine étape logique unique
La prochaine étape logique unique, avant tout passage de `A2` vers `A3`, est l’exécution de la **session dédiée de clôture de bloc `CLOTURE_A2`**, avec verdict explicite de clôture définitive.

## Vérifications par le code (ZIP)
### ✅ Confirmé par le code
- Preview/apply matching + UI :
  - `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
  - `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
  - `app/planning/planning-client.tsx`
  - `lib/services/planning/matching.service.ts`
  - `lib/services/planning/matching-quality.ts`
- Audit planning minimal (4.7.1) :
  - `prisma/schema.prisma`
  - `prisma/migrations/20260306221500_add_planning_audit_log/migration.sql`
  - `lib/services/planning/planning-audit.ts`
  - `app/api/planning/autoschedule/day/route.ts`
  - `app/api/planning/autoschedule/week/route.ts`
  - `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
  - `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`
  - `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
  - `lib/services/planning/assign-draftshift.ts`
  - `lib/services/planning/assign-shift.ts`
- Consultation minimale audit run (4.7.2) :
  - `app/api/planning/autoschedule/runs/[id]/route.ts`
  - `app/planning/planning-client.tsx`