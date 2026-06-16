# 2 - Preuves

## 1. git status avant intervention

Commande :

```powershell
git status --short
```

Sortie utile :

```text

```

## 2. Commande de création de session

Commande :

```powershell
.\create_session.ps1 -Stage '1-ALPHA' -Block 'T2' -SessionCode 'CADRAGE-RENOMMAGES' -Type 'DX+CADRAGE+VALIDATION' -Title 'Cadrage T2 renommages futurs'
```

Sortie utile :

```text
Session creee : SESSION-20260616-10_DX_T2_CADRAGE-RENOMMAGES
Dossier session : .\docs\2-SESSIONS\1-ALPHA\BLOC_T2_NOMENCLATURE_ROUTES\SESSION-20260616-10_DX_T2_CADRAGE-RENOMMAGES
Dossier patch   : .\docs\2-SESSIONS\1-ALPHA\BLOC_T2_NOMENCLATURE_ROUTES\SESSION-20260616-10_DX_T2_CADRAGE-RENOMMAGES\PATCH
```

Note : `DX+CADRAGE+VALIDATION` est le type technique accepté par le script pour créer une session DX de cadrage séparée. Le cadrage produit ici ne valide pas et ne clôture pas T2.

## 3. Fichiers lus

- `create_session.ps1`
- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-09_DX_T2_AUDIT-ROUTES-LIBELLES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-09_DX_T2_AUDIT-ROUTES-LIBELLES/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-09_DX_T2_AUDIT-ROUTES-LIBELLES/3-FIN_DE_SESSION.md`
- `docs/1-MASTER/01-APPLICATION_WEB.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `next.config.ts`
- `app/`
- `app/layout.tsx`
- `app/app-shell.tsx`
- `app/login/page.tsx`
- `app/privacy/page.tsx`
- `app/dashboard/page.tsx`
- `app/planning/page.tsx`
- `app/users/page.tsx`
- `app/vehicles/page.tsx`
- `app/templates/page.tsx`
- `app/templates/templates-client.tsx`
- `app/company/page.tsx`
- `app/depots/page.tsx`
- `app/onboarding/page.tsx`
- `app/onboarding/onboarding-client.tsx`
- `app/audit/page.tsx`
- `docs/1-MASTER/2-REFERENCE_UI_UX/0-REFERENCE_UI_UX_SHELL_GLOBAL.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/2-REFERENCE_UI_UX_DASHBOARD.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/3-REFERENCE_UI_UX_MODELES_HORAIRES.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/7-REFERENCE_UI_UX_DEPOTS_BASES.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/9-REFERENCE_UI_UX_MISE_EN_ROUTE.md`
- `docs/1-MASTER/3-FONCTIONNALITES/0-FONCTIONNALITES_DETAILLEES_SHELL_GLOBAL_NAVIGATION_V1.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/README_BASE44_REFERENCE.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/SYNTHESE_FINALE_BASE44_AMBULANCE_MANAGER.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/App.jsx`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/components/shell/AppShell.jsx`

## 4. Preuves de lecture utiles

- `next.config.ts` ne contient aucune redirection, réécriture ou alias configuré.
- `app/` contient les dossiers route : `api`, `audit`, `company`, `dashboard`, `depots`, `login`, `onboarding`, `planning`, `privacy`, `templates`, `ui`, `users`, `vehicles`.
- `app/layout.tsx` construit la navigation avec les routes `/dashboard`, `/planning`, `/users`, `/vehicles`, `/templates`, `/company`, `/depots`, `/onboarding`, `/audit`.
- `app/app-shell.tsx` associe les icônes aux mêmes routes et calcule l'état actif par `pathname === href` ou `pathname.startsWith(...)`.
- `app/dashboard/page.tsx` contient des raccourcis vers `/planning`, `/users`, `/vehicles`, `/templates`, `/company`, `/depots`, `/onboarding`, `/audit`.
- `app/login/page.tsx` utilise `/dashboard` comme redirection par défaut et expose le lien `/privacy` avec `Mentions d'information`.
- `app/privacy/page.tsx` expose `/dashboard` comme `Accueil`, le titre `Mentions d'information`, et contient aussi un libellé singulier `Mention d'information` dans le fil d'Ariane.
- `app/templates/templates-client.tsx` affiche `Modèles horaires` mais conserve plusieurs libellés visibles en `template/templates`.
- `app/onboarding/onboarding-client.tsx` affiche `Profil societe`, `Bases / depots`, `Vehicules`, `Depots`, sans accents sur plusieurs libellés.
- `app/depots/page.tsx` affiche `Dépôts / bases` alors que les références UI/UX utilisent `Dépôts / Bases`.
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md` indique que les routes techniques restent stables en anglais tant qu'un renommage n'est pas confirmé, et que les libellés UI visibles doivent rester en français.
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md` prévoit cette session `DX_T2_CADRAGE-RENOMMAGES` après l'audit T2.
- Base44 montre des routes françaises (`/utilisateurs`, `/vehicules`, `/modeles-horaires`, `/mise-en-route`) et `Suivi des véhicules`, mais le README Base44 rappelle que Base44 n'est pas source technique finale.

