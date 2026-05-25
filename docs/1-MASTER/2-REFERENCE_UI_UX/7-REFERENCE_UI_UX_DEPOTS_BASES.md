# Ambulance Manager — Référence UI/UX — Dépôts / Bases

Version : V2
Statut : référence UI/UX codable
Objectif : reproduction visuelle 99 %
Source visuelle : docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/7-Dépôts-bases/Dépôts -Bases_V2.png
Source fonctionnelle : docs/1-MASTER/3-FONCTIONNALITES/7-FONCTIONNALITES_DETAILLEES_DEPOTS_BASES_V1.md

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
Décrire la page Dépôts / Bases comme référentiel de lieux d’exploitation simple en Alpha.

## 2. Sources utilisées
- Maquette active `Dépôts -Bases_V2.png`.
- Fiche détaillée Dépôts / Bases V1.

## 3. Règle d’autorité
1. Maquette Dépôts / Bases V2.
2. Fiche Dépôts / Bases.

## 4. Objectif UX de la page
Permettre de localiser rapidement les lieux, leur statut et leurs rattachements, puis agir sans ambiguïté.

## 5. Rôle métier de la page
Référentiel de base/dépôt avec compteurs utilisateurs/véhicules, sans gestion RH/flotte complète depuis cette page.

## 6. Structure générale de l’écran
- Titre + actions (`Importer des dépôts`, `Nouveau dépôt`).
- Rangée KPI (dépôts actifs, dépôt principal, véhicules affectés, interventions 7j).
- Barre filtres/recherche.
- Tableau `Liste des dépôts`.

## 7. Layout desktop attendu
- KPI en 4 cartes alignées.
- Filtres en bande horizontale compacte.
- Tableau large avec pagination en pied.

## 8. Hiérarchie visuelle
- Niveau 1 : `Dépôts / Bases`.
- Niveau 2 : CTA `Nouveau dépôt`.
- Niveau 3 : KPI de synthèse.
- Niveau 4 : tableau détaillé.

## 9. Zones principales de l’écran
- KPI top.
- Recherche + filtres (`Statut`, `Type`, `Base principale`) + `Réinitialiser`.
- Tableau colonnes : nom, code, type, adresse, base principale, statut, véhicules, actions.

## 10. Détail de chaque zone
- Types visibles en badges (`Base principale`, `Secondaire`, `Relais`).
- Statuts visibles en badges (`Actif`, `Inactif`).
- Colonne base principale avec indicateur visuel (check/trait).
- Actions ligne via icône édition + menu contextuel.

## 11. Composants visibles
- `DepotKpiCard`
- `DepotFiltersBar`
- `DepotTable`
- `DepotTypeBadge`
- `DepotStatusBadge`
- `DepotRowActions`

## 12. Composants réutilisables à prévoir
- `SearchAndFiltersInline`.
- `PrimarySecondaryCtaRow`.
- `TablePaginationFooter`.

## 13. Cards
- KPI en cartes identiques.
- Tableau encapsulé dans une grande carte.

## 14. Tableaux / listes
- Tableau central de la page.
- Pagination et taille de page visibles en bas.

## 15. Filtres / recherche
- Recherche textuelle en premier.
- Filtres rapides par statut, type, base principale.
- Réinitialisation visible.

## 16. Boutons / actions
- `Importer des dépôts` (secondaire).
- `Nouveau dépôt` (primaire).
- `Réinitialiser` filtres.
- `Modifier` ligne + menu `...`.

## 17. Badges / statuts
- Types de dépôt en badge couleur douce.
- Statuts actifs/inactifs en badge vert/rouge.

## 18. Panneaux de détail
Non présent dans la maquette V2.

## 19. Onglets, si applicable
Non applicable.

## 20. États visuels à prévoir
- Liste vide (aucun dépôt).
- Aucun résultat après filtre.
- Dépôts archivés affichés via filtre dédié (logique fonctionnelle).
- Avertissement avant archivage/désactivation avec rattachements.

## 21. Règles d’ergonomie métier
- Le dépôt/base guide l’exploitation, ne bloque pas automatiquement les affectations en Alpha.
- Le responsable local est informationnel, pas un droit applicatif automatique.

## 22. Règles de permissions visibles
- Accès gestion par Admin/Gérant ou permission dédiée.
- Utilisateurs terrain : pas d’accès à la gestion par défaut.

## 23. Responsive futur
- KPI en pile.
- Filtres repliables.
- Tableau converti en cartes lignes.

## 24. Ce qui doit être codé plus tard
- Flux archivage/restauration complet.
- Avertissements détaillés sur rattachements.
- Édition formulaire complet dépôt/base.

## 25. Ce qui ne doit pas être codé
- Suppression physique.
- Gestion massive utilisateurs/véhicules depuis cette page.
- Règles géographiques avancées (distance/carte) en Alpha.

## 26. Interdictions de dérive
- Ne pas transformer cette page en module de planification.
- Ne pas implémenter des permissions granulaires par base en Alpha sans validation explicite.

## 27. Checklist de conformité visuelle 99 %
- 4 KPI en tête conformes.
- Barre filtres conforme avec recherche + 3 selects + reset.
- Tableau colonnes et badges conformes à la maquette.
- Pagination en pied + lignes par page.
- CTA `Nouveau dépôt` prioritaire en haut droite.
- INFORMATION NON FOURNIE — À CONFIRMER : règles exactes futures de blocage/alerte planning par base.
