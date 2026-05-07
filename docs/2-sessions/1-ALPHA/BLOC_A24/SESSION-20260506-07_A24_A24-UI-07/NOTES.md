# NOTES — SESSION-20260506-07_A24_A24-UI-07

## Notes de production assistée
Le dépôt local réel n'est pas accessible depuis cet environnement. La production est limitée à la lecture GitHub `main` et à la génération d'un patch exploitable par `git apply`.

## Décision technique
- Ajout d'une feuille dédiée `app/a24-complementary-pages.css`.
- Import dans `app/layout.tsx` après les feuilles A24 existantes.
- Aucune modification métier, API, Prisma, RBAC ou client de données.

## Limite importante
Le patch est basé sur l'état GitHub `main`. Si A24-UI-05/A24-UI-06 ont été validées localement mais non poussées, l'applicabilité exacte doit être confirmée localement.
