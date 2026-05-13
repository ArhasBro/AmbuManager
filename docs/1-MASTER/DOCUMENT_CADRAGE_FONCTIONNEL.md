# Document de cadrage fonctionnel complet

Version : V1.5.7 (MASTER)  
Date : 09/03/2026

**Projet :** Investissement  
**Sous-projet :** Ambulance Manager  
**Statut :** document de cadrage fonctionnel soumis à validation utilisateur  
**Règle :** ce document cadre le **produit**. Il ne constitue **pas** le plan de développement.

---

## 0. Cadre général

### 0.1 Objectif produit
Ambulance Manager est un outil de gestion opérationnelle centré sur le **transport sanitaire**, avec comme socle prioritaire :
- planning
- flotte
- utilisateurs
- règles métier
- dashboard

La cible de départ est une **société pilote exploitable en interne**, avec une ambition future multi-sites plus large.

### 0.2 Langue produit
Le produit doit être intégralement rédigé en **français** :
- UI
- libellés métier
- documentation fonctionnelle
- plan de développement futur
- paramètres compréhensibles par un utilisateur français

### 0.3 Horizons produit
- **Court terme = ALPHA V0.x**
- **Moyen terme = BETA V1.x**
- **Long terme = VERSION OFFICIELLE V2.x**

Règle retenue :
> on ne traite pas les points BETA ou OFFICIELLE tant que les points ALPHA prioritaires ne sont pas terminés.

### 0.4 Règles de lecture des statuts
- **présent** : visible réellement dans le dépôt actuel
- **partiel** : présent mais incomplet / non fini / non exploitable au niveau attendu
- **prévu** : cadré mais pas réellement visible dans le dépôt
- **manquant** : non visible dans le dépôt
- **à confirmer** : volontairement non figé ou information insuffisante

Rappels :
- prévu ≠ codé
- codé ≠ testé
- testé ≠ terminé
- visible en UI/API ≠ exploitable métier
- partiel ≠ fini

---

# 1. Modules fonctionnels

## MODULE 01 — Rôle support propriétaire / assistance globale

### 01.1 Rôle support global distinct des rôles client
- **Description** : rôle hors hiérarchie client, distinct des rôles métier de société, réservé au propriétaire du produit pour assistance, supervision et résolution de problème.
- **Objectif métier** : permettre le support sans dépendre des droits métiers du client.
- **Utilisateur cible** : propriétaire / support produit
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : manquant
- **Dépendances** : auth, multi-tenant, audit, permissions
- **Arbitrages éventuels** : le principe est validé ; le nom exact du rôle n’est pas figé.

### 01.2 Accès support global multi-sociétés
- **Description** : capacité à consulter et intervenir sur toutes les sociétés dans un cadre d’assistance, diagnostic ou résolution de problème.
- **Objectif métier** : résoudre les incidents client.
- **Utilisateur cible** : propriétaire / support produit
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : manquant
- **Dépendances** : rôle support, multi-tenant
- **Arbitrages éventuels** : accès techniquement permanent, usage limité au support réel.

### 01.3 Compte support nominatif
- **Description** : le compte support doit être nominatif, non mutualisé, non attribuable aux clients.
- **Objectif métier** : garantir la traçabilité claire des interventions.
- **Utilisateur cible** : support produit
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : manquant
- **Dépendances** : auth, audit
- **Arbitrages éventuels** : aucun

### 01.4 Visibilité du rôle support côté client
- **Description** : le rôle support n’apparaît pas comme rôle attribuable dans l’UI client, mais ses interventions modifiant des données doivent être visibles côté client via l’audit.
- **Objectif métier** : éviter la confusion tout en gardant la transparence.
- **Utilisateur cible** : gérant, admin, utilisateurs autorisés
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : manquant
- **Dépendances** : users, audit, UI admin
- **Arbitrages éventuels** :
  - visible comme rôle attribuable dans l’UI client : non
  - visible dans l’audit : oui
  - visible comme intervention support/propriétaire : oui

### 01.5 Audit renforcé des actions support
- **Description** : toute action support modifiant des données doit tracer identité, date, société, module, ancienne valeur, nouvelle valeur et motif obligatoire.
- **Objectif métier** : transparence, confiance client, gouvernance.
- **Utilisateur cible** : support produit, client autorisé
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : manquant
- **Dépendances** : audit, rôle support
- **Arbitrages éventuels** : le client doit au minimum voir les actions support modifiant ses données.

---

## MODULE 02 — Authentification

### 02.1 Connexion par identifiants
- **Description** : connexion par email + mot de passe.
- **Objectif métier** : sécuriser l’accès au produit.
- **Utilisateur cible** : tous les utilisateurs
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : présent
- **Dépendances** : users
- **Arbitrages éventuels** : aucun

### 02.2 Session enrichie avec rôle principal et société
- **Description** : la session contient au minimum l’identité, le rôle principal et l’identifiant société.
- **Objectif métier** : permettre permissions, affichage adapté et cloisonnement.
- **Utilisateur cible** : système
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : présent
- **Dépendances** : auth, multi-tenant
- **Arbitrages éventuels** : aucun

### 02.3 Création de mot de passe initial
- **Description** : chaque utilisateur créé reçoit un mot de passe initial.
- **Objectif métier** : permettre un onboarding autonome.
- **Utilisateur cible** : gérant, admin, support
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : partiel
- **Dépendances** : users, auth
- **Arbitrages éventuels** : UI métier non visible à ce stade.

### 02.4 Réinitialisation de mot de passe
- **Description** : un mot de passe peut être réinitialisé par une personne autorisée.
- **Objectif métier** : support d’exploitation.
- **Utilisateur cible** : gérant, admin, support
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : partiel
- **Dépendances** : users, rôle support
- **Arbitrages éventuels** : support validé ; UI admin métier à construire.

---

## MODULE 03 — Multi-tenant / sociétés / profil société

### 03.1 Isolation stricte par société
- **Description** : chaque société doit être isolée fonctionnellement et au niveau des données.
- **Objectif métier** : empêcher toute fuite entre clients.
- **Utilisateur cible** : système
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : partiel
- **Dépendances** : auth, users, vehicles, planning, audit
- **Arbitrages éventuels** : présent dans le dépôt, mais non encore prouvé uniformément partout.

### 03.2 Profil société
- **Description** : gestion de la société avec au minimum nom société, nom des gérants, adresse, téléphone, SIRET.
- **Objectif métier** : identifier correctement l’entreprise cliente.
- **Utilisateur cible** : gérant, admin
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : partiel
- **Dépendances** : onboarding, dashboard, exports
- **Arbitrages éventuels** : représentation exacte en code à stabiliser.

