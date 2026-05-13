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

### Code réellement inspecté pour `BASE-03`
- `prisma/schema.prisma`
- `lib/api/response.ts`
- `lib/api/prisma-error.ts`
- `lib/rbac.ts`
- `lib/serializers.ts`
- `app/api/vehicles/route.ts`
- `app/api/company/profile/route.ts`
- `app/api/company/rules/route.ts`
- `app/api/depots/route.ts`
- `lib/services/depots/create-depot.ts`
- `lib/validators/depot.ts`

## Éléments documentaires déterminants

### Cadrage produit — module bases / dépôts
Extraits de cadrage utiles :
- `04.1 Entité base / dépôt administrable` : une base/dépôt est un **lieu de départ des véhicules**, administrable comme entité propre ;
- `04.2 Création d’une base / dépôt` : créer une base/dépôt **au sein d’une société** ;
- utilisateur cible : `gérant, admin` ;
- dépendance : `société`.

### Plan de développement — séquencement officiel
Le plan liste explicitement :
- `BASE-02 — COMPLÉTION — Création du modèle base/dépôt`
- `BASE-03 — COMPLÉTION — API création base/dépôt`
- `BASE-04 — COMPLÉTION — API modification base/dépôt`

Conséquence : `BASE-03` ne doit couvrir que la création API.

## Éléments code déterminants avant modification

### Helpers API déjà présents
`lib/api/response.ts` fournit déjà :
- `ok(data, status)` ;
- `badRequest(error, details)` ;
- `unauthorized()` ;
- `forbidden()` ;
- `conflict(error, details)` ;
- `serverError(details)`.

### Mapper Prisma déjà présent
`lib/api/prisma-error.ts` mappe déjà :
- `P2002` -> `409 CONFLICT` ;
- `P2025` -> `404 NOT_FOUND`.

### RBAC minimal déjà présent
`lib/rbac.ts` expose `requireRole(userRole, allowed)`.

### Modèle `Depot` déjà présent via `BASE-02`
`prisma/schema.prisma` contient déjà :
- `companyId` ;
- `name` ;
- `address` ;
- `isActive` ;
- `@@unique([companyId, name])`.

Conséquence : `BASE-03` n’avait pas à modifier le schéma.

## Éléments code effectivement ajoutés

### 1. Validateur strict de création
`lib/validators/depot.ts` ajoute un schéma Zod strict :
- `name` requis ;
- `address` optionnel / nullable ;
- rejet des clés supplémentaires.

### 2. Service minimal de création
`lib/services/depots/create-depot.ts` ajoute la création Prisma :
- `companyId` injecté par le serveur ;
- `name` et `address` issus du body validé ;
- sélection des champs utiles du dépôt créé.

### 3. Route API canonique
`app/api/depots/route.ts` ajoute :
- `POST` uniquement ;
- `401` si `companyId` absent ;
- `403` si rôle non autorisé ;
- `400` sur body invalide ;
- `409` sur conflit d’unicité ;
- `201` sur succès.

## Vérifications terminales réellement obtenues

### Commandes exécutées
- `npx prisma validate`
- `npx prisma generate`
- `npm run lint`
- `npm run build`

### Preuves terminales retenues
- Prisma schema loaded ;
- Prisma Client generated ;
- Next.js build successful ;
- route API détectée : `/api/depots`.

### Résultat terminal validé
- `npx prisma validate` : **OK** ;
- `npx prisma generate` : **OK** ;
- `npm run lint` : **OK** ;
- `npm run build` : **OK**.
