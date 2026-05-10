# Ambulance Manager — Prompts Production & Contrôle — Bloc A25

Version : V1.0.0  
Date : 10/05/2026  
Bloc : `A25 — Planning UI/UX & ergonomie métier`

Ce document regroupe les prompts prêts à copier/coller pour toutes les sessions du bloc A25, à partir des dossiers réellement créés :

- `SESSION-20260510-01_A25_A25-PLAN-UI-01`
- `SESSION-20260510-02_A25_A25-PLAN-UI-02`
- `SESSION-20260510-03_A25_A25-PLAN-UI-03`
- `SESSION-20260510-04_A25_A25-PLAN-UI-04`
- `SESSION-20260510-05_A25_A25-PLAN-UI-05`
- `SESSION-20260510-06_A25_A25-PLAN-UI-06`
- `SESSION-20260510-07_A25_CLOTURE_A25`

Règles communes à tout le bloc A25 :

- `A25` est une refonte UI/UX et ergonomie métier du Planning.
- `A25` ne doit pas devenir une refonte fonctionnelle lourde.
- La direction artistique officielle reste exclusivement `docs/1-master/MAQUETTE/MAQUETTE_DA`.
- La référence Planning détaillée est `docs/1-master/REFERENCE_UI_UX_A25_PLANNING.md`.
- L’image Planning détaillée est `docs/1-master/MAQUETTE/MAQUETTE_DA/MAQUETTES_FONDATRICES_IMAGES_V1.0/A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0/2-Planning/Planning_V1.2_INFO_DETAIL.png`.
- `CODE > DOCUMENTATION` en cas de contradiction fonctionnelle.
- `MAQUETTE_DA > anciennes captures / anciennes descriptions` pour la direction artistique.
- Toute information non prouvée doit être écrite exactement : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Le contrôle qualité ne doit commencer qu’après réception explicite du retour complet de production et du ZIP documentaire final versionné ciblé de la session.
- Les ZIPs documentaires transmis pour contrôle doivent être versionnés clairement : `_DOCS_FINAL_V1.zip`, puis `_DOCS_FINAL_V2.zip`, `_DOCS_FINAL_V3.zip`, etc. en cas de correction.
- Après validation d’une session, le ZIP documentaire ne devient pas une source officielle durable : il sert uniquement au transfert vers ChatGPT pour contrôle ; la source officielle reste la documentation déposée dans le repo.
- Côté production, Codex peut installer ou mettre à jour via PowerShell les dépendances, plugins, navigateurs ou outils nécessaires à la production, aux captures, aux vérifications et aux tests, à condition de documenter les commandes et résultats dans les preuves de session.
- Si aucun patch code n’est produit, `PATCH/NO_PATCH.md` doit préciser qu’il s’agit d’une absence de patch code applicatif, et non d’une absence de livrable documentaire.
- Lorsqu’un rapport ou contrôle demande une matrice par zone, chaque zone demandée doit disposer de sa propre ligne et d’un verdict individuel parmi : `conforme`, `non conforme`, `incomplet`, `à confirmer`.

---

# 1. SESSION-20260510-01_A25_A25-PLAN-UI-01 — AUDIT

## 1.1 PROMPT DE PRODUCTION

```text
Tu es Codex en discussion de production.

Session validée, nous passons à la suite.

============================================================
OUVERTURE OFFICIELLE DE SESSION
============================================================

Projet : Investissement
Sous-projet : Ambulance Manager

- Session : SESSION-20260510-01_A25_A25-PLAN-UI-01
- Stage : 1-ALPHA
- Bloc : A25 — Planning UI/UX & ergonomie métier
- Type : AUDIT
- Intitulé : Audit UI UX complet du planning

Dossier de session :
docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-01_A25_A25-PLAN-UI-01

Objectif unique de la session :
Auditer intégralement l’écran Planning réel afin de le comparer à la direction artistique officielle `MAQUETTE_DA`, à l’image `Planning_V1.2_INFO_DETAIL.png` et à `REFERENCE_UI_UX_A25_PLANNING.md`, sans modifier le code applicatif.

Le but est de préparer les corrections A25 avec une cartographie fiable des écarts UI/UX, des risques de régression et de l’ordre de correction recommandé.

============================================================
RÈGLE D’UTILISATION DES OUTILS
============================================================

Cette session doit être traitée avec Codex, car elle nécessite :
- lecture du repo réel ;
- inspection des fichiers planning ;
- production documentaire structurée ;
- captures si possible ;
- mise à jour des fichiers documentaires de session.

Tu ne dois pas prétendre avoir exécuté une commande, produit une capture ou vérifié un fichier si ce n’est pas réellement fait.

Si une information manque, écrire exactement :
INFORMATION NON FOURNIE — À CONFIRMER

Si nécessaire pour produire, capturer, vérifier ou tester la session, Codex peut installer ou mettre à jour via PowerShell les dépendances, plugins, navigateurs ou outils utiles.
Exemples : `npm ci`, `npm install`, `npx prisma generate`, `npx playwright install`, installation ou mise à jour d’un navigateur de test.
Toute commande d’installation ou de mise à jour doit être documentée dans `EVIDENCES.md` avec la commande exécutée, le résultat obtenu et l’impact éventuel sur la session.
Ces opérations ne doivent pas devenir une modification fonctionnelle du produit.

============================================================
LECTURE DOCUMENTAIRE OBLIGATOIRE
============================================================

Lire obligatoirement, si disponible :

- ./docs/1-master/DOCUMENT_MAITRE.md
- ./docs/1-master/PLAN_DE_DEVELOPPEMENT.md
- ./docs/1-master/REFERENCE_UI_UX_A24.md
- ./docs/1-master/REFERENCE_UI_UX_A25_PLANNING.md
- ./docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-08_A24_A24-UI-08/RAPPORT_PREPARATOIRE_A25.md
- ./docs/1-master/MAQUETTE/README_MAQUETTES_A24.md
- ./docs/1-master/MAQUETTE/SPEC_UI_UX_MAQUETTES_AMBULANCE_MANAGER.md
- ./docs/3-templates/TEMPLATE_DEBUT_SESSION.md si utile

Référence visuelle prioritaire :
./docs/1-master/MAQUETTE/MAQUETTE_DA

Image Planning détaillée de référence :
./docs/1-master/MAQUETTE/MAQUETTE_DA/MAQUETTES_FONDATRICES_IMAGES_V1.0/A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0/2-Planning/Planning_V1.2_INFO_DETAIL.png

Règle d’autorité :
- CODE > DOCUMENTATION en cas de contradiction fonctionnelle.
- MAQUETTE_DA > anciennes captures / anciennes descriptions pour la direction artistique.

============================================================
PÉRIMÈTRE EXACT
============================================================

Auditer uniquement le Planning.

Inclure :
- structure générale de la page planning ;
- header ;
- navigation temporelle ;
- filtres ;
- toolbar ;
- exports ;
- onglets internes ;
- vue jour ;
- vue semaine ;
- vue mois ;
- grille planning ;
- cellules ;
- cards de shifts / missions si réellement présentes ;
- badges ;
- horaires ;
- équipes ;
- véhicules ;
- panneaux de détail ;
- panneaux d’affectation ;
- actions principales ;
- actions secondaires ;
- actions groupées ;
- états vides ;
- états chargement ;
- états erreur ;
- mode clair ;
- mode sombre ;
- responsive minimal.

Exclure :
- nouveau moteur planning ;
- refonte autoschedule ;
- refonte matching ;
- refonte RBAC ;
- refonte Prisma ;
- refonte API ;
- RH avancée ;
- paie / primes / heures réelles ;
- mobile complet ;
- préparation société pilote.

============================================================
TRAVAIL ATTENDU
============================================================

1. Identifier les fichiers du repo qui composent l’écran Planning.

2. Inspecter la structure réelle de `/planning`.

3. Comparer l’existant aux zones de `Planning_V1.2_INFO_DETAIL.png` :
   - zone globale Planning ;
   - filtres / vue / exports ;
   - onglets internes ;
   - grille principale ;
   - panneau latéral de détail ;
   - barre d’actions groupées.

4. Pour chaque zone, distinguer clairement :
   - Visible dans la maquette ;
   - Présent dans le repo ;
   - Écart constaté ;
   - Risque fonctionnel ;
   - Verdict : conforme / non conforme / incomplet / à confirmer.

Le rapport doit aussi contenir une section dédiée :

`## Verdict détaillé par zone demandée`

Avec exactement le tableau suivant :

| Zone | Couverture | Verdict | Commentaire |
|---|---|---|---|

