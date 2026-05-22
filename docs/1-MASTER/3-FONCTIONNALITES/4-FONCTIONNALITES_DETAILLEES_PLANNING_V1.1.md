# Ambulance Manager — Fonctionnalités détaillées — Planning V1

Version : V1 (MASTER)  
Date : 18/05/2026

## Sommaire

- [1. Objectif de la page](#1-objectif-de-la-page)
- [2. Positionnement fonctionnel](#2-positionnement-fonctionnel)
- [3. Périmètre V1 / Alpha validé](#3-périmètre-v1--alpha-validé)
- [4. Principes structurants du Planning](#4-principes-structurants-du-planning)
- [5. Types de vues Planning](#5-types-de-vues-planning)
- [6. Structure d’une case Planning](#6-structure-dune-case-planning)
- [7. Création d’une affectation Planning](#7-création-dune-affectation-planning)
- [8. Préparation hebdomadaire des besoins](#8-préparation-hebdomadaire-des-besoins)
- [9. Utilisation des modèles horaires](#9-utilisation-des-modèles-horaires)
- [10. Affectation des utilisateurs](#10-affectation-des-utilisateurs)
- [11. Affectation des véhicules](#11-affectation-des-véhicules)
- [12. Statuts du Planning, publication et visibilité](#12-statuts-du-planning-publication-et-visibilité)
- [13. Modification, annulation logique et historique](#13-modification-annulation-logique-et-historique)
- [14. Filtres, navigation et lisibilité](#14-filtres-navigation-et-lisibilité)
- [15. Conflits, alertes simples et contrôles métier](#15-conflits-alertes-simples-et-contrôles-métier)
- [16. Accès, permissions et rôles](#16-accès-permissions-et-rôles)
- [17. Audit et traçabilité](#17-audit-et-traçabilité)
- [18. États de la page](#18-états-de-la-page)
- [19. Impacts sur les autres fiches](#19-impacts-sur-les-autres-fiches)
- [20. Éléments exclus du périmètre V1 / Alpha](#20-éléments-exclus-du-périmètre-v1--alpha)
- [21. Évolutions futures / à ne pas oublier](#21-évolutions-futures--à-ne-pas-oublier)
- [22. Points à confirmer](#22-points-à-confirmer)

---

## 1. Objectif de la page

La page **Planning** permet d’organiser l’activité opérationnelle de la société sous forme d’affectations synthétiques.

Elle sert à préparer, visualiser, publier et modifier l’organisation des semaines, des jours, des utilisateurs, des véhicules et des besoins à couvrir.

La page doit permettre de répondre rapidement aux questions suivantes :

- quel modèle ou type d’activité est prévu pour chaque utilisateur sur une semaine donnée ;
- quels besoins obligatoires doivent être couverts sur une semaine ;
- quels utilisateurs sont affectés ;
- quels véhicules sont affectés ;
- quels éléments sont encore à couvrir, incomplets ou à vérifier ;
- quelles informations sont visibles par les utilisateurs terrain ;
- quelles actions ont été réalisées après publication.

La page **Planning V1 / Alpha** est un planning manuel métier.

Elle doit rester centrée sur :

- les modèles horaires ;
- les besoins hebdomadaires ;
- les affectations utilisateurs ;
- les affectations véhicules ;
- les vues synthétiques ;
- la publication ;
- les modifications tracées ;
- les alertes simples ;
- la lisibilité.

Elle ne doit pas devenir en Alpha :

- une page de missions / courses / transports patients ;
- une régulation opérationnelle en temps réel ;
- un module de facturation ;
- un module de paie ;
- un calculateur complet d’heures travaillées ;
- un moteur de planification automatique avancée ;
- un moteur d’affectation automatique optimisée avancée.

---

## 2. Positionnement fonctionnel

### 2.1 Planning manuel métier

La page **Planning** est la page centrale d’organisation des affectations.

En Alpha, elle repose sur une logique principalement manuelle :

```text
Préparer la semaine
Définir les besoins à couvrir
Affecter les utilisateurs
Affecter les véhicules
Publier la semaine
Tracer les modifications importantes
```

Le Planning doit aider le planificateur, mais il ne doit pas décider automatiquement à sa place.

### 2.2 Ce que le Planning n’est pas

Le Planning ne doit pas être confondu avec :

```text
Missions / courses / transports patients
= gestion opérationnelle détaillée des transports

Régulation temps réel
= suivi et adaptation en direct de l’activité

Heures / Horaires
= saisie, calcul et suivi avancé du temps de travail

Facturation
= module économique et administratif dédié

Paie
= module RH / paie dédié
```

Ces sujets pourront exister dans d’autres pages ou modules, mais ils ne doivent pas être mélangés au Planning Alpha.

### 2.3 Préparation de la Beta

Le Planning Alpha doit être construit proprement pour préparer la suite.

Les termes français retenus sont :

```text
Planification automatique
Affectation automatique optimisée
```

La **planification automatique** et l’**affectation automatique optimisée** sont prévues pour la Beta.

Elles ne font pas partie du cœur fonctionnel du Planning Alpha.

---

## 3. Périmètre V1 / Alpha validé

Fonctionnalités validées pour la page **Planning V1 / Alpha** :

- planning manuel métier ;
- vue globale annuelle utilisateurs × semaines ;
- vue personnelle type agenda synthétique ;
- vue mois claire pour l’organisation personnelle ;
- vue semaine synthétique ;
- vue jour synthétique ;
- distinction entre lecture simple et gestion ;
- aucune vue détaillée heure par heure ;
- matrice annuelle affichant le modèle horaire ou le type affecté dans chaque case ;
- synchronisation avec les jours, dates, mois, années et numéros de semaine ;
- annotations visuelles légères pour jour férié, samedi, dimanche et week-end complet ;
- case Planning avec fond blanc et libellé dans un badge coloré ;
- libellé prioritaire issu du libellé court Planning du modèle horaire ;
- états simples : **REPOS**, **ABSENT**, **INDISPONIBLE**, **NON PLANIFIÉ**, **À AFFECTER** ;
- création principale par utilisateur + semaine + modèle / type / état ;
- précision par jour si nécessaire, sans détail heure par heure ;
- création depuis un modèle horaire ;
- création sans modèle horaire pour les états simples ;
- duplication, remplacement, vidage et application sur plusieurs semaines ;
- préparation hebdomadaire des besoins à couvrir ;
- états de couverture des besoins : **À couvrir**, **Couvert**, **Incomplet**, **Non affecté**, **À vérifier** ;
- utilisation des modèles horaires comme base de création ;
- indépendance de l’affectation Planning après création ;
- affectation manuelle des utilisateurs ;
- affectation manuelle des véhicules ;
- distinction **TPMR VSL** et **TPMR TAXI** ;
- statuts Planning : **Brouillon**, **Publié**, **Modifié après publication**, **Annulé**, **À vérifier** ;
- publication principale par semaine ;
- modification après publication avec traçabilité obligatoire ;
- annulation logique sans suppression physique après publication ;
- motif obligatoire pour annulation après publication ;
- motif obligatoire pour modification sensible après publication ;
- filtres par période, utilisateur, rôle, base / dépôt, modèle, type d’affectation, véhicule, statut et état de couverture ;
- recherche rapide en mode gestion ;
- panneau de détail selon permissions ;
- alertes simples et conflits évidents en mode gestion ;
- affichage du nombre d’utilisateurs terrain disponibles sur la période ;
- permissions Planning dédiées ;
- audit et traçabilité des actions importantes.

---

## 4. Principes structurants du Planning

### 4.1 Aucune vue détaillée heure par heure

Règle structurante validée :

```text
Aucune vue du Planning V1 / Alpha ne doit être une vue détaillée heure par heure de tous les créneaux.
```

Le Planning fonctionne principalement par :

- modèles horaires ;
- types d’affectation ;
- semaines ;
- jours synthétiques ;
- besoins à couvrir ;
- repères lisibles.

Les horaires précis pouvant être connus seulement la veille pour le lendemain, les vues doivent rester lisibles, synthétiques et adaptées à cette réalité métier.

### 4.2 Sens du mot créneau dans cette fiche

Dans cette fiche, lorsqu’un terme comme **créneau** est utilisé, il doit être compris comme une affectation Planning ou un élément synthétique d’organisation.

Il ne signifie pas une grille complète heure par heure.

La terminologie privilégiée est :

- affectation Planning ;
- case Planning ;
- besoin hebdomadaire ;
- modèle / type affecté ;
- élément Planning.

### 4.3 Matrice annuelle

La vue globale principale fonctionne sous forme de matrice annuelle :

```text
Lignes = utilisateurs
Colonnes = semaines
Case = modèle horaire ou type affecté
```

Exemple :

```text
Utilisateur : Nathan
S21 : VSL
```

La case **S21** affiche donc :

```text
VSL
```

### 4.4 Couleur et lisibilité

La couleur ne doit jamais porter seule une information métier critique.

Règle validée :

```text
La case reste avec un fond blanc.
Le libellé principal est affiché dans un encadré / badge de couleur.
La couleur est définie par l’utilisateur qui fait le planning.
```

Le libellé reste obligatoire.

---

## 5. Types de vues Planning

### 5.1 Principe général des vues

Le Planning V1 / Alpha propose plusieurs vues, mais toutes restent synthétiques.

Chaque vue doit distinguer :

- un mode **lecture simple** ;
- un mode **gestion**.

La différence porte sur :

- les actions disponibles ;
- les informations visibles ;
- les alertes visibles ;
- les détails sensibles affichés ou masqués.

### 5.2 Vue globale annuelle

La vue globale annuelle est une vue majeure du Planning.

Elle affiche :

- une ligne par utilisateur ;
- des colonnes de semaines ;
- le modèle horaire ou le type affecté dans chaque case.

Exemple :

```text
Utilisateur     S20       S21       S22
Nathan          AMB       VSL       TAXI
Utilisateur 2   REPOS     AMB       VSL
```

La vue doit être synchronisée avec :

- les jours ;
- les dates ;
- les mois ;
- les années ;
- les numéros de semaine.

La période cible couvre l’année civile du **01/01/AAAA au 31/12/AAAA**.

La gestion exacte des années avec semaine 53 reste à confirmer.

### 5.3 Vue personnelle

La vue personnelle est destinée à l’utilisateur connecté.

Elle doit avoir une logique visuelle proche d’un agenda synthétique.

Elle affiche notamment :

- mes semaines ;
- mes jours ;
- mes modèles affectés ;
- mes types d’affectation ;
- mon véhicule si connu ;
- mon équipe / binôme si connu ;
- mes informations visibles selon permissions.

Elle ne devient pas une vue détaillée heure par heure.

### 5.4 Vue mois

La vue mois est importante pour les utilisateurs terrain.

Elle permet aux salariés de s’organiser dans leur vie personnelle.

Elle doit être :

- claire ;
- lisible ;
- synthétique ;
- utile pour anticiper ;
- navigable vers une semaine ou une journée.

Elle n’est pas une vue principale de gestion détaillée.

Elle peut afficher :

- jours travaillés ;
- repos ;
- modèle ou type affecté ;
- samedi ;
- dimanche ;
- jour férié ;
- week-end complet ;
- informations visibles selon permissions.

### 5.5 Vue semaine

La vue semaine permet de comprendre la semaine sans détail heure par heure.

Elle peut afficher :

- modèle ou type de semaine ;
- jours actifs si définis dans le modèle ;
- repos automatiquement déduit ;
- besoins de la semaine ;
- utilisateurs concernés ;
- véhicules si utile ;
- état de couverture en mode gestion.

### 5.6 Vue jour

La vue jour est utile pour le jour courant ou le lendemain.

Elle affiche uniquement les informations disponibles :

- modèle du jour ;
- horaire si déjà renseigné ;
- véhicule si affecté ;
- équipe / binôme si affecté ;
- informations utiles selon permissions.

Elle ne doit pas devenir une grille horaire complète.

### 5.7 Annotations calendaires particulières

Les différentes vues du Planning doivent prévoir une annotation visuelle simple lorsqu’un utilisateur est planifié sur une période particulière :

- jour férié ;
- samedi ;
- dimanche ;
- week-end complet.

Ces annotations doivent rester légères et lisibles.

Elles servent à repérer rapidement les périodes particulières sans transformer le Planning en vue détaillée heure par heure.

Exemples :

```text
Férié
Samedi
Dimanche
Week-end
```

Le niveau de détail affiché dépend du contexte de la vue et des permissions.

---

## 6. Structure d’une case Planning

### 6.1 Principe général

Une case Planning affiche une information synthétique.

Elle répond rapidement à la question :

```text
Qu’est-ce qui est prévu pour cette personne sur cette période ?
```

Elle ne doit pas devenir une fiche détaillée complète.

### 6.2 Libellé prioritaire

Le libellé prioritaire est le **libellé court Planning** du modèle horaire.

Si aucun libellé court n’est disponible, la case peut afficher :

- le type d’affectation ;
- le type de véhicule ;
- le nom du modèle horaire ;
- un état simple.

Exemples :

```text
VSL
AMBULANCE
TAXI
TPMR
REPOS
ABSENT
NON PLANIFIÉ
```

### 6.3 États simples validés

Les états simples validés sont :

- **REPOS** ;
- **ABSENT** ;
- **INDISPONIBLE** ;
- **NON PLANIFIÉ** ;
- **À AFFECTER**.

Règle importante :

```text
NON PLANIFIÉ ne signifie pas automatiquement ABSENT.
```

Un utilisateur peut être non planifié sans être absent.

### 6.4 Affichage visuel

La case garde un fond blanc.

Le libellé principal est affiché dans un encadré / badge de couleur intégré dans la case.

La couleur :

- est définie par l’utilisateur qui fait le planning ;
- sert de repère visuel ;
- doit rester esthétique ;
- ne doit jamais être le seul élément porteur d’une information métier critique.

### 6.5 Informations secondaires possibles

Selon la vue et les permissions, une case peut afficher des repères légers :

- annotation jour férié ;
- annotation samedi ;
- annotation dimanche ;
- annotation week-end ;
- véhicule si utile ;
- équipe / binôme si utile ;
- base / dépôt si utile ;
- indicateur **Incomplet** ;
- indicateur **À vérifier** ;
- indicateur de conflit en mode gestion.

Ces informations ne doivent pas surcharger la case.

Les détails complets doivent être affichés dans le panneau de détail.

---

## 7. Création d’une affectation Planning

### 7.1 Principe général

La création principale repose sur :

```text
Utilisateur + Semaine + Modèle / Type / État
```

Exemple :

```text
Utilisateur : Nathan
Semaine : S21
Affectation : VSL
```

Dans la matrice annuelle :

```text
S21 = VSL
```

### 7.2 Création depuis la matrice annuelle

La création peut se faire depuis une case :

```text
Utilisateur × Semaine
```

Exemple :

```text
Nathan / S21
```

L’utilisateur autorisé choisit ensuite :

- un modèle horaire ;
- un type d’affectation ;
- un état simple.

### 7.3 Précision par jour

Une précision par jour doit être possible si nécessaire.

Exemples :

- lundi : REPOS ;
- mardi : VSL ;
- samedi : AMBULANCE avec annotation **Samedi** ;
- jour férié : VSL avec annotation **Férié**.

Même avec une précision par jour, le Planning ne devient pas une grille détaillée heure par heure.

### 7.4 Création depuis un modèle horaire

La création depuis un modèle horaire est validée.

Elle reprend notamment :

- le libellé court Planning ;
- le type de véhicule attendu ;
- la composition attendue ;
- la base / dépôt si renseignée ;
- les jours actifs si définis ;
- les horaires par jour si définis.

La couleur du badge est définie par l’utilisateur qui fait le planning.

### 7.5 Création sans modèle horaire

La création sans modèle horaire est validée pour :

- **REPOS** ;
- **ABSENT** ;
- **INDISPONIBLE** ;
- **NON PLANIFIÉ** ;
- **À AFFECTER**.

Cela évite de créer un modèle horaire pour chaque cas particulier.

### 7.6 Actions simples

Actions simples à prévoir en Alpha :

- créer une affectation ;
- modifier une affectation ;
- remplacer une affectation ;
- vider une affectation en brouillon ;
- dupliquer une affectation ;
- appliquer une affectation sur plusieurs semaines ;
- mettre REPOS ;
- mettre ABSENT ;
- mettre INDISPONIBLE ;
- mettre NON PLANIFIÉ ;
- mettre À AFFECTER.

Ces actions évitent de remplir l’année case par case.

### 7.7 Contrôles simples à la création

Contrôles simples à prévoir :

- utilisateur inactif ou archivé ;
- utilisateur absent ou indisponible ;
- modèle inactif ou archivé ;
- véhicule indisponible si véhicule choisi ;
- conflit évident ;
- composition incomplète.

Ces contrôles ne doivent pas devenir un moteur automatique avancé.

---

## 8. Préparation hebdomadaire des besoins

### 8.1 Principe validé

En Alpha, le Planning doit permettre une préparation hebdomadaire manuelle des besoins à couvrir.

Pour chaque semaine, Admin, Gérant ou utilisateur autorisé peut définir les modèles horaires obligatoires ou attendus.

Ces modèles servent de checklist de couverture avant ou pendant l’affectation des utilisateurs.

Cette logique aide à éviter les oublis, notamment pour les gardes variables d’une semaine à l’autre, sans devenir une planification automatique avancée.

### 8.2 Besoins de la semaine

Avant d’affecter les utilisateurs, la personne qui fait le planning doit pouvoir définir les modèles / besoins obligatoires de la semaine.

Exemple :

```text
Semaine 21
- Garde jeudi / vendredi / samedi / dimanche
- VSL journée
- TAXI journée
- AMBULANCE journée
- Renfort week-end
```

### 8.3 États de couverture

Les états simples des besoins sont validés :

- **À couvrir** ;
- **Couvert** ;
- **Incomplet** ;
- **Non affecté** ;
- **À vérifier**.

Exemple :

```text
VSL journée — Couvert
TAXI journée — Couvert
Garde week-end — Incomplet
AMBULANCE nuit — À couvrir
```

### 8.4 Visibilité

La préparation hebdomadaire des besoins est visible en mode gestion pour :

- Admin ;
- Gérant ;
- utilisateur autorisé.

Elle n’est pas destinée aux utilisateurs en lecture simple.

---

## 9. Utilisation des modèles horaires

### 9.1 Modèle horaire comme base de création

Les modèles horaires servent à créer plus rapidement les affectations Planning.

Ils peuvent préremplir :

- le libellé court Planning ;
- le type de véhicule attendu ;
- la composition attendue ;
- la base / dépôt si renseignée ;
- les jours actifs ;
- les horaires par jour ;
- les annotations utiles comme nuit ou `J+1`.

### 9.2 Indépendance de l’affectation créée

Règle validée :

```text
Une affectation créée depuis un modèle reste indépendante du modèle.
```

Conséquences :

- modifier un modèle horaire plus tard ne modifie pas automatiquement les affectations Planning déjà créées ;
- l’affectation Planning conserve ses propres informations ;
- le modèle reste une base de création, pas une dépendance permanente bloquante.

### 9.3 Modèles actifs, inactifs et archivés

Seuls les modèles actifs et non archivés sont proposés normalement dans le Planning.

Règles :

- modèle actif + non archivé : proposé normalement ;
- modèle inactif : non proposé normalement pour une nouvelle affectation ;
- modèle archivé : masqué ;
- affectation déjà créée depuis un ancien modèle : reste visible.

### 9.4 Jours actifs et horaires par jour

Un modèle horaire doit pouvoir définir facultativement les jours où il est actif.

Un modèle horaire doit pouvoir définir des horaires différents selon les jours, si nécessaire.

Ces horaires restent facultatifs pour les modèles génériques.

Exemple :

```text
Modèle : Garde
Jeudi : 21h → 7h J+1
Vendredi : 21h → 7h J+1
Samedi : 19h → 5h J+1
Dimanche : 19h → 5h J+1
```

Si ce modèle est affecté à un utilisateur sur une semaine :

```text
Lundi : REPOS
Mardi : REPOS
Mercredi : REPOS
Jeudi : GARDE
Vendredi : GARDE
Samedi : GARDE
Dimanche : GARDE
```

Cette logique génère des repères travaillés / repos, mais ne transforme pas le Planning en agenda complet heure par heure.

### 9.5 Composition attendue

La composition attendue du modèle guide le planificateur.

Exemples :

- 1 ADE ;
- 1 ADE + 1 AA ;
- 1 TAXI ;
- 1 PSC1 ;
- composition spécifique selon modèle.

Dans le Planning, cette composition sert à :

- guider l’affectation ;
- signaler une affectation incomplète ;
- préparer l’affectation automatique optimisée en Beta.

En Alpha, elle ne devient pas un moteur automatique avancé.

### 9.6 Type de véhicule attendu

Le type de véhicule attendu peut être :

- **AMBULANCE** ;
- **VSL** ;
- **TAXI** ;
- **TPMR** ;
- **TPMR VSL** ;
- **TPMR TAXI**.

La distinction **TPMR VSL** / **TPMR TAXI** doit être prise en compte dans les besoins Planning.

### 9.7 Compteur Nb utilisé

Le compteur **Nb utilisé** augmente lorsqu’une affectation est créée depuis le modèle.

Ce compteur mesure l’utilisation du modèle comme base de création.

Il ne sert pas de preuve métier stricte.

Il ne diminue pas automatiquement si l’affectation est ensuite modifiée.

---

## 10. Affectation des utilisateurs

### 10.1 Principe général

L’affectation des utilisateurs reste manuelle en Alpha.

Elle est guidée par :

- les besoins de la semaine ;
- les modèles horaires ;
- les rôles ;
- les absences / indisponibilités ;
- les permissions.

### 10.2 Utilisateurs proposés normalement

Les utilisateurs suivants ne sont pas proposés normalement à l’affectation :

- utilisateurs inactifs ;
- utilisateurs archivés ;
- utilisateurs absents sur la période ;
- utilisateurs indisponibles sur la période.

Une demande d’absence en attente ne bloque pas automatiquement l’affectation.

### 10.3 Affectation depuis la checklist des besoins

Le planificateur peut affecter les utilisateurs depuis la checklist des besoins hebdomadaires.

Exemple :

```text
Besoin : Garde week-end
État : À couvrir
Action : Affecter utilisateur
```

Après affectation :

```text
Besoin : Garde week-end
État : Couvert ou Incomplet
Utilisateur : Nathan
```

### 10.4 Affectation depuis la matrice annuelle

Le planificateur peut aussi affecter directement depuis une case :

```text
Utilisateur × Semaine
```

Exemple :

```text
Nathan / S21 → VSL
```

### 10.5 Composition d’équipe

Les compositions d’équipe doivent gérer les états :

- **Complet** ;
- **Incomplet** ;
- **À affecter**.

Exemple :

```text
AMBULANCE — Incomplet
ADE : Nathan
AA : À affecter
```

### 10.6 Rôles métier concernés

Les rôles métier à prendre en compte selon les besoins validés incluent notamment :

- ADE ;
- AA ;
- PSC1 ;
- TAXI ;
- Bureau selon permissions ;
- autres profils selon permissions.

Les règles précises de compatibilité entre rôles, modèles horaires et types de véhicules restent à confirmer.

---

## 11. Affectation des véhicules

### 11.1 Principe général

L’affectation des véhicules reste manuelle en Alpha.

Elle est guidée par :

- le modèle horaire ;
- le type de véhicule attendu ;
- la disponibilité générale ;
- le statut administratif ;
- le suivi véhicule ;
- les permissions.

### 11.2 Véhicules proposés normalement

Seuls les véhicules suivants sont proposés normalement :

- véhicules actifs ;
- véhicules non archivés ;
- véhicules disponibles ;
- véhicules compatibles avec le type attendu.

Les véhicules suivants ne sont pas proposés normalement :

- véhicules inactifs ;
- véhicules archivés ;
- véhicules indisponibles ;
- véhicules dont le type ne correspond pas au besoin ;
- véhicules déjà affectés sur une période incompatible, si l’information est connue.

### 11.3 Base / dépôt du véhicule

La base / dépôt du véhicule sert de repère.

Elle ne bloque pas automatiquement l’affectation.

Règle validée :

```text
Un véhicule peut être affecté même s’il est rattaché à une autre base / dépôt.
```

Cette règle existe parce qu’un véhicule peut ne pas rentrer à sa base principale le soir.

### 11.4 Distinction TPMR

La distinction **TPMR VSL** et **TPMR TAXI** doit être prise en compte dans les besoins Planning.

Exemples :

```text
Besoin : TPMR VSL
Véhicule attendu : véhicule compatible TPMR VSL
```

```text
Besoin : TPMR TAXI
Véhicule attendu : véhicule compatible TPMR TAXI
```

### 11.5 Affichage du véhicule

Le véhicule exact ne doit pas surcharger la vue globale annuelle.

Il peut être visible :

- dans le panneau de détail ;
- dans la vue semaine ;
- dans la vue jour ;
- dans la vue personnelle si utile pour l’utilisateur ;
- selon permissions.

### 11.6 Anomalies, vérifications et désinfections

Les anomalies, vérifications ou désinfections ne rendent pas automatiquement un véhicule indisponible dans le Planning.

Un véhicule devient indisponible uniquement par action explicite autorisée.

Le Planning peut afficher une alerte si une information de suivi est utile, mais il ne change pas automatiquement la disponibilité du véhicule.

### 11.7 Conflits simples véhicule

Conflits simples à prévoir en mode gestion :

- véhicule déjà affecté ;
- véhicule indisponible ;
- véhicule inactif ;
- véhicule archivé ;
- type incompatible ;
- véhicule manquant alors que le besoin en demande un.

---

## 12. Statuts du Planning, publication et visibilité

### 12.1 Statuts validés

Les statuts Planning validés sont :

- **Brouillon** ;
- **Publié** ;
- **Modifié après publication** ;
- **Annulé** ;
- **À vérifier**.

### 12.2 Brouillon

Le statut **Brouillon** correspond à une préparation non encore publiée.

Visible pour :

- Admin ;
- Gérant ;
- utilisateur autorisé.

Les utilisateurs terrain ne voient pas normalement les éléments brouillon.

### 12.3 Publié

Le statut **Publié** correspond à une information validée et visible par les utilisateurs concernés.

La publication principale se fait par semaine en Alpha.

### 12.4 Modifié après publication

Le statut **Modifié après publication** permet d’identifier qu’un planning publié a changé.

Il peut concerner :

- changement de modèle ;
- changement d’utilisateur ;
- changement de véhicule ;
- changement d’état ;
- modification d’un besoin hebdomadaire ;
- ajout d’une affectation après publication.

### 12.5 Annulé

Le statut **Annulé** correspond à une annulation logique.

Il n’y a aucune suppression physique après publication.

Le motif est obligatoire pour une annulation après publication.

### 12.6 À vérifier

Le statut **À vérifier** permet de marquer un élément nécessitant un contrôle.

Exemples :

- composition incomplète ;
- véhicule manquant ;
- besoin non couvert ;
- incohérence détectée ;
- alerte forte.

### 12.7 Visibilité selon publication

Les utilisateurs terrain voient uniquement le planning publié, sauf permission spécifique.

Admin, Gérant et utilisateurs autorisés peuvent voir :

- brouillons ;
- éléments publiés ;
- modifications après publication ;
- éléments annulés ;
- éléments à vérifier.

---

## 13. Modification, annulation logique et historique

### 13.1 Modification avant publication

Avant publication, les modifications restent simples car le Planning est encore en brouillon.

Il est possible de modifier :

- modèle ;
- utilisateur ;
- véhicule ;
- état ;
- couleur du badge ;
- besoin hebdomadaire ;
- composition ;
- information interne.

La suppression ou le vidage d’une case est possible en brouillon.

### 13.2 Modification après publication

Après publication, toute modification importante doit être tracée.

Exemples :

- changement de modèle ;
- changement d’utilisateur ;
- changement de véhicule ;
- changement d’état ;
- remplacement d’une affectation ;
- modification d’un besoin obligatoire ;
- annulation logique.

Le statut **Modifié après publication** doit permettre d’identifier qu’un planning publié a changé.

### 13.3 Motifs

Le motif est obligatoire pour :

- une annulation après publication ;
- une modification sensible après publication.

Le motif n’est pas forcément obligatoire pour toute modification mineure après publication, afin de ne pas alourdir l’usage.

### 13.4 Annulation logique

Une affectation publiée annulée passe en annulation logique.

Elle conserve :

- l’affectation initiale ;
- la date ;
- l’auteur ;
- le motif ;
- le statut précédent.

Aucune suppression physique n’est autorisée après publication.

### 13.5 Remplacement d’une affectation

Le remplacement d’une affectation publiée ne doit pas écraser l’ancienne sans trace.

Exemple :

```text
Ancienne affectation : VSL
Nouvelle affectation : TAXI
Modifié par : Admin
Motif : remplacement organisationnel
```

### 13.6 Historique minimal

L’historique minimal doit permettre de savoir :

```text
Qui a fait quoi, quand, et sur quelle affectation ?
```

Il conserve notamment :

- création ;
- publication ;
- modification après publication ;
- annulation ;
- changement d’utilisateur ;
- changement de véhicule ;
- changement de modèle ;
- changement d’état ;
- modification d’un besoin hebdomadaire.

L’historique minimal est visible dans le détail Planning en mode gestion.

L’historique plus complet relève de la page **Audit** si l’utilisateur y est autorisé.

---

## 14. Filtres, navigation et lisibilité

### 14.1 Navigation temporelle

Le Planning doit permettre une navigation par :

- année ;
- mois ;
- semaine ;
- jour.

### 14.2 Navigation dans la matrice annuelle

La matrice annuelle doit permettre :

- de choisir l’année ;
- de revenir rapidement à la période courante ;
- d’ouvrir le détail d’une case ;
- de lire clairement les semaines ;
- de garder les utilisateurs identifiables.

La gestion exacte de la semaine 53 reste à confirmer.

### 14.3 Filtres Alpha

Les filtres Alpha incluent :

- période ;
- utilisateur ;
- rôle ;
- base / dépôt ;
- modèle horaire ;
- type d’affectation ;
- véhicule ;
- statut Planning ;
- état de couverture.

Les filtres visibles dépendent des permissions.

### 14.4 Recherche rapide

Une recherche rapide est prévue en mode gestion.

Elle peut permettre de rechercher :

- un utilisateur ;
- un véhicule ;
- un modèle horaire ;
- une base / dépôt ;
- une semaine ;
- un besoin.

### 14.5 Lisibilité de la matrice

La matrice annuelle doit rester lisible avec :

- cases compactes ;
- libellé court ;
- badge coloré ;
- fond blanc ;
- détails limités ;
- panneau de détail au clic.

Le véhicule, l’historique, les conflits et les détails ne doivent pas surcharger la case.

### 14.6 Panneau de détail

Un panneau de détail doit afficher les informations complètes selon permissions.

Il peut contenir :

- utilisateur ;
- semaine / jour ;
- modèle ;
- état ;
- véhicule ;
- équipe / composition ;
- base / dépôt ;
- besoin lié ;
- statut de publication ;
- annotations ;
- historique minimal ;
- actions disponibles.

En lecture simple, le panneau affiche uniquement les informations utiles et autorisées.

En gestion, il affiche les détails et actions autorisées.

### 14.7 Indicateurs visuels

Les annotations visuelles doivent rester légères et toujours accompagnées d’un libellé clair.

Exemples :

- Férié ;
- Samedi ;
- Dimanche ;
- Week-end ;
- Incomplet ;
- À vérifier ;
- Modifié.

Aucun indicateur visuel ne doit remplacer un libellé explicite.

---

## 15. Conflits, alertes simples et contrôles métier

### 15.1 Principe général

Le Planning Alpha doit afficher des alertes simples et des conflits évidents pour aider le planificateur.

Ces alertes ne doivent pas transformer le Planning en moteur automatique avancé.

### 15.2 Alertes sur les besoins hebdomadaires

Alertes validées :

- besoin **À couvrir** ;
- besoin **Incomplet** ;
- besoin **Non affecté** ;
- besoin **À vérifier**.

### 15.3 Alertes utilisateurs

Alertes validées :

- utilisateur inactif ;
- utilisateur archivé ;
- utilisateur absent ;
- utilisateur indisponible ;
- rôle incompatible ;
- utilisateur déjà affecté.

Les demandes d’absence en attente ne retirent pas automatiquement l’utilisateur du total disponible.

### 15.4 Alertes véhicules

Alertes validées :

- véhicule inactif ;
- véhicule archivé ;
- véhicule indisponible ;
- type incompatible ;
- véhicule déjà affecté ;
- véhicule manquant.

### 15.5 Alertes modèles horaires

Alertes validées :

- modèle inactif ;
- modèle archivé ;
- informations importantes manquantes.

Certains modèles peuvent rester volontairement génériques.

### 15.6 Visibilité des alertes

Les conflits et alertes de gestion sont visibles uniquement pour :

- Admin ;
- Gérant ;
- utilisateur autorisé.

Ils ne sont pas affichés aux utilisateurs en lecture simple.

### 15.7 Nombre d’utilisateurs terrain disponibles

Le Planning doit afficher en mode gestion le nombre d’utilisateurs terrain disponibles pour la période consultée.

Ce nombre doit tenir compte des utilisateurs :

- actifs ;
- non archivés ;
- non absents ;
- non indisponibles.

Si utile, ce nombre peut être décliné par rôle :

- ADE ;
- AA ;
- PSC1 ;
- TAXI.

Le détail des absences reste soumis aux permissions.

---

## 16. Accès, permissions et rôles

### 16.1 Principe général

Tous les utilisateurs ont accès au Planning, avec une lecture adaptée selon leurs permissions.

On distingue :

- lecture simple ;
- gestion.

### 16.2 Lecture simple

Les utilisateurs terrain voient :

- leur planning personnel ;
- un planning global simplifié ;
- les informations nécessaires à leur organisation ;
- les annotations utiles ;
- leur véhicule si applicable ;
- leur équipe / binôme si applicable.

Ils ne peuvent pas, sauf permission dédiée :

- créer ;
- modifier ;
- publier ;
- annuler ;
- affecter un utilisateur ;
- affecter un véhicule.

Ils ne voient pas automatiquement :

- brouillons ;
- conflits ;
- alertes de gestion ;
- historiques détaillés ;
- motifs internes ;
- informations sensibles.

### 16.3 Gestion

Admin et Gérant ont tous les droits Planning en Alpha.

Les autres profils, dont **Bureau**, passent par des permissions dédiées.

Le mode gestion permet selon permissions :

- préparation des besoins hebdomadaires ;
- création d’affectation ;
- modification d’affectation ;
- affectation d’utilisateurs ;
- affectation de véhicules ;
- publication d’une semaine ;
- modification après publication ;
- annulation logique ;
- consultation des conflits ;
- consultation des alertes ;
- consultation de l’historique minimal.

### 16.4 Permissions Planning prévues

Permissions fonctionnelles prévues :

- consulter le planning ;
- consulter le planning global ;
- consulter le planning personnel ;
- gérer le planning ;
- créer une affectation ;
- modifier une affectation ;
- modifier après publication ;
- annuler une affectation publiée ;
- publier une semaine ;
- gérer les besoins hebdomadaires ;
- affecter des utilisateurs ;
- affecter des véhicules ;
- consulter les conflits ;
- consulter les alertes de gestion ;
- consulter l’historique Planning ;
- consulter les éléments annulés ;
- consulter les brouillons ;
- consulter les informations sensibles liées aux absences / indisponibilités.

Les noms techniques définitifs des permissions pourront être définis au moment de l’implémentation.

### 16.5 Informations sensibles

Les informations sensibles liées aux absences / indisponibilités sont masquées selon permissions.

En lecture simple, un utilisateur ne voit pas forcément la raison précise de l’absence d’un autre utilisateur.

En mode gestion, Admin, Gérant ou utilisateur autorisé voient les informations nécessaires à la planification, selon permissions.

### 16.6 Actions sensibles

Actions sensibles à tracer :

- publication d’une semaine ;
- modification après publication ;
- annulation après publication ;
- changement d’utilisateur après publication ;
- changement de véhicule après publication ;
- passage en ABSENT ;
- passage en INDISPONIBLE ;
- modification d’un besoin obligatoire après publication ;
- action touchant un planning déjà publié.

---

## 17. Audit et traçabilité

### 17.1 Principe général

Les actions importantes du Planning doivent être tracées.

La traçabilité doit permettre de savoir :

- qui a fait l’action ;
- quand l’action a été faite ;
- sur quelle affectation ;
- ce qui a été modifié ;
- ancienne valeur si utile ;
- nouvelle valeur si utile ;
- motif si obligatoire ou renseigné.

### 17.2 Actions à tracer

Actions à tracer :

- création ;
- modification ;
- publication ;
- modification après publication ;
- annulation logique ;
- changement de modèle ;
- changement d’utilisateur ;
- changement de véhicule ;
- changement d’état ;
- changement de statut ;
- modification des besoins hebdomadaires.

### 17.3 Avant publication

Avant publication, la traçabilité peut rester simple.

Le Planning est encore en brouillon.

Les micro-ajustements ne doivent pas alourdir inutilement l’usage.

### 17.4 Après publication

Après publication, toute modification importante doit être tracée obligatoirement.

Les motifs restent obligatoires pour :

- annulations après publication ;
- modifications sensibles.

### 17.5 Historique minimal dans le Planning

Le Planning affiche un historique minimal dans le panneau de détail en mode gestion.

Exemple :

```text
Historique récent
- Créé par Admin le 10/05/2026
- Publié par Gérant le 12/05/2026
- Véhicule modifié par Admin le 13/05/2026
- Statut : Modifié après publication
```

### 17.6 Audit complet

L’audit complet relève de la page **Audit**, si l’utilisateur y est autorisé.

La page Audit pourra permettre une consultation plus détaillée des actions Planning.

### 17.7 Lecture simple

Les utilisateurs en lecture simple ne voient pas l’audit détaillé.

Ils peuvent éventuellement voir une information simple si leur planning publié a changé.

Exemple :

```text
Planning mis à jour
```

### 17.8 Actions support

Les actions support sur le Planning devront être tracées de manière renforcée si le rôle support intervient.

À prévoir :

- action réalisée par support ;
- société concernée ;
- utilisateur concerné ;
- contexte ou motif ;
- date / heure ;
- type d’action.

---

## 18. États de la page

### 18.1 Chargement

Pendant le chargement du Planning, la page doit afficher un état clair.

Exemple :

```text
Chargement du planning...
```

### 18.2 Aucun planning disponible

Si aucun élément Planning n’existe pour la période sélectionnée :

```text
Aucun planning disponible pour cette période.
```

En mode gestion, si l’utilisateur est autorisé, une action peut être proposée :

```text
Préparer la semaine
```

ou :

```text
Créer une première affectation
```

### 18.3 Aucun résultat après filtre

Si aucun élément ne correspond aux filtres :

```text
Aucun élément Planning ne correspond aux filtres sélectionnés.
```

Action possible :

```text
Réinitialiser les filtres
```

### 18.4 Besoins hebdomadaires absents

Si aucun besoin n’a encore été défini pour la semaine :

```text
Aucun besoin hebdomadaire défini pour cette semaine.
```

En mode gestion, si l’utilisateur est autorisé :

```text
Définir les besoins de la semaine
```

### 18.5 Accès non autorisé

Si un utilisateur tente d’accéder à une vue ou une action non autorisée :

```text
Accès non autorisé.
```

Selon les cas, l’action peut être masquée plutôt qu’affichée.

### 18.6 Action non autorisée

Si un utilisateur peut consulter mais pas modifier :

```text
Action non autorisée.
```

### 18.7 Erreur de chargement

En cas d’erreur technique :

```text
Impossible de charger le planning.
Veuillez réessayer.
```

### 18.8 Validation des actions

Messages à prévoir selon les cas :

```text
Le modèle ou l’état est obligatoire.
```

```text
L’utilisateur est obligatoire pour cette affectation.
```

```text
Le véhicule est obligatoire pour ce besoin.
```

```text
Le motif est obligatoire pour une annulation après publication.
```

```text
Le motif est obligatoire pour cette modification sensible.
```

```text
Cette action nécessite une permission dédiée.
```

---

## 19. Impacts sur les autres fiches

### 19.1 Modèles horaires

La fiche **Modèles horaires** devra être complétée après finalisation de la fiche Planning.

Ajustements à intégrer :

- jours actifs facultatifs du modèle ;
- horaires différents selon les jours ;
- horaires facultatifs pour certains modèles génériques ;
- génération automatique des jours travaillés / repos dans la vue semaine ;
- prise en compte des modèles de garde avec horaires différents selon les jours ;
- lien avec la préparation hebdomadaire des besoins.

Exemple à reprendre :

```text
Jeudi : 21h → 7h J+1
Vendredi : 21h → 7h J+1
Samedi : 19h → 5h J+1
Dimanche : 19h → 5h J+1
Lundi à mercredi : repos déduit automatiquement
```

### 19.2 Véhicules

La distinction **TPMR VSL** et **TPMR TAXI** devra être prise en compte dans le Planning, les modèles horaires et éventuellement la page Véhicules.

À confirmer plus tard :

```text
INFORMATION NON FOURNIE — À CONFIRMER : niveau exact de distinction TPMR VSL / TPMR TAXI dans le référentiel Véhicules.
```

### 19.3 Heures / Horaires

La gestion avancée des heures ne fait pas partie du Planning Alpha web actuel.

Elle doit être prévue dans une page dédiée **Heures / Horaires**.

Cette partie est prévue pour l’Alpha de la version mobile.

---

## 20. Éléments exclus du périmètre V1 / Alpha

Les éléments suivants sont exclus du périmètre V1 / Alpha.

Ils ne sont pas abandonnés.

Ils pourront être réétudiés en Beta, version finale, version mobile ou évolution ultérieure.

### 20.1 Missions / courses / transports patients

Les missions, courses et transports patients sont exclus du Planning Alpha.

Ils sont reportés en très long terme dans une page dédiée.

### 20.2 Régulation opérationnelle en temps réel

La régulation opérationnelle en temps réel est exclue du Planning Alpha.

Elle est reportée en très long terme dans une page dédiée.

### 20.3 Facturation

La facturation est exclue du Planning Alpha.

Elle est reportée en très long terme dans un module dédié.

### 20.4 Paie et RH avancée

La paie est exclue du Planning Alpha.

Elle est reportée en long terme dans une page ou un module dédié.

Les compteurs RH avancés sont également exclus du Planning Alpha.

### 20.5 Calcul complet des heures travaillées

Le calcul complet des heures travaillées est exclu du Planning Alpha.

Il relève d’une future page **Heures / Horaires**.

Le Planning Alpha peut préparer des repères, mais ne calcule pas :

- heures réellement effectuées ;
- pauses ;
- amplitudes ;
- heures supplémentaires ;
- compteurs avancés.

### 20.6 Planification automatique avancée

La planification automatique avancée est prévue pour la Beta.

Elle ne fait pas partie du cœur fonctionnel du Planning Alpha.

### 20.7 Affectation automatique optimisée avancée

L’affectation automatique optimisée avancée est prévue pour la Beta.

Elle ne fait pas partie du cœur fonctionnel du Planning Alpha.

### 20.8 Scoring, équilibrage et optimisation

Sont exclus de l’Alpha :

- scoring ;
- équilibrage automatique ;
- optimisation avancée ;
- optimisation par distance ;
- optimisation par base / dépôt ;
- calcul avancé de charge.

### 20.9 Géolocalisation et suivi temps réel

Sont exclus de l’Alpha :

- géolocalisation ;
- suivi temps réel des véhicules ;
- suivi de trajet ;
- optimisation par localisation.

### 20.10 Maintenance avancée intégrée au Planning

La maintenance avancée intégrée au Planning est exclue de l’Alpha.

Elle relève plutôt de la page **Suivi des véhicules**, notamment via un futur onglet **Entretiens des véhicules**.

### 20.11 Notifications avancées et preuves

Sont exclus de l’Alpha :

- notifications avancées ;
- confirmations de lecture ;
- preuves mobiles ;
- validations mobiles ;
- signatures électroniques.

### 20.12 Versioning complet

Sont exclus de l’Alpha :

- versioning complet ;
- restauration d’ancienne version ;
- comparaison visuelle avant / après.

---

## 21. Évolutions futures / à ne pas oublier

### 21.1 Planification automatique

À prévoir en Beta :

- génération automatique d’une semaine ;
- génération à partir des besoins hebdomadaires ;
- prise en compte des modèles horaires ;
- prise en compte des absences / indisponibilités ;
- prise en compte des véhicules disponibles ;
- alertes sur les besoins impossibles à couvrir ;
- proposition de planning à valider manuellement.

### 21.2 Affectation automatique optimisée

À prévoir en Beta :

- proposition automatique d’utilisateurs ;
- proposition automatique de véhicules ;
- prise en compte des rôles ;
- prise en compte des types de véhicules ;
- prise en compte de la disponibilité ;
- variantes de proposition si plusieurs solutions existent.

### 21.3 Scoring et équilibrage

À prévoir plus tard :

- équilibrage des gardes ;
- équilibrage des week-ends ;
- équilibrage des jours fériés ;
- équilibrage des charges entre utilisateurs ;
- score de pertinence d’une affectation ;
- aide à la décision pour le planificateur.

### 21.4 Gestion avancée des heures

À prévoir dans une page dédiée **Heures / Horaires**.

Cette partie est prévue pour l’Alpha de la version mobile, pas pour le Planning Alpha web actuel.

À traiter plus tard :

- heures réellement effectuées ;
- pauses ;
- amplitude ;
- heures supplémentaires ;
- compteurs ;
- récupérations ;
- exports RH ;
- lien avec planning publié.

### 21.5 Missions / courses / transports patients

À prévoir en très long terme dans une page dédiée.

Ne pas mélanger avec le Planning Alpha.

### 21.6 Régulation opérationnelle temps réel

À prévoir en très long terme dans une page dédiée.

### 21.7 Facturation

À prévoir en très long terme dans un module dédié.

### 21.8 Paie / RH avancée

À prévoir en long terme dans une page ou un module dédié.

### 21.9 Notifications et confirmation de lecture

À prévoir plus tard :

- notification d’un planning publié ;
- notification d’une modification après publication ;
- confirmation de lecture par salarié ;
- rappel automatique ;
- notification mobile ;
- preuve de consultation.

### 21.10 Version mobile du Planning

À prévoir plus tard :

- consultation mobile du planning personnel ;
- planning du jour simplifié ;
- notification de modification ;
- confirmation de lecture ;
- affichage clair des week-ends / jours fériés ;
- accès rapide au véhicule et à l’équipe.

### 21.11 Versioning complet et restauration

À prévoir plus tard :

- historique complet de chaque case ou affectation ;
- comparaison avant / après ;
- restauration d’une ancienne version ;
- version publiée précédente ;
- preuve de modification.

### 21.12 Signature électronique / preuve mobile

À prévoir plus tard :

- signature électronique ;
- validation mobile ;
- preuve de lecture ;
- preuve de modification ;
- preuve d’acceptation d’un changement.

### 21.13 Optimisation véhicules

À prévoir plus tard :

- proposition automatique du véhicule le plus adapté ;
- optimisation par base ;
- optimisation par distance ;
- prise en compte de la localisation ;
- suivi temps réel ;
- disponibilité avancée.

### 21.14 Lien futur avec maintenance / entretiens véhicules

Le lien futur avec la maintenance ou les entretiens véhicules pourra être étudié plus tard.

Le Planning Alpha ne doit pas intégrer la maintenance avancée.

Le cœur de la maintenance reste dans **Suivi des véhicules**.

---

## 22. Points à confirmer

Les points suivants restent à confirmer dans les fiches futures ou lors d’un cadrage dédié.

Ils ne doivent pas être présentés comme validés.

- INFORMATION NON FOURNIE — À CONFIRMER : gestion exacte des années avec semaine 53 et règle de numérotation des semaines.
- INFORMATION NON FOURNIE — À CONFIRMER : comportement exact lors de la publication d’une semaine contenant encore un besoin obligatoire non couvert.
- INFORMATION NON FOURNIE — À CONFIRMER : règles précises de compatibilité entre rôles utilisateurs, modèles horaires et types de véhicules.
- INFORMATION NON FOURNIE — À CONFIRMER : règles exactes de traitement, suivi ou équilibrage des samedis, dimanches, week-ends complets et jours fériés.
- INFORMATION NON FOURNIE — À CONFIRMER : détail exact des informations sensibles visibles ou masquées dans chaque vue Planning selon permissions.
- INFORMATION NON FOURNIE — À CONFIRMER : noms techniques définitifs des permissions Planning.
