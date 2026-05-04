# Spécification UI/UX codable — Maquettes PNG Ambulance Manager

Archive analysée : `MAQUETTE.zip`  
Périmètre visible : 11 maquettes PNG validées.

> Règle appliquée : cette analyse décrit uniquement ce qui est visible ou raisonnablement déductible depuis les PNG. Les éléments non visibles ou non prouvés sont marqués exactement : **INFORMATION NON FOURNIE — À CONFIRMER**.

---

## 0. Synthèse transversale avant analyse page par page

### 0.1 Direction artistique globale observée

Les maquettes partagent une direction artistique très cohérente : SaaS métier santé, propre, clair, professionnel, plutôt premium mais sobre. Le style est celui d’une application de gestion interne moderne, sans surcharge graphique, avec une forte lisibilité métier.

À conserver impérativement :

- fond global très clair, blanc cassé / gris bleuté très léger ;
- cartes blanches avec bordure fine et arrondis larges ;
- bleu primaire pour actions principales, navigation active et focus ;
- bleu marine profond pour titres et textes structurants ;
- badges colorés sobres pour statuts métier ;
- densité métier compacte mais respirante ;
- sidebar claire à gauche sur les écrans applicatifs ;
- topbar horizontale sur les écrans connectés ;
- panneaux droits de détail sur les modules de gestion ;
- icônes simples, linéaires ou semi-remplies, dans des carrés arrondis colorés ;
- éviter tout dark mode réel tant qu’il n’est pas visible, même si un toggle thème existe.

### 0.2 Layout global commun applicatif

Sauf la page Login, toutes les pages utilisent une structure commune :

```txt
┌───────────────────────────────────────────────────────────────┐
│ Sidebar fixe │ Topbar horizontale                              │
│              ├────────────────────────────────────────────────┤
│              │ Page content                                    │
│              │ - header                                        │
│              │ - stat cards / filtres / tableau / détail        │
│              │ - drawer ou panneau droit selon page             │
└──────────────┴────────────────────────────────────────────────┘
```

Caractéristiques approximatives visibles :

- sidebar : environ 240 à 280 px de largeur selon le PNG ;
- topbar : environ 64 à 72 px de hauteur ;
- contenu principal : padding horizontal 28 à 36 px ;
- grid de contenu : souvent 12 colonnes implicites ;
- pages de gestion : zone principale + panneau droit de 360 à 430 px ;
- cartes : rayon 14 à 18 px ;
- bordures : gris bleuté très clair ;
- ombres : très faibles, surtout sur cartes principales, drawers et login card.

### 0.3 Palette approximative à extraire en design tokens

Les valeurs ci-dessous sont approximatives, car issues d’un PNG :

```txt
--color-bg-app: #F8FAFC / #F9FBFF
--color-surface: #FFFFFF
--color-surface-soft: #F3F7FF
--color-border: #E4EAF3 / #E7ECF5
--color-text-title: #071B49 / #0B1B45
--color-text-body: #34456B / #3E4D73
--color-text-muted: #7080A0 / #7A89A8
--color-primary: #1677FF / #1476F2
--color-primary-soft: #EAF2FF
--color-cyan: #10BFD1
--color-teal: #12B8B5
--color-green: #22C55E
--color-green-soft: #E9F8EF
--color-orange: #F97316
--color-orange-soft: #FFF2E3
--color-yellow: #F59E0B
--color-yellow-soft: #FFF7E5
--color-purple: #7C3AED
--color-purple-soft: #F1EAFF
--color-red: #EF4444
--color-red-soft: #FFF1F1
--color-neutral-icon: #7B89A6
```

### 0.4 Typographie globale

Typographie probablement sans-serif moderne, proche d’Inter, Arial ou équivalent.

Hiérarchie visible :

- H1 page : 30 à 38 px, graisse 700/800, bleu marine ;
- sous-titre page : 14 à 16 px, graisse 400/500, gris bleuté ;
- titres de cards : 15 à 18 px, graisse 600/700 ;
- valeurs KPI : 24 à 32 px, graisse 700/800, couleur de l’indicateur ;
- table headers : 11 à 13 px, graisse 600/700 ;
- cellules tableau : 12 à 14 px ;
- badges : 11 à 12 px, graisse 500/600 ;
- boutons : 13 à 15 px, graisse 600.

### 0.5 Composants récurrents à factoriser

Composants à créer ou stabiliser pour une intégration fidèle :

- `AppShell`
- `Sidebar`
- `SidebarNavItem`
- `Topbar`
- `CompanySwitcher`
- `ThemeToggle`
- `UserMenu`
- `PageHeader`
- `PrimaryButton`
- `SecondaryButton`
- `DangerButton`
- `IconButton`
- `StatCard`
- `ModuleCard`
- `FilterBar`
- `SearchInput`
- `SelectFilter`
- `SegmentedControl`
- `Tabs`
- `DataTable`
- `TablePagination`
- `StatusBadge`
- `MetricBadge`
- `DetailDrawer`
- `DrawerSectionCard`
- `DangerZone`
- `FormCard`
- `FormField`
- `EmptyState`
- `ErrorMessage`
- `UploadDropzone`
- `ProgressStepper`
- `ProgressTimeline`
- `LegalContentCard`

---

# 1. Login_V1.1

## 1.1 Identification de la page

- Nom probable : Connexion.
- Route probable : `/login`.
- Fonction principale : authentification utilisateur.
- Objectif utilisateur principal : accéder à l’espace Ambulance Manager via email + mot de passe.

## 1.2 Structure générale

La page est divisée en deux grands panneaux verticaux :

- panneau gauche visuel, sombre, occupant environ 47 % de la largeur ;
- panneau droit clair, occupant environ 53 % de la largeur.

Panneau gauche :

- fond bleu nuit avec photo d’ambulance en arrière-plan ;
- overlay sombre pour garantir la lisibilité ;
- logo Ambulance Manager en haut à gauche ;
- badge `ALPHA` sous le logo ;
- grand slogan : `Simplifiez la gestion opérationnelle de votre société de transport sanitaire.` ;
- séparateur court cyan ;
- liste de 4 bénéfices avec icônes cyan : planning intelligent, flotte optimisée, équipes connectées, conformité & sécurité ;
- carte de réassurance en bas : accès réservé, hébergement France, RGPD.

Panneau droit :

- fond blanc très légèrement bleuté ;
- motifs géométriques hexagonaux très discrets en arrière-plan ;
- carte de connexion centrée horizontalement et verticalement ;
- pictogramme ambulance dans un cercle qui chevauche le haut de la carte ;
- titre `Connexion` ;
- sous-titre `Accédez à votre espace Ambulance Manager` ;
- champs email et mot de passe ;
- checkbox `Se souvenir de moi` ;
- bouton principal bleu `Connexion` avec icône cadenas ;
- bloc d’erreur rouge visible `Identifiants invalides` ;
- mention légale avec lien `Mentions d’information` ;
- badge footer `Hébergé en France | Conforme RGPD`.

## 1.3 Direction artistique

- Ambiance : premium, sécurisante, médicale, technologique.
- Style dominant : écran marketing + login SaaS.
- Couleur dominante gauche : bleu nuit profond.
- Couleur accent : cyan / bleu primaire.
- Cartes : blanc pur, bordure gris bleuté, ombre douce.
- Erreur : fond rouge très pâle, bordure rouge clair, icône triangle rouge.
- Arrondis : importants, environ 16 à 20 px sur la carte, 8 à 12 px sur les champs.
- Densité : très aérée, non métier, adaptée à l’entrée dans l’application.

## 1.4 Typographie

- Logo : fort contraste `Ambulance` blanc et `Manager` cyan.
- Slogan gauche : 28 à 34 px, graisse 700/800, interligne confortable.
- Bénéfices : titre 15 à 17 px en gras, description 13 à 14 px.
- Titre connexion : environ 36 px, bleu marine, graisse 800.
- Labels champs : 13 à 14 px, graisse 600/700.
- Inputs : 14 à 15 px, texte gris bleuté.

## 1.5 Composants UI visibles

- `LoginLayout` : split screen 2 colonnes.
- `BrandPanel` : panneau image + argumentaire.
- `AuthCard` : carte de formulaire centrée.
- `LogoMark` : icône ambulance.
- `TextInput` : email avec icône enveloppe.
- `PasswordInput` : champ mot de passe avec icône cadenas + œil.
- `Checkbox` : option de mémorisation.
- `PrimaryButton` : pleine largeur, bleu.
- `AlertError` : erreur d’identifiants.
- `LegalLink` : lien mentions.
- `TrustBadge` : hébergé France + RGPD.

## 1.6 Contenu et données affichées

Textes visibles :

- `Ambulance Manager`
- `ALPHA`
- `Simplifiez la gestion opérationnelle de votre société de transport sanitaire.`
- `Planning intelligent` / `Organisez vos équipes et vos interventions`
- `Flotte optimisée` / `Suivez vos véhicules et équipements`
- `Équipes connectées` / `Gérez vos utilisateurs et compétences`
- `Conformité & sécurité` / `Données sécurisées et tracées`
- `Accès réservé aux utilisateurs autorisés`
- `Vos données sont hébergées en France et protégées conformément au RGPD.`
- `Connexion`
- `Accédez à votre espace Ambulance Manager`
- `Adresse email`
- `exemple@ambulances.fr`
- `Mot de passe`
- `Votre mot de passe`
- `Se souvenir de moi`
- `Identifiants invalides`
- `L’adresse email ou le mot de passe est incorrect.`
- `Mentions d’information`
- `Hébergé en France`
- `Conforme RGPD`

## 1.7 Comportements frontend à prévoir

Déductible :

- submit formulaire ;
- validation email/mot de passe ;
- affichage/masquage mot de passe ;
- checkbox `Se souvenir de moi` ;
- affichage d’erreur d’authentification ;
- lien vers `/privacy` ou page mentions d’information ;
- état loading du bouton connexion à prévoir.

Non visible :

- récupération mot de passe : INFORMATION NON FOURNIE — À CONFIRMER.
- SSO : INFORMATION NON FOURNIE — À CONFIRMER.
- responsive mobile exact : INFORMATION NON FOURNIE — À CONFIRMER.

## 1.8 Spécification codable

Découpage recommandé :

```txt
/login/page.tsx
  LoginPage
    LoginMarketingPanel
    LoginFormPanel
      LoginCard
        LoginForm
        AuthErrorAlert
      LoginFooterBadges
```

Contraintes à respecter :

- conserver le split screen desktop ;
- ne pas remplacer la photo sombre ambulance par une illustration générique ;
- garder l’icône ambulance au-dessus de la card ;
- conserver les motifs très discrets côté droit ;
- ne pas ajouter de liens ou d’options non visibles sans validation.

## 1.9 Limites du format PNG

Le PNG suffit pour analyser layout, style, couleurs approximatives, textes et état d’erreur. Il ne permet pas de connaître précisément les dimensions CSS, la police exacte, les breakpoints, l’animation du bouton, la source de l’image d’ambulance ni les tokens réels.

Format idéal complémentaire : Figma ou export SVG + design tokens + CSS existant.

---

# 2. Dashboard_V1

## 2.1 Identification de la page

- Nom probable : Tableau de bord.
- Route probable : `/dashboard`.
- Fonction principale : portail d’accès aux modules.
- Objectif utilisateur principal : voir son contexte de connexion, les indicateurs simples et ouvrir les modules disponibles.

## 2.2 Structure générale

Layout applicatif complet : sidebar gauche + topbar + contenu central.

Sidebar :

- logo Ambulance Manager + badge ALPHA ;
- navigation verticale : Tableau de bord, Planning, Utilisateurs / RH, Véhicules, Templates, Société, Dépôts, Onboarding, Audit ;
- item actif : Tableau de bord avec fond bleu clair, icône bleue, texte bleu ;
- bas de sidebar : carte thème avec toggle, puis carte utilisateur.

Topbar :

- sélecteur société `SC Ambulances` ;
- bouton thème/icône soleil ;
- zone utilisateur `Nathan A.` + rôle `Admin` ;
- bouton déconnexion.

Contenu :

- H1 `Tableau de bord` ;
- sous-titre : portail d’accès aux modules ;
- grande carte identité connectée ;
- ligne de 4 KPI : utilisateurs, véhicules, dépôts, templates ;
- grille de 8 cartes modules en deux lignes : Planning, Utilisateurs/RH, Véhicules, Templates, Société, Dépôts, Onboarding, Audit.

Hiérarchie :

- le header page domine ;
- la carte utilisateur établit le contexte ;
- les KPI sont secondaires mais très visibles ;
- les modules sont des cards d’action.

## 2.3 Direction artistique

- Ambiance : portail SaaS professionnel.
- Fond : gris bleuté très clair.
- Cartes : blanches, bordures fines, arrondis larges.
- Couleurs KPI : bleu, turquoise, violet, orange.
- Statuts : `Disponible` vert ; `Selon permissions` orange.
- Densité : moyenne, très lisible.

## 2.4 Typographie

- H1 : 36 à 40 px, bleu marine, gras.
- Sous-titre : 15 px, gris bleuté.
- Titres cards modules : 16 à 18 px, gras.
- KPI : valeur 30 à 34 px, très gras, couleur indicateur.
- Texte bouton `Ouvrir` : 14 px, graisse 500/600.

## 2.5 Composants UI visibles

- `AppShell`
- `Sidebar`
- `Topbar`
- `CompanySwitcher`
- `ThemeToggle`
- `UserMenu`
- `PageHeader`
- `ConnectedUserCard`
- `StatCard`
- `ModuleCard`
- `StatusBadge`
- `ActionButton`

Règles visuelles :

- `StatCard` : icône carrée colorée à gauche, valeur forte, sous-texte gris.
- `ModuleCard` : icône colorée, titre, description, badge statut, bouton outline `Ouvrir`.
- navigation active : fond bleu très pâle et texte bleu.

## 2.6 Contenu et données affichées

Textes visibles majeurs :

- `Tableau de bord`
- `Portail d’accès aux modules de gestion de votre société ambulancière.`
- `Connecté en tant que Nathan Archenoul`
- `nathan.archenoul@sc-ambulances.fr`
- `Rôle` / `Administrateur`
- `Société` / `SC Ambulances`
- `Utilisateurs actifs` : `24` `sur 32 utilisateurs`
- `Véhicules actifs` : `36` `sur 48 véhicules`
- `Dépôts actifs` : `8` `sur 10 dépôts`
- `Templates actifs` : `12` `sur 15 templates`
- Modules : Planning, Utilisateurs/RH, Véhicules, Templates, Société, Dépôts, Onboarding, Audit.

## 2.7 Comportements frontend à prévoir

Déductible :

- clic sur chaque module `Ouvrir` ;
- filtrage des modules selon droits ;
- affichage statut disponible / selon permissions ;
- changement de société via dropdown ;
- menu utilisateur ;
- toggle thème ;
- déconnexion.

Non visible :

- contenu exact du menu utilisateur : INFORMATION NON FOURNIE — À CONFIRMER.
- comportement exact du thème sombre : INFORMATION NON FOURNIE — À CONFIRMER.
- indicateurs chargés via API ou statiques : INFORMATION NON FOURNIE — À CONFIRMER.

## 2.8 Spécification codable

Découpage recommandé :

```txt
/dashboard/page.tsx
  DashboardPage
    AppShell
    PageHeader
    ConnectedUserCard
    DashboardStatsGrid
      StatCard[]
    ModuleGrid
      ModuleCard[]
```

À factoriser :

- données de navigation sidebar ;
- cards modules ;
- badges statut ;
- topbar commune.

À ne pas modifier :

- le dashboard doit rester un portail, pas un cockpit analytique dense ;
- conserver la grille de modules claire ;
- conserver la carte contexte utilisateur.

## 2.9 Limites PNG

Le PNG permet de coder fidèlement la page desktop. Il ne donne pas les états hover, les menus déroulés, ni les règles de permission exactes.

---

# 3. Planning_V1.2

## 3.1 Identification de la page

- Nom probable : Planning.
- Route probable : `/planning`.
- Fonction principale : consulter et gérer les shifts, absences et affectations du personnel.
- Objectif utilisateur principal : visualiser le planning par période et agir sur des shifts sélectionnés.

## 3.2 Structure générale

Layout applicatif avec sidebar, topbar, contenu et panneau droit.

Zone principale :

- header `Planning` ;
- sous-titre `Vue globale des shifts, absences et affectations du personnel` ;
- bouton principal haut droit `Ajouter un shift` ;
- première ligne de filtres : période, dépôt, rôle, utilisateur ;
- segmented control : `Personnel` actif / `Vue dépôt` ;
- bloc export : Export PDF, Excel, CSV, Imprimer ;
- tabs : Planning manuel, Affectations, Autoschedule, Matching, Historique, Exports ;
- tableau planning très structuré ;
- barre d’actions bulk en bas : sélection, affecter employé 1, affecter employé 2, affecter véhicule, affecter base, vider.

Tableau :

- colonnes : checkbox, salarié, rôle, base, statut, semaine 1, semaine 2, semaine 3, semaine 4 ;
- lignes par salarié avec avatar initiales ;
- shifts en pills colorées ;
- cellule active entourée bleu ;
- plusieurs lignes sélectionnées via checkbox bleue.

Panneau droit :

- `Détail de la cellule` ;
- utilisateur sélectionné ;
- semaine sélectionnée ;
- liste d’affectations ;
- absences ;
- conflits / alertes ;
- actions : voir détail, modifier, ajouter shift.

## 3.3 Direction artistique

- Ambiance : outil métier dense mais lisible.
- Style : tableau opérationnel + drawer de détail.
- Couleurs : pills bleues pour ambulance, cyan pour VSL, orange pour taxi/congé, violet pour garde, gris pour repos.
- Cellule sélectionnée : bordure bleue marquée.
- Bulk bar : blanche, collée en bas de tableau, boutons outline.
- Densité : forte mais organisée.

