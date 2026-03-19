# NOTES

## Méthode de travail retenue

- reprise stricte des références `docs/1-master/*` et `docs/4-templates/*` ;
- prise du dépôt réel `MAJ2` comme source de vérité ;
- absence de toute reprise d’un ancien patch additif ;
- correction directe de l’état existant de `prisma/seed.ts` ;
- bornage strict au périmètre `SUP-03` ;
- aucune réouverture technique des sessions `SUP-04`, `SUP-05`, `SUP-06`.

## Arbitrages retenus

### 1. Correction directe du seed existant
Le dépôt réel `MAJ2` contenait déjà une implémentation `SUP-03` cassée dans `prisma/seed.ts`.
Le correctif retenu a donc été un correctif direct de ce fichier, et non un nouveau patch additif sur une base plus ancienne.

### 2. Typage resserré sur les variables support
Le défaut bloquant provenait d’un helper retournant `string | undefined`, ce qui laissait encore un risque TypeScript dans `readSupportSeedIdentity()`.
Le correctif retenu est :
- `readOptionalSeedString()` retourne désormais `string | null` ;
- `readSupportSeedIdentity()` refuse explicitement tout cas partiel ;
- le `return` final ne laisse plus `name`, `email` ou `password` potentiellement indéfinis.

### 3. Pas d’impact sur les comptes tenant hors stricte nécessité
Le champ `platformRole: null` a été retiré de `upsertUser()` pour les comptes tenant normaux.
Cet arbitrage respecte le bornage `SUP-03` et évite de faire tomber inutilement le seed tenant sur une base non alignée au support global.

### 4. Protection runtime limitée au seul support
Le `try/catch` a été ajouté autour de `prisma.user.upsert()` dans `upsertSupportUser()`.
Comportement retenu :
- si l’erreur correspond à une colonne `User.platformRole` absente, un warning explicite support est journalisé et la fonction retourne `null` ;
- toutes les autres erreurs restent visibles et remontent normalement.

### 5. Pas de masquage des erreurs globales hors SUP-03
Le blocage résiduel observé sur `Company` pendant `npm run db:seed` n’a pas été absorbé par `SUP-03`.
Il reste volontairement visible, car il ne relève pas du correctif support nominatif.

## Observation centrale

Le correctif code final `SUP-03` est désormais stabilisé sur son périmètre :
- patch applicable ;
- validation `prisma validate`, `prisma generate`, `lint`, `build` obtenue ;
- comportement support conforme sur base non alignée pour `User.platformRole` ;
- aucun patch supplémentaire `SUP-03` requis.

## Point restant ouvert, hors SUP-03

`npm run db:seed` reste en échec sur un écart schéma/base côté `Company`.
Ce point ne remet pas en cause la validité du correctif `SUP-03`, mais empêche une conformité pleine de la chaîne de seed globale tant qu’une session dédiée hors `SUP-03` n’a pas traité cet écart.