### 03.3 Société comme entité non supprimable en ALPHA
- **Description** : une société ne doit pas être supprimée librement ; désactivation uniquement en ALPHA.
- **Objectif métier** : protéger l’intégrité historique et la traçabilité.
- **Utilisateur cible** : support, système
- **Priorité** : IMPORTANT MAIS NON BLOQUANT
- **Statut actuel** : prévu
- **Dépendances** : audit, multi-tenant
- **Arbitrages éventuels** : suppression définitive hors périmètre courant.

---

## MODULE 04 — Bases / dépôts

### 04.1 Entité base / dépôt administrable
- **Description** : une base/dépôt est un lieu de départ des véhicules, administrable comme entité propre.
- **Objectif métier** : représenter la réalité opérationnelle d’une société avec plusieurs lieux de départ.
- **Utilisateur cible** : gérant, admin
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : manquant
- **Dépendances** : multi-tenant, users, vehicles, planning
- **Arbitrages éventuels** : aucun

### 04.2 Création d’une base / dépôt
- **Description** : créer une base/dépôt au sein d’une société.
- **Objectif métier** : structurer les lieux d’exploitation.
- **Utilisateur cible** : gérant, admin
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : manquant
- **Dépendances** : société
- **Arbitrages éventuels** : aucun

### 04.3 Modification d’une base / dépôt
- **Description** : modifier les informations d’une base/dépôt.
- **Objectif métier** : maintenir la structure opérationnelle à jour.
- **Utilisateur cible** : gérant, admin
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : manquant
- **Dépendances** : bases/dépôts
- **Arbitrages éventuels** : aucun

### 04.4 Désactivation / archivage d’une base / dépôt
- **Description** : désactiver une base/dépôt sans casser l’historique.
- **Objectif métier** : préserver les affectations passées.
- **Utilisateur cible** : gérant, admin
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : manquant
- **Dépendances** : planning, vehicles, users, audit
- **Arbitrages éventuels** : suppression définitive très encadrée uniquement si jamais utilisée.

### 04.5 Rattachement d’un véhicule à une base
- **Description** : chaque véhicule peut être rattaché à une base.
- **Objectif métier** : savoir d’où part un véhicule.
- **Utilisateur cible** : gérant, admin, régulateur selon permissions
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : manquant
- **Dépendances** : vehicles, bases
- **Arbitrages éventuels** : aucun

### 04.6 Rattachement d’un utilisateur à une base
- **Description** : chaque utilisateur est rattaché à une base unique au départ.
- **Objectif métier** : organiser l’exploitation humaine par lieu principal.
- **Utilisateur cible** : gérant, admin
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : manquant
- **Dépendances** : users, bases
- **Arbitrages éventuels** : 1 utilisateur = 1 base au départ.

### 04.7 Rattachement d’un shift à une base
- **Description** : un shift doit pouvoir être lié à une base.
- **Objectif métier** : piloter le planning par lieu de départ.
- **Utilisateur cible** : gérant, admin, régulateur
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : manquant
- **Dépendances** : planning, bases
- **Arbitrages éventuels** : aucun

### 04.8 Rattachement d’un template à une base
- **Description** : possibilité de rattacher un template à une base/dépôt.
- **Objectif métier** : spécialiser certains templates par lieu d’exploitation si nécessaire.
- **Utilisateur cible** : gérant, admin
- **Priorité** : À CONFIRMER
- **Statut actuel** : à confirmer
- **Dépendances** : templates, bases, planning
- **Arbitrages éventuels** : point contradictoire dans l’historique, non figé.

### 04.9 Multi-agences
- **Description** : gestion d’agences structurées au-delà des simples bases/dépôts.
- **Objectif métier** : aller vers une organisation multi-sites plus complète.
- **Utilisateur cible** : gérant, admin
- **Priorité** : VISION LONG TERME
- **Statut actuel** : prévu
- **Dépendances** : bases, permissions, reporting
- **Arbitrages éventuels** : hors périmètre ALPHA.

---

## MODULE 05 — Utilisateurs

### 05.1 Liste des utilisateurs
- **Description** : afficher les utilisateurs d’une société.
- **Objectif métier** : administrer l’équipe.
- **Utilisateur cible** : gérant, admin
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : présent
- **Dépendances** : auth, multi-tenant
- **Arbitrages éventuels** : UI d’admin complète non visible à ce stade.

### 05.2 Création d’un utilisateur
- **Description** : créer un utilisateur avec prénom, nom, email, téléphone, rôle principal, permissions, base, statut actif/inactif, mot de passe initial.
- **Objectif métier** : rendre l’onboarding équipe autonome.
- **Utilisateur cible** : gérant, admin
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : manquant
- **Dépendances** : rôles, permissions, bases, auth
- **Arbitrages éventuels** : aucun

### 05.3 Modification d’un utilisateur
- **Description** : modifier les informations d’un utilisateur.
- **Objectif métier** : maintenir les données à jour.
- **Utilisateur cible** : gérant, admin
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : manquant
- **Dépendances** : users, permissions
- **Arbitrages éventuels** : aucun

### 05.4 Désactivation / archivage d’un utilisateur
- **Description** : désactiver un utilisateur sans supprimer son historique.
- **Objectif métier** : préserver la traçabilité.
- **Utilisateur cible** : gérant, admin
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : manquant
- **Dépendances** : users, audit
- **Arbitrages éventuels** : aucune suppression définitive si historique lié.

### 05.5 Suppression définitive d’un utilisateur non utilisé
- **Description** : suppression définitive uniquement si jamais lié à des runs, shifts, audit ou historique critique.
- **Objectif métier** : permettre un ménage propre sans casser le passé.
- **Utilisateur cible** : admin, support
- **Priorité** : IMPORTANT MAIS NON BLOQUANT
- **Statut actuel** : manquant
- **Dépendances** : audit, règles d’intégrité
- **Arbitrages éventuels** : suppression exceptionnelle et encadrée.

### 05.6 Gestion des indisponibilités / absences
- **Description** : gérer les indisponibilités utilisateurs.
- **Objectif métier** : empêcher l’affectation d’une personne indisponible.
- **Utilisateur cible** : gérant, admin, régulateur
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : manquant
- **Dépendances** : planning, autoschedule, matching
- **Arbitrages éventuels** : contrat/temps de travail et documents employés reportés.

### 05.7 Consultation du planning utilisateur
- **Description** : un utilisateur peut consulter son planning et, selon permissions, celui des collègues.
- **Objectif métier** : visibilité opérationnelle.
- **Utilisateur cible** : tous les utilisateurs
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : partiel
- **Dépendances** : planning, permissions
- **Arbitrages éventuels** : présentation exacte par rôle à affiner.

