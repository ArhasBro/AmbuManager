# Ambulance Manager — Référence UI/UX — Mise en route

Version : V2
Statut : référence UI/UX codable
Objectif : reproduction visuelle 99 %
Source visuelle : docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/9-Mise en route/Mise-En-Route_V2.png
Source fonctionnelle : docs/1-MASTER/3-FONCTIONNALITES/9-FONCTIONNALITES_DETAILLEES_MISE_EN_ROUTE_V1.1.md

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
Décrire la page Mise en route comme assistant/checklist de configuration initiale, séparé de la page Société.

## 2. Sources utilisées
- Maquette active `Mise-En-Route_V2.png`.
- Fiche détaillée Mise en route V1.1.

## 3. Règle d’autorité
1. Maquette Mise en route V2.
2. Fiche Mise en route V1.1.

## 4. Objectif UX de la page
Rendre immédiatement visible l’avancement de configuration et l’étape suivante utile.

## 5. Rôle métier de la page
Checklist de démarrage de la société : pilotage d’avancement, pas de duplication des formulaires métier complets.

## 6. Structure générale de l’écran
- Titre/sous-titre + actions (`Télécharger le guide`, `Imprimer`).
- KPI top (progression, statut global, estimation temps restant, prochaine étape suggérée).
- Barre filtres étapes/statuts + recherche + réinitialiser.
- Tableau checklist d’étapes.
- Panneau droit `Détail de l’étape`.

## 7. Layout desktop attendu
- Table checklist large à gauche.
- Panneau détail étape fixe à droite.
- Légende des statuts en bas.

## 8. Hiérarchie visuelle
- Niveau 1 : progression globale (% + étapes complétées).
- Niveau 2 : prochaine étape suggérée.
- Niveau 3 : liste ordonnée des étapes.
- Niveau 4 : détail actionnable de l’étape sélectionnée.

## 9. Zones principales de l’écran
- KPI progression.
- Liste étapes (1 à 12 dans la maquette).
- Détail étape (description, objectifs, ressources utiles, actions disponibles).

## 10. Détail de chaque zone
- Chaque ligne étape affiche : numéro, titre, description, statut, responsable, mise à jour, action.
- Statuts visuels : `Terminé`, `En cours`, `À faire`, `À planifier`.
- Détail étape : badge statut, objectifs en checklist, ressources, boutons d’action.

## 11. Composants visibles
- `OnboardingProgressCard`
- `OnboardingFiltersBar`
- `OnboardingChecklistTable`
- `OnboardingStepStatusBadge`
- `OnboardingStepDetailPanel`

## 12. Composants réutilisables à prévoir
- `StepRowStatusIcon`.
- `StepDetailObjectivesList`.
- `StepResourcesList`.

## 13. Cards
- KPI top en cartes.
- Détail étape en carte latérale structurée.

## 14. Tableaux / listes
- Tableau principal d’étapes.
- Légende statuts en pied.

## 15. Filtres / recherche
- Filtre étapes.
- Filtre statuts.
- Recherche une étape.
- Réinitialisation.

## 16. Boutons / actions
- Haut droite : `Télécharger le guide`, `Imprimer`.
- Ligne étape : accès détail/action.
- Panneau détail : `Voir ...`, `Modifier cette étape`, `Marquer comme terminé`.

## 17. Badges / statuts
- Progression globale (`75%`, `9/12 étapes complétées`).
- Statuts étape : terminé/en cours/à faire/à planifier.

## 18. Panneaux de détail
- Panneau droit obligatoire en desktop.
- Présente étape active, objectifs, ressources, actions.

## 19. Onglets, si applicable
Non applicable.

## 20. États visuels à prévoir
- Aucune étape trouvée après filtre.
- Toutes étapes terminées.
- Aucune donnée de progression.
- Action non autorisée.

## 21. Règles d’ergonomie métier
- La page guide, elle ne remplace pas les pages Société/Utilisateurs/Véhicules/Planning.
- Le wording des étapes doit rester orienté action.

## 22. Règles de permissions visibles
- Accès par défaut Admin/Gérant.
- Utilisateur autorisé via permission dédiée.
- Utilisateurs terrain : pas d’accès par défaut.

## 23. Responsive futur
- KPI empilés.
- Table étapes en cartes.
- Détail étape en écran secondaire mobile.

## 24. Ce qui doit être codé plus tard
- Définition exacte des conditions de complétion par étape.
- Lien de traçabilité vers audit des modules métiers.
- Gestion des états ignoré/reporté si validée.

## 25. Ce qui ne doit pas être codé
- Tunnel self-service commercial complet.
- Import complexe bloquant obligatoire.
- Duplication complète des formulaires métiers.

## 26. Interdictions de dérive
- Ne pas fusionner avec Société.
- Ne pas transformer en module de paramétrage avancé unique.

## 27. Checklist de conformité visuelle 99 %
- 4 KPI de progression en tête conformes.
- Tableau ordonné des étapes avec statuts visibles.
- Panneau droit détail étape complet.
- Légende des statuts en bas.
- CTA contextuels cohérents avec étape active.
- INFORMATION NON FOURNIE — À CONFIRMER : règles minimales exactes de “complétude” par étape et périmètre import Alpha.
