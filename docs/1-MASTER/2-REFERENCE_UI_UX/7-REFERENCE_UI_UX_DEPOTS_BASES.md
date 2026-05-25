# Ambulance Manager — Référence UI/UX — Dépôts / Bases

Version : V2  
Statut : référence UI/UX codable  
Objectif : reproduction visuelle 99 %  
Source visuelle : docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/7-Dépôts-bases/Dépôts -Bases_V2.png  
Source fonctionnelle : docs/1-MASTER/3-FONCTIONNALITES/7-FONCTIONNALITES_DETAILLEES_DEPOTS_BASES_V1.md  

## Sommaire
- [1. Objectif du document](#1-objectif-du-document)
- [2. Sources utilisées](#2-sources-utilisées)
- [3. Règle d’autorité](#3-règle-dautorité)
- [4. Rôle de la page Dépôts / Bases](#4-rôle-de-la-page-dépôts--bases)
- [5. Objectif UX de la page](#5-objectif-ux-de-la-page)
- [6. Structure générale de l’écran](#6-structure-générale-de-lécran)
- [7. Layout desktop attendu](#7-layout-desktop-attendu)
- [8. En-tête de page](#8-en-tête-de-page)
- [9. Actions principales](#9-actions-principales)
- [10. Recherche et filtres](#10-recherche-et-filtres)
- [11. KPI et tuiles de synthèse](#11-kpi-et-tuiles-de-synthèse)
- [12. Tableau des dépôts / bases](#12-tableau-des-dépôts--bases)
- [13. Colonne Dépôt / Base](#13-colonne-dépôt--base)
- [14. Colonne Adresse](#14-colonne-adresse)
- [15. Colonne Responsable local](#15-colonne-responsable-local)
- [16. Colonne Utilisateurs rattachés](#16-colonne-utilisateurs-rattachés)
- [17. Colonne Véhicules rattachés](#17-colonne-véhicules-rattachés)
- [18. Colonne Statut](#18-colonne-statut)
- [19. Colonne Actions](#19-colonne-actions)
- [20. Création dépôt / base](#20-création-dépôt--base)
- [21. Modification dépôt / base](#21-modification-dépôt--base)
- [22. Désactivation réactivation archivage restauration](#22-désactivation-réactivation-archivage-restauration)
- [23. Gestion des rattachements visibles](#23-gestion-des-rattachements-visibles)
- [24. Avertissements liés aux rattachements](#24-avertissements-liés-aux-rattachements)
- [25. Badges et statuts visuels](#25-badges-et-statuts-visuels)
- [26. Boutons et actions](#26-boutons-et-actions)
- [27. États visuels à prévoir](#27-états-visuels-à-prévoir)
- [28. Hiérarchie visuelle](#28-hiérarchie-visuelle)
- [29. Espacements dimensions et densité](#29-espacements-dimensions-et-densité)
- [30. Couleurs et ambiance visuelle](#30-couleurs-et-ambiance-visuelle)
- [31. Typographie](#31-typographie)
- [32. Icônes](#32-icônes)
- [33. Règles de permissions visibles](#33-règles-de-permissions-visibles)
- [34. Règles d’ergonomie métier](#34-règles-dergonomie-métier)
- [35. Composants réutilisables futurs](#35-composants-réutilisables-futurs)
- [36. Stratégie Tailwind future](#36-stratégie-tailwind-future)
- [37. Responsive futur](#37-responsive-futur)
- [38. Accessibilité minimale](#38-accessibilité-minimale)
- [39. Ce qui doit être codé plus tard](#39-ce-qui-doit-être-codé-plus-tard)
- [40. Ce qui ne doit pas être codé](#40-ce-qui-ne-doit-pas-être-codé)
- [41. Interdictions de dérive](#41-interdictions-de-dérive)
- [42. Checklist de conformité visuelle 99 %](#42-checklist-de-conformité-visuelle-99-)

## 1. Objectif du document
Ce document est une référence UI/UX codable, destinée à guider une implémentation ultérieure fidèle à la maquette V2 de la page Dépôts / Bases.

Il ne constitue pas une validation fonctionnelle définitive. Il formalise uniquement ce qui doit être reproduit visuellement et ergonomiquement, en respectant le cadrage Alpha de la fiche fonctionnalités.

## 2. Sources utilisées
- Source visuelle prioritaire : `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/7-Dépôts-bases/Dépôts -Bases_V2.png`.
- Source fonctionnelle : `docs/1-MASTER/3-FONCTIONNALITES/7-FONCTIONNALITES_DETAILLEES_DEPOTS_BASES_V1.md`.
- Aucune autre source UI/UX ou code applicatif n’est utilisée comme autorité visuelle.

## 3. Règle d’autorité
1. Maquette Dépôts / Bases V2.
2. Fiche fonctionnalités Dépôts / Bases V1.
3. Aucune hypothèse fonctionnelle hors sources.

Arbitrage appliqué pour ce document : les règles métier Alpha explicitement posées (notion simple “Dépôt / Base”, pas de types actifs distincts) prévalent pour ce qui sera codé plus tard.

## 4. Rôle de la page Dépôts / Bases
La page Dépôts / Bases est le référentiel des lieux d’exploitation de la société, avec une lecture immédiate des informations utiles à l’organisation.

Rôle attendu :
- centraliser les lieux actifs et inactifs non archivés ;
- afficher les principaux rattachements visibles ;
- permettre les actions de gestion (créer, modifier, désactiver, réactiver, archiver, restaurer) selon permissions ;
- exposer un état clair sans transformer la page en module de gestion RH, flotte ou planning.

## 5. Objectif UX de la page
Objectif UX principal : décider vite, sans ambiguïté, sur un lieu donné.

Résultats UX attendus :
- comprendre l’état global en haut de page (tuiles de synthèse) ;
- trouver un lieu en quelques secondes (recherche + filtres) ;
- comparer les lieux dans un tableau dense mais lisible ;
- déclencher une action avec confirmation explicite quand des rattachements existent.

## 6. Structure générale de l’écran
Structure globale observée dans le Shell :
- sidebar de navigation à gauche ;
- barre supérieure globale (sélecteur société, thème, profil) ;
- contenu principal de page sur fond clair ;
- enchaînement vertical : en-tête, tuiles KPI, barre recherche/filtres, tableau principal.

Zonage fonctionnel de la page :
- zone A : titre + sous-titre + CTA ;
- zone B : 4 tuiles de synthèse ;
- zone C : recherche et filtres ;
- zone D : carte tableau “Liste des dépôts”.

## 7. Layout desktop attendu
Référence desktop observée : grille large, lecture horizontale prioritaire.

Contraintes de layout à reproduire :
- contenu principal centré, pleine largeur utile dans la zone de travail ;
- cartes et tableau dans des conteneurs à bordure fine, rayon doux, ombre légère ;
- alignements rigoureux des colonnes et des contrôles de filtres ;
- pagination centrée en pied de tableau, avec sélecteur “lignes par page” à droite.

## 8. En-tête de page
L’en-tête comporte :
- titre : `Dépôts / Bases` ;
- sous-titre d’aide : gestion des dépôts opérationnels et de leurs informations ;
- actions à droite : un bouton secondaire puis un bouton primaire.

Règles de rendu :
- titre dominant visuellement ;
- sous-titre plus discret ;
- boutons sur la même ligne, alignés à droite ;
- bouton primaire immédiatement identifiable.

## 9. Actions principales
Actions visibles en tête de page :
- `Importer des dépôts` (secondaire) ;
- `Nouveau dépôt` (primaire, icône “+”).

Règles d’usage :
- afficher selon permissions ;
- si permission absente, masquer l’action ou la désactiver explicitement selon stratégie globale produit ;
- conserver le même ordre visuel : secondaire puis primaire.

## 10. Recherche et filtres
Barre dédiée sous les KPI :
- champ recherche avec icône loupe et placeholder “Rechercher un dépôt...” ;
- filtres en contrôles compacts alignés ;
- action `Réinitialiser` à droite.

Règles Alpha à respecter :
- recherche orientée nom du dépôt/base ;
- filtres cohérents avec les statuts et l’état d’archivage ;
- pas de logique avancée non validée.

Important pour l’implémentation future :
- la notion de type de lieu distinct ne doit pas devenir une règle active en Alpha ;
- ne pas introduire un comportement métier “Base principale / Secondaire / Relais” sans validation fonctionnelle explicite.

## 11. KPI et tuiles de synthèse
La maquette affiche 4 tuiles en ligne. Elles servent à une lecture rapide de l’état global.

Règles de restitution :
- icône circulaire colorée à gauche de chaque tuile ;
- libellé court ;
- valeur principale en grand ;
- sous-texte d’explication en plus petit ;
- design homogène sur les 4 tuiles.

Prudence fonctionnelle :
- conserver uniquement des indicateurs cohérents avec le périmètre validé ;
- ne pas transformer ces tuiles en source de logique métier nouvelle.

## 12. Tableau des dépôts / bases
Le tableau est la zone centrale de décision.

Colonnes validées pour l’implémentation Alpha :
1. Dépôt / Base
2. Adresse
3. Responsable local
4. Utilisateurs rattachés
5. Véhicules rattachés
6. Statut
7. Actions

Règles :
- ordre de colonnes stable ;
- en-tête fixe et lisible ;
- lignes régulières, hauteur cohérente ;
- cellule actions alignée à droite ;
- pagination visible en bas.

## 13. Colonne Dépôt / Base
Contenu attendu :
- nom principal du dépôt/base (obligatoire) ;
- éventuel sous-label informatif visuel si présent dans la maquette future validée.

Règles métier :
- nom unique dans la société ;
- pas de type technique actif introduit ici ;
- pas d’auto-catégorisation invisible.

Rendu visuel :
- texte principal plus contrasté ;
- lecture prioritaire en premier dans la ligne.

## 14. Colonne Adresse
Contenu attendu :
- adresse lisible sur une ou deux lignes selon longueur ;
- fallback explicite si non renseignée.

Règles métier :
- adresse recommandée mais non obligatoire ;
- absence d’adresse ne bloque pas la création ni la modification.

Rendu visuel :
- texte secondaire mais clairement lisible ;
- retour à la ligne propre, sans déborder sur les colonnes voisines.

## 15. Colonne Responsable local
Contenu attendu :
- nom du responsable local si renseigné ;
- fallback “non renseigné” sinon.

Règles métier :
- champ optionnel ;
- valeur obligatoire dans le référentiel utilisateurs si renseignée ;
- aucune permission automatique liée à ce champ.

Rendu visuel :
- style neutre ;
- ne pas donner l’impression d’un rôle applicatif système.

## 16. Colonne Utilisateurs rattachés
Contenu attendu :
- compteur numérique visible ;
- possibilité d’accès contextualisé aux rattachements uniquement si présent dans la maquette/permission.

Règles métier :
- la gestion principale des rattachements utilisateurs reste dans le module Utilisateurs ;
- aucun détachement automatique lors d’une modification du dépôt/base.

Rendu visuel :
- valeur courte, alignement constant ;
- badge compteur possible si conforme au style de page.

## 17. Colonne Véhicules rattachés
Contenu attendu :
- compteur numérique visible ;
- accès contextualisé éventuel si présent dans la maquette/permission.

Règles métier :
- la gestion principale des rattachements véhicules reste dans le module Véhicules ;
- aucun détachement automatique lors d’une modification du dépôt/base.

Rendu visuel :
- cohérence de style avec la colonne utilisateurs rattachés ;
- lecture immédiate des volumes.

## 18. Colonne Statut
Statuts à distinguer :
- actif ;
- inactif ;
- archivé/non archivé géré via visibilité et filtres dédiés.

Règles métier :
- statut par défaut : actif ;
- un inactif reste visible mais n’est plus proposé normalement pour de nouveaux rattachements ;
- un archivé est masqué hors filtre dédié ;
- désarchiver ne réactive pas automatiquement un inactif.

Rendu visuel :
- badge statut explicite ;
- contraste suffisant ;
- code couleur stable et non ambigu.

## 19. Colonne Actions
Actions ligne à documenter :
- consulter ;
- modifier ;
- désactiver ;
- réactiver ;
- archiver ;
- restaurer/désarchiver ;
- ouvrir/consulter rattachements visibles si présent.

Règles :
- affichage conditionné par permissions ;
- aucune suppression physique ;
- confirmation requise pour actions impactantes ;
- avertissement si rattachements existants.

## 20. Création dépôt / base
Principes de formulaire (sans coder ici) :
- nom obligatoire ;
- unicité du nom dans la société ;
- adresse recommandée, non obligatoire ;
- responsable local optionnel, sélection utilisateur existant ;
- statut initial actif par défaut.

Résultat attendu :
- nouvel élément visible dans la liste selon filtres en cours ;
- compteurs à 0 si aucun rattachement initial ;
- aucune propagation implicite de permissions.

## 21. Modification dépôt / base
Principes de modification :
- modifier les informations de base sans casser les liens existants ;
- conserver l’historique d’usage.

Règles métier :
- ne pas détacher automatiquement utilisateurs ;
- ne pas détacher automatiquement véhicules ;
- ne pas modifier automatiquement les modèles horaires liés.

Comportement UX :
- bouton de sauvegarde explicite ;
- feedback de succès/erreur ;
- validation lisible des champs invalides.

## 22. Désactivation réactivation archivage restauration
Cycle d’état à respecter :
- actif → inactif ;
- inactif → actif ;
- non archivé → archivé ;
- archivé → restauré (non archivé).

Règles clés :
- archivage et désactivation possibles même avec rattachements ;
- avertissement simple obligatoire avant confirmation ;
- aucune suppression physique ;
- restaurer ne force pas la réactivation.

## 23. Gestion des rattachements visibles
Sur la page Dépôts / Bases, la logique de rattachements est de consultation/signalement, pas de gestion complète.

À afficher :
- compteur utilisateurs rattachés ;
- compteur véhicules rattachés ;
- éventuel accès de consultation des éléments liés si présent visuellement.

À ne pas faire :
- écran de rattachement massif ;
- modifications globales des liens depuis cette page sans validation dédiée.

## 24. Avertissements liés aux rattachements
Déclenchement :
- avant désactivation ;
- avant archivage ;
- lorsque des rattachements existent encore.

Contenu minimal du message :
- rappel que des utilisateurs/véhicules sont encore liés ;
- rappel que l’historique est conservé ;
- rappel de l’effet “non proposé normalement pour nouveaux rattachements”.

Le message reste simple et non bloquant en Alpha.

## 25. Badges et statuts visuels
Badges attendus :
- badge statut actif ;
- badge statut inactif ;
- badge ou style compteur pour valeurs de rattachement si retenu.

Règles :
- vocabulaire court ;
- couleurs constantes ;
- pas de surcharge visuelle ;
- pas de badges introduisant des types métier non validés.

## 26. Boutons et actions
Catégories de boutons :
- primaire : création ;
- secondaire : import, actions contextuelles ;
- tertiaire/icone : actions ligne.

États indispensables :
- `default` ;
- `hover` ;
- `focus-visible` ;
- `disabled` ;
- `loading`.

Règles :
- libellés verbaux clairs ;
- aucune action destructrice “supprimer définitivement”.

## 27. États visuels à prévoir
États de page obligatoires :
- chargement initial ;
- liste vide ;
- aucun résultat de recherche/filtre ;
- erreur de chargement ;
- succès action ;
- erreur action ;
- vue des archivés via filtre dédié.

Rendu attendu :
- messages courts et explicites ;
- CTA de reprise (réessayer, réinitialiser filtres, créer un dépôt/base) selon cas.

## 28. Hiérarchie visuelle
Priorité visuelle attendue :
1. titre de page ;
2. bouton primaire `Nouveau dépôt` ;
3. tuiles de synthèse ;
4. barre recherche/filtres ;
5. tableau ;
6. pagination.

Règle : la lecture et l’action rapide doivent être possibles sans ouvrir de détail.

## 29. Espacements dimensions et densité
Densité cible : professionnelle, compacte, non serrée.

Principes concrets :
- espacements verticaux réguliers entre blocs (en-tête, KPI, filtres, tableau) ;
- padding interne confortable dans les cartes ;
- hauteur de ligne tableau stable pour comparaisons rapides ;
- cellules texte longues coupées proprement ou renvoyées à la ligne selon colonne.

Objectif : maximiser la lisibilité sans effet “tableau massif illisible”.

## 30. Couleurs et ambiance visuelle
Ambiance générale : claire, neutre, SaaS B2B opérationnel.

Règles de couleur :
- fond principal très clair ;
- cartes et tableau sur fond blanc ;
- bordures fines ;
- accents bleus pour action primaire ;
- statuts via couleurs sémantiques (actif/inactif) avec contraste suffisant.

Interdiction :
- palettes nouvelles non alignées au Shell global ;
- codage couleur incohérent entre KPI, badges et boutons.

## 31. Typographie
Hiérarchie typographique à respecter :
- titre page : niveau le plus fort ;
- sous-titre : niveau informatif secondaire ;
- en-têtes de colonnes : lisibles, sobres ;
- cellules : taille homogène pour comparaison ;
- aides/messages : taille réduite mais lisible.

Règles :
- cohérence avec la typographie déjà visible dans la maquette ;
- pas de variation décorative.

## 32. Icônes
Icônes visibles dans la maquette :
- icônes de tuiles KPI ;
- loupe dans recherche ;
- icône plus pour création ;
- icônes d’actions ligne.

Règles :
- style d’icône homogène ;
- taille constante par contexte ;
- icône jamais seule pour une action critique sans libellé/tooltip accessible.

## 33. Règles de permissions visibles
L’interface doit refléter les permissions de façon claire :
- action visible et active si autorisée ;
- action masquée ou désactivée si non autorisée ;
- pas de faux-espoir d’action impossible.

Permissions à couvrir visuellement :
- consulter ;
- créer ;
- modifier ;
- désactiver/réactiver ;
- archiver/restaurer ;
- consulter archivés.

## 34. Règles d’ergonomie métier
Règles métier à afficher/respecter :
- page nommée “Dépôts / Bases” ;
- notion Alpha simple “Dépôt / Base” ;
- pas de distinction technique active Base/Dépôt/Point d’exploitation/Autre ;
- pas de notion active “Base principale / Secondaire / Relais” sans validation fonctionnelle ;
- la base/dépôt guide le Planning mais ne bloque pas automatiquement les affectations en Alpha ;
- responsable local informatif, sans permission implicite.

## 35. Composants réutilisables futurs
Composants à prévoir (documentés uniquement) :
- `components/depots/DepotsBasesPage`
- `components/depots/DepotsBasesTable`
- `components/depots/DepotBaseRow`
- `components/depots/DepotBaseIdentityCell`
- `components/depots/DepotBaseAddressCell`
- `components/depots/DepotBaseResponsibleCell`
- `components/depots/DepotBaseCountersCell`
- `components/depots/DepotBaseStatusBadge`
- `components/depots/DepotBaseFilters`
- `components/depots/DepotBaseForm`
- `components/depots/DepotBaseArchiveAction`
- `components/ui/PageHeader`
- `components/ui/Card`
- `components/ui/Table`
- `components/ui/Badge`
- `components/ui/Button`
- `components/ui/Input`
- `components/ui/Select`
- `components/ui/EmptyState`
- `components/ui/LoadingState`
- `components/ui/WarningMessage`

## 36. Stratégie Tailwind future
Stratégie de classes utilitaires à documenter et appliquer plus tard, sans créer de configuration maintenant :
- grille de page ;
- largeur tableau ;
- padding contenu ;
- gaps inter-zones ;
- rayons de cartes ;
- bordures fines ;
- ombres légères ;
- couleurs de statut ;
- badges compteurs ;
- densité tableau ;
- états hover/focus/disabled ;
- responsive desktop/tablette/mobile.

Règle : standardiser ces choix dans le design system interne avant implémentation.

## 37. Responsive futur
Cibles futures : desktop d’abord, tablette ensuite, mobile consultatif.

Règles de transformation :
- KPI : 4 colonnes desktop, empilement progressif en tablette/mobile ;
- filtres : passage en lignes multiples ;
- tableau : maintien desktop, puis mode cartes/lignes simplifiées en mobile ;
- actions : conserver la priorité du bouton création.

## 38. Accessibilité minimale
Exigences minimales :
- navigation clavier sur recherche, filtres, actions ligne, pagination ;
- états focus visibles ;
- contraste texte/fond conforme ;
- labels explicites pour inputs/selects ;
- intitulés d’icônes d’action (aria-label/tooltip) ;
- messages d’erreur et d’état compréhensibles sans ambiguïté.

## 39. Ce qui doit être codé plus tard
À coder lors de l’implémentation :
- page complète conforme maquette (shell inclus côté intégration) ;
- flux création/modification ;
- flux désactivation/réactivation/archivage/restauration ;
- filtres, recherche et pagination ;
- états vide/loading/erreur ;
- avertissements de rattachements ;
- contrôles permissions visibles.

## 40. Ce qui ne doit pas être codé
Ne pas coder dans le périmètre Alpha de cette page :
- distinction technique active entre Base, Dépôt, Point d’exploitation, Autre ;
- notions actives Base principale/Secondaire/Relais non validées ;
- suppression physique ;
- détachement automatique des utilisateurs ;
- détachement automatique des véhicules ;
- modification automatique des modèles horaires ;
- blocage automatique Planning par dépôt/base ;
- permissions automatiques liées au responsable local ;
- gestion complète des rattachements depuis cette page si non imposée ;
- modification des permissions depuis cette page ;
- debug visible ;
- JSON visible.

## 41. Interdictions de dérive
Interdictions de dérive de conception :
- ne pas utiliser le code existant comme source visuelle ;
- ne pas mélanger référence UI/UX et validation fonctionnelle finale ;
- ne pas enrichir la page avec des fonctions non présentes dans les sources autorisées ;
- ne pas transformer la page en hub complet RH/flotte/planning ;
- ne pas introduire de logique cachée non documentée.

## 42. Checklist de conformité visuelle 99 %
Checklist de contrôle avant implémentation finale :
- intitulé exact de page `Dépôts / Bases`.
- en-tête avec sous-titre et 2 actions principales alignées à droite.
- 4 tuiles KPI alignées, homogènes, lisibles.
- barre recherche/filtres compacte et claire avec action réinitialiser.
- tableau principal dans une carte dédiée.
- colonnes implémentées : Dépôt / Base, Adresse, Responsable local, Utilisateurs rattachés, Véhicules rattachés, Statut, Actions.
- statuts visuels actif/inactif lisibles.
- gestion visuelle archivés/non archivés via filtre dédié.
- actions ligne conditionnées par permissions.
- avertissement avant désactivation/archivage si rattachements existants.
- aucun flux de suppression physique.
- aucun blocage automatique du Planning introduit.
- aucun type de lieu actif distinct introduit en Alpha.
- aucun lien automatique entre responsable local et permissions.
- états loading/vide/erreur présents.
- densité et espacements alignés au rendu maquette.
- couleurs, icônes, typographie cohérentes avec le Shell.
- comportement responsive futur documenté.
- exigences d’accessibilité minimale couvertes.
- document relu sans mojibake, avec fin de ligne finale.
