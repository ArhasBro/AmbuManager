# NOTES

## Méthode

Audit réalisé par confrontation stricte entre :

1. le cadrage fonctionnel officiel du module utilisateurs ;
2. le plan de développement A3 ;
3. le schéma Prisma réel ;
4. les routes API réellement présentes ;
5. l’UI réellement présente ;
6. les helpers d’auth / permissions réellement branchés.

Règle appliquée pendant toute la session : **CODE > DOCUMENTATION**.

## Observations structurantes

### 1. Le module `users` actuel est un socle minimal, pas un CRUD complet

La présence d’une page `/users` pourrait laisser croire à un module d’administration complet. En réalité, la page ne contient pas de tableau complet, pas de formulaire de création, pas d’édition générale, pas d’état actif/inactif, pas d’archivage.

Elle orchestre seulement :

- un sélecteur d’utilisateur pour **rattacher une base** ;
- un sélecteur d’utilisateur pour **réinitialiser un mot de passe**.

### 2. La “liste utilisateurs” existe côté API, mais pas comme vraie liste UI d’admin

L’API `GET /api/users` renvoie bien une collection multi-tenant ordonnée par nom, limitée par `limit`, avec dépôt et timestamps. En revanche :

- aucun filtre métier n’est disponible ;
- aucun tri configurable n’est disponible ;
- aucune pagination réelle n’est disponible ;
- aucune colonne n’est affichée dans une table dédiée côté UI ;
- les données servent surtout de source pour des `<select>` dans les widgets users et planning.

Conclusion : **USERS-02 est confirmé**, mais **USERS-03 a de fortes chances d’être nécessaire** pour rendre cette liste réellement exploitable.

### 3. Le rattachement utilisateur ↔ dépôt est déjà partiellement réalisé

Le modèle `User.depotId` existe, la relation Prisma existe, une route dédiée existe, un service dédié existe, un schéma Zod existe et l’UI `/users` permet déjà l’affectation ou le retrait de base.

Ce point réduit le caractère “greenfield” de `USERS-11` : la session future devra plutôt vérifier, compléter et stabiliser l’existant que repartir de zéro.

### 4. Les rôles et permissions existent partiellement, mais le module users ne les administre pas encore

Le dépôt contient :

- un `Role` principal ;
- un `PlatformRole.SUPPORT` ;
- un catalogue de permissions fines ;
- une table `Permission` ;
- une table `UserPermission`.

En revanche, le module users actuel :

- n’expose pas les permissions dans `GET /api/users` ;
- ne propose aucune UI d’édition de rôle / permissions ;
- ne contient aucune route de modification générale du rôle principal ;
- ne gère pas le statut actif/inactif.

### 5. Incohérence notable autour du support global

Les routes users utilisent `traceSupportAction(...)`, mais les garde-fous actuels empêchent en pratique le support global de passer par ces flux client :

- `companyId` est obligatoire dans les routes users ;
- `canManageUsers(...)` retourne `false` pour `PlatformRole.SUPPORT`.

Le code d’audit support sur ces actions existe donc, mais il paraît **non atteignable dans les flux users actuels**.

### 6. Les absences / indisponibilités sont réellement absentes

Aucun modèle Prisma dédié, aucune route API dédiée, aucune UI dédiée n’ont été trouvés pour les indisponibilités utilisateur. Les contrôles planning observés reposent sur les conflits temporels et le repos minimal, pas sur une absence déclarative.

### 7. La consultation du planning existe partiellement, mais pas au niveau de finesse attendu

Le planning générique existe et n’est pas rattaché au module users. Sa lecture est accessible à tout utilisateur authentifié rattaché à une société, sans branchement sur `PLANNING_VIEW_SELF` / `PLANNING_VIEW_GLOBAL` dans la route de lecture observée.

Conclusion :

- `USERS-15` est confirmé ;
- il devra probablement inclure un recadrage RBAC, pas seulement une simple UI.

## Points de dette / vigilance

- validation du reset mot de passe très faible (`min(1)`) ;
- absence de validation UUID sur `targetUserId` dans la route reset mot de passe ;
- absence de tests identifiés pour le module users ;
- terminologie UI trompeuse : depuis le dashboard, l’entrée users s’appelle `Réinitialisation mot de passe`, ce qui reflète le périmètre réel mais confirme que le “module users” n’est pas encore un module d’administration complet.
