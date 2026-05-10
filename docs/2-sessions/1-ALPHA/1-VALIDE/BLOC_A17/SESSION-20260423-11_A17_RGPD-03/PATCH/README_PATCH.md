# README_PATCH

## Session liee

SESSION-20260423-11_A17_RGPD-03

## Type

VALIDATION

## Dossier PATCH

docs/2-sessions/1-ALPHA/BLOC_A17/SESSION-20260423-11_A17_RGPD-03/PATCH

## Patch officiel

PATCH__SESSION-20260423-11_A17_RGPD-03.diff

## Motif strictement justifie

Le depot et la base RGPD minimale etaient globalement validables, mais la
validation terminale `npm run test:quality` echouait sur un test statique
de `/privacy`.

Cause reelle :
- le test attendait l'apostrophe brute dans le texte source ;
- `app/privacy/page.tsx` utilise `&apos;` pour rester compatible avec le lint
  JSX ;
- ce decalage bloquait la validation de session.

## Fichier inclus dans le patch principal

- `scripts/quality/smoke-api-critical-contracts.test.mjs`

## Commandes d'application

```bash
git apply --check "docs/2-sessions/1-ALPHA/BLOC_A17/SESSION-20260423-11_A17_RGPD-03/PATCH/PATCH__SESSION-20260423-11_A17_RGPD-03.diff"
git apply         "docs/2-sessions/1-ALPHA/BLOC_A17/SESSION-20260423-11_A17_RGPD-03/PATCH/PATCH__SESSION-20260423-11_A17_RGPD-03.diff"
```

## Statut

- patch principal produit ;
- patch applique au depot ;
- validations terminales relancees ;
- aucun patch correctif `FIX-01` necessaire.
