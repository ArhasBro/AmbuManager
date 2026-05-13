# RESULTATS

## 1. Decision patch

- `PATCH OUI`

Motif :
- `BDD-01` avait prouve une derive reelle du schema Prisma par rapport aux migrations / a la base locale, un seed non pleinement rejouable avec l'environnement courant, ainsi qu'un manque de cadrage explicite des operations BDD sensibles.

## 2. Perimetre reellement traite

### Patch principal code
- `prisma/schema.prisma`
- `prisma/seed.ts`
- `prisma.config.ts`
- `.env`
- `docs/BDD_OPERATIONS_SENSIBLES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-02_A18_BDD-LOT-02/PATCH/PATCH__SESSION-20260424-02_A18_BDD-LOT-02.diff`

### Patch documentaire final
- `docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-02_A18_BDD-LOT-02/SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-02_A18_BDD-LOT-02/NOTES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-02_A18_BDD-LOT-02/EVIDENCES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-02_A18_BDD-LOT-02/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-02_A18_BDD-LOT-02/FIN_SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-02_A18_BDD-LOT-02/PATCH/README_PATCH.md`

## 3. Analyse avant patch

Ecarts `BDD-01` reellement corriges / completes :
- derive `User.company` corrigee par ajout explicite de `onDelete: Restrict` dans `prisma/schema.prisma` ;
- derive `ShiftTemplate.secondaryAllowedRoles` corrigee par ajout de `@default([])` dans `prisma/schema.prisma` ;
- seed rendu rejouable avec l'environnement courant via ajout de `SEED_USER_PASSWORD` dans `.env` ;
- seed rendu idempotent sur la base locale auditee via preservation de la societe deja rattachee a `admin@ambulance.local` (`SC Ambulances`) ;
- clarification de l'environnement Prisma via support conditionnel de `SHADOW_DATABASE_URL` ;
- documentation des operations sensibles BDD ajoutee dans `docs/BDD_OPERATIONS_SENSIBLES.md`.

Lien strict avec `BDD-01` :
- aucun nouvel ecart hors audit n'a ete traite ;
- aucune refonte globale Prisma n'a ete engagee ;
- aucune migration historique n'a ete recomposee car `BDD-01` avait deja etabli l'alignement migrations/base.

## 4. Patch produit

### Patch principal
- `PATCH__SESSION-20260424-02_A18_BDD-LOT-02.diff`

### Patch documentaire final
- `PATCH__SESSION-20260424-02_A18_BDD-LOT-02_DOCS.diff`

### Changements reels
- schema Prisma realigne sur les contraintes / defaults deja prouvees en base ;
- logique de resolution du tenant A ajoutee dans le seed pour eviter le doublon `Ambulance Manager` ;
- environnement local complete avec `SEED_USER_PASSWORD` et documentation de `SHADOW_DATABASE_URL` ;
- guide BDD local ajoute pour sauvegarde, restauration, reset et diff Prisma sensible.

## 5. Validations terminales

- `git apply --check PATCH__SESSION-20260424-02_A18_BDD-LOT-02.diff` : `OK`
- `git apply PATCH__SESSION-20260424-02_A18_BDD-LOT-02.diff` : `OK`
- `npx prisma validate` : `OK`
- `npx prisma generate` : `OK`
- `npx prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma --exit-code` : `OK` / `No difference detected.`
- `npx prisma db seed` : `OK`
- `npx prisma migrate diff --from-migrations prisma/migrations --to-config-datasource --script` : `NON EXECUTABLE DANS L'ENVIRONNEMENT COURANT`
- `npm run lint` : `OK`
- `npm run build` : `OK`

Justification de l'impossibilite restante :
- aucune valeur `SHADOW_DATABASE_URL` n'est fournie dans `.env` ;
- le code sait maintenant la consommer, mais aucun shadow database reel n'est provisionne.

## 6. Correctif minimal eventuel

- `AUCUN`

## 7. Resultat session

- session executee proprement ;
- patch principal applique ;
- documentation finale completee ;
- aucun fix complementaire requis ;
- point restant non resolu par manque d'information environnementale : provisionnement d'une vraie `SHADOW_DATABASE_URL` si le diff `migrations -> datasource` doit etre relance.

## 8. Livrables production

- patch principal : `PATCH__SESSION-20260424-02_A18_BDD-LOT-02.diff`
- patch documentaire final : `PATCH__SESSION-20260424-02_A18_BDD-LOT-02_DOCS.diff`
- `README_PATCH.md`
- documentation finale de session
- ZIP documentaire final : `SESSION-20260424-02_A18_BDD-LOT-02_DOCS.zip`
