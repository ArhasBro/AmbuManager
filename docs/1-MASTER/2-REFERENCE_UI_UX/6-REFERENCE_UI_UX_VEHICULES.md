# Ambulance Manager — Référence UI/UX — Véhicules

Version : V2
Statut : référence UI/UX codable
Objectif : reproduction visuelle 99 %
Source visuelle : docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/6-Véhicules/Véhicules_V2.png
Source fonctionnelle : docs/1-MASTER/3-FONCTIONNALITES/6-FONCTIONNALITES_DETAILLEES_VEHICULES_V1.1.md

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
Décrire la page Véhicules comme référentiel administratif de flotte distinct de la page Suivi des véhicules.

## 2. Sources utilisées
- Maquette active `Véhicules_V2.png`.
- Fiche détaillée Véhicules V1.1.

## 3. Règle d’autorité
1. Maquette Véhicules V2.
2. Fiche Véhicules.

## 4. Objectif UX de la page
Permettre de localiser rapidement l’état général de flotte et d’agir sur les fiches véhicule sans confusion avec le suivi opérationnel.

## 5. Rôle métier de la page
Gestion des informations véhicule (identité, type, statut administratif, disponibilité générale, base/dépôt).

## 6. Structure générale de l’écran
- Titre + actions (`Importer des véhicules`, `Ajouter un véhicule`).
- KPI top (totaux, disponibles, maintenance, hors service, réservés/affectés).
- Barre recherche/filtres.
- Zone principale 2 colonnes :
  - gauche : tableau véhicules,
  - droite : répartition type + alertes + actions rapides.

## 7. Layout desktop attendu
- Tableau majoritaire à gauche.
- Colonne latérale droite de support décisionnel.

## 8. Hiérarchie visuelle
- Niveau 1 : `Véhicules`.
- Niveau 2 : CTA `Ajouter un véhicule`.
- Niveau 3 : KPI.
- Niveau 4 : table et cartes latérales.

## 9. Zones principales de l’écran
- KPI de flotte.
- Recherche + filtres (`Statut`, `Type`, `Dépôt/Base`) + bouton `Filtres`.
- Tableau colonnes : véhicule, immatriculation, type, dépôt/base, statut, disponibilité, actions.
- Cartes latérales : `Répartition par type`, `Alertes véhicules`, `Actions rapides`.

## 10. Détail de chaque zone
- Cellule véhicule : vignette + nom interne + sous-ligne modèle/places.
- Statut et disponibilité séparés visuellement.
- Actions ligne : modifier + menu.
- Alertes latérales : liste courte priorisée.

## 11. Composants visibles
- `VehicleKpiCard`
- `VehicleFiltersBar`
- `VehiclesTable`
- `VehicleTypeBadge`
- `VehicleStatusBadge`
- `VehicleAvailabilityBadge`
- `VehicleAlertsCard`

## 12. Composants réutilisables à prévoir
- `VehicleIdentityCell`.
- `VehicleQuickActionsList`.
- `VehicleTypeDistributionChartCard`.

## 13. Cards
- KPI top homogènes.
- Cartes latérales informatives.

## 14. Tableaux / listes
- Tableau principal avec pagination.
- Liste alertes latérales.

## 15. Filtres / recherche
- Recherche textuelle véhicule.
- Filtres statut/type/dépôt-base.
- Réinitialisation.

## 16. Boutons / actions
- `Importer des véhicules`.
- `Ajouter un véhicule`.
- Actions ligne (édition/menu).
- Actions rapides latérales (planning véhicules, contrôles/documents, assurances, maintenance).

## 17. Badges / statuts
- Types véhicule : `AMBULANCE`, `VSL`, `TAXI`, `TPMR`.
- Statuts/disponibilités distincts.
- Respect de la distinction métier TPMR VSL / TPMR TAXI côté données futures.

## 18. Panneaux de détail
Non visible dans la maquette principale ; panneau/fiche détaillée à prévoir en implémentation.

## 19. Onglets, si applicable
Non applicable sur cette page.

## 20. États visuels à prévoir
- Liste vide.
- Aucun résultat filtre.
- Véhicules archivés via filtre dédié (fonctionnel).
- Action non autorisée (changement disponibilité, archivage, etc.).

## 21. Règles d’ergonomie métier
- Distinguer clairement page Véhicules (référentiel) et Suivi des véhicules (opérationnel).
- Maintenir la lisibilité des statuts sans surcharge.

## 22. Règles de permissions visibles
- Admin/Gérant : gestion complète en Alpha.
- Utilisateurs terrain : lecture simple par défaut.
- Actions sensibles masquées ou bloquées selon droits.

## 23. Responsive futur
- Table en cartes par véhicule.
- Cartes latérales déplacées sous la liste.
- KPI en pile.

## 24. Ce qui doit être codé plus tard
- Flux création/édition véhicule complet.
- Archivage/restauration.
- Raccord explicite vers Suivi des véhicules.

## 25. Ce qui ne doit pas être codé
- Workflow complet vérifications/désinfections/anomalies ici.
- Suppression physique véhicule.
- Maintenance avancée en Alpha sur cette page.

## 26. Interdictions de dérive
- Ne pas basculer automatiquement un véhicule indisponible sur anomalie sans action explicite autorisée.
- Ne pas surcharger la vue annuelle planning avec le détail véhicule.

## 27. Checklist de conformité visuelle 99 %
- KPI top conformes.
- Filtres conformes (recherche + statut + type + dépôt/base).
- Tableau gauche + cartes droites conformes.
- Statut administratif et disponibilité visuellement séparés.
- CTA `Ajouter un véhicule` en priorité.
- INFORMATION NON FOURNIE — À CONFIRMER : formalisation exacte du sous-type TPMR VSL/TPMR TAXI dans le référentiel.
