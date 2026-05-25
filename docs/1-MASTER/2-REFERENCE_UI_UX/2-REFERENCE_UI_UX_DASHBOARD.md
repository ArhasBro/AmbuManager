# Ambulance Manager — Référence UI/UX — Tableau de bord

Version : V2
Statut : référence UI/UX codable
Objectif : reproduction visuelle 99 %
Source visuelle : docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/2-Dashboard/Dashboard_V2.png
Source fonctionnelle : docs/1-MASTER/3-FONCTIONNALITES/2-FONCTIONNALITES_DETAILLEES_TABLEAU_DE_BORD_V1.1.md

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
Décrire la page Tableau de bord comme portail d’entrée post-login avec widgets, KPI, alertes simples et raccourcis selon permissions.

## 2. Sources utilisées
- Maquette active `Dashboard_V2.png`.
- Fiche détaillée Tableau de bord V1.1.

## 3. Règle d’autorité
1. Maquette Dashboard V2.
2. Fiche Tableau de bord.

## 4. Objectif UX de la page
Donner en moins de 10 secondes une vision d’ensemble actionnable : effectifs, flotte, créneaux, planning du jour/semaine, alertes.

## 5. Rôle métier de la page
Portail opérationnel personnalisable, non analytique avancé.

## 6. Structure générale de l’écran
- Titre + sous-titre page.
- Actions en haut à droite (`Personnaliser`, `Réinitialiser`) + badge de droits widgets.
- Rangée KPI principale (4 tuiles).
- Bloc `Planning et activités` (cartes métier).
- Bloc alertes/informations.
- Bloc `Raccourcis` vers modules.

## 7. Layout desktop attendu
- Contenu en colonne principale pleine largeur.
- Cartes organisées en grilles régulières.
- Marges constantes entre sections.

## 8. Hiérarchie visuelle
- Niveau 1 : `Tableau de bord`.
- Niveau 2 : KPI principaux.
- Niveau 3 : cartes planning/activité.
- Niveau 4 : alertes et raccourcis.

## 9. Zones principales de l’écran
- En-tête page et boutons de personnalisation.
- KPI `Utilisateurs présents`, `Utilisateurs absents`, `Véhicules disponibles`, `Créneaux non affectés`.
- Cartes `Ma journée`, `Mon heure de début`, `Mes prochains créneaux`, `Planning global`, `Équipes du jour`, `Créneaux de la semaine`.
- Alertes `Informations importantes`, `Alertes planning`, `Alertes véhicules`.
- Grille de raccourcis modules.

## 10. Détail de chaque zone
- KPI : icône colorée, valeur forte, sous-texte contextualisé (`aujourd’hui`, `cette semaine`, `sur X`).
- Cartes planning : titre court, donnée principale, bouton d’accès (`Voir`, `Accéder`, `Détail`).
- Alertes : bullet points courts, couleurs de criticité.
- Raccourcis : mini-cartes avec icône, description, bouton `Ouvrir`.

## 11. Composants visibles
- `DashboardHeaderActions`
- `KpiCard`
- `PlanningActivityCard`
- `AlertStripCard`
- `ShortcutModuleCard`
- `WidgetVisibilityBadge`

## 12. Composants réutilisables à prévoir
- `DashboardGridSection`.
- `WidgetCardShell`.
- `KpiMetric`.
- `DashboardShortcutRow`.

## 13. Cards
- Toutes les données sont encapsulées en cartes blanches.
- Les cartes conservent un style homogène (rayon, bordure, padding).

## 14. Tableaux / listes
- Pas de tableau dense sur cette page.
- Listes courtes intégrées dans cartes (`Informations importantes`, `Alertes`).

## 15. Filtres / recherche
- Pas de barre de filtres globale en V1 Dashboard.
- La personnalisation agit sur la visibilité des widgets, pas sur des filtres analytiques complexes.

## 16. Boutons / actions
- Haut droit : `Personnaliser`, `Réinitialiser`.
- Dans cartes : boutons contextuels (`Voir mon planning`, `Voir tous`, `Voir le détail`, `Accéder au planning`).

## 17. Badges / statuts
- Badge `Widgets autorisés selon vos droits`.
- Badges de disponibilité sur cartes de raccourcis (`Disponible`, `Selon permissions`).

## 18. Panneaux de détail
Non présent dans la maquette Dashboard V2.

## 19. Onglets, si applicable
Non applicable.

## 20. États visuels à prévoir
- Chargement des widgets.
- Dashboard vide si aucun widget actif.
- Donnée indisponible par widget.
- Erreur de chargement partielle d’un widget.

## 21. Règles d’ergonomie métier
- Widgets auto-explicites et lisibles sans clic.
- KPI simples, pas de jargon technique.
- Bouton d’action visible dans chaque carte clé.

## 22. Règles de permissions visibles
- Widget non autorisé non affiché.
- Raccourci page interdite non affiché.
- Préférences utilisateur ne contournent jamais les permissions.

## 23. Responsive futur
- Empilement vertical des KPI et cartes.
- Raccourcis en grille réduite.
- Conservation de la priorisation KPI > planning > alertes.

## 24. Ce qui doit être codé plus tard
- Mécanisme de personnalisation persistant par utilisateur.
- Réinitialisation à la disposition par défaut par profil.
- Gestion fine des états de widget.

## 25. Ce qui ne doit pas être codé
- Reporting analytique avancé.
- Graphiques complexes.
- Centre notifications avancé.
- KPI non validés (finance, scoring, prédiction).

## 26. Interdictions de dérive
- Ne pas transformer le Dashboard en page de pilotage BI.
- Ne pas exposer des données RH sensibles hors permissions.

## 27. Checklist de conformité visuelle 99 %
- 4 KPI principaux affichés en première rangée.
- Bloc `Planning et activités` conservé avec 6 cartes.
- Bloc alertes simple en cartes horizontales.
- Bloc `Raccourcis` en cartes module avec bouton `Ouvrir`.
- Boutons `Personnaliser`/`Réinitialiser` en haut à droite.
- Aucune fonctionnalité hors périmètre Dashboard V1.