## 3.4 Typographie

- H1 : 34 à 38 px.
- Tabs : 14 px, actif bleu avec underline.
- Headers tableau : 11 à 12 px, gras.
- Noms salariés : 13 à 14 px, gras.
- Pills shift : 11 à 12 px, graisse 600.
- Panneau droit : titre 18 à 20 px, sections 14 à 16 px.

## 3.5 Composants UI visibles

- `PlanningPage`
- `FilterBar`
- `PeriodSelect`
- `DepotSelect`
- `RoleSelect`
- `UserSelect`
- `SegmentedControl`
- `ExportButtonGroup`
- `Tabs`
- `PlanningMatrixTable`
- `ShiftPill`
- `StatusBadge`
- `BulkActionBar`
- `PlanningCellDrawer`
- `AssignmentList`
- `AlertBox`

## 3.6 Contenu et données affichées

Textes visibles principaux :

- `Planning`
- `Mai 2024`
- `Tous`
- `Personnel` / `Vue dépôt`
- `Export PDF`, `Excel`, `CSV`, `Imprimer`
- Tabs : `Planning manuel`, `Affectations`, `Autoschedule`, `Matching`, `Historique`, `Exports`
- Salariés visibles : Nathan Archenoul, Marie Bernard, Lucas Petit, Sophie Chevalier, Alexandre Dubois, Laura Moreau, Julien Faure, Camille Henry.
- Rôles visibles : Ambulancier, Ambulancière, Assistante planification.
- Bases : Dépôt Nord, Dépôt Centre, Dépôt Sud, Siège.
- Statuts : Actif, En congé.
- Shifts : Ambulance, Taxi, VSL, Garde A, Garde Nord, Garde Nuit, Repos, Congé.
- Détail : `Affectations (5)`, `Absences 0`, `Conflits / alertes 0`, `Aucun conflit détecté.`

## 3.7 Comportements frontend à prévoir

Déductible :

- changement de période ;
- filtres dépôt/rôle/utilisateur ;
- switch Personnel / Vue dépôt ;
- changement d’onglet ;
- sélection ligne ;
- sélection cellule ;
- ouverture/actualisation du panneau droit ;
- actions bulk ;
- export PDF/Excel/CSV/impression ;
- ajout/modification shift.

Non visible :

- drag & drop de shifts : INFORMATION NON FOURNIE — À CONFIRMER.
- multi-sélection de cellules par glisser : INFORMATION NON FOURNIE — À CONFIRMER.
- règles exactes autoschedule/matching : INFORMATION NON FOURNIE — À CONFIRMER.

## 3.8 Spécification codable

Découpage recommandé :

```txt
/planning/page.tsx
  PlanningPage
    PlanningHeaderActions
    PlanningFilters
    PlanningViewSwitch
    PlanningTabs
    PlanningMatrix
      PlanningRow
      PlanningCell
      ShiftPill
    PlanningBulkActions
    PlanningCellDetailDrawer
```

Contraintes critiques :

- conserver la matrice comme élément central ;
- garder les couleurs de pills cohérentes par type de shift ;
- ne pas transformer en calendrier mensuel générique ;
- maintenir le drawer droit, essentiel pour le détail opérationnel ;
- conserver la barre d’actions en bas du tableau.

## 3.9 Limites PNG

Le PNG ne permet pas de connaître la logique de calcul des conflits, le modèle de données réel des shifts, ni les états exacts des cellules.

---

# 4. Utilisateurs-RH_V1

## 4.1 Identification de la page

- Nom probable : Utilisateurs / RH.
- Route probable : `/users`.
- Fonction principale : administrer salariés, rôles, permissions, rattachements, horaires et absences.
- Objectif utilisateur principal : gérer la liste des utilisateurs et consulter/modifier la fiche RH d’un utilisateur.

## 4.2 Structure générale

Zone principale :

- H1 `Utilisateurs / RH` ;
- sous-titre décrivant salariés, rôles, permissions, rattachements, horaires, absences ;
- bouton principal `Créer un utilisateur` ;
- 4 stat cards : utilisateurs actifs, stagiaires, absences en cours, comptes archivés ;
- barre de filtres avec recherche, rôle, base, statut, stagiaire, bouton réinitialiser ;
- tableau utilisateurs ;
- pagination bas de page.

Panneau droit :

- fiche utilisateur sélectionnée ;
- avatar initiales `NA` ;
- nom `Nathan Archenoul` ;
- badges `Admin`, `Actif` ;
- téléphone ;
- bouton `Enregistrer` ;
- tabs fiche : Identité, Rôle & permissions, RH, Absences, Sécurité ;
- onglet Absences actif ;
- table absences enregistrées ;
- récapitulatif ;
- zone de sécurité rouge pâle avec réinitialisation mot de passe et archivage utilisateur.

## 4.3 Direction artistique

- Ambiance : administration RH claire et sensible.
- Panneau droit : plus large que les cards, séparé par bordure verticale.
- Danger zone : rouge pâle, bordure rouge légère.
- Badges rôles : couleurs par rôle.
- Ligne sélectionnée : fond bleu très pâle + bordure bleue.

## 4.4 Typographie

- H1 : 34 à 38 px.
- Stats : valeur 26 à 30 px.
- Table : dense, 12 à 13 px.
- Nom utilisateur dans drawer : 16 à 18 px, gras.
- Tabs drawer : 13 à 14 px, actif bleu underline.

## 4.5 Composants UI visibles

- `UsersPage`
- `StatCard`
- `UsersFilterBar`
- `DataTable`
- `UserAvatarInitials`
- `RoleBadge`
- `StatusBadge`
- `DrawerTabs`
- `UserDetailDrawer`
- `AbsenceTable`
- `SummaryCard`
- `DangerZone`
- `Pagination`

## 4.6 Contenu et données affichées

Stats :

- `Utilisateurs actifs` : 28 sur 34 utilisateurs.
- `Stagiaires` : 4 sur 34 utilisateurs.
- `Absences en cours` : 6 utilisateurs.
- `Comptes archivés` : 3 inactifs.

Colonnes tableau :

- Identité
- Initiales
- Email
- Rôle
- Base
- Téléphone
- Statut
- Stagiaire
- Horaires
- Dernière modif
- Actions

Exemples visibles :

- Nathan Archenoul, Admin, Siège, Actif.
- Marie Bernard, Gérant, Siège, Actif.
- Lucas Petit, Régulateur, Dépôt Nord, Actif.
- Sophie Chevalier, Ambulancier, Dépôt Nord, Actif.
- Alexandre Dubois, ADE, Dépôt Centre, En congé.
- Laura Moreau, Bureau, Siège, Actif.
- Julien Faure, AA, Dépôt Sud, Actif.
- Camille Henry, Taxi, Dépôt Sud, Inactif.

Drawer absences :

- Congé payé : 20 mai 2024 → 24 mai 2024, Validée.
- Indisponibilité : 5 juin 2024 → 6 juin 2024, Validée.
- Formation : 17 juin 2024 → 17 juin 2024, En attente.

## 4.7 Comportements frontend à prévoir

Déductible :

- création utilisateur ;
- recherche ;
- filtres rôle/base/statut/stagiaire ;
- réinitialisation filtres ;
- sélection d’une ligne et ouverture drawer ;
- édition via icône crayon ;
- menu actions trois points ;
- ajout absence ;
- suppression absence ;
- reset password ;
- archivage utilisateur ;
- sauvegarde drawer.

Non visible :

- validation formulaire exacte : INFORMATION NON FOURNIE — À CONFIRMER.
- modale de confirmation archivage : INFORMATION NON FOURNIE — À CONFIRMER.
- système de permissions complet : INFORMATION NON FOURNIE — À CONFIRMER.

## 4.8 Spécification codable

Découpage recommandé :

```txt
/users/page.tsx
  UsersPage
    UsersStats
    UsersFilters
    UsersTable
    UserDetailDrawer
      UserHeader
      UserTabs
      UserAbsencesPanel
      UserSecurityDangerZone
```

Contraintes critiques :

- conserver le panneau droit permanent sur desktop ;
- conserver les onglets internes ;
- conserver la danger zone rouge pour les actions sensibles ;
- ne pas cacher les actions principales dans un menu unique.

## 4.9 Limites PNG

Le PNG ne donne pas le détail des onglets Identité, Rôle & permissions, RH, Sécurité hors onglet Absences.

---

# 5. Véhicules_V1.2

## 5.1 Identification de la page

- Nom probable : Véhicules.
- Route probable : `/vehicles`.
- Fonction principale : gestion de la flotte et de la conformité documentaire minimale.
- Objectif utilisateur principal : consulter l’état de la flotte, filtrer, sélectionner un véhicule et voir son détail.

## 5.2 Structure générale

Zone principale :

- header `Véhicules` ;
- sous-titre `Gérez votre flotte de véhicules et leurs équipements` ;
- bouton `Ajouter un véhicule` ;
- barre filtres : recherche, statut, type, dépôt, filtres avancés ;
- 5 stat cards : total véhicules, en service, en maintenance, hors service, conformité à surveiller ;
- tableau dense des véhicules ;
- pagination bas.

Panneau droit :

- titre véhicule `Ambulance 01` ;
- immatriculation `FT-123-AB` ;
- badge `En service` ;
- tabs : Détails, Équipements, Maintenance, Docs ;
- photo véhicule ;
- informations type, marque/modèle, année, kilométrage ;
- bloc affectation ;
- bloc contrôles & maintenance ;
- bloc informations complémentaires ;
- boutons bas : Modifier, Voir l’historique.

## 5.3 Direction artistique

- Ambiance : flotte professionnelle, maintenance, conformité.
- Couleurs statut : vert en service, orange maintenance/bientôt expiré, rouge hors service/expiré, bleu disponible, cyan VSL, orange Taxi.
- La photo du véhicule donne un ancrage réaliste.
- Panneau droit très structuré en cards empilées.

## 5.4 Typographie

- H1 : 34 à 38 px.
- Tableau : compact, 11 à 13 px.
- Titre drawer : 21 à 24 px.
- Valeurs drawer : 13 à 14 px.
- Badges : 11 à 12 px.

## 5.5 Composants UI visibles

- `VehiclesPage`
- `VehiclesFilters`
- `StatCard`
- `VehicleDataTable`
- `VehicleTypeBadge`
- `VehicleStatusBadge`
- `ComplianceBadge`
- `VehicleDetailDrawer`
- `VehiclePhotoCard`
- `MaintenanceCard`
- `DrawerTabs`

## 5.6 Contenu et données affichées

Stats :

- 27 Total véhicules.
- 18 En service.
- 2 En maintenance.
- 1 Hors service.
- 6 Conformité à surveiller.

Colonnes tableau visibles :

- Véhicule
- Immatriculation
- Type
- Dépôt
- Statut
- Assurance
- Contrôle technique
- Carte grise
- Agrément sanitaire
- Conformité
- Dernière modif.
- Actions

Exemples visibles :

- Ambulance 01 Renault Master, FT-123-AB, Dépôt Nord, En service, Conforme.
- VSL 01 Peugeot Boxer, VSL, Dépôt Sud.
- Taxi 01 Toyota Corolla, Disponible.
- Ambulance 03 Fiat Ducato, En maintenance, Expiré.

Drawer :

- Type : Ambulance.
- Marque / Modèle : Renault Master.
- Année : 2021.
- Kilométrage : 68 450 km.
- Dépôt : Dépôt Nord.
- Affecté à : Équipe A - Jour.
- Conducteur principal : Nathan Archenoul.
- Carburant : Diesel.
- Capacité : 4 places / 1 brancard.
- Assurance : AXA - N° 123456789.
- Fin d’assurance : 30/09/2024.

## 5.7 Comportements frontend à prévoir

Déductible :

- ajout véhicule ;
- recherche ;
- filtres statut/type/dépôt ;
- filtres avancés ;
- sélection d’une ligne ;
- ouverture/fermeture drawer ;
- changement onglets drawer ;
- modification véhicule ;
- historique véhicule ;
- pagination.

Non visible :

- édition inline : INFORMATION NON FOURNIE — À CONFIRMER.
- upload docs : INFORMATION NON FOURNIE — À CONFIRMER.
- upload photo véhicule : INFORMATION NON FOURNIE — À CONFIRMER.

## 5.8 Spécification codable

Découpage recommandé :

```txt
/vehicles/page.tsx
  VehiclesPage
    VehiclesHeader
    VehiclesFilters
    VehiclesStats
    VehiclesTable
    VehicleDetailDrawer
      VehicleTabs
      VehicleDetailsTab
      VehicleMaintenanceCard
      VehicleComplementaryInfoCard
```

Contraintes critiques :

- conserver la conformité visible directement dans le tableau ;
- conserver les couleurs de criticité ;
- ne pas supprimer la photo dans le drawer ;
- garder les données maintenance dans des cards séparées.

## 5.9 Limites PNG

Le PNG ne permet pas de connaître les champs exacts des onglets Équipements, Maintenance, Docs.

---

# 6. Templates_V1.1

## 6.1 Identification de la page

- Nom probable : Templates de garde.
- Route probable : `/templates`.
- Fonction principale : gérer les modèles de garde / shifts.
- Objectif utilisateur principal : créer, consulter, filtrer et archiver des templates.

## 6.2 Structure générale

Zone principale :

- titre `Templates de garde` ;
- sous-titre ;
- bouton `Nouveau template` ;
- 5 stat cards : total, actifs, désactivés, archivés, types de garde ;
- filtres : recherche, type véhicule, traverse minuit, filtres avancés, export, vue ;
- tableau templates ;
- pagination.

Panneau droit :

- template sélectionné `Garde Ambulance Jour` ;
- code `GAJ-001` ;
- badge `Actif` ;
- tabs : Détails, Équipe, Horaires, Historique ;
- cards d’informations générales, horaires, équipe requise, utilisation ;
- boutons : Modifier, Dupliquer, Archiver.

## 6.3 Direction artistique

- Ambiance : paramétrage métier propre.
- Couleurs par type : ambulance bleu, VSL vert/cyan, taxi orange, garde violet.
- Badges traverse minuit : vert Non, rouge Oui.
- Action archive : bouton rouge plein, très visible.

## 6.4 Typographie

- H1 : 34 à 38 px.
- Titre drawer : 20 à 24 px.
- Table : compacte, headers 11 à 12 px.
- Stat values : 26 à 30 px.

## 6.5 Composants UI visibles

- `TemplatesPage`
- `TemplateStats`
- `TemplateFilters`
- `TemplateTable`
- `TemplateTypeBadge`
- `BooleanBadge`
- `TemplateDetailDrawer`
- `TemplateInfoCard`
- `DrawerActionBar`

## 6.6 Contenu et données affichées

Stats :

- 24 Total templates.
- 18 Actifs.
- 3 Désactivés.
- 3 Archivés.
- 4 Types de garde.

Colonnes :

- Nom du template
- Type véhicule
- Horaire
- Traverse minuit
- Nb personnes
- Rôle slot 1
- Rôles autorisés
- Dernière modif.
- Utilisé
- Actions

Exemples :

- Ambulance jour, AMJ-001, Ambulance, 07:00 - 19:00, Non, 2, AA, AA/ADE.
- Ambulance nuit, AMN-001, 19:00 - 07:00, Oui.
- VSL matin, VSLM-001.
- Taxi conventionné, TAXI-001.
- Garde SAMU, SAMU-001.
- Astreinte week-end, ASTRE-001.

## 6.7 Comportements frontend à prévoir

Déductible :

- création template ;
- recherche ;
- filtres type véhicule / traverse minuit ;
- filtres avancés ;
- export ;
- changement de vue ;
- sélection template ;
- modifier ;
- dupliquer ;
- archiver.

Non visible :

- formulaire de création complet : INFORMATION NON FOURNIE — À CONFIRMER.
- règles de compatibilité exactes : INFORMATION NON FOURNIE — À CONFIRMER.

## 6.8 Spécification codable

Découpage recommandé :

```txt
/templates/page.tsx
  TemplatesPage
    TemplatesStats
    TemplatesToolbar
    TemplatesTable
    TemplateDetailDrawer
      TemplateTabs
      TemplateGeneralInfo
      TemplateScheduleInfo
      TemplateTeamRequirements
      TemplateUsageInfo
```

Contraintes critiques :

- garder l’archivage comme action destructrice visuellement rouge ;
- préserver les badges colorés par type de template ;
- conserver la card `Équipe requise`, essentielle pour le métier.

## 6.9 Limites PNG

Les champs d’édition et l’historique ne sont pas visibles.

---

# 7. Société_V1.0

## 7.1 Identification de la page

- Nom probable : Société.
- Route probable : `/company`.
- Fonction principale : gérer l’identité société et les paramètres métier principaux.
- Objectif utilisateur principal : consulter/modifier le profil société et les règles métier ALPHA.

## 7.2 Structure générale

Zone principale :

- H1 `Société` ;
- sous-titre ;
- bouton haut droit `Enregistrer` ;
- trois colonnes de contenu : identité société, paramètres métier, résumé société ;
- boutons bas : Annuler, Enregistrer les modifications.

Card identité :

- titre `Identité société` ;
- badge `Profil société` ;
- champs : nom société, gérants, adresse, téléphone, SIRET.

Card paramètres :

- titre `Paramètres métier` + badge `ALPHA` ;
- champ repos minimum entre deux shifts ;
- segmented control `SIMPLE` / `AMBULANCE` ;
- tableau règles métier ALPHA : paramètre, valeur, mode.

Résumé société :

- état société active ;
- dépôts actifs ;
- utilisateurs actifs ;
- véhicules actifs ;
- dernière mise à jour.

## 7.3 Direction artistique

