# 2 - Preuves

## 1. Fichiers lus

- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-02_DX_T1_AUDIT-SHELL-NAVIGATION/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-02_DX_T1_AUDIT-SHELL-NAVIGATION/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-02_DX_T1_AUDIT-SHELL-NAVIGATION/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION/3-FIN_DE_SESSION.md`
- `app/layout.tsx`
- `app/app-shell.tsx`
- `app/globals.css`
- `package.json`
- `prisma/seed.ts`
- `C:/Users/arche/.codex/plugins/cache/openai-curated-remote/vercel/0.21.2/skills/nextjs/SKILL.md`
- `C:/Users/arche/.codex/plugins/cache/openai-bundled/browser/26.609.41114/skills/control-in-app-browser/SKILL.md`

## 2. Fichiers modifies

- `app/app-shell.tsx`
- `app/globals.css`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-05_CX_T1_CORRECTION-SHELL-ACTIONS-CONTEXTE/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-05_CX_T1_CORRECTION-SHELL-ACTIONS-CONTEXTE/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-05_CX_T1_CORRECTION-SHELL-ACTIONS-CONTEXTE/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-05_CX_T1_CORRECTION-SHELL-ACTIONS-CONTEXTE/PATCH/README_PATCH.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-05_CX_T1_CORRECTION-SHELL-ACTIONS-CONTEXTE/PATCH/PATCH__SESSION-20260616-05_CX_T1_CORRECTION-SHELL-ACTIONS-CONTEXTE.diff`

## 3. Commandes executees

- `git status --short`
- `Get-Content -Raw -Encoding UTF8 docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `Get-Content -Raw -Encoding UTF8 docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `Get-ChildItem docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION -Force`
- `rg -n "audit|shell|navigation|topbar|contexte|SESSION-20260616-03_CX_T1_RENOMMAGE" docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION`
- `.\create_session.ps1 -Stage 1-ALPHA -Block T1 -SessionCode CORRECTION-SHELL-ACTIONS-CONTEXTE -Type CX -Title "Correction shell actions contexte"`
- `Get-Content -Raw -Encoding UTF8 app/layout.tsx`
- `Get-Content -Raw -Encoding UTF8 app/app-shell.tsx`
- `rg -n "app-shell__(company-selector|user-chevron|topbar-user|user-card|logout|theme-toggle|sidebar-theme)" app`
- `rg -n "Dashboard|Tableau de bord|Dépôts / bases|Dépôts / Bases|Depots / bases|Suivi des véhicules|Suivi des vehicules|ChevronDown|company-selector|topbar-user|user-card" app/layout.tsx app/app-shell.tsx app/globals.css app/a24-*.css`
- `git diff -- app/app-shell.tsx app/globals.css`
- `rg -n "ChevronDown|Tableau de bord|Dépôts / Bases|Dépôts / bases|Suivi des véhicules|Suivi des vehicules|href:|label:" app/layout.tsx app/app-shell.tsx`
- `git diff --name-only`
- `npm run lint`
- `npm run build`
- `npm run dev`
- `git diff -- app/app-shell.tsx app/globals.css | Set-Content -Encoding utf8NoBOM ...`
- `git diff -- app/app-shell.tsx app/globals.css` puis ecriture du patch via `[System.IO.File]::WriteAllText(..., [System.Text.UTF8Encoding]::new($false))`
- `cmd /c "git diff -- app/app-shell.tsx app/globals.css > ...PATCH...diff"`
- `git apply --reverse --check PATCH__SESSION-20260616-05_CX_T1_CORRECTION-SHELL-ACTIONS-CONTEXTE.diff`
- Controle BOM par lecture des premiers octets.
- Controle `rg` des quatre sequences suspectes demandees dans le prompt sur les fichiers modifies et le dossier de session courant.
- `Remove-Item -LiteralPath test-results/cx-t1-shell-dev.err.log,test-results/cx-t1-shell-dev.out.log -Force`
- `Invoke-WebRequest -UseBasicParsing http://localhost:3000/login -TimeoutSec 10`
- Controle navigateur via navigateur integre sur `http://localhost:3000`.

## 4. Resultats utiles

- Session creee : `SESSION-20260616-05_CX_T1_CORRECTION-SHELL-ACTIONS-CONTEXTE`.
- Audit shell : `app/app-shell.tsx` contenait trois chevrons visibles sans action associee pour societe/profil.
- Navigation conservee : `Tableau de bord` et `Dépôts / Bases` detectes dans `app/layout.tsx`.
- Aucune occurrence `ChevronDown` restante dans `app/app-shell.tsx` apres correction.
- `git diff --name-only` apres correction applicative : `app/app-shell.tsx`, `app/globals.css`.

## 5. Justification des modifications

