# README_PATCH

## Session liée
SESSION-20260416-02_A10_MATCH-LOT-02-09

## Type
CORRECTION-COMPLÉTION

## Dossier patch
`docs/3-patches/1-ALPHA/BLOC_A10/SESSION-20260416-02_A10_MATCH-LOT-02-09`

## Patch officiel
- `PATCH__SESSION-20260416-02_A10_MATCH-LOT-02-09.diff`

## Correctif séparé
- `PATCH__SESSION-20260416-02_A10_MATCH-LOT-02-09_FIX-01.diff`

## Objet du patch
Patch minimal de correction/complétion du matching A10 pour livrer sur code réel :
- variantes simples 1 / 2 / 3 ;
- score qualité visible au niveau run ;
- score qualité visible au niveau shift ;
- intégration UI minimale de ces compléments ;
- conservation de la logique existante d’équilibrage de charge, de composition minimale d’équipe, de véhicules requis et du bornage multi-tenant.

Le correctif minimal `FIX-01` complète ce patch principal pour :
- réaligner la variante calculée au niveau run sur la dernière variante appliquée prouvable dans l’audit existant, avec fallback strict `VARIANT_1` ;
- réaligner le libellé de `VARIANT_2` avec le comportement réel basé sur un ordre stable par identifiant.

## Fichiers applicatifs inclus dans le patch
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/planning/planning-client.tsx`
- `lib/services/planning/matching.service.ts`
- `lib/services/planning/matching-quality.ts`

## Commandes d’application

```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A10/SESSION-20260416-02_A10_MATCH-LOT-02-09/PATCH__SESSION-20260416-02_A10_MATCH-LOT-02-09.diff"
git apply "docs/3-patches/1-ALPHA/BLOC_A10/SESSION-20260416-02_A10_MATCH-LOT-02-09/PATCH__SESSION-20260416-02_A10_MATCH-LOT-02-09.diff"
git apply --check "docs/3-patches/1-ALPHA/BLOC_A10/SESSION-20260416-02_A10_MATCH-LOT-02-09/PATCH__SESSION-20260416-02_A10_MATCH-LOT-02-09_FIX-01.diff"
git apply "docs/3-patches/1-ALPHA/BLOC_A10/SESSION-20260416-02_A10_MATCH-LOT-02-09/PATCH__SESSION-20260416-02_A10_MATCH-LOT-02-09_FIX-01.diff"
```

## Validations réellement exécutées

Validations terminales réelles prouvées pour la session :
- `git apply --check` : OK
- `git apply` : OK
- `npx prisma generate` : OK
- `npx prisma validate` : OK
- `npm run lint` : OK
- `npm run build` : OK

## Statut
- Patch principal produit : **OUI**
- Patch correctif séparé : **OUI**
