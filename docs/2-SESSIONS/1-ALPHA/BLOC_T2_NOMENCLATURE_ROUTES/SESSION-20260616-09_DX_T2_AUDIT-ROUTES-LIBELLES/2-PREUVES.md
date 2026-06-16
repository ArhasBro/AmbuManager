# 2 - Preuves

## 1. Commandes exécutées

```powershell
git status --short
Get-ChildItem -Path . -Filter create_session.ps1 -Recurse | Select-Object -ExpandProperty FullName
Test-Path 'docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES'; if (Test-Path 'docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES') { Get-ChildItem 'docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES' -Directory | Select-Object -ExpandProperty Name }
Get-Content -Path 'create_session.ps1'
.\create_session.ps1 -Stage '1-ALPHA' -Block 'T2' -SessionCode 'AUDIT-ROUTES-LIBELLES' -Type 'DX+AUDIT' -Title 'Audit routes officielles et libelles visibles'
rg --files docs/1-MASTER docs/2-SESSIONS/README_SESSIONS.md app
Get-ChildItem -Path 'docs/1-MASTER/2-REFERENCE_UI_UX' -File -Recurse | Select-Object -ExpandProperty FullName
Get-ChildItem -Path 'docs/1-MASTER/3-FONCTIONNALITES' -File -Recurse | Select-Object -ExpandProperty FullName
Get-ChildItem -Path 'docs/1-MASTER/4-BASE44_REFERENCE' -File -Recurse | Select-Object -ExpandProperty FullName
Select-String -Path $files -Pattern 'route|Routes|navigation|Navigation|libell|Shell|Login|Dashboard|Tableau|Modèles|Modeles|Mise en route|Privacy|Confidential|templates|onboarding|privacy' -CaseSensitive:$false
Select-String -Path $files -Pattern 'href=|router\.push|Link|title|label|name:|Dashboard|Tableau|Modèles|Modeles|Mise|Privacy|Confidential|templates|onboarding|login|Accueil|Planning|Véhicules|Vehicules|Utilisateurs|Dépôts|Depots|Société|Societe|Audit' -CaseSensitive:$false
Get-ChildItem -Path app -Recurse -Include *.tsx,*.ts | Select-String -Pattern 'href=|router\.push|redirect\(|pathname|nav|label|title|name:' -CaseSensitive:$false
Get-ChildItem -Path app -Directory | Select-Object -ExpandProperty Name
git status --short
git diff --name-only
git ls-files --others --exclude-standard
Get-ChildItem -Path $session -Recurse -File | Select-String -Pattern '<sequences suspectes demandees>' -SimpleMatch
Get-ChildItem -Path $session -Recurse -Filter *.diff -File
Get-ChildItem -Path $session -Recurse -File | ForEach-Object { contrôle UTF-8 BOM }
```

## 2. Résultats des commandes

- `git status --short` avant intervention : sortie vide.
- `create_session.ps1` trouvé : `C:\Users\arche\ambulance-manager\create_session.ps1`.
- Bloc T2 absent avant création : `False`.
- Session créée par script : `SESSION-20260616-09_DX_T2_AUDIT-ROUTES-LIBELLES`.
- Dossier session créé : `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-09_DX_T2_AUDIT-ROUTES-LIBELLES`.
- Dossier patch créé : `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-09_DX_T2_AUDIT-ROUTES-LIBELLES/PATCH`.
- `git status --short` après intervention : `?? docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/`.
- `git diff --name-only` : sortie vide.
- `git ls-files --others --exclude-standard` : uniquement les 4 fichiers de session créés.
- Contrôle applicatif/Prisma/Base44/MASTER modifiés : sortie vide.
- Contrôle hors périmètre : sortie vide.
- Contrôle `.diff` dans la session : sortie vide.
- Contrôle des quatre séquences suspectes demandées : sortie vide.
- Contrôle encodage : 4 fichiers UTF-8 sans BOM.

## 3. Routes officielles repérées

### Routes pages App Router

| Route technique | Fichier officiel | Statut T2 |
|---|---|---|
| `/` | `app/page.tsx` | Route d'entrée, redirection selon session |
| `/login` | `app/login/page.tsx` | Route publique |
| `/privacy` | `app/privacy/page.tsx` | Route publique/discrète |
| `/dashboard` | `app/dashboard/page.tsx` | Route métier portail |
| `/planning` | `app/planning/page.tsx` | Route métier |
| `/users` | `app/users/page.tsx` | Route métier |
| `/vehicles` | `app/vehicles/page.tsx` | Route métier |
| `/templates` | `app/templates/page.tsx` | Route technique historique |
| `/company` | `app/company/page.tsx` | Route métier |
| `/depots` | `app/depots/page.tsx` | Route métier |
| `/onboarding` | `app/onboarding/page.tsx` | Route technique historique |
| `/audit` | `app/audit/page.tsx` | Route métier |

### Routes API repérées dans `app/api`

Routes API repérées : `/api/auth/[...nextauth]`, `/api/health/prisma`, `/api/users`, `/api/vehicles`, `/api/templates`, `/api/depots`, `/api/company/profile`, `/api/company/rules`, `/api/planning/*`, `/api/imports`, `/api/audit`.

Décision T2 : HORS PÉRIMÈTRE T2 pour les API, sauf impact indirect futur sur renommage technique `/templates` ou `/onboarding`.

## 4. Libellés visibles trouvés

### Navigation shell officielle

Source : `app/layout.tsx:118-126`

```tsx
if (dashboardNavAllowed) navLinks.push({ href: "/dashboard", label: "Tableau de bord" });
if (planningAllowed) navLinks.push({ href: "/planning", label: "Planning" });
if (usersNavAllowed) navLinks.push({ href: "/users", label: "Utilisateurs / RH" });
if (vehiclesNavAllowed) navLinks.push({ href: "/vehicles", label: "Véhicules" });
if (templatesNavAllowed) navLinks.push({ href: "/templates", label: "Modèles horaires" });
if (companyNavAllowed) navLinks.push({ href: "/company", label: "Société" });
if (depotsNavAllowed) navLinks.push({ href: "/depots", label: "Dépôts / Bases" });
if (onboardingNavAllowed) navLinks.push({ href: "/onboarding", label: "Mise en route" });
if (auditNavAllowed) navLinks.push({ href: "/audit", label: "Audit" });
```

### Shell rendu

Source : `app/app-shell.tsx:94-122`

- `aria-label="Navigation principale"`
- `aria-label="Navigation des modules"`
- rendu visible : `{link.label}`

### Login et privacy

Sources :

- `app/login/page.tsx:19` : `DEFAULT_LOGIN_REDIRECT = "/dashboard"`
- `app/login/page.tsx:177-178` : `Connexion`, `Accédez à votre espace Ambulance Manager`
- `app/login/page.tsx:250` : lien `/privacy` avec libellé `Mentions d'information`
- `app/privacy/page.tsx:131-142` : fil d'Ariane `Accueil` vers `/dashboard`, titre `Mentions d'information`
- `app/privacy/page.tsx:190` : lien interne `/privacy` avec libellé `Mentions d'information`

### Dashboard

Sources :

- `app/dashboard/page.tsx:221-226` : `/planning` -> `Planning`
- `app/dashboard/page.tsx:236-241` : `/users` -> `Utilisateurs / RH`
- `app/dashboard/page.tsx:248-253` : `/vehicles` -> `Véhicules`
- `app/dashboard/page.tsx:260-265` : `/templates` -> `Modèles horaires`
- `app/dashboard/page.tsx:272-277` : `/company` -> `Société`
- `app/dashboard/page.tsx:284-289` : `/depots` -> `Dépôts`
- `app/dashboard/page.tsx:296-301` : `/onboarding` -> `Mise en route`
- `app/dashboard/page.tsx:308-313` : `/audit` -> `Audit`
- `app/dashboard/page.tsx:336-337` : titre `Tableau de bord`

### Onboarding / Mise en route

Sources :

- `app/onboarding/page.tsx:49` : titre `Mise en route société pilote`
- `app/onboarding/page.tsx:63-67` : liens internes vers `/company`, `/depots`, `/users`, `/vehicles`, `/templates` ou `/dashboard`
- `app/onboarding/onboarding-client.tsx:80` : domaine import `Modèles horaires`
- `app/onboarding/onboarding-client.tsx:142` : titre étape `Bases / depots`
- `app/onboarding/onboarding-client.tsx:150` : titre étape `Utilisateurs`
- `app/onboarding/onboarding-client.tsx:158` : titre étape `Vehicules`
- `app/onboarding/onboarding-client.tsx:166` : titre étape `Modèles horaires`
- `app/onboarding/onboarding-client.tsx:236` : `Progression de la mise en route`