## 5. Tableau de décisions principal

| Sujet / route | État actuel | Option analysée | Décision | Justification | Impact | Risque | Suite recommandée |
|---|---|---|---|---|---|---|---|
| `/login` | Route officielle publique. Redirection post-login vers `/dashboard`. | Maintenir la route anglaise. | CONSERVER | Route simple, déjà liée à l'authentification et cohérente avec App Router. | Aucun impact route. | Faible. | Ne pas renommer en Alpha. |
| Libellés `/login` | `Connexion`, lien `Mentions d'information`. | Corriger seulement si incohérence RGPD ultérieure. | CONSERVER | Pas d'écart T2 bloquant identifié. | Aucun impact navigation. | Faible. | Revoir dans bloc RGPD-PRIVACY si besoin. |
| `/privacy` | Route officielle publique/discrète hors sidebar. | Maintenir route anglaise. | CONSERVER | `Privacy` ne doit pas être une entrée métier principale, mais la route peut rester technique. | Aucun impact shell. | Faible. | Garder accessible depuis login et liens discrets. |
| Libellé privacy singulier/pluriel | Titre `Mentions d'information`, breadcrumb `Mention d'information`. | Harmoniser en UI seulement. | CORRIGER LIBELLÉ | Variation visible mineure, sans besoin de route. | Impact UI local. | Risque faible de détail incohérent. | Correction UI dans une future CX libellés, pas ici. |
| `/dashboard` | Route officielle connectée, libellé `Tableau de bord`. | Maintenir route anglaise. | CONSERVER | Dashboard est route portail stable, liens internes nombreux. | Aucun impact. | Faible. | Conserver en Alpha. |
| `/planning` | Route officielle, libellé `Planning`. | Maintenir route anglaise. | CONSERVER | Libellé identique en français courant et en route technique. | Aucun impact. | Faible. | Conserver. |
| `/users` | Route officielle anglaise, libellé `Utilisateurs / RH`. Base44 utilise `/utilisateurs`. | Maintenir route anglaise en Alpha. | CONSERVER | Aucun renommage officiel fourni. Doctrine : routes anglaises stables tant que non confirmé. | Shell/dashboard inchangés. | Risque de divergence avec Base44 seulement documentaire. | Ne pas créer d'alias sans décision humaine. |
| `/vehicles` | Route officielle anglaise, libellé `Véhicules`. Base44 utilise `/vehicules`. | Maintenir route anglaise en Alpha. | CONSERVER | Aucun arbitrage de renommage officiel. | Shell/dashboard inchangés. | Risque de confusion si documentation future mélange routes françaises et anglaises. | Documenter convention route anglaise + libellé français. |
| `/templates` | Route officielle anglaise, libellé principal `Modèles horaires`. | Reporter renommage possible vers `/modeles-horaires`. | RENOMMER PLUS TARD | MASTER signale le renommage futur comme à confirmer. Renommer maintenant casserait liens App Router, API `/api/templates` et dashboard. | Impact fort si renommage. | Liens cassés, imports, permissions, API et historiques de favoris. | Cadrage humain dédié avant route/alias/redirection. |
| Libellés `templates/template` visibles | Plusieurs textes restent `template/templates`. | Corriger uniquement les libellés UI visibles. | CORRIGER LIBELLÉ | Terme actif : `Modèles horaires`, pas `Templates`. | Impact UI local et page modèles. | Incohérence métier visible. | Future CX `CORRECTION-LIBELLES-RESIDUELS`. |
| `/company` | Route officielle anglaise, libellé `Société`. Base44 utilise `/societe`. | Maintenir route anglaise en Alpha. | CONSERVER | Aucun renommage officiel fourni. | Aucun impact. | Divergence avec Base44 si copiée comme route. | Conserver et documenter. |
| `/depots` | Route officielle, libellé shell `Dépôts / Bases`, dashboard `Dépôts`, page `Dépôts / bases`. | Maintenir route, harmoniser libellés. | CORRIGER LIBELLÉ | Route déjà française sans accent. Écart uniquement visible sur libellés/casse. | Impact shell/dashboard/page si corrigé plus tard. | Incohérence UX entre sidebar, dashboard et page directe. | Harmoniser en `Dépôts / Bases`. |
| `Dépôts` vs `Dépôts / Bases` | Variantes visibles selon zones. | Choisir un libellé produit unique. | CORRIGER LIBELLÉ | Références UI/UX et MASTER privilégient `Dépôts / Bases`. | Impact UX transversal. | Divergence de vocabulaire métier. | Correction UI future sans route. |
| `/onboarding` | Route officielle anglaise, libellé `Mise en route`. | Reporter renommage possible vers `/mise-en-route`. | RENOMMER PLUS TARD | MASTER signale le renommage futur comme à confirmer. Route utilisée par shell, dashboard et accès direct. | Impact fort si renommage. | Liens cassés, état actif shell, favoris et documentation divergente. | Décision humaine avant alias/redirection. |
| Libellés onboarding sans accents | `Profil societe`, `Bases / depots`, `Vehicules`, `Depots`. | Corriger uniquement les libellés UI. | CORRIGER LIBELLÉ | Écart visible, sans besoin de migration route. | Impact UI local. | Perception non finie. | Future CX libellés. |
| `/audit` | Route officielle, shell/dashboard `Audit`, page `Journal d'audit`. | Maintenir route anglaise. | CONSERVER | Libellés cohérents avec module Audit / Traçabilité. | Aucun impact. | Faible. | Conserver. |
| `Suivi des véhicules` | Présent dans MASTER/Base44, absent comme route officielle Next dédiée. | Route autonome, sous-module véhicules ou report. | INFORMATION NON FOURNIE — À CONFIRMER | Statut technique futur explicitement non fourni. | Impact potentiel important sur navigation, dashboard, RBAC, API et données. | Création prématurée d'un module ou route hors périmètre Alpha. | Décision produit/tech dédiée dans bloc P-SUIVI-VEHICULES. |
| Routes techniques anglaises vs libellés français | Routes anglaises officielles, libellés visibles français. | Maintenir convention actuelle. | CONSERVER | Doctrine MASTER : routes anglaises stables tant qu'un renommage n'est pas confirmé. | Documentation à clarifier. | Confusion si Base44 est recopié techniquement. | Ajouter convention dans cadrages futurs. |
| Redirections futures | Aucune redirection dans `next.config.ts`. | Prévoir seulement si renommage validé. | RENOMMER PLUS TARD | Redirection sans renommage créerait une politique d'URL non décidée. | Impact App Router et liens. | Redirections ambiguës ou dette permanente. | Décider au moment du renommage. |
| Aliases futurs | Aucun alias technique. | Prévoir seulement si maintien + confort métier confirmé. | INFORMATION NON FOURNIE — À CONFIRMER | Aucun besoin officiel d'alias n'est fourni. | Peut multiplier les chemins. | Divergence d'état actif shell et analytics. | Ne pas créer en Alpha sans décision. |
| Impacts shell/sidebar | Shell route par `href` et état actif exact. | Ne pas changer routes sans adapter shell. | RENOMMER PLUS TARD | Tout renommage touche `NAV_ICON_BY_ROUTE`, `navLinks`, état actif. | Impact transversal. | Sidebar active incorrecte ou lien mort. | Cadrer avec CX spécifique si renommage validé. |
| Impacts dashboard/liens internes | Dashboard contient les liens module. | Ne pas changer routes sans mettre à jour dashboard. | RENOMMER PLUS TARD | Le dashboard est portail d'accès. | Impact UX direct. | Raccourcis cassés. | Tester shell + dashboard ensemble. |
| Impacts accès direct App Router | Dossiers `app/*` déterminent les URLs. | Ne pas renommer sans redirections. | RENOMMER PLUS TARD | App Router dépend de l'arborescence. | Impact fort. | 404 sur URLs existantes. | Prévoir redirects si migration. |
| Impacts SEO Alpha | Application connectée, SEO non prioritaire en Alpha. | Ne pas piloter T2 par SEO. | CONSERVER | SEO faible priorité, routes surtout applicatives. | Faible. | Sur-optimisation prématurée. | Revoir seulement pour pages publiques `/login` et `/privacy`. |

