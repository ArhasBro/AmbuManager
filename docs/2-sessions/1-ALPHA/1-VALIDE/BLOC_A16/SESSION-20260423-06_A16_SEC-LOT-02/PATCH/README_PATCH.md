# README_PATCH - SESSION-20260423-06_A16_SEC-LOT-02

## Session liee

`SESSION-20260423-06_A16_SEC-LOT-02`

## Type

`CORRECTION+COMPLETION`

## Dossier PATCH

`docs/2-sessions/1-ALPHA/BLOC_A16/SESSION-20260423-06_A16_SEC-LOT-02/PATCH`

## Patchs code valides

- Patch principal : `PATCH__SESSION-20260423-06_A16_SEC-LOT-02.diff`
- Fix complementaire : `PATCH__SESSION-20260423-06_A16_SEC-LOT-02_FIX-01.diff`
- Fix complementaire : `PATCH__SESSION-20260423-06_A16_SEC-LOT-02_FIX-02.diff`

## Commandes d'application

Depuis la racine du depot :

```bash
git apply --recount --ignore-space-change "docs/2-sessions/1-ALPHA/BLOC_A16/SESSION-20260423-06_A16_SEC-LOT-02/PATCH/PATCH__SESSION-20260423-06_A16_SEC-LOT-02.diff"
git apply "docs/2-sessions/1-ALPHA/BLOC_A16/SESSION-20260423-06_A16_SEC-LOT-02/PATCH/PATCH__SESSION-20260423-06_A16_SEC-LOT-02_FIX-01.diff"
git apply --recount "docs/2-sessions/1-ALPHA/BLOC_A16/SESSION-20260423-06_A16_SEC-LOT-02/PATCH/PATCH__SESSION-20260423-06_A16_SEC-LOT-02_FIX-02.diff"
```

## Contenu reel du patch principal

- Politique de mots de passe partagee dans `lib/security/password-policy.ts`.
- Application de la politique a creation utilisateur, reset password et import
  utilisateurs.
- Session NextAuth/JWT durcie : duree explicite, updateAge, cookie explicite,
  `NEXTAUTH_SECRET` explicite.
- Proxy etendu aux pages applicatives sensibles.
- Scripts PowerShell de base pour backup/restore PostgreSQL.
- Scripts npm `db:backup` / `db:restore`.
- Exclusion `/backups/`.
- Tests cibles pour password policy et proxy.

## Correctifs minimaux

### FIX-01

- Ajout des imports Node manquants dans
  `scripts/quality/targeted-sensitive-blocks.test.mjs`.
- Motif : echec prouve de `npm.cmd run test:quality`.

### FIX-02

- Fiabilisation des arguments PowerShell des scripts DB.
- Motif : relecture technique avant documentation finale.

## Validations terminales prouvees

- `npx.cmd prisma validate` : OK.
- `npm.cmd run lint` : OK.
- `npm.cmd run test:quality` : OK final apres `FIX-01`.
- `npm.cmd run build` : OK.
- Parsing PowerShell des scripts DB : OK.

## Statut

Patch principal et correctifs appliques. Documentation finale et ZIP
documentaire produits.