- Ambiance : administration stable, paramétrage sensible.
- Forte sobriété, pas de tableau dense.
- Les règles métier utilisent des badges de mode : BOTH violet, BLOCK rouge, ALERT orange, OFF gris.
- Formulaires à fond blanc, inputs grands, bordures discrètes.

## 7.4 Typographie

- H1 : 38 px environ.
- Titres card : 20 à 22 px.
- Labels champs : 14 px, bleu marine.
- Inputs : 16 px, texte bleu-gris.
- Tableau règles : 13 à 14 px.

## 7.5 Composants UI visibles

- `CompanyPage`
- `FormCard`
- `FormField`
- `SegmentedControl`
- `RulesTable`
- `ModeBadge`
- `CompanySummaryCard`
- `PrimaryButton`
- `SecondaryButton`

## 7.6 Contenu et données affichées

Champs visibles :

- Nom : SC Ambulances.
- Gérants : Sophie Caron, Marc Bernard.
- Adresse : 18 rue des Acacias, 69000 Lyon.
- Téléphone : 04 72 00 00 00.
- SIRET : 123 456 789 00012.

Paramètres :

- Repos minimum entre deux shifts : 11 h.
- Mode d’affichage planning : SIMPLE / AMBULANCE, AMBULANCE actif.
- Règles métier : Repos minimum planning, Conflit de chevauchement, Vérification véhicule requis, Alerte amplitude.
- Modes : BOTH, BLOCK, ALERT, OFF.

Résumé :

- Société active : SC Ambulances.
- Dépôts actifs : 3.
- Utilisateurs actifs : 27.
- Véhicules actifs : 36.
- Dernière mise à jour : 24 avr. 2026 10:24.

## 7.7 Comportements frontend à prévoir

Déductible :

- édition champs société ;
- changement mode affichage planning ;
- sauvegarde ;
- annulation ;
- affichage règles métier.

Non visible :

- édition directe des règles dans le tableau : INFORMATION NON FOURNIE — À CONFIRMER.
- gestion multi-gérants structurée ou simple texte : INFORMATION NON FOURNIE — À CONFIRMER.
- validation SIRET/téléphone : INFORMATION NON FOURNIE — À CONFIRMER.

## 7.8 Spécification codable

Découpage recommandé :

```txt
/company/page.tsx
  CompanyPage
    CompanyIdentityFormCard
    BusinessRulesCard
    CompanySummaryCard
    CompanyFooterActions
```

Contraintes critiques :

- préserver la structure 3 colonnes desktop ;
- ne pas transformer les règles métier en page séparée ;
- conserver la distinction forte entre identité et paramètres métier.

## 7.9 Limites PNG

Le PNG ne donne pas les états d’erreur de formulaire, ni les règles exactes de modification.

---

# 8. Dépôts-bases_V1.0

## 8.1 Identification de la page

- Nom probable : Dépôts / bases.
- Route probable : `/depots`.
- Fonction principale : gérer les bases de rattachement des équipes et véhicules.
- Objectif utilisateur principal : lister les dépôts, filtrer, sélectionner un dépôt, modifier ou archiver.

## 8.2 Structure générale

Zone principale :

- titre `Dépôts / bases` ;
- sous-titre ;
- bouton `Créer un dépôt` ;
- 4 stat cards : dépôts actifs, archivés, véhicules rattachés, utilisateurs rattachés ;
- barre de filtres : recherche, statut, tri, filtre ;
- tableau dépôts ;
- pagination.

Panneau droit :

- titre `Dépôt Nord` ;
- bouton fermeture ;
- badge actif ;
- cards : identité dépôt, adresse, rattachements, notes, zone danger ;
- footer actions : Modifier, Enregistrer.

## 8.3 Direction artistique

- Ambiance : gestion structurelle simple.
- Danger zone bien visible mais moins massive que users.
- Stat cards colorées : violet dépôts, orange archivés, turquoise véhicules, bleu utilisateurs.
- Table aérée, lignes hautes.

## 8.4 Typographie

- H1 : 34 à 38 px.
- Stats : valeur 26 à 30 px.
- Drawer titre : 22 à 24 px.
- Notes : texte plus petit sur fond bleu pâle.

## 8.5 Composants UI visibles

- `DepotsPage`
- `DepotsStats`
- `DepotsFilters`
- `DepotsTable`
- `DepotDetailDrawer`
- `AttachmentSummary`
- `InfoNoteBox`
- `DangerZone`

## 8.6 Contenu et données affichées

Stats :

- Dépôts actifs : 6 sur 8 dépôts.
- Archivés : 2 sur 8 dépôts.
- Véhicules rattachés : 58 au total.
- Utilisateurs rattachés : 72 au total.

Colonnes :

- Nom
- Adresse
- Statut
- Véhicules
- Utilisateurs
- Dernière modif.
- Actions

Lignes visibles :

- Dépôt Nord, 12 rue des Lilas, 59000 Lille, Actif.
- Dépôt Centre, 8 avenue Jean Jaurès, 21000 Dijon, Actif.
- Dépôt Sud, 15 impasse des Tilleuls, 34000 Montpellier, Actif.
- Siège, 1 boulevard Voltaire, 69003 Lyon.
- Dépôt Ouest, Nantes.
- Dépôt Est, Strasbourg.
- Dépôt Littoral, Marseille, Archivé.
- Ancien Dépôt Nord, Lille, Archivé.

Drawer :

- Dépôt Nord.
- Adresse : 12 rue des Lilas, 59000 Lille, France.
- Rattachements : 18 véhicules, 24 utilisateurs.
- Note : base principale couvrant le secteur nord, équipe jour et nuit opérationnelle 24/7.
- Danger : action irréversible, données conservées mais dépôt inaccessible.

## 8.7 Comportements frontend à prévoir

Déductible :

- créer dépôt ;
- recherche ;
- filtre statut ;
- tri ;
- sélection ligne ;
- modification ;
- sauvegarde ;
- archivage dépôt ;
- fermeture drawer.

Non visible :

- suppression physique : INFORMATION NON FOURNIE — À CONFIRMER.
- formulaire création complet : INFORMATION NON FOURNIE — À CONFIRMER.
- confirmation archivage : INFORMATION NON FOURNIE — À CONFIRMER.

## 8.8 Spécification codable

Découpage recommandé :

```txt
/depots/page.tsx
  DepotsPage
    DepotsStats
    DepotsToolbar
    DepotsTable
    DepotDetailDrawer
      DepotIdentityCard
      DepotAddressCard
      DepotAttachmentsCard
      DepotNotesCard
      DepotDangerZone
```

Contraintes critiques :

- garder la notion `base/dépôt` dans les textes ;
- ne pas rendre le drawer plein écran desktop ;
- conserver l’archivage comme action sensible.

## 8.9 Limites PNG

Le PNG ne donne pas les champs création/modification ni la gestion des dépôts archivés au-delà du statut.

---

# 9. Onboarding_V1.2

## 9.1 Identification de la page

- Nom probable : Onboarding société pilote.
- Route probable : `/onboarding`.
- Fonction principale : préparation des données avant exploitation réelle, avec import initial guidé.
- Objectif utilisateur principal : vérifier l’avancement de la configuration et importer des données de départ.

## 9.2 Structure générale

Layout en trois colonnes principales :

- gauche : progression onboarding ;
- centre : import initial ;
- droite : aide import.

Zone gauche :

- carte `Progression de l’onboarding` ;
- barre de progression 56 % ;
- timeline verticale ;
- cards étapes : profil société, bases/dépôts, utilisateurs, véhicules, templates.

Zone centre :

- titre `Import initial` ;
- stepper horizontal 1 à 5 : type d’import, fichier, aperçu, erreurs, validation ;
- tabs type d’import : Utilisateurs, Véhicules, Templates, Dépôts, Absences utilisateurs ;
- dropzone fichier ;
- fichier sélectionné `utilisateurs_import.xlsx` ;
- boutons analyser fichier, télécharger modèle ;
- aperçu import ;
- bloc erreurs détectées ;
- bloc prêt à importer ;
- actions annuler / valider import.

Zone droite :

- `Aide import` ;
- anneau de progression 40 % ;
- étape sélectionnée Utilisateurs ;
- conseils de préparation ;
- formats attendus ;
- ordre recommandé ;
- boutons voir le guide, continuer.

## 9.3 Direction artistique

- Ambiance : assistant guidé, onboarding opérationnel.
- Beaucoup de structure mais forte lisibilité.
- Progression : bleu pour actif, vert terminé, orange en cours/à compléter.
- Erreurs : bloc rouge pâle.
- Prêt à importer : bloc vert pâle.
- Dropzone : bordure pointillée bleutée.

## 9.4 Typographie

- H1 : 28 à 32 px.
- Stepper : petit texte 12 à 13 px.
- Cards étapes : titres 15 à 16 px, chiffres 16 à 18 px.
- Tableau aperçu : 11 à 12 px.
- Aide : titres 16 à 18 px.

## 9.5 Composants UI visibles

- `OnboardingPage`
- `OnboardingProgressCard`
- `ProgressTimeline`
- `ImportStepper`
- `ImportTypeTabs`
- `UploadDropzone`
- `UploadedFileCard`
- `ImportPreviewTable`
- `ImportErrorsCard`
- `ImportReadyCard`
- `ImportHelpPanel`
- `CircularProgress`
- `RecommendedOrderList`

## 9.6 Contenu et données affichées

Progression :

- 56 %.
- 7 étapes sur 12 complétées.
- Profil société : Terminé, 1/1.
- Bases / dépôts : En cours, 2/4.
- Utilisateurs : Terminé, 18.
- Véhicules : Terminé, 7.
- Templates : À compléter, 12.

Import :

- fichier `utilisateurs_import.xlsx`, 12,4 Ko, 34 lignes détectées.
- formats acceptés : CSV, XLSX, max. 10 Mo.
- aperçu import avec colonnes Nom, Prénom, Email, Rôle, Base/Dépôt, Statut.
- erreurs : Ligne 3 email manquant, Ligne 5 dépôt inconnu, Ligne 8 format de date invalide.
- prêt à importer : 12 lignes valides sur 15, 3 erreurs à corriger.

Aide :

- 2 étapes terminées sur 5.
- conseils : bases/dépôts créés et actifs, email unique, rôles correspondants au référentiel, dépôts existants et actifs.
- formats attendus : Nom, Email, Rôle, Base/Dépôt, Date de naissance.
- ordre recommandé : Société, Dépôts, Utilisateurs, Véhicules, Templates.

## 9.7 Comportements frontend à prévoir

Déductible :

- choix étape onboarding ;
- choix type d’import ;
- drag & drop fichier ;
- suppression fichier ;
- analyse fichier ;
- téléchargement modèle ;
- affichage aperçu ;
- affichage erreurs ;
- validation import ;
- bouton continuer ;
- guide import.

Non visible :

- édition inline de l’aperçu : INFORMATION NON FOURNIE — À CONFIRMER.
- mapping de colonnes : INFORMATION NON FOURNIE — À CONFIRMER.
- import partiel malgré erreurs : INFORMATION NON FOURNIE — À CONFIRMER.

## 9.8 Spécification codable

Découpage recommandé :

```txt
/onboarding/page.tsx
  OnboardingPage
    OnboardingProgressPanel
    ImportInitialPanel
      ImportStepper
      ImportTypeSelector
      FileDropzone
      ImportPreview
      ImportValidationSummary
    ImportHelpPanel
```

Contraintes critiques :

- garder la logique en 3 colonnes desktop ;
- ne pas mélanger progression onboarding et import ;
- conserver les couleurs statut terminé/en cours/erreur ;
- maintenir la zone aide visible à droite.

## 9.9 Limites PNG

Le PNG ne donne pas les détails des étapes 2 à 5 du stepper, ni l’écran après validation import.

---

# 10. Audit_V1.0

## 10.1 Identification de la page

- Nom probable : Journal d’audit.
- Route probable : `/audit`.
- Fonction principale : consulter les actions sensibles et événements tracés.
- Objectif utilisateur principal : filtrer les événements d’audit, ouvrir un événement et consulter son détail / payload.

## 10.2 Structure générale

Zone principale :

- H1 `Journal d’audit` ;
- sous-titre ;
- 5 stat cards : actions aujourd’hui, connexions, modifications sensibles, actions support, alertes à vérifier ;
- filtres en grille : période, société, type d’entité, ID entité, action, source, acteur ;
- boutons réinitialiser, exporter ;
- table audit ;
- pagination.

Panneau droit :

- titre de l’événement sélectionné ;
- ID audit ;
- badge succès ;
- bouton copier ID ;
- tabs Détails / Contexte ;
- résumé action ;
- traçabilité ;
- payload JSON avec bouton copier JSON.

## 10.3 Direction artistique

- Ambiance : traçabilité, sécurité, conformité.
- Plus technique que les autres pages, mais toujours lisible métier.
- Source/action/type représentés en badges colorés.
- Payload dans bloc monospaced gris clair.

## 10.4 Typographie

- H1 : 34 à 38 px.
- Stat values : 24 à 30 px.
- Table audit : très compacte, 11 à 13 px.
- Payload : monospace 11 à 12 px.
- Drawer titre : 20 à 22 px.

## 10.5 Composants UI visibles

- `AuditPage`
- `AuditStats`
- `AuditFilters`
- `AuditTable`
- `AuditBadge`
- `AuditDetailDrawer`
- `PayloadViewer`
- `CopyButton`
- `ExportButton`

## 10.6 Contenu et données affichées

Stats :

- 148 Actions aujourd’hui.
- 32 Connexions.
- 14 Modifications sensibles.
- 5 Actions support.
- 3 Alertes à vérifier.

Filtres :

- Période : 20 avr. — 24 avr. 2026.
- Société : SC Ambulances.
- Type d’entité : Tous.
- ID entité : Ex : USR-038.
- Action : Tous.
- Source : Toutes.
- Acteur : Tous.

Colonnes table :

- Date
- Résumé
- Source
- Action
- Type entité
- ID entité
- Acteur
- Détail

Événements visibles :

- Connexion réussie de Nathan A.
- Modification utilisateur Marie Bernard.
- Archivage véhicule AA-123-AA.
- Création absence utilisateur.
- Publication brouillon autoschedule.
- Modification shift planning.
- Action support consultée.

Drawer :

- Connexion réussie de Nathan A.
- AUD-20260424-0912.
- Date : 24 avr. 2026 • 09:12:34.
- Source : Auth.
- Action : Connexion.
- Acteur : Nathan A. Administrateur.
- Entité concernée : Sécurité.
- ID entité : LOGIN-204.
- Société : SC Ambulances.
- Adresse IP : 192.168.1.45 France.
- Navigateur : Chrome 124... Windows 11.
- Payload JSON visible.

## 10.7 Comportements frontend à prévoir

Déductible :

- filtre multi-critères ;
- reset filtres ;
- export ;
- sélection événement ;
- affichage détail drawer ;
- copie ID ;
- copie JSON ;
- pagination ;
- onglet contexte.

Non visible :

- export format CSV/XLSX/PDF : INFORMATION NON FOURNIE — À CONFIRMER.
- masquage/anonymisation payload selon rôle : INFORMATION NON FOURNIE — À CONFIRMER.
- recherche plein texte : INFORMATION NON FOURNIE — À CONFIRMER.

## 10.8 Spécification codable

Découpage recommandé :

```txt
/audit/page.tsx
  AuditPage
    AuditStats
    AuditFilters
    AuditTable
    AuditDetailDrawer
      AuditSummaryCard
      AuditTraceabilityCard
      AuditPayloadCard
```

Contraintes critiques :

- garder le drawer technique à droite ;
- préserver le payload JSON lisible ;
- ne pas transformer en simple log texte ;
- conserver les badges source/action/type entité.

## 10.9 Limites PNG

Le PNG ne donne pas la structure exacte du JSON réel ni les permissions d’accès au journal.

---

# 11. Privacy_V1.0

## 11.1 Identification de la page

- Nom probable : Mentions d’information.
- Route probable : `/privacy` ou `/mentions-information`.
- Fonction principale : informer sur la collecte, l’utilisation et la protection des données personnelles.
- Objectif utilisateur principal : consulter les informations RGPD / confidentialité.

## 11.2 Structure générale

Layout applicatif connecté avec sidebar et topbar.

Contenu :

- breadcrumb `Accueil > Mention d’information` ;
- titre `Mentions d’information` ;
- texte introductif ;
- badge/date `Dernière mise à jour : 18 avr. 2024` ;
- colonne gauche : sommaire vertical numéroté ;
- colonne droite : cards de contenu légal ;
- footer en bas.

Sommaire :

1. Éditeur du site
2. Hébergement
3. Données collectées
4. Finalités de traitement
5. Base légale
6. Destinataires des données
7. Durée de conservation
8. Vos droits
9. Sécurité des données
10. Cookies
11. Modifications
12. Contact

Cards visibles :

- Éditeur du site ;
- Hébergement ;
- Données collectées ;
- Finalités de traitement.

## 11.3 Direction artistique

- Ambiance : légal clair, rassurant, institutionnel.
- Beaucoup d’espace blanc.
- Icônes grandes dans carrés bleu très pâle.
- Sommaire actif avec fond bleu très pâle + bord gauche bleu.
- Footer discret.

## 11.4 Typographie

- H1 : 34 à 38 px.
- Intro : 14 à 15 px.
- Titres sections : 18 à 20 px, gras.
- Corps : 13 à 14 px, lisible.
- Sommaire : 13 à 14 px.

## 11.5 Composants UI visibles

- `PrivacyPage`
- `Breadcrumb`
- `LegalSidebarNav`
- `LegalSectionCard`
- `LegalIconBlock`
- `UpdateDateBadge`
- `AppFooter`

## 11.6 Contenu et données affichées

Textes visibles :

