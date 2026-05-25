# Ambulance Manager — Référence UI/UX globale

Version : V2  
Statut : référence UI/UX codable globale  
Objectif : cadrage global pour reproduction visuelle 99 %

## Sommaire
- [1. Objectif du document](#1-objectif-du-document)
- [2. Sources utilisées](#2-sources-utilisées)
- [3. Règle d’autorité globale](#3-règle-dautorité-globale)
- [4. Direction artistique validée](#4-direction-artistique-validée)
- [5. Principes généraux de layout](#5-principes-généraux-de-layout)
- [6. Shell global](#6-shell-global)
- [7. Structure desktop](#7-structure-desktop)
- [8. Grilles et largeurs](#8-grilles-et-largeurs)
- [9. Espacements et densité](#9-espacements-et-densité)
- [10. Couleurs globales](#10-couleurs-globales)
- [11. Typographie globale](#11-typographie-globale)
- [12. Icônes et pictogrammes](#12-icônes-et-pictogrammes)
- [13. Cards](#13-cards)
- [14. Tableaux](#14-tableaux)
- [15. Filtres et recherche](#15-filtres-et-recherche)
- [16. Boutons et actions](#16-boutons-et-actions)
- [17. Badges et statuts](#17-badges-et-statuts)
- [18. Onglets](#18-onglets)
- [19. Panneaux de détail](#19-panneaux-de-détail)
- [20. Alertes et messages](#20-alertes-et-messages)
- [21. États visuels communs](#21-états-visuels-communs)
- [22. Permissions visibles](#22-permissions-visibles)
- [23. Responsive futur](#23-responsive-futur)
- [24. Accessibilité minimale](#24-accessibilité-minimale)
- [25. Architecture components/ future](#25-architecture-components-future)
- [26. Stratégie tailwind.config.* future](#26-stratégie-tailwindconfig-future)
- [27. Règles page par page](#27-règles-page-par-page)
- [28. Ce qui doit être codé plus tard](#28-ce-qui-doit-être-codé-plus-tard)
- [29. Ce qui ne doit pas être codé](#29-ce-qui-ne-doit-pas-être-codé)
- [30. Interdictions de dérive](#30-interdictions-de-dérive)
- [31. Checklist globale de conformité 99 %](#31-checklist-globale-de-conformité-99-)

## 1. Objectif du document
Ce document fixe la référence transversale UI/UX codable du pack V2 pour préparer une intégration frontend fidèle à 99 % des maquettes métier, sans valider à lui seul le fonctionnel définitif.

## 2. Sources utilisées
Sources autorisées :
- Maquettes V2 dans `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/`.
- Fiches détaillées dans `docs/1-MASTER/3-FONCTIONNALITES/`.
- Références UI/UX page déjà densifiées dans `docs/1-MASTER/2-REFERENCE_UI_UX/` (Shell + pages 1 à 10).

## 3. Règle d’autorité globale
Ordre d’autorité obligatoire :
1. Maquettes V2 au versionnage le plus élevé.
2. Fiches fonctionnalités détaillées.
3. Références UI/UX page déjà densifiées.
4. Aucune hypothèse non documentée.
5. Aucun ancien fichier UI/UX supprimé comme référence active.
6. Aucun code existant comme source visuelle.

## 4. Direction artistique validée
Direction validée : SaaS B2B métier, clair, dense mais lisible, orienté exploitation.
- Fond global clair.
- Surfaces de travail en cartes blanches.
- Bordures fines et séparation nette des blocs.
- Accents bleus pour actions primaires et états d’information.
- Pictogrammes sobres, fonctionnels, non décoratifs.
- Rendu attendu : robuste, professionnel, codable, sans style marketing lourd.

## 5. Principes généraux de layout
- Priorité desktop.
- Lecture verticale explicite : en-tête de page, actions, synthèse, filtres, données détaillées.
- Groupement strict par blocs métier.
- Pas d’effet visuel gratuit qui détourne des actions opérationnelles.

## 6. Shell global
- Sidebar gauche persistante pour navigation principale.
- Topbar persistante pour contexte société/session.
- Zone de contenu principale dédiée à la page active.
- Masquage des modules/actions selon permissions visibles décrites dans les fiches.

## 7. Structure desktop
- Zone Shell stable commune à toutes les pages connectées.
- Pages métier structurées en sections : KPI/cards, filtres, tableaux/listes/grilles, panneau de détail si nécessaire.
- Pages multi-vues : onglets ou sélecteurs de vue en tête de contenu.

## 8. Grilles et largeurs
- Grille desktop logique homogène entre pages.
- Largeurs de blocs alignées par section pour éviter les ruptures visuelles.
- Tableaux et grilles utilisent la largeur utile disponible du contenu.
- INFORMATION NON FOURNIE — À CONFIRMER : valeurs numériques exactes (colonnes, px, max-width).

## 9. Espacements et densité
- Densité cible : métier, intermédiaire à soutenue, lisible sur poste desktop.
- Espacements réguliers entre sections et à l’intérieur des cards.
- Éviter les zones vides excessives qui dégradent la lecture opérationnelle.
- INFORMATION NON FOURNIE — À CONFIRMER : échelle chiffrée d’espacement (ex. 4/8/12/16).

## 10. Couleurs globales
- Couleurs de surface : clair + blanc.
- Couleur d’accent primaire : bleu.
- États : succès, avertissement, erreur, information, neutre.
- Interdiction de faire porter une information critique uniquement par la couleur.
- INFORMATION NON FOURNIE — À CONFIRMER : codes hex exacts de la palette finale.

## 11. Typographie globale
- Hiérarchie textuelle explicite : titre page, titre section, corps, meta.
- Lisibilité prioritaire pour tableaux et formulaires denses.
- Cohérence des poids et tailles entre pages.
- INFORMATION NON FOURNIE — À CONFIRMER : famille de police officielle et échelle typographique chiffrée.

## 12. Icônes et pictogrammes
- Iconographie utilitaire, discrète, cohérente entre modules.
- Icônes d’action standard : voir, éditer, plus, filtre, recherche, export, statut.
- Pas d’illustrations décoratives intrusives dans les zones de production.

## 13. Cards
- Cards blanches à bordure fine pour KPI, synthèses et blocs de formulaire.
- Titres courts et actions explicites.
- Alignement cohérent des icônes, valeurs, sous-libellés et badges.

## 14. Tableaux
- Colonnes alignées et lisibles à densité métier.
- Colonne d’actions compacte et explicite.
- Badges de statut dans les colonnes critiques.
- Pagination/volume affichés quand la page le prévoit.

## 15. Filtres et recherche
- Barre de filtres placée avant le contenu tabulaire/grille.
- Ordre cible : recherche texte puis filtres métier puis reset.
- États “aucun résultat” documentés et actionnables.

## 16. Boutons et actions
- Bouton primaire : accent bleu, action principale claire.
- Boutons secondaires et tertiaires : hiérarchie visuelle conservée.
- Actions destructives ou sensibles : distinction explicite.
- Actions interdites : masquées ou désactivées selon permissions.

## 17. Badges et statuts
- Badge = texte + couleur, jamais couleur seule.
- Lexique de statuts conservé tel que défini par page.
- Cohérence transversale des couleurs de criticité.

## 18. Onglets
- Onglets utilisés sur vues multiples et pages multi-contextes.
- Onglet actif immédiatement identifiable.
- Ordre des onglets strictement aligné aux maquettes/fiches.

## 19. Panneaux de détail
- Panneau de détail contextuel sur pages complexes (planning, utilisateurs, véhicules, audit, suivi).
- Contenu structuré : identité, statut, informations clés, historique court, actions autorisées.
- Pas de surcharge : la vue liste/grille reste l’entrée principale.

## 20. Alertes et messages
- Alertes métiers visibles mais non bloquantes hors cas critique.
- Messages explicites orientés action.
- Niveau visuel cohérent entre information, avertissement, erreur.

## 21. États visuels communs
États à traiter sur chaque écran et composant :
- `empty`: bloc sans donnée avec action de sortie.
- `loading`: chargement lisible sans rupture de layout.
- `error`: erreur explicite avec piste d’action.
- `disabled`: action/champ non actif clairement identifiable.
- `hover`: retour visuel subtil et cohérent.
- `focus`: focus visible pour clavier/accessibilité.
- `active/selected`: état actif sans ambiguïté.

## 22. Permissions visibles
- Les fiches pilotent la visibilité des actions/modules.
- Pas de simulation de droits non documentés.
- Les actions sensibles suivent la logique “explicite et traçable”.

## 23. Responsive futur
- La cible actuelle reste desktop.
- Le responsive sera ajouté sans casser la hiérarchie métier desktop.
- Tableaux denses : adaptation future par priorisation/empilement/panneaux, sans perte sémantique.

## 24. Accessibilité minimale
- Contrastes suffisants texte/fond.
- Focus clavier visible.
- Labels clairs pour champs/actions.
- Informations critiques accessibles hors couleur seule.

## 25. Architecture components/ future
Cible documentaire (future, non à implémenter dans ce fix) :
- `components/shell/`
- `components/ui/`
- `components/business/`
- `components/planning/`
- `components/vehicles/`
- `components/users/`

Objectif : isoler primitives UI, blocs métier transverses, et composants de domaine.

## 26. Stratégie tailwind.config.* future
Cible documentaire (future, non à implémenter dans ce fix) :
- Centraliser tokens de couleur, typo, spacing, radius, shadow.
- Centraliser dimensions Shell et largeurs utiles desktop.
- Centraliser règles d’états (`hover`, `focus`, `active`, `disabled`) et couches (`z-index`) structurantes.

## 27. Règles page par page
- `0-Shell global` : structure commune et permissions de navigation.
- `1-Login` : écran d’entrée, identité produit, formulaire et états d’authentification.
- `2-Tableau de bord` : KPI et synthèses métier.
- `3-Modèles horaires` : référentiel et statuts des modèles.
- `4-Planning` : page la plus complexe, 5 vues et logique de publication/couverture.
- `5-Utilisateurs / RH` : gestion identité, rôles, statuts et disponibilité.
- `6-Véhicules` : référentiel flotte et disponibilité.
- `6.1-Suivi des véhicules` : 4 onglets et criticités opérationnelles.
- `7-Dépôts / Bases` : gestion des lieux et rattachements.
- `8-Société` : configuration et informations société.
- `9-Mise en route` : progression et checklist de démarrage.
- `10-Audit` : traçabilité des actions.

## 28. Ce qui doit être codé plus tard
- Déclinaison responsive complète validée.
- Consolidation des tokens finaux dans `tailwind.config.*`.
- Industrialisation des composants dans `components/` selon architecture cible.

## 29. Ce qui ne doit pas être codé
- Nouvelles fonctionnalités hors fiches détaillées.
- Refonte visuelle libre non couverte par maquettes V2.
- Libellés non validés en remplacement des libellés actifs métier.

## 30. Interdictions de dérive
- Ne pas utiliser `Templates` comme libellé actif (utiliser `Modèles horaires`).
- Ne pas utiliser `Onboarding` comme libellé actif (utiliser `Mise en route`).
- Ne pas promouvoir `Privacy` en entrée métier principale.
- Ne pas fusionner `Société` et `Mise en route`.
- Ne pas transformer le Planning en vision détaillée non prévue par les maquettes/fiches.
- Ne pas traiter les références UI/UX comme validation fonctionnelle définitive.

## 31. Checklist globale de conformité 99 %
- [ ] Version de maquette la plus élevée utilisée pour la page concernée.
- [ ] Fiche fonctionnalité détaillée associée consultée avant implémentation.
- [ ] Structure Shell + layout desktop conformes.
- [ ] Ordre visuel des sections conforme à la maquette.
- [ ] Cards, tableaux, filtres, badges, boutons, onglets, panneaux de détail conformes.
- [ ] États `empty/loading/error/disabled/hover/focus/active` couverts.
- [ ] Permissions visibles respectées.
- [ ] Aucun libellé actif interdit (`Templates`, `Onboarding`).
- [ ] Aucune invention fonctionnelle.
- [ ] Aucune décision visuelle basée sur le code existant contre maquettes/fiches.
- [ ] Les points manquants restent marqués `INFORMATION NON FOURNIE — À CONFIRMER`.