### 05.8 Données RH avancées
- **Description** : gestion contrat, temps de travail, compétences/habilitations, documents employés.
- **Objectif métier** : administration RH enrichie.
- **Utilisateur cible** : gérant, admin
- **Priorité** : VISION LONG TERME
- **Statut actuel** : prévu
- **Dépendances** : users, matching
- **Arbitrages éventuels** : hors périmètre ALPHA.

---

## MODULE 06 — Rôles et permissions / RBAC

### 06.1 Catalogue de rôles métier
- **Description** : rôles principaux visés : GERANT, ADMIN, REGULATEUR, BUREAU, ADE, AA, TAXI.
- **Objectif métier** : distinguer pilotage, administration, exploitation et terrain.
- **Utilisateur cible** : gérant, admin
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : partiel
- **Dépendances** : users, planning, matching
- **Arbitrages éventuels** : `DEA` doit devenir `ADE`.

### 06.2 Différence métier entre rôles de pilotage
- **Description** :
  - GERANT = pilotage total de la société
  - ADMIN = administration technique / fonctionnelle
  - REGULATEUR = gestion opérationnelle du planning
  - BUREAU = consultation + opérations limitées
- **Objectif métier** : clarifier l’usage produit.
- **Utilisateur cible** : gérant, admin
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : prévu
- **Dépendances** : rôles, permissions, dashboard
- **Arbitrages éventuels** : niveau fin encore ajustable, mais base validée.

### 06.3 Rôles terrain avec permissions additionnelles
- **Description** : ADE, AA, TAXI sont d’abord des rôles métier d’affectation, mais peuvent recevoir certaines permissions applicatives.
- **Objectif métier** : souplesse d’organisation.
- **Utilisateur cible** : gérant, admin
- **Priorité** : IMPORTANT MAIS NON BLOQUANT
- **Statut actuel** : prévu
- **Dépendances** : users, permissions
- **Arbitrages éventuels** : principe validé.

### 06.4 Rôle principal obligatoire
- **Description** : chaque utilisateur doit avoir un rôle principal unique.
- **Objectif métier** : structurer les droits et l’affectation métier.
- **Utilisateur cible** : gérant, admin
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : présent
- **Dépendances** : rôles, permissions
- **Arbitrages éventuels** : aucun

### 06.5 Permissions fines applicatives ALPHA
- **Description** : permissions distinctes validées pour l’ALPHA :
  - consulter son planning
  - consulter le planning global
  - modifier le planning
  - créer un shift manuel
  - modifier un shift publié
  - supprimer / annuler métier un shift publié
  - lancer autoschedule
  - publier un run
  - annuler un run
  - gérer utilisateurs
  - gérer rôles/permissions
  - gérer véhicules
  - gérer templates
  - gérer règles métier
  - **consulter audit**
  - exporter planning
  - accéder au dashboard admin
  - accéder au dashboard terrain
- **Objectif métier** : adapter précisément les accès.
- **Utilisateur cible** : gérant, admin
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : partiel
- **Dépendances** : auth, users, dashboard, planning, audit
- **Arbitrages éventuels** : non retenues comme permissions distinctes ALPHA à ce stade : voir score qualité, gérer paramètres société.

### 06.6 Modèle d’accès à l’audit
- **Description** : l’accès à l’audit repose sur une combinaison :
  - accès natif pour GERANT, ADMIN et support propriétaire
  - accès pour d’autres profils via la permission dédiée `consulter audit`
- **Objectif métier** : garder un noyau de gouvernance tout en permettant des délégations contrôlées.
- **Utilisateur cible** : gérant, admin, support, autres profils autorisés
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : prévu
- **Dépendances** : rôles, permissions, audit
- **Arbitrages éventuels** : aucun

### 06.7 Multi-rôle
- **Description** : possibilité d’ajouter des rôles additionnels à un utilisateur.
- **Objectif métier** : représenter les profils hybrides.
- **Utilisateur cible** : gérant, admin
- **Priorité** : IMPORTANT MAIS NON BLOQUANT
- **Statut actuel** : prévu
- **Dépendances** : rôles, permissions, matching
- **Arbitrages éventuels** : report moyen terme.

---

## MODULE 07 — Véhicules / flotte

### 07.1 Registre de flotte
- **Description** : lister les véhicules de la société.
- **Objectif métier** : visualiser et gérer la flotte.
- **Utilisateur cible** : gérant, admin, régulateur selon permissions
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : présent
- **Dépendances** : multi-tenant
- **Arbitrages éventuels** : aucun

### 07.2 Création d’un véhicule
- **Description** : créer un véhicule avec immatriculation, type, statut.
- **Objectif métier** : alimenter la flotte exploitable.
- **Utilisateur cible** : admin
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : présent
- **Dépendances** : vehicles
- **Arbitrages éventuels** : aucun

### 07.3 Édition d’un véhicule
- **Description** : modifier les données d’un véhicule.
- **Objectif métier** : maintenir les informations à jour.
- **Utilisateur cible** : gérant, admin
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : manquant
- **Dépendances** : vehicles, audit
- **Arbitrages éventuels** : aucun

### 07.4 Désactivation / archivage d’un véhicule
- **Description** : désactiver un véhicule sans perdre son historique.
- **Objectif métier** : cohérence historique.
- **Utilisateur cible** : gérant, admin
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : manquant
- **Dépendances** : planning, audit
- **Arbitrages éventuels** : suppression définitive non prioritaire.

### 07.5 Suppression définitive d’un véhicule non utilisé
- **Description** : suppression définitive seulement si le véhicule n’a jamais été utilisé.
- **Objectif métier** : ménage propre sans casser l’historique.
- **Utilisateur cible** : admin, support
- **Priorité** : IMPORTANT MAIS NON BLOQUANT
- **Statut actuel** : partiel
- **Dépendances** : historique, audit
- **Arbitrages éventuels** : le dépôt supprime physiquement aujourd’hui ; la cible veut un encadrement strict.

### 07.6 Affectation d’un véhicule au planning
- **Description** : affecter un véhicule à un shift.
- **Objectif métier** : planification opérationnelle.
- **Utilisateur cible** : gérant, admin, régulateur
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : présent
- **Dépendances** : planning, autoschedule, matching
- **Arbitrages éventuels** : aucun

### 07.7 Statut véhicule
- **Description** : au minimum actif, maintenance, hors service.
- **Objectif métier** : empêcher ou signaler l’usage d’un véhicule indisponible.
- **Utilisateur cible** : gérant, admin, régulateur
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : présent
- **Dépendances** : planning, matching
- **Arbitrages éventuels** : aucun

