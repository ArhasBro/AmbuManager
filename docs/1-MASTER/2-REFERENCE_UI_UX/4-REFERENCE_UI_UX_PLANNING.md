# Ambulance Manager — Référence UI/UX — Planning

Version : V2.2
Statut : référence UI/UX codable
Objectif : reproduction visuelle 99 %
Source visuelle :
- docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/4-Planning/Planning_Vue-Global_V2.2.png
- docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/4-Planning/Planning_Vue-Personnelle_V2.1.png
- docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/4-Planning/Planning_Vue-Mois_V2.1.png
- docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/4-Planning/Planning_Vue-Semaine_V2.2.png
- docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/4-Planning/Planning_Vue-Jour_V2.png
Source fonctionnelle : docs/1-MASTER/3-FONCTIONNALITES/4-FONCTIONNALITES_DETAILLEES_PLANNING_V1.1.md

## Sommaire
- [1. Objectif du document](#1-objectif-du-document)
- [2. Sources utilisées](#2-sources-utilisees)
- [3. Règle d’autorité](#3-regle-dautorite)
- [4. Objectif UX de la page](#4-objectif-ux-de-la-page)
- [5. Rôle métier de la page](#5-role-metier-de-la-page)
- [6. Structure générale de l’écran](#6-structure-generale-de-lecran)
- [7. Layout desktop attendu](#7-layout-desktop-attendu)
- [8. Hiérarchie visuelle](#8-hierarchie-visuelle)
- [9. Zones principales de l’écran](#9-zones-principales-de-lecran)
- [10. Détail de chaque zone](#10-detail-de-chaque-zone)
- [11. Composants visibles](#11-composants-visibles)
- [12. Composants réutilisables à prévoir](#12-composants-reutilisables-a-prevoir)
- [13. Cards](#13-cards)
- [14. Tableaux / listes](#14-tableaux-listes)
- [15. Filtres / recherche](#15-filtres-recherche)
- [16. Boutons / actions](#16-boutons-actions)
- [17. Badges / statuts](#17-badges-statuts)
- [18. Panneaux de détail](#18-panneaux-de-detail)
- [19. Onglets, si applicable](#19-onglets-si-applicable)
- [20. États visuels à prévoir](#20-etats-visuels-a-prevoir)
- [21. Règles d’ergonomie métier](#21-regles-dergonomie-metier)
- [22. Règles de permissions visibles](#22-regles-de-permissions-visibles)
- [23. Responsive futur](#23-responsive-futur)
- [24. Ce qui doit être codé plus tard](#24-ce-qui-doit-etre-code-plus-tard)
- [25. Ce qui ne doit pas être codé](#25-ce-qui-ne-doit-pas-etre-code)
- [26. Interdictions de dérive](#26-interdictions-de-derive)
- [27. Checklist de conformité visuelle 99 %](#27-checklist-de-conformite-visuelle-99)

## 1. Objectif du document
Décrire une référence unique Planning incluant les 5 vues et les règles de publication/couverture, avec un rendu synthétique conforme à l’Alpha.

## 2. Sources utilisées
- Les 5 maquettes Planning de version la plus élevée.
- Fiche détaillée Planning V1.1.

## 3. Règle d’autorité
1. Maquettes Planning V2.x.
2. Fiche Planning V1.1.

## 4. Objectif UX de la page
Permettre de préparer, affecter, publier et lire le planning sans basculer vers une grille horaire exhaustive.

## 5. Rôle métier de la page
Planning manuel métier centré sur modèles/types, semaines, états de couverture et visibilité selon permissions.

## 6. Structure générale de l’écran
- Titre/sous-titre.
- Barre des vues (`Vue globale annuelle`, `Vue personnelle`, `Vue mois`, `Vue semaine`, `Vue jour`).
- Bande de contexte temporel + statut planning/jour/semaine.
- Filtres globaux.
- KPI/indicateurs de couverture.
- Grille/tableau de vue active.
- Panneau de détail droit selon vue.

## 7. Layout desktop attendu
- Large zone centrale pour grille/table.
- Panneau droit fixe sur vues complexes.
- Densité visuelle maîtrisée, lecture en priorité.

## 8. Hiérarchie visuelle
- Niveau 1 : vue active + période.
- Niveau 2 : statut publication (`Brouillon`, `Publié`, etc.).
- Niveau 3 : indicateurs couverture.
- Niveau 4 : cellules/affectations détaillées.

## 9. Zones principales de l’écran
- Navigation entre vues.
- Actions : créer affectation, définir besoins, publier, annuler, historique, export.
- Filtres : utilisateur, rôle, base/dépôt, modèle/type, véhicule, état.
- Bloc de données principal selon vue.
- Panneau de détail contextuel.

## 10. Détail de chaque zone
### 10.1 Structure commune Planning
- Tous les écrans conservent la barre des 5 vues.
- Tous affichent un statut (planning global ou jour/semaine).
- Tous utilisent badges texte + couleur pour modèles et états.

### 10.2 Navigation entre vues
- Changement de vue sans changer de module.
- Navigation temporelle par flèches + sélecteurs (année, semaine, mois, date).
- Boutons `Aujourd’hui`/`Demain` selon vue.

### 10.3 Vue globale annuelle
- Matrice utilisateurs x semaines.
- Colonnes semaines (`S20`, `S21`, etc.) avec dates sous en-tête.
- Cellules synthétiques (badge modèle/type : `AMB`, `VSL`, `TAXI`, `GARDE`, `REPOS`, `ABSENT`, `NON PLANIFIÉ`, `À AFFECTER`).
- Panneau droit `Détail de la cellule` avec historique et actions.

### 10.4 Vue personnelle
- Liste par jour de la semaine de l’utilisateur connecté.
- Colonnes visuelles : horaire, modèle/type, véhicule, équipe/binôme, action `Détail`.
- Panneau droit `Détail du jour`.
- Message info : planning modifiable par équipe de planification.

### 10.5 Vue mois
- Grille mensuelle lundi-dimanche.
- Chaque case jour affiche 1 à N badges synthétiques + couverture (ex: `10/12`) + icônes état.
- Panneau droit détail jour (besoins couverts, utilisateurs affectés, modèle, base/dépôt, statut).
- Légende bas de page modèles/statuts/couverture.

### 10.6 Vue semaine
- Bloc 1 : checklist des besoins hebdomadaires (modèle, type véhicule, composition, utilisateur(s) affecté(s), véhicule, état couverture).
- Bloc 2 : semaine par jours (synthèse).
- Panneau droit `Détail de la semaine` avec actions autorisées.

### 10.7 Vue jour
- Tableau affectations du jour (utilisateur, rôle, modèle/type, état, véhicule, équipe/binôme, base/dépôt, annotation, statut, actions).
- KPI du jour (affectations, couvertures, à vérifier, non couverts, véhicules utilisés, utilisateurs présents).
- Panneau droit `Détail du jour` + alertes.

### 10.8 Filtres globaux
- Présents sur les vues de gestion.
- Incluent période, utilisateur, rôle, base/dépôt, modèle/type, véhicule, statut planning/état couverture.

### 10.9 Panneau de détail
- Contenu minimal : contexte période, statut, objet sélectionné, historique court, actions disponibles.
- Version lecture simplifiée selon permissions.

### 10.10 Badges de statuts
- Statuts planning : `Brouillon`, `Publié`, `Modifié après publication`, `Annulé`, `À vérifier`.
- États de couverture : `Couvert`, `Incomplet`, `À couvrir`, `À vérifier`, `Non affecté`.

### 10.11 États de publication
- Publication principale à l’échelle semaine.
- Après publication, modifications tracées et visuellement marquées.

### 10.12 États de couverture
- Affichage dans checklist hebdomadaire et indicateurs synthèse.
- Codes couleur + libellé texte obligatoire.

### 10.13 Alertes simples
- Besoin non couvert.
- Affectation incomplète.
- Conflit détecté.
- Alerte véhicule.

### 10.14 Règles de densité visuelle
- Cellule planning synthétique.
- Détails riches dans panneau latéral, pas dans la case.

### 10.15 Matrice annuelle
- Cœur de pilotage long terme.
- Lecture rapide par semaine et utilisateur.

### 10.16 Grille semaine
- Cœur de préparation opérationnelle hebdomadaire.
- Checklist besoins + couverture + affectations.

### 10.17 Structure jour
- Cœur de suivi exécution proche terrain.
- Statuts et alertes actionnables.

### 10.18 Règles de lisibilité
- Ne pas superposer trop d’éléments dans une cellule.
- Prioriser modèle/type puis états clés.
- Toujours afficher un libellé explicite avec le code couleur.

### 10.19 Ce qui doit rester synthétique
- Toutes les vues Planning Alpha restent synthétiques.
- Interdiction d’un planning détaillé heure par heure partout si contraire à la fiche.

## 11. Composants visibles
- `PlanningViewTabs`
- `PlanningFiltersBar`
- `PlanningKpiStrip`
- `AnnualMatrixTable`
- `PersonalWeekList`
- `MonthCalendarGrid`
- `WeeklyNeedsTable`
- `DayAssignmentsTable`
- `PlanningDetailPanel`

## 12. Composants réutilisables à prévoir
- `PlanningStatusBadge`.
- `CoverageBadge`.
- `PlanningCellChip`.
- `PlanningLegend`.
- `PlanningActionToolbar`.

## 13. Cards
- Cartes de statut/indicateurs en tête.
- Blocs checklist et légendes en cartes.
- Panneau de détail en carte latérale.

## 14. Tableaux / listes
- Matrice annuelle tabulaire.
- Table checklist besoins semaine.
- Table affectations jour.
- Listes personnelles par jour.

## 15. Filtres / recherche
- Filtres globaux contextualisés par vue.
- Recherche rapide en mode gestion.
- `Réinitialiser` visible.

## 16. Boutons / actions
- Actions top selon vue : `Créer une affectation`, `Définir les besoins`, `Publier la semaine`, `Annuler`, `Historique`, `Export`.
- Actions cellule/ligne : modifier, remplacer modèle/type, appliquer sur semaines, vider case, etc. selon droits.

## 17. Badges / statuts
- Modèles/types : `AMB`, `VSL`, `TAXI`, `TPMR`, `GARDE`, `REPOS`...
- États : `ABSENT`, `INDISP.`, `NON PLANIFIÉ`, `À AFFECTER`.
- Couverture : `Couvert`, `Incomplet`, `À couvrir`, `À vérifier`, `Non affecté`.

## 18. Panneaux de détail
- `Détail de la cellule` (annuel).
- `Détail du jour` (personnelle/mois/jour).
- `Détail de la semaine` (semaine).
- Inclure historique minimal et actions autorisées.

## 19. Onglets, si applicable
Les 5 vues sont obligatoires et ordonnées ainsi :
1. Vue globale annuelle
2. Vue personnelle
3. Vue mois
4. Vue semaine
5. Vue jour

## 20. États visuels à prévoir
- Brouillon/Publie/Modifié après publication/Annulé/À vérifier.
- Besoin non couvert/incomplet.
- Conflit simple utilisateur/véhicule/modèle.
- Aucune donnée sur période.

## 21. Règles d’ergonomie métier
- Priorité à la lisibilité de couverture et affectation.
- Les annotations `Férié`, `Samedi`, `Dimanche`, `Week-end` restent légères.
- Ne pas confondre `NON PLANIFIÉ` avec `ABSENT`.

## 22. Règles de permissions visibles
- Tous les utilisateurs : accès planning avec niveaux de visibilité différents.
- Gestion complète : Admin/Gérant ou permissions dédiées.
- Lecture simple : utilisateurs terrain sans actions de publication/édition sensibles.

## 23. Responsive futur
- Grilles complexes repliées en synthèses par jour/semaine.
- Détails en tiroirs plein écran mobile.
- Maintien de la hiérarchie publication/couverture.

## 24. Ce qui doit être codé plus tard
- Flux complets de publication/modification post-publication avec motif.
- Historique détaillé relié à Audit.
- Gestion semaine 53.

## 25. Ce qui ne doit pas être codé
- Vue heure par heure exhaustive sur toutes les vues Alpha.
- Missions/courses/régulation temps réel dans ce module.
- Facturation/paie/compteurs RH avancés.
- Planification automatique avancée en Alpha.

## 26. Interdictions de dérive
- Ne pas convertir la page en “planning transport mission” détaillé.
- Ne pas automatiser des décisions de disponibilité véhicule non validées.

## 27. Checklist de conformité visuelle 99 %
- 5 vues présentes et conformes.
- Matrice annuelle lisible avec panneau de détail cellule.
- Vue semaine avec checklist besoins et états de couverture.
- Vue jour avec table affectations + panneau alertes.
- Légendes modèles/statuts présentes.
- Interdiction respectée d’un planning heure-par-heure généralisé.
- INFORMATION NON FOURNIE — À CONFIRMER : règle définitive semaine 53 et comportement publication avec besoins obligatoires non couverts.
