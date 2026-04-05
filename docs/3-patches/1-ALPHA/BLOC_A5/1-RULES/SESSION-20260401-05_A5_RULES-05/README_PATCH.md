# README_PATCH

## Session liée
`SESSION-20260401-05_A5_RULES-05`

## Type
COMPLÉTION

## Dossier patch
`docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-05_A5_RULES-05`

## Patch principal
### Fichier
`docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-05_A5_RULES-05/PATCH__SESSION-20260401-05_A5_RULES-05.diff`

### Objet
Mise en place d’une couche métier centrale réelle et minimale au-dessus de `CompanyRule`, sans absorber l’API finale, l’UI finale ni créer de faux comportements moteur sur les règles non branchées.

### Fichiers inclus
- `app/api/company/rules/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/planning/planning-client.tsx`
- `lib/company-rules/catalog.ts`
- `lib/company-rules/runtime.ts`
- `lib/services/planning/assign-draftshift.ts`
- `lib/services/planning/assign-shift.ts`

### Commandes d’application
```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-05_A5_RULES-05/PATCH__SESSION-20260401-05_A5_RULES-05.diff"
git apply "docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-05_A5_RULES-05/PATCH__SESSION-20260401-05_A5_RULES-05.diff"
```

## Correctif minimal `FIX-01`
### Fichier
`docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-05_A5_RULES-05/PATCH__SESSION-20260401-05_A5_RULES-05_FIX-01.diff`

### Objet
Corriger uniquement le résidu build sur `app/api/planning/autoschedule/runs/[id]/publish/route.ts` lié à `MIN_REST_RULE_KEY`, sans rejouer le patch principal ni casser la centralisation introduite par `RULES-05`.

### Commandes d’application
```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-05_A5_RULES-05/PATCH__SESSION-20260401-05_A5_RULES-05_FIX-01.diff"
git apply "docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-05_A5_RULES-05/PATCH__SESSION-20260401-05_A5_RULES-05_FIX-01.diff"
```

## Patch documentaire final
### Fichier
`docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-05_A5_RULES-05/PATCH__SESSION-20260401-05_A5_RULES-05_DOCS.diff`

## État final réel des validations
### Patch principal
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : échec initial sur `MIN_REST_RULE_KEY`

### Après `FIX-01`
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK
