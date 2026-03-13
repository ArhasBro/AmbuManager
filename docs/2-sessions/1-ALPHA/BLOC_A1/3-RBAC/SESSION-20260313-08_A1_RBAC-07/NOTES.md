# NOTES

Notes de travail de la session.

---

## Méthode de validation retenue

Session de type **VALIDATION**.

Méthode appliquée :
1. relire les sources officielles avec priorité à `docs/1-master` ;
2. repartir du cadrage `06.4` et du plan officiel ;
3. reprendre uniquement le contexte utile de `AUTH-03`, `RBAC-01` et `RBAC-02` ;
4. vérifier le modèle de données réel, la persistance SQL, l’auth/session et les flux users réellement présents ;
5. distinguer clairement le prouvé, l’implicite, le non prouvé et l’hors périmètre ;
6. produire une clôture `NO_PATCH` cohérente avec une session de validation.

Règles appliquées :
- aucune correction de code ;
- aucune ouverture de `RBAC-08` ;
- aucun `.diff` ;
- aucun `README_PATCH.md` ;
- en cas de contradiction : **CODE > DOCUMENTATION**.

## Cadrage documentaire utile

### 1. Cadrage produit officiel
Dans `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md` :
- `02.2` impose une session enrichie contenant au minimum le rôle principal et la société ;
- `06.4` impose qu’un utilisateur porte un rôle principal unique.

Conséquence :
- la validation attendue ici porte bien sur un modèle à rôle unique, pas sur du multi-rôle ;
- une implémentation multi-rôle active contredirait le périmètre ALPHA courant si elle remplaçait le modèle prouvé.

### 2. Plan officiel
Dans `docs/1-master/PLAN_DE_DEVELOPPEMENT.md` :
- `RBAC-07` = validation du rôle principal obligatoire ;
- `RBAC-08` = correction si nécessaire ;
- le multi-rôle est renvoyé plus loin dans le plan (`RBAC enrichi et multi-rôle`).

Conséquence :
- `RBAC-07` doit constater et qualifier l’état réel ;
- aucune correction ni anticipation du multi-rôle n’est attendue ici.

## Observations brutes — code

### 1. Modèle de données réel
Dans `prisma/schema.prisma` :
- l’enum `Role` existe ;
- `User.role` est un champ scalaire unique ;
- ce champ est requis ;
- le commentaire précise explicitement : `on garde 1 rôle POUR L’INSTANT, multi-rôles ensuite`.

Constat :
- le modèle actuellement implémenté est bien un modèle à rôle principal unique ;
- le multi-rôle est seulement évoqué comme évolution future, pas comme structure active.

### 2. Persistance SQL réelle
Dans `prisma/migrations/20260224175839_init/migration.sql` :
- le type PostgreSQL `Role` est créé ;
- la table `User` porte `"role" "Role" NOT NULL`.

Dans `prisma/migrations/20260313120000_rename_role_dea_to_ade/migration.sql` :
- `DEA` a été renommé vers `ADE` au niveau de l’enum.

Constat :
- l’obligation du rôle principal n’est pas seulement documentaire ;
- elle est portée jusque dans la persistance.

### 3. Recherche de structure multi-rôle active
Recherche textuelle exécutée sur `prisma`, `lib`, `app` et `types` :
- aucune table `UserRole` ;
- aucune relation `roles[]` sur `User` ;
- aucune propriété active `userRoles` ou `assignedRoles` ;
- seul le commentaire de `prisma/schema.prisma` mentionne le multi-rôle comme futur.

Constat :
- aucune implémentation multi-rôle active n’a été prouvée sur le périmètre inspecté.

### 4. Seed utilisateur
Dans `prisma/seed.ts` :
- `upsertUser()` exige un paramètre `role: Role` ;
- l’écriture DB reprend explicitement `role: params.role` ;
- les utilisateurs seedés inspectés portent tous un rôle unique (`BUREAU` ou `ADMIN`).

Constat :
- le flux de création / mise à jour réellement visible côté seed respecte le modèle à rôle unique ;
- aucun tableau de rôles ni combinaison multi-rôle n’est visible.

### 5. Authentification et session enrichie
Dans `lib/auth.ts` :
- `authorize()` lit `role` et `companyId` depuis la base ;
- le callback `jwt` propage `token.role` et `token.companyId` ;
- le callback `session` expose `session.user.role` et `session.user.companyId`.

Dans `types/next-auth.d.ts` :
- `Session.user.role`, `User.role` et `JWT.role` sont typés.

Constat :
- la session reste alignée avec un rôle principal unique ;
- elle ne transporte pas une collection de rôles.

Nuance :
- le typage NextAuth reste optionnel (`role?: Role`) pour des raisons de surface technique ;
- cela ne contredit pas le modèle réel, puisque l’alimentation runtime provient d’un champ DB obligatoire et d’une hydratation explicite.

### 6. Flux utilisateurs réellement présents
Dans `app/api/users/route.ts` :
- la liste utilisateurs renvoie un unique `role` par enregistrement.

Dans `app/api/users/[id]/reset-password/route.ts` :
- le rôle de la cible est lu mais non modifié ;
- aucune réaffectation multi-rôle n’est introduite.

Dans `app/users/page.tsx` et `app/users/reset-password-client.tsx` :
- les contrôles d’accès et l’affichage manipulent un seul rôle par utilisateur.

Constat :
- les flux users réellement visibles restent cohérents avec le modèle à rôle principal unique.

### 7. Autres usages réels du rôle
Dans `lib/services/planning/matching.service.ts` :
- les utilisateurs sont recherchés via `where: { companyId, role: { in: requiredRoles } }` ;
- le matching continue donc à s’appuyer sur le champ `User.role` unique.

Constat :
- un usage métier réel du rôle existe au-delà de la simple auth ;
- cet usage ne révèle aucun modèle multi-rôle concurrent.

## Ce qui est prouvé / implicite / non prouvé

### Prouvé
- `User.role` est obligatoire dans le schéma et la persistance ;
- le modèle implémenté est scalaire, donc à rôle principal unique ;
- la session enrichie reste cohérente avec ce modèle ;
- le seed respecte ce modèle ;
- les flux users présents ne le contredisent pas ;
- aucune structure multi-rôle active n’a été trouvée.

### Seulement implicite
- la cohérence de toutes les données historiques réelles déjà présentes en base n’est pas vérifiée par lecture DB directe dans cette session ;
- elle est toutefois fortement soutenue par la contrainte `NOT NULL` sur `role` et par le modèle Prisma courant.

### Non prouvé
- une UI complète de création / édition utilisateur avec affectation de rôle ;
- une gestion métier avancée d’évolution de rôle côté produit.

### Hors périmètre
- la correction éventuelle d’un futur écart ;
- le multi-rôle ;
- l’attribution avancée rôle + permissions ;
- les sessions ultérieures du bloc RBAC.

## Conclusion de travail

Sur le périmètre exact `RBAC-07`, le dépôt valide le principe de rôle principal obligatoire et unique.

Le verdict de travail retenu est donc : **conforme**.
