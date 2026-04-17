# EVIDENCES.md

## Éléments de preuve retenus
### Patchs validés
- `PATCH__SESSION-20260416-10_A12_A12-LOT-02-15.diff`
- `PATCH__SESSION-20260416-10_A12_A12-LOT-02-15_FIX-01.diff`
- `PATCH__SESSION-20260416-10_A12_A12-LOT-02-15_FIX-02.diff`

### Périmètre prouvé par le code livré
- onboarding dédié via dashboard + page `/onboarding`
- import initial simple réel pour :
  - users
  - vehicles
  - templates
  - depots
  - user absences
- preview d’import réelle
- validation manuelle d’import réelle
- rapport d’erreurs import réel
- exports planning réels :
  - PDF
  - XLSX
  - CSV
- impression simple réelle
- permission `PLANNING_EXPORT` réellement branchée

## Validations terminales finales retenues
Les validations terminales finales à retenir pour cette session sont celles validées par le contrôle qualité :

```powershell
git apply --check ".\\docs\\3-patches\\1-ALPHA\\BLOC_A12\\SESSION-20260416-10_A12_A12-LOT-02-15\\PATCH__SESSION-20260416-10_A12_A12-LOT-02-15.diff"
git apply ".\\docs\\3-patches\\1-ALPHA\\BLOC_A12\\SESSION-20260416-10_A12_A12-LOT-02-15\\PATCH__SESSION-20260416-10_A12_A12-LOT-02-15.diff"
git apply --check ".\\docs\\3-patches\\1-ALPHA\\BLOC_A12\\SESSION-20260416-10_A12_A12-LOT-02-15\\PATCH__SESSION-20260416-10_A12_A12-LOT-02-15_FIX-01.diff"
git apply ".\\docs\\3-patches\\1-ALPHA\\BLOC_A12\\SESSION-20260416-10_A12_A12-LOT-02-15\\PATCH__SESSION-20260416-10_A12_A12-LOT-02-15_FIX-01.diff"
git apply --check ".\\docs\\3-patches\\1-ALPHA\\BLOC_A12\\SESSION-20260416-10_A12_A12-LOT-02-15\\PATCH__SESSION-20260416-10_A12_A12-LOT-02-15_FIX-02.diff"
git apply ".\\docs\\3-patches\\1-ALPHA\\BLOC_A12\\SESSION-20260416-10_A12_A12-LOT-02-15\\PATCH__SESSION-20260416-10_A12_A12-LOT-02-15_FIX-02.diff"
npm run lint
npm run build
```

## Résultats finaux validés
- `git apply --check` : `OK`
- `git apply` : `OK`
- `npm run lint` : `OK`
- `npm run build` : `OK`

## Verdict contrôlé retenu
- `SESSION A12-LOT-02-15 VALIDABLE EN L’ÉTAT : OUI`
- `ONBOARDING MANUEL COMPLET PROUVÉ : OUI`
- `IMPORT INITIAL SIMPLE PROUVÉ : OUI`
- `EXPORTS PLANNING ALPHA PROUVÉS : OUI`
- `IMPRESSION SIMPLE PROUVÉE : OUI`
- `PLANNING_EXPORT RÉELLEMENT BRANCHÉE : OUI`
