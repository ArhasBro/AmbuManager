# SESSION

## ID SESSION

SESSION-20260423-06_A16_SEC-LOT-02

## Date

23/04/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturite : 1-ALPHA  
Bloc : A16  
Type : CORRECTION+COMPLETION  
Intitule : Correction et/ou complétion du socle sécurité : durcissement auth/session, validation des entrées, protection des routes sensibles, règles de mots de passe, gestion des secrets, base de sauvegarde/restauration

## Objectif de la session

Corriger et completer, en patch-first, les ecarts SEC-LOT-02 confirmes par
l'audit valide `SESSION-20260423-05_A16_SEC-01` :
- durcissement auth/session ;
- validation des mots de passe sur creation, reset et import utilisateurs ;
- protection proxy des pages applicatives sensibles ;
- formalisation minimale de sauvegarde/restauration PostgreSQL ;
- non-divulgation des secrets et conservation de `.env*` hors Git.

## Perimetre exact traite

- `lib/auth.ts` : duree explicite de session JWT, updateAge, cookie httpOnly /
  sameSite / secure en production, `NEXTAUTH_SECRET` explicite.
- `lib/security/password-policy.ts` : politique de mot de passe partagee.
- `lib/validators/user.ts` : creation utilisateur alignee sur la politique.
- `app/api/users/[id]/reset-password/route.ts` : reset utilisateur aligne sur
  la politique et corps strict.
- `lib/imports/import-engine.ts` : import utilisateurs aligne sur la politique.
- `proxy.ts` : extension aux pages `audit`, `company`, `depots`, `templates`,
  `onboarding`, en plus des pages deja couvertes.
- `scripts/db-backup.ps1` et `scripts/db-restore.ps1` : base operatoire
  sauvegarde/restauration via `pg_dump` / `pg_restore`.
- `package.json` : scripts `db:backup` et `db:restore`.
- `.gitignore` : exclusion du dossier local `/backups/`.
- `scripts/quality/targeted-sensitive-blocks.test.mjs` : tests de politique de
  mot de passe et couverture proxy.

## Resultat synthetique de session

Patch principal produit et applique :
`PATCH/PATCH__SESSION-20260423-06_A16_SEC-LOT-02.diff`.

Correctifs minimaux produits et appliques :
- `PATCH/PATCH__SESSION-20260423-06_A16_SEC-LOT-02_FIX-01.diff` ;
- `PATCH/PATCH__SESSION-20260423-06_A16_SEC-LOT-02_FIX-02.diff`.

Validations finales :
- `npx.cmd prisma validate` : OK ;
- `npm.cmd run lint` : OK ;
- `npm.cmd run test:quality` : OK final apres `FIX-01` ;
- `npm.cmd run build` : OK ;
- parsing PowerShell des scripts DB : OK.

Session terminee proprement sur le perimetre SEC-LOT-02 traite. Aucun correctif
minimal restant n'est identifie apres validations finales.

## Dossiers lies

- Session : docs/2-sessions/1-ALPHA/BLOC_A16/SESSION-20260423-06_A16_SEC-LOT-02
- PATCH   : docs/2-sessions/1-ALPHA/BLOC_A16/SESSION-20260423-06_A16_SEC-LOT-02/PATCH
