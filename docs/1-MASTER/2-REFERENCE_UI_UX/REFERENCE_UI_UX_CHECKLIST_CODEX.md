# Ambulance Manager — Checklist opérationnelle Codex (UI/UX)

Version : V2
Statut : checklist de session de codage UI
Périmètre : application des références du dossier `docs/1-MASTER/2-REFERENCE_UI_UX/`

## Sommaire
- [Objectif du fichier](#objectif-du-fichier)
- [Checklist avant codage](#checklist-avant-codage)
- [Checklist pendant codage](#checklist-pendant-codage)
- [Checklist après codage](#checklist-apres-codage)
- [Règles de ressemblance visuelle 99 %](#regles-de-ressemblance-visuelle-99)
- [Règles de respect des maquettes](#regles-de-respect-des-maquettes)
- [Règles de respect des fiches fonctionnalités](#regles-de-respect-des-fiches-fonctionnalites)
- [Règles `components/` futures](#regles-components-futures)
- [Règles `tailwind.config.*` futures](#regles-tailwindconfig-futures)
- [Interdictions de dérive](#interdictions-de-derive)
- [Vérifications page par page](#verifications-page-par-page)
- [Vérifications des composants communs](#verifications-des-composants-communs)
- [Vérifications du Shell](#verifications-du-shell)
- [Vérifications des cards](#verifications-des-cards)
- [Vérifications des tableaux](#verifications-des-tableaux)
- [Vérifications des filtres](#verifications-des-filtres)
- [Vérifications des badges](#verifications-des-badges)
- [Vérifications des boutons](#verifications-des-boutons)
- [Vérifications des onglets](#verifications-des-onglets)
- [Vérifications des panneaux de détail](#verifications-des-panneaux-de-detail)
- [Vérifications responsive futures](#verifications-responsive-futures)
- [Vérifications accessibilité minimale](#verifications-accessibilite-minimale)
- [Vérifications non-régression visuelle](#verifications-non-regression-visuelle)
- [Éléments à ne jamais coder s’ils sont absents des fiches](#elements-a-ne-jamais-coder-sils-sont-absents-des-fiches)
- [Éléments à ne jamais modifier sans validation explicite](#elements-a-ne-jamais-modifier-sans-validation-explicite)

## Objectif du fichier
Fournir une checklist exécutable avant/pendant/après codage pour garantir une conformité visuelle et fonctionnelle de 99 % avec les maquettes validées et les fiches détaillées.

## Checklist avant codage
- Lire `REFERENCE_UI_UX_GLOBALE.md`.
- Lire `0-REFERENCE_UI_UX_SHELL_GLOBAL.md`.
- Lire la référence de la page ciblée.
- Vérifier la maquette V2.x exacte utilisée.
- Vérifier la fiche fonctionnalités détaillée associée.
- Lister les sections `INFORMATION NON FOURNIE — À CONFIRMER`.
- Vérifier que le nom métier affiché est conforme (`Modèles horaires`, `Mise en route`, etc.).

## Checklist pendant codage
- Respect strict du layout de la maquette (ordre, blocs, densité, hiérarchie).
- Respect strict des composants visibles décrits.
- Respect strict des statuts/badges/criticités textuels.
- Respect strict des permissions visibles (masquage actions/modules).
- Aucun ajout de fonctionnalité hors fiche.
- Aucun retrait de fonctionnalité présente dans la fiche.
- Aucune substitution de vocabulaire métier validé.

## Checklist après codage
- Comparaison écran par écran avec la maquette V2.
- Vérification des états visuels (empty/loading/error/disabled/actif).
- Vérification des actions critiques sous permission.
- Vérification de la non-régression visuelle du Shell.
- Vérification de cohérence inter-pages (cards, badges, filtres, tableaux).

## Règles de ressemblance visuelle 99 %
- Même structure globale et mêmes regroupements.
- Même ordre vertical/horizontal des zones.
- Même hiérarchie de tailles visuelles.
- Même logique de contraste primaire/secondaire.
- Même densité d’information.
- Écart maximal toléré : micro-ajustements techniques, sans impact perceptible métier.

## Règles de respect des maquettes
- Toujours utiliser la version la plus élevée de la maquette.
- Ne pas mixer des éléments d’anciennes versions si contradiction.
- Toute divergence volontaire doit être explicitement validée.

## Règles de respect des fiches fonctionnalités
- Les fiches détaillées pilotent les comportements et permissions.
- Les maquettes pilotent le rendu visuel cible.
- En cas d’ambiguïté : conserver `INFORMATION NON FOURNIE — À CONFIRMER` dans la doc de travail, jamais en libellé UI.

## Règles `components/` futures
- Prévoir une architecture réutilisable :
  - `components/shell/`
  - `components/ui/`
  - `components/business/`
  - `components/planning/`
  - `components/vehicles/`
  - `components/users/`
- Ne pas créer/modifier ces dossiers dans une session documentaire pure.

## Règles `tailwind.config.*` futures
- Centraliser les tokens : couleurs marque/métier/état, typo, radius, shadows, spacing, dimensions Shell, largeurs standards, z-index structurants.
- Ne pas créer/modifier `tailwind.config.*` dans une session documentaire pure.

## Interdictions de dérive
- Ne pas coder `Templates` comme libellé actif (utiliser `Modèles horaires`).
- Ne pas coder `Onboarding` comme libellé actif (utiliser `Mise en route`).
- Ne pas introduire `Privacy` comme entrée métier principale.
- Ne pas transformer le Planning Alpha en horaire détaillé global.
- Ne pas fusionner Société et Mise en route.

## Vérifications page par page
- Shell global : navigation, header, session, permissions visibles.
- Login : split layout, formulaire, états connexion.
- Dashboard : KPI/widgets/raccourcis selon droits.
- Société : profil permanent + résumé configuration.
- Dépôts / Bases : liste, filtres, statuts, compteurs.
- Modèles horaires : KPI + table modèles + statuts.
- Utilisateurs / RH : table + rôles + statuts + actions.
- Véhicules : référentiel flotte + disponibilité.
- Suivi des véhicules : 4 onglets + criticités + actions sensibles.
- Planning : 5 vues + publication + couverture + synthèse.
- Audit : filtres + table + détail entrée.
- Mise en route : progression + checklist + détail étape.

## Vérifications des composants communs
- Cohérence des cartes KPI.
- Cohérence des barres filtres.
- Cohérence des badges statut.
- Cohérence des boutons primaires/secondaires.

## Vérifications du Shell
- Sidebar, header, item actif, identité session.
- Masquage des modules non autorisés.
- Absence des éléments exclus (recherche globale, notif globale, etc.).

## Vérifications des cards
- Rayon/bordure/espacements cohérents.
- Titres et sous-titres lisibles.
- Iconographie alignée avec contexte métier.

## Vérifications des tableaux
- Colonnes conformes à la maquette.
- Densité et alignement cohérents.
- Pagination et lignes/page présentes si prévues.

## Vérifications des filtres
- Ordre logique recherche puis filtres.
- Bouton `Réinitialiser` cohérent.
- États `aucun résultat` traités.

## Vérifications des badges
- Libellé texte toujours présent.
- Couleur cohérente avec statut/criticité.
- Aucune info critique portée uniquement par couleur.

## Vérifications des boutons
- CTA primaire conforme.
- Actions destructives explicitement distinguées.
- Actions interdites non affichées ou bloquées proprement.

## Vérifications des onglets
- Onglet actif visuellement net.
- Ordre des onglets conforme à la référence.
- Aucun onglet hors périmètre Alpha.

## Vérifications des panneaux de détail
- Présence sur pages qui le requièrent.
- Contenu contextuel (statut, historique court, actions).
- Différenciation lecture/gestion selon droits.

## Vérifications responsive futures
- Préparer des comportements sans casser la lisibilité desktop.
- Prévoir empilement/blocs mobiles sans perte du sens métier.

## Vérifications accessibilité minimale
- Contrastes texte/fond.
- Focus visible.
- Labels explicites.
- Alternative textuelle systématique aux codes couleur.

## Vérifications non-régression visuelle
- Contrôle visuel comparatif avant/après par capture.
- Contrôle de cohérence inter-pages (espacements, typo, styles).
- Contrôle de stabilité des états critiques (alertes, erreurs, publication).

## Éléments à ne jamais coder s’ils sont absents des fiches
- Fonctions analytiques avancées non cadrées.
- Automatisations métier avancées non validées (planification auto, scoring, etc.).
- Suppressions physiques d’entités explicitement exclues en Alpha.
- Flux réglementaires détaillés non fournis (ARS) sans validation explicite.

## Éléments à ne jamais modifier sans validation explicite
- Noms métier validés des modules.
- Ordre et structure des vues/onglets complexes.
- Règles de permissions visibles.
- Règles de publication Planning et traçabilité.
- Règles de disponibilité véhicule (action explicite obligatoire).
