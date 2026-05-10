# SESSION

## ID SESSION

SESSION-20260424-01_A18_BDD-01

## Date

24/04/2026

## Contexte

Projet : Investissement
Sous-projet : Ambulance Manager
Maturite : 1-ALPHA
Bloc : A18
Type : AUDIT
Intitule : Audit complet de la chaine BDD existante : Prisma schema, migrations, seed, base locale, environnements, drifts potentiels, coherence schema <-> base

## Objectif de la session

Constater l'etat reel de la chaine BDD existante sans corriger le depot :
- schema Prisma ;
- migrations ;
- seed ;
- base locale ;
- environnements ;
- drifts potentiels ;
- coherence schema <-> base.

## Perimetre exact traite

- `prisma.config.ts`
- `prisma/schema.prisma`
- `prisma/migrations/*` (25 migrations constatees)
- `prisma/seed.ts`
- `.env` (lecture masquee des secrets)
- `scripts/db-backup.ps1`
- `scripts/db-restore.ps1`
- `lib/permission-catalog.ts`
- base locale PostgreSQL `ambulance_db`, schema `public`
- documentation strictement utile :
  - `docs/1-master/DOCUMENT_MAITRE.md`
  - `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
  - `docs/3-templates/TEMPLATE_DEBUT_SESSION.md`
  - `docs/1-master/ETAT_GLOBAL_PROJET.md`
  - `docs/1-master/REGISTRE_DECISIONS.md`

## Resultat synthetique de session

Etat global observe :
- migrations et base locale alignees dans `_prisma_migrations` ;
- schema Prisma valide mais non totalement coherent avec la base locale et les migrations ;
- seed present mais non pleinement reproductible avec le `.env` courant ;
- environnement Prisma exploitable en local via `DATABASE_URL`, sans configuration de shadow database ;
- verdict d'audit : `non conforme`.

## Dossiers lies

- Session : `docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-01_A18_BDD-01`
- PATCH   : `docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-01_A18_BDD-01/PATCH`
