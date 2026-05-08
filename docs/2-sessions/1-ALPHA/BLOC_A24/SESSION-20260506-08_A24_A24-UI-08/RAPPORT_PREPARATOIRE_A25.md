# RAPPORT_PREPARATOIRE_A25 — Planning

Session : `SESSION-20260506-08_A24_A24-UI-08`  
Type : `AUDIT`  
Bloc : `A24 — Réalignement UI/UX global sur MAQUETTE`  
Objet : audit préparatoire du planning pour le bloc A25.

---

## 1. Synthèse

Audit préparatoire réalisé en lecture distante GitHub et à partir des documents maîtres fournis dans l’environnement de travail.

Verdict d’audit : **INCOMPLET**.

Justification :
- le planning réel n’a pas été exécuté dans le dépôt local de l’utilisateur ;
- aucune capture réelle `/planning` clair/sombre n’a pu être produite ici ;
- les validations terminales `git status --short`, `npm run lint`, `npm run build` n’ont pas pu être exécutées dans le dépôt réel ;
- l’analyse statique du code montre néanmoins que l’écran `/planning` reste structurellement éloigné de la cible `Planning_V1.2` : vue matricielle personnel/semaine, panneau droit de détail, tabs métier et bulk bar maquette ne sont pas suffisamment prouvés comme alignés.

Conclusion préparatoire : **passage vers A25 recommandé**, avec une première session A25 dédiée à la capture réelle et au gel fonctionnel avant correction UI/UX.

---

## 2. Sources et maquettes utilisées

Sources lues :
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/REFERENCE_UI_UX_A24.md`
- `docs/1-master/MAQUETTE/README_MAQUETTES_A24.md`
- `docs/1-master/MAQUETTE/SPEC_UI_UX_MAQUETTES_AMBULANCE_MANAGER.md`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/planning/manual-planning-panel.tsx`
- `app/globals.css`
- `package.json`
- documents squelettes de la session A24-UI-08 existants sur GitHub.

Maquette planning référencée par la documentation :
- `docs/1-master/MAQUETTE/Planning_V1.2.png`

Image PNG réellement ouverte/visualisée dans cet environnement :
- INFORMATION NON FOURNIE — À CONFIRMER

---

## 3. Fichiers inspectés

| Fichier | Usage dans l’audit | Statut |
|---|---|---|
| `app/planning/page.tsx` | route `/planning`, permissions, chargement initial, PageHeader, injection client | Inspecté |
| `app/planning/planning-client.tsx` | état UI principal, semaine, visibilité, bulk assign, autoschedule/matching, ancien planning | Inspecté partiellement |
| `app/planning/manual-planning-panel.tsx` | planning manuel, vue jour/semaine/mois, création/modification/annulation | Inspecté |
| `app/globals.css` | tokens A24, shell, cards, tables, boutons, mode sombre | Inspecté partiellement |
| `package.json` | scripts terminal attendus | Inspecté |
| `docs/1-master/MAQUETTE/SPEC_UI_UX_MAQUETTES_AMBULANCE_MANAGER.md` | cible UI/UX Planning_V1.2 | Inspecté |

---

## 4. Routes / surfaces contrôlées

| Route / surface | Contrôle réalisé | Résultat |
|---|---|---|
| `/planning` | lecture statique route Next.js | Route présente |
| `/api/planning/shifts` | surface visible via appels fetch, sans audit backend profond | Flux visible, non rejoué |
| `/api/planning/exports` | surface export visible via interface | Flux visible, non rejoué |
| `/api/planning/autoschedule/*` | surface UI autoschedule/matching visible côté client | Flux visible, non rejoué |
| `/audit` depuis planning | action d’accès visible si permission audit | Présente côté `PageHeader` |

---

## 5. Captures produites ou absentes

Captures produites :
- aucune.

Captures absentes :
- `/planning` mode clair, vue principale : INFORMATION NON FOURNIE — À CONFIRMER
- `/planning` mode sombre, vue principale : INFORMATION NON FOURNIE — À CONFIRMER
- vue jour : INFORMATION NON FOURNIE — À CONFIRMER
- vue semaine : INFORMATION NON FOURNIE — À CONFIRMER
- vue mois : INFORMATION NON FOURNIE — À CONFIRMER
- drawer / modal / panneau : INFORMATION NON FOURNIE — À CONFIRMER
- état vide : INFORMATION NON FOURNIE — À CONFIRMER
- état avec données : INFORMATION NON FOURNIE — À CONFIRMER

