# 2 - PREUVES

## 1. Fichiers lus

### Gouvernance

- `create_session.ps1`
- `docs/2-SESSIONS/README_SESSIONS.md`

### Sessions T2 relues

- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-09_DX_T2_AUDIT-ROUTES-LIBELLES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-10_DX_T2_CADRAGE-RENOMMAGES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-11_CX_T2_CX_T2_CORRECTION-LIBELLES-RESIDUELS/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-11_CX_T2_CX_T2_CORRECTION-LIBELLES-RESIDUELS/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-11_CX_T2_CX_T2_CORRECTION-LIBELLES-RESIDUELS/3-FIN_DE_SESSION.md`

### MASTER et références utiles

- `docs/1-MASTER/01-APPLICATION_WEB.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/1-MASTER/RGPD_BASE_MINIMALE.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/0-REFERENCE_UI_UX_SHELL_GLOBAL.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/3-REFERENCE_UI_UX_MODELES_HORAIRES.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/7-REFERENCE_UI_UX_DEPOTS_BASES.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/9-REFERENCE_UI_UX_MISE_EN_ROUTE.md`

### Code officiel lu

- `app/app-shell.tsx`
- `app/page.tsx`
- `app/login/page.tsx`
- `app/dashboard/page.tsx`
- `app/templates/page.tsx`
- `app/templates/templates-client.tsx`
- `app/onboarding/page.tsx`
- `app/onboarding/onboarding-client.tsx`
- `app/privacy/page.tsx`
- `app/depots/page.tsx`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/users/page.tsx`
- `app/vehicles/page.tsx`
- `app/company/page.tsx`
- `app/audit/page.tsx`
- `app/ui/access-denied-state.tsx`
- `app/ui/action-button.tsx`
- `app/ui/data-table.tsx`
- `app/ui/empty-state.tsx`
- `app/ui/error-message.tsx`
- `app/ui/filter-bar.tsx`
- `app/ui/index.ts`
- `app/ui/page-header.tsx`
- `app/ui/stat-card.tsx`
- `app/ui/status-badge.tsx`

## 2. Fichiers utilisés comme référence

- `docs/1-MASTER/01-APPLICATION_WEB.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/0-REFERENCE_UI_UX_SHELL_GLOBAL.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/3-REFERENCE_UI_UX_MODELES_HORAIRES.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/7-REFERENCE_UI_UX_DEPOTS_BASES.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/9-REFERENCE_UI_UX_MISE_EN_ROUTE.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-10_DX_T2_CADRAGE-RENOMMAGES/1-SESSION.md`

## 3. Fichiers créés

- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/PATCH/NO_PATCH.md`

## 4. Fichiers modifiés

- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/3-FIN_DE_SESSION.md`

## 5. Fichiers supprimés

- Aucun.

## 6. Fichiers déplacés ou renommés

- Aucun.

## 7. Dossiers explicitement non modifiés

- `app/`
- `app/ui/`
- `prisma/`
- `docs/1-MASTER/`
- `docs/3-TEMPLATES/`
- `docs/1-MASTER/4-BASE44_REFERENCE/`

## 8. Commandes exécutées

```powershell
Get-ChildItem -Force
rg --files -g "create_session.ps1" -g "docs/**" -g "app/**"
git status --short
git diff --name-only
git ls-files --others --exclude-standard
Get-Content -Raw create_session.ps1
Get-Content -Raw docs/2-SESSIONS/README_SESSIONS.md
Get-Content -Raw docs/1-MASTER/01-APPLICATION_WEB.md
Get-Content -Raw docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md
Get-Content -Raw docs/1-MASTER/03-METHODE_DE_TRAVAIL.md
Get-Content -Raw docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md
Get-Content -Raw docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md
Get-Content -Raw docs/1-MASTER/2-REFERENCE_UI_UX/0-REFERENCE_UI_UX_SHELL_GLOBAL.md
Get-Content -Raw docs/1-MASTER/2-REFERENCE_UI_UX/3-REFERENCE_UI_UX_MODELES_HORAIRES.md
Get-Content -Raw docs/1-MASTER/2-REFERENCE_UI_UX/7-REFERENCE_UI_UX_DEPOTS_BASES.md
Get-Content -Raw docs/1-MASTER/2-REFERENCE_UI_UX/9-REFERENCE_UI_UX_MISE_EN_ROUTE.md
Get-Content -Raw docs/1-MASTER/RGPD_BASE_MINIMALE.md
Get-Content -Raw app/app-shell.tsx
Get-Content -Raw app/dashboard/page.tsx
Get-Content -Raw app/templates/page.tsx
Get-Content -Raw app/templates/templates-client.tsx
Get-Content -Raw app/onboarding/page.tsx
Get-Content -Raw app/onboarding/onboarding-client.tsx
Get-Content -Raw app/privacy/page.tsx
Get-Content -Raw app/depots/page.tsx
Get-Content -Raw app/planning/page.tsx
Get-Content -Raw app/planning/planning-client.tsx
Get-Content -Raw app/users/page.tsx
Get-Content -Raw app/vehicles/page.tsx
Get-Content -Raw app/company/page.tsx
Get-Content -Raw app/audit/page.tsx
Get-Content -Raw app/login/page.tsx
powershell -ExecutionPolicy Bypass -File .\create_session.ps1 -Stage "1-ALPHA" -Block "T2" -SessionCode "DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES" -Type "DX+VALIDATION+CLOTURE" -Title "Validation et cloture des liens et routes T2"
npm run lint
Start-Process -FilePath npm.cmd -ArgumentList 'run','dev' -WorkingDirectory 'C:\Users\arche\ambulance-manager' -WindowStyle Hidden -RedirectStandardOutput .next\dx_t2_validation_dev.out.log -RedirectStandardError .next\dx_t2_validation_dev.err.log -PassThru
Invoke-WebRequest -Uri http://localhost:3000/login -UseBasicParsing -TimeoutSec 5
Get-Process | Where-Object { $_.ProcessName -like 'node*' -or $_.ProcessName -like 'npm*' }
rg -n "Depot|Depots|Dépôt|Dépôts|Templates|Onboarding" app/planning app/app-shell.tsx app/ui app/dashboard app/templates app/onboarding app/privacy app/depots
```

