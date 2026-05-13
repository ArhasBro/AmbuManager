# NOTES

Notes de travail de la session.

---

## Méthode / observations

- Relecture des documents maîtres et templates demandés avant contrôle du code.
- Vérification bornée au listing véhicules uniquement, sans ouvrir VEH-03 à VEH-17 ni A5.
- Contrôle du cadrage 07.1 : `lister les véhicules de la société`.
- Contrôle séparé de l'API de listing et de l'UI de listing.
- Constat important : la page `/vehicles` charge la liste directement via Prisma, sans passer par `GET /api/vehicles`.
- Constat important : la même fonctionnalité de listing existe donc deux fois, avec contrats proches mais non identiques.
- Le composant UI contient aussi des actions de création, rattachement base et suppression, mais elles n'ont été retenues ici qu'en simple bornage visuel.
