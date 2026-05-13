# SESSION

## ID SESSION

SESSION-20260415-02_A8_PLAN-LOT-02-18

## Date

15/04/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A8 — Planning manuel  
Type : CORRECTION-COMPLÉTION  
Intitulé : Correction et/ou complétion de la vue semaine, de la vue jour, de la vraie vue mois exploitable, de la navigation mensuelle, de la lisibilité métier globale, de l’API/UI d’ajout manuel de shift, de l’API/UI de modification d’un shift publié, de l’API/UI de suppression métier / annulation logique d’un shift publié, de l’historique minimal planning et de la traçabilité des modifications après publication

## Objectif de la session

Corriger et compléter le planning manuel existant pour rendre A8 réellement exploitable sans dériver vers A9 autoschedule, en ajoutant un vrai panneau manuel jour / semaine / mois, la navigation mensuelle, les opérations métier sur shifts publiés et une traçabilité minimale consultable.

## Périmètre exact traité

- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/planning/manual-planning-panel.tsx`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/api/planning/shifts/[id]/cancel/route.ts`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/assign-draftshift.ts`
- `lib/types/planning.ts`
- `prisma/schema.prisma`
- `prisma/migrations/20260415120500_a8_manual_published_shift_management/migration.sql`

## Résultat synthétique de session

Le planning manuel A8 est rendu exploitable sur le code réel : consultation jour / semaine / mois, navigation mensuelle, ajout manuel de shift publié, modification métier d’un shift publié, annulation logique tracée, historique minimal planning et traçabilité des modifications après publication. Le bloc legacy / autoschedule restant a été isolé hors surface principale A8 dans `/planning`.

## Dossiers liés

- Session : `docs/2-sessions/1-ALPHA/BLOC_A8/SESSION-20260415-02_A8_PLAN-LOT-02-18`
- Patchs  : `docs/3-patches/1-ALPHA/BLOC_A8/SESSION-20260415-02_A8_PLAN-LOT-02-18`
