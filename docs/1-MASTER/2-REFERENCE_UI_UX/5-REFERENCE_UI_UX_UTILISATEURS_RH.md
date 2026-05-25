# Ambulance Manager — Référence UI/UX — Utilisateurs / RH

Version : V2
Statut : référence UI/UX codable
Objectif : reproduction visuelle 99 %
Source visuelle : docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/5-Utilisateurs-RH/Utilisateurs_V2.png
Source fonctionnelle : docs/1-MASTER/3-FONCTIONNALITES/5-FONCTIONNALITES_DETAILLEES_UTILISATEURS_V1.1.md

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
Décrire la page Utilisateurs / RH pour une gestion lisible des comptes, rôles, statuts et actions associées.

## 2. Sources utilisées
- Maquette active `Utilisateurs_V2.png`.
- Fiche détaillée Utilisateurs V1.1.

## 3. Règle d’autorité
1. Maquette Utilisateurs V2.
2. Fiche Utilisateurs.

## 4. Objectif UX de la page
Donner une vue complète et filtrable des utilisateurs avec actions rapides sécurisées.

## 5. Rôle métier de la page
Créer/modifier les comptes, gérer rôles/permissions/statuts/archivage et demandes d’absence selon droits.

## 6. Structure générale de l’écran
- Titre + actions (`Importer des utilisateurs`, `Nouvel utilisateur`).
- KPI top (actifs, administrateurs, rôles définis, équipes/services).
- Barre recherche/filtres.
- Zone principale en 2 colonnes :
  - gauche : tableau utilisateurs,
  - droite : répartition par équipe, activités récentes, actions rapides.

## 7. Layout desktop attendu
- Large table à gauche (majoritaire).
- Colonne latérale droite fixe en cartes analytiques simples.

## 8. Hiérarchie visuelle
- Niveau 1 : `Utilisateurs / RH`.
- Niveau 2 : CTA `Nouvel utilisateur`.
- Niveau 3 : KPI et filtres.
- Niveau 4 : table + cartes latérales.

## 9. Zones principales de l’écran
- KPI synthèse.
- Recherche + filtres (`Statut`, `Rôle`, `Équipe`) + bouton `Filtres`.
- Tableau colonnes : utilisateur, rôle, équipe/service, statut, dernière connexion, actions.
- Cartes `Répartition par équipe`, `Activités récentes`, `Actions rapides`.

## 10. Détail de chaque zone
- Colonne utilisateur : avatar initiales + nom/prénom + email.
- Rôle : badge rôle principal.
- Statut : badge `Actif`/`Inactif`.
- Dernière connexion : date/heure relative ou absolue.
- Actions ligne : consulter/éditer/menu.

## 11. Composants visibles
- `UserKpiCard`
- `UserFiltersBar`
- `UsersTable`
- `RoleBadge`
- `UserStatusBadge`
- `TeamDistributionCard`
- `RecentActivitiesCard`
- `UserQuickActionsCard`

## 12. Composants réutilisables à prévoir
- `UserIdentityCell`.
- `StatusDotBadge`.
- `ActionMenuWithPermissions`.

## 13. Cards
- KPI en cartes top.
- Colonne droite en cartes verticales.

## 14. Tableaux / listes
- Tableau utilisateurs principal.
- Pagination en pied.

## 15. Filtres / recherche
- Recherche utilisateur.
- Filtres statut/rôle/équipe.
- Filtres avancés via bouton dédié.

## 16. Boutons / actions
- `Importer des utilisateurs`.
- `Nouvel utilisateur`.
- Actions par ligne (modifier, menu contextuel).
- Actions rapides latérales (`Gérer les rôles`, `Gérer les équipes`).

## 17. Badges / statuts
- Badges rôle (Administrateur, Responsable RH, etc.).
- Badges statut compte.
- Marqueur `Vous` sur l’utilisateur connecté.

## 18. Panneaux de détail
Panneau fiche utilisateur à prévoir dans future implémentation pour lecture/action selon permissions.

## 19. Onglets, si applicable
Non applicable sur la maquette principale.

## 20. États visuels à prévoir
- Liste vide.
- Aucun résultat recherche.
- Utilisateurs archivés via filtre dédié (fonctionnel).
- Erreur chargement tableau.

## 21. Règles d’ergonomie métier
- Priorité à l’identification rapide des personnes et rôles.
- Distinction nette `statut compte` vs `état opérationnel`.

## 22. Règles de permissions visibles
- Admin/Gérant : gestion complète en Alpha.
- Utilisateur standard : visibilité de sa propre fiche uniquement.
- Actions sensibles masquées si permission absente.

## 23. Responsive futur
- Table convertie en cartes utilisateur.
- Colonne droite repositionnée sous la table.
- Filtres repliables.

## 24. Ce qui doit être codé plus tard
- Flux demandes absence/indisponibilité complet.
- Gestion multi-rôle (max 3 rôles) dans formulaire.
- Gestion permissions fines par module.

## 25. Ce qui ne doit pas être codé
- Suppression physique utilisateur.
- Dossier RH complet (paie/contrat) en Alpha.
- Logique mobile avancée non validée.

## 26. Interdictions de dérive
- Ne pas contourner les permissions côté UI.
- Ne pas afficher des données sensibles non autorisées.

## 27. Checklist de conformité visuelle 99 %
- KPI top conformes.
- Barre filtres conforme avec recherche + 3 filtres + bouton filtres.
- Table large à gauche + colonne cartes à droite.
- Statuts et rôles lisibles par badges.
- CTA `Nouvel utilisateur` clairement prioritaire.
- INFORMATION NON FOURNIE — À CONFIRMER : règles exactes de conflit rôles/permissions en implémentation.
