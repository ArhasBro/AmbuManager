# EVIDENCES

## Sources utilisées

### Documentation
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`

### Code concerné par la session
- `prisma/schema.prisma`
- `prisma/migrations/20260318203000_sup02_platform_support_role/migration.sql`
- `lib/auth.ts`
- `types/next-auth.d.ts`
- `lib/rbac.ts`
- `lib/permissions.ts`
- `app/dashboard/page.tsx`
- `lib/services/planning/matching.service.ts`
- `lib/services/users/assign-user-depot.ts`

## Patchs code de la session

- patch principal : `SUP-02.diff`
- correctif d’application : `SUP-02-FIX-APPLY.diff`

## Incident intermédiaire corrigé avant validation finale

Constat intermédiaire : un index erroné `@@index([platformRole])` avait été ajouté dans `model Vehicle`.
Conséquence observée avant correctif : échec Prisma sur le schéma.
Correctif appliqué avant clôture : suppression de cet index erroné via `SUP-02-FIX-APPLY.diff`.

## Commandes exécutées pour la validation finale

Application patchs :
- `git apply --check "docs/3-patches/1-ALPHA/BLOC_A2/3-SUP/SESSION-20260318-02_A2_SUP-02/SUP-02.diff"`
- `git apply "docs/3-patches/1-ALPHA/BLOC_A2/3-SUP/SESSION-20260318-02_A2_SUP-02/SUP-02.diff"`
- `git apply --check "docs/3-patches/1-ALPHA/BLOC_A2/3-SUP/SESSION-20260318-02_A2_SUP-02/SUP-02-FIX-APPLY.diff"`
- `git apply "docs/3-patches/1-ALPHA/BLOC_A2/3-SUP/SESSION-20260318-02_A2_SUP-02/SUP-02-FIX-APPLY.diff"`

Validation terminale :
- `npx prisma validate`
- `npx prisma generate`
- `npm run lint`
- `npm run build`

## Résultats observés

Résultats finaux validés :
- `git apply` du patch `SUP-02` : **OK**
- `git apply` du correctif `SUP-02-FIX-APPLY` : **OK**
- `npx prisma validate` : **OK**
- `npx prisma generate` : **OK**
- `npm run lint` : **OK**
- `npm run build` : **OK**

## Preuves textuelles synthétiques

### 1. Prisma validate
Le schéma Prisma final est valide après retrait de l’index erroné porté par `Vehicle`.

### 2. Prisma generate
La génération Prisma repasse correctement une fois le schéma final corrigé.

### 3. Lint
La passe `eslint` est verte sur l’état final validé de la session.

### 4. Build
Le build Next.js est vert sur l’état final validé de la session.

## Conclusion factuelle

La session a été validée sur un état final propre :
- le rôle support global est modélisé ;
- le correctif intermédiaire sur l’index `Vehicle` a été absorbé avant clôture ;
- la chaîne technique finale est verte.