## 6. Tableau redirections / aliases

| Route actuelle | Route cible éventuelle | Alias nécessaire | Redirection nécessaire | Décision | Justification |
|---|---|---|---|---|---|
| `/login` | Aucune | Non | Non | CONSERVER | Route publique stable. |
| `/privacy` | Aucune | Non | Non | CONSERVER | Route technique discrète, hors sidebar métier. |
| `/dashboard` | Aucune | Non | Non | CONSERVER | Portail connecté stable. |
| `/planning` | Aucune | Non | Non | CONSERVER | Pas d'écart. |
| `/users` | `/utilisateurs` | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | CONSERVER | Base44 ne suffit pas à justifier un alias. |
| `/vehicles` | `/vehicules` | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | CONSERVER | Aucun arbitrage officiel. |
| `/templates` | `/modeles-horaires` | Plus tard si maintien double URL validé | Oui si renommage validé | RENOMMER PLUS TARD | Renommage explicitement à confirmer dans MASTER. |
| `/company` | `/societe` | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | CONSERVER | Aucun arbitrage officiel. |
| `/depots` | Aucune | Non | Non | CONSERVER | Route déjà proche du libellé produit. |
| `/onboarding` | `/mise-en-route` | Plus tard si maintien double URL validé | Oui si renommage validé | RENOMMER PLUS TARD | Renommage explicitement à confirmer dans MASTER. |
| `/audit` | Aucune | Non | Non | CONSERVER | Route stable. |
| Route `Suivi des véhicules` | `/suivi-vehicules` éventuelle | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | Route officielle absente du repo. |

