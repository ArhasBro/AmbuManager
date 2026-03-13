# Patches — Phase 4.6

Ce dossier contient les patchs (`.diff`) rattachés au bloc **4.6 — Pré-IA (matching)**.

## Patches présents

- `SESSION-20260305-01__4.6__planning-quality-score_v1.diff`
  - Statut : REMPLACÉ
- `SESSION-20260305-01__4.6__planning-quality-score-v2.diff`
  - Statut : REMPLACÉ
- `SESSION-20260305-01__4.6__planning-quality-score-v3.diff`
  - Statut : PRÊT (rejouable confirmé)  
  - Statut remote (PUSH) : INFORMATION NON FOURNIE — À CONFIRMER

## Objectif du patch V3

- Livrer le **score qualité planning** + **explications** (UI) et faire remonter `{ plan, quality }` côté preview.
- Assurer la compatibilité build Next.js (routes `[id]`).

## Fichiers impactés (V3)

- `lib/services/planning/matching-quality.ts`
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
- `app/planning/planning-client.tsx`

## Application

Depuis la racine du projet :

```bash
git apply -p1 --check docs/patches/4.6/SESSION-20260305-01__4.6__planning-quality-score-v3.diff
git apply -p1       docs/patches/4.6/SESSION-20260305-01__4.6__planning-quality-score-v3.diff