# NOTES

## Rappel produit officiel

Le document de cadrage fonctionnel fait du module 09 “Shift templates” la base officielle produit pour A6 :
- CRUD administrable
- champs fonctionnels complets
- composition minimale d’équipe
- type de véhicule requis
- nombre de personnes requis
- couleurs libres
- désactivation / archivage
- récurrence hebdomadaire indiquée comme **IMPORTANT MAIS NON BLOQUANT**

## Constat code réel

### 1) Modèle Prisma conforme au socle A6
Le modèle `ShiftTemplate` expose bien :
- `category`
- `requiredRole`
- `secondaryAllowedRoles`
- `minStaffCount`
- `requiredVehicleType`
- `isActive`
- `archivedAt`
- `isTimeDefined`
- `startTime`
- `endTime`
- `crossesMidnight`
- `color`

### 2) Intégrité multi-tenant réelle
La migration TPL-03 :
- nettoie les références inter-sociétés invalides
- bloque les liens `DraftShift.templateId` / `Shift.templateId` vers un template d’une autre société
- bloque le changement de `ShiftTemplate.companyId` quand le template est déjà lié

### 3) Module templates réellement administrable
Le dépôt contient :
- `GET /api/templates`
- `POST /api/templates`
- `PATCH /api/templates/[id]`
- `POST /api/templates/[id]/archive`
- page `/templates`
- UI de création / édition / archivage logique / couleur / composition / type véhicule / non-horodaté

### 4) Règles métier templates réellement portées
Les règles par catégorie sont codées :
- AMBULANCE / GARDE = 2 personnes, slot 1 ADE, slot 2 ADE ou AA, véhicule AMBULANCE
- VSL = 1 personne, AA ou ADE ou TAXI, véhicule VSL
- TAXI = 1 personne, TAXI, véhicule TAXI

### 5) Impacts réels sur planning / autoschedule / matching
- autoschedule DAY/WEEK ne consomme que les templates actifs, non archivés, horodatés
- assignation manuelle DraftShift / Shift respecte `minStaffCount`, rôles autorisés par slot et type véhicule requis
- UI planning affiche la couleur, le type véhicule et gère le deuxième slot seulement si requis
- matching lit désormais `secondaryAllowedRoles` et `minStaffCount`, calcule les slots manquants et remplit le prochain slot libre

## Point de vigilance non bloquant

Le cadrage mentionne des templates récurrents hebdomadaires, mais avec priorité “IMPORTANT MAIS NON BLOQUANT” et statut “à confirmer”.  
Aucun modèle dédié de récurrence hebdomadaire n’a été retenu comme exigence bloquante pour la clôture A6.

## Résiduel final strictement prouvé

Aucun nouveau résiduel final strict n’a été prouvé dans le code réel contrôlé.

## Fichiers modifiés pendant cette clôture

Aucun fichier applicatif modifié.  
Verdict patch : `NO_PATCH`.