- `Mentions d’information`
- `Cette page vous informe sur la collecte, l’utilisation et la protection de vos données personnelles conformément à la réglementation en vigueur.`
- `Dernière mise à jour : 18 avr. 2024`
- Éditeur : SC Ambulances, société de transport sanitaire, SIREN 123 456 789, email contact@sc-ambulances.fr.
- Hébergeur : OVHcloud, 2 rue Kellermann, 59100 Roubaix, France, site www.ovhcloud.com.
- Données collectées : informations d’identification, données liées à l’utilisation de l’application, données relatives à la société et aux activités.
- Finalités : fournir et maintenir les services, gérer comptes et accès, assurer sécurité et fiabilité, respecter obligations légales/réglementaires.

## 11.7 Comportements frontend à prévoir

Déductible :

- clic sommaire vers sections ;
- lien breadcrumb accueil ;
- lien footer mentions ;
- scroll vertical.

Non visible :

- ancrage smooth scroll : INFORMATION NON FOURNIE — À CONFIRMER.
- contenu des sections 5 à 12 : partiellement non visible, INFORMATION NON FOURNIE — À CONFIRMER.
- téléchargement PDF légal : INFORMATION NON FOURNIE — À CONFIRMER.

## 11.8 Spécification codable

Découpage recommandé :

```txt
/privacy/page.tsx
  PrivacyPage
    PageBreadcrumb
    LegalPageHeader
    LegalLayout
      LegalSidebarNav
      LegalContent
        LegalSectionCard[]
    AppFooter
```

Contraintes critiques :

- conserver un rendu lisible et très sobre ;
- ne pas utiliser de tableau dense ;
- garder le sommaire latéral ;
- garder les cards de sections et les icônes bleues.

## 11.9 Limites PNG

Le PNG ne montre que les premières sections. Le texte complet doit venir d’un document RGPD validé ou d’un contenu juridique validé.

---

# 12. Règles UI communes codables

## 12.1 AppShell

Structure attendue :

```txt
<AppShell>
  <Sidebar />
  <div class="app-main">
    <Topbar />
    <main class="page-content">...</main>
  </div>
</AppShell>
```

Règles :

- sidebar fixe à gauche sur desktop ;
- topbar fixe ou sticky visuellement en haut ;
- contenu avec padding régulier ;
- logo toujours en haut de sidebar ;
- thème + utilisateur en bas de sidebar ;
- topbar société + thème + profil + déconnexion ;
- item actif fond bleu clair.

## 12.2 DataTable

Règles :

- header très clair ;
- colonnes compactes ;
- checkbox première colonne si sélection possible ;
- ligne active avec fond bleu très pâle + bordure gauche ou contour bleu ;
- actions à droite : crayon, menu trois points, bouton voir selon page ;
- pagination toujours en bas ;
- `10 / page` ou équivalent visible sur plusieurs pages.

## 12.3 DetailDrawer

Règles :

- panneau droit blanc ;
- largeur desktop 360 à 430 px ;
- bordure gauche fine ;
- titre en haut + bouton fermer ;
- badges statut proches du titre ;
- tabs internes si plusieurs sections ;
- cards empilées ;
- actions principales en bas ;
- danger zone rouge uniquement pour actions sensibles.

## 12.4 Badges

Règles visuelles :

- badge actif/disponible : vert pâle + point vert ;
- badge en congé / maintenance / alerte : orange pâle ;
- badge inactif/hors service/expiré : rouge pâle ;
- badge admin/ambulance/source auth : bleu pâle ;
- badge VSL / véhicule : cyan/vert pâle ;
- badge taxi / archive / template : orange ;
- badge garde / BOTH : violet.

## 12.5 Boutons

Variantes à créer :

- `primary` : bleu plein, texte blanc ;
- `secondary` : blanc, bordure grise, texte bleu marine ;
- `danger` : rouge plein ou outline rouge selon criticité ;
- `ghost/icon` : bouton icône discret ;
- `export` : blanc borduré avec icône colorée.

## 12.6 Responsive probable

Desktop :

- comportement visible dans les maquettes : sidebar + topbar + contenu large.

Tablette :

- probable : sidebar réduite ou conservée selon largeur ;
- drawers peuvent devenir overlay ;
- grids de stat cards passent de 4/5 colonnes à 2 colonnes.

Mobile :

- INFORMATION NON FOURNIE — À CONFIRMER.
- Déduction raisonnable : sidebar devient menu hamburger, drawers plein écran, tables remplacées ou scroll horizontal.

---

# 13. Points critiques pour intégration fidèle

1. Ne pas remplacer la DA par une UI générique Tailwind/shadcn brute.
2. Reproduire le shell applicatif avant de corriger page par page.
3. Créer les composants communs avant d’intégrer les écrans.
4. Respecter les panneaux droits sur users, vehicles, templates, depots, planning, audit.
5. Respecter les badges colorés métier.
6. Respecter la densité : compacte dans les tableaux, aérée dans les cards.
7. Ne pas supprimer les stat cards, elles structurent chaque module.
8. Conserver le bleu primaire pour l’action principale uniquement.
9. Conserver le fond global très clair et les cards blanches.
10. Ne pas inventer de comportements non visibles sans validation.

---

# 14. Informations manquantes à confirmer avant codage

- Police exacte utilisée.
- Design tokens officiels.
- Dimensions CSS exactes : sidebar, topbar, drawer, cards.
- Breakpoints responsive officiels.
- États hover/focus/disabled/loading.
- Contenu complet des menus dropdown.
- Contenu des onglets non visibles dans les drawers.
- Formulaires création/édition complets.
- Règles de permission par module.
- Comportement exact du thème sombre.
- Assets sources : logo SVG, icônes, photo login, photo véhicule.
- Textes légaux complets de la page mentions.
- Comportements exacts d’import : mapping colonnes, import partiel, gestion erreurs.

---

# 15. Verdict sur le format PNG

Le PNG est suffisant pour :

- analyser la direction artistique ;
- reconstruire la hiérarchie visuelle ;
- décrire les composants visibles ;
- préparer une intégration frontend fidèle en desktop ;
- identifier les pages et routes probables ;
- définir les composants communs.

Le PNG n’est pas suffisant pour :

- extraire des dimensions exactes au pixel ;
- garantir les codes couleur exacts ;
- connaître la police exacte ;
- connaître les animations ;
- connaître les états hover/focus/disabled/loading ;
- connaître les breakpoints responsive ;
- récupérer les assets vectoriels ;
- connaître les règles métier non visibles.

Formats recommandés pour fiabiliser la suite :

1. Figma source avec calques nommés.
2. Export SVG du logo et des icônes spécifiques.
3. Design tokens JSON/CSS : couleurs, rayons, spacing, shadow, font sizes.
4. Export PNG haute résolution 2x ou 3x si Figma indisponible.
5. CSS existant si une partie de la DA est déjà codée.
6. Liste validée des routes et modules.
7. Spécification fonctionnelle des états interactifs.

---

# 16. Structure React recommandée globale

```txt
app/
  ui/
    shell/
      AppShell.tsx
      Sidebar.tsx
      Topbar.tsx
      CompanySwitcher.tsx
      UserMenu.tsx
      ThemeToggle.tsx
    layout/
      PageHeader.tsx
      PageSection.tsx
      DetailDrawer.tsx
      DrawerSectionCard.tsx
    controls/
      Button.tsx
      IconButton.tsx
      SearchInput.tsx
      SelectFilter.tsx
      SegmentedControl.tsx
      Tabs.tsx
      Checkbox.tsx
    data/
      DataTable.tsx
      Pagination.tsx
      StatCard.tsx
      StatusBadge.tsx
      TypeBadge.tsx
    feedback/
      ErrorMessage.tsx
      EmptyState.tsx
      DangerZone.tsx
      InfoBox.tsx
    onboarding/
      UploadDropzone.tsx
      ProgressStepper.tsx
      ProgressTimeline.tsx
    legal/
      LegalSidebarNav.tsx
      LegalSectionCard.tsx
```

Règle d’intégration : commencer par `AppShell`, `Topbar`, `Sidebar`, `PageHeader`, `StatCard`, `DataTable`, `DetailDrawer`, `StatusBadge`, puis intégrer les pages une par une.

---

# 17. Ordre de codage conseillé pour réalignement UI

1. Shell commun : Sidebar + Topbar + layout page.
2. Tokens CSS : couleurs, spacing, border radius, shadow, typo.
3. Composants transverses : boutons, badges, cards, tables, filters, drawer.
4. Dashboard : page la plus structurante et simple.
5. Pages de gestion similaires : users, vehicles, templates, depots.
6. Company : formulaire et résumé.
7. Audit : filtres + table + payload.
8. Onboarding : layout spécifique 3 colonnes.
9. Planning : matrice complexe à traiter séparément.
10. Login : page autonome hors AppShell.
11. Privacy : page légale avec AppShell mais contenu spécifique.

---

# 18. Points à ne surtout pas modifier

- Ne pas changer le logo, ni la position du badge ALPHA.
- Ne pas supprimer le thème visuel bleu/cyan/blanc.
- Ne pas foncer le fond global des pages applicatives.
- Ne pas supprimer la sidebar claire.
- Ne pas remplacer les panels droits par des pages séparées.
- Ne pas réduire les stat cards à de simples chiffres texte.
- Ne pas uniformiser tous les badges en une seule couleur.
- Ne pas rendre le planning sous forme de calendrier générique.
- Ne pas rendre le dashboard analytique lourd.
- Ne pas masquer les actions métier principales dans des menus non visibles.

---

# 19. Complément V1.1 — Analyse et extraction des icônes

Version complémentaire : V1.1  
Objet : compléter la V1 sans réécrire l’analyse initiale, avec une lecture dédiée aux icônes et aux crops PNG exportés.

> Règle appliquée : les icônes sont décrites uniquement lorsqu’elles sont visibles ou raisonnablement déductibles depuis les maquettes PNG. Si une information n’est pas certaine, utiliser exactement : **INFORMATION NON FOURNIE — À CONFIRMER**.

## 19.1 Système d’icônes global

### Style général observé

Le système d’icônes des maquettes repose sur une famille visuelle cohérente : icônes simples, fonctionnelles, majoritairement linéaires, avec quelques variantes semi-pleines lorsqu’elles sont placées dans des pastilles ou carrés colorés. Le rendu global est proche d’une bibliothèque moderne type Lucide React, Heroicons ou équivalent, mais avec plusieurs pictogrammes métier spécifiques liés au transport sanitaire.

À respecter :

- icônes principalement linéaires ;
- contours fins à moyens, environ 1.75 px à 2.25 px en équivalent CSS/SVG ;
- pas d’icônes réalistes, 3D ou illustratives ;
- formes arrondies, angles doux, lisibilité rapide ;
- usage fréquent d’un fond carré arrondi ou d’une pastille colorée pour les KPI et modules ;
- icônes de navigation plus discrètes, sans pastille forte sauf état actif ;
- icônes d’alerte et de danger colorées, mais toujours sobres.

### Niveau de finesse / épaisseur

- Sidebar : trait fin/moyen, environ 20 à 24 px, stroke conseillé `2`.
- Topbar : trait fin/moyen, environ 16 à 22 px, stroke conseillé `1.75` à `2`.
- KPI cards : icône plus grande, souvent blanche ou colorée dans un carré arrondi, environ 28 à 44 px visuels selon la taille du conteneur.
- Module cards : icône moyenne, environ 28 à 32 px, dans un carré pastel de 44 à 52 px.
- Boutons : icône petite, environ 16 à 18 px, alignée au texte.
- Badges : icône absente ou très petite ; lorsqu’elle existe, elle doit rester autour de 12 à 14 px.
- Tableaux : icônes d’action très petites, environ 14 à 18 px ; ne pas les grossir excessivement.
- Drawers / panneaux droits : icônes de section autour de 18 à 24 px, souvent dans une pastille ou alignées avec un titre de section.

### Linéaire, plein ou mixte

Le système est **majoritairement linéaire**. Les variantes dites “pleines” observées sont surtout dues au traitement graphique : icône blanche dans un carré coloré, ou pictogramme rempli dans un badge/pastille. Pour le code, il faut privilégier une base linéaire en SVG, puis gérer les variantes par CSS :

```txt
Icon seul : Lucide React stroke 2
Icon dans KPI : Lucide React stroke 2 ou 2.25 + wrapper coloré
Icon bouton primaire : Lucide React 16/18 px, color white
Icon alerte : Lucide React 16/20 px, color semantic warning/danger
```

### Couleurs générales

Couleurs d’icônes observées ou à conserver :

```txt
Icône sidebar inactive : gris bleuté / #7B89A6 environ
Icône sidebar active : bleu primaire / #1476F2 environ
Icône topbar : bleu marine ou gris bleuté / #34456B environ
Icône bouton primaire : blanc / #FFFFFF
Icône KPI bleu : blanc sur fond #1677FF environ
Icône KPI turquoise : blanc sur fond #10BFD1 ou #12B8B5 environ
Icône KPI vert : blanc sur fond #22C55E environ
Icône KPI orange : blanc sur fond #F97316 environ
Icône KPI violet : blanc sur fond #7C3AED environ
Icône alerte : rouge/orange/jaune selon gravité
Icône module card : couleur primaire sur fond pastel associé
```

### Usage dans la sidebar

La sidebar utilise des icônes à gauche de chaque entrée de navigation. Le comportement visuel attendu :

- icône alignée verticalement au libellé ;
- taille stable autour de 22 à 24 px ;
- couleur gris bleuté pour les entrées inactives ;
- couleur bleu primaire pour l’entrée active ;
- état actif matérialisé par une zone de fond bleu très clair et/ou une accentuation du texte ;
- ne pas remplacer les icônes métier par des symboles génériques trop éloignés.

### Usage dans la topbar

La topbar contient des icônes fonctionnelles : société courante, thème, utilisateur/déconnexion selon les pages. Elles doivent rester discrètes :

- taille autour de 16 à 22 px ;
- couleur gris bleuté ou bleu marine ;
- alignement au centre de la hauteur de topbar ;
- pas de pastille colorée forte, sauf avatar/utilisateur si visible ;
- l’icône thème doit rester lisible mais secondaire.

### Usage dans les cards KPI

Les KPI utilisent des icônes fortes, souvent en blanc dans un carré arrondi coloré. Règles à conserver :

- carré/pastille de fond entre 40 et 58 px ;
- arrondi large, environ 12 à 16 px ;
- icône centrée ;
- couleur de fond liée au sens métier : bleu = général/actif, vert = conforme/actif, orange = attention/maintenance, rouge = hors service/danger, violet = dépôt/archive/support, turquoise = flotte/utilisateurs selon page ;
- ne pas réduire ces icônes à de simples pictogrammes gris.

### Usage dans les boutons

Les boutons principaux utilisent des icônes blanches, petites, placées avant le libellé. Les boutons secondaires utilisent des icônes gris bleuté ou sémantiques.

- bouton primaire : icône 16 à 18 px, blanche ;
- bouton secondaire : icône 16 à 18 px, gris bleuté ;
- bouton danger : icône rouge ou blanche sur fond rouge selon variante ;
- espacement icône/texte : environ 8 px ;
- ne pas utiliser de grandes icônes dans les boutons.

### Usage dans les badges

Les badges sont surtout textuels. Les rares pictogrammes doivent rester discrets :

- taille 12 à 14 px ;
- couleur héritée du badge ;
- iconographie optionnelle, à ne pas généraliser si elle n’est pas visible ;
- information précise des badges non visible : **INFORMATION NON FOURNIE — À CONFIRMER**.

### Usage dans les tableaux

Les tableaux utilisent de petites icônes d’action : édition, menu, copie, export, etc.

- taille 14 à 18 px ;
- stroke fin/moyen ;
- couleur gris bleuté ;
- action destructive en rouge ;
- ne pas surcharger les cellules avec des icônes trop grandes ;
- certains pictogrammes étant très petits dans le PNG, leur forme exacte peut nécessiter validation : **INFORMATION NON FOURNIE — À CONFIRMER**.

### Usage dans les drawers / panneaux latéraux

Les drawers utilisent des icônes pour structurer les sections et les zones d’action :

- icône de section autour de 18 à 24 px ;
- souvent placée dans une pastille douce ou alignée à gauche du titre de section ;
- danger zone avec icône rouge ;
- zones informatives avec icône bleue ;
- ne pas transformer les sections en grands blocs illustrés.

## 19.2 Analyse page par page des icônes

### 19.2.1 Login

- `icon_login_brand_ambulance.png`
  - Emplacement : Logo marque panneau gauche.
  - Rôle : Logo ambulance.
  - Style attendu : Ambulance stylisée blanche/cyan avec croix et flèche rouge ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~90x80 px.
  - Couleur : Blanc + cyan + rouge.
  - Nom fonctionnel clair : `icon_login_brand_ambulance`.
  - Équivalent recommandé pour le code : `Ambulance ou asset logo dédié`.
  - Commentaire : À conserver comme asset marque, pas comme icône générique.
- `icon_login_feature_calendar.png`
  - Emplacement : Bénéfice planning intelligent.
  - Rôle : Planning intelligent.
  - Style attendu : Calendrier linéaire cyan ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~28 px.
  - Couleur : Cyan.
  - Nom fonctionnel clair : `icon_login_feature_calendar`.
  - Équivalent recommandé pour le code : `CalendarDays`.
  - Commentaire : Crop sur fond photo sombre.
- `icon_login_feature_vehicle.png`
  - Emplacement : Bénéfice flotte optimisée.
  - Rôle : Flotte optimisée.
  - Style attendu : Ambulance/véhicule linéaire cyan ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~28 px.
  - Couleur : Cyan.
  - Nom fonctionnel clair : `icon_login_feature_vehicle`.
  - Équivalent recommandé pour le code : `Ambulance`.
  - Commentaire : Crop sur fond photo sombre.
