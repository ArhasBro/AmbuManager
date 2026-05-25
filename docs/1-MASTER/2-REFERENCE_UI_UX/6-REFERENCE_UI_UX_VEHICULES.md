# Ambulance Manager — Référence UI/UX — Véhicules

Version : V2  
Statut : référence UI/UX codable  
Objectif : reproduction visuelle 99 %  
Source visuelle : docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/6-Véhicules/Véhicules_V2.png  
Source fonctionnelle : docs/1-MASTER/3-FONCTIONNALITES/6-FONCTIONNALITES_DETAILLEES_VEHICULES_V1.1.md  

## Sommaire
- [1. Objectif du document](#1-objectif-du-document)
- [2. Sources utilisées](#2-sources-utilisées)
- [3. Règle d’autorité](#3-règle-dautorité)
- [4. Rôle de la page Véhicules](#4-rôle-de-la-page-véhicules)
- [5. Objectif UX de la page](#5-objectif-ux-de-la-page)
- [6. Structure générale de l’écran](#6-structure-générale-de-lécran)
- [7. Layout desktop attendu](#7-layout-desktop-attendu)
- [8. En-tête de page](#8-en-tête-de-page)
- [9. Actions principales](#9-actions-principales)
- [10. Recherche et filtres](#10-recherche-et-filtres)
- [11. KPI et tuiles de synthèse](#11-kpi-et-tuiles-de-synthèse)
- [12. Tableau des véhicules](#12-tableau-des-véhicules)
- [13. Colonne véhicule](#13-colonne-véhicule)
- [14. Nom interne marque et modèle](#14-nom-interne-marque-et-modèle)
- [15. Colonne type de véhicule](#15-colonne-type-de-véhicule)
- [16. Colonne immatriculation](#16-colonne-immatriculation)
- [17. Colonne statut administratif](#17-colonne-statut-administratif)
- [18. Colonne disponibilité générale](#18-colonne-disponibilité-générale)
- [19. Colonne base / dépôt](#19-colonne-base--dépôt)
- [20. Colonne résumé de suivi](#20-colonne-résumé-de-suivi)
- [21. Colonne actions](#21-colonne-actions)
- [22. Fiche détail véhicule](#22-fiche-détail-véhicule)
- [23. Création véhicule](#23-création-véhicule)
- [24. Modification véhicule](#24-modification-véhicule)
- [25. Changement de disponibilité](#25-changement-de-disponibilité)
- [26. Désactivation réactivation archivage restauration](#26-désactivation-réactivation-archivage-restauration)
- [27. Lien avec Suivi des véhicules](#27-lien-avec-suivi-des-véhicules)
- [28. Badges et statuts visuels](#28-badges-et-statuts-visuels)
- [29. Boutons et actions](#29-boutons-et-actions)
- [30. États visuels à prévoir](#30-états-visuels-à-prévoir)
- [31. Hiérarchie visuelle](#31-hiérarchie-visuelle)
- [32. Espacements dimensions et densité](#32-espacements-dimensions-et-densité)
- [33. Couleurs et ambiance visuelle](#33-couleurs-et-ambiance-visuelle)
- [34. Typographie](#34-typographie)
- [35. Icônes](#35-icônes)
- [36. Règles de permissions visibles](#36-règles-de-permissions-visibles)
- [37. Règles d’ergonomie métier](#37-règles-dergonomie-métier)
- [38. Composants réutilisables futurs](#38-composants-réutilisables-futurs)
- [39. Stratégie Tailwind future](#39-stratégie-tailwind-future)
- [40. Responsive futur](#40-responsive-futur)
- [41. Accessibilité minimale](#41-accessibilité-minimale)
- [42. Ce qui doit être codé plus tard](#42-ce-qui-doit-être-codé-plus-tard)
- [43. Ce qui ne doit pas être codé](#43-ce-qui-ne-doit-pas-être-codé)
- [44. Interdictions de dérive](#44-interdictions-de-dérive)
- [45. Checklist de conformité visuelle 99 %](#45-checklist-de-conformité-visuelle-99-)

## 1. Objectif du document
Ce document définit une référence UI/UX codable pour la page **Véhicules** avec cible de ressemblance visuelle minimale de 99 % à la maquette V2.  
Ce document ne vaut pas validation fonctionnelle définitive : il cadre l’interface à reproduire et les comportements visibles attendus à partir des sources d’autorité.

## 2. Sources utilisées
Sources strictement utilisées pour cette référence :
- Maquette : `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/6-Véhicules/Véhicules_V2.png`.
- Fiche fonctionnelle : `docs/1-MASTER/3-FONCTIONNALITES/6-FONCTIONNALITES_DETAILLEES_VEHICULES_V1.1.md`.

Aucune autre source visuelle ou code applicatif n’est utilisée.

## 3. Règle d’autorité
Ordre d’autorité appliqué :
1. Maquette Véhicules V2.
2. Fiche fonctionnalités Véhicules.
3. Aucune hypothèse.
4. Aucun ancien fichier UI/UX.
5. Aucun code existant comme source visuelle.

En cas d’écart entre maquette et fiche, la maquette prévaut pour l’apparence visible.

## 4. Rôle de la page Véhicules
La page **Véhicules** est le référentiel administratif de flotte :
- identité véhicule ;
- type ;
- immatriculation ;
- statut administratif ;
- disponibilité générale ;
- base / dépôt principal ;
- actions de gestion autorisées.

La page n’est pas le workflow détaillé de suivi opérationnel (vérifications, désinfections, anomalies).

## 5. Objectif UX de la page
Objectifs UX :
- permettre une lecture rapide de l’état de flotte ;
- distinguer clairement les concepts `statut administratif`, `disponibilité générale`, `archivage` ;
- rendre visibles les actions selon permissions ;
- permettre un accès simple au suivi véhicule sans surcharger la page référentiel.

## 6. Structure générale de l’écran
Structure observée dans le shell desktop :
- barre latérale gauche de navigation produit ;
- topbar globale (société, thème, utilisateur, déconnexion) ;
- contenu page Véhicules :
1. en-tête page (titre + sous-texte + CTA) ;
2. ligne de KPI (5 tuiles) ;
3. barre recherche / filtres ;
4. zone principale en deux colonnes :
   - gauche : carte `Liste des véhicules` + table + pagination ;
   - droite : cartes `Répartition par type`, `Alertes véhicules`, `Actions rapides`.

## 7. Layout desktop attendu
Layout de référence desktop :
- zone contenu centrée avec larges marges internes ;
- colonne principale gauche majoritaire en largeur ;
- colonne secondaire droite plus étroite, dédiée synthèse et raccourcis ;
- alignements horizontaux stricts entre entête, KPI, filtres et cartes.

La reproduction doit respecter cette hiérarchie spatiale et ce ratio visuel gauche/droite.

## 8. En-tête de page
Éléments visibles en en-tête de contenu :
- titre : `Véhicules` ;
- sous-texte : `Gérez votre flotte de véhicules et suivez leur disponibilité.` ;
- actions à droite : `Importer des véhicules` puis `Ajouter un véhicule`.

Règles :
- titre prominent (premier point d’accroche visuelle de la page) ;
- sous-texte plus discret ;
- bouton primaire `Ajouter un véhicule` visuellement dominant.

## 9. Actions principales
Actions principales visibles :
- `Importer des véhicules` (secondaire, style neutre) ;
- `Ajouter un véhicule` (primaire, fond bleu, icône plus).

Actions principales fonctionnelles attendues selon fiche :
- consulter ;
- créer ;
- modifier ;
- changer disponibilité si autorisé ;
- désactiver / réactiver ;
- archiver / restaurer ;
- consulter archivés ;
- accéder au suivi véhicule si disponible.

## 10. Recherche et filtres
Barre de pilotage visible :
- champ recherche avec placeholder `Rechercher un véhicule...` ;
- sélecteur `Statut` valeur initiale `Tous` ;
- sélecteur `Type` valeur initiale `Tous` ;
- sélecteur `Dépôt / Base` valeur initiale `Tous` ;
- bouton `Filtres` ;
- bouton icône de vue/liste à droite.

Règles UI/UX :
- recherche et filtres sur une seule ligne en desktop ;
- libellés de filtres courts et lisibles ;
- état `Tous` visible par défaut ;
- aucune option non visible dans la maquette ne doit être inventée.

## 11. KPI et tuiles de synthèse
5 tuiles visibles, alignées sur une ligne :
1. `Véhicules totaux` : `48` + sous-texte `tous types confondus`.
2. `Disponibles` : `28` + `58% de la flotte`.
3. `En maintenance` : `6` + `13% de la flotte`.
4. `Hors service` : `4` + `8% de la flotte`.
5. `Réservés / Affectés` : `10` + `21% de la flotte`.

Règles :
- chaque tuile comporte icône, libellé, valeur principale, sous-texte ;
- valeurs et proportions utilisent un niveau de contraste supérieur au libellé ;
- la rangée KPI reste avant les filtres.

## 12. Tableau des véhicules
Bloc principal gauche :
- titre de carte : `Liste des véhicules (48)` ;
- en-têtes visibles de table :
  - `Véhicule`
  - `Immatriculation`
  - `Type`
  - `Dépôt / Base`
  - `Statut`
  - `Disponibilité`
  - `Actions`
- lignes affichées avec visuel véhicule, textes secondaires, badges, actions ;
- pied de table :
  - texte : `Affichage 1 à 8 sur 48 véhicules` ;
  - pagination numérotée ;
  - sélecteur `Lignes par page` (valeur visible `25`).

Colonne `Résumé de suivi` non visible comme colonne dédiée dans cette maquette.

## 13. Colonne véhicule
Contenu visible par ligne :
- vignette véhicule ;
- nom principal (ex. `Ambulance Renault Master`) ;
- sous-ligne descriptive (ex. `Type A - 3 places`, `9 places`, `8 places`).

Règles :
- nom principal en priorité visuelle ;
- sous-ligne en niveau secondaire ;
- vignette de gauche à taille compacte et répétable.

## 14. Nom interne marque et modèle
Règle métier issue de la fiche :
- le nom interne est personnalisable ;
- la marque et le modèle sont affichés sous le nom interne.

Application UI/UX codable :
- colonne `Véhicule` doit présenter une structure en 2 niveaux textuels ;
- niveau 1 : nom interne ;
- niveau 2 : marque + modèle (ou détail équivalent issu des données de référence).

Même si le libellé exact des exemples de la maquette diffère, la structure à coder doit respecter la règle métier ci-dessus.

## 15. Colonne type de véhicule
Types autorisés et attendus en affichage :
- AMBULANCE
- VSL
- TAXI
- TPMR

Règles :
- affichage en majuscules côté données fonctionnelles ;
- rendu visuel en badge compact ;
- couleur cohérente et stable par type.

## 16. Colonne immatriculation
Rôle :
- identifiant officiel véhicule visible en table ;
- format alphanumérique lisible en un seul regard.

Règles :
- ne pas tronquer agressivement ;
- garder contraste élevé ;
- conserver une largeur de colonne adaptée au format standard.

## 17. Colonne statut administratif
Cette colonne doit représenter le **statut administratif**, distinct de la disponibilité.

États de référence fonctionnelle :
- actif ;
- inactif.

Important :
- la maquette affiche des badges de statut opérationnel nommés `Disponible`, `Réservé`, `Maintenance`, `Hors service` ;
- la distinction fonctionnelle `statut administratif` / `disponibilité générale` / `archivage` doit rester explicite dans la conception cible.

Conclusion UI/UX :
- reproduire visuellement la maquette ;
- préserver dans la spécification de données une séparation stricte entre ces notions.

## 18. Colonne disponibilité générale
La maquette affiche une colonne `Disponibilité` avec des valeurs de type :
- `Maintenant` ;
- date + heure planifiée ;
- `—`.

Règles UI/UX :
- texte court, aligné avec la ligne ;
- état lisible sans ouvrir la fiche ;
- ne pas confondre avec la colonne de statut.

Règle métier :
- le passage disponible/indisponible doit être une action explicite autorisée ;
- aucune bascule automatique depuis anomalie, vérification ou désinfection.

## 19. Colonne base / dépôt
Colonne visible nommée `Dépôt / Base`.

Règles :
- afficher la base/dépôt principal de rattachement ;
- accepter des libellés sur deux lignes si nécessaire ;
- maintenir une lisibilité homogène entre lignes.

Règle métier associée :
- la base/dépôt est une information de référence ;
- elle ne bloque pas automatiquement les affectations planning ;
- un véhicule peut ne pas rentrer à la même base le soir.

## 20. Colonne résumé de suivi
Constat maquette :
- aucune colonne explicitement titrée `Résumé de suivi` dans le tableau.

Règle de documentation codable :
- si un résumé de suivi est implémenté plus tard, il doit rester synthétique et non intrusif ;
- il ne doit pas embarquer les workflows détaillés ;
- le détail appartient à la page `Suivi des véhicules`.

## 21. Colonne actions
Zone `Actions` visible avec :
- bouton icône édition (crayon) ;
- bouton menu contextuel (trois points).

Règles :
- actions visibles selon permissions ;
- menu contextuel pour actions secondaires (désactiver, réactiver, archiver, restaurer, etc.) ;
- aucune action destructive de suppression physique.

## 22. Fiche détail véhicule
La fiche détail n’est pas ouverte dans la maquette principale, mais est demandée fonctionnellement.

Exigences UI/UX codables :
- mode consultation ;
- mode modification si autorisé ;
- affichage distinct :
  - identité véhicule ;
  - type ;
  - immatriculation ;
  - statut administratif ;
  - disponibilité générale ;
  - archivage ;
  - base/dépôt principal ;
  - résumé de suivi simple ;
  - accès `Suivi des véhicules` si disponible.

La fiche détail doit rester cohérente avec la table, sans dupliquer les workflows Suivi.

## 23. Création véhicule
Action de création :
- déclenchée depuis `Ajouter un véhicule` ;
- réservée aux rôles autorisés (Admin, Gérant en Alpha).

Champs fonctionnels à prévoir dans le formulaire :
- nom interne personnalisable ;
- marque ;
- modèle ;
- type ;
- immatriculation ;
- statut administratif ;
- disponibilité générale ;
- base / dépôt principal ;
- commentaire interne simple si conservé au périmètre produit.

## 24. Modification véhicule
Action de modification :
- accessible depuis la ligne ou la fiche selon permission ;
- conserve l’historique (pas de suppression physique).

Règles :
- toute modification sensible doit être traçable dans l’audit ;
- la modification ne doit pas mélanger statuts administratifs, disponibilité et archivage ;
- la page Véhicules ne doit pas devenir l’éditeur de suivi détaillé.

## 25. Changement de disponibilité
Action attendue :
- bascule explicite `disponible` / `indisponible` si permission dédiée.

Règles obligatoires :
- action volontaire utilisateur autorisé ;
- traçage audit ;
- pas d’automatisme depuis anomalies/vérifications/désinfections ;
- ne pas confondre cette action avec archivage ou activation administrative.

## 26. Désactivation réactivation archivage restauration
Actions de cycle de vie attendues :
- désactiver ;
- réactiver ;
- archiver ;
- consulter archivés ;
- restaurer / désarchiver.

Contraintes :
- aucune suppression physique en Alpha ;
- désarchiver ne réactive pas automatiquement ;
- désarchiver ne rend pas automatiquement disponible ;
- conservation de l’historique.

## 27. Lien avec Suivi des véhicules
Maquette visible :
- carte `Actions rapides` avec entrées :
  - `Planning des véhicules`
  - `Contrôles & Documents`
  - `Assurances`
  - `Maintenance`

Règle fonctionnelle :
- la page `Véhicules` peut proposer un accès au `Suivi des véhicules` si disponible ;
- le suivi détaillé (vérifications, désinfections, anomalies) ne doit pas être implémenté directement ici.

## 28. Badges et statuts visuels
Badges visibles :
- type : `Ambulance`, `VSL` ;
- statuts affichés en badges colorés : `Disponible`, `Réservé`, `Maintenance`, `Hors service`.

Règles :
- badges à rayon arrondi doux ;
- contraste texte/fond suffisant ;
- palettes distinctes par statut pour éviter ambiguïté.

Règle métier :
- l’archivage est une dimension séparée, non absorbée par ces badges de ligne.

## 29. Boutons et actions
Inventaire visuel :
- bouton secondaire contour : `Importer des véhicules` ;
- bouton primaire plein : `Ajouter un véhicule` ;
- bouton `Filtres` ;
- boutons icônes par ligne (édition, menu) ;
- pagination : précédent/suivant + pages ;
- sélecteur `Lignes par page`.

Règles d’usage :
- primaire unique sur la zone en-tête ;
- actions de masse non visibles dans la maquette ;
- état disabled explicite pour actions non autorisées ou non disponibles.

## 30. États visuels à prévoir
États à prévoir pour codage futur :
- chargement initial page ;
- chargement table ;
- liste vide globale ;
- aucun résultat de recherche/filtre ;
- erreur de chargement ;
- erreur d’action ;
- état sans permission d’édition ;
- vue archivés (si activée par filtre).

Ces états ne doivent pas altérer la structure principale de la maquette.

## 31. Hiérarchie visuelle
Ordre de lecture attendu :
1. Titre `Véhicules`.
2. CTA de haut de page (notamment `Ajouter un véhicule`).
3. KPI de synthèse.
4. Barre de filtres.
5. Table principale.
6. Panneau droit (répartition, alertes, actions rapides).
7. Pagination.

La hiérarchie doit rester stable pour conserver la vitesse de lecture opérationnelle.

## 32. Espacements dimensions et densité
Principes de densité visibles :
- cartes et blocs avec padding interne régulier ;
- espacement vertical constant entre sections ;
- table dense mais lisible (lignes compactes, sous-texte de second niveau) ;
- zone actions de ligne compacte et alignée ;
- densité adaptée à un usage back-office B2B à volume.

À reproduire :
- densité desktop élevée sans surcharge ;
- séparation claire entre blocs via bordures fines et espaces contrôlés.

## 33. Couleurs et ambiance visuelle
Ambiance générale observée :
- fond global clair ;
- surfaces cartes blanches ;
- bleu produit dominant pour CTA et éléments actifs ;
- accents couleur pour statuts (vert, orange, violet, rouge, cyan selon contexte) ;
- bordures très légères.

Règle de reproduction :
- conserver une interface sobre, professionnelle, orientée exploitation flotte ;
- éviter dérive chromatique non présente dans la maquette.

## 34. Typographie
Règles typographiques visibles :
- titre page en taille forte et graisse élevée ;
- sous-titres/cartes en graisse intermédiaire ;
- données clés (KPI, compteurs) plus contrastées ;
- textes secondaires (sous-lignes, aides) en taille inférieure.

Objectif :
- lisibilité immédiate sur grand tableau dense ;
- stabilité de rythme visuel entre blocs.

## 35. Icônes
Icônes visibles :
- icône plus sur bouton création ;
- icône upload/import ;
- icône loupe recherche ;
- icônes de filtres et de vue ;
- icônes d’édition/menu ligne ;
- icônes de KPI ;
- icônes dans la navigation et cartes latérales.

Règles :
- style cohérent de trait ;
- taille harmonisée ;
- usage utilitaire, non décoratif.

## 36. Règles de permissions visibles
Règles à rendre visibles dans l’UI :
- utilisateurs terrain : lecture simple ;
- utilisateurs terrain sans permission dédiée : pas de création, modification, archivage, désactivation/réactivation, changement disponibilité ;
- Admin et Gérant : gestion complète en Alpha.

Traitement UI :
- masquer ou désactiver actions selon permission ;
- afficher uniquement les actions réellement exécutables ;
- tracer en audit toutes actions sensibles.

## 37. Règles d’ergonomie métier
Règles métier structurantes :
- distinguer strictement `statut administratif`, `disponibilité générale`, `archivage` ;
- ne pas rendre un véhicule indisponible automatiquement depuis une anomalie/vérification/désinfection ;
- base/dépôt = référence, pas contrainte bloquante planning ;
- un véhicule peut finir hors de sa base principale ;
- page Véhicules = référentiel ;
- suivi détaillé = page Suivi des véhicules.

## 38. Composants réutilisables futurs
Composants à prévoir (documentation uniquement, sans implémentation ici) :
- `components/vehicles/VehiclesPage`
- `components/vehicles/VehiclesTable`
- `components/vehicles/VehicleRow`
- `components/vehicles/VehicleIdentityCell`
- `components/vehicles/VehicleTypeBadge`
- `components/vehicles/VehicleStatusBadge`
- `components/vehicles/VehicleAvailabilityBadge`
- `components/vehicles/VehicleDepotCell`
- `components/vehicles/VehicleFollowUpSummary`
- `components/vehicles/VehicleFilters`
- `components/vehicles/VehicleDetailPanel`
- `components/vehicles/VehicleForm`
- `components/vehicles/VehicleAvailabilityAction`
- `components/vehicles/VehicleArchiveAction`
- `components/ui/PageHeader`
- `components/ui/Card`
- `components/ui/Table`
- `components/ui/Badge`
- `components/ui/Button`
- `components/ui/Input`
- `components/ui/Select`
- `components/ui/EmptyState`
- `components/ui/LoadingState`

## 39. Stratégie Tailwind future
Documentation attendue pour codage futur (sans créer de config complète ici) :
- grille de page : ratio colonne principale / colonne latérale ;
- largeur tableau et comportement d’overflow ;
- panneau détail (si ouverture latérale ou modale) ;
- padding contenu par section ;
- gaps inter-zones ;
- rayons de cartes et badges ;
- bordures fines et uniformes ;
- ombres légères des cartes ;
- couleurs de badges par type véhicule ;
- couleurs par statut administratif ;
- couleurs par disponibilité ;
- densité de lignes table (hauteur, paddings) ;
- états `hover`, `focus`, `disabled` ;
- stratégie responsive desktop/tablette/mobile.

## 40. Responsive futur
Cible responsive future (sans maquette mobile fournie ici) :
- conserver priorité au tableau véhicule ;
- passer les filtres en empilement progressif ;
- déplacer les cartes latérales sous le tableau sur écrans réduits ;
- préserver lisibilité des badges et actions ;
- éviter perte d’information critique (statuts, disponibilité, base, actions).

Tout arbitrage précis mobile reste à valider lors d’une maquette dédiée.

## 41. Accessibilité minimale
Exigences minimales :
- contraste suffisant textes/badges/boutons ;
- focus visible sur contrôles interactifs ;
- libellés explicites sur actions icônes (édition, menu) ;
- navigation clavier sur filtres, table et pagination ;
- états disabled compréhensibles ;
- information non portée uniquement par la couleur.

## 42. Ce qui doit être codé plus tard
À coder ultérieurement selon ce référentiel :
- page Véhicules conforme à la maquette V2 ;
- listing avec colonnes définies ;
- filtres et recherche ;
- actions selon permissions ;
- fiche détail véhicule ;
- flux création / modification ;
- disponibilité explicite autorisée ;
- désactivation / réactivation / archivage / restauration ;
- vue ou filtre de consultation des archivés ;
- lien vers Suivi des véhicules si disponible ;
- états loading/empty/error.

## 43. Ce qui ne doit pas être codé
Interdits de périmètre dans cette page :
- suppression physique véhicule ;
- indisponibilité automatique depuis anomalie/vérification/désinfection ;
- contrainte bloquante stricte par base/dépôt ;
- maintenance avancée en Alpha non validée ;
- onglet Entretien en V1/Alpha ;
- workflow détaillé de vérification dans cette page ;
- workflow détaillé de désinfection dans cette page ;
- workflow détaillé d’anomalies dans cette page ;
- régulation ;
- géolocalisation ;
- suivi temps réel ;
- optimisation par distance ;
- modification des permissions depuis cette page ;
- debug visible ;
- JSON visible.

## 44. Interdictions de dérive
Interdictions de dérive UI/UX :
- ne pas transformer la page en cockpit de maintenance détaillée ;
- ne pas fusionner statuts administratifs et opérationnels sans explicitation ;
- ne pas ajouter d’actions non autorisées par rôle ;
- ne pas introduire de suppression définitive ;
- ne pas inventer de widgets non présents dans la maquette de référence ;
- ne pas substituer la page Suivi des véhicules par des workflows embarqués ici.

## 45. Checklist de conformité visuelle 99 %
- Le shell global conserve la structure sidebar + topbar + contenu.
- Le titre `Véhicules` et son sous-texte correspondent à la maquette.
- Les boutons `Importer des véhicules` et `Ajouter un véhicule` sont en place, avec hiérarchie visuelle correcte.
- Les 5 KPI sont présents avec ordre, libellés et logique de valeur identiques.
- La barre de recherche/filtres contient `Rechercher`, `Statut`, `Type`, `Dépôt / Base`, `Filtres`, bouton de vue.
- La zone principale reste en deux colonnes (table gauche, panneaux droits).
- La carte `Liste des véhicules` est prioritaire visuellement.
- Les colonnes visibles sont conformes : `Véhicule`, `Immatriculation`, `Type`, `Dépôt / Base`, `Statut`, `Disponibilité`, `Actions`.
- La structure de la colonne véhicule respecte nom interne + marque/modèle (ou équivalent de second niveau).
- Les types véhicule restent contraints à `AMBULANCE`, `VSL`, `TAXI`, `TPMR` (affichage en majuscules côté règle métier).
- Les badges de statut restent visuellement distincts.
- La distinction fonctionnelle `statut administratif` / `disponibilité générale` / `archivage` est conservée dans la conception.
- Aucune suppression physique n’est proposée.
- Le changement de disponibilité reste explicite et autorisé.
- Aucune indisponibilité automatique depuis anomalie/vérification/désinfection n’est codée.
- La base/dépôt reste informative et non bloquante par défaut pour le planning.
- Les actions sensibles sont conçues comme auditables.
- Les actions non autorisées sont masquées ou désactivées selon permissions.
- Les vues état vide/loading/erreur sont prévues sans casser la structure.
- Les styles (espacements, bordures, rayons, densité, couleurs, typo, icônes) restent alignés avec l’ambiance V2.
- La page reste une référence UI/UX codable et non une validation fonctionnelle définitive.
