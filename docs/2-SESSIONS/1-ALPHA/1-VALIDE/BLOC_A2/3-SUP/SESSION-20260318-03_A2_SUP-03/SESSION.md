# SESSION

## ID SESSION

`SESSION-20260318-03_A2_SUP-03`

## Date

`2026-03-19`

## Contexte

Projet : `Investissement`  
Sous-projet : `Ambulance Manager`  
Stage : `1-ALPHA`  
Bloc : `A2`  
Type : `COMPLETION`  
Intitulé : `Ajout du compte support nominatif`

La session s’inscrit dans la continuité de `SUP-01` (audit du besoin réel support propriétaire) et `SUP-02` (modélisation du rôle plateforme global distinct des rôles client).  
Le dépôt réel MAJ2 contenait déjà une implémentation `SUP-03` partielle et instable dans `prisma/seed.ts`, qui devait être corrigée sans élargissement vers `SUP-04`, `SUP-05` ou `SUP-06`.

## Objectif exact de la session

Stabiliser le seed du compte support nominatif dans `prisma/seed.ts`, avec bornage strict :
- compte global ;
- nominatif ;
- hors société ;
- `platformRole = SUPPORT` ;
- `role = null` ;
- `companyId = null` ;
- `depotId = null` ;
- aucun droit global implicite supplémentaire ;
- comportement idempotent ;
- absence de crash spécifique support si la base n’est pas alignée sur `User.platformRole`.

## Périmètre exact traité

Sources code contrôlées et/ou modifiées :
- `prisma/seed.ts`
- `prisma/schema.prisma`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`
- `docs/4-templates/TEMPLATE_FIN_SESSION.md`

Périmètre réellement modifié :
- `prisma/seed.ts` uniquement.

Périmètre explicitement non traité :
- Prisma schema ;
- auth / NextAuth ;
- RBAC / permissions ;
- UI ;
- API ;
- logique support cross-company ;
- visibilité support côté client (`SUP-04`) ;
- audit renforcé (`SUP-05`) ;
- validation du bloc (`SUP-06`).

## Résultat synthétique de session

Le correctif code `SUP-03` est validé sur son périmètre propre.

Le patch final retenu est :
- `docs/3-patches/1-ALPHA/BLOC_A2/3-SUP/SESSION-20260318-03_A2_SUP-03/SUP-03-FIX-04.diff`

Le correctif apporte :
- correction du typage sur les variables support ;
- resserrage de `readSupportSeedIdentity()` pour garantir trois `string` strictes ;
- retrait de `platformRole: null` sur les comptes tenant seedés par `upsertUser()` ;
- protection ciblée du seed support si la colonne `User.platformRole` manque en base ;
- appel conditionnel à `setUserPermissions(...)` uniquement si le compte support a réellement été upserté.

## État de clôture

Verdict documentaire de session : **`partiellement conforme`**.

Motif :
- le correctif code `SUP-03` est validé sur son périmètre ;
- aucun patch code supplémentaire `SUP-03` n’est requis ;
- `npm run db:seed` reste en échec sur un écart schéma/base côté `Company`, explicitement hors périmètre `SUP-03`.
