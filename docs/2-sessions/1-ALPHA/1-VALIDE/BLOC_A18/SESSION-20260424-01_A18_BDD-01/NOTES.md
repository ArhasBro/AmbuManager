# NOTES

## Methode / observations

### 1. Ordre de controle reellement applique
1. Relecture des documents maitres obligatoires et du template de debut de session.
2. Inspection du code source BDD reel : config Prisma, schema, migrations, seed, environnement, scripts associes.
3. Verification de la base locale par commandes Prisma et lectures SQL en lecture seule.
4. Qualification des ecarts prouves sans correction du depot.
5. Redaction documentaire finale et maintien de la decision `NO_PATCH`.

### 2. Configuration Prisma observee
- `prisma.config.ts` charge `dotenv/config` et pointe vers :
  - schema `./prisma/schema.prisma`
  - migrations `./prisma/migrations`
  - seed `tsx prisma/seed.ts`
  - datasource `process.env.DATABASE_URL`
- aucune `shadowDatabaseUrl` n'est definie dans la configuration constatee.

### 3. Etat reel de la base locale
- `npx prisma migrate status` constate :
  - base `ambulance_db`
  - schema `public`
  - 25 migrations trouvees
  - base "up to date"
- lecture SQL reelle :
  - 16 tables dans `public`
  - 25 entrees dans `_prisma_migrations`
  - 0 migration rollback
  - derniere migration appliquee : `20260416143000_add_login_audit_log`

### 4. Drift prouve schema <-> base
Le diff explicite `npx prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma --exit-code`
retourne `exit code 2` et signale deux ecarts reels :
- `ShiftTemplate.secondaryAllowedRoles`
  - migration : colonne creee avec `DEFAULT ARRAY[]::"Role"[]`
  - base locale : default present
  - `prisma/schema.prisma` : champ sans `@default([])`
- relation `User.company`
  - migration initiale : FK `ON DELETE RESTRICT`
  - base locale : contrainte `User_companyId_fkey` en `RESTRICT`
  - `prisma/schema.prisma` : relation optionnelle sans `onDelete`, introspectee par Prisma en `onDelete: Restrict` cote base

Conclusion :
- migrations et base sont alignees sur ces deux points ;
- le fichier `prisma/schema.prisma` n'est pas la copie fidele de la base locale actuelle.

### 5. Contraintes et garde-fous presents en base
- la migration `20260318203000_sup02_platform_support_role` ajoute un `CHECK` `User_role_scope_check`
- `npx prisma db pull --print` avertit que cette contrainte n'est pas pleinement supportee par Prisma Client
- la migration `20260407093000_tpl03_enforce_template_company_integrity` ajoute des fonctions/trigger SQL
- les triggers existent reellement sur `DraftShift`, `Shift` et `ShiftTemplate`

Conclusion :
- le contrat reel de la base depasse ce qui est visible dans `schema.prisma` seul ;
- les migrations SQL sont une partie essentielle de la verite technique BDD.

### 6. Seed observe
Le seed:
- utilise `DATABASE_URL` via `pg` + `PrismaPg`
- depend de `ALPHA_PERMISSION_CATALOG`
- exige `SEED_ADMIN_PASSWORD`
- exige aussi `SEED_USER_PASSWORD`, sauf si `ALLOW_INSECURE_SEED_DEFAULTS=true`
- active le compte support seulement si les trois variables `SEED_SUPPORT_*` sont toutes presentes
- upsert les societes par `name`

Constats reels sur l'environnement courant :
- `.env` contient `SEED_ADMIN_PASSWORD`
- `.env` ne contient pas `SEED_USER_PASSWORD`
- `.env` ne contient pas `ALLOW_INSECURE_SEED_DEFAULTS=true`
- `.env` ne contient pas les variables `SEED_SUPPORT_*`

Conclusion :
- avec le `.env` courant, le seed complet ne peut pas se derouler normalement car `SEED_USER_PASSWORD` manque ;
- le compte support n'est pas seedable dans l'etat actuel de l'environnement ;
- la reproductibilite du seed est incomplete.

### 7. Base locale vs seed
Base locale observee :
- societes : `SC Ambulances`, `Ambulance Manager - B`
- utilisateurs : 6
- permissions : 18
- vehicles : 4
- depots : 2
- autoschedule runs : 20
- draft shifts : 273
- shifts : 86
- planning audit logs : 33
- login audit logs : 5

Ecart prouve avec le seed :
- le seed cible la societe `Ambulance Manager`
- la base locale contient `SC Ambulances`

Conclusion :
- le seed actuel n'est pas idempotent vis-a-vis de la base locale constatee ;
- un reseed sur l'existant local ne realignerait pas strictement la societe principale observee.

### 8. Limites de preuve constatees
- la commande `npx prisma migrate diff --from-migrations prisma/migrations --to-config-datasource --script` n'a pas pu etre executee telle quelle
- resultat exact :
  - Prisma demande `--shadow-database-url` ou `datasource.shadowDatabaseUrl`

Interpretation :
- l'audit a pu prouver un drift schema <-> base ;
- en revanche, le diff automatise direct "migrations directory -> datasource" n'est pas rejouable avec la configuration actuelle sans information d'environnement supplementaire.