Cette matrice doit contenir une ligne pour chacune des zones suivantes :
- header planning ;
- navigation temporelle ;
- filtres ;
- toolbar ;
- exports ;
- onglets internes ;
- vue jour ;
- vue semaine ;
- vue mois ;
- grille ;
- cellules ;
- badges ;
- horaires ;
- équipes ;
- véhicules ;
- panneau détail ;
- panneau affectation ;
- actions groupées ;
- mode clair ;
- mode sombre ;
- responsive minimal ;
- risques de régression.

Un verdict global ne suffit pas.
Un verdict par grande zone maquette ne suffit pas.
Chaque zone listée doit avoir son verdict individuel parmi : conforme / non conforme / incomplet / à confirmer.
Si une zone n’est pas suffisamment prouvée, écrire exactement :
INFORMATION NON FOURNIE — À CONFIRMER

5. Produire des captures avant si possible :
   - planning principal en mode clair ;
   - planning principal en mode sombre ;
   - vue jour si accessible ;
   - vue semaine si accessible ;
   - vue mois si accessible ;
   - panneau ou drawer si accessible.

Si une capture n’est pas possible, écrire :
INFORMATION NON FOURNIE — À CONFIRMER

6. Ne pas corriger le code applicatif pendant cette session.

7. Mettre à jour la documentation de session.

============================================================
LIVRABLES ATTENDUS
============================================================

Dans le dossier réel de session :

- SESSION.md mis à jour ;
- NOTES.md mis à jour ;
- EVIDENCES.md mis à jour ;
- RESULTATS.md mis à jour ;
- FIN_SESSION.md mis à jour ;
- un rapport d’audit dédié, par exemple : RAPPORT_AUDIT_A25_PLANNING.md ;
- PATCH/NO_PATCH.md complété si aucun patch code applicatif n’est produit, en précisant que les livrables documentaires restent attendus ;
- patch documentaire final si la gouvernance du projet l’exige ;
- ZIP documentaire final versionné contenant les fichiers de session et le dossier PATCH (`_DOCS_FINAL_V1.zip`, puis `_DOCS_FINAL_V2.zip`, `_DOCS_FINAL_V3.zip` en cas de correction).

Le rapport doit contenir :
- références lues ;
- fichiers planning inspectés ;
- captures produites ou manquantes ;
- matrice des écarts ;
- verdict détaillé par zone demandée, avec une ligne par zone et un verdict individuel ;
- risques de régression ;
- priorisation A25 ;
- recommandations pour A25-PLAN-UI-02 à A25-PLAN-UI-05 ;
- verdict final d’audit.

============================================================
DÉFINITION OF DONE
============================================================

La session est terminée uniquement si :

- le planning réel est comparé à `MAQUETTE_DA` ;
- le planning réel est comparé à `Planning_V1.2_INFO_DETAIL.png` ;
- le planning réel est comparé à `REFERENCE_UI_UX_A25_PLANNING.md` ;
- chaque zone du planning possède un verdict individuel parmi conforme / non conforme / incomplet / à confirmer ;
- les risques de régression sont listés ;
- les captures avant sont produites ou explicitement marquées manquantes ;
- aucun code applicatif n’est modifié ;
- le fichier PATCH/NO_PATCH.md est complété si aucun patch code applicatif n’est produit, en précisant que les livrables documentaires restent attendus ;
- la documentation finale de session est prête ;
- le ZIP documentaire final versionné est prêt.

============================================================
RÉPONSE FINALE ATTENDUE
============================================================

Répondre avec :

1. Résumé de l’audit
2. Fichiers inspectés
3. Captures produites ou manquantes
4. Verdict par zone
5. Risques principaux pour A25
6. Livrables produits
7. Patchs produits ou NO_PATCH
8. Preuves terminales réellement exécutées
9. ZIP documentaire final versionné
10. Verdict final

Ne pas inventer de validation.
```

## 1.2 PROMPT DE CONTRÔLE

```text
Tu es ChatGPT en discussion de contrôle qualité.

Je vais te transmettre la production de la session suivante :

- Session : SESSION-20260510-01_A25_A25-PLAN-UI-01
- Stage : 1-ALPHA
- Bloc : A25 — Planning UI/UX & ergonomie métier
- Type : AUDIT
- Intitulé : Audit UI UX complet du planning

Objectif :
Contrôler l’audit UI/UX complet du planning sans rejouer la session.

Tu dois attendre avant tout contrôle :

- la réponse finale de production ;
- le rapport d’audit A25 Planning ;
- les fichiers documentaires de session ;
- le fichier PATCH/NO_PATCH.md si aucun patch code applicatif n’a été produit ;
- le patch documentaire si applicable ;
- le ZIP documentaire final versionné ;
- les captures produites si elles existent ;
- les preuves terminales si elles existent.

Règle d’attente avant contrôle :
- ne pas démarrer le contrôle à la réception de fichiers isolés, d’un ZIP intermédiaire ou d’un ZIP de dépôt complet ;
- attendre le retour complet de production et le ZIP documentaire final versionné explicitement désigné pour la session en cours ;
- si plusieurs ZIPs existent dans la conversation, contrôler uniquement la version ciblée par l’utilisateur (`V1`, `V2`, `V3`, etc.) ;
- ignorer les anciens ZIPs et les ZIPs non ciblés.

Si un élément manque, écrire exactement :
INFORMATION NON FOURNIE — À CONFIRMER

============================================================
RÈGLES DE CONTRÔLE
============================================================

Tu ne dois pas :
- rejouer la session ;
- refaire l’audit complet du repo ;
- inventer des preuves ;
- combler les manques par hypothèse ;
- contrôler un ancien ZIP ;
- contrôler un ZIP de dépôt complet ou non explicitement désigné comme ZIP documentaire final versionné de la session ;
- supposer qu’une capture existe si elle n’est pas fournie ;
- supposer qu’un patch a été appliqué sans preuve ;
- utiliser un ZIP déjà validé comme source officielle durable au lieu de la documentation du repo.

Tu dois contrôler uniquement ce qui est fourni.

Règle d’autorité :
- réponse finale de production > brouillon ;
- fichiers fournis dans le ZIP cible > mentions non prouvées ;
- CODE > DOCUMENTATION en cas de contradiction fonctionnelle ;
- MAQUETTE_DA > anciennes captures pour la direction artistique.

============================================================
POINTS À CONTRÔLER
============================================================

Vérifier que l’audit couvre :

- header planning ;
- navigation temporelle ;
- filtres ;
- toolbar ;
- exports ;
- onglets internes ;
- vue jour ;
- vue semaine ;
- vue mois ;
- grille ;
- cellules ;
- badges ;
- horaires ;
- équipes ;
- véhicules ;
- panneau détail ;
- panneau affectation ;
- actions groupées ;
- mode clair ;
- mode sombre ;
- responsive minimal ;
- risques de régression.

Vérifier que chaque zone possède un verdict individuel :
- conforme ;
- non conforme ;
- incomplet ;
- à confirmer.

Un verdict global ne suffit pas.
Un verdict par grande zone maquette ne suffit pas.
Chaque zone listée doit avoir sa propre ligne dans une matrice détaillée.
Si une preuve manque, la ligne concernée doit écrire exactement :
INFORMATION NON FOURNIE — À CONFIRMER

Vérifier que la production ne corrige pas le code applicatif.

Vérifier que le fichier PATCH/NO_PATCH.md existe et est cohérent si aucun patch code applicatif n’est produit.
Le fichier NO_PATCH doit clarifier l’absence de patch code applicatif, sans laisser entendre qu’aucun livrable documentaire n’est attendu.

Vérifier que les limites A25 sont respectées :
- pas de nouveau moteur planning ;
- pas de refonte autoschedule ;
- pas de refonte matching ;
- pas de refonte RBAC ;
- pas de refonte Prisma/API lourde ;
- pas de RH avancée.

============================================================
FORMAT DE RÉPONSE ATTENDU
============================================================

Répondre avec :

1. Informations reçues
2. Informations manquantes
3. Contrôle du périmètre
4. Contrôle du rapport d’audit
5. Contrôle des captures
6. Contrôle des livrables documentaires
7. Contrôle des risques et verdicts
8. Écarts ou réserves
9. Verdict final

Verdict final obligatoire :

- SESSION A25-PLAN-UI-01 VALIDABLE : OUI
- ou
- SESSION A25-PLAN-UI-01 VALIDABLE : NON

Si non validable, préciser exactement les éléments à corriger ou compléter.
```

---

# 2. SESSION-20260510-02_A25_A25-PLAN-UI-02 — CORRECTION+COMPLÉTION

## 2.1 PROMPT DE PRODUCTION

```text
Tu es Codex en discussion de production.

Session validée, nous passons à la suite.

============================================================
OUVERTURE OFFICIELLE DE SESSION
============================================================

Projet : Investissement
Sous-projet : Ambulance Manager

- Session : SESSION-20260510-02_A25_A25-PLAN-UI-02
- Stage : 1-ALPHA
- Bloc : A25 — Planning UI/UX & ergonomie métier
- Type : CORRECTION+COMPLÉTION
- Intitulé : Structure générale du planning

