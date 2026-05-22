# Ambulance Manager — Fonctionnalités détaillées — Mise en route V1

> Statut : référence fonctionnelle cible — page non validée à ce stade.

Version : V1.1 (MASTER)  
Date : 18/05/2026

## Sommaire

- [1. Objectif de la page](#1-objectif-de-la-page)
- [2. Positionnement fonctionnel](#2-positionnement-fonctionnel)
- [3. Utilisateurs concernés](#3-utilisateurs-concernés)
- [4. Structure générale de la page](#4-structure-générale-de-la-page)
- [5. Checklist de configuration initiale](#5-checklist-de-configuration-initiale)
- [6. Statuts d'avancement](#6-statuts-davancement)
- [7. Actions et accès rapides](#7-actions-et-accès-rapides)
- [8. Règles d'affichage et de validation](#8-règles-daffichage-et-de-validation)
- [9. Permissions et accès](#9-permissions-et-accès)
- [10. Audit et traçabilité](#10-audit-et-traçabilité)
- [11. Éléments exclus de l'Alpha](#11-éléments-exclus-de-lalpha)
- [12. Évolutions futures / à ne pas oublier](#12-évolutions-futures--à -ne-pas-oublier)
- [13. Points à confirmer](#13-points-à -confirmer)

---

## 1. Objectif de la page

La page **Mise en route** est l'assistant de configuration initiale d'une société dans Ambulance Manager.

Elle sert à guider Admin, Gérant ou utilisateur autorisé dans les premières étapes nécessaires pour rendre la société exploitable dans l'application.

La page doit répondre à une question simple :

> Qu'est-ce qu'il reste à configurer pour que la société puisse commencer à utiliser Ambulance Manager correctement 

La page **Mise en route** ne remplace pas les pages métier.  
Elle centralise une checklist de démarrage et renvoie vers les pages concernées.

---

## 2. Positionnement fonctionnel

### 2.1 Distinction entre Société et Mise en route

La page **Société** reste le profil permanent de la société.

Elle contient les informations stables ou administratives de la société :

- informations générales ;
- adresse principale ;
- contacts société ;
- responsables applicatifs affichés depuis les utilisateurs Admin / Gérant ;
- paramètres généraux ;
- informations métier confirmées.

La page **Mise en route** est différente.

Elle ne sert pas à stocker durablement toutes les informations société.  
Elle sert à afficher l'avancement de la configuration initiale et à guider l'utilisateur vers les actions restantes.

Règle validée :

> Société et Mise en route ne doivent pas être fusionnées.

### 2.2 Résumé dans la page Société

La page Société peut afficher un résumé simple de configuration.

Exemple :

```txt
Configuration initiale : 5 / 8 étapes complétées
Continuer la mise en route
```

Le détail complet de la checklist reste dans la page **Mise en route**.

### 2.3 Ce que Mise en route doit être

La page **Mise en route** doit être :

- une page d'assistance ;
- une checklist initiale ;
- un guide de démarrage ;
- un point de contrôle simple ;
- un accès rapide vers les pages métier.

Elle doit aider l'utilisateur à ne pas oublier les éléments essentiels avant la première utilisation réelle.

### 2.4 Ce que Mise en route ne doit pas être

La page **Mise en route** ne doit pas devenir :

- une deuxième page Société ;
- une deuxième page Utilisateurs ;
- une deuxième page Véhicules ;
- une deuxième page Modèles horaires ;
- une deuxième page Planning ;
- un module d'import complexe ;
- un assistant commercial self-service complet ;
- une page de paramétrage avancé.

---

## 3. Utilisateurs concernés

### 3.1 Utilisateurs principaux

La page **Mise en route** concerne principalement :

- Admin ;
- Gérant ;
- utilisateur autorisé à configurer la société.

Ces profils peuvent consulter l'état de configuration et accéder aux actions de mise en route selon leurs permissions.

### 3.2 Utilisateurs terrain

Les utilisateurs terrain n'ont pas besoin d'accéder à la page **Mise en route** par défaut.

Ils ne sont pas concernés par la configuration initiale de la société.

Accès terrain par défaut :

> Non prévu en Alpha.

Un accès spécifique pourra être étudié plus tard si un besoin réel apparaît.

---

## 4. Structure générale de la page

La page **Mise en route** doit rester simple et lisible.

Elle peut être structurée autour de trois zones principales.

### 4.1 En-tête de progression

L'en-tête affiche une synthèse de l'avancement.

Informations possibles :

- nom de la société ;
- statut global de mise en route ;
- nombre d'étapes complétées ;
- nombre d'étapes restantes ;
- dernière mise à jour si utile.

Exemple :

```txt
Mise en route
6 / 8 étapes complétées
Configuration presque terminée
```

### 4.2 Checklist principale

La checklist affiche les étapes de configuration initiale.

Chaque étape doit afficher :

- un titre clair ;
- un statut ;
- une courte description ;
- une action principale ;
- éventuellement un lien vers la page métier concernée.

### 4.3 Bloc d'aide ou résumé

Un bloc complémentaire peut rappeler l'objectif de la page.

Exemple :

```txt
Complétez les étapes essentielles pour préparer votre société avant la première utilisation réelle.
```

Ce bloc doit rester court.  
Il ne doit pas devenir une documentation longue.

---

## 5. Checklist de configuration initiale

La checklist de mise en route V1 / Alpha doit rester centrée sur les éléments indispensables.

### 5.1 Profil société

Objectif :

> Vérifier que les informations minimales de la société sont renseignées.

Lien principal :

- page Société.

Éléments suivis possibles :

- nom de la société ;
- adresse principale ;
- contacts société ;
- responsables applicatifs ;
- paramètres généraux utiles.

La page Mise en route ne doit pas dupliquer tout le formulaire Société.  
Elle doit seulement indiquer si l'étape est complétée ou à compléter.

### 5.2 Dépôts / Bases

Objectif :

> Vérifier qu'au moins une base / dépôt utile à l'exploitation a été créée si nécessaire.

Lien principal :

- page Dépôts / Bases.

Éléments suivis possibles :

- nombre de bases / dépôts créés ;
- présence d'au moins un lieu actif ;
- statut des bases / dépôts.

Rappel fonctionnel :

- en Alpha, la notion reste simple : base / dépôt ;
- pas de distinction technique obligatoire entre Base, Dépôt, Point d'exploitation ou Autre.

### 5.3 Utilisateurs

Objectif :

> Vérifier que les utilisateurs nécessaires à l'exploitation initiale ont été créés.

Lien principal :

- page Utilisateurs.

Éléments suivis possibles :

- nombre d'utilisateurs actifs ;
- présence d'au moins un Admin ou Gérant ;
- utilisateurs terrain créés si nécessaire ;
- rôles principaux renseignés ;
- utilisateurs rattachés à une base / dépôt si applicable.

La page Mise en route ne remplace pas la gestion des utilisateurs.

### 5.4 Véhicules

Objectif :

> Vérifier que les véhicules nécessaires à l'exploitation initiale ont été créés.

Lien principal :

- page Véhicules.

Éléments suivis possibles :

- nombre de véhicules actifs ;
- véhicules disponibles ;
- types de véhicules renseignés ;
- immatriculations renseignées ;
- base / dépôt principal si applicable.

Types de véhicules attendus selon les règles déjà validées :

- AMBULANCE ;
- VSL ;
- TAXI ;
- TPMR.

La distinction TPMR VSL / TPMR TAXI devra être harmonisée dans les documents concernés lors de la relecture globale.

### 5.5 Modèles horaires

Objectif :

> Vérifier que les modèles horaires nécessaires à la préparation du Planning existent.

Lien principal :

- page Modèles horaires.

Éléments suivis possibles :

- nombre de modèles actifs ;
- types de véhicules attendus ;
- composition attendue ;
- libellé court Planning ;
- base / dépôt si applicable ;
- modèles nécessaires aux gardes ou roulements.

Rappel :

- les modèles horaires servent de base de création au Planning ;
- les modèles actifs et non archivés sont proposés normalement dans le Planning.

Point à reprendre lors de la relecture globale :

- ajout des jours actifs facultatifs ;
- ajout des horaires par jour si différents ;
- prise en compte des modèles de garde.

### 5.6 Planning initial

Objectif :

> Vérifier qu'un premier planning ou une première préparation de semaine peut être réalisée.

Lien principal :

- page Planning.

Éléments suivis possibles :

- accès au Planning ;
- préparation d'une première semaine ;
- besoins hebdomadaires définis ;
- modèles nécessaires disponibles ;
- utilisateurs et véhicules affectables.

La page Mise en route ne doit pas créer un planning complet à la place de la page Planning.

Elle peut simplement guider vers la préparation du planning initial.

### 5.7 Import de données

Objectif :

> Permettre un accès éventuel aux imports si cette logique est disponible.

En Alpha, l'import ne doit pas être bloquant.

Imports potentiels à prévoir plus tard ou selon périmètre :

- utilisateurs ;
- véhicules ;
- modèles horaires ;
- bases / dépôts ;
- indisponibilités utilisateurs.

Règle V1 :

> L'import peut être utile, mais la mise en route doit rester possible manuellement.

### 5.8 Vérification finale

Objectif :

> Donner une synthèse claire avant première utilisation réelle.

La vérification finale peut afficher :

- étapes complétées ;
- étapes à vérifier ;
- éléments manquants ;
- actions recommandées.

Cette vérification reste informative en Alpha.  
Elle ne doit pas devenir un verrou technique trop complexe sans règle validée.

---

## 6. Statuts d'avancement

Chaque étape de mise en route doit avoir un statut simple.

Statuts proposés pour la V1 / Alpha :

- **À faire** ;
- **En cours** ;
- **Complété** ;
- **À vérifier** ;
- **Ignoré / reporté** si utile.

### 6.1 À faire

L'étape n'a pas encore été commencée ou aucune donnée minimale n'est détectée.

Exemple :

```txt
Véhicules — À faire
```

### 6.2 En cours

L'étape contient déjà des informations, mais semble incomplète.

Exemple :

```txt
Utilisateurs — En cours
```

### 6.3 Complété

Les informations minimales attendues sont présentes.

Exemple :

```txt
Dépôts / Bases — Complété
```

### 6.4 À vérifier

L'étape contient des informations, mais une incohérence ou un manque possible doit être contrôlé.

Exemple :

```txt
Modèles horaires — À vérifier
```

### 6.5 Ignoré / reporté

Ce statut peut être utile lorsqu'une étape n'est pas nécessaire immédiatement.

Exemple :

```txt
Import de données — Reporté
```

Ce statut ne doit pas masquer une étape réellement obligatoire.

---

## 7. Actions et accès rapides

La page **Mise en route** doit faciliter l'accès aux pages métier.

Chaque étape peut proposer une action principale.

Exemples :

- **Compléter la société** ;
- **Créer une base / dépôt** ;
- **Ajouter des utilisateurs** ;
- **Ajouter des véhicules** ;
- **Créer des modèles horaires** ;
- **Préparer le planning initial** ;
- **Importer des données** si disponible ;
- **Vérifier la configuration**.

### 7.1 Comportement attendu

Les actions doivent ouvrir la page métier concernée.

Exemples :

- Profil société → page Société ;
- Bases / dépôts → page Dépôts / Bases ;
- Utilisateurs → page Utilisateurs ;
- Véhicules → page Véhicules ;
- Modèles horaires → page Modèles horaires ;
- Planning initial → page Planning.

### 7.2 Pas de duplication des formulaires

La page Mise en route ne doit pas contenir tous les formulaires complets.

Elle peut afficher :

- un résumé ;
- une alerte ;
- une action rapide ;
- un lien vers la page concernée.

La saisie détaillée reste dans les pages métier.

---

## 8. Règles d'affichage et de validation

### 8.1 Principe général

La page doit afficher une progression utile sans prétendre valider toute la conformité métier.

Elle peut contrôler des conditions simples, par exemple :

- au moins une société configurée ;
- au moins un Admin ou Gérant ;
- au moins une base / dépôt active si nécessaire ;
- au moins un utilisateur actif ;
- au moins un véhicule actif ;
- au moins un modèle horaire actif ;
- accès possible au Planning.

### 8.2 Contrôles non bloquants en Alpha

En Alpha, les contrôles doivent rester simples.

La page peut signaler :

- donnée manquante ;
- étape à compléter ;
- étape à vérifier ;
- configuration incomplète.

Mais elle ne doit pas bloquer toute l'application sans règle explicitement validée.

### 8.3 Cohérence avec le multi-tenant

Les informations affichées dans Mise en route doivent concerner uniquement la société courante.

Règle :

> Les données de mise en route doivent respecter le cloisonnement strict par société.

Aucune information d'une autre société ne doit être visible.

---

## 9. Permissions et accès

### 9.1 Accès par défaut

En Alpha, la page **Mise en route** est accessible à :

- Admin ;
- Gérant.

### 9.2 Accès par permission dédiée

Un autre utilisateur peut y accéder uniquement si une permission dédiée existe.

Permission possible :

- consulter la mise en route ;
- gérer la mise en route.

### 9.3 Utilisateurs terrain

Les utilisateurs terrain n'ont pas accès à la page Mise en route par défaut.

Ils peuvent être concernés indirectement par les données créées, mais ils ne participent pas à la configuration initiale.

### 9.4 Actions selon permissions

Un utilisateur peut voir une étape sans forcément pouvoir modifier la page métier associée.

Exemples :

- voir que les véhicules sont incomplets ;
- mais ne pas avoir le droit de créer un véhicule ;
- voir que les utilisateurs sont incomplets ;
- mais ne pas avoir le droit de créer un utilisateur.

La page doit respecter les permissions des pages métier.

---

## 10. Audit et traçabilité

### 10.1 Actions à tracer

La page Mise en route peut générer ou afficher des actions importantes.

À tracer si elles existent :

- changement manuel de statut d'une étape ;
- étape marquée comme ignorée / reportée ;
- étape marquée comme vérifiée ;
- accès à une action sensible si nécessaire ;
- modification d'un paramètre de mise en route.

### 10.2 Actions métier

Les créations ou modifications réelles restent tracées dans les modules concernés.

Exemples :

- création d'un utilisateur → audit Utilisateurs ;
- création d'un véhicule → audit Véhicules ;
- création d'un modèle horaire → audit Modèles horaires ;
- création d'une base / dépôt → audit Dépôts / Bases.

La page Mise en route ne doit pas dupliquer l'audit complet des pages métier.

### 10.3 Historique simple

La page peut afficher un historique simple de mise en route si utile.

Exemple :

```txt
Dernière étape complétée : Véhicules
Dernière mise à jour : 18/05/2026
```

Ce point reste secondaire en Alpha.

---

## 11. Éléments exclus de l'Alpha

Sont exclus de la V1 / Alpha :

- assistant commercial self-service complet ;
- création autonome d'une société par un client externe ;
- tunnel d'inscription libre ;
- configuration automatique complète ;
- recommandations intelligentes avancées ;
- import complexe obligatoire ;
- mapping avancé d'import ;
- assistant conversationnel de configuration ;
- règles automatiques complexes de conformité ;
- blocage strict de l'application tant que chaque étape n'est pas terminée ;
- duplication complète des formulaires Société, Utilisateurs, Véhicules, Dépôts / Bases, Modèles horaires ou Planning.

Ces éléments ne sont pas abandonnés.  
Ils pourront être réétudiés en Beta, version finale ou évolution ultérieure.

---

## 12. Évolutions futures / à ne pas oublier

Évolutions possibles à étudier plus tard :

- assistant de mise en route plus avancé ;
- checklist personnalisable selon la société ;
- import guidé avec aperçu avant import ;
- rapport d'erreurs d'import ;
- validation manuelle d'import ;
- recommandations automatiques ;
- détection plus fine des incohérences ;
- score de complétude de configuration ;
- tutoriel intégré ;
- accompagnement multi-société avancé ;
- mise en route commerciale en libre-service ;
- aide contextuelle page par page ;
- modèle de société préconfiguré ;
- génération automatique de modèles horaires de base ;
- préparation guidée d'une première semaine de planning ;
- notifications de configuration incomplète ;
- version mobile ou affichage responsive simplifié si utile.

---

## 13. Points à confirmer

Les points suivants restent à confirmer :

- INFORMATION NON FOURNIE — À CONFIRMER : nom exact des permissions dédiées à la page Mise en route.
- INFORMATION NON FOURNIE — À CONFIRMER : liste exacte des conditions minimales permettant de considérer chaque étape comme complétée.
- INFORMATION NON FOURNIE — À CONFIRMER : comportement exact si une étape obligatoire reste incomplète.
- INFORMATION NON FOURNIE — À CONFIRMER : périmètre exact de l'import en Alpha.
- INFORMATION NON FOURNIE — À CONFIRMER : niveau de traçabilité spécifique de la page Mise en route, hors audit des pages métier.