## 9. Résultats des commandes

### `git status --short` avant création de session

```text
```

### `git diff --name-only` avant création de session

```text
```

### `git ls-files --others --exclude-standard` avant création de session

```text
```

### Création de session via `create_session.ps1`

```text
Session creee : SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES
Dossier session : .\docs\2-SESSIONS\1-ALPHA\BLOC_T2_NOMENCLATURE_ROUTES\SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES
Dossier patch   : .\docs\2-SESSIONS\1-ALPHA\BLOC_T2_NOMENCLATURE_ROUTES\SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES\PATCH
Presse-papiers  : OK
```

### `npm run lint`

```text
> ambulance-manager@0.1.0 lint
> eslint .

app/planning/planning-client.tsx
  18 warnings @typescript-eslint/no-unused-vars

docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/**
  48 errors + warnings hors périmètre de session

✖ 90 problems (48 errors, 42 warnings)
```

Qualification :

- Le lint global échoue.
- Les erreurs bloquantes proviennent du dossier documentaire Base44 hors périmètre.
- Les warnings applicatifs visibles concernent `app/planning/planning-client.tsx`, non modifié dans cette session DX.
- Aucune correction n'a été appliquée.

### Démarrage local

Sortie utile `.next/dx_t2_validation_dev.out.log` :

```text
> ambulance-manager@0.1.0 dev
> next dev

▲ Next.js 16.1.6 (Turbopack)
- Local:         http://localhost:3001
✓ Starting...
```

Sortie utile `.next/dx_t2_validation_dev.err.log` :

```text
⚠ Port 3000 is in use by process 13700, using available port 3001 instead.
⨯ Unable to acquire lock at C:\Users\arche\ambulance-manager\.next\dev\lock, is another instance of next dev running?
```

Qualification :

- Une instance Next.js existante répondait déjà sur `http://localhost:3000`.
- La tentative de relance locale a montré un conflit de port et de lock.
- Les contrôles navigateur ont donc été exécutés sur l'instance active en `localhost:3000`.

## 10. Contrôles Git

### `git status --short` après création de session et après rédaction

```text
?? docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/
```

### `git diff --name-only` après rédaction

```text
```

### `git ls-files --others --exclude-standard` après rédaction

```text
docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/1-SESSION.md
docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/2-PREUVES.md
docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/3-FIN_DE_SESSION.md
docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/PATCH/NO_PATCH.md
```

Conclusion Git :

- aucun fichier applicatif suivi n'a été modifié ;
- seul le dossier documentaire de session DX est non suivi.

## 11. Contrôles techniques

### Contrôle navigation visible

Navigation constatée après connexion avec `admin@ambulance.local` / `admin123` :

```text
Tableau de bord
Planning
Utilisateurs / RH
Véhicules
Modèles horaires
Société
Dépôts / Bases
Mise en route
Audit
```

Constats :

- `Privacy` n'apparaît pas dans la navigation principale.
- Aucun libellé legacy `Templates` ou `Onboarding` n'apparaît dans la navigation.
- Les labels du shell sont conformes au cadrage T2.

### Contrôle routes testées