## 5. Références officielles pertinentes

- `docs/1-MASTER/01-APPLICATION_WEB.md:79` : libellés métier français attendus `Modèles horaires`, `Mise en route`, `Dépôts / Bases`, `Utilisateurs / RH`.
- `docs/1-MASTER/01-APPLICATION_WEB.md:127` : terme actif `Modèles horaires`, pas `Templates`.
- `docs/1-MASTER/01-APPLICATION_WEB.md:139` : terme actif `Mise en route`, pas `Onboarding`.
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md:55-56` : routes techniques stables en anglais tant qu'un renommage n'est pas confirmé ; libellés UI visibles en français.
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md:183-184` : renommages futurs `/templates` vers `modeles-horaires` et `/onboarding` vers `mise-en-route` à confirmer.
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md:205-207` : routes techniques anglaises stables, libellés UI en français, `Privacy` pas entrée métier principale.
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md:211-213` : renommages `/templates`, `/onboarding` et statut `Suivi des véhicules` non fournis à confirmer.
- `docs/1-MASTER/2-REFERENCE_UI_UX/0-REFERENCE_UI_UX_SHELL_GLOBAL.md:124-142` : navigation attendue, `Templates` et `Onboarding` interdits comme libellés actifs, `Privacy` hors sidebar métier.
- `docs/1-MASTER/3-FONCTIONNALITES/0-FONCTIONNALITES_DETAILLEES_SHELL_GLOBAL_NAVIGATION_V1.md:74-77` : anciens noms historiques `Templates`/`Onboarding`; routes techniques historiques possibles si libellés cohérents.

## 6. Références Base44 utilisées

Base44 confirme les libellés fonctionnels mais ne constitue pas une source technique à copier.

- `EXPORT_BASE44/src/App.jsx:48-59` : routes Base44 `/login`, `/`, `/planning`, `/utilisateurs`, `/vehicules`, `/suivi-vehicules`, `/modeles-horaires`, `/depots`, `/mise-en-route`, `/audit`.
- `EXPORT_BASE44/src/components/shell/AppShell.jsx:18-27` : navigation Base44 avec `Tableau de bord`, `Planning`, `Utilisateurs / RH`, `Véhicules`, `Suivi des véhicules`, `Modèles horaires`, `Société`, `Dépôts / Bases`, `Mise en route`, `Audit`.
- `SYNTHESE_FINALE_BASE44_AMBULANCE_MANAGER.md:82-93` : modules Base44 de référence, dont `Modèles horaires`, `Dépôts / Bases`, `Mise en route`.
- `SYNTHESE_FINALE_BASE44_AMBULANCE_MANAGER.md:157-163` : préférences dashboard Base44 et absence du raccourci `Suivi des véhicules`.
- `SYNTHESE_FINALE_BASE44_AMBULANCE_MANAGER.md:341-356` : Mise en route calculée depuis les entités métier.

## 7. Matrice routes/libellés/décisions

