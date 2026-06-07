# Ambulance Manager — AUDIT_CODE_EXISTANT_ALPHA_V2

Version : V1.0 AUDIT  
Date : 25/05/2026

## 1. Résumé exécutif

Audit finalisé en reprise de l’audit précédent (sans relancer un audit complet depuis zéro), avec consolidation des constats existants et correction demandée sur le point encodage.  
État général : base Next.js/React/Prisma exploitable, mais plusieurs écarts de conformité UI/UX et fonctionnelle sur les modules métier.  
Pages les plus proches de la cible : `Planning` (socle large), `Société` (profil + règles partiellement connectés), `Audit` (collecte/logs déjà présents).  
Pages les plus éloignées : `Suivi des véhicules` (module dédié non matérialisé), `Modèles horaires` (nomenclature + conformité UX), `Shell global` (libellés/accès refusé).  
Risques majeurs : cohérence permissions front/API, écarts de nomenclature V2 (`Modèles horaires`, `Mise en route`), absence de certains flux attendus (restauration archives, états non autorisé conformes), points SUPPORT/audit transverses.  
Priorité générale avant reprise : corriger les écarts transverses (navigation, permissions, états UI), puis traiter les modules métier à fort couplage (`Planning`, `Véhicules`, `Utilisateurs/RH`, `Modèles horaires`).

## 2. Sources consultées

Liste reprise du précédent audit (lecture seule) :

- [C:/Users/arche/ambulance-manager/docs/1-MASTER/DOCUMENT_MAITRE_V2.md](C:/Users/arche/ambulance-manager/docs/1-MASTER/DOCUMENT_MAITRE_V2.md)
- [C:/Users/arche/ambulance-manager/docs/1-MASTER/PLAN_DE_DEVELOPPEMENT_V2.md](C:/Users/arche/ambulance-manager/docs/1-MASTER/PLAN_DE_DEVELOPPEMENT_V2.md)
- [C:/Users/arche/ambulance-manager/docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_GLOBALE.md](C:/Users/arche/ambulance-manager/docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_GLOBALE.md)
- [C:/Users/arche/ambulance-manager/docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_INDEX.md](C:/Users/arche/ambulance-manager/docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_INDEX.md)
- [C:/Users/arche/ambulance-manager/docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_CHECKLIST_CODEX.md](C:/Users/arche/ambulance-manager/docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_CHECKLIST_CODEX.md)
- [C:/Users/arche/ambulance-manager/docs/1-MASTER/2-REFERENCE_UI_UX/0-REFERENCE_UI_UX_SHELL_GLOBAL.md](C:/Users/arche/ambulance-manager/docs/1-MASTER/2-REFERENCE_UI_UX/0-REFERENCE_UI_UX_SHELL_GLOBAL.md)
- [C:/Users/arche/ambulance-manager/docs/1-MASTER/2-REFERENCE_UI_UX/1-REFERENCE_UI_UX_LOGIN.md](C:/Users/arche/ambulance-manager/docs/1-MASTER/2-REFERENCE_UI_UX/1-REFERENCE_UI_UX_LOGIN.md)
- [C:/Users/arche/ambulance-manager/docs/1-MASTER/2-REFERENCE_UI_UX/2-REFERENCE_UI_UX_DASHBOARD.md](C:/Users/arche/ambulance-manager/docs/1-MASTER/2-REFERENCE_UI_UX/2-REFERENCE_UI_UX_DASHBOARD.md)
- [C:/Users/arche/ambulance-manager/docs/1-MASTER/2-REFERENCE_UI_UX/3-REFERENCE_UI_UX_MODELES_HORAIRES.md](C:/Users/arche/ambulance-manager/docs/1-MASTER/2-REFERENCE_UI_UX/3-REFERENCE_UI_UX_MODELES_HORAIRES.md)
- [C:/Users/arche/ambulance-manager/docs/1-MASTER/2-REFERENCE_UI_UX/4-REFERENCE_UI_UX_PLANNING.md](C:/Users/arche/ambulance-manager/docs/1-MASTER/2-REFERENCE_UI_UX/4-REFERENCE_UI_UX_PLANNING.md)
- [C:/Users/arche/ambulance-manager/docs/1-MASTER/2-REFERENCE_UI_UX/5-REFERENCE_UI_UX_UTILISATEURS_RH.md](C:/Users/arche/ambulance-manager/docs/1-MASTER/2-REFERENCE_UI_UX/5-REFERENCE_UI_UX_UTILISATEURS_RH.md)
- [C:/Users/arche/ambulance-manager/docs/1-MASTER/2-REFERENCE_UI_UX/6-REFERENCE_UI_UX_VEHICULES.md](C:/Users/arche/ambulance-manager/docs/1-MASTER/2-REFERENCE_UI_UX/6-REFERENCE_UI_UX_VEHICULES.md)
- [C:/Users/arche/ambulance-manager/docs/1-MASTER/2-REFERENCE_UI_UX/6.1-REFERENCE_UI_UX_SUIVI_DES_VEHICULES.md](C:/Users/arche/ambulance-manager/docs/1-MASTER/2-REFERENCE_UI_UX/6.1-REFERENCE_UI_UX_SUIVI_DES_VEHICULES.md)
- [C:/Users/arche/ambulance-manager/docs/1-MASTER/2-REFERENCE_UI_UX/7-REFERENCE_UI_UX_DEPOTS_BASES.md](C:/Users/arche/ambulance-manager/docs/1-MASTER/2-REFERENCE_UI_UX/7-REFERENCE_UI_UX_DEPOTS_BASES.md)
- [C:/Users/arche/ambulance-manager/docs/1-MASTER/2-REFERENCE_UI_UX/8-REFERENCE_UI_UX_SOCIETE.md](C:/Users/arche/ambulance-manager/docs/1-MASTER/2-REFERENCE_UI_UX/8-REFERENCE_UI_UX_SOCIETE.md)
- [C:/Users/arche/ambulance-manager/docs/1-MASTER/2-REFERENCE_UI_UX/9-REFERENCE_UI_UX_MISE_EN_ROUTE.md](C:/Users/arche/ambulance-manager/docs/1-MASTER/2-REFERENCE_UI_UX/9-REFERENCE_UI_UX_MISE_EN_ROUTE.md)
- [C:/Users/arche/ambulance-manager/docs/1-MASTER/2-REFERENCE_UI_UX/10-REFERENCE_UI_UX_AUDIT.md](C:/Users/arche/ambulance-manager/docs/1-MASTER/2-REFERENCE_UI_UX/10-REFERENCE_UI_UX_AUDIT.md)
- [C:/Users/arche/ambulance-manager/lib/auth.ts](C:/Users/arche/ambulance-manager/lib/auth.ts)
- [C:/Users/arche/ambulance-manager/lib/services/audit](C:/Users/arche/ambulance-manager/lib/services/audit)
- [C:/Users/arche/ambulance-manager/prisma/schema.prisma](C:/Users/arche/ambulance-manager/prisma/schema.prisma)
- [C:/Users/arche/ambulance-manager/app](C:/Users/arche/ambulance-manager/app)

`components/` : dossier non détecté au premier niveau du repo fourni. Composants UI détectés principalement dans `app/ui/`.

Note de reprise : certains chemins précis de composants internes ont été cités dans l’audit initial mais non réouverts dans cette passe de correction. Ils restent traités comme déjà audités dans la version précédente.

## 3. Cartographie des routes/pages détectées

| Page/module | Route détectée | Fichier page principal | Composants principaux | API liées | Services/lib liés | Référence UI/UX trouvée | Fiche fonctionnalités trouvée | Verdict provisoire |
|---|---|---|---|---|---|---|---|---|
| Login | `/login` | `app/login/page.*` | formulaire login, checkbox remember me | auth/session | `lib/auth.ts` | Oui | Oui | incomplet |
| Shell global / navigation | layout privé + menu latéral | `app/**/layout.*` | sidebar, topbar, liens modules | session/me, guards | auth/permissions | Oui | Oui | non conforme |
| Tableau de bord | `/dashboard` | `app/dashboard/page.*` | widgets KPI, cartes statut | Pas d’API dashboard dédiée détectée ; page serveur + Prisma direct | logique page serveur | Oui | Oui | non conforme |
| Société | `/company` | `app/company/page.*` | profile form, company rules panel | company profile, company rules GET/PATCH | services company | Oui | Oui | incomplet |
| Dépôts / Bases | `/depots` ou équivalent | `app/depots*/page.*` | table/list, create/edit/archive | depots CRUD | services depots | Oui | Oui | non conforme |
| Modèles horaires | `/templates` (libellé actuel) | `app/templates/page.*` | templates list/editor | templates CRUD | services templates | Oui | Oui | non conforme |
| Utilisateurs / RH | `/users` ou équivalent | `app/users*/page.*` | table filtres, side panel | users list/create/update | services users/rh | Oui | Oui | non conforme |
| Véhicules | `/vehicles` | `app/vehicles/page.*` | liste, détail, actions | vehicles CRUD | services vehicles | Oui | Oui | non conforme |
| Suivi des véhicules | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | partiel intégré véhicules | APIs dédiées non trouvées | logique partielle | Oui | Oui | non conforme |
| Audit | `/audit` | `app/audit/page.*` | logs table, filtres | audit logs | `lib/services/audit/*` | Oui | Oui | incomplet |
| Mise en route | `/onboarding` (libellé actuel) | `app/onboarding/page.*` | checklist/steps | onboarding API | services onboarding | Oui | Oui | non conforme |
| Planning | `/planning` | `app/planning/page.*` | calendrier, affectation, panneaux | planning + autoschedule + publish + exports | services planning | Oui | Oui | incomplet |
| Privacy (hors périmètre) | `/privacy` | `app/privacy/page.*` | page statique | n/a | n/a | globale | n/a | à confirmer |

## 4. Cartographie API/services

Routes API/services visibles (audit précédent consolidé) :

- Auth/session : login, contrôle session, redirections guard.
- Company : profil société, règles société (GET/PATCH).
- Depots : CRUD + archivage.
- Templates/Modèles horaires : endpoints création/édition/archive, restauration partielle à confirmer.
- Users/RH : listing, filtres, création/édition, statut.
- Vehicles : CRUD + historiques/anomalies partiellement visibles.
- Audit : agrégation événements (incluant login + événements planning).
- Planning : flux manuel, autoschedule, matching preview/apply, publish/cancel, export.
- Planning legacy : endpoint `/match` renvoyant `410 GONE` (déprécié).