Dossier de session :
docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-02_A25_A25-PLAN-UI-02

Objectif unique de la session :
Réaligner la structure générale de la page Planning avec `MAQUETTE_DA`, `Planning_V1.2_INFO_DETAIL.png` et `REFERENCE_UI_UX_A25_PLANNING.md`, sans modifier profondément la logique métier.

============================================================
LECTURE DOCUMENTAIRE OBLIGATOIRE
============================================================

Lire obligatoirement :

- ./docs/1-master/DOCUMENT_MAITRE.md
- ./docs/1-master/PLAN_DE_DEVELOPPEMENT.md
- ./docs/1-master/REFERENCE_UI_UX_A24.md
- ./docs/1-master/REFERENCE_UI_UX_A25_PLANNING.md
- le rapport produit en SESSION-20260510-01_A25_A25-PLAN-UI-01
- ./docs/1-master/MAQUETTE/README_MAQUETTES_A24.md
- ./docs/1-master/MAQUETTE/SPEC_UI_UX_MAQUETTES_AMBULANCE_MANAGER.md

Référence visuelle principale :
./docs/1-master/MAQUETTE/MAQUETTE_DA/MAQUETTES_FONDATRICES_IMAGES_V1.0/A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0/2-Planning/Planning_V1.2_INFO_DETAIL.png

Règle d’autorité :
- CODE > DOCUMENTATION en cas de contradiction fonctionnelle.
- MAQUETTE_DA > anciennes captures / anciennes descriptions pour la direction artistique.

============================================================
PÉRIMÈTRE EXACT
============================================================

Inclure uniquement :

- header planning ;
- titre ;
- sous-titre ;
- bouton principal ;
- navigation générale ;
- filtres ;
- toolbar ;
- exports ;
- onglets internes du planning ;
- fond ;
- cards globales ;
- structure générale ;
- cohérence avec le socle A24 ;
- cohérence mode clair / mode sombre ;
- responsive minimal de ces zones.

Ne pas traiter en profondeur :

- vue jour ;
- vue semaine ;
- vue mois ;
- cellules détaillées ;
- cards shifts complexes ;
- panneaux d’affectation ;
- logique autoschedule ;
- logique matching ;
- logique planning métier lourde.

Ces sujets sont réservés aux sessions suivantes.

============================================================
RÈGLES TECHNIQUES
============================================================

- Produire un patch code ciblé uniquement sur la structure générale du planning.
- Ne pas modifier Prisma sauf nécessité absolue et justifiée.
- Ne pas modifier RBAC sauf nécessité absolue et justifiée.
- Ne pas modifier les API sauf nécessité stricte et justifiée.
- Ne pas supprimer silencieusement de donnée métier.
- Ne pas rendre visible une action non fonctionnelle comme si elle était pleinement disponible.
- Préserver les permissions existantes.
- Préserver les flux déjà stabilisés.
- Utiliser ou réutiliser les composants du socle A24 si disponibles.

============================================================
TRAVAIL ATTENDU
============================================================

1. Partir du rapport d’audit A25-PLAN-UI-01.

2. Identifier les fichiers à modifier pour la structure générale du planning.

3. Réaligner visuellement :
   - header ;
   - filtres ;
   - toolbar ;
   - exports ;
   - onglets ;
   - structure globale ;
   - hiérarchie visuelle.

4. Maintenir une logique compatible avec l’existant réel.

5. Vérifier le mode clair et le mode sombre sur ces zones.

6. Produire des captures avant / après si possible.

7. Produire un patch principal code :
   PATCH/PATCH__SESSION-20260510-02_A25_A25-PLAN-UI-02.diff

8. Mettre à jour README_PATCH.md.

9. Finaliser la documentation de session.

============================================================
VALIDATIONS TERMINALES ATTENDUES
============================================================

Avant ces validations, si l’environnement l’exige, Codex peut installer ou mettre à jour via PowerShell les dépendances, plugins, navigateurs ou outils nécessaires aux captures, vérifications et tests.
Toute commande utile doit être documentée dans `EVIDENCES.md` avec son résultat.
Ces opérations ne doivent pas devenir une modification fonctionnelle du produit.

Exécuter réellement, si l’environnement le permet :

- npm run lint
- npm run build

Si une commande ne peut pas être exécutée, documenter précisément la raison et écrire :
INFORMATION NON FOURNIE — À CONFIRMER

Ne pas inventer de sortie terminale.

============================================================
DÉFINITION OF DONE
============================================================

La session est terminée uniquement si :

- la structure générale du planning est plus claire ;
- le header est cohérent avec A24 et A25 ;
- les filtres et la toolbar sont mieux organisés ;
- les onglets sont lisibles ou leur absence est justifiée ;
- les exports sont visibles sans dominer l’écran ;
- le mode clair reste lisible ;
- le mode sombre reste lisible ;
- aucune logique métier lourde n’est ajoutée ;
- le patch code est ciblé ;
- les validations terminales sont exécutées ou les limites sont documentées ;
- les fichiers documentaires sont finalisés ;
- le ZIP documentaire final versionné est produit.

============================================================
RÉPONSE FINALE ATTENDUE
============================================================

Répondre avec :

1. Résumé de la correction
2. Fichiers modifiés
3. Périmètre traité
4. Périmètre volontairement non traité
5. Captures avant / après produites ou manquantes
6. Patch produit
7. Validations terminales
8. Documentation mise à jour
9. ZIP documentaire final versionné
10. Verdict final
```

## 2.2 PROMPT DE CONTRÔLE

```text
Tu es ChatGPT en discussion de contrôle qualité.

Je vais te transmettre la production de la session suivante :

- Session : SESSION-20260510-02_A25_A25-PLAN-UI-02
- Stage : 1-ALPHA
- Bloc : A25 — Planning UI/UX & ergonomie métier
- Type : CORRECTION+COMPLÉTION
- Intitulé : Structure générale du planning

Objectif :
Contrôler la correction de structure générale du planning sans rejouer la session.

Tu dois attendre avant tout contrôle :

- la réponse finale de production ;
- le patch principal code ;
- les éventuels patchs correctifs ;
- README_PATCH.md ;
- les fichiers documentaires de session ;
- les captures avant / après si produites ;
- les preuves terminales ;
- le ZIP documentaire final versionné.

Règle d’attente avant contrôle :
- ne pas démarrer le contrôle à la réception de fichiers isolés, d’un ZIP intermédiaire ou d’un ZIP de dépôt complet ;
- attendre le retour complet de production et le ZIP documentaire final versionné explicitement désigné pour la session en cours ;
- si plusieurs ZIPs existent dans la conversation, contrôler uniquement la version ciblée par l’utilisateur (`V1`, `V2`, `V3`, etc.) ;
- ignorer les anciens ZIPs et les ZIPs non ciblés.

Si un élément manque, écrire exactement :
INFORMATION NON FOURNIE — À CONFIRMER

============================================================
RÈGLES DE CONTRÔLE
============================================================

Tu ne dois pas :
- rejouer la session ;
- refaire la correction ;
- inventer des validations ;
- supposer que le patch s’applique sans preuve ;
- contrôler un ancien ZIP ;
- contrôler un ZIP de dépôt complet ou non explicitement désigné comme ZIP documentaire final versionné de la session ;
- combler les manques par hypothèse ;
- utiliser un ZIP déjà validé comme source officielle durable au lieu de la documentation du repo.

Tu dois contrôler uniquement ce qui est fourni.

============================================================
POINTS À CONTRÔLER
============================================================

Vérifier que la production traite bien :

- header planning ;
- structure générale ;
- filtres ;
- toolbar ;
- exports ;
- onglets internes ;
- cohérence A24 ;
- mode clair ;
- mode sombre ;
- responsive minimal.

Vérifier que la production ne traite pas en profondeur :

- vue jour ;
- vue semaine ;
- vue mois ;
- panneaux d’affectation ;
- autoschedule ;
- matching ;
- RBAC ;
- Prisma ;
- API lourde.

Vérifier que le patch est ciblé et cohérent avec le périmètre.

Vérifier que les validations terminales sont fournies.

Vérifier que la documentation et le ZIP final sont cohérents.

============================================================
FORMAT DE RÉPONSE ATTENDU
============================================================

Répondre avec :

1. Informations reçues
2. Informations manquantes
3. Contrôle du périmètre
4. Contrôle du patch
5. Contrôle visuel / captures
6. Contrôle terminal
7. Contrôle documentaire
8. Écarts ou réserves
9. Verdict final

Verdict final obligatoire :

- SESSION A25-PLAN-UI-02 VALIDABLE : OUI
- ou
- SESSION A25-PLAN-UI-02 VALIDABLE : NON

