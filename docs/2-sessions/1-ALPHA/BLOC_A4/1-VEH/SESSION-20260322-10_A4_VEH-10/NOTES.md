# NOTES — SESSION-20260322-10_A4_VEH-10

## Rappel méthodologique
Session strictement bornée à une validation ciblée du risque de suppression physique véhicule non souhaitée.
Aucune correction applicative ne doit être introduite par défaut si le résiduel peut être simplement constaté et tracé.

## Méthode appliquée
- relecture des documents maîtres, templates et protocole ;
- vérification du cadrage `07.5 Suppression définitive d’un véhicule non utilisé` ;
- contrôle ciblé du flux réel `GET/POST/DELETE /api/vehicles` ;
- contrôle ciblé de la page `/vehicles` et des actions branchées ;
- contrôle de l’API d’archivage logique et du service associé ;
- contrôle du schéma Prisma uniquement pour confirmer `Vehicle.isActive` et les relations de planning ;
- exécution des validations `npm run lint` et `npm run build` si possible ;
- clôture documentaire en `NO_PATCH` si le résiduel est constaté sans correction hors périmètre.

## Constats de travail retenus
- `GET /api/vehicles` ne remonte que les véhicules actifs (`isActive: true`) ;
- `POST /api/vehicles/[id]/archive` existe réellement et archive logiquement via `isActive: false` ;
- `DELETE /api/vehicles` existe encore et exécute un `tx.vehicle.delete(...)` ;
- aucune condition « véhicule jamais utilisé » n’est vérifiée avant suppression ;
- l’UI `/vehicles` expose en même temps `Archiver` et `Supprimer` ;
- les relations `DraftShift.vehicle` et `Shift.vehicle` sont définies avec `onDelete: SetNull`, ce qui ne matérialise aucun blocage explicite de suppression dans le périmètre contrôlé.

## Point de vigilance hors périmètre session
Le ZIP fourni ne contient pas `node_modules`. Les validations terminales relancées dans cet environnement échouent donc avant analyse applicative complète (`eslint: not found`, `next: not found`). Aucun correctif n’a été introduit dans cette session pour sortir de son périmètre.
