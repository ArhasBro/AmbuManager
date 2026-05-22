# Ambulance Manager — Fonctionnalités détaillées — Login V1

> Statut : référence fonctionnelle cible — page non validée à ce stade.

Version : V1.1 (MASTER)  
Date : 18/05/2026

## Sommaire

- [1. Objectif de la page](#1-objectif-de-la-page)
- [2. Périmètre V1 validé](#2-perimetre-v1-valide)
- [3. Utilisateurs concernés](#3-utilisateurs-concernes)
- [4. Éléments visibles sur la page](#4-elements-visibles-sur-la-page)
- [5. Fonctionnement de la connexion](#5-fonctionnement-de-la-connexion)
- [6. Session et redirection](#6-session-et-redirection)
- [7. États de la page](#7-etats-de-la-page)
- [8. Messages d'erreur](#8-messages-derreur)
- [9. Sécurité et règles d'accès](#9-securite-et-regles-dacces)
- [10. Éléments exclus du périmètre V1](#10-elements-exclus-du-perimetre-v1)
- [11. Évolutions futures / à ne pas oublier](#11-evolutions-futures--a-ne-pas-oublier)
- [12. Points à confirmer](#12-points-a-confirmer)

---

## 1. Objectif de la page

La page Login est la porte d'entrée de l'application Ambulance Manager.

Elle doit permettre à un utilisateur autorisé de se connecter à son espace applicatif avec une authentification simple, claire et sécurisée.

La page Login ne doit pas porter de logique métier avancée. Elle ne doit pas servir à créer un compte, choisir une société, choisir un rôle ou configurer l'espace de travail.

Son rôle est strictement limité à :

- vérifier l'identité de l'utilisateur ;
- ouvrir une session valide ;
- charger les informations nécessaires à l'accès applicatif ;
- rediriger l'utilisateur vers le Tableau de bord.

La page Login est considérée comme la seule page validée à 100 % à ce stade.

---

## 2. Périmètre V1 validé

Le Login V1 repose uniquement sur une connexion par :

- adresse email ;
- mot de passe.

Fonctionnalités validées pour la V1 :

- affichage d'un formulaire de connexion simple ;
- saisie de l'adresse email ;
- saisie du mot de passe ;
- mot de passe masqué par défaut ;
- possibilité d'afficher ou masquer le mot de passe ;
- bouton de connexion ;
- désactivation du bouton si l'email ou le mot de passe est vide ;
- vérification des identifiants ;
- création d'une session utilisateur ;
- chargement du rôle principal ;
- chargement de la société ;
- chargement des permissions ;
- redirection unique vers le Tableau de bord après connexion réussie ;
- affichage d'un état de chargement pendant la connexion ;
- affichage de messages d'erreur sobres et sécurisés ;
- refus de connexion si le compte est inactif ;
- refus de connexion si aucune société valide n'est disponible ;
- refus de connexion si aucun rôle valide n'est disponible ;
- redirection vers Login si une page protégée est demandée sans session valide.

---

## 3. Utilisateurs concernés

La page Login concerne tous les utilisateurs autorisés à accéder à Ambulance Manager.

Les différences de rôle ne sont pas gérées directement dans la page Login.

La page Login ne doit pas afficher de choix de rôle. Elle ne doit pas demander à l'utilisateur de sélectionner son profil d'accès.

Le rôle principal, la société et les permissions sont chargés après validation des identifiants.

Le Tableau de bord devient ensuite responsable d'adapter l'affichage selon le rôle et les permissions de l'utilisateur connecté.

---

## 4. Éléments visibles sur la page

### 4.1 Zone visuelle

La page peut contenir une zone visuelle destinée à renforcer l'identité produit.

Cette zone peut contenir :

- le nom Ambulance Manager ;
- un visuel professionnel lié au transport sanitaire ;
- une ambiance sobre, médicale et organisationnelle ;
- un court texte de présentation.

Exemple de texte possible :

> Planifiez, organisez et pilotez votre activité de transport sanitaire.

Cette zone ne doit pas contenir d'action métier.

### 4.2 Formulaire de connexion

Le formulaire de connexion doit contenir :

- un titre clair, par exemple `Connexion` ;
- un champ `Adresse email` ;
- un champ `Mot de passe` ;
- une action afficher / masquer le mot de passe ;
- un bouton `Se connecter` ;
- une zone d'affichage des erreurs ;
- un état visuel de chargement pendant la tentative de connexion.

### 4.3 Éléments à ne pas afficher en V1

La page Login V1 ne doit pas afficher :

- de lien `Créer un compte` ;
- de lien `Mot de passe oublié` ;
- de bouton Google ;
- de bouton Microsoft ;
- de choix de rôle ;
- de choix de société ;
- de choix de dépôt ou base ;
- de parcours de mise en route ou de première connexion.

---

## 5. Fonctionnement de la connexion

### 5.1 Saisie utilisateur

L'utilisateur renseigne :

- son adresse email ;
- son mot de passe.

Le bouton `Se connecter` reste désactivé tant que l'un des deux champs est vide.

### 5.2 Validation de la tentative de connexion

Au clic sur `Se connecter`, la page doit :

- bloquer les doubles soumissions ;
- afficher un état de chargement ;
- envoyer les identifiants pour vérification ;
- attendre le résultat de l'authentification.

### 5.3 Connexion réussie

En cas de connexion réussie :

- la session utilisateur est créée ;
- le rôle principal est chargé ;
- la société est chargée ;
- les permissions sont chargées ;
- l'utilisateur est redirigé vers le Tableau de bord.

### 5.4 Connexion refusée

La connexion est refusée si :

- les identifiants sont invalides ;
- le compte utilisateur est désactivé ;
- aucune société valide n'est associée à l'utilisateur ;
- aucun rôle valide n'est disponible ;
- une erreur technique empêche la connexion.

La page doit rester sur Login et afficher un message adapté.

---

## 6. Session et redirection

Après une connexion réussie, la redirection V1 est unique :

- tous les utilisateurs connectés arrivent sur le Tableau de bord.

La page Login ne doit pas gérer de redirection différente selon le rôle.

Le Tableau de bord adapte ensuite son contenu selon :

- le rôle principal ;
- les permissions ;
- la société de rattachement ;
- le périmètre d'accès de l'utilisateur.

Si un utilisateur tente d'accéder à une page protégée sans session valide, il est redirigé vers la page Login.

---

## 7. États de la page

La page Login doit prévoir les états suivants :

### 7.1 État initial

- formulaire affiché ;
- champs vides ;
- bouton `Se connecter` désactivé.

### 7.2 Saisie en cours

- l'utilisateur renseigne son email et son mot de passe ;
- le bouton devient disponible lorsque les deux champs sont remplis.

### 7.3 Chargement

- le bouton de connexion indique qu'une tentative est en cours ;
- les doubles clics ou doubles soumissions sont empêchés ;
- les champs ne doivent pas provoquer d'état incohérent pendant la tentative.

### 7.4 Succès

- la connexion est validée ;
- la session est créée ;
- l'utilisateur est redirigé vers le Tableau de bord.

### 7.5 Erreur

- la page reste affichée ;
- le message d'erreur est visible ;
- l'email saisi peut rester présent ;
- le mot de passe peut être vidé pour des raisons de sécurité.

### 7.6 Session expirée

Si l'utilisateur revient au Login après expiration de session, la page peut afficher un message dédié.

---

## 8. Messages d'erreur

Les messages d'erreur doivent rester sobres, clairs et sécurisés.

Ils ne doivent pas exposer d'informations sensibles.

### 8.1 Identifiants invalides

Message validé :

> Identifiants invalides.

Ce message ne doit pas préciser si l'email ou le mot de passe est incorrect.

### 8.2 Compte désactivé

Message validé :

> Votre compte est désactivé. Contactez un administrateur.

### 8.3 Société absente ou invalide

Message recommandé :

> Connexion impossible. Veuillez contacter un administrateur.

### 8.4 Rôle absent ou invalide

Message recommandé :

> Connexion impossible. Veuillez contacter un administrateur.

### 8.5 Problème technique

Message recommandé :

> Connexion impossible. Veuillez réessayer.

### 8.6 Session expirée

Message recommandé :

> Votre session a expiré. Veuillez vous reconnecter.

---

## 9. Sécurité et règles d'accès

La page Login V1 doit respecter les règles suivantes :

- aucun accès à l'application sans session valide ;
- redirection vers Login si accès à une page protégée sans session ;
- mot de passe masqué par défaut ;
- option afficher / masquer le mot de passe ;
- bouton `Se connecter` désactivé si email ou mot de passe vide ;
- blocage de connexion si le compte utilisateur est inactif ;
- blocage de connexion si la société est absente ou invalide ;
- blocage de connexion si le rôle est absent ou invalide ;
- erreurs sobres ne révélant pas d'information sensible ;
- absence d'inscription libre ;
- absence de sélection manuelle du rôle ;
- absence de sélection manuelle de société ;
- absence de sélection manuelle de dépôt ou base.

---

## 10. Éléments exclus du périmètre V1

Les éléments suivants sont exclus du périmètre Login V1 :

- inscription libre ;
- création de compte depuis la page Login ;
- mot de passe oublié ;
- réinitialisation autonome du mot de passe ;
- première connexion avec mot de passe temporaire ;
- double authentification ;
- connexion SSO ;
- connexion Google ;
- connexion Microsoft ;
- sélection manuelle du rôle ;
- sélection manuelle de société ;
- sélection manuelle de dépôt ou base ;
- choix d'environnement ;
- mise en route ou première configuration depuis la page Login.

Ces éléments ne doivent pas être codés dans la V1 de cette page.

---

## 11. Évolutions futures / à ne pas oublier

Cette section sert de mémoire produit.

Les éléments listés ici ne font pas partie du périmètre V1 validé.

### 11.1 Mot de passe oublié

À prévoir plus tard :

- demande de réinitialisation par email ;
- lien temporaire ;
- expiration du lien ;
- changement sécurisé du mot de passe ;
- confirmation après modification.

### 11.2 Première connexion

À prévoir plus tard :

- mot de passe temporaire ;
- obligation de définir un mot de passe définitif ;
- acceptation éventuelle de conditions d'utilisation ;
- contrôle de sécurité au premier accès.

### 11.3 Double authentification

À prévoir plus tard, surtout pour les profils sensibles :

- Admin ;
- Gérant ;
- Support.

Méthodes possibles à cadrer ultérieurement :

- code par email ;
- application d'authentification ;
- autre méthode sécurisée.

### 11.4 SSO / connexion externe

À prévoir plus tard :

- connexion Google ;
- connexion Microsoft ;
- connexion via fournisseur professionnel.

### 11.5 Multi-société avancé

À prévoir plus tard si un même utilisateur peut accéder à plusieurs sociétés.

Dans ce cas, un choix d'espace de travail après connexion pourra être étudié.

### 11.6 Accès support renforcé

À prévoir plus tard :

- accès support propriétaire ;
- séparation claire entre support interne et utilisateurs client ;
- traçabilité renforcée ;
- visibilité contrôlée côté client.

### 11.7 Sécurité avancée

À prévoir plus tard :

- verrouillage après trop d'échecs ;
- alerte en cas de connexion suspecte ;
- historique des connexions ;
- règles de mot de passe renforcées ;
- contrôle d'activité de session.

### 11.8 Expérience mobile de l'app web finale

Une version mobile de l'application web est prévue en version finale.

Pour Login, il faudra prévoir plus tard :

- affichage adapté aux smartphones ;
- formulaire lisible sur petit écran ;
- saisie rapide ;
- accessibilité du bouton de connexion ;
- affichage propre des erreurs ;
- cohérence avec l'expérience desktop.

L'expérience mobile n'est pas intégrée au périmètre V1 de cette page, sauf validation explicite ultérieure.

---

## 12. Points à confirmer

Aucun point bloquant à confirmer pour le périmètre V1 validé de la page Login.

Les éléments listés dans les évolutions futures devront être cadrés dans des documents ou sessions dédiées avant toute implémentation.