### 07.8 Types de véhicule gérés
- **Description** : types officiels initiaux : Ambulance, VSL, Taxi.
- **Objectif métier** : refléter la flotte métier cible.
- **Utilisateur cible** : gérant, admin
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : partiel
- **Dépendances** : vehicles, templates, matching
- **Arbitrages éventuels** : aucun autre type retenu à ce stade.

### 07.9 Conformité documentaire flotte minimale
- **Description** : stockage minimal des documents flotte :
  - assurance
  - contrôle technique
  - carte grise
  - agrément sanitaire
- **Objectif métier** : disposer d’un suivi documentaire de base exploitable avant commercialisation.
- **Utilisateur cible** : gérant, admin
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : manquant
- **Dépendances** : vehicles, dashboard
- **Arbitrages éventuels** : conformité enrichie et alertes avancées hors ALPHA.

### 07.10 État visuel simple de conformité documentaire
- **Description** : affichage d’un état simple :
  - conforme
  - bientôt expiré
  - expiré
- **Objectif métier** : visibilité immédiate sur la situation documentaire de la flotte.
- **Utilisateur cible** : gérant, admin, régulateur selon permissions
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : manquant
- **Dépendances** : conformité flotte minimale
- **Arbitrages éventuels** : pas d’alertes avancées en ALPHA.

### 07.11 Maintenance avancée / types de maintenance
- **Description** : suivi maintenance détaillé et module `MaintenanceType`.
- **Objectif métier** : structuration maintenance plus poussée.
- **Utilisateur cible** : gérant, admin
- **Priorité** : VISION LONG TERME
- **Statut actuel** : partiel
- **Dépendances** : vehicles, alertes
- **Arbitrages éventuels** : data présente, pas de produit fini.

---

## MODULE 08 — Paramètres société / règles métier

### 08.1 Paramètres métier en français
- **Description** : écran de paramètres métier compréhensible, plutôt qu’un simple système clé/valeur brut.
- **Objectif métier** : rendre les réglages utilisables par une société.
- **Utilisateur cible** : gérant, admin
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : partiel
- **Dépendances** : company rules, dashboard
- **Arbitrages éventuels** : le dépôt utilise encore une logique clé/valeur technique.

### 08.2 Règles métier ALPHA déjà cadrées
- **Description** : base fonctionnelle ALPHA validée :
  - repos minimum entre shifts
  - composition équipage ambulance/garde
  - composition équipage VSL
  - composition équipage taxi
  - indisponibilité véhicule
  - indisponibilité salarié
  - interdiction de certains rôles sur certains véhicules
- **Objectif métier** : adapter le comportement du planning à la société.
- **Utilisateur cible** : gérant, admin
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : partiel
- **Dépendances** : planning, autoschedule, matching
- **Arbitrages éventuels** : comportement ALPHA = signalement, pas blocage dur généralisé.

### 08.3 Permissions de modification des règles
- **Description** : le gérant décide qui peut modifier les règles.
- **Objectif métier** : gouvernance interne.
- **Utilisateur cible** : gérant
- **Priorité** : IMPORTANT MAIS NON BLOQUANT
- **Statut actuel** : prévu
- **Dépendances** : permissions
- **Arbitrages éventuels** : aucun

### 08.4 Modes OFF / ALERT / BLOCK / BOTH
- **Description** : système avancé de sévérité des règles.
- **Objectif métier** : moduler le niveau de contrainte.
- **Utilisateur cible** : gérant, admin
- **Priorité** : IMPORTANT MAIS NON BLOQUANT
- **Statut actuel** : partiel
- **Dépendances** : company rules
- **Arbitrages éventuels** : moyen terme ; présent en data, non exigé en ALPHA.

---

## MODULE 09 — Shift templates

### 09.1 CRUD templates administrable
- **Description** : module complet pour créer, modifier, désactiver, archiver les templates.
- **Objectif métier** : rendre l’autoschedule et le planning autonomes côté client.
- **Utilisateur cible** : gérant, admin
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : partiel
- **Dépendances** : autoschedule, planning, permissions
- **Arbitrages éventuels** : la data existe, pas le vrai module complet.

### 09.2 Champs fonctionnels d’un template
- **Description** : nom, catégorie, début/fin si existants, passage minuit, actif/inactif, couleur, durée calculée.
- **Objectif métier** : modéliser un shift type.
- **Utilisateur cible** : gérant, admin
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : partiel
- **Dépendances** : templates
- **Arbitrages éventuels** : la cible accepte aussi des shifts non horodatés.

### 09.3 Composition minimale d’équipe
- **Description** : un template doit pouvoir définir une composition minimale d’équipe, pas seulement un rôle unique :
  - Ambulance / Garde = 2 personnes dont 1 ADE obligatoire + 1 ADE ou AA
  - VSL = 1 personne : AA ou ADE ou TAXI
  - Taxi = 1 personne : TAXI
- **Objectif métier** : respecter la logique métier réelle.
- **Utilisateur cible** : gérant, admin
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : manquant
- **Dépendances** : roles, autoschedule, matching
- **Arbitrages éventuels** : aucun

### 09.4 Type de véhicule requis
- **Description** : un template peut définir le type de véhicule requis.
- **Objectif métier** : lier le shift à la flotte adaptée.
- **Utilisateur cible** : gérant, admin
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : manquant ou très partiel
- **Dépendances** : vehicles, templates, matching
- **Arbitrages éventuels** : aucun

### 09.5 Nombre de personnes requis
- **Description** : un template peut définir le nombre minimal de personnes requis.
- **Objectif métier** : sécuriser la composition d’équipe.
- **Utilisateur cible** : gérant, admin
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : manquant
- **Dépendances** : templates, matching
- **Arbitrages éventuels** : aucun

### 09.6 Couleurs libres
- **Description** : les couleurs sont choisies par la personne autorisée, principalement pour l’identification visuelle.
- **Objectif métier** : améliorer la lisibilité.
- **Utilisateur cible** : gérant, admin
- **Priorité** : IMPORTANT MAIS NON BLOQUANT
- **Statut actuel** : manquant
- **Dépendances** : templates, planning UI
- **Arbitrages éventuels** : aucun

### 09.7 Désactivation / archivage d’un template
- **Description** : désactiver un template sans détruire l’historique.
- **Objectif métier** : préserver les runs passés.
- **Utilisateur cible** : gérant, admin
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : partiel
- **Dépendances** : templates, autoschedule, audit
- **Arbitrages éventuels** : suppression définitive seulement si jamais utilisé.

