# 2 - Preuves

## 1. Etat Git initial

Commande :

```powershell
git status --short
```

Resultat brut :

```text

```

Commande :

```powershell
git diff --name-only
```

Resultat brut :

```text

```

## 2. Fichiers lus

### References UI/UX

- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_GLOBALE.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/0-REFERENCE_UI_UX_SHELL_GLOBAL.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_INDEX.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_CHECKLIST_CODEX.md`

### Sessions T3 precedentes

- `docs/2-SESSIONS/1-ALPHA/BLOC_T3_DESIGN_SYSTEM_COMPOSANTS/SESSION-20260618-03_DX_T3_AUDIT-COMPOSANTS-ETATS/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T3_DESIGN_SYSTEM_COMPOSANTS/SESSION-20260618-04_CX_T3_CORRECTION-ETATS-COMMUNS/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T3_DESIGN_SYSTEM_COMPOSANTS/SESSION-20260618-05_CX_T3_COMPLETION-TABLEAUX-FILTRES-BADGES/3-FIN_DE_SESSION.md`

### Composants communs

- `app/ui/action-button.tsx`
- `app/ui/access-denied-state.tsx`
- `app/ui/data-table.tsx`
- `app/ui/disabled-state.tsx`
- `app/ui/empty-state.tsx`
- `app/ui/error-message.tsx`
- `app/ui/filter-bar.tsx`
- `app/ui/loading-state.tsx`
- `app/ui/page-header.tsx`
- `app/ui/stat-card.tsx`
- `app/ui/status-badge.tsx`
- `app/ui/index.ts`

### Pages / consommateurs

- `app/depots/page.tsx`
- `app/depots/depots-client.tsx`
- `app/users/page.tsx`
- `app/users/users-list-client.tsx`
- `app/users/users-side-panel-client.tsx`
- `app/vehicles/page.tsx`
- `app/vehicles/vehicles-client.tsx`
- `app/templates/page.tsx`
- `app/templates/templates-client.tsx`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/planning/manual-planning-panel.tsx`
- `app/onboarding/page.tsx`
- `app/onboarding/onboarding-client.tsx`

## 3. Commandes executees

- `git status --short`
- `Get-ChildItem -LiteralPath "app/ui" -Recurse -File`
- `rg -n "DataTable|data-table|FilterBar|filter-bar|StatusBadge|status-badge|ActionButton|action-button|PageHeader|page-header|StatCard|stat-card|EmptyState|ErrorMessage|AccessDenied" app app/ui`
- `Get-ChildItem -LiteralPath "docs/2-SESSIONS/1-ALPHA/BLOC_T3_DESIGN_SYSTEM_COMPOSANTS" -Recurse -File`
- `Get-ChildItem -LiteralPath "app" -Directory`
- `Get-Content` ciblant les references UI/UX, les sessions precedentes, les composants `app/ui/` et les pages consommatrices
- `npm run dev`
- `Get-NetTCPConnection -LocalPort 3000,3001 -State Listen`
- `Get-Process node`
- `Get-Content` des logs `ambulance-manager-dev.out.log` et `ambulance-manager-dev.err.log`

## 4. Resultats bruts utiles

- `git status --short` : vide au demarrage, aucun fichier modifie hors session
- `git diff --name-only` : vide au demarrage
- `npm run dev` : le premier lancement a tente `3001` car `3000` etait deja utilise, puis a signale un verrou `.next/dev/lock` deja pris par une autre instance
- `http://127.0.0.1:3000` : serveur accessible et utilisable pour la validation
- `tab.dev.logs({ levels: ["error", "warn"] })` : aucune erreur ni warning pertinents sur les pages controlees

## 5. Pages visitees

- `/depots`
- `/users`
- `/vehicles`
- `/templates`
- `/onboarding`
- `/planning`

## 6. Captures produites

- `[CAPTURES/depots-desktop.png](C:/Users/arche/ambulance-manager/docs/2-SESSIONS/1-ALPHA/BLOC_T3_DESIGN_SYSTEM_COMPOSANTS/SESSION-20260618-06_DX_T3_VALIDATION-CLOTURE-VISUELLE-COMPOSANTS/CAPTURES/depots-desktop.png)`
- `[CAPTURES/users-desktop.png](C:/Users/arche/ambulance-manager/docs/2-SESSIONS/1-ALPHA/BLOC_T3_DESIGN_SYSTEM_COMPOSANTS/SESSION-20260618-06_DX_T3_VALIDATION-CLOTURE-VISUELLE-COMPOSANTS/CAPTURES/users-desktop.png)`
- `[CAPTURES/users-empty-state.png](C:/Users/arche/ambulance-manager/docs/2-SESSIONS/1-ALPHA/BLOC_T3_DESIGN_SYSTEM_COMPOSANTS/SESSION-20260618-06_DX_T3_VALIDATION-CLOTURE-VISUELLE-COMPOSANTS/CAPTURES/users-empty-state.png)`
- `[CAPTURES/users-mobile-responsive.png](C:/Users/arche/ambulance-manager/docs/2-SESSIONS/1-ALPHA/BLOC_T3_DESIGN_SYSTEM_COMPOSANTS/SESSION-20260618-06_DX_T3_VALIDATION-CLOTURE-VISUELLE-COMPOSANTS/CAPTURES/users-mobile-responsive.png)`
- `[CAPTURES/planning-desktop.png](C:/Users/arche/ambulance-manager/docs/2-SESSIONS/1-ALPHA/BLOC_T3_DESIGN_SYSTEM_COMPOSANTS/SESSION-20260618-06_DX_T3_VALIDATION-CLOTURE-VISUELLE-COMPOSANTS/CAPTURES/planning-desktop.png)`
- Fichier image de verification final sauvegarde dans `[ambulance-manager-planning-check.png](C:/Users/arche/AppData/Local/Temp/ambulance-manager-planning-check.png)`

## 7. Points controles

- Identite de page et titre
- Presence de contenu reel, pas de page vide
- Absence d overlay framework
- Console propre sur les pages controlees
- Cohérence visuelle de `PageHeader`, `StatCard`, `ActionButton`, `StatusBadge`, `FilterBar`, `DataTable`
- Presence d un `EmptyState` naturel sur `/users` apres filtre de recherche
- Responsive minimum sur viewport mobile
- Absence de regression visuelle evidente sur les pages controlees

## 8. Ecarts detectes

- Aucun ecart bloquant
- Reserve non bloquante : sur viewport mobile 390 px, le shell reste tres nav-first et le contenu principal commence plus bas dans la page ; pas de casse, mais premiere vue moins orientee contenu
- Etats `disabled`, `error` et `access denied` non captures visuellement de maniere naturelle dans cette session

## 9. Absence de modification applicative

- Aucun fichier dans `app/` modifie
- Aucun fichier de configuration modifie
- Aucun patch applicatif produit

## 10. Presence de `NO_PATCH.md`

- `PATCH/NO_PATCH.md` cree pour signaler explicitement l absence de patch applicatif

## 11. Bilan reprise preuves

- Les captures sont maintenant jointes et exploitables directement
- Le dossier `CAPTURES/` contient les preuves minimales attendues pour le controle documentaire
