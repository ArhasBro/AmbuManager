# README PATCH — SUP-05

## Session liée
SESSION-20260318-05_A2_SUP-05

## Périmètre
Patch strictement limité à la traçabilité renforcée des actions support.

## Contenu du patch code
- ajout du helper `lib/services/audit/support-action-trace.ts`
- journalisation conditionnelle via `PlanningAuditLog`
- transmission de l’acteur support depuis les routes vers les services
- traçage des mutations Users / Vehicles / Depots ciblées par la session

## Garanties
- aucun changement auth / NextAuth
- aucun changement RBAC global
- aucun changement UI
- aucun changement Prisma schema
- aucun système d’audit avancé complet
- aucune extension vers SUP-04 ou SUP-06

## Patch exportable
- fichier : `SUP-05.diff`

## Commandes d’application
```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A2/3-SUP/SESSION-20260318-05_A2_SUP-05/SUP-05.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A2/3-SUP/SESSION-20260318-05_A2_SUP-05/SUP-05.diff"
```

## Validation réelle associée au patch
- `git apply --check SUP-05.diff` : OK
- `git apply SUP-05.diff` : OK
- `npx prisma validate` : OK
- `npx prisma generate` : OK
- `npm run lint` : OK
- `npm run build` : OK

## Statut final
Le patch SUP-05 est documenté comme `conforme`.
