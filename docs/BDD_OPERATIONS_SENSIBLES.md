# BDD - Operations sensibles

Ce document cadre uniquement les operations locales sensibles de la chaine Prisma / PostgreSQL.

## 1. Variables d'environnement BDD

Variables actuellement prises en charge par le depot :

- `DATABASE_URL` : obligatoire pour `prisma validate`, `prisma generate`, `prisma migrate *`, `prisma db seed`, `scripts/db-backup.ps1` et `scripts/db-restore.ps1`.
- `SHADOW_DATABASE_URL` : optionnelle dans `prisma.config.ts`, mais requise pour `npx prisma migrate diff --from-migrations prisma/migrations --to-config-datasource --script`.
- `SEED_ADMIN_PASSWORD` : mot de passe obligatoire du tenant A.
- `SEED_USER_PASSWORD` : mot de passe obligatoire des utilisateurs de demonstration hors admin, sauf si `ALLOW_INSECURE_SEED_DEFAULTS=true`.
- `SEED_ADMIN_B_PASSWORD` : optionnelle ; par defaut le seed reutilise `SEED_ADMIN_PASSWORD`.
- `SEED_SUPPORT_NAME`, `SEED_SUPPORT_EMAIL`, `SEED_SUPPORT_PASSWORD` : configuration tout-ou-rien du compte support `platformRole=SUPPORT`.
- `ALLOW_INSECURE_SEED_DEFAULTS=true` : reserve aux donnees de demonstration locales ; ne pas l'utiliser pour masquer un environnement incomplet.

Regles :

- ne jamais reutiliser `DATABASE_URL` comme `SHADOW_DATABASE_URL` ;
- si `SHADOW_DATABASE_URL` n'est pas provisionnee, le diff Prisma "migrations -> datasource" reste indisponible ;
- si une variable seed sensible manque, corriger l'environnement plutot que d'introduire un fallback implicite non trace.

## 2. Seed et idempotence locale

Le seed reste limite au perimetre de demonstration A/B deja present dans le depot.

Comportement cible :

- les permissions globales sont upsert ;
- les comptes, vehicules et templates des tenants A/B sont upsert ;
- le tenant A preserve la societe deja rattachee a `admin@ambulance.local` si elle existe deja ;
- l'alias local observe `SC Ambulances` est donc reutilise au lieu de creer un doublon `Ambulance Manager`.

Consequence :

- `npx prisma db seed` peut etre rejoue sur la base locale controlee sans recreer une troisieme societe pour le tenant A ;
- l'absence des variables `SEED_SUPPORT_*` laisse volontairement le compte support non seed.

## 3. Operations destructrices ou sensibles

Avant toute operation destructive, executer une sauvegarde explicite.

### Sauvegarde

```powershell
npm run db:backup
```

Preconditions :

- `DATABASE_URL` doit etre definie ;
- `pg_dump` doit etre disponible dans le `PATH`.

### Restauration

```powershell
npm run db:restore -- -InputPath "C:\path\to\backup.dump" -Force
```

Attention :

- `db:restore` est destructif par conception ;
- le script refuse l'execution sans `-Force` ;
- `pg_restore` doit etre disponible dans le `PATH`.

### Reset local complet

```powershell
npm run db:reset
```

Attention :

- cette commande supprime puis recree le schema Prisma local ;
- ne l'utiliser qu'apres sauvegarde valide et uniquement sur une base locale explicitement ciblee.

## 4. Validation BDD recommandee apres patch Prisma

Sequence minimale :

```powershell
npx prisma validate
npx prisma generate
npm run lint
npm run build
```

Controle complementaire utile quand `SHADOW_DATABASE_URL` est fournie :

```powershell
npx prisma migrate diff --from-migrations prisma/migrations --to-config-datasource --script
```
