# RAPPORT_AUDIT_A25_PLANNING

## 1. Contexte et objectif

Session : `SESSION-20260510-01_A25_A25-PLAN-UI-01`  
Bloc : `A25 — Planning UI/UX & ergonomie metier`  
Type : `AUDIT`

Objectif : auditer l'ecran Planning reel et le comparer a:
- `docs/1-master/MAQUETTE/MAQUETTE_DA`
- `docs/1-master/MAQUETTE/MAQUETTE_DA/.../2-Planning/Planning_V1.2_INFO_DETAIL.png`
- `docs/1-master/REFERENCE_UI_UX_A25_PLANNING.md`

Regles appliquees:
- `CODE > DOCUMENTATION` en cas de contradiction fonctionnelle ;
- `MAQUETTE_DA > anciennes captures / anciennes descriptions` pour la direction artistique.

## 2. References lues

- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/REFERENCE_UI_UX_A24.md`
- `docs/1-master/REFERENCE_UI_UX_A25_PLANNING.md`
- `docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-08_A24_A24-UI-08/RAPPORT_PREPARATOIRE_A25.md`
- `docs/1-master/MAQUETTE/README_MAQUETTES_A24.md`
- `docs/1-master/MAQUETTE/SPEC_UI_UX_MAQUETTES_AMBULANCE_MANAGER.md`
- `docs/1-master/MAQUETTE/MAQUETTE_DA/.../2-Planning/Planning_V1.2_INFO_DETAIL.png`

## 3. Fichiers planning inspectes

UI / page:
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/planning/manual-planning-panel.tsx`
- `app/globals.css`

Composants UI partages:
- `app/ui/page-header.tsx`
- `app/ui/action-button.tsx`
- `app/ui/status-badge.tsx`
- `app/ui/error-message.tsx`
- `app/ui/empty-state.tsx`

