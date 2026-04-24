# README_PATCH

## Session liee

SESSION-20260423-10_A17_RGPD-LOT-02

## Type

CORRECTION+COMPLETION

## Dossier PATCH

docs/2-sessions/1-ALPHA/BLOC_A17/SESSION-20260423-10_A17_RGPD-LOT-02/PATCH

## Patch officiel

PATCH__SESSION-20260423-10_A17_RGPD-LOT-02.diff

## Perimetre du patch principal

Le patch principal contient uniquement :
- le code reel du depot modifie dans le perimetre RGPD ;
- la doc produit `docs/1-master/RGPD_BASE_MINIMALE.md` ;
- la page applicative `/privacy` ;
- les tests statiques associes.

Le patch principal n'inclut pas :
- les fichiers `.md` de session ;
- les fichiers hors perimetre A17 ;
- `docs/CMD.md` deja modifie hors session.

## Fichiers inclus

- app/api/users/route.ts
- app/api/users/[id]/route.ts
- app/api/users/[id]/reset-password/route.ts
- app/api/users/[id]/absences/route.ts
- app/api/users/[id]/absences/[absenceId]/route.ts
- app/login/page.tsx
- app/privacy/page.tsx
- lib/services/audit/personal-data-audit.ts
- lib/services/users/archive-user.ts
- lib/services/users/assign-user-depot.ts
- lib/services/users/user-absence.ts
- scripts/quality/smoke-api-critical-contracts.test.mjs
- docs/1-master/RGPD_BASE_MINIMALE.md

## Commandes d'application

```bash
git apply --check "docs/2-sessions/1-ALPHA/BLOC_A17/SESSION-20260423-10_A17_RGPD-LOT-02/PATCH/PATCH__SESSION-20260423-10_A17_RGPD-LOT-02.diff"
git apply         "docs/2-sessions/1-ALPHA/BLOC_A17/SESSION-20260423-10_A17_RGPD-LOT-02/PATCH/PATCH__SESSION-20260423-10_A17_RGPD-LOT-02.diff"
```

## Statut

- patch principal produit ;
- patch applique au depot ;
- validations terminales relancees ;
- aucun patch correctif `FIX-01` necessaire.