Raison réelle :
- l’environnement disponible ici permet la lecture GitHub, mais pas l’exécution du dépôt réel avec session authentifiée, base locale, navigateur et screenshots.

---

## 6. État actuel du planning après A24

Constats statiques :
- la route `/planning` existe ;
- la page charge la session, vérifie les droits planning, récupère les dépôts actifs et les utilisateurs accessibles ;
- la page utilise `PageHeader`, `ErrorMessage` et `PlanningClient` ;
- le client planning contient des états pour semaine, mode de vue, visibilité globale/personnelle/binôme, sélection multiple, bulk assign, autoschedule, publication, matching, qualité et panneau manuel ;
- un composant `ManualPlanningPanel` existe avec vues jour/semaine/mois, éditeur inline, exports et impression ;
- le mode sombre dispose de tokens globaux dans `app/globals.css`, mais son rendu réel planning n’est pas capturé.

Ce qui reste insuffisamment prouvé :
- correspondance visuelle réelle avec la maquette ;
- état exact après application locale des sessions A24 précédentes ;
- rendu clair/sombre ;
- absence de régression fonctionnelle ;
- comportement réel des filtres et actions.

---

## 7. Cartographie des écarts UI/UX par rapport aux maquettes

| Zone | État actuel constaté | Référence maquette | Écart constaté | Gravité | Risque fonctionnel | Recommandation A25 | Priorité |
|---|---|---|---|---|---|---|---|
| Header planning | `PageHeader` avec lien audit si permission | Header `Planning` + bouton `Ajouter un shift` | Action principale maquette non prouvée au bon niveau | Majeur | Ajout manuel moins visible | Replacer l’action primaire au niveau header sans casser l’éditeur existant | P1 |
| Filtres | États semaine/user/binôme et toolbar manuel | Période, dépôt, rôle, utilisateur | Filtre rôle et vue dépôt non prouvés ; structure non alignée | Majeur | Perte de lisibilité planning | Créer un `PlanningFilters` proche maquette | P1 |
| Segmented control | Visibilité globale/personnelle/binôme côté état | `Personnel` / `Vue dépôt` | Segmentation maquette non prouvée | Moyen | Confusion des vues | Distinguer vue métier de visibilité utilisateur | P2 |
| Tabs métier | Non prouvé comme rendu central maquette | Planning manuel, Affectations, Autoschedule, Matching, Historique, Exports | Organisation par onglets non prouvée | Majeur | Surface trop dense | Installer une barre d’onglets visuelle sans changer les flux | P1 |
| Matrice centrale | `ManualPlanningPanel` dispose d’une grille mois et listes jour/semaine | Tableau personnel x semaines | Matrice planning personnel non prouvée ; risque calendrier générique | Bloquant UI | Écran central pas conforme à la cible | Construire la matrice comme conteneur UI principal | P0 |
| Lignes salariés | Non prouvé dans le rendu actuel | salariés avec avatar, rôle, base, statut | Vue personnel maquette non prouvée | Majeur | Affectations difficiles à lire | Mapper utilisateurs + shifts en rows visuelles | P1 |
| Pills shifts | Existent via couleurs template en grille mois | Pills colorées par type : Ambulance, VSL, Taxi, Garde, Repos, Congé | Cohérence couleur/type non garantie | Moyen | Codes métiers ambigus | Normaliser `ShiftPill` avec tokens métier | P2 |
| Panneau droit | Non prouvé ; `ManualPlanningPanel` utilise cards inline | `Détail de la cellule` permanent | Drawer/panneau droit absent ou non prouvé | Bloquant UI | Détail cellule dispersé | Ajouter `PlanningCellDetailDrawer` | P0 |
| Bulk action bar | États bulk assign visibles côté client | Barre bulk en bas de tableau | Position et lisibilité non prouvées | Majeur | Sélection multiple peu exploitable | Refaire seulement le conteneur UI bulk | P1 |
| Autoschedule/matching | Présents côté état client | Onglets dédiés | Surface potentiellement dense | Moyen | Risque de casser flux validés | Ne traiter qu’en enveloppe visuelle A25 | P2 |
| Exports | Export PDF/XLSX/CSV + impression visibles | Export PDF, Excel, CSV, Imprimer | Libellé XLSX vs Excel ; position à réaligner | Mineur | Peu risqué | Harmoniser libellé visuel, garder endpoints | P3 |
| Mode sombre | Tokens globaux présents | Déclinaison sobre A24 | Rendu planning non prouvé | Majeur | Contrastes inconnus | Capturer puis corriger contrastes planning uniquement | P1 |
| Icônes | Lucide disponible, usage planning non prouvé | Icônes sobres alignées mapping | Iconographie planning non cartographiée | Mineur | Cohérence visuelle | Utiliser Lucide pour filtre/export/action | P3 |
| États vide/erreur | `EmptyState`, `ErrorMessage` disponibles | États propres et intégrés | Rendu planning non capturé | Moyen | Mauvaise perception qualité | Harmoniser état vide planning | P2 |
| Densité | Nombreuses fonctions dans un client riche | Dense mais organisé | Risque de densité non hiérarchisée | Majeur | Surcharge utilisateur | Découper visuellement sans refactor métier profond immédiat | P1 |

