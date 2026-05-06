# Guide d’usage ALPHA — Véhicules

## Objectif

Le module **Véhicules** permet de gérer la flotte active de la société courante :
- créer un véhicule ;
- consulter son statut documentaire minimal ;
- modifier ses informations principales ;
- rattacher une base ;
- archiver un véhicule.

## Pré-requis

- être connecté ;
- disposer d’un compte autorisé à voir la flotte ;
- pour créer un véhicule, disposer du profil `ADMIN` ;
- pour tester le rattachement, disposer d’au moins une base.

## Accéder au module

1. Ouvrir `/vehicles`.
2. La page affiche la flotte active de la société courante.

## Ce qui est réellement disponible

### 1. Ajouter un véhicule

Le bloc **Ajouter un véhicule** permet de saisir :
- `Immatriculation` ;
- `Type` (`AMBULANCE`, `VSL`, `TAXI`) ;
- `Statut` (`ACTIVE`, `MAINTENANCE`, `OUT_OF_SERVICE`).

La création standard est réservée au profil `ADMIN`.

### 2. Lire l’état documentaire minimal

Chaque ligne véhicule expose :
- assurance ;
- contrôle technique ;
- carte grise présente / absente ;
- agrément sanitaire.

Un indicateur local synthétique affiche :
- `conforme` ;
- `bientôt expiré` ;
- `expiré`.

Ce statut est calculé à partir des champs réellement présents dans le dépôt courant.

### 3. Modifier un véhicule

L’action **Modifier** permet d’ajuster :
- immatriculation ;
- type ;
- statut ;
- dates documentaires ;
- présence de la carte grise.

### 4. Rattacher une base

Chaque véhicule peut être rattaché à une base via la liste déroulante **Base actuelle** puis le bouton **Enregistrer base**.

### 5. Archiver un véhicule

L’action **Archiver** réalise l’opération standard de fin de vie ALPHA.
Après archivage logique :
- le véhicule sort des listes actives ;
- le flux standard continue à préserver l’historique applicatif plutôt qu’une suppression destructrice depuis l’interface.

## Points de contrôle utiles

- la liste `/api/vehicles` ne doit retourner que les véhicules actifs de la société courante ;
- la création doit utiliser le `companyId` de session côté serveur ;
- un véhicule archivé ne doit plus apparaître dans le listing actif ;
- un véhicule rattaché à une base archivée doit rester visible avec ce statut explicité.

## Limites honnêtes à connaître

- le module ALPHA ne constitue pas encore un registre documentaire réglementaire complet ;
- les contrôles métier de conformité sont simples et locaux ;
- la documentation présente décrit uniquement le flux standard réellement branché.
