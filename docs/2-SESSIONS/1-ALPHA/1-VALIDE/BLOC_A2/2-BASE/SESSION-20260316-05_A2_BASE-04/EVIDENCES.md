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

### Code réellement inspecté pour `BASE-04`
- `prisma/schema.prisma`
- `lib/api/response.ts`
- `lib/api/prisma-error.ts`
- `lib/rbac.ts`
- `lib/serializers.ts`
- `app/api/depots/route.ts`
- `app/api/company/profile/route.ts`
- `lib/services/depots/create-depot.ts`
- `lib/validators/depot.ts`

## Éléments documentaires déterminants

### Cadrage produit — module bases / dépôts
Extraits de cadrage utiles :
- `04.1 Entité base / dépôt administrable` : une base/dépôt est un **lieu de départ des véhicules**, administrable comme entité propre ;
- `04.2 Création d’une base / dépôt` : créer une base/dépôt **au sein d’une société** ;
- `04.3 Modification d’une base / dépôt` : modifier les informations d’une base/dépôt ;
- utilisateur cible : `gérant, admin` ;
- dépendance : `bases/dépôts`.

### Plan de développement — séquencement officiel
Le plan liste explicitement :
- `BASE-03 — COMPLÉTION — API création base/dépôt`
- `BASE-04 — COMPLÉTION — API modification base/dépôt`
- `BASE-05 — COMPLÉTION — API désactivation/archivage base/dépôt`

Conséquence : `BASE-04` ne doit couvrir que la modification API minimale.

## Éléments code déterminants avant modification

### Helpers API déjà présents
`lib/api/response.ts` fournit déjà :
- `ok(data, status)` ;
- `badRequest(error, details)` ;
- `unauthorized()` ;
- `forbidden()` ;
- `notFound()` ;
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

### API création déjà présente via `BASE-03`
`app/api/depots/route.ts` prouve déjà :
- la convention `POST /api/depots` ;
- l’injection serveur du `companyId` ;
- la réponse standardisée `{ ok:true, data } / { ok:false, error }` ;
- le RBAC `ADMIN` / `GERANT`.

## Éléments code effectivement ajoutés

### 1. Validateur strict de mise à jour
`lib/validators/depot.ts` ajoute un schéma Zod strict :
- `name` optionnel ;
- `address` optionnel / nullable ;
- rejet des clés supplémentaires ;
- refus d’un body vide.

### 2. Service minimal de modification
`lib/services/depots/update-depot.ts` ajoute la mise à jour Prisma :
- recherche préalable du dépôt par `id + companyId` ;
- retour `null` si le dépôt ne relève pas du tenant courant ;
- update ciblé sur les seuls champs fournis.

### 3. Route API canonique
`app/api/depots/[id]/route.ts` ajoute :
- `PATCH` uniquement ;
- `401` si `companyId` absent ;
- `403` si rôle non autorisé ;
- `400` sur params/body invalides ;
- `404` si dépôt introuvable dans le tenant ;
- `409` sur conflit d’unicité ;
- `200` sur succès.

## Vérifications terminales réellement obtenues

### Commandes confirmées
- `git apply --check`
- `git apply`
- `npx prisma validate`
- `npx prisma generate`
- `npm run lint`
- `npm run build`

### Preuves terminales retenues
- `git apply --check` : **OK** ;
- `git apply` : **OK** ;
- `npx prisma validate` : **OK** ;
- `npx prisma generate` : **OK** ;
- `npm run lint` : **OK** ;
- `npm run build` : **OK**.

### Contrôle patch retenu
- patch initial conservé ;
- patch correctif minimal séparé produit.

### Résultat terminal retenu
- le recalage `BASE-04` est validé ;
- le correctif ne rejoue pas le patch initial ;
- le dépôt réel est validé avec résultats terminaux **OK**.
