# Ambulance Manager — Référence UI/UX — Mise en route

Version : V2  
Statut : référence UI/UX codable  
Objectif : reproduction visuelle 99 %  
Source visuelle : docs/1-MASTER/1-MAQUETTE/9-Mise en route/Mise-En-Route_V2.png  
Source fonctionnelle : docs/1-MASTER/3-FONCTIONNALITES/9-FONCTIONNALITES_DETAILLEES_MISE_EN_ROUTE_V1.1.md  

## Sommaire
- [1. Objectif du document](#1-objectif-du-document)
- [2. Sources utilisées](#2-sources-utilisées)
- [3. Règle d’autorité](#3-règle-dautorité)
- [4. Rôle de la page Mise en route](#4-rôle-de-la-page-mise-en-route)
- [5. Objectif UX de la page](#5-objectif-ux-de-la-page)
- [6. Structure générale de l’écran](#6-structure-générale-de-lécran)
- [7. Layout desktop attendu](#7-layout-desktop-attendu)
- [8. En-tête de page](#8-en-tête-de-page)
- [9. Actions principales](#9-actions-principales)
- [10. Progression de mise en route](#10-progression-de-mise-en-route)
- [11. Étapes de configuration](#11-étapes-de-configuration)
- [12. Cartes d’étapes](#12-cartes-détapes)
- [13. États d’avancement](#13-états-davancement)
- [14. Modules liés à la mise en route](#14-modules-liés-à-la-mise-en-route)
- [15. Blocs d’aide et informations](#15-blocs-daide-et-informations)
- [16. Imports et préparation initiale si visibles](#16-imports-et-préparation-initiale-si-visibles)
- [17. Raccourcis opérationnels](#17-raccourcis-opérationnels)
- [18. Boutons et actions](#18-boutons-et-actions)
- [19. Badges et statuts visuels](#19-badges-et-statuts-visuels)
- [20. États visuels à prévoir](#20-états-visuels-à-prévoir)
- [21. Hiérarchie visuelle](#21-hiérarchie-visuelle)
- [22. Espacements dimensions et densité](#22-espacements-dimensions-et-densité)
- [23. Couleurs et ambiance visuelle](#23-couleurs-et-ambiance-visuelle)
- [24. Typographie](#24-typographie)
- [25. Icônes](#25-icônes)
- [26. Règles de permissions visibles](#26-règles-de-permissions-visibles)
- [27. Règles d’ergonomie métier](#27-règles-dergonomie-métier)
- [28. Composants réutilisables futurs](#28-composants-réutilisables-futurs)
- [29. Stratégie Tailwind future](#29-stratégie-tailwind-future)
- [30. Responsive futur](#30-responsive-futur)
- [31. Accessibilité minimale](#31-accessibilité-minimale)
- [32. Ce qui doit être codé plus tard](#32-ce-qui-doit-être-codé-plus-tard)
- [33. Ce qui ne doit pas être codé](#33-ce-qui-ne-doit-pas-être-codé)
- [34. Interdictions de dérive](#34-interdictions-de-dérive)
- [35. Checklist de conformité visuelle 99 %](#35-checklist-de-conformité-visuelle-99-)

## 1. Objectif du document
Documenter de manière codable la page **Mise en route** pour permettre une reproduction visuelle fidèle à la maquette V2, avec un objectif de ressemblance minimale de 99 %, sans valider définitivement les règles fonctionnelles métier.

## 2. Sources utilisées
- Maquette PNG : `docs/1-MASTER/1-MAQUETTE/9-Mise en route/Mise-En-Route_V2.png`.
- Fiche fonctionnalités : `docs/1-MASTER/3-FONCTIONNALITES/9-FONCTIONNALITES_DETAILLEES_MISE_EN_ROUTE_V1.1.md`.

## 3. Règle d’autorité
1. Priorité absolue à la maquette **Mise-En-Route_V2.png** pour l’apparence visuelle.
2. Priorité secondaire à la fiche fonctionnalités pour le cadre métier et les limites.
3. Aucune hypothèse non visible/non documentée.
4. Aucun ancien fichier UI/UX comme source.
5. Aucun code existant comme source visuelle.

## 4. Rôle de la page Mise en route
- Libellé utilisateur actif : **Mise en route**.
- Rôle : assistant opérationnel de configuration initiale de la société.
- Fonction : afficher l’avancement, orienter vers les modules à compléter, éviter les oublis de démarrage.
- Limite : ne pas remplacer les pages métier (Société, Bases / Dépôts, Utilisateurs / RH, Véhicules, Modèles horaires, Planning).

## 5. Objectif UX de la page
- Répondre immédiatement à la question : « Où en est la configuration initiale et quoi faire ensuite ? »
- Donner une lecture en moins de 10 secondes de l’état global.
- Fournir un chemin d’action clair par étape.
- Garder des messages simples, orientés opération, non techniques.

## 6. Structure générale de l’écran
La maquette desktop (1536 x 1024) montre 3 niveaux de structure :
1. Shell applicatif global :
- barre latérale de navigation à gauche ;
- zone utilisateur et thème en bas de la barre latérale ;
- barre haute applicative (sélecteur société, thème, profil, déconnexion).
2. Contenu principal Mise en route au centre :
- titre + sous-titre ;
- actions d’en-tête ;
- bandeau de synthèse en 4 cartes ;
- barre de filtres/recherche/réinitialisation ;
- tableau principal des étapes ;
- légende de statuts en pied.
3. Panneau latéral droit de détail d’étape :
- étape active, statut, description, objectifs, ressources, actions.

## 7. Layout desktop attendu
- Référence de composition : écran large fixe type desktop, sans empilement mobile dans la maquette.
- Colonne gauche (navigation) : largeur visuelle fixe, fond clair, item actif « Mise en route » mis en évidence.
- Colonne centrale (contenu) : largeur dominante, tableau dense à lignes compactes.
- Colonne droite (détail) : panneau fixe visuellement séparé, attaché au contexte de la ligne sélectionnée.
- Équilibre : centre prioritaire (pilotage), droite secondaire (action détaillée), gauche structurelle (navigation globale).

## 8. En-tête de page
Éléments visibles dans la zone d’en-tête de contenu :
- Titre : **Mise en route**.
- Sous-titre : « Suivez et finalisez les étapes de configuration de votre société. »
- Actions à droite :
- bouton secondaire « Télécharger le guide » ;
- bouton secondaire « Imprimer ».

Éléments visibles dans la barre haute applicative (hors titre de page, mais présents à l’écran) :
- sélecteur de société (exemple affiché : « SC Ambulances ») ;
- action de thème ;
- bloc utilisateur (exemple : Nathan A., Admin) ;
- action « Déconnexion ».

## 9. Actions principales
Actions visibles sur la page :
- Consulter l’état global de progression.
- Filtrer les étapes par type/liste.
- Filtrer les étapes par statut.
- Rechercher une étape via champ texte.
- Réinitialiser filtres/recherche.
- Ouvrir le détail d’une étape via action de ligne.
- Accéder à une action module depuis le panneau de droite.
- Modifier l’étape (action prévue visuellement).
- Marquer une étape comme terminée (action prévue visuellement).
- Télécharger un guide.
- Imprimer.

## 10. Progression de mise en route
Synthèse visible en 4 cartes alignées horizontalement :
1. **Progression globale**
- anneau circulaire ;
- valeur affichée : **75 %** ;
- indicateur texte : **9 / 12 étapes complétées**.
2. **Statut global**
- badge : **En cours** ;
- métadonnée : **Dernière mise à jour : 18/05/2025 14:32** (donnée d’exemple visuelle).
3. **Estimation de temps restant**
- valeur affichée : **1h 20 min**.
4. **Prochaine étape suggérée**
- suggestion affichée : **Configurer les modèles horaires**.

## 11. Étapes de configuration
La maquette affiche 12 étapes ordonnées :
1. Informations de la société.
2. Configuration des dépôts.
3. Gestion des utilisateurs.
4. Configuration des véhicules.
5. Modèles horaires.
6. Règles métier.
7. Modèles horaires / modèles d’affectation.
8. Alertes et notifications.
9. Paramètres de sécurité.
10. Import initial de données.
11. Vérification et tests.
12. Mise en production.

Descriptions visibles (format court) :
- chaque étape possède une phrase opérationnelle ;
- ton orienté action (« Créez… », « Configurez… », « Définissez… », « Vérifiez… », « Finalisez… ») ;
- pas de formulation technique serveur.

## 12. Cartes d’étapes
Le rendu principal est un tableau dense ; la logique de carte d’étape est portée par 2 niveaux :
- niveau liste : chaque ligne d’étape agit comme une carte compacte de synthèse ;
- niveau détail : panneau droit agit comme carte enrichie de l’étape sélectionnée.

Structure de ligne visible :
- numéro d’étape ;
- icône d’étape ;
- titre ;
- description ;
- statut ;
- responsable ;
- date/heure de mise à jour ;
- action d’ouverture (chevron).

## 13. États d’avancement
États visuels présents dans la maquette :
- **Terminé** (vert, icône validation).
- **En cours** (bleu, indicateur circulaire actif).
- **À faire** (orange, indicateur attention).
- **À planifier** (gris/bleu neutre, indicateur inactif).

Correspondance visuelle observée :
- étapes 1 à 4 : Terminé ;
- étape 5 : En cours ;
- étapes 6 à 9 : À faire ;
- étapes 10 à 12 : À planifier.

## 14. Modules liés à la mise en route
Modules explicitement visibles ou imposés par la fiche :
- Société.
- Bases / Dépôts.
- Utilisateurs / RH.
- Véhicules.
- Modèles horaires.
- Planning.

Modules complémentaires visibles dans la checklist maquette :
- Règles métier.
- Modèles horaires / modèles d’affectation.
- Alertes et notifications.
- Paramètres de sécurité.
- Vérification et tests.
- Mise en production.

Règle : ces étapes orientent vers les modules, elles ne doivent pas recréer les modules.

## 15. Blocs d’aide et informations
Blocs informatifs visibles :
- sous-titre de page expliquant l’objectif global ;
- carte « Prochaine étape suggérée » ;
- panneau « Détail de l’étape » ;
- section « Ressources utiles » dans le panneau droit ;
- légende de statuts en bas du tableau.

Contenu visible dans le détail de l’étape 5 :
- Description : création des modèles horaires pour journées, nuits, week-ends, astreintes.
- Objectifs :
- définir les plages horaires ;
- créer les types de service ;
- associer aux équipes.
- Ressources :
- guide des modèles horaires ;
- exemples de modèles ;
- FAQ.

## 16. Imports et préparation initiale si visibles
- L’étape **10. Import initial de données** est explicitement visible dans la maquette.
- Statut affiché sur la maquette : **À planifier**.
- Conformément à la fiche, l’import est optionnel en Alpha et non bloquant.
- Les imports potentiels à cadrer (sans extension automatique) : utilisateurs, véhicules, modèles horaires, bases/dépôts, indisponibilités.
- La mise en route doit rester faisable entièrement en manuel.

## 17. Raccourcis opérationnels
Raccourcis visibles/attendus :
- depuis la ligne d’étape via chevron vers détail et action.
- depuis le panneau droit via CTA principal vers le module cible.

Exemple visible :
- étape « Modèles horaires » ;
- action disponible : **Voir les modèles**.

Règle permissions :
- afficher un raccourci d’action seulement si l’utilisateur a l’autorisation d’ouvrir le module cible ;
- sinon conserver un état informatif sans action destructive.

## 18. Boutons et actions
Boutons visibles :
- En-tête : « Télécharger le guide », « Imprimer » (secondaires).
- Barre de filtres : « Réinitialiser » (secondaire avec icône).
- Lignes de tableau : bouton chevron de détail.
- Panneau droit :
- « Voir les modèles » (action principale de navigation métier) ;
- « Modifier cette étape » (action accentuée) ;
- « Marquer comme terminé » (action d’état, style alerte léger).

États à prévoir pour chaque bouton :
- défaut ;
- hover ;
- focus visible ;
- disabled selon permissions/état d’étape ;
- chargement léger si action asynchrone.

## 19. Badges et statuts visuels
Badges visibles :
- badge global « En cours ».
- badges de ligne : « Terminé », « En cours », « À faire », « À planifier ».
- badge dans panneau détail : « En cours ».

Règles visuelles :
- badge compact, lisible, contraste suffisant ;
- icône + texte pour reconnaissance rapide ;
- même codification couleur entre tableau, panneau détail et légende.

## 20. États visuels à prévoir
États explicitement à documenter pour le futur codage :
- **État normal** : maquette de référence.
- **État vide** : aucune étape disponible (message opérationnel + action de relance).
- **État loading** : skeleton/placeholder sur cartes, tableau, panneau détail.
- **État erreur** : message lisible, non technique, avec action de réessai.
- **État succès** : confirmation simple après action (ex. étape marquée terminée).
- **État incomplet** : progression partielle visible, guidage de prochaine action.
- **État terminé** : 100 % complété, message de finalisation.

Messages à privilégier :
- formulation métier simple ;
- pas de stack trace ;
- pas de JSON ;
- pas de logs serveurs.

## 21. Hiérarchie visuelle
Ordre de lecture attendu :
1. Titre + sous-titre (contexte).
2. Bandeau de progression (situation globale).
3. Barre de filtres (pilotage de la liste).
4. Tableau des étapes (travail principal).
5. Détail de l’étape sélectionnée (action ciblée).
6. Légende des statuts (aide de lecture).

Priorité d’attention :
- priorité 1 : progression et prochaine étape ;
- priorité 2 : étape active et son CTA ;
- priorité 3 : opérations secondaires (guide, impression).

## 22. Espacements dimensions et densité
Référence desktop maquette : **1536 x 1024**.

Règles de densité observées :
- densité moyenne à élevée sur le tableau (12 lignes visibles sans pagination) ;
- hauteur de ligne compacte, adaptée à un usage B2B opérationnel ;
- panneaux et cartes aérés par marges/paddings réguliers.

Cadence d’espacement recommandée pour reproduction :
- micro-espaces internes : 8 px ;
- espacement standard entre éléments d’un bloc : 12 à 16 px ;
- espacement inter-blocs majeurs : 20 à 24 px ;
- rayons de cartes/boutons : arrondi léger à moyen ;
- bordures fines continues sur cartes, tableau et panneau latéral.

## 23. Couleurs et ambiance visuelle
Ambiance générale :
- interface claire, fond très clair ;
- dominante bleu professionnel pour actions et focus ;
- statuts colorés lisibles (vert, bleu, orange, neutre).

Référentiel visuel à conserver :
- texte principal très foncé ;
- texte secondaire bleu-gris ;
- bordures gris clair ;
- bouton primaire/actif en bleu soutenu ;
- statut Terminé en vert ;
- statut En cours en bleu ;
- statut À faire en orange ;
- statut À planifier en neutre gris bleuté ;
- action de marquage final en tonalité rouge légère (attention maîtrisée, non critique).

Important : les couleurs exactes seront figées au moment du build UI en se calant pixel à pixel sur la maquette V2.

## 24. Typographie
Règles typographiques observables :
- Titre de page large et gras.
- Sous-titre de contexte plus petit, ton informatif.
- Têtes de colonnes en emphase moyenne.
- Texte des lignes en taille compacte et lisible.
- Badges en corps réduit mais contrasté.

Hiérarchie recommandée :
- H1 : page ;
- H2 implicites : sections cartes/détail ;
- corps standard : descriptions et métadonnées ;
- micro-texte : dates/heures, rôles, légende.

## 25. Icônes
Icônes visibles à reproduire :
- icône de progression (anneau/horloge selon bloc) ;
- icônes de statut (validation, en cours, à faire, à planifier) ;
- icônes par étape dans la colonne étape ;
- icônes d’actions (télécharger, imprimer, réinitialiser, chevron) ;
- icônes de navigation latérale.

Règles :
- style homogène sur toute la page ;
- taille cohérente selon contexte (nav, ligne, badge, bouton) ;
- icône jamais seule si l’action est critique ;
- conserver les libellés texte associés.

## 26. Règles de permissions visibles
Règles issues de la fiche :
- accès par défaut : Admin, Gérant.
- accès utilisateur non admin : uniquement via permission dédiée.
- utilisateurs terrain : pas d’accès par défaut en Alpha.

Règles d’affichage :
- une étape peut être visible sans autoriser la modification du module cible ;
- masquer/désactiver les actions non autorisées ;
- ne jamais exposer d’actions de gestion de permissions dans cette page.

## 27. Règles d’ergonomie métier
- Le libellé actif reste **Mise en route**.
- Cette page accompagne, elle ne remplace pas les modules métiers.
- Les statuts doivent rester simples et immédiatement compréhensibles.
- Les actions doivent ouvrir les modules concernés plutôt que dupliquer leurs formulaires.
- L’import est un facilitateur possible, pas un prérequis bloquant.
- La progression doit être informative en Alpha, sans verrou technique non validé.
- Aucune logique métier parallèle ne doit être créée.

## 28. Composants réutilisables futurs
Composants à prévoir (documentés uniquement, non créés) :
- `components/onboarding/OnboardingPage`
- `components/onboarding/OnboardingProgress`
- `components/onboarding/OnboardingStepCard`
- `components/onboarding/OnboardingChecklist`
- `components/onboarding/OnboardingActionCard`
- `components/onboarding/OnboardingHelpCard`
- `components/onboarding/OnboardingStatusBadge`
- `components/ui/PageHeader`
- `components/ui/Card`
- `components/ui/Badge`
- `components/ui/Button`
- `components/ui/Progress`
- `components/ui/EmptyState`
- `components/ui/LoadingState`
- `components/ui/SuccessMessage`
- `components/ui/WarningMessage`
- `components/ui/ErrorMessage`

Règle de nommage UX : même si le code reste préfixé `onboarding`, le libellé utilisateur visible reste **Mise en route**.

## 29. Stratégie Tailwind future
Stratégie à documenter pour implémentation ultérieure, sans créer de configuration complète :
- grille page avec 3 zones (sidebar shell, contenu central, panneau détail) ;
- cartes de progression alignées en desktop ;
- indicateur de progression circulaire et badges d’état ;
- padding de contenu constant ;
- gaps réguliers entre sections ;
- rayons homogènes sur cartes/boutons/champs ;
- bordures fines et ombres légères ;
- codification couleur par statut (terminé/en cours/à faire/à planifier) ;
- couleurs d’avertissement simples ;
- états hover/focus/disabled explicites ;
- adaptation responsive desktop/tablette/mobile sans rupture de hiérarchie.

## 30. Responsive futur
La maquette fournie est desktop. Le responsive doit préserver les priorités :
- Desktop : tableau + panneau détail côte à côte.
- Tablette : tableau prioritaire ; panneau détail repliable ou sous forme bloc secondaire.
- Mobile :
- progression en cartes empilées ;
- filtres empilés ;
- étapes en cartes compactes ;
- détail d’étape en vue dédiée (ou panneau plein écran).

Règle : pas de perte d’information métier lors du passage responsive.

## 31. Accessibilité minimale
Exigences minimales à intégrer au futur codage :
- contraste lisible texte/fond et badges ;
- focus clavier visible sur tous les contrôles ;
- ordre de tabulation cohérent (filtres, liste, détail, CTA) ;
- libellés explicites pour boutons/icônes ;
- états non transmis uniquement par la couleur (icône + texte) ;
- messages d’erreur/succès compréhensibles sans jargon technique.

## 32. Ce qui doit être codé plus tard
- Rendu fidèle de la page desktop selon maquette V2.
- Logique de progression simple par étapes.
- États de statut (Terminé, En cours, À faire, À planifier) cohérents entre liste, détail, légende.
- Routage vers modules métier depuis les actions d’étape.
- Gestion d’affichage selon permissions.
- États vide/loading/erreur/succès.
- Support responsive futur sans altérer la hiérarchie métier.
- Finalisation pixel-perfect sur couleurs/espacements/dimensions au moment du build UI.

## 33. Ce qui ne doit pas être codé
- Libellé actif **Onboarding** côté utilisateur.
- Onboarding self-service SaaS avancé non validé.
- Création automatique complète d’une société sans validation.
- Import avancé non prévu.
- Automatisation complète de configuration.
- Facturation/abonnement depuis cette page.
- Exposition technique multi-tenant dans l’UI.
- Modification des permissions depuis cette page.
- Gestion complète des utilisateurs depuis cette page.
- Gestion complète des véhicules depuis cette page.
- Gestion complète des dépôts/bases depuis cette page.
- Debug visible, JSON visible, logs techniques visibles.

## 34. Interdictions de dérive
- Ne pas fusionner « Mise en route » avec « Société ».
- Ne pas transformer la page en module de paramétrage expert complet.
- Ne pas dupliquer les formulaires métier complets dans cette page.
- Ne pas inventer des étapes ou statuts non visibles/non cadrés par la fiche.
- Ne pas durcir la page en verrou global de l’application sans validation fonctionnelle explicite.
- Ne pas remplacer le langage opérationnel par des messages techniques.

## 35. Checklist de conformité visuelle 99 %
- Titre affiché : **Mise en route** (et jamais Onboarding côté UI).
- Sous-titre opérationnel conforme à la maquette.
- Deux actions d’en-tête présentes : Télécharger le guide, Imprimer.
- 4 cartes de synthèse présentes avec ordre et hiérarchie identiques.
- Valeur de progression globale visuellement prioritaire (anneau + pourcentage + ratio).
- Barre filtres complète : type d’étapes, statut, recherche, réinitialisation.
- Tableau des 12 étapes présent avec colonnes : Étape, Description, Statut, Responsable, Mise à jour, action.
- Statuts visibles cohérents : Terminé, En cours, À faire, À planifier.
- Légende des statuts présente sous le tableau.
- Panneau droit « Détail de l’étape » présent avec : numéro étape, titre, badge, description, objectifs, ressources, actions.
- CTA de détail cohérents avec l’étape active (exemple maquette : Modèles horaires).
- Navigation latérale et item actif « Mise en route » conformes au Shell.
- Densité B2B conservée : tableau lisible sans espacement excessif.
- Aucun texte technique serveur, aucun JSON, aucun log.
- Permissions respectées : raccourcis affichés seulement si autorisés.
- Import initial traité comme étape possible, non bloquante en Alpha.
- Aucune fonctionnalité self-service SaaS avancée ajoutée sans validation.
- Référence UI/UX codable clairement distinguée d’une validation fonctionnelle définitive.

Points restant à confirmer (fonctionnel, hors blocage UI/UX) :
- INFORMATION NON FOURNIE — À CONFIRMER : nom exact des permissions dédiées « consulter/gérer la mise en route ».
- INFORMATION NON FOURNIE — À CONFIRMER : conditions minimales exactes de complétion pour chaque étape.
- INFORMATION NON FOURNIE — À CONFIRMER : comportement final attendu si une étape obligatoire reste incomplète.
- INFORMATION NON FOURNIE — À CONFIRMER : périmètre exact des imports actifs en Alpha.