| Route technique officielle | Libellé visible officiel | Source officielle | Référence Base44 éventuelle | Écart | Décision proposée |
|---|---|---|---|---|---|
| `/` | Aucun libellé visible, redirection vers `/dashboard` ou `/login` | `app/page.tsx:9` | Base44 `/` = Dashboard | Aucun libellé à auditer | CONFORME |
| `/login` | `Connexion` | `app/login/page.tsx:177` | Base44 Login non conforme visuel, correction reportée Codex | Pas d'écart T2 route/libellé | CONFORME |
| `/login` -> `/dashboard` | Redirection post-login vers dashboard | `app/login/page.tsx:19`, docs Login | Base44 login non retenu techniquement | Redirection cohérente | CONFORME |
| `/login` -> `/privacy` | `Mentions d'information` | `app/login/page.tsx:250` | INFORMATION NON FOURNIE — À CONFIRMER | Lien attendu RGPD/Privacy ; libellé français prudent | CONFORME |
| `/privacy` | `Mentions d'information` | `app/privacy/page.tsx:142` | INFORMATION NON FOURNIE — À CONFIRMER | Route anglaise non métier ; pas entrée sidebar | CONFORME |
| `/privacy` -> `/dashboard` | `Accueil` | `app/privacy/page.tsx:131-134` | INFORMATION NON FOURNIE — À CONFIRMER | Accueil pointe vers dashboard, à contrôler en validation liens | REDIRECTION À CONFIRMER |
| `/dashboard` | `Tableau de bord` | `app/layout.tsx:118`, `app/dashboard/page.tsx:336` | Base44 `/` Dashboard, libellé `Tableau de bord` | Route anglaise acceptée, libellé français | CONFORME |
| `/planning` | `Planning` | `app/layout.tsx:119`, `app/dashboard/page.tsx:221-226` | Base44 `/planning` | Aucun écart | CONFORME |
| `/users` | `Utilisateurs / RH` | `app/layout.tsx:120`, `app/users/page.tsx:67` | Base44 `/utilisateurs` | Route technique anglaise différente de Base44 ; aucun renommage officiel fourni | RENOMMAGE TECHNIQUE À CONFIRMER |
| `/vehicles` | `Véhicules` | `app/layout.tsx:121` | Base44 `/vehicules` | Route technique anglaise différente de Base44 ; aucun renommage officiel fourni | RENOMMAGE TECHNIQUE À CONFIRMER |
| `/templates` | `Modèles horaires` | `app/layout.tsx:122`, `app/dashboard/page.tsx:260-265` | Base44 `/modeles-horaires` | Route historique anglaise, libellé conforme | RENOMMAGE TECHNIQUE À CONFIRMER |
| `/templates` | libellés internes partiels avec préfixe technique `templates-*` et champs sans accents dans certains labels | `app/templates/templates-client.tsx` | Base44 `Modèles horaires` | Les libellés visibles principaux sont conformes ; vérifier les libellés internes résiduels hors navigation | CORRECTION LIBELLÉ À PRÉVOIR |
| `/company` | `Société` | `app/layout.tsx:123`, `app/company/page.tsx:127` | Base44 `/societe` | Route technique anglaise différente de Base44 ; aucun renommage officiel fourni | RENOMMAGE TECHNIQUE À CONFIRMER |
| `/depots` | Shell `Dépôts / Bases`, dashboard `Dépôts`, page `Dépôts / bases` | `app/layout.tsx:124`, `app/dashboard/page.tsx:284-289`, `app/depots/page.tsx:93` | Base44 `/depots`, `Dépôts / Bases` | Variation de libellé dashboard/page à harmoniser | CORRECTION LIBELLÉ À PRÉVOIR |
| `/onboarding` | `Mise en route` / `Mise en route société pilote` | `app/layout.tsx:125`, `app/onboarding/page.tsx:49` | Base44 `/mise-en-route` | Route historique anglaise, libellé conforme | RENOMMAGE TECHNIQUE À CONFIRMER |
| `/onboarding` liens internes | `Profil societe`, `Bases / depots`, `Vehicules`, `Modèles horaires` | `app/onboarding/onboarding-client.tsx:133-166` | Base44 libellés accentués | Certains libellés visibles sans accents ou non alignés avec `Dépôts / Bases`, `Utilisateurs / RH`, `Véhicules` | CORRECTION LIBELLÉ À PRÉVOIR |
| `/audit` | Shell/dashboard `Audit`, page `Journal d'audit` | `app/layout.tsx:126`, `app/dashboard/page.tsx:308-313`, `app/audit/page.tsx:30` | Base44 `/audit` | Aucun écart T2 majeur | CONFORME |
| `Suivi des véhicules` | Non présent comme route officielle Next dans `app/` | `app/` inventorié, pas de `app/suivi-vehicules` | Base44 `/suivi-vehicules` | Statut futur explicitement non fourni dans MASTER | INFORMATION NON FOURNIE — À CONFIRMER |
| API `/api/*` | Non applicable | `app/api/**/route.ts` | Base44 entités/fonctions | Hors libellés visibles/navigation | HORS PÉRIMÈTRE T2 |

