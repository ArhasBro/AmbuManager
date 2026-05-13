# NOTES

## Méthode / observations
1. Relecture préalable des documents maîtres et des règles méthodologiques requises.
2. Contrôle ciblé du code réellement branché sur `CompanyRule` et `RuleMode`.
3. Relecture de l’audit `RULES-03` pour repartir des écarts déjà prouvés, sans extrapolation.
4. Sélection de deux défauts seulement, car ils sont à la fois réels, actuels et corrigeables sans élargissement de périmètre.
5. Clôture documentaire finale réalisée sans rejouer le patch principal et sans réutiliser le patch documentaire intermédiaire.

## Défauts finalement retenus
### 1. Valeur invalide non traitée de façon homogène
Dans `assign-shift` et `assign-draftshift`, une valeur invalide de `PLANNING_MIN_REST_HOURS` désactivait de fait la règle silencieusement.

Dans `publish`, la même situation renvoyait déjà `RULE_CONFIG_ERROR`.

Décision de correction :
- conserver `OFF` comme désactivation explicite ;
- conserver l’absence de règle comme désactivation ;
- transformer la valeur invalide en erreur explicite sur les flux manuels aussi.

### 2. Alerte manuelle calculée mais perdue
Les services manuels produisaient déjà des `issues`, notamment `MIN_REST_VIOLATION` en mode `ALERT` / `BOTH`, mais la route API ne les renvoyait pas et l’UI affichait toujours un succès générique.

Décision de correction :
- exposer `issues` dans la réponse succès de la route d’affectation ;
- afficher un message de succès enrichi lorsqu’une alerte de repos minimum est présente ;
- rendre aussi les cas `RULE_BLOCKED` et `RULE_CONFIG_ERROR` lisibles côté UI.

## Points volontairement non traités ici
- pas de refonte globale du module A5 ;
- pas d’ajout de nouvelles clés `CompanyRule` ;
- pas d’alignement complet du calcul manuel avec la timeline adjacente complète du publish ;
- pas de nouvelle UI dédiée d’administration des règles métier ;
- pas de rejouage du patch principal validé à l’intégration.