| URL testée | Résultat observé | Statut visuel | Libellés visibles clés | Preuve textuelle | Verdict |
| --- | --- | --- | --- | --- | --- |
| `/login` | page publique rendue | page rendue | `Connexion`, lien `/privacy` visible | titre `Connexion`, `privacyLinkVisible=true` | OK |
| `/dashboard` non authentifié | redirection vers `/login?callbackUrl=%2Fdashboard` | redirection attendue | `Connexion` | `finalUrl=http://localhost:3000/login?callbackUrl=%2Fdashboard` | OK |
| `/privacy` non authentifié | accès direct public | page rendue | `Mentions d'information` | `hasLoginForm=false`, `hasShellNav=false` | OK |
| `/dashboard` connecté | rendu normal | page rendue | `Tableau de bord` | KPI + shell visibles | OK |
| `/templates` connecté | rendu normal | page rendue | `Modèles horaires` | titre visible, aucun `Templates` détecté | OK |
| `/onboarding` connecté | rendu normal | page rendue | `Mise en route société pilote` | progression 100 %, aucun `Onboarding` détecté | OK |
| `/privacy` connecté | rendu normal | page rendue | `Mentions d'information` | breadcrumb `Accueil / Mentions d'information` | OK |
| `/depots` connecté | rendu normal | page rendue | `Dépôts / Bases` | titre et KPI dépôts visibles | OK |
| `/planning` connecté | rendu normal | page rendue | `Planning`, filtre `Depot` | snippet navigateur : `Depot Tous` | ÉCART BLOQUANT |
| `/users` connecté | rendu normal | page rendue | `Utilisateurs / RH` | titre et KPI RH visibles | OK |
| `/vehicles` connecté | rendu normal | page rendue | `Véhicules` | titre et filtres visibles | OK |
| `/company` connecté | rendu normal | page rendue | `Société` | titre et résumé société visibles | OK |
| `/audit` connecté | rendu normal | page rendue | `Journal d'audit` | titre et KPI audit visibles | OK |

### Contrôle navigation / liens

| Libellé navigation | `href` constaté | Résultat | Verdict |
| --- | --- | --- | --- |
| `Tableau de bord` | `/dashboard` | cohérent | OK |
| `Planning` | `/planning` | cohérent | OK |
| `Utilisateurs / RH` | `/users` | cohérent | OK |
| `Véhicules` | `/vehicles` | cohérent | OK |
| `Modèles horaires` | `/templates` | route technique anglaise conservée, libellé conforme | OK |
| `Société` | `/company` | cohérent | OK |
| `Dépôts / Bases` | `/depots` | route technique anglaise conservée, libellé conforme | OK |
| `Mise en route` | `/onboarding` | route technique anglaise conservée, libellé conforme | OK |
| `Audit` | `/audit` | cohérent | OK |

### Liste des libellés visibles contrôlés

- `Tableau de bord`
- `Planning`
- `Utilisateurs / RH`
- `Véhicules`
- `Modèles horaires`
- `Société`
- `Dépôts / Bases`
- `Mise en route`
- `Audit`
- `Mentions d'information`
- `Connexion`

### Preuves navigateur précises

Extrait structuré du contrôle navigateur connecté :

```json
{
  "shell": {
    "navLabelsAfterLogin": [
      "Tableau de bord",
      "Planning",
      "Utilisateurs / RH",
      "Véhicules",
      "Modèles horaires",
      "Société",
      "Dépôts / Bases",
      "Mise en route",
      "Audit"
    ],
    "privacyInNav": false,
    "legacyNavLabels": []
  },
  "planning": {
    "path": "/planning",
    "status": 200,
    "finalUrl": "http://localhost:3000/planning",
    "legacyMatches": ["Depot"]
  }
}
```

Extrait de recherche ciblée dans le code :

```text
app/planning/planning-client.tsx:1856:                <span className="planning-filter-card__label">Depot</span>
```

Interprétation :

- l'application rend correctement les routes principales ;
- un libellé visible `Depot` reste présent dans le module `Planning` ;
- cet écart est dans le périmètre T2 car il concerne un libellé UI visible lié à la nomenclature.

## 12. Contrôles d'encodage

```text
docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/1-SESSION.md    UTF8-BOM=False
docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/2-PREUVES.md    UTF8-BOM=False
docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/3-FIN_DE_SESSION.md    UTF8-BOM=False
docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-12_DX_T2_DX_T2_VALIDATION-CLOTURE-LIENS-ROUTES/PATCH/NO_PATCH.md    UTF8-BOM=False
```

Conclusion encodage :

- les fichiers de session sont bien en UTF-8 sans BOM.

## 13. Contrôles de périmètre

- Aucune correction applicative effectuée.
- Aucun fichier `app/` modifié.
- Aucun `href` modifié.
- Aucune route, URL ou redirection modifiée.
- Aucun alias technique créé.
- Aucun fichier MASTER modifié.
- Aucun fichier `docs/3-TEMPLATES` modifié.
- Aucun patch applicatif `.diff` produit.

## 14. Limites / commandes non exécutées

- `npm run build` non demandé dans cette session.
- Captures image persistées non produites pour éviter de créer des artefacts hors périmètre documentaire.
- L'instance `npm run dev` relancée par cette session n'a pas pu devenir l'instance active à cause d'un lock existant ; les vérifications ont été faites sur l'instance locale déjà disponible en `localhost:3000`.

## 15. Informations non fournies

- `INFORMATION NON FOURNIE - A CONFIRMER` : attente métier exacte sur le libellé de filtre `Depot` dans `Planning` si une forme plus courte devait être tolérée.
- `INFORMATION NON FOURNIE - A CONFIRMER` : politique de clôture T2 si un reliquat de libellé visible hors pages minimales ciblées devait être jugé non bloquant par arbitrage humain.