## 8. Écarts de nomenclature

1. `/templates` conserve une route technique historique anglaise alors que le libellé visible attendu et affiché est `Modèles horaires`.
2. `/onboarding` conserve une route technique historique anglaise alors que le libellé visible attendu et affiché est `Mise en route`.
3. Le dashboard affiche `Dépôts` alors que le shell et les références UI/UX utilisent `Dépôts / Bases`.
4. La page dépôts affiche `Dépôts / bases` avec casse différente du libellé de navigation `Dépôts / Bases`.
5. La page onboarding contient des libellés sans accents ou raccourcis : `Profil societe`, `Bases / depots`, `Vehicules`.
6. Les routes techniques `/users`, `/vehicles`, `/company` restent anglaises alors que Base44 utilise des routes françaises ; aucune décision officielle de renommage n'est fournie.
7. `Suivi des véhicules` existe dans Base44 et les références, mais aucune route Next officielle dédiée n'a été repérée.

## 9. Liens critiques à contrôler plus tard

- Navigation shell : `/dashboard`, `/planning`, `/users`, `/vehicles`, `/templates`, `/company`, `/depots`, `/onboarding`, `/audit`.
- Login/privacy : `/login` -> `/dashboard`, `/login` -> `/privacy`, `/privacy` -> `/dashboard`.
- Dashboard : raccourcis vers `/planning`, `/users`, `/vehicles`, `/templates`, `/company`, `/depots`, `/onboarding`, `/audit`.
- Templates/modèles horaires : `/templates` et API `/api/templates/*`, sans décision de renommage.
- Onboarding/mise en route : `/onboarding` vers `/company`, `/depots`, `/users` ou `/dashboard`, `/vehicles` ou `/dashboard`, `/templates` ou `/dashboard`.

## 10. Décisions à confirmer

- Renommage technique éventuel `/templates` vers `/modeles-horaires`.
- Renommage technique éventuel `/onboarding` vers `/mise-en-route`.
- Besoin de redirections si renommage technique confirmé.
- Sort de `/users`, `/vehicles`, `/company` : conserver routes anglaises ou cadrer routes françaises.
- Libellé cible unique pour dépôts : `Dépôts / Bases` partout ou variante courte autorisée.
- Statut futur de `Suivi des véhicules` : route autonome, sous-module de `Véhicules`, ou report.
- Politique exacte du lien `/privacy` depuis les pages connectées.

## 11. Risques pour les sessions suivantes

- Corriger les routes avant décision humaine créerait des liens cassés ou des redirections implicites.
- Confondre libellé visible et route technique pourrait provoquer des changements inutiles dans `app/`.
- Corriger seulement la sidebar sans dashboard/onboarding laisserait des libellés incohérents.
- Oublier `/privacy` hors sidebar pourrait rendre la page RGPD difficile à trouver depuis Login.
- Importer la convention Base44 telle quelle ferait diverger le repo officiel sans cadrage technique.
- Créer `Suivi des véhicules` comme route sans décision pourrait étendre le périmètre fonctionnel Alpha.

## 12. Informations non fournies

- Décision officielle de renommage `/templates`.
- Décision officielle de renommage `/onboarding`.
- Décision officielle sur redirections après renommage.
- Statut officiel de la future route `Suivi des véhicules`.
- Validation d'un alias français pour `/users`, `/vehicles`, `/company`.
- Nomenclature unique finale `Dépôts` vs `Dépôts / Bases`.
- Contact et politique Privacy/DPO hors périmètre T2.

## 13. Fichiers créés

- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-09_DX_T2_AUDIT-ROUTES-LIBELLES/`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-09_DX_T2_AUDIT-ROUTES-LIBELLES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-09_DX_T2_AUDIT-ROUTES-LIBELLES/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-09_DX_T2_AUDIT-ROUTES-LIBELLES/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-09_DX_T2_AUDIT-ROUTES-LIBELLES/PATCH/NO_PATCH.md`

## 14. Fichiers modifiés

Uniquement les fichiers de session listés ci-dessus, après création par script.

## 15. Fichiers supprimés

Aucun fichier supprimé volontairement. Les fichiers de session générés par le script ont été remplacés par leur contenu d'audit dans le même chemin.
