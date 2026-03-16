# NOTES

## Nature de la session

Session de type **AUDIT**.
Aucune correction code n’est ouverte dans `BASE-01`.
Le travail consiste uniquement à qualifier l’état réellement visible du dépôt sur le sujet **bases / dépôts**.

## Rappel du cadrage utile

Le cadrage officiel porte un `MODULE 04 — Bases / dépôts` et y décrit notamment :
- une entité base/dépôt administrable ;
- la création, modification et désactivation/archivage d’une base ;
- le rattachement d’un véhicule à une base ;
- le rattachement d’un utilisateur à une base ;
- le rattachement d’un shift à une base ;
- un arbitrage ultérieur sur le lien template ↔ base.

Le même cadrage marque actuellement ce module comme **`manquant`** sur le périmètre ALPHA.
Conséquence méthodologique :
- l’audit ne doit pas conclure `partiel` ou `présent` par simple proximité de vocabulaire ;
- il doit distinguer une vraie entité métier de simples variables techniques nommées `base`.

## Observations sur le code réel

### 1. Aucun modèle métier dédié n’est visible dans Prisma
Le schéma Prisma complet ne contient aucun modèle `Base`, `Depot`, `Depôt`, `Agency`, `Site`, `Location` ou équivalent métier.
Les modèles métier réellement visibles sont notamment `Company`, `User`, `Vehicle`, `ShiftTemplate`, `DraftShift`, `Shift`, `AutoScheduleRun`, `CompanyRule`, `MaintenanceType`, `PlanningAuditLog`.

Conclusion :
- aucune entité dédiée aux bases/dépôts n’est matérialisée au niveau data ;
- le besoin du module n’est donc pas déjà entamé dans le schéma.

### 2. Aucun rattachement visible n’existe sur les entités attendues
Le schéma ne montre aucun champ `baseId` / `depotId` / équivalent sur :
- `Vehicle` ;
- `User` ;
- `Shift` ;
- `DraftShift` ;
- `ShiftTemplate`.

Le code API et UI réellement présents ne manipulent que des rattachements vers :
- `companyId` ;
- `userId` / `user2Id` ;
- `vehicleId` ;
- `templateId` ;
- `runId`.

Conclusion :
- aucun rattachement partiel exploitable n’est déjà en place.

### 3. Les API visibles ne contiennent aucun module bases/dépôts
La liste réelle des routes `app/api/**` couvre notamment :
- auth ;
- profil société ;
- règles société ;
- users ;
- vehicles ;
- planning ;
- autoschedule ;
- health Prisma.

Aucune route du type `app/api/bases/*`, `app/api/depots/*`, `app/api/sites/*`, `app/api/locations/*` ou équivalent n’est visible.

Conclusion :
- aucun socle API dédié aux bases/dépôts n’existe dans l’état inspecté.

### 4. L’UI visible n’expose aucun écran bases/dépôts
Les pages réellement visibles exposent :
- dashboard ;
- planning ;
- profil société ;
- utilisateurs ;
- véhicules.

Le dashboard n’affiche aucun lien vers un module bases/dépôts.
Aucun fichier `app/bases/*`, `app/depots/*`, `app/sites/*`, `app/settings/bases/*` ou équivalent n’est visible.

Conclusion :
- aucune UI dédiée aux bases/dépôts n’est prouvée ;
- aucun placeholder UI exploitable n’est visible.

### 5. Les templates, véhicules, utilisateurs et planning ne portent pas de trace métier exploitable
Les écrans et routes inspectés montrent :
- véhicules : création / listing / suppression autour de `immatriculation`, `type`, `status` ;
- utilisateurs : listing / reset mot de passe ;
- planning : affectations via `userId`, `user2Id`, `vehicleId`, `templateId`, `runId` ;
- templates : scripts de création / listing sans base associée.

Conclusion :
- aucune intégration partielle “préparatoire” aux bases/dépôts n’est visible.

### 6. Les traces ambiguës observées ne sont pas métier
Deux types d’ambiguïtés ont été identifiés :
- des variables locales nommées `base` dans des helpers de calcul de date du planning ;
- la notion générale de “base” comme socle technique ou base produit dans la documentation.

Ces traces ne correspondent pas à une base/dépôt métier administrable.

Conclusion :
- elles ne doivent pas être reclassées en implémentation partielle.

### 7. Le cadrage et le code sont cohérents sur ce point
Le cadrage officiel indique le module bases/dépôts comme `manquant` / non encore visible.
L’inspection du code réel confirme ce diagnostic.

Conclusion :
- pas de contradiction utile entre documentation et code ;
- l’état réel constaté reste `absent`.

## Classement explicite demandé par la session

### Ce qui est réellement présent
- aucune entité métier base/dépôt ;
- aucune API métier base/dépôt ;
- aucune UI métier base/dépôt ;
- aucune permission dédiée base/dépôt ;
- aucun rattachement `* -> base` visible.

### Ce qui relève seulement d’un vocabulaire voisin
- `Company` / `companyId` : société, pas base/dépôt ;
- variables locales `base` dans des calculs de dates de planning ;
- documentation produit qui annonce le besoin futur.

### Ce qui est absent
- modèle Prisma base/dépôt ;
- CRUD API base/dépôt ;
- UI base/dépôt ;
- rattachement véhicule ↔ base ;
- rattachement utilisateur ↔ base ;
- rattachement shift ↔ base ;
- rattachement template ↔ base.
