# EVIDENCES

## Sources utilisées

### Sources documentaires
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`

### Sources code du dépôt réel / patch validé
- `prisma/schema.prisma`
- `prisma/migrations/20260316203000_base08_attach_user_to_depot/migration.sql`
- `lib/validators/user.ts`
- `lib/services/users/assign-user-depot.ts`
- `app/api/users/route.ts`
- `app/api/users/[id]/depot/route.ts`
- `app/users/page.tsx`
- `app/users/user-depot-assignment-client.tsx`
- `app/users/reset-password-client.tsx`

## Évidences de périmètre BASE-08

### Prisma
Le patch ajoute bien la modélisation minimale suivante :
- `User.depotId` nullable ;
- `User.depot` ;
- `Depot.users`.

### Validation
Le body d’affectation dépôt utilisateur est porté par une validation dédiée dans `lib/validators/user.ts`.

### Service
Le service dédié d’affectation vérifie explicitement :
- la présence de l’utilisateur cible dans le tenant courant ;
- la présence du dépôt cible dans le tenant courant ;
- l’état actif du dépôt cible ;
- la mise à jour ciblée de `depotId` uniquement.

### API
La route dédiée `PATCH /api/users/[id]/depot` existe dans le patch et conserve le contrat projet :
- succès : `{ ok:true, data }`
- erreur : `{ ok:false, error, details? }`

### UI
Le module `/users` reçoit un bloc dédié pour :
- voir la base actuelle d’un utilisateur ;
- sélectionner une base active de la société ;
- enregistrer le rattachement ou la désaffectation.

## Évidence de bornage auth / RBAC / multi-tenant

Le patch reste aligné sur l’existant :
- auth par session ;
- `companyId` uniquement issu de la session ;
- contrôle d’accès via `canManageUsers` ;
- absence de nouveau système de permission ;
- absence de `companyId` transmis par le client.

## Vérifications terminales obtenues

### Commandes validées
- `npx prisma validate` : **OK**
- `npx prisma generate` : **OK**
- `npm run lint` : **OK**
- `npm run build` : **OK**

## Conclusion factuelle

Le patch `BASE-08` est cohérent, borné, validé et clôturable sans réserve documentaire supplémentaire.
