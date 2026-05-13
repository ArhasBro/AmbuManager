# README_PATCH

## Session liée
`SESSION-20260407-03_A6_TPL-03`

## Type
CORRECTION

## Dossier patch
`docs/3-patches/1-ALPHA/BLOC_A6/SESSION-20260407-03_A6_TPL-03`

## Patch officiel code
- `PATCH__SESSION-20260407-03_A6_TPL-03.diff`

## Patch documentaire final
- `PATCH__SESSION-20260407-03_A6_TPL-03_DOCS.diff`

## Commandes d'application
```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A6/SESSION-20260407-03_A6_TPL-03/PATCH__SESSION-20260407-03_A6_TPL-03.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A6/SESSION-20260407-03_A6_TPL-03/PATCH__SESSION-20260407-03_A6_TPL-03.diff"

# Patch documentaire final fourni : commande disponible si tu veux l'appliquer côté dépôt
# git apply --check "docs/3-patches/1-ALPHA/BLOC_A6/SESSION-20260407-03_A6_TPL-03/PATCH__SESSION-20260407-03_A6_TPL-03_DOCS.diff"
# git apply         "docs/3-patches/1-ALPHA/BLOC_A6/SESSION-20260407-03_A6_TPL-03/PATCH__SESSION-20260407-03_A6_TPL-03_DOCS.diff"
```

## Portée exacte
### Patch principal
Le patch principal :
- ajoute une migration SQL de correction minimale ;
- ne touche ni l’API templates, ni l’UI templates, ni les champs métier `TPL-09+`.

### Patch documentaire final
Le patch documentaire final :
- met à jour `SESSION.md`
- met à jour `NOTES.md`
- met à jour `EVIDENCES.md`
- met à jour `RESULTATS.md`
- met à jour `FIN_SESSION.md`
- met à jour `README_PATCH.md`

## État réel validé
- patch principal : **présent**
- patch documentaire final : **présent / fourni**
- `git apply --check` patch principal : **OK**
- `git apply` patch principal : **OK**
- `npx prisma validate` : **OK**
- `npm run lint` : **OK**
- `npm run build` : **OK**
- contrôle d’applicabilité local du patch documentaire final : **INFORMATION NON FOURNIE — À CONFIRMER**

## Conclusion
La session `TPL-03` ne crée aucun enrichissement produit.
Elle corrige uniquement un défaut relationnel multi-tenant resté ouvert entre `ShiftTemplate`, `DraftShift` et `Shift`.
