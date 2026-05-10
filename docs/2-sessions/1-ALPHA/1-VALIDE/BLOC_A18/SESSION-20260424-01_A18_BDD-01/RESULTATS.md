# RESULTATS

## 1. Decision patch

- `NO_PATCH`

## 2. Analyse rapide

Etat global de la chaine BDD observe :
- Prisma est exploitable en local et le schema est syntaxiquement valide ;
- la base locale `ambulance_db` est accessible et l'historique `_prisma_migrations` est propre ;
- migrations et base locale sont alignees sur les 25 migrations constatees ;
- `prisma/schema.prisma` n'est cependant pas strictement coherent avec la base locale sur au moins deux points prouves ;
- le seed existe, mais il n'est pas pleinement rejouable avec le `.env` courant et n'est pas idempotent par rapport a la base locale observee.

## 3. Perimetre reellement audite

### Fichiers et dossiers
- `prisma.config.ts`
- `prisma/schema.prisma`
- `prisma/migrations/`
- `prisma/seed.ts`
- `.env`
- `scripts/db-backup.ps1`
- `scripts/db-restore.ps1`
- `lib/permission-catalog.ts`
- dossier documentaire de session `docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-01_A18_BDD-01/`

### Base locale
- PostgreSQL `ambulance_db`
- schema `public`
- 16 tables observees
- 25 migrations appliquees dans `_prisma_migrations`

### Commandes reellement lancees
- `npx prisma validate`
- `npx prisma migrate status`
- `npx prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma --exit-code`
- `npx prisma migrate diff --from-migrations prisma/migrations --to-config-datasource --script`
- `npx prisma db pull --print`
- lectures SQL `pg` en lecture seule

## 4. Constats d'audit

### 4.1 Points conformes
- `prisma.config.ts` est bien present et charge `dotenv/config`.
- `npx prisma validate` retourne un schema valide.
- `npx prisma migrate status` retourne "Database schema is up to date!".
- la base locale contient les tables attendues du perimetre controle, y compris `LoginAuditLog`, `Depot`, `UserAbsence`, `PlanningAuditLog`.
- la table `_prisma_migrations` contient 25 migrations, sans rollback constate.
- les scripts `db-backup.ps1` et `db-restore.ps1` existent pour les operations de sauvegarde/restauration.
- les triggers et contraintes SQL des migrations controlees existent reellement en base.

### 4.2 Points non conformes
- `prisma/schema.prisma` n'est pas strictement aligne avec la base locale et les migrations sur `User.company` :
  - schema : relation sans `onDelete`
  - base/migration : `ON DELETE RESTRICT`
- `prisma/schema.prisma` n'est pas strictement aligne avec la base locale et les migrations sur `ShiftTemplate.secondaryAllowedRoles` :
  - schema : champ sans `@default([])`
  - base/migration : default tableau vide present
- le diff Prisma base locale -> schema n'est pas vide et retourne `exit code 2`.
- le seed n'est pas rejouable normalement avec le `.env` courant car `SEED_USER_PASSWORD` manque et `ALLOW_INSECURE_SEED_DEFAULTS` n'est pas a `true`.
- le seed vise `Ambulance Manager` alors que la base locale controlee contient `SC Ambulances` ; il n'est donc pas idempotent vis-a-vis de la societe principale observee.

### 4.3 Points incomplets
- aucun `shadowDatabaseUrl` n'est fourni dans la configuration Prisma constatee ;
- le diff automatise "migrations directory -> datasource" ne peut donc pas etre rejoue tel quel avec la commande Prisma 7 employee.
- le seed ne couvre pas a lui seul l'ensemble des donnees presentes en base locale (depots, runs, drafts, shifts, audit logs deja existants).

### 4.4 Points a confirmer
- l'absence actuelle de compte support `platformRole=SUPPORT` en base locale est-elle volontaire ou residuelle ;
- le renommage fonctionnel de la societe principale en `SC Ambulances` est-il l'etat produit voulu ou un ecart entre seed et environnement local ;
- faut-il conserver les deux ecarts schema <-> base comme choix assumes, ou realigner le schema Prisma sur la base/migrations lors de `BDD-LOT-02`.

## 5. Verdict formel d'audit

- `non conforme`

Motif :
- des ecarts reels et prouves existent dans la chaine BDD entre `prisma/schema.prisma`, les migrations et la base locale ;
- le seed et l'environnement ne permettent pas une reproduction propre de l'etat local controle.

## 6. Consequence methodologique

- `BDD-LOT-02` est attendu : **OUI**

Pourquoi :
- il faut corriger et/ou completer la chaine BDD pour restaurer une source de verite coherente entre schema Prisma, migrations, base locale et seed ;
- l'audit a prouve des corrections concretes a traiter sans les executer ici.

## 7. Preuves / elements observes

### Fichiers determinants
- `prisma.config.ts:4-12`
- `prisma/schema.prisma:175-183`
- `prisma/schema.prisma:281-290`
- `prisma/migrations/20260224175839_init/migration.sql:62-63`
- `prisma/migrations/20260318203000_sup02_platform_support_role/migration.sql:11-25`
- `prisma/migrations/20260407120000_tpl07_13_templates_admin_module/migration.sql:5-10`
- `prisma/seed.ts:16-27`
- `prisma/seed.ts:44-60`
- `prisma/seed.ts:286-290`
- `prisma/seed.ts:312-387`
- `.env:12-15`
- `scripts/db-backup.ps1`
- `scripts/db-restore.ps1`

### Commandes et resultats clefs
- `npx prisma validate` : **OK**
- `npx prisma migrate status` : **OK** / 25 migrations / base a jour
- `npx prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma --exit-code` : **KO fonctionnel** / `exit code 2` / diff non vide
- `npx prisma migrate diff --from-migrations prisma/migrations --to-config-datasource --script` : **NON EXECUTABLE DANS LA CONFIG ACTUELLE**
- `npx prisma db pull --print` : **OK** avec schema introspecte divergent et warning sur `User_role_scope_check`

### Base locale observee
- version PostgreSQL : `16.12`
- tables : `16`
- migrations appliquees : `25`
- dernier nom de migration appliquee : `20260416143000_add_login_audit_log`
- societes : `SC Ambulances`, `Ambulance Manager - B`

## 8. Livrables production

### Livrables constates / produits
- `PATCH/NO_PATCH.md`
- documentation finale de session :
  - `SESSION.md`
  - `NOTES.md`
  - `EVIDENCES.md`
  - `RESULTATS.md`
  - `FIN_SESSION.md`
- ZIP documentaire final : `SESSION-20260424-01_A18_BDD-01_DOCS.zip`

### Documents modifies
- `docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-01_A18_BDD-01/SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-01_A18_BDD-01/NOTES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-01_A18_BDD-01/EVIDENCES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-01_A18_BDD-01/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-01_A18_BDD-01/FIN_SESSION.md`
