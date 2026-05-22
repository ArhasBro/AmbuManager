# Ambulance Manager — Fonctionnalités détaillées — Utilisateurs V1

> Statut : référence fonctionnelle cible — page non validée à ce stade.

Version : V1 (MASTER)  
Date : 18/05/2026

## Sommaire

- [1. Objectif de la page](#1-objectif-de-la-page)
- [2. Principes généraux validés](#2-principes-généraux-validés)
- [3. Liste des utilisateurs](#3-liste-des-utilisateurs)
- [4. Création d'un utilisateur](#4-création-dun-utilisateur)
- [5. Modification d'un utilisateur](#5-modification-dun-utilisateur)
- [6. Statuts utilisateur](#6-statuts-utilisateur)
- [7. Rôles, multi-rôle et permissions](#7-rôles-multi-rôle-et-permissions)
- [8. Demandes d'absence / indisponibilité](#8-demandes-dabsence--indisponibilité)
- [9. Fiche détail utilisateur](#9-fiche-détail-utilisateur)
- [10. Véhicules affectables aux utilisateurs terrain](#10-véhicules-affectables-aux-utilisateurs-terrain)
- [11. Accès et permissions de la page Utilisateurs](#11-accès-et-permissions-de-la-page-utilisateurs)
- [12. Actions disponibles](#12-actions-disponibles)
- [13. Éléments exclus de l'Alpha](#13-éléments-exclus-de-lalpha)
- [14. Évolutions futures / à ne pas oublier](#14-évolutions-futures--à -ne-pas-oublier)
- [15. Points à confirmer](#15-points-à -confirmer)

---

## 1. Objectif de la page

La page **Utilisateurs** permet de gérer les utilisateurs rattachés à une société dans Ambulance Manager.

Elle doit permettre de :

- consulter les utilisateurs ;
- créer un utilisateur ;
- modifier un utilisateur ;
- gérer le rôle principal ;
- gérer le multi-rôle ;
- gérer les permissions fines ;
- gérer le statut du compte ;
- gérer l'archivage ;
- gérer le rattachement à une base / dépôt ;
- gérer les demandes d'absence ou d'indisponibilité ;
- gérer les véhicules affectables pour les utilisateurs terrain.

La page doit rester orientée gestion opérationnelle.  
Elle ne doit pas devenir une fiche RH complète en Alpha.

---

## 2. Principes généraux validés

La page Utilisateurs V1 / Alpha repose sur les principes suivants :

- un utilisateur appartient à une société ;
- la société de rattachement est liée automatiquement au contexte courant ;
- un utilisateur possède un rôle principal obligatoire ;
- le multi-rôle est intégré dès l'Alpha ;
- un utilisateur peut avoir au maximum 3 rôles ;
- les permissions fines sont modifiables par les profils autorisés ;
- il n'y a pas de suppression physique d'un utilisateur ;
- les actions sensibles sont soumises à permissions ;
- les actions sensibles doivent être traçables dans l'audit ;
- Admin et Gérant peuvent gérer toutes les permissions dédiées au module Utilisateurs en Alpha.

---

## 3. Liste des utilisateurs

### 3.1 Objectif de la liste

La liste des utilisateurs doit permettre d'identifier rapidement les personnes de la société, leur rôle, leur état, leur rattachement et les actions disponibles.

Elle doit rester lisible et exploitable.

### 3.2 Colonnes validées

La liste Utilisateurs V1 affiche les informations suivantes :

- identité ;
- rôle principal et rôles complémentaires ;
- statut du compte ;
- état opérationnel ;
- base / dépôt ;
- contact ;
- actions.

### 3.3 Identité

L'identité est affichée avec :

- un avatar à initiales ;
- le nom ;
- le prénom.

Affichage attendu :

```text
[Initiales]  NOM
             Prénom
```

Règle validée :

- les initiales sont choisies manuellement lors de la création ;
- elles ne sont pas forcément les premières lettres du prénom et du nom.

Exemple :

```text
[NA]  ARCHENOUL
      Nathan
```

### 3.4 Rôles affichés

La liste doit afficher :

- le rôle principal ;
- les rôles complémentaires si l'utilisateur en possède.

Le multi-rôle est prévu dès l'Alpha.

Exemple :

```text
Rôle principal : ADE
Rôle complémentaire : Bureau
```

### 3.5 Statut du compte

La liste affiche le statut du compte :

- actif ;
- inactif.

Un utilisateur inactif ne peut pas se connecter.

### 3.6 État opérationnel

La liste affiche l'état opérationnel :

- présent ;
- absent ;
- indisponible ;
- non planifié.

Le calcul exact de cet état sera confirmé avec les fiches Planning, Heures et Absences / indisponibilités.

### 3.7 Base / dépôt

La liste affiche la base ou le dépôt de rattachement de l'utilisateur si applicable.

Les règles exactes de rattachement restent à confirmer :

- base principale unique ;
- multi-base éventuel ;
- impact sur le planning ;
- impact sur les droits de visibilité.

### 3.8 Contact

L'email et le téléphone sont affichés dans une même colonne.

Affichage attendu :

```text
email@exemple.fr
06 XX XX XX XX
```

L'email sert à la connexion.

### 3.9 Actions

Les actions disponibles dépendent des permissions.

Actions principales :

- consulter la fiche ;
- modifier ;
- modifier / réinitialiser le mot de passe ;
- désactiver ;
- réactiver ;
- archiver ;
- désarchiver / restaurer ;
- gérer les demandes d'absence / indisponibilité selon permissions.

### 3.10 Recherche et filtres

La liste doit prévoir des recherches et filtres simples :

- recherche par nom ;
- recherche par prénom ;
- recherche par email ;
- filtre par rôle ;
- filtre par statut du compte ;
- filtre par état opérationnel ;
- filtre par base / dépôt ;
- filtre pour afficher les utilisateurs archivés.

Pas de filtre complexe en Alpha.

---

## 4. Création d'un utilisateur

### 4.1 Objectif

La création utilisateur permet à un Admin, Gérant ou utilisateur autorisé de créer un compte exploitable dans Ambulance Manager.

Il n'y a pas d'inscription libre.

### 4.2 Champs d'identité

Champs validés :

- nom ;
- prénom ;
- initiales d'avatar.

Les initiales sont choisies manuellement.

### 4.3 Champs de contact

Champs validés :

- email ;
- téléphone.

L'email est obligatoire, car il sert à la connexion.

### 4.4 Rôles

La création utilisateur doit permettre de définir :

- un rôle principal obligatoire ;
- jusqu'à 2 rôles complémentaires ;
- maximum 3 rôles au total.

Un utilisateur ne peut pas être créé sans rôle principal.

### 4.5 Permissions fines

La création doit permettre de gérer les permissions fines si l'utilisateur créateur est autorisé.

Les permissions doivent être compréhensibles et regroupées par module.

### 4.6 Statut du compte

À la création, le compte peut être :

- actif ;
- inactif.

Un compte inactif ne peut pas se connecter.

### 4.7 Rattachement

La création doit gérer :

- la société automatiquement liée au contexte courant ;
- la base / dépôt si applicable.

### 4.8 Mot de passe initial

En Alpha, le mot de passe initial est défini manuellement par Admin / Gérant.

Règles :

- aucun utilisateur ne s'inscrit seul ;
- l'utilisateur se connecte ensuite avec email + mot de passe ;
- le mot de passe ne doit jamais être affiché en clair après création.

L'option de mot de passe temporaire généré automatiquement est reportée en évolution future.

---

## 5. Modification d'un utilisateur

### 5.1 Objectif

La modification utilisateur permet de faire évoluer un compte sans supprimer son historique.

### 5.2 Informations modifiables

Les éléments suivants peuvent être modifiés par un profil autorisé :

- nom ;
- prénom ;
- initiales d'avatar ;
- email ;
- téléphone ;
- rôle principal ;
- rôles complémentaires ;
- permissions fines ;
- statut actif / inactif ;
- base / dépôt ;
- véhicules affectables pour les utilisateurs terrain.

### 5.3 Email

L'email sert d'identifiant de connexion.

Règles :

- l'email peut être modifié uniquement par un utilisateur autorisé ;
- le nouvel email devient l'identifiant de connexion ;
- l'email ne doit pas créer de doublon ;
- la modification doit être traçable dans l'audit.

### 5.4 Rôles et permissions

La modification doit respecter les règles suivantes :

- rôle principal obligatoire ;
- maximum 3 rôles ;
- jusqu'à 2 rôles complémentaires ;
- permissions fines modifiables ;
- modifications réservées aux profils autorisés ;
- modifications sensibles traçables dans l'audit.

### 5.5 Statut actif / inactif

Un utilisateur actif peut se connecter.

Un utilisateur inactif :

- ne peut plus se connecter ;
- reste visible dans la liste principale ;
- conserve son historique ;
- ne doit pas être proposé pour de nouvelles affectations.

### 5.6 Archivage

Un utilisateur peut être archivé.

Règles validées :

- un utilisateur archivé n'apparaît plus dans la liste courante ;
- il reste visible uniquement via le filtre "utilisateurs archivés" ;
- l'archivage conserve l'historique ;
- l'archivage ne supprime pas les anciennes données ;
- un utilisateur archivé ne doit pas être proposé pour de nouvelles affectations.

### 5.7 Mot de passe

La gestion du mot de passe est une action séparée.

Action validée :

```text
Modifier / réinitialiser le mot de passe
```

Règles :

- action hors formulaire principal ;
- réservée aux utilisateurs autorisés ;
- ancien mot de passe jamais affiché ;
- nouveau mot de passe défini manuellement en Alpha ;
- action traçable dans l'audit.

---

## 6. Statuts utilisateur

La page Utilisateurs distingue trois niveaux de statut.

Ces notions ne doivent pas être mélangées.

### 6.1 Statut du compte

Le statut du compte concerne la connexion.

Statuts :

- actif ;
- inactif.

Règle :

- un utilisateur inactif ne peut pas se connecter.

### 6.2 Archivage

L'archivage concerne la visibilité dans la liste.

Statuts :

- non archivé ;
- archivé.

Règles :

- un utilisateur non archivé est visible dans la liste principale ;
- un utilisateur archivé est masqué de la liste principale ;
- un utilisateur archivé est visible uniquement via le filtre "utilisateurs archivés" ;
- un utilisateur archivé conserve son historique.

### 6.3 État opérationnel

L'état opérationnel concerne l'activité, le planning, les absences ou les indisponibilités.

États validés :

- présent ;
- absent ;
- indisponible ;
- non planifié.

Règles :

- un utilisateur actif peut être absent ;
- un utilisateur non planifié n'est pas automatiquement absent ;
- une demande en attente ne modifie pas l'état opérationnel ;
- une demande validée peut rendre l'utilisateur absent ou indisponible ;
- le calcul précis sera confirmé avec Planning, Heures et Absences / indisponibilités.

---

## 7. Rôles, multi-rôle et permissions

### 7.1 Rôle principal

Chaque utilisateur possède obligatoirement un rôle principal.

Le rôle principal sert à :

- identifier la fonction principale ;
- orienter l'affichage ;
- proposer des permissions par défaut ;
- adapter le tableau de bord ;
- faciliter la lecture dans les listes.

### 7.2 Multi-rôle

Le multi-rôle est intégré dès l'Alpha.

Règles validées :

- maximum 3 rôles par utilisateur ;
- 1 rôle principal obligatoire ;
- jusqu'à 2 rôles complémentaires.

Exemples :

```text
ADE + Bureau
Régulateur + Bureau
Gérant + Bureau
```

### 7.3 Permissions fines

Les permissions fines sont modifiables par les profils autorisés.

Elles doivent être :

- groupées par module ;
- lisibles ;
- compréhensibles ;
- réellement appliquées côté accès ;
- non limitées à un simple affichage interface.

### 7.4 Sécurité des permissions

Règles validées :

- la modification des rôles est réservée aux profils autorisés ;
- la modification des permissions fines est réservée aux profils autorisés ;
- aucun utilisateur ne peut s'accorder seul des droits supérieurs ;
- les permissions doivent être appliquées côté serveur / accès réel ;
- les changements sensibles doivent être tracés dans l'audit.

### 7.5 Admin / Gérant en Alpha

En Alpha, les profils Admin et Gérant peuvent gérer toutes les permissions dédiées au module Utilisateurs.

Cela inclut :

- création ;
- modification générale ;
- modification des rôles ;
- modification des permissions fines ;
- réinitialisation du mot de passe ;
- désactivation ;
- réactivation ;
- archivage ;
- consultation des archivés ;
- demandes d'absence / indisponibilité ;
- validation / refus des demandes ;
- accès aux informations sensibles.

### 7.6 Conflits entre rôles et permissions

Les règles exactes de conflit entre rôles et permissions restent à confirmer si nécessaire.

Principe provisoire :

- les rôles donnent une base ;
- les permissions fines permettent d'ajouter ou retirer des droits ;
- les permissions finales réellement enregistrées déterminent les accès.

---

## 8. Demandes d'absence / indisponibilité

### 8.1 Principe général

La page Utilisateurs prévoit un workflow de demande d'absence ou d'indisponibilité.

Un utilisateur peut créer une demande.  
La demande doit ensuite être validée ou refusée par Admin, Gérant ou utilisateur autorisé.

### 8.2 Types de demandes

Un utilisateur peut demander :

- une absence ;
- une indisponibilité.

Une demande peut concerner :

- une journée ;
- une période ;
- un créneau horaire.

### 8.3 Statuts d'une demande

Statuts validés :

- en attente ;
- validée ;
- refusée ;
- annulée.

### 8.4 Effet sur l'état opérationnel

Règles :

- une demande en attente ne modifie pas l'état opérationnel ;
- une demande refusée n'impacte pas l'état opérationnel ;
- une demande annulée n'impacte pas l'état opérationnel ;
- une demande validée peut rendre l'utilisateur absent ou indisponible.

### 8.5 Validation

Les demandes sont validées par :

- Admin ;
- Gérant ;
- utilisateur autorisé.

Actions possibles :

- consulter les demandes ;
- valider ;
- refuser ;
- annuler selon statut et permissions.

### 8.6 Impact planning

Une demande validée doit être prise en compte par le planning.

À confirmer dans la fiche Planning :

- blocage strict ou alerte ;
- comportement si l'utilisateur est déjà planifié ;
- comportement si le planning est déjà publié ;
- affichage du conflit ;
- traçabilité de l'impact.

### 8.7 Limites Alpha

Non prévu en Alpha :

- compteur de congés ;
- paie ;
- validation multi-niveaux ;
- dossier RH avancé ;
- justificatifs obligatoires.

---

## 9. Fiche détail utilisateur

### 9.1 Principe

La fiche détail utilisateur permet de consulter les informations d'un utilisateur sans être directement en mode modification.

La fiche distingue :

- mode consultation ;
- mode modification.

Le mode modification est accessible uniquement si autorisé.

### 9.2 En-tête de fiche

L'en-tête affiche :

- avatar avec initiales ;
- nom ;
- prénom ;
- rôle principal ;
- rôles complémentaires ;
- statut du compte ;
- état opérationnel ;
- base / dépôt ;
- actions principales selon permissions.

### 9.3 Informations générales

La fiche affiche :

- nom ;
- prénom ;
- initiales ;
- email ;
- téléphone ;
- société ;
- base / dépôt ;
- statut du compte ;
- état opérationnel.

La société est affichée comme information de contexte.  
Elle n'est pas modifiée librement depuis la fiche utilisateur.

### 9.4 Rôles et permissions

La fiche affiche :

- rôle principal ;
- rôles complémentaires ;
- nombre de rôles utilisés sur 3 ;
- résumé des permissions principales ;
- accès à la modification fine des permissions si autorisé.

### 9.5 Statuts

La fiche doit afficher séparément :

- statut du compte ;
- archivage ;
- état opérationnel.

Ces statuts doivent rester visuellement distincts.

### 9.6 Demandes d'absence / indisponibilité

La fiche utilisateur affiche une section dédiée aux demandes.

Elle peut afficher :

- demandes en attente ;
- prochaines demandes validées ;
- dernières demandes refusées ou annulées si utile ;
- action pour créer une demande ;
- action pour valider ou refuser si autorisé.

### 9.7 Véhicules affectables

Pour les utilisateurs terrain, la fiche affiche les types de véhicules affectables.

Types validés en Alpha :

- Ambulance ;
- VSL ;
- TAXI ;
- TPMR.

### 9.8 Planning utilisateur

La fiche peut proposer :

- un résumé du planning utilisateur ;
- les prochains créneaux ;
- l'état non planifié si aucun créneau ;
- un accès rapide au planning personnel.

La fiche ne doit pas reproduire toute la page Planning.

### 9.9 Historique récent

La fiche peut afficher un résumé d'historique récent si l'utilisateur connecté est autorisé.

Exemples :

- création du compte ;
- dernière modification importante ;
- changement de rôle ;
- changement de permissions ;
- désactivation ;
- réactivation ;
- archivage ;
- validation ou refus d'une demande.

L'audit complet reste dans la page Audit.

---

## 10. Véhicules affectables aux utilisateurs terrain

### 10.1 Principe Alpha

Pour les utilisateurs terrain, Admin / Gérant ou utilisateur autorisé peut choisir les types de véhicules sur lesquels l'utilisateur peut être affecté.

Option retenue en Alpha :

```text
Option A : choix par types de véhicules uniquement.
```

### 10.2 Types de véhicules

Types validés :

- Ambulance ;
- VSL ;
- TAXI ;
- TPMR.

### 10.3 Affichage

Dans la fiche utilisateur, les véhicules affectables sont affichés sous forme de liste.

Exemple :

```text
Véhicules affectables :
- Ambulance
- VSL
```

En modification, ils peuvent être affichés sous forme de cases à cocher.

### 10.4 Impact planning

Le planning devra tenir compte de ces types de véhicules affectables.

À confirmer dans la fiche Planning :

- simple alerte ;
- blocage strict ;
- filtre de proposition ;
- compatibilité utilisateur / véhicule ;
- comportement en affectation manuelle ;
- comportement en planification automatique ou affectation automatique optimisée.

### 10.5 Évolution future

En version finale, l'Option C est prévue :

```text
Types de véhicules + exceptions par véhicule.
```

Exemple futur :

```text
Autorisé :
- Ambulance
- VSL

Exceptions :
- non affectable sur Ambulance 04
- affectable spécifiquement sur VSL 02
```

---

## 11. Accès et permissions de la page Utilisateurs

### 11.1 Consultation par Admin / Gérant / utilisateur autorisé

Admin, Gérant et utilisateur autorisé peuvent :

- voir tous les utilisateurs de la société ;
- consulter leurs informations ;
- accéder aux actions selon permissions.

### 11.2 Consultation par utilisateur standard

Un utilisateur standard :

- ne voit pas la liste complète des utilisateurs ;
- voit uniquement sa propre fiche ;
- voit ses propres informations ;
- ne peut pas modifier les éléments sensibles sans autorisation.

### 11.3 Permissions dédiées

La page Utilisateurs doit prévoir des permissions dédiées pour :

- consulter les utilisateurs ;
- créer un utilisateur ;
- modifier les informations générales ;
- modifier les rôles ;
- modifier les permissions fines ;
- modifier / réinitialiser le mot de passe ;
- désactiver ;
- réactiver ;
- archiver ;
- consulter les utilisateurs archivés ;
- désarchiver / restaurer ;
- créer une demande d'absence / indisponibilité ;
- consulter les demandes ;
- valider les demandes ;
- refuser les demandes ;
- annuler une demande selon statut et permissions ;
- consulter les informations sensibles.

Les noms techniques exacts des permissions pourront être définis plus tard.  
Le principe fonctionnel est validé.

### 11.4 Informations sensibles

Les informations sensibles doivent dépendre des permissions.

Exemples :

- permissions fines ;
- historique récent ;
- demandes d'absence des autres utilisateurs ;
- futures pièces jointes ;
- futures visites médicales ;
- futurs recyclages de formation.

---

## 12. Actions disponibles

### 12.1 Actions validées

Les actions Utilisateurs V1 / Alpha sont :

- consulter une fiche utilisateur ;
- modifier un utilisateur ;
- modifier / réinitialiser le mot de passe via action séparée ;
- désactiver un utilisateur ;
- réactiver un utilisateur ;
- archiver un utilisateur ;
- afficher les utilisateurs archivés ;
- désarchiver / restaurer un utilisateur ;
- créer une demande d'absence / indisponibilité ;
- valider une demande ;
- refuser une demande ;
- annuler une demande selon statut et permissions.

### 12.2 Règles communes

Règles validées :

- aucune suppression physique ;
- toutes les actions sensibles sont soumises à permissions ;
- Admin / Gérant gèrent toutes les permissions Utilisateurs en Alpha ;
- les actions sensibles sont tracées dans l'audit ;
- désarchiver ne réactive pas automatiquement un compte inactif ;
- une demande en attente n'impacte pas l'état opérationnel.

### 12.3 Désarchiver / restaurer

L'action de désarchivage / restauration est prévue en Alpha.

Règles :

- retire le statut archivé ;
- rend l'utilisateur visible dans la liste principale ;
- ne réactive pas automatiquement le compte ;
- conserve l'historique.

Exemple :

```text
Utilisateur archivé + inactif
→ après désarchivage : visible à nouveau, mais toujours inactif.
```

---

## 13. Éléments exclus de l'Alpha

Ne sont pas prévus dans l'Alpha de la page Utilisateurs :

- suppression physique d'un utilisateur ;
- suppression définitive d'historique ;
- inscription libre ;
- mot de passe temporaire généré automatiquement ;
- première connexion obligatoire ;
- upload de pièces jointes utilisateur ;
- dossier RH complet ;
- contrat de travail ;
- paie ;
- compteur complet de congés ;
- validation RH multi-niveaux ;
- documents salariés complexes ;
- recyclage des formations ;
- visite médicale ;
- exceptions par véhicule précis ;
- gestion mobile dédiée.

---

## 14. Évolutions futures / à ne pas oublier

### 14.1 Pièces jointes dématérialisées

Pour tous les utilisateurs, prévoir plus tard la possibilité d'ajouter des pièces jointes dématérialisées.

Exemples :

- documents administratifs ;
- justificatifs ;
- fichiers internes ;
- documents utiles au suivi utilisateur.

Accès soumis aux permissions.

### 14.2 Mot de passe temporaire / première connexion

À prévoir plus tard :

- génération automatique d'un mot de passe temporaire ;
- obligation de changer le mot de passe à la première connexion ;
- lien d'activation éventuel ;
- expiration du mot de passe temporaire.

### 14.3 Gestion RH avancée

À prévoir plus tard :

- dossier salarié complet ;
- contrat de travail ;
- documents RH ;
- compteur de congés ;
- paie ;
- suivi administratif avancé ;
- validation multi-niveaux.

### 14.4 Page Heure / Horaires

Une future page **Heure** ou **Horaires** devra permettre de renseigner les heures de la journée, avec les pauses.

Le détail sera cadré plus tard.

Ce sujet est potentiellement à placer en Beta.

### 14.5 Recyclage des formations

Pour les utilisateurs terrain, prévoir potentiellement en Beta :

- suivi des formations ;
- dates de validité ;
- dates de renouvellement ;
- statut à jour / bientôt expiré / expiré ;
- alertes avant échéance.

### 14.6 Visite médicale

Pour les utilisateurs terrain, prévoir potentiellement en Beta :

- date de dernière visite médicale ;
- date de prochaine visite ;
- statut à jour / bientôt expiré / expiré ;
- alertes avant échéance.

### 14.7 Véhicules affectables avancés

En version finale, prévoir l'Option C :

- types de véhicules affectables ;
- exceptions par véhicule précis.

### 14.8 Expérience mobile

La gestion mobile interviendra probablement après clôture de la Beta.

Elle sera vraisemblablement traitée comme une Alpha dédiée à l'application mobile ou à l'app web mobile.

Points à prévoir plus tard :

- consultation de sa fiche utilisateur sur mobile ;
- création de demande d'absence / indisponibilité depuis mobile ;
- lecture simplifiée des informations personnelles ;
- accès rapide au planning personnel ;
- interface adaptée terrain.

---

## 15. Points à confirmer

Les points suivants restent à confirmer dans les fiches futures ou lors d'un cadrage dédié :

- calcul exact de l'état présent / absent / indisponible / non planifié ;
- lien exact entre état opérationnel, Planning, Heures et Absences ;
- règle de rattachement base / dépôt : unique ou multiple ;
- impact exact de la base / dépôt sur les droits et le planning ;
- règles exactes de conflit entre rôles et permissions ;
- noms techniques définitifs des permissions ;
- comportement planning en cas d'absence ou d'indisponibilité validée ;
- blocage strict ou alerte en cas d'affectation incompatible ;
- comportement si l'utilisateur est déjà planifié au moment d'une demande validée ;
- comportement si le planning est déjà publié ;
- impact exact des véhicules affectables dans le Planning ;
- impact exact des véhicules affectables dans la planification automatique ou l'affectation automatique optimisée ;
- nom définitif de la future page Heure / Horaires.
