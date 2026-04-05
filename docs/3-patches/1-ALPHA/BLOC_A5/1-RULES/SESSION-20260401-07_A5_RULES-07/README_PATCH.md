# README_PATCH

## Session liée
`SESSION-20260401-07_A5_RULES-07`

## Type
COMPLÉTION

## Dossier patch
`docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-07_A5_RULES-07`

## Chaîne finale officielle retenue
1. `PATCH__SESSION-20260401-07_A5_RULES-07.diff`

## Patch principal
### Fichier
`docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-07_A5_RULES-07/PATCH__SESSION-20260401-07_A5_RULES-07.diff`

### Objet
Ajouter une UI paramètres métier ALPHA lisible sur la page société existante, branchée sur l’API `company rules` réelle, sans rejouer `RULES-05` / `RULES-06`, sans changer les permissions, sans ajouter de nouveau moteur et sans absorber `RULES-08` / `RULES-09`.

### Fichiers inclus
- `app/company/page.tsx`
- `app/company/company-rules-panel.tsx`

### Commandes d’application
```powershell
git apply --check ".\docs\3-patches\1-ALPHA\BLOC_A5\1-RULES\SESSION-20260401-07_A5_RULES-07\PATCH__SESSION-20260401-07_A5_RULES-07.diff"
git apply ".\docs\3-patches\1-ALPHA\BLOC_A5\1-RULES\SESSION-20260401-07_A5_RULES-07\PATCH__SESSION-20260401-07_A5_RULES-07.diff"
```

## Patch documentaire final
### Fichier
`docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-07_A5_RULES-07/PATCH__SESSION-20260401-07_A5_RULES-07_DOCS.diff`

## État final réel des validations retenues
### Application du patch principal
- `git apply --check ".\docs\3-patches\1-ALPHA\BLOC_A5\1-RULES\SESSION-20260401-07_A5_RULES-07\PATCH__SESSION-20260401-07_A5_RULES-07.diff"` : OK
- `git apply ".\docs\3-patches\1-ALPHA\BLOC_A5\1-RULES\SESSION-20260401-07_A5_RULES-07\PATCH__SESSION-20260401-07_A5_RULES-07.diff"` : OK

### Validation terminale finale sur repo équipé
- `npm run lint` : OK
- `npm run build` : OK