### 09.8 Templates récurrents hebdomadaires
- **Description** : prise en charge d’une logique de récurrence hebdomadaire.
- **Objectif métier** : faciliter la planification répétitive.
- **Utilisateur cible** : gérant, admin
- **Priorité** : IMPORTANT MAIS NON BLOQUANT
- **Statut actuel** : à confirmer
- **Dépendances** : templates, planning
- **Arbitrages éventuels** : besoin non encore figé.

---

## MODULE 10 — Planning

### 10.1 Consultation du planning en vue jour / semaine / mois
- **Description** : le planning doit proposer une vraie consultation en vue jour, semaine et mois.
- **Objectif métier** : pilotage opérationnel complet et lisible.
- **Utilisateur cible** : tous selon permissions
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : partiel
- **Dépendances** : planning UI, templates, shifts
- **Arbitrages éventuels** : la vue mensuelle appartient au planning, pas à l’autoschedule.

### 10.2 Navigation mensuelle
- **Description** : navigation claire entre les mois, sans impliquer automatiquement une génération mensuelle.
- **Objectif métier** : lecture et gestion du planning dans le temps.
- **Utilisateur cible** : tous selon permissions
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : partiel
- **Dépendances** : planning UI
- **Arbitrages éventuels** : aucun

### 10.3 Planning global lisible par catégories métier
- **Description** : affichage clair pour distinguer Ambulance, Garde, VSL-Taxi (assis), Bureau, Régulation.
- **Objectif métier** : compréhension immédiate du planning.
- **Utilisateur cible** : tous selon permissions
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : partiel
- **Dépendances** : templates, UI planning
- **Arbitrages éventuels** : design précis encore à définir.

### 10.4 Génération de brouillons depuis le planning
- **Description** : lancer l’autoschedule depuis le planning.
- **Objectif métier** : centraliser la gestion opérationnelle.
- **Utilisateur cible** : gérant, admin, régulateur selon permissions
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : présent
- **Dépendances** : autoschedule
- **Arbitrages éventuels** : aucun

### 10.5 Affectation manuelle sur brouillon
- **Description** : affecter utilisateurs et véhicules sur un brouillon.
- **Objectif métier** : finaliser rapidement une proposition.
- **Utilisateur cible** : gérant, admin
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : présent
- **Dépendances** : users, vehicles, draft shifts
- **Arbitrages éventuels** : aucun

### 10.6 Modification manuelle d’un planning publié
- **Description** : modifications manuelles indispensables après publication :
  - changer employé
  - changer véhicule
  - changer horaire
  - ajouter un shift manuel
  - dupliquer
  - supprimer / annuler métier un shift publié avec traçabilité
- **Objectif métier** : gérer la réalité terrain après publication.
- **Utilisateur cible** : gérant, admin, régulateur selon permissions
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : partiel
- **Dépendances** : shifts, audit
- **Arbitrages éventuels** : la suppression après publication est indispensable, mais sous forme d’annulation logique tracée, pas de suppression physique libre.

### 10.7 Suppression métier d’un shift publié
- **Description** : suppression métier / annulation logique d’un shift publié, avec historique et traçabilité.
- **Objectif métier** : corriger le planning sans perdre la trace.
- **Utilisateur cible** : gérant, admin
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : manquant
- **Dépendances** : planning, audit, historique
- **Arbitrages éventuels** : pas de suppression physique souhaitée.

### 10.8 Ajout manuel d’un shift
- **Description** : création manuelle hors autoschedule.
- **Objectif métier** : couvrir les besoins exceptionnels.
- **Utilisateur cible** : gérant, admin, régulateur selon permissions
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : manquant
- **Dépendances** : templates, planning, audit
- **Arbitrages éventuels** : aucun

### 10.9 Historique de planning
- **Description** : historique des modifications sur les shifts, des runs publiés et des versions de planning.
- **Objectif métier** : comprendre ce qui a changé et revenir sur le passé.
- **Utilisateur cible** : gérant, admin, utilisateurs autorisés
- **Priorité** : IMPORTANT MAIS NON BLOQUANT
- **Statut actuel** : partiel
- **Dépendances** : audit, runs, planning
- **Arbitrages éventuels** : profondeur exacte encore à préciser.

---

## MODULE 11 — Autoschedule

### 11.1 Génération Jour
- **Description** : générer un brouillon de planning sur une journée.
- **Objectif métier** : produire rapidement une base de travail courte.
- **Utilisateur cible** : gérant, admin, régulateur selon permissions
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : présent
- **Dépendances** : templates
- **Arbitrages éventuels** : aucun

### 11.2 Génération Semaine
- **Description** : générer un brouillon de planning sur une semaine.
- **Objectif métier** : produire le cœur du planning exploitable.
- **Utilisateur cible** : gérant, admin, régulateur selon permissions
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : présent
- **Dépendances** : templates
- **Arbitrages éventuels** : aucun

### 11.3 Génération Mois
- **Description** : génération mensuelle automatique.
- **Objectif métier** : planifier à plus grande échelle.
- **Utilisateur cible** : gérant, admin, régulateur
- **Priorité** : IMPORTANT MAIS NON BLOQUANT
- **Statut actuel** : manquant
- **Dépendances** : autoschedule, planning, templates, matching
- **Arbitrages éventuels** :
  - hors ALPHA
  - report moyen terme / BETA
  - préférence future : enchaînement automatisé de semaines/jours

### 11.4 Autoschedule avec ou sans affectation automatique
- **Description** : le gérant peut choisir :
  - génération des shifts seuls
  - ou génération avec affectation automatique employés + véhicules
- **Objectif métier** : moduler le niveau d’automatisation.
- **Utilisateur cible** : gérant
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : partiel
- **Dépendances** : matching, users, vehicles, templates
- **Arbitrages éventuels** : aucun

### 11.5 Prise en compte des contraintes ALPHA
- **Description** : l’autoschedule tient compte au minimum de :
  - templates actifs
  - véhicules disponibles
  - rôles requis
  - repos minimum
  - indisponibilité salarié
  - indisponibilité véhicule
  - interdiction de certains rôles sur certains véhicules
- **Objectif métier** : générer un brouillon cohérent.
- **Utilisateur cible** : gérant, admin, régulateur
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : partiel
- **Dépendances** : users, vehicles, rules, templates
- **Arbitrages éventuels** : aucun

### 11.6 Signalements métier du moteur
- **Description** : en cas de conflit ou contrainte non respectée, le moteur produit des signalements métier sans bloquer automatiquement la génération.
- **Objectif métier** : aider à décider sans bloquer l’exploitation.
- **Utilisateur cible** : gérant, admin, régulateur
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : partiel
- **Dépendances** : company rules, matching
- **Arbitrages éventuels** : ces signalements métier sont distincts des alertes UI globales.

