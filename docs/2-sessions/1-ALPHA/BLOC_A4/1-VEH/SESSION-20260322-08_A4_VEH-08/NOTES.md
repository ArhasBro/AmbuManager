# NOTES

## Méthode / observations

- Relecture préalable du cadrage maître, des templates, du protocole et des sources autorisées.
- Vérification du contexte amont réel dans le ZIP :
  - listing véhicule déjà présent ;
  - création déjà présente ;
  - suppression physique toujours présente ;
  - édition API/UI déjà livrées ;
  - aucun endpoint dédié d’archivage logique véhicule n’était présent.
- Vérification du modèle réel : `Vehicle.isActive` existe déjà ; aucune migration Prisma n’est nécessaire.
- Vérification du pattern projet déjà utilisé pour l’archivage logique :
  - `POST /api/depots/[id]/archive` ;
  - `POST /api/users/[id]/archive` ;
  - service dédié + route dédiée + réponse sérialisée.
- Choix d’implémentation retenu pour rester strictement sur `VEH-08` :
  - ajouter uniquement un endpoint dédié `POST /api/vehicles/[id]/archive` ;
  - créer un service dédié `archiveVehicle(...)` ;
  - ne pas détourner `status` pour l’archivage ;
  - ne pas rouvrir l’UI d’archivage (`VEH-09`) ;
  - ne pas toucher à Prisma ni aux migrations ;
  - ne pas supprimer physiquement le véhicule dans ce flux.
- Alignement strict minimal réalisé sur le flux standard :
  - `GET /api/vehicles` ne renvoie plus les véhicules archivés ;
  - `app/vehicles/page.tsx` n’hydrate plus la page avec des véhicules archivés après rafraîchissement.
- Contrôle d’accès retenu : `canManageVehicles(...)`, cohérent avec le module, sans élargissement de droits.
- Idempotence retenue : si le véhicule est déjà archivé, le service retourne l’état existant sans nouvelle écriture.

## Validation terminale réelle finale

- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK
