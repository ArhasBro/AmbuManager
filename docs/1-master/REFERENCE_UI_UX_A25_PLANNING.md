# Ambulance Manager — RÉFÉRENCE UI/UX A25 PLANNING

Version : V1.0.0 (MASTER)  
Date : 10/05/2026  
Bloc concerné : `A25 — Planning UI/UX & ergonomie métier`

## Sommaire

- [1. Objet du document](#1-objet-du-document)
- [2. Périmètre du bloc A25](#2-périmètre-du-bloc-a25)
- [3. Exclusions du bloc A25](#3-exclusions-du-bloc-a25)
- [4. Références visuelles officielles](#4-références-visuelles-officielles)
- [5. Principes UI/UX attendus](#5-principes-uiux-attendus)
- [6. Analyse attendue de la maquette Planning](#6-analyse-attendue-de-la-maquette-planning)
- [7. Critères de conformité A25](#7-critères-de-conformité-a25)
- [8. Points à vérifier dans le repo](#8-points-à-vérifier-dans-le-repo)
- [9. Recommandations de découpage A25](#9-recommandations-de-découpage-a25)
- [10. Limites à respecter](#10-limites-à-respecter)

## 1. Objet du document

Ce document sert de référence UI/UX officielle pour le bloc :

```txt
A25 — Planning UI/UX & ergonomie métier
```

Il complète le plan de développement et doit guider toutes les sessions A25.

Son objectif est de cadrer précisément la refonte UI/UX du planning afin de produire une page :

- plus lisible ;
- plus structurée ;
- plus fidèle à la maquette officielle ;
- plus exploitable en contexte métier ambulance / transport sanitaire ;
- cohérente avec le socle visuel A24 ;
- compatible avec le repo réel ;
- sans dérive vers une refonte fonctionnelle lourde.

Le planning est un écran central d’Ambulance Manager.  
Il ne doit pas être traité comme une simple page secondaire du réalignement UI/UX global A24.

A25 doit prolonger A24, pas créer une nouvelle direction artistique.

## 2. Périmètre du bloc A25

Le bloc A25 peut traiter les éléments UI/UX et ergonomiques suivants, dans la limite de l’existant réel du repo.

### Vues planning

Sont incluses :

- vue jour ;
- vue semaine ;
- vue mois ;
- navigation planning ;
- bascule ou organisation des vues existantes ;
- lisibilité des périodes ;
- cohérence entre les vues ;
- hiérarchie visuelle des informations temporelles.

### Structure générale de page

Sont inclus :

- header planning ;
- titre ;
- sous-titre ;
- action principale ;
- structure générale de la page ;
- organisation des zones ;
- alignement avec le shell A24 ;
- fond ;
- cartes globales ;
- bordures ;
- espacements ;
- densité générale.

### Filtres, toolbar et navigation interne

Sont inclus :

- filtres de période ;
- filtres de dépôt / base ;
- filtres de rôle ;
- filtres utilisateur ;
- toolbar ;
- actions d’export visibles ;
- impression ;
- onglets internes du planning ;
- séparation claire entre filtres métier, vues et actions.

### Grilles, cellules et cards

Sont inclus :

- cellules de planning ;
- colonnes ;
- lignes ;
- lignes horaires si présentes dans le repo ;
- cards de shifts ;
- cards de missions si elles existent réellement dans le repo ;
- badges ;
- états visuels ;
- informations secondaires ;
- horaires ;
- équipes ;
- véhicules ;
- statut salarié ;
- statut planning ;
- absence ;
- repos ;
- congé ;
- garde ;
- conflit ;
- alerte.

### Panneaux et actions contextuelles

Sont inclus :

- panneaux de détail ;
- panneaux d’affectation ;
- drawer ;
- panneau droit ;
- détail shift / cellule ;
- affectation personnel ;
- affectation véhicule ;
- affectation base ;
- modification ;
- annulation métier ;
- actions principales ;
- actions secondaires ;
- actions groupées ;
- sélection multiple si elle existe ou est déjà prévue dans l’existant.

### Lisibilité et exploitation métier

Sont inclus :

- densité métier ;
- lisibilité terrain ;
- hiérarchie des informations ;
- réduction de la charge cognitive ;
- lecture rapide des shifts ;
- lecture rapide des équipes ;
- lecture rapide des véhicules ;
- lecture rapide des horaires ;
- distinction des statuts ;
- cohérence des couleurs ;
- cohérence des badges ;
- cohérence mode clair ;
- cohérence mode sombre ;
- responsive minimal sans refonte mobile complète.

## 3. Exclusions du bloc A25

Le bloc A25 ne doit pas traiter :

- refonte fonctionnelle complète du planning ;
- nouveau moteur planning ;
- nouveau modèle métier planning ;
- autoschedule complet ;
- matching complet ;
- règles métier avancées ;
- refonte RBAC ;
- refonte permissions ;
- refonte Prisma lourde ;
- refonte API lourde ;
- RH avancée ;
- saisie réelle des heures travaillées ;
- paie ;
- primes ;
- suppression physique généralisée ;
- application mobile complète ;
- préparation société pilote ;
- refonte complète des workflows métier ;
- nouvelle direction artistique.

A25 peut améliorer l’ergonomie et la présentation d’un flux existant.

A25 ne doit pas créer une nouvelle logique métier lourde.

Toute donnée non disponible dans le repo doit être indiquée comme :

```txt
INFORMATION NON FOURNIE — À CONFIRMER
```

## 4. Références visuelles officielles

La direction artistique officielle pour A25 reste exclusivement :

```txt
docs/1-master/MAQUETTE/MAQUETTE_DA
```

La référence Planning détaillée du bloc A25 est :

```txt
docs/1-master/REFERENCE_UI_UX_A25_PLANNING.md
```

L’image Planning détaillée de référence est :

```txt
docs/1-master/MAQUETTE/MAQUETTE_DA/MAQUETTES_FONDATRICES_IMAGES_V1.0/A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0/2-Planning/Planning_V1.2_INFO_DETAIL.png
```

Cette image sert de base d’analyse visuelle principale pour A25.

Elle contient plusieurs zones encadrées :

- encadré rouge : zone globale de la page Planning ;
- encadré bleu : filtres, vue et exports ;
- encadré orange : onglets internes du Planning ;
- encadré violet : grille principale, cellules et actions groupées ;
- encadré vert : panneau latéral de détail de cellule.

Règle d’autorité visuelle :

```txt
MAQUETTE_DA > anciennes captures / anciennes descriptions
```

Règle d’autorité fonctionnelle :

```txt
CODE > DOCUMENTATION
```

Conséquence : la maquette guide la cible UI/UX, mais l’intégration réelle doit rester compatible avec le code existant.

## 5. Principes UI/UX attendus

Le bloc A25 doit rendre le planning :

- plus pur ;
- plus simple ;
- plus lisible ;
- plus exploitable métier ;
- plus cohérent avec le reste de l’application ;
- plus proche de `MAQUETTE_DA` ;
- compatible avec le mode clair ;
- compatible avec le mode sombre ;
- sans casser les fonctionnalités stabilisées.

### Principes visuels

Le planning doit conserver l’esprit A24 :

- fond clair très sobre ;
- cartes blanches ;
- bordures fines ;
- arrondis doux ;
- bleu primaire pour les actions principales ;
- textes foncés bien hiérarchisés ;
- badges doux ;
- densité métier maîtrisée ;
- pictogrammes sobres ;
- absence de surcharge décorative.

Le mode sombre doit être une déclinaison sobre de la même direction artistique, pas une nouvelle DA.

### Principes d’ergonomie métier

Le planning doit aider à lire rapidement :

- qui travaille ;
- quand ;
- sur quel type de shift ;
- avec quelle équipe ;
- avec quel véhicule si l’information existe ;
- sur quelle base / dépôt ;
- avec quel statut ;
- avec quelle alerte éventuelle ;
- avec quelle action disponible.

Le planning doit éviter de tout afficher au même niveau.

La logique attendue est :

```txt
lecture globale → sélection → détail → action
```

### Principes de densité

Le planning doit rester dense, car c’est un écran métier.

Mais cette densité doit être organisée :

- informations principales visibles dans la grille ;
- informations secondaires dans les badges ou sous-libellés ;
- détails complets dans un panneau latéral ou drawer ;
- actions groupées dans une zone dédiée ;
- alertes clairement distinguées.

## 6. Analyse attendue de la maquette Planning

Chaque session A25 doit distinguer clairement :

```txt
Visible dans la maquette
Déduction raisonnable
À vérifier dans le repo
```

Aucune fonctionnalité non visible ou non vérifiée ne doit être présentée comme acquise.

### 6.1 Header planning

#### Visible dans la maquette

La page affiche :

- titre `Planning` ;
- sous-titre `Vue globale des shifts, absences et affectations du personnel` ;
- bouton principal `+ Ajouter un shift`.

Le bouton principal est bleu et placé dans la zone haute, avec une hiérarchie claire.

#### Déduction raisonnable

Le header sert à poser le contexte et à donner accès à l’action principale.

L’action `Ajouter un shift` correspond probablement au flux d’ajout manuel d’un shift.

#### À vérifier dans le repo

- existence du header planning actuel ;
- emplacement actuel du bouton d’ajout ;
- route ou modal utilisée pour ajouter un shift ;
- permissions nécessaires pour afficher l’action ;
- cohérence avec les composants A24 existants.

### 6.2 Navigation temporelle

#### Visible dans la maquette

La période visible est `Mai 2024`.

La grille affiche des semaines :

- `Semaine 1` ;
- `Semaine 2` ;
- `Semaine 3` ;
- `Semaine 4`.

Chaque semaine possède une plage de dates.

#### Déduction raisonnable

La maquette présente une lecture mensuelle structurée par semaines.

La période sélectionnée pilote probablement toutes les colonnes de la grille.

#### À vérifier dans le repo

- type réel de navigation actuelle ;
- vue jour existante ;
- vue semaine existante ;
- vue mois existante ;
- navigation mensuelle ;
- gestion des mois à cinq semaines ;
- cohérence des dates ;
- conservation des filtres lors du changement de période.

### 6.3 Filtres

#### Visible dans la maquette

Les filtres visibles sont :

- `Période` ;
- `Dépôt` ;
- `Rôle` ;
- `Utilisateur`.

Chaque filtre est présenté dans un bloc clair avec icône, libellé, valeur et chevron.

#### Déduction raisonnable

Les filtres servent à réduire la charge cognitive et à adapter le planning au besoin métier.

Le filtre dépôt permet probablement de limiter la vue à une base.

Le filtre rôle permet probablement de limiter la vue à un type de personnel.

Le filtre utilisateur permet probablement d’isoler un salarié.

#### À vérifier dans le repo

- filtres déjà existants ;
- filtres côté client ou côté API ;
- données disponibles pour dépôt, rôle et utilisateur ;
- comportement quand aucun résultat n’est disponible ;
- persistance des filtres ;
- cohérence avec les permissions planning.

### 6.4 Toolbar et exports

#### Visible dans la maquette

La toolbar contient :

- `Export PDF` ;
- `Excel` ;
- `CSV` ;
- `Imprimer`.

Ces actions sont séparées visuellement des filtres.

#### Déduction raisonnable

Les exports s’appliquent probablement à la période et aux filtres actifs.

Ils sont secondaires par rapport à l’action principale `Ajouter un shift`.

#### À vérifier dans le repo

- existence réelle des exports PDF ;
- existence réelle des exports Excel ;
- existence réelle des exports CSV ;
- existence réelle de l’impression ;
- permissions associées ;
- données exportées ;
- cohérence des exports avec les filtres actifs.

### 6.5 Onglets internes du Planning

#### Visible dans la maquette

Les onglets visibles sont :

- `Planning manuel` ;
- `Affectations` ;
- `Autoschedule` ;
- `Matching` ;
- `Historique` ;
- `Exports`.

L’onglet `Planning manuel` est actif.

#### Déduction raisonnable

La page Planning est structurée en sous-espaces.

Les onglets permettent d’éviter de mélanger toutes les fonctions dans une seule zone.

#### À vérifier dans le repo

- existence réelle des onglets ;
- route ou état interne utilisé ;
- contenu réel de chaque onglet ;
- permissions par onglet ;
- doublons éventuels avec d’autres pages ;
- état réel d’Autoschedule et Matching ;
- nécessité de masquer, désactiver ou réaligner certains onglets.

### 6.6 Grille planning

#### Visible dans la maquette

La grille principale affiche des lignes salariés et des colonnes temporelles.

Colonnes visibles :

- sélection ;
- salarié ;
- rôle ;
- base ;
- statut ;
- semaine 1 ;
- semaine 2 ;
- semaine 3 ;
- semaine 4.

#### Déduction raisonnable

La grille est pensée comme une matrice personnel / semaines.

Elle permet une lecture rapide par salarié, rôle, base et période.

#### À vérifier dans le repo

- structure actuelle de la grille ;
- présence d’une vue personnel ;
- présence d’une vue dépôt ;
- données disponibles pour rôle, base et statut ;
- logique actuelle des colonnes ;
- différence entre vue semaine réelle et vue mensuelle par semaines ;
- performance avec beaucoup de salariés.

### 6.7 Colonnes

#### Visible dans la maquette

Les colonnes identitaires sont à gauche :

- salarié ;
- rôle ;
- base ;
- statut.

Les colonnes temporelles sont à droite :

- semaine 1 ;
- semaine 2 ;
- semaine 3 ;
- semaine 4.

#### Déduction raisonnable

Cette structure permet de conserver le contexte RH pendant la lecture temporelle.

#### À vérifier dans le repo

- possibilité technique de figer ou conserver lisibles les colonnes identitaires ;
- largeur disponible ;
- comportement responsive ;
- gestion des noms longs ;
- gestion des bases longues ;
- gestion de rôles multiples si existants.

### 6.8 Lignes horaires

#### Visible dans la maquette

Les lignes horaires ne sont pas visibles dans la grille principale de l’image `Planning_V1.2_INFO_DETAIL.png`.

Les horaires apparaissent dans le panneau latéral de détail.

#### Déduction raisonnable

La maquette privilégie une grille synthétique, puis affiche les horaires précis dans le détail.

#### À vérifier dans le repo

- existence de lignes horaires en vue jour ;
- existence de lignes horaires en vue semaine ;
- besoin réel d’afficher les horaires directement dans la grille ;
- risque de surcharge visuelle ;
- cohérence avec la maquette.

### 6.9 Cards de shifts / missions

#### Visible dans la maquette

Les cellules affichent des badges plutôt que de grandes cards détaillées.

Badges visibles :

- `Ambulance` ;
- `VSL` ;
- `Taxi` ;
- `Garde A` ;
- `Garde Nord` ;
- `Garde Nuit` ;
- `Repos` ;
- `Congé`.

Des informations secondaires apparaissent sous certains badges :

- `Samedi` ;
- `Dimanche` ;
- `JF 08/05`.

#### Déduction raisonnable

La grille principale affiche un résumé.

Le détail complet est déporté dans le panneau latéral.

Le mot `mission` ne doit être utilisé que si une notion de mission existe réellement dans le repo.

#### À vérifier dans le repo

- modèles existants : shift, mission, affectation ;
- données affichables dans les cellules ;
- présence ou absence de courses patient ;
- templates de shifts ;
- couleurs de templates ;
- gestion des shifts multiples dans une même cellule ;
- affichage des week-ends et jours fériés.

### 6.10 Badges et statuts

#### Visible dans la maquette

Badges visibles :

- statut `Actif` ;
- statut `En congé` ;
- shift `Ambulance` ;
- shift `VSL` ;
- shift `Taxi` ;
- shift `Garde` ;
- état `Repos` ;
- état `Congé`.

Les couleurs sont douces :

- bleu clair ;
- vert clair ;
- orange clair ;
- violet clair ;
- gris clair.

#### Déduction raisonnable

Les badges servent à distinguer rapidement les types de planning sans surcharger la page.

#### À vérifier dans le repo

- types de shifts existants ;
- statuts existants ;
- absences existantes ;
- congés existants ;
- repos existants ;
- source des couleurs ;
- accessibilité des contrastes ;
- cohérence en mode sombre.

### 6.11 Informations métier visibles

#### Visible dans la maquette

Informations visibles :

- nom salarié ;
- rôle ;
- base ;
- statut ;
- type de shift ;
- semaine ;
- dates ;
- jour spécifique ;
- week-end ;
- jour férié ;
- absences ;
- conflits / alertes.

#### Déduction raisonnable

La maquette cherche à prioriser les informations nécessaires à l’exploitation quotidienne.

#### À vérifier dans le repo

- données réellement disponibles ;
- origine des absences ;
- origine des conflits ;
- origine des alertes ;
- calcul des week-ends ;
- calcul des jours fériés ;
- cohérence avec les règles métier existantes.

### 6.12 Panneau de détail

#### Visible dans la maquette

Un panneau droit affiche :

- titre `Détail de la cellule` ;
- bouton de fermeture ;
- avatar initiales ;
- nom salarié ;
- rôle ;
- statut ;
- période ;
- liste des affectations ;
- horaires ;
- absences ;
- conflits / alertes ;
- actions.

#### Déduction raisonnable

Le panneau détail sert à afficher le contenu précis d’une cellule sélectionnée sans quitter la grille.

Il permet de garder la grille compacte.

#### À vérifier dans le repo

- existence d’un panneau droit ;
- existence d’un drawer ;
- données disponibles pour le détail ;
- relation entre cellule sélectionnée et panneau ;
- actions disponibles ;
- cohérence du nombre d’affectations ;
- état vide ;
- état erreur.

### 6.13 Panneaux d’affectation

#### Visible dans la maquette

La maquette montre des actions liées à l’affectation :

- `Affecter employé 1` ;
- `Affecter employé 2` ;
- `Affecter véhicule` ;
- `Affecter base`.

Elle ne montre pas le contenu détaillé d’un panneau d’affectation ouvert.

#### Déduction raisonnable

La refonte A25 doit clarifier l’accès aux affectations existantes, mais ne doit pas inventer une nouvelle mécanique d’affectation.

#### À vérifier dans le repo

- flux actuel d’affectation ;
- affectation employé 1 ;
- affectation employé 2 ;
- affectation véhicule ;
- affectation base ;
- contraintes existantes ;
- permissions ;
- erreurs possibles ;
- comportement après affectation.

### 6.14 Actions principales

#### Visible dans la maquette

Action principale visible :

- `+ Ajouter un shift`.

Elle existe dans le header et dans le panneau détail.

#### Déduction raisonnable

L’ajout depuis le header est probablement global.

L’ajout depuis le panneau détail est probablement contextualisé à la cellule sélectionnée.

#### À vérifier dans le repo

- différence entre ajout global et ajout contextualisé ;
- permissions ;
- modal ou route utilisée ;
- préremplissage éventuel ;
- validation des données ;
- traçabilité après publication.

### 6.15 Actions secondaires

#### Visible dans la maquette

Actions secondaires visibles :

- `Voir détail` ;
- `Modifier` ;
- `Affecter employé 1` ;
- `Affecter employé 2` ;
- `Affecter véhicule` ;
- `Affecter base` ;
- `Vider`.

#### Déduction raisonnable

Les actions secondaires doivent rester accessibles mais moins dominantes que l’action principale.

L’action `Vider` doit être traitée avec prudence car elle peut être destructive ou assimilée à une désaffectation.

#### À vérifier dans le repo

- signification exacte de `Vider` ;
- action de suppression, annulation ou désaffectation ;
- confirmations existantes ;
- traçabilité ;
- droits nécessaires ;
- non-régression sur les flux stabilisés.

### 6.16 États vides

#### Visible dans la maquette

Le panneau détail affiche :

- `Aucune absence` ;
- `Aucun conflit détecté`.

#### Déduction raisonnable

Les états vides doivent être explicites et rassurants.

#### À vérifier dans le repo

- état sans shift ;
- état sans salarié ;
- état sans véhicule ;
- état sans base ;
- état sans résultat après filtre ;
- état sans permission ;
- affichage clair sans casser la grille.

### 6.17 États de chargement

#### Visible dans la maquette

Aucun état de chargement n’est visible.

#### Déduction raisonnable

A25 doit conserver ou améliorer les états de chargement existants sans inventer un nouveau système complexe.

#### À vérifier dans le repo

- chargement initial planning ;
- chargement filtres ;
- chargement après changement de période ;
- chargement panneau détail ;
- chargement action d’affectation ;
- skeleton ou spinner existant.

### 6.18 États d’erreur

#### Visible dans la maquette

Aucun état d’erreur n’est visible.

#### Déduction raisonnable

Les erreurs doivent rester cohérentes avec le socle UI A24.

#### À vérifier dans le repo

- erreurs API ;
- erreurs permission ;
- erreurs d’affectation ;
- erreurs d’export ;
- erreurs de modification ;
- erreurs d’annulation ;
- affichage des messages ;
- cohérence avec les conventions API.

### 6.19 Responsive minimal

#### Visible dans la maquette

La maquette visible est desktop.

#### Déduction raisonnable

Le desktop est prioritaire pour A25.

Le responsive minimal doit éviter les grosses cassures, mais ne doit pas devenir une refonte mobile complète.

#### À vérifier dans le repo

- comportement sur largeur intermédiaire ;
- débordement horizontal ;
- scroll table ;
- lisibilité du panneau droit ;
- comportement des filtres ;
- accessibilité de la toolbar ;
- limites sur mobile.

## 7. Critères de conformité A25

Une session A25 peut être considérée conforme uniquement si les critères suivants sont contrôlés.

### Conformité visuelle

- la page reste alignée avec `MAQUETTE_DA` ;
- aucune nouvelle direction artistique n’est introduite ;
- le planning est visuellement plus proche de `Planning_V1.2_INFO_DETAIL.png` ;
- la structure générale est plus claire ;
- les espacements sont cohérents ;
- les bordures sont sobres ;
- les arrondis sont cohérents ;
- les badges sont lisibles ;
- les icônes sont cohérentes.

### Lisibilité des vues

- la vue jour est lisible si elle existe ;
- la vue semaine est lisible si elle existe ;
- la vue mois est lisible si elle existe ;
- la navigation entre périodes est compréhensible ;
- les colonnes et lignes sont lisibles ;
- les horaires sont lisibles ;
- les informations secondaires ne saturent pas la grille.

### Cohérence header / filtres / toolbar

- le header est clair ;
- l’action principale est identifiable ;
- les filtres sont regroupés ;
- les exports sont séparés ;
- les onglets sont lisibles ;
- les états actifs sont visibles.

### Clarté des cards et cellules

- les shifts sont distinguables ;
- les absences sont distinguables ;
- les repos sont distinguables ;
- les congés sont distinguables ;
- les week-ends ou jours fériés sont signalés si disponibles ;
- les couleurs restent douces et cohérentes ;
- les cellules sélectionnées sont visibles.

### Distinction équipes / véhicules

- les équipes sont lisibles si la donnée existe ;
- les véhicules sont lisibles si la donnée existe ;
- l’absence de donnée véhicule ne doit pas être masquée par une fausse information ;
- toute information manquante doit être indiquée comme à confirmer.

### Panneaux de détail / affectation

- le panneau de détail est lisible ;
- le panneau d’affectation est clair si présent ;
- les actions sont hiérarchisées ;
- les informations dangereuses sont confirmées ou clairement signalées ;
- la logique existante n’est pas remplacée par une nouvelle logique lourde.

### Mode clair / mode sombre

- le mode clair est lisible ;
- le mode sombre est lisible ;
- les contrastes sont suffisants ;
- les badges restent compréhensibles ;
- les bordures restent visibles ;
- le planning reste cohérent avec le socle A24.

### Non-régression

- pas de régression sur les permissions planning ;
- pas de régression sur l’ajout de shift ;
- pas de régression sur la modification ;
- pas de régression sur l’annulation métier ;
- pas de régression sur les exports ;
- pas de régression sur l’autoschedule existant ;
- pas de régression sur le matching existant ;
- pas de changement Prisma / API / RBAC lourd sans justification explicite.

## 8. Points à vérifier dans le repo

Les sessions A25 devront comparer la maquette avec le repo réel sur les points suivants.

### Structure actuelle de la page planning

À vérifier :

- route planning ;
- composant principal ;
- composants enfants ;
- structure client / serveur ;
- état actuel jour / semaine / mois ;
- structure des onglets ;
- position des filtres ;
- position des exports ;
- position des actions.

### Composants planning existants

À vérifier :

- grille planning ;
- cards shifts ;
- badges ;
- drawer ;
- panneau droit ;
- modales ;
- filtres ;
- toolbar ;
- exports ;
- sélection multiple ;
- actions bulk ;
- états vides ;
- états chargement ;
- états erreur.

### Composants UI hérités du socle A24

À vérifier :

- PageHeader ;
- boutons ;
- cards ;
- badges ;
- table ;
- filter bar ;
- drawer ;
- empty state ;
- error state ;
- tokens clair/sombre ;
- icônes génériques ;
- composants partagés réutilisables.

### Données réellement disponibles

À vérifier :

- salariés ;
- rôles ;
- bases / dépôts ;
- statuts ;
- shifts ;
- templates ;
- affectations ;
- véhicules ;
- absences ;
- indisponibilités ;
- conflits ;
- alertes ;
- historique ;
- exports ;
- permissions.

### Vues jour / semaine / mois existantes

À vérifier :

- vue jour réellement disponible ;
- vue semaine réellement disponible ;
- vue mois réellement disponible ;
- comportement interactif ;
- navigation ;
- cohérence visuelle ;
- limitations connues ;
- responsive.

### Filtres existants

À vérifier :

- période ;
- dépôt ;
- rôle ;
- utilisateur ;
- vue personnel ;
- vue dépôt ;
- filtres côté client ;
- filtres côté serveur ;
- interactions avec exports ;
- interactions avec permissions.

### Actions existantes

À vérifier :

- ajouter shift ;
- voir détail ;
- modifier ;
- annuler ;
- vider ;
- affecter employé 1 ;
- affecter employé 2 ;
- affecter véhicule ;
- affecter base ;
- exporter PDF ;
- exporter Excel ;
- exporter CSV ;
- imprimer.

### Panneaux existants

À vérifier :

- panneau détail cellule ;
- panneau détail shift ;
- drawer d’affectation ;
- modal d’ajout ;
- modal de modification ;
- panneau erreurs ;
- panneau historique ;
- panneau autoschedule ;
- panneau matching.

### Dépendances fonctionnelles sensibles

À protéger :

- permissions planning ;
- session utilisateur ;
- multi-tenant ;
- cloisonnement société ;
- affectations existantes ;
- autoschedule existant ;
- matching existant ;
- exports existants ;
- audit / historique ;
- validation serveur ;
- conventions API.

### Risques de régression

Risques principaux :

- rupture des permissions ;
- affichage d’actions non autorisées ;
- perte d’une action existante ;
- perte d’un export ;
- perte de lisibilité ;
- surcharge visuelle ;
- mode sombre illisible ;
- confusion entre absence, congé et repos ;
- confusion entre shift et mission ;
- incohérence entre maquette et données réelles ;
- faux affichage de véhicules ou équipes non disponibles ;
- modification fonctionnelle involontaire.

### Écarts entre maquette et implémentation réelle

Tout écart doit être classé :

```txt
CONFORME
NON CONFORME
INCOMPLET
INFORMATION NON FOURNIE — À CONFIRMER
```

## 9. Recommandations de découpage A25

Le découpage recommandé du bloc A25 est le suivant.

### A25-PLAN-UI-01 — AUDIT

Objectif :

- auditer le planning réel ;
- comparer avec `MAQUETTE_DA` ;
- comparer avec `REFERENCE_UI_UX_A25_PLANNING.md` ;
- produire des captures avant ;
- cartographier les écarts ;
- classer les risques.

### A25-PLAN-UI-02 — CORRECTION+COMPLÉTION

Objectif :

- réaligner la structure générale ;
- header ;
- filtres ;
- toolbar ;
- onglets ;
- cartes globales ;
- organisation générale ;
- cohérence avec le socle A24.

### A25-PLAN-UI-03 — CORRECTION+COMPLÉTION

Objectif :

- réaligner les vues jour et semaine ;
- grilles ;
- lignes horaires si présentes ;
- cellules ;
- cards ;
- badges ;
- équipes ;
- véhicules ;
- horaires ;
- lisibilité métier.

### A25-PLAN-UI-04 — CORRECTION+COMPLÉTION

Objectif :

- réaligner la vue mois ;
- structure mensuelle ;
- cellules ;
- indicateurs ;
- résumés ;
- navigation ;
- densité.

### A25-PLAN-UI-05 — CORRECTION+COMPLÉTION

Objectif :

- réaligner les panneaux d’action ;
- panneau droit ;
- drawer ;
- détail cellule ;
- affectations ;
- modification ;
- annulation ;
- actions groupées.

### A25-PLAN-UI-06 — VALIDATION

Objectif :

- valider globalement le planning UI/UX ;
- contrôler les vues jour / semaine / mois ;
- contrôler le mode clair ;
- contrôler le mode sombre ;
- contrôler la non-régression ;
- produire les captures après.

### CLOTURE_A25 — AUDIT+CORRECTION+COMPLÉTION+VALIDATION

Objectif :

- vérifier tout le bloc ;
- vérifier les patchs ;
- vérifier les preuves ;
- vérifier la documentation ;
- vérifier les captures ;
- rendre le verdict de clôture définitive.

## 10. Limites à respecter

A25 est une refonte UI/UX et ergonomie métier.

A25 n’est pas une refonte fonctionnelle lourde.

A25 ne doit pas inventer un nouveau planning.

A25 doit améliorer l’existant de façon réaliste.

A25 doit rester compatible avec le repo réel.

A25 doit s’appuyer sur :

```txt
docs/1-master/MAQUETTE/MAQUETTE_DA
docs/1-master/REFERENCE_UI_UX_A25_PLANNING.md
docs/1-master/MAQUETTE/MAQUETTE_DA/MAQUETTES_FONDATRICES_IMAGES_V1.0/A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0/2-Planning/Planning_V1.2_INFO_DETAIL.png
```

Toute session A25 doit appliquer les règles suivantes :

```txt
Ne pas créer une nouvelle DA.
Ne pas ajouter de fonctionnalité métier lourde.
Ne pas refaire le moteur planning.
Ne pas refaire autoschedule.
Ne pas refaire matching.
Ne pas modifier RBAC sans nécessité stricte.
Ne pas modifier Prisma sans nécessité stricte.
Ne pas masquer une donnée métier existante.
Ne pas afficher une donnée non disponible comme si elle était réelle.
Toute information non prouvée : INFORMATION NON FOURNIE — À CONFIRMER.
```
