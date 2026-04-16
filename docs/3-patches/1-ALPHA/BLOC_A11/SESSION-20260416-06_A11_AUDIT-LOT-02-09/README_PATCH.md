# README_PATCH

## Session
`SESSION-20260416-06_A11_AUDIT-LOT-02-09`

## Patch principal retenu
`PATCH__SESSION-20260416-06_A11_AUDIT-LOT-02-09.diff`

## Correctifs retenus pour finalisation
- `PATCH__SESSION-20260416-06_A11_AUDIT-LOT-02-09_FIX-03.diff`
- `PATCH__SESSION-20260416-06_A11_AUDIT-LOT-02-09_FIX-04.diff`

## Correctifs abandonnés / non retenus
- `PATCH__SESSION-20260416-06_A11_AUDIT-LOT-02-09_FIX-01.diff`
- `PATCH__SESSION-20260416-06_A11_AUDIT-LOT-02-09_FIX-02.diff`

## Objet réel retenu
Correction-complétion A11 strictement bornée à :
- ajout d’un audit des connexions persistant ;
- ajout d’une lecture audit dédiée minimale ;
- ajout d’une page dédiée audit minimale ;
- protection cohérente de la lecture d’historique planning ;
- ouverture minimale de l’accès audit au support global ;
- amélioration partielle de la traçabilité après publication ;
- correction TypeScript dans `resolveRunMatchingVariant(...)` ;
- correction de build sur `canViewAudit` manquant dans `PlanningClient(...)`.

## Périmètre réellement retenu
- `prisma/schema.prisma`
- `prisma/migrations/20260416143000_add_login_audit_log/migration.sql`
- `lib/services/audit/login-audit.ts`
- `lib/auth.ts`
- `lib/permissions.ts`
- `app/api/audit/route.ts`
- `app/audit/page.tsx`
- `app/audit/audit-client.tsx`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/cancel/route.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`

## Validations terminales finales retenues
### Patch principal
- `git apply --check` : **OK**
- `git apply` : **OK**
- `npx prisma generate` : **OK**
- `npx prisma validate` : **OK**
- `npm run lint` : **OK**
- `npm run build` : **OK**

### Correctifs retenus
#### `FIX-03`
- `git apply --check` : **OK**
- `git apply` : **OK**
- `npm run lint` : **OK**
- `npm run build` : **KO** sur `canViewAudit` manquant dans `app/planning/planning-client.tsx`

#### `FIX-04`
- `git apply --check` : **OK**
- `git apply` : **OK**
- `npm run lint` : **OK**
- `npm run build` : **OK**

## Limites explicitement conservées
- lecture audit et page dédiée audit : **minimales** ;
- audit utilisateurs / véhicules / dépôts complet : **non suraffirmé / non prouvé comme livré complètement** ;
- session traitée comme **CORRECTION-COMPLÉTION**, et non comme validation de bloc.
