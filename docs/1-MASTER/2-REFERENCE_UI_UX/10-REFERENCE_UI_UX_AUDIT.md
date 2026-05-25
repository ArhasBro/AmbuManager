# Ambulance Manager — Référence UI/UX — Audit

Version : V2  
Statut : référence UI/UX codable  
Objectif : reproduction visuelle 99 %  
Source visuelle : docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/10-Audit/Audit_V2.png  
Source fonctionnelle : docs/1-MASTER/3-FONCTIONNALITES/10-FONCTIONNALITES_DETAILLEES_AUDIT_V1.md  

## Sommaire
- [1. Objectif du document](#1-objectif-du-document)
- [2. Sources utilisées](#2-sources-utilisées)
- [3. Règle d’autorité](#3-règle-dautorité)
- [4. Rôle de la page Audit](#4-rôle-de-la-page-audit)
- [5. Objectif UX de la page](#5-objectif-ux-de-la-page)
- [6. Structure générale de l’écran](#6-structure-générale-de-lécran)
- [7. Layout desktop attendu](#7-layout-desktop-attendu)
- [8. En-tête de page](#8-en-tête-de-page)
- [9. Actions principales](#9-actions-principales)
- [10. Filtres et recherche](#10-filtres-et-recherche)
- [11. Filtre période](#11-filtre-période)
- [12. Filtre utilisateur](#12-filtre-utilisateur)
- [13. Filtre module](#13-filtre-module)
- [14. Filtre type d’action](#14-filtre-type-daction)
- [15. Filtre niveau ou criticité si visible](#15-filtre-niveau-ou-criticité-si-visible)
- [16. Tableau des événements d’audit](#16-tableau-des-événements-daudit)
- [17. Colonne date et heure](#17-colonne-date-et-heure)
- [18. Colonne utilisateur](#18-colonne-utilisateur)
- [19. Colonne module](#19-colonne-module)
- [20. Colonne action](#20-colonne-action)
- [21. Colonne élément concerné](#21-colonne-élément-concerné)
- [22. Colonne résultat ou statut](#22-colonne-résultat-ou-statut)
- [23. Colonne détails](#23-colonne-détails)
- [24. Panneau détail événement](#24-panneau-détail-événement)
- [25. Badges et statuts visuels](#25-badges-et-statuts-visuels)
- [26. Pagination et volume de données](#26-pagination-et-volume-de-données)
- [27. Exports si visibles ou prévus](#27-exports-si-visibles-ou-prévus)
- [28. États visuels à prévoir](#28-états-visuels-à-prévoir)
- [29. Hiérarchie visuelle](#29-hiérarchie-visuelle)
- [30. Espacements dimensions et densité](#30-espacements-dimensions-et-densité)
- [31. Couleurs et ambiance visuelle](#31-couleurs-et-ambiance-visuelle)
- [32. Typographie](#32-typographie)
- [33. Icônes](#33-icônes)
- [34. Règles de permissions visibles](#34-règles-de-permissions-visibles)
- [35. Règles d’ergonomie métier](#35-règles-dergonomie-métier)
- [36. Composants réutilisables futurs](#36-composants-réutilisables-futurs)
- [37. Stratégie Tailwind future](#37-stratégie-tailwind-future)
- [38. Responsive futur](#38-responsive-futur)
- [39. Accessibilité minimale](#39-accessibilité-minimale)
- [40. Ce qui doit être codé plus tard](#40-ce-qui-doit-être-codé-plus-tard)
- [41. Ce qui ne doit pas être codé](#41-ce-qui-ne-doit-pas-être-codé)
- [42. Interdictions de dérive](#42-interdictions-de-dérive)
- [43. Checklist de conformité visuelle 99 %](#43-checklist-de-conformité-visuelle-99-)

## 1. Objectif du document
Ce document définit une référence UI/UX codable de la page `Audit` pour obtenir une reproduction visuelle cible à 99 % de la maquette V2.  
Il ne constitue pas une validation fonctionnelle définitive du module Audit.

## 2. Sources utilisées
- Source visuelle principale : `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/10-Audit/Audit_V2.png`.
- Source fonctionnelle secondaire : `docs/1-MASTER/3-FONCTIONNALITES/10-FONCTIONNALITES_DETAILLEES_AUDIT_V1.md`.
- Aucune source code applicative utilisée comme référence visuelle.

## 3. Règle d’autorité
1. Maquette `Audit_V2.png` (priorité absolue pour le rendu visuel).
2. Fiche fonctionnelle Audit V1 (priorité pour les règles métier non visibles en maquette).
3. Sans hypothèse non couverte par les deux sources.
4. Sans reprise d’anciens documents UI/UX comme autorité.
5. Sans usage du code existant comme source de design.

## 4. Rôle de la page Audit
La page `Audit` sert à consulter la traçabilité des actions sensibles réalisées dans le système.  
La page est une vue de consultation, non une vue d’édition.  
La page ne doit pas être présentée comme un écran de debug technique.

## 5. Objectif UX de la page
Permettre à un utilisateur autorisé de répondre rapidement et clairement aux questions suivantes :
- qui a fait l’action ;
- quand l’action a eu lieu ;
- sur quel module et quel élément ;
- avec quel résultat ;
- avec quel contexte de consultation autorisé.

## 6. Structure générale de l’écran
Structure observée dans la maquette :
- Shell applicatif avec navigation latérale gauche.
- Bandeau supérieur global (sélecteur société, actions de session/utilisateur).
- Zone de contenu page Audit.
- Rangée d’actions page (Exporter, Imprimer).
- Barre de filtres horizontale.
- Rangée de tuiles KPI audit.
- Tableau principal des événements.
- Panneau latéral droit de détail d’événement.
- Barre de pagination en bas du tableau.

## 7. Layout desktop attendu
Disposition desktop visible :
- Colonne gauche : navigation verticale fixe.
- Colonne principale centrale : filtres, KPI, tableau.
- Colonne droite : panneau `Détail de l'action` fixe visuellement au niveau du contenu.
- Tableau et panneau détail affichés simultanément.
- Le tableau reste l’élément dominant en largeur dans la zone centrale.

## 8. En-tête de page
Éléments visibles de l’en-tête de contenu Audit :
- Titre principal : `Audit`.
- Sous-texte : `Consultez l'historique des actions réalisées dans le système.`
- Actions en haut à droite de la zone page : bouton `Exporter`, bouton `Imprimer`.

## 9. Actions principales
Actions de consultation visibles dans la maquette :
- consulter la liste des événements ;
- filtrer les événements ;
- réinitialiser les filtres ;
- ouvrir/consulter un événement via sélection de ligne et panneau détail ;
- parcourir les pages ;
- ajuster le nombre d’éléments par page ;
- exporter (présent visuellement) ;
- imprimer (présent visuellement).

Actions métier explicitement exclues de l’interface Audit :
- modification d’un événement ;
- suppression d’un événement ;
- modification rétroactive d’une trace.

## 10. Filtres et recherche
Barre de filtres visible et dense, en une ligne desktop :
- Période.
- Utilisateur.
- Action.
- Module.
- Ressource.
- Résultat.
- Bouton `Réinitialiser`.
- Bouton `Filtres`.

Recherche texte :
- INFORMATION NON FOURNIE — À CONFIRMER : champ de recherche texte libre visible/non visible dans la version maquette affichée.
- Si ajout futur, la recherche doit respecter les permissions et ne jamais contourner le cloisonnement des droits.

## 11. Filtre période
Spécification visuelle du filtre période (maquette) :
- Carte de filtre avec icône calendrier à gauche.
- Affichage d’une plage date début/fin avec le séparateur `au`.
- Valeur visible en maquette : `16 mai 2025 au 16 mai 2025`.
- Format lisible métier en français (jour mois année), non format technique brut.

Comportement attendu :
- filtre appliqué à la liste des événements ;
- cohérence avec le total et la pagination.

## 12. Filtre utilisateur
Spécification visuelle :
- libellé `Utilisateur` ;
- valeur par défaut visible : `Tous` ;
- contrôle de type sélection (chevron de menu).

Fonction attendue :
- limiter les événements à un auteur.

## 13. Filtre module
Spécification visuelle :
- libellé `Module` ;
- valeur par défaut visible : `Tous` ;
- contrôle de type sélection.

Périmètre fonctionnel à couvrir selon fiche :
- connexions/authentification ;
- utilisateurs ;
- rôles/permissions ;
- véhicules ;
- suivi des véhicules ;
- planning ;
- modèles horaires ;
- société ;
- dépôts/bases ;
- support propriétaire si activé.

## 14. Filtre type d’action
Spécification visuelle :
- libellé `Action` ;
- valeur par défaut visible : `Toutes` ;
- contrôle de type sélection.

Exemples d’actions visibles dans le tableau :
- connexion réussie ;
- modification ;
- création ;
- suppression ;
- export de planning ;
- changement de rôle ;
- échec de connexion ;
- consultation ;
- déconnexion.

## 15. Filtre niveau ou criticité si visible
Constat visuel :
- aucun filtre explicitement libellé `Niveau` ou `Criticité` n’est visible en première ligne de filtres.
- un bouton `Filtres` est visible et peut porter des filtres additionnels.

Règle de rédaction codable :
- ne pas afficher un filtre criticité en premier niveau sans validation ;
- prévoir extension via panneau secondaire uniquement si validée fonctionnellement.

## 16. Tableau des événements d’audit
Nature de la zone :
- tableau dense, lisible, multi-colonnes.
- ordre visuel des lignes : du plus récent au plus ancien (heures décroissantes visibles).
- chaque ligne représente un événement d’audit consultable.

Contrainte métier :
- tableau de consultation uniquement ;
- aucune action destructive.

## 17. Colonne date et heure
En-tête visible : `Date / Heure`.  
Valeurs visibles au format `JJ/MM/AAAA HH:mm:ss` (exemple : `16/05/2025 14:32:21`).  
La date/heure est un repère principal et doit rester très lisible.

## 18. Colonne utilisateur
En-tête visible : `Utilisateur`.  
Contenu de cellule visible :
- pastille initiales (ex: `NA`, `MB`) ;
- nom/prénom affiché (ex: `Nathan A.`) ;
- rôle ou profil en sous-ligne (ex: `Admin`, `Ambulancière`, `Planificatrice`).

## 19. Colonne module
En-tête visible : `Module`.  
Valeurs visibles exemple :
- `Auth` ;
- `Planning` ;
- `Véhicules` ;
- `Utilisateurs` ;
- `Société`.

La colonne doit rester en libellés métier courts.

## 20. Colonne action
En-tête visible : `Action`.  
Contenu de cellule visible :
- icône d’action colorée ;
- libellé action lisible.

Exemples visibles :
- `Connexion réussie` ;
- `Modification` ;
- `Création` ;
- `Suppression` ;
- `Export de planning` ;
- `Changement de rôle` ;
- `Échec de connexion` ;
- `Consultation` ;
- `Déconnexion`.

## 21. Colonne élément concerné
La maquette nomme cette colonne `Ressource`.  
En-tête visible : `Ressource`.  
Exemples visibles :
- `User: nathan.a` ;
- `Affectation #1254` ;
- `Véhicule AB-123-CD` ;
- `Semaine 21 (19–25 mai)` ;
- `Dépôt Nord`.

## 22. Colonne résultat ou statut
En-tête visible : `Résultat`.  
Affichage en badges de statut.

Statuts visibles :
- `Succès` ;
- `Avertissement` ;
- `Échec`.

Règle UI :
- le libellé texte doit toujours être présent ;
- la couleur seule ne suffit pas à porter l’information.

## 23. Colonne détails
Constat visuel du tableau :
- aucune colonne textuelle intitulée `Détails` dans l’en-tête principal ;
- une action de ligne `…` (menu/consultation) est visible en dernière colonne non titrée.

Règle codable :
- conserver cette colonne d’actions de consultation discrète ;
- ne pas y ajouter d’actions d’édition/suppression.

## 24. Panneau détail événement
Panneau latéral droit visible : `Détail de l'action`, avec bouton de fermeture (X).  
Champs visibles dans l’ordre observé :
- Date / Heure ;
- Utilisateur ;
- Action ;
- Module ;
- Ressource ;
- Adresse IP ;
- Navigateur ;
- Système ;
- Résultat ;
- Détails ;
- ID de l’événement.

Exemples visibles de valeurs :
- `16/05/2025 14:32:21` ;
- `Nathan A.` (`Admin`) ;
- `Connexion réussie` ;
- `Auth` ;
- `User: nathan.a` ;
- `192.168.1.12` ;
- `Chrome 125.0.0.0` ;
- `Windows 11` ;
- `Succès` ;
- `Connexion via email et mot de passe` ;
- identifiant `evt_...`.

Règle de confidentialité :
- ces détails sont soumis aux permissions de consultation.

## 25. Badges et statuts visuels
Badges visibles :
- badge vert `Succès` ;
- badge orange `Avertissement` ;
- badge rouge `Échec`.

Autres badges visuels :
- badge vert d’action dans le panneau détail (`Connexion réussie`).

Contraintes :
- contraste suffisant texte/fond ;
- cohérence de couleur entre tableau et panneau détail ;
- pas de dépendance à la seule couleur.

## 26. Pagination et volume de données
Zone bas de tableau visible :
- compteur : `1 à 10 sur 142 résultats` ;
- commandes de pagination (premier, précédent, pages numérotées, suivant, dernier) ;
- sélecteur du nombre d’éléments par page (`10 / page`).

Règles de comportement :
- pagination cohérente avec filtres ;
- retour en page 1 recommandé après changement majeur de filtre ;
- conservation de la lisibilité en forte volumétrie.

## 27. Exports si visibles ou prévus
Visuel maquette :
- bouton `Exporter` présent en en-tête ;
- bouton `Imprimer` présent en en-tête.

Statut fonctionnel :
- présence UI validée visuellement ;
- périmètre exact export (format, champs, permissions fines) à confirmer fonctionnellement avant implémentation finale.

## 28. États visuels à prévoir
États nécessaires à documenter pour le futur codage :
- chargement des KPI et de la table ;
- liste vide globale sur période ;
- aucun résultat après filtres ;
- erreur de chargement reformulée en message utilisateur ;
- accès refusé pour utilisateur non autorisé.

Règle stricte :
- ne jamais afficher `undefined`, `null`, JSON brut, stack trace, logs serveur bruts.

## 29. Hiérarchie visuelle
Priorité visuelle attendue :
1. titre + compréhension de la page ;
2. filtres ;
3. KPI synthèse ;
4. tableau des événements ;
5. détail de l’événement sélectionné ;
6. pagination.

La hiérarchie doit soutenir une lecture rapide et une investigation métier sobre.

## 30. Espacements dimensions et densité
Densité observée :
- interface dense mais respirante ;
- cartes et cellules compactes ;
- espacement régulier horizontal/vertical.

Repères codables (non contractuels tant que non mesurés pixel-perfect) :
- sections séparées par des gouttières homogènes ;
- hauteur de ligne tableau optimisée pour lecture rapide ;
- marges internes suffisantes pour éviter l’écrasement visuel ;
- bords arrondis légers sur cartes et contrôles.

Règle de fidélité :
- viser un écart visuel quasi nul avec la maquette (tolérance micro-écarts techniques seulement).

## 31. Couleurs et ambiance visuelle
Ambiance visible :
- fond global clair ;
- palette principale bleue pour navigation et accents ;
- neutres doux pour bordures et surfaces ;
- statuts : vert/orange/rouge.

Usage attendu :
- bleu pour actions neutres et structure ;
- vert pour succès ;
- orange pour avertissement ;
- rouge pour échec ;
- aucun usage décoratif excessif de couleur hors sémantique.

## 32. Typographie
Style visible :
- sans-serif moderne ;
- titre `Audit` à forte emphase ;
- texte secondaire plus discret ;
- tableau en corps lisible compact ;
- sous-lignes utilisateur en taille réduite.

Règle :
- maintenir une échelle typographique stable entre en-tête, filtres, table et panneau détail.

## 33. Icônes
Icônes visibles :
- calendrier (période) ;
- filtre ;
- réinitialisation ;
- icônes d’action par ligne ;
- icônes d’état KPI ;
- icônes session/environnement du shell.

Règles :
- style d’icônes homogène ;
- taille cohérente dans chaque zone ;
- icône toujours accompagnée d’un libellé quand l’action est critique.

## 34. Règles de permissions visibles
Règles à respecter :
- page Audit réservée aux profils/permissions autorisés ;
- utilisateur non autorisé : entrée Audit masquée ou accès direct menant à `Accès refusé` ;
- consultation possible selon niveau de droit ;
- détails sensibles masqués si permission insuffisante ;
- aucune possibilité de contourner les droits par filtres/recherche/export.

## 35. Règles d’ergonomie métier
Principes métier obligatoires :
- Audit reste un journal de traçabilité métier lisible ;
- pas d’interface de debug technique ;
- vocabulaire métier compréhensible ;
- événements triés du plus récent au plus ancien sauf règle contraire explicite ;
- actions sensibles traçables par module ;
- données manquantes rendues proprement (jamais de fuite technique).

## 36. Composants réutilisables futurs
Composants à prévoir sans implémentation dans ce document :
- `components/audit/AuditPage` : composition de la page Audit.
- `components/audit/AuditFilters` : barre de filtres complète.
- `components/audit/AuditTable` : tableau des événements.
- `components/audit/AuditRow` : rendu d’une ligne d’événement.
- `components/audit/AuditModuleBadge` : badge module.
- `components/audit/AuditActionBadge` : badge action.
- `components/audit/AuditStatusBadge` : badge résultat/statut.
- `components/audit/AuditDetailPanel` : panneau droit de détail.
- `components/audit/AuditExportActions` : actions export/impression.
- `components/ui/PageHeader`.
- `components/ui/Card`.
- `components/ui/Table`.
- `components/ui/Badge`.
- `components/ui/Button`.
- `components/ui/Input`.
- `components/ui/Select`.
- `components/ui/DateRangePicker`.
- `components/ui/EmptyState`.
- `components/ui/LoadingState`.
- `components/ui/ErrorMessage`.

## 37. Stratégie Tailwind future
Stratégie de classes à cadrer ultérieurement (sans configuration ici) :
- grille de page en 3 zones (sidebar, contenu principal, détail) ;
- largeur maîtrisée du tableau ;
- largeur dédiée du panneau détail ;
- barre filtres en ligne desktop ;
- padding contenu homogène ;
- `gap` constant entre blocs ;
- rayons de cartes légers ;
- bordures fines neutres ;
- ombres légères ;
- couleurs sémantiques par module/action/résultat ;
- densité tableau contrôlée ;
- états `hover`, `focus`, `disabled` ;
- variantes responsive desktop/tablette/mobile futures.

## 38. Responsive futur
Projection responsive à documenter pour codage futur :
- desktop : table + panneau détail côte à côte (comme maquette).
- tablette : panneau détail potentiellement repliable ou sous le tableau.
- mobile : prioriser liste/ligne compacte, détail en vue secondaire.
- filtres : regroupement progressif (ligne puis tiroir selon largeur).

Règle :
- ne pas casser la lisibilité métier des colonnes clés (`Date/Heure`, `Utilisateur`, `Action`, `Résultat`).

## 39. Accessibilité minimale
Exigences minimales :
- focus visible sur boutons/filtres/pagination ;
- navigation clavier sur table et actions ;
- libellés explicites pour champs de filtre ;
- contraste lisible des textes et badges ;
- icônes non suffisantes seules ;
- messages d’état compréhensibles sans jargon technique.

## 40. Ce qui doit être codé plus tard
À implémenter ultérieurement selon cette référence :
- structure UI complète conforme maquette (shell inclus côté rendu page) ;
- logique de filtres et de pagination ;
- alimentation KPI ;
- sélection de ligne et synchronisation panneau détail ;
- gestion des états loading/vide/erreur/accès refusé ;
- contrôle d’accès et masquage des données sensibles ;
- export/impression selon validation fonctionnelle ;
- traçabilité des modules/actions prévue dans la fiche fonctionnelle.

## 41. Ce qui ne doit pas être codé
Interdictions explicites :
- édition d’un événement d’audit ;
- suppression d’un événement d’audit ;
- modification rétroactive d’une trace ;
- affichage de JSON brut ;
- affichage de logs serveur techniques ;
- affichage de stack trace ;
- debug visible en interface Audit ;
- SIEM ;
- monitoring infrastructure ;
- alerting sécurité complexe non validé ;
- analytics avancés / reporting lourd ;
- export de données sensibles sans permission ;
- contournement des permissions ;
- accès Audit aux profils non autorisés.

## 42. Interdictions de dérive
Garde-fous de réalisation :
- ne pas transformer Audit en outil d’investigation technique ;
- ne pas inventer de colonnes non validées visuellement/fonctionnellement ;
- ne pas ajouter d’actions métier de modification/suppression ;
- ne pas exposer d’informations sensibles au-delà du droit ;
- ne pas diverger du layout maquette (filtres, KPI, table, panneau détail, pagination) ;
- ne pas considérer ce document comme validation fonctionnelle finale.

## 43. Checklist de conformité visuelle 99 %
- [ ] Titre `Audit` et sous-texte conformes à la maquette.
- [ ] Actions `Exporter` et `Imprimer` positionnées en haut à droite de la zone page.
- [ ] Barre filtres en ligne avec `Période`, `Utilisateur`, `Action`, `Module`, `Ressource`, `Résultat`, `Réinitialiser`, `Filtres`.
- [ ] Rangée KPI de 4 tuiles : `Actions totales`, `Succès`, `Échecs`, `Avertissements`.
- [ ] Tableau avec colonnes visibles : `Date / Heure`, `Utilisateur`, `Action`, `Module`, `Ressource`, `Adresse IP`, `Résultat`, actions ligne.
- [ ] Lignes triées du plus récent au plus ancien par défaut.
- [ ] Badges de résultat explicites : `Succès`, `Avertissement`, `Échec`.
- [ ] Panneau droit `Détail de l'action` avec champs complets visibles.
- [ ] Pagination conforme : compteur résultats, navigation pages, sélecteur `10 / page`.
- [ ] Aucune action d’édition/suppression d’événement d’audit.
- [ ] Aucune exposition de JSON brut, logs serveur, stack trace ou debug visible.
- [ ] Gestion d’accès réservé Audit (masquage menu ou écran `Accès refusé`).
- [ ] Données sensibles visibles uniquement selon permissions.
- [ ] Document compris comme référence UI/UX codable, non validation fonctionnelle définitive.
- [ ] INFORMATION NON FOURNIE — À CONFIRMER : périmètre exact export (formats, champs, restrictions de droits).
- [ ] INFORMATION NON FOURNIE — À CONFIRMER : filtre criticité actif/non actif dans le panneau secondaire `Filtres`.