Si non validable, préciser exactement les éléments à corriger ou compléter.
```

---

# 3. SESSION-20260510-03_A25_A25-PLAN-UI-03 — CORRECTION+COMPLÉTION

## 3.1 PROMPT DE PRODUCTION

```text
Tu es Codex en discussion de production.

Session validée, nous passons à la suite.

============================================================
OUVERTURE OFFICIELLE DE SESSION
============================================================

Projet : Investissement
Sous-projet : Ambulance Manager

- Session : SESSION-20260510-03_A25_A25-PLAN-UI-03
- Stage : 1-ALPHA
- Bloc : A25 — Planning UI/UX & ergonomie métier
- Type : CORRECTION+COMPLÉTION
- Intitulé : Vues jour et semaine

Dossier de session :
docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-03_A25_A25-PLAN-UI-03

Objectif unique de la session :
Réaligner les vues jour et semaine du planning afin d’améliorer la lisibilité métier, la hiérarchie visuelle, la densité et la cohérence avec `MAQUETTE_DA` et `REFERENCE_UI_UX_A25_PLANNING.md`, sans refonte fonctionnelle lourde.

============================================================
LECTURE DOCUMENTAIRE OBLIGATOIRE
============================================================

Lire obligatoirement :

- ./docs/1-master/DOCUMENT_MAITRE.md
- ./docs/1-master/PLAN_DE_DEVELOPPEMENT.md
- ./docs/1-master/REFERENCE_UI_UX_A24.md
- ./docs/1-master/REFERENCE_UI_UX_A25_PLANNING.md
- le rapport produit en SESSION-20260510-01_A25_A25-PLAN-UI-01
- le résultat de SESSION-20260510-02_A25_A25-PLAN-UI-02
- ./docs/1-master/MAQUETTE/README_MAQUETTES_A24.md
- ./docs/1-master/MAQUETTE/SPEC_UI_UX_MAQUETTES_AMBULANCE_MANAGER.md

Référence visuelle principale :
./docs/1-master/MAQUETTE/MAQUETTE_DA/MAQUETTES_FONDATRICES_IMAGES_V1.0/A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0/2-Planning/Planning_V1.2_INFO_DETAIL.png

============================================================
PÉRIMÈTRE EXACT
============================================================

Inclure :

- vue jour si présente ;
- vue semaine si présente ;
- grilles ;
- lignes horaires si présentes ;
- cellules ;
- cards de shifts / missions si réellement présentes dans le repo ;
- badges ;
- horaires ;
- équipes ;
- véhicules ;
- actions visibles dans ces vues ;
- densité ;
- lisibilité métier ;
- états vides / chargement / erreur propres à ces vues ;
- mode clair ;
- mode sombre.

Exclure :

- vue mois ;
- panneaux d’action et d’affectation profonds ;
- refonte autoschedule ;
- refonte matching ;
- nouveau moteur planning ;
- refonte API / Prisma / RBAC lourde.

============================================================
RÈGLES D’INTÉGRATION
============================================================

- Ne pas inventer une vue qui n’existe pas sans le documenter.
- Si une vue jour ou semaine est absente, écrire : INFORMATION NON FOURNIE — À CONFIRMER.
- Ne pas masquer les données métier existantes.
- Ne pas confondre shift, mission, absence, repos et congé.
- Ne pas afficher un véhicule ou une équipe si la donnée n’est pas disponible.
- Prioriser la lisibilité et la hiérarchie visuelle.
- Rester compatible avec la structure créée ou corrigée en A25-PLAN-UI-02.

============================================================
TRAVAIL ATTENDU
============================================================

1. Identifier comment les vues jour et semaine sont implémentées.

2. Comparer leur rendu avec les principes de `REFERENCE_UI_UX_A25_PLANNING.md`.

3. Réaligner visuellement :
   - grilles ;
   - cellules ;
   - badges ;
   - horaires ;
   - cards ;
   - hiérarchie des informations ;
   - densité ;
   - états visuels.

4. Préserver les actions existantes sans refonte métier lourde.

5. Vérifier mode clair et mode sombre.

6. Produire des captures avant / après si possible.

7. Produire un patch principal code :
   PATCH/PATCH__SESSION-20260510-03_A25_A25-PLAN-UI-03.diff

8. Mettre à jour README_PATCH.md.

9. Finaliser la documentation de session.

============================================================
VALIDATIONS TERMINALES ATTENDUES
============================================================

Avant ces validations, si l’environnement l’exige, Codex peut installer ou mettre à jour via PowerShell les dépendances, plugins, navigateurs ou outils nécessaires aux captures, vérifications et tests.
Toute commande utile doit être documentée dans `EVIDENCES.md` avec son résultat.
Ces opérations ne doivent pas devenir une modification fonctionnelle du produit.

Exécuter réellement, si l’environnement le permet :

- npm run lint
- npm run build

Si une commande ne peut pas être exécutée, documenter précisément la raison et écrire :
INFORMATION NON FOURNIE — À CONFIRMER

============================================================
DÉFINITION OF DONE
============================================================

La session est terminée uniquement si :

- les vues jour et semaine sont inspectées ;
- les vues jour et semaine sont corrigées si présentes et concernées ;
- les horaires sont plus lisibles ;
- les badges sont plus cohérents ;
- les équipes et véhicules sont affichés uniquement si disponibles ;
- la densité est maîtrisée ;
- le mode clair est lisible ;
- le mode sombre est lisible ;
- aucune logique métier lourde n’est ajoutée ;
- le patch est ciblé ;
- les validations terminales sont exécutées ou limites documentées ;
- la documentation finale et le ZIP sont produits.

============================================================
RÉPONSE FINALE ATTENDUE
============================================================

Répondre avec :

1. Résumé de la correction
2. Fichiers modifiés
3. Vue jour : état et traitement
4. Vue semaine : état et traitement
5. Captures avant / après produites ou manquantes
6. Patch produit
7. Validations terminales
8. Documentation mise à jour
9. ZIP documentaire final versionné
10. Verdict final
```

## 3.2 PROMPT DE CONTRÔLE

```text
Tu es ChatGPT en discussion de contrôle qualité.

Je vais te transmettre la production de la session suivante :

- Session : SESSION-20260510-03_A25_A25-PLAN-UI-03
- Stage : 1-ALPHA
- Bloc : A25 — Planning UI/UX & ergonomie métier
- Type : CORRECTION+COMPLÉTION
- Intitulé : Vues jour et semaine

Objectif :
Contrôler le réalignement des vues jour et semaine sans rejouer la session.

Tu dois attendre avant tout contrôle :

- la réponse finale de production ;
- le patch principal code ;
- les éventuels patchs correctifs ;
- README_PATCH.md ;
- les fichiers documentaires de session ;
- les captures avant / après si produites ;
- les preuves terminales ;
- le ZIP documentaire final versionné.

Règle d’attente avant contrôle :
- ne pas démarrer le contrôle à la réception de fichiers isolés, d’un ZIP intermédiaire ou d’un ZIP de dépôt complet ;
- attendre le retour complet de production et le ZIP documentaire final versionné explicitement désigné pour la session en cours ;
- si plusieurs ZIPs existent dans la conversation, contrôler uniquement la version ciblée par l’utilisateur (`V1`, `V2`, `V3`, etc.) ;
- ignorer les anciens ZIPs et les ZIPs non ciblés.

Si un élément manque, écrire exactement :
INFORMATION NON FOURNIE — À CONFIRMER

============================================================
POINTS À CONTRÔLER
============================================================

Vérifier que la production couvre :

- vue jour ;
- vue semaine ;
- grilles ;
- cellules ;
- lignes horaires si présentes ;
- cards shifts / missions si présentes ;
- badges ;
- horaires ;
- équipes ;
- véhicules ;
- actions visibles ;
- densité ;
- mode clair ;
- mode sombre.

Vérifier que la production ne traite pas hors périmètre :

- vue mois ;
- refonte autoschedule ;
- refonte matching ;
- nouveau moteur planning ;
- refonte API / Prisma / RBAC lourde.

Vérifier que les éléments absents sont signalés avec :
INFORMATION NON FOURNIE — À CONFIRMER

Vérifier que les validations terminales et les captures sont fournies ou explicitement absentes.

============================================================
FORMAT DE RÉPONSE ATTENDU
============================================================

Répondre avec :

1. Informations reçues
2. Informations manquantes
3. Contrôle du périmètre
4. Contrôle du patch
5. Contrôle vue jour
6. Contrôle vue semaine
7. Contrôle visuel / captures
8. Contrôle terminal
9. Écarts ou réserves
10. Verdict final

Verdict final obligatoire :

- SESSION A25-PLAN-UI-03 VALIDABLE : OUI
- ou
- SESSION A25-PLAN-UI-03 VALIDABLE : NON
```

---

# 4. SESSION-20260510-04_A25_A25-PLAN-UI-04 — CORRECTION+COMPLÉTION

## 4.1 PROMPT DE PRODUCTION

```text
Tu es Codex en discussion de production.

