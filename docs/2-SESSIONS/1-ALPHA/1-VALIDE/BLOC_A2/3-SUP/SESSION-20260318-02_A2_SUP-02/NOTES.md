# NOTES

## Choix structurants retenus

### 1. Séparation explicite rôle tenant / rôle plateforme
Le choix retenu consiste à ne pas détourner les rôles société existants (`ADMIN` / `USER`) pour représenter le support global.
Le support global est porté par un rôle plateforme distinct : `PlatformRole.SUPPORT`.

### 2. `User` reste le point unique de modélisation du rôle plateforme global
La modélisation du support global reste concentrée sur `User` :
- `User.platformRole` porte l’identité plateforme ;
- `User.role` et `User.companyId` deviennent optionnels uniquement pour les comptes plateforme globaux.

Ce choix évite d’ouvrir une seconde logique de comptes ou un mécanisme parallèle plus intrusif.

### 3. Aucun droit global implicite pour le support
Le fait d’identifier un utilisateur comme support global ne lui ouvre pas automatiquement d’accès métier transverses.
La session modélise l’identité du support, pas une autorisation globale généralisée.

### 4. Multi-tenant maintenu strictement borné
La session n’ouvre aucun accès cross-company implicite.
Le support global est identifié côté modèle, typage et session, mais il n’est pas autorisé partout par défaut.

### 5. Compatibilité avec l’existant préservée
Les rôles tenant existants restent intacts dans leur logique métier.
L’adaptation RBAC / permissions a été maintenue minimale pour éviter les effets de bord sur les flux déjà présents.

## Correctif intermédiaire appliqué pendant la session

Un index erroné `@@index([platformRole])` avait été ajouté dans `model Vehicle` alors que `platformRole` n’existe que sur `User`.
Ce point a été retiré avant validation finale via un correctif court d’application, sans changer la solution de fond de `SUP-02`.

## Synthèse d’arbitrage

Le résultat final conserve l’objectif métier initial :
- support global distinct des rôles client ;
- séparation nette tenant / plateforme ;
- aucun droit global implicite ;
- multi-tenant intact.