- `app/app-shell.tsx` : suppression de `ChevronDown` et des icones associees a la societe/profil, car elles suggeraient des menus inexistants.
- `app/app-shell.tsx` : remplacement du bouton societe par un `div` de contexte, car aucun gestionnaire d'action ni menu societe n'existe dans le perimetre T1 courant.
- `app/globals.css` : ajustement minimal de la grille de carte utilisateur apres suppression du chevron.

## 6. Controle navigateur

Serveur local :

- `npm run dev` a tente de demarrer sur `3001`, mais un serveur Next existant utilisait deja le verrou `.next`.
- `Invoke-WebRequest http://localhost:3000/login` a retourne `200`.
- Controle realise sur le serveur existant `http://localhost:3000`.

Connexion :

- Identifiant de seed utilise : `admin@ambulance.local`.
- Mot de passe de seed par defaut identifie dans `prisma/seed.ts` : `admin123`.
- Resultat : connexion reussie, URL `http://localhost:3000/dashboard`.

Constats DOM navigateur :

- Societe courante : `SC Ambulances`.
- Utilisateur courant : `Nathan`.
- Role shell : `Administration`.
- Boutons visibles hors DevTools : `Thème` sidebar, theme topbar, `Déconnexion`.
- `companySelector` rendu en `div`, texte `SC Ambulances`.
- `topbarUser` rendu en `div`, texte `Nathan Administration`.
- `sidebarUser` rendu en `div`, texte `Nathan Administration`.
- Navigation visible : `/dashboard`, `/planning`, `/users`, `/vehicles`, `/templates`, `/company`, `/depots`, `/onboarding`, `/audit`.
- Libelles conserves : `Tableau de bord`, `Dépôts / Bases`.
- Theme : clic topbar OK, `data-theme="dark"`.
- Deconnexion : clic OK, retour `http://localhost:3000/login`.

## 7. Generation du patch

- Premiere tentative : `Set-Content -Encoding utf8NoBOM` a echoue car cette version de PowerShell ne reconnait pas l'identifiant `utf8NoBOM`.
- Deuxieme tentative : patch genere en UTF-8 sans BOM avec `[System.IO.File]::WriteAllText(..., [System.Text.UTF8Encoding]::new($false))`, mais `git apply --reverse --check` a echoue car la sortie passee par `Out-String` avait altere le patch.
- Troisieme tentative : patch regenere en sortie brute Git via `cmd /c "git diff ... > ...diff"`.
- Controle final : `git apply --reverse --check` OK.
- Fichier genere : `PATCH/PATCH__SESSION-20260616-05_CX_T1_CORRECTION-SHELL-ACTIONS-CONTEXTE.diff`.

## 8. Controle build/lint

### `npm run lint`

Resultat : echec.

Erreurs citees exclusivement dans `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44`, notamment :

- `src/components/auth/LoginForm.jsx`
- `src/components/dashboard/DashboardCustomizeDialog.jsx`
- `src/components/depots/DepotFormDialog.jsx`
- `src/components/planning/AssignmentFormDialog.jsx`
- `src/components/ui/sidebar.jsx`
- `src/lib/AuthContext.jsx`
- `tailwind.config.js`

Des warnings preexistants existent aussi dans `app/planning/planning-client.tsx`, hors fichiers modifies.

Les fichiers modifies `app/app-shell.tsx` et `app/globals.css` ne sont pas cites en erreur.

### `npm run build`

Resultat : echec.

Erreur citee :

- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/base44/functions/fixNathanRole/entry.ts:1`
- `Cannot find module 'npm:@base44/sdk@0.8.31'`

Les fichiers modifies `app/app-shell.tsx` et `app/globals.css` ne sont pas cites.

Verdict controle technique : echec couvert par l'exception documentaire Base44 de `03-METHODE_DE_TRAVAIL.md`, avec absence de modification Base44.

## 9. Controle perimetre interdit

- Fichiers Base44 modifies : aucun.
- Fichiers RBAC/permissions modifies : aucun.
- Prisma modifie : non.
- Routes techniques renommees : non.
- Entrees de navigation ajoutees/supprimees : non.
- `04-PLAN_DE_DEVELOPPEMENT.md` modifie : non.
- `05-BLOCS_SESSIONS_PRODUCTION.md` modifie : non.
- Templates modifies : non.
- `create_session.ps1` modifie : non.

## 10. Controle encodage

- BOM : `False` pour tous les fichiers modifies et le patch.
- Sequences suspectes demandees dans le prompt : aucune occurrence dans les fichiers modifies et le dossier de session courant apres retrait des mentions litterales du controle.

## 11. Informations non fournies

- Politique finale d'un futur menu societe/profil : INFORMATION NON FOURNIE - A CONFIRMER.
- Decision produit sur une action profil ou changement de societe : INFORMATION NON FOURNIE - A CONFIRMER.
