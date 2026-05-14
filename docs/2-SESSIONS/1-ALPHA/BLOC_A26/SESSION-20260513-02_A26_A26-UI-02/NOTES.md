# NOTES

## Méthode

- Phase 1 : production code Shell + validations techniques (`lint`, `build`) + patchs.
- Phase 2 : documentation uniquement après autorisation explicite Nathan.
- Pas de refonte métier, pas de modification API/Prisma/RBAC/services métier.

## Chronologie utile

1. Réalignement Shell global connecté (sidebar, topbar, conteneur, labels, déconnexion non primaire).
2. Ajustement fluidité responsive multi-écrans du conteneur principal.
3. Écart post-correctif détecté manuellement par Nathan : bas de sidebar non entièrement visible en 1920×1080.
4. Correctif ciblé appliqué : scroll interne de navigation sidebar, bas de sidebar (Thème + carte utilisateur) restant visible/atteignable.
5. Validation manuelle Nathan complète 1920×1080 + 2560×1440.

## Contraintes respectées

- Aucun `zoom` CSS.
- Aucun `transform: scale()`.
- Aucune correction métier.
- Aucune capture automatique.
- Aucun ZIP généré.

## Décision de référence patch

Le patch de référence final de session est `PATCH__SESSION-20260513-02_A26_A26-UI-02_FINAL_VALIDABLE.diff`.
Les patchs précédents sont conservés pour traçabilité mais ne sont pas la source finale à appliquer.