---

## 8. Écarts mode clair

- conformité exacte au fond clair, cartes blanches, bordures fines : INFORMATION NON FOURNIE — À CONFIRMER
- le socle CSS fournit des variables claires proches A24 ;
- la page planning utilise des composants communs, mais le rendu réel n’est pas prouvé ;
- les styles inline du planning manuel peuvent créer des écarts de densité et d’espacement.

Priorité A25 :
- produire capture claire avant correction ;
- comparer à `Planning_V1.2`;
- corriger d’abord structure et hiérarchie, pas couleurs isolées.

---

## 9. Écarts mode sombre

- tokens sombres présents dans `:root[data-theme="dark"]`;
- rendu planning sombre réel non capturé ;
- lisibilité réelle des pills, tableaux, selects et cartes planning non prouvée.

Priorité A25 :
- capture sombre obligatoire ;
- corriger contrastes des pills, table headers, selected cell, drawer et bulk bar.

---

## 10. Écarts de densité / lisibilité

Le planning actuel semble cumuler :
- planning manuel ;
- vues jour/semaine/mois ;
- création inline ;
- édition inline ;
- affectation inline ;
- autoschedule ;
- matching ;
- qualité ;
- audit/run info.

La maquette cible accepte une forte densité, mais structurée :
- matrice centrale ;
- tabs ;
- drawer droit ;
- bulk bar ;
- filtres supérieurs.

Écart principal :
- densité fonctionnelle existante non hiérarchisée visuellement selon la maquette.

---

## 11. Écarts composants / cards / tableaux / filtres / drawers

Composants à stabiliser en A25 :
- `PlanningFilters`
- `PlanningTabs`
- `PlanningMatrixTable`
- `PlanningRow`
- `PlanningCell`
- `ShiftPill`
- `PlanningBulkActionBar`
- `PlanningCellDetailDrawer`
- `PlanningExportActions`
- `PlanningEmptyState`
- `PlanningErrorState`

À ne pas faire en A25-UI initial :
- refactor complet de `planning-client.tsx`;
- réécriture autoschedule/matching ;
- changement Prisma/API ;
- suppression des flux existants.

---

## 12. Écarts icônes / assets

État :
- Lucide React est disponible dans les dépendances ;
- l’usage exact d’icônes dans le planning n’est pas prouvé ;
- aucun asset planning spécifique à conserver n’a été identifié.

Recommandation :
- utiliser Lucide pour calendrier, filtre, export, impression, utilisateur, véhicule, dépôt, alerte ;
- ne pas ajouter de PNG planning sauf pictogramme Ambulance Manager validé ;
- suivre le mapping des icônes A24 si disponible.

---

## 13. Zones sensibles fonctionnelles