### 11.7 Traduction intégrale en français
- **Description** : libellés métier et UI de l’autoschedule en français.
- **Objectif métier** : cohérence produit France.
- **Utilisateur cible** : tous
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : partiel
- **Dépendances** : UI globale
- **Arbitrages éventuels** : aucun

---

## MODULE 12 — Matching

### 12.1 Matching cœur de l’ALPHA
- **Description** : le matching fait partie du cœur fonctionnel ALPHA.
- **Objectif métier** : proposer des affectations plus intelligentes qu’un simple brouillon.
- **Utilisateur cible** : gérant, admin, régulateur selon permissions
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : partiel
- **Dépendances** : autoschedule, users, vehicles, templates
- **Arbitrages éventuels** : aucun

### 12.2 Objectifs d’optimisation ALPHA
- **Description** : couvrir les shifts, respecter les rôles, équilibrer la charge, tenir compte de la disponibilité véhicule.
- **Objectif métier** : obtenir une proposition utile et compréhensible.
- **Utilisateur cible** : gérant, admin
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : partiel
- **Dépendances** : matching, rules, fleet
- **Arbitrages éventuels** : sophistication avancée plus tard.

### 12.3 Plusieurs variantes simples
- **Description** : proposer 2 à 3 variantes simples ou une solution avec problèmes signalés.
- **Objectif métier** : laisser un choix opérationnel.
- **Utilisateur cible** : gérant, admin
- **Priorité** : IMPORTANT MAIS NON BLOQUANT
- **Statut actuel** : manquant
- **Dépendances** : matching
- **Arbitrages éventuels** : comparateur avancé reporté long terme.

### 12.4 Score qualité visible
- **Description** : score visible au niveau du run et de chaque shift.
- **Objectif métier** : rendre la qualité compréhensible.
- **Utilisateur cible** : admin, gérant, puis utilisateurs autorisés
- **Priorité** : IMPORTANT MAIS NON BLOQUANT
- **Statut actuel** : partiel
- **Dépendances** : matching, dashboard, planning
- **Arbitrages éventuels** : visible surtout côté admin/gérant au départ.

---

## MODULE 13 — Audit / traçabilité

### 13.1 Audit planning et opérations critiques
- **Description** : tracer au minimum :
  - génération run
  - publish
  - cancel
  - assignation manuelle
  - désassignation
  - édition shift
  - modifications manuelles après publication
  - création/modification/désactivation utilisateur
  - création/modification/désactivation véhicule
- **Objectif métier** : comprendre qui a fait quoi sur les données critiques.
- **Utilisateur cible** : admin, gérant, utilisateurs autorisés
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : partiel
- **Dépendances** : planning, users, vehicles, audit
- **Arbitrages éventuels** : présent au niveau planning minimal, pas encore complet.

### 13.2 Audit des connexions
- **Description** : tracer les connexions utilisateur.
- **Objectif métier** : sécurité, support et traçabilité d’accès.
- **Utilisateur cible** : admin, gérant, support
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : manquant
- **Dépendances** : auth, audit
- **Arbitrages éventuels** : aucun

### 13.3 Page dédiée audit
- **Description** : l’audit doit être consultable via une page dédiée selon permissions.
- **Objectif métier** : rendre la traçabilité réellement exploitable.
- **Utilisateur cible** : admin, gérant, utilisateurs autorisés
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : manquant
- **Dépendances** : audit, dashboard, permissions
- **Arbitrages éventuels** : le dépôt actuel n’affiche surtout que l’audit du run courant.

### 13.4 Traçabilité détaillée des modifications après publication
- **Description** : tracer qui, quand, ancienne valeur, nouvelle valeur, motif facultatif en ALPHA.
- **Objectif métier** : fiabiliser les retouches manuelles.
- **Utilisateur cible** : admin, gérant, support
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : partiel
- **Dépendances** : planning, audit
- **Arbitrages éventuels** : motif obligatoire pour support modifiant des données.

---

## MODULE 14 — Dashboard

### 14.1 Dashboard comme portail d’accueil
- **Description** : page d’accueil donnant accès aux modules autorisés.
- **Objectif métier** : orienter rapidement l’utilisateur selon ses permissions.
- **Utilisateur cible** : tous
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : partiel
- **Dépendances** : auth, permissions, navigation
- **Arbitrages éventuels** : le dépôt actuel ressemble surtout à un écran debug.

### 14.2 Dashboard avec indicateurs simples
- **Description** : affichage d’indicateurs utiles mais simples, distincts du reporting avancé.
- **Objectif métier** : donner une lecture rapide de la situation.
- **Utilisateur cible** : surtout gérant, admin ; autres rôles selon permissions
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : manquant
- **Dépendances** : planning, vehicles, audit
- **Arbitrages éventuels** : contenu exact par rôle encore à préciser.

### 14.3 Dashboard différencié par rôle
- **Description** :
  - ADMIN : tout
  - GERANT : tout
  - REGULATEUR / BUREAU / ADE / AA / TAXI : planning, véhicules, selon permissions
- **Objectif métier** : adapter l’expérience au profil.
- **Utilisateur cible** : tous
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : manquant
- **Dépendances** : roles, permissions, dashboard
- **Arbitrages éventuels** : indicateurs détaillés encore à définir.

---

## MODULE 15 — Exports / impression

### 15.1 Export PDF planning
- **Description** : exporter le planning en PDF.
- **Objectif métier** : diffusion, consultation externe, archivage simple.
- **Utilisateur cible** : gérant, admin, utilisateurs autorisés
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : manquant
- **Dépendances** : planning
- **Arbitrages éventuels** : aucun

### 15.2 Export Excel / CSV planning
- **Description** : exporter le planning en Excel/CSV.
- **Objectif métier** : retraitement, partage, impression indirecte.
- **Utilisateur cible** : gérant, admin, utilisateurs autorisés
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : manquant
- **Dépendances** : planning
- **Arbitrages éventuels** : aucun

### 15.3 Impression simple planning
- **Description** : impression simple depuis l’UI.
- **Objectif métier** : usage terrain rapide.
- **Utilisateur cible** : gérant, admin, bureau, régulateur selon permissions
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : manquant
- **Dépendances** : planning UI
- **Arbitrages éventuels** : aucun

