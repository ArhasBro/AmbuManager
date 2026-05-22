# Ambulance Manager — Fonctionnalités détaillées — Modèles horaires V1

> Statut : référence fonctionnelle cible — page non validée à ce stade.

Version : V1 (MASTER)  
Date : 18/05/2026

## Sommaire

- [1. Objectif de la page](#1-objectif-de-la-page)
- [2. Positionnement fonctionnel](#2-positionnement-fonctionnel)
- [3. Base de cadrage fonctionnel V1 / Alpha](#3-base-de-cadrage-fonctionnel-v1--alpha)
- [4. Liste des modèles horaires](#4-liste-des-modèles-horaires)
- [5. Création d'un modèle horaire](#5-création-dun-modèle-horaire)
- [6. Modification d'un modèle horaire](#6-modification-dun-modèle-horaire)
- [7. Duplication d'un modèle horaire](#7-duplication-dun-modèle-horaire)
- [8. Statuts, archivage et suppression](#8-statuts-archivage-et-suppression)
- [9. Lien avec le Planning](#9-lien-avec-le-planning)
- [10. Accès et permissions](#10-accès-et-permissions)
- [11. Audit et traçabilité](#11-audit-et-traçabilité)
- [12. États de la page](#12-états-de-la-page)
- [13. Éléments exclus du périmètre V1 / Alpha](#13-éléments-exclus-du-périmètre-v1--alpha)
- [14. Évolutions futures / à ne pas oublier](#14-évolutions-futures--à -ne-pas-oublier)
- [15. Points à confirmer](#15-points-à -confirmer)

---

## 1. Objectif de la page

La page **Modèles horaires** permet de gérer des modèles réutilisables de créneaux horaires destinés au **Planning**.

Elle remplace fonctionnellement l'ancien terme anglais **Templates** afin de rester dans une terminologie 100 % française.

Un modèle horaire sert à préparer rapidement la création d'un créneau dans le Planning.

Il peut définir :

- un nom complet de gestion ;
- un libellé court affiché dans le Planning ;
- un type de modèle ;
- un type de véhicule ;
- des horaires ;
- des jours actifs facultatifs ;
- des horaires par jour si différents ;
- une période générique ;
- une composition attendue ;
- un rôle principal ;
- des rôles autorisés ;
- un nombre de personnes attendues ;
- une base / dépôt facultative ;
- un statut ;
- un compteur d'utilisation.

La page doit permettre de :

- consulter les modèles horaires ;
- créer un modèle horaire ;
- modifier un modèle horaire ;
- dupliquer un modèle horaire ;
- désactiver ou réactiver un modèle horaire ;
- archiver ou restaurer un modèle horaire ;
- préparer l'utilisation des modèles dans le Planning.

La page **Modèles horaires** ne concerne pas les modèles de documents, contrats, emails, PDF ou exports.

Elle concerne uniquement les modèles horaires opérationnels utilisés pour organiser le Planning.

---

## 2. Positionnement fonctionnel

### 2.1 Modèle horaire

Un modèle horaire est une base réutilisable pour créer un créneau Planning.

Exemple :

```text
AMBULANCE JOUR
08:00 → 20:00
Type : AMBULANCE
Composition : 2 personnes
Rôle principal : ADE
Rôles autorisés : AA, PSC1
```

Autre exemple :

```text
VSL MATIN
07:00 → 13:00
Type : VSL
Composition : 1 personne
Rôle principal : ADE
Rôles autorisés : AA, PSC1, TAXI si PSC1
```

### 2.2 Ce que le modèle horaire n'est pas

Un modèle horaire ne doit pas être confondu avec :

- un créneau Planning déjà créé ;
- une mission ;
- une règle RH ;
- un contrat de travail ;
- un modèle de document ;
- une règle automatique de planification complète.

Le modèle horaire sert uniquement de base de création ou de préremplissage.

### 2.3 Lien avec le Planning

Le modèle horaire peut être utilisé dans le Planning pour créer plus vite un créneau.

Une fois le créneau créé, il conserve ses propres informations.

Modifier un modèle horaire ne modifie pas automatiquement les créneaux déjà créés.

---

## 3. Base de cadrage fonctionnel V1 / Alpha
Fonctionnalités cibles de référence pour la page **Modèles horaires V1 / Alpha** :

- affichage de la liste des modèles horaires ;
- création d'un modèle horaire ;
- modification d'un modèle horaire ;
- duplication d'un modèle horaire ;
- désactivation d'un modèle horaire ;
- réactivation d'un modèle horaire ;
- archivage d'un modèle horaire ;
- affichage des modèles horaires archivés via filtre dédié ;
- désarchivage / restauration d'un modèle horaire ;
- utilisation d'un modèle horaire dans le Planning si autorisé ;
- compteur simple **Nb utilisé** ;
- distinction entre nom complet et libellé court Planning ;
- rattachement facultatif à une base / dépôt ;
- support des horaires avec affichage `J+1` si le modèle passe sur la nuit ;
- support des jours actifs facultatifs ;
- support des horaires par jour si différents ;
- support de modèles génériques sans horaire pour `Matin`, `Journée` et `Soir` ;
- prise en compte de la distinction TPMR VSL / TPMR TAXI lorsque nécessaire pour le Planning ;
- distinction entre actif / inactif et archivé / non archivé ;
- aucune suppression physique en Alpha ;
- traçabilité audit des actions sensibles.

Le rôle **PSC1** est confirmé et doit être ajouté aux rôles applicatifs.

---

## 4. Liste des modèles horaires

### 4.1 Objectif de la liste

La liste des modèles horaires doit permettre d'identifier rapidement les modèles disponibles pour la préparation du Planning.

Elle doit afficher les informations utiles sans devenir un écran de reporting avancé.

### 4.2 Colonnes validées

La liste affiche les colonnes suivantes :

1. Modèle horaire ;
2. Type de véhicule ;
3. Horaires ;
4. Composition ;
5. Base / dépôt ;
6. Statut ;
7. Nb utilisé ;
8. Actions.

### 4.3 Modèle horaire

La colonne **Modèle horaire** affiche le nom complet du modèle.

Exemples :

```text
AMBULANCE JOUR
Garde ambulance journée
```

```text
VSL MATIN
Transport programmé matin
```

Le nom du modèle horaire est obligatoire.

Une description courte peut être affichée sous le nom si elle existe.

### 4.4 Type de véhicule

Types de véhicules principaux validés :

- AMBULANCE ;
- VSL ;
- TAXI ;
- TPMR.

Le type de véhicule principal est obligatoire.

Pour les besoins Planning, la distinction suivante doit être prise en compte lorsque nécessaire :

- TPMR VSL ;
- TPMR TAXI.

Règle de prudence :

> Le type principal peut rester **TPMR**, mais le modèle horaire doit permettre de préciser l'usage Planning attendu lorsque la distinction **TPMR VSL** / **TPMR TAXI** est nécessaire.

Cette distinction doit être harmonisée lors de la relecture globale avec les fiches **Planning** et **Véhicules**.

### 4.5 Horaires

Si le modèle possède un horaire simple défini, la liste affiche :

```text
08:00 → 20:00
```

Si le modèle passe sur la nuit, l'affichage doit indiquer `J+1`.

Exemple :

```text
20:00 → 08:00 J+1
```

Si le modèle possède des jours actifs avec des horaires différents selon les jours, la liste peut afficher un résumé compact.

Exemple :

```text
Jeu-Ven 21:00 → 07:00 J+1
Sam-Dim 19:00 → 05:00 J+1
```

Les horaires restent facultatifs pour certains modèles génériques.

Pour un modèle sans horaire précis, une période générique doit être renseignée.

Périodes génériques prévues :

- Matin ;
- Journée ;
- Soir.

### 4.6 Composition

La composition doit afficher :

- le rôle principal ;
- les rôles autorisés ;
- le nombre de personnes attendues.

Exemple :

```text
2 personnes
Rôle principal : ADE
Rôles autorisés : AA, PSC1
```

Exemple VSL :

```text
1 personne
Rôle principal : ADE
Rôles autorisés : AA, PSC1, TAXI si PSC1
```

### 4.7 Base / dépôt

La base / dépôt est facultative.

Elle sert principalement aux modèles de gardes.

Exemple :

```text
GARDE AMBULANCE LAMBALLE
Base : Lamballe
```

Pour les modèles de transport programmé, la base peut rester vide afin que le modèle soit utilisable depuis n'importe quelle base.

Affichages possibles :

```text
Lamballe
```

```text
Aucune base définie
```

### 4.8 Statut

La liste affiche le statut actif ou inactif.

Statuts possibles :

- actif ;
- inactif.

L'archivage est une notion séparée.

Les modèles archivés ne sont pas visibles dans la liste principale, sauf filtre dédié.

### 4.9 Nb utilisé

La colonne **Nb utilisé** affiche le nombre de fois où un modèle horaire a été utilisé comme base de création d'une affectation Planning.

Objectifs :

- alimenter des KPI simples ;
- repérer les modèles très utilisés ;
- repérer les modèles inutilisés ;
- aider au nettoyage fonctionnel futur.

Ce compteur ne doit pas devenir du reporting avancé en Alpha.

### 4.10 Actions

Actions disponibles selon permissions :

- consulter ;
- modifier ;
- dupliquer ;
- désactiver ;
- réactiver ;
- archiver ;
- désarchiver / restaurer.

### 4.11 Recherche et filtres

Filtres prévus en Alpha :

- recherche par nom ;
- type de véhicule ;
- base / dépôt ;
- statut actif / inactif ;
- afficher les modèles horaires archivés.

Pas de filtre avancé en Alpha.

---
## 5. Création d'un modèle horaire

### 5.1 Objectif

La création permet à un Admin, Gérant ou utilisateur autorisé de créer un modèle réutilisable dans le Planning.

Le modèle horaire permet de préremplir rapidement certaines informations d'une affectation Planning.

### 5.2 Champs du formulaire

Le formulaire de création contient :

- nom du modèle horaire ;
- libellé court Planning ;
- description courte ;
- type de modèle ;
- type de véhicule principal ;
- précision TPMR VSL / TPMR TAXI si nécessaire ;
- horaire défini : oui / non ;
- heure de début ;
- heure de fin ;
- période générique si horaire non défini ;
- jours actifs du modèle si nécessaire ;
- horaires par jour si différents ;
- rôle principal ;
- rôles autorisés ;
- nombre de personnes attendues ;
- base / dépôt facultatif ;
- statut actif / inactif ;
- commentaire interne.

### 5.3 Nom du modèle horaire

Le nom du modèle horaire est obligatoire.

Il sert à gérer le modèle dans la page **Modèles horaires**.

Exemples :

```text
GARDE AMBULANCE LAMBALLE NUIT SEMAINE
```

```text
TRANSPORT PROGRAMMÉ VSL MATIN SECTEUR LAMBALLE
```

Règle validée :

```text
Le nom du modèle horaire doit être unique dans la société.
```

### 5.4 Libellé court Planning

Le champ **Libellé court Planning** permet d'afficher un nom plus court dans le Planning lorsque le nom complet du modèle est trop long.

Il sert uniquement à l'affichage compact dans le Planning.

Exemple :

```text
Nom du modèle horaire :
GARDE AMBULANCE LAMBALLE NUIT SEMAINE

Libellé court Planning :
AMB NUIT
```

Autre exemple :

```text
Nom du modèle horaire :
TRANSPORT PROGRAMMÉ VSL MATIN SECTEUR LAMBALLE

Libellé court Planning :
VSL MATIN
```

Règles :

- le nom complet reste obligatoire ;
- le libellé court Planning est optionnel ;
- si le libellé court est vide, le Planning affiche le nom complet ;
- le libellé court ne remplace pas le nom de gestion du modèle ;
- le libellé court sert uniquement à l'affichage planning.

### 5.5 Description courte

La description courte est optionnelle.

Elle permet d'expliquer l'usage du modèle.

Exemples :

```text
Garde ambulance journée
```

```text
Transport programmé matin
```

```text
Modèle générique soirée
```

### 5.6 Type de modèle

Types de modèles validés :

- Garde ;
- Transport programmé ;
- Générique.

#### Garde

Un modèle de type **Garde** est généralement utilisé pour des organisations de garde.

Il peut être rattaché à une base / dépôt.

Il peut aussi définir des jours actifs et des horaires différents selon les jours.

Exemple :

```text
GARDE AMBULANCE LAMBALLE
Jeudi : 21:00 → 07:00 J+1
Vendredi : 21:00 → 07:00 J+1
Samedi : 19:00 → 05:00 J+1
Dimanche : 19:00 → 05:00 J+1
Base : Lamballe
```

#### Transport programmé

Un modèle de type **Transport programmé** est généralement utilisable plus largement.

Il peut rester sans base afin d'être utilisé depuis n'importe quelle base.

Exemple :

```text
VSL MATIN
07:00 → 13:00
Base : aucune
```

#### Générique

Un modèle de type **Générique** peut être utilisé sans horaire précis.

Périodes génériques prévues :

- Matin ;
- Journée ;
- Soir.

### 5.7 Type de véhicule

Le type de véhicule principal est obligatoire.

Valeurs autorisées :

- AMBULANCE ;
- VSL ;
- TAXI ;
- TPMR.

Pour les besoins Planning, un modèle TPMR doit pouvoir être précisé si nécessaire.

Précisions possibles :

- TPMR VSL ;
- TPMR TAXI.

Règle validée :

> La distinction TPMR VSL / TPMR TAXI doit être prise en compte dans les modèles horaires lorsque le Planning en a besoin.

### 5.8 Horaires

Trois cas sont possibles :

1. modèle avec horaire simple défini ;
2. modèle avec jours actifs et horaires par jour ;
3. modèle sans horaire défini.

### 5.9 Modèle avec horaire simple défini

Si le modèle possède un horaire simple défini, les champs suivants sont obligatoires :

- heure de début ;
- heure de fin.

Exemples :

```text
08:00 → 20:00
```

```text
20:00 → 08:00 J+1
```

Le `J+1` doit être affiché automatiquement quand l'horaire passe sur le lendemain.

### 5.10 Modèle avec jours actifs et horaires par jour

Un modèle horaire doit pouvoir définir facultativement les jours où il est actif.

Cette logique est particulièrement utile pour les gardes ou les modèles qui ne couvrent pas toute la semaine de manière uniforme.

Le modèle peut aussi définir des horaires différents selon les jours.

Exemple :

```text
Jeudi : 21:00 → 07:00 J+1
Vendredi : 21:00 → 07:00 J+1
Samedi : 19:00 → 05:00 J+1
Dimanche : 19:00 → 05:00 J+1
```

Dans cet exemple, si le modèle est appliqué à une semaine dans le Planning :

```text
Lundi : REPOS
Mardi : REPOS
Mercredi : REPOS
Jeudi : GARDE
Vendredi : GARDE
Samedi : GARDE
Dimanche : GARDE
```

Règles :

- les jours actifs sont facultatifs ;
- les horaires par jour sont facultatifs ;
- les horaires par jour peuvent être différents selon les jours ;
- le passage `J+1` doit être affiché si l'horaire passe sur le lendemain ;
- les jours non actifs peuvent être automatiquement déduits comme repos dans la vue semaine Planning ;
- cette déduction sert à l'affichage et à la préparation du Planning, sans transformer le Planning en grille détaillée heure par heure.

### 5.11 Modèle sans horaire défini

Un modèle sans horaire défini est autorisé pour les périodes génériques.

Périodes génériques prévues :

- Matin ;
- Journée ;
- Soir.

Règle :

```text
Un modèle sans horaire précis doit avoir une période générique.
```

### 5.12 Composition

La composition du modèle horaire doit contenir :

- rôle principal ;
- rôles autorisés ;
- nombre de personnes attendues.

### 5.13 Rôle principal

Le rôle principal représente le rôle attendu prioritairement pour ce modèle.

Exemples :

- ADE ;
- AA ;
- PSC1 ;
- TAXI.

### 5.14 Rôles autorisés

Les rôles autorisés indiquent les profils pouvant être affectés sur une affectation Planning basée sur ce modèle.

Pour les modèles horaires VSL, rôles autorisés validés :

- ADE ;
- AA ;
- PSC1 ;
- TAXI si PSC1.

### 5.15 Nombre de personnes attendues

Le nombre de personnes attendues est obligatoire.

Exemples de principe :

```text
AMBULANCE = 2 personnes
VSL = 1 personne
TAXI = 1 personne
TPMR = à préciser selon TPMR VSL / TPMR TAXI si nécessaire
```

Les règles exactes par type de véhicule restent à confirmer dans les points dédiés si nécessaire.

### 5.16 Base / dépôt

La base / dépôt est facultative.

Un modèle horaire peut être rattaché à une base / dépôt, mais ce n'est pas obligatoire.

Usage recommandé :

- modèles de gardes : base / dépôt souvent renseigné ;
- modèles de transport programmé : base / dépôt souvent vide ;
- modèles génériques : base / dépôt optionnel.

Le rattachement à une base / dépôt ne doit pas bloquer automatiquement l'utilisation du modèle dans une autre base en Alpha.

### 5.17 Couleurs

Les couleurs ne sont pas définies de manière rigide dans le modèle horaire.

L'utilisateur qui fait son Planning doit pouvoir choisir lui-même ses couleurs.

Règles validées :

- pas de couleur obligatoire dans le modèle ;
- pas de couleur imposée par type de véhicule ;
- pas de couleur imposée par rôle ;
- couleur = repère visuel libre ;
- choix laissé à l'utilisateur qui organise son Planning.

La couleur ne doit pas devenir une règle métier.

### 5.18 Statut initial

À la création, le modèle peut être :

- actif ;
- inactif.

Par défaut, le modèle est actif, sauf choix contraire de l'utilisateur autorisé.

### 5.19 Commentaire interne

Le commentaire interne est optionnel.

Il peut servir à noter une précision.

Exemples :

```text
À utiliser uniquement pendant les périodes de garde.
```

```text
À vérifier avec le responsable planning.
```

```text
Modèle provisoire.
```

### 5.20 Règles de validation

À la création, les règles suivantes s'appliquent :

- nom obligatoire ;
- nom unique dans la société ;
- type de véhicule principal obligatoire ;
- précision TPMR VSL / TPMR TAXI si nécessaire ;
- rôle principal obligatoire ;
- nombre de personnes attendu obligatoire ;
- si horaire simple défini : heure de début et heure de fin obligatoires ;
- si jours actifs renseignés : les jours sélectionnés doivent être explicites ;
- si horaires par jour renseignés : les horaires doivent être cohérents pour chaque jour concerné ;
- si horaire non défini : période générique obligatoire ;
- base / dépôt facultative ;
- statut obligatoire ;
- libellé court Planning optionnel.

---
## 6. Modification d'un modèle horaire

### 6.1 Objectif

La modification permet de faire évoluer un modèle horaire existant sans supprimer son historique.

### 6.2 Champs modifiables

Champs modifiables :

- nom du modèle horaire ;
- libellé court Planning ;
- description courte ;
- type de modèle ;
- type de véhicule principal ;
- précision TPMR VSL / TPMR TAXI si nécessaire ;
- horaires ;
- jours actifs ;
- horaires par jour ;
- période générique si modèle sans horaire ;
- rôle principal ;
- rôles autorisés ;
- nombre de personnes attendues ;
- base / dépôt facultatif ;
- statut actif / inactif ;
- commentaire interne.

### 6.3 Règles de modification

Règles :

- le nom reste obligatoire ;
- le nom doit rester unique dans la société ;
- le type de véhicule principal reste obligatoire ;
- le rôle principal reste obligatoire ;
- le nombre de personnes attendues reste obligatoire ;
- si horaire simple défini : heure de début et heure de fin obligatoires ;
- si jours actifs renseignés : les jours sélectionnés doivent être explicites ;
- si horaires par jour renseignés : les horaires doivent être cohérents pour chaque jour concerné ;
- si horaire non défini : période générique obligatoire ;
- les modifications importantes doivent être tracées dans l'audit.

### 6.4 Impact sur les affectations Planning déjà créées

Modifier un modèle horaire ne modifie pas automatiquement les affectations Planning déjà créées.

Règle validée :

```text
Le modèle horaire sert de base au moment de la création de l'affectation Planning.

Une fois l'affectation créée, elle conserve ses propres informations.
```

Exemple :

```text
Un modèle "AMBULANCE JOUR" était 08:00 → 20:00.

Une affectation Planning a été créée avec ce modèle.

Si le modèle est ensuite modifié en 07:00 → 19:00,
l'affectation déjà créée ne change pas automatiquement.
```

Même règle pour les jours actifs :

```text
Un modèle de garde était actif du jeudi au dimanche.

Une affectation Planning a été créée pour la semaine 21.

Si le modèle est ensuite modifié pour ajouter le mercredi,
l'affectation Planning déjà créée en semaine 21 ne change pas automatiquement.
```

Cette règle évite les effets de bord sur des plannings déjà construits.

---
## 7. Duplication d'un modèle horaire

### 7.1 Objectif

La duplication permet de créer rapidement un nouveau modèle horaire à partir d'un modèle existant.

Action validée en Alpha :

```text
Dupliquer
```

### 7.2 Règles de duplication

Règles validées :

- la duplication crée un nouveau modèle horaire ;
- les champs sont préremplis avec les données du modèle source ;
- le nouveau modèle doit avoir un nom différent ;
- le compteur **Nb utilisé** du nouveau modèle démarre à 0 ;
- le modèle dupliqué ne reprend pas l'historique d'utilisation du modèle source ;
- le modèle dupliqué appartient à la même société ;
- le modèle dupliqué peut ensuite être modifié avant validation.

### 7.3 Exemple

```text
Source :
AMBULANCE JOUR

Duplication :
Copie de AMBULANCE JOUR

Renommage :
AMBULANCE JOUR WEEK-END
```

### 7.4 Message de duplication

Si la duplication réussit :

```text
Modèle horaire dupliqué.
```

Si le nom existe déjà :

```text
Le nom du modèle horaire doit être différent.
```

---

## 8. Statuts, archivage et suppression

### 8.1 Notions séparées

La page **Modèles horaires** distingue deux notions :

1. statut actif / inactif ;
2. archivage.

Ces notions ne doivent pas être mélangées.

### 8.2 Statut actif

Un modèle horaire actif peut être proposé normalement dans le Planning.

### 8.3 Statut inactif

Un modèle horaire inactif reste visible dans la liste principale.

Il ne doit pas être proposé normalement pour créer de nouveaux créneaux dans le Planning.

Il conserve :

- son historique ;
- son nombre d'utilisations ;
- ses anciens liens avec des créneaux déjà créés.

### 8.4 Non archivé

Un modèle non archivé est visible dans la liste principale.

### 8.5 Archivé

Un modèle archivé est masqué de la liste principale.

Il reste visible uniquement via le filtre :

```text
modèles horaires archivés
```

Un modèle archivé ne doit pas être proposé normalement dans le Planning.

### 8.6 Désarchivage / restauration

Désarchiver un modèle :

- retire le statut archivé ;
- rend le modèle visible dans la liste principale ;
- ne réactive pas automatiquement le modèle s'il était inactif ;
- conserve l'historique.

Exemple :

```text
Modèle archivé + inactif
→ après désarchivage : visible à nouveau, mais toujours inactif.
```

### 8.7 Suppression physique

Aucune suppression physique d'un modèle horaire n'est prévue en Alpha.

Si un modèle ne doit plus être utilisé :

- il peut être désactivé ;
- ou il peut être archivé.

---

## 9. Lien avec le Planning

### 9.1 Principe général

Un modèle horaire sert de base pour créer plus rapidement une affectation dans le Planning.

Il peut préremplir :

- le type de véhicule principal ;
- la précision TPMR VSL / TPMR TAXI si nécessaire ;
- les horaires ;
- le passage `J+1` si nuit ;
- la période générique si Matin / Journée / Soir ;
- les jours actifs du modèle ;
- les horaires par jour si différents ;
- la composition attendue ;
- le rôle principal ;
- les rôles autorisés ;
- le nombre de personnes ;
- la base / dépôt si renseignée ;
- le libellé court Planning si renseigné.

### 9.2 Affectation créée depuis un modèle horaire

Quand un utilisateur crée une affectation Planning depuis un modèle horaire, le Planning récupère les informations du modèle.

Mais ensuite, l'affectation vit indépendamment.

Règle validée :

```text
Modifier le modèle horaire après coup ne modifie pas automatiquement les affectations Planning déjà créées.
```

### 9.3 Modèles proposés dans le Planning

Seuls les modèles horaires actifs et non archivés sont proposés normalement dans le Planning.

Règles :

```text
Modèle actif + non archivé
→ proposé normalement dans le Planning.

Modèle inactif
→ visible dans Modèles horaires, mais non proposé normalement dans le Planning.

Modèle archivé
→ masqué de la liste principale et non proposé dans le Planning.
```

### 9.4 Jours actifs et vue semaine Planning

Si un modèle possède des jours actifs, le Planning peut les utiliser pour générer automatiquement une lecture synthétique de la semaine.

Exemple de modèle :

```text
Jeudi : 21:00 → 07:00 J+1
Vendredi : 21:00 → 07:00 J+1
Samedi : 19:00 → 05:00 J+1
Dimanche : 19:00 → 05:00 J+1
```

Affichage attendu dans la vue semaine Planning après application du modèle :

```text
Lundi : REPOS
Mardi : REPOS
Mercredi : REPOS
Jeudi : GARDE
Vendredi : GARDE
Samedi : GARDE
Dimanche : GARDE
```

Règles :

- les jours actifs servent à déduire les jours travaillés ;
- les jours non actifs peuvent être affichés comme repos ;
- les horaires par jour servent de repères si connus ;
- cette logique ne transforme pas le Planning en planning détaillé heure par heure ;
- l'affectation Planning conserve ses propres informations après création.

### 9.5 Base / dépôt dans le Planning

Si le modèle horaire possède une base / dépôt, elle peut préremplir l'affectation Planning.

Si le modèle horaire n'a pas de base / dépôt, l'utilisateur choisit la base au moment de créer l'affectation, si nécessaire.

Règle validée :

```text
Le rattachement d'un modèle horaire à une base / dépôt ne doit pas bloquer automatiquement son utilisation ailleurs en Alpha.
```

### 9.6 Composition et affectation

Le modèle horaire définit une composition attendue.

Dans le Planning, cela doit aider à :

- afficher l'équipe attendue ;
- filtrer ou proposer les utilisateurs compatibles ;
- signaler si la composition n'est pas respectée ;
- préparer la future planification automatique ;
- préparer la future affectation automatique optimisée.

En Alpha, le modèle horaire sert de référence de composition.

Le comportement exact du Planning en cas de composition non respectée est cadré dans la fiche **Planning**.

### 9.7 Type de véhicule requis

Le modèle horaire indique le type de véhicule attendu.

Dans le Planning, cela peut servir à :

- filtrer les véhicules proposés ;
- vérifier la cohérence du véhicule affecté ;
- préparer les règles de compatibilité utilisateur / véhicule ;
- alimenter les contrôles du Planning.

Pour TPMR, le Planning doit pouvoir distinguer :

- TPMR VSL ;
- TPMR TAXI.

Le détail exact de cette distinction devra être harmonisé avec la fiche **Véhicules** lors de la relecture globale.

### 9.8 Compteur Nb utilisé

Le compteur **Nb utilisé** augmente lorsqu'une affectation Planning est créée à partir du modèle horaire.

Il mesure l'utilisation du modèle comme base de création, pas l'état actuel de l'affectation.

Exemple :

```text
Une affectation Planning est créée depuis AMBULANCE JOUR.
Le compteur augmente de 1.

Même si l'affectation est ensuite modifiée manuellement,
le modèle a bien été utilisé comme base de création.
```

---
## 10. Accès et permissions

### 10.1 Principe général

La page **Modèles horaires** est soumise aux permissions.

Elle n'est pas accessible à tous les utilisateurs par défaut.

### 10.2 Admin / Gérant

En Alpha, Admin et Gérant peuvent gérer complètement les modèles horaires.

Ils peuvent :

- consulter les modèles horaires ;
- créer un modèle horaire ;
- modifier un modèle horaire ;
- dupliquer un modèle horaire ;
- désactiver un modèle horaire ;
- réactiver un modèle horaire ;
- archiver un modèle horaire ;
- afficher les modèles horaires archivés ;
- désarchiver / restaurer un modèle horaire ;
- utiliser un modèle horaire dans le Planning.

### 10.3 Utilisateur autorisé

Un utilisateur autorisé peut recevoir certains droits via permissions dédiées.

Exemples possibles :

- responsable planning ;
- responsable exploitation ;
- Bureau ;
- Régulateur ;
- autre profil avec permission dédiée.

### 10.4 Utilisateurs terrain

Les utilisateurs terrain ne voient pas la page **Modèles horaires** et n'y ont pas accès par défaut.

Ils peuvent y accéder uniquement si une permission dédiée leur est attribuée.

Sinon, ils voient uniquement les créneaux créés dans le Planning selon leurs droits Planning.

### 10.5 Permissions dédiées à prévoir

Permissions fonctionnelles à prévoir :

- consulter les modèles horaires ;
- créer un modèle horaire ;
- modifier un modèle horaire ;
- dupliquer un modèle horaire ;
- désactiver / réactiver un modèle horaire ;
- archiver un modèle horaire ;
- consulter les modèles horaires archivés ;
- désarchiver / restaurer un modèle horaire ;
- utiliser un modèle horaire dans le Planning.

Les noms techniques exacts des permissions seront définis plus tard.

---

## 11. Audit et traçabilité

### 11.1 Principe

Les actions sensibles de la page **Modèles horaires** doivent être tracées dans l'audit.

L'audit complet reste consultable dans la page **Audit** selon permissions.

### 11.2 Actions à tracer

Actions à tracer :

- création d'un modèle horaire ;
- modification d'un modèle horaire ;
- duplication d'un modèle horaire ;
- désactivation ;
- réactivation ;
- archivage ;
- désarchivage / restauration ;
- changement de base / dépôt ;
- changement de type de véhicule ;
- changement de composition ;
- changement d'horaires ;
- changement de statut.

### 11.3 Utilisation dans le Planning

L'utilisation d'un modèle horaire dans le Planning est principalement visible via :

- le créneau Planning créé ;
- le compteur **Nb utilisé** ;
- l'historique du Planning si prévu.

Il n'est pas nécessaire de créer un audit détaillé depuis la page **Modèles horaires** pour chaque utilisation simple du modèle.

---

## 12. États de la page

### 12.1 Chargement initial

Au chargement de la page, l'application récupère :

- les modèles horaires actifs et non archivés ;
- les modèles horaires inactifs ;
- les bases / dépôts disponibles ;
- les types de véhicules ;
- les rôles applicatifs ;
- les permissions de l'utilisateur connecté ;
- le compteur **Nb utilisé** pour chaque modèle.

Message possible :

```text
Chargement des modèles horaires...
```

### 12.2 Liste vide

Si aucun modèle horaire n'existe encore :

```text
Aucun modèle horaire créé.
Créez un premier modèle pour faciliter la création des créneaux dans le Planning.
```

L'action **Créer un modèle horaire** s'affiche uniquement si l'utilisateur est autorisé.

### 12.3 Aucun résultat après filtre

Si aucun résultat ne correspond aux filtres :

```text
Aucun modèle horaire ne correspond aux filtres sélectionnés.
```

Action possible :

```text
Réinitialiser les filtres
```

### 12.4 Modèles archivés

Les modèles archivés ne sont pas visibles par défaut.

Ils apparaissent uniquement si l'utilisateur active un filtre dédié :

```text
Afficher les modèles horaires archivés
```

Si aucun modèle archivé n'existe :

```text
Aucun modèle horaire archivé.
```

### 12.5 Accès non autorisé

Les utilisateurs terrain ne voient pas la page **Modèles horaires** par défaut.

Si un utilisateur sans permission tente d'accéder à la page :

```text
Accès non autorisé.
```

La page peut aussi être absente de la navigation.

### 12.6 Action non autorisée

Si un utilisateur peut consulter mais pas modifier :

```text
Action non autorisée.
```

Selon les cas, l'action peut être masquée.

### 12.7 Erreur de chargement

En cas d'erreur technique :

```text
Impossible de charger les modèles horaires.
Veuillez réessayer.
```

### 12.8 Validation du formulaire

Messages à prévoir :

```text
Le nom du modèle horaire est obligatoire.
```

```text
Un modèle horaire avec ce nom existe déjà .
```

```text
Le type de véhicule est obligatoire.
```

```text
Le rôle principal est obligatoire.
```

```text
Le nombre de personnes attendues est obligatoire.
```

```text
L'heure de début et l'heure de fin sont obligatoires pour un modèle avec horaire défini.
```

```text
Une période générique est obligatoire pour un modèle sans horaire défini.
```

```text
Le nom du modèle horaire doit être différent.
```

---

## 13. Éléments exclus du périmètre V1 / Alpha

Les éléments suivants ne sont pas intégrés au périmètre V1 / Alpha.

Ils ne sont pas exclus de la version finale.

- suppression physique d'un modèle horaire ;
- modification automatique des créneaux déjà créés lorsqu'un modèle change ;
- couleurs imposées par le modèle horaire ;
- règles de couleur obligatoires par type de véhicule ;
- reporting avancé d'utilisation des modèles ;
- statistiques détaillées par période ;
- modèles récurrents hebdomadaires complexes ;
- automatisation avancée du planning depuis les modèles ;
- blocage strict des affectations si la composition n'est pas respectée ;
- règles avancées de compatibilité utilisateur / véhicule ;
- gestion avancée des exceptions ;
- validation multi-niveaux ;
- import / export avancé des modèles horaires ;
- gestion mobile dédiée.

Ces éléments pourront être réétudiés en Beta, version finale ou évolution ultérieure.

---

## 14. Évolutions futures / à ne pas oublier

### 14.1 Couleurs personnalisables dans le Planning

Les couleurs ne doivent pas être imposées par le modèle horaire.

À prévoir plus tard côté Planning :

- choix libre des couleurs par l'utilisateur qui organise le planning ;
- préférences visuelles par utilisateur ;
- couleurs par vue planning ;
- couleurs par affectation ;
- éventuellement couleurs par catégorie, sans règle métier obligatoire.

### 14.2 Statistiques avancées

Le compteur **Nb utilisé** est prévu en Alpha comme indicateur simple.

Plus tard, il pourra être enrichi avec :

- nombre d'utilisations par période ;
- modèles les plus utilisés ;
- modèles inutilisés ;
- évolution mensuelle ;
- statistiques par base / dépôt ;
- statistiques par type de véhicule.

### 14.3 Récurrence avancée

À prévoir plus tard :

- modèles récurrents hebdomadaires ;
- modèles par période ;
- modèles par saison ;
- modèles de garde récurrents ;
- duplication sur plusieurs jours ou semaines.

Les jours actifs et horaires par jour sont intégrés au périmètre Alpha comme information facultative du modèle.  
La récurrence avancée reste une évolution future.

### 14.4 Lien avancé avec le Planning

À harmoniser avec la fiche **Planning** lors de la relecture globale :

- comportement si la composition attendue n'est pas respectée ;
- comportement si le type de véhicule affecté ne correspond pas ;
- comportement si l'utilisateur affecté n'a pas le bon rôle ;
- utilisation des modèles dans la planification automatique ;
- utilisation des modèles dans l'affectation automatique optimisée ;
- impact des modèles sur les affectations publiées.

La distinction TPMR VSL / TPMR TAXI doit également être harmonisée avec les fiches **Planning** et **Véhicules**.

### 14.5 Import / export de modèles horaires

À prévoir plus tard :

- export des modèles horaires ;
- import initial ;
- duplication massive ;
- modèles prédéfinis par société ;
- bibliothèque de modèles.

### 14.6 Expérience mobile

Pas prioritaire en Alpha web, mais à garder en mémoire :

- consultation simple des modèles horaires ;
- utilisation dans un planning mobile ;
- affichage simplifié ;
- choix rapide d'un modèle pendant la création d'une affectation Planning.

---
## 15. Points à confirmer

Les points suivants restent à confirmer dans les fiches futures ou lors d'un cadrage dédié :

- règles exactes de composition pour AMBULANCE ;
- règles exactes de composition pour VSL ;
- règles exactes de composition pour TAXI ;
- règles exactes de composition pour TPMR ;
- distinction exacte entre TPMR VSL et TPMR TAXI dans les modèles horaires, les véhicules et le Planning ;
- comportement exact du Planning si la composition attendue n'est pas respectée ;
- comportement exact du Planning si le type de véhicule affecté ne correspond pas ;
- comportement exact avec les rôles autorisés ;
- lien exact avec la planification automatique ;
- lien exact avec l'affectation automatique optimisée ;
- statut exact des modèles génériques Matin / Journée / Soir ;
- règles exactes du compteur **Nb utilisé** ;
- noms techniques définitifs des permissions ;
- affichage final ou non de la page dans la navigation selon profils ;
- longueur maximale recommandée du libellé court Planning ;
- comportement si deux modèles ont le même libellé court Planning mais pas le même nom complet.