- `icon_login_feature_users.png`
  - Emplacement : Bénéfice équipes connectées.
  - Rôle : Équipes connectées.
  - Style attendu : Groupe utilisateurs linéaire cyan ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~30 px.
  - Couleur : Cyan.
  - Nom fonctionnel clair : `icon_login_feature_users`.
  - Équivalent recommandé pour le code : `UsersRound`.
  - Commentaire : Crop sur fond photo sombre.
- `icon_login_feature_shield.png`
  - Emplacement : Bénéfice conformité & sécurité.
  - Rôle : Conformité sécurité.
  - Style attendu : Bouclier/check linéaire cyan ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~31 px.
  - Couleur : Cyan.
  - Nom fonctionnel clair : `icon_login_feature_shield`.
  - Équivalent recommandé pour le code : `ShieldCheck`.
  - Commentaire : Crop sur fond photo sombre.
- `icon_login_trust_lock.png`
  - Emplacement : Carte réassurance accès réservé.
  - Rôle : Accès réservé.
  - Style attendu : Cadenas médical dans pastille cyan ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~42 px.
  - Couleur : Cyan sur pastille.
  - Nom fonctionnel clair : `icon_login_trust_lock`.
  - Équivalent recommandé pour le code : `LockKeyhole`.
  - Commentaire : Icone avec pastille dans carte translucide.
- `icon_login_card_ambulance.png`
  - Emplacement : Logo au-dessus de la carte connexion.
  - Rôle : Login ambulance.
  - Style attendu : Ambulance cyan dans cercle blanc ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~80 px.
  - Couleur : Cyan + rouge.
  - Nom fonctionnel clair : `icon_login_card_ambulance`.
  - Équivalent recommandé pour le code : `Ambulance`.
  - Commentaire : Asset marque secondaire.
- `icon_login_input_email.png`
  - Emplacement : Champ adresse email.
  - Rôle : Email.
  - Style attendu : Enveloppe linéaire grise ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_login_input_email`.
  - Équivalent recommandé pour le code : `Mail`.
- `icon_login_input_lock.png`
  - Emplacement : Champ mot de passe.
  - Rôle : Mot de passe.
  - Style attendu : Cadenas linéaire gris ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_login_input_lock`.
  - Équivalent recommandé pour le code : `Lock`.
- `icon_login_input_eye.png`
  - Emplacement : Afficher/masquer mot de passe.
  - Rôle : Afficher mot de passe.
  - Style attendu : Œil linéaire gris ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_login_input_eye`.
  - Équivalent recommandé pour le code : `Eye`.
- `icon_login_checkbox_checked.png`
  - Emplacement : Checkbox souvenir.
  - Rôle : Checkbox cochée.
  - Style attendu : Case cochée bleue ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Bleu primaire.
  - Nom fonctionnel clair : `icon_login_checkbox_checked`.
  - Équivalent recommandé pour le code : `CheckSquare`.
- `icon_login_button_lock.png`
  - Emplacement : Bouton connexion.
  - Rôle : Connexion sécurisée.
  - Style attendu : Cadenas blanc ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Blanc.
  - Nom fonctionnel clair : `icon_login_button_lock`.
  - Équivalent recommandé pour le code : `Lock`.
- `icon_login_alert_warning.png`
  - Emplacement : Alerte identifiants invalides.
  - Rôle : Erreur authentification.
  - Style attendu : Triangle alerte rouge ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~22 px.
  - Couleur : Rouge.
  - Nom fonctionnel clair : `icon_login_alert_warning`.
  - Équivalent recommandé pour le code : `TriangleAlert`.
- `icon_login_footer_france_flag.png`
  - Emplacement : Badge hébergement France.
  - Rôle : Hébergement France.
  - Style attendu : Drapeau France mini ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Bleu blanc rouge.
  - Nom fonctionnel clair : `icon_login_footer_france_flag`.
  - Équivalent recommandé pour le code : `Flag`.
  - Commentaire : Crop fidèle mais très petit.
- `icon_login_footer_shield.png`
  - Emplacement : Badge conformité RGPD.
  - Rôle : Conforme RGPD.
  - Style attendu : Bouclier check bleu ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Bleu.
  - Nom fonctionnel clair : `icon_login_footer_shield`.
  - Équivalent recommandé pour le code : `ShieldCheck`.

### 19.2.2 Shell commun / Dashboard

- `icon_sidebar_logo_ambulance.png`
  - Emplacement : Logo application dans sidebar.
  - Rôle : Logo sidebar.
  - Style attendu : Ambulance cyan avec croix ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~56 px.
  - Couleur : Cyan + rouge.
  - Nom fonctionnel clair : `icon_sidebar_logo_ambulance`.
  - Équivalent recommandé pour le code : `Ambulance ou asset logo dédié`.
  - Commentaire : À conserver comme asset.
- `icon_sidebar_dashboard.png`
  - Emplacement : Navigation sidebar Tableau de bord.
  - Rôle : Tableau de bord.
  - Style attendu : Icône dashboard/blocs ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~22 px.
  - Couleur : Bleu actif / gris inactif.
  - Nom fonctionnel clair : `icon_sidebar_dashboard`.
  - Équivalent recommandé pour le code : `LayoutDashboard`.
  - Commentaire : État actif visible sur Dashboard.
- `icon_sidebar_planning.png`
  - Emplacement : Navigation sidebar Planning.
  - Rôle : Planning.
  - Style attendu : Calendrier linéaire ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~22 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_sidebar_planning`.
  - Équivalent recommandé pour le code : `CalendarDays`.
- `icon_sidebar_users.png`
  - Emplacement : Navigation sidebar Utilisateurs/RH.
  - Rôle : Utilisateurs RH.
  - Style attendu : Groupe utilisateurs ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~22 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_sidebar_users`.
  - Équivalent recommandé pour le code : `UsersRound`.
- `icon_sidebar_vehicles.png`
  - Emplacement : Navigation sidebar Véhicules.
  - Rôle : Véhicules.
  - Style attendu : Ambulance avec croix ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~24 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_sidebar_vehicles`.
  - Équivalent recommandé pour le code : `Ambulance`.
- `icon_sidebar_templates.png`
  - Emplacement : Navigation sidebar Templates.
  - Rôle : Templates.
  - Style attendu : Document/list ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~22 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_sidebar_templates`.
  - Équivalent recommandé pour le code : `FileText`.
- `icon_sidebar_company.png`
  - Emplacement : Navigation sidebar Société.
  - Rôle : Société.
  - Style attendu : Bâtiment société ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~24 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_sidebar_company`.
  - Équivalent recommandé pour le code : `Building2`.
- `icon_sidebar_depots.png`
  - Emplacement : Navigation sidebar Dépôts.
  - Rôle : Dépôts.
  - Style attendu : Bâtiment dépôt / colonnes ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~24 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_sidebar_depots`.
  - Équivalent recommandé pour le code : `Landmark`.
- `icon_sidebar_onboarding.png`
  - Emplacement : Navigation sidebar Onboarding.
  - Rôle : Onboarding.
  - Style attendu : Chapeau / parcours ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~24 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_sidebar_onboarding`.
  - Équivalent recommandé pour le code : `GraduationCap`.
- `icon_sidebar_audit.png`
  - Emplacement : Navigation sidebar Audit.
  - Rôle : Audit.
  - Style attendu : Bouclier check ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~24 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_sidebar_audit`.
  - Équivalent recommandé pour le code : `ShieldCheck`.
- `icon_topbar_company.png`
  - Emplacement : Sélecteur société topbar.
  - Rôle : Société courante.
  - Style attendu : Bâtiment dans petit carré ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Bleu marine/gris.
  - Nom fonctionnel clair : `icon_topbar_company`.
  - Équivalent recommandé pour le code : `Building2`.
- `icon_topbar_theme_sun.png`
  - Emplacement : Toggle thème topbar.
  - Rôle : Thème clair.
  - Style attendu : Soleil linéaire ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~24 px.
  - Couleur : Bleu marine/gris.
  - Nom fonctionnel clair : `icon_topbar_theme_sun`.
  - Équivalent recommandé pour le code : `Sun`.
- `icon_topbar_logout.png`
  - Emplacement : Déconnexion topbar.
  - Rôle : Déconnexion.
  - Style attendu : Icône sortie ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Bleu marine/gris.
  - Nom fonctionnel clair : `icon_topbar_logout`.
  - Équivalent recommandé pour le code : `LogOut`.

### 19.2.3 Dashboard

- `icon_dashboard_user_avatar.png`
  - Emplacement : Carte utilisateur connecté.
  - Rôle : Utilisateur connecté.
  - Style attendu : Avatar utilisateur circulaire ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~74 px.
  - Couleur : Gris bleuté + vert.
  - Nom fonctionnel clair : `icon_dashboard_user_avatar`.
  - Équivalent recommandé pour le code : `UserCircle`.
  - Commentaire : Avatar générique, non spécifique à une personne.
- `icon_dashboard_mail.png`
  - Emplacement : Email utilisateur connecté.
  - Rôle : Email utilisateur.
  - Style attendu : Enveloppe ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_dashboard_mail`.
  - Équivalent recommandé pour le code : `Mail`.
- `icon_kpi_users_active.png`
  - Emplacement : KPI utilisateurs actifs.
  - Rôle : Utilisateurs actifs.
  - Style attendu : Groupe utilisateurs blanc sur carré bleu ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~44 px dans carré ~58 px.
  - Couleur : Bleu primaire.
  - Nom fonctionnel clair : `icon_kpi_users_active`.
  - Équivalent recommandé pour le code : `UsersRound`.
- `icon_kpi_vehicles_active.png`
  - Emplacement : KPI véhicules actifs.
  - Rôle : Véhicules actifs.
  - Style attendu : Ambulance blanche sur carré turquoise ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~44 px dans carré ~58 px.
  - Couleur : Turquoise.
  - Nom fonctionnel clair : `icon_kpi_vehicles_active`.
  - Équivalent recommandé pour le code : `Ambulance`.
- `icon_kpi_depots_active.png`
  - Emplacement : KPI dépôts actifs.
  - Rôle : Dépôts actifs.
  - Style attendu : Bâtiment blanc sur carré violet ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~44 px dans carré ~58 px.
  - Couleur : Violet.
  - Nom fonctionnel clair : `icon_kpi_depots_active`.
  - Équivalent recommandé pour le code : `Building2`.
- `icon_kpi_templates_active.png`
  - Emplacement : KPI templates actifs.
  - Rôle : Templates actifs.
  - Style attendu : Document blanc sur carré orange ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~44 px dans carré ~58 px.
  - Couleur : Orange.
  - Nom fonctionnel clair : `icon_kpi_templates_active`.
  - Équivalent recommandé pour le code : `FileText`.
- `icon_module_planning.png`
  - Emplacement : Module card Planning.
  - Rôle : Module Planning.
  - Style attendu : Calendrier bleu dans carré pastel ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~30 px.
  - Couleur : Bleu primaire.
  - Nom fonctionnel clair : `icon_module_planning`.
  - Équivalent recommandé pour le code : `CalendarDays`.
- `icon_module_users.png`
  - Emplacement : Module card Utilisateurs/RH.
  - Rôle : Module Utilisateurs RH.
  - Style attendu : Utilisateurs turquoise dans carré pastel ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~30 px.
  - Couleur : Turquoise.
  - Nom fonctionnel clair : `icon_module_users`.
  - Équivalent recommandé pour le code : `UsersRound`.
- `icon_module_vehicles.png`
  - Emplacement : Module card Véhicules.
  - Rôle : Module Véhicules.
  - Style attendu : Ambulance bleue dans carré pastel ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~30 px.
  - Couleur : Bleu primaire.
  - Nom fonctionnel clair : `icon_module_vehicles`.
  - Équivalent recommandé pour le code : `Ambulance`.
- `icon_module_templates.png`
  - Emplacement : Module card Templates.
  - Rôle : Module Templates.
  - Style attendu : Document orange dans carré pastel ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~30 px.
  - Couleur : Orange.
  - Nom fonctionnel clair : `icon_module_templates`.
  - Équivalent recommandé pour le code : `FileText`.
- `icon_module_company.png`
  - Emplacement : Module card Société.
  - Rôle : Module Société.
  - Style attendu : Bâtiment bleu dans carré pastel ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~30 px.
  - Couleur : Bleu.
  - Nom fonctionnel clair : `icon_module_company`.
  - Équivalent recommandé pour le code : `Building2`.
- `icon_module_depots.png`
  - Emplacement : Module card Dépôts.
  - Rôle : Module Dépôts.
  - Style attendu : Entrepôt turquoise dans carré pastel ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~30 px.
  - Couleur : Turquoise.
  - Nom fonctionnel clair : `icon_module_depots`.
  - Équivalent recommandé pour le code : `Warehouse`.
- `icon_module_onboarding.png`
  - Emplacement : Module card Onboarding.
  - Rôle : Module Onboarding.
  - Style attendu : Chapeau violet dans carré pastel ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~30 px.
  - Couleur : Violet.
  - Nom fonctionnel clair : `icon_module_onboarding`.
  - Équivalent recommandé pour le code : `GraduationCap`.
- `icon_module_audit.png`
  - Emplacement : Module card Audit.
  - Rôle : Module Audit.
  - Style attendu : Bouclier gris dans carré pastel ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~30 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_module_audit`.
  - Équivalent recommandé pour le code : `ShieldCheck`.

### 19.2.4 Planning

- `icon_button_add_shift.png`
  - Emplacement : Bouton Ajouter un shift.
  - Rôle : Ajouter shift.
  - Style attendu : Plus blanc ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~16 px.
  - Couleur : Blanc.
  - Nom fonctionnel clair : `icon_button_add_shift`.
  - Équivalent recommandé pour le code : `Plus`.
- `icon_export_pdf.png`
  - Emplacement : Bouton export PDF.
  - Rôle : Export PDF.
  - Style attendu : Document PDF rouge ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Rouge.
  - Nom fonctionnel clair : `icon_export_pdf`.
  - Équivalent recommandé pour le code : `FileText`.
- `icon_export_excel.png`
  - Emplacement : Bouton Excel.
  - Rôle : Export Excel.
  - Style attendu : Document vert ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Vert.
  - Nom fonctionnel clair : `icon_export_excel`.
  - Équivalent recommandé pour le code : `FileSpreadsheet`.
- `icon_export_csv.png`
  - Emplacement : Bouton CSV.
  - Rôle : Export CSV.
  - Style attendu : Document bleu/gris ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_export_csv`.
  - Équivalent recommandé pour le code : `FileText`.
- `icon_print.png`
  - Emplacement : Bouton imprimer.
  - Rôle : Imprimer.
  - Style attendu : Imprimante ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_print`.
  - Équivalent recommandé pour le code : `Printer`.
- `icon_filter_calendar.png`
  - Emplacement : Filtre période.
  - Rôle : Filtre période.
  - Style attendu : Calendrier ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_filter_calendar`.
  - Équivalent recommandé pour le code : `CalendarDays`.
- `icon_filter_depot.png`
  - Emplacement : Filtre dépôt.
  - Rôle : Filtre dépôt.
  - Style attendu : Bâtiment/dépôt ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_filter_depot`.
  - Équivalent recommandé pour le code : `Building2`.
- `icon_filter_role.png`
  - Emplacement : Filtre rôle.
  - Rôle : Filtre rôle.
  - Style attendu : Utilisateur ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_filter_role`.
  - Équivalent recommandé pour le code : `UserRound`.
- `icon_filter_user.png`
  - Emplacement : Filtre utilisateur.
  - Rôle : Filtre utilisateur.
  - Style attendu : Utilisateur ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_filter_user`.
  - Équivalent recommandé pour le code : `UserRound`.
- `icon_cell_detail_calendar.png`
  - Emplacement : Panneau détail cellule.
  - Rôle : Affectation datée.
  - Style attendu : Calendrier ligne affectation ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~16 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_cell_detail_calendar`.
  - Équivalent recommandé pour le code : `CalendarDays`.
  - Commentaire : Très petit.
- `icon_action_assign_employee.png`
  - Emplacement : Barre actions sélection.
  - Rôle : Affecter employé.
  - Style attendu : Utilisateur affectation ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_action_assign_employee`.
  - Équivalent recommandé pour le code : `UserRoundPlus`.
- `icon_action_assign_vehicle.png`
  - Emplacement : Barre actions sélection.
  - Rôle : Affecter véhicule.
  - Style attendu : Ambulance/véhicule ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_action_assign_vehicle`.
  - Équivalent recommandé pour le code : `Ambulance`.
- `icon_action_clear.png`
  - Emplacement : Barre actions sélection.
  - Rôle : Vider sélection.
  - Style attendu : Corbeille rouge ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Rouge.
  - Nom fonctionnel clair : `icon_action_clear`.
  - Équivalent recommandé pour le code : `Trash2`.

### 19.2.5 Utilisateurs/RH

- `icon_button_add_user.png`
  - Emplacement : Bouton créer utilisateur.
  - Rôle : Créer utilisateur.
  - Style attendu : Plus blanc ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~16 px.
  - Couleur : Blanc.
  - Nom fonctionnel clair : `icon_button_add_user`.
  - Équivalent recommandé pour le code : `Plus`.
- `icon_users_kpi_users.png`
  - Emplacement : KPI utilisateurs actifs.
  - Rôle : Utilisateurs actifs.
  - Style attendu : Groupe utilisateurs blanc sur carré bleu ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~30 px.
  - Couleur : Bleu primaire.
  - Nom fonctionnel clair : `icon_users_kpi_users`.
  - Équivalent recommandé pour le code : `UsersRound`.
- `icon_users_kpi_student.png`
  - Emplacement : KPI stagiaires.
  - Rôle : Stagiaires.
  - Style attendu : Chapeau/formation blanc sur carré vert ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~30 px.
  - Couleur : Vert.
  - Nom fonctionnel clair : `icon_users_kpi_student`.
  - Équivalent recommandé pour le code : `GraduationCap`.
