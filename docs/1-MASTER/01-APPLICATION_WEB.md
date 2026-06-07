# Ambulance Manager - Application web

Date de refonte : 07/06/2026

## Sommaire

1. [Rôle du document](#1-rôle-du-document)
2. [Présentation générale de l'application](#2-présentation-générale-de-lapplication)
3. [Problème métier à résoudre](#3-problème-métier-à-résoudre)
4. [Publics concernés](#4-publics-concernés)
5. [Philosophie métier du produit](#5-philosophie-métier-du-produit)
6. [Fonctionnement global de l'application](#6-fonctionnement-global-de-lapplication)
7. [Grands modules de l'application](#7-grands-modules-de-lapplication)
   - [Connexion / authentification](#connexion-authentification)
   - [Shell global / navigation](#shell-global-navigation)
   - [Tableau de bord](#tableau-de-bord)
   - [Planning](#planning)
   - [Utilisateurs / RH](#utilisateurs-rh)
   - [Véhicules](#véhicules)
   - [Suivi des véhicules](#suivi-des-véhicules)
   - [Modèles horaires](#modèles-horaires)
   - [Société](#société)
   - [Dépôts / Bases](#dépôts-bases)
   - [Mise en route](#mise-en-route)
   - [Audit / traçabilité](#audit-traçabilité)
8. [Données manipulées](#8-données-manipulées)
9. [Principes RGPD essentiels](#9-principes-rgpd-essentiels)
10. [Ce qui est inclus dans la cible Alpha](#10-ce-qui-est-inclus-dans-la-cible-alpha)
11. [Ce qui est prévu pour la V1 / version officielle](#11-ce-qui-est-prévu-pour-la-v1-version-officielle)
12. [Ce qui est exclu du périmètre immédiat](#12-ce-qui-est-exclu-du-périmètre-immédiat)
13. [Ce qui pourra venir plus tard](#13-ce-qui-pourra-venir-plus-tard)
14. [Références documentaires liées](#14-références-documentaires-liées)

## 1. Rôle du document

Ce document explique ce qu'est Ambulance Manager, à qui l'application s'adresse, quels problèmes elle traite et quel périmètre produit est visé pour l'Alpha, la V1 et les évolutions ultérieures.

Il ne remplace pas les fiches fonctionnelles détaillées, les références UI/UX, les audits ou le plan de développement.

## 2. Présentation générale de l'application

Ambulance Manager est une application SaaS métier destinée aux sociétés de transport sanitaire.

Elle vise à centraliser les informations opérationnelles nécessaires à l'organisation quotidienne : utilisateurs, rôles, véhicules, dépôts, modèles horaires, planning, suivi opérationnel des véhicules, mise en route de la société et traçabilité.

Le produit final doit fonctionner en multi-tenant strict : chaque société travaille dans son propre périmètre de données.

## 3. Problème métier à résoudre

Les sociétés de transport sanitaire doivent coordonner des équipes, des véhicules, des bases, des horaires, des contraintes réglementaires, des indisponibilités, des vérifications et des décisions sensibles.

Le problème principal est de réduire la dispersion des informations, les incohérences entre planning et référentiels, les actions non tracées et les écarts de droits entre profils.

## 4. Publics concernés

Publics métier principaux :

- administrateurs de la société ;
- gérants ;
- personnel bureau ;
- régulateurs si le rôle est activé ;
- utilisateurs terrain : ADE, AA, TAXI ;
- support propriétaire si ce rôle est cadré techniquement.

Toute matrice officielle de permissions reste à confirmer module par module quand elle n'est pas explicitement validée.

## 5. Philosophie métier du produit

Le produit doit rester opérationnel, lisible et contrôlable.

Principes directeurs :

- privilégier les référentiels fiables avant les automatisations avancées ;
- ne pas confondre prototype visuel et source technique finale ;
- ne pas présenter comme validé ce qui n'a pas été validé explicitement ;
- tracer les actions sensibles ;
- éviter les suppressions physiques quand un archivage logique suffit ;
- traiter le planning comme une synthèse métier, pas comme un agenda heure par heure en Alpha ;
- conserver des libellés métier français clairs : `Modèles horaires`, `Mise en route`, `Dépôts / Bases`, `Utilisateurs / RH`.

## 6. Fonctionnement global de l'application

Un utilisateur se connecte avec un compte rattaché à une société. L'application charge son rôle, ses permissions, sa société et les modules auxquels il peut accéder.

Les référentiels métier structurent ensuite le fonctionnement :

- les utilisateurs/RH décrivent les personnes, rôles, permissions, rattachements et indisponibilités ;
- les véhicules décrivent la flotte administrative ;
- le suivi des véhicules porte les vérifications, désinfections et anomalies ;
- les dépôts/bases servent de lieux de référence ;
- les modèles horaires servent de base aux affectations ;
- le planning exploite ces données pour organiser l'activité ;
- l'audit conserve les traces des actions sensibles.

## 7. Grands modules de l'application

### Connexion / authentification

Accès sécurisé par email et mot de passe. Pas d'inscription libre en Alpha. Le comportement exact de `Se souvenir de moi` reste à confirmer.

### Shell global / navigation

Structure connectée commune : navigation, topbar, société courante, filtrage visible par droits, pattern `Accès refusé` pour utilisateur authentifié non autorisé.

### Tableau de bord

Accueil après connexion avec widgets, KPI simples, raccourcis autorisés et informations utiles selon profil. Les préférences utilisateur de dashboard sont à confirmer pour le périmètre Alpha.

### Planning

Planning manuel métier centré sur les affectations synthétiques, les vues globales/personnelles/mois/semaine/jour, la publication, l'annulation logique, les contrôles et l'audit.

### Utilisateurs / RH

Gestion des utilisateurs, rôles, permissions, accès applicatif, rattachement société/dépôt, statut actif/inactif, absences/indisponibilités et actions sensibles.

### Véhicules

Référentiel administratif de la flotte : type, immatriculation, statut, disponibilité, dépôt principal, archivage/restauration et audit.

### Suivi des véhicules

Suivi opérationnel de la flotte : vue d'ensemble, vérifications, désinfections et anomalies. Le module officiel reste à cadrer précisément côté repo.

### Modèles horaires

Référentiel des modèles utilisés par le planning. Le terme actif est `Modèles horaires`, pas `Templates`.

### Société

Profil permanent de la société, paramètres généraux, règles métier et contacts société si le besoin est confirmé.

### Dépôts / Bases

Gestion des lieux de référence de la société, rattachements, statut, archivage et restauration.

### Mise en route

Assistant de configuration initiale. Le terme actif est `Mise en route`, pas `Onboarding`.

### Audit / traçabilité

Consultation et contrôle des actions sensibles : connexions, modifications métier, planning, exports, actions support si elles sont activées.

## 8. Données manipulées

Données principales :

- comptes utilisateurs, rôles, permissions, société, dépôt ;
- informations RH minimales et absences/indisponibilités ;
- véhicules, types, statuts, disponibilités, rattachements ;
- dépôts/bases ;
- modèles horaires ;
- affectations planning, publications, annulations, exports ;
- événements d'audit ;
- informations société et contacts éventuels.

Les données précises à conserver, exporter ou purger restent à confirmer pour une conformité complète.

## 9. Principes RGPD essentiels

Principes minimaux à retenir :

- collecte limitée aux données utiles à l'authentification, l'administration, la planification, l'exploitation, l'audit et les imports/exports nécessaires ;
- cloisonnement strict par `companyId` ;
- accès contrôlé par session, rôle et permissions ;
- traçabilité des actions sensibles ;
- archivage logique privilégié pour les référentiels métier ;
- absence de suppression physique par défaut sauf règle validée ;
- conservation, purge, droit d'accès, rectification, suppression, contact privacy, base légale et DPO : INFORMATION NON FOURNIE — À CONFIRMER.

Le fichier `RGPD_BASE_MINIMALE.md` est conservé temporairement comme cartographie détaillée non active à reprendre lors d'une phase conformité dédiée.

## 10. Ce qui est inclus dans la cible Alpha

Inclus dans la cible Alpha :

- authentification ;
- shell connecté ;
- tableau de bord simple ;
- utilisateurs/RH ;
- véhicules ;
- suivi des véhicules au périmètre validé ;
- modèles horaires ;
- dépôts/bases ;
- société ;
- planning manuel métier ;
- mise en route ;
- audit/traçabilité ;
- multi-tenant strict ;
- permissions front/API cohérentes ;
- archivage logique des référentiels concernés.

## 11. Ce qui est prévu pour la V1 / version officielle

La V1 doit stabiliser l'Alpha, réduire les écarts fonctionnels, fiabiliser les droits, consolider les contrôles et rendre les parcours principaux utilisables sans incohérence critique.

Les arbitrages exacts de V1 restent à confirmer après audit comparatif et validation des blocs de reprise.

## 12. Ce qui est exclu du périmètre immédiat

Exclusions immédiates :

- facturation et abonnement ;
- conformité réglementaire complète déclarée ;
- SSO, MFA et sécurité avancée ;
- mot de passe oublié si non validé ;
- version mobile complète ;
- signature électronique ;
- preuve mobile ;
- reporting analytique avancé ;
- notifications avancées ;
- maintenance prédictive ;
- courses/patients/facturation transport ;
- automatisations avancées non nécessaires à l'Alpha.

## 13. Ce qui pourra venir plus tard

Évolutions possibles :

- planification automatique avancée ;
- affectation automatique optimisée ;
- scoring et équilibrage ;
- gestion avancée des heures ;
- mobile terrain ;
- signature et preuves ;
- reporting avancé ;
- maintenance avancée ;
- imports enrichis ;
- workflows RH plus complets.

## 14. Références documentaires liées

Documents actifs :

- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`

Références supports :

- `docs/1-MASTER/1-MAQUETTE/`
- `docs/1-MASTER/2-REFERENCE_UI_UX/`
- `docs/1-MASTER/3-FONCTIONNALITES/`
- `docs/1-MASTER/4-BASE44_REFERENCE/`
- `docs/1-MASTER/5-AUDIT/`
