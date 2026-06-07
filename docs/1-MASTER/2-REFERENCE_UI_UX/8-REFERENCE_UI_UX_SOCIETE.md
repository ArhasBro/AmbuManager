# Ambulance Manager — Référence UI/UX — Société

Version : V2  
Statut : référence UI/UX codable  
Objectif : reproduction visuelle 99 %  
Source visuelle : docs/1-MASTER/1-MAQUETTE/8-Société/Société_V2.png  
Source fonctionnelle : docs/1-MASTER/3-FONCTIONNALITES/8-FONCTIONNALITES_DETAILLEES_SOCIETE_V1.1.md  

## Sommaire
- [1. Objectif du document](#1-objectif-du-document)
- [2. Sources utilisées](#2-sources-utilisees)
- [3. Règle d’autorité](#3-regle-dautorite)
- [4. Rôle de la page Société](#4-role-de-la-page-societe)
- [5. Objectif UX de la page](#5-objectif-ux-de-la-page)
- [6. Structure générale de l’écran](#6-structure-generale-de-lecran)
- [7. Layout desktop attendu](#7-layout-desktop-attendu)
- [8. En-tête de page](#8-en-tete-de-page)
- [9. Actions principales](#9-actions-principales)
- [10. Mode consultation et mode modification](#10-mode-consultation-et-mode-modification)
- [11. Informations générales société](#11-informations-generales-societe)
- [12. Informations administratives](#12-informations-administratives)
- [13. Coordonnées et contact](#13-coordonnees-et-contact)
- [14. Adresse et implantation](#14-adresse-et-implantation)
- [15. Paramètres métier visibles](#15-parametres-metier-visibles)
- [16. Cartes et blocs de synthèse](#16-cartes-et-blocs-de-synthese)
- [17. Formulaires et champs](#17-formulaires-et-champs)
- [18. Boutons et actions](#18-boutons-et-actions)
- [19. Badges et statuts visuels](#19-badges-et-statuts-visuels)
- [20. États visuels à prévoir](#20-etats-visuels-a-prevoir)
- [21. Hiérarchie visuelle](#21-hierarchie-visuelle)
- [22. Espacements dimensions et densité](#22-espacements-dimensions-et-densite)
- [23. Couleurs et ambiance visuelle](#23-couleurs-et-ambiance-visuelle)
- [24. Typographie](#24-typographie)
- [25. Icônes](#25-icones)
- [26. Règles de permissions visibles](#26-regles-de-permissions-visibles)
- [27. Règles d’ergonomie métier](#27-regles-dergonomie-metier)
- [28. Composants réutilisables futurs](#28-composants-reutilisables-futurs)
- [29. Stratégie Tailwind future](#29-strategie-tailwind-future)
- [30. Responsive futur](#30-responsive-futur)
- [31. Accessibilité minimale](#31-accessibilite-minimale)
- [32. Ce qui doit être codé plus tard](#32-ce-qui-doit-etre-code-plus-tard)
- [33. Ce qui ne doit pas être codé](#33-ce-qui-ne-doit-pas-etre-code)
- [34. Interdictions de dérive](#34-interdictions-de-derive)
- [35. Checklist de conformité visuelle 99 %](#35-checklist-de-conformite-visuelle-99)

## 1. Objectif du document
Ce document définit une référence UI/UX codable de la page **Société** à reproduire visuellement à 99 % par rapport à la maquette V2.

Cette référence décrit l’interface et les comportements visuels attendus, sans valider définitivement les règles fonctionnelles de fond.

## 2. Sources utilisées
- Source visuelle principale : `docs/1-MASTER/1-MAQUETTE/8-Société/Société_V2.png`
- Source fonctionnelle de cadrage : `docs/1-MASTER/3-FONCTIONNALITES/8-FONCTIONNALITES_DETAILLEES_SOCIETE_V1.1.md`

## 3. Règle d’autorité
1. Maquette `Société_V2.png`.
2. Fiche fonctionnalités Société V1.1.
3. Si information absente : `INFORMATION NON FOURNIE — À CONFIRMER`.
4. Aucun ancien document UI/UX comme source de vérité.
5. Aucun code existant comme source visuelle.

## 4. Rôle de la page Société
La page **Société** sert à consulter et gérer les informations de la société courante.

La page ne sert pas à changer manuellement de société et ne doit pas exposer de logique technique multi-tenant.

Les informations affichées restent strictement liées à la société connectée.

## 5. Objectif UX de la page
- Donner une lecture rapide de l’identité entreprise, du statut de configuration et des informations de contact.
- Permettre une modification contrôlée, visible et explicite via une action dédiée.
- Séparer visuellement les blocs stables (profil, adresse, paramètres) des blocs dynamiques (contacts, historique).
- Maintenir une interface sobre, dense et lisible pour un usage B2B quotidien.

## 6. Structure générale de l’écran
Dans le Shell applicatif visible sur maquette desktop :
- Barre latérale gauche de navigation globale.
- Barre supérieure globale (société affichée, utilisateur, déconnexion).
- Zone contenu principale avec page `Société`.

Structure interne de la page `Société` :
- En-tête page (titre, sous-titre, bouton principal à droite).
- Rang 1 en 2 colonnes : `Informations générales` (gauche) et `Résumé de configuration` (droite).
- Rang 2 en 2 colonnes : `Adresse principale` (gauche) et `Responsables applicatifs` (droite).
- Rang 3 pleine largeur : `Contacts société`.
- Rang 4 en 3 colonnes : `Informations métier transport sanitaire`, `Paramètres généraux`, `Historique récent`.

## 7. Layout desktop attendu
Organisation visuelle attendue (maquette 16:9) :
- Contenu centré dans la zone principale avec marges latérales confortables.
- Colonne gauche plus large que la colonne droite sur les deux premiers rangs.
- Carte `Contacts société` sur la largeur utile complète.
- Trois cartes de bas de page avec largeur homogène.

Comportement de densité :
- Beaucoup d’informations sur un seul écran sans effet de surcharge.
- Priorité à la scannabilité par lignes et sous-sections.

## 8. En-tête de page
Éléments visibles dans l’en-tête de page :
- Titre : `Société`.
- Sous-titre : `Consultez le profil permanent de la société et ses paramètres généraux.`
- Action principale à droite : bouton bleu `Modifier la société` avec icône crayon.

Règles d’affichage :
- Le titre est le point d’entrée visuel principal.
- Le sous-titre reste informatif, plus discret que le titre.
- Le bouton principal reste aligné à droite sur la même ligne visuelle de tête.

## 9. Actions principales
Actions visibles sur la maquette :
- `Modifier la société` (action globale page).
- `Continuer la mise en route` (dans `Résumé de configuration`).
- `Ajouter un contact` (dans `Contacts société`).
- `Modifier` (action par ligne contact).
- `Voir tout l’historique` (dans `Historique récent`).

Règle de priorité visuelle :
- `Modifier la société` est l’action primaire.
- Les autres actions sont secondaires et contextualisées par bloc.

## 10. Mode consultation et mode modification
Mode consultation (visible en maquette) :
- Valeurs affichées en texte statique par paires libellé/valeur.
- Aucun champ de saisie ouvert par défaut.
- Actions de lecture et de navigation disponibles selon permissions.

Mode modification (à coder plus tard, conforme fiche) :
- Activation volontaire via `Modifier la société`.
- Transformation des valeurs en champs éditables uniquement sur zones autorisées.
- Barre d’actions de fin d’édition attendue avec `Enregistrer` et `Annuler`.
- Retour explicite au mode consultation après succès ou annulation.

## 11. Informations générales société
Carte : `Informations générales`.

Libellés et valeurs visibles :
- `Nom de la société` : `SC Ambulances`.
- `Nom commercial` : `SC Ambulances Chambéry`.
- `SIRET` : `123 456 789 00012`.
- `Téléphone principal` : `04 79 00 00 00`.
- `Email de contact` : `contact@sc-ambulances.fr`.
- `Site web` : `www.sc-ambulances.fr`.

Structure visuelle :
- Présentation en 2 colonnes internes.
- Libellé au-dessus de la valeur.
- Séparateurs horizontaux fins entre groupes.

## 12. Informations administratives
Éléments administratifs visibles directement dans la page :
- SIRET dans `Informations générales`.
- Coordonnées société officielles (téléphone/email/site).
- Bloc `Informations métier transport sanitaire` portant des données réglementaires métier à statut prudent.

Règle de prudence :
- Les champs réglementaires non confirmés fonctionnellement ne doivent pas être durcis sans validation.
- Mention de prudence maintenue : `INFORMATION NON FOURNIE — À CONFIRMER` quand une règle métier précise n’est pas validée.

## 13. Coordonnées et contact
Coordonnées principales société :
- Téléphone principal.
- Email de contact.
- Site web.

Bloc `Contacts société` :
- Colonnes visibles : `Type de contact`, `Nom`, `Email`, `Téléphone`, `Statut`, `Action`.
- Lignes visibles en exemple :
- `Représentant légal` / `Sophie Caron` / `sophie.caron@sc-ambulances.fr` / `06 12 34 56 78` / `Principal`.
- `Contact administratif` / `Marc Bernard` / `administratif@sc-ambulances.fr` / `04 79 11 22 33` / `—`.
- `Responsable exploitation` / `Léa Martin` / `exploitation@sc-ambulances.fr` / `06 98 76 54 32` / `—`.

Règles UI :
- Le statut `Principal` est visualisé par badge dédié.
- Le tableau reste lisible sans pagination visible dans cette version.

## 14. Adresse et implantation
Carte : `Adresse principale`.

Champs visibles :
- `Adresse` : `18 rue des Acacias`.
- `Complément` : `Bâtiment A`.
- `Code postal` : `73000`.
- `Ville` : `Chambéry`.
- `Pays` : `France`.

Alerte informative visible en bas de carte :
- `Cette adresse ne remplace pas vos Dépôts / Bases opérationnels.`

Règle métier associée :
- L’adresse principale société est distincte des dépôts/bases.

## 15. Paramètres métier visibles
Carte : `Informations métier transport sanitaire`.

Contenu visible :
- Badge d’état : `À confirmer`.
- `N° d’agrément sanitaire` : `ARS-73-2024-00123`.
- `ARS de rattachement` : `ARS Auvergne-Rhône-Alpes`.
- `Département principal d’activité` : `Savoie (73)`.
- `Zone d’activité` : `Chambéry et environs`.
- `Commentaire réglementaire interne` : `Véhicules conformes - maj 04/2025`.

Règle de rendu :
- Présenter ces informations comme visibles en maquette, sans surinterpréter leur validation réglementaire définitive.

## 16. Cartes et blocs de synthèse
Blocs cartes visibles :
- `Informations générales`.
- `Résumé de configuration`.
- `Adresse principale`.
- `Responsables applicatifs`.
- `Contacts société`.
- `Informations métier transport sanitaire`.
- `Paramètres généraux`.
- `Historique récent`.

Détail du bloc `Résumé de configuration` :
- `Profil société` : `Complet`.
- `Contacts société` : `Incomplet`.
- `Dépôts / Bases` : `OK`.
- `Utilisateurs` : `OK`.
- `Véhicules` : `OK`.
- `Modèles horaires` : `À compléter`.
- Message de synthèse : `Configuration incomplète. Certains éléments restent à compléter.`
- Action secondaire : `Continuer la mise en route`.

Détail du bloc `Responsables applicatifs` :
- Mention : `Affichés automatiquement depuis Utilisateurs / RH`.
- Entrée 1 : `Nathan Archenoul` avec badge `Gérant`.
- Entrée 2 : `Marie Dupont` avec badge `Admin`.

## 17. Formulaires et champs
État maquette : affichage lecture.

État édition futur attendu :
- Sections d’édition reprenant strictement la structure des cartes existantes.
- Champs texte : nom société, nom commercial, SIRET, téléphone, emails, site, adresse, commentaire.
- Sélections : pays, langue, fuseau horaire, formats date/heure.
- Gestion des contacts : ajout/modification d’une ligne contact.

Règles visuelles de saisie à prévoir :
- Libellé toujours visible.
- Valeur vide rendue par placeholder sobre (`Non renseigné`).
- Erreur directement sous le champ concerné.
- États distincts : normal, focus, disabled, erreur.

## 18. Boutons et actions
Typologie des boutons visibles :
- Primaire plein bleu : `Modifier la société`.
- Secondaire contour : `Ajouter un contact`, `Modifier` (ligne), `Continuer la mise en route`.
- Lien/action discrète : `Voir tout l’historique`.

Règles d’alignement :
- Actions globales alignées en tête de section ou de carte.
- Action par ligne alignée en dernière colonne.

Règles de sauvegarde et annulation visuelles (mode édition futur) :
- `Enregistrer` en style primaire.
- `Annuler` en style secondaire.
- `Enregistrer` disabled tant qu’aucune modification détectée.

## 19. Badges et statuts visuels
Badges visibles et leur intention :
- `Complet` : succès (vert léger).
- `Incomplet` : alerte faible (rouge léger).
- `OK` : conformité (vert léger).
- `À compléter` : attention (orange léger).
- `À confirmer` : statut prudent métier (orange léger).
- `Principal` : mise en avant d’un contact référent (vert léger).
- `Admin` / `Gérant` : rôle affiché sur responsables applicatifs (teinte froide, discrète).

Règle :
- Badge court, lisible, sans surcharge de texte.

## 20. États visuels à prévoir
États obligatoires de page et de blocs :
- `Lecture` (par défaut).
- `Modification` (si autorisé).
- `Loading` : skeleton ou placeholders sur cartes.
- `Empty` : aucun contact, aucun responsable, aucun historique.
- `Erreur` : message fonctionnel non technique.
- `Succès` : confirmation sobre après enregistrement.
- `Disabled` : actions non accessibles selon droits ou contexte.

Exemples de messages attendus :
- Chargement : `Chargement de la société...`
- Erreur : `Impossible de charger les informations de la société. Veuillez réessayer.`
- Succès : `Les informations de la société ont été enregistrées.`

## 21. Hiérarchie visuelle
Niveau 1 :
- Titre `Société`.

Niveau 2 :
- Action primaire `Modifier la société`.
- Titres de cartes.

Niveau 3 :
- Libellés de champs et en-têtes de colonnes.

Niveau 4 :
- Valeurs, badges, textes d’aide, messages info.

Principe :
- La hiérarchie doit guider la lecture de gauche à droite puis de haut en bas, sans ambiguïté.

## 22. Espacements dimensions et densité
Référence visuelle desktop :
- Page dense mais respirante, sans zones vides excessives.
- Cartes à coins arrondis homogènes.
- Bordures fines uniformes.

Ordres de grandeur à respecter lors du codage pixel-perfect :
- Padding interne cartes : environ 20 à 24 px.
- Écart vertical entre cartes : environ 12 à 16 px.
- Écart entre en-tête page et première rangée : environ 16 à 24 px.
- Rayons cartes/boutons : arrondi modéré (environ 10 à 12 px).
- Hauteur ligne tableau contacts : compacte, lisible, orientée productivité.

## 23. Couleurs et ambiance visuelle
Ambiance générale :
- Interface claire, froide, professionnelle.
- Accent bleu pour actions et liens.
- Fonds de cartes blancs/gris très léger.
- Bordures gris clair discrètes.

Répartition sémantique :
- Primaire : bleu (actions majeures, liens).
- Texte principal : bleu nuit / gris foncé.
- Texte secondaire : gris moyen.
- Succès : vert doux.
- Erreur/alerte : rouge doux.
- Attention : orange doux.
- Info : bleu très clair avec icône info.

Règle :
- Conserver le contraste de la maquette et éviter toute saturation excessive hors actions primaires.

## 24. Typographie
Style observé :
- Sans-serif moderne, lisibilité élevée.
- Titre de page fort et large.
- Titres de cartes en semi-gras.
- Valeurs de données en corps standard.
- Labels plus petits que les valeurs.

Rythme typographique attendu :
- Titre page > titres cartes > valeurs > libellés secondaires.
- Interlignage suffisant pour lecture rapide multi-blocs.

## 25. Icônes
Icônes visibles par usage :
- Icône crayon sur `Modifier la société`.
- Icônes de section/lignes dans `Résumé de configuration`.
- Icône information dans les encarts informatifs.
- Icône utilisateur dans `Responsables applicatifs` et `Contacts société`.
- Icône calendrier/activité dans `Historique récent`.
- Icône action sur boutons `Ajouter` / `Modifier`.

Règles :
- Taille discrète et constante.
- Alignement vertical centré avec texte.
- Fonction de renfort visuel, jamais décorative uniquement.

## 26. Règles de permissions visibles
Règles d’interface :
- Les actions de modification sont visibles uniquement pour profils autorisés.
- En absence de droit d’édition, la page reste en consultation pure.
- Les actions sensibles doivent être traçables côté audit (selon fiche).

Règles de cloisonnement :
- Aucune action de changement manuel de société sur cette page.
- Aucun identifiant technique tenant affiché.
- Aucun contournement visuel du cloisonnement par société.

## 27. Règles d’ergonomie métier
- Distinguer clairement `Société` (profil permanent) et `Mise en route` (configuration initiale guidée).
- Distinguer `Contact société` et `Utilisateur applicatif`.
- Maintenir un langage non technique orienté métier.
- Afficher les champs non renseignés de façon sobre et explicite.
- Préserver des messages d’erreur compréhensibles.
- Préserver des messages de succès sobres.

## 28. Composants réutilisables futurs
Composants à documenter pour implémentation future sans création dans ce FIX :
- `components/company/CompanyPage`
- `components/company/CompanyProfileCard`
- `components/company/CompanyInfoSection`
- `components/company/CompanyAdminSection`
- `components/company/CompanyContactSection`
- `components/company/CompanySettingsSection`
- `components/company/CompanyForm`
- `components/company/CompanyEditActions`
- `components/ui/PageHeader`
- `components/ui/Card`
- `components/ui/Badge`
- `components/ui/Button`
- `components/ui/Input`
- `components/ui/Textarea`
- `components/ui/Select`
- `components/ui/EmptyState`
- `components/ui/LoadingState`
- `components/ui/SuccessMessage`
- `components/ui/ErrorMessage`

## 29. Stratégie Tailwind future
Stratégie à documenter uniquement (pas de configuration créée ici) :
- Grille page : 2 colonnes haut, 1 colonne pleine largeur, puis 3 colonnes bas.
- Largeur contenu : container large desktop avec marges latérales constantes.
- Largeur cartes : ratio gauche/droite stable en haut, cartes égales en bas.
- Padding contenu : uniforme par carte et section.
- Gap entre sections : vertical régulier.
- Rayons cartes : arrondi modéré homogène.
- Bordures fines : 1 px discret.
- Ombres légères : très faibles, non envahissantes.
- Couleurs de fond : neutres claires.
- Couleurs de texte : contraste net hiérarchisé.
- Couleur d’accent bleu : réservée aux actions/liens.
- Couleurs succès/erreur : badges et messages.
- Styles champs : fond clair, bordure fine, focus lisible.
- États focus/disabled/error : toujours distincts visuellement.
- Responsive desktop/tablette/mobile : conservation de la hiérarchie et de la lisibilité.

## 30. Responsive futur
Objectif futur sans altérer la logique desktop :
- Tablette : passage progressif vers 1 colonne pour certaines rangées.
- Mobile : empilement vertical complet des cartes.
- Tableau `Contacts société` : rendu carte/liste compacte si largeur insuffisante.
- Actions : conserver visibilité des actions primaires et des statuts.

Règle :
- Le responsive adapte la disposition, pas le périmètre métier.

## 31. Accessibilité minimale
Exigences minimales :
- Contraste texte/fond suffisant.
- États focus clavier visibles sur boutons, liens, champs.
- Libellés explicites pour chaque champ.
- Icônes non suffisantes seules : texte associé obligatoire.
- Messages erreur/succès lisibles sans jargon technique.
- Zone cliquable confortable pour actions de tableau.

## 32. Ce qui doit être codé plus tard
À coder ultérieurement selon cette référence UI/UX :
- Mode modification complet avec validations visuelles.
- Sauvegarde/annulation explicites par flux d’édition.
- États `loading`, `empty`, `error`, `success` homogènes.
- Masquage/affichage des actions selon permissions réelles.
- Traçabilité des actions sensibles vers audit (si activée côté fonctionnel).
- Responsive tablette/mobile conforme à la hiérarchie desktop.

## 33. Ce qui ne doit pas être codé
Interdictions explicites de périmètre :
- Changement manuel de société.
- Choix manuel de tenant.
- Affichage d’identifiants techniques multi-tenant.
- Changement de rôle depuis cette page.
- Gestion des utilisateurs depuis cette page.
- Gestion des dépôts/bases depuis cette page.
- Gestion des véhicules depuis cette page.
- Gestion des permissions depuis cette page.
- Facturation/abonnement si non validé.
- RGPD complet si non validé dans cette page.
- Debug visible.
- JSON visible.
- Erreur serveur technique détaillée.

## 34. Interdictions de dérive
- Ne pas transformer `Société` en cockpit de configuration globale.
- Ne pas déplacer le workflow complet `Mise en route` dans cette page.
- Ne pas ajouter de blocs non visibles dans maquette sans validation explicite.
- Ne pas inventer des règles réglementaires non documentées.
- Ne pas présenter cette référence comme validation fonctionnelle définitive.

## 35. Checklist de conformité visuelle 99 %
- Le titre `Société`, le sous-titre et le bouton `Modifier la société` sont positionnés comme sur maquette.
- Les 8 cartes/blocs visibles sont présentes avec la même logique de disposition.
- `Informations générales` reprend les 6 paires champ/valeur visibles.
- `Résumé de configuration` affiche les 6 lignes de statut et le message d’incomplétude.
- `Adresse principale` contient ses 5 champs et l’encart d’information dépôts/bases.
- `Responsables applicatifs` affiche les 2 entrées et la mention d’origine Utilisateurs / RH.
- `Contacts société` conserve ses 6 colonnes, le badge `Principal`, et les actions `Modifier`.
- Le bas de page contient les 3 cartes : métier, paramètres, historique.
- Les badges (`Complet`, `Incomplet`, `OK`, `À compléter`, `À confirmer`, `Principal`, `Admin`, `Gérant`) suivent la sémantique visuelle attendue.
- Les états `lecture`, `édition`, `empty`, `loading`, `erreur`, `succès`, `disabled` sont prévus sans UI technique brute.
- Aucune action de changement manuel de société ou logique tenant technique n’apparaît.
- Aucun élément hors périmètre (utilisateurs, véhicules, permissions, facturation) n’est introduit dans cette page.
- Les textes métier restent compréhensibles et non techniques.
- Le document reste une référence UI/UX codable, sans prétendre valider définitivement le fonctionnel.
