# README_PATCH

## Session liée
`SESSION-20260407-04_A6_TPL-04`

## Type
COMPLÉTION

## Dossier patch
`docs/3-patches/1-ALPHA/BLOC_A6/SESSION-20260407-04_A6_TPL-04`

## Patch officiel code
- `PATCH__SESSION-20260407-04_A6_TPL-04.diff`

## Patch documentaire final
- non retenu pour cette session
- livrable documentaire fourni en **ZIP à plat** : `SESSION-20260407-04_A6_TPL-04_DOCS.zip`

## Commandes d'application
```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A6/SESSION-20260407-04_A6_TPL-04/PATCH__SESSION-20260407-04_A6_TPL-04.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A6/SESSION-20260407-04_A6_TPL-04/PATCH__SESSION-20260407-04_A6_TPL-04.diff"
```

## Portée exacte
Le patch principal :
- ajoute la route `GET /api/templates` ;
- ajoute un helper runtime minimal `canManageTemplates(...)` ;
- n’ajoute ni création, ni modification, ni archivage, ni UI templates ;
- n’ajoute aucun champ métier template.

## État réel validé localement
- `git apply --check` : **OK**
- `git apply` : **OK**
- `npm run lint` : **OK**
- `npm run build` : **OK**
- `/api/templates` apparaît bien dans le build

## Conclusion
`TPL-04` livre bien le point demandé : une API réelle de liste templates, cloisonnée par société et gouvernée proprement.
La validation locale prouvée couvre l’application du patch, le lint et le build.