- `icon_users_kpi_absence.png`
  - Emplacement : KPI absences.
  - Rôle : Absences en cours.
  - Style attendu : Calendrier blanc sur carré orange ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~30 px.
  - Couleur : Orange.
  - Nom fonctionnel clair : `icon_users_kpi_absence`.
  - Équivalent recommandé pour le code : `CalendarX`.
- `icon_users_kpi_archive.png`
  - Emplacement : KPI comptes archivés.
  - Rôle : Comptes archivés.
  - Style attendu : Archive/boîte blanche sur carré gris ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~30 px.
  - Couleur : Gris foncé.
  - Nom fonctionnel clair : `icon_users_kpi_archive`.
  - Équivalent recommandé pour le code : `Archive`.
- `icon_users_drawer_profile.png`
  - Emplacement : Panneau utilisateur.
  - Rôle : Profil utilisateur.
  - Style attendu : Avatar initiales ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~56 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_users_drawer_profile`.
  - Équivalent recommandé pour le code : `CircleUserRound`.
  - Commentaire : Avatar initiales NA.
- `icon_users_action_edit.png`
  - Emplacement : Action ligne tableau.
  - Rôle : Modifier utilisateur.
  - Style attendu : Crayon édition ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~16 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_users_action_edit`.
  - Équivalent recommandé pour le code : `Pencil`.
  - Commentaire : Très petit.
- `icon_users_action_menu.png`
  - Emplacement : Action ligne tableau.
  - Rôle : Actions supplémentaires.
  - Style attendu : Menu vertical ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~16 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_users_action_menu`.
  - Équivalent recommandé pour le code : `MoreVertical`.
  - Commentaire : Très petit.
- `icon_users_security_key.png`
  - Emplacement : Zone sécurité drawer.
  - Rôle : Réinitialiser mot de passe.
  - Style attendu : Clé rouge ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~20 px.
  - Couleur : Rouge.
  - Nom fonctionnel clair : `icon_users_security_key`.
  - Équivalent recommandé pour le code : `KeyRound`.
- `icon_users_archive_trash.png`
  - Emplacement : Zone sécurité drawer.
  - Rôle : Archiver utilisateur.
  - Style attendu : Corbeille rouge ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~20 px.
  - Couleur : Rouge.
  - Nom fonctionnel clair : `icon_users_archive_trash`.
  - Équivalent recommandé pour le code : `Trash2`.

### 19.2.6 Véhicules

- `icon_button_add_vehicle.png`
  - Emplacement : Bouton ajouter véhicule.
  - Rôle : Ajouter véhicule.
  - Style attendu : Plus blanc ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~16 px.
  - Couleur : Blanc.
  - Nom fonctionnel clair : `icon_button_add_vehicle`.
  - Équivalent recommandé pour le code : `Plus`.
- `icon_vehicles_kpi_total.png`
  - Emplacement : KPI total véhicules.
  - Rôle : Total véhicules.
  - Style attendu : Ambulance blanche sur carré bleu ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~30 px.
  - Couleur : Bleu primaire.
  - Nom fonctionnel clair : `icon_vehicles_kpi_total`.
  - Équivalent recommandé pour le code : `Ambulance`.
- `icon_vehicles_kpi_service.png`
  - Emplacement : KPI en service.
  - Rôle : En service.
  - Style attendu : Check blanc sur carré vert ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~30 px.
  - Couleur : Vert.
  - Nom fonctionnel clair : `icon_vehicles_kpi_service`.
  - Équivalent recommandé pour le code : `CircleCheck`.
- `icon_vehicles_kpi_maintenance.png`
  - Emplacement : KPI maintenance.
  - Rôle : En maintenance.
  - Style attendu : Clé/outil blanc sur carré orange ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~30 px.
  - Couleur : Orange.
  - Nom fonctionnel clair : `icon_vehicles_kpi_maintenance`.
  - Équivalent recommandé pour le code : `Wrench`.
- `icon_vehicles_kpi_out_service.png`
  - Emplacement : KPI hors service.
  - Rôle : Hors service.
  - Style attendu : Signe interdit blanc sur carré rouge ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~30 px.
  - Couleur : Rouge.
  - Nom fonctionnel clair : `icon_vehicles_kpi_out_service`.
  - Équivalent recommandé pour le code : `CircleMinus`.
- `icon_vehicles_kpi_warning.png`
  - Emplacement : KPI conformité à surveiller.
  - Rôle : Conformité à surveiller.
  - Style attendu : Triangle alerte blanc sur carré jaune ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~30 px.
  - Couleur : Jaune/orange.
  - Nom fonctionnel clair : `icon_vehicles_kpi_warning`.
  - Équivalent recommandé pour le code : `TriangleAlert`.
- `icon_vehicle_filter_advanced.png`
  - Emplacement : Bouton filtres avancés.
  - Rôle : Filtres avancés.
  - Style attendu : Filtre entonnoir ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_vehicle_filter_advanced`.
  - Équivalent recommandé pour le code : `SlidersHorizontal / Funnel`.
- `icon_vehicle_button_history.png`
  - Emplacement : Bouton historique.
  - Rôle : Voir historique.
  - Style attendu : Flèche circulaire ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Blanc.
  - Nom fonctionnel clair : `icon_vehicle_button_history`.
  - Équivalent recommandé pour le code : `History`.

### 19.2.7 Templates

- `icon_templates_kpi_total.png`
  - Emplacement : KPI total templates.
  - Rôle : Total templates.
  - Style attendu : Document blanc sur carré bleu ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~30 px.
  - Couleur : Bleu primaire.
  - Nom fonctionnel clair : `icon_templates_kpi_total`.
  - Équivalent recommandé pour le code : `ClipboardList`.
- `icon_templates_kpi_active.png`
  - Emplacement : KPI actifs.
  - Rôle : Templates actifs.
  - Style attendu : Check blanc sur carré vert ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~30 px.
  - Couleur : Vert.
  - Nom fonctionnel clair : `icon_templates_kpi_active`.
  - Équivalent recommandé pour le code : `CircleCheck`.
- `icon_templates_kpi_disabled.png`
  - Emplacement : KPI désactivés.
  - Rôle : Templates désactivés.
  - Style attendu : Pause blanc sur carré orange ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~30 px.
  - Couleur : Orange.
  - Nom fonctionnel clair : `icon_templates_kpi_disabled`.
  - Équivalent recommandé pour le code : `PauseCircle`.
- `icon_templates_kpi_archive.png`
  - Emplacement : KPI archivés.
  - Rôle : Templates archivés.
  - Style attendu : Archive blanche sur carré violet ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~30 px.
  - Couleur : Violet.
  - Nom fonctionnel clair : `icon_templates_kpi_archive`.
  - Équivalent recommandé pour le code : `Archive`.
- `icon_templates_kpi_team.png`
  - Emplacement : KPI types de garde.
  - Rôle : Types de garde.
  - Style attendu : Groupe blanc sur carré turquoise ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~30 px.
  - Couleur : Turquoise.
  - Nom fonctionnel clair : `icon_templates_kpi_team`.
  - Équivalent recommandé pour le code : `UsersRound`.
- `icon_button_new_template.png`
  - Emplacement : Bouton nouveau template.
  - Rôle : Nouveau template.
  - Style attendu : Plus blanc ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~16 px.
  - Couleur : Blanc.
  - Nom fonctionnel clair : `icon_button_new_template`.
  - Équivalent recommandé pour le code : `Plus`.
- `icon_templates_export.png`
  - Emplacement : Bouton export.
  - Rôle : Exporter.
  - Style attendu : Flèche téléchargement ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~16 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_templates_export`.
  - Équivalent recommandé pour le code : `Download`.
- `icon_templates_view.png`
  - Emplacement : Bouton vue.
  - Rôle : Changer vue.
  - Style attendu : Liste ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~16 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_templates_view`.
  - Équivalent recommandé pour le code : `List`.
- `icon_templates_drawer_info.png`
  - Emplacement : Section informations générales.
  - Rôle : Informations générales.
  - Style attendu : Clipboard/info ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~20 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_templates_drawer_info`.
  - Équivalent recommandé pour le code : `ClipboardList`.
- `icon_templates_drawer_clock.png`
  - Emplacement : Section horaires.
  - Rôle : Horaires.
  - Style attendu : Horloge ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~20 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_templates_drawer_clock`.
  - Équivalent recommandé pour le code : `Clock`.
- `icon_templates_drawer_team.png`
  - Emplacement : Section équipe requise.
  - Rôle : Équipe requise.
  - Style attendu : Groupe utilisateurs ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~20 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_templates_drawer_team`.
  - Équivalent recommandé pour le code : `UsersRound`.
- `icon_templates_drawer_chart.png`
  - Emplacement : Section utilisation.
  - Rôle : Utilisation.
  - Style attendu : Bar chart ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~20 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_templates_drawer_chart`.
  - Équivalent recommandé pour le code : `BarChart3`.
- `icon_templates_button_duplicate.png`
  - Emplacement : Bouton dupliquer.
  - Rôle : Dupliquer.
  - Style attendu : Copie/document ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_templates_button_duplicate`.
  - Équivalent recommandé pour le code : `Copy`.

### 19.2.8 Société

- `icon_company_identity.png`
  - Emplacement : Card identité société.
  - Rôle : Identité société.
  - Style attendu : Bâtiment dans pastille ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~24 px.
  - Couleur : Bleu marine/gris.
  - Nom fonctionnel clair : `icon_company_identity`.
  - Équivalent recommandé pour le code : `Building2`.
- `icon_company_summary_building.png`
  - Emplacement : Résumé société.
  - Rôle : Société active.
  - Style attendu : Bâtiment ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~28 px.
  - Couleur : Bleu marine.
  - Nom fonctionnel clair : `icon_company_summary_building`.
  - Équivalent recommandé pour le code : `Building2`.
- `icon_company_summary_depots.png`
  - Emplacement : Résumé société.
  - Rôle : Dépôts actifs.
  - Style attendu : Dépôt/landmark violet ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~28 px.
  - Couleur : Violet.
  - Nom fonctionnel clair : `icon_company_summary_depots`.
  - Équivalent recommandé pour le code : `Landmark`.
- `icon_company_summary_users.png`
  - Emplacement : Résumé société.
  - Rôle : Utilisateurs actifs.
  - Style attendu : Utilisateurs bleu ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~28 px.
  - Couleur : Bleu.
  - Nom fonctionnel clair : `icon_company_summary_users`.
  - Équivalent recommandé pour le code : `UsersRound`.
- `icon_company_summary_vehicles.png`
  - Emplacement : Résumé société.
  - Rôle : Véhicules actifs.
  - Style attendu : Ambulance turquoise ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~28 px.
  - Couleur : Turquoise.
  - Nom fonctionnel clair : `icon_company_summary_vehicles`.
  - Équivalent recommandé pour le code : `Ambulance`.
- `icon_company_summary_calendar.png`
  - Emplacement : Résumé société.
  - Rôle : Dernière mise à jour.
  - Style attendu : Calendrier bleu ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~28 px.
  - Couleur : Bleu.
  - Nom fonctionnel clair : `icon_company_summary_calendar`.
  - Équivalent recommandé pour le code : `CalendarDays`.
- `icon_button_save.png`
  - Emplacement : Bouton enregistrer.
  - Rôle : Enregistrer.
  - Style attendu : Disquette blanche ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Blanc.
  - Nom fonctionnel clair : `icon_button_save`.
  - Équivalent recommandé pour le code : `Save`.

### 19.2.9 Dépôts/Bases

- `icon_depots_kpi_active.png`
  - Emplacement : KPI dépôts actifs.
  - Rôle : Dépôts actifs.
  - Style attendu : Bâtiment blanc sur carré violet ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~30 px.
  - Couleur : Violet.
  - Nom fonctionnel clair : `icon_depots_kpi_active`.
  - Équivalent recommandé pour le code : `Landmark`.
- `icon_depots_kpi_archive.png`
  - Emplacement : KPI archivés.
  - Rôle : Dépôts archivés.
  - Style attendu : Document blanc sur carré orange ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~30 px.
  - Couleur : Orange.
  - Nom fonctionnel clair : `icon_depots_kpi_archive`.
  - Équivalent recommandé pour le code : `FileArchive`.
- `icon_depots_kpi_vehicles.png`
  - Emplacement : KPI véhicules rattachés.
  - Rôle : Véhicules rattachés.
  - Style attendu : Ambulance blanche sur carré turquoise ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~30 px.
  - Couleur : Turquoise.
  - Nom fonctionnel clair : `icon_depots_kpi_vehicles`.
  - Équivalent recommandé pour le code : `Ambulance`.
- `icon_depots_kpi_users.png`
  - Emplacement : KPI utilisateurs rattachés.
  - Rôle : Utilisateurs rattachés.
  - Style attendu : Utilisateurs blancs sur carré bleu ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~30 px.
  - Couleur : Bleu primaire.
  - Nom fonctionnel clair : `icon_depots_kpi_users`.
  - Équivalent recommandé pour le code : `UsersRound`.
- `icon_depots_search.png`
  - Emplacement : Champ recherche.
  - Rôle : Recherche dépôt.
  - Style attendu : Loupe ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_depots_search`.
  - Équivalent recommandé pour le code : `Search`.
- `icon_depots_filter.png`
  - Emplacement : Bouton filtrer.
  - Rôle : Filtrer.
  - Style attendu : Filtre ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_depots_filter`.
  - Équivalent recommandé pour le code : `Filter`.
- `icon_depots_attachment_vehicles.png`
  - Emplacement : Drawer rattachements.
  - Rôle : Véhicules rattachés.
  - Style attendu : Ambulance/véhicule ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~26 px.
  - Couleur : Turquoise.
  - Nom fonctionnel clair : `icon_depots_attachment_vehicles`.
  - Équivalent recommandé pour le code : `Ambulance`.
- `icon_depots_attachment_users.png`
  - Emplacement : Drawer rattachements.
  - Rôle : Utilisateurs rattachés.
  - Style attendu : Utilisateurs ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~26 px.
  - Couleur : Bleu primaire.
  - Nom fonctionnel clair : `icon_depots_attachment_users`.
  - Équivalent recommandé pour le code : `UsersRound`.
- `icon_depots_note_info.png`
  - Emplacement : Drawer notes.
  - Rôle : Note informative.
  - Style attendu : Info ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Bleu clair.
  - Nom fonctionnel clair : `icon_depots_note_info`.
  - Équivalent recommandé pour le code : `Info`.
- `icon_depots_danger_warning.png`
  - Emplacement : Zone danger.
  - Rôle : Zone danger.
  - Style attendu : Triangle alerte rouge ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~20 px.
  - Couleur : Rouge.
  - Nom fonctionnel clair : `icon_depots_danger_warning`.
  - Équivalent recommandé pour le code : `TriangleAlert`.
- `icon_depots_archive_depot.png`
  - Emplacement : Bouton archiver dépôt.
  - Rôle : Archiver dépôt.
  - Style attendu : Corbeille rouge ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Rouge.
  - Nom fonctionnel clair : `icon_depots_archive_depot`.
  - Équivalent recommandé pour le code : `Trash2`.

### 19.2.10 Onboarding

- `icon_onboarding_step_company.png`
  - Emplacement : Progression onboarding.
  - Rôle : Étape profil société.
  - Style attendu : Bâtiment société ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~28 px.
  - Couleur : Gris/bleu.
  - Nom fonctionnel clair : `icon_onboarding_step_company`.
  - Équivalent recommandé pour le code : `Building2`.
- `icon_onboarding_step_depots.png`
  - Emplacement : Progression onboarding.
  - Rôle : Étape bases/dépôts.
  - Style attendu : Dépôt violet ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~28 px.
  - Couleur : Violet.
  - Nom fonctionnel clair : `icon_onboarding_step_depots`.
  - Équivalent recommandé pour le code : `Landmark`.
- `icon_onboarding_step_users.png`
  - Emplacement : Progression onboarding.
  - Rôle : Étape utilisateurs.
  - Style attendu : Utilisateurs bleu ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~28 px.
  - Couleur : Bleu.
  - Nom fonctionnel clair : `icon_onboarding_step_users`.
  - Équivalent recommandé pour le code : `UsersRound`.
- `icon_onboarding_step_vehicles.png`
  - Emplacement : Progression onboarding.
  - Rôle : Étape véhicules.
  - Style attendu : Ambulance turquoise ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~28 px.
  - Couleur : Turquoise.
  - Nom fonctionnel clair : `icon_onboarding_step_vehicles`.
  - Équivalent recommandé pour le code : `Ambulance`.
- `icon_onboarding_step_templates.png`
  - Emplacement : Progression onboarding.
  - Rôle : Étape templates.
  - Style attendu : Document orange ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~28 px.
  - Couleur : Orange.
  - Nom fonctionnel clair : `icon_onboarding_step_templates`.
  - Équivalent recommandé pour le code : `FileText`.
- `icon_onboarding_tab_users.png`
  - Emplacement : Onglet type import.
  - Rôle : Import utilisateurs.
  - Style attendu : Utilisateurs ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Bleu.
  - Nom fonctionnel clair : `icon_onboarding_tab_users`.
  - Équivalent recommandé pour le code : `UsersRound`.
  - Commentaire : Très petit.
- `icon_onboarding_tab_vehicles.png`
  - Emplacement : Onglet type import.
  - Rôle : Import véhicules.
  - Style attendu : Ambulance ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_onboarding_tab_vehicles`.
  - Équivalent recommandé pour le code : `Ambulance`.
  - Commentaire : Très petit.
