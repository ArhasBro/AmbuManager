# SESSION

## Identité du lot
- Projet : Investissement
- Sous-projet : Ambulance Manager
- Version cible : `1-ALPHA`
- Bloc : `A6 — Shift templates`
- Lot : `SESSION-20260407-07_13_A6_TPL-LOT-07-13`
- Type : `COMPLÉTION`

## Sessions couvertes
- `TPL-07` — API désactivation / archivage template
- `TPL-08` — UI gestion des templates
- `TPL-09` — Composition minimale d’équipe
- `TPL-10` — Type de véhicule requis
- `TPL-11` — Nombre minimal de personnes requis
- `TPL-12` — Support des shifts non horodatés
- `TPL-13` — Couleurs libres et lisibilité visuelle

## Livrables code validés
- Patch principal : `PATCH__SESSION-20260407-07_13_A6_TPL-LOT-07-13.diff`
- Correctif 1 : `PATCH__SESSION-20260407-07_13_A6_TPL-LOT-07-13_FIX-01.diff`
- Correctif 2 : `PATCH__SESSION-20260407-07_13_A6_TPL-LOT-07-13_FIX-02.diff`

## Objet du lot
Livrer un module templates minimalement administrable et cohérent avec le cadrage, sans rouvrir `TPL-14` ni `CLOTURE_A6`, avec conservation d’un périmètre strictement borné au lot `TPL-07` à `TPL-13`.

## Résultat final
Le lot est validé avec le patch principal et deux correctifs minimaux successifs. L’état final retenu est celui du code après application de :
1. `PATCH__SESSION-20260407-07_13_A6_TPL-LOT-07-13.diff`
2. `PATCH__SESSION-20260407-07_13_A6_TPL-LOT-07-13_FIX-01.diff`
3. `PATCH__SESSION-20260407-07_13_A6_TPL-LOT-07-13_FIX-02.diff`