## 7. Tableau des impacts

| Zone | Impact si conservation | Impact si renommage futur | Risque Alpha | Recommandation |
|---|---|---|---|---|
| Shell/sidebar | Stable, état actif conservé. | Modifier `navLinks`, icônes par route et calcul d'actif. | Actif sidebar faux ou liens cassés. | Conserver maintenant. |
| Dashboard | Raccourcis actuels restent fonctionnels. | Mettre à jour tous les href et vérifier permissions. | Portail inutilisable sur modules renommés. | Corriger seulement les libellés. |
| Onboarding | Liens internes actuels fonctionnent. | Mettre à jour liens vers `company`, `depots`, `users`, `vehicles`, `templates`. | Parcours de mise en route cassé. | Harmoniser libellés, pas routes. |
| Accès direct App Router | URLs existantes restent disponibles. | Dossiers `app/*` à renommer ou aliases/redirects à créer. | 404 sur favoris/liens documentés. | Redirections obligatoires si migration validée. |
| API | Pas d'impact. | Risque si `/templates` est confondu avec `/api/templates`. | Cassure API si renommage non cadré. | Ne pas toucher API dans T2. |
| Documentation/conventions | Doit expliquer route anglaise + libellé français. | Doit documenter ancienne et nouvelle URL. | Confusion entre docs et code. | Ajouter convention dans suite T2. |
| SEO Alpha | Aucun enjeu significatif hors public. | Redirections publiques seulement si pages publiques touchées. | Faible. | Ne pas prioriser SEO en Alpha. |
| Base44 | Divergence technique assumée. | Peut se rapprocher visuellement des routes Base44, mais pas techniquement. | Copie technique abusive. | Base44 reste référence métier uniquement. |

## 8. Décisions à confirmer

