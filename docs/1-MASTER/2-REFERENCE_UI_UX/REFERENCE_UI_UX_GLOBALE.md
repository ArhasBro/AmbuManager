# Ambulance Manager — Référence UI/UX Globale

Version : V2.2
Statut : référence UI/UX codable
Objectif : reproduction visuelle 99 % des maquettes validées

## Sommaire
- [1. Objectif du document](#1-objectif-du-document)
- [2. Sources utilisées](#2-sources-utilisees)
- [3. Règle d’autorité](#3-regle-dautorite)
- [4. DA globale validée](#4-da-globale-validee)
- [5. Structure générale desktop](#5-structure-generale-desktop)
- [6. Rôle du Shell global](#6-role-du-shell-global)
- [7. Principes de layout](#7-principes-de-layout)
- [8. Système de grille](#8-systeme-de-grille)
- [9. Espacements](#9-espacements)
- [10. Rayons](#10-rayons)
- [11. Bordures](#11-bordures)
- [12. Ombres](#12-ombres)
- [13. Typographie](#13-typographie)
- [14. Couleurs principales](#14-couleurs-principales)
- [15. Couleurs secondaires](#15-couleurs-secondaires)
- [16. Couleurs d’état](#16-couleurs-detat)
- [17. Cartes](#17-cartes)
- [18. Tableaux](#18-tableaux)
- [19. Filtres](#19-filtres)
- [20. Boutons](#20-boutons)
- [21. Badges](#21-badges)
- [22. Onglets](#22-onglets)
- [23. Panneaux de détail](#23-panneaux-de-detail)
- [24. Alertes](#24-alertes)
- [25. Empty states](#25-empty-states)
- [26. Loading states](#26-loading-states)
- [27. États disabled](#27-etats-disabled)
- [28. États actifs](#28-etats-actifs)
- [29. Règles de hiérarchie visuelle](#29-regles-de-hierarchie-visuelle)
- [30. Règles de densité](#30-regles-de-densite)
- [31. Règles responsive futures](#31-regles-responsive-futures)
- [32. Règles accessibilité minimales](#32-regles-accessibilite-minimales)
- [33. Stratégie `components/` future](#33-strategie-components-future)
- [34. Stratégie `tailwind.config.*` future](#34-strategie-tailwindconfig-future)
- [35. Interdictions de dérive](#35-interdictions-de-derive)
- [36. Checklist globale de conformité 99 %](#36-checklist-globale-de-conformite-99)

## 1. Objectif du document
Ce document fixe les règles UI/UX communes à toutes les pages du produit pour préparer un futur codage React/Next.js + Tailwind avec un écart visuel maximal de 1 % par rapport aux maquettes V2.

## 2. Sources utilisées
- Maquettes actives V2 dans `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/`.
- Fiches détaillées dans `docs/1-MASTER/3-FONCTIONNALITES/`.

## 3. Règle d’autorité
1. Maquette au versionnage le plus élevé.
2. Fiche fonctionnalités détaillées correspondante.
3. Liste globale des fonctionnalités uniquement en complément.
4. Aucun ancien fichier `REFERENCE_UI_UX` comme source de vérité.
5. Aucun code existant comme source de vérité visuelle.

## 4. DA globale validée
- Direction visuelle : SaaS B2B médical/transport sanitaire, sobre, lisible, non décorative.
- Ambiance : fond clair, cartes blanches, accent bleu principal, statuts colorés explicites.
- Niveau de densité : intermédiaire, orienté exploitation quotidienne desktop.
- Rendu attendu : hiérarchie forte des titres, informations métier très scannables, actions primaires évidentes.

## 5. Structure générale desktop
- Shell fixe : sidebar gauche + header haut + contenu principal à droite.
- Sidebar : colonne dédiée à la navigation transverse.
- Header : contexte société + identité utilisateur + actions de session.
- Zone contenu : succession de sections en cartes, tableaux et panneaux latéraux selon page.
- Format cible principal : desktop large (maquettes en largeur pleine).

## 6. Rôle du Shell global
- Garantir une ossature unique sur toutes les pages connectées.
- Stabiliser la navigation, l’identité de session et les actions globales.
- Masquer les modules non autorisés selon permissions.
- Ne pas contenir de logique métier de page.

## 7. Principes de layout
- Lecture de haut en bas : titre de page, actions, KPI/état, filtres, données détaillées.
- Alignement strict en colonnes de cartes et tableaux.
- Séparation visuelle par blocs blancs bordés sur fond très clair.
- Panneau de détail latéral utilisé sur les pages complexes.

## 8. Système de grille
- Grille desktop recommandée : 12 colonnes logiques.
- Gouttières régulières entre blocs.
- Blocs KPI alignés en rangées homogènes.
- Tableaux en pleine largeur de zone, avec colonne d’actions compacte.

## 9. Espacements
- Rythme principal régulier entre sections et sous-sections.
- Espacements internes de cartes cohérents entre titre, contenu, actions.
- Espacements verticaux renforcés entre grands blocs (KPI, filtres, tableau, footer de page).

## 10. Rayons
- Cartes et conteneurs : angles arrondis visibles.
- Inputs, selects, boutons : rayons cohérents avec les cartes.
- Badges : rayon plus marqué, style pilule.

## 11. Bordures
- Bordures fines et peu contrastées sur cartes, champs et tableaux.
- Séparateurs horizontaux légers dans les listes et panneaux détail.
- Aucune bordure épaisse décorative.

## 12. Ombres
- Ombres discrètes, principalement sur cartes importantes ou zones focus.
- Pas d’ombre agressive ni d’effets flottants inutiles.

## 13. Typographie
- Hiérarchie cible :
  - Titre page : très visible, gras.
  - Sous-titre page : descriptif, ton neutre.
  - Titre de section/carte : intermédiaire.
  - Corps tableau/formulaire : lisibilité prioritaire.
- INFORMATION NON FOURNIE — À CONFIRMER : famille typographique exacte à verrouiller (nom de police, fallbacks, chargement).

## 14. Couleurs principales
- Bleu marque pour actions primaires et onglets actifs.
- Blanc pour surfaces de contenu.
- Fond global clair bleuté/gris très léger.
- Texte principal bleu nuit / gris foncé.

## 15. Couleurs secondaires
- Variantes douces pour pictogrammes de modules.
- Teintes neutres pour textes secondaires, placeholders et aides contextuelles.

## 16. Couleurs d’état
- Succès : vert.
- Avertissement : orange/ambre.
- Erreur critique : rouge.
- Information : bleu.
- Neutre/inactif : gris.
- Règle absolue : ne jamais porter une information métier critique par la couleur seule ; toujours afficher un libellé texte.

## 17. Cartes
- Cartes KPI : icône ronde ou carrée douce + métrique principale + sous-texte.
- Cartes module : titre, description courte, badge disponibilité, CTA clair.
- Cartes récapitulatives : statut global + indicateurs synthétiques.

## 18. Tableaux
- En-tête clair, lignes denses mais aérées.
- Colonne Actions systématique (icône œil, édition, menu contextuel).
- Badges de statut dans cellules clés.
- Pagination et sélecteur lignes par page en bas de tableau.

## 19. Filtres
- Barre filtres en ligne avant les tableaux.
- Ordre type : recherche texte, filtres métier, bouton `Filtres`/`Réinitialiser`.
- Réinitialisation visible et standardisée.

## 20. Boutons
- Primaire : bleu plein, contraste fort.
- Secondaire : fond blanc, bordure fine.
- Tertiaire/icône : discret, utilisé pour actions locales.
- Actions destructives : style rouge explicite.

## 21. Badges
- Badge de type/état court et lisible.
- Codes métiers récurrents : `Actif`, `Inactif`, `Publié`, `Brouillon`, `À vérifier`, `Couvert`, `Incomplet`, `Indisponible`, etc.
- Badges toujours accompagnés du contexte (ligne, colonne, section).

## 22. Onglets
- Onglets horizontaux sous titre de page sur vues multi-contenus.
- Onglet actif : souligné/bleu, non ambigu.
- Onglets inactifs : texte neutre.

## 23. Panneaux de détail
- Position majoritaire : latérale droite.
- Contenu : résumé objet, statut, métadonnées, historique court, actions autorisées.
- Version lecture vs version gestion selon permissions.

## 24. Alertes
- Alertes informatives simples, lisibles, non intrusives.
- Alertes critiques visibles en rouge/orange selon gravité.
- Les alertes métier ne doivent pas déclencher d’action automatique non validée fonctionnellement.

## 25. Empty states
- Message explicite + action utile possible.
- Ton opérationnel, jamais générique.
- Exemple de structure : `Aucun élément` + `Action recommandée`.

## 26. Loading states
- Indication de chargement par bloc (page, tableau, panneau).
- Boutons d’action protégés contre double soumission.
- Pas de saut de layout brutal entre chargement et rendu.

## 27. États disabled
- Disabled visuellement atténué et non cliquable.
- Justification implicite via contexte (champ obligatoire manquant, permission absente, etc.).

## 28. États actifs
- Navigation active visible en sidebar.
- Onglet actif clairement identifiable.
- Ligne sélectionnée dans tableau/panneau détail explicitement différenciée.

## 29. Règles de hiérarchie visuelle
- Priorité 1 : titre page + action primaire.
- Priorité 2 : KPI/statut global.
- Priorité 3 : filtres et données.
- Priorité 4 : détails secondaires et historique.

## 30. Règles de densité
- Densité intermédiaire orientée exploitation B2B.
- Éviter la surcharge textuelle dans les cases planning et cellules tableau.
- Détails riches déplacés dans panneaux latéraux.

## 31. Règles responsive futures
- Priorité actuelle : desktop.
- Futur responsive :
  - passage en pile des cartes,
  - simplification des tableaux,
  - tiroirs/accordéons pour détails,
  - conservation stricte des libellés métiers.
- Ne pas dégrader la lisibilité métier pour “faire rentrer” toutes les données en mobile.

## 32. Règles accessibilité minimales
- Contrastes suffisants texte/fond.
- Focus visible sur éléments interactifs.
- Labels explicites pour champs et boutons.
- Ne jamais coder une information critique uniquement via couleur/icone.

## 33. Stratégie `components/` future
Cible d’architecture documentaire (à implémenter plus tard, sans création immédiate) :

```text
components/
  shell/
  ui/
  business/
  planning/
  vehicles/
  users/
```

- `shell/` : sidebar, header, wrappers de page.
- `ui/` : primitives visuelles (button, input, badge, tabs, card, table, panel).
- `business/` : blocs transverses métier (kpi cards, filtres standards, status strips).
- `planning/`, `vehicles/`, `users/` : composants spécifiques de domaine.

## 34. Stratégie `tailwind.config.*` future
Centralisation obligatoire des tokens visuels (à implémenter plus tard, sans création/modification immédiate) :
- couleurs marque ;
- couleurs métier ;
- couleurs d’état ;
- font sizes ;
- border radius ;
- shadows ;
- spacing ;
- dimensions du Shell ;
- largeurs standards ;
- z-index structurants si nécessaire.

## 35. Interdictions de dérive
- Ne pas réintroduire `Templates` comme libellé actif ; utiliser `Modèles horaires`.
- Ne pas réintroduire `Onboarding` comme libellé actif ; utiliser `Mise en route`.
- Ne pas faire de `Privacy` une entrée métier principale.
- Ne pas ajouter des modules/fonctions absents des fiches détaillées.
- Ne pas transformer le Planning Alpha en grille heure par heure exhaustive.
- Ne pas fusionner Société et Mise en route.

## 36. Checklist globale de conformité 99 %
- Shell, sidebar et header conformes au placement de maquette.
- Titres, sous-titres, KPI et actions dans le même ordre visuel que la maquette.
- Couleurs d’état, badges et niveaux de criticité conformes.
- Structure des filtres, tableaux, panneaux détail respectée.
- Permissions visibles/masquages conformes aux fiches.
- États vides/chargement/erreur/disabled prévus.
- Aucune fonctionnalité ajoutée hors périmètre Alpha.
- Toute donnée non fournie conservée sous la mention : `INFORMATION NON FOURNIE — À CONFIRMER`.
