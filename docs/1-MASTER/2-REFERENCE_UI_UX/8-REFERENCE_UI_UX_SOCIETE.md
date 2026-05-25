# Ambulance Manager — Référence UI/UX — Société

Version : V2
Statut : référence UI/UX codable
Objectif : reproduction visuelle 99 %
Source visuelle : docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/8-Société/Société_V2.png
Source fonctionnelle : docs/1-MASTER/3-FONCTIONNALITES/8-FONCTIONNALITES_DETAILLEES_SOCIETE_V1.1.md

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
Décrire la page Société comme profil permanent de l’entreprise, distinct de la Mise en route.

## 2. Sources utilisées
- Maquette active `Société_V2.png`.
- Fiche détaillée Société V1.1.

## 3. Règle d’autorité
1. Maquette Société V2.
2. Fiche Société V1.1.

## 4. Objectif UX de la page
Permettre une consultation claire du profil entreprise et une modification contrôlée par permissions.

## 5. Rôle métier de la page
Référentiel société : identité, adresse principale, contacts, paramètres, résumé configuration.

## 6. Structure générale de l’écran
- Titre/sous-titre + action primaire `Modifier la société`.
- Zone gauche : informations générales + adresse + contacts.
- Zone droite : résumé de configuration + responsables applicatifs.
- Bas de page : informations métier, paramètres généraux, historique récent.

## 7. Layout desktop attendu
- Grille bi-colonne sur le haut.
- Tableau des contacts sur pleine largeur intermédiaire.
- Trois cartes en bas (métier, paramètres, historique).

## 8. Hiérarchie visuelle
- Niveau 1 : titre `Société`.
- Niveau 2 : bouton `Modifier la société`.
- Niveau 3 : blocs informations générales/résumé.
- Niveau 4 : contacts et historique.

## 9. Zones principales de l’écran
- `Informations générales`.
- `Résumé de configuration` avec statuts (`Complet`, `Incomplet`, `À compléter`, `OK`).
- `Adresse principale`.
- `Responsables applicatifs`.
- `Contacts société` + action `Ajouter un contact`.
- `Informations métier transport sanitaire`.
- `Paramètres généraux`.
- `Historique récent`.

## 10. Détail de chaque zone
- Informations générales : paires label/valeur alignées en deux colonnes.
- Résumé configuration : liste d’items avec badge statut par ligne + CTA `Continuer la mise en route`.
- Adresse principale : rappel explicite que cette adresse ne remplace pas les dépôts/bases.
- Responsables applicatifs : alimentés automatiquement depuis Utilisateurs (Admin/Gérant).
- Contacts société : tableau structuré (type, nom, email, téléphone, statut, action).

## 11. Composants visibles
- `CompanyInfoCard`
- `ConfigurationSummaryCard`
- `CompanyAddressCard`
- `ApplicationManagersCard`
- `CompanyContactsTable`
- `BusinessTransportInfoCard`
- `GeneralSettingsCard`
- `RecentHistoryCard`

## 12. Composants réutilisables à prévoir
- `KeyValueGrid`.
- `ConfigStatusLine`.
- `ContactTypeBadge`.
- `HistoryListCompact`.

## 13. Cards
- Usage massif de cartes thématiques.
- Uniformité des bordures/rayons/paddings.

## 14. Tableaux / listes
- Tableau principal `Contacts société`.
- Listes simples pour résumé de configuration et historique.

## 15. Filtres / recherche
Pas de barre de filtres globale sur cette page.

## 16. Boutons / actions
- Action primaire : `Modifier la société`.
- Actions secondaires : `Ajouter un contact`, `Modifier` par ligne contact, `Voir tout l’historique`.
- CTA transversal : `Continuer la mise en route`.

## 17. Badges / statuts
- Badges d’avancement configuration.
- Badge `Principal` possible pour un contact.
- Badge `À confirmer` sur informations métier si nécessaire.

## 18. Panneaux de détail
Aucun panneau latéral dédié dans la maquette ; modification via mode éditable/écran secondaire à prévoir.

## 19. Onglets, si applicable
Non applicable dans la maquette Société V2.

## 20. États visuels à prévoir
- Consultation par défaut.
- Mode modification selon permissions.
- Aucun contact société.
- Aucun responsable applicatif.
- Configuration incomplète.

## 21. Règles d’ergonomie métier
- Ne pas mélanger `Société` et `Mise en route`.
- Rendre explicite la différence entre contact société et utilisateur applicatif.

## 22. Règles de permissions visibles
- Accès par défaut : Admin/Gérant.
- Utilisateurs terrain : pas d’accès par défaut.
- Actions d’édition/contacts masquées si non autorisées.

## 23. Responsive futur
- Passage des blocs bi-colonne en colonne unique.
- Tableau contacts en mode cartes compactes.
- Historique en liste repliable.

## 24. Ce qui doit être codé plus tard
- Mode édition structuré par blocs.
- Validation des champs sensibles (SIRET, emails, etc.).
- Historique détaillé lié à Audit.

## 25. Ce qui ne doit pas être codé
- Suspension/désactivation/archivage/suppression de société en Alpha.
- Gestion utilisateurs/véhicules/planning directement depuis Société.
- Fusion avec Mise en route.

## 26. Interdictions de dérive
- Ne pas transformer la page en “hub” de toutes les configurations métier.
- Ne pas modifier les rôles Admin/Gérant depuis cette page.

## 27. Checklist de conformité visuelle 99 %
- Bouton `Modifier la société` en haut à droite.
- Bloc `Résumé de configuration` avec statuts ligne par ligne.
- Bloc `Responsables applicatifs` distinct et alimenté depuis Utilisateurs.
- Tableau `Contacts société` avec action `Ajouter un contact`.
- Bloc `Informations métier transport sanitaire` + `Paramètres généraux` + `Historique récent`.
- INFORMATION NON FOURNIE — À CONFIRMER : caractère obligatoire exact du SIRET et règles ARS détaillées.
