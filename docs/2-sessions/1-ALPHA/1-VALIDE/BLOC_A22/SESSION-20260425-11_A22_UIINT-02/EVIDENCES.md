# EVIDENCES

## Patch principal

```bash
git apply --check "docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-11_A22_UIINT-02/PATCH/SESSION-20260425-11_A22_UIINT-02.diff"
# Resultat: OK

git apply "docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-11_A22_UIINT-02/PATCH/SESSION-20260425-11_A22_UIINT-02.diff"
# Resultat: OK
```

## Validation terminale

```bash
npm.cmd run lint
# > ambulance-manager@0.1.0 lint
# > eslint .
# Resultat: OK

npm.cmd run build
# > ambulance-manager@0.1.0 build
# > next build
# ✓ Compiled successfully
# ✓ Generating static pages ...
# Route (app) inclut notamment: /dashboard /planning /users /vehicles /templates /company /depots /onboarding /audit /login /privacy
# Resultat: OK
```

## Preuve coherence liens navigation -> pages existantes

```text
Href        PagePath                Exists
/dashboard  app/dashboard/page.tsx    True
/planning   app/planning/page.tsx     True
/users      app/users/page.tsx        True
/vehicles   app/vehicles/page.tsx     True
/templates  app/templates/page.tsx    True
/company    app/company/page.tsx      True
/depots     app/depots/page.tsx       True
/onboarding app/onboarding/page.tsx   True
/audit      app/audit/page.tsx        True
```

## Fichiers code modifies

- `app/layout.tsx`
- `app/app-shell.tsx`

## Fichier patch produit

- `docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-11_A22_UIINT-02/PATCH/SESSION-20260425-11_A22_UIINT-02.diff`
