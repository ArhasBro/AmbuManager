# Ambulance Manager — Fonctionnalités détaillées — Société V1

Version : V1 (MASTER)  
Date : 18/05/2026

## Sommaire

- [1. Objectif de la page](#1-objectif-de-la-page)
- [2. Positionnement fonctionnel](#2-positionnement-fonctionnel)
- [3. Périmètre V1 / Alpha validé](#3-périmètre-v1--alpha-validé)
- [4. Informations générales](#4-informations-générales)
- [5. Adresse principale](#5-adresse-principale)
- [6. Responsables applicatifs](#6-responsables-applicatifs)
- [7. Contacts société](#7-contacts-société)
- [8. Informations métier transport sanitaire](#8-informations-métier-transport-sanitaire)
- [9. Paramètres généraux](#9-paramètres-généraux)
- [10. Résumé de configuration](#10-résumé-de-configuration)
- [11. Modification du profil société](#11-modification-du-profil-société)
- [12. Statut de la société](#12-statut-de-la-société)
- [13. Accès et permissions](#13-accès-et-permissions)
- [14. Audit et traçabilité](#14-audit-et-traçabilité)
- [15. États de la page](#15-états-de-la-page)
- [16. Éléments exclus du périmètre V1 / Alpha](#16-éléments-exclus-du-périmètre-v1--alpha)
- [17. Évolutions futures / à ne pas oublier](#17-évolutions-futures--à-ne-pas-oublier)
- [18. Points à confirmer](#18-points-à-confirmer)

---

## 1. Objectif de la page

La page **Société** permet de consulter et gérer le profil permanent de la société courante dans Ambulance Manager.

Elle doit centraliser les informations générales de l’entreprise, ses contacts, son adresse principale, ses paramètres simples et certaines informations métier liées au transport sanitaire.

La page **Société** ne doit pas devenir une page fourre-tout.

Elle ne doit pas remplacer :

- la page **Dépôts / Bases** ;
- la page **Utilisateurs** ;
- la page **Véhicules** ;
- la page **Planning** ;
- la page **Audit** ;
- la page **Mise en route**.

Son rôle est de porter le profil stable de la société.

---

## 2. Positionnement fonctionnel

### 2.1 Société

La page **Société** est le profil permanent de la société.

Elle contient les informations propres à l’entreprise :

- identité ;
- SIRET ;
- adresse principale ;
- contacts société ;
- responsables applicatifs affichés ;
- paramètres généraux ;
- informations métier confirmées ;
- résumé simple de configuration.

### 2.2 Mise en route

L’ancienne page **Onboarding** est renommée en français :

```text
Mise en route
```

La page **Mise en route** reste séparée de la page **Société**.

Elle sert à accompagner la configuration initiale de l’espace société :

- checklist de configuration ;
- création guidée des premiers éléments ;
- imports initiaux ;
- suivi de progression ;
- finalisation de l’espace société.

### 2.3 Séparation entre Société et Mise en route

Règle validée :

```text
Société
= profil permanent de la société.

Mise en route
= assistant de configuration initiale.
```

La page **Société** peut afficher un résumé simple de configuration et un accès vers **Mise en route**.

Elle ne doit pas contenir la checklist complète, les imports initiaux ou tout le workflow de démarrage.

---

## 3. Périmètre V1 / Alpha validé

Fonctionnalités validées pour la page **Société V1 / Alpha** :

- consultation du profil société ;
- modification du profil société selon permissions ;
- gestion des informations générales ;
- gestion de l’adresse principale ;
- affichage automatique des responsables applicatifs ;
- gestion de plusieurs contacts société ;
- distinction entre contact société et utilisateur applicatif ;
- gestion de paramètres généraux simples ;
- affichage d’informations métier transport sanitaire à confirmer ;
- affichage d’un résumé simple de configuration ;
- accès vers la page **Mise en route** si autorisé ;
- distinction entre mode consultation et mode modification ;
- accès Admin / Gérant en Alpha ;
- absence d’accès par défaut pour les utilisateurs terrain ;
- traçabilité des modifications sensibles dans l’audit.

Sont explicitement exclus de l’Alpha :

- fusion de Société avec Mise en route ;
- suppression de société ;
- suspension de société ;
- archivage de société ;
- désactivation de société ;
- facturation SaaS ;
- conformité réglementaire complète non confirmée.

---

## 4. Informations générales

### 4.1 Objectif

Le bloc **Informations générales** sert à identifier clairement la société exploitante.

### 4.2 Champs validés

Champs prévus :

- nom de la société ;
- nom commercial ;
- SIRET ;
- téléphone principal ;
- email de contact ;
- site web éventuel.

### 4.3 Nom de la société

Le nom de la société est obligatoire.

Exemple :

```text
Ambulances Exemple
```

### 4.4 Nom commercial

Le nom commercial est utile si la société utilise une appellation différente de sa raison sociale.

Exemple :

```text
Ambulances Exemple Lamballe
```

Le champ peut être optionnel.

### 4.5 SIRET

Le SIRET permet d’identifier administrativement la société.

Son caractère obligatoire exact reste à confirmer.

Mention à retenir tant que la règle n’est pas définitivement cadrée :

```text
INFORMATION NON FOURNIE — À CONFIRMER
```

### 4.6 Téléphone principal

Le téléphone principal permet de contacter la société.

Il est recommandé en Alpha.

### 4.7 Email de contact

L’email de contact permet de joindre la société.

Il est recommandé en Alpha.

Il ne doit pas être confondu avec l’email de connexion d’un utilisateur.

### 4.8 Site web

Le site web est optionnel.

---

## 5. Adresse principale

### 5.1 Objectif

Le bloc **Adresse principale** permet de renseigner l’adresse principale de la société.

Cette adresse peut correspondre au siège ou à l’adresse administrative principale.

Elle ne remplace pas les bases / dépôts.

### 5.2 Champs validés

Champs prévus :

- adresse ;
- complément d’adresse ;
- code postal ;
- ville ;
- pays.

### 5.3 Séparation avec Dépôts / Bases

Règle validée :

```text
L’adresse principale de la société ne remplace pas les bases / dépôts.
```

La page **Dépôts / Bases** gère les lieux d’exploitation.

Une société peut avoir une adresse principale et plusieurs bases / dépôts.

---

## 6. Responsables applicatifs

### 6.1 Principe

Les responsables applicatifs sont affichés automatiquement depuis les utilisateurs ayant les rôles :

- Admin ;
- Gérant.

Règle validée :

```text
Les responsables applicatifs sont affichés automatiquement depuis les utilisateurs Admin / Gérant.
```

### 6.2 Affichage

Affichage possible :

```text
Responsables applicatifs

Nathan Archenoul
Gérant

Marie Dupont
Admin
```

### 6.3 Modification des responsables applicatifs

Les responsables applicatifs ne sont pas modifiés depuis la page **Société**.

Si un Admin ou un Gérant doit être ajouté ou retiré, cela se fait depuis la page **Utilisateurs**, via les rôles et permissions.

Règle validée :

```text
La page Société affiche les responsables applicatifs.
Elle ne modifie pas les rôles Admin / Gérant.
```

### 6.4 Aucun responsable applicatif

Si aucun Admin / Gérant n’est identifié, la page affiche un état simple :

```text
Aucun responsable applicatif identifié.
Vérifiez les rôles depuis la page Utilisateurs.
```

---

## 7. Contacts société

### 7.1 Principe

La page **Société** doit permettre de gérer plusieurs contacts société dès l’Alpha.

Ces contacts peuvent être administratifs, légaux, opérationnels, réglementaires ou commerciaux.

Règle validée :

```text
Plusieurs contacts société sont prévus dès l’Alpha.
```

### 7.2 Contact société différent d’un utilisateur

Un contact société n’est pas automatiquement un utilisateur Ambulance Manager.

Distinction validée :

```text
Contact société
= information administrative ou organisationnelle.

Utilisateur
= compte applicatif avec rôle, permissions et accès.
```

Un contact société ne donne aucun accès applicatif.

Les accès restent gérés uniquement dans la page **Utilisateurs**.

### 7.3 Champs d’un contact société

Chaque contact peut contenir :

- nom ;
- prénom ;
- fonction / type de contact ;
- email ;
- téléphone ;
- commentaire interne ;
- contact principal : oui / non ;
- statut actif / inactif si utile.

### 7.4 Types de contacts possibles

Types possibles :

- représentant légal ;
- contact administratif ;
- contact facturation ;
- responsable exploitation ;
- contact RH ;
- contact réglementaire / ARS ;
- autre.

### 7.5 Contact principal

Un contact peut être marqué comme principal si besoin.

Cette règle permet d’identifier rapidement le contact de référence.

À confirmer plus tard si plusieurs contacts principaux doivent être autorisés selon le type de contact.

### 7.6 Actions sur les contacts société

Actions possibles selon permissions :

- ajouter un contact ;
- modifier un contact ;
- désactiver un contact si nécessaire ;
- marquer un contact comme principal ;
- consulter les contacts.

Aucune création automatique d’utilisateur ne doit être déclenchée depuis un contact société.

---

## 8. Informations métier transport sanitaire

### 8.1 Objectif

Le bloc **Informations métier transport sanitaire** sert à prévoir les données réglementaires ou métier propres à l’activité de transport sanitaire.

Ce bloc doit rester prudent tant que les documents officiels ne sont pas disponibles.

### 8.2 Champs possibles

Champs possibles à confirmer :

- numéro d’agrément sanitaire ;
- ARS de rattachement ;
- département principal d’activité ;
- zone d’activité ;
- commentaire réglementaire interne.

### 8.3 Règle de prudence

Tant que les obligations exactes ne sont pas confirmées par document officiel, la fiche doit indiquer :

```text
INFORMATION NON FOURNIE — À CONFIRMER
```

### 8.4 Alpha

En Alpha, ces champs peuvent être prévus, mais leur caractère obligatoire reste à confirmer.

Il ne faut pas inventer de règle réglementaire non fournie.

---

## 9. Paramètres généraux

### 9.1 Objectif

Le bloc **Paramètres généraux** permet de gérer des préférences simples au niveau de la société.

Il ne doit pas devenir un moteur complet de règles métier en Alpha.

### 9.2 Champs proposés

Paramètres simples prévus :

- fuseau horaire ;
- format d’affichage des dates ;
- format d’affichage des horaires ;
- pays par défaut ;
- langue de l’interface.

### 9.3 Valeurs par défaut

Pour une société en France, valeurs par défaut possibles :

```text
Fuseau horaire : Europe/Paris
Format date : JJ/MM/AAAA
Format horaire : 24h
Langue : Français
Pays : France
```

### 9.4 Règles métier société

La page **Société** peut prévoir une section prudente pour certains paramètres métier simples.

Les règles complexes restent à confirmer dans les fiches concernées, notamment :

- Planning ;
- Heures / Horaires ;
- Véhicules ;
- Suivi des véhicules ;
- Modèles horaires.

Exemples de règles futures à ne pas figer trop tôt :

- règles de repos ;
- règles d’alerte planning ;
- modes alerte / blocage ;
- règles d’affectation ;
- règles liées aux absences ;
- règles liées aux véhicules ;
- règles liées aux vérifications / désinfections.

---

## 10. Résumé de configuration

### 10.1 Principe

La page **Société** peut afficher un résumé simple de configuration.

Elle ne contient pas la checklist complète de configuration initiale.

Règle validée :

```text
Société affiche seulement un résumé.
La checklist détaillée reste dans Mise en route.
```

### 10.2 Éléments affichables

Le résumé peut afficher :

- profil société : complet / incomplet ;
- contacts société : complet / incomplet ;
- bases / dépôts : à compléter / OK ;
- utilisateurs : à compléter / OK ;
- véhicules : à compléter / OK ;
- modèles horaires : à compléter / OK.

### 10.3 Action vers Mise en route

Action possible :

```text
Continuer la mise en route
```

Cette action ouvre la page **Mise en route**.

Elle s’affiche uniquement si l’utilisateur est autorisé.

### 10.4 Configuration incomplète

Si la configuration est incomplète, message possible :

```text
Configuration incomplète.
Certains éléments nécessaires à la mise en route restent à compléter.
```

---

## 11. Modification du profil société

### 11.1 Mode consultation et mode modification

La page **Société** distingue :

- mode consultation ;
- mode modification.

Par défaut, la page s’ouvre en mode consultation.

La modification doit être volontaire, via une action claire :

```text
Modifier la société
```

### 11.2 Champs modifiables

Les champs modifiables selon permissions sont :

- informations générales ;
- adresse principale ;
- contacts société ;
- informations métier confirmées ;
- paramètres généraux ;
- paramètres métier simples si prévus.

### 11.3 Champs non modifiés depuis Société

Ne sont pas modifiés depuis la page **Société** :

- rôles Admin / Gérant ;
- utilisateurs ;
- véhicules ;
- dépôts / bases ;
- planning ;
- données d’audit ;
- informations de facturation SaaS.

---

## 12. Statut de la société

### 12.1 Principe Alpha

En Alpha, la société courante est considérée active.

La page ne gère pas de workflow de statut société avancé.

### 12.2 Éléments exclus en Alpha

Les actions suivantes ne sont pas intégrées à l’Alpha :

- désactivation d’une société ;
- suspension d’une société ;
- archivage d’une société ;
- suppression physique d’une société.

### 12.3 Pourquoi

Ces actions ont un impact fort sur :

- les utilisateurs ;
- les véhicules ;
- les plannings ;
- les accès ;
- l’audit ;
- le cloisonnement multi-tenant ;
- les données historiques.

Elles devront être cadrées plus tard si nécessaire.

---

## 13. Accès et permissions

### 13.1 Principe général

La page **Société** est soumise aux permissions.

Elle n’est pas visible par défaut pour tous les profils.

### 13.2 Admin / Gérant

En Alpha, Admin et Gérant peuvent consulter et modifier la page **Société**.

Ils peuvent :

- consulter le profil société ;
- modifier les informations générales ;
- modifier l’adresse principale ;
- gérer les contacts société ;
- consulter les responsables applicatifs ;
- modifier les paramètres généraux ;
- consulter le résumé de configuration ;
- accéder à **Mise en route** si autorisé ;
- consulter l’historique récent si prévu.

### 13.3 Utilisateur autorisé

Un utilisateur autorisé peut recevoir certaines permissions dédiées.

Exemples :

- consulter la société ;
- modifier les informations générales ;
- gérer les contacts société ;
- modifier les paramètres généraux ;
- consulter le résumé de configuration.

### 13.4 Utilisateurs terrain

Les utilisateurs terrain n’ont pas accès à la page **Société** par défaut.

Ils ne peuvent pas modifier les informations société.

S’ils ont besoin de voir certaines informations simples, cela devra passer par une permission dédiée ou par une autre page plus adaptée.

### 13.5 Permissions dédiées à prévoir

Permissions fonctionnelles possibles :

- consulter la société ;
- modifier la société ;
- modifier l’adresse société ;
- gérer les contacts société ;
- consulter les responsables applicatifs ;
- modifier les paramètres généraux ;
- consulter les paramètres métier ;
- modifier les paramètres métier ;
- consulter le résumé de configuration ;
- accéder à Mise en route ;
- consulter l’historique société.

Les noms techniques définitifs seront définis plus tard.

---

## 14. Audit et traçabilité

### 14.1 Principe

Les modifications sensibles de la page **Société** doivent être tracées dans l’audit.

L’audit complet reste dans la page **Audit**.

La page **Société** peut afficher un historique récent si l’utilisateur est autorisé.

### 14.2 Actions à tracer

Actions à tracer :

- modification du nom de la société ;
- modification du SIRET ;
- modification de l’adresse principale ;
- modification du téléphone principal ;
- modification de l’email principal ;
- ajout d’un contact société ;
- modification d’un contact société ;
- désactivation d’un contact société ;
- modification d’un contact principal ;
- modification d’un paramètre général ;
- modification d’une information métier transport sanitaire ;
- modification d’un paramètre métier si prévu.

### 14.3 Historique récent

Un historique récent peut afficher :

- date ;
- utilisateur ;
- action réalisée ;
- champ ou bloc concerné ;
- résumé de modification.

L’audit complet reste réservé à la page **Audit**.

---

## 15. États de la page

### 15.1 Chargement initial

La page doit charger :

- les informations générales de la société ;
- l’adresse principale ;
- les contacts société ;
- les responsables applicatifs Admin / Gérant ;
- les paramètres généraux ;
- les informations métier confirmées ;
- le résumé de configuration ;
- les permissions de l’utilisateur connecté.

Message possible :

```text
Chargement de la société...
```

### 15.2 Mode consultation

Par défaut, la page s’ouvre en lecture.

Elle affiche :

- informations générales ;
- adresse principale ;
- contacts société ;
- responsables applicatifs ;
- paramètres généraux ;
- résumé de configuration ;
- accès vers Mise en route si autorisé.

### 15.3 Mode modification

Le mode modification est accessible uniquement si l’utilisateur est autorisé.

En mode modification, l’utilisateur peut modifier uniquement les blocs autorisés par ses permissions.

### 15.4 Aucun contact société

Si aucun contact société n’est renseigné :

```text
Aucun contact société renseigné.
Ajoutez un contact administratif, légal ou opérationnel.
```

L’action **Ajouter un contact** s’affiche uniquement si l’utilisateur est autorisé.

### 15.5 Aucun responsable applicatif

Si aucun Admin / Gérant n’est trouvé :

```text
Aucun responsable applicatif identifié.
Vérifiez les rôles depuis la page Utilisateurs.
```

La correction se fait dans **Utilisateurs**, pas dans **Société**.

### 15.6 Configuration incomplète

Message possible :

```text
Configuration incomplète.
Certains éléments nécessaires à la mise en route restent à compléter.
```

Action possible :

```text
Continuer la mise en route
```

### 15.7 Accès non autorisé

Si un utilisateur sans permission tente d’accéder à la page :

```text
Accès non autorisé.
```

La page peut aussi être absente de la navigation.

### 15.8 Erreur de chargement

En cas d’erreur technique :

```text
Impossible de charger les informations de la société.
Veuillez réessayer.
```

### 15.9 Validation de formulaire

Messages à prévoir :

```text
Le nom de la société est obligatoire.
```

```text
Le SIRET est invalide.
```

```text
L’email de contact est invalide.
```

```text
Le code postal est invalide.
```

```text
Le nom du contact est obligatoire.
```

```text
La fonction du contact est obligatoire.
```

```text
L’email du contact est invalide.
```

---

## 16. Éléments exclus du périmètre V1 / Alpha

Les éléments suivants ne sont pas intégrés au périmètre V1 / Alpha.

Ils ne sont pas exclus de la version finale.

- fusion de Société avec Mise en route ;
- checklist complète de mise en route dans Société ;
- imports initiaux depuis Société ;
- gestion des dépôts / bases depuis Société ;
- gestion des utilisateurs depuis Société ;
- gestion des véhicules depuis Société ;
- gestion du Planning depuis Société ;
- modification des rôles Admin / Gérant depuis Société ;
- création d’un compte utilisateur depuis les contacts société ;
- désactivation d’une société ;
- suspension d’une société ;
- archivage d’une société ;
- suppression physique d’une société ;
- facturation / abonnement SaaS ;
- multi-société avancé ;
- documents juridiques avancés ;
- conformité ARS complète tant que les documents officiels ne sont pas fournis ;
- règles métier complexes non cadrées ;
- reporting société avancé ;
- application mobile dédiée.

Ces éléments pourront être réétudiés en Beta, version finale ou évolution ultérieure.

---

## 17. Évolutions futures / à ne pas oublier

### 17.1 Mise en route

La page **Mise en route** remplace l’ancien nom **Onboarding**.

Elle devra contenir plus tard :

- checklist complète de configuration initiale ;
- suivi de progression ;
- création guidée des premiers éléments ;
- imports initiaux ;
- contrôle de complétude ;
- finalisation de l’espace société.

La page **Société** garde seulement un résumé et un accès :

```text
Continuer la mise en route
```

### 17.2 Gestion avancée des contacts

À prévoir plus tard :

- contacts multiples enrichis ;
- pièces jointes liées à un contact ;
- historique détaillé par contact ;
- contacts par rôle métier ;
- notifications par type de contact ;
- contacts réglementaires dédiés.

### 17.3 Informations réglementaires transport sanitaire

À compléter quand les documents officiels seront disponibles :

- numéro d’agrément sanitaire ;
- ARS de rattachement ;
- obligations précises ;
- champs obligatoires ;
- justificatifs éventuels ;
- échéances réglementaires.

Tant que ces informations ne sont pas confirmées :

```text
INFORMATION NON FOURNIE — À CONFIRMER
```

### 17.4 Paramètres métier avancés

À prévoir plus tard, après les fiches Planning, Heures, Véhicules et Suivi des véhicules :

- règles de repos ;
- règles d’alerte planning ;
- modes alerte / blocage ;
- règles d’affectation ;
- règles liées aux absences ;
- règles liées aux véhicules ;
- règles liées aux vérifications / désinfections.

### 17.5 Statuts société avancés

À prévoir plus tard uniquement si nécessaire :

- société active ;
- société suspendue ;
- société désactivée ;
- société archivée ;
- procédure de restauration ;
- règles d’accès en cas de suspension.

Pas en Alpha.

### 17.6 Facturation / abonnement SaaS

À prévoir plus tard :

- plan d’abonnement ;
- statut de paiement ;
- facturation ;
- limites d’usage ;
- gestion commerciale SaaS.

Pas dans la page Société Alpha.

### 17.7 Expérience mobile

À prévoir plus tard :

- consultation simple du profil société ;
- consultation des contacts utiles ;
- accès rapide aux informations principales ;
- affichage adapté aux petits écrans.

---

## 18. Points à confirmer

Les points suivants restent à confirmer dans les fiches futures ou lors d’un cadrage dédié :

- caractère obligatoire ou non du SIRET ;
- format exact de validation du SIRET ;
- champs réglementaires exacts liés au transport sanitaire ;
- numéro d’agrément sanitaire obligatoire ou non ;
- ARS de rattachement obligatoire ou non ;
- documents justificatifs à prévoir plus tard ;
- règles exactes des paramètres métier société ;
- lien exact entre Société et Mise en route ;
- critères exacts de configuration complète / incomplète ;
- noms techniques définitifs des permissions ;
- niveau d’historique récent affiché dans Société ;
- future gestion des statuts société hors Alpha ;
- règle exacte sur un ou plusieurs contacts principaux ;
- niveau d’accès futur éventuel des utilisateurs terrain à certaines informations société.
