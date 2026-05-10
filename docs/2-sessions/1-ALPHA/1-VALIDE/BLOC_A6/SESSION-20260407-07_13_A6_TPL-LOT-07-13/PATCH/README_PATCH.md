# README_PATCH

## Lot concerné
`SESSION-20260407-07_13_A6_TPL-LOT-07-13`

## Chaîne de patchs retenue
1. `PATCH__SESSION-20260407-07_13_A6_TPL-LOT-07-13.diff`
2. `PATCH__SESSION-20260407-07_13_A6_TPL-LOT-07-13_FIX-01.diff`
3. `PATCH__SESSION-20260407-07_13_A6_TPL-LOT-07-13_FIX-02.diff`

## État final à retenir
Le lot doit être considéré dans l’état obtenu après application du patch principal puis des deux correctifs minimaux `FIX-01` et `FIX-02`.

Le présent README couvre uniquement l’état final validé du lot, sans réouverture du périmètre ni ajout de nouveau patch code.

## Validations finales retenues
- `git apply --check` : OK
- `git apply` : OK
- `npx prisma validate` : OK
- `npx prisma generate` : OK
- `npm run lint` : OK
- `npm run build` : OK

## Portée documentaire
Ce README accompagne la documentation finale unique du lot et doit être lu avec :
- `SESSION.md`
- `NOTES.md`
- `EVIDENCES.md`
- `RESULTATS.md`
- `FIN_SESSION.md`

## Contraintes respectées
- aucune modification code ;
- aucun nouveau patch code ;
- aucune réouverture du lot ;
- aucune documentation sous forme de patch ;
- ZIP final livré à plat.
