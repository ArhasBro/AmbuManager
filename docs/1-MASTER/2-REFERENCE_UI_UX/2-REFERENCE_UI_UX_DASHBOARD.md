# Ambulance Manager — Référence UI/UX — Tableau de bord

Version : V2  
Statut : référence UI/UX codable  
Objectif : reproduction visuelle 99 %  
Source visuelle : docs/1-MASTER/1-MAQUETTE/2-Dashboard/Dashboard_V2.png  
Source fonctionnelle : docs/1-MASTER/3-FONCTIONNALITES/2-FONCTIONNALITES_DETAILLEES_TABLEAU_DE_BORD_V1.1.md  

## Sommaire
- [1. Objectif du document](#1-objectif-du-document)
- [2. Sources utilisées](#2-sources-utilisées)
- [3. Règle d’autorité](#3-règle-dautorité)
- [4. Rôle du Tableau de bord](#4-rôle-du-tableau-de-bord)
- [5. Objectif UX de la page](#5-objectif-ux-de-la-page)
- [6. Structure générale de l’écran](#6-structure-générale-de-lécran)
- [7. Layout desktop attendu](#7-layout-desktop-attendu)
- [8. En-tête de page](#8-en-tête-de-page)
- [9. Actions de personnalisation](#9-actions-de-personnalisation)
- [10. Zone KPI principale](#10-zone-kpi-principale)
- [11. KPI utilisateurs](#11-kpi-utilisateurs)
- [12. KPI véhicules](#12-kpi-véhicules)
- [13. KPI planning](#13-kpi-planning)
- [14. Zone Planning et activités](#14-zone-planning-et-activités)
- [15. Widgets planning personnel](#15-widgets-planning-personnel)
- [16. Widgets planning global / équipes](#16-widgets-planning-global--équipes)
- [17. Informations importantes](#17-informations-importantes)
- [18. Alertes planning](#18-alertes-planning)
- [19. Alertes véhicules](#19-alertes-véhicules)
- [20. Zone raccourcis métier](#20-zone-raccourcis-métier)
- [21. Cards et widgets](#21-cards-et-widgets)
- [22. Boutons et actions](#22-boutons-et-actions)
- [23. Badges et statuts](#23-badges-et-statuts)
- [24. Icônes et pictogrammes](#24-icônes-et-pictogrammes)
- [25. Hiérarchie visuelle](#25-hiérarchie-visuelle)
- [26. Espacements, dimensions et densité](#26-espacements-dimensions-et-densité)
- [27. Couleurs et ambiance visuelle](#27-couleurs-et-ambiance-visuelle)
- [28. Typographie](#28-typographie)
- [29. États visuels à prévoir](#29-états-visuels-à-prévoir)
- [30. Règles de personnalisation](#30-règles-de-personnalisation)
- [31. Règles de permissions visibles](#31-règles-de-permissions-visibles)
- [32. Composants réutilisables futurs](#32-composants-réutilisables-futurs)
- [33. Stratégie Tailwind future](#33-stratégie-tailwind-future)
- [34. Responsive futur](#34-responsive-futur)
- [35. Accessibilité minimale](#35-accessibilité-minimale)
- [36. Ce qui doit être codé plus tard](#36-ce-qui-doit-être-codé-plus-tard)
- [37. Ce qui ne doit pas être codé](#37-ce-qui-ne-doit-pas-être-codé)
- [38. Interdictions de dérive](#38-interdictions-de-dérive)
- [39. Checklist de conformité visuelle 99 %](#39-checklist-de-conformité-visuelle-99-)

## 1. Objectif du document
Ce document définit une référence UI/UX codable pour reproduire visuellement le Tableau de bord V2 avec une ressemblance minimale de 99 % à la maquette validée.

Cette référence UI/UX ne vaut pas validation fonctionnelle définitive. Les règles métier non confirmées restent marquées comme points à confirmer dans les fiches fonctionnelles.

## 2. Sources utilisées
- Source visuelle prioritaire : `docs/1-MASTER/1-MAQUETTE/2-Dashboard/Dashboard_V2.png`.
- Source fonctionnelle secondaire : `docs/1-MASTER/3-FONCTIONNALITES/2-FONCTIONNALITES_DETAILLEES_TABLEAU_DE_BORD_V1.1.md`.

Aucune autre source visuelle n’est utilisée.

## 3. Règle d’autorité
1. Maquette Dashboard V2.
2. Fiche fonctionnalités Tableau de bord.
3. Aucune hypothèse hors de ces deux sources.
4. Aucun ancien fichier UI/UX comme autorité.
5. Aucun code existant comme source visuelle.

En cas de conflit, la maquette prévaut sur la fiche fonctionnelle pour le rendu visuel.

## 4. Rôle du Tableau de bord
Le Tableau de bord est la page d’accueil après connexion.

Le rôle attendu est un portail opérationnel simple pour démarrer la journée, consulter les indicateurs essentiels, voir le planning utile et accéder aux modules autorisés.

Le Tableau de bord ne doit pas devenir un cockpit analytique.

## 5. Objectif UX de la page
Objectif principal : permettre une compréhension immédiate de la situation opérationnelle en un seul écran.

Objectifs UX concrets :
- Voir les 4 KPI clés sans défilement horizontal.
- Lire les informations de planning personnel et global depuis des cartes courtes.
- Identifier les alertes simples sans surcharge visuelle.
- Ouvrir rapidement un module métier via les raccourcis autorisés.
- Garder une personnalisation simple, contrôlée, sans complexité de configuration.

## 6. Structure générale de l’écran
La page est intégrée dans un Shell applicatif avec :
- Barre latérale gauche fixe avec navigation principale et profil.
- Barre haute globale contenant société active, thème, profil utilisateur et déconnexion.
- Zone de contenu principale à droite, structurée en sections verticales.

Ordre vertical des sections de contenu :
1. En-tête page (`Tableau de bord` + sous-titre + actions).
2. Rangée KPI (4 tuiles).
3. Bloc `Planning et activités` (6 widgets).
4. Rangée alertes/informations (3 cartes).
5. Bloc `Raccourcis` (8 cartes modules).

## 7. Layout desktop attendu
Référence maquette observée : canevas large desktop (image source 1586 x 992).

Rendu desktop attendu :
- Sidebar gauche visuellement séparée par un filet discret.
- Contenu principal centré dans la zone droite avec marges constantes.
- Grilles régulières : 4 colonnes KPI, 6 colonnes widgets planning, 3 colonnes alertes, 8 colonnes raccourcis.
- Toutes les cartes ont une hauteur stable par famille pour créer un rythme visuel dense mais lisible.

Règle de densité : la page doit rester compacte et exploitable sans effet “dashboard analytique chargé”.

## 8. En-tête de page
Emplacement : haut de la zone de contenu, sous la barre globale.

Contenu observé :
- Titre principal : `Tableau de bord`.
- Sous-titre : `Vue d’accueil opérationnelle selon vos droits et vos préférences.`
- Actions à droite : `Personnaliser`, `Réinitialiser`.
- Badge contextuel : `Widgets autorisés selon vos droits`.

Rôle visuel : introduire la page et expliciter que l’affichage dépend des droits et préférences utilisateur.

## 9. Actions de personnalisation
Actions visibles :
- Bouton secondaire `Personnaliser`.
- Bouton secondaire `Réinitialiser`.
- Badge informatif de droits widgets.

Règles UX :
- Personnalisation simple uniquement (afficher/masquer widgets autorisés, ordre simple si faisable).
- Réinitialisation vers disposition par défaut du profil.
- Aucune personnalisation ne doit contourner les permissions.
- Action non disponible si aucun widget autorisé personnalisable : état désactivé explicite.

États attendus :
- Normal : boutons actifs.
- Loading : feedback de chargement ou action en cours.
- Erreur : message court et réessai.

## 10. Zone KPI principale
Emplacement : première section de cartes sous l’en-tête.

Structure visuelle : 4 tuiles de même largeur, alignées horizontalement.

KPI affichés :
- `Utilisateurs présents`.
- `Utilisateurs absents`.
- `Véhicules disponibles`.
- `Créneaux non affectés`.

Style de tuile KPI :
- Icône colorée dans un carré arrondi.
- Titre court.
- Valeur principale très lisible.
- Sous-texte contextualisé (`sur X`, `aujourd’hui`, `cette semaine`).

Règle UX : KPI simples, lisibles, orientés action. Pas de graphique, pas de courbe, pas de comparaison analytique complexe.

## 11. KPI utilisateurs
Bloc concerné : `Utilisateurs présents` et `Utilisateurs absents`.

Détails attendus par carte :
- Emplacement : colonnes 1 et 2 de la rangée KPI.
- Rôle visuel : état immédiat des effectifs.
- Contenu : libellé, valeur numérique, sous-texte contextualisé.
- Icône : icône utilisateur/groupe.
- Action : carte potentiellement cliquable vers `Utilisateurs / RH` si autorisé, avec filtre pertinent.

États :
- Normal : valeur + sous-texte.
- Vide : `Aucune donnée disponible`.
- Non autorisé : carte non affichée.
- Loading : skeleton KPI.
- Erreur : valeur masquée + message court.

## 12. KPI véhicules
Bloc concerné : `Véhicules disponibles`.

Détails attendus :
- Emplacement : colonne 3 de la rangée KPI.
- Rôle visuel : disponibilité flotte en un coup d’œil.
- Contenu : libellé, valeur, sous-texte `sur X véhicules`.
- Icône : pictogramme véhicule.
- Action : clic possible vers `Véhicules` si autorisé.

États :
- Normal : valeur visible.
- Vide : donnée indisponible explicitée.
- Non autorisé : carte non affichée.
- Loading : skeleton.
- Erreur : message d’erreur local.

## 13. KPI planning
Bloc concerné : `Créneaux non affectés`.

Détails attendus :
- Emplacement : colonne 4 de la rangée KPI.
- Rôle visuel : charge opérationnelle non couverte.
- Contenu : libellé, valeur, sous-texte `cette semaine`.
- Icône : pictogramme calendrier.
- Action : clic possible vers `Planning` avec filtre `non affectés` si autorisé.

États :
- Normal : valeur numérique mise en avant.
- Vide : zéro explicite ou donnée indisponible selon source.
- Non autorisé : carte non affichée.
- Loading : skeleton.
- Erreur : carte conservée avec état d’erreur sobre.

## 14. Zone Planning et activités
Titre de section : `Planning et activités`.

Emplacement : sous la rangée KPI.

Structure visuelle : 6 widgets alignés sur une ligne desktop.

Widgets attendus :
- `Ma journée`.
- `Mon heure de début`.
- `Mes prochains créneaux`.
- `Planning global`.
- `Équipes du jour`.
- `Créneaux de la semaine`.

Règle UX : équilibre entre lecture personnelle et lecture globale équipes.

## 15. Widgets planning personnel
Widgets concernés : `Ma journée`, `Mon heure de début`, `Mes prochains créneaux`.

`Ma journée` :
- Emplacement : 1er widget du bloc.
- Rôle visuel : synthèse personnelle du jour.
- Contenu : date, plage horaire, base/dépôt si disponible.
- Action : bouton `Voir mon planning`.
- États : normal, vide, non autorisé masqué, loading, erreur locale.

`Mon heure de début` :
- Emplacement : 2e widget.
- Rôle visuel : repère horaire immédiat.
- Contenu : valeur horaire principale + repère jour.
- Action : pas obligatoire, possible vers planning personnel si autorisé.
- États : identiques.

`Mes prochains créneaux` :
- Emplacement : 3e widget.
- Rôle visuel : prochaines affectations à court terme.
- Contenu : liste courte datée, horaires, bouton `Voir tous`.
- États :
  - Normal : 1 à n lignes prévues.
  - Vide : `Aucun créneau à venir`.
  - Non autorisé : widget non affiché.
  - Loading : lignes skeleton.
  - Erreur : message local + action réessai.

## 16. Widgets planning global / équipes
Widgets concernés : `Planning global`, `Équipes du jour`, `Créneaux de la semaine`.

`Planning global` :
- Emplacement : 4e widget.
- Rôle visuel : entrée de navigation vers l’organisation complète.
- Contenu : texte court de synthèse.
- Action : bouton `Accéder au planning`.

`Équipes du jour` :
- Emplacement : 5e widget.
- Rôle visuel : charge équipes du jour.
- Contenu : nombre d’équipes prévues, répartition courte, base principale.
- Action : possible vers `Planning` si autorisé.

`Créneaux de la semaine` :
- Emplacement : 6e widget.
- Rôle visuel : volume hebdomadaire et non-affectés.
- Contenu : total créneaux + sous-valeur non affectés.
- Action : bouton `Voir le détail`.

États communs : normal, vide explicite, non autorisé masqué, loading, erreur locale.

## 17. Informations importantes
Carte dédiée : `Informations importantes`.

Emplacement : 1re carte de la rangée alertes.

Contenu visuel :
- Icône information.
- Titre.
- Liste courte à puces de messages utiles.

Rôle visuel : communication opérationnelle concise sans devenir un fil d’actualités.

États :
- Normal : 1 à 3 informations courtes.
- Vide : `Aucune information importante`.
- Non autorisé : carte masquée.
- Loading : skeleton liste.
- Erreur : message bref.

## 18. Alertes planning
Carte dédiée : `Alertes planning`.

Emplacement : 2e carte de la rangée alertes.

Contenu visuel :
- Icône alerte.
- Titre.
- Liste courte d’anomalies simples de planning.

Exemples conformes aux sources :
- Créneaux non affectés.
- Plannings à vérifier.

Rôle visuel : attirer l’attention sur les actions de planning prioritaires, sans moteur d’alertes complexe.

États : normal, vide, non autorisé masqué, loading, erreur locale.

## 19. Alertes véhicules
Carte dédiée : `Alertes véhicules`.

Emplacement : 3e carte de la rangée alertes.

Contenu visuel :
- Icône alerte véhicule.
- Titre.
- Liste courte des points de vigilance véhicules.

Exemples conformes aux sources :
- Véhicules indisponibles.
- Vérifications techniques à faire.

États : normal, vide, non autorisé masqué, loading, erreur locale.

## 20. Zone raccourcis métier
Titre de section : `Raccourcis`.

Emplacement : bloc bas de page.

Grille observée : 8 cartes raccourcis.

Raccourcis attendus :
- `Planning`.
- `Utilisateurs / RH`.
- `Véhicules`.
- `Modèles horaires`.
- `Société`.
- `Dépôts / Bases`.
- `Mise en route`.
- `Audit`.

Règles :
- Afficher uniquement les raccourcis autorisés.
- Chaque carte contient un titre, un sous-texte court et un bouton `Ouvrir`.
- `Suivi des véhicules` peut exister seulement s’il est explicitement ajouté par la maquette future ou confirmé fonctionnellement ; il n’est pas actif dans la maquette V2 fournie.

Libellés interdits en production de cette page : `Templates`, `Onboarding`.

## 21. Cards et widgets
Règles communes de style :
- Fond clair uniforme.
- Bordure fine discrète.
- Rayon d’angle homogène.
- Ombre légère ou quasi absente.
- Padding interne régulier.

Règles d’organisation :
- Une carte = une responsabilité métier claire.
- Aucun mélange KPI + alertes dans une même carte.
- Les actions sont en bas de carte quand présentes.

## 22. Boutons et actions
Boutons observés :
- Header : `Personnaliser`, `Réinitialiser`.
- Widgets : `Voir mon planning`, `Voir tous`, `Accéder au planning`, `Voir le détail`.
- Raccourcis : `Ouvrir`.

Règles UI :
- Style secondaire sobre, bordé, texte lisible.
- Zone cliquable confortable.
- Icône de direction à droite possible.
- État disabled explicite.
- Focus visible obligatoire.

## 23. Badges et statuts
Badge observé : `Widgets autorisés selon vos droits` avec point d’état positif.

Règles :
- Badge informatif, non intrusif.
- Ne pas multiplier les badges décoratifs.
- Les statuts sensibles doivent rester dans les modules dédiés, pas dans le badge du header.

## 24. Icônes et pictogrammes
Usage attendu :
- Icônes de navigation sidebar.
- Icônes KPI par famille (utilisateurs, véhicules, planning).
- Icônes d’alerte (information, warning).
- Icônes de bouton (paramètres, reset, flèche).

Règles visuelles :
- Style homogène sur toute la page.
- Taille cohérente selon contexte (navigation, KPI, action).
- Couleur de l’icône alignée avec le statut de la carte.

## 25. Hiérarchie visuelle
Hiérarchie à reproduire :
1. Titre `Tableau de bord`.
2. Valeurs KPI.
3. Titre de section `Planning et activités` et `Raccourcis`.
4. Titres de cartes.
5. Sous-textes et listes.
6. Actions secondaires.

Principe : la compréhension métier doit se faire sans lecture exhaustive de tous les textes.

## 26. Espacements, dimensions et densité
Repères visuels à respecter :
- Marges externes régulières entre shell et contenu.
- Espacement constant entre sections.
- Grilles strictement alignées sans décalage vertical aléatoire.
- Hauteurs homogènes par famille de cartes.
- Densité moyenne : beaucoup d’information, mais chaque carte reste aérée.

Contraintes de fidélité :
- Ne pas augmenter fortement les blancs verticaux.
- Ne pas compresser les cartes au point de couper les libellés.
- Conserver une largeur de colonne permettant les libellés français complets.

## 27. Couleurs et ambiance visuelle
Ambiance observée :
- Fond global très clair.
- Texte principal bleu nuit.
- Texte secondaire gris bleuté.
- Accent bleu pour navigation active et KPI utilisateurs présents.
- Accent rouge/rose pour absences.
- Accent turquoise/vert d’eau pour disponibilité véhicules.
- Accent orange pour créneaux non affectés et alertes véhicules.

Règles :
- Palette douce, professionnelle SaaS B2B.
- Contraste suffisant texte/fond.
- Pas de sur-saturation ni de dégradés agressifs.

## 28. Typographie
Règles typographiques cibles :
- Titre page : grande taille, graisse forte.
- Titres section : intermédiaires, lisibles.
- Titres carte : compacts, gras modéré.
- Valeurs KPI : taille forte et contraste élevé.
- Sous-textes : petite taille lisible.

Règle de cohérence : une seule famille typographique interface, avec hiérarchie par taille/poids/couleur.

## 29. États visuels à prévoir
États obligatoires à documenter pour chaque bloc :
- Normal.
- Vide.
- Non autorisé.
- Loading.
- Erreur.

Règles globales :
- Non autorisé : masquer le bloc concerné plutôt que montrer une erreur d’accès.
- Vide : message explicite, jamais de valeur inventée.
- Loading : placeholders cohérents avec la taille réelle des cartes.
- Erreur : message court + possibilité de réessai quand pertinent.

## 30. Règles de personnalisation
Périmètre de personnalisation autorisé :
- Affichage/masquage des widgets autorisés.
- Réinitialisation vers la disposition par défaut du profil.
- Persistance des préférences par utilisateur.

Périmètre interdit :
- Création libre de widgets.
- Changement libre de taille des widgets.
- Configuration d’un cockpit analytique.

## 31. Règles de permissions visibles
Règles strictes :
- Les widgets visibles dépendent des permissions effectives.
- Les raccourcis apparaissent uniquement si le module est autorisé.
- Les KPI cliquables n’ouvrent que des pages autorisées avec filtre pertinent.
- Les informations sensibles RH restent masquées selon permissions.
- La personnalisation n’est jamais un contournement des droits.

## 32. Composants réutilisables futurs
Composants à prévoir sans implémentation dans ce document :
- `components/dashboard/DashboardPage`
- `components/dashboard/DashboardKpiGrid`
- `components/dashboard/DashboardKpiCard`
- `components/dashboard/DashboardWidgetGrid`
- `components/dashboard/DashboardWidgetCard`
- `components/dashboard/DashboardShortcutCard`
- `components/dashboard/DashboardAlertCard`
- `components/dashboard/DashboardPersonalizationActions`
- `components/ui/PageHeader`
- `components/ui/Card`
- `components/ui/Badge`
- `components/ui/Button`
- `components/ui/IconButton`
- `components/ui/EmptyState`
- `components/ui/LoadingState`

## 33. Stratégie Tailwind future
Stratégie à documenter pour implémentation future, sans créer de configuration ici :
- Grille KPI dédiée.
- Grille widgets planning dédiée.
- Grille raccourcis dédiée.
- Gaps constants entre cartes.
- Padding global contenu et padding interne cartes.
- Rayons de cartes homogènes.
- Bordures fines systématiques.
- Ombres légères discrètes.
- Couleurs de fond et texte cohérentes avec la maquette.
- Couleurs d’état (info, warning, positif, négatif) cohérentes.
- Couleur d’accent bleu stable pour navigation et actions.
- Tailles d’icônes standardisées.
- États `hover`, `focus`, `disabled` définis et accessibles.
- Déclinaisons responsive desktop/tablette/mobile prévues sans casser la hiérarchie.

## 34. Responsive futur
Cible actuelle : desktop (référence maquette V2).

Préparation responsive future :
- Tablette : passage progressif des grilles en 2 colonnes principales.
- Mobile : empilement en 1 colonne avec ordre prioritaire.
- Ordre de priorité à conserver : en-tête, KPI, planning, alertes, raccourcis.
- Actions essentielles toujours visibles sans interaction complexe.

Cette section prépare le futur responsive sans valider le comportement final tant que la maquette responsive n’est pas fournie.

## 35. Accessibilité minimale
Exigences minimales :
- Contraste lisible des textes et valeurs KPI.
- Focus clavier visible sur boutons et cartes cliquables.
- Libellés explicites des actions (`Ouvrir`, `Voir le détail`, etc.).
- Icônes non suffisantes seules : texte toujours présent.
- États erreur/vide compréhensibles sans ambiguïté.

## 36. Ce qui doit être codé plus tard
À coder ultérieurement :
- Mécanisme de personnalisation utilisateur (simple).
- Persistance des préférences par utilisateur.
- Application stricte des permissions sur chaque bloc.
- États `empty/loading/error` homogènes sur KPI, widgets, alertes et raccourcis.
- Navigation des KPI cliquables vers pages autorisées avec filtres pertinents.

## 37. Ce qui ne doit pas être codé
Éléments exclus :
- Graphiques complexes.
- Reporting analytique.
- Cockpit dirigeant avancé.
- Régulation.
- Missions / courses / transports patients.
- Notifications globales avancées.
- Moteur d’alertes complexe.
- Widgets créés librement par l’utilisateur.
- Contournement des permissions.
- Données RH sensibles non autorisées.
- Debug visible.
- JSON visible.
- Anciennes entrées `Templates` / `Onboarding`.

## 38. Interdictions de dérive
Interdictions de conception :
- Ne pas transformer la page en produit BI.
- Ne pas ajouter de modules hors périmètre Dashboard V1.
- Ne pas ajouter de libellés non validés comme actions principales.
- Ne pas remplacer les libellés validés par des synonymes non validés.
- Ne pas ajouter d’éléments visuels absents de la maquette de référence sans validation.

Interdictions de gouvernance :
- Cette référence UI/UX codable ne vaut pas validation fonctionnelle finale.
- Toute évolution métier doit passer par une mise à jour de fiche fonctionnelle puis de maquette.

## 39. Checklist de conformité visuelle 99 %
- Le titre `Tableau de bord` et le sous-titre sont identiques à la maquette.
- Les actions `Personnaliser` et `Réinitialiser` sont en haut à droite.
- Le badge `Widgets autorisés selon vos droits` est présent et lisible.
- La zone KPI contient exactement 4 tuiles : présents, absents, véhicules disponibles, créneaux non affectés.
- Le bloc `Planning et activités` contient exactement 6 widgets : personnel + global/équipes.
- Les trois cartes `Informations importantes`, `Alertes planning`, `Alertes véhicules` sont présentes.
- La zone `Raccourcis` affiche les modules métier validés uniquement.
- Les libellés actifs `Templates` et `Onboarding` sont absents.
- Aucun graphique complexe ni reporting avancé n’apparaît.
- Les widgets non autorisés sont masqués.
- Les données sensibles non autorisées ne sont pas exposées.
- Les états `vide/loading/erreur` sont prévus pour chaque famille de bloc.
- La hiérarchie visuelle (titre > KPI > sections > cartes > actions) est respectée.
- L’ambiance visuelle reste SaaS B2B claire, sobre et opérationnelle.
- Le résultat final reste une référence UI/UX codable, distincte d’une validation fonctionnelle définitive.