- `INFORMATION NON FOURNIE — À CONFIRMER` : décision humaine de renommage `/templates` vers `/modeles-horaires`.
- `INFORMATION NON FOURNIE — À CONFIRMER` : décision humaine de renommage `/onboarding` vers `/mise-en-route`.
- `INFORMATION NON FOURNIE — À CONFIRMER` : politique de redirection si renommage futur.
- `INFORMATION NON FOURNIE — À CONFIRMER` : politique d'alias si maintien de routes historiques et ajout d'URLs françaises.
- `INFORMATION NON FOURNIE — À CONFIRMER` : statut technique de `Suivi des véhicules`.
- `INFORMATION NON FOURNIE — À CONFIRMER` : validation d'aliases français pour `/users`, `/vehicles`, `/company`.
- `INFORMATION NON FOURNIE — À CONFIRMER` : niveau exact de priorité SEO Alpha hors pages publiques.

## 9. Risques pour les sessions suivantes

- Renommer une route sans redirection peut casser les favoris, liens dashboard, liens onboarding et accès directs.
- Créer des aliases sans stratégie d'état actif peut rendre la sidebar incohérente.
- Corriger seulement le shell sans dashboard/onboarding peut maintenir des divergences visibles.
- Copier les routes Base44 peut contredire la source technique officielle.
- Traiter `Suivi des véhicules` comme route acquise peut élargir le périmètre sans cadrage P-SUIVI-VEHICULES.
- Oublier `/api/templates` dans un futur renommage de `/templates` peut créer une confusion route page/API.

## 10. Recommandations de suite

1. Ouvrir une future CX de correction de libellés résiduels uniquement si validation humaine : `Dépôts / Bases`, accents onboarding, `template/templates` visibles, singular/plural privacy.
2. Ne pas ouvrir de CX de renommage technique tant que les décisions `/templates`, `/onboarding`, aliases et redirections restent non fournies.
3. Conserver les routes anglaises principales en Alpha et documenter clairement la convention route technique anglaise + libellé visible français.
4. Traiter `Suivi des véhicules` dans son bloc dédié avant toute entrée shell/dashboard.

## 11. Contrôle de périmètre

- Aucun fichier `app/` modifié.
- Aucun fichier `next.config.ts` modifié.
- Aucun fichier Prisma modifié.
- Aucun fichier Base44 modifié.
- Aucun fichier MASTER modifié.
- Aucun fichier `docs/3-TEMPLATES` modifié.
- Seuls les fichiers de session ont été créés/modifiés.

## 12. Contrôle d'absence de modification applicative

Contrôle attendu après intervention :

```powershell
git diff --name-only
```

Résultat attendu : aucun fichier applicatif dans la sortie. Résultat réel documenté en fin de session.

## 13. Contrôle d'absence de patch .diff

Commande :

```powershell
Get-ChildItem -LiteralPath "docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES" -Recurse -Filter "*.diff"
```

Résultat réel documenté après intervention.

## 14. Contrôle encodage UTF-8 sans BOM

Contrôle demandé, exécuté avec le motif de caractères suspects fourni dans la consigne :

```powershell
rg -n "<motif caractères suspects demandé>" "docs/2-SESSIONS/1-ALPHA/BLOC_T2_NOMENCLATURE_ROUTES/SESSION-20260616-10_DX_T2_CADRAGE-RENOMMAGES"
```

Contrôle BOM complémentaire exécuté après intervention et documenté dans `3-FIN_DE_SESSION.md`.

## 15. Informations non fournies

- `INFORMATION NON FOURNIE — À CONFIRMER` : décision finale de renommage technique `/templates`.
- `INFORMATION NON FOURNIE — À CONFIRMER` : décision finale de renommage technique `/onboarding`.
- `INFORMATION NON FOURNIE — À CONFIRMER` : politique finale aliases/redirections.
- `INFORMATION NON FOURNIE — À CONFIRMER` : statut exact de `Suivi des véhicules`.
- `INFORMATION NON FOURNIE — À CONFIRMER` : validation de routes françaises pour `/users`, `/vehicles`, `/company`.
- `INFORMATION NON FOURNIE — À CONFIRMER` : décision SEO détaillée Alpha.