### 15.4 Politique de conservation des exports générés
- **Description** : définir la conservation ou non des exports produits.
- **Objectif métier** : cadrer l’historique documentaire/produit.
- **Utilisateur cible** : gérant, admin, pilotage produit
- **Priorité** : À CONFIRMER
- **Statut actuel** : à confirmer
- **Dépendances** : exports, audit, documentation
- **Arbitrages éventuels** : sujet non prioritaire en ALPHA, encore ouvert.

---

## MODULE 16 — Import de données / onboarding

### 16.1 Onboarding autonome société pilote
- **Description** : une société doit pouvoir se mettre en place elle-même, sans import obligatoire, grâce à une saisie manuelle complète ; une assistance du propriétaire reste possible.
- **Objectif métier** : garantir un onboarding autonome même sans mécanisme d’import.
- **Utilisateur cible** : gérant, admin, support
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : manquant
- **Dépendances** : auth, users, vehicles, templates, bases, profil société
- **Arbitrages éventuels** : support possible et tracé.

### 16.2 Import initial de données
- **Description** : import initial des utilisateurs, véhicules, templates, bases/dépôts, indisponibilités utilisateurs.
- **Objectif métier** : accélérer la mise en route.
- **Utilisateur cible** : gérant, admin, support
- **Priorité** : IMPORTANT MAIS NON BLOQUANT
- **Statut actuel** : manquant
- **Dépendances** : users, vehicles, templates, bases, absences
- **Arbitrages éventuels** : reste non bloquant tant que l’onboarding manuel complet est possible ; règles métier et historique planning exclus en ALPHA.

### 16.3 Formats d’import
- **Description** : CSV et Excel `.xlsx` uniquement.
- **Objectif métier** : simplicité et compatibilité.
- **Utilisateur cible** : gérant, admin, support
- **Priorité** : IMPORTANT MAIS NON BLOQUANT
- **Statut actuel** : manquant
- **Dépendances** : import
- **Arbitrages éventuels** : aucun autre format en ALPHA.

### 16.4 Logique d’import simple
- **Description** : aperçu avant import, validation manuelle, rapport d’erreurs, ajout obligatoire ; mise à jour d’existants seulement si identifiant métier clairement défini et fiable.
- **Objectif métier** : éviter les imports destructeurs.
- **Utilisateur cible** : gérant, admin, support
- **Priorité** : IMPORTANT MAIS NON BLOQUANT
- **Statut actuel** : manquant
- **Dépendances** : import
- **Arbitrages éventuels** : ne pas figer une logique d’update trop ambitieuse.

### 16.5 Type d’import ALPHA
- **Description** : import initial uniquement en ALPHA, sans synchronisation continue.
- **Objectif métier** : garder un périmètre simple.
- **Utilisateur cible** : gérant, admin, support
- **Priorité** : IMPORTANT MAIS NON BLOQUANT
- **Statut actuel** : prévu
- **Dépendances** : import
- **Arbitrages éventuels** : réimport ponctuel manuel possible plus tard.

---

## MODULE 17 — Alertes applicatives

### 17.1 Alertes applicatives visibles dans l’UI
- **Description** : affichage d’alertes applicatives visibles dans l’interface.
- **Objectif métier** : signaler les conflits ou anomalies sans bloquer l’exploitation.
- **Utilisateur cible** : gérant, admin, régulateur, autres profils autorisés
- **Priorité** : IMPORTANT MAIS NON BLOQUANT
- **Statut actuel** : manquant
- **Dépendances** : planning, autoschedule, matching, vehicles, rules
- **Arbitrages éventuels** : hors périmètre ALPHA ; visé moyen terme / BETA ; réévaluation après tests terrain avant planification réelle.

### 17.2 Typologie minimale des alertes
- **Description** : alertes possibles sur conflits planning, véhicule indisponible, règle métier non respectée, maintenance/conformité à venir, événements d’audit importants.
- **Objectif métier** : rendre les problèmes visibles tôt.
- **Utilisateur cible** : gérant, admin, régulateur
- **Priorité** : IMPORTANT MAIS NON BLOQUANT
- **Statut actuel** : manquant
- **Dépendances** : audit, planning, vehicles, rules
- **Arbitrages éventuels** : liste exacte à redéfinir lors de la relance du sujet.

### 17.3 Canal de diffusion des alertes
- **Description** : alertes visibles dans l’UI uniquement.
- **Objectif métier** : garder un périmètre simple.
- **Utilisateur cible** : tous selon permissions
- **Priorité** : IMPORTANT MAIS NON BLOQUANT
- **Statut actuel** : manquant
- **Dépendances** : dashboard, UI globale
- **Arbitrages éventuels** : pas d’email ni d’intégration externe en ALPHA.

> **Séparation retenue** :  
> les **signalements métier** produits par Autoschedule/Matching appartiennent au moteur métier ;  
> les **alertes applicatives** appartiennent à l’UI globale et ne font pas partie du périmètre ALPHA.

---

## MODULE 18 — API / conventions

### 18.1 Convention API homogène
- **Description** : format de réponse cohérent, erreurs homogènes, comportement stable.
- **Objectif métier** : fiabiliser le produit et simplifier les évolutions.
- **Utilisateur cible** : système / développement
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : partiel
- **Dépendances** : toutes les API
- **Arbitrages éventuels** : le dépôt montre encore plusieurs styles de réponses.

### 18.2 Cloisonnement multi-tenant uniforme
- **Description** : chaque API critique doit respecter le cloisonnement société.
- **Objectif métier** : sécurité des données.
- **Utilisateur cible** : système
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : partiel
- **Dépendances** : auth, session, API
- **Arbitrages éventuels** : à prouver sur tout le périmètre futur.

### 18.3 Respect architecture cible
- **Description** : éviter les accès Prisma dispersés en UI et tendre vers une architecture plus propre.
- **Objectif métier** : maintenabilité.
- **Utilisateur cible** : système / développement
- **Priorité** : IMPORTANT MAIS NON BLOQUANT
- **Statut actuel** : partiel
- **Dépendances** : API, services
- **Arbitrages éventuels** : sujet technique, pas fonctionnel direct.

---

## MODULE 19 — Tests / qualité

### 19.1 Lint / build OK
- **Description** : chaque bloc doit conserver un lint et un build propres.
- **Objectif métier** : stabilité minimale.
- **Utilisateur cible** : développement
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : présent
- **Dépendances** : code
- **Arbitrages éventuels** : preuves présentes dans les sessions récentes.

### 19.2 Scénarios manuels documentés
- **Description** : tests manuels documentés par fonctionnalité.
- **Objectif métier** : validation concrète.
- **Utilisateur cible** : développement / pilotage projet
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : partiel
- **Dépendances** : docs de session
- **Arbitrages éventuels** : déjà amorcé, pas homogène partout.