Services/libs transverses visibles :

- `lib/auth.ts` : session auth + durée session fixe (remember me non branché visiblement).
- `lib/services/audit/*` : journalisation/traçabilité.
- Contrôles permissions par capacités (`canManage...`) selon modules.
- Fonctions liées au mode société (`saveCompanyMode`, `canManageCompanyMode`) présentes mais non pleinement raccordées à des contrôles UI visibles.

Dépendances Prisma visibles :

- Schéma Prisma présent et utilisé par APIs métier.
- Plusieurs modules semblent s’appuyer sur statuts actifs/archivés.
- Couverture Prisma spécifique `Suivi des véhicules` : INFORMATION NON FOURNIE — À CONFIRMER.

Incohérences évidentes :

- Front permissions vs backend permissions non homogènes (exemple véhicules création).
- Filtres UI exposés vs filtrage API effectif non alignés (exemple users actifs/inactifs).
- Nomenclature fonctionnelle V2 non respectée sur plusieurs pages (`Templates`, `Onboarding`).

API absentes ou à confirmer :

- API dédiée autonome `Suivi des véhicules` : non prouvée.
- Flux restauration complet pour modules archivables : partiellement absent/à confirmer.
- Certains champs audit/support requis en transverses : appels à confirmer.

## 5. Audit par page/module

### Login

#### 5.1.1 Route et fichiers détectés
Route `/login` détectée.  
Fichiers de login présents dans `app/login/*`.  
Gestion session auth visible via `lib/auth.ts`.

#### 5.1.2 Résumé du code existant
Formulaire login présent avec champ identifiant/mot de passe et option `Se souvenir de moi`.  
Contrôle d’accès basique présent (redirections selon état de session).  
Durée/session gérée côté auth avec configuration fixe visible.

#### 5.1.3 Comparaison avec la fiche fonctionnalités
Verdict : incomplet.  
Motif : base login présente, mais comportement `Se souvenir de moi` non clairement appliqué au cycle session.

#### 5.1.4 Comparaison avec la maquette V2
Classement :
- conforme visuellement : partiel
- écarts visuels : possibles détails d’alignement/états
- éléments manquants : retour explicite `accès refusé` unifié
- éléments en trop : INFORMATION NON FOURNIE — À CONFIRMER
- à confirmer : rendu exact navigateur final

#### 5.1.5 Comparaison avec la référence UI/UX V2
Écart visible : l’état non autorisé attendu (`Accès refusé`) est souvent remplacé par redirection `/login`.

#### 5.1.6 Permissions et sécurité visible
Contrôles session présents.  
Politique fine par rôle/capacité sur login : INFORMATION NON FOURNIE — À CONFIRMER.

#### 5.1.7 États UI
- loading : partiel visible
- empty state : n/a
- error state : présent (échec auth)
- disabled : partiel
- non autorisé : non conforme au pattern attendu global
- archivés : n/a
- états spécifiques métier : n/a

#### 5.1.8 API et logique métier
Auth API/session utilisés.  
`remember me` non raccordé de façon démontrable à la persistance session.

#### 5.1.9 Risques
Risque UX/sécurité de compréhension de session utilisateur.  
Risque d’incohérence avec règles globales d’accès refusé.

#### 5.1.10 Actions futures recommandées
- Valider puis harmoniser le comportement `Se souvenir de moi`.
- Aligner la gestion non autorisé sur la référence UI/UX globale.
- Vérifier la cohérence expiration session vs exigences métier.

#### 5.1.11 Verdict final de la page
incomplet

### Shell global / navigation

#### 5.2.1 Route et fichiers détectés
Layout global privé et navigation latérale présents dans `app/**/layout.*` et composants de navigation.

#### 5.2.2 Résumé du code existant
Shell applicatif en place (navigation vers modules majeurs).  
Libellés de menu observés avec nomenclature partiellement legacy (`Templates`, `Onboarding`).

#### 5.2.3 Comparaison avec la fiche fonctionnalités
Verdict : non conforme.  
Motif : incohérence de nomenclature fonctionnelle et comportement non autorisé non unifié.

#### 5.2.4 Comparaison avec la maquette V2
Classement :
- conforme visuellement : partiel
- écarts visuels : structure/hiérarchie à ajuster selon maquettes
- éléments manquants : état `Accès refusé` dédié
- éléments en trop : INFORMATION NON FOURNIE — À CONFIRMER
- à confirmer : micro-comportements navigation

#### 5.2.5 Comparaison avec la référence UI/UX V2
Écarts codables :
- termes modules non alignés (`Modèles horaires`, `Mise en route` attendus).
- flux refus d’accès non conforme.

#### 5.2.6 Permissions et sécurité visible
Guards présents, mais stratégie `redirect login` trop fréquente pour cas non autorisé connecté.

#### 5.2.7 États UI
- loading : partiel
- empty state : n/a
- error state : partiel
- disabled : partiel
- non autorisé : insuffisant/non conforme
- archivés : n/a
- états métier : n/a

#### 5.2.8 API et logique métier
Dépend de session/permissions globales.  
Couplage fort avec gestion de rôles/capacités.

#### 5.2.9 Risques
Risque de dette de cohérence transversale si non corrigé avant modules.

#### 5.2.10 Actions futures recommandées
- Uniformiser nomenclature menu/UI.
- Introduire pattern unique `Accès refusé` pour utilisateur authentifié.
- Valider mapping routes vs taxonomie V2.

#### 5.2.11 Verdict final de la page
non conforme

### Tableau de bord

#### 5.3.1 Route et fichiers détectés
Route `/dashboard` et page dédiée détectées (`app/dashboard/*`).

#### 5.3.2 Résumé du code existant
Dashboard avec indicateurs/cartes présents.  
Pas d’API dashboard dédiée détectée. Le dashboard semble s’appuyer sur une page serveur et des requêtes Prisma directes.

#### 5.3.3 Comparaison avec la fiche fonctionnalités
Verdict : non conforme.  
Motif : écran existant, mais divergence avec interactions/libellés attendus.

#### 5.3.4 Comparaison avec la maquette V2
Classement :
- conforme visuellement : partiel
- écarts visuels : actions header attendues non présentes
- éléments manquants : `Personnaliser`, `Réinitialiser`
- éléments en trop : éléments legacy à confirmer
- à confirmer : composition exacte widgets vs maquette finale

#### 5.3.5 Comparaison avec la référence UI/UX V2
Écarts :
- actions de personnalisation non matérialisées comme attendu.
- nomenclature/ordre d’informations partiellement legacy.

#### 5.3.6 Permissions et sécurité visible
Accès protégé globalement, granularité rôle dashboard : INFORMATION NON FOURNIE — À CONFIRMER.

#### 5.3.7 États UI
- loading : visible
- empty state : partiel
- error state : partiel
- disabled : à confirmer
- non autorisé : non harmonisé globalement
- archivés : n/a
- états métier : partiels

#### 5.3.8 API et logique métier
Pas d’API dashboard dédiée détectée.  
La logique semble portée par rendu serveur et requêtes Prisma directes.

#### 5.3.9 Risques
Risque de reprise UX tardive coûteuse si structure widgets non stabilisée.

#### 5.3.10 Actions futures recommandées
- Aligner header/actions avec référence V2.
- Vérifier mapping KPI métier attendus.
- Normaliser états UI (loading/empty/error).

#### 5.3.11 Verdict final de la page
non conforme

### Société

#### 5.4.1 Route et fichiers détectés
Route `/company` détectée.  
Page société + panneau règles présents.

#### 5.4.2 Résumé du code existant
Formulaire profil société opérationnel.  
API règles société GET/PATCH présente.  
Composant `company-rules-panel` surtout en lecture selon audit précédent.

#### 5.4.3 Comparaison avec la fiche fonctionnalités
Verdict : incomplet.  
Motif : base fonctionnelle existante, mais mécanismes complets de pilotage règles/modes non finalisés côté UI.

#### 5.4.4 Comparaison avec la maquette V2
Classement :
- conforme visuellement : partiel
- écarts visuels : panel règles/édition
- éléments manquants : contrôle explicite de certains modes/règles
- éléments en trop : INFORMATION NON FOURNIE — À CONFIRMER
- à confirmer : restitution complète de tous blocs maquette

#### 5.4.5 Comparaison avec la référence UI/UX V2
Écarts :
- distinction lecture/édition pas totalement alignée.
- fonctions `saveCompanyMode` / `canManageCompanyMode` non visibles dans des contrôles finaux cohérents.

#### 5.4.6 Permissions et sécurité visible
Permissions présentes mais raccord UI incomplet pour certaines règles de mode société.

#### 5.4.7 États UI
- loading : partiel
- empty state : partiel
- error state : partiel
- disabled : partiel
- non autorisé : pattern global à harmoniser
- archivés : n/a
- états métier : partiels

#### 5.4.8 API et logique métier
Company profile + company rules branchés.  
Certaines règles marquées préparées sans preuve d’activation bout-en-bout.

#### 5.4.9 Risques
Risque de divergence entre règles stockées et comportement réel si UI incomplète.

#### 5.4.10 Actions futures recommandées
- Finaliser édition/validation des règles société.
- Aligner droits d’édition sur capacités visibles.
- Valider persistance des modes société de bout en bout.

#### 5.4.11 Verdict final de la page
incomplet

### Dépôts / Bases

#### 5.5.1 Route et fichiers détectés
Route dépôts/bases présente (`/depots` ou équivalent).  
Page listage + formulaires CRUD détectés.

#### 5.5.2 Résumé du code existant
Création, édition et archivage disponibles.  
Liste/colonnes présentes avec variation par rapport au référentiel attendu.

#### 5.5.3 Comparaison avec la fiche fonctionnalités
Verdict : non conforme.  
Motif : fonctions principales présentes, mais couverture incomplète (restauration/flux archive) et champs métier non totalement alignés.

#### 5.5.4 Comparaison avec la maquette V2
Classement :
- conforme visuellement : partiel
- écarts visuels : table/colonnes/actions
- éléments manquants : restauration désarchivage
- éléments en trop : INFORMATION NON FOURNIE — À CONFIRMER
- à confirmer : détails de champ (responsable local, etc.)

