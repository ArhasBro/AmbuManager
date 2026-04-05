# README_PATCH

## Session liée
`SESSION-20260401-08_A5_RULES-08`

## Type
COMPLÉTION

## Dossier patch
`docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-08_A5_RULES-08`

## Chaîne finale officielle retenue
1. `PATCH__SESSION-20260401-08_A5_RULES-08.diff`
2. `PATCH__SESSION-20260401-08_A5_RULES-08_DOCS.diff`
3. `PATCH__SESSION-20260401-08_A5_RULES-08_DOCS_FIX-01.diff`

## Patch principal
### Fichier
`docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-08_A5_RULES-08/PATCH__SESSION-20260401-08_A5_RULES-08.diff`

### Objet
Encadrer minimalement la délégation du droit de modification des règles métier dans le module utilisateurs existant, en réservant aux comptes natifs `ADMIN` / `GERANT` la création ou la promotion de comptes donnant accès natif aux règles ainsi que l’attribution / le retrait de `COMPANY_RULES_MANAGE`.

### Fichiers inclus
- `app/api/users/route.ts`
- `app/api/users/[id]/route.ts`
- `app/users/page.tsx`
- `app/users/user-creation-client.tsx`
- `app/users/user-edit-client.tsx`
- `lib/company-rules/governance.ts`

### Commandes d’application
```powershell
git apply --check ".\docs\3-patches\1-ALPHA\BLOC_A5\1-RULES\SESSION-20260401-08_A5_RULES-08\PATCH__SESSION-20260401-08_A5_RULES-08.diff"
git apply ".\docs\3-patches\1-ALPHA\BLOC_A5\1-RULES\SESSION-20260401-08_A5_RULES-08\PATCH__SESSION-20260401-08_A5_RULES-08.diff"
```

## Patch documentaire final
### Fichier
`docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-08_A5_RULES-08/PATCH__SESSION-20260401-08_A5_RULES-08_DOCS.diff`

### Objet
Consigner les faits prouvés, le périmètre, le verdict et les validations finales de la session.

## Correctif documentaire minimal
### Fichier
`docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-08_A5_RULES-08/PATCH__SESSION-20260401-08_A5_RULES-08_DOCS_FIX-01.diff`

### Objet
Corriger les validations terminales finales dans la documentation et supprimer les mentions erronées d’une limite environnementale sur `lint` / `build`.

## État final réel des validations retenues
- `git apply --check ".\docs\3-patches\1-ALPHA\BLOC_A5\1-RULES\SESSION-20260401-08_A5_RULES-08\PATCH__SESSION-20260401-08_A5_RULES-08.diff"` : OK
- `git apply ".\docs\3-patches\1-ALPHA\BLOC_A5\1-RULES\SESSION-20260401-08_A5_RULES-08\PATCH__SESSION-20260401-08_A5_RULES-08.diff"` : OK
- `npm run lint` : OK
- `npm run build` : OK