API planning liee au rendu/ergonomie:
- `app/api/planning/exports/route.ts`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/api/planning/shifts/[id]/cancel/route.ts`

## 4. Captures avant

Produites (session courante):
- `CAPTURES_AVANT/planning_light_before.png`
- `CAPTURES_AVANT/planning_dark_before.png`
- `CAPTURES_AVANT/planning_manual_day_before.png`
- `CAPTURES_AVANT/planning_manual_week_before.png`
- `CAPTURES_AVANT/planning_manual_month_before.png`

Capture panneau ou drawer detail de cellule:
INFORMATION NON FOURNIE — À CONFIRMER

## 5. Matrice des ecarts (zones maquette)

| Zone | Visible dans la maquette | Present dans le repo | Ecart constate | Risque fonctionnel | Verdict |
|---|---|---|---|---|---|
| Zone globale Planning (encadre rouge) | Header clair + CTA principal + zones distinctes (filtres/tabs/grille/panneau) | Page composee de `PageHeader` + bloc `planning-legacy` + `details` manuel avance | Structure reelle plus empilee et orientee controle operationnel ; hierarchie visuelle differente | Moyen | NON CONFORME |
| Filtres / vue / exports (encadre bleu) | Filtres `Periode/Depot/Role/Utilisateur`, switch personnel/depot, exports separes | Navigation semaine + visibilite globale/personnelle/binome + mode simple/ambulance + autoschedule/matching ; exports dans panneau manuel avance | Absence de filtres depot/role dans la zone principale ; exports non places comme dans la maquette | Moyen | NON CONFORME |
| Onglets internes (encadre orange) | Onglets explicites `Planning manuel / Affectations / Autoschedule / Matching / Historique / Exports` | Aucun systeme d'onglets visibles ; coexistence de controles et d'un bloc `<details>` | Architecture informationnelle differente ; sous-espaces non explicites | Eleve | NON CONFORME |
| Grille principale (encadre violet) | Matrice personnel x semaines (S1..S4) avec badges synthese | Grille hebdomadaire par jours (7 colonnes), cartes shifts detaillees, formulaires inline | Mode de lecture different (jour vs semaine maquette), densite et bruit visuel superieurs | Eleve | NON CONFORME |
| Panneau lateral detail cellule (encadre vert) | Panneau droit dedie detail cellule + actions | Pas de panneau lateral de cellule dans la vue principale ; details surtout inline et via mode manuel avance | Manque un espace de detail contextuel persistent ; perte de lisibilite cible maquette | Eleve | NON CONFORME |
| Barre actions groupees (bas de grille) | Barre basse `x shifts selectionnes` + affecter employe1/2/vehicule/base + vider | Bloc `Selection multiple` present mais en carte intermediaire non dockee | Intention metier presente mais pattern visuel et positionnement differents | Moyen | INCOMPLET |

## 6. Verification perimetre fonctionnel demande

- Header: present, mais CTA `+ Ajouter un shift` non positionne comme maquette.
- Navigation temporelle: presente (`Semaine -1 / Aujourd'hui / Semaine +1`).
- Filtres: partiels dans la zone principale ; complets partiellement en mode manuel.
- Toolbar / exports: presents (PDF/XLSX/CSV/print) dans le module manuel.
- Onglets internes: absents.
- Vue jour: presente (`manual-planning-panel`, `viewMode=day`).
- Vue semaine: presente (`legacy` + `manual-planning-panel`, `viewMode=week`).
- Vue mois: presente (`manual-planning-panel`, `viewMode=month`).
- Grille / cellules / cards shifts: presentes.
- Badges / horaires / equipes / vehicules: presents (legacy + manuel).
- Panneaux detail / affectation: detail inline et historique minimal ; pas de panneau droit cellule maquette.
- Actions principales/secondaires/groupees: presentes mais differemment structurees.
- Etats vides: presents (`Aucun shift`, `EmptyState`).
- Etats chargement: presents (`Chargement...`, `Chargement du planning manuel...`).
- Etats erreur: presents (`ErrorMessage`, messages d'erreur texte).
- Mode clair/sombre: present (captures clair/sombre).
- Responsive minimal: present via media queries (`1140/980/680`) mais sans pattern maquette dedie.

## 7. Risques principaux de regression A25

1. Rupture de droits planning (`canViewSelfPlanning`, `canViewGlobalPlanning`, `canEditPlanning`, `canAutoSchedule`, `canExportPlanning`).
2. Regression des flux d'affectation (employe1/employe2/vehicule/base) dans `assign`.
3. Regression autoschedule/matching (generation, preview, apply, publish, cancel).
4. Perte de coherence exports (scope jour/semaine/mois + filtres actifs).
5. Regression de lecture metier si simplification visuelle excessive.
6. Regression mode sombre sur badges/contrastes si refonte de grille.

## 8. Priorisation recommandee A25

### A25-PLAN-UI-02
- Recomposer header/filtres/toolbar en zones claires ;
- rendre l'action principale "ajouter shift" visible et prioritaire ;
- isoler exports sans casser permissions.

### A25-PLAN-UI-03
- Introduire une structure d'onglets metier explicite ;
- realigner la grille vers une lecture plus synthese (sans casser flux existants).

### A25-PLAN-UI-04
- Introduire un panneau detail cellule (ou equivalent) lisible ;
- clarifier affichage absences/conflits/alertes et details horaires.

### A25-PLAN-UI-05
- Realigner la selection multiple vers une barre d'actions groupees proche maquette ;
- conserver contraintes et validations metier existantes.

## Verdict détaillé par zone demandée

| Zone | Couverture | Verdict | Commentaire |
|---|---|---|---|
| header planning | code + captures | non conforme | Header present, mais hierarchy et CTA principal non alignes maquette (`+ Ajouter un shift`). |
| navigation temporelle | code + captures | incomplet | Navigation semaine operationnelle, mais structuration mensuelle par semaines maquette non reproduite en grille principale. |
| filtres | code + captures | non conforme | Filtres attendus `Periode/Depot/Role/Utilisateur` non presents comme bloc maquette unifie. |
| toolbar | code + captures | non conforme | Toolbar reelle melangee avec controles operationnels (visibilite/mode/matching/autoschedule). |
| exports | code + captures | incomplet | Exports PDF/XLSX/CSV/Imprimer existants, mais placement et separation visuelle non conformes maquette. |
| onglets internes | code + captures | non conforme | Aucun systeme d'onglets internes explicites visible dans l'UI reelle. |
| vue jour | code + captures | incomplet | Vue `day` disponible en `planning-manual`, mais hors structure principale maquette. |
| vue semaine | code + captures | non conforme | Vue semaine principale orientee colonnes jours et cartes detaillees, pas matrice personnel x semaines maquette. |
| vue mois | code + captures | incomplet | Vue `month` disponible en mode manuel avance, integration globale non alignee maquette. |
| grille | code + captures | non conforme | Grille principale differente du modele cible (maquette: semaines 1..4 par salarie). |
| cellules | code + captures | non conforme | Cellules reelles tres detaillees (cards/formulaires inline), ecart de densite et de hierarchie visuelle. |
| badges | code + captures | incomplet | Badges/statuts presents, mais systeme visuel et organisation non completement alignes a la maquette. |
| horaires | code + captures | incomplet | Horaires visibles dans cards, mais logique maquette privilegie detail cellule lateral. |
| équipes | code + captures | incomplet | Informations equipe presentes (Employe 1/2), mais lecture synthese RH maquette non atteinte. |
| véhicules | code + captures | incomplet | Informations vehicule presentes (assignation), mais presentation non equivalente a la lecture maquette cible. |
| panneau détail | code + captures | à confirmer | INFORMATION NON FOURNIE — À CONFIRMER |
| panneau affectation | code + captures | incomplet | Affectations disponibles via formulaires inline et selection multiple, sans panneau dedie type maquette. |
| actions groupées | code + captures | incomplet | Bloc selection multiple present mais non structure en barre basse maquette. |
| mode clair | captures | non conforme | Lisible en production, mais rendu global encore eloigne de la direction artistique cible planning. |
| mode sombre | captures | non conforme | Mode sombre fonctionnel, mais non aligne a la composition maquette cible. |
| responsive minimal | code | à confirmer | INFORMATION NON FOURNIE — À CONFIRMER |
| risques de régression | rapport + code | conforme | Risques identifies et priorises (permissions, affectations, autoschedule/matching, exports, dark mode). |

## 9. Verdict final d'audit

Verdict global : **NON CONFORME**.

Le planning actuel est robuste fonctionnellement, mais son organisation visuelle et ergonomique reste eloignee de la cible `Planning_V1.2_INFO_DETAIL.png` sur les zones structurantes (tabs, grille synthese, panneau detail droit, hierarchie des actions).

Aucune modification de code applicatif n'a ete appliquee dans cette session.
