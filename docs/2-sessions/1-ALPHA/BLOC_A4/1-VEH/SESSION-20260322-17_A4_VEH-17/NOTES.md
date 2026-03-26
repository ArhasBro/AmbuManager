# NOTES — SESSION-20260322-17_A4_VEH-17

## Méthode / observations
- Relecture du cadre documentaire maître avant contrôle du code.
- Contrôle croisé entre cadrage produit, plan de développement, état réel du dépôt, patchs réels et documentation réelle des sessions `VEH-01` à `VEH-16`.
- Vérification explicite de la chaîne A4 : listing, création, édition, archivage, suppression physique, rattachement base, affectation planning, conformité documentaire minimale, état visuel simple.
- Vérification explicite du statut du résiduel `VEH-10` à partir du code actuel et non du seul récit documentaire.
- Vérification explicite de l’effet réel des sessions `VEH-13` à `VEH-16` sur le dépôt courant.
- Tentative de validation technique locale dans l’environnement du ZIP joint.

## Observations retenues
- La chaîne de patchs A4 est globalement cohérente avec le code actuel du dépôt.
- `VEH-13` a bien réaligné l’accès véhicules utilisé par `/planning` avec `PLANNING_EDIT`, ce qui remet à niveau le résiduel permissionnel identifié en `VEH-12`.
- Le flux planning reste néanmoins dépourvu de garde-fou ou de signal réel sur un véhicule `MAINTENANCE` ou `OUT_OF_SERVICE`.
- `VEH-14`, `VEH-15` et `VEH-16` sont bien visibles dans le code courant : champs documentaires, édition UI, calcul et affichage du statut simple.
- Le résiduel `VEH-10` est toujours présent dans le code courant : suppression physique réelle côté API et action `Supprimer` côté UI.
- Une incohérence documentaire mineure existe dans `VEH-08` / `VEH-09` (libellés de clôture et de verdict croisés), sans remettre en cause la réalité du code livré pour l’archivage.
