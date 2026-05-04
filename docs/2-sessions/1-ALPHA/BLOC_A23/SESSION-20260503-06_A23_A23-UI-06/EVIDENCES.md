# EVIDENCES

## Documents lus

### Noyau obligatoire
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/3-templates/TEMPLATE_DEBUT_SESSION.md`

### Documents complementaires utilises
- `docs/1-master/MAQUETTE/README_MAQUETTES_A23.md` : INFORMATION NON FOURNIE — À CONFIRMER (fichier non detecte localement)
- PNG maquettes de `docs/1-master/MAQUETTE/`
- Captures avant: `docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-05_A23_A23-UI-05/CAPTURES/*.png`
- Documents finaux A23-UI-05: `SESSION.md`, `NOTES.md`, `EVIDENCES.md`, `RESULTATS.md`, `FIN_SESSION.md`

## Commandes executees et sorties brutes

### Validation patch principal + fix (depot propre)
Commande replay:
```powershell
# worktree verify5
CMD: git apply --check <principal>
EXIT=0
CMD: git apply <principal>
EXIT=0
CMD: git apply --check <fix>
EXIT=0
CMD: git apply <fix>
EXIT=0
CMD: git status --short
```
Sortie brute `git status --short` apres application principal + fix:
```text
 M app/app-shell.tsx
 M app/audit/audit-client.tsx
 M app/audit/page.tsx
 M app/company/company-rules-panel.tsx
 M app/company/page.tsx
 D app/dashboard/logout-button.tsx
 M app/dashboard/page.tsx
 M app/depots/page.tsx
 M app/globals.css
 M app/layout.tsx
 M app/login/page.tsx
 M app/onboarding/page.tsx
 M app/planning/page.tsx
 M app/planning/planning-client.tsx
 M app/privacy/page.tsx
 M app/templates/page.tsx
 M app/users/page.tsx
 M app/users/users-client-shared.ts
 M app/users/users-list-client.tsx
 M app/vehicles/page.tsx
?? app/users/users-side-panel-client.tsx
```

### Lint
Commande:
```powershell
npm run lint
```
Sortie brute:
```text
> ambulance-manager@0.1.0 lint
> eslint .
```

### Build
Commande:
```powershell
npm run build
```
Sortie brute (extrait terminal):
```text
> ambulance-manager@0.1.0 build
> next build

Compiled successfully
Route (app): /login /dashboard /users /vehicles /templates /company /depots /planning /audit /onboarding /privacy ...
```

### Lancement serveur
Commande utilisee:
```powershell
npm run dev
```
Sortie brute (log):
```text
> ambulance-manager@0.1.0 dev
> next dev

Next.js 16.1.6 (Turbopack)
Local:   http://localhost:3000
Ready in 1555ms
```

### Captures Playwright
Commande:
```powershell
npx playwright test .codex-temp/capture-after.spec.ts --workers=1
```
Sortie brute:
```text
Running 1 test using 1 worker
ok 1 .codex-temp\capture-after.spec.ts:12:5 â€º capture apres correction
1 passed
```

## Captures apres correction
Dossier:
- `docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-06_A23_A23-UI-06/CAPTURES_APRES/`

Fichiers generes:
- `login.png`
- `dashboard.png`
- `users.png`
- `vehicles.png`
- `templates.png`
- `company.png`
- `depots.png`
- `planning.png`
- `audit.png`
- `onboarding.png`
- `privacy.png`

## Limites de preuve
- Validation pixel-perfect automatisee maquette vs runtime: INFORMATION NON FOURNIE — À CONFIRMER.