Session validée, nous passons à la suite.

============================================================
OUVERTURE OFFICIELLE DE SESSION
============================================================

Projet : Investissement
Sous-projet : Ambulance Manager

- Session : SESSION-20260510-04_A25_A25-PLAN-UI-04
- Stage : 1-ALPHA
- Bloc : A25 — Planning UI/UX & ergonomie métier
- Type : CORRECTION+COMPLÉTION
- Intitulé : Vue mois

Dossier de session :
docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-04_A25_A25-PLAN-UI-04

Objectif unique de la session :
Réaligner la vue mois du planning afin de la rendre plus lisible, plus synthétique, plus cohérente avec `MAQUETTE_DA` et compatible avec l’ergonomie globale A25, sans créer une refonte fonctionnelle avancée.

============================================================
LECTURE DOCUMENTAIRE OBLIGATOIRE
============================================================

Lire obligatoirement :

- ./docs/1-master/DOCUMENT_MAITRE.md
- ./docs/1-master/PLAN_DE_DEVELOPPEMENT.md
- ./docs/1-master/REFERENCE_UI_UX_A24.md
- ./docs/1-master/REFERENCE_UI_UX_A25_PLANNING.md
- le rapport produit en SESSION-20260510-01_A25_A25-PLAN-UI-01
- le résultat de SESSION-20260510-02_A25_A25-PLAN-UI-02
- le résultat de SESSION-20260510-03_A25_A25-PLAN-UI-03
- ./docs/1-master/MAQUETTE/README_MAQUETTES_A24.md
- ./docs/1-master/MAQUETTE/SPEC_UI_UX_MAQUETTES_AMBULANCE_MANAGER.md

Référence visuelle principale :
./docs/1-master/MAQUETTE/MAQUETTE_DA/MAQUETTES_FONDATRICES_IMAGES_V1.0/A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0/2-Planning/Planning_V1.2_INFO_DETAIL.png

============================================================
PÉRIMÈTRE EXACT
============================================================

Inclure :

- vue mois si présente ;
- structure mensuelle ;
- cellules mensuelles ;
- indicateurs ;
- résumé des shifts / missions si réellement présentes dans le repo ;
- badges ;
- états visuels ;
- navigation mensuelle ;
- densité ;
- mode clair ;
- mode sombre ;
- responsive minimal.

Exclure :

- refonte des vues jour / semaine déjà traitées ;
- panneaux d’affectation profonds ;
- nouveau moteur planning ;
- autoschedule complet ;
- matching complet ;
- règles métier avancées ;
- refonte API / Prisma / RBAC lourde.

============================================================
RÈGLES D’INTÉGRATION
============================================================

- Si la vue mois est absente ou partielle, le constater clairement.
- Ne pas créer une vue mois entièrement nouvelle si cela implique une logique métier lourde.
- Améliorer l’existant de façon réaliste.
- Ne pas afficher de résumé fictif.
- Ne pas masquer une donnée métier réelle.
- Rester cohérent avec les structures et composants déjà stabilisés en A25-PLAN-UI-02 et A25-PLAN-UI-03.

============================================================
TRAVAIL ATTENDU
============================================================

1. Identifier l’implémentation réelle de la vue mois.

2. Vérifier si elle est fonctionnelle, partielle ou absente.

3. Réaligner visuellement ce qui existe :
   - grille mensuelle ;
   - cellules ;
   - badges ;
   - résumés ;
   - navigation ;
   - états vides ;
   - densité ;
   - mode clair / sombre.

4. Préserver la logique fonctionnelle existante.

5. Produire des captures avant / après si possible.

6. Produire un patch principal code :
   PATCH/PATCH__SESSION-20260510-04_A25_A25-PLAN-UI-04.diff

7. Mettre à jour README_PATCH.md.

8. Finaliser la documentation de session.

============================================================
VALIDATIONS TERMINALES ATTENDUES
============================================================

Avant ces validations, si l’environnement l’exige, Codex peut installer ou mettre à jour via PowerShell les dépendances, plugins, navigateurs ou outils nécessaires aux captures, vérifications et tests.
Toute commande utile doit être documentée dans `EVIDENCES.md` avec son résultat.
Ces opérations ne doivent pas devenir une modification fonctionnelle du produit.

Exécuter réellement, si l’environnement le permet :

- npm run lint
- npm run build

Si une commande ne peut pas être exécutée, documenter précisément la raison et écrire :
INFORMATION NON FOURNIE — À CONFIRMER

============================================================
DÉFINITION OF DONE
============================================================

La session est terminée uniquement si :

- la vue mois est inspectée ;
- son état réel est documenté ;
- l’existant est réaligné visuellement si disponible ;
- la densité mensuelle est maîtrisée ;
- les cellules sont plus lisibles ;
- le mode clair est lisible ;
- le mode sombre est lisible ;
- aucune logique métier lourde n’est créée ;
- le patch est ciblé ;
- les validations terminales sont exécutées ou limites documentées ;
- la documentation finale et le ZIP sont produits.

============================================================
RÉPONSE FINALE ATTENDUE
============================================================

Répondre avec :

1. Résumé de la correction
2. Fichiers modifiés
3. État réel de la vue mois
4. Traitement réalisé
5. Captures avant / après produites ou manquantes
6. Patch produit
7. Validations terminales
8. Documentation mise à jour
9. ZIP documentaire final versionné
10. Verdict final
```

## 4.2 PROMPT DE CONTRÔLE

```text
Tu es ChatGPT en discussion de contrôle qualité.

Je vais te transmettre la production de la session suivante :

- Session : SESSION-20260510-04_A25_A25-PLAN-UI-04
- Stage : 1-ALPHA
- Bloc : A25 — Planning UI/UX & ergonomie métier
- Type : CORRECTION+COMPLÉTION
- Intitulé : Vue mois

Objectif :
Contrôler le réalignement de la vue mois sans rejouer la session.

Tu dois attendre avant tout contrôle :

- la réponse finale de production ;
- le patch principal code ;
- les éventuels patchs correctifs ;
- README_PATCH.md ;
- les fichiers documentaires de session ;
- les captures avant / après si produites ;
- les preuves terminales ;
- le ZIP documentaire final versionné.

Règle d’attente avant contrôle :
- ne pas démarrer le contrôle à la réception de fichiers isolés, d’un ZIP intermédiaire ou d’un ZIP de dépôt complet ;
- attendre le retour complet de production et le ZIP documentaire final versionné explicitement désigné pour la session en cours ;
- si plusieurs ZIPs existent dans la conversation, contrôler uniquement la version ciblée par l’utilisateur (`V1`, `V2`, `V3`, etc.) ;
- ignorer les anciens ZIPs et les ZIPs non ciblés.

Si un élément manque, écrire exactement :
INFORMATION NON FOURNIE — À CONFIRMER

============================================================
POINTS À CONTRÔLER
============================================================

Vérifier que la production couvre :

- état réel de la vue mois ;
- structure mensuelle ;
- cellules ;
- indicateurs ;
- résumés si réellement disponibles ;
- badges ;
- navigation mensuelle ;
- densité ;
- mode clair ;
- mode sombre.

Vérifier que la production ne crée pas :

- nouveau moteur planning ;
- nouvelle logique mensuelle lourde ;
- autoschedule complet ;
- matching complet ;
- refonte API / Prisma / RBAC lourde.

Vérifier que les données absentes ne sont pas présentées comme existantes.

============================================================
FORMAT DE RÉPONSE ATTENDU
============================================================

Répondre avec :

1. Informations reçues
2. Informations manquantes
3. Contrôle du périmètre
4. Contrôle du patch
5. Contrôle vue mois
6. Contrôle visuel / captures
7. Contrôle terminal
8. Écarts ou réserves
9. Verdict final

Verdict final obligatoire :

- SESSION A25-PLAN-UI-04 VALIDABLE : OUI
- ou
- SESSION A25-PLAN-UI-04 VALIDABLE : NON
```

---

# 5. SESSION-20260510-05_A25_A25-PLAN-UI-05 — CORRECTION+COMPLÉTION

## 5.1 PROMPT DE PRODUCTION

```text
Tu es Codex en discussion de production.

Session validée, nous passons à la suite.

============================================================
OUVERTURE OFFICIELLE DE SESSION
============================================================

Projet : Investissement
Sous-projet : Ambulance Manager

- Session : SESSION-20260510-05_A25_A25-PLAN-UI-05
- Stage : 1-ALPHA
- Bloc : A25 — Planning UI/UX & ergonomie métier
- Type : CORRECTION+COMPLÉTION
- Intitulé : Panneaux actions et affectations

Dossier de session :
docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-05_A25_A25-PLAN-UI-05

