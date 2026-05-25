# Ambulance Manager — Référence UI/UX — Utilisateurs / RH

Version : V2  
Statut : référence UI/UX codable  
Objectif : reproduction visuelle 99 %  
Source visuelle : docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/5-Utilisateurs-RH/Utilisateurs_V2.png
Source fonctionnelle : docs/1-MASTER/3-FONCTIONNALITES/5-FONCTIONNALITES_DETAILLEES_UTILISATEURS_V1.1.md  

## Sommaire
- [1. Objectif du document](#1-objectif-du-document)
- [2. Sources utilisées](#2-sources-utilisées)
- [3. Règle d’autorité](#3-règle-dautorité)
- [4. Rôle de la page Utilisateurs / RH](#4-rôle-de-la-page-utilisateurs--rh)
- [5. Objectif UX de la page](#5-objectif-ux-de-la-page)
- [6. Structure générale de l’écran](#6-structure-générale-de-lécran)
- [7. Layout desktop attendu](#7-layout-desktop-attendu)
- [8. En-tête de page](#8-en-tête-de-page)
- [9. Actions principales](#9-actions-principales)
- [10. Recherche et filtres](#10-recherche-et-filtres)
- [11. KPI et tuiles de synthèse](#11-kpi-et-tuiles-de-synthèse)
- [12. Tableau des utilisateurs](#12-tableau-des-utilisateurs)
- [13. Colonne identité](#13-colonne-identité)
- [14. Avatar et initiales](#14-avatar-et-initiales)
- [15. Nom prénom et hiérarchie d’affichage](#15-nom-prénom-et-hiérarchie-daffichage)
- [16. Colonne contact](#16-colonne-contact)
- [17. Colonne rôles](#17-colonne-rôles)
- [18. Colonne base / dépôt](#18-colonne-base--dépôt)
- [19. Colonne statut du compte](#19-colonne-statut-du-compte)
- [20. Colonne état opérationnel](#20-colonne-état-opérationnel)
- [21. Colonne absences et indisponibilités](#21-colonne-absences-et-indisponibilités)
- [22. Colonne actions](#22-colonne-actions)
- [23. Panneau détail utilisateur](#23-panneau-détail-utilisateur)
- [24. Onglets ou sections RH visibles](#24-onglets-ou-sections-rh-visibles)
- [25. Création utilisateur](#25-création-utilisateur)
- [26. Modification utilisateur](#26-modification-utilisateur)
- [27. Réinitialisation mot de passe](#27-réinitialisation-mot-de-passe)
- [28. Désactivation réactivation archivage restauration](#28-désactivation-réactivation-archivage-restauration)
- [29. Badges et statuts visuels](#29-badges-et-statuts-visuels)
- [30. Boutons et actions](#30-boutons-et-actions)
- [31. États visuels à prévoir](#31-états-visuels-à-prévoir)
- [32. Hiérarchie visuelle](#32-hiérarchie-visuelle)
- [33. Espacements dimensions et densité](#33-espacements-dimensions-et-densité)
- [34. Couleurs et ambiance visuelle](#34-couleurs-et-ambiance-visuelle)
- [35. Typographie](#35-typographie)
- [36. Icônes](#36-icônes)
- [37. Règles de permissions visibles](#37-règles-de-permissions-visibles)
- [38. Règles d’ergonomie métier](#38-règles-dergonomie-métier)
- [39. Composants réutilisables futurs](#39-composants-réutilisables-futurs)
- [40. Stratégie Tailwind future](#40-stratégie-tailwind-future)
- [41. Responsive futur](#41-responsive-futur)
- [42. Accessibilité minimale](#42-accessibilité-minimale)
- [43. Ce qui doit être codé plus tard](#43-ce-qui-doit-être-codé-plus-tard)
- [44. Ce qui ne doit pas être codé](#44-ce-qui-ne-doit-pas-être-codé)
- [45. Interdictions de dérive](#45-interdictions-de-dérive)
- [46. Checklist de conformité visuelle 99 %](#46-checklist-de-conformité-visuelle-99-)

## 1. Objectif du document
Ce document décrit la référence UI/UX codable de la page **Utilisateurs / RH** à partir de la maquette V2 et de la fiche fonctionnelle V1.1.

Il sert à préparer un développement fidèle visuellement (objectif 99 %) sans déclarer la fonctionnalité comme validée définitivement sur le plan métier.

## 2. Sources utilisées
- Source visuelle : `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/5-Utilisateurs-RH/Utilisateurs_V2.png`.
- Source fonctionnelle : `docs/1-MASTER/3-FONCTIONNALITES/5-FONCTIONNALITES_DETAILLEES_UTILISATEURS_V1.1.md`.
- Source exclue : aucun code applicatif existant n’est utilisé comme source visuelle.

## 3. Règle d’autorité
1. Maquette `Utilisateurs_V2.png`.
2. Fiche fonctionnalités Utilisateurs / RH V1.1.
3. Aucune hypothèse quand l’information n’est pas visible ni explicitée.
4. Aucun ancien fichier UI/UX comme référence.
5. Aucun code existant comme source visuelle.

## 4. Rôle de la page Utilisateurs / RH
La page **Utilisateurs / RH** centralise la gestion des comptes utilisateurs d’une société : consultation, création, modification, rôle principal, rôles complémentaires, permissions, statut de compte, archivage et actions de gestion associées.

## 5. Objectif UX de la page
- Permettre une lecture immédiate de qui est actif, quel rôle est porté, et quelles actions sont autorisées.
- Réduire les erreurs de gestion RH opérationnelle en séparant visuellement les notions suivantes : statut du compte, archivage, état opérationnel.
- Garder un niveau de densité élevé mais lisible pour usage back-office B2B quotidien.

## 6. Structure générale de l’écran
La page est affichée dans un Shell SaaS desktop avec trois zones visibles.

- Barre latérale gauche de navigation produit.
- Barre supérieure globale du Shell (société active, profil connecté, déconnexion).
- Zone contenu page Utilisateurs / RH avec enchaînement vertical : en-tête, KPI, filtres, bloc principal à deux colonnes.

## 7. Layout desktop attendu
- Format maquette observé : 1536 x 1024.
- Barre latérale gauche fixe visuellement (navigation principale).
- Contenu principal à droite de la sidebar.
- Dans le contenu principal, bloc central en deux colonnes : colonne gauche majoritaire pour la liste utilisateurs, colonne droite secondaire pour les cartes d’analyse.
- Aucun panneau détail RH latéral ouvert sur la capture principale.

## 8. En-tête de page
En-tête contenu Utilisateurs / RH visible en haut de la zone page.

- Titre exact : **Utilisateurs / RH**.
- Sous-titre exact : **Gérez les utilisateurs, leurs rôles, permissions et accès au système.**
- Actions d’en-tête alignées à droite : `Importer des utilisateurs` puis `Nouvel utilisateur`.

## 9. Actions principales
Actions visibles dans la maquette.

- `Importer des utilisateurs` : bouton secondaire contour.
- `Nouvel utilisateur` : bouton primaire plein bleu avec icône `+`.
- Actions rapides latérales : `Gérer les rôles`, `Gérer les équipes`.

Actions métier à documenter pour implémentation (soumises aux permissions).

- Consulter.
- Créer.
- Modifier.
- Modifier rôle.
- Modifier permissions.
- Réinitialiser mot de passe.
- Désactiver.
- Réactiver.
- Archiver.
- Consulter archivés.
- Restaurer / désarchiver.
- Consulter ou gérer absences / indisponibilités.

## 10. Recherche et filtres
Zone filtres visible entre KPI et tableau.

- Champ recherche avec icône loupe et placeholder : `Rechercher un utilisateur...`.
- Filtre `Statut` (valeur visible : `Tous`).
- Filtre `Rôle` (valeur visible : `Tous`).
- Filtre `Équipe` (valeur visible : `Toutes`).
- Bouton `Filtres` (icône filtre).
- Bouton d’affichage complémentaire icône liste (fonction visible mais comportement non détaillé dans la fiche).

Filtres métier attendus par la fiche V1.1.

- Nom, prénom, email.
- Rôle.
- Statut du compte.
- État opérationnel.
- Base / dépôt.
- Archivés via filtre dédié.

## 11. KPI et tuiles de synthèse
Quatre tuiles visibles sur une ligne.

- `Utilisateurs actifs` : `27` et sous-texte `sur 32 utilisateurs`.
- `Administrateurs` : `5` et sous-texte `rôles avec accès admin`.
- `Rôles définis` : `8` et sous-texte `rôles dans le système`.
- `Équipes / Services` : `6` et sous-texte `organisations internes`.

Chaque tuile contient une icône dans un cercle coloré, un libellé, une valeur principale et un sous-texte.

## 12. Tableau des utilisateurs
Titre de carte : `Liste des utilisateurs (32)`.

Colonnes visibles dans l’ordre exact de la maquette.

- Utilisateur.
- Rôle.
- Équipe / Service.
- Statut.
- Dernière connexion.
- Actions.

Autres éléments visibles.

- 8 lignes affichées dans la vue courante.
- Pied de liste : `Affichage 1 à 8 sur 32 utilisateurs`.
- Pagination pages `1 2 3 4` avec chevrons précédent/suivant.
- Sélecteur `Lignes par page` avec valeur visible `25`.

## 13. Colonne identité
La colonne `Utilisateur` regroupe les informations d’identité visibles.

- Avatar rond à gauche.
- Bloc texte principal (nom affiché).
- Email sous le nom.
- Badge `Vous` visible sur la ligne de l’utilisateur connecté.

Règle métier à appliquer au codage : structure identité conforme à la fiche (nom au-dessus du prénom), sans dégrader l’alignement visuel de la maquette.

## 14. Avatar et initiales
Règles à respecter.

- L’avatar utilise des **initiales choisies manuellement** lors de la création.
- Les initiales ne sont pas auto-déduites obligatoirement du prénom/nom.
- L’avatar est un repère d’identité compact dans la liste dense.

La maquette montre un style rond neutre ; la règle fonctionnelle impose le principe des initiales.

## 15. Nom prénom et hiérarchie d’affichage
Règle métier explicite à respecter dans la référence codable.

- Le **nom** est affiché au-dessus du **prénom**.
- Cette hiérarchie est prioritaire sur toute simplification de rendu.
- Si le design final affiche une forme condensée en liste, le panneau détail doit conserver explicitement cette hiérarchie.

## 16. Colonne contact
Dans la maquette, le contact est intégré à la colonne identité via l’email sous le nom.

Règles issues de la fiche V1.1.

- Email obligatoire.
- Téléphone affichable dans la zone contact utilisateur.
- L’email sert d’identifiant de connexion.

Consigne de codage : prévoir un composant contact capable d’afficher **email + téléphone**, même si seul l’email est visible dans la capture principale.

## 17. Colonne rôles
La maquette affiche une colonne `Rôle` avec badges colorés.

- Exemples visibles : `Administrateur`, `Responsable RH`, `Responsable Planning`, `Chef d’équipe`, `Ambulancier`, `Secrétaire`.

Règles métier à appliquer.

- 1 rôle principal obligatoire.
- Multi-rôle autorisé.
- Maximum 3 rôles par utilisateur : 1 principal + jusqu’à 2 complémentaires.

Consigne UI : afficher clairement le rôle principal, puis les rôles complémentaires sans surcharge visuelle.

## 18. Colonne base / dépôt
- La capture affiche la colonne `Équipe / Service`.
- La fiche V1.1 impose aussi la notion `Base / dépôt` dans la liste métier.

Règle de référence : ne pas inventer un affichage absent de la maquette. Prévoir une zone compatible pour le rattachement base/dépôt lors du codage, en conservant la densité de colonne actuelle.

## 19. Colonne statut du compte
Le `Statut` visible en maquette correspond au statut de compte.

États à distinguer.

- `Actif`.
- `Inactif`.

Règle métier.

- Un utilisateur inactif ne peut pas se connecter.
- Un inactif reste historisé et peut être réactivé selon permissions.

## 20. Colonne état opérationnel
État opérationnel attendu côté métier.

- Présent.
- Absent.
- Indisponible.
- Non planifié.

Dans la capture principale, cette colonne n’est pas explicitement séparée du statut de compte. La référence impose de **ne jamais fusionner** les deux notions lors du codage.

## 21. Colonne absences et indisponibilités
- Aucune colonne dédiée `Absences / indisponibilités` n’est visible dans la capture principale.
- La fiche V1.1 impose la gestion de demandes d’absence/indisponibilité et leurs statuts.

Consigne de référence.

- Prévoir l’emplacement fonctionnel futur (liste, panneau détail, ou action dédiée) sans inventer un rendu absent de la maquette.
- Ne pas transformer `non planifié` en `absent`.

## 22. Colonne actions
Colonne `Actions` visible à droite de chaque ligne.

- Bouton icône crayon (édition).
- Bouton menu `...` (actions supplémentaires contextualisées).

Actions disponibles à brancher selon permissions.

- Consulter.
- Modifier.
- Modifier rôle.
- Modifier permissions.
- Réinitialiser mot de passe.
- Désactiver / réactiver.
- Archiver / restaurer.
- Actions liées aux absences / indisponibilités.

## 23. Panneau détail utilisateur
- Aucun panneau détail ouvert n’est visible sur la capture principale.
- La fiche V1.1 décrit une fiche détail utilisateur en consultation/modification.

Consigne de référence codable.

- Prévoir un panneau/zone détail réutilisable pour afficher identité, rôles, statuts séparés, base/dépôt, demandes d’absence, actions sensibles.
- Le panneau ne doit pas être supposé toujours visible en desktop.

## 24. Onglets ou sections RH visibles
- Aucun onglet explicite n’est visible dans la capture principale.
- Sections RH latérales visibles : `Répartition par équipe`, `Activités récentes`, `Actions rapides`.

Consigne : si un futur détail RH introduit des onglets, respecter la hiérarchie maquette actuelle et ne pas surcharger la vue liste.

## 25. Création utilisateur
Déclencheur visible.

- Bouton `Nouvel utilisateur`.

Règles métier à intégrer au futur formulaire.

- Pas d’inscription libre.
- Nom, prénom, initiales avatar.
- Email obligatoire, téléphone.
- Rôle principal obligatoire.
- Jusqu’à 2 rôles complémentaires.
- Statut actif/inactif.
- Base/dépôt selon modèle retenu.
- Mot de passe initial géré séparément selon règles Alpha.

## 26. Modification utilisateur
Action visible via icône crayon et menu actions.

Règles métier.

- Pas de suppression physique.
- Modification des rôles et permissions uniquement si autorisé.
- Traçabilité des changements sensibles (à appliquer côté implémentation réelle).
- Un inactif ou archivé ne doit pas être proposé pour nouvelles affectations.

## 27. Réinitialisation mot de passe
Règle obligatoire.

- Action séparée du formulaire principal utilisateur.
- Visible uniquement pour profils autorisés.
- Ne jamais afficher l’ancien mot de passe.
- Ne pas inclure cette action dans l’édition générale de profil.

## 28. Désactivation réactivation archivage restauration
Cycle d’état à distinguer sans mélange.

- Statut compte : actif / inactif.
- Archivage : non archivé / archivé.
- État opérationnel : présent / absent / indisponible / non planifié.

Règles impératives.

- Archivé masqué de la liste courante sauf filtre dédié.
- Restauration (désarchivage) ne réactive pas automatiquement un compte inactif.
- Aucune suppression physique en Alpha.

## 29. Badges et statuts visuels
Badges visibles dans la maquette.

- Badge rôle dans la colonne `Rôle`.
- Badge statut `Actif` (vert) / `Inactif` (rouge).
- Badge contexte `Vous` pour l’utilisateur connecté.

Contraintes visuelles.

- Badges compacts, lisibles, sans collision dans les lignes denses.
- Couleur + texte (ne pas s’appuyer uniquement sur la couleur).
- Cohérence d’alignement horizontal entre lignes.

## 30. Boutons et actions
Typologies visibles.

- Bouton primaire plein : `Nouvel utilisateur`.
- Bouton secondaire contour : `Importer des utilisateurs`, `Filtres`, actions rapides.
- Boutons icône : édition ligne, menu ligne, navigation pagination.

Comportements UI minimaux à prévoir.

- Hover visible.
- Focus clavier visible.
- Disabled explicite.
- Confirmation pour actions destructrices logiques (désactiver, archiver, restaurer), sans suppression physique.

## 31. États visuels à prévoir
États d’interface nécessaires pour le codage futur.

- Chargement initial de page.
- Chargement de tableau.
- État vide global (aucun utilisateur).
- État vide filtré (aucun résultat).
- État erreur chargement.
- État sans droits suffisants.
- État archivés (via filtre dédié).

## 32. Hiérarchie visuelle
Ordre de lecture observé.

1. Titre `Utilisateurs / RH` et sous-titre.
2. Actions d’en-tête.
3. KPI synthèse.
4. Recherche et filtres.
5. Tableau principal.
6. Cartes latérales d’analyse et d’actions rapides.

Le tableau reste la zone dominante de décision opérationnelle.

## 33. Espacements dimensions et densité
Référentiel de densité visuelle à conserver.

- Grille desktop stable avec sidebar fixe et contenu aéré.
- Cartes KPI alignées sur une même hauteur.
- Barre filtres sur une ligne desktop.
- Tableau dense lisible avec hauteur de ligne intermédiaire.
- Actions ligne compactes dans une colonne finale étroite.
- Colonne latérale droite visuellement séparée, sans rivaliser avec la table.

Règle stricte : ajuster les valeurs chiffrées finales sur la maquette pixel-level lors du codage, sans simplifier la densité.

## 34. Couleurs et ambiance visuelle
Ambiance visuelle observée.

- Fond global clair légèrement bleuté.
- Cartes blanches avec bordures fines discrètes.
- Couleur primaire bleue pour CTA et éléments actifs.
- Accents colorés pour rôles, statuts et graphiques.

Repères colorimétriques relevés sur la maquette (approche visuelle de référence).

- Bleu primaire CTA et éléments actifs : famille `#166EFE`.
- Vert statut actif : famille `#1AB657` avec fond vert très clair.
- Rouge statut inactif : famille `#FD6672` avec fond rouge très clair.
- Violet badge rôle RH : famille `#8F44F8` avec fond lavande clair.
- Orange badge rôle planning : famille orange clair avec fond crème.

## 35. Typographie
Hiérarchie visible.

- Titre page fort, sombre, très lisible.
- Sous-titre plus discret.
- Libellés de colonnes et filtres en taille réduite.
- Valeurs KPI en emphase numérique.
- Texte de ligne tableau compact.

Consigne : préserver la hiérarchie de poids et tailles de la maquette, sans compression excessive.

## 36. Icônes
Icônes visibles sur la page.

- `+` (nouvel utilisateur).
- Import (import utilisateurs).
- Loupe (recherche).
- Filtre.
- Liste/affichage.
- Crayon (édition).
- Ellipsis `...` (menu actions).
- Icônes illustratives dans KPI et cartes latérales.

Règle : style iconographique cohérent, contour léger, centrage vertical strict dans boutons et badges.

## 37. Règles de permissions visibles
Principes à respecter côté UI.

- Les actions sensibles apparaissent uniquement si permission présente.
- La réinitialisation du mot de passe n’est visible que pour profils autorisés.
- Modifier rôle et permissions fines uniquement pour profils autorisés.
- Aucun utilisateur ne peut s’accorder seul des droits supérieurs.

Règle d’implémentation future : ces permissions doivent être réellement appliquées côté accès serveur, pas seulement masquées côté interface.

## 38. Règles d’ergonomie métier
Règles métier UI essentielles.

- Ne pas mélanger statut du compte, archivage et état opérationnel.
- Un utilisateur non planifié n’est pas automatiquement absent.
- Un utilisateur inactif ou archivé n’est pas proposé pour nouvelles affectations.
- Les données sensibles RH ne sont pas affichées sans permission.
- La page reste orientée gestion opérationnelle Alpha, pas dossier RH complet.

## 39. Composants réutilisables futurs
Composants à prévoir et documenter, sans les créer dans ce fix.

- `components/users/UsersPage`.
- `components/users/UsersTable`.
- `components/users/UserRow`.
- `components/users/UserIdentityCell`.
- `components/users/UserAvatarInitials`.
- `components/users/UserContactCell`.
- `components/users/UserRolesCell`.
- `components/users/UserStatusBadge`.
- `components/users/UserOperationalStateBadge`.
- `components/users/UserFilters`.
- `components/users/UserDetailPanel`.
- `components/users/UserForm`.
- `components/users/UserPasswordResetAction`.
- `components/users/UserArchiveAction`.
- `components/ui/PageHeader`.
- `components/ui/Card`.
- `components/ui/Table`.
- `components/ui/Badge`.
- `components/ui/Button`.
- `components/ui/Input`.
- `components/ui/Select`.
- `components/ui/EmptyState`.
- `components/ui/LoadingState`.

## 40. Stratégie Tailwind future
Stratégie à documenter pour codage futur, sans créer de configuration.

- Grille page : shell + contenu + colonne secondaire.
- Largeur tableau : dominante, priorité de lecture.
- Panneau détail : zone dédiée rétractable/conditionnelle.
- Padding contenu : cohérent entre en-tête, KPI, filtres, table.
- Gap inter-zones : constant pour rythme visuel.
- Rayons de cartes : modérés et homogènes.
- Bordures : fines, peu contrastées.
- Ombres : légères, non agressives.
- Couleurs badges : par type (rôle, compte, opérationnel).
- Couleurs statut compte : actif/inactif strictement séparées.
- Couleurs état opérationnel : présent/absent/indisponible/non planifié distinctes.
- Tailles avatar : stables sur toutes les lignes.
- Densité tableau : compacte lisible.
- États `hover` / `focus` / `disabled` : explicites et cohérents.
- Responsive futur : desktop/tablette/mobile sans perte sémantique.

## 41. Responsive futur
Cible actuelle : desktop maquette.

Adaptations futures attendues.

- Table pouvant basculer en cartes denses sur petits écrans.
- Filtres repliables en panneau mobile.
- Colonne droite repositionnée sous la liste.
- Actions ligne regroupées proprement sans perte de permissions visibles.

Aucune maquette mobile n’est fournie ici : ne pas inventer un design final mobile, uniquement préparer la structure.

## 42. Accessibilité minimale
Exigences minimales pour implémentation future.

- Navigation clavier complète (filtres, table, actions).
- Focus visible sur tous les éléments interactifs.
- Texte lisible et contraste suffisant sur badges.
- Icônes accompagnées d’intitulés ou d’`aria-label` pertinents.
- Messages d’état explicites (loading, vide, erreur).
- Actions sensibles confirmées avec texte clair.

## 43. Ce qui doit être codé plus tard
À coder lors de l’implémentation, hors ce fix documentaire.

- Rendu complet de la page selon hiérarchie maquette.
- Distinction stricte statut compte / archivage / état opérationnel.
- Gestion multi-rôle (1 principal + jusqu’à 2 complémentaires).
- Gestion permissions fines conditionnant les actions UI.
- Workflow réinitialisation mot de passe séparé.
- Workflow archivage/restauration sans suppression physique.
- États UI vides/loading/erreurs.
- Filtre dédié archivés.
- Prise en compte absences/indisponibilités selon permissions.

## 44. Ce qui ne doit pas être codé
Interdits de périmètre.

- Suppression physique utilisateur.
- Modification des rôles sans permission.
- Auto-attribution de droits supérieurs.
- Fusion des statuts compte/archivage/opérationnel.
- Assimiler `non planifié` à `absent`.
- Affichage de données RH sensibles sans permission.
- Gestion complète heures/paie en Alpha.
- Recyclage formations en Alpha si non validé.
- Visite médicale en Alpha si non validé.
- Signature électronique.
- Preuve mobile.
- Debug visible.
- JSON visible.
- Anciens libellés non validés.

## 45. Interdictions de dérive
- Ne pas remplacer la maquette par une interprétation “propre” mais différente.
- Ne pas retirer des badges, colonnes ou cartes visibles pour simplifier.
- Ne pas introduire de logique non sourcée par maquette ou fiche V1.1.
- Ne pas présenter cette référence UI/UX comme validation fonctionnelle définitive.
- Ne pas contourner les règles de permissions côté implémentation future.

## 46. Checklist de conformité visuelle 99 %
- [ ] Titre page exact `Utilisateurs / RH` et sous-titre exact.
- [ ] Deux actions d’en-tête présentes dans le bon ordre visuel.
- [ ] 4 KPI avec libellés et valeurs visibles conformes.
- [ ] Barre recherche + filtres conforme (recherche, statut, rôle, équipe, filtres).
- [ ] Bloc principal en deux colonnes (table majoritaire à gauche, cartes à droite).
- [ ] Tableau avec colonnes visibles : Utilisateur, Rôle, Équipe / Service, Statut, Dernière connexion, Actions.
- [ ] Identité utilisateur avec avatar, nom/prénom hiérarchisés et contact.
- [ ] Avatar à initiales prévu selon règle métier (saisie manuelle à la création).
- [ ] Rôle principal obligatoire et multi-rôle limité à 3 rôles maximum.
- [ ] Statut du compte clairement séparé de l’archivage.
- [ ] État opérationnel distinct des autres statuts.
- [ ] Non planifié non assimilé à absent.
- [ ] Archivage masqué de la liste courante sauf filtre dédié.
- [ ] Aucune suppression physique présente.
- [ ] Réinitialisation mot de passe séparée du formulaire principal.
- [ ] Actions sensibles conditionnées par permissions.
- [ ] Badges lisibles, cohérents, non ambigus.
- [ ] États loading/vide/erreur prévus.
- [ ] Pagination et lignes par page prévues.
- [ ] Aucune fonctionnalité hors périmètre Alpha injectée dans la page.
- [ ] Référence UI/UX explicitement distinguée d’une validation fonctionnelle définitive.
