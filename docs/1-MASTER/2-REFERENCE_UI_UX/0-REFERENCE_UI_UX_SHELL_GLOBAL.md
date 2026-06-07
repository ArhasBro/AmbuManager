# Ambulance Manager — Référence UI/UX — Shell global / navigation

Version : V2  
Statut : référence UI/UX codable  
Objectif : reproduction visuelle 99 %  
Source visuelle : docs/1-MASTER/1-MAQUETTE/0-Shell-Global/Shell-Global_V2.png  
Source fonctionnelle : docs/1-MASTER/3-FONCTIONNALITES/0-FONCTIONNALITES_DETAILLEES_SHELL_GLOBAL_NAVIGATION_V1.md

## Sommaire
- [1. Objectif du document](#1-objectif-du-document)
- [2. Sources utilisées](#2-sources-utilisées)
- [3. Règle d’autorité](#3-règle-dautorité)
- [4. Rôle du Shell global](#4-rôle-du-shell-global)
- [5. Objectif UX du Shell](#5-objectif-ux-du-shell)
- [6. Structure générale de l’écran connecté](#6-structure-générale-de-lécran-connecté)
- [7. Layout desktop attendu](#7-layout-desktop-attendu)
- [8. Sidebar gauche](#8-sidebar-gauche)
- [9. Logo et identité produit](#9-logo-et-identité-produit)
- [10. Navigation principale](#10-navigation-principale)
- [11. États visuels de navigation](#11-états-visuels-de-navigation)
- [12. Topbar](#12-topbar)
- [13. Zone utilisateur et société](#13-zone-utilisateur-et-société)
- [14. Contrôle du thème](#14-contrôle-du-thème)
- [15. Déconnexion](#15-déconnexion)
- [16. Zone de contenu principal](#16-zone-de-contenu-principal)
- [17. Hiérarchie visuelle](#17-hiérarchie-visuelle)
- [18. Espacements, dimensions et densité](#18-espacements-dimensions-et-densité)
- [19. Couleurs et ambiance visuelle](#19-couleurs-et-ambiance-visuelle)
- [20. Typographie](#20-typographie)
- [21. Icônes](#21-icônes)
- [22. Composants réutilisables futurs](#22-composants-réutilisables-futurs)
- [23. Stratégie Tailwind future](#23-stratégie-tailwind-future)
- [24. Règles de permissions visibles](#24-règles-de-permissions-visibles)
- [25. États visuels à prévoir](#25-états-visuels-à-prévoir)
- [26. Responsive futur](#26-responsive-futur)
- [27. Accessibilité minimale](#27-accessibilité-minimale)
- [28. Ce qui doit être codé plus tard](#28-ce-qui-doit-être-codé-plus-tard)
- [29. Ce qui ne doit pas être codé](#29-ce-qui-ne-doit-pas-être-codé)
- [30. Interdictions de dérive](#30-interdictions-de-dérive)
- [31. Checklist de conformité visuelle 99 %](#31-checklist-de-conformité-visuelle-99-)

## 1. Objectif du document
Définir une référence UI/UX codable du Shell global (navigation + cadre connecté) pour viser une reproduction visuelle minimale de 99 % de la maquette V2, sans présumer une validation fonctionnelle définitive.

## 2. Sources utilisées
- Source visuelle unique : `docs/1-MASTER/1-MAQUETTE/0-Shell-Global/Shell-Global_V2.png`.
- Source fonctionnelle unique : `docs/1-MASTER/3-FONCTIONNALITES/0-FONCTIONNALITES_DETAILLEES_SHELL_GLOBAL_NAVIGATION_V1.md`.
- Référence observée : écran desktop 1586 × 992 px (PNG).

## 3. Règle d’autorité
Ordre strict d’autorité :
1. Maquette `Shell-Global_V2.png`.
2. Fiche fonctionnelle Shell global/navigation V1.
3. Aucun ajout spéculatif.

Contraintes :
- Ne pas utiliser le code existant comme source visuelle.
- Ne pas reprendre d’anciens référentiels UI/UX comme source d’arbitrage.
- En cas d’écart maquette/fonctionnel : la maquette pilote le visuel, la fiche pilote la logique métier visible.

## 4. Rôle du Shell global
Le Shell global est le conteneur transversal des pages connectées :
- maintenir un cadre constant gauche + haut + zone de travail ;
- donner un accès immédiat aux modules autorisés ;
- afficher le contexte de session (société, utilisateur, déconnexion, thème) ;
- garantir une continuité visuelle entre modules.

Le Shell n’est pas une page métier autonome et ne vaut pas validation fonctionnelle finale.

## 5. Objectif UX du Shell
- Réduire le temps de repérage du module actif.
- Permettre la navigation en un clic vers les modules autorisés.
- Exposer un contexte session lisible sans surcharge.
- Séparer clairement navigation transverse et contenu métier.
- Conserver une ambiance claire, calme, professionnelle, sans effet décoratif excessif.

## 6. Structure générale de l’écran connecté
Structure en 3 zones persistantes :
1. Sidebar gauche fixe pleine hauteur.
2. Topbar horizontale en tête de la zone droite.
3. Zone de contenu principal sous topbar.

Comportement général :
- la sidebar ne scroll pas avec le contenu principal ;
- le contenu principal porte le scroll vertical métier ;
- la topbar reste visuellement persistante au-dessus du contenu.

## 7. Layout desktop attendu
Repères visuels mesurés sur la maquette V2 (1586 × 992) :
- largeur sidebar : ~283 px (environ 17,8 % de la largeur écran) ;
- zone droite : ~1303 px (environ 82,2 %) ;
- hauteur topbar : ~72 px ;
- contenu principal : sous topbar avec marges internes régulières.

Répartition :
- colonne gauche dédiée à l’identité, navigation, préférences, bloc utilisateur ;
- colonne droite dédiée au titre de page, résumé de session, cartes de pilotage.

## 8. Sidebar gauche
Composition verticale observée :
1. Bloc marque en tête.
2. Navigation principale (liste d’entrées métier).
3. Espace flexible.
4. Carte contrôle thème.
5. Carte utilisateur.

Caractéristiques :
- fond très clair uniforme ;
- séparation verticale fine avec la zone droite ;
- coins arrondis globaux du conteneur d’application ;
- chaque item de navigation occupe la largeur utile de la sidebar avec icône à gauche et texte aligné.

## 9. Logo et identité produit
Bloc identité visible en haut de sidebar :
- pictogramme ambulance à gauche ;
- libellé `Ambulance Manager` sur deux lignes ;
- badge `ALPHA` accolé à droite du nom.

Règles :
- conserver la hiérarchie visuelle actuelle : nom produit dominant, badge secondaire ;
- ne pas déplacer le badge en topbar ;
- ne pas substituer l’identité par un acronyme seul.

## 10. Navigation principale
Entrées métier visibles/attendues pour le Shell V1 :
- `Tableau de bord`
- `Planning`
- `Utilisateurs / RH`
- `Véhicules`
- `Modèles horaires`
- `Société`
- `Dépôts / Bases`
- `Mise en route`
- `Audit`

Entrée conditionnelle :
- `Suivi des véhicules` uniquement si prévue par la fiche fonctionnelle active ou visible dans une maquette validée ; sinon non affichée.

Nomenclature obligatoire :
- afficher `Modèles horaires` (et non `Templates`) ;
- afficher `Mise en route` (et non `Onboarding`) ;
- `Privacy` ne doit jamais être une entrée métier principale de sidebar.

## 11. États visuels de navigation
État inactif :
- texte gris-bleuté ;
- icône même tonalité ;
- fond transparent.

État actif :
- fond bleu très clair à coins arrondis ;
- texte bleu accentué ;
- icône bleu accentué ;
- poids visuel supérieur aux items inactifs.

État hover :
- léger renforcement du fond et du contraste texte/icône ;
- aucune animation agressive.

État focus clavier :
- anneau de focus visible à contraste suffisant autour de l’item.

État disabled (si appliqué à un item visible non interactif) :
- opacité réduite ;
- curseur non interactif ;
- jamais utilisé pour contourner la règle “module non autorisé masqué”.

## 12. Topbar
Contenu topbar observé, aligné à droite :
- contexte société ;
- contrôle thème compact ;
- identité utilisateur compacte ;
- action déconnexion.

Style :
- fond clair identique à l’ambiance générale ;
- bordure basse légère de séparation ;
- composants en “capsules”/zones délimitées avec angles arrondis ;
- densité horizontale maîtrisée, sans surcharger la tête de page.

## 13. Zone utilisateur et société
Contexte société :
- capsule avec icône institution + nom société (`SC Ambulances`) + chevron ;
- positionnée avant le thème et la zone utilisateur.

Zone utilisateur topbar :
- avatar compact ;
- nom affiché (`Nathan A.` dans maquette) ;
- rôle affiché en dessous (`Admin`) ;
- chevron indiquant menu utilisateur potentiel.

Carte utilisateur sidebar (bas gauche) :
- avatar plus large ;
- nom + rôle ;
- chevron de menu.

Règle de cohérence :
- topbar = version compacte ;
- bas sidebar = version contextualisée persistante.

## 14. Contrôle du thème
Deux emplacements visibles :
- topbar : bouton icône compact ;
- sidebar bas : carte `Thème` avec bascule et pictogrammes jour/nuit.

Règles UX :
- ne pas multiplier les variantes de contrôle ;
- conserver un état visuel net de la bascule ;
- ne pas ajouter de mode supplémentaire dans cette référence (uniquement logique clair/sombre à ce stade documentaire).

## 15. Déconnexion
Déconnexion visible en topbar :
- icône + libellé `Déconnexion` ;
- style discret mais clairement actionnable.

Règles :
- toujours accessible depuis le Shell connecté ;
- ne pas enterrer la déconnexion dans un sous-menu unique ;
- conserver la lisibilité du libellé texte.

## 16. Zone de contenu principal
Structure observée côté contenu :
- titre de page principal (`Tableau de bord`) ;
- sous-titre descriptif ;
- carte de contexte utilisateur connectée ;
- rangée de cartes KPI ;
- grille de cartes modules avec statut + action.

Le Shell doit accueillir ces blocs sans collision avec sidebar/topbar et sans rupture des marges.

## 17. Hiérarchie visuelle
Ordre de lecture attendu :
1. Module actif en sidebar.
2. Titre principal de page.
3. Résumé de session connecté.
4. KPI synthétiques.
5. Cartes modules et actions.
6. Commandes de session en topbar.

Priorisation :
- navigation claire mais non dominante sur le contenu ;
- contenu métier dominant dans la zone droite ;
- actions de session disponibles mais secondaires visuellement.

## 18. Espacements, dimensions et densité
Repères relatifs observés :
- grille générale aérée ; pas de blocs collés ;
- padding interne confortable dans sidebar, topbar, cartes ;
- espacement vertical constant entre sections de contenu ;
- éléments alignés sur une trame rectiligne.

Repères quantifiés issus du PNG :
- largeur sidebar ~283 px ;
- hauteur topbar ~72 px ;
- marges latérales zone contenu visuellement homogènes ;
- cartes de même famille alignées et hauteur homogène.

Densité :
- densité intermédiaire (ni compacte extrême, ni “marketing”) ;
- lisibilité prioritaire pour usage B2B quotidien.

## 19. Couleurs et ambiance visuelle
Ambiance dominante :
- fond global très clair à nuance froide ;
- blanc pour surfaces de cartes ;
- bordures fines gris bleuté ;
- accent principal bleu (navigation active, actions clés) ;
- accents secondaires contextualisés (vert disponibilité, orange alerte permission, rouge absence, turquoise flotte).

Règles :
- conserver des contrastes doux mais lisibles ;
- éviter toute saturation excessive ;
- éviter les aplats sombres massifs dans cette référence.

## 20. Typographie
Usage observé :
- titre de page : très fort niveau hiérarchique ;
- sous-titres/cartes : taille intermédiaire ;
- métadonnées/statuts : petite taille lisible ;
- poids typographique variable pour distinguer labels, valeurs, descriptions.

Règles :
- privilégier la lisibilité (interlignage stable, alignement net) ;
- conserver des longueurs de ligne courtes à moyennes dans sidebar ;
- ne pas compresser la typographie pour augmenter artificiellement la densité.

## 21. Icônes
Rôle des icônes :
- identifier rapidement les modules sidebar ;
- qualifier les KPIs/cartes modules ;
- renforcer les actions de session (thème, déconnexion, contexte).

Style attendu :
- famille visuelle cohérente ;
- taille homogène par zone (sidebar, topbar, cartes) ;
- couleurs synchronisées avec l’état (actif/inactif/alerte/disponible).

## 22. Composants réutilisables futurs
Composants shell à prévoir (documentation uniquement, sans création ici) :
- `components/shell/AppShell`
- `components/shell/Sidebar`
- `components/shell/SidebarNavItem`
- `components/shell/Topbar`
- `components/shell/UserMenu`
- `components/shell/CompanyContext`
- `components/shell/ThemeToggle`
- `components/shell/LogoutButton`
- `components/shell/AccessDeniedState`

Composants UI support à prévoir :
- `components/ui/PageHeader`
- `components/ui/Card`
- `components/ui/Badge`
- `components/ui/Button`
- `components/ui/IconButton`
- `components/ui/Tooltip`

## 23. Stratégie Tailwind future
Documenter puis implémenter plus tard un socle de tokens utilitaires pour :
- largeur sidebar ;
- hauteur topbar ;
- couleurs de fond ;
- couleurs de bordure ;
- couleurs de texte ;
- couleur d’accent bleu ;
- rayons ;
- ombres légères ;
- espacements ;
- tailles d’icônes ;
- états actif / hover / focus.

Règle de méthode :
- verrouiller d’abord les tokens Shell globaux ;
- décliner ensuite dans les composants ;
- éviter la dérive par valeurs arbitraires locales.

## 24. Règles de permissions visibles
Application visuelle des permissions :
- modules non autorisés non affichés dans la navigation ;
- aucune entrée “fantôme” cliquable ;
- cohérence stricte entre visibilité et autorisation réelle.

Accès direct interdit :
- toute URL non autorisée mène à un état/page `Accès refusé`.

Important :
- référence UI/UX codable ≠ validation fonctionnelle finale des règles RBAC ;
- la matrice exacte rôle/permission reste à confirmer fonctionnellement.

## 25. États visuels à prévoir
États Shell requis :
- standard connecté ;
- chargement session/navigation ;
- erreur de chargement navigation ;
- accès refusé route non autorisée ;
- focus clavier visible.

États d’interaction :
- actif, inactif, hover, focus, disabled selon composant.

État accès refusé :
- message explicite ;
- action de retour vers un module autorisé ;
- pas de détails techniques internes.

## 26. Responsive futur
Référence actuelle : desktop.

Cible future :
- sidebar repliable ou tiroir mobile ;
- topbar simplifiée sur petits écrans ;
- conservation des priorités : navigation, contexte session, déconnexion.

Règle :
- ne pas dégrader les libellés métiers validés lors du passage responsive ;
- conserver la logique de permissions (masquage + accès refusé).

## 27. Accessibilité minimale
Exigences minimales à respecter lors du codage futur :
- navigation clavier complète (sidebar, topbar, menus) ;
- focus visible sur tous éléments interactifs ;
- contrastes texte/fond suffisants ;
- libellés explicites pour actions icône seule ;
- structure sémantique claire (navigation, en-tête, contenu principal).

Point de cadrage :
- cette référence pose un minimum UX/UI ; la conformité accessibilité exhaustive reste à valider dans une phase dédiée.

## 28. Ce qui doit être codé plus tard
- structure Shell commune (gauche + haut + contenu) ;
- navigation principale avec état actif robuste ;
- zones société/utilisateur cohérentes topbar + sidebar ;
- contrôle thème aux emplacements validés ;
- action déconnexion persistante ;
- état `Accès refusé` ;
- gestion des permissions visibles ;
- état de chargement/erreur du Shell.

## 29. Ce qui ne doit pas être codé
- recherche globale ;
- notifications globales ;
- création rapide globale ;
- debug visible ;
- `Privacy` en entrée métier principale ;
- changement manuel de société ;
- choix manuel de rôle ;
- choix manuel de dépôt/base ;
- cockpit analytique dans le Shell ;
- surcharge graphique.

## 30. Interdictions de dérive
- Ne pas substituer les libellés actifs par `Templates` ou `Onboarding`.
- Ne pas injecter des modules non validés dans la navigation principale.
- Ne pas transformer la topbar en barre d’outils riche hors périmètre.
- Ne pas surcharger la sidebar d’actions secondaires.
- Ne pas considérer ce document comme validation fonctionnelle définitive.
- Ne pas utiliser des styles visuels éloignés de la maquette V2 (formes, densité, couleurs, hiérarchie).

## 31. Checklist de conformité visuelle 99 %
- Structure écran conforme : sidebar fixe gauche + topbar + contenu principal.
- Proportions globales respectées : sidebar ~17,8 %, topbar ~72 px sur PNG de référence.
- Bloc marque fidèle : ambulance + `Ambulance Manager` + badge `ALPHA`.
- Navigation conforme et ordonnée : `Tableau de bord`, `Planning`, `Utilisateurs / RH`, `Véhicules`, `Modèles horaires`, `Société`, `Dépôts / Bases`, `Mise en route`, `Audit`.
- Aucune apparition de `Templates` ou `Onboarding` comme libellés actifs.
- `Privacy` absent de la navigation métier principale.
- État actif de navigation lisible et prioritaire.
- Zone société et zone utilisateur cohérentes en topbar.
- Carte utilisateur et carte thème présentes en bas de sidebar.
- Déconnexion visible et accessible.
- Modules non autorisés masqués.
- Accès direct non autorisé redirigé vers `Accès refusé`.
- Ambiance visuelle claire B2B respectée (fonds, bordures, accent bleu, densité).
- Aucune fonctionnalité hors périmètre V1 ajoutée.
- Distinction explicite maintenue : référence UI/UX codable vs validation fonctionnelle définitive.
