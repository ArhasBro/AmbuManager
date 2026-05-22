# Ambulance Manager — Fonctionnalités détaillées — Dépôts / Bases V1

> Statut : référence fonctionnelle cible — page non validée à ce stade.

Version : V1 (MASTER)  
Date : 18/05/2026

## Sommaire

- [1. Objectif de la page](#1-objectif-de-la-page)
- [2. Positionnement fonctionnel](#2-positionnement-fonctionnel)
- [3. Base de cadrage fonctionnel V1 / Alpha](#3-base-de-cadrage-fonctionnel-v1--alpha)
- [4. Liste des dépôts / bases](#4-liste-des-dépôts--bases)
- [5. Création d'un dépôt / base](#5-création-dun-dépôt--base)
- [6. Modification d'un dépôt / base](#6-modification-dun-dépôt--base)
- [7. Statuts, archivage et suppression](#7-statuts-archivage-et-suppression)
- [8. Rattachements et liens avec les autres modules](#8-rattachements-et-liens-avec-les-autres-modules)
- [9. Lien avec le Planning](#9-lien-avec-le-planning)
- [10. Accès et permissions](#10-accès-et-permissions)
- [11. Audit et traçabilité](#11-audit-et-traçabilité)
- [12. États de la page](#12-états-de-la-page)
- [13. Éléments exclus du périmètre V1 / Alpha](#13-éléments-exclus-du-périmètre-v1--alpha)
- [14. Évolutions futures / à ne pas oublier](#14-évolutions-futures--à -ne-pas-oublier)
- [15. Points à confirmer](#15-points-à -confirmer)

---

## 1. Objectif de la page

La page **Dépôts / Bases** permet de gérer les lieux d'exploitation de la société dans Ambulance Manager.

Elle sert à référencer les lieux utilisés pour organiser l'activité, rattacher certains utilisateurs, rattacher certains véhicules et faciliter la lecture opérationnelle du Planning.

En V1 / Alpha, la page reste simple.

Elle ne distingue pas techniquement les notions suivantes :

- Base ;
- Dépôt ;
- Point d'exploitation ;
- Autre.

Ces distinctions pourront être étudiées plus tard, potentiellement en Beta.

La page doit permettre de :

- consulter les dépôts / bases de la société ;
- créer un dépôt / base ;
- modifier un dépôt / base ;
- désactiver ou réactiver un dépôt / base ;
- archiver ou restaurer un dépôt / base ;
- consulter les compteurs d'utilisateurs rattachés ;
- consulter les compteurs de véhicules rattachés ;
- définir un responsable local optionnel ;
- servir de repère, filtre ou préremplissage dans les autres modules.

---

## 2. Positionnement fonctionnel

### 2.1 Page Dépôts / Bases

La page **Dépôts / Bases** est le référentiel des lieux d'exploitation de la société.

En Alpha, elle gère une notion simple :

```text
Dépôt / Base
```

Un dépôt / base peut représenter :

- une base principale ;
- un dépôt secondaire ;
- un lieu d'exploitation ;
- un lieu de départ habituel ;
- un lieu de rattachement administratif ou opérationnel.

### 2.2 Ce que la page ne remplace pas

La page **Dépôts / Bases** ne remplace pas :

```text
Société
= profil permanent de l'entreprise

Utilisateurs
= comptes, rôles, permissions et rattachement utilisateur

Véhicules
= référentiel de flotte et rattachement véhicule

Modèles horaires
= modèles réutilisables de créneaux

Planning
= organisation opérationnelle des créneaux
```

### 2.3 Principe de non-blocage en Alpha

La base / dépôt sert de repère, de filtre ou de préremplissage.

Elle ne doit pas devenir une contrainte bloquante par défaut dans l'Alpha.

Règle validée :

```text
La base / dépôt guide le Planning, mais ne bloque pas automatiquement les affectations en Alpha.
```

Les règles plus strictes seront cadrées plus tard dans la fiche **Planning** si nécessaire.

---

## 3. Base de cadrage fonctionnel V1 / Alpha
Fonctionnalités cibles de référence pour la page **Dépôts / Bases V1 / Alpha** :

- notion simple `Dépôt / Base` ;
- absence de type de lieu distinct en Alpha ;
- consultation de la liste des dépôts / bases ;
- création d'un dépôt / base ;
- modification d'un dépôt / base ;
- responsable local optionnel ;
- responsable local sélectionné parmi les utilisateurs existants ;
- responsable local sans permission automatique ;
- adresse recommandée mais non obligatoire ;
- nom obligatoire et unique dans la société ;
- statut par défaut actif ;
- affichage des compteurs utilisateurs rattachés ;
- affichage des compteurs véhicules rattachés ;
- distinction entre actif / inactif et archivé / non archivé ;
- désactivation / réactivation ;
- archivage ;
- consultation des dépôts / bases archivés via filtre dédié ;
- désarchivage / restauration ;
- aucune suppression physique en Alpha ;
- avertissement simple si archivage ou désactivation avec rattachements existants ;
- rattachements principalement gérés depuis les pages concernées ;
- actions sensibles tracées dans l'audit.

---

## 4. Liste des dépôts / bases

### 4.1 Objectif de la liste

La liste des dépôts / bases doit permettre de voir rapidement les lieux d'exploitation de la société.

Elle doit rester lisible et simple.

### 4.2 Colonnes validées

La liste affiche les colonnes suivantes :

1. Dépôt / Base ;
2. Adresse ;
3. Responsable local ;
4. Utilisateurs rattachés ;
5. Véhicules rattachés ;
6. Statut ;
7. Actions.

### 4.3 Dépôt / Base

La colonne **Dépôt / Base** affiche le nom du lieu.

Exemples :

```text
Lamballe
```

```text
Saint-Brieuc
```

```text
Rennes
```

Le nom est obligatoire.

Une description courte peut être affichée si elle existe.

Exemples :

```text
Base principale de la société
```

```text
Lieu d'exploitation secondaire
```

```text
Point de départ fréquent
```

### 4.4 Adresse

La liste peut afficher l'adresse si elle est renseignée.

Exemple :

```text
12 rue Exemple
22400 Lamballe
France
```

Si l'adresse n'est pas renseignée, la liste affiche :

```text
Adresse non renseignée
```

L'adresse est recommandée mais non obligatoire en Alpha.

### 4.5 Responsable local

Le responsable local est optionnel.

S'il est renseigné, il doit être un utilisateur existant de la société.

Affichage possible :

```text
Responsable : Nathan Archenoul
```

Règle importante :

```text
Responsable local
≠ rôle applicatif automatique
```

Le responsable local est une information organisationnelle.

Il ne donne aucun droit applicatif supplémentaire.

Les droits restent gérés uniquement par les rôles et permissions dans la page **Utilisateurs**.

### 4.6 Utilisateurs rattachés

La liste affiche un compteur simple.

Exemple :

```text
8 utilisateurs
```

Le rattachement des utilisateurs reste principalement géré depuis la page **Utilisateurs**.

La page **Dépôts / Bases** affiche le compteur, mais ne devient pas l'écran principal de gestion des utilisateurs.

### 4.7 Véhicules rattachés

La liste affiche un compteur simple.

Exemple :

```text
4 véhicules
```

Le rattachement des véhicules reste principalement géré depuis la page **Véhicules**.

### 4.8 Statut

La liste affiche le statut actif ou inactif.

Statuts possibles :

- actif ;
- inactif.

Les dépôts / bases archivés ne sont pas visibles par défaut.

Ils sont visibles uniquement via un filtre dédié.

### 4.9 Actions

Actions disponibles selon permissions :

- consulter ;
- modifier ;
- désactiver ;
- réactiver ;
- archiver ;
- afficher les archivés ;
- désarchiver / restaurer.

Aucune suppression physique n'est prévue en Alpha.

### 4.10 Recherche et filtres

Filtres simples proposés en Alpha :

- recherche par nom ;
- statut actif / inactif ;
- responsable local ;
- afficher les dépôts / bases archivés.

Pas de filtre avancé en Alpha.

---

## 5. Création d'un dépôt / base

### 5.1 Objectif

La création permet d'ajouter un lieu d'exploitation simple à la société.

Un dépôt / base peut ensuite servir :

- de repère organisationnel ;
- de rattachement pour certains utilisateurs ;
- de rattachement pour certains véhicules ;
- de filtre ou préremplissage dans le Planning ;
- de rattachement facultatif pour certains modèles horaires.

### 5.2 Champs du formulaire

Le formulaire de création contient :

- nom du dépôt / base ;
- description courte ;
- adresse ;
- complément d'adresse ;
- code postal ;
- ville ;
- pays ;
- téléphone ;
- email de contact ;
- responsable local optionnel ;
- statut actif / inactif ;
- commentaire interne.

### 5.3 Nom du dépôt / base

Le nom est obligatoire.

Exemples :

```text
Lamballe
```

```text
Saint-Brieuc
```

```text
Rennes
```

Règle validée :

```text
Le nom du dépôt / base doit être unique dans la société.
```

### 5.4 Description courte

La description courte est optionnelle.

Exemples :

```text
Base principale de la société
```

```text
Lieu d'exploitation secondaire
```

```text
Point de départ fréquent
```

### 5.5 Adresse

Champs d'adresse :

- adresse ;
- complément d'adresse ;
- code postal ;
- ville ;
- pays.

Règle validée :

```text
L'adresse est recommandée mais non obligatoire en Alpha.
```

Le pays peut être prérempli avec :

```text
France
```

### 5.6 Contact du lieu

Champs optionnels :

- téléphone ;
- email de contact.

Ces informations concernent le dépôt / base, pas forcément la société entière.

### 5.7 Responsable local

Le responsable local est optionnel.

S'il est renseigné, il doit être un utilisateur existant de la société.

Règles validées :

- le responsable local ne donne pas automatiquement de permissions ;
- modifier le responsable local ne modifie pas les rôles ;
- modifier le responsable local ne modifie pas les permissions ;
- les droits applicatifs restent gérés depuis la page **Utilisateurs**.

### 5.8 Statut initial

À la création, le dépôt / base peut être :

- actif ;
- inactif.

Par défaut, le statut est :

```text
Actif
```

### 5.9 Commentaire interne

Le commentaire interne est optionnel.

Exemples :

```text
Utilisé surtout pour les gardes de nuit.
```

```text
À compléter avec l'adresse exacte.
```

```text
Lieu provisoire.
```

### 5.10 Règles de validation

À la création, les règles suivantes s'appliquent :

- nom obligatoire ;
- nom unique dans la société ;
- code postal valide si renseigné ;
- email valide si renseigné ;
- responsable local existant si renseigné ;
- statut obligatoire.

---

## 6. Modification d'un dépôt / base

### 6.1 Objectif

La modification permet de corriger ou compléter un lieu d'exploitation sans supprimer son historique.

### 6.2 Champs modifiables

Champs modifiables :

- nom du dépôt / base ;
- description courte ;
- adresse ;
- complément d'adresse ;
- code postal ;
- ville ;
- pays ;
- téléphone ;
- email de contact ;
- responsable local optionnel ;
- statut actif / inactif ;
- commentaire interne.

### 6.3 Règles de modification

Règles validées :

- le nom reste obligatoire ;
- le nom doit rester unique dans la société ;
- l'adresse reste recommandée mais non obligatoire ;
- le responsable local reste optionnel ;
- si responsable local renseigné, il doit être un utilisateur existant ;
- modifier le responsable local ne modifie pas ses rôles ;
- modifier le responsable local ne modifie pas ses permissions ;
- les modifications sensibles doivent être tracées dans l'audit.

### 6.4 Impact sur les utilisateurs déjà rattachés

Modifier un dépôt / base ne détache pas automatiquement les utilisateurs déjà rattachés.

Exemple :

```text
Le dépôt "Lamballe" est renommé "Base Lamballe".

Les utilisateurs rattachés restent rattachés à ce même dépôt / base.
```

Le rattachement des utilisateurs reste principalement géré depuis la page **Utilisateurs**.

### 6.5 Impact sur les véhicules déjà rattachés

Modifier un dépôt / base ne détache pas automatiquement les véhicules déjà rattachés.

Le rattachement des véhicules reste principalement géré depuis la page **Véhicules**.

### 6.6 Impact sur les modèles horaires

Modifier un dépôt / base ne modifie pas automatiquement les modèles horaires rattachés.

Si un modèle horaire référence déjà ce dépôt / base, il continue à le référencer.

Si le dépôt / base devient inactif ou archivé, les modèles concernés devront afficher une information claire si nécessaire.

Exemple :

```text
Base : Lamballe — inactive
```

---

## 7. Statuts, archivage et suppression

### 7.1 Notions séparées

La page **Dépôts / Bases** distingue deux notions :

1. statut actif / inactif ;
2. archivage.

Ces notions ne doivent pas être mélangées.

### 7.2 Actif

Un dépôt / base actif peut être utilisé normalement.

Il peut être proposé pour :

- rattachement utilisateur ;
- rattachement véhicule ;
- modèle horaire ;
- créneau Planning ;
- filtre ou préremplissage.

### 7.3 Inactif

Un dépôt / base inactif reste visible dans la liste principale.

Il ne doit plus être proposé normalement pour de nouveaux rattachements.

Il conserve :

- ses anciens rattachements ;
- son historique ;
- ses liens existants ;
- ses compteurs utilisateurs / véhicules.

### 7.4 Non archivé

Un dépôt / base non archivé est visible dans la liste principale.

### 7.5 Archivé

Un dépôt / base archivé est masqué de la liste principale.

Il reste visible uniquement via le filtre :

```text
dépôts / bases archivés
```

Règles validées :

- un dépôt / base archivé conserve son historique ;
- il ne doit pas être proposé normalement pour de nouveaux rattachements ;
- il ne doit pas être proposé normalement dans le Planning ;
- il reste consultable via filtre si l'utilisateur est autorisé ;
- désarchiver ne réactive pas automatiquement un dépôt / base inactif.

### 7.6 Désarchivage / restauration

Désarchiver un dépôt / base :

- retire le statut archivé ;
- rend le dépôt / base visible dans la liste principale ;
- ne réactive pas automatiquement le dépôt / base s'il était inactif ;
- conserve l'historique.

Exemple :

```text
Dépôt / base archivé + inactif
→ après désarchivage : visible à nouveau, mais toujours inactif.
```

### 7.7 Suppression physique

Aucune suppression physique d'un dépôt / base n'est prévue en Alpha.

Si un dépôt / base ne doit plus être utilisé :

- il peut être désactivé ;
- ou il peut être archivé.

### 7.8 Dépôt / base encore utilisé

Si un dépôt / base possède encore des rattachements, l'archivage ou la désactivation reste possible, mais doit afficher un avertissement simple.

Exemple :

```text
Ce dépôt / base est encore rattaché à :
- 8 utilisateurs ;
- 4 véhicules ;
- 3 modèles horaires.

L'archivage conservera l'historique mais empêchera sa proposition normale pour de nouveaux usages.
```

L'action reste possible en Alpha.

---

## 8. Rattachements et liens avec les autres modules

### 8.1 Principe général

Un dépôt / base peut être lié à plusieurs modules.

Il peut servir de repère dans :

- Utilisateurs ;
- Véhicules ;
- Modèles horaires ;
- Planning.

### 8.2 Utilisateurs

Un utilisateur peut être rattaché à un dépôt / base.

Le rattachement utilisateur reste principalement géré depuis la page **Utilisateurs**.

La page **Dépôts / Bases** affiche un compteur des utilisateurs rattachés.

### 8.3 Véhicules

Un véhicule peut avoir une base / dépôt principal.

Le rattachement véhicule reste principalement géré depuis la page **Véhicules**.

La page **Dépôts / Bases** affiche un compteur des véhicules rattachés.

Rappel important :

```text
La base / dépôt d'un véhicule est une information de référence.
Elle ne bloque pas automatiquement les affectations planning.
```

### 8.4 Modèles horaires

Un modèle horaire peut avoir une base / dépôt facultative.

Ce rattachement est surtout utile pour les modèles de gardes.

Pour les modèles de transport programmé, le modèle peut rester sans base afin d'être utilisable depuis n'importe quelle base.

### 8.5 Planning

La base / dépôt peut guider le Planning, mais ne bloque pas automatiquement les affectations en Alpha.

Le comportement exact sera cadré dans la fiche **Planning**.

---

## 9. Lien avec le Planning

### 9.1 Rôle dans le Planning

La base / dépôt peut servir à :

- filtrer le Planning ;
- préremplir un créneau ;
- afficher un lieu de rattachement ;
- organiser les équipes ;
- aider la lecture par secteur ou lieu.

### 9.2 Règle Alpha

Règle validée :

```text
La base / dépôt guide le Planning.
Elle ne bloque pas automatiquement les affectations en Alpha.
```

### 9.3 Points à cadrer dans Planning

Les éléments suivants seront cadrés dans la fiche **Planning** :

- alerte ou blocage si un utilisateur est planifié hors de sa base ;
- alerte ou blocage si un véhicule est utilisé hors de sa base ;
- comportement si une base devient inactive alors que des créneaux futurs existent ;
- comportement dans les vues Planning par dépôt / base ;
- affichage des équipes par base ;
- filtres Planning par base / dépôt.

---

## 10. Accès et permissions

### 10.1 Principe général

La page **Dépôts / Bases** est une page de gestion structurelle de la société.

Elle doit être réservée aux profils de gestion ou aux utilisateurs ayant une permission dédiée.

### 10.2 Admin / Gérant

En Alpha, Admin et Gérant peuvent gérer complètement les dépôts / bases.

Ils peuvent :

- consulter la liste des dépôts / bases ;
- consulter une fiche dépôt / base ;
- créer un dépôt / base ;
- modifier un dépôt / base ;
- désactiver un dépôt / base ;
- réactiver un dépôt / base ;
- archiver un dépôt / base ;
- afficher les dépôts / bases archivés ;
- désarchiver / restaurer un dépôt / base ;
- consulter les compteurs utilisateurs / véhicules rattachés ;
- voir les avertissements avant désactivation ou archivage.

### 10.3 Utilisateur autorisé

Un utilisateur non Admin / non Gérant peut recevoir des droits par permissions dédiées.

Exemples de profils possibles :

- responsable exploitation ;
- responsable planning ;
- responsable flotte ;
- Bureau ;
- Régulateur ;
- autre profil avec permission dédiée.

### 10.4 Utilisateurs terrain

Les utilisateurs terrain n'ont pas accès à la page **Dépôts / Bases** par défaut.

Ils ne peuvent pas :

- créer un dépôt / base ;
- modifier un dépôt / base ;
- désactiver ;
- réactiver ;
- archiver ;
- désarchiver ;
- gérer le responsable local ;
- modifier les informations d'adresse.

Ils peuvent voir l'information **base / dépôt** uniquement dans les pages où cela est utile à leur activité, selon leurs droits.

### 10.5 Permissions dédiées à prévoir

Permissions fonctionnelles proposées :

- consulter les dépôts / bases ;
- créer un dépôt / base ;
- modifier un dépôt / base ;
- désactiver / réactiver un dépôt / base ;
- archiver un dépôt / base ;
- consulter les dépôts / bases archivés ;
- désarchiver / restaurer un dépôt / base ;
- consulter les rattachements d'un dépôt / base.

Les noms techniques exacts seront définis plus tard.

---

## 11. Audit et traçabilité

### 11.1 Principe

Les actions sensibles de la page **Dépôts / Bases** doivent être tracées dans l'audit.

La page peut afficher un historique récent si utile, mais l'audit complet reste dans la page **Audit**.

### 11.2 Actions à tracer

Actions à tracer :

- création d'un dépôt / base ;
- modification du nom ;
- modification de l'adresse ;
- modification du téléphone ou email de contact ;
- modification du responsable local ;
- désactivation ;
- réactivation ;
- archivage ;
- désarchivage / restauration ;
- modification du commentaire interne ;
- tentative d'action non autorisée si pertinent.

### 11.3 Historique récent

Une fiche dépôt / base peut afficher un historique simple :

- date ;
- utilisateur ;
- action réalisée ;
- champ concerné ;
- résumé de modification.

Exemple :

```text
18/05/2026 — Nathan Archenoul
Adresse modifiée
```

L'historique complet reste dans **Audit**.

---

## 12. États de la page

### 12.1 Chargement initial

La page doit charger :

- les dépôts / bases actifs et non archivés ;
- les dépôts / bases inactifs ;
- les compteurs utilisateurs rattachés ;
- les compteurs véhicules rattachés ;
- les responsables locaux si renseignés ;
- les permissions de l'utilisateur connecté.

Message possible :

```text
Chargement des dépôts / bases...
```

### 12.2 Liste vide

Si aucun dépôt / base n'existe :

```text
Aucun dépôt / base créé.
Créez un premier lieu d'exploitation pour structurer la société.
```

L'action **Créer un dépôt / base** s'affiche uniquement si l'utilisateur est autorisé.

### 12.3 Aucun résultat après filtre

Si aucun résultat ne correspond aux filtres :

```text
Aucun dépôt / base ne correspond aux filtres sélectionnés.
```

Action possible :

```text
Réinitialiser les filtres
```

### 12.4 Dépôts / bases archivés

Les dépôts / bases archivés sont masqués par défaut.

Ils apparaissent uniquement via un filtre :

```text
Afficher les dépôts / bases archivés
```

Si aucun élément archivé n'existe :

```text
Aucun dépôt / base archivé.
```

### 12.5 Adresse non renseignée

Si l'adresse est vide :

```text
Adresse non renseignée.
```

Ce n'est pas bloquant en Alpha.

### 12.6 Responsable local non renseigné

Si aucun responsable local n'est défini :

```text
Aucun responsable local.
```

Ce n'est pas bloquant.

### 12.7 Avertissement avant désactivation / archivage

Si le dépôt / base possède encore des rattachements :

```text
Ce dépôt / base est encore rattaché à des utilisateurs ou véhicules.
L'action conservera l'historique, mais le dépôt / base ne sera plus proposé normalement pour de nouveaux usages.
```

Si possible, afficher le détail :

```text
Utilisateurs rattachés : 8
Véhicules rattachés : 4
Modèles horaires rattachés : 3
Créneaux Planning liés : à confirmer
```

L'action reste possible en Alpha.

### 12.8 Accès non autorisé

Si l'utilisateur n'a pas accès :

```text
Accès non autorisé.
```

La page peut aussi être absente de la navigation.

### 12.9 Action non autorisée

Si l'utilisateur peut consulter mais pas modifier :

```text
Action non autorisée.
```

Selon les cas, les actions interdites peuvent être masquées.

### 12.10 Erreur de chargement

En cas d'erreur technique :

```text
Impossible de charger les dépôts / bases.
Veuillez réessayer.
```

### 12.11 Validation de formulaire

Messages à prévoir :

```text
Le nom du dépôt / base est obligatoire.
```

```text
Un dépôt / base avec ce nom existe déjà .
```

```text
Le code postal est invalide.
```

```text
L'email de contact est invalide.
```

```text
Le responsable local sélectionné est invalide.
```

---

## 13. Éléments exclus du périmètre V1 / Alpha

Les éléments suivants ne sont pas intégrés au périmètre V1 / Alpha.

Ils ne sont pas exclus de la version finale.

- distinction technique entre Base, Dépôt, Point d'exploitation et Autre ;
- suppression physique d'un dépôt / base ;
- rattachement massif des utilisateurs depuis cette page ;
- rattachement massif des véhicules depuis cette page ;
- gestion complète des modèles horaires depuis cette page ;
- gestion complète des créneaux Planning depuis cette page ;
- blocage automatique des affectations hors base ;
- règles avancées par base / dépôt ;
- permissions granulaires par dépôt / base ;
- hiérarchie multi-sites avancée ;
- carte géographique ;
- géolocalisation ;
- calcul de distance ;
- secteurs géographiques avancés ;
- reporting par base / dépôt ;
- exports avancés ;
- application mobile dédiée.

Ces éléments pourront être réétudiés en Beta, version finale ou évolution ultérieure.

---

## 14. Évolutions futures / à ne pas oublier

### 14.1 Types de lieux

À prévoir plus tard, potentiellement en Beta :

- Base ;
- Dépôt ;
- Point d'exploitation ;
- Autre.

En Alpha, on garde une notion simple :

```text
Dépôt / Base
```

### 14.2 Gestion avancée des rattachements

À prévoir plus tard :

- rattachement direct de plusieurs utilisateurs depuis la page Dépôts / Bases ;
- rattachement direct de plusieurs véhicules depuis la page Dépôts / Bases ;
- rattachement de modèles horaires depuis la fiche dépôt / base ;
- vue détaillée des créneaux liés ;
- actions groupées.

En Alpha, les rattachements restent principalement gérés depuis les pages concernées.

### 14.3 Règles avancées par dépôt / base

À prévoir plus tard :

- règles spécifiques par base ;
- horaires spécifiques par base ;
- restrictions par base ;
- permissions par base ;
- visibilité par secteur ;
- règles de planning propres à un lieu.

Pas en Alpha.

### 14.4 Planning avancé par dépôt / base

À cadrer dans la fiche **Planning** :

- vue Planning filtrée par base / dépôt ;
- comparaison entre bases ;
- alerte si véhicule affecté hors base ;
- alerte si utilisateur planifié hors base ;
- comportement si une base devient inactive avec des créneaux futurs ;
- affichage des équipes par base.

### 14.5 Géolocalisation / carte

À prévoir plus tard si utile :

- affichage des bases sur une carte ;
- coordonnées GPS ;
- calcul de distance ;
- aide au choix du dépôt le plus proche ;
- secteurs d'intervention.

Pas en Alpha.

### 14.6 Reporting par dépôt / base

À prévoir plus tard :

- nombre de créneaux par base ;
- véhicules rattachés par base ;
- utilisateurs rattachés par base ;
- anomalies véhicules par base ;
- activité par période ;
- indicateurs comparatifs.

Pas en Alpha.

### 14.7 Expérience mobile

À prévoir plus tard :

- consultation simple du dépôt / base ;
- adresse exploitable sur mobile ;
- accès rapide à l'itinéraire ;
- consultation des véhicules rattachés ;
- consultation des contacts utiles.

---

## 15. Points à confirmer

Les points suivants restent à confirmer dans les fiches futures ou lors d'un cadrage dédié :

- distinction future ou non entre Base, Dépôt, Point d'exploitation et Autre ;
- règles exactes de rattachement utilisateur ↔ dépôt / base ;
- règles exactes de rattachement véhicule ↔ dépôt / base ;
- lien exact modèle horaire ↔ dépôt / base ;
- comportement exact du Planning avec les bases / dépôts ;
- affichage ou non des créneaux Planning liés dans la fiche dépôt / base ;
- comportement si un dépôt / base inactif est encore utilisé par des créneaux futurs ;
- comportement si un dépôt / base archivé est encore référencé ;
- noms techniques définitifs des permissions ;
- niveau exact d'historique affiché dans la page ;
- utilité future d'un responsable local avancé ;
- règle future éventuelle de permissions par base / dépôt.
