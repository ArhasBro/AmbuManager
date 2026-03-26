# NOTES

## Méthode / observations

- Relecture préalable du cadrage maître, des templates, du protocole et des sources autorisées.
- Vérification du contexte amont réel dans le ZIP :
  - l’API `POST /api/vehicles/[id]/archive` existe déjà réellement ;
  - le service `archiveVehicle(...)` existe déjà réellement ;
  - le flux standard ne remonte déjà plus les véhicules archivés ;
  - la page `/vehicles` n’expose pas encore l’action UI d’archivage ;
  - la suppression physique existe encore via `DELETE /api/vehicles`.
- Choix d’implémentation retenu pour rester strictement sur `VEH-09` :
  - modifier uniquement `app/vehicles/vehicles-client.tsx` ;
  - ajouter un bouton `Archiver` dans la liste existante ;
  - appeler strictement l’endpoint existant `POST /api/vehicles/[id]/archive` ;
  - ne pas détourner `status` pour représenter l’archivage ;
  - ne pas créer de vue des archivés ni d’UI de restauration ;
  - ne pas rouvrir le backend de `VEH-08` ;
  - ne pas refondre la suppression physique existante, hors coexistence UI minimale.
- Comportement local retenu après succès :
  - retrait immédiat du véhicule de la liste active ;
  - suppression de son entrée dans `selectedDepotIds` ;
  - fermeture du formulaire d’édition s’il était ouvert sur ce véhicule ;
  - affichage d’un message de succès.
- Robustesse locale minimale ajoutée :
  - état d’archivage ciblé par véhicule ;
  - désactivation de l’action d’archivage pendant une autre action concurrente sur la même ligne ;
  - désactivation temporaire des contrôles d’édition / base pendant l’archivage du véhicule concerné.

## Validation terminale réelle finale

- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK
