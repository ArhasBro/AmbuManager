# EVIDENCES — SESSION-20260319-18_A3_USERS-10

## Sources relues
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/4-templates/*`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- sessions antérieures : `USERS-01` à `USERS-09`

## Fichiers applicatifs concernés par USERS-10
- `app/api/users/[id]/route.ts`
- `app/users/user-edit-client.tsx`
- `lib/validators/user.ts`
- `lib/permission-catalog.ts`
- `lib/permissions.ts`
- `prisma/schema.prisma`

## Éléments fonctionnels probants
- l’API d’édition accepte désormais `permissionCodes` en plus de `name`, `email`, `role` ;
- un `GET /api/users/[id]` restitue l’état réel des permissions ALPHA du compte édité ;
- l’UI charge le détail du compte sélectionné avant édition ;
- l’UI expose les permissions ALPHA via des cases à cocher ;
- la synchronisation côté API met à jour uniquement les liaisons `UserPermission` du catalogue ALPHA réel ;
- le bornage multi-tenant et l’exclusion des comptes support globaux sont conservés.

## Validation locale réellement exécutée
### Préparation environnement
`npm install`

### `git apply --check "<patch>"`
OK

```text
git apply --check "docs/3-patches/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-18_A3_USERS-10/PATCH__SESSION-20260319-18_A3_USERS-10.diff"
```

### `git apply "<patch>"`
OK

```text
git apply "docs/3-patches/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-18_A3_USERS-10/PATCH__SESSION-20260319-18_A3_USERS-10.diff"
```

### `npx prisma validate`
ÉCHEC

```text
Loaded Prisma config from prisma.config.ts.

Error: request to https://binaries.prisma.sh/all_commits/94a226be1cf2967af2541cca5529f0f7ba866919/debian-openssl-3.0.x/schema-engine.gz.sha256 failed, reason: getaddrinfo EAI_AGAIN binaries.prisma.sh
```

### `npx prisma generate`
ÉCHEC

```text
Loaded Prisma config from prisma.config.ts.

Error: request to https://binaries.prisma.sh/all_commits/94a226be1cf2967af2541cca5529f0f7ba866919/debian-openssl-3.0.x/schema-engine.gz.sha256 failed, reason: getaddrinfo EAI_AGAIN binaries.prisma.sh
```

### `npm run lint`
OK

```text
> ambulance-manager@0.1.0 lint
> eslint .
```

### `npm run build`
ÉCHEC

```text
> ambulance-manager@0.1.0 build
> next build

▲ Next.js 16.1.6 (Turbopack)

  Creating an optimized production build ...
✓ Compiled successfully in 20.2s
  Running TypeScript ...
Failed to compile.

./app/api/company/rules/route.ts:4:10
Type error: Module '"@prisma/client"' has no exported member 'RuleMode'.
```

## Bornage confirmé
- aucune dérive vers USERS-11 ;
- aucun nouveau module de rôles / permissions ;
- aucune création de permission ;
- aucune modification du schéma Prisma ;
- aucun traitement création / dépôt / mot de passe / archivage.
