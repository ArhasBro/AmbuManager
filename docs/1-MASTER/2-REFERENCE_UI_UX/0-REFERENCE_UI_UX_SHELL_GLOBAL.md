# Ambulance Manager — Référence UI/UX — Shell global / navigation

Version : V2
Statut : référence UI/UX codable
Objectif : reproduction visuelle 99 %
Source visuelle : docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/0-Shell-Global/Shell-Global_V2.png
Source fonctionnelle : docs/1-MASTER/3-FONCTIONNALITES/0-FONCTIONNALITES_DETAILLEES_SHELL_GLOBAL_NAVIGATION_V1.md

## Sommaire
- [1. Objectif du document](#1-objectif-du-document)
- [2. Sources utilisées](#2-sources-utilisees)
- [3. Règle d’autorité](#3-regle-dautorite)
- [4. Objectif UX de la page](#4-objectif-ux-de-la-page)
- [5. Rôle métier de la page](#5-role-metier-de-la-page)
- [6. Structure générale de l’écran](#6-structure-generale-de-lecran)
- [7. Layout desktop attendu](#7-layout-desktop-attendu)
- [8. Hiérarchie visuelle](#8-hierarchie-visuelle)
- [9. Zones principales de l’écran](#9-zones-principales-de-lecran)
- [10. Détail de chaque zone](#10-detail-de-chaque-zone)
- [11. Composants visibles](#11-composants-visibles)
- [12. Composants réutilisables à prévoir](#12-composants-reutilisables-a-prevoir)
- [13. Cards](#13-cards)
- [14. Tableaux / listes](#14-tableaux-listes)
- [15. Filtres / recherche](#15-filtres-recherche)
- [16. Boutons / actions](#16-boutons-actions)
- [17. Badges / statuts](#17-badges-statuts)
- [18. Panneaux de détail](#18-panneaux-de-detail)
- [19. Onglets, si applicable](#19-onglets-si-applicable)
- [20. États visuels à prévoir](#20-etats-visuels-a-prevoir)
- [21. Règles d’ergonomie métier](#21-regles-dergonomie-metier)
- [22. Règles de permissions visibles](#22-regles-de-permissions-visibles)
- [23. Responsive futur](#23-responsive-futur)
- [24. Ce qui doit être codé plus tard](#24-ce-qui-doit-etre-code-plus-tard)
- [25. Ce qui ne doit pas être codé](#25-ce-qui-ne-doit-pas-etre-code)
- [26. Interdictions de dérive](#26-interdictions-de-derive)
- [27. Checklist de conformité visuelle 99 %](#27-checklist-de-conformite-visuelle-99)

## 1. Objectif du document
Définir précisément le Shell global commun aux pages connectées : navigation latérale, header supérieur, zone de contenu, zone utilisateur.

## 2. Sources utilisées
- Maquette active `Shell-Global_V2.png`.
- Fiche détaillée Shell global/navigation V1.

## 3. Règle d’autorité
1. Maquette V2 Shell global.
2. Fiche Shell global/navigation.
3. Compléments transverses si non contradictoires.

## 4. Objectif UX de la page
Permettre un repérage immédiat du module actif, des actions globales et de l’identité de session, sans distraire le travail métier.

## 5. Rôle métier de la page
Support transverse : cette page n’exécute pas la logique métier, elle structure toutes les pages métier.

## 6. Structure générale de l’écran
- Colonne gauche fixe : identité produit + menu + thème + carte utilisateur.
- Bandeau haut fixe : société, thème, utilisateur, déconnexion.
- Zone droite principale : rendu de la page active.

## 7. Layout desktop attendu
- Sidebar pleine hauteur.
- Header en haut de la zone contenu.
- Espace principal scrollable pour les pages longues.
- Marges internes régulières dans la zone contenu.

## 8. Hiérarchie visuelle
- Niveau 1 : module actif (item sidebar en surbrillance).
- Niveau 2 : titre de page dans le contenu.
- Niveau 3 : actions globales header.
- Niveau 4 : préférences thème et profil bas de sidebar.

## 9. Zones principales de l’écran
- Bloc marque `Ambulance Manager` + badge `ALPHA`.
- Menu latéral métier.
- Bloc thème latéral.
- Bloc utilisateur latéral.
- Header droit avec sélecteur société et session.
- Contenu de page encapsulé.

## 10. Détail de chaque zone
- Marque : logo ambulance + nom sur 2 lignes + badge `ALPHA`.
- Navigation : icône + libellé, item actif sur fond bleuté.
- Thème : contrôle binaire avec icônes soleil/lune.
- Profil latéral : avatar, nom, rôle.
- Header : société courante, thème compact, identité, déconnexion.

## 11. Composants visibles
- `SidebarBrand`
- `SidebarNavItem`
- `SidebarThemeSwitch`
- `SidebarUserCard`
- `HeaderCompanySelect`
- `HeaderThemeToggle`
- `HeaderUserMenu`
- `HeaderLogout`
- `PageContainer`

## 12. Composants réutilisables à prévoir
- Gabarit `AppShell`.
- `NavSection` pour groupes de menu.
- `UserIdentityInline`.
- `PermissionGuardNav` pour masquage des entrées non autorisées.

## 13. Cards
- Carte thème et carte utilisateur en bas de sidebar.
- Fond blanc, bordure légère, rayon arrondi.

## 14. Tableaux / listes
Non applicable directement au Shell, mais le Shell doit laisser la largeur utile pour les tableaux métier.

## 15. Filtres / recherche
Aucune recherche globale en V1.

## 16. Boutons / actions
- Action globale explicite : `Déconnexion`.
- Menu utilisateur minimal.
- Pas de bouton `création rapide` global.

## 17. Badges / statuts
- Badge produit `ALPHA` à conserver près du nom de marque.

## 18. Panneaux de détail
Le Shell n’impose pas de panneau, mais doit prévoir une zone principale compatible avec panneau latéral droit des pages complexes.

## 19. Onglets, si applicable
Non applicable au Shell lui-même.

## 20. États visuels à prévoir
- Session chargée.
- Chargement navigation.
- Erreur chargement navigation.
- Route non autorisée `Accès refusé`.

## 21. Règles d’ergonomie métier
- Navigation constante entre modules sans rupture visuelle.
- Élément actif toujours visible.
- Nommage côté menu conforme aux termes validés.

## 22. Règles de permissions visibles
- Entrées non autorisées masquées.
- Accès direct URL non autorisé bloqué avec vue d’accès refusé.
- Cohérence stricte entre ce qui est visible et ce qui est accessible.

## 23. Responsive futur
- Sidebar potentiellement repliable.
- Header conservé en haut avec actions essentielles.
- Menu mobile à tiroir ultérieurement.

## 24. Ce qui doit être codé plus tard
- Composants shell réutilisables.
- Guards de permissions navigation.
- États de chargement/erreur shell.

## 25. Ce qui ne doit pas être codé
- Recherche globale.
- Notifications globales.
- Création rapide transverse.
- Entrée métier principale `Privacy`.

## 26. Interdictions de dérive
- Ne pas renommer les modules métier validés.
- Ne pas afficher `Templates` ou `Onboarding` dans la navigation active.
- Ne pas exposer d’informations techniques/debug.

## 27. Checklist de conformité visuelle 99 %
- Sidebar gauche fixe, header haut fixe, contenu à droite.
- Item actif clairement mis en avant.
- Blocs thème/profil positionnés en bas sidebar.
- Header incluant société, identité utilisateur, déconnexion.
- Aucune fonction globale hors périmètre V1.
- Permissions navigation respectées visuellement et fonctionnellement.
- INFORMATION NON FOURNIE — À CONFIRMER : niveau exact de détail d’identité utilisateur à afficher en permanence.
