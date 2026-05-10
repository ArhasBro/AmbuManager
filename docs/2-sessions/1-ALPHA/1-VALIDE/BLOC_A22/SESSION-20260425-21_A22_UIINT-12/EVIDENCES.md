# EVIDENCES

Elements factuels utilises pendant la session.

---

## Sources utilisees

- Code reel ecran audit :
  - `app/audit/page.tsx`
  - `app/audit/audit-client.tsx`
- Socle UI commun :
  - `app/ui/page-header.tsx`
  - `app/ui/filter-bar.tsx`
  - `app/ui/data-table.tsx`
  - `app/ui/status-badge.tsx`
  - `app/ui/stat-card.tsx`
  - `app/ui/action-button.tsx`
  - `app/ui/error-message.tsx`
- CSS global :
  - `app/globals.css`

## Preuves terminales

### Correctif residuel lint (FIX-02)

Commande :
```bash
git apply --check "docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-21_A22_UIINT-12/PATCH/PATCH__SESSION-20260425-21_A22_UIINT-12_FIX-02.diff"
```
Sortie :
```text
EXIT:0
```

Commande :
```bash
git apply "docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-21_A22_UIINT-12/PATCH/PATCH__SESSION-20260425-21_A22_UIINT-12_FIX-02.diff"
```
Sortie :
```text
EXIT:0
```

### Lint

Commande :
```bash
npm.cmd run lint
```
Sortie :
```text
> ambulance-manager@0.1.0 lint
> eslint .
```
Statut : OK

### Build

Commande :
```bash
npm.cmd run build
```
Sortie brute (extrait representatif) :
```text
> ambulance-manager@0.1.0 build
> next build

Build error occurred
Error: Turbopack build failed with 28 errors:
./app/api/health/prisma/route.ts:2:1
Module not found: Can't resolve '@prisma/client'
...
./app/api/users/[id]/reset-password/route.ts:1:1
Module not found: Can't resolve 'bcrypt'
...
./lib/prisma.ts:4:1
Module not found: Can't resolve 'pg'
```
Statut : KO

Analyse perimetre :
- Echec sur dependances globales manquantes (`@prisma/client`, `bcrypt`, `pg`).
- Aucune erreur `app/audit/page.tsx` ou `app/audit/audit-client.tsx` n'apparait avant ces erreurs de dependances.
- Echec build hors perimetre strict UI Audit de la session.

## Information non demontree

INFORMATION NON FOURNIE — A CONFIRMER : validation visuelle navigateur capturee par screenshot utilisateur final.
