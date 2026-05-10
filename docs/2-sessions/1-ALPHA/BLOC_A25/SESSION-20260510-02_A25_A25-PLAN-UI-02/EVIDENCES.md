# EVIDENCES

Elements factuels utilises pendant la reprise corrective ciblee QA.

---

## Objet de la reprise

Lever uniquement les reserves QA suivantes :
1. preuve reelle `git apply --check` du patch principal ;
2. sorties terminales reelles de `npm run lint` et `npm run build` avec code retour ;
3. patch principal en UTF-8 sans BOM.

---

## 1) Controle encodage patch principal (UTF-8 sans BOM)

Patch cible :
- `docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-02_A25_A25-PLAN-UI-02/PATCH/PATCH__SESSION-20260510-02_A25_A25-PLAN-UI-02.diff`

### 1.1 Constat avant correction

Commande executee :
```powershell
$p='docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-02_A25_A25-PLAN-UI-02/PATCH/PATCH__SESSION-20260510-02_A25_A25-PLAN-UI-02.diff'
$bytes=[System.IO.File]::ReadAllBytes((Resolve-Path $p))
$first=[System.BitConverter]::ToString($bytes[0..([Math]::Min(15,$bytes.Length-1))])
```

Sortie :
```txt
LEN=24907
FIRST16=EF-BB-BF-64-69-66-66-20-2D-2D-67-69-74-20-61-2F
BOM_PRESENT
```

Interpretation :
- BOM present (`EF-BB-BF`) ;
- le patch ne respecte pas l'exigence QA "UTF-8 sans BOM".

### 1.2 Reexport UTF-8 sans BOM

Commande executee :
```powershell
$p='docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-02_A25_A25-PLAN-UI-02/PATCH/PATCH__SESSION-20260510-02_A25_A25-PLAN-UI-02.diff'
$text=[System.IO.File]::ReadAllText((Resolve-Path $p))
$utf8NoBom=New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText((Resolve-Path $p),$text,$utf8NoBom)
```

### 1.3 Constat apres correction

Commande executee :
```powershell
$bytes=[System.IO.File]::ReadAllBytes((Resolve-Path $p))
$first=[System.BitConverter]::ToString($bytes[0..([Math]::Min(15,$bytes.Length-1))])
$head=[System.Text.Encoding]::UTF8.GetString($bytes[0..7])
```

Sortie :
```txt
LEN=24904
FIRST16=64-69-66-66-20-2D-2D-67-69-74-20-61-2F-61-70-70
BOM_ABSENT
HEAD8=diff --g
```

Interpretation :
- aucun BOM ;
- le patch commence directement par `diff --git`.

---

## 2) Preuve reelle `git apply --check`

### 2.1 Verification dans le working tree courant

Commande executee :
```powershell
cmd /c git apply --check docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-02_A25_A25-PLAN-UI-02/PATCH/PATCH__SESSION-20260510-02_A25_A25-PLAN-UI-02.diff
Write-Output "PS_LASTEXITCODE=$LASTEXITCODE"
```

Sortie :
```txt
PS_LASTEXITCODE=1
error: patch failed: app/globals.css:1649
error: app/globals.css: patch does not apply
error: patch failed: app/planning/manual-planning-panel.tsx:452
error: app/planning/manual-planning-panel.tsx: patch does not apply
error: patch failed: app/planning/page.tsx:83
error: app/planning/page.tsx: patch does not apply
error: patch failed: app/planning/planning-client.tsx:58
error: app/planning/planning-client.tsx: patch does not apply
```

Interpretation :
- echec attendu dans l'arbre courant car les changements cibles sont deja presents/modifies.

### 2.2 Verification `--reverse` dans le working tree courant

Commande executee :
```powershell
cmd /c git apply --check --reverse docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-02_A25_A25-PLAN-UI-02/PATCH/PATCH__SESSION-20260510-02_A25_A25-PLAN-UI-02.diff
Write-Output "PS_LASTEXITCODE=$LASTEXITCODE"
```

Sortie :
```txt
PS_LASTEXITCODE=1
error: patch failed: app/planning/planning-client.tsx:58
error: app/planning/planning-client.tsx: patch does not apply
error: patch failed: app/planning/page.tsx:83
error: app/planning/page.tsx: patch does not apply
error: patch failed: app/planning/manual-planning-panel.tsx:452
error: app/planning/manual-planning-panel.tsx: patch does not apply
error: patch failed: app/globals.css:1649
error: app/globals.css: patch does not apply
```

