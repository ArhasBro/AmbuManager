# RESULTATS

## Résultats obtenus

### 1. État réel du module `users`

Le module `users` existant est **réel mais partiel**.

Il couvre aujourd’hui :

- une **liste API** multi-tenant ;
- une **UI minimale `/users`** ;
- le **rattachement d’un utilisateur à une base** ;
- la **réinitialisation du mot de passe d’un autre utilisateur de la société**.

Il ne couvre pas aujourd’hui :

- la création utilisateur ;
- la modification utilisateur générale ;
- la désactivation / archivage ;
- la suppression définitive encadrée ;
- l’administration du rôle principal et des permissions depuis le module users ;
- les absences / indisponibilités ;
- une vraie consultation du planning utilisateur / collègues gouvernée par les permissions fines attendues.

### 2. Réponse point par point à l’objectif d’audit

#### 2.1 Liste utilisateurs existante

**Existant prouvé**

- `GET /api/users` existe.
- Le retour est limité à la société courante.
- Les comptes support globaux sont exclus.
- Le tri est fixe par nom.
- `limit` existe, mais pas de pagination réelle.

**Existant UI prouvé**

- il n’existe pas de vraie page liste/tabulaire complète ;
- la page `/users` recharge les utilisateurs pour alimenter des sélecteurs dans deux widgets.

**Conclusion**

La liste existe **côté API** et **comme source de données UI**, mais pas encore comme **liste d’administration complète**.

#### 2.2 Création utilisateur

**Verdict** : absente.

- aucune route API de création trouvée ;
- aucune UI de création trouvée ;
- aucune validation client/serveur dédiée trouvée ;
- le modèle actuel ne contient pas encore certains champs attendus par le cadrage (téléphone, statut actif/inactif, etc.).

#### 2.3 Modification utilisateur

**Verdict** : absente, hors exceptions ciblées.

Les seules modifications existantes sont :

- dépôt (`depotId`) ;
- mot de passe.

Aucune édition générale des données utilisateur n’est présente.

#### 2.4 Désactivation / archivage / suppression

**Verdict** : absent.

Aucune logique applicative users trouvée pour :

- rendre un user inactif ;
- archiver un user ;
- supprimer un user de manière métier ;
- protéger une suppression physique en fonction de l’historique.

#### 2.5 Rôles et permissions

**Existant prouvé**

- rôle principal : `Role` ;
- rôle plateforme : `PlatformRole.SUPPORT` ;
- permissions fines ALPHA cataloguées ;
- jointure `UserPermission`.

**Limites actuelles**

- le module users n’administre pas encore ces permissions ;
- la liste users n’expose pas les permissions individuelles ;
- le support global est explicitement refusé dans `canManageUsers(...)`.

#### 2.6 Rattachement utilisateur à une base / dépôt

**Verdict** : présent et exploitable sur un périmètre minimal.

- schéma OK ;
- validator OK ;
- API OK ;
- service métier OK ;
- UI OK ;
- multi-tenant strict OK.

C’est l’élément users le plus avancé du bloc A3 au moment de l’audit.

#### 2.7 Absences / indisponibilités

**Verdict** : absentes.

Aucun modèle, endpoint ou écran users dédié n’a été trouvé.

#### 2.8 Consultation du planning utilisateur / collègues

**Verdict** : partiel hors module users.

Le produit permet déjà de consulter le planning de société via le module planning générique, mais :

- ce n’est pas un écran users dédié ;
- la lecture observée n’est pas encore alignée sur les permissions fines `self/global` prévues.

### 3. Écarts / manques / incohérences identifiés

#### Écarts majeurs

- absence de création utilisateur ;
- absence de modification utilisateur générale ;
- absence de désactivation / archivage ;
- absence d’absences / indisponibilités ;
- absence d’une vraie liste UI administrable ;
- absence d’édition du rôle principal et des permissions depuis le module users.

#### Incohérences / dettes notables

- garde-fou support global incompatible avec le traçage support branché dans les actions users ;
- reset mot de passe avec validation faible ;
- route reset mot de passe sans validation UUID du paramètre `id` ;
- permissions `PLANNING_VIEW_SELF` / `PLANNING_VIEW_GLOBAL` cataloguées mais non branchées sur la lecture planning observée.

### 4. Impact sur les sessions futures du bloc A3

#### Sessions confirmées sans ambiguïté

- `USERS-02`
- `USERS-03`
- `USERS-04`
- `USERS-05`
- `USERS-06`
- `USERS-07`
- `USERS-08`
- `USERS-10`
- `USERS-12`
- `USERS-13`
- `USERS-14`
- `USERS-15`
- `USERS-16`

#### Sessions à recadrer / alléger

- `USERS-11` : l’existant dépôt utilisateur existe déjà ; la session future devra plutôt valider, stabiliser et compléter l’existant que créer from scratch.
- `USERS-09` : l’absence de suppression physique actuelle est déjà constatée ; la future session devra surtout formaliser la règle et vérifier qu’aucune suppression indésirable n’est introduite ensuite.

## Documents générés

- `SESSION.md`
- `NOTES.md`
- `EVIDENCES.md`
- `RESULTATS.md`
- `FIN_SESSION.md`

## Patch

Aucun patch fonctionnel produit dans cette session d’audit lecture seule.