- `icon_onboarding_tab_templates.png`
  - Emplacement : Onglet type import.
  - Rôle : Import templates.
  - Style attendu : Document ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_onboarding_tab_templates`.
  - Équivalent recommandé pour le code : `FileText`.
  - Commentaire : Très petit.
- `icon_onboarding_tab_depots.png`
  - Emplacement : Onglet type import.
  - Rôle : Import dépôts.
  - Style attendu : Bâtiment dépôt ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_onboarding_tab_depots`.
  - Équivalent recommandé pour le code : `Landmark`.
  - Commentaire : Très petit.
- `icon_onboarding_tab_absences.png`
  - Emplacement : Onglet type import.
  - Rôle : Import absences.
  - Style attendu : Calendrier ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_onboarding_tab_absences`.
  - Équivalent recommandé pour le code : `CalendarDays`.
  - Commentaire : Très petit.
- `icon_onboarding_upload_cloud.png`
  - Emplacement : Zone upload.
  - Rôle : Déposer fichier.
  - Style attendu : Nuage upload ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~30 px.
  - Couleur : Bleu clair.
  - Nom fonctionnel clair : `icon_onboarding_upload_cloud`.
  - Équivalent recommandé pour le code : `CloudUpload`.
- `icon_onboarding_file_excel.png`
  - Emplacement : Fichier importé.
  - Rôle : Fichier XLSX.
  - Style attendu : Fichier Excel vert ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~22 px.
  - Couleur : Vert.
  - Nom fonctionnel clair : `icon_onboarding_file_excel`.
  - Équivalent recommandé pour le code : `FileSpreadsheet`.
- `icon_onboarding_download_template.png`
  - Emplacement : Télécharger modèle.
  - Rôle : Télécharger modèle.
  - Style attendu : Flèche téléchargement ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~16 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_onboarding_download_template`.
  - Équivalent recommandé pour le code : `Download`.
- `icon_onboarding_error_warning.png`
  - Emplacement : Erreur import.
  - Rôle : Erreur import.
  - Style attendu : Triangle alerte rouge ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Rouge.
  - Nom fonctionnel clair : `icon_onboarding_error_warning`.
  - Équivalent recommandé pour le code : `TriangleAlert`.
- `icon_onboarding_ready_check.png`
  - Emplacement : Card prêt à importer.
  - Rôle : Prêt à importer.
  - Style attendu : Check vert ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~24 px.
  - Couleur : Vert.
  - Nom fonctionnel clair : `icon_onboarding_ready_check`.
  - Équivalent recommandé pour le code : `CircleCheck`.
- `icon_onboarding_progress_ring.png`
  - Emplacement : Aide import.
  - Rôle : Progression import.
  - Style attendu : Anneau de progression 40% ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~80 px.
  - Couleur : Bleu + gris.
  - Nom fonctionnel clair : `icon_onboarding_progress_ring`.
  - Équivalent recommandé pour le code : `CircleDashed`.
  - Commentaire : Graphique circular progress, pas une icône simple.

### 19.2.11 Audit

- `icon_audit_kpi_actions.png`
  - Emplacement : KPI actions aujourd’hui.
  - Rôle : Actions aujourd’hui.
  - Style attendu : Clipboard/action blanc sur carré bleu ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~30 px.
  - Couleur : Bleu.
  - Nom fonctionnel clair : `icon_audit_kpi_actions`.
  - Équivalent recommandé pour le code : `ClipboardList`.
- `icon_audit_kpi_connections.png`
  - Emplacement : KPI connexions.
  - Rôle : Connexions.
  - Style attendu : Cadenas blanc sur carré vert ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~30 px.
  - Couleur : Vert.
  - Nom fonctionnel clair : `icon_audit_kpi_connections`.
  - Équivalent recommandé pour le code : `Lock`.
- `icon_audit_kpi_sensitive.png`
  - Emplacement : KPI modifications sensibles.
  - Rôle : Modifications sensibles.
  - Style attendu : Crayon blanc sur carré orange ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~30 px.
  - Couleur : Orange.
  - Nom fonctionnel clair : `icon_audit_kpi_sensitive`.
  - Équivalent recommandé pour le code : `Pencil`.
- `icon_audit_kpi_support.png`
  - Emplacement : KPI actions support.
  - Rôle : Actions support.
  - Style attendu : Casque/support blanc sur carré violet ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~30 px.
  - Couleur : Violet.
  - Nom fonctionnel clair : `icon_audit_kpi_support`.
  - Équivalent recommandé pour le code : `Headphones`.
- `icon_audit_kpi_alerts.png`
  - Emplacement : KPI alertes à vérifier.
  - Rôle : Alertes à vérifier.
  - Style attendu : Triangle alerte blanc sur carré jaune ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~30 px.
  - Couleur : Jaune/orange.
  - Nom fonctionnel clair : `icon_audit_kpi_alerts`.
  - Équivalent recommandé pour le code : `TriangleAlert`.
- `icon_audit_export.png`
  - Emplacement : Bouton exporter.
  - Rôle : Exporter audit.
  - Style attendu : Téléchargement blanc ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Blanc.
  - Nom fonctionnel clair : `icon_audit_export`.
  - Équivalent recommandé pour le code : `Download`.
- `icon_audit_reset.png`
  - Emplacement : Bouton réinitialiser.
  - Rôle : Réinitialiser filtres.
  - Style attendu : Flèche circulaire ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_audit_reset`.
  - Équivalent recommandé pour le code : `RotateCcw`.
- `icon_audit_copy_id.png`
  - Emplacement : Bouton copier ID.
  - Rôle : Copier ID.
  - Style attendu : Copie ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_audit_copy_id`.
  - Équivalent recommandé pour le code : `Copy`.
- `icon_audit_copy_json.png`
  - Emplacement : Bouton copier JSON.
  - Rôle : Copier JSON.
  - Style attendu : Copie ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_audit_copy_json`.
  - Équivalent recommandé pour le code : `Copy`.

### 19.2.12 Privacy

- `icon_privacy_breadcrumb_home.png`
  - Emplacement : Fil d’Ariane.
  - Rôle : Accueil.
  - Style attendu : Maison ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~16 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_privacy_breadcrumb_home`.
  - Équivalent recommandé pour le code : `Home`.
  - Commentaire : Très petit.