Objectif unique de la session :
Réaligner les panneaux d’action et d’affectation du planning afin de rendre les actions plus claires, mieux hiérarchisées et plus proches de l’ergonomie attendue, sans créer une nouvelle logique métier lourde.

============================================================
LECTURE DOCUMENTAIRE OBLIGATOIRE
============================================================

Lire obligatoirement :

- ./docs/1-master/DOCUMENT_MAITRE.md
- ./docs/1-master/PLAN_DE_DEVELOPPEMENT.md
- ./docs/1-master/REFERENCE_UI_UX_A24.md
- ./docs/1-master/REFERENCE_UI_UX_A25_PLANNING.md
- le rapport produit en SESSION-20260510-01_A25_A25-PLAN-UI-01
- les résultats de SESSION-20260510-02_A25_A25-PLAN-UI-02
- les résultats de SESSION-20260510-03_A25_A25-PLAN-UI-03
- les résultats de SESSION-20260510-04_A25_A25-PLAN-UI-04
- ./docs/1-master/MAQUETTE/README_MAQUETTES_A24.md
- ./docs/1-master/MAQUETTE/SPEC_UI_UX_MAQUETTES_AMBULANCE_MANAGER.md

Référence visuelle principale :
./docs/1-master/MAQUETTE/MAQUETTE_DA/MAQUETTES_FONDATRICES_IMAGES_V1.0/A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0/2-Planning/Planning_V1.2_INFO_DETAIL.png

============================================================
PÉRIMÈTRE EXACT
============================================================

Inclure :

- drawer ;
- panneau droit ;
- détail cellule ;
- détail shift / mission si réellement présent dans le repo ;
- affectation personnel ;
- affectation véhicule ;
- affectation base ;
- modification ;
- annulation ;
- actions principales ;
- actions secondaires ;
- actions groupées ;
- sélection multiple si présente ;
- états vides ;
- états erreur ;
- mode clair ;
- mode sombre.

Exclure :

- nouvelle logique d’affectation ;
- nouveau moteur planning ;
- refonte autoschedule ;
- refonte matching ;
- refonte RBAC ;
- refonte API / Prisma lourde ;
- suppression physique généralisée ;
- RH avancée.

============================================================
RÈGLES D’INTÉGRATION
============================================================

- Ne pas créer une nouvelle mécanique d’affectation.
- Clarifier l’ergonomie des flux existants.
- Préserver les permissions existantes.
- Préserver les validations serveur existantes.
- Ne pas rendre une action dangereuse trop facile.
- L’action `Vider`, si présente, doit être clarifiée visuellement sans en changer la logique métier sans preuve.
- Les actions destructives ou sensibles doivent rester identifiables.
- Les panneaux doivent rester cohérents avec la DA A24/A25.

============================================================
TRAVAIL ATTENDU
============================================================

1. Identifier les panneaux, drawers, modales et barres d’action existants.

2. Vérifier les actions disponibles :
   - ajouter ;
   - voir détail ;
   - modifier ;
   - annuler ;
   - vider ;
   - affecter employé 1 ;
   - affecter employé 2 ;
   - affecter véhicule ;
   - affecter base.

3. Réaligner visuellement :
   - panneau détail ;
   - panneau affectation ;
   - actions principales ;
   - actions secondaires ;
   - barre d’actions groupées ;
   - états vides / erreurs ;
   - mode clair / sombre.

4. Préserver le comportement fonctionnel existant.

5. Produire des captures avant / après si possible.

6. Produire un patch principal code :
   PATCH/PATCH__SESSION-20260510-05_A25_A25-PLAN-UI-05.diff

7. Mettre à jour README_PATCH.md.

8. Finaliser la documentation de session.

============================================================
VALIDATIONS TERMINALES ATTENDUES
============================================================

Avant ces validations, si l’environnement l’exige, Codex peut installer ou mettre à jour via PowerShell les dépendances, plugins, navigateurs ou outils nécessaires aux captures, vérifications et tests.
Toute commande utile doit être documentée dans `EVIDENCES.md` avec son résultat.
Ces opérations ne doivent pas devenir une modification fonctionnelle du produit.

Exécuter réellement, si l’environnement le permet :

- npm run lint
- npm run build

Si une commande ne peut pas être exécutée, documenter précisément la raison et écrire :
INFORMATION NON FOURNIE — À CONFIRMER

============================================================
DÉFINITION OF DONE
============================================================

La session est terminée uniquement si :

- les panneaux existants sont identifiés ;
- les actions existantes sont clarifiées visuellement ;
- les actions sensibles restent hiérarchisées ;
- la sélection multiple ou la barre bulk est traitée si présente ;
- les panneaux sont cohérents en mode clair ;
- les panneaux sont cohérents en mode sombre ;
- aucune logique métier lourde n’est ajoutée ;
- les permissions existantes sont préservées ;
- le patch est ciblé ;
- les validations terminales sont exécutées ou limites documentées ;
- la documentation finale et le ZIP sont produits.

============================================================
RÉPONSE FINALE ATTENDUE
============================================================

Répondre avec :

1. Résumé de la correction
2. Fichiers modifiés
3. Panneaux et actions identifiés
4. Traitement réalisé
5. Captures avant / après produites ou manquantes
6. Patch produit
7. Validations terminales
8. Documentation mise à jour
9. ZIP documentaire final versionné
10. Verdict final
```

## 5.2 PROMPT DE CONTRÔLE

```text
Tu es ChatGPT en discussion de contrôle qualité.

Je vais te transmettre la production de la session suivante :

- Session : SESSION-20260510-05_A25_A25-PLAN-UI-05
- Stage : 1-ALPHA
- Bloc : A25 — Planning UI/UX & ergonomie métier
- Type : CORRECTION+COMPLÉTION
- Intitulé : Panneaux actions et affectations

Objectif :
Contrôler le réalignement des panneaux d’action et d’affectation sans rejouer la session.

Tu dois attendre avant tout contrôle :

- la réponse finale de production ;
- le patch principal code ;
- les éventuels patchs correctifs ;
- README_PATCH.md ;
- les fichiers documentaires de session ;
- les captures avant / après si produites ;
- les preuves terminales ;
- le ZIP documentaire final versionné.

Règle d’attente avant contrôle :
- ne pas démarrer le contrôle à la réception de fichiers isolés, d’un ZIP intermédiaire ou d’un ZIP de dépôt complet ;
- attendre le retour complet de production et le ZIP documentaire final versionné explicitement désigné pour la session en cours ;
- si plusieurs ZIPs existent dans la conversation, contrôler uniquement la version ciblée par l’utilisateur (`V1`, `V2`, `V3`, etc.) ;
- ignorer les anciens ZIPs et les ZIPs non ciblés.

Si un élément manque, écrire exactement :
INFORMATION NON FOURNIE — À CONFIRMER

============================================================
POINTS À CONTRÔLER
============================================================

Vérifier que la production couvre :

- drawer ;
- panneau droit ;
- détail cellule ;
- détail shift / mission si présent ;
- affectation personnel ;
- affectation véhicule ;
- affectation base ;
- modification ;
- annulation ;
- actions principales ;
- actions secondaires ;
- actions groupées ;
- sélection multiple si présente ;
- mode clair ;
- mode sombre.

Vérifier que la production ne crée pas :

- nouvelle logique d’affectation ;
- nouveau moteur planning ;
- refonte autoschedule ;
- refonte matching ;
- refonte API / Prisma / RBAC lourde ;
- suppression physique généralisée.

Vérifier que les actions sensibles sont correctement hiérarchisées.

============================================================
FORMAT DE RÉPONSE ATTENDU
============================================================

Répondre avec :

1. Informations reçues
2. Informations manquantes
3. Contrôle du périmètre
4. Contrôle du patch
5. Contrôle des panneaux
6. Contrôle des actions
7. Contrôle visuel / captures
8. Contrôle terminal
9. Écarts ou réserves
10. Verdict final

Verdict final obligatoire :

- SESSION A25-PLAN-UI-05 VALIDABLE : OUI
- ou
- SESSION A25-PLAN-UI-05 VALIDABLE : NON
```

---

# 6. SESSION-20260510-06_A25_A25-PLAN-UI-06 — VALIDATION

## 6.1 PROMPT DE PRODUCTION

```text
Tu es Codex en discussion de production.

Session validée, nous passons à la suite.

============================================================
OUVERTURE OFFICIELLE DE SESSION
============================================================

Projet : Investissement
Sous-projet : Ambulance Manager

- Session : SESSION-20260510-06_A25_A25-PLAN-UI-06
- Stage : 1-ALPHA
- Bloc : A25 — Planning UI/UX & ergonomie métier
- Type : VALIDATION
- Intitulé : Validation globale planning UI UX

Dossier de session :
docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-06_A25_A25-PLAN-UI-06

