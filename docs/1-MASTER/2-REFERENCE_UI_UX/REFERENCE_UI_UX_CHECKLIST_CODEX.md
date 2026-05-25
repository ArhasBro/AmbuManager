# Ambulance Manager — Checklist opérationnelle Codex UI/UX

Version : V2  
Statut : checklist d’exécution pour futures sessions Codex UI  
Objectif : garantir une intégration UI fidèle à 99 % aux références autorisées

## Sommaire
- [1. Objectif de la checklist](#1-objectif-de-la-checklist)
- [2. Règles avant codage](#2-règles-avant-codage)
- [3. Règles pendant codage](#3-règles-pendant-codage)
- [4. Règles après codage](#4-règles-après-codage)
- [5. Checklist de lecture des sources](#5-checklist-de-lecture-des-sources)
- [6. Checklist de fidélité 99 %](#6-checklist-de-fidélité-99-)
- [7. Checklist Shell](#7-checklist-shell)
- [8. Checklist pages](#8-checklist-pages)
- [9. Checklist composants](#9-checklist-composants)
- [10. Checklist Tailwind](#10-checklist-tailwind)
- [11. Checklist permissions visibles](#11-checklist-permissions-visibles)
- [12. Checklist tableaux](#12-checklist-tableaux)
- [13. Checklist cards](#13-checklist-cards)
- [14. Checklist badges](#14-checklist-badges)
- [15. Checklist boutons](#15-checklist-boutons)
- [16. Checklist filtres](#16-checklist-filtres)
- [17. Checklist onglets](#17-checklist-onglets)
- [18. Checklist panneaux de détail](#18-checklist-panneaux-de-détail)
- [19. Checklist états UI](#19-checklist-états-ui)
- [20. Checklist responsive futur](#20-checklist-responsive-futur)
- [21. Checklist accessibilité minimale](#21-checklist-accessibilité-minimale)
- [22. Checklist anti-dérive](#22-checklist-anti-dérive)
- [23. Checklist de contrôle final](#23-checklist-de-contrôle-final)
- [24. Commandes de contrôle recommandées pour futures sessions](#24-commandes-de-contrôle-recommandées-pour-futures-sessions)
- [25. Interdictions de modifier hors périmètre](#25-interdictions-de-modifier-hors-périmètre)
- [26. Interdictions d’inventer des fonctionnalités](#26-interdictions-dinventer-des-fonctionnalités)
- [27. Interdictions liées au code existant comme source visuelle](#27-interdictions-liées-au-code-existant-comme-source-visuelle)

## 1. Objectif de la checklist
Cette checklist est l’outil opérationnel Codex avant, pendant et après une session de codage UI. Elle aligne les décisions sur les maquettes V2, les fiches détaillées et les références UI/UX actives, sans se substituer à la validation fonctionnelle finale.

## 2. Règles avant codage
- [ ] Définir la page concernée et son périmètre exact.
- [ ] Identifier la maquette V2 au versionnage le plus élevé.
- [ ] Identifier la fiche fonctionnalité détaillée correspondante.
- [ ] Lire la référence UI/UX de la page ciblée.
- [ ] Lire `REFERENCE_UI_UX_GLOBALE.md`.
- [ ] Confirmer les libellés actifs (`Modèles horaires`, `Mise en route`, etc.).
- [ ] Lister les points `INFORMATION NON FOURNIE — À CONFIRMER` impactants.

## 3. Règles pendant codage
- [ ] Respecter la hiérarchie visuelle et l’ordre des blocs de la maquette.
- [ ] Respecter les permissions visibles décrites dans les fiches.
- [ ] Respecter les états UI obligatoires de la page.
- [ ] Ne pas ajouter de fonctionnalité non documentée.
- [ ] Ne pas remplacer un libellé métier validé.
- [ ] Ne pas dériver vers une DA différente du pack V2.

## 4. Règles après codage
- [ ] Vérifier la fidélité visuelle de chaque section majeure.
- [ ] Vérifier les états UI (empty/loading/error/disabled/active/focus/hover).
- [ ] Vérifier les droits visibles (actions présentes/absentes).
- [ ] Vérifier la cohérence avec Shell et composants transverses.
- [ ] Vérifier que les écarts restants sont explicitement documentés.

## 5. Checklist de lecture des sources
- [ ] `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_GLOBALE.md`
- [ ] `docs/1-MASTER/2-REFERENCE_UI_UX/0-REFERENCE_UI_UX_SHELL_GLOBAL.md`
- [ ] Référence UI/UX de la page ciblée (`1` à `10`, `6.1` selon cas).
- [ ] Maquette(s) V2 de la page ciblée dans `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/`.
- [ ] Fiche détaillée correspondante dans `docs/1-MASTER/3-FONCTIONNALITES/`.
- [ ] `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_INDEX.md` pour contrôle d’autorité.

## 6. Checklist de fidélité 99 %
- [ ] Structure générale identique à la maquette.
- [ ] Positionnement relatif des blocs conservé.
- [ ] Densité d’information équivalente.
- [ ] Hiérarchie de contraste conservée.
- [ ] Typographie et espacements perçus cohérents.
- [ ] États et statuts visuels cohérents.

## 7. Checklist Shell
- [ ] Sidebar gauche persistante et cohérente.
- [ ] Topbar et contexte société/session visibles.
- [ ] Item de navigation actif explicite.
- [ ] Masquage des modules non autorisés.

## 8. Checklist pages
- [ ] Login.
- [ ] Tableau de bord.
- [ ] Modèles horaires.
- [ ] Planning.
- [ ] Utilisateurs / RH.
- [ ] Véhicules.
- [ ] Suivi des véhicules.
- [ ] Dépôts / Bases.
- [ ] Société.
- [ ] Mise en route.
- [ ] Audit.

## 9. Checklist composants
- [ ] Cohérence des primitives transverses (cards, badges, boutons, filtres, tableaux).
- [ ] Cohérence des blocs métier récurrents (KPI, panneaux de détail, barres d’actions).
- [ ] Pas de création de patterns visuels non présents dans le référentiel.

## 10. Checklist Tailwind
- [ ] Toute décision de token reste alignée sur la cible documentaire future.
- [ ] Aucune création/modification `tailwind.config.*` dans une session strictement documentaire.
- [ ] Cohérence visuelle maintenue sans token inventé non justifié.

## 11. Checklist permissions visibles
- [ ] Actions sensibles visibles uniquement pour les rôles autorisés.
- [ ] Modules masqués selon droits.
- [ ] États désactivés utilisés seulement quand le masquage n’est pas la règle définie.

## 12. Checklist tableaux
- [ ] Colonnes conformes à la référence de page.
- [ ] Statuts métiers lisibles dans les cellules critiques.
- [ ] Colonne d’actions conforme.
- [ ] Pagination/volume présents si prévus.

## 13. Checklist cards
- [ ] Cards blanches, bordures fines, hiérarchie lisible.
- [ ] Valeurs KPI et sous-libellés correctement ordonnés.
- [ ] Actions de card cohérentes avec permissions.

## 14. Checklist badges
- [ ] Libellé texte systématique.
- [ ] Couleur cohérente avec statut/criticité.
- [ ] Aucun statut critique porté uniquement par couleur.

## 15. Checklist boutons
- [ ] Bouton primaire identifiable.
- [ ] Actions secondaires/tertiaires hiérarchisées.
- [ ] Actions destructives ou sensibles distinguées.
- [ ] États `disabled` cohérents.

## 16. Checklist filtres
- [ ] Barre de recherche/filtres conforme à la page.
- [ ] Ordre logique des filtres conservé.
- [ ] Action de réinitialisation disponible si prévue.

## 17. Checklist onglets
- [ ] Onglets présents uniquement sur les pages prévues.
- [ ] Ordre des onglets conforme aux références.
- [ ] Onglet actif visuellement explicite.

## 18. Checklist panneaux de détail
- [ ] Présence sur pages complexes qui le demandent.
- [ ] Informations clés + statut + actions autorisées.
- [ ] Densité maîtrisée, sans surcharge.

## 19. Checklist états UI
- [ ] `empty`.
- [ ] `loading`.
- [ ] `error`.
- [ ] `disabled`.
- [ ] `hover`.
- [ ] `focus`.
- [ ] `active`.

## 20. Checklist responsive futur
- [ ] Aucune régression desktop.
- [ ] Anticipation mobile/tablette sans inversion de priorité métier.
- [ ] Prévoir adaptation future des tableaux denses.

## 21. Checklist accessibilité minimale
- [ ] Contraste texte/fond suffisant.
- [ ] Focus clavier visible.
- [ ] Libellés explicites sur actions/champs.
- [ ] Information critique disponible hors code couleur.

## 22. Checklist anti-dérive
- [ ] Ne pas utiliser `Templates` comme libellé actif.
- [ ] Ne pas utiliser `Onboarding` comme libellé actif.
- [ ] Ne pas faire de `Privacy` une entrée métier principale.
- [ ] Ne pas fusionner `Société` et `Mise en route`.
- [ ] Ne pas ajouter de logique fonctionnelle hors fiches.

## 23. Checklist de contrôle final
- [ ] La maquette de référence est la bonne version.
- [ ] La fiche fonctionnelle correspondante est respectée.
- [ ] La référence de page UI/UX est respectée.
- [ ] Les trois documents transversaux (globale, index, checklist) restent cohérents.
- [ ] Les points incertains restent marqués `INFORMATION NON FOURNIE — À CONFIRMER`.

## 24. Commandes de contrôle recommandées pour futures sessions
- `git status --short`
- `git diff -- docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_GLOBALE.md`
- `git diff -- docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_INDEX.md`
- `git diff -- docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_CHECKLIST_CODEX.md`
- `Get-ChildItem -Recurse -File docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2 | Select-Object -ExpandProperty FullName`
- `Get-ChildItem -File docs/1-MASTER/3-FONCTIONNALITES | Select-Object -ExpandProperty Name`

## 25. Interdictions de modifier hors périmètre
- Interdiction de modifier un autre fichier que ceux explicitement autorisés par la session.
- Interdiction de modifier les références UI/UX page déjà densifiées si le périmètre ne le prévoit pas.
- Interdiction de modifier les dossiers applicatifs (`app/`, `components/`, `lib/`, `prisma/`, `public/`).

## 26. Interdictions d’inventer des fonctionnalités
- Interdiction d’ajouter des actions métier absentes des fiches détaillées.
- Interdiction de simuler des workflows non validés.
- Interdiction de conclure à une règle fonctionnelle définitive depuis la seule UI/UX.

## 27. Interdictions liées au code existant comme source visuelle
- Interdiction d’utiliser le code existant comme source d’autorité visuelle quand il contredit maquettes/fiches.
- Interdiction de corriger la référence UI/UX pour s’aligner sur l’existant technique.
- Obligation de conserver la distinction : référence UI/UX codable versus validation fonctionnelle définitive.