#### 5.5.5 Comparaison avec la référence UI/UX V2
Écarts :
- cycle de vie archive incomplet.
- alignement des champs/colonnes à finaliser.

#### 5.5.6 Permissions et sécurité visible
Droits CRUD présents globalement.  
Droits distincts archive/restauration : INFORMATION NON FOURNIE — À CONFIRMER.

#### 5.5.7 États UI
- loading : partiel
- empty state : partiel
- error state : partiel
- disabled : partiel
- non autorisé : non harmonisé globalement
- archivés : oui (partiel)
- états métier : partiels

#### 5.5.8 API et logique métier
API CRUD dépôts branchées.  
API restore/unarchive complète : non prouvée.

#### 5.5.9 Risques
Risque opérationnel sur gestion parc de bases archivées si restauration absente.

#### 5.5.10 Actions futures recommandées
- Compléter cycle archive/restauration.
- Recaler champs et libellés selon fiche/référence.
- Vérifier cohérence API/UI sur filtres actifs/archivés.

#### 5.5.11 Verdict final de la page
non conforme

### Modèles horaires

#### 5.6.1 Route et fichiers détectés
Module détecté principalement sous route `/templates`.  
Composants liste/édition de modèles présents.

#### 5.6.2 Résumé du code existant
Module volumineux existant avec opérations principales.  
Nomenclature affichée majoritairement `Templates` / `Templates de garde`.

#### 5.6.3 Comparaison avec la fiche fonctionnalités
Verdict : non conforme.  
Motif : base métier présente, mais nommage et certaines interactions attendues V2 non respectés.

#### 5.6.4 Comparaison avec la maquette V2
Classement :
- conforme visuellement : partiel
- écarts visuels : terminologie et organisation
- éléments manquants : certains flux action/restore
- éléments en trop : legacy terminologique
- à confirmer : détail exact des sous-états maquette

#### 5.6.5 Comparaison avec la référence UI/UX V2
Écarts :
- `Modèles horaires` attendu vs `Templates` affiché.
- uniformisation actions/états encore partielle.

#### 5.6.6 Permissions et sécurité visible
Permissions présentes globalement, matrice fine par action à confirmer.

#### 5.6.7 États UI
- loading : partiel
- empty state : partiel
- error state : partiel
- disabled : visible sur certaines actions
- non autorisé : pattern global non harmonisé
- archivés : partiel
- états métier : partiels

#### 5.6.8 API et logique métier
APIs templates présentes.  
Restauration complète et cohérence archivage : à confirmer.

#### 5.6.9 Risques
Risque de confusion métier élevé tant que nomenclature reste legacy.

#### 5.6.10 Actions futures recommandées
- Renommer et réaligner terminologie V2.
- Finaliser flux archive/restauration.
- Vérifier règles de duplication/édition selon référence.

#### 5.6.11 Verdict final de la page
non conforme

### Utilisateurs / RH

#### 5.7.1 Route et fichiers détectés
Module users/RH détecté (`/users` ou équivalent), table + panneau latéral.

#### 5.7.2 Résumé du code existant
Module riche : listing, filtres, édition, statut.  
Incohérence constatée : filtre UI `INACTIVE` exposé alors que la liste API semble filtrer actifs par défaut.

#### 5.7.3 Comparaison avec la fiche fonctionnalités
Verdict : non conforme.  
Motif : couverture large mais comportement de filtre/statut non cohérent bout-en-bout.

#### 5.7.4 Comparaison avec la maquette V2
Classement :
- conforme visuellement : partiel
- écarts visuels : détail panneau latéral/actions
- éléments manquants : action réellement branchée sur certains contrôles
- éléments en trop : INFORMATION NON FOURNIE — À CONFIRMER
- à confirmer : exactitude de toutes variantes d’état RH

#### 5.7.5 Comparaison avec la référence UI/UX V2
Écarts :
- incohérence filtres actifs/inactifs.
- présence d’élément d’action sans handler effectif (icône suppression panneau latéral, selon audit précédent).

#### 5.7.6 Permissions et sécurité visible
Permissions visibles, mais cohérence fine par action RH à confirmer.

#### 5.7.7 États UI
- loading : partiel
- empty state : partiel
- error state : partiel
- disabled : partiel
- non autorisé : non harmonisé globalement
- archivés : n/a
- états métier : présents mais incomplets

#### 5.7.8 API et logique métier
APIs users présentes.  
Mismatch UI/API sur filtres statut.

#### 5.7.9 Risques
Risque fonctionnel RH (lecture erronée des statuts utilisateurs).

#### 5.7.10 Actions futures recommandées
- Recaler filtres UI sur comportement API réel.
- Vérifier handlers manquants sur actions visibles.
- Réviser la matrice permission/action RH.

#### 5.7.11 Verdict final de la page
non conforme

### Véhicules

#### 5.8.1 Route et fichiers détectés
Route `/vehicles` détectée.  
Pages/composants liste + détails + actions présents.

#### 5.8.2 Résumé du code existant
Module avancé disponible (CRUD + vues complémentaires).  
Incohérence permission : page pilotée par `canManageVehicles` alors que POST création est restreint ADMIN.

