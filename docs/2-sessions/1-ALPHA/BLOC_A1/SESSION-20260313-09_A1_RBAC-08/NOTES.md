# NOTES

## Méthode / observations

### 1. Relecture documentaire préalable
- priorité donnée à `docs/1-master` conformément aux règles de session ;
- cadrage relu sur `06.3` et `06.4` ;
- plan relu pour confirmer la séparation `RBAC-07` / `RBAC-08` / `USERS-10`.

### 2. Constats confirmés sans réouverture de `RBAC-07`
- `User.role` reste le seul rôle principal réellement porté par le modèle ;
- la persistance SQL impose aussi un rôle obligatoire ;
- `lib/auth.ts` et `types/next-auth.d.ts` restent cohérents avec un seul `role` en session ;
- aucun flux produit réellement présent ne modifie aujourd’hui le rôle principal hors seed.

### 3. Flux users réellement présents
Flux prouvés sur le dépôt inspecté :
- `GET /api/users` : lecture de la liste utilisateurs ;
- `POST /api/users/[id]/reset-password` : reset password ;
- page `/users` : UI de reset password ;
- `prisma/seed.ts` : création / mise à jour seed des utilisateurs et affectation de permissions.

Flux non prouvés sur ce périmètre :
- API création utilisateur ;
- API modification utilisateur ;
- UI complète d’édition rôle principal + permissions.

### 4. Faiblesse concrète identifiée
La faiblesse prouvée n’est pas sur le rôle principal mais sur la stabilisation des permissions seedées :
- `setUserPermissions()` cherchait les permissions demandées ;
- les ajoutait via `upsert` ;
- mais ne supprimait jamais les permissions devenues obsolètes ;
- et retournait immédiatement si `permissionCodes.length === 0`.

Conséquence factuelle :
- un utilisateur seedé pouvait conserver des permissions anciennes après un reseed ;
- le cas d’un utilisateur censé n’avoir aucune permission (`[]`) n’était pas stabilisé ;
- l’état obtenu pouvait donc diverger de la configuration seed courante.

### 5. Stratégie retenue
Patch minimal strictement borné à `prisma/seed.ts` :
- dédupliquer les codes ;
- résoudre les permissions réellement existantes ;
- échouer explicitement si un code seedé n’existe pas ;
- supprimer les permissions non désirées pour l’utilisateur ;
- recréer / conserver exactement les permissions voulues.

### 6. Points volontairement non ouverts
- aucun changement sur `User.role` ;
- aucun changement sur auth/session ;
- aucun changement sur `lib/permissions.ts` ;
- aucune UI d’édition ;
- aucun traitement `USERS-10` ;
- aucun multi-rôle.

### 7. Vérifications réellement exécutées
- relecture des documents maîtres et des sessions utiles ;
- inspection du schéma Prisma, des migrations, du seed, de l’auth et des flux users ;
- génération du patch officiel `.diff` ;
- `git apply --check` du patch sur une copie propre de l’extraction : `OK` ;
- application du patch sur cette copie de contrôle : `OK`.

### 8. Vérifications complémentaires désormais prouvées sur le dépôt cible
- `npm run lint` : `OK` ;
- `npm run build` : `OK`.
