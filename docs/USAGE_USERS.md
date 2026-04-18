# Guide d’usage ALPHA — Utilisateurs

## Objectif

Le module **Utilisateurs** permet d’administrer les comptes actifs de la société courante :
- créer un utilisateur ;
- rechercher et filtrer la liste ;
- modifier les informations principales ;
- ajuster les permissions ALPHA ;
- rattacher une base ;
- réinitialiser le mot de passe ;
- gérer les absences ;
- archiver un compte.

## Pré-requis

- être connecté avec un compte disposant du droit réel d’administration des utilisateurs ;
- avoir une société courante (`companyId`) ;
- disposer d’au moins une base si vous voulez tester le rattachement dépôt.

## Accéder au module

1. Ouvrir `/users`.
2. Si la session n’est pas autorisée, la page redirige vers `/login`.

## Ce qui est réellement disponible

### 1. Créer un utilisateur

Depuis le bloc **Créer un utilisateur** :
- renseigner `Nom` ;
- renseigner `Email` ;
- choisir un `Rôle` ;
- saisir un `Mot de passe initial` ;
- valider.

Comportement visible :
- les rôles support globaux ne sont pas attribuables depuis l’interface ;
- pour un acteur qui ne gouverne pas les règles métier, les rôles `ADMIN` et `GERANT` sont retirés de la liste ;
- l’API rattache l’utilisateur à la société de la session, pas à une société fournie par le client.

### 2. Lister, rechercher et filtrer

Le tableau liste les comptes actifs de la société :
- recherche par nom ou email ;
- filtre par rôle ;
- pagination ;
- exclusion des comptes support globaux côté flux client standard.

### 3. Modifier un utilisateur

Le bloc **Modifier un utilisateur** permet de changer :
- nom ;
- email ;
- rôle ;
- permissions ALPHA affichées dans la fiche.

Le module conserve une logique de garde-fou autour des rôles donnant nativement accès à la gouvernance des règles métier.

### 4. Rattacher à une base

Le bloc **Rattachement à une base** permet :
- de sélectionner un utilisateur ;
- de choisir une base active ou archivée ;
- d’enregistrer le rattachement.

### 5. Réinitialiser le mot de passe

Le bloc **Nouveau mot de passe** permet :
- de choisir un utilisateur ;
- de saisir un mot de passe ;
- de confirmer le mot de passe ;
- de lancer la réinitialisation.

### 6. Gérer les absences

Le bloc **Indisponibilités / absences** permet :
- de lister les absences d’un utilisateur sélectionné ;
- de créer une absence avec début, fin et motif ;
- de modifier une absence existante ;
- de supprimer une absence existante.

Ces absences sont réutilisées par les contrôles planning pour éviter des affectations incohérentes.

### 7. Archiver un utilisateur

Le bloc **Archiver un utilisateur** effectue un archivage logique.
Le compte disparaît des listes actives standard, sans suppression physique depuis ce flux.

## Points de contrôle utiles

- un utilisateur archivé ne doit plus apparaître dans la liste active `/api/users` ;
- un utilisateur d’une autre société ne doit pas être manipulable depuis la session courante ;
- un rôle non autorisé ne doit pas être assignable par un acteur insuffisamment habilité ;
- une absence créée doit ensuite bloquer les affectations planning incompatibles.

## Limites honnêtes à connaître

- le guide décrit le flux ALPHA réellement visible, pas un back-office complet ;
- les formulations des erreurs restent techniques sur certaines branches API ;
- la gestion des comptes support globaux n’est pas un flux client standard de ce module.