Interpretation :
- `--reverse` ne prouve pas l'applicabilite dans cet etat (fichiers locaux deja diverges).

### 2.3 Preuve d'applicabilite en worktree propre (HEAD)

Methode :
- creation d'un worktree temporaire propre sur `HEAD` ;
- execution de `git apply --check` avec le meme patch.

Commandes executees :
```powershell
git worktree add --detach C:\Users\arche\amb-temp-applycheck HEAD
cmd /c git apply --check "C:\Users\arche\ambulance-manager\docs\2-sessions\1-ALPHA\BLOC_A25\SESSION-20260510-02_A25_A25-PLAN-UI-02\PATCH\PATCH__SESSION-20260510-02_A25_A25-PLAN-UI-02.diff"
Write-Output "PS_LASTEXITCODE=$LASTEXITCODE"
```

Sortie :
```txt
PS_LASTEXITCODE=0
```

Interpretation :
- preuve reelle que le patch est applicable sur un etat propre correspondant a `HEAD`.

---

## 3) Validations terminales executees reellement

### 3.1 `npm run lint`

Commande executee :
```powershell
cmd /c npm run lint
Write-Output "PS_LASTEXITCODE=$LASTEXITCODE"
```

Sortie :
```txt
> ambulance-manager@0.1.0 lint
> eslint .

PS_LASTEXITCODE=0
```

Verdict : OK.

### 3.2 `npm run build`

Commande executee :
```powershell
cmd /c npm run build
Write-Output "PS_LASTEXITCODE=$LASTEXITCODE"
```

Sortie :
```txt
> ambulance-manager@0.1.0 build
> next build

▲ Next.js 16.1.6 (Turbopack)
- Environments: .env

  Creating an optimized production build ...
✓ Compiled successfully in 12.6s
  Running TypeScript ...
  Collecting page data using 15 workers ...
  Generating static pages using 15 workers (0/29) ...
  Generating static pages using 15 workers (7/29)
  Generating static pages using 15 workers (14/29)
  Generating static pages using 15 workers (21/29)
✓ Generating static pages using 15 workers (29/29) in 4.5s
  Finalizing page optimization ...

Route (app)
┌ ƒ /
├ ƒ /_not-found
├ ƒ /api/audit
├ ƒ /api/auth/[...nextauth]
├ ƒ /api/company/profile
├ ƒ /api/company/rules
├ ƒ /api/depots
├ ƒ /api/depots/[id]
├ ƒ /api/depots/[id]/archive
├ ƒ /api/health/prisma
├ ƒ /api/imports
├ ƒ /api/planning/autoschedule/day
├ ƒ /api/planning/autoschedule/runs
├ ƒ /api/planning/autoschedule/runs/[id]
├ ƒ /api/planning/autoschedule/runs/[id]/cancel
├ ƒ /api/planning/autoschedule/runs/[id]/match
├ ƒ /api/planning/autoschedule/runs/[id]/match/apply
├ ƒ /api/planning/autoschedule/runs/[id]/match/preview
├ ƒ /api/planning/autoschedule/runs/[id]/publish
├ ƒ /api/planning/autoschedule/week
├ ƒ /api/planning/exports
├ ƒ /api/planning/shifts
├ ƒ /api/planning/shifts/[id]
├ ƒ /api/planning/shifts/[id]/assign
├ ƒ /api/planning/shifts/[id]/cancel
├ ƒ /api/templates
├ ƒ /api/templates/[id]
├ ƒ /api/templates/[id]/archive
├ ƒ /api/users
├ ƒ /api/users/[id]
├ ƒ /api/users/[id]/absences
├ ƒ /api/users/[id]/absences/[absenceId]
├ ƒ /api/users/[id]/archive
├ ƒ /api/users/[id]/depot
├ ƒ /api/users/[id]/reset-password
├ ƒ /api/vehicles
├ ƒ /api/vehicles/[id]
├ ƒ /api/vehicles/[id]/archive
├ ƒ /api/vehicles/[id]/depot
├ ƒ /audit
├ ƒ /company
├ ƒ /dashboard
├ ƒ /depots
├ ƒ /login
├ ƒ /onboarding
├ ƒ /planning
├ ƒ /privacy
├ ƒ /templates
├ ƒ /users
└ ƒ /vehicles

ƒ Proxy (Middleware)

ƒ  (Dynamic)  server-rendered on demand

PS_LASTEXITCODE=0
```

Verdict : OK.

---

## Hors perimetre confirme

- captures apres : non traitees dans cette reprise (demande explicite) ;
- ZIP documentaire V2 : non genere dans cette reprise (Nathan le gerera manuellement).