Ne pas casser :
- contrôle `canViewSelfPlanning` / `canViewGlobalPlanning`;
- `canEditPlanning`;
- `canAutoSchedule`;
- `canExportPlanning`;
- filtre utilisateur selon droits ;
- vue personnelle si l’utilisateur n’a pas accès global ;
- affectation utilisateur 1 / utilisateur 2 ;
- affectation véhicule / dépôt ;
- annulation logique de shifts publiés ;
- édition de shifts publiés ;
- exports PDF/XLSX/CSV ;
- impression ;
- audit run si permission ;
- génération autoschedule et publication ;
- preview/apply matching ;
- messages d’erreur repos minimum, conflit utilisateur, conflit véhicule, template mismatch.

---

## 14. Risques de régression pour A25

| Risque | Niveau | Cause probable | Garde-fou |
|---|---|---|---|
| Casser les permissions planning | Élevé | Réorganisation des vues | Ne pas déplacer la logique serveur ; tests droits |
| Masquer une action métier validée | Élevé | Nettoyage UI trop agressif | Inventaire avant/après des actions visibles |
| Casser autoschedule/matching | Élevé | Mélange UI et logique | Ne modifier que l’enveloppe visuelle |
| Perdre l’affectation binôme | Moyen | Nouvelle matrice trop simplifiée | Conserver user2 comme donnée visible/actionnable |
| Dégrader le mode personnel | Moyen | Focus sur vue globale | Tester utilisateur non global |
| Casser exports | Moyen | Changement libellés/actions | Garder endpoints et handlers existants |
| Mauvais dark mode | Moyen | Styles inline et pills | Capture sombre + correction tokens |
| Régression build | Moyen | gros composant client | Patchs petits, lint/build à chaque étape |

---

## 15. Recommandations de découpage A25

Découpage recommandé :

1. **A25-PLAN-01 — AUDIT VISUEL RÉEL**
   - lancer dépôt local ;
   - produire captures clair/sombre ;
   - capturer semaine/jour/mois, état vide, état avec données, actions, drawer/modal si existant ;
   - ne pas corriger.

2. **A25-PLAN-02 — STRUCTURE PAGE + HEADER + FILTRES**
   - aligner header, bouton ajouter, filtres, exports ;
   - ne pas toucher API.

3. **A25-PLAN-03 — TABS ET MATRICE CENTRALE**
   - créer l’enveloppe visuelle de matrice personnel/semaine ;
   - préserver les données existantes.

4. **A25-PLAN-04 — DRAWER DÉTAIL CELLULE**
   - ajouter ou stabiliser le panneau droit ;
   - afficher affectations, absences, alertes, actions.

5. **A25-PLAN-05 — BULK ACTION BAR**
   - rendre la sélection multiple lisible ;
   - stabiliser actions employé 1/2, véhicule, base, vider.

6. **A25-PLAN-06 — PLANNING MANUEL**
   - intégrer création/modification/annulation dans la structure maquette ;
   - éviter l’éditeur inline trop dominant.

7. **A25-PLAN-07 — SURFACES AUTOSCHEDULE / MATCHING**
   - seulement harmonisation visuelle ;
   - aucune modification moteur.

8. **A25-PLAN-08 — MODE SOMBRE + VALIDATION VISUELLE**
   - captures après ;
   - lint/build ;
   - comparaison finale.

---

## 16. Ordre de traitement recommandé

Ordre strict recommandé :
1. captures réelles ;
2. inventaire des actions visibles ;
3. shell/header/filtres ;
4. matrice ;
5. drawer ;
6. bulk bar ;
7. planning manuel ;
8. autoschedule/matching en surface ;
9. dark mode ;
10. validation terminale et captures après.

---

## 17. Ce qui ne doit pas être traité en A25

Ne pas traiter en A25 :
- rôle PSC1 réel ;
- paie, primes, heures réelles travaillées ;
- RH avancée ;
- suppression physique généralisée ;
- refonte Prisma ;
- refonte RBAC ;
- refonte API planning ;
- autoschedule profond ;
- matching profond ;
- règles métier avancées ;
- dashboard, users, vehicles, templates, company, depots ;
- application mobile complète.

---

## 18. Conclusion et verdict préparatoire

Verdict : **INCOMPLET**.

La cartographie des écarts est suffisante pour préparer A25, mais la session ne peut pas être considérée comme complètement prouvée sans :
- captures réelles ;
- terminal local ;
- confirmation de l’état exact après application locale A24.

Passage à A25 recommandé : **OUI, sous condition de démarrer A25 par un audit visuel réel avec captures**.