### 19.3 Smoke tests API
- **Description** : couvrir les routes critiques par des tests simples.
- **Objectif métier** : éviter les régressions évidentes.
- **Utilisateur cible** : développement
- **Priorité** : IMPORTANT MAIS NON BLOQUANT
- **Statut actuel** : manquant
- **Dépendances** : API
- **Arbitrages éventuels** : requis dans le seuil de qualité cible.

### 19.4 Tests automatisés ciblés
- **Description** : tests ciblés sur les points critiques.
- **Objectif métier** : fiabiliser le produit.
- **Utilisateur cible** : développement
- **Priorité** : IMPORTANT MAIS NON BLOQUANT
- **Statut actuel** : manquant
- **Dépendances** : architecture de test
- **Arbitrages éventuels** : aucun

### 19.5 Critère de module terminé
- **Description** : lint/build + tests manuels + smoke tests API + tests automatisés ciblés.
- **Objectif métier** : éviter les faux terminés.
- **Utilisateur cible** : pilotage projet
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : prévu
- **Dépendances** : QA, docs
- **Arbitrages éventuels** : critère validé comme seuil cible.

---

## MODULE 20 — Documentation / gouvernance documentaire

### 20.1 Documentation de pilotage interne
- **Description** : protocole, sessions, plan, état global, registre des décisions, audit de dev.
- **Objectif métier** : garder un pilotage reproductible.
- **Utilisateur cible** : propriétaire / développement
- **Priorité** : INDISPENSABLE PRÉ-VERSION COMMERCIALE
- **Statut actuel** : présent
- **Dépendances** : docs
- **Arbitrages éventuels** : priorité ALPHA confirmée.

### 20.2 Documentation d’usage produit
- **Description** : comment créer un utilisateur, un véhicule, un template, utiliser le planning, etc.
- **Objectif métier** : faciliter l’adoption côté client.
- **Utilisateur cible** : utilisateurs finaux
- **Priorité** : IMPORTANT MAIS NON BLOQUANT
- **Statut actuel** : manquant
- **Dépendances** : modules fonctionnels stabilisés
- **Arbitrages éventuels** : priorité moyen terme.

### 20.3 Fichiers docs protégés existants confirmés
- **Description** : fichiers protégés confirmés dans le ZIP actuel :
  - `./docs/1-master/DOCUMENT_MAITRE.md`
  - `./docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
  - `./docs/1-master/ETAT_GLOBAL_PROJET.md`
  - `./docs/1-master/REGISTRE_DECISIONS.md`
  - `./docs/1-master/RECAP_DISCUSSIONS.md`
  - `./docs/1-master/STRUCTURE_PROJET.md`
  - `./docs/PROTOCOLE_SESSION.md`
  - `./docs/STRUCTURE_DOCS.md`
  - `./docs/3-templates/TEMPLATE_DEBUT_SESSION.md`
  - `./docs/3-templates/TEMPLATE_FIN_SESSION.md`
  - `./docs/3-templates/TEMPLATE_DOD_4_4.md`
  - `./docs/3-templates/TEMPLATE_RECAP_SESSION.md`
- **Objectif métier** : éviter les dérives documentaires.
- **Utilisateur cible** : pilotage projet
- **Priorité** : IMPORTANT MAIS NON BLOQUANT
- **Statut actuel** : prévu
- **Dépendances** : gouvernance documentaire
- **Arbitrages éventuels** : aucun

### 20.4 Fichiers docs à protéger s’ils existent ou sont créés
- **Description** :
  - `./docs/1-master/README_PROJET.md`
  - `./docs/1-master/CHANGELOG.md`
- **Objectif métier** : appliquer la même protection au noyau documentaire étendu.
- **Utilisateur cible** : pilotage projet
- **Priorité** : IMPORTANT MAIS NON BLOQUANT
- **Statut actuel** : à confirmer
- **Dépendances** : gouvernance documentaire
- **Arbitrages éventuels** : non trouvés dans le ZIP actuel, mais à protéger s’ils existent ou sont créés.

### 20.5 Règle sur `./docs/2-sessions`
- **Description** :
  - sessions en cours = modifiables avec souplesse
  - sessions clôturées / validées = protégées
- **Objectif métier** : distinguer travail actif et historique validé.
- **Utilisateur cible** : pilotage projet
- **Priorité** : IMPORTANT MAIS NON BLOQUANT
- **Statut actuel** : prévu
- **Dépendances** : gouvernance documentaire
- **Arbitrages éventuels** : toute modification d’une session clôturée doit être justifiée et validée.

---

## MODULE 21 — Hors périmètre immédiat / long terme

### 21.1 Billing / abonnement
- **Objectif métier** : monétisation SaaS
- **Priorité** : VISION LONG TERME
- **Statut actuel** : manquant

### 21.2 Mobile natif
- **Objectif métier** : usage mobile avancé
- **Priorité** : VISION LONG TERME
- **Statut actuel** : manquant

### 21.3 Notifications email
- **Objectif métier** : alertes et diffusion
- **Priorité** : VISION LONG TERME
- **Statut actuel** : manquant

### 21.4 Intégrations externes
- **Description** : aucune intégration externe n’est indispensable en ALPHA.
- **Objectif métier** : éviter l’explosion prématurée du périmètre.
- **Utilisateur cible** : produit / pilotage
- **Priorité** : VISION LONG TERME
- **Statut actuel** : à confirmer
- **Arbitrages éventuels** : hors ALPHA ; réévaluation après tests terrain.

### 21.5 Reporting avancé
- **Description** : statistiques, analyses, comparaisons, historiques consolidés.
- **Objectif métier** : pilotage analytique avancé.
- **Utilisateur cible** : gérant, admin
- **Priorité** : VISION LONG TERME
- **Statut actuel** : manquant
- **Arbitrages éventuels** : en ALPHA, seulement quelques indicateurs simples dans le dashboard.

---

# 2. Points restant réellement ouverts

Seuls les points ci-dessous restent à arbitrer ou confirmer avant gel définitif du cadrage.

## 2.1 À confirmer
- le **nom exact** du rôle support global
- le contenu précis des **indicateurs simples** du dashboard par rôle
- le rattachement **template ↔ base**
- la profondeur exacte de l’**historique de planning** en ALPHA
- le besoin ou non de **templates récurrents hebdomadaires**
- la stratégie exacte de **mise à jour d’existants lors d’un import** au-delà de l’ajout simple
- la politique de conservation des **exports générés**

---

# 3. Statut de la discussion

- **document fonctionnel final mis à jour**
- **document de cadrage fonctionnel prêt pour validation officielle**
- **plan de développement non encore refondu**
