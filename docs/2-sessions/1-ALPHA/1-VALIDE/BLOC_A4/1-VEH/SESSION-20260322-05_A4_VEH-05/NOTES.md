# NOTES

## Méthode / observations

- Relecture du cadrage maître et des règles de gouvernance documentaire / patchs avant toute modification.
- Vérification du constat amont `VEH-04` directement dans le code réel du ZIP.
- Constat confirmé dans l’état initial :
  - `createVehicleBodySchema` ne validait que `immatriculation` et `type` ;
  - `POST /api/vehicles` forçait `status: "ACTIVE"` ;
  - le formulaire UI ne permettait pas de saisir le statut ;
  - la page `/vehicles` exposait le formulaire de création à tout profil ayant accès au module via `canManageVehicles(...)`, alors que l’API `POST` restait réservée à `ADMIN`.
- Choix de correction retenu :
  - ne pas toucher au modèle Prisma, car `VehicleStatus` existe déjà ;
  - ne pas ouvrir l’API plus largement ;
  - masquer le formulaire aux non-admin au lieu de modifier les permissions module ;
  - conserver la chaîne existante de rafraîchissement immédiat de la liste après création.
- Aucune migration Prisma ajoutée.
- Aucun élargissement vers édition, archivage, suppression, ou rattachement base hors comportement déjà existant.
- Documentation finale mise à jour avec les validations terminales confirmées :
  - `git apply --check` : OK
  - `git apply` : OK
  - `npm run lint` : OK
  - `npm run build` : OK
