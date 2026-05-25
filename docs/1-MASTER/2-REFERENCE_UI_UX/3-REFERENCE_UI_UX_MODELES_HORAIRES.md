# Ambulance Manager — Référence UI/UX — Modèles horaires

Version : V2  
Statut : référence UI/UX codable  
Objectif : reproduction visuelle 99 %  
Source visuelle : docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/3-Modèles-Horaire/Modèles-Horaire_V2.png  
Source fonctionnelle : docs/1-MASTER/3-FONCTIONNALITES/3-FONCTIONNALITES_DETAILLEES_MODELES_HORAIRES_V1.1.md  

## Sommaire
- [1. Objectif du document](#1-objectif-du-document)
- [2. Sources utilisées](#2-sources-utilisées)
- [3. Règle d’autorité](#3-règle-dautorité)
- [4. Rôle de la page Modèles horaires](#4-rôle-de-la-page-modèles-horaires)
- [5. Objectif UX de la page](#5-objectif-ux-de-la-page)
- [6. Structure générale de l’écran](#6-structure-générale-de-lécran)
- [7. Layout desktop attendu](#7-layout-desktop-attendu)
- [8. En-tête de page](#8-en-tête-de-page)
- [9. Actions principales](#9-actions-principales)
- [10. Filtres et recherche](#10-filtres-et-recherche)
- [11. Tableau des modèles horaires](#11-tableau-des-modèles-horaires)
- [12. Colonne Modèle horaire](#12-colonne-modèle-horaire)
- [13. Colonne Type de véhicule](#13-colonne-type-de-véhicule)
- [14. Colonne Horaires](#14-colonne-horaires)
- [15. Colonne Composition](#15-colonne-composition)
- [16. Colonne Base / dépôt](#16-colonne-base--dépôt)
- [17. Colonne Statut](#17-colonne-statut)
- [18. Colonne Nb utilisé](#18-colonne-nb-utilisé)
- [19. Colonne Actions](#19-colonne-actions)
- [20. Création et modification visuelles](#20-création-et-modification-visuelles)
- [21. Duplication d’un modèle](#21-duplication-dun-modèle)
- [22. Statuts actif, inactif et archivé](#22-statuts-actif-inactif-et-archivé)
- [23. Badges et statuts visuels](#23-badges-et-statuts-visuels)
- [24. Boutons et actions](#24-boutons-et-actions)
- [25. États visuels à prévoir](#25-états-visuels-à-prévoir)
- [26. Hiérarchie visuelle](#26-hiérarchie-visuelle)
- [27. Espacements, dimensions et densité](#27-espacements-dimensions-et-densité)
- [28. Couleurs et ambiance visuelle](#28-couleurs-et-ambiance-visuelle)
- [29. Typographie](#29-typographie)
- [30. Icônes](#30-icônes)
- [31. Règles de permissions visibles](#31-règles-de-permissions-visibles)
- [32. Règles d’ergonomie métier](#32-règles-dergonomie-métier)
- [33. Composants réutilisables futurs](#33-composants-réutilisables-futurs)
- [34. Stratégie Tailwind future](#34-stratégie-tailwind-future)
- [35. Responsive futur](#35-responsive-futur)
- [36. Accessibilité minimale](#36-accessibilité-minimale)
- [37. Ce qui doit être codé plus tard](#37-ce-qui-doit-être-codé-plus-tard)
- [38. Ce qui ne doit pas être codé](#38-ce-qui-ne-doit-pas-être-codé)
- [39. Interdictions de dérive](#39-interdictions-de-dérive)
- [40. Checklist de conformité visuelle 99 %](#40-checklist-de-conformité-visuelle-99-)

## 1. Objectif du document
Ce document est une référence UI/UX codable pour la page **Modèles horaires**.  
Il décrit précisément l’interface à reproduire visuellement en cohérence avec la maquette V2, sans transformer ce document en validation fonctionnelle définitive.

## 2. Sources utilisées
Source visuelle de référence demandée :  
- `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/3-Modèles-Horaire/Modèles-Horaire_V2.png`

Source fonctionnelle de référence :  
- `docs/1-MASTER/3-FONCTIONNALITES/3-FONCTIONNALITES_DETAILLEES_MODELES_HORAIRES_V1.1.md`

Constat de disponibilité dans le dépôt pour la maquette exploitée :  
- `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/3-Modèles-Horaire/Modèles-Horaire_V2.png`

## 3. Règle d’autorité
Ordre d’autorité appliqué :
1. Maquette Modèles-Horaire_V2.
2. Fiche fonctionnalités Modèles horaires.
3. Aucune hypothèse.
4. Aucun ancien fichier UI/UX.
5. Aucun code existant comme source visuelle.

En cas d’écart entre visuel et métier, le rendu de structure suit la maquette, et le contenu métier suit la fiche fonctionnelle.

## 4. Rôle de la page Modèles horaires
La page **Modèles horaires** sert de référentiel de modèles réutilisables pour préparer la création de créneaux dans le Planning.  
Libellé actif obligatoire : **Modèles horaires**.  
Le libellé **Templates** ne doit pas être utilisé comme libellé actif.

## 5. Objectif UX de la page
Objectif UX principal :
- permettre de repérer, filtrer et gérer rapidement des modèles horaires ;
- réduire le temps de création des créneaux Planning ;
- conserver une lecture dense mais lisible ;
- rendre explicites statut, usage et disponibilité des actions.

Objectif UX secondaire :
- afficher des données métiers utiles sans surcharger l’écran par du reporting avancé ;
- rester aligné avec une utilisation SaaS B2B quotidienne (navigation rapide, actions immédiates).

## 6. Structure générale de l’écran
La page est intégrée dans un shell applicatif avec :
- barre latérale gauche de navigation ;
- barre supérieure globale (contexte société, profil, déconnexion) ;
- zone de contenu principal.

Dans la zone principale, l’ordre visuel attendu est :
1. titre de page + sous-texte ;
2. actions primaires en haut à droite ;
3. bande de KPI synthétiques ;
4. barre recherche + filtres ;
5. carte tableau des modèles.

## 7. Layout desktop attendu
Maquette de référence observée en format desktop : `1536 x 1024`.

Organisation attendue :
- sidebar fixe à gauche ;
- contenu principal sur fond clair avec cartes blanches ;
- largeur utile de contenu optimisée pour afficher un tableau dense à 8 colonnes ;
- alignements horizontaux stricts entre titre, KPI, filtres et tableau.

Grammaire de layout :
- blocs en cartes arrondies ;
- bordures fines ;
- ombres légères ;
- rythme vertical régulier entre sections ;
- séparation nette des zones fonctionnelles.

## 8. En-tête de page
Contenu obligatoire de l’en-tête de page :
- titre : **Modèles horaires** ;
- sous-texte descriptif en une ligne (gestion des journées types, cycles, rotations) ;
- groupe d’actions à droite.

Règles visuelles :
- titre en style fort (poids élevé, contraste élevé) ;
- sous-texte plus discret ;
- alignement vertical du titre et des boutons ;
- aucun KPI intégré dans cette ligne d’en-tête.

## 9. Actions principales
Actions visibles en haut à droite :
- bouton secondaire : **Importer des modèles** ;
- bouton primaire : **Nouveau modèle**.

Règles :
- **Nouveau modèle** est le CTA principal permanent ;
- les actions dépendent des permissions ;
- une action non autorisée est masquée ou désactivée selon la règle permissionnelle retenue globalement dans le produit ;
- les labels restent en français.

## 10. Filtres et recherche
Bloc filtres sous les KPI avec :
- champ recherche texte ;
- filtre `Statut` ;
- filtre `Type` ;
- filtre `Cycle` ;
- action `Réinitialiser`.

Règles métier à documenter dans l’UX :
- recherche sur le nom du modèle ;
- filtre d’affichage des archivés disponible ;
- un modèle archivé est masqué par défaut sauf filtre dédié ;
- un modèle inactif reste visible.

Règles d’ergonomie :
- ordre logique : recherche puis filtres puis reset ;
- filtres lisibles en un seul regard ;
- état vide de résultats avec message clair + action de réinitialisation.

## 11. Tableau des modèles horaires
Le tableau est la zone centrale de décision.

Colonnes cibles à documenter et à coder plus tard :
1. Modèle horaire
2. Type de véhicule
3. Horaires
4. Composition
5. Base / dépôt
6. Statut
7. Nb utilisé
8. Actions

Règle de cadrage visuel :
- conserver la densité et la structure d’une table 8 colonnes comme la maquette V2 ;
- adapter le contenu colonne selon la fiche fonctionnelle ;
- ne pas ajouter de colonnes non demandées.

## 12. Colonne Modèle horaire
Contenu affiché :
- ligne 1 : **nom complet** du modèle (obligatoire) ;
- ligne 2 : **libellé court Planning** si renseigné, sinon fallback sur nom complet côté Planning ;
- éventuel badge de catégorie visuelle si utilisé (style discret).

Ordre visuel :
1. nom complet, priorité forte ;
2. libellé court Planning, priorité secondaire.

Style typographique :
- nom complet en graisse moyenne/forte ;
- libellé court en style compact secondaire.

Cas vide :
- non autorisé pour le nom complet ;
- si libellé court absent, afficher indication discrète `—` ou ne pas rendre de seconde ligne.

Cas long :
- troncature contrôlée en une ligne pour le nom ;
- tooltip optionnel futur ;
- ne pas casser la densité de ligne du tableau.

Cas inactif :
- opacité de texte légèrement réduite ou badge statut explicite sans rendre le nom illisible.

Cas archivé :
- visible seulement via filtre archivés ;
- nom conservé sans suppression de contenu.

Lisibilité :
- contraste texte principal élevé ;
- interligne suffisant pour distinguer nom et libellé court.

## 13. Colonne Type de véhicule
Contenu affiché :
- valeur principale : `AMBULANCE`, `VSL`, `TAXI`, `TPMR`.

Ordre visuel :
1. badge ou libellé de type ;
2. précision TPMR si nécessaire (TPMR VSL / TPMR TAXI) en sous-texte compact.

Style :
- badge compact optionnel ;
- texte uppercase contrôlé ;
- largeur de colonne stable pour éviter le décalage des autres colonnes.

Cas vide :
- non autorisé fonctionnellement.

Cas long :
- TPMR + précision en deux niveaux visuels, sans retour à la ligne excessif.

Cas inactif :
- style inchangé sur la donnée ; état porté par la colonne Statut.

Cas archivé :
- visible uniquement dans la vue archivés.

Lisibilité :
- différenciation visuelle claire entre les 4 types principaux.

## 14. Colonne Horaires
Contenu affiché :
- plage horaire principale (`HH:mm - HH:mm`) ;
- indicateur `J+1` obligatoire si passage de nuit ;
- cas multi-plages possibles en pile compacte ;
- cas sans horaire précis : période générique (Matin, Journée, Soir).

Ordre visuel :
1. plage 1 ;
2. plage 2 si existante ;
3. période générique si modèle sans horaire.

Style :
- texte monospacé non requis ;
- alignement lisible ;
- `J+1` visuellement distinct mais discret.

Cas vide :
- autorisé uniquement pour modèle générique avec période ;
- sinon signal fonctionnel côté formulaire.

Cas long :
- limiter le nombre de lignes visibles en table ;
- synthèse compacte si horaires par jour différents.

Cas inactif :
- horaires toujours lisibles, pas d’altération métier.

Cas archivé :
- mêmes règles d’affichage que non archivé.

Lisibilité :
- priorité à la compréhension immédiate du passage nuit.

## 15. Colonne Composition
Contenu affiché :
- nombre de personnes attendues ;
- rôle principal ;
- rôles autorisés (liste compacte).

Ordre visuel :
1. quantité (`1 personne`, `2 personnes`) ;
2. rôle principal ;
3. rôles autorisés.

Style :
- première ligne plus visible ;
- lignes secondaires en style atténué ;
- séparateurs simples (virgules) pour rôles autorisés.

Cas vide :
- non autorisé pour rôle principal et nombre attendu.

Cas long :
- tronquer la liste des rôles autorisés avec indicateur de suite si nécessaire ;
- conserver l’information critique (rôle principal + quantité).

Cas inactif :
- composition affichée normalement.

Cas archivé :
- composition conservée en lecture.

Lisibilité :
- éviter les blocs texte multi-lignes trop hauts ;
- garder la densité de ligne stable.

## 16. Colonne Base / dépôt
Contenu affiché :
- base/dépôt si renseignée ;
- état optionnel explicite si non renseigné (`Aucune base` ou `—`).

Ordre visuel :
1. nom de base ;
2. aucun sous-niveau obligatoire.

Style :
- libellé simple, sans surcharge.

Cas vide :
- autorisé (champ optionnel).

Cas long :
- troncature avec tooltip futur si nécessaire.

Cas inactif :
- pas d’impact visuel spécifique sur cette donnée.

Cas archivé :
- donnée conservée.

Lisibilité :
- signaler explicitement le caractère optionnel sans créer d’alerte.

## 17. Colonne Statut
Contenu affiché :
- statut métier visible : `Actif`, `Inactif` ;
- état `Archivé` géré par filtre de vue ;
- état `Brouillon` peut exister visuellement dans la maquette, à distinguer de la validation fonctionnelle définitive.

Ordre visuel :
1. badge statut unique et explicite.

Style :
- badge compact, arrondi, contraste lisible.

Cas vide :
- non autorisé.

Cas long :
- non concerné (libellés courts).

Cas inactif :
- badge distinct de `Actif`.

Cas archivé :
- badge `Archivé` visible dans la vue archivés.

Lisibilité :
- couleurs de statut cohérentes et stables ;
- ne pas coder des libellés ambigus.

## 18. Colonne Nb utilisé
Contenu affiché :
- compteur entier d’utilisation du modèle dans le Planning.

Règle métier :
- s’incrémente lors de la création d’un créneau à partir du modèle ;
- lors d’une duplication, le nouveau modèle démarre à `0` ;
- l’historique d’utilisation du modèle source n’est pas repris.

Ordre visuel :
1. valeur numérique ;
2. unité implicite ou explicite compacte.

Style :
- alignement de préférence à droite ou centré selon grille ;
- chiffres lisibles rapidement.

Cas vide :
- afficher `0` si jamais non utilisé.

Cas long :
- gestion des grands nombres par format compact futur si nécessaire.

Cas inactif :
- compteur conservé.

Cas archivé :
- compteur conservé.

Lisibilité :
- colonne dédiée, pas de fusion avec statut.

## 19. Colonne Actions
Actions documentées :
- créer ;
- modifier ;
- dupliquer ;
- désactiver / réactiver ;
- archiver ;
- afficher les archivés ;
- restaurer / désarchiver ;
- utiliser dans le Planning si autorisé.

Affichage :
- icône crayon pour modifier ;
- menu d’actions secondaires (`...`) pour actions contextuelles ;
- boutons ou items masqués/désactivés selon permissions et statut.

Règles :
- aucune suppression physique en Alpha ;
- pour un modèle archivé, proposer restauration/désarchivage ;
- pour un modèle inactif, proposer réactivation ;
- pour un modèle actif, proposer désactivation/archivage.

## 20. Création et modification visuelles
Entrées principales :
- bouton `Nouveau modèle` pour création ;
- action `Modifier` par ligne.

Principes UX :
- création et modification partagent une structure visuelle homogène ;
- labels strictement français ;
- nom complet toujours visible comme identifiant principal ;
- libellé court Planning traité comme champ d’affichage, pas comme identifiant métier.

Rappel métier à afficher dans les aides UI :
- modifier un modèle ne modifie pas automatiquement les créneaux déjà créés.

## 21. Duplication d’un modèle
Disponibilité :
- duplication disponible en Alpha.

Règles visuelles et métier :
- action `Dupliquer` depuis la ligne ;
- ouverture d’un formulaire prérempli avec données du modèle source ;
- nom différent obligatoire ;
- nouveau compteur `Nb utilisé = 0` ;
- aucun historique d’utilisation repris.

Feedback utilisateur :
- confirmation de duplication réussie ;
- message explicite si nom déjà utilisé.

## 22. Statuts actif, inactif et archivé
Séparation des notions :
- `Actif/Inactif` = disponibilité opérationnelle ;
- `Archivé/Non archivé` = visibilité dans la liste principale.

Règles :
- actif : proposé normalement dans le Planning ;
- inactif : visible dans la liste mais non proposé normalement dans le Planning ;
- archivé : masqué de la liste principale, visible via filtre dédié ;
- désarchiver ne réactive pas automatiquement un modèle inactif.

## 23. Badges et statuts visuels
Badges à prévoir :
- badge statut (`Actif`, `Inactif`, `Archivé`, `Brouillon` si retenu visuellement) ;
- badge type véhicule (`AMBULANCE`, `VSL`, `TAXI`, `TPMR`) ;
- badge de catégorie de modèle si exploité visuellement (ex. standard/rotation/spécifique).

Règles de style :
- badges compacts et homogènes ;
- contraste suffisant ;
- couleurs d’état non agressives ;
- pas de couleur métier rigide imposée au modèle horaire.

## 24. Boutons et actions
Hiérarchie :
- primaire : `Nouveau modèle` ;
- secondaire : `Importer des modèles` ;
- tertiaire : `Réinitialiser`, actions de ligne.

États visuels de boutons :
- normal ;
- hover ;
- focus ;
- disabled ;
- loading.

Règles :
- texte de bouton explicite ;
- icône + libellé pour les actions de haut de page ;
- boutons de ligne compacts pour conserver la densité tableau.

## 25. États visuels à prévoir
États obligatoires :
- chargement initial ;
- liste vide (aucun modèle) ;
- aucun résultat après filtres/recherche ;
- erreur de chargement ;
- accès non autorisé ;
- action non autorisée ;
- vue archivés vide.

Règles UX :
- chaque état doit fournir un message utile ;
- proposer une action de sortie (`Réessayer`, `Réinitialiser`, `Créer`) quand pertinent ;
- aucune fuite technique visible (stack, JSON brut, debug brut).

## 26. Hiérarchie visuelle
Niveau 1 :
- titre de page.

Niveau 2 :
- actions principales.

Niveau 3 :
- KPI synthèse.

Niveau 4 :
- barre filtres/recherche.

Niveau 5 :
- tableau détaillé et actions ligne.

Principe :
- l’utilisateur comprend en moins de 3 secondes où créer, filtrer et agir.

## 27. Espacements, dimensions et densité
Référentiel de densité observé :
- cartes avec rayon modéré ;
- espaces verticaux réguliers entre blocs ;
- tableau dense avec hauteur de ligne courte à moyenne ;
- en-tête de tableau plus compact que les cartes KPI.

Cibles de dimensionnement (à ajuster au pixel près lors de l’intégration) :
- grand conteneur principal centré dans la zone de contenu ;
- marge intérieure homogène dans chaque carte ;
- colonnes Actions et Statut plus étroites que Modèle/Horaires/Composition ;
- pagination compacte en pied de tableau.

Règles :
- conserver la densité B2B, éviter un design trop aéré ;
- éviter les variations de hauteur de ligne non maîtrisées ;
- alignement horizontal strict des colonnes sur toutes les lignes.

## 28. Couleurs et ambiance visuelle
Ambiance visuelle attendue :
- fond applicatif clair ;
- surfaces blanches ;
- bordures fines gris bleu ;
- texte principal bleu nuit ;
- CTA primaire bleu vif ;
- badges statut en teintes douces (vert, orange, rouge, gris selon état).

Règles métier couleur :
- la couleur ne doit pas être définie rigidement dans le modèle horaire ;
- la couleur reste un repère visuel choisi au moment approprié dans le Planning ;
- pas de contrainte couleur bloquante.

## 29. Typographie
Hiérarchie typographique attendue :
- titre de page : très lisible, poids fort ;
- sous-texte : plus petit, contraste moyen ;
- titres de cartes/table : intermédiaire, poids medium ;
- cellules tableau : taille compacte orientée productivité ;
- métadonnées secondaires : taille réduite.

Règles de lisibilité :
- contraste suffisant sur tous les textes ;
- éviter les textes trop fins ;
- troncature contrôlée sur les cellules longues ;
- alignements constants entre entêtes et cellules.

## 30. Icônes
Icônes visibles à prévoir :
- loupe pour recherche ;
- crayon pour modifier ;
- menu `...` pour actions contextuelles ;
- icônes de KPI (activité, calendrier, usage, équipes) ;
- icône reset ;
- icônes de navigation shell.

Règles :
- style d’icônes cohérent (trait léger homogène) ;
- taille cohérente selon contexte (navigation, KPI, actions ligne) ;
- icônes toujours accompagnées d’un libellé pour les actions principales.

## 31. Règles de permissions visibles
Règles d’affichage :
- utilisateur sans accès : page non visible ou message d’accès non autorisé ;
- utilisateur en lecture : tableau visible, actions d’édition non disponibles ;
- utilisateur autorisé : actions selon permission fine.

Actions soumises à permission :
- créer ;
- modifier ;
- dupliquer ;
- désactiver/réactiver ;
- archiver ;
- afficher archivés ;
- restaurer/désarchiver ;
- utiliser dans le Planning.

Règle :
- cette page n’est pas l’endroit pour modifier les permissions.

## 32. Règles d’ergonomie métier
Règles obligatoires à refléter visuellement :
- un modèle horaire sert de base de création pour un créneau Planning ;
- modifier un modèle ne modifie pas automatiquement les créneaux déjà créés ;
- un modèle inactif reste visible mais non proposé normalement dans le Planning ;
- un modèle archivé est masqué sauf filtre dédié ;
- désarchiver ne réactive pas automatiquement un modèle inactif ;
- aucune suppression physique en Alpha ;
- base/dépôt optionnelle ;
- base/dépôt peut guider sans bloquer l’usage ailleurs ;
- libellé court Planning documenté comme affichage Planning ;
- compteur Nb utilisé incrémenté à la création d’un créneau depuis le modèle ;
- la couleur du modèle n’est pas une règle métier obligatoire.

## 33. Composants réutilisables futurs
Composants futurs à prévoir (sans création dans ce fix) :
- `components/templates/ShiftTemplatesPage`
- `components/templates/ShiftTemplateTable`
- `components/templates/ShiftTemplateRow`
- `components/templates/ShiftTemplateForm`
- `components/templates/ShiftTemplateDuplicateAction`
- `components/templates/ShiftTemplateStatusBadge`
- `components/templates/ShiftTemplateFilters`
- `components/ui/PageHeader`
- `components/ui/Card`
- `components/ui/Table`
- `components/ui/Badge`
- `components/ui/Button`
- `components/ui/Input`
- `components/ui/Select`
- `components/ui/EmptyState`
- `components/ui/LoadingState`

Rôle attendu :
- séparer clairement structure de page, logique de table, badges, filtres et états.

## 34. Stratégie Tailwind future
Stratégie à documenter pour implémentation future, sans générer de configuration :
- grille de page dédiée au shell + contenu ;
- largeur tableau contrainte pour lisibilité ;
- padding de contenu homogène ;
- gap régulier entre header, KPI, filtres, table ;
- rayons de cartes constants ;
- bordures fines et ombres légères ;
- palette d’états (actif, inactif, brouillon, archivé) ;
- badges type véhicule dédiés ;
- tailles de colonnes explicites ;
- densité tableau pilotée (hauteur ligne, taille police, padding cellule) ;
- états hover/focus/disabled homogènes ;
- stratégie responsive desktop/tablette/mobile anticipée.

Règle :
- ne pas figer ici de configuration Tailwind globale du projet.

## 35. Responsive futur
Desktop (référence immédiate) :
- rendu fidèle de la maquette.

Tablette (future itération) :
- réduction progressive des colonnes secondaires ;
- regroupement d’actions si nécessaire.

Mobile (future itération) :
- bascule vers cartes/lignes empilées ;
- accès actions via menu contextuel ;
- priorité d’affichage : nom, statut, horaires, type.

Règle :
- responsive à préparer sans dégrader la version desktop de référence.

## 36. Accessibilité minimale
Exigences minimales :
- contraste texte/fond suffisant ;
- focus visible sur tous les éléments interactifs ;
- labels explicites des boutons/icônes ;
- navigation clavier utilisable sur filtres, tableau et actions ;
- états disabled lisibles ;
- messages d’erreur compréhensibles ;
- structure de table interprétable (entêtes claires, ordre logique).

## 37. Ce qui doit être codé plus tard
À coder plus tard :
- page complète Modèles horaires fidèle à la maquette ;
- tableau 8 colonnes métier définies dans ce document ;
- filtres/recherche et affichage archivés ;
- workflow création, modification, duplication ;
- gestion visuelle active/inactive/archivée ;
- compteur Nb utilisé ;
- gestion des permissions d’affichage d’actions ;
- états loading/empty/error/access.

Rappel :
- ce document est une référence UI/UX codable, pas une validation fonctionnelle définitive.

## 38. Ce qui ne doit pas être codé
Ne doit pas être codé :
- ancien libellé `Templates` comme libellé actif ;
- suppression physique ;
- modification automatique des créneaux déjà créés ;
- couleur obligatoire figée dans le modèle ;
- contrainte bloquante stricte par base/dépôt ;
- planification automatique avancée ;
- scoring ;
- optimisation ;
- calcul complet des heures ;
- règles RH avancées ;
- modification des permissions depuis cette page ;
- debug visible ;
- JSON visible.

## 39. Interdictions de dérive
Interdictions :
- dériver vers une page de reporting avancé ;
- introduire des colonnes non demandées ;
- mélanger la logique active/inactive avec la logique archivé ;
- ajouter une action de suppression physique ;
- imposer des couleurs métier rigides dans le modèle ;
- réintroduire un libellé actif en anglais ;
- utiliser un ancien document UI/UX comme source visuelle.

## 40. Checklist de conformité visuelle 99 %
- Le titre actif affiché est `Modèles horaires`.
- Le libellé `Templates` n’est pas utilisé comme libellé actif.
- Le shell reprend sidebar, topbar et zone contenu comme la maquette.
- Les actions haut de page incluent `Importer des modèles` et `Nouveau modèle`.
- La bande KPI est présente avant les filtres.
- La barre filtres contient recherche, statut, type, cycle et réinitialisation.
- Le tableau principal est en carte dédiée.
- Les 8 colonnes cibles sont présentes : Modèle horaire, Type de véhicule, Horaires, Composition, Base/dépôt, Statut, Nb utilisé, Actions.
- Le nom complet est prioritaire visuellement.
- Le libellé court Planning est traité comme donnée d’affichage Planning.
- Les types véhicules affichent AMBULANCE, VSL, TAXI, TPMR.
- Les horaires de nuit affichent `J+1`.
- La composition affiche rôle principal, rôles autorisés, nombre attendu.
- La base/dépôt est traitée comme optionnelle.
- Les statuts actif, inactif et archivé sont distingués clairement.
- Le compteur Nb utilisé est visible et dédié.
- Les actions ligne couvrent modifier, dupliquer, désactiver/réactiver, archiver, restaurer selon permissions.
- L’option d’afficher les archivés est disponible.
- L’archivage ne déclenche pas de suppression physique.
- Le désarchivage ne réactive pas automatiquement un modèle inactif.
- Les états loading, vide, erreur et accès non autorisé sont définis.
- Les badges et boutons ont des états hover/focus/disabled.
- La densité tableau reste B2B (lisible et compacte).
- Les espacements et alignements restent cohérents entre blocs.
- L’ambiance colorée reste claire avec contrastes maîtrisés.
- Aucune couleur métier obligatoire n’est imposée dans le modèle.
- Les icônes sont homogènes et explicites.
- Les règles de permissions sont visibles sans éditer les permissions ici.
- La stratégie Tailwind reste au niveau guide, sans config projet.
- Le responsive est cadré comme futur, sans casser la référence desktop.
- Le document reste une référence UI/UX codable, distincte d’une validation fonctionnelle définitive.
