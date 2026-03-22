# NOTES

Notes de travail de la session.

---

## Méthode / observations

1. Relecture des documents maîtres et du protocole avant toute conclusion.
2. Audit limité au module véhicules réel et à ses dépendances strictement nécessaires.
3. Vérification explicite des points demandés : listing, création, rattachement base, édition, archivage logique, suppression physique.
4. Bornage simple du lien planning/véhicules sans ouvrir VEH-12 / VEH-13.
5. Tentative de validations terminales `npm run lint` puis `npm run build`.

## Observations structurantes

- Le code contredit le statut documentaire ancien sur le rattachement véhicule ↔ base : la fonctionnalité est bien visible dans le dépôt audité.
- Le champ `Vehicle.isActive` existe dans le schéma mais n’est pas exploité comme mécanisme d’archivage du module véhicules.
- La suppression exposée côté UI et API est une suppression physique réelle, pas un archivage logique.
- Le module planning consomme déjà `vehicleId`, mais son audit détaillé reste hors périmètre de VEH-01.
