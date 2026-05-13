# EVIDENCES

Elements factuels utilises pendant la session.

---

## Documents relus

Noyau documentaire obligatoire :
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/3-templates/TEMPLATE_DEBUT_SESSION.md`

References UI/UX principales :
- `docs/2-sessions/1-ALPHA/BLOC_A21/SESSION-20260425-06_A21_UX-06/REFERENCE_UI_UX_ALPHA_V1.0.md`
- `docs/2-sessions/1-ALPHA/BLOC_A21/SESSION-20260425-07_A21_UX-07/A21-UX-07_CLOTURE_DOCUMENTAIRE_UI_UX.md`

References A22 utiles a la coherence de session :
- `docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-13_A22_UIINT-04/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-14_A22_UIINT-05/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-15_A22_UIINT-06/README_PATCH.md`
- `docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-16_A22_UIINT-07/README_PATCH.md`
- `docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-16_A22_UIINT-07/SESSION.md`

## Commandes d'application executees

### Patch principal
- `git apply --check .../SESSION-20260425-17_A22_UIINT-08.diff` : OK
- `git apply .../SESSION-20260425-17_A22_UIINT-08.diff` : OK

### Correctifs
- `git apply --check .../SESSION-20260425-17_A22_UIINT-08_FIX-01.diff` : OK
- `git apply .../SESSION-20260425-17_A22_UIINT-08_FIX-01.diff` : OK
- `git apply --check --ignore-space-change --ignore-whitespace .../SESSION-20260425-17_A22_UIINT-08_FIX-02.diff` : OK
- `git apply --ignore-space-change --ignore-whitespace .../SESSION-20260425-17_A22_UIINT-08_FIX-02.diff` : OK

## Validations terminales executees

- `npm.cmd run lint` : OK
- `npm.cmd run build` : OK