Objectif unique de la session :
Valider globalement le planning UI/UX après les corrections A25, en contrôlant la cohérence avec `MAQUETTE_DA`, `Planning_V1.2_INFO_DETAIL.png`, `REFERENCE_UI_UX_A25_PLANNING.md`, le mode clair, le mode sombre, la navigation connectée et l’absence de régression fonctionnelle.

Cette session ne doit pas produire de correction code sauf instruction explicite ultérieure. Elle doit produire un verdict de validation.

============================================================
LECTURE DOCUMENTAIRE OBLIGATOIRE
============================================================

Lire obligatoirement :

- ./docs/1-master/DOCUMENT_MAITRE.md
- ./docs/1-master/PLAN_DE_DEVELOPPEMENT.md
- ./docs/1-master/REFERENCE_UI_UX_A24.md
- ./docs/1-master/REFERENCE_UI_UX_A25_PLANNING.md
- le rapport produit en SESSION-20260510-01_A25_A25-PLAN-UI-01
- les résultats des sessions A25-PLAN-UI-02 à A25-PLAN-UI-05
- ./docs/1-master/MAQUETTE/README_MAQUETTES_A24.md
- ./docs/1-master/MAQUETTE/SPEC_UI_UX_MAQUETTES_AMBULANCE_MANAGER.md

Référence visuelle principale :
./docs/1-master/MAQUETTE/MAQUETTE_DA/MAQUETTES_FONDATRICES_IMAGES_V1.0/A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0/2-Planning/Planning_V1.2_INFO_DETAIL.png

============================================================
PÉRIMÈTRE DE VALIDATION
============================================================

Vérifier :

- structure générale ;
- header ;
- filtres ;
- toolbar ;
- exports ;
- onglets ;
- vue jour ;
- vue semaine ;
- vue mois ;
- cellules ;
- badges ;
- horaires ;
- équipes ;
- véhicules ;
- panneau détail ;
- panneau affectation ;
- actions principales ;
- actions secondaires ;
- actions groupées ;
- états vides ;
- états chargement ;
- états erreur ;
- mode clair ;
- mode sombre ;
- responsive minimal ;
- absence de régression fonctionnelle.

============================================================
TRAVAIL ATTENDU
============================================================

1. Relire les résultats A25-PLAN-UI-01 à A25-PLAN-UI-05.

2. Vérifier que les corrections attendues ont bien été apportées.

3. Produire des captures après si possible :
   - planning principal mode clair ;
   - planning principal mode sombre ;
   - vue jour ;
   - vue semaine ;
   - vue mois ;
   - panneau détail / affectation si accessible.

4. Vérifier les flux essentiels sans refonte :
   - navigation planning ;
   - affichage des vues ;
   - filtres ;
   - ajout shift si accessible sans action dangereuse ;
   - modification si accessible sans action dangereuse ;
   - actions d’affectation si accessibles ;
   - exports si accessibles.

5. Classer les résiduels :
   - bloquant ;
   - non bloquant ;
   - à confirmer.

6. Ne pas corriger le code dans cette session.

7. Compléter PATCH/NO_PATCH.md si aucun patch code applicatif n’est produit, en précisant que les livrables documentaires restent attendus.

8. Produire un rapport de validation global.

============================================================
VALIDATIONS TERMINALES ATTENDUES
============================================================

Avant ces validations, si l’environnement l’exige, Codex peut installer ou mettre à jour via PowerShell les dépendances, plugins, navigateurs ou outils nécessaires aux captures, vérifications et tests.
Toute commande utile doit être documentée dans `EVIDENCES.md` avec son résultat.
Ces opérations ne doivent pas devenir une modification fonctionnelle du produit.

Exécuter réellement, si l’environnement le permet :

- npm run lint
- npm run build

Si disponibles et pertinents :

- npm run test:smoke
- npm run test:targeted

Si une commande ne peut pas être exécutée, documenter précisément la raison et écrire :
INFORMATION NON FOURNIE — À CONFIRMER

============================================================
DÉFINITION OF DONE
============================================================

La session est terminée uniquement si :

- toutes les zones A25 sont vérifiées ;
- les captures après sont produites ou explicitement manquantes ;
- les validations terminales sont exécutées ou limites documentées ;
- les résiduels sont classés ;
- aucun code n’est modifié ;
- PATCH/NO_PATCH.md est complété ;
- le rapport de validation est produit ;
- la documentation finale et le ZIP sont produits.

============================================================
RÉPONSE FINALE ATTENDUE
============================================================

Répondre avec :

1. Résumé de validation
2. Sessions A25 contrôlées
3. Zones validées
4. Résiduels bloquants
5. Résiduels non bloquants
6. Points à confirmer
7. Captures produites ou manquantes
8. Validations terminales
9. Livrables documentaires
10. Verdict final

Verdict final attendu :
- PLANNING UI/UX A25 VALIDÉ : OUI
- ou
- PLANNING UI/UX A25 VALIDÉ : NON
```

## 6.2 PROMPT DE CONTRÔLE

```text
Tu es ChatGPT en discussion de contrôle qualité.

Je vais te transmettre la production de la session suivante :

- Session : SESSION-20260510-06_A25_A25-PLAN-UI-06
- Stage : 1-ALPHA
- Bloc : A25 — Planning UI/UX & ergonomie métier
- Type : VALIDATION
- Intitulé : Validation globale planning UI UX

Objectif :
Contrôler la validation globale du planning UI/UX sans rejouer la session.

Tu dois attendre avant tout contrôle :

- la réponse finale de production ;
- le rapport de validation globale ;
- les fichiers documentaires de session ;
- PATCH/NO_PATCH.md si aucun patch code applicatif n’a été produit ;
- les captures après si produites ;
- les preuves terminales ;
- le ZIP documentaire final versionné.

Règle d’attente avant contrôle :
- ne pas démarrer le contrôle à la réception de fichiers isolés, d’un ZIP intermédiaire ou d’un ZIP de dépôt complet ;
- attendre le retour complet de production et le ZIP documentaire final versionné explicitement désigné pour la session en cours ;
- si plusieurs ZIPs existent dans la conversation, contrôler uniquement la version ciblée par l’utilisateur (`V1`, `V2`, `V3`, etc.) ;
- ignorer les anciens ZIPs et les ZIPs non ciblés.

Si un élément manque, écrire exactement :
INFORMATION NON FOURNIE — À CONFIRMER

============================================================
POINTS À CONTRÔLER
============================================================

Vérifier que la validation couvre :

- les sessions A25-PLAN-UI-01 à A25-PLAN-UI-05 ;
- structure générale ;
- vues jour / semaine / mois ;
- panneaux ;
- actions ;
- mode clair ;
- mode sombre ;
- navigation ;
- absence de régression ;
- captures ;
- validations terminales ;
- classement des résiduels.

Vérifier que la session ne produit pas de correction code non justifiée.

Vérifier que le verdict est explicite.

============================================================
FORMAT DE RÉPONSE ATTENDU
============================================================

Répondre avec :

1. Informations reçues
2. Informations manquantes
3. Contrôle du périmètre de validation
4. Contrôle des captures
5. Contrôle terminal
6. Contrôle documentaire
7. Contrôle des résiduels
8. Écarts ou réserves
9. Verdict final

Verdict final obligatoire :

- SESSION A25-PLAN-UI-06 VALIDABLE : OUI
- ou
- SESSION A25-PLAN-UI-06 VALIDABLE : NON
```

---

# 7. SESSION-20260510-07_A25_CLOTURE_A25 — CLÔTURE

## 7.1 PROMPT DE PRODUCTION

```text
Tu es Codex en discussion de production.

Session validée, nous passons à la suite.

============================================================
OUVERTURE OFFICIELLE DE SESSION
============================================================

Projet : Investissement
Sous-projet : Ambulance Manager

- Session : SESSION-20260510-07_A25_CLOTURE_A25
- Stage : 1-ALPHA
- Bloc : A25 — Planning UI/UX & ergonomie métier
- Type : AUDIT+CORRECTION+COMPLÉTION+VALIDATION
- Intitulé : Clôture finale A25

Dossier de session :
docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-07_A25_CLOTURE_A25

Objectif unique de la session :
Clôturer définitivement le bloc A25 en vérifiant les sessions A25-PLAN-UI-01 à A25-PLAN-UI-06, les patchs réellement produits, les preuves terminales, les captures, la documentation finale et les résiduels éventuels.

La session doit rendre un verdict explicite :
- BLOC A25 CLÔTURABLE DÉFINITIVEMENT : OUI
- ou
- BLOC A25 CLÔTURABLE DÉFINITIVEMENT : NON

============================================================
LECTURE DOCUMENTAIRE OBLIGATOIRE
============================================================

Lire obligatoirement :