#### 5.8.3 Comparaison avec la fiche fonctionnalités
Verdict : non conforme.  
Motif : socle fort mais divergences permissionnelles et certaines données de détail partiellement synthétiques.

#### 5.8.4 Comparaison avec la maquette V2
Classement :
- conforme visuellement : partiel
- écarts visuels : sections de suivi/anomalies/historique
- éléments manquants : profondeur attendue de suivi
- éléments en trop : INFORMATION NON FOURNIE — À CONFIRMER
- à confirmer : rendu complet des sous-vues

#### 5.8.5 Comparaison avec la référence UI/UX V2
Écarts :
- matrice droits front/API non homogène.
- éléments de suivi véhicule pas entièrement conformes au référentiel dédié 6.1.

#### 5.8.6 Permissions et sécurité visible
Écart critique de cohérence permissionnelle création véhicule.

#### 5.8.7 États UI
- loading : partiel
- empty state : partiel
- error state : partiel
- disabled : partiel
- non autorisé : pattern global à harmoniser
- archivés : à confirmer
- états métier : partiels (anomalies/historique)

#### 5.8.8 API et logique métier
APIs véhicules présentes.  
Données de certains panneaux semblent dérivées/placeholder dans des cas.

#### 5.8.9 Risques
Risque d’accès incohérent par rôle.  
Risque qualité data sur vues de détail non totalement source-of-truth.

#### 5.8.10 Actions futures recommandées
- Unifier permissions front/API.
- Valider origine des données de détail.
- Aligner module avec référence 6 + 6.1.

#### 5.8.11 Verdict final de la page
non conforme

### Suivi des véhicules

#### 5.9.1 Route et fichiers détectés
Aucune route autonome clairement prouvée pour un module dédié `Suivi des véhicules`.  
Couverture partielle incluse dans `Véhicules`.

#### 5.9.2 Résumé du code existant
Fonctions de suivi observées de manière fragmentée dans le module véhicules.  
Absence de preuve d’un sous-module complet conforme à la référence dédiée.

#### 5.9.3 Comparaison avec la fiche fonctionnalités
Verdict : non conforme.  
Motif : référence dédiée 6.1 attend un périmètre explicite, non matérialisé clairement.

#### 5.9.4 Comparaison avec la maquette V2
Classement :
- conforme visuellement : non
- écarts visuels : importants
- éléments manquants : vues/flux dédiés suivi
- éléments en trop : n/a
- à confirmer : possibilité d’implémentation cachée non détectée

#### 5.9.5 Comparaison avec la référence UI/UX V2
Écart majeur : module dédié non identifiable de façon autonome.

#### 5.9.6 Permissions et sécurité visible
Permissions spécifiques suivi : INFORMATION NON FOURNIE — À CONFIRMER.

#### 5.9.7 États UI
- loading : INFORMATION NON FOURNIE — À CONFIRMER
- empty state : INFORMATION NON FOURNIE — À CONFIRMER
- error state : INFORMATION NON FOURNIE — À CONFIRMER
- disabled : INFORMATION NON FOURNIE — À CONFIRMER
- non autorisé : INFORMATION NON FOURNIE — À CONFIRMER
- archivés : INFORMATION NON FOURNIE — À CONFIRMER
- états métier : partiels uniquement via véhicules

#### 5.9.8 API et logique métier
APIs dédiées suivi (vérification, désinfection, anomalies, échéances) : non prouvées comme module autonome.

#### 5.9.9 Risques
Risque fort de sous-couverture métier critique véhicule.

#### 5.9.10 Actions futures recommandées
- Décider module autonome vs sous-module explicite dans véhicules.
- Cartographier précisément les exigences 6.1.
- Ajouter traçabilité états métier manquants.

#### 5.9.11 Verdict final de la page
non conforme

### Audit

#### 5.10.1 Route et fichiers détectés
Route `/audit` détectée.  
Page audit + API log disponibles.

#### 5.10.2 Résumé du code existant
Agrégation d’événements observée (planning, login, actions diverses).  
Filtres présents avec comportement partiellement à confirmer.

#### 5.10.3 Comparaison avec la fiche fonctionnalités
Verdict : incomplet.  
Motif : base solide de journalisation mais conformité complète aux attentes filtre/contexte/accès non démontrée.

#### 5.10.4 Comparaison avec la maquette V2
Classement :
- conforme visuellement : partiel
- écarts visuels : filtres, niveaux de détail
- éléments manquants : certains champs de contexte
- éléments en trop : INFORMATION NON FOURNIE — À CONFIRMER
- à confirmer : restitution exacte du format final attendu

#### 5.10.5 Comparaison avec la référence UI/UX V2
Écarts :
- fallback de contexte utilisé quand payload incomplet (`INFORMATION NON FOURNIE — À CONFIRMER`).
- gestion accès/non autorisé à harmoniser globalement.

#### 5.10.6 Permissions et sécurité visible
Contrôle d’accès présent.  
Granularité fine consultation/export audit : à confirmer.

#### 5.10.7 États UI
- loading : partiel
- empty state : partiel
- error state : partiel
- disabled : à confirmer
- non autorisé : non harmonisé globalement
- archivés : n/a
- états métier : partiels

