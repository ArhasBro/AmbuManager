# EVIDENCES

## Sources utilisées

### Documentation de référence
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`
- `docs/4-templates/TEMPLATE_FIN_SESSION.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`

### Références amont du bloc support
- `docs/2-sessions/1-ALPHA/BLOC_A2/3-SUP/SESSION-20260318-01_A2_SUP-01/*`
- `docs/3-patches/1-ALPHA/BLOC_A2/3-SUP/SESSION-20260318-02_A2_SUP-02/*`

### Code inspecté
- `prisma/schema.prisma`
- `prisma/seed.ts`

### Patch final retenu
- `docs/3-patches/1-ALPHA/BLOC_A2/3-SUP/SESSION-20260318-03_A2_SUP-03/SUP-03-FIX-04.diff`

## Constats factuels avant correctif final

### 1. Le dépôt réel MAJ2 contenait déjà une implémentation SUP-03 cassée
Constat relevé dans `prisma/seed.ts` avant correctif final :
- `readOptionalSeedString()` exposait encore un retour non suffisamment resserré ;
- `readSupportSeedIdentity()` laissait encore un risque de valeurs potentiellement indéfinies ;
- `upsertUser()` touchait encore `platformRole` pour des comptes tenant ;
- la protection runtime du support si `platformRole` était absent en base n’était pas stabilisée.

### 2. Le schéma Prisma côté code est bien aligné sur SUP-02
Constat relevé dans `prisma/schema.prisma` :
- le modèle supporte `PlatformRole` ;
- le champ `User.platformRole` existe dans le schéma ;
- `SUP-03` devait donc corriger le seed, pas le schéma.

## Correctif code effectivement retenu

### Fichier modifié
- `prisma/seed.ts`

### Correctifs effectivement introduits
- `readOptionalSeedString()` retourne `string | null` ;
- `readSupportSeedIdentity()` valide explicitement :
  - `providedCount !== 3 || name === null || email === null || password === null` ;
- `upsertUser()` ne force plus `platformRole: null` pour les comptes tenant ;
- `upsertSupportUser()` entoure l’`upsert` support d’un `try/catch` ciblé ;
- si la colonne `User.platformRole` manque en base, le support journalise un warning explicite puis retourne `null` ;
- `main()` n’appelle `setUserPermissions(...)` que si `supportUser` existe.

## Validations terminales réelles conservées

### Validation code
- `git apply --check` : **OK**
- `git apply` : **OK**
- `npx prisma validate` : **OK**
- `npx prisma generate` : **OK**
- `npm run lint` : **OK**
- `npm run build` : **OK**

### Comportement seed
- `npm run db:seed` sans variables support : **échec restant hors SUP-03**, dû à un écart schéma/base côté `Company`.
- `npm run db:seed` avec variables support : **comportement SUP-03 conforme observé** :
  - warning explicite sur `User.platformRole` absent ;
  - absence de crash spécifique support ;
  - les autres erreurs globales du seed restent visibles.

## Conclusion factuelle

Le correctif code `SUP-03` est validé sur son périmètre propre.
Le blocage résiduel de `db:seed` ne provient pas du support nominatif, mais d’un problème distinct côté `Company`, explicitement hors `SUP-03`.
