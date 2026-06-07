# Ambulance Manager — Référence UI/UX — Planning

Version : V2.2  
Statut : référence UI/UX codable  
Objectif : reproduction visuelle 99 %  
Sources visuelles :
- docs/1-MASTER/1-MAQUETTE/4-Planning/Planning_Vue-Global_V2.2.png
- docs/1-MASTER/1-MAQUETTE/4-Planning/Planning_Vue-Personnelle_V2.1.png
- docs/1-MASTER/1-MAQUETTE/4-Planning/Planning_Vue-Mois_V2.1.png
- docs/1-MASTER/1-MAQUETTE/4-Planning/Planning_Vue-Semaine_V2.2.png
- docs/1-MASTER/1-MAQUETTE/4-Planning/Planning_Vue-Jour_V2.png
Source fonctionnelle : docs/1-MASTER/3-FONCTIONNALITES/4-FONCTIONNALITES_DETAILLEES_PLANNING_V1.1.md  

## Sommaire
- [1. Objectif du document](#1-objectif-du-document)
- [2. Sources utilisées](#2-sources-utilisées)
- [3. Règle d’autorité](#3-règle-dautorité)
- [4. Rôle de la page Planning](#4-rôle-de-la-page-planning)
- [5. Objectif UX de la page](#5-objectif-ux-de-la-page)
- [6. Structure générale de l’écran](#6-structure-générale-de-lécran)
- [7. Layout desktop attendu](#7-layout-desktop-attendu)
- [8. Navigation entre les vues](#8-navigation-entre-les-vues)
- [9. En-tête de page](#9-en-tête-de-page)
- [10. Filtres globaux](#10-filtres-globaux)
- [11. Sélecteurs de période](#11-sélecteurs-de-période)
- [12. Actions principales](#12-actions-principales)
- [13. Statuts de publication](#13-statuts-de-publication)
- [14. Alertes et conflits simples](#14-alertes-et-conflits-simples)
- [15. Indicateur utilisateurs terrain disponibles](#15-indicateur-utilisateurs-terrain-disponibles)
- [16. Besoins hebdomadaires et couverture](#16-besoins-hebdomadaires-et-couverture)
- [17. Affectation utilisateurs](#17-affectation-utilisateurs)
- [18. Affectation véhicules](#18-affectation-véhicules)
- [19. Panneau de détail](#19-panneau-de-détail)
- [20. Vue globale annuelle](#20-vue-globale-annuelle)
- [21. Matrice annuelle utilisateurs x semaines](#21-matrice-annuelle-utilisateurs-x-semaines)
- [22. Cases de la matrice annuelle](#22-cases-de-la-matrice-annuelle)
- [23. Vue personnelle](#23-vue-personnelle)
- [24. Vue mois](#24-vue-mois)
- [25. Vue semaine](#25-vue-semaine)
- [26. Vue jour](#26-vue-jour)
- [27. États métier des cases](#27-états-métier-des-cases)
- [28. Badges modèles horaires](#28-badges-modèles-horaires)
- [29. Annotations samedi dimanche jour férié week-end](#29-annotations-samedi-dimanche-jour-férié-week-end)
- [30. États brouillon publié modifié annulé](#30-états-brouillon-publié-modifié-annulé)
- [31. Historique minimal visible](#31-historique-minimal-visible)
- [32. Tableaux listes et grilles](#32-tableaux-listes-et-grilles)
- [33. Boutons et actions](#33-boutons-et-actions)
- [34. Badges et statuts visuels](#34-badges-et-statuts-visuels)
- [35. Icônes et pictogrammes](#35-icônes-et-pictogrammes)
- [36. Hiérarchie visuelle](#36-hiérarchie-visuelle)
- [37. Espacements dimensions et densité](#37-espacements-dimensions-et-densité)
- [38. Couleurs et ambiance visuelle](#38-couleurs-et-ambiance-visuelle)
- [39. Typographie](#39-typographie)
- [40. États visuels à prévoir](#40-états-visuels-à-prévoir)
- [41. Règles de permissions visibles](#41-règles-de-permissions-visibles)
- [42. Règles d’ergonomie métier](#42-règles-dergonomie-métier)
- [43. Composants réutilisables futurs](#43-composants-réutilisables-futurs)
- [44. Stratégie Tailwind future](#44-stratégie-tailwind-future)
- [45. Responsive futur](#45-responsive-futur)
- [46. Accessibilité minimale](#46-accessibilité-minimale)
- [47. Ce qui doit être codé plus tard](#47-ce-qui-doit-être-codé-plus-tard)
- [48. Ce qui ne doit pas être codé](#48-ce-qui-ne-doit-pas-être-codé)
- [49. Interdictions de dérive](#49-interdictions-de-dérive)
- [50. Checklist de conformité visuelle 99 %](#50-checklist-de-conformité-visuelle-99-)

## 1. Objectif du document
Ce document est une référence UI/UX codable pour la page Planning et ses 5 vues (globale annuelle, personnelle, mois, semaine, jour).  
La cible est la reproduction visuelle à 99 % des maquettes listées, sans interprétation libre d’interface.  
Ce document ne vaut pas validation fonctionnelle définitive : il décrit comment coder l’UI/UX attendue avec fidélité.

## 2. Sources utilisées
Sources visuelles utilisées exclusivement pour le rendu :
- Planning_Vue-Global_V2.2.png.
- Planning_Vue-Personnelle_V2.1.png.
- Planning_Vue-Mois_V2.1.png.
- Planning_Vue-Semaine_V2.2.png.
- Planning_Vue-Jour_V2.png.

Source fonctionnelle utilisée exclusivement pour les règles métier visibles :
- 4-FONCTIONNALITES_DETAILLEES_PLANNING_V1.1.md.

Aucune autre source n’est utilisée pour définir l’interface de cette référence.

## 3. Règle d’autorité
Ordre d’autorité obligatoire :
1. Maquettes Planning version la plus élevée (V2.2 prioritaire sur V2.1 et V2).
2. Fiche fonctionnalités Planning V1.1.
3. Aucune hypothèse non couverte par les deux sources ci-dessus.
4. Aucun ancien fichier UI/UX comme source d’arbitrage.
5. Aucun code existant comme source visuelle.

Règle de conflit :
- Si visuel maquette et texte fonctionnel divergent, la structure visuelle suit la maquette et la règle métier visible suit la fiche.
- Toute information manquante doit être signalée explicitement en “Points à confirmer”, jamais inventée.

## 4. Rôle de la page Planning
La page Planning est l’écran SaaS de préparation, affectation et publication des semaines de travail.  
Elle orchestre un planning manuel métier (Alpha) basé sur :
- modèles horaires ;
- besoins hebdomadaires ;
- affectations utilisateurs ;
- affectations véhicules ;
- statuts de publication ;
- alertes simples et conflits évidents.

La page n’est pas une régulation temps réel, ni une gestion de missions, ni un module RH/paie/facturation.

## 5. Objectif UX de la page
Objectif UX principal : donner une lecture synthétique, dense et actionnable du planning sans basculer vers une grille heure par heure détaillée partout.

Objectifs UX opérationnels :
- permettre la navigation rapide entre 5 vues cohérentes ;
- exposer les priorités de couverture (couvert, incomplet, à couvrir, à vérifier, non affecté) ;
- distinguer clairement les états métier simples (REPOS, ABSENT, INDISPONIBLE, NON PLANIFIÉ, À AFFECTER) ;
- permettre les actions de gestion uniquement aux profils autorisés ;
- conserver une lecture terrain simple pour les utilisateurs non gestionnaires.

## 6. Structure générale de l’écran
Structure de page visible commune aux 5 vues :
- shell applicatif avec sidebar gauche, topbar haute, zone contenu principale ;
- titre “Planning” + sous-titre “Préparation, affectations et publication des semaines.” ;
- barre d’onglets des vues ;
- ligne de pilotage période/statut/actions ;
- ligne de filtres globaux (selon vue) ;
- bandeau KPI synthétique ;
- bloc de données principal (matrice/table/grille/listing) ;
- panneau de détail latéral droit ;
- légende des badges/statuts (là où présente dans la maquette).

Comportement structurel attendu :
- le panneau de détail est visible en desktop et change de contenu à la sélection ;
- la zone centrale reste prioritaire en largeur ;
- les cellules restent synthétiques, les détails riches sont hors cellule dans le panneau.

## 7. Layout desktop attendu
Référence de maquette desktop : 1535/1536 px de large, 1024 px de haut.

Découpage visuel cible :
- sidebar gauche fixe : environ 232 px ;
- topbar shell : environ 56 px de hauteur ;
- contenu Planning : padding horizontal d’environ 24 px ;
- grille centrale + panneau droit : environ 78–82 % / 18–22 % selon la vue.

Règles d’alignement :
- alignement gauche constant des titres, onglets et blocs ;
- alignement en grille des cartes KPI ;
- alignement vertical des filtres sur une même baseline ;
- alignement du panneau détail avec le haut du bloc de données principal.

## 8. Navigation entre les vues
Ordre obligatoire des onglets :
- Vue globale annuelle ;
- Vue personnelle ;
- Vue mois ;
- Vue semaine ;
- Vue jour.

Comportement visuel des onglets :
- texte foncé pour inactif ;
- texte bleu accent + barre inférieure bleue pour actif ;
- séparation horizontale fine sous la barre d’onglets.

Comportement UX :
- changement de vue dans la même page module ;
- conservation de la logique de période cohérente par vue ;
- aucune navigation cachée remplaçant les 5 onglets.

## 9. En-tête de page
L’en-tête de contenu Planning comprend :
- titre H1 “Planning” ;
- sous-titre descriptif ;
- onglets de vues immédiatement sous le sous-titre.

L’en-tête shell (hors module Planning) reste visible avec :
- sélecteur de société ;
- bouton thème ;
- avatar et rôle ;
- action déconnexion.

La page Planning ne doit pas masquer l’en-tête shell en desktop.

## 10. Filtres globaux
Filtres observés et à conserver dans le système de filtres Planning :
- Utilisateur ;
- Rôle ;
- Base / dépôt ;
- Modèle / Type ;
- Statut planning ;
- État couverture ;
- Véhicule (vue jour) ;
- État (vue jour).

Règles visuelles :
- composants de type select avec libellé au-dessus et valeur en dessous ;
- valeur par défaut “Tous” ;
- boutons “Filtres” et “Réinitialiser” affichés à droite ;
- hauteur homogène des contrôles sur la ligne.

Règles UX :
- filtres visibles adaptés à la vue active ;
- reset global sans rechargement de page ;
- pas de filtre inventé hors sources.

## 11. Sélecteurs de période
Sélecteurs de période obligatoires par vue :
- Vue globale annuelle : select Année + bouton Aujourd’hui + bouton Année courante.
- Vue personnelle : flèche précédent + select semaine (libellé avec dates) + flèche suivante + bouton Aujourd’hui.
- Vue mois : flèche précédent + select mois/année + flèche suivante + bouton Aujourd’hui.
- Vue semaine : flèche précédent + select semaine + flèche suivante + carte plage de dates semaine.
- Vue jour : flèche précédent + select date + flèche suivante + boutons Aujourd’hui et Demain.

Règles de lisibilité :
- les libellés de période incluent les dates explicites ;
- le retour à la période courante est toujours accessible par bouton dédié.

## 12. Actions principales
Actions observées dans les maquettes à documenter :
- Créer une affectation ;
- Appliquer sur plusieurs semaines ;
- Publier la semaine ;
- Définir les besoins ;
- Annuler ;
- Historique ;
- Export PDF ;
- Export Excel ;
- Imprimer ;
- Voir la semaine (Sxx) ;
- Voir les besoins ;
- Historique des modifications.

Règles de présentation :
- actions primaires en bouton bleu plein ;
- actions secondaires en bouton bordé ;
- action destructive en style danger (rouge, fond clair rouge).

Règles d’accès :
- affichage/activation conditionnés par permissions ;
- action non autorisée masquée ou désactivée ;
- accès direct non autorisé vers “Accès refusé”.

## 13. Statuts de publication
Statuts visibles à maintenir :
- Brouillon ;
- Publié ;
- Modifié après publication ;
- Annulé ;
- À vérifier.

Règles UX :
- le statut est visible en carte de statut (global/semaine/jour) ;
- le statut peut aussi apparaître dans les lignes/cases ;
- un libellé textuel est obligatoire, la couleur seule est interdite.

Règle métier associée :
- après publication, modification sensible et annulation doivent rester traçables ;
- suppression physique interdite après publication ;
- motif obligatoire pour annulation après publication et pour modification sensible après publication.

## 14. Alertes et conflits simples
Alertes/conflits visibles dans le périmètre Alpha :
- besoin non couvert ;
- affectation incomplète ;
- conflit détecté ;
- à vérifier ;
- non affecté ;
- alerte véhicule ;
- alerte utilisateur ;
- alerte modèle.

Règles d’affichage :
- alertes en KPI + badges dans tableaux/grilles ;
- icône dédiée (exclamation, alerte, info) + libellé ;
- surlignage léger de ligne pour cas critique (ex. conflit).

Règles métier :
- système d’alerte simple, non expert ;
- aucune décision automatique de planification/indisponibilité véhicule.

## 15. Indicateur utilisateurs terrain disponibles
Indicateur KPI attendu :
- libellé “Utilisateurs terrain disponibles” ;
- format “valeur / total” (ex. 42 / 48) ;
- positionné dans la bande KPI des vues globales/semaine.

Règles métier d’alimentation (référence fonctionnelle) :
- inclure utilisateurs actifs et non archivés ;
- exclure utilisateurs absents ou indisponibles ;
- ne pas exclure automatiquement une demande d’absence en attente.

Règles de visibilité :
- visible en gestion ;
- lecture simplifiée côté terrain selon permissions.

## 16. Besoins hebdomadaires et couverture
La vue semaine doit contenir une “Checklist des besoins hebdomadaires”.

Colonnes visibles de la checklist :
- Besoin ;
- Modèle horaire ;
- Type véhicule attendu ;
- Composition attendue ;
- Utilisateur(s) affecté(s) ;
- Véhicule affecté ;
- État de couverture ;
- Actions.

États de couverture obligatoires :
- Couvert ;
- Incomplet ;
- À couvrir ;
- À vérifier ;
- Non affecté.

Règles UX :
- badges d’état couleur + texte ;
- KPI de couverture en tête de vue semaine ;
- légende explicite en bas de vue.

## 17. Affectation utilisateurs
Règles UI/UX d’affectation utilisateurs :
- affectation manuelle (Alpha) ;
- choix depuis checklist besoins et/ou détail d’affectation ;
- visualisation des utilisateurs déjà affectés ;
- affichage équipe/binôme dans les vues personnelle, semaine, jour.

Règles de proposition :
- utilisateurs inactifs, archivés, absents, indisponibles non proposés normalement ;
- conflits évidents signalés visuellement ;
- base/dépôt guide la sélection mais ne bloque pas automatiquement.

Actions associées visibles en gestion :
- Affecter un utilisateur ;
- Remplacer une affectation ;
- Marquer à vérifier ;
- Annuler après publication (si autorisé).

## 18. Affectation véhicules
Règles UI/UX d’affectation véhicules :
- affectation manuelle (Alpha) ;
- affichage du véhicule dans vues personnelle/semaine/jour et panneau détail ;
- type véhicule cohérent avec le besoin attendu.

Règles de proposition :
- véhicules inactifs, archivés ou indisponibles non proposés normalement ;
- distinction TPMR VSL / TPMR TAXI à conserver ;
- base/dépôt guide la proposition sans blocage automatique.

Règles d’exclusion métier :
- anomalies, vérifications, désinfections ne rendent pas automatiquement un véhicule indisponible ;
- aucune indisponibilité automatique véhicule depuis le Planning.

## 19. Panneau de détail
Le panneau droit est obligatoire dans les vues globale, personnelle, mois, semaine et jour.

Contenu minimal attendu :
- titre de contexte (cellule/jour/semaine) ;
- date/période ;
- statut ;
- modèle/type ;
- utilisateur, rôle, base/dépôt ;
- véhicule et équipe/binôme quand disponibles ;
- bloc informations ;
- historique minimal ;
- actions disponibles selon permissions.

Règles UX :
- fermeture par icône “X” ;
- contenu piloté par sélection dans la grille/table ;
- panneau non surchargé, priorité à la lecture et aux actions utiles.

## 20. Vue globale annuelle
Objectif de la vue : pilotage synthétique annuel des affectations par utilisateur et par semaine.

Éléments obligatoires visibles :
- barre d’onglets avec vue active ;
- sélection d’année ;
- statut global ;
- actions de gestion (création, application multi-semaines, publication, exports, impression) ;
- filtres globaux ;
- KPI (disponibles, publiées, incomplètes, modifiées, à vérifier) ;
- matrice utilisateurs x semaines ;
- panneau détail cellule ;
- légende statuts/types/couverture.

Interdits de surcharge :
- pas d’historique détaillé dans la cellule ;
- pas de surcharge véhicule détaillée dans la cellule ;
- pas de contenu multi-lignes dense dans la cellule.

## 21. Matrice annuelle utilisateurs x semaines
Structure matrice :
- lignes = utilisateurs ;
- colonnes fixes gauche = Utilisateur, Rôle, Base/Dépôt ;
- colonnes dynamiques = semaines (S20, S21, S22, etc.) avec dates sous en-tête ;
- colonne actions ligne (menu “…”).

Comportement d’affichage :
- scrolling horizontal possible sur semaines ;
- cellules compactes de même hauteur ;
- accent visuel sur semaine sélectionnée si clic.

Priorité de lecture :
- identifier rapidement qui est planifié sur quelle semaine ;
- visualiser les états simples et les anomalies via badges/icônes légères.

## 22. Cases de la matrice annuelle
Règles de case obligatoires :
- fond blanc de case conservé ;
- badge coloré interne contenant le libellé court Planning ;
- libellé prioritaire du badge = libellé court Planning du modèle horaire.

Contenu autorisé dans la case :
- un badge principal (AMB, VSL, TAXI, GARDE, REPOS, ABSENT, INDISP., NON PLANIFIÉ, À AFFECTER) ;
- un indicateur secondaire léger (icône état couverture, modifié, à vérifier).

Contenu interdit dans la case :
- texte long ;
- historique ;
- bloc d’actions ;
- détail complet véhicule/équipe multi-lignes.

Interaction :
- clic sur case ouvre le panneau détail ;
- actions de modification/duplication/remplacement depuis le panneau selon permissions.

## 23. Vue personnelle
Objectif de la vue : lecture simple du planning de l’utilisateur connecté.

Structure visible :
- en-tête “Mon planning” ;
- navigation de semaine ;
- statut du planning ;
- bandeau informationnel “Votre planning peut être modifié…” ;
- liste des jours de la semaine en lignes ;
- panneau détail du jour ;
- bandeau d’information bas de page.

Contenu d’une ligne jour :
- jour + numéro ;
- horaire (si connu) ;
- badge modèle/type ;
- véhicule ;
- équipe/binôme ;
- annotation week-end éventuelle ;
- action “Détail”.

Règles UX :
- lecture terrain prioritaire ;
- informations sensibles masquées si non autorisé ;
- pas de surcharge d’actions de gestion pour un utilisateur non autorisé.

## 24. Vue mois
Objectif de la vue : vision calendaire synthétique, utile pour l’organisation personnelle et le repérage opérationnel.

Structure visible :
- navigation mois ;
- bouton Aujourd’hui ;
- filtres adaptés (utilisateur/base/rôle) ;
- actions export/impression ;
- KPI mensuels ;
- grille 7 colonnes Lun→Dim ;
- panneau détail du jour ;
- légende modèles/statuts/couverture ;
- carte d’aide (“cliquez sur un jour…”).

Contenu d’une cellule jour :
- numéro de jour ;
- badge principal (modèle/type ou état) ;
- ratio de couverture (ex. 9/10) ;
- icône d’état couverture ;
- annotation week-end et/ou férié si applicable.

Interdits :
- détail heure par heure complet dans la cellule ;
- surcharge d’actions gestion dans la grille.

## 25. Vue semaine
Objectif de la vue : pilotage de couverture et de préparation hebdomadaire.

Structure visible :
- navigation de semaine + plage de dates ;
- statut de la semaine ;
- actions gestion (définir besoins, créer affectation, publier, annuler, historique) ;
- KPI de couverture ;
- section 1 : checklist des besoins hebdomadaires ;
- section 2 : semaine par jours (synthèse) ;
- panneau détail de la semaine ;
- légende couverture + aide action.

Règles métier visibles :
- besoins gérés manuellement ;
- affectations utilisateurs/véhicules selon permissions ;
- états couverture exposés clairement ;
- alertes simples de couverture visibles.

Interdits :
- transformer cette vue en planning détaillé heure par heure de tous les créneaux.

## 26. Vue jour
Objectif de la vue : synthèse opérationnelle de la journée.

Structure visible :
- navigation jour (précédent/suivant, Aujourd’hui, Demain) ;
- statut du jour ;
- switch de mode de vue (liste/grille) ;
- filtres (utilisateur, rôle, base/dépôt, véhicule, état) ;
- KPI du jour ;
- tableau des affectations du jour ;
- panneau détail du jour ;
- légende états ;
- bandeau aide bas de page.

Colonnes tableau jour :
- Utilisateur ;
- Rôle ;
- Modèle / Type ;
- État ;
- Véhicule ;
- Équipe / Binôme ;
- Base / Dépôt ;
- Annotation ;
- Statut ;
- Actions.

Règles UX :
- montrer les éléments à affecter et les conflits évidents ;
- afficher heure de début/fin si applicable ;
- ne pas transformer la vue en régulation temps réel.

## 27. États métier des cases
États métier simples obligatoires :
- REPOS ;
- ABSENT ;
- INDISPONIBLE ;
- NON PLANIFIÉ ;
- À AFFECTER.

Règle critique :
- NON PLANIFIÉ doit rester explicitement distinct de ABSENT (libellé + couleur + contexte).

Règles de représentation :
- état affiché dans un badge lisible ;
- badge toujours textuel ;
- si icône, elle complète le texte et ne le remplace pas.

## 28. Badges modèles horaires
Règle principale : le badge affiche le libellé court Planning du modèle horaire quand il existe.

Libellés courts observés à conserver dans la logique visuelle :
- AMB ;
- VSL ;
- TAXI ;
- TPMR ;
- GARDE ;
- REPOS ;
- ABSENT ;
- INDISP. ;
- NON PLANIFIÉ ;
- À AFFECTER.

Règles de badge :
- forme capsule/rectangle arrondi ;
- fond coloré léger ;
- texte coloré à contraste fort ;
- hauteur homogène ;
- padding horizontal compact pour densité.

## 29. Annotations samedi dimanche jour férié week-end
Annotations calendaires légères obligatoires :
- samedi ;
- dimanche ;
- jour férié ;
- week-end.

Règles visuelles :
- annotation en badge léger, non dominant ;
- distinction chromatique douce pour ne pas écraser l’information planning ;
- samedi et dimanche identifiables en un coup d’œil ;
- possibilité d’annotation dans case mois, ligne personnelle et synthèse semaine.

Règle métier :
- ces annotations servent de repères, pas de mécanisme automatique de règles RH.

## 30. États brouillon publié modifié annulé
Cycle visuel attendu :
- Brouillon : préparation non publiée ;
- Publié : information diffusée aux utilisateurs concernés ;
- Modifié après publication : publié puis ajusté ;
- Annulé : annulation logique tracée ;
- À vérifier : nécessite contrôle de gestion.

Affichages requis :
- badge dans la carte statut de vue ;
- indicateur dans les lignes/cases concernées ;
- historique visible en gestion.

Contrainte forte :
- aucune suppression physique après publication ;
- suppression/vidage autorisés uniquement en brouillon.

## 31. Historique minimal visible
Historique minimal visible dans les panneaux détail de gestion :
- créé par + date/heure ;
- publié par + date/heure ;
- modifié par + date/heure ;
- statut courant.

Règles UX :
- historique concis, lisible sans scroll excessif ;
- ordre antéchronologique ou regroupé par type ;
- pas de journal technique brut (JSON/debug) dans l’UI.

Règles de visibilité :
- historique détaillé réservé aux permissions de gestion ;
- lecture terrain limitée à l’information utile.

## 32. Tableaux listes et grilles
Structures de données visibles à reproduire :
- matrice annuelle compacte ;
- liste personnelle par jours ;
- grille mensuelle calendaire ;
- tableau checklist besoins ;
- synthèse semaine par jours ;
- tableau affectations du jour.

Règles de densité :
- lignes compactes mais respirantes ;
- colonnes alignées ;
- alternance légère/hover pour guidage visuel ;
- titres de colonnes stables ;
- légendes visibles en bas quand présentes sur maquette.

## 33. Boutons et actions
Typologies visuelles :
- primaire : fond bleu plein, texte blanc ;
- secondaire : fond blanc, bordure fine, texte foncé ;
- utilitaire : icône + texte (export/impression/filtres) ;
- danger : fond rouge très léger + texte rouge.

Règles d’interaction :
- hover et focus visibles ;
- disable lisible ;
- état sélectionné visible pour switches (ex. vue liste/grille).

Règles métier :
- actions de gestion seulement si autorisées ;
- actions sensibles avec motif si requis par règle fonctionnelle.

## 34. Badges et statuts visuels
Familles de badges à maintenir :
- badges modèle/type ;
- badges état simple ;
- badges couverture ;
- badges statut publication ;
- badges annotation calendrier.

Règles communes :
- rayon arrondi homogène ;
- hauteur homogène ;
- texte court ;
- contraste suffisant ;
- combinaison couleur + libellé obligatoire.

Exemples de statuts visuels à couvrir :
- Couvert ;
- Incomplet ;
- À couvrir ;
- À vérifier ;
- Non affecté ;
- Modifié ;
- Conflit ;
- Annulé.

## 35. Icônes et pictogrammes
Familles d’icônes observées :
- calendrier/période ;
- utilisateur/groupe ;
- véhicule ;
- statut/alerte ;
- historique ;
- impression/export ;
- navigation.

Règles de style :
- pictogrammes linéaires cohérents ;
- taille homogène par contexte (toolbar, ligne, KPI) ;
- alignement vertical avec le texte ;
- icône jamais seule pour une information critique métier.

## 36. Hiérarchie visuelle
Niveaux de hiérarchie à conserver :
- Niveau 1 : vue active + période active + statut global de la vue.
- Niveau 2 : actions principales et KPI d’état.
- Niveau 3 : données de grille/table principale.
- Niveau 4 : détail contextuel dans panneau droit.
- Niveau 5 : légendes et aides contextuelles.

Règles :
- la hiérarchie ne doit pas s’inverser (panneau détail plus voyant que la grille centrale) ;
- les KPI restent synthétiques, non verbeux.

## 37. Espacements dimensions et densité
Cibles de reproduction visuelle desktop (tolérance ±2 px) :
- padding horizontal page : 24 px ;
- écart vertical entre blocs principaux : 16 px ;
- gap interne cartes KPI : 12 à 16 px ;
- hauteur contrôles (select/boutons standards) : 48 px ;
- rayon cartes/blocs : 10 à 12 px ;
- bordures : 1 px fines ;
- hauteur ligne tableau : 52 à 60 px ;
- hauteur badge compact : 24 à 28 px ;
- panneau détail largeur : environ 300 à 340 px.

Règles de densité :
- densité “métier compacte” en desktop ;
- pas de version aérée type landing page ;
- information prioritaire visible sans scroll long.

## 38. Couleurs et ambiance visuelle
Ambiance visuelle observée : interface claire, neutre, professionnelle, dominante bleu hospitalier.

Palette de référence UI (approximation visuelle issue maquettes) :
- primaire action : bleu vif proche #005BFE ;
- texte principal : bleu nuit proche #16265D ;
- texte secondaire : gris bleuté proche #5E6F97 ;
- fond page : blanc/gris très clair proche #F8FAFD ;
- fond cartes : #FFFFFF ;
- bordures : gris clair bleuté proche #E7ECF5 ;
- succès : vert (fond très clair + texte vert) ;
- avertissement : orange (fond très clair + texte orange) ;
- danger : rouge (fond très clair + texte rouge) ;
- information : bleu clair (fond très clair + texte bleu) ;
- état GARDE : violet clair + texte violet.

Règle critique :
- aucune information métier critique portée uniquement par la couleur.

## 39. Typographie
Style typographique observé : sans serif moderne, lisibilité prioritaire en contexte dense.

Échelle recommandée pour reproduction :
- titre page : 46–48 px / graisse forte ;
- sous-titre page : 17–18 px ;
- onglets : 16 px ;
- titres de cartes/sections : 18–22 px ;
- entêtes tableau : 13–14 px ;
- contenu ligne/table : 14–16 px ;
- badges : 12–14 px, graisse moyenne/forte.

Règles :
- contraste fort texte principal ;
- interlignage court mais respirant ;
- pas de variation de police fantaisie.

## 40. États visuels à prévoir
États UI obligatoires à traiter dans l’implémentation :
- loading de page ;
- loading de bloc (grille/table/panneau) ;
- empty période sans planning ;
- empty résultats filtrés ;
- empty besoins non définis ;
- erreur de chargement ;
- accès refusé ;
- action non autorisée ;
- validation manquante (motif obligatoire, champ obligatoire).

Règles de rendu :
- message explicite en français ;
- action de reprise visible (réessayer, réinitialiser filtres, définir besoins) ;
- état vide distinct d’un état erreur.

## 41. Règles de permissions visibles
Règles de permissions à matérialiser dans l’UI :
- tous les utilisateurs accèdent au Planning avec lecture adaptée ;
- utilisateurs terrain : vue personnelle + global simplifié ;
- Admin et Gérant : droits complets Planning en Alpha ;
- autres profils : droits via permissions dédiées ;
- conflits/alertes/informations sensibles visibles uniquement si autorisé.

Règles d’affichage :
- module/action non autorisé masqué ou désactivé ;
- accès direct non autorisé redirigé vers “Accès refusé”.

Actions à couvrir côté permission :
- consulter planning ;
- consulter planning personnel ;
- consulter planning global ;
- gérer planning ;
- créer/modifier affectation ;
- modifier après publication ;
- annuler une affectation publiée ;
- publier une semaine ;
- gérer besoins hebdomadaires ;
- affecter utilisateurs ;
- affecter véhicules ;
- consulter conflits ;
- consulter alertes de gestion ;
- consulter historique Planning ;
- consulter éléments annulés ;
- consulter brouillons.

## 42. Règles d’ergonomie métier
Règles ergonomiques structurantes :
- Planning Alpha reste synthétique ;
- aucune vue n’est une grille détaillée heure par heure globale ;
- la vue globale est une matrice utilisateurs x semaines ;
- le libellé court Planning est prioritaire dans les cases ;
- fond blanc de case maintenu ;
- badge coloré interne pour l’état/modèle ;
- distinction forte NON PLANIFIÉ vs ABSENT ;
- annotations week-end/férié légères ;
- affectations utilisateurs/véhicules manuelles ;
- détails riches dans panneau, pas dans les cases.

Règles d’action :
- rapidité de lecture avant exhaustivité ;
- cohérence visuelle des 5 vues ;
- éviter toute dérive vers des écrans de régulation transport.

## 43. Composants réutilisables futurs
Composants à prévoir et documenter pour implémentation ultérieure, sans création dans ce FIX :

| Composant | Rôle UI/UX attendu |
|---|---|
| components/planning/PlanningPage | Composition globale de la page Planning avec header, tabs, filtres, KPI, contenu, panneau détail. |
| components/planning/PlanningViewTabs | Navigation entre les 5 vues, état actif visuel et changement de vue. |
| components/planning/PlanningGlobalYearView | Vue matrice annuelle utilisateurs x semaines. |
| components/planning/PlanningPersonalView | Vue personnelle hebdomadaire de l’utilisateur connecté. |
| components/planning/PlanningMonthView | Vue calendrier mensuel synthétique. |
| components/planning/PlanningWeekView | Vue semaine avec checklist besoins et synthèse jours. |
| components/planning/PlanningDayView | Vue jour avec tableau d’affectations et alertes. |
| components/planning/PlanningFilters | Barre de filtres contextualisée par vue. |
| components/planning/PlanningPeriodSelector | Contrôles de navigation temporelle (année/semaine/mois/jour). |
| components/planning/PlanningStatusBar | Carte statut (brouillon/publié/etc.) + dernière modification. |
| components/planning/PlanningCoverageChecklist | Tableau checklist besoins hebdomadaires. |
| components/planning/PlanningMatrix | Grille annuelle et headers de semaines. |
| components/planning/PlanningMatrixCell | Cellule compacte avec badge libellé court et indicateurs légers. |
| components/planning/PlanningDetailPanel | Panneau latéral de détail contextuel et actions autorisées. |
| components/planning/PlanningAlerts | Blocs et badges d’alertes/conflits simples. |
| components/planning/PlanningLegend | Légendes modèles/statuts/couverture. |
| components/planning/PlanningPublishActions | Ensemble des actions publier/modifier/annuler/historique. |
| components/ui/PageHeader | Titre/sous-titre de page module. |
| components/ui/Card | Conteneur de blocs KPI, sections, panneaux. |
| components/ui/Table | Tableaux checklist et affectations. |
| components/ui/Badge | Badges modèles, états, statuts. |
| components/ui/Button | Boutons primaires/secondaires/danger/utilitaires. |
| components/ui/Tabs | Onglets de vue. |
| components/ui/FilterBar | Barre de filtres globale. |
| components/ui/EmptyState | État vide contextualisé. |
| components/ui/LoadingState | État de chargement contextualisé. |

## 44. Stratégie Tailwind future
Stratégie Tailwind à documenter pour implémentation ultérieure, sans créer de configuration ici :
- grille planning : classes dédiées au layout module (sidebar déjà existante + contenu principal) ;
- matrice annuelle : utilities pour colonnes fixes utilisateur/rôle/base + colonnes semaines répétées ;
- largeur colonne utilisateur : token dédié ;
- largeur colonnes semaines : token dédié compact ;
- hauteur cases compactes : token dédié ;
- gaps : système cohérent `gap-2`, `gap-3`, `gap-4` selon bloc ;
- padding contenu : tokens distincts header/filtres/table/panneau ;
- rayons badges : token unique pour cohérence ;
- bordures fines : token 1 px homogène ;
- couleurs d’état : mapping explicite par état métier ;
- couleurs badges modèles : mapping explicite par modèle/type ;
- couleurs alertes : mapping explicite par sévérité ;
- états hover/focus/selected : spécification systématique ;
- panneau latéral : largeur, padding, séparation visuelle standardisée ;
- densité desktop : utilities compactes dédiées aux tableaux ;
- responsive futur : stratégie de repli progressive (section 45).

Règle :
- documenter des tokens et règles d’usage, pas une configuration Tailwind complète dans ce fichier.

## 45. Responsive futur
Référence maquettes = desktop. Responsive à prévoir plus tard sans casser la logique visuelle.

Règles futures :
- conserver les 5 vues, sans en supprimer ;
- passer le panneau détail en drawer plein écran sur petit écran ;
- transformer la matrice annuelle en cartes/liste condensée par utilisateur ;
- conserver lisibilité des statuts et badges ;
- garder les filtres accessibles (tiroir filtres mobile possible) ;
- préserver l’ordre d’information : statut → KPI → données → détail.

Interdit responsive :
- supprimer des états métier critiques ;
- masquer les libellés au profit de couleurs seules.

## 46. Accessibilité minimale
Exigences minimales :
- contraste texte/fond conforme WCAG AA sur contenus principaux ;
- focus visible sur onglets, boutons, selects, lignes actionnables ;
- labels explicites pour filtres et sélecteurs ;
- icône toujours accompagnée d’un texte utile pour information critique ;
- structure sémantique correcte des tableaux (headers de colonnes/ligne) ;
- états critiques annoncés textuellement (ex. “Conflit”, “À vérifier”, “Non affecté”) ;
- cibles cliquables de taille suffisante sur boutons/action icons.

Règle d’accessibilité métier :
- distinction NON PLANIFIÉ vs ABSENT compréhensible sans perception fine de couleur.

## 47. Ce qui doit être codé plus tard
À coder plus tard lors de l’implémentation Planning (hors ce FIX documentaire) :
- rendu complet des 5 vues selon la structure maquette ;
- navigation de période par vue ;
- statuts de publication et traçabilité visible ;
- checklist hebdomadaire de couverture ;
- panneau détail dynamique selon sélection ;
- filtres globaux contextualisés ;
- règles d’affichage permissions ;
- états empty/loading/error/access refusé ;
- vues des éléments annulés en lecture autorisée ;
- historique minimal visible en gestion ;
- légendes modèles/statuts/couverture ;
- signalement visuel de modifications après publication ;
- action “appliquer sur plusieurs semaines” côté UX ;
- bascules liste/grille pour la vue jour si maintenues.

## 48. Ce qui ne doit pas être codé
Ne pas coder dans le périmètre Planning Alpha :
- planning heure par heure détaillé partout ;
- régulation temps réel ;
- missions/courses/transports patients ;
- facturation ;
- paie ;
- calcul complet des heures ;
- planification automatique avancée ;
- affectation automatique optimisée ;
- scoring ;
- optimisation par distance ;
- géolocalisation ;
- maintenance avancée intégrée au Planning ;
- notifications avancées ;
- confirmation de lecture ;
- preuve mobile ;
- signature électronique ;
- restauration d’ancienne version ;
- suppression physique après publication ;
- indisponibilité véhicule automatique depuis anomalie/vérification/désinfection ;
- données RH sensibles visibles sans permission ;
- debug visible ;
- JSON visible.

## 49. Interdictions de dérive
Interdictions de dérive de conception et d’implémentation :
- ne pas dévier de la hiérarchie visuelle maquette ;
- ne pas remplacer les badges textuels par code couleur seul ;
- ne pas transformer les cases annuelles en mini-fiches détaillées ;
- ne pas ajouter de blocs métiers non demandés (missions, régulation, facturation) ;
- ne pas afficher des informations sensibles hors permissions ;
- ne pas créer d’automatisme de blocage véhicule absent des règles ;
- ne pas traiter ce document comme validation fonctionnelle définitive ;
- ne pas ignorer la règle “synthétique d’abord” sur toutes les vues.

## 50. Checklist de conformité visuelle 99 %
Checklist de contrôle avant validation UI/UX codée :
- Le titre, le sous-titre et la barre d’onglets sont présents et alignés comme maquette.
- Les 5 vues Planning existent et respectent l’ordre maquette.
- La vue globale annuelle affiche une matrice utilisateurs x semaines.
- Les colonnes de semaines affichent numéro de semaine et plage de dates.
- Les cases annuelles conservent un fond blanc.
- Les cases annuelles affichent un badge coloré avec libellé court Planning.
- Les états REPOS, ABSENT, INDISPONIBLE, NON PLANIFIÉ, À AFFECTER sont présents.
- NON PLANIFIÉ est visuellement distinct de ABSENT.
- Les annotations samedi, dimanche, jour férié, week-end restent légères.
- Le panneau détail est disponible sur chaque vue.
- Les actions de panneau détail suivent les permissions.
- Les KPI de disponibilité/couverture/alertes sont visibles sur les vues concernées.
- La vue semaine contient la checklist des besoins hebdomadaires.
- Les états couverture Couvert/Incomplet/À couvrir/À vérifier/Non affecté sont visibles.
- La vue semaine conserve une synthèse par jours.
- La vue jour expose les affectations du jour en tableau lisible.
- La vue mois expose un calendrier synthétique avec badges et ratios.
- La vue personnelle reste centrée sur le planning de l’utilisateur connecté.
- Aucun écran ne devient une planification détaillée heure par heure globale.
- Les affectations utilisateurs restent manuelles en Alpha.
- Les affectations véhicules restent manuelles en Alpha.
- Les utilisateurs non éligibles ne sont pas proposés normalement.
- Les véhicules non éligibles ne sont pas proposés normalement.
- La base/dépôt guide mais ne bloque pas automatiquement.
- Les demandes d’absence en attente ne bloquent pas automatiquement.
- Aucune indisponibilité automatique véhicule n’est injectée depuis anomalies/vérifications/désinfections.
- Les statuts Brouillon, Publié, Modifié après publication, Annulé, À vérifier sont visibles.
- Les modifications après publication sont signalées visuellement et traçables.
- Le motif d’annulation/modification sensible après publication est prévu côté UX.
- La suppression physique après publication n’existe pas.
- Les éléments annulés restent consultables selon permissions.
- Les informations sensibles sont masquées pour les profils non autorisés.
- Les actions non autorisées sont masquées ou désactivées.
- Un accès direct non autorisé mène à “Accès refusé”.
- Les états Loading/Empty/Error sont définis et distincts.
- Les légendes statuts/types/couverture sont présentes quand prévues.
- Les boutons primaires/secondaires/danger respectent la hiérarchie visuelle.
- Les bordures, rayons, espacements et densité correspondent à la maquette desktop.
- Les couleurs respectent l’ambiance visuelle claire et professionnelle.
- La couleur n’est jamais l’unique porteur d’information critique.
- Le contraste texte/fond est suffisant en lecture métier.
- Le focus clavier est visible sur interactions clés.
- Le responsive futur est prévu sans perte d’information critique.
- Les composants futurs listés en section 43 couvrent tout le périmètre UI.
- La stratégie Tailwind future est documentée sans config complète ni code CSS.
- Le document reste une référence UI/UX codable, pas une validation fonctionnelle définitive.
- Aucune fonctionnalité hors périmètre Alpha n’est présentée comme active.
- Aucune section ne dépend du code existant comme source visuelle.
- Les sources visuelles et fonctionnelles exactes sont rappelées en tête.
- Le document est exploitable directement pour un développement fidèle maquette.

Points à confirmer (information non fournie explicitement dans les sources) :
- Gestion exacte des années avec semaine 53.
- Comportement exact de publication si besoin obligatoire non couvert.
- Noms techniques définitifs de permissions Planning.
