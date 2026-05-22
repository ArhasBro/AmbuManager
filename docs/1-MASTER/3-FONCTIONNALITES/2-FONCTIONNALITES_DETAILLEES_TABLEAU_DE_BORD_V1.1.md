# Ambulance Manager — Fonctionnalités détaillées — Tableau de bord V1

> Statut : référence fonctionnelle cible — page non validée à ce stade.

Version : V1 (MASTER)  
Date : 18/05/2026

## Sommaire

- [1. Objectif de la page](#1-objectif-de-la-page)
- [2. Base de cadrage fonctionnel V1](#2-base-de-cadrage-fonctionnel-v1)
- [3. Utilisateurs concernés](#3-utilisateurs-concernes)
- [4. Principe général d'affichage](#4-principe-general-daffichage)
- [5. Familles de widgets](#5-familles-de-widgets)
- [6. Widgets raccourcis](#6-widgets-raccourcis)
- [7. Widgets KPI Admin / Gérant](#7-widgets-kpi-admin--gerant)
- [8. Widgets Planning personnel](#8-widgets-planning-personnel)
- [9. Widgets Planning global / équipes](#9-widgets-planning-global--equipes)
- [10. Widgets informations / alertes simples](#10-widgets-informations--alertes-simples)
- [11. Personnalisation du Tableau de bord](#11-personnalisation-du-tableau-de-bord)
- [12. Permissions et sécurité d'accès](#12-permissions-et-securite-dacces)
- [13. États de la page](#13-etats-de-la-page)
- [14. Éléments exclus du périmètre V1](#14-elements-exclus-du-perimetre-v1)
- [15. Évolutions futures / à ne pas oublier](#15-evolutions-futures--a-ne-pas-oublier)
- [16. Points à confirmer](#16-points-a-confirmer)

---

## 1. Objectif de la page

Le Tableau de bord est la page d'accueil après connexion à Ambulance Manager.

Son objectif est de donner à chaque utilisateur une vue claire, utile et immédiatement exploitable de son activité, selon son rôle, ses permissions et ses préférences.

Le Tableau de bord V1 doit servir de portail opérationnel.

Il doit permettre de :

- accéder rapidement aux pages autorisées ;
- consulter des indicateurs simples ;
- visualiser des informations de planning utiles ;
- voir des alertes simples ;
- adapter l'affichage aux besoins de l'utilisateur.

Le Tableau de bord V1 ne doit pas devenir un cockpit analytique complexe.

Il ne doit pas intégrer de logique de régulation, de mission, de reporting avancé ou de graphique complexe.

---

## 2. Base de cadrage fonctionnel V1
Le Tableau de bord V1 est validé comme :

- page d'accueil après connexion ;
- page personnalisable simplement par utilisateur ;
- page composée de widgets prédéfinis ;
- page soumise aux rôles et permissions ;
- page capable d'afficher des raccourcis, KPI simples et informations planning ;
- page sans graphique complexe ;
- page sans reporting analytique.

Fonctionnalités cibles de référence pour la V1 (à confirmer) :

- affichage d'un tableau de bord propre à l'utilisateur connecté ;
- affichage de widgets prédéfinis ;
- affichage ou masquage de widgets autorisés ;
- choix de raccourcis favoris ;
- ordre simple des widgets si faisable ;
- disposition par défaut selon le profil ;
- réinitialisation possible vers la disposition par défaut ;
- enregistrement des préférences par utilisateur ;
- filtrage strict des widgets selon les permissions ;
- KPI affichés sous forme de tuiles simples ;
- KPI cliquables vers la page concernée lorsque pertinent ;
- widgets Planning personnels ;
- widgets Planning global / équipes ;
- widgets informations / alertes simples ;
- petit logo ou pictogramme possible sur chaque widget.

---

## 3. Utilisateurs concernés

Le Tableau de bord concerne tous les utilisateurs connectés à Ambulance Manager.

Les contenus affichés varient selon :

- le rôle principal ;
- les permissions ;
- les préférences personnelles ;
- les modules disponibles ;
- les données autorisées pour l'utilisateur.

### 3.1 Admin

L'Admin dispose d'une vue de pilotage complète.

Il peut accéder aux widgets de gestion globale autorisés :

- raccourcis de gestion ;
- KPI utilisateurs ;
- KPI véhicules ;
- KPI planning ;
- alertes simples ;
- informations importantes.

### 3.2 Gérant

Le Gérant dispose d'une vue de pilotage opérationnelle.

Il peut accéder aux widgets utiles au suivi quotidien de la société, selon ses permissions :

- planning ;
- utilisateurs ;
- véhicules ;
- modèles horaires ;
- dépôts / bases ;
- KPI opérationnels ;
- alertes simples.

### 3.3 Bureau / Régulateur

Les profils Bureau et Régulateur disposent d'une vue orientée exploitation quotidienne.

Ils doivent pouvoir accéder à une lecture personnelle et à une lecture globale des équipes, selon les permissions.

Widgets principaux possibles :

- planning global ;
- vue équipes ;
- créneaux du jour ;
- créneaux de la semaine ;
- créneaux non affectés si autorisé ;
- raccourcis opérationnels.

### 3.4 Utilisateurs terrain

Les utilisateurs terrain ne sont pas limités à leur planning personnel.

Ils doivent disposer de deux niveaux de lecture :

- une vue personnelle ;
- une vue globale des équipes.

Cela concerne notamment les profils terrain suivants, selon validation des rôles :

- ADE ;
- AA ;
- TAXI ;
- PSC1 si confirmé.

Widgets principaux possibles :

- Ma journée ;
- Mon heure de début ;
- Ma semaine ;
- Mes prochains créneaux ;
- Planning global ;
- Équipes du jour ;
- Accès au planning complet.

---

## 4. Principe général d'affichage

Le Tableau de bord ne doit pas être codé comme une page différente pour chaque rôle.

La logique attendue est la suivante :

- les widgets disponibles sont définis dans une liste prédéfinie ;
- chaque widget est associé à des permissions ;
- l'utilisateur ne voit que les widgets autorisés ;
- l'utilisateur choisit ensuite les widgets qu'il souhaite afficher ;
- les préférences sont propres à l'utilisateur ;
- si une permission est retirée, le widget correspondant disparaît automatiquement.

Le rôle permet d'orienter la disposition par défaut.

Les permissions restent la règle réelle d'accès.

Règle validée :

> Un widget n'est jamais affiché uniquement parce qu'un utilisateur a un rôle.  
> Il doit aussi être autorisé par ses permissions.

---

## 5. Familles de widgets

Le Tableau de bord V1 est composé de quatre familles de widgets.

### 5.1 Widgets raccourcis

Ils permettent d'accéder rapidement à une page autorisée.

### 5.2 Widgets KPI Admin / Gérant

Ils affichent des indicateurs simples, utiles pour le pilotage quotidien.

### 5.3 Widgets Planning personnel / terrain

Ils affichent les informations liées à l'utilisateur connecté : journée, semaine, heure de début ou prochains créneaux.

### 5.4 Widgets informations / alertes simples

Ils affichent des informations importantes ou des alertes simples liées aux modules validés.

### 5.5 Visuel des widgets

Chaque widget peut comporter :

- un petit logo ;
- un pictogramme ;
- un visuel cohérent avec sa fonction.

Le design exact des pictogrammes et de l'identité graphique des widgets sera créé et validé plus tard.

---

## 6. Widgets raccourcis

Les widgets raccourcis permettent d'accéder rapidement aux pages principales de l'application.

Exemples de raccourcis possibles en V1 :

- Planning ;
- Utilisateurs ;
- Véhicules ;
- Modèles horaires ;
- Société ;
- Dépôts / Bases ;
- Audit, uniquement si autorisé.

Les pages futures pourront également proposer des raccourcis si elles sont validées :

- Heures ;
- Vérification ;
- Désinfection ;
- Suivi des véhicules.

Un raccourci ne doit apparaître que si l'utilisateur a le droit d'accéder à la page concernée.

Un raccourci doit contenir au minimum :

- un libellé clair ;
- un pictogramme ou logo simple ;
- une action d'accès à la page ;
- éventuellement un court sous-texte explicatif.

Exemple :

```text
Planning
Consulter les créneaux et l'organisation des équipes.
```

---

## 7. Widgets KPI Admin / Gérant

Les KPI du Tableau de bord V1 sont affichés sous forme de tuiles simples.

Ils doivent rester lisibles et directement exploitables.

Un KPI peut être cliquable lorsqu'un accès filtré à une page est pertinent.

Exemple :

```text
Véhicules indisponibles
2
Voir les véhicules concernés
```

### 7.1 Structure d'un KPI

Un KPI doit contenir :

- un pictogramme ou petit logo ;
- un titre court ;
- une valeur principale ;
- éventuellement un sous-texte ;
- éventuellement un état visuel simple ;
- éventuellement un lien vers la page concernée.

### 7.2 KPI Utilisateurs

KPI validés en principe :

- utilisateurs présents ;
- utilisateurs absents ;
- absences / indisponibilités à venir.

La logique `présent / absent` est préférée à `actif / inactif`, car elle correspond mieux à un besoin opérationnel quotidien.

La définition exacte d'un utilisateur présent ou absent dépendra de la future fiche Utilisateurs / RH.

À confirmer plus tard :

- présence calculée depuis le planning ;
- présence calculée depuis les absences ;
- présence calculée depuis les heures ;
- distinction entre absence et indisponibilité.

### 7.3 KPI Véhicules

KPI validés en principe :

- véhicules disponibles ;
- véhicules indisponibles ;
- alertes véhicules ;
- conformité à surveiller, si confirmée plus tard.

Le détail exact dépendra des fiches :

- Véhicules ;
- Suivi des véhicules ;
- Vérification ;
- Désinfection.

### 7.4 KPI Planning

KPI validés en principe :

- créneaux planifiés cette semaine ;
- créneaux non affectés ;
- créneaux annulés, si confirmé ;
- état de publication du planning, si confirmé.

Le détail exact dépendra de la fiche Planning.

### 7.5 KPI non retenus en V1

Les KPI suivants ne sont pas retenus dans la V1 du Tableau de bord :

- KPI Société / Bases ;
- KPI Audit / Sécurité ;
- reporting financier ;
- statistiques RH avancées ;
- taux d'absentéisme ;
- analyse mensuelle ;
- performance des équipes ;
- rentabilité ;
- prédictions ;
- score de sécurité.

Ces sujets pourront être envisagés en version finale ou plus tard.

---

## 8. Widgets Planning personnel

Les widgets Planning personnel affichent les informations directement liées à l'utilisateur connecté.

Ils concernent notamment :

- utilisateurs terrain ;
- Bureau ;
- Régulateur ;
- Admin / Gérant si utile.

Widgets validés en V1 :

- Ma journée ;
- Mon heure de début ;
- Ma semaine ;
- Mes prochains créneaux ;
- Accès à mon planning.

### 8.1 Widget Ma journée

Le widget `Ma journée` doit afficher une synthèse simple de la journée de l'utilisateur.

Informations possibles :

- date du jour ;
- heure de début ;
- heure de fin si disponible ;
- base ou dépôt si disponible ;
- véhicule si disponible et autorisé ;
- créneau associé si disponible.

Le widget ne doit pas afficher de mission.

### 8.2 Widget Mon heure de début

Le widget `Mon heure de début` doit afficher l'heure de démarrage prévue pour l'utilisateur.

Il doit être lisible rapidement, notamment pour les profils terrain.

### 8.3 Widget Ma semaine

Le widget `Ma semaine` doit afficher une synthèse simple des créneaux de la semaine.

Il ne doit pas devenir une vue planning complète.

Il doit permettre d'accéder au planning complet si l'utilisateur souhaite consulter le détail.

### 8.4 Widget Mes prochains créneaux

Le widget `Mes prochains créneaux` affiche les prochains créneaux de l'utilisateur connecté.

Le nombre exact de créneaux affichés sera confirmé lors de la fiche Planning.

---

## 9. Widgets Planning global / équipes

Les widgets Planning global / équipes affichent une vue d'ensemble de l'organisation.

Ils ne sont pas réservés aux Admin ou Gérant.

Les utilisateurs terrain et Bureau doivent aussi pouvoir disposer d'une vue globale des équipes, selon les permissions.

Widgets validés en V1 :

- Planning global ;
- Équipes du jour ;
- Créneaux du jour ;
- Créneaux de la semaine ;
- Créneaux non affectés si autorisé ;
- Accès au planning complet.

### 9.1 Widget Planning global

Le widget `Planning global` doit servir d'entrée rapide vers le planning complet.

Il peut afficher une synthèse simple de l'organisation générale.

### 9.2 Widget Équipes du jour

Le widget `Équipes du jour` doit afficher une lecture simple des équipes prévues.

Informations possibles :

- nombre d'équipes prévues ;
- répartition simple par type de véhicule si disponible ;
- bases concernées si disponible ;
- accès au planning complet.

### 9.3 Widget Créneaux du jour

Le widget `Créneaux du jour` doit afficher une synthèse des créneaux prévus sur la journée.

### 9.4 Widget Créneaux de la semaine

Le widget `Créneaux de la semaine` doit afficher une synthèse simple des créneaux de la semaine.

### 9.5 Widget Créneaux non affectés

Le widget `Créneaux non affectés` est affiché uniquement si l'utilisateur est autorisé à voir ou traiter cette information.

Ce widget peut être cliquable vers le Planning avec un filtre adapté.

### 9.6 Règles spécifiques aux widgets planning

Les widgets Planning ne doivent pas afficher :

- de mission ;
- de régulation ;
- de données RH sensibles ;
- d'informations administratives inutiles ;
- de données non autorisées.

Le détail exact dépendra de la fiche Planning.

---

## 10. Widgets informations / alertes simples

Les widgets informations / alertes simples servent à afficher des éléments utiles ou importants.

Ils ne doivent pas devenir un centre de notifications avancé.

Ils doivent rester :

- courts ;
- lisibles ;
- non intrusifs ;
- soumis aux permissions ;
- liés à des modules validés ;
- cliquables uniquement si une page de détail existe.

### 10.1 Informations importantes

Widget validé en principe.

Il peut afficher une information courte utile à l'utilisateur.

Exemples possibles :

- information interne importante ;
- rappel lié au planning ;
- information de fonctionnement ;
- message société ;
- annonce courte.

La création et la gestion de ces informations restent à confirmer.

### 10.2 Alertes planning simples

Widget validé en principe.

Exemples possibles :

- créneaux non affectés ;
- planning non publié, si confirmé ;
- créneaux annulés, si confirmé ;
- incohérence simple de planning, si confirmé ;
- absence impactant un créneau, si confirmé.

Le détail exact dépendra des fiches Planning et Utilisateurs / RH.

### 10.3 Alertes véhicules simples

Widget validé en principe.

Exemples possibles :

- véhicule indisponible ;
- document véhicule expiré ou bientôt expiré, si confirmé ;
- vérification véhicule à faire, si confirmé ;
- désinfection à faire, si confirmé ;
- anomalie véhicule déclarée, si confirmé.

Le détail exact dépendra des fiches Véhicules, Suivi des véhicules, Vérification et Désinfection.

### 10.4 Éléments à traiter

Widget validé en principe.

Il doit rester une liste courte d'actions utiles.

Exemples possibles :

- créneaux non affectés ;
- véhicules à vérifier, si confirmé ;
- éléments en attente, si confirmé ;
- configuration incomplète, si confirmé.

Ce widget ne doit pas devenir une todo-list complète.

### 10.5 Dernières actions importantes

Non retenu dans le cœur V1 du Tableau de bord.

Ce point pourra être réévalué après la fiche Audit.

---

## 11. Personnalisation du Tableau de bord

Chaque utilisateur dispose de son propre Tableau de bord.

Il peut choisir les widgets qu'il souhaite afficher parmi les widgets autorisés.

### 11.1 Actions autorisées en V1

L'utilisateur peut :

- afficher un widget autorisé ;
- masquer un widget autorisé ;
- choisir des raccourcis favoris ;
- réordonner simplement les widgets si faisable ;
- revenir à une disposition par défaut ;
- conserver ses préférences entre deux connexions.

### 11.2 Disposition par défaut

Une disposition par défaut doit exister selon le type de profil.

Admin / Gérant :

- KPI importants ;
- raccourcis de gestion ;
- alertes simples ;
- accès planning.

Bureau / Régulateur :

- planning global ;
- vue équipes ;
- créneaux ;
- raccourcis opérationnels.

Terrain :

- Ma journée ;
- Mon heure de début ;
- Ma semaine ;
- Planning global ;
- Accès au planning complet.

### 11.3 Réinitialisation

L'utilisateur doit pouvoir revenir à la disposition par défaut de son profil.

Exemple d'action :

```text
Réinitialiser mon tableau de bord
```

### 11.4 Préférences utilisateur

Les préférences sont enregistrées par utilisateur.

Elles ne modifient pas le Tableau de bord des autres utilisateurs.

Si aucune préférence n'existe, l'application affiche la disposition par défaut.

### 11.5 Limites de personnalisation V1

L'utilisateur ne peut pas :

- créer librement un widget ;
- modifier la logique d'un KPI ;
- créer un filtre avancé ;
- choisir librement la taille des widgets ;
- créer un graphique ;
- importer un widget externe ;
- modifier le Tableau de bord d'un autre utilisateur ;
- afficher une donnée non autorisée.

---

## 12. Permissions et sécurité d'accès

Le Tableau de bord doit respecter strictement les permissions.

Règles validées :

- un widget non autorisé ne doit pas être visible ;
- un raccourci vers une page interdite ne doit pas être visible ;
- un KPI ne doit pas afficher de donnée non autorisée ;
- une vue globale ne doit pas exposer de données RH sensibles ;
- les préférences utilisateur ne doivent jamais contourner les permissions ;
- si une permission est retirée, le widget correspondant doit disparaître automatiquement.

Exemple :

```text
Si un utilisateur perd l'accès au module Véhicules, le widget Véhicules disparaît de son Tableau de bord.
```

Le Tableau de bord doit être cohérent avec la session utilisateur chargée après connexion.

---

## 13. États de la page

Le Tableau de bord doit prévoir plusieurs états simples.

### 13.1 Chargement initial

Au chargement de la page, l'application doit récupérer :

- la session utilisateur ;
- les permissions ;
- les widgets autorisés ;
- les préférences enregistrées ;
- les données nécessaires aux widgets affichés.

### 13.2 Tableau de bord vide

Si aucun widget n'est sélectionné, la page doit proposer une action simple pour personnaliser ou réinitialiser le Tableau de bord.

Exemple :

```text
Aucun widget affiché.
Personnalisez votre tableau de bord ou revenez à la disposition par défaut.
```

### 13.3 Donnée indisponible

Si une donnée de widget n'est pas disponible, le widget doit afficher un état sobre.

Exemple :

```text
Donnée indisponible.
```

Le widget ne doit pas afficher une valeur fausse ou inventée.

### 13.4 Erreur de chargement

En cas d'erreur technique, la page doit afficher un message simple.

Exemple :

```text
Impossible de charger le tableau de bord.
Veuillez réessayer.
```

### 13.5 Accès non autorisé

Un widget non autorisé ne doit pas apparaître.

Il n'est pas nécessaire d'afficher un message indiquant que le widget est interdit.

---

## 14. Éléments exclus du périmètre V1

Le Tableau de bord V1 ne doit pas intégrer :

- graphique complexe ;
- reporting analytique ;
- cockpit financier ;
- prédiction ;
- score de performance ;
- score de sécurité ;
- centre de notifications avancé ;
- moteur d'alertes complexe ;
- surveillance sécurité avancée ;
- création libre de widgets ;
- glisser-déposer complexe obligatoire ;
- modification libre de la taille des widgets ;
- requêtes ou filtres personnalisés avancés ;
- données de régulation ;
- missions ;
- données RH sensibles non nécessaires ;
- KPI Société / Bases ;
- KPI Audit / Sécurité.

---

## 15. Évolutions futures / à ne pas oublier

### 15.1 Widgets complémentaires

La liste des widgets pourra être complétée après le cadrage des autres pages.

Les futurs widgets devront rester :

- prédéfinis ;
- simples ;
- soumis aux permissions ;
- cohérents avec les modules validés.

### 15.2 Identité visuelle des widgets

Les pictogrammes, logos et visuels des widgets seront conçus et validés plus tard.

Objectif futur :

- améliorer le repérage rapide ;
- renforcer la cohérence graphique ;
- donner une identité visuelle claire au Tableau de bord.

### 15.3 Version mobile de l'app web

Une version mobile de l'application web est prévue en version finale.

Pour le Tableau de bord, il faudra prévoir plus tard :

- une disposition adaptée aux petits écrans ;
- des widgets lisibles sur smartphone ;
- des raccourcis rapides pour les profils terrain ;
- une navigation claire vers le Planning ;
- une hiérarchie mobile entre vue personnelle et vue globale.

Cette évolution n'est pas intégrée au périmètre V1 sauf validation explicite.

### 15.4 KPI avancés

Les KPI suivants pourront être étudiés plus tard :

- KPI Société / Bases ;
- KPI Audit / Sécurité ;
- statistiques RH avancées ;
- indicateurs mensuels ;
- reporting ;
- alertes enrichies.

Ces éléments ne sont pas prévus dans la V1 du Tableau de bord.

---

## 16. Points à confirmer

Les points suivants restent à confirmer dans les fiches détaillées des pages concernées.

### 16.1 Utilisateurs / RH

- définition exacte d'un utilisateur présent ;
- définition exacte d'un utilisateur absent ;
- distinction entre absence et indisponibilité ;
- source de calcul de la présence ;
- lien éventuel avec la future page Heures.

### 16.2 Planning

- calcul exact des créneaux planifiés ;
- définition d'un créneau non affecté ;
- existence et statut des créneaux annulés ;
- notion de planning publié ;
- informations affichables dans `Ma journée` ;
- informations affichables dans `Équipes du jour` ;
- nombre de prochains créneaux affichés.

### 16.3 Véhicules / Suivi des véhicules

- définition d'un véhicule disponible ;
- définition d'un véhicule indisponible ;
- contenu exact des alertes véhicules ;
- règles de conformité à surveiller ;
- lien avec la future page Suivi des véhicules.

### 16.4 Vérification / Désinfection

- présence ou non de widgets dédiés ;
- séparation ou regroupement des pages Vérification et Désinfection ;
- règles d'alerte liées aux vérifications ;
- règles d'alerte liées aux désinfections.

### 16.5 Informations importantes

- qui peut créer une information importante ;
- qui peut la modifier ;
- qui peut la supprimer ;
- quels utilisateurs la voient ;
- durée d'affichage éventuelle.

### 16.6 Audit

- possibilité future d'afficher des dernières actions importantes ;
- niveau d'information autorisé dans le Tableau de bord ;
- lien éventuel avec la page Audit.

