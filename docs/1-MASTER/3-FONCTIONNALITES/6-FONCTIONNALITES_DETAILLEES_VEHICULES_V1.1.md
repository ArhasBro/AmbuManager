# Ambulance Manager — Fonctionnalités détaillées — Véhicules V1

> Statut : référence fonctionnelle cible — page non validée à ce stade.

Version : V1 (MASTER)  
Date : 18/05/2026

## Sommaire

- [1. Objectif de la page](#1-objectif-de-la-page)
- [2. Positionnement fonctionnel](#2-positionnement-fonctionnel)
- [3. Liste des véhicules](#3-liste-des-véhicules)
- [4. Création d'un véhicule](#4-création-dun-véhicule)
- [5. Modification d'un véhicule](#5-modification-dun-véhicule)
- [6. Statuts, disponibilité et archivage](#6-statuts-disponibilité-et-archivage)
- [7. Fiche détail véhicule](#7-fiche-détail-véhicule)
- [8. Actions et permissions](#8-actions-et-permissions)
- [9. Règles liées au planning](#9-règles-liées-au-planning)
- [10. Lien avec Suivi des véhicules](#10-lien-avec-suivi-des-véhicules)
- [11. Exclusions V1 / Alpha](#11-exclusions-v1--alpha)
- [12. Évolutions futures / à ne pas oublier](#12-évolutions-futures--à -ne-pas-oublier)
- [13. Points à confirmer](#13-points-à -confirmer)

---

## 1. Objectif de la page

La page **Véhicules V1 / Alpha** sert de référentiel de flotte.

Elle permet de gérer les véhicules de la société avec les informations nécessaires à leur identification, leur statut, leur disponibilité générale et leur utilisation future dans le planning.

La page doit permettre de :

- consulter la liste des véhicules ;
- consulter une fiche véhicule ;
- créer un véhicule ;
- modifier un véhicule ;
- gérer le statut administratif ;
- gérer la disponibilité générale ;
- archiver ou restaurer un véhicule ;
- rattacher un véhicule à une base / dépôt principal ;
- préparer l'utilisation des véhicules dans le planning.

La page **Véhicules** ne doit pas devenir une page de suivi opérationnel complet.

Les workflows détaillés de vérification, désinfection et anomalies véhicules seront traités dans une page séparée : **Suivi des véhicules**.

---

## 2. Positionnement fonctionnel

### 2.1 Page Véhicules

La page **Véhicules** est le référentiel administratif de la flotte.

Elle contient les informations stables ou générales du véhicule :

- nom interne personnalisable ;
- marque ;
- modèle ;
- type de véhicule ;
- immatriculation ;
- statut administratif ;
- disponibilité générale ;
- base / dépôt principal ;
- commentaire interne simple si utile.

Elle peut afficher un résumé de suivi si utile, mais elle ne contient pas les workflows détaillés.

### 2.2 Page Suivi des véhicules

Une page séparée **Suivi des véhicules** est prévue pour le suivi opérationnel.

Elle comportera des onglets distincts :

- Vérifications ;
- Désinfections ;
- Anomalies véhicules.

Un onglet futur **Entretien** pourra être envisagé plus tard pour la maintenance avancée.

Cette décision permet de garder la page **Véhicules** claire, lisible et centrée sur le référentiel flotte.

---

## 3. Liste des véhicules

La liste des véhicules doit afficher les véhicules de la société dans une vue claire et exploitable.

### 3.1 Colonnes validées

La liste contient les colonnes suivantes :

1. **Véhicule**
   - nom interne personnalisable ;
   - marque ;
   - modèle.

2. **Type de véhicule**
   - AMBULANCE ;
   - VSL ;
   - TAXI ;
   - TPMR.

3. **Immatriculation**

4. **Statut administratif**

5. **Disponibilité générale**

6. **Base / dépôt de rattachement**

7. **Résumé de suivi si utile**

8. **Actions disponibles**

### 3.2 Affichage de l'identité véhicule

Le nom interne est personnalisable.

La marque et le modèle sont affichés sous le nom interne.

Exemple :

```text
AMBULANCE 01
Renault — Master
```

### 3.3 Types de véhicules

Les types de véhicules principaux sont affichés en majuscules :

- AMBULANCE ;
- VSL ;
- TAXI ;
- TPMR.

Pour **TPMR**, une distinction métier doit être prévue lorsque nécessaire :

- **TPMR VSL** ;
- **TPMR TAXI**.

Cette distinction ne remplace pas forcément le type principal **TPMR** dans le référentiel Véhicules.  
Elle sert à préciser l'usage attendu du véhicule, notamment pour les besoins Planning et les modèles horaires.

Règle de prudence :

> Le type principal peut rester **TPMR**, mais le Planning et les Modèles horaires doivent pouvoir distinguer **TPMR VSL** et **TPMR TAXI** lorsque cette information est nécessaire.

### 3.4 Résumé de suivi

La liste peut afficher un résumé simple si utile.

Exemples possibles :

- aucun problème signalé ;
- anomalie ouverte ;
- vérification à faire ;
- désinfection à faire.

Le détail exact du résumé dépendra de la future page **Suivi des véhicules**.

---

## 4. Création d'un véhicule

La création d'un véhicule permet d'ajouter un véhicule dans le référentiel de la société.

Elle est réservée aux profils autorisés.

En Alpha, **Admin** et **Gérant** peuvent créer des véhicules.

### 4.1 Champs validés

Le formulaire de création véhicule contient :

- nom interne personnalisable ;
- marque ;
- modèle ;
- type de véhicule ;
- immatriculation ;
- statut administratif ;
- disponibilité générale ;
- base / dépôt principal ;
- commentaire interne simple si utile.

### 4.2 Type de véhicule

Le type est obligatoire.

Valeurs autorisées :

- AMBULANCE ;
- VSL ;
- TAXI ;
- TPMR.

Pour un véhicule **TPMR**, une précision métier peut être nécessaire afin de distinguer :

- **TPMR VSL** ;
- **TPMR TAXI**.

Cette précision permet d'éviter une ambiguïté dans le Planning et les Modèles horaires.  
Elle ne doit pas casser la logique déjà validée des types principaux de véhicules.

### 4.3 Immatriculation

L'immatriculation est obligatoire.

Elle sert à identifier officiellement le véhicule dans la flotte.

### 4.4 Société

Le véhicule appartient automatiquement à la société courante.

L'utilisateur ne choisit pas librement une autre société lors de la création.

### 4.5 Base / dépôt principal

Le véhicule peut être rattaché à une base / dépôt principal.

Ce rattachement est une information de référence.

Il ne doit pas bloquer automatiquement les affectations planning.

### 4.6 Statut initial

Le statut administratif peut être :

- actif ;
- inactif.

### 4.7 Disponibilité initiale

La disponibilité générale peut être :

- disponible ;
- indisponible.

Un véhicule inactif ou indisponible ne doit pas être proposé normalement au planning.

---

## 5. Modification d'un véhicule

La modification véhicule permet de mettre à jour les informations d'un véhicule sans supprimer son historique.

Elle est réservée aux profils autorisés.

### 5.1 Champs modifiables

Les champs modifiables sont :

- nom interne personnalisable ;
- marque ;
- modèle ;
- type de véhicule ;
- immatriculation ;
- statut administratif ;
- disponibilité générale ;
- base / dépôt principal ;
- commentaire interne simple.

### 5.2 Règles de modification

L'immatriculation reste obligatoire.

Le type de véhicule reste obligatoire.

L'immatriculation doit être unique dans la société.

Les modifications sensibles doivent être traçables dans l'audit.

Les informations de suivi détaillé ne sont pas modifiées directement depuis cette page.

### 5.3 Base / dépôt principal

La base / dépôt principal du véhicule est une information de référence.

Elle ne doit pas affecter automatiquement :

- les affectations des véhicules ;
- les affectations des utilisateurs ;
- les plannings existants ;
- les futures affectations.

Un véhicule peut ne pas rentrer à la même base le soir.

Le rattachement base / dépôt ne doit donc pas devenir une contrainte stricte d'affectation planning par défaut.

---

## 6. Statuts, disponibilité et archivage

La page Véhicules distingue trois notions différentes :

1. statut administratif ;
2. disponibilité générale ;
3. archivage.

Ces notions ne doivent pas être mélangées.

### 6.1 Statut administratif

Le statut administratif peut être :

- actif ;
- inactif.

#### Actif

Le véhicule existe dans la flotte courante.

Il peut être utilisé si sa disponibilité le permet.

#### Inactif

Le véhicule reste visible dans la liste principale.

Il ne doit pas être proposé normalement pour de nouvelles affectations planning.

Son historique est conservé.

### 6.2 Disponibilité générale

La disponibilité générale peut être :

- disponible ;
- indisponible.

#### Disponible

Le véhicule peut être proposé au planning si les autres conditions sont valides.

#### Indisponible

Le véhicule ne doit pas être proposé normalement au planning.

L'indisponibilité peut être liée à un problème, une immobilisation ou un état temporaire à préciser dans le suivi.

### 6.3 Archivage

L'archivage peut être :

- non archivé ;
- archivé.

#### Non archivé

Le véhicule est visible dans la liste principale.

#### Archivé

Le véhicule est masqué de la liste principale.

Il reste visible uniquement via un filtre **véhicules archivés**.

Son historique est conservé.

### 6.4 Actions de statut validées

Les actions validées sont :

- désactiver ;
- réactiver ;
- archiver ;
- afficher les véhicules archivés ;
- désarchiver / restaurer.

### 6.5 Règles validées

Un véhicule inactif, indisponible ou archivé ne doit pas être proposé normalement au planning.

Aucune suppression physique n'est prévue en V1 / Alpha.

Désarchiver un véhicule ne le réactive pas automatiquement.

Désarchiver un véhicule ne le rend pas automatiquement disponible.

L'historique du véhicule est conservé.

Les actions sensibles doivent être traçables dans l'audit.

---

## 7. Fiche détail véhicule

La fiche détail véhicule permet de consulter les informations principales d'un véhicule.

Elle ne remplace pas la page **Suivi des véhicules**.

### 7.1 Mode consultation et mode modification

La fiche détail distingue :

- un mode consultation ;
- un mode modification.

Le mode consultation permet de lire les informations du véhicule.

Le mode modification permet de modifier les champs autorisés, uniquement si l'utilisateur connecté dispose des permissions nécessaires.

### 7.2 En-tête de la fiche

L'en-tête affiche :

- nom interne personnalisable ;
- marque ;
- modèle ;
- type de véhicule ;
- immatriculation ;
- statut administratif ;
- disponibilité générale ;
- base / dépôt principal ;
- actions disponibles selon permissions.

Exemple :

```text
AMBULANCE 01
Renault — Master

Type : AMBULANCE
Immatriculation : AA-123-BB
Statut : Actif
Disponibilité : Disponible
Base principale : Lamballe
```

### 7.3 Informations générales

La fiche affiche les informations générales :

- nom interne ;
- marque ;
- modèle ;
- type ;
- immatriculation ;
- société ;
- base / dépôt principal ;
- commentaire interne simple.

La société est affichée comme contexte.

Le véhicule appartient automatiquement à la société courante.

### 7.4 Statuts séparés

La fiche affiche séparément :

- statut administratif ;
- disponibilité générale ;
- archivage.

Exemple :

```text
Statut administratif : Actif
Disponibilité : Indisponible
Archivage : Non archivé
```

### 7.5 Résumé de suivi

La fiche peut afficher un résumé de suivi simple si utile.

Exemples possibles :

- dernière vérification connue ;
- dernière désinfection connue ;
- anomalie ouverte ;
- état de suivi global simple.

Le détail exact reste à confirmer dans la fiche **Suivi des véhicules**.

### 7.6 Lien vers Suivi des véhicules

Si la page **Suivi des véhicules** existe, la fiche véhicule peut proposer un accès vers cette page.

Le lien peut ouvrir le suivi filtré sur le véhicule concerné.

### 7.7 Utilisabilité au planning

La fiche peut afficher une indication simple :

- utilisable au planning : oui / non ;
- raison simple si non utilisable.

Exemples :

```text
Utilisable au planning : Non
Raison : véhicule indisponible
```

```text
Utilisable au planning : Non
Raison : véhicule archivé
```

### 7.8 Historique récent

La fiche peut afficher un historique récent si l'utilisateur est autorisé.

Exemples :

- création du véhicule ;
- dernière modification importante ;
- changement de statut ;
- changement de disponibilité ;
- archivage ;
- restauration.

L'audit complet reste dans la page **Audit**.

---

## 8. Actions et permissions

### 8.1 Principe général

La page Véhicules est accessible selon les permissions.

En Alpha :

- Admin gère complètement les véhicules ;
- Gérant gère complètement les véhicules ;
- les autres profils accèdent selon permissions ;
- les utilisateurs terrain peuvent consulter la liste des véhicules en lecture simple.

Les actions sensibles doivent être traçables dans l'audit.

### 8.2 Consultation

Les utilisateurs terrain doivent pouvoir consulter la liste des véhicules en lecture simple.

Ils peuvent voir les informations utiles à l'exploitation.

Ils ne peuvent pas administrer les véhicules sans permission dédiée.

### 8.3 Actions validées

Les actions validées sont :

- consulter la liste des véhicules ;
- consulter une fiche véhicule ;
- créer un véhicule ;
- modifier un véhicule ;
- changer rapidement la disponibilité si autorisé ;
- désactiver ;
- réactiver ;
- archiver ;
- afficher les véhicules archivés ;
- désarchiver / restaurer ;
- accéder au suivi du véhicule si la page Suivi des véhicules est disponible.

### 8.4 Changement rapide de disponibilité

Une action rapide de changement de disponibilité peut être prévue.

Elle permet de passer rapidement :

- disponible vers indisponible ;
- indisponible vers disponible.

Cette action est soumise à permission.

Elle doit être tracée dans l'audit.

Elle ne remplace pas le suivi détaillé des anomalies, vérifications ou désinfections.

### 8.5 Actions interdites aux utilisateurs terrain sans permission

Les utilisateurs terrain ne peuvent pas, sans permission dédiée :

- créer un véhicule ;
- modifier un véhicule ;
- archiver un véhicule ;
- désactiver un véhicule ;
- réactiver un véhicule ;
- désarchiver un véhicule ;
- changer la disponibilité générale ;
- gérer les workflows détaillés de suivi.

---

## 9. Règles liées au planning

La page Véhicules prépare l'utilisation des véhicules dans le planning.

### 9.1 Proposition au planning

Un véhicule peut être proposé normalement au planning seulement si :

- il est actif ;
- il est disponible ;
- il n'est pas archivé.

Un véhicule inactif, indisponible ou archivé ne doit pas être proposé normalement au planning.

### 9.2 Base / dépôt

La base / dépôt principal du véhicule ne bloque pas automatiquement les affectations planning.

Elle est une information de référence.

Elle ne doit pas empêcher d'affecter un véhicule hors de sa base principale.

### 9.3 Règles liées au Planning validées

Les règles suivantes sont à prendre en compte pour la cohérence avec la fiche **Planning** :

- l'affectation des véhicules reste manuelle en Alpha ;
- seuls les véhicules actifs, non archivés et disponibles sont proposés normalement ;
- la base / dépôt du véhicule guide le planificateur mais ne bloque pas automatiquement l'affectation ;
- le véhicule exact ne doit pas surcharger la vue globale annuelle du Planning ;
- le véhicule peut être visible dans le détail, la vue semaine ou la vue jour selon permissions ;
- les anomalies, vérifications ou désinfections ne rendent pas automatiquement un véhicule indisponible dans le Planning ;
- un véhicule devient indisponible uniquement par action explicite autorisée ;
- les conflits simples véhicule peuvent être visibles en mode gestion : véhicule déjà affecté, véhicule indisponible, type incompatible, véhicule manquant ;
- la distinction **TPMR VSL** / **TPMR TAXI** doit être prise en compte dans les besoins Planning.

### 9.4 Règles restant à confirmer côté Planning

Certains détails restent à confirmer lors de l'implémentation ou de la relecture transversale :

- comportement exact si un véhicule indisponible est affecté manuellement ;
- comportement si un véhicule devient indisponible alors qu'il est déjà planifié ;
- impact exact sur les plannings publiés ;
- niveau exact de blocage ou d'alerte selon le type de conflit véhicule.

---

## 10. Lien avec Suivi des véhicules

La page Véhicules ne contient pas les workflows détaillés de suivi.

La page **Suivi des véhicules** sera prévue séparément.

### 10.1 Onglets prévus dans Suivi des véhicules

La page **Suivi des véhicules** comportera les onglets :

- Vérifications ;
- Désinfections ;
- Anomalies véhicules.

Un onglet futur **Entretien** pourra être étudié plus tard.

### 10.2 Résumé dans Véhicules

La page Véhicules peut afficher un résumé si utile.

Ce résumé peut indiquer :

- dernier état connu ;
- anomalie ouverte ;
- vérification à faire ;
- désinfection à faire.

Les détails seront cadrés lors de la fiche **Suivi des véhicules**.

---

## 11. Exclusions V1 / Alpha

Les éléments suivants ne sont pas intégrés à la page Véhicules V1 / Alpha :

- suppression physique d'un véhicule ;
- workflow complet de vérification ;
- workflow complet de désinfection ;
- déclaration détaillée d'anomalie véhicule ;
- maintenance avancée ;
- onglet entretien ;
- historique technique complet ;
- documents véhicule dématérialisés ;
- conformité documentaire avancée ;
- échéanciers techniques avancés ;
- coûts de maintenance ;
- contraintes planning avancées ;
- reporting flotte ;
- gestion mobile spécifique.

---

## 12. Évolutions futures / à ne pas oublier

### 12.1 Suivi opérationnel détaillé

Le suivi opérationnel détaillé sera traité dans la page **Suivi des véhicules**.

Sujets prévus :

- vérifications ;
- désinfections ;
- anomalies véhicules ;
- historique de suivi ;
- état opérationnel détaillé ;
- actions terrain liées au véhicule.

### 12.2 Entretien / maintenance avancée

La maintenance avancée n'est pas intégrée à la page Véhicules V1 / Alpha.

Elle pourra être étudiée plus tard dans **Suivi des véhicules**, potentiellement via un onglet **Entretien**.

À confirmer lors du cadrage de la page **Suivi des véhicules**.

### 12.3 Documents véhicule dématérialisés

À prévoir plus tard :

- carte grise ;
- assurance ;
- contrôle technique ;
- documents administratifs ;
- documents internes ;
- justificatifs ;
- pièces jointes liées au véhicule.

### 12.4 Conformité documentaire avancée

À prévoir plus tard :

- dates d'expiration des documents ;
- statut conforme / bientôt expiré / expiré ;
- alertes avant échéance ;
- tableau de suivi documentaire ;
- lien éventuel avec le Tableau de bord.

### 12.5 Affectation planning avancée

À prévoir plus tard ou à harmoniser avec la fiche **Planning** :

- affectation automatique optimisée des véhicules ;
- optimisation par base / dépôt ;
- optimisation par distance ;
- prise en compte de la localisation ;
- suivi temps réel ;
- proposition automatique du véhicule le plus adapté ;
- distinction avancée des usages **AMBULANCE**, **VSL**, **TAXI**, **TPMR VSL** et **TPMR TAXI**.

En Alpha, l'affectation des véhicules reste manuelle.  
Les alertes simples et conflits évidents peuvent guider le planificateur, sans moteur automatique avancé.

### 12.6 Expérience mobile

À prévoir plus tard, surtout pour **Suivi des véhicules** :

- consultation rapide des véhicules sur mobile ;
- vérification véhicule depuis mobile ;
- désinfection depuis mobile ;
- déclaration d'anomalie véhicule depuis mobile ;
- lecture simple de l'état du véhicule par les équipes terrain.

---

## 13. Points à confirmer

Les points suivants restent à confirmer lors des fiches concernées :

- détail exact du résumé de suivi affiché dans la liste Véhicules ;
- détail exact du résumé de suivi affiché dans la fiche véhicule ;
- règles exactes de blocage ou d'alerte au planning ;
- comportement si un véhicule indisponible est affecté manuellement ;
- comportement si un véhicule devient indisponible alors qu'il est déjà planifié ;
- impact sur les plannings publiés ;
- contenu exact de la page Suivi des véhicules ;
- champs détaillés des onglets Vérifications, Désinfections et Anomalies véhicules ;
- ajout ou non d'un onglet Entretien dans Suivi des véhicules ;
- règles de consultation du suivi par les utilisateurs terrain ;
- éventuelle conformité documentaire avancée ;
- future gestion mobile du suivi terrain ;
- formalisation exacte du champ ou sous-type permettant de distinguer TPMR VSL et TPMR TAXI dans le référentiel Véhicules.
