# SESSION

## ID SESSION

SESSION-20260424-02_A18_BDD-LOT-02

## Date

24/04/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturite : 1-ALPHA  
Bloc : A18  
Type : CORRECTION+COMPLETION  
Intitule : Correction et/ou completion de la chaine BDD : migrations, colonnes manquantes, contraintes, relations, seeds, clarification des environnements, documentation des operations sensibles

## Objectif de la session

Corriger strictement les ecarts reels prouves par `SESSION-20260424-01_A18_BDD-01` sans rejouer l'audit global :
- realigner `prisma/schema.prisma` sur les migrations et la base locale ;
- rendre le seed rejouable avec l'environnement local courant et sans doublon pour le tenant A observe ;
- clarifier l'usage des variables d'environnement BDD et documenter les operations sensibles.

## Perimetre exact traite

- `prisma/schema.prisma`
- `prisma/seed.ts`
- `prisma.config.ts`
- `.env`
- `docs/BDD_OPERATIONS_SENSIBLES.md`
- documentation finale de session :
  - `SESSION.md`
  - `NOTES.md`
  - `EVIDENCES.md`
  - `RESULTATS.md`
  - `FIN_SESSION.md`
  - `PATCH/README_PATCH.md`

## Resultat synthetique de session

- patch principal code produit puis applique ;
- `User.company` et `ShiftTemplate.secondaryAllowedRoles` realignes sur les migrations / la base locale ;
- seed rejoue avec succes sur la base locale et preservation prouvee du tenant `SC Ambulances` rattache a `admin@ambulance.local` ;
- support optionnel de `SHADOW_DATABASE_URL` ajoute a `prisma.config.ts`, mais aucun shadow database reel n'est fourni dans l'environnement courant ;
- `npx prisma validate`, `npx prisma generate`, `npx prisma db seed`, `npm run lint` et `npm run build` executes avec succes.

## Dossiers lies

- Session : docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-02_A18_BDD-LOT-02
- PATCH   : docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-02_A18_BDD-LOT-02/PATCH
