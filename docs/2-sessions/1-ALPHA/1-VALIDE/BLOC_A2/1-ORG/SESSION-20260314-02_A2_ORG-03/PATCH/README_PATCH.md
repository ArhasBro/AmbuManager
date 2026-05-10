# README_PATCH

## Session liée

`SESSION-20260314-02_A2_ORG-03`

## Patch valide final de référence

`ORG-03-codehotfix-01.diff`

## Statut

Ce patch est le **seul patch valide final de référence** pour la clôture de `ORG-03`.

## Commandes d'application de référence

```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A2/1-ORG/SESSION-20260314-02_A2_ORG-03/ORG-03-codehotfix-01.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A2/1-ORG/SESSION-20260314-02_A2_ORG-03/ORG-03-codehotfix-01.diff"
```


## Vérifications finales réelles associées au patch de référence

- `git apply --check` : `OK`
- `git apply` : `OK`
- `npm run lint` : `OK`
- `npm run build` : `OK`
