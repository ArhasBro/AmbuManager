# NOTES — SESSION-20260322-12_A4_VEH-12

## Méthode / observations
- Relecture du cadre documentaire maître avant contrôle du code.
- Contrôle borné au flux d’affectation véhicule → planning existant, sans audit global du planning.
- Lecture croisée API + services + page `/planning` + source de données véhicules + permissions.
- Vérification explicite de la distinction `DraftShift` / `Shift`.
- Vérification explicite de la possibilité réelle d’affecter, modifier et retirer un véhicule.
- Vérification explicite des garde-fous : appartenance société, conflits véhicule, conflits utilisateur, absences, règle de repos minimum, permissions.
- Vérification de la validation technique réellement exécutable dans le ZIP joint.

## Observations retenues
- Le backend est plus avancé que l’UI visible sur `/planning`.
- Le nom `assignOnDraftShift` dans `planning-client.tsx` est trompeur : l’UI standard agit sur les éléments chargés depuis `/api/planning/shifts`, donc sur des `Shift` publiés affichés, pas sur une liste manuelle de `DraftShift`.
- Les `DraftShift` du run sont bien récupérables via `GET /api/planning/autoschedule/runs/[id]`, mais la page n’en fait qu’un usage de compteur / audit, sans surface claire d’édition manuelle véhicule dans le flux standard.
- Le chargement de la liste véhicules dépend d’un droit `VEHICLES_MANAGE`, alors que l’édition planning dépend de `PLANNING_EDIT`.
- Le statut véhicule n’est pas exploité comme garde-fou dans l’affectation auditée.
