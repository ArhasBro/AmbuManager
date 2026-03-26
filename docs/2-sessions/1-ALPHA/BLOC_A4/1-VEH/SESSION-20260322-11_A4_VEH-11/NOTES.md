# NOTES — SESSION-20260322-11_A4_VEH-11

## Rappel méthodologique
Session strictement bornée au rattachement véhicule → base dans le flux standard `vehicles`.
Aucune refonte du module, aucune migration et aucun élargissement vers VEH-12+ n’ont été retenus.

## Méthode appliquée
- relecture des documents maîtres, templates, protocole et sources autorisées ;
- contrôle ciblé du cadrage `04.5 Rattachement d’un véhicule à une base` ;
- lecture de l’API dédiée, du service dédié, de la page `/vehicles`, du client UI et du validateur ;
- vérification ciblée des gardes d’accès, du bornage société, de la restriction aux dépôts actifs et de la possibilité de retirer la base ;
- relance des validations terminales `npm run lint` et `npm run build` si possible ;
- clôture documentaire en `NO_PATCH` si aucun manque réel minimal n’est démontré.

## Constats de travail retenus
- le flux de rattachement existe déjà réellement de bout en bout ;
- l’API dédiée refuse l’accès sans session exploitable, sans `companyId`, ou sans permission `VEHICLES_MANAGE`/accès natif `ADMIN|GERANT` ;
- le service recherche le véhicule dans la société courante, contrôle le dépôt cible dans la même société avec `isActive: true`, puis enregistre `depotId` ;
- l’UI `/vehicles` permet déjà soit d’affecter une base active, soit de retirer la base via l’option `Aucune base` ;
- après succès, le véhicule local est immédiatement remplacé par la réponse API et la sélection locale est resynchronisée ;
- aucun manque réel supplémentaire n’a été prouvé dans le périmètre strict de VEH-11.

## Point de vigilance hors périmètre session
Le ZIP fourni ne contient pas `node_modules`. Les validations terminales relancées dans cet environnement échouent donc avant compilation applicative complète (`eslint: not found`, `next: not found`). Aucun correctif n’a été introduit dans cette session pour sortir du périmètre.
