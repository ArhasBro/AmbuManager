# NOTES

## Méthode / observations

### 1. Bornage strict appliqué
La session a été bornée strictement à `BASE-03` :
- création API uniquement ;
- aucun élargissement vers `BASE-04+` ;
- aucun retour sur `A1` ;
- aucun rattachement métier supplémentaire.

### 2. Réemploi des briques déjà présentes dans le dépôt
Le dépôt dispose déjà de briques cohérentes pour cette session :
- helpers API `ok`, `badRequest`, `unauthorized`, `forbidden`, `conflict`, `serverError` ;
- mapper Prisma `prismaToHttp` ;
- helper RBAC `requireRole` ;
- sérialisation ISO via `serializeDates` ;
- modèle Prisma `Depot` déjà intégré par `BASE-02`.

### 3. Choix d’architecture retenu
Pour respecter l’ordre `Data -> Services -> API -> UI` sans surconstruire :
- pas de changement data dans cette session ;
- ajout d’un service minimal `createDepot` ;
- ajout d’un validateur dédié ;
- ajout d’une seule route `POST`.

### 4. Validation d’entrée volontairement stricte
Le body est validé via un schéma Zod `.strict()`.

Conséquence recherchée :
- `companyId` fourni par le client est refusé ;
- `isActive` fourni par le client est refusé ;
- tout champ non prévu est refusé en `400`.

### 5. RBAC retenu
Conformément au cadrage `04.2` et à l’ouverture de session :
- seuls `ADMIN` et `GERANT` peuvent créer un dépôt ;
- aucune permission dédiée n’est introduite.

### 6. Incident intermédiaire réellement observé
Lors de la première tentative de build, une erreur TypeScript était observée :

`Property 'depot' does not exist on type PrismaClient`

Cause réelle :
- Prisma Client n’avait pas été régénéré après l’ajout du modèle `Depot`.

Correction appliquée :
- `npx prisma generate`

### 7. Validation terminale finale
Après régénération du Prisma Client, les vérifications terminales réelles sont toutes validées :
- `npx prisma validate` : OK ;
- `npx prisma generate` : OK ;
- `npm run lint` : OK ;
- `npm run build` : OK.

La route API est bien présente dans le build Next.js :
- `ƒ /api/depots`

### 8. Seed inchangé
`prisma/seed.ts` n’a pas été modifié, volontairement et explicitement.
