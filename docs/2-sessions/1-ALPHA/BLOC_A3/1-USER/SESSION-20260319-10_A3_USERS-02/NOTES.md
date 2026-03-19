# NOTES

## Méthode

Validation réalisée par confrontation stricte entre :

1. le cadrage fonctionnel officiel du module utilisateurs ;
2. le plan de développement A3 ;
3. le schéma Prisma réel ;
4. la route API de liste réellement présente ;
5. l’UI `/users` réellement présente ;
6. les composants consommateurs de la liste ;
7. les garde-fous auth / permissions / multi-tenant réellement branchés.

Règle appliquée pendant toute la session : **CODE > DOCUMENTATION**.

## Observations structurantes

### 1. La liste existe côté API, mais avec un périmètre minimal

`GET /api/users` existe réellement et renvoie une collection d’utilisateurs de la société courante.  
Le schéma d’entrée ne valide qu’un seul paramètre `limit` borné entre `1` et `500`.

Il n’existe pas dans cette route :

- de filtre texte ;
- de filtre par rôle ;
- de filtre par dépôt ;
- de filtre actif / inactif ;
- de pagination page / cursor ;
- de tri configurable.

La route renvoie donc une **liste brute minimale bornée**, pas une API de listing d’administration riche.

### 2. La sécurité et le cloisonnement sont cohérents sur le périmètre observé

La route exige :

- une session authentifiée ;
- un `companyId` ;
- un `userId` ;
- une autorisation `canManageUsers(...)`.

Le `where` Prisma limite bien la lecture à la société courante et exclut les comptes plateforme globaux via `platformRole: null`.

Sur le périmètre de validation demandé, le cloisonnement multi-tenant observé est donc cohérent.

### 3. Les données exposées sont cohérentes avec un usage de sélection, pas avec une administration complète

Champs réellement exposés par `GET /api/users` :

- `id`
- `name`
- `email`
- `role`
- `companyId`
- `depotId`
- `depot { id, name, isActive }`
- `createdAt`
- `updatedAt`

Cette sélection alimente correctement des usages de choix de cible et d’affichage léger.

En revanche, pour une vraie liste administrable A3, on ne trouve pas dans l’existant validé :

- téléphone ;
- statut actif / inactif ;
- archivage ;
- permissions individuelles ;
- vue tabulaire dédiée ;
- actions de création / édition / désactivation depuis la liste.

### 4. L’UI `/users` n’est pas une vraie page de liste administrable

La page `/users` est explicitement présentée comme une **“Gestion minimale ALPHA”**.  
Elle ne contient pas de tableau utilisateurs. Elle compose seulement :

- un widget de rattachement à une base ;
- un widget de reset mot de passe.

Le dashboard renvoie d’ailleurs vers cette entrée avec le libellé **“Réinitialisation mot de passe”**, ce qui confirme que l’entrée n’est pas perçue comme un module d’administration users complet.

### 5. Les composants consommateurs prouvent plusieurs états UI, mais pas une UX de liste

Les deux composants clients gèrent bien :

- chargement ;
- état vide ;
- affichage d’erreur ;
- sélection d’un utilisateur.

Mais ces états sont portés à l’intérieur de widgets fonctionnels spécialisés.

Ce qui n’existe pas dans l’UI observée :

- table dédiée ;
- colonnes de liste ;
- barre de recherche ;
- filtres UI ;
- tri UI ;
- pagination UI ;
- navigation vers fiche détail ou édition utilisateur.

### 6. La même source alimente plusieurs flux

La route `/api/users?limit=500` est consommée par :

- `app/users/user-depot-assignment-client.tsx`
- `app/users/reset-password-client.tsx`
- `app/planning/planning-client.tsx`

Cela confirme que l’existant joue aujourd’hui le rôle d’une **liste technique partagée**.

Cette réutilisation va dans le bon sens pour conserver un socle API, mais elle confirme aussi que la “liste utilisateurs” actuelle n’a pas encore sa propre UX d’administration.

### 7. Limites bloquantes pour une validation A3 positive

Les manques suivants empêchent de considérer la liste comme validée au niveau attendu du bloc A3 :

- absence de vraie UI de listing administrable ;
- absence de filtres et de tri utilisateur côté UI ;
- absence de pagination réelle côté API et UI ;
- absence d’actions de gestion utilisateur directement rattachées à une liste ;
- absence de signal clair de statut administrable (actif/inactif, archivage, permissions) ;
- terminologie et navigation qui positionnent encore `/users` comme un écran d’outil minimal, pas comme un module users.

## Conclusion de travail

La liste utilisateurs existante est **réelle et exploitable comme source technique interne**, mais **non satisfaisante comme fonctionnalité “liste utilisateurs” du bloc A3**.

`USERS-03` est donc **confirmée**.

Elle doit rester une session de correction / stabilisation de la liste existante, et non une réouverture du bloc users complet.
