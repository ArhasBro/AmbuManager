# NOTES — SESSION-20260322-04_A4_VEH-04

## Constat principal
La création véhicule existe réellement, mais elle n’est pas totalement homogène avec le besoin `07.2`.

## Points prouvés par le code
- `POST /api/vehicles` existe.
- Le schéma Zod valide `immatriculation` et `type`.
- Le `status` est imposé côté serveur à `ACTIVE`.
- Le formulaire UI existe réellement.
- Le client appelle bien `POST /api/vehicles` puis ajoute le véhicule retourné dans l’état local, ce qui rafraîchit immédiatement la liste affichée.

## Résiduels constatés
- Le besoin cadré mentionne `immatriculation, type, statut` en création, mais le formulaire et l’API n’acceptent pas de statut en entrée.
- La page `/vehicles` est ouverte via `canManageVehicles(...)`, donc visible à `ADMIN`, `GERANT` et détenteurs de `VEHICLES_MANAGE`, alors que le `POST` est refusé à tout profil non `ADMIN`.
- L’UI de création est donc visible à des profils qui ne peuvent pas créer réellement.

## Conséquence session
Verdict de validation retenu : `PARTIELLEMENT CONFORME`.