#### 5.10.8 API et logique métier
API logs branchées.  
Consolidation multi-sources d’événements déjà en place.

#### 5.10.9 Risques
Risque conformité traçabilité si champs contexte non normés.

#### 5.10.10 Actions futures recommandées
- Normaliser schéma des événements audit.
- Stabiliser filtres/date et niveau de détail attendu.
- Vérifier besoins export et restrictions par rôle.

#### 5.10.11 Verdict final de la page
incomplet

### Mise en route

#### 5.11.1 Route et fichiers détectés
Route détectée en `/onboarding` avec page dédiée.

#### 5.11.2 Résumé du code existant
Parcours onboarding présent, terminologie côté code/UI principalement `Onboarding`.

#### 5.11.3 Comparaison avec la fiche fonctionnalités
Verdict : non conforme.  
Motif : divergence de nomenclature et d’alignement aux références `Mise en route`.

#### 5.11.4 Comparaison avec la maquette V2
Classement :
- conforme visuellement : partiel
- écarts visuels : structure et wording
- éléments manquants : alignement terminologique/fonctionnel V2
- éléments en trop : legacy wording
- à confirmer : profondeur de chaque étape maquette

#### 5.11.5 Comparaison avec la référence UI/UX V2
Écart principal : libellé et positionnement module non alignés sur `Mise en route`.

#### 5.11.6 Permissions et sécurité visible
Accès protégé globalement, règles par rôle du parcours : INFORMATION NON FOURNIE — À CONFIRMER.

#### 5.11.7 États UI
- loading : partiel
- empty state : n/a
- error state : partiel
- disabled : partiel
- non autorisé : pattern global non harmonisé
- archivés : n/a
- états métier : partiels

#### 5.11.8 API et logique métier
APIs onboarding présentes à confirmer en couverture complète.

#### 5.11.9 Risques
Risque d’incompréhension utilisateur/métier par incohérence terminologique.

#### 5.11.10 Actions futures recommandées
- Aligner nomenclature UI/route/texte avec référence V2.
- Vérifier toutes les étapes métier attendues.
- Harmoniser contrôles d’accès et états d’erreur.

#### 5.11.11 Verdict final de la page
non conforme

### Planning

#### 5.12.1 Route et fichiers détectés
Route `/planning` détectée.  
Module important avec panneaux/actions multiples.

#### 5.12.2 Résumé du code existant
Couverture large : manuel, autoschedule, matching preview/apply, publication/annulation, exports, audit.  
Endpoint legacy `/match` déprécié (`410 GONE`).  
Composant `manual-planning-panel` signalé comme potentiellement non utilisé.

#### 5.12.3 Comparaison avec la fiche fonctionnalités
Verdict : incomplet.  
Motif : base robuste, mais rationalisation legacy et complétude UX/règles métier encore inabouties.

#### 5.12.4 Comparaison avec la maquette V2
Classement :
- conforme visuellement : partiel
- écarts visuels : organisation panels/actions
- éléments manquants : certains enchaînements/états finaux
- éléments en trop : traces legacy
- à confirmer : conformité pixel/interaction exhaustive

#### 5.12.5 Comparaison avec la référence UI/UX V2
Écarts :
- présence de flux legacy dépréciés.
- fonctions mode société/permissions non pleinement exposées là où attendu.

#### 5.12.6 Permissions et sécurité visible
Permissions présentes et complexes.  
Cohérence complète front/API par action planning : à confirmer.

#### 5.12.7 États UI
- loading : présent
- empty state : partiel
- error state : présent partiel
- disabled : présent
- non autorisé : non harmonisé globalement
- archivés : n/a
- états métier : nombreux mais hétérogènes

#### 5.12.8 API et logique métier
APIs planning riches et actives.  
Couche legacy coexistante augmente la complexité de reprise.

#### 5.12.9 Risques
Risque élevé de régression si nettoyage legacy sans stratégie progressive.  
Risque de dette de test sur moteur d’affectation.

#### 5.12.10 Actions futures recommandées
- Cartographier flux actifs vs dépréciés.
- Uniformiser états UI et permissions.
- Prioriser tests fonctionnels sur publish/cancel/autoschedule/matching.

#### 5.12.11 Verdict final de la page
incomplet

## 6. Synthèse globale des verdicts

| Page/module | Verdict | Justification courte | Priorité de reprise | Type probable de session suivante |
|---|---|---|---|---|
| Login | incomplet | remember me + non autorisé global | haute | COMPLÉTION |
| Shell global / navigation | non conforme | nomenclature + flux accès refusé | très haute | CORRECTION |
| Tableau de bord | non conforme | actions/header V2 manquants | haute | CORRECTION |
| Société | incomplet | règles/modes partiellement raccordés | haute | COMPLÉTION |
| Dépôts / Bases | non conforme | cycle archive/restauration incomplet | haute | CORRECTION |
| Modèles horaires | non conforme | nomenclature legacy + flux partiels | très haute | CORRECTION |
| Utilisateurs / RH | non conforme | mismatch filtres UI/API + actions incomplètes | très haute | CORRECTION |
| Véhicules | non conforme | permissions front/API incohérentes | très haute | CORRECTION |
| Suivi des véhicules | non conforme | module dédié non matérialisé | très haute | COMPLÉTION |
| Audit | incomplet | logs présents mais normalisation incomplète | moyenne/haute | COMPLÉTION |
| Mise en route | non conforme | onboarding vs mise en route | haute | CORRECTION |
| Planning | incomplet | riche mais legacy + homogénéisation à faire | très haute | COMPLÉTION |
| Privacy (hors périmètre) | à confirmer | présence hors audit prioritaire | faible | AUDIT complémentaire |

