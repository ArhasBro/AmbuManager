# README_PATCH

## Session liée
`SESSION-20260407-05_A6_TPL-05`

## Type
COMPLÉTION

## Dossier patch
`docs/3-patches/1-ALPHA/BLOC_A6/SESSION-20260407-05_A6_TPL-05`

## Patch officiel code
- `PATCH__SESSION-20260407-05_A6_TPL-05.diff`

## Patch documentaire final
- non retenu pour cette session
- livrable documentaire fourni en **ZIP à plat** : `SESSION-20260407-05_A6_TPL-05_DOCS.zip`

## Commandes d'application
```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A6/SESSION-20260407-05_A6_TPL-05/PATCH__SESSION-20260407-05_A6_TPL-05.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A6/SESSION-20260407-05_A6_TPL-05/PATCH__SESSION-20260407-05_A6_TPL-05.diff"
```

## Portée exacte
Le patch principal :
- ajoute `POST /api/templates` dans la route existante ;
- conserve le `GET /api/templates` livré précédemment ;
- valide strictement les champs autorisés du modèle actuel ;
- force l’usage du `companyId` de session ;
- gère `INVALID_JSON`, `VALIDATION_ERROR` et le conflit d’unicité ;
- n’ajoute ni UI, ni update, ni archive, ni champs métier futurs.

## État réel validé localement
- `git apply --check` : **OK**
- `git apply` : **OK**
- `npm run lint` : **OK**
- `npm run build` : **OK**

## Conclusion
`TPL-05` livre bien le point demandé : une API réelle de création templates, cloisonnée par société, gouvernée correctement et sans élargissement de scope.
Le patch est applicable proprement. Le lint et le build sont validés.
