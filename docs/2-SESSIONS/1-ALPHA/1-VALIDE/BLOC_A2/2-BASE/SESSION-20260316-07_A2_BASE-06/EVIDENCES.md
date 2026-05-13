# EVIDENCES

## Sources utilisées

### Documentation officielle relue
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

### Code réellement concerné par `BASE-06`
- `app/dashboard/page.tsx`
- `app/depots/page.tsx`
- `app/depots/depots-client.tsx`
- `app/api/depots/route.ts`
- `app/api/depots/[id]/route.ts`
- `app/api/depots/[id]/archive/route.ts`
- `lib/auth.ts`
- `lib/prisma.ts`

## Éléments documentaires déterminants

### Cadrage produit — module bases / dépôts
Extraits de cadrage utiles :
- `04.1 Entité base / dépôt administrable` : une base / dépôt est une entité propre de la société ;
- `04.2 Création d’une base / dépôt` : création au sein de la société courante ;
- `04.3 Modification d’une base / dépôt` : modification bornée des informations ;
- besoin produit rappelé : interface minimale de gestion, sans ouvrir de rattachements métier supplémentaires.

### Plan de développement — séquencement officiel
Le plan liste explicitement :
- `BASE-03 — COMPLÉTION — API création base/dépôt`
- `BASE-04 — COMPLÉTION — API modification base/dépôt`
- `BASE-05 — COMPLÉTION — API désactivation/archivage base/dépôt`
- `BASE-06 — COMPLÉTION — UI gestion des bases/dépôts`

Conséquence : `BASE-06` couvre uniquement la couche UI minimale s’appuyant sur l’existant.

## Éléments code déterminants retenus

### Page serveur `/depots`
`app/depots/page.tsx` montre :
- lecture de session via `getServerSession(authOptions)` ;
- redirection `/login` si session absente ou `companyId` absent ;
- contrôle de rôle local limité à `ADMIN` / `GERANT` ;
- lecture Prisma bornée à `where: { companyId: user.companyId }` ;
- sérialisation de `createdAt` et `updatedAt` vers des chaînes ISO pour le composant client.

### Lien dashboard
`app/dashboard/page.tsx` ajoute :
- `depotsAllowed = user.role === "ADMIN" || user.role === "GERANT"` ;
- lien `<Link href="/depots">Bases / dépôts</Link>` dans le bloc admin.

### Composant client minimal
`app/depots/depots-client.tsx` couvre :
- formulaire de création ;
- édition de `name` et `address` seulement ;
- archivage d’un dépôt actif ;
- distinction visuelle `Actif` / `Archivé` ;
- réutilisation du contrat API `{ ok:true, data } / { ok:false, error }`.

### Intégration aux routes existantes
Le composant client appelle uniquement :
- `POST /api/depots`
- `PATCH /api/depots/[id]`
- `POST /api/depots/[id]/archive`

Aucune nouvelle API supplémentaire n’est créée dans `BASE-06`.

## Preuves de bornage RBAC / multi-tenant

### RBAC UI
Preuves retenues :
- accès à `/depots` borné à `ADMIN` / `GERANT` dans `app/depots/page.tsx` ;
- lien dashboard borné au même couple de rôles dans `app/dashboard/page.tsx`.

### Multi-tenant lecture
Preuve retenue :
- `prisma.depot.findMany({ where: { companyId: user.companyId } })` dans `app/depots/page.tsx`.

### Multi-tenant écriture
Preuve retenue :
- les opérations client passent exclusivement par les routes `BASE-03`, `BASE-04`, `BASE-05`, déjà validées sur le contrôle tenant côté serveur ;
- aucune valeur `companyId` n’est envoyée par l’UI.

## Éléments exclus explicitement

- aucune suppression physique ;
- aucune réactivation ;
- aucun rattachement `Vehicle`, `User`, `Shift`, `DraftShift`, `ShiftTemplate` ;
- aucune nouvelle logique métier hors UI ;
- aucune modification de `prisma/schema.prisma` ;
- aucune modification de `prisma/seed.ts` ;
- aucune ouverture `BASE-07+`.

## Résultats réels des vérifications terminales

Commandes confirmées sur le dépôt réel :
- `npx prisma validate` : **OK**
- `npx prisma generate` : **OK**
- `npm run lint` : **OK**
- `npm run build` : **OK**
