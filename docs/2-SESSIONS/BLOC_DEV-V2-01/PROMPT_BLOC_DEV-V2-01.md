# PROMPT_BLOC_DEV-V2-01

## Sommaire

- [Session DEV-V2-01-01](#session-dev-v2-01-01)
  - [Prompt Codex](#prompt-codex-dev-v2-01-01)
  - [Prompt ChatGPT](#prompt-chatgpt-dev-v2-01-01)
  - [Verdict de contrôlabilité](#verdict-de-controllabilite-dev-v2-01-01)
- [Session DEV-V2-01-01B](#session-dev-v2-01-01b)
  - [Prompt Codex](#prompt-codex-dev-v2-01-01b)
  - [Prompt ChatGPT](#prompt-chatgpt-dev-v2-01-01b)
  - [Verdict de contrôlabilité](#verdict-de-controllabilite-dev-v2-01-01b)
- [Session DEV-V2-01-02](#session-dev-v2-01-02)
  - [Prompt Codex](#prompt-codex-dev-v2-01-02)
  - [Prompt ChatGPT](#prompt-chatgpt-dev-v2-01-02)
  - [Verdict de contrôlabilité](#verdict-de-controllabilite-dev-v2-01-02)
- [Session DEV-V2-01-03](#session-dev-v2-01-03)
  - [Prompt Codex](#prompt-codex-dev-v2-01-03)
  - [Prompt ChatGPT](#prompt-chatgpt-dev-v2-01-03)
  - [Verdict de contrôlabilité](#verdict-de-controllabilite-dev-v2-01-03)
- [Session DEV-V2-01-04](#session-dev-v2-01-04)
  - [Prompt Codex](#prompt-codex-dev-v2-01-04)
  - [Prompt ChatGPT](#prompt-chatgpt-dev-v2-01-04)
  - [Verdict de contrôlabilité](#verdict-de-controllabilite-dev-v2-01-04)
- [Session DEV-V2-01-05](#session-dev-v2-01-05)
  - [Prompt Codex](#prompt-codex-dev-v2-01-05)
  - [Prompt ChatGPT](#prompt-chatgpt-dev-v2-01-05)
  - [Verdict de contrôlabilité](#verdict-de-controllabilite-dev-v2-01-05)
- [Session DEV-V2-01-06](#session-dev-v2-01-06)
  - [Prompt Codex](#prompt-codex-dev-v2-01-06)
  - [Prompt ChatGPT](#prompt-chatgpt-dev-v2-01-06)
  - [Verdict de contrôlabilité](#verdict-de-controllabilite-dev-v2-01-06)
- [Session DEV-V2-01-07](#session-dev-v2-01-07)
  - [Prompt Codex](#prompt-codex-dev-v2-01-07)
  - [Prompt ChatGPT](#prompt-chatgpt-dev-v2-01-07)
  - [Verdict de contrôlabilité](#verdict-de-controllabilite-dev-v2-01-07)
- [Session CLOTURE_DEV-V2-01](#session-cloture_dev-v2-01)
  - [Prompt Codex](#prompt-codex-cloture_dev-v2-01)
  - [Prompt ChatGPT](#prompt-chatgpt-cloture_dev-v2-01)
  - [Verdict de contrôlabilité](#verdict-de-controllabilite-cloture_dev-v2-01)

---

## Session DEV-V2-01-01

### Prompt Codex {#prompt-codex-dev-v2-01-01}

```text
Tu es Codex, en production dans le repo Ambulance Manager.

Session : DEV-V2-01-01
Bloc : BLOC DEV-V2-01
Type : AUDIT

Objectif unique :
Cartographier le shell actuel, les libellés legacy et les cas non autorisés pour établir un diagnostic exploitable du bloc DEV-V2-01.

Documents à lire obligatoirement :
- docs/1-MASTER/PLAN_DE_DEVELOPPEMENT_V2.md
- docs/2-SESSIONS/README_SESSIONS.md
- docs/3-TEMPLATES/TEMPLATE_SESSION.md
- docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-01/SESSION.md

Périmètre fermé :
- Autorisé : lecture/analyse du code frontend lié au shell/navigation.
- Autorisé à modifier uniquement :
  - docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-01/SESSION.md
- Interdit : patch code applicatif, correction métier, modification MASTER, modification template, refonte globale.

Travail demandé :
- Inventorier layout, navigation, header, sidebar, routes visibles.
- Lister les libellés legacy encore présents vs nomenclature V2 cible.
- Recenser les cas UI utilisateur authentifié non autorisé.
- Produire une matrice d’écarts priorisée pour les sessions suivantes.

Contrôles obligatoires :
- git status --short
- git diff -- docs/2-SESSIONS/BLOC_DEV-V2-01
- npm run docs:encoding si disponible
- npm run lint / npm run build uniquement si code modifié, ce qui ne devrait pas arriver.

Preuves obligatoires :
- Fichiers lus.
- Fichiers modifiés/créés/supprimés.
- Commandes exécutées avec résultat visible.
- Extrait de diff.
- Toute commande non montrée = non prouvée.
- Toute information manquante = INFORMATION NON FOURNIE — À CONFIRMER.

Réponse finale obligatoire :
1. Résumé court
2. Fichiers lus
3. Fichiers modifiés
4. Fichiers créés
5. Fichiers supprimés
6. Changements réalisés
7. Contrôles exécutés avec résultats
8. Séquences suspectes restantes avec fichier/ligne
9. git status --short
10. Points à confirmer
11. Verdict final : OBJECTIF UNIQUE ATTEINT / PÉRIMÈTRE RESPECTÉ / PREUVES FOURNIES ET VÉRIFIABLES / VALIDATION EXPLICITE
```

### Prompt ChatGPT {#prompt-chatgpt-dev-v2-01-01}

```text
Tu es expert en contrôle qualité ChatGPT et contrôle de retour Codex.

Contrôle uniquement le retour Codex de la session DEV-V2-01-01.
Ne valide rien implicitement.
N’analyse pas le repo toi-même.
Ne complète pas les preuves manquantes par supposition.

Objectif attendu :
Cartographier le shell actuel, les libellés legacy et les cas non autorisés, sans patch code applicatif.

Périmètre autorisé :
- Modification uniquement de docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-01/SESSION.md
- Aucun code modifié.
- Aucun MASTER/template modifié.

À contrôler :
- Fichiers lus cohérents avec la session.
- Fichiers modifiés strictement dans le périmètre.
- Matrice d’écarts présente et exploitable.
- Libellés legacy listés.
- Cas UI non autorisés recensés.
- git status --short fourni.
- git diff fourni.
- docs:encoding fourni si disponible, sinon justification.
- Toute commande non montrée = non prouvée.
- Toute information manquante = INFORMATION NON FOURNIE — À CONFIRMER.

Format de réponse :
- Verdict contrôlabilité : OUI/NON
- Périmètre respecté : OUI/NON
- Objectif atteint : OUI/NON
- Preuves suffisantes : OUI/NON
- Écarts bloquants
- Écarts non bloquants
- Conclusion : VALIDABLE / NON VALIDABLE
```

### Verdict de contrôlabilité {#verdict-de-controllabilite-dev-v2-01-01}

OUI

---

## Session DEV-V2-01-01B

### Prompt Codex {#prompt-codex-dev-v2-01-01b}

```text
Tu es Codex, en production dans le repo Ambulance Manager.

Session : DEV-V2-01-01B
Bloc : BLOC DEV-V2-01
Type : DOCUMENTATION

Objectif unique :
Poser des garde-fous anti-refonte clairs et actionnables pour le bloc DEV-V2-01.

Documents à lire obligatoirement :
- docs/1-MASTER/PLAN_DE_DEVELOPPEMENT_V2.md
- docs/2-SESSIONS/README_SESSIONS.md
- docs/3-TEMPLATES/TEMPLATE_SESSION.md
- docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-01B/SESSION.md

Périmètre fermé :
- Autorisé : cadrage documentaire des limites anti-refonte du bloc DEV-V2-01.
- Autorisé à modifier uniquement :
  - docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-01B/SESSION.md
- Interdit : code applicatif, implémentation frontend, modification MASTER, mise à jour PLAN_DE_DEVELOPPEMENT_V2.md sans validation explicite, bibliothèque UI non prévue.

Travail demandé :
- Formaliser les limites UI autorisées/interdites.
- Fixer la règle de factorisation progressive uniquement au besoin réel.
- Fixer les exclusions métier du bloc 01.
- Définir une trame de décision utilisable par les sessions de correction.

Contrôles obligatoires :
- git status --short
- git diff -- docs/2-SESSIONS/BLOC_DEV-V2-01
- npm run docs:encoding si disponible
- npm run lint / npm run build uniquement si code modifié, ce qui ne devrait pas arriver.

Preuves obligatoires :
- Fichiers lus.
- Fichiers modifiés/créés/supprimés.
- Commandes exécutées avec résultat visible.
- Extrait de diff.
- Toute commande non montrée = non prouvée.
- Toute information manquante = INFORMATION NON FOURNIE — À CONFIRMER.

Réponse finale obligatoire :
1. Résumé court
2. Fichiers lus
3. Fichiers modifiés
4. Fichiers créés
5. Fichiers supprimés
6. Changements réalisés
7. Contrôles exécutés avec résultats
8. Séquences suspectes restantes avec fichier/ligne
9. git status --short
10. Points à confirmer
11. Verdict final : OBJECTIF UNIQUE ATTEINT / PÉRIMÈTRE RESPECTÉ / PREUVES FOURNIES ET VÉRIFIABLES / VALIDATION EXPLICITE
```

### Prompt ChatGPT {#prompt-chatgpt-dev-v2-01-01b}

```text
Tu es expert en contrôle qualité ChatGPT et contrôle de retour Codex.

Contrôle uniquement le retour Codex de la session DEV-V2-01-01B.
Ne valide rien implicitement.
N’analyse pas le repo toi-même.
Ne complète pas les preuves manquantes par supposition.

Objectif attendu :
Poser des garde-fous anti-refonte clairs et actionnables pour DEV-V2-01.

Périmètre autorisé :
- Modification uniquement de docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-01B/SESSION.md
- Aucun code modifié.
- Aucun MASTER modifié.
- Aucun template modifié.

À contrôler :
- Garde-fous anti-refonte réellement formulés.
- Limites UI autorisées/interdites explicites.
- Règle de factorisation progressive présente.
- Exclusions métier du bloc 01 présentes.
- Aucune bibliothèque UI imposée sans validation.
- git status --short fourni.
- git diff fourni.
- docs:encoding fourni si disponible, sinon justification.
- Toute commande non montrée = non prouvée.
- Toute information manquante = INFORMATION NON FOURNIE — À CONFIRMER.

Format de réponse :
- Verdict contrôlabilité : OUI/NON
- Périmètre respecté : OUI/NON
- Objectif atteint : OUI/NON
- Preuves suffisantes : OUI/NON
- Écarts bloquants
- Écarts non bloquants
- Conclusion : VALIDABLE / NON VALIDABLE
```

### Verdict de contrôlabilité {#verdict-de-controllabilite-dev-v2-01-01b}

OUI

---

## Session DEV-V2-01-02

### Prompt Codex {#prompt-codex-dev-v2-01-02}

```text
Tu es Codex, en production dans le repo Ambulance Manager.

Session : DEV-V2-01-02
Bloc : BLOC DEV-V2-01
Type : AUDIT

Objectif unique :
Confirmer la structure frontend partagée réelle app/ui et components, puis statuer sur la cible à conserver.

Documents à lire obligatoirement :
- docs/1-MASTER/PLAN_DE_DEVELOPPEMENT_V2.md
- docs/2-SESSIONS/README_SESSIONS.md
- docs/3-TEMPLATES/TEMPLATE_SESSION.md
- docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-02/SESSION.md

Périmètre fermé :
- Autorisé : analyse de la structure frontend partagée.
- Autorisé à modifier uniquement :
  - docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-02/SESSION.md
- Interdit : migration structurelle, déplacement massif de composants, refonte visuelle, modification MASTER/template.

Travail demandé :
- Vérifier l’existence et l’usage actuel de app/ui.
- Vérifier l’existence et l’usage actuel de components.
- Identifier les dépendances shell/navigation sur ces zones.
- Documenter la cible de structure retenue pour les sessions suivantes, sur preuve du repo réel.

Contrôles obligatoires :
- git status --short
- git diff -- docs/2-SESSIONS/BLOC_DEV-V2-01
- npm run docs:encoding si disponible
- npm run lint / npm run build uniquement si code modifié, ce qui ne devrait pas arriver.

Preuves obligatoires :
- Fichiers lus.
- Fichiers modifiés/créés/supprimés.
- Commandes exécutées avec résultat visible.
- Extrait de diff.
- Toute commande non montrée = non prouvée.
- Toute information manquante = INFORMATION NON FOURNIE — À CONFIRMER.

Réponse finale obligatoire :
1. Résumé court
2. Fichiers lus
3. Fichiers modifiés
4. Fichiers créés
5. Fichiers supprimés
6. Changements réalisés
7. Contrôles exécutés avec résultats
8. Séquences suspectes restantes avec fichier/ligne
9. git status --short
10. Points à confirmer
11. Verdict final : OBJECTIF UNIQUE ATTEINT / PÉRIMÈTRE RESPECTÉ / PREUVES FOURNIES ET VÉRIFIABLES / VALIDATION EXPLICITE
```

### Prompt ChatGPT {#prompt-chatgpt-dev-v2-01-02}

```text
Tu es expert en contrôle qualité ChatGPT et contrôle de retour Codex.

Contrôle uniquement le retour Codex de la session DEV-V2-01-02.
Ne valide rien implicitement.
N’analyse pas le repo toi-même.
Ne complète pas les preuves manquantes par supposition.

Objectif attendu :
Confirmer la structure frontend partagée réelle app/ui et components, puis statuer sur la cible à conserver.

Périmètre autorisé :
- Modification uniquement de docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-02/SESSION.md
- Aucune migration.
- Aucun déplacement massif.
- Aucun code applicatif modifié.

À contrôler :
- Preuves d’existence/absence de app/ui.
- Preuves d’existence/absence de components.
- Usage réel documenté, pas hypothétique.
- Dépendances shell/navigation identifiées.
- Décision cible claire et justifiée.
- git status --short fourni.
- git diff fourni.
- docs:encoding fourni si disponible, sinon justification.
- Toute commande non montrée = non prouvée.
- Toute information manquante = INFORMATION NON FOURNIE — À CONFIRMER.

Format de réponse :
- Verdict contrôlabilité : OUI/NON
- Périmètre respecté : OUI/NON
- Objectif atteint : OUI/NON
- Preuves suffisantes : OUI/NON
- Écarts bloquants
- Écarts non bloquants
- Conclusion : VALIDABLE / NON VALIDABLE
```

### Verdict de contrôlabilité {#verdict-de-controllabilite-dev-v2-01-02}

OUI

---

## Session DEV-V2-01-03

### Prompt Codex {#prompt-codex-dev-v2-01-03}

```text
Tu es Codex, en production dans le repo Ambulance Manager.

Session : DEV-V2-01-03
Bloc : BLOC DEV-V2-01
Type : AUDIT

Objectif unique :
Fixer les conventions d’usage des composants partagés et prioriser les composants réutilisables du socle.

Documents à lire obligatoirement :
- docs/1-MASTER/PLAN_DE_DEVELOPPEMENT_V2.md
- docs/2-SESSIONS/README_SESSIONS.md
- docs/3-TEMPLATES/TEMPLATE_SESSION.md
- docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-03/SESSION.md

Périmètre fermé :
- Autorisé : cadrage technique documentaire des composants partagés.
- Autorisé à modifier uniquement :
  - docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-03/SESSION.md
- Interdit : création de design system complet, refactor global, changement métier, code applicatif.

Travail demandé :
- Définir conventions de nommage/placement des composants partagés.
- Prioriser : shell, navigation, bouton, badge, tableau, filtres, états vides/erreur/accès refusé, panneau détail.
- Définir la stratégie de factorisation progressive.
- Documenter les critères d’adoption des composants partagés.

Contrôles obligatoires :
- git status --short
- git diff -- docs/2-SESSIONS/BLOC_DEV-V2-01
- npm run docs:encoding si disponible
- npm run lint / npm run build uniquement si code modifié, ce qui ne devrait pas arriver.

Preuves obligatoires :
- Fichiers lus.
- Fichiers modifiés/créés/supprimés.
- Commandes exécutées avec résultat visible.
- Extrait de diff.
- Toute commande non montrée = non prouvée.
- Toute information manquante = INFORMATION NON FOURNIE — À CONFIRMER.

Réponse finale obligatoire :
1. Résumé court
2. Fichiers lus
3. Fichiers modifiés
4. Fichiers créés
5. Fichiers supprimés
6. Changements réalisés
7. Contrôles exécutés avec résultats
8. Séquences suspectes restantes avec fichier/ligne
9. git status --short
10. Points à confirmer
11. Verdict final : OBJECTIF UNIQUE ATTEINT / PÉRIMÈTRE RESPECTÉ / PREUVES FOURNIES ET VÉRIFIABLES / VALIDATION EXPLICITE
```

### Prompt ChatGPT {#prompt-chatgpt-dev-v2-01-03}

```text
Tu es expert en contrôle qualité ChatGPT et contrôle de retour Codex.

Contrôle uniquement le retour Codex de la session DEV-V2-01-03.
Ne valide rien implicitement.
N’analyse pas le repo toi-même.
Ne complète pas les preuves manquantes par supposition.

Objectif attendu :
Fixer les conventions d’usage des composants partagés et prioriser les composants réutilisables du socle.

Périmètre autorisé :
- Modification uniquement de docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-03/SESSION.md
- Aucun design system complet.
- Aucun refactor global.
- Aucun code applicatif.

À contrôler :
- Conventions de nommage/placement présentes.
- Composants prioritaires listés.
- Stratégie de factorisation progressive claire.
- Critères d’adoption documentés.
- Absence de dérive vers refonte globale.
- git status --short fourni.
- git diff fourni.
- docs:encoding fourni si disponible, sinon justification.
- Toute commande non montrée = non prouvée.
- Toute information manquante = INFORMATION NON FOURNIE — À CONFIRMER.

Format de réponse :
- Verdict contrôlabilité : OUI/NON
- Périmètre respecté : OUI/NON
- Objectif atteint : OUI/NON
- Preuves suffisantes : OUI/NON
- Écarts bloquants
- Écarts non bloquants
- Conclusion : VALIDABLE / NON VALIDABLE
```

### Verdict de contrôlabilité {#verdict-de-controllabilite-dev-v2-01-03}

OUI

---

## Session DEV-V2-01-04

### Prompt Codex {#prompt-codex-dev-v2-01-04}

```text
Tu es Codex, en production dans le repo Ambulance Manager.

Session : DEV-V2-01-04
Bloc : BLOC DEV-V2-01
Type : AUDIT

Objectif unique :
Confirmer la stratégie Tailwind v4 en place et cadrer les tokens/utilitaires minimaux de cohérence UI.

Documents à lire obligatoirement :
- docs/1-MASTER/PLAN_DE_DEVELOPPEMENT_V2.md
- docs/2-SESSIONS/README_SESSIONS.md
- docs/3-TEMPLATES/TEMPLATE_SESSION.md
- docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-04/SESSION.md

Périmètre fermé :
- Autorisé : vérification/cadrage Tailwind v4 et décision documentaire.
- Autorisé à modifier uniquement :
  - docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-04/SESSION.md
- Interdit : refonte UI globale, rebranding graphique, theming complexe, changement métier, code applicatif.

Travail demandé :
- Vérifier la configuration Tailwind active : PostCSS + import tailwindcss.
- Vérifier si tailwind.config.* est présent, utile ou non.
- Définir un cadrage minimal de tokens/classes utilitaires.
- Documenter la décision à appliquer sans refonte graphique.

Contrôles obligatoires :
- git status --short
- git diff -- docs/2-SESSIONS/BLOC_DEV-V2-01
- npm run docs:encoding si disponible
- npm run lint / npm run build uniquement si code modifié, ce qui ne devrait pas arriver.

Preuves obligatoires :
- Fichiers lus.
- Fichiers modifiés/créés/supprimés.
- Commandes exécutées avec résultat visible.
- Extrait de diff.
- Toute commande non montrée = non prouvée.
- Toute information manquante = INFORMATION NON FOURNIE — À CONFIRMER.

Réponse finale obligatoire :
1. Résumé court
2. Fichiers lus
3. Fichiers modifiés
4. Fichiers créés
5. Fichiers supprimés
6. Changements réalisés
7. Contrôles exécutés avec résultats
8. Séquences suspectes restantes avec fichier/ligne
9. git status --short
10. Points à confirmer
11. Verdict final : OBJECTIF UNIQUE ATTEINT / PÉRIMÈTRE RESPECTÉ / PREUVES FOURNIES ET VÉRIFIABLES / VALIDATION EXPLICITE
```

### Prompt ChatGPT {#prompt-chatgpt-dev-v2-01-04}

```text
Tu es expert en contrôle qualité ChatGPT et contrôle de retour Codex.

Contrôle uniquement le retour Codex de la session DEV-V2-01-04.
Ne valide rien implicitement.
N’analyse pas le repo toi-même.
Ne complète pas les preuves manquantes par supposition.

Objectif attendu :
Confirmer la stratégie Tailwind v4 en place et cadrer les tokens/utilitaires minimaux de cohérence UI.

Périmètre autorisé :
- Modification uniquement de docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-04/SESSION.md
- Aucun rebranding.
- Aucun theming complexe.
- Aucun code applicatif.

À contrôler :
- Preuves sur PostCSS + import tailwindcss.
- Présence/absence/utilité de tailwind.config.* documentée.
- Décision Tailwind v4 claire.
- Tokens/classes utilitaires minimaux cadrés.
- Absence de refonte UI globale.
- git status --short fourni.
- git diff fourni.
- docs:encoding fourni si disponible, sinon justification.
- Toute commande non montrée = non prouvée.
- Toute information manquante = INFORMATION NON FOURNIE — À CONFIRMER.

Format de réponse :
- Verdict contrôlabilité : OUI/NON
- Périmètre respecté : OUI/NON
- Objectif atteint : OUI/NON
- Preuves suffisantes : OUI/NON
- Écarts bloquants
- Écarts non bloquants
- Conclusion : VALIDABLE / NON VALIDABLE
```

### Verdict de contrôlabilité {#verdict-de-controllabilite-dev-v2-01-04}

OUI

---

## Session DEV-V2-01-05

### Prompt Codex {#prompt-codex-dev-v2-01-05}

```text
Tu es Codex, en production dans le repo Ambulance Manager.

Session : DEV-V2-01-05
Bloc : BLOC DEV-V2-01
Type : CORRECTION

Objectif unique :
Aligner la nomenclature V2 dans la navigation et les en-têtes visibles du shell actif.

Documents à lire obligatoirement :
- docs/1-MASTER/PLAN_DE_DEVELOPPEMENT_V2.md
- docs/2-SESSIONS/README_SESSIONS.md
- docs/3-TEMPLATES/TEMPLATE_SESSION.md
- docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/SESSION.md
- Les livrables des sessions DEV-V2-01-01 à DEV-V2-01-04 nécessaires à cette correction.

Périmètre fermé :
- Autorisé à modifier uniquement :
  - app/**
  - components/**
  - docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/SESSION.md
- Autorisé : corrections minimales de libellés shell/navigation/en-têtes.
- Interdit : correction métier fine des modules, refonte design system, refonte structurelle, modification MASTER/template.

Travail demandé :
- Remplacer les libellés legacy shell/navigation par les libellés V2 validés.
- Harmoniser les en-têtes des pages concernées.
- Vérifier l’absence de régression de navigation visible.
- Documenter précisément les changements et preuves.

Contrôles obligatoires :
- git status --short
- npm run lint
- npm run build
- git diff -- app components docs/2-SESSIONS/BLOC_DEV-V2-01
- npm run docs:encoding si disponible

Preuves obligatoires :
- Fichiers lus.
- Fichiers modifiés/créés/supprimés.
- Commandes exécutées avec résultat visible.
- Extrait de diff.
- Toute commande non montrée = non prouvée.
- Toute information manquante = INFORMATION NON FOURNIE — À CONFIRMER.

Réponse finale obligatoire :
1. Résumé court
2. Fichiers lus
3. Fichiers modifiés
4. Fichiers créés
5. Fichiers supprimés
6. Changements réalisés
7. Contrôles exécutés avec résultats
8. Séquences suspectes restantes avec fichier/ligne
9. git status --short
10. Points à confirmer
11. Verdict final : OBJECTIF UNIQUE ATTEINT / PÉRIMÈTRE RESPECTÉ / PREUVES FOURNIES ET VÉRIFIABLES / VALIDATION EXPLICITE
```

### Prompt ChatGPT {#prompt-chatgpt-dev-v2-01-05}

```text
Tu es expert en contrôle qualité ChatGPT et contrôle de retour Codex.

Contrôle uniquement le retour Codex de la session DEV-V2-01-05.
Ne valide rien implicitement.
N’analyse pas le repo toi-même.
Ne complète pas les preuves manquantes par supposition.

Objectif attendu :
Aligner la nomenclature V2 dans la navigation et les en-têtes visibles du shell actif.

Périmètre autorisé :
- app/**
- components/**
- docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-05/SESSION.md
- Corrections minimales de libellés uniquement.

Interdit :
- Refonte design system.
- Refonte structurelle.
- Correction métier fine.
- Modification MASTER/template.

À contrôler :
- Libellés legacy remplacés par des libellés V2 prouvés.
- En-têtes harmonisés.
- Patch minimal.
- Aucune dérive fonctionnelle.
- git status --short fourni.
- npm run lint fourni.
- npm run build fourni.
- git diff fourni sur app/components/session.
- docs:encoding fourni si disponible, sinon justification.
- Toute commande non montrée = non prouvée.
- Toute information manquante = INFORMATION NON FOURNIE — À CONFIRMER.

Format de réponse :
- Verdict contrôlabilité : OUI/NON
- Périmètre respecté : OUI/NON
- Objectif atteint : OUI/NON
- Preuves suffisantes : OUI/NON
- Écarts bloquants
- Écarts non bloquants
- Conclusion : VALIDABLE / NON VALIDABLE
```

### Verdict de contrôlabilité {#verdict-de-controllabilite-dev-v2-01-05}

OUI

---

## Session DEV-V2-01-06

### Prompt Codex {#prompt-codex-dev-v2-01-06}

```text
Tu es Codex, en production dans le repo Ambulance Manager.

Session : DEV-V2-01-06
Bloc : BLOC DEV-V2-01
Type : CORRECTION

Objectif unique :
Harmoniser le pattern Accès refusé pour utilisateur authentifié non autorisé sur le frontend.

Documents à lire obligatoirement :
- docs/1-MASTER/PLAN_DE_DEVELOPPEMENT_V2.md
- docs/2-SESSIONS/README_SESSIONS.md
- docs/3-TEMPLATES/TEMPLATE_SESSION.md
- docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-06/SESSION.md
- Les livrables des sessions DEV-V2-01-01 à DEV-V2-01-05 nécessaires à cette correction.

Périmètre fermé :
- Autorisé à modifier uniquement :
  - app/**
  - components/**
  - docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-06/SESSION.md
- Autorisé : états Accès refusé du frontend shell/pages connectées.
- Interdit : refonte permissions backend, matrice RBAC API complète, évolution fonctionnelle non liée, modification MASTER/template.

Travail demandé :
- Identifier les variantes actuelles d’états non autorisés.
- Appliquer un pattern unique : message, rendu, comportement.
- Vérifier cohérence de navigation et feedback utilisateur.
- Documenter les preuves de cohérence après correction.

Contrôles obligatoires :
- git status --short
- npm run lint
- npm run build
- git diff -- app components docs/2-SESSIONS/BLOC_DEV-V2-01
- npm run docs:encoding si disponible

Preuves obligatoires :
- Fichiers lus.
- Fichiers modifiés/créés/supprimés.
- Commandes exécutées avec résultat visible.
- Extrait de diff.
- Toute commande non montrée = non prouvée.
- Toute information manquante = INFORMATION NON FOURNIE — À CONFIRMER.

Réponse finale obligatoire :
1. Résumé court
2. Fichiers lus
3. Fichiers modifiés
4. Fichiers créés
5. Fichiers supprimés
6. Changements réalisés
7. Contrôles exécutés avec résultats
8. Séquences suspectes restantes avec fichier/ligne
9. git status --short
10. Points à confirmer
11. Verdict final : OBJECTIF UNIQUE ATTEINT / PÉRIMÈTRE RESPECTÉ / PREUVES FOURNIES ET VÉRIFIABLES / VALIDATION EXPLICITE
```

### Prompt ChatGPT {#prompt-chatgpt-dev-v2-01-06}

```text
Tu es expert en contrôle qualité ChatGPT et contrôle de retour Codex.

Contrôle uniquement le retour Codex de la session DEV-V2-01-06.
Ne valide rien implicitement.
N’analyse pas le repo toi-même.
Ne complète pas les preuves manquantes par supposition.

Objectif attendu :
Harmoniser le pattern Accès refusé pour utilisateur authentifié non autorisé sur le frontend.

Périmètre autorisé :
- app/**
- components/**
- docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-06/SESSION.md
- États Accès refusé frontend uniquement.

Interdit :
- Refonte RBAC backend.
- Matrice permissions API complète.
- Évolution fonctionnelle non liée.
- Modification MASTER/template.

À contrôler :
- Variantes initiales identifiées.
- Pattern unique appliqué et décrit.
- Message/rendu/comportement cohérents.
- Navigation et feedback utilisateur vérifiés.
- Patch ciblé.
- git status --short fourni.
- npm run lint fourni.
- npm run build fourni.
- git diff fourni sur app/components/session.
- docs:encoding fourni si disponible, sinon justification.
- Toute commande non montrée = non prouvée.
- Toute information manquante = INFORMATION NON FOURNIE — À CONFIRMER.

Format de réponse :
- Verdict contrôlabilité : OUI/NON
- Périmètre respecté : OUI/NON
- Objectif atteint : OUI/NON
- Preuves suffisantes : OUI/NON
- Écarts bloquants
- Écarts non bloquants
- Conclusion : VALIDABLE / NON VALIDABLE
```

### Verdict de contrôlabilité {#verdict-de-controllabilite-dev-v2-01-06}

OUI

---

## Session DEV-V2-01-07

### Prompt Codex {#prompt-codex-dev-v2-01-07}

```text
Tu es Codex, en production dans le repo Ambulance Manager.

Session : DEV-V2-01-07
Bloc : BLOC DEV-V2-01
Type : VALIDATION

Objectif unique :
Vérifier la cohérence finale routes/navigation/labels, le socle frontend retenu et l’absence de dérive vers refonte massive.

Documents à lire obligatoirement :
- docs/1-MASTER/PLAN_DE_DEVELOPPEMENT_V2.md
- docs/2-SESSIONS/README_SESSIONS.md
- docs/3-TEMPLATES/TEMPLATE_SESSION.md
- docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-07/SESSION.md
- Les livrables des sessions DEV-V2-01-01 à DEV-V2-01-06.

Périmètre fermé :
- Autorisé à modifier uniquement :
  - app/**
  - components/**
  - docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-07/SESSION.md
- Autorisé : validation de cohérence bloc DEV-V2-01, ajustements minimes uniquement si bloquants.
- Interdit : extension vers DEV-V2-02, refonte UX globale, modification MASTER/template.

Travail demandé :
- Contrôler cohérence navigation/routes/labels.
- Vérifier application du socle frontend validé par les sessions 01-02-03-04.
- Vérifier absence de dérive de périmètre et de refonte globale.
- Rendre un verdict explicite de validation du bloc hors clôture finale.

Contrôles obligatoires :
- git status --short
- npm run lint
- npm run build
- git diff -- app components docs/2-SESSIONS/BLOC_DEV-V2-01
- npm run docs:encoding si disponible

Preuves obligatoires :
- Fichiers lus.
- Fichiers modifiés/créés/supprimés.
- Commandes exécutées avec résultat visible.
- Extrait de diff.
- Toute commande non montrée = non prouvée.
- Toute information manquante = INFORMATION NON FOURNIE — À CONFIRMER.

Réponse finale obligatoire :
1. Résumé court
2. Fichiers lus
3. Fichiers modifiés
4. Fichiers créés
5. Fichiers supprimés
6. Changements réalisés
7. Contrôles exécutés avec résultats
8. Séquences suspectes restantes avec fichier/ligne
9. git status --short
10. Points à confirmer
11. Verdict final : OBJECTIF UNIQUE ATTEINT / PÉRIMÈTRE RESPECTÉ / PREUVES FOURNIES ET VÉRIFIABLES / VALIDATION EXPLICITE
```

### Prompt ChatGPT {#prompt-chatgpt-dev-v2-01-07}

```text
Tu es expert en contrôle qualité ChatGPT et contrôle de retour Codex.

Contrôle uniquement le retour Codex de la session DEV-V2-01-07.
Ne valide rien implicitement.
N’analyse pas le repo toi-même.
Ne complète pas les preuves manquantes par supposition.

Objectif attendu :
Vérifier la cohérence finale routes/navigation/labels, le socle frontend retenu et l’absence de dérive vers refonte massive.

Périmètre autorisé :
- app/**
- components/**
- docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-07/SESSION.md
- Ajustements minimes uniquement si bloquants.

Interdit :
- Extension vers DEV-V2-02.
- Refonte UX globale.
- Modification MASTER/template.
- Validation sans preuves.

À contrôler :
- Cohérence navigation/routes/labels prouvée.
- Socle frontend retenu vérifié.
- Absence de dérive de périmètre explicitement contrôlée.
- Verdict de passage à clôture présent.
- git status --short fourni.
- npm run lint fourni.
- npm run build fourni.
- git diff fourni sur app/components/session.
- docs:encoding fourni si disponible, sinon justification.
- Toute commande non montrée = non prouvée.
- Toute information manquante = INFORMATION NON FOURNIE — À CONFIRMER.

Format de réponse :
- Verdict contrôlabilité : OUI/NON
- Périmètre respecté : OUI/NON
- Objectif atteint : OUI/NON
- Preuves suffisantes : OUI/NON
- Écarts bloquants
- Écarts non bloquants
- Conclusion : VALIDABLE / NON VALIDABLE
```

### Verdict de contrôlabilité {#verdict-de-controllabilite-dev-v2-01-07}

OUI

---

## Session CLOTURE_DEV-V2-01

### Prompt Codex {#prompt-codex-cloture_dev-v2-01}

```text
Tu es Codex, en production dans le repo Ambulance Manager.

Session : CLOTURE_DEV-V2-01
Bloc : BLOC DEV-V2-01
Type : CLOTURE

Objectif unique :
Clore officiellement le bloc DEV-V2-01 avec vérification des preuves, contrôles et critères de validation du bloc.

Documents à lire obligatoirement :
- docs/1-MASTER/PLAN_DE_DEVELOPPEMENT_V2.md
- docs/2-SESSIONS/README_SESSIONS.md
- docs/3-TEMPLATES/TEMPLATE_SESSION.md
- docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-CLOTURE_DEV-V2-01/SESSION.md
- Tous les livrables/verdicts des sessions DEV-V2-01-01 à DEV-V2-01-07.

Périmètre fermé :
- Autorisé à modifier uniquement :
  - docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-CLOTURE_DEV-V2-01/SESSION.md
- Autorisé : consolidation, synthèse des preuves, décision de clôture du bloc DEV-V2-01.
- Interdit : nouveau chantier technique, décision sur un autre bloc DEV-V2, modification code sauf correctif critique explicitement justifié, modification MASTER/template.

Travail demandé :
- Relire les livrables et verdicts DEV-V2-01-01 à DEV-V2-01-07.
- Vérifier que les critères du bloc sont satisfaits sans écart critique ouvert.
- Consolider le verdict final : prêt / non prêt pour bloc suivant.
- Documenter explicitement le passage recommandé vers DEV-V2-02.
- Décision obligatoire : clôture du bloc OUI/NON.

Contrôles obligatoires :
- git status --short
- git diff -- docs/2-SESSIONS/BLOC_DEV-V2-01
- npm run docs:encoding si disponible
- npm run lint / npm run build uniquement si code modifié, ce qui ne devrait pas arriver.

Preuves obligatoires :
- Fichiers lus.
- Fichiers modifiés/créés/supprimés.
- Commandes exécutées avec résultat visible.
- Extrait de diff.
- Toute commande non montrée = non prouvée.
- Toute information manquante = INFORMATION NON FOURNIE — À CONFIRMER.

Réponse finale obligatoire :
1. Résumé court
2. Fichiers lus
3. Fichiers modifiés
4. Fichiers créés
5. Fichiers supprimés
6. Changements réalisés
7. Contrôles exécutés avec résultats
8. Séquences suspectes restantes avec fichier/ligne
9. git status --short
10. Points à confirmer
11. Verdict final : OBJECTIF UNIQUE ATTEINT / PÉRIMÈTRE RESPECTÉ / PREUVES FOURNIES ET VÉRIFIABLES / CLÔTURE DU BLOC OUI/NON
```

### Prompt ChatGPT {#prompt-chatgpt-cloture_dev-v2-01}

```text
Tu es expert en contrôle qualité ChatGPT et contrôle de retour Codex.

Contrôle uniquement le retour Codex de la session CLOTURE_DEV-V2-01.
Ne valide rien implicitement.
N’analyse pas le repo toi-même.
Ne complète pas les preuves manquantes par supposition.

Objectif attendu :
Clore officiellement le bloc DEV-V2-01 avec vérification des preuves, contrôles et critères de validation.

Périmètre autorisé :
- Modification uniquement de docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-CLOTURE_DEV-V2-01/SESSION.md
- Consolidation des sessions DEV-V2-01-01 à DEV-V2-01-07.
- Aucune décision sur un autre bloc.
- Aucun nouveau chantier technique.

À contrôler :
- Tous les verdicts des sessions 01 à 07 sont repris.
- Les preuves et contrôles du bloc sont synthétisés.
- Les écarts critiques ouverts sont listés ou absence prouvée.
- Décision claire : clôture OUI/NON.
- Passage recommandé vers DEV-V2-02 documenté.
- git status --short fourni.
- git diff fourni.
- docs:encoding fourni si disponible, sinon justification.
- npm run lint/build uniquement si code modifié.
- Toute commande non montrée = non prouvée.
- Toute information manquante = INFORMATION NON FOURNIE — À CONFIRMER.

Format de réponse :
- Verdict contrôlabilité : OUI/NON
- Périmètre respecté : OUI/NON
- Objectif atteint : OUI/NON
- Preuves suffisantes : OUI/NON
- Clôture acceptable : OUI/NON
- Écarts bloquants
- Écarts non bloquants
- Conclusion : VALIDABLE / NON VALIDABLE
```

### Verdict de contrôlabilité {#verdict-de-controllabilite-cloture_dev-v2-01}

OUI
