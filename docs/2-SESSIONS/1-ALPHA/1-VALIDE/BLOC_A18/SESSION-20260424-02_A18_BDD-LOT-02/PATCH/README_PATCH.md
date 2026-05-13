# README_PATCH - SESSION-20260424-02_A18_BDD-LOT-02

## Patchs valides
- Patch principal code : `PATCH__SESSION-20260424-02_A18_BDD-LOT-02.diff`
- Patch documentaire final : `PATCH__SESSION-20260424-02_A18_BDD-LOT-02_DOCS.diff`

## Perimetre
- chaine BDD Prisma uniquement ;
- aucun elargissement hors bloc A18 ;
- aucune nouvelle migration SQL ;
- documentation BDD sensible ajoutee dans le depot.

## Contenu reel du patch principal
- realignement de `prisma/schema.prisma` sur les preuves `BDD-01` pour `User.company` et `ShiftTemplate.secondaryAllowedRoles` ;
- ajout du support optionnel de `SHADOW_DATABASE_URL` dans `prisma.config.ts` ;
- ajout de `SEED_USER_PASSWORD` et commentaire explicite sur la shadow database dans `.env` ;
- seed rendu idempotent sur la base locale auditee par preservation du tenant A deja rattache a `admin@ambulance.local` (`SC Ambulances`) ;
- ajout du guide `docs/BDD_OPERATIONS_SENSIBLES.md`.

## Contenu reel du patch documentaire final
- completion de `SESSION.md`, `NOTES.md`, `EVIDENCES.md`, `RESULTATS.md`, `FIN_SESSION.md` ;
- mise a jour du present `README_PATCH.md` avec les validations et le contenu reel des patchs.

## Commandes d'application

```bash
git apply --check "docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-02_A18_BDD-LOT-02/PATCH/PATCH__SESSION-20260424-02_A18_BDD-LOT-02.diff"
git apply         "docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-02_A18_BDD-LOT-02/PATCH/PATCH__SESSION-20260424-02_A18_BDD-LOT-02.diff"
git apply --check "docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-02_A18_BDD-LOT-02/PATCH/PATCH__SESSION-20260424-02_A18_BDD-LOT-02_DOCS.diff"
git apply         "docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-02_A18_BDD-LOT-02/PATCH/PATCH__SESSION-20260424-02_A18_BDD-LOT-02_DOCS.diff"
```

## Validations terminales prouvees
- `git apply --check PATCH__SESSION-20260424-02_A18_BDD-LOT-02.diff` : `OK`
- `git apply PATCH__SESSION-20260424-02_A18_BDD-LOT-02.diff` : `OK`
- `npx prisma validate` : `OK`
- `npx prisma generate` : `OK`
- `npx prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma --exit-code` : `OK`
- `npx prisma db seed` : `OK`
- `npx prisma migrate diff --from-migrations prisma/migrations --to-config-datasource --script` : `NON EXECUTABLE DANS L'ENVIRONNEMENT COURANT`
- `npm run lint` : `OK`
- `npm run build` : `OK`
