# NOTES

## Méthode / observations

- Relecture préalable du cadrage maître, des templates, du protocole et des sources autorisées.
- Vérification du contexte amont réel dans le ZIP :
  - création véhicule déjà présente côté UI (`VEH-05`) ;
  - API d’édition générale déjà présente côté backend (`VEH-06`) ;
  - flux base `/api/vehicles/[id]/depot` déjà séparé ;
  - page `/vehicles` déjà existante avec liste + création + base + suppression.
- Choix d’implémentation retenu pour rester strictement sur `VEH-07` :
  - ne modifier que `app/vehicles/vehicles-client.tsx` ;
  - ne pas toucher `page.tsx` ni le backend ;
  - ajouter une édition inline au niveau de chaque véhicule, sans nouveau routage ni refonte de page ;
  - garder `depotId` hors formulaire d’édition générale ;
  - réutiliser le contrat API existant de `VEH-06` ;
  - mettre à jour la liste locale à partir de la réponse de l’API.
- États UI réellement ajoutés :
  - formulaire d’édition prérempli ;
  - bouton `Enregistrer modifications` avec état `Enregistrement...` ;
  - bouton `Annuler` ;
  - message global d’erreur ;
  - message global de succès.
- Aucune modification Prisma, aucune migration, aucun élargissement vers l’archivage ou le rattachement base.

## Validation terminale réelle à jour

- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK
