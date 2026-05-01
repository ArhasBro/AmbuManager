# SESSION

## ID SESSION

SESSION-20260425-19_A22_UIINT-10

## Date

2026-05-01

## Contexte

Projet : Ambulance Manager  
Stage : 1-ALPHA  
Bloc : A22 - Integration UI/UX  
Type : CORRECTION+COMPLETION  
Intitule : Company / Depots : harmonisation UI des pages societe et depots

## Objectif unique de la session

Harmoniser uniquement l'UI des pages Company/Societe et Depots avec le socle UI commun A21/A22, sans modifier la logique metier.

## Perimetre exact traite

- `app/company/page.tsx`
- `app/company/company-profile-form.tsx`
- `app/company/company-rules-panel.tsx`
- `app/depots/page.tsx`
- `app/depots/depots-client.tsx`
- `app/globals.css` (ajouts CSS cibles company/depots)

## Perimetre explicitement exclu (respecte)

- Prisma, migrations, seed
- API routes, logique metier serveur
- RBAC, auth, permissions, multi-tenant
- navigation globale / shell global
- modules hors Company/Depots

## Decision de session

PATCH
