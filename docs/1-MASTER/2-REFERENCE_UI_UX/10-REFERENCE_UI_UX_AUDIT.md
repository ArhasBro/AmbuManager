# Ambulance Manager — Référence UI/UX — Audit

Version : V2
Statut : référence UI/UX codable
Objectif : reproduction visuelle 99 %
Source visuelle : docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/10-Audit/Audit_V2.png
Source fonctionnelle : docs/1-MASTER/3-FONCTIONNALITES/10-FONCTIONNALITES_DETAILLEES_AUDIT_V1.md

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
Décrire la page Audit comme journal transversal consultable, filtrable et lisible sans action métier directe.

## 2. Sources utilisées
- Maquette active `Audit_V2.png`.
- Fiche détaillée Audit V1.

## 3. Règle d’autorité
1. Maquette Audit V2.
2. Fiche Audit V1.

## 4. Objectif UX de la page
Permettre de répondre rapidement à `qui a fait quoi, quand, sur quel module, avec quel résultat`.

## 5. Rôle métier de la page
Centraliser la traçabilité des actions importantes de tous les modules.

## 6. Structure générale de l’écran
- Titre/sous-titre + actions export/impression.
- Barre de filtres (période, utilisateur, action, module, ressource, résultat).
- KPI audit (actions totales, succès, échecs, avertissements).
- Tableau des événements.
- Panneau droit `Détail de l’action`.

## 7. Layout desktop attendu
- Table large à gauche.
- Panneau détail fixe à droite.
- Filtres en bande continue au-dessus des KPI.

## 8. Hiérarchie visuelle
- Niveau 1 : filtres période/module/action.
- Niveau 2 : KPI succès/échecs.
- Niveau 3 : liste d’événements.
- Niveau 4 : détail complet de l’entrée sélectionnée.

## 9. Zones principales de l’écran
- Filtres principaux.
- KPI audit.
- Tableau colonnes : date/heure, utilisateur, action, module, ressource, IP, résultat.
- Panneau détail avec métadonnées complètes.

## 10. Détail de chaque zone
- Tableau : icône action + libellé lisible, résultat en badge, menu `...`.
- Détail : utilisateur, action, module, ressource, IP, navigateur, système, résultat, détails, ID événement.
- Pagination bas de table + lignes par page.

## 11. Composants visibles
- `AuditFiltersBar`
- `AuditKpiCard`
- `AuditEventsTable`
- `AuditResultBadge`
- `AuditDetailPanel`

## 12. Composants réutilisables à prévoir
- `EventSummaryCell`.
- `FilterSelectInline`.
- `AuditMetadataList`.

## 13. Cards
- KPI top en cartes.
- Panneau détail en carte verticale.
- Table dans carte principale.

## 14. Tableaux / listes
- Tableau central des événements.
- Liste détaillée clé/valeur dans panneau droit.

## 15. Filtres / recherche
- Filtres visibles : période, utilisateur, action, module, ressource, résultat.
- Boutons `Réinitialiser` et `Filtres` selon maquette.
- Recherche complémentaire possible en évolution.

## 16. Boutons / actions
- `Exporter` et `Imprimer` en haut droite.
- Menu ligne `...` pour actions de consultation.

## 17. Badges / statuts
- Résultats : `Succès`, `Échec`, `Avertissement`.
- Badges action/module dans détail selon contexte.

## 18. Panneaux de détail
- Panneau droit obligatoire dans vue desktop.
- Affiche entrée active et métadonnées contextuelles.

## 19. Onglets, si applicable
Non applicable.

## 20. États visuels à prévoir
- Chargement audit.
- Aucun événement sur période.
- Aucun résultat après filtre.
- Erreur chargement.
- Accès non autorisé.

## 21. Règles d’ergonomie métier
- Entrées audit compréhensibles par un gestionnaire non technique.
- Terminologie explicite (ex: `Connexion réussie`, `Modification`, `Création`).

## 22. Règles de permissions visibles
- Accès par défaut Admin/Gérant.
- Permission dédiée pour autres profils.
- Données sensibles masquées selon droits.
- Cloisonnement strict par société.

## 23. Responsive futur
- Panneau détail sous la table en mobile.
- Colonnes secondaires repliables.
- Filtres en tiroir.

## 24. Ce qui doit être codé plus tard
- Export filtré si validé.
- Règles de conservation/purge.
- Gestion de visibilité fine actions support.

## 25. Ce qui ne doit pas être codé
- Outil d’investigation analytique avancé en Alpha.
- Restauration d’objets métier depuis Audit.
- Consultation libre des données sensibles.

## 26. Interdictions de dérive
- Ne pas contourner les permissions via recherche/filtre.
- Ne pas afficher d’événements d’autres sociétés hors règles support validées.

## 27. Checklist de conformité visuelle 99 %
- Bande filtres complète en haut.
- 4 KPI audit affichés.
- Table événements + panneau détail droit.
- Badges résultat conformes (`Succès`, `Échec`, `Avertissement`).
- Pagination et lignes/page conformes.
- INFORMATION NON FOURNIE — À CONFIRMER : durée de conservation et nom exact permission audit.