- `icon_privacy_update_calendar.png`
  - Emplacement : Badge dernière mise à jour.
  - Rôle : Dernière mise à jour.
  - Style attendu : Calendrier ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~18 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_privacy_update_calendar`.
  - Équivalent recommandé pour le code : `CalendarDays`.
- `icon_privacy_editor_building.png`
  - Emplacement : Section éditeur du site.
  - Rôle : Éditeur du site.
  - Style attendu : Bâtiment grand contour bleu ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~56 px.
  - Couleur : Bleu primaire.
  - Nom fonctionnel clair : `icon_privacy_editor_building`.
  - Équivalent recommandé pour le code : `Building2`.
- `icon_privacy_hosting_cloud.png`
  - Emplacement : Section hébergement.
  - Rôle : Hébergement.
  - Style attendu : Nuage grand contour bleu ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~56 px.
  - Couleur : Bleu primaire.
  - Nom fonctionnel clair : `icon_privacy_hosting_cloud`.
  - Équivalent recommandé pour le code : `Cloud`.
- `icon_privacy_data_id.png`
  - Emplacement : Section données collectées.
  - Rôle : Données collectées.
  - Style attendu : Carte identité contour bleu ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~56 px.
  - Couleur : Bleu primaire.
  - Nom fonctionnel clair : `icon_privacy_data_id`.
  - Équivalent recommandé pour le code : `IdCard`.
- `icon_privacy_purpose_target.png`
  - Emplacement : Section finalités.
  - Rôle : Finalités de traitement.
  - Style attendu : Cible contour bleu ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~56 px.
  - Couleur : Bleu primaire.
  - Nom fonctionnel clair : `icon_privacy_purpose_target`.
  - Équivalent recommandé pour le code : `Goal`.
- `icon_privacy_footer_shield.png`
  - Emplacement : Footer accès réservé.
  - Rôle : Accès réservé.
  - Style attendu : Bouclier ; rendu sobre, cohérent avec la maquette, sans changement de direction artistique.
  - Taille approximative : ~16 px.
  - Couleur : Gris bleuté.
  - Nom fonctionnel clair : `icon_privacy_footer_shield`.
  - Équivalent recommandé pour le code : `ShieldCheck`.
  - Commentaire : Très petit.


## 19.3 Tableau de mapping codable

Le tableau ci-dessous sert de base directe pour le codage frontend. Les fichiers PNG extraits sont des références visuelles ; pour l’intégration, privilégier les équivalents SVG de type Lucide React lorsque c’est possible, surtout pour les icônes de navigation, boutons, filtres et tableaux.

| Zone UI | Icône observée | Nom recommandé | Usage | Icône code recommandée | Couleur | Taille approx. | Commentaire |
|---|---|---|---|---|---|---|---|
| Login — Logo marque panneau gauche | Ambulance stylisée blanche/cyan avec croix et flèche rouge | icon_login_brand_ambulance | Logo ambulance | `Ambulance ou asset logo dédié` | Blanc + cyan + rouge | ~90x80 px | À conserver comme asset marque, pas comme icône générique. |
| Login — Bénéfice planning intelligent | Calendrier linéaire cyan | icon_login_feature_calendar | Planning intelligent | `CalendarDays` | Cyan | ~28 px | Crop sur fond photo sombre. |
| Login — Bénéfice flotte optimisée | Ambulance/véhicule linéaire cyan | icon_login_feature_vehicle | Flotte optimisée | `Ambulance` | Cyan | ~28 px | Crop sur fond photo sombre. |
| Login — Bénéfice équipes connectées | Groupe utilisateurs linéaire cyan | icon_login_feature_users | Équipes connectées | `UsersRound` | Cyan | ~30 px | Crop sur fond photo sombre. |
| Login — Bénéfice conformité & sécurité | Bouclier/check linéaire cyan | icon_login_feature_shield | Conformité sécurité | `ShieldCheck` | Cyan | ~31 px | Crop sur fond photo sombre. |
| Login — Carte réassurance accès réservé | Cadenas médical dans pastille cyan | icon_login_trust_lock | Accès réservé | `LockKeyhole` | Cyan sur pastille | ~42 px | Icone avec pastille dans carte translucide. |
| Login — Logo au-dessus de la carte connexion | Ambulance cyan dans cercle blanc | icon_login_card_ambulance | Login ambulance | `Ambulance` | Cyan + rouge | ~80 px | Asset marque secondaire. |
| Login — Champ adresse email | Enveloppe linéaire grise | icon_login_input_email | Email | `Mail` | Gris bleuté | ~18 px |  |
| Login — Champ mot de passe | Cadenas linéaire gris | icon_login_input_lock | Mot de passe | `Lock` | Gris bleuté | ~18 px |  |
| Login — Afficher/masquer mot de passe | Œil linéaire gris | icon_login_input_eye | Afficher mot de passe | `Eye` | Gris bleuté | ~18 px |  |
| Login — Checkbox souvenir | Case cochée bleue | icon_login_checkbox_checked | Checkbox cochée | `CheckSquare` | Bleu primaire | ~18 px |  |
| Login — Bouton connexion | Cadenas blanc | icon_login_button_lock | Connexion sécurisée | `Lock` | Blanc | ~18 px |  |
| Login — Alerte identifiants invalides | Triangle alerte rouge | icon_login_alert_warning | Erreur authentification | `TriangleAlert` | Rouge | ~22 px |  |
| Login — Badge hébergement France | Drapeau France mini | icon_login_footer_france_flag | Hébergement France | `Flag` | Bleu blanc rouge | ~18 px | Crop fidèle mais très petit. |
| Login — Badge conformité RGPD | Bouclier check bleu | icon_login_footer_shield | Conforme RGPD | `ShieldCheck` | Bleu | ~18 px |  |
| Shell commun / Dashboard — Logo application dans sidebar | Ambulance cyan avec croix | icon_sidebar_logo_ambulance | Logo sidebar | `Ambulance ou asset logo dédié` | Cyan + rouge | ~56 px | À conserver comme asset. |
| Shell commun / Dashboard — Navigation sidebar Tableau de bord | Icône dashboard/blocs | icon_sidebar_dashboard | Tableau de bord | `LayoutDashboard` | Bleu actif / gris inactif | ~22 px | État actif visible sur Dashboard. |
| Shell commun / Dashboard — Navigation sidebar Planning | Calendrier linéaire | icon_sidebar_planning | Planning | `CalendarDays` | Gris bleuté | ~22 px |  |
| Shell commun / Dashboard — Navigation sidebar Utilisateurs/RH | Groupe utilisateurs | icon_sidebar_users | Utilisateurs RH | `UsersRound` | Gris bleuté | ~22 px |  |
| Shell commun / Dashboard — Navigation sidebar Véhicules | Ambulance avec croix | icon_sidebar_vehicles | Véhicules | `Ambulance` | Gris bleuté | ~24 px |  |
| Shell commun / Dashboard — Navigation sidebar Templates | Document/list | icon_sidebar_templates | Templates | `FileText` | Gris bleuté | ~22 px |  |
| Shell commun / Dashboard — Navigation sidebar Société | Bâtiment société | icon_sidebar_company | Société | `Building2` | Gris bleuté | ~24 px |  |
| Shell commun / Dashboard — Navigation sidebar Dépôts | Bâtiment dépôt / colonnes | icon_sidebar_depots | Dépôts | `Landmark` | Gris bleuté | ~24 px |  |
| Shell commun / Dashboard — Navigation sidebar Onboarding | Chapeau / parcours | icon_sidebar_onboarding | Onboarding | `GraduationCap` | Gris bleuté | ~24 px |  |
| Shell commun / Dashboard — Navigation sidebar Audit | Bouclier check | icon_sidebar_audit | Audit | `ShieldCheck` | Gris bleuté | ~24 px |  |
| Shell commun / Dashboard — Sélecteur société topbar | Bâtiment dans petit carré | icon_topbar_company | Société courante | `Building2` | Bleu marine/gris | ~18 px |  |
| Shell commun / Dashboard — Toggle thème topbar | Soleil linéaire | icon_topbar_theme_sun | Thème clair | `Sun` | Bleu marine/gris | ~24 px |  |
| Shell commun / Dashboard — Déconnexion topbar | Icône sortie | icon_topbar_logout | Déconnexion | `LogOut` | Bleu marine/gris | ~18 px |  |
| Dashboard — Carte utilisateur connecté | Avatar utilisateur circulaire | icon_dashboard_user_avatar | Utilisateur connecté | `UserCircle` | Gris bleuté + vert | ~74 px | Avatar générique, non spécifique à une personne. |
| Dashboard — Email utilisateur connecté | Enveloppe | icon_dashboard_mail | Email utilisateur | `Mail` | Gris bleuté | ~18 px |  |
| Dashboard — KPI utilisateurs actifs | Groupe utilisateurs blanc sur carré bleu | icon_kpi_users_active | Utilisateurs actifs | `UsersRound` | Bleu primaire | ~44 px dans carré ~58 px |  |
| Dashboard — KPI véhicules actifs | Ambulance blanche sur carré turquoise | icon_kpi_vehicles_active | Véhicules actifs | `Ambulance` | Turquoise | ~44 px dans carré ~58 px |  |
| Dashboard — KPI dépôts actifs | Bâtiment blanc sur carré violet | icon_kpi_depots_active | Dépôts actifs | `Building2` | Violet | ~44 px dans carré ~58 px |  |
| Dashboard — KPI templates actifs | Document blanc sur carré orange | icon_kpi_templates_active | Templates actifs | `FileText` | Orange | ~44 px dans carré ~58 px |  |
| Dashboard — Module card Planning | Calendrier bleu dans carré pastel | icon_module_planning | Module Planning | `CalendarDays` | Bleu primaire | ~30 px |  |
| Dashboard — Module card Utilisateurs/RH | Utilisateurs turquoise dans carré pastel | icon_module_users | Module Utilisateurs RH | `UsersRound` | Turquoise | ~30 px |  |
| Dashboard — Module card Véhicules | Ambulance bleue dans carré pastel | icon_module_vehicles | Module Véhicules | `Ambulance` | Bleu primaire | ~30 px |  |
| Dashboard — Module card Templates | Document orange dans carré pastel | icon_module_templates | Module Templates | `FileText` | Orange | ~30 px |  |
| Dashboard — Module card Société | Bâtiment bleu dans carré pastel | icon_module_company | Module Société | `Building2` | Bleu | ~30 px |  |
| Dashboard — Module card Dépôts | Entrepôt turquoise dans carré pastel | icon_module_depots | Module Dépôts | `Warehouse` | Turquoise | ~30 px |  |
| Dashboard — Module card Onboarding | Chapeau violet dans carré pastel | icon_module_onboarding | Module Onboarding | `GraduationCap` | Violet | ~30 px |  |
| Dashboard — Module card Audit | Bouclier gris dans carré pastel | icon_module_audit | Module Audit | `ShieldCheck` | Gris bleuté | ~30 px |  |
| Planning — Bouton Ajouter un shift | Plus blanc | icon_button_add_shift | Ajouter shift | `Plus` | Blanc | ~16 px |  |
| Planning — Bouton export PDF | Document PDF rouge | icon_export_pdf | Export PDF | `FileText` | Rouge | ~18 px |  |
| Planning — Bouton Excel | Document vert | icon_export_excel | Export Excel | `FileSpreadsheet` | Vert | ~18 px |  |
| Planning — Bouton CSV | Document bleu/gris | icon_export_csv | Export CSV | `FileText` | Gris bleuté | ~18 px |  |
| Planning — Bouton imprimer | Imprimante | icon_print | Imprimer | `Printer` | Gris bleuté | ~18 px |  |
| Planning — Filtre période | Calendrier | icon_filter_calendar | Filtre période | `CalendarDays` | Gris bleuté | ~18 px |  |
| Planning — Filtre dépôt | Bâtiment/dépôt | icon_filter_depot | Filtre dépôt | `Building2` | Gris bleuté | ~18 px |  |
| Planning — Filtre rôle | Utilisateur | icon_filter_role | Filtre rôle | `UserRound` | Gris bleuté | ~18 px |  |
| Planning — Filtre utilisateur | Utilisateur | icon_filter_user | Filtre utilisateur | `UserRound` | Gris bleuté | ~18 px |  |
| Planning — Panneau détail cellule | Calendrier ligne affectation | icon_cell_detail_calendar | Affectation datée | `CalendarDays` | Gris bleuté | ~16 px | Très petit. |
| Planning — Barre actions sélection | Utilisateur affectation | icon_action_assign_employee | Affecter employé | `UserRoundPlus` | Gris bleuté | ~18 px |  |
| Planning — Barre actions sélection | Ambulance/véhicule | icon_action_assign_vehicle | Affecter véhicule | `Ambulance` | Gris bleuté | ~18 px |  |
| Planning — Barre actions sélection | Corbeille rouge | icon_action_clear | Vider sélection | `Trash2` | Rouge | ~18 px |  |
| Utilisateurs/RH — Bouton créer utilisateur | Plus blanc | icon_button_add_user | Créer utilisateur | `Plus` | Blanc | ~16 px |  |
| Utilisateurs/RH — KPI utilisateurs actifs | Groupe utilisateurs blanc sur carré bleu | icon_users_kpi_users | Utilisateurs actifs | `UsersRound` | Bleu primaire | ~30 px |  |
| Utilisateurs/RH — KPI stagiaires | Chapeau/formation blanc sur carré vert | icon_users_kpi_student | Stagiaires | `GraduationCap` | Vert | ~30 px |  |
| Utilisateurs/RH — KPI absences | Calendrier blanc sur carré orange | icon_users_kpi_absence | Absences en cours | `CalendarX` | Orange | ~30 px |  |
| Utilisateurs/RH — KPI comptes archivés | Archive/boîte blanche sur carré gris | icon_users_kpi_archive | Comptes archivés | `Archive` | Gris foncé | ~30 px |  |
| Utilisateurs/RH — Panneau utilisateur | Avatar initiales | icon_users_drawer_profile | Profil utilisateur | `CircleUserRound` | Gris bleuté | ~56 px | Avatar initiales NA. |
| Utilisateurs/RH — Action ligne tableau | Crayon édition | icon_users_action_edit | Modifier utilisateur | `Pencil` | Gris bleuté | ~16 px | Très petit. |
| Utilisateurs/RH — Action ligne tableau | Menu vertical | icon_users_action_menu | Actions supplémentaires | `MoreVertical` | Gris bleuté | ~16 px | Très petit. |
| Utilisateurs/RH — Zone sécurité drawer | Clé rouge | icon_users_security_key | Réinitialiser mot de passe | `KeyRound` | Rouge | ~20 px |  |
| Utilisateurs/RH — Zone sécurité drawer | Corbeille rouge | icon_users_archive_trash | Archiver utilisateur | `Trash2` | Rouge | ~20 px |  |
| Véhicules — Bouton ajouter véhicule | Plus blanc | icon_button_add_vehicle | Ajouter véhicule | `Plus` | Blanc | ~16 px |  |
| Véhicules — KPI total véhicules | Ambulance blanche sur carré bleu | icon_vehicles_kpi_total | Total véhicules | `Ambulance` | Bleu primaire | ~30 px |  |
| Véhicules — KPI en service | Check blanc sur carré vert | icon_vehicles_kpi_service | En service | `CircleCheck` | Vert | ~30 px |  |
| Véhicules — KPI maintenance | Clé/outil blanc sur carré orange | icon_vehicles_kpi_maintenance | En maintenance | `Wrench` | Orange | ~30 px |  |
| Véhicules — KPI hors service | Signe interdit blanc sur carré rouge | icon_vehicles_kpi_out_service | Hors service | `CircleMinus` | Rouge | ~30 px |  |
| Véhicules — KPI conformité à surveiller | Triangle alerte blanc sur carré jaune | icon_vehicles_kpi_warning | Conformité à surveiller | `TriangleAlert` | Jaune/orange | ~30 px |  |
| Véhicules — Bouton filtres avancés | Filtre entonnoir | icon_vehicle_filter_advanced | Filtres avancés | `SlidersHorizontal / Funnel` | Gris bleuté | ~18 px |  |
| Véhicules — Bouton historique | Flèche circulaire | icon_vehicle_button_history | Voir historique | `History` | Blanc | ~18 px |  |
| Templates — KPI total templates | Document blanc sur carré bleu | icon_templates_kpi_total | Total templates | `ClipboardList` | Bleu primaire | ~30 px |  |
| Templates — KPI actifs | Check blanc sur carré vert | icon_templates_kpi_active | Templates actifs | `CircleCheck` | Vert | ~30 px |  |
| Templates — KPI désactivés | Pause blanc sur carré orange | icon_templates_kpi_disabled | Templates désactivés | `PauseCircle` | Orange | ~30 px |  |
| Templates — KPI archivés | Archive blanche sur carré violet | icon_templates_kpi_archive | Templates archivés | `Archive` | Violet | ~30 px |  |
| Templates — KPI types de garde | Groupe blanc sur carré turquoise | icon_templates_kpi_team | Types de garde | `UsersRound` | Turquoise | ~30 px |  |
| Templates — Bouton nouveau template | Plus blanc | icon_button_new_template | Nouveau template | `Plus` | Blanc | ~16 px |  |
| Templates — Bouton export | Flèche téléchargement | icon_templates_export | Exporter | `Download` | Gris bleuté | ~16 px |  |
| Templates — Bouton vue | Liste | icon_templates_view | Changer vue | `List` | Gris bleuté | ~16 px |  |
| Templates — Section informations générales | Clipboard/info | icon_templates_drawer_info | Informations générales | `ClipboardList` | Gris bleuté | ~20 px |  |
| Templates — Section horaires | Horloge | icon_templates_drawer_clock | Horaires | `Clock` | Gris bleuté | ~20 px |  |
| Templates — Section équipe requise | Groupe utilisateurs | icon_templates_drawer_team | Équipe requise | `UsersRound` | Gris bleuté | ~20 px |  |
| Templates — Section utilisation | Bar chart | icon_templates_drawer_chart | Utilisation | `BarChart3` | Gris bleuté | ~20 px |  |
| Templates — Bouton dupliquer | Copie/document | icon_templates_button_duplicate | Dupliquer | `Copy` | Gris bleuté | ~18 px |  |
| Société — Card identité société | Bâtiment dans pastille | icon_company_identity | Identité société | `Building2` | Bleu marine/gris | ~24 px |  |
| Société — Résumé société | Bâtiment | icon_company_summary_building | Société active | `Building2` | Bleu marine | ~28 px |  |
| Société — Résumé société | Dépôt/landmark violet | icon_company_summary_depots | Dépôts actifs | `Landmark` | Violet | ~28 px |  |
| Société — Résumé société | Utilisateurs bleu | icon_company_summary_users | Utilisateurs actifs | `UsersRound` | Bleu | ~28 px |  |
| Société — Résumé société | Ambulance turquoise | icon_company_summary_vehicles | Véhicules actifs | `Ambulance` | Turquoise | ~28 px |  |
| Société — Résumé société | Calendrier bleu | icon_company_summary_calendar | Dernière mise à jour | `CalendarDays` | Bleu | ~28 px |  |
| Société — Bouton enregistrer | Disquette blanche | icon_button_save | Enregistrer | `Save` | Blanc | ~18 px |  |
| Dépôts/Bases — KPI dépôts actifs | Bâtiment blanc sur carré violet | icon_depots_kpi_active | Dépôts actifs | `Landmark` | Violet | ~30 px |  |
| Dépôts/Bases — KPI archivés | Document blanc sur carré orange | icon_depots_kpi_archive | Dépôts archivés | `FileArchive` | Orange | ~30 px |  |
| Dépôts/Bases — KPI véhicules rattachés | Ambulance blanche sur carré turquoise | icon_depots_kpi_vehicles | Véhicules rattachés | `Ambulance` | Turquoise | ~30 px |  |
| Dépôts/Bases — KPI utilisateurs rattachés | Utilisateurs blancs sur carré bleu | icon_depots_kpi_users | Utilisateurs rattachés | `UsersRound` | Bleu primaire | ~30 px |  |
| Dépôts/Bases — Champ recherche | Loupe | icon_depots_search | Recherche dépôt | `Search` | Gris bleuté | ~18 px |  |
| Dépôts/Bases — Bouton filtrer | Filtre | icon_depots_filter | Filtrer | `Filter` | Gris bleuté | ~18 px |  |
| Dépôts/Bases — Drawer rattachements | Ambulance/véhicule | icon_depots_attachment_vehicles | Véhicules rattachés | `Ambulance` | Turquoise | ~26 px |  |
| Dépôts/Bases — Drawer rattachements | Utilisateurs | icon_depots_attachment_users | Utilisateurs rattachés | `UsersRound` | Bleu primaire | ~26 px |  |
| Dépôts/Bases — Drawer notes | Info | icon_depots_note_info | Note informative | `Info` | Bleu clair | ~18 px |  |
| Dépôts/Bases — Zone danger | Triangle alerte rouge | icon_depots_danger_warning | Zone danger | `TriangleAlert` | Rouge | ~20 px |  |
| Dépôts/Bases — Bouton archiver dépôt | Corbeille rouge | icon_depots_archive_depot | Archiver dépôt | `Trash2` | Rouge | ~18 px |  |
| Onboarding — Progression onboarding | Bâtiment société | icon_onboarding_step_company | Étape profil société | `Building2` | Gris/bleu | ~28 px |  |
| Onboarding — Progression onboarding | Dépôt violet | icon_onboarding_step_depots | Étape bases/dépôts | `Landmark` | Violet | ~28 px |  |
| Onboarding — Progression onboarding | Utilisateurs bleu | icon_onboarding_step_users | Étape utilisateurs | `UsersRound` | Bleu | ~28 px |  |
| Onboarding — Progression onboarding | Ambulance turquoise | icon_onboarding_step_vehicles | Étape véhicules | `Ambulance` | Turquoise | ~28 px |  |
| Onboarding — Progression onboarding | Document orange | icon_onboarding_step_templates | Étape templates | `FileText` | Orange | ~28 px |  |
| Onboarding — Onglet type import | Utilisateurs | icon_onboarding_tab_users | Import utilisateurs | `UsersRound` | Bleu | ~18 px | Très petit. |
| Onboarding — Onglet type import | Ambulance | icon_onboarding_tab_vehicles | Import véhicules | `Ambulance` | Gris bleuté | ~18 px | Très petit. |
| Onboarding — Onglet type import | Document | icon_onboarding_tab_templates | Import templates | `FileText` | Gris bleuté | ~18 px | Très petit. |
| Onboarding — Onglet type import | Bâtiment dépôt | icon_onboarding_tab_depots | Import dépôts | `Landmark` | Gris bleuté | ~18 px | Très petit. |
| Onboarding — Onglet type import | Calendrier | icon_onboarding_tab_absences | Import absences | `CalendarDays` | Gris bleuté | ~18 px | Très petit. |
| Onboarding — Zone upload | Nuage upload | icon_onboarding_upload_cloud | Déposer fichier | `CloudUpload` | Bleu clair | ~30 px |  |
| Onboarding — Fichier importé | Fichier Excel vert | icon_onboarding_file_excel | Fichier XLSX | `FileSpreadsheet` | Vert | ~22 px |  |
| Onboarding — Télécharger modèle | Flèche téléchargement | icon_onboarding_download_template | Télécharger modèle | `Download` | Gris bleuté | ~16 px |  |
| Onboarding — Erreur import | Triangle alerte rouge | icon_onboarding_error_warning | Erreur import | `TriangleAlert` | Rouge | ~18 px |  |
| Onboarding — Card prêt à importer | Check vert | icon_onboarding_ready_check | Prêt à importer | `CircleCheck` | Vert | ~24 px |  |
| Onboarding — Aide import | Anneau de progression 40% | icon_onboarding_progress_ring | Progression import | `CircleDashed` | Bleu + gris | ~80 px | Graphique circular progress, pas une icône simple. |
| Audit — KPI actions aujourd’hui | Clipboard/action blanc sur carré bleu | icon_audit_kpi_actions | Actions aujourd’hui | `ClipboardList` | Bleu | ~30 px |  |
| Audit — KPI connexions | Cadenas blanc sur carré vert | icon_audit_kpi_connections | Connexions | `Lock` | Vert | ~30 px |  |
| Audit — KPI modifications sensibles | Crayon blanc sur carré orange | icon_audit_kpi_sensitive | Modifications sensibles | `Pencil` | Orange | ~30 px |  |
| Audit — KPI actions support | Casque/support blanc sur carré violet | icon_audit_kpi_support | Actions support | `Headphones` | Violet | ~30 px |  |
| Audit — KPI alertes à vérifier | Triangle alerte blanc sur carré jaune | icon_audit_kpi_alerts | Alertes à vérifier | `TriangleAlert` | Jaune/orange | ~30 px |  |
| Audit — Bouton exporter | Téléchargement blanc | icon_audit_export | Exporter audit | `Download` | Blanc | ~18 px |  |
| Audit — Bouton réinitialiser | Flèche circulaire | icon_audit_reset | Réinitialiser filtres | `RotateCcw` | Gris bleuté | ~18 px |  |
| Audit — Bouton copier ID | Copie | icon_audit_copy_id | Copier ID | `Copy` | Gris bleuté | ~18 px |  |
| Audit — Bouton copier JSON | Copie | icon_audit_copy_json | Copier JSON | `Copy` | Gris bleuté | ~18 px |  |
| Privacy — Fil d’Ariane | Maison | icon_privacy_breadcrumb_home | Accueil | `Home` | Gris bleuté | ~16 px | Très petit. |
| Privacy — Badge dernière mise à jour | Calendrier | icon_privacy_update_calendar | Dernière mise à jour | `CalendarDays` | Gris bleuté | ~18 px |  |
| Privacy — Section éditeur du site | Bâtiment grand contour bleu | icon_privacy_editor_building | Éditeur du site | `Building2` | Bleu primaire | ~56 px |  |
| Privacy — Section hébergement | Nuage grand contour bleu | icon_privacy_hosting_cloud | Hébergement | `Cloud` | Bleu primaire | ~56 px |  |
| Privacy — Section données collectées | Carte identité contour bleu | icon_privacy_data_id | Données collectées | `IdCard` | Bleu primaire | ~56 px |  |
| Privacy — Section finalités | Cible contour bleu | icon_privacy_purpose_target | Finalités de traitement | `Goal` | Bleu primaire | ~56 px |  |
| Privacy — Footer accès réservé | Bouclier | icon_privacy_footer_shield | Accès réservé | `ShieldCheck` | Gris bleuté | ~16 px | Très petit. |

## 19.4 Limites de l’extraction PNG

Le PNG permet d’extraire des crops visuels fidèles, mais il ne permet pas toujours d’obtenir des icônes propres comme des assets vectoriels. Les limites principales observées :

- les icônes de tableau sont parfois très petites ;
- certains pictogrammes sont intégrés dans des fonds colorés ou des pastilles ;
- certains éléments contiennent déjà une ombre, un arrondi ou une couleur de card ;
- le fond transparent n’est pas toujours garanti, car les maquettes sont des images aplaties ;
- les crops doivent être considérés comme des références visuelles, pas forcément comme des assets finaux de production.

Règle recommandée pour le code :

```txt
1. Utiliser Lucide React pour les icônes standards.
2. Garder les crops PNG uniquement comme référence visuelle ou asset temporaire.
3. Recréer les icônes métier spécifiques en SVG si Lucide React ne suffit pas.
4. Conserver les tailles, couleurs, arrondis et wrappers visibles dans la maquette.
5. Ne pas inventer d’icônes supplémentaires non visibles dans les maquettes.
```

## 19.5 Icônes trop petites ou à confirmer avant intégration finale

Les icônes suivantes sont extraites mais leur usage final devrait plutôt passer par une icône vectorielle de bibliothèque, car le crop PNG est trop petit pour être utilisé proprement en production :

- `icon_login_footer_france_flag.png` : crop très petit ; l’équivalent code peut être un emoji drapeau, un asset SVG dédié ou aucun pictogramme selon arbitrage.
- `icon_users_action_edit.png` : action tableau très petite ; utiliser `Pencil` en SVG.
- `icon_users_action_menu.png` : action tableau très petite ; utiliser `MoreVertical` en SVG.
- `icon_onboarding_tab_users.png`, `icon_onboarding_tab_vehicles.png`, `icon_onboarding_tab_templates.png`, `icon_onboarding_tab_depots.png`, `icon_onboarding_tab_absences.png` : icônes d’onglets très petites ; utiliser des SVG Lucide.
- `icon_privacy_breadcrumb_home.png` : fil d’Ariane très petit ; utiliser `Home` en SVG.
- `icon_privacy_footer_shield.png` : footer très petit ; utiliser `ShieldCheck` en SVG.

Pour les formes exactes non totalement confirmables depuis le PNG, appliquer la règle : **INFORMATION NON FOURNIE — À CONFIRMER**.

## 19.6 Livrables associés à la V1.1

Les fichiers associés à ce complément sont :

- dossier d’exports : `icons_maquettes_v1_1/` ;
- archive téléchargeable : `icons_maquettes_v1_1.zip` ;
- liste récapitulative : `icons_maquettes_v1_1/LISTE_ICONES_EXPORTÉES.md` ;
- tableau CSV : `icons_maquettes_v1_1/TABLE_MAPPING_ICONES.csv` ;
- planche de contrôle visuel : `icons_maquettes_v1_1/CONTACT_SHEET_ICONES_V1_1.png`.