- ./docs/1-master/DOCUMENT_MAITRE.md
- ./docs/1-master/PLAN_DE_DEVELOPPEMENT.md
- ./docs/1-master/REFERENCE_UI_UX_A24.md
- ./docs/1-master/REFERENCE_UI_UX_A25_PLANNING.md
- toutes les sessions du bloc A25 :
  - SESSION-20260510-01_A25_A25-PLAN-UI-01
  - SESSION-20260510-02_A25_A25-PLAN-UI-02
  - SESSION-20260510-03_A25_A25-PLAN-UI-03
  - SESSION-20260510-04_A25_A25-PLAN-UI-04
  - SESSION-20260510-05_A25_A25-PLAN-UI-05
  - SESSION-20260510-06_A25_A25-PLAN-UI-06
- tous les PATCH/README_PATCH.md ou PATCH/NO_PATCH.md associés ;
- tous les rapports produits ;
- toutes les captures disponibles ;
- toutes les preuves terminales disponibles.

Référence visuelle principale :
./docs/1-master/MAQUETTE/MAQUETTE_DA/MAQUETTES_FONDATRICES_IMAGES_V1.0/A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0/2-Planning/Planning_V1.2_INFO_DETAIL.png

============================================================
PÉRIMÈTRE DE CLÔTURE
============================================================

Contrôler :

- audit A25 ;
- structure générale ;
- vues jour / semaine ;
- vue mois ;
- panneaux actions / affectations ;
- validation globale ;
- patchs code ;
- patchs correctifs ;
- patchs documentaires ;
- README_PATCH / NO_PATCH ;
- preuves terminales ;
- captures ;
- ZIPs documentaires ;
- résiduels ;
- cohérence avec `MAQUETTE_DA` ;
- cohérence avec `REFERENCE_UI_UX_A25_PLANNING.md` ;
- absence de dérive fonctionnelle lourde.

============================================================
RÈGLE DE CORRECTION EN CLÔTURE
============================================================

La clôture peut produire un unique correctif final minimal uniquement si :

- un résiduel est clairement identifié ;
- il est strictement nécessaire pour rendre A25 clôturable ;
- il reste dans le périmètre UI/UX A25 ;
- il ne rejoue pas les patchs précédents ;
- il est documenté séparément.

Sinon, ne pas produire de patch code.

============================================================
TRAVAIL ATTENDU
============================================================

1. Vérifier que chaque session A25 possède :
   - SESSION.md ;
   - NOTES.md ;
   - EVIDENCES.md ;
   - RESULTATS.md ;
   - FIN_SESSION.md ;
   - PATCH/README_PATCH.md ou PATCH/NO_PATCH.md ;
   - ZIP documentaire final versionné si attendu.

2. Vérifier que les patchs code sont présents, ciblés et documentés pour les sessions de correction.

3. Vérifier que les sessions d’audit et validation ne produisent pas de code non justifié.

4. Vérifier que les preuves terminales existent ou que leur absence est explicitement documentée.

5. Vérifier que les captures existent ou que leur absence est explicitement documentée.

6. Vérifier que les résiduels sont classés.

7. Décider si le bloc A25 est clôturable définitivement.

8. Produire un rapport de clôture final.

9. Finaliser la documentation de session de clôture.

10. Produire le ZIP documentaire final de clôture versionné.

============================================================
VALIDATIONS TERMINALES ATTENDUES
============================================================

Si le code final A25 est présent dans le dépôt, exécuter réellement, si l’environnement le permet :

- npm run lint
- npm run build

Si disponibles et pertinents :

- npm run test:smoke
- npm run test:targeted

Si une commande ne peut pas être exécutée, documenter précisément la raison et écrire :
INFORMATION NON FOURNIE — À CONFIRMER

============================================================
DÉFINITION OF DONE
============================================================

La clôture est terminée uniquement si :

- toutes les sessions A25 sont contrôlées ;
- tous les patchs et NO_PATCH sont vérifiés ;
- la documentation finale est cohérente ;
- les preuves terminales sont listées ;
- les captures sont listées ;
- les résiduels sont classés ;
- le verdict de clôture est explicite ;
- le ZIP documentaire final de clôture versionné est produit.

============================================================
RÉPONSE FINALE ATTENDUE
============================================================

Répondre avec :

1. Résumé de clôture A25
2. Sessions contrôlées
3. Patchs contrôlés
4. Captures contrôlées
5. Preuves terminales contrôlées
6. Résiduels bloquants
7. Résiduels non bloquants
8. Documentation finale produite
9. ZIP documentaire final versionné
10. Verdict final obligatoire

Verdict final obligatoire :

BLOC A25 CLÔTURABLE DÉFINITIVEMENT : OUI

ou

BLOC A25 CLÔTURABLE DÉFINITIVEMENT : NON
```

## 7.2 PROMPT DE CONTRÔLE

```text
Tu es ChatGPT en discussion de contrôle qualité.

Je vais te transmettre la production de clôture finale du bloc suivant :

- Session : SESSION-20260510-07_A25_CLOTURE_A25
- Stage : 1-ALPHA
- Bloc : A25 — Planning UI/UX & ergonomie métier
- Type : AUDIT+CORRECTION+COMPLÉTION+VALIDATION
- Intitulé : Clôture finale A25

Objectif :
Contrôler la clôture finale A25 sans rejouer les sessions et sans refaire l’audit du repo.

Tu dois attendre avant tout contrôle :

- la réponse finale de production ;
- le rapport de clôture A25 ;
- les fichiers documentaires de clôture ;
- le patch final minimal si applicable ;
- le fichier PATCH/NO_PATCH.md si aucun patch code applicatif n’a été produit ;
- la liste des sessions A25 contrôlées ;
- les patchs A25 référencés ;
- les captures référencées ;
- les preuves terminales ;
- le ZIP documentaire final de clôture versionné.

Règle d’attente avant contrôle :
- ne pas démarrer le contrôle à la réception de fichiers isolés, d’un ZIP intermédiaire ou d’un ZIP de dépôt complet ;
- attendre le retour complet de production et le ZIP documentaire final versionné explicitement désigné pour la session en cours ;
- si plusieurs ZIPs existent dans la conversation, contrôler uniquement la version ciblée par l’utilisateur (`V1`, `V2`, `V3`, etc.) ;
- ignorer les anciens ZIPs et les ZIPs non ciblés.

Si un élément manque, écrire exactement :
INFORMATION NON FOURNIE — À CONFIRMER

============================================================
RÈGLES DE CONTRÔLE
============================================================

Tu ne dois pas :
- rejouer les sessions A25 ;
- refaire l’audit complet du repo ;
- inventer des preuves ;
- supposer qu’un patch existe sans l’avoir reçu ;
- supposer qu’une capture existe sans l’avoir reçue ;
- contrôler un ancien ZIP ;
- contrôler un ZIP de dépôt complet ou non explicitement désigné comme ZIP documentaire final versionné de la session ;
- combler les manques par hypothèse ;
- utiliser un ZIP déjà validé comme source officielle durable au lieu de la documentation du repo.

Tu dois contrôler uniquement ce qui est fourni dans la production de clôture.

============================================================
POINTS À CONTRÔLER
============================================================

Vérifier que la clôture couvre :

- A25-PLAN-UI-01 ;
- A25-PLAN-UI-02 ;
- A25-PLAN-UI-03 ;
- A25-PLAN-UI-04 ;
- A25-PLAN-UI-05 ;
- A25-PLAN-UI-06 ;
- patchs code ;
- patchs documentaires ;
- README_PATCH / NO_PATCH ;
- preuves terminales ;
- captures ;
- résiduels ;
- ZIP final ;
- verdict explicite.

Vérifier que la clôture respecte le périmètre A25 :

- UI/UX planning ;
- ergonomie métier ;
- pas de refonte fonctionnelle lourde ;
- pas de nouveau moteur planning ;
- pas de refonte autoschedule / matching ;
- pas de refonte RBAC / Prisma / API lourde.

Vérifier que le verdict final est exactement l’un des deux :

- BLOC A25 CLÔTURABLE DÉFINITIVEMENT : OUI
- BLOC A25 CLÔTURABLE DÉFINITIVEMENT : NON

============================================================
FORMAT DE RÉPONSE ATTENDU
============================================================

Répondre avec :

1. Informations reçues
2. Informations manquantes
3. Contrôle des sessions A25
4. Contrôle des patchs
5. Contrôle des captures
6. Contrôle des preuves terminales
7. Contrôle documentaire et ZIP
8. Contrôle des résiduels
9. Écarts ou réserves
10. Verdict final

Verdict final obligatoire :

- CLOTURE A25 VALIDABLE : OUI
- ou
- CLOTURE A25 VALIDABLE : NON

Puis reprendre ou refuser le verdict de production :

- BLOC A25 CLÔTURABLE DÉFINITIVEMENT : OUI
- ou
- BLOC A25 CLÔTURABLE DÉFINITIVEMENT : NON
```
