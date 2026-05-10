# NOTES

## Méthode / observations

- Relecture du cadrage maître, des templates et du protocole avant toute modification.
- Vérification du socle réel du module véhicules dans le ZIP :
  - `GET /api/vehicles` existe ;
  - `POST /api/vehicles` existe ;
  - `DELETE /api/vehicles` existe ;
  - `PATCH /api/vehicles/[id]/depot` existe ;
  - aucun endpoint général `PATCH /api/vehicles/[id]` n’était présent.
- Vérification du cadrage produit : `07.3 Édition d’un véhicule` cible `gérant, admin` et couvre la modification des données véhicule.
- Choix d’implémentation retenu :
  - ajouter uniquement `PATCH /api/vehicles/[id]` ;
  - réutiliser le contrôle existant le plus cohérent du module via `canManageVehicles(...)` ;
  - limiter strictement l’édition à `immatriculation`, `type`, `status` ;
  - exclure `depotId`, déjà couvert par le flux dédié `/api/vehicles/[id]/depot` ;
  - ne pas ajouter de migration Prisma, les enums `VehicleType` et `VehicleStatus` existant déjà ;
  - conserver une traçabilité support cohérente avec le pattern déjà visible sur create/delete, sans refondre l’audit.
- Comportement volontairement retenu sur patch vide métier :
  - le body doit contenir au moins un champ éditable ;
  - si les valeurs envoyées sont identiques aux valeurs actuelles, l’API renvoie simplement l’état existant sans faux changement ni audit inutile.
- Validation terminale réelle à jour retenue pour la clôture documentaire :
  - `git apply --check` : OK ;
  - `git apply` : OK ;
  - `npm run lint` : OK ;
  - `npm run build` : OK.
