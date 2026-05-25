# Ambulance Manager — Référence UI/UX — Modèles horaires

Version : V2
Statut : référence UI/UX codable
Objectif : reproduction visuelle 99 %
Source visuelle : docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/3-Modèles-Horaire/Modèles-Horaire_V2.png
Source fonctionnelle : docs/1-MASTER/3-FONCTIONNALITES/3-FONCTIONNALITES_DETAILLEES_MODELES_HORAIRES_V1.1.md

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
Décrire la page Modèles horaires comme référentiel de modèles de planning réutilisables.

## 2. Sources utilisées
- Maquette active `Modèles-Horaire_V2.png`.
- Fiche détaillée Modèles horaires V1.1.

## 3. Règle d’autorité
1. Maquette Modèles horaires V2.
2. Fiche Modèles horaires.

## 4. Objectif UX de la page
Permettre de créer et maintenir des modèles horaires exploitables immédiatement dans le Planning.

## 5. Rôle métier de la page
Référentiel de modèles (journée, nuit, rotation, spécifique) avec statut, cycle, plages horaires, composition et usage.

## 6. Structure générale de l’écran
- Titre + actions (`Importer des modèles`, `Nouveau modèle`).
- KPI top (actifs, brouillons, utilisés, équipes concernées).
- Barre recherche/filtres.
- Tableau des modèles horaires.

## 7. Layout desktop attendu
- 4 KPI alignés.
- Filtres en bande horizontale.
- Tableau large avec colonnes métier et pagination.

## 8. Hiérarchie visuelle
- Niveau 1 : `Modèles horaires`.
- Niveau 2 : `Nouveau modèle`.
- Niveau 3 : KPI.
- Niveau 4 : tableau détaillé.

## 9. Zones principales de l’écran
- KPI synthèse.
- Recherche + filtres (`Statut`, `Type`, `Cycle`) + `Réinitialiser`.
- Tableau colonnes : nom, type, cycle, plages horaires, repos, équipes, statut, actions.

## 10. Détail de chaque zone
- Nom de modèle sur 1re colonne + sous-badge catégorie (`Standard`, `Rotation`, `Spécifique`).
- Plages horaires lisibles avec mention `J+1` pour nuit.
- Statuts visibles (`Actif`, `Brouillon`, `Inactif`).

## 11. Composants visibles
- `ModeleHoraireKpiCard`
- `ModeleHoraireFiltersBar`
- `ModeleHoraireTable`
- `ModeleTypeBadge`
- `ModeleStatusBadge`

## 12. Composants réutilisables à prévoir
- `ModelUsageCounter`.
- `TimeRangeListCompact`.
- `CycleBadge`.

## 13. Cards
- Cartes KPI homogènes.
- Tableau dans carte conteneur principale.

## 14. Tableaux / listes
- Tableau central dense avec tri/pagination.

## 15. Filtres / recherche
- Recherche textuelle modèle.
- Filtres statut/type/cycle.
- Bouton `Réinitialiser`.

## 16. Boutons / actions
- `Importer des modèles`.
- `Nouveau modèle`.
- Actions ligne : consulter/éditer/menu.

## 17. Badges / statuts
- Badges type modèle.
- Badges statut (actif/brouillon/inactif).
- Badge type véhicule à prévoir en formulaire/ligne détaillée.

## 18. Panneaux de détail
Non visible dans la maquette principale ; panneau modal/écran d’édition à prévoir plus tard.

## 19. Onglets, si applicable
Non applicable.

## 20. États visuels à prévoir
- Liste vide modèles.
- Aucun résultat filtre.
- Modèles archivés via filtre dédié (fonctionnel).
- Actions non autorisées masquées.

## 21. Règles d’ergonomie métier
- Distinguer clairement `Nom complet` et `Libellé court Planning`.
- Ne pas surcharger la liste par du reporting avancé.

## 22. Règles de permissions visibles
- Admin/Gérant : gestion complète en Alpha.
- Utilisateur autorisé : droits partiels selon permission.
- Utilisateurs terrain : pas d’accès par défaut.

## 23. Responsive futur
- KPI en pile.
- Colonnes secondaires repliées.
- Détail modèle ouvrable en panneau plein écran mobile.

## 24. Ce qui doit être codé plus tard
- Formulaire complet création/édition (jours actifs facultatifs, horaires par jour, composition).
- Archivage/restauration avec filtre.
- Compteur `Nb utilisé` raccordé Planning.

## 25. Ce qui ne doit pas être codé
- Suppression physique.
- Couleur imposée par modèle comme règle métier.
- Automatisation planning avancée depuis cette page en Alpha.

## 26. Interdictions de dérive
- Ne pas réutiliser le libellé `Templates`.
- Ne pas implémenter de statistiques avancées en V1.

## 27. Checklist de conformité visuelle 99 %
- 4 KPI conformes en tête.
- Barre filtres conforme (recherche + statut + type + cycle + reset).
- Tableau colonnes conforme à la maquette.
- Statuts `Actif/Brouillon/Inactif` visibles en badge.
- CTA `Nouveau modèle` en priorité.
- INFORMATION NON FOURNIE — À CONFIRMER : noms techniques finaux des permissions module.
