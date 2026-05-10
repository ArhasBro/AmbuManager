# EVIDENCES - SESSION-20260506-06_A24_A24-UI-06

## Commandes terminales executees

### 1) Verification patch principal

Commande :

```powershell
git apply --check "C:/Users/arche/ambulance-manager/docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-06_A24_A24-UI-06/PATCH/PATCH__SESSION-20260506-06_A24_A24-UI-06.diff"
```

Contexte d'execution : worktree temporaire propre basee sur `HEAD` (`.codex-temp/a24-ui06-check`).

Extrait terminal :

```txt
(no output)
```

Resultat : OK  
Code retour : `0`

### 2) Lint

Commande :

```powershell
npm run lint
```

Extrait terminal :

```txt
> ambulance-manager@0.1.0 lint
> eslint .
```

Resultat : OK  
Code retour : `0`

### 3) Build

Commande :

```powershell
npm run build
```

Extrait terminal :

```txt
> ambulance-manager@0.1.0 build
> next build

Compiled successfully
Generating static pages ...
Route (app) ...
/users
```

Resultat : OK  
Code retour : `0`

## Preuves encodage + applicabilite patch principal

Fichier :

- `PATCH/PATCH__SESSION-20260506-06_A24_A24-UI-06.diff`

Mesures :

```txt
first16=64 69 66 66 20 2D 2D 67 69 74 20 61 2F 61 70 70
first_line=diff --git a/app/layout.tsx b/app/layout.tsx
has_bom=False
has_nul=False
```

Verification applicabilite :

```txt
git apply --check => return code 0 (worktree propre)
```

## Prisma

Prisma non touche dans cette session.  
`npx prisma validate` et `npx prisma generate` non executes (non requis au regard du perimetre modifie).

## Addendum controle qualite (preuve CSS importee)

### Preuve locale fichier `app/a24-users-rh.css`

Commande :

```powershell
dir app\a24-users-rh.css
```

Extrait terminal :

```txt
-a---- 08/05/2026 11:50 6824 a24-users-rh.css
```

Commande :

```powershell
Test-Path app\a24-users-rh.css
```

Extrait terminal :

```txt
True
```

Commande :

```powershell
Get-Content app\a24-users-rh.css -TotalCount 20
```

Extrait terminal (debut) :

```txt
/* A24-UI-06 - realignement visuel cible Utilisateurs / RH */
.users-page {
  display: grid;
```

### Revalidation demandee

Commande :

```powershell
git apply --check "C:/Users/arche/ambulance-manager/docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-06_A24_A24-UI-06/PATCH/PATCH__SESSION-20260506-06_A24_A24-UI-06.diff"
```

Contexte : worktree propre temporaire `.codex-temp/a24-ui06-qc-check`  
Resultat : `OK`  
Code retour : `0`

Commande :

```powershell
npm run lint
```

Resultat : `OK`  
Code retour : `0`

Commande :

```powershell
npm run build
```

Resultat : `OK`  
Code retour : `0`

### Correctif

Aucun `_FIX-01.diff` necessaire : le fichier CSS existe bien localement et est utilise.