## 7. Écarts transverses

- Navigation : nomenclature V2 non uniformisée (`Templates`, `Onboarding` encore visibles).
- Permissions : écarts de cohérence entre contrôles front et restrictions API.
- Layout/Shell : gestion non autorisé non alignée sur pattern `Accès refusé` attendu.
- Composants UI : hétérogénéité des états `loading/empty/error/disabled`.
- API : coexistence de flux actifs et endpoints legacy dépréciés.
- Services : raccord incomplet de certaines fonctions transverses (modes société, support/audit).
- Prisma : couverture explicite du module `Suivi des véhicules` à confirmer.
- Conventions : terminologie métier non alignée partout avec référentiel V2.
- Accessibilité/lisibilité : qualité finale à confirmer en validation visuelle.
- Cohérence maquettes V2 : plusieurs écrans partiellement alignés mais non finalisés.
- Encodage : aucun mojibake évident confirmé dans le contrôle actuel ; affichage réel à confirmer uniquement si un rendu navigateur montre un problème.

## 8. Risques principaux pour la reprise du code

Bloquant :
- Alignement permissionnel front/API sur modules sensibles (`Véhicules`, potentiellement `Planning`, `RH`).
- Absence de module `Suivi des véhicules` clairement conforme à la référence dédiée.

Majeur :
- Non-conformité nomenclature/UX transversale (`Modèles horaires`, `Mise en route`, accès refusé).
- Coexistence flux legacy/planning pouvant créer des régressions.
- Incohérences filtres/statuts utilisateurs.

Moyen :
- États UI incomplets/variables selon pages.
- Raccord partiel de certaines règles société et capacités associées.
- Normalisation des événements audit.

Faible :
- Page `Privacy` hors périmètre principal, impact limité sauf interaction navigation/shell.

## 9. Recommandations pour préparer la Phase 5

Blocs de correction probables :
- Harmonisation Shell/navigation/nomenclature V2.
- Alignement permissions front/API par module.
- Correction des incohérences filtres/statuts RH.
- Alignement terminologique `Templates` -> `Modèles horaires`, `Onboarding` -> `Mise en route`.

Blocs de complétion probables :
- Compléter cycle archivage/restauration sur modules concernés.
- Finaliser raccord règles société/modes.
- Structurer `Suivi des véhicules` selon référence 6.1.
- Normaliser états UI transverses.

Audits complémentaires nécessaires :
- Validation visuelle navigateur vs maquettes PNG V2 écran par écran.
- Vérification exhaustive des permissions par rôle (matrice).
- Confirmation schéma data/API dédié suivi véhicules.
- Confirmation précise des fichiers maîtres actifs `_V2` vs anciens noms sans suffixe.

Pages à traiter en priorité :
1. Shell global / navigation
2. Véhicules + Suivi des véhicules
3. Utilisateurs / RH
4. Planning
5. Modèles horaires
6. Société
7. Tableau de bord
8. Login
9. Audit

Dépendances entre modules :
- Shell/permissions impactent toutes les pages.
- Société (modes/règles) impacte planning et potentiellement RH/ops.
- Véhicules et suivi véhicule impactent planning opérationnel.
- Audit dépend de la qualité de journalisation de tous les modules.

## 10. Conclusion

Verdict global : repo exploitable avec corrections majeures.

Ce verdict ne valide aucune page individuellement.  
Il confirme que la base technique est réutilisable pour la Phase 5, sous réserve de traiter les écarts de conformité et les points transverses identifiés.

## 11. Points nécessitant validation humaine

- Validation des documents de référence actifs `_V2` (notamment `DOCUMENT_MAITRE_V2.md`, `PLAN_DE_DEVELOPPEMENT_V2.md`) vs anciens noms sans suffixe demandés dans certains échanges.
- Validation de la cible terminologique officielle : `Modèles horaires`, `Mise en route`, `Accès refusé`.
- Validation de la matrice permissions officielle par rôle/capacité pour `RH`, `Véhicules`, `Planning`.
- Validation du périmètre exact attendu pour `Suivi des véhicules` (module autonome ou sous-module explicite).
- Validation des exigences archive/restauration pour `Dépôts` et `Modèles horaires`.
- Validation du niveau de détail et de filtrage attendu pour le module `Audit`.
- Validation finale navigateur contre maquettes PNG V2 pour confirmer les écarts visuels.
- Validation du comportement exact attendu pour `Se souvenir de moi`.
- Validation du traitement des événements SUPPORT (`supportReason`) dans la politique d’audit transversale.

## 12. Confirmation de lecture seule

- aucun fichier modifié ;
- aucun fichier créé ;
- aucun patch généré ;
- audit réalisé uniquement par lecture du repo.
