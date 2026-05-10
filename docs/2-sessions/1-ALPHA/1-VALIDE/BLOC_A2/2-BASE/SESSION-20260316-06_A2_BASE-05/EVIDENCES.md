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

### Code réellement concerné par `BASE-05`
- `prisma/schema.prisma`
- `app/api/depots/route.ts`
- `app/api/depots/[id]/route.ts`
- `app/api/depots/[id]/archive/route.ts`
- `lib/services/depots/create-depot.ts`
- `lib/services/depots/update-depot.ts`
- `lib/services/depots/archive-depot.ts`
- `lib/validators/depot.ts`
- `lib/api/response.ts`
- `lib/api/prisma-error.ts`
- `lib/rbac.ts`
- `lib/serializers.ts`

## Éléments documentaires déterminants

### Cadrage produit — module bases / dépôts
Extraits de cadrage utiles :
- `04.1 Entité base / dépôt administrable` : une base/dépôt est une entité propre de la société ;
- `04.2 Création d’une base / dépôt` : création au sein d’une société ;
- `04.3 Modification d’une base / dépôt` : modification bornée des informations ;
- besoin produit rappelé : préserver l’historique via archivage logique plutôt que suppression.

### Plan de développement — séquencement officiel
Le plan liste explicitement :
- `BASE-03 — COMPLÉTION — API création base/dépôt`
- `BASE-04 — COMPLÉTION — API modification base/dépôt`
- `BASE-05 — COMPLÉTION — API désactivation/archivage base/dépôt`

Conséquence : `BASE-05` couvre uniquement l’archivage logique d’un dépôt existant.

## Éléments code déterminants retenus

### Modèle `Depot` déjà présent via `BASE-02`
`prisma/schema.prisma` contient déjà :
- `companyId` ;
- `name` ;
- `address` ;
- `isActive` ;
- `@@unique([companyId, name])`.

### Helpers API déjà présents
`lib/api/response.ts` fournit déjà :
- `ok(data, status)` ;
- `badRequest(error, details)` ;
- `unauthorized()` ;
- `forbidden()` ;
- `notFound()` ;
- `serverError(details)`.

### Mapper Prisma déjà présent
`lib/api/prisma-error.ts` mappe déjà les erreurs Prisma sans nécessiter de nouveau contrat spécifique pour `BASE-05`.

### RBAC minimal déjà présent
`lib/rbac.ts` expose `requireRole(userRole, allowed)`.

### API création déjà présente via `BASE-03`
`app/api/depots/route.ts` prouve déjà :
- la convention `POST /api/depots` ;
- l’injection serveur du `companyId` ;
- la réponse standardisée `{ ok:true, data } / { ok:false, error }` ;
- le RBAC `ADMIN` / `GERANT`.

### API modification déjà présente via `BASE-04`
`app/api/depots/[id]/route.ts` confirme la cohérence de l’arborescence par identifiant.

### API archivage présente pour `BASE-05`
`app/api/depots/[id]/archive/route.ts` couvre désormais :
- `POST` uniquement ;
- `401` si session absente / `companyId` absent ;
- `403` si rôle non autorisé ;
- `400` sur params invalides ;
- `404` si dépôt introuvable dans le tenant ;
- `200` sur succès.

### Service minimal d’archivage présent
`lib/services/depots/archive-depot.ts` couvre :
- recherche préalable du dépôt par `id + companyId` ;
- retour `null` si le dépôt ne relève pas du tenant courant ;
- retour direct de l’existant si `isActive` est déjà `false` ;
- update ciblé `isActive = false` sinon.

## Éléments documentaires effectivement intégrés dans cette correction

### Dossier session
- `SESSION.md`
- `NOTES.md`
- `EVIDENCES.md`
- `RESULTATS.md`
- `FIN_SESSION.md`

### Dossier patch
- `README_PATCH.md`
- patch documentaire séparé et minimal produit pour intégration rejouable.

## Vérifications terminales réellement confirmées

### Commandes validées sur le dépôt réel
- `npx prisma validate` : **OK**
- `npx prisma generate` : **OK**
- `npm run lint` : **OK**
- `npm run build` : **OK**

### Résultat terminal retenu
- code `BASE-05` validé sur le fond ;
- documentation obligatoire intégrée dans le dépôt réel ;
- session désormais clôturable comme **conforme**.
