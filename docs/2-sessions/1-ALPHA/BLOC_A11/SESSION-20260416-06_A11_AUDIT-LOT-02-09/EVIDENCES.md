# EVIDENCES

## Sources de référence retenues
- documents maîtres A11 déjà relus dans la session ;
- patch principal retenu `PATCH__SESSION-20260416-06_A11_AUDIT-LOT-02-09.diff` ;
- correctifs finaux retenus `FIX-03` et `FIX-04` ;
- état terminal final fourni pour la finalisation documentaire.

## État final retenu pour la documentation
### Patch principal
- `git apply --check` : **OK**
- `git apply` : **OK**
- `npx prisma generate` : **OK**
- `npx prisma validate` : **OK**
- `npm run lint` : **OK**
- `npm run build` : **OK**

### `FIX-03`
- `git apply --check` : **OK**
- `git apply` : **OK**
- `npm run lint` après `FIX-03` : **OK**
- `npm run build` après `FIX-03` : **KO** sur `canViewAudit` manquant dans `planning-client.tsx`

### `FIX-04`
- `git apply --check` : **OK**
- `git apply` : **OK**
- `npm run lint` après `FIX-04` : **OK**
- `npm run build` après `FIX-04` : **OK**

## Résultat fonctionnel retenu
### Livré et retenu
- audit des connexions persistant ;
- lecture audit dédiée minimale ;
- page dédiée audit minimale ;
- protection cohérente de `includeHistory=1` ;
- correction TypeScript de `resolveRunMatchingVariant(...)` ;
- correction de build sur `canViewAudit` manquant dans `PlanningClient(...)`.

### Non suraffirmé
- audit utilisateurs complet ;
- audit véhicules complet ;
- audit dépôts complet ;
- généralisation complète du modèle audit à tout le bloc A11.
