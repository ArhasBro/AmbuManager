# Ambulance Manager — LISTE_FONCTIONNALITES_V1.1

> Statut : référence fonctionnelle cible — page non validée à ce stade.
> Ce document est une synthèse fonctionnelle cible et ne vaut pas validation finale des pages.

Version : V1.1 (MASTER)  
Date : 18/05/2026

## SOMMAIRE

- [1. Vision du projet](#1-vision-du-projet)
- [2. Login](#2-login)
- [3. Tableau de bord](#3-tableau-de-bord)
- [4. Planning](#4-planning)
- [5. Utilisateurs](#5-utilisateurs)
- [6. Véhicules](#6-véhicules)
- [7. Suivi des véhicules](#7-suivi-des-véhicules)
- [8. Modèles horaires](#8-modèles-horaires)
- [9. Société](#9-société)
- [10. Dépôts / Bases](#10-dépôts--bases)
- [11. Mise en route](#11-mise-en-route)
- [12. Audit](#12-audit)
- [13. Pages / modules futurs identifiés](#13-pages--modules-futurs-identifiés)
- [14. Points à confirmer](#14-points-à -confirmer)

---

## 1. Vision du projet

Ambulance Manager est un SaaS de gestion opérationnelle pour société de transport sanitaire.

Le produit vise un fonctionnement multi-tenant strict, avec cloisonnement par société.

Le périmètre V1 / Alpha est centré sur :

- authentification ;
- tableau de bord ;
- utilisateurs ;
- véhicules ;
- suivi des véhicules ;
- modèles horaires ;
- planning manuel métier ;
- société ;
- dépôts / bases ;
- mise en route ;
- audit / traçabilité.

Les modules avancés restent prévus plus tard lorsqu'ils sont explicitement indiqués comme Beta, version mobile, version finale ou très long terme.

Rôles fonctionnels à prendre en compte :

- Admin ;
- Gérant ;
- ADE ;
- AA ;
- PSC1 ;
- TAXI ;
- Bureau ;
- Régulateur si utile plus tard ;
- Support propriétaire si cadré techniquement.

Règle de prudence :

> Toute information non validée doit rester marquée : INFORMATION NON FOURNIE — À CONFIRMER.

---

## 2. Login

La page **Login** permet l'accès sécurisé à l'application.

Périmètre V1 / Alpha :

- connexion email + mot de passe ;
- pas d'inscription libre ;
- pas de mot de passe oublié en V1 ;
- pas de choix manuel de rôle, société ou dépôt / base ;
- redirection vers Tableau de bord après connexion ;
- chargement de la session, du rôle principal, de la société et des permissions ;
- erreurs sobres et sécurisées ;
- blocage si compte inactif, absence de société valide ou absence de rôle valide ;
- bouton de connexion désactivé si email ou mot de passe vide ;
- champ mot de passe masqué avec option afficher / masquer ;
- redirection vers Login si accès sans session.

Évolutions futures :

- mot de passe oublié ;
- première connexion ;
- double authentification ;
- SSO ;
- accès support renforcé ;
- sécurité avancée ;
- multi-société avancée ;
- expérience mobile.

---

## 3. Tableau de bord

La page **Tableau de bord** est la page d'accueil après connexion.

Périmètre V1 / Alpha :

- tableau de bord personnalisable simplement par utilisateur ;
- widgets prédéfinis selon rôles et permissions ;
- raccourcis vers les pages principales ;
- KPI simples sous forme de tuiles ;
- informations planning simples ;
- widgets Planning personnel / terrain ;
- widgets Planning global équipes ;
- widgets informations / alertes simples ;
- possibilité de choisir les widgets visibles parmi une liste autorisée ;
- possibilité de choisir des raccourcis favoris ;
- retour à une disposition par défaut selon profil ;
- préférences enregistrées par utilisateur.

Exclusions Alpha :

- graphiques complexes ;
- reporting analytique avancé ;
- centre de notifications avancé ;
- moteur d'alertes complexe ;
- prédictions.

Pages accessibles en raccourci selon permissions :

- Planning ;
- Utilisateurs ;
- Véhicules ;
- Suivi des véhicules si disponible ;
- Modèles horaires ;
- Société ;
- Dépôts / Bases ;
- Mise en route ;
- Audit.

---

## 4. Planning

La page **Planning** est un planning manuel métier, centré sur les affectations synthétiques.

Périmètre V1 / Alpha :

- aucune vue détaillée heure par heure ;
- fonctionnement par modèles horaires, types d'affectation, semaines et repères synthétiques ;
- vue globale annuelle utilisateurs × semaines ;
- affichage du modèle horaire ou type affecté dans chaque case ;
- vue personnelle type agenda synthétique ;
- vue mois claire pour l'organisation personnelle ;
- vue semaine synthétique ;
- vue jour synthétique ;
- distinction lecture simple / gestion selon permissions ;
- annotations légères pour jour férié, samedi, dimanche et week-end complet ;
- case avec fond blanc et libellé dans un badge coloré ;
- états simples : REPOS, ABSENT, INDISPONIBLE, NON PLANIFIÉ, À AFFECTER ;
- création par utilisateur + semaine + modèle / type / état ;
- préparation hebdomadaire des besoins à couvrir ;
- checklist des besoins : À couvrir, Couvert, Incomplet, Non affecté, À vérifier ;
- affectation manuelle des utilisateurs ;
- affectation manuelle des véhicules ;
- publication principale par semaine ;
- modification après publication avec traçabilité obligatoire ;
- annulation logique sans suppression physique après publication ;
- motif obligatoire pour annulation après publication et modification sensible ;
- filtres, recherche rapide et panneau de détail ;
- alertes simples et conflits évidents en mode gestion ;
- affichage du nombre d'utilisateurs terrain disponibles ;
- audit des actions importantes.

Termes français retenus :

- Autoschedule → Planification automatique ;
- Matching automatique → Affectation automatique optimisée.

Ces fonctions avancées sont prévues pour la Beta, pas comme cœur du Planning Alpha.

Points liés :

- distinction TPMR VSL / TPMR TAXI à prendre en compte ;
- gestion avancée des heures reportée à une page Heures / Horaires, prévue pour l'Alpha mobile.

---

## 5. Utilisateurs

La page **Utilisateurs** permet de gérer les utilisateurs rattachés à une société.

Périmètre V1 / Alpha :

- création utilisateur ;
- modification utilisateur ;
- nom ;
- prénom ;
- initiales d'avatar choisies manuellement ;
- email ;
- téléphone ;
- rôle principal obligatoire ;
- multi-rôle avec maximum 3 rôles ;
- permissions fines ;
- statut actif / inactif ;
- rattachement société automatique ;
- base / dépôt si applicable ;
- mot de passe initial défini manuellement par Admin / Gérant ;
- action séparée de modification / réinitialisation du mot de passe ;
- archivage logique ;
- consultation des utilisateurs archivés via filtre ;
- demandes d'absence / indisponibilité ;
- statuts de demande : en attente, validée, refusée, annulée ;
- validation / refus par Admin, Gérant ou utilisateur autorisé ;
- actions sensibles tracées dans l'audit.

Règles importantes :

- une demande en attente ne modifie pas automatiquement l'état opérationnel ;
- une demande validée peut rendre l'utilisateur absent ou indisponible ;
- un utilisateur standard voit uniquement sa propre fiche pour le moment ;
- Admin / Gérant et utilisateurs autorisés voient les utilisateurs selon périmètre société ;
- les utilisateurs terrain peuvent avoir des types de véhicules affectables.

Types de véhicules affectables Alpha :

- Ambulance ;
- VSL ;
- TAXI ;
- TPMR.

Évolutions futures :

- mot de passe temporaire avec première connexion ;
- véhicules affectables + exceptions par véhicule ;
- formations / recyclage ;
- visite médicale ;
- gestion avancée des heures dans page dédiée ;
- expérience mobile.

---

## 6. Véhicules

La page **Véhicules** est le référentiel administratif de la flotte.

Périmètre V1 / Alpha :

- liste des véhicules ;
- création véhicule ;
- modification véhicule ;
- fiche détail véhicule ;
- nom interne personnalisable ;
- marque ;
- modèle ;
- type obligatoire ;
- immatriculation obligatoire ;
- statut administratif actif / inactif ;
- disponibilité générale disponible / indisponible ;
- base / dépôt principal ;
- commentaire interne simple si utile ;
- désactivation ;
- réactivation ;
- archivage ;
- consultation des archivés ;
- désarchivage / restauration ;
- aucune suppression physique ;
- lecture simple pour les utilisateurs terrain ;
- actions sensibles tracées dans l'audit.

Types principaux :

- AMBULANCE ;
- VSL ;
- TAXI ;
- TPMR.

Pour TPMR, une distinction métier doit être prévue lorsque nécessaire :

- TPMR VSL ;
- TPMR TAXI.

Règles importantes :

- un véhicule inactif, indisponible ou archivé n'est pas proposé normalement au Planning ;
- la base / dépôt du véhicule est une information de référence, pas une contrainte bloquante ;
- un véhicule peut ne pas rentrer à sa base principale le soir ;
- les workflows de vérification, désinfection, anomalies et entretiens relèvent de Suivi des véhicules.

---

## 7. Suivi des véhicules

La page **Suivi des véhicules** centralise le suivi opérationnel de la flotte.

Onglets V1 / Alpha :

- Vue d'ensemble ;
- Vérifications ;
- Désinfections ;
- Anomalies des véhicules.

L'onglet **Entretiens des véhicules** est prévu au minimum pour la Beta, pas dans l'Alpha.

### Vérifications

Règles validées :

- ambulance : 2 vérificateurs ;
- autres véhicules : 1 vérificateur ;
- fréquence quotidienne ;
- absence de vérification quotidienne → anomalie majeure d'office ;
- résultats : Conforme, Non conforme, Sous réserve, À vérifier ;
- Non conforme → anomalie bloquante ;
- pas d'indisponibilité automatique ;
- passage indisponible uniquement par action explicite autorisée.

Règles ARS exactes :

- INFORMATION NON FOURNIE — À CONFIRMER.

### Désinfections

Règles validées :

- formulaire avec type de produit utilisé ;
- résultat "Réalisée avec réserve" → point à surveiller ;
- résultat "Non réalisée" ou "À refaire" → motif obligatoire ;
- fréquence / déclenchement : quotidienne, après utilisation / transport, après certains transports spécifiques, manuel selon besoin ;
- contre-vérification par un tiers autre que la personne ayant réalisé la désinfection ;
- pas d'indisponibilité automatique.

Règles ARS exactes :

- INFORMATION NON FOURNIE — À CONFIRMER.

### Anomalies

Règles validées :

- sources : déclaration manuelle, vérification, désinfection, vérification quotidienne non faite, autre ;
- statuts : ouverte, en cours de traitement, résolue, annulée / classée sans suite ;
- criticités : non bloquante, bloquante, majeure ;
- utilisateurs terrain peuvent déclarer ;
- clôture / classement / changement disponibilité soumis à permission ;
- motif obligatoire pour rendre un véhicule indisponible ou disponible ;
- aucune suppression physique d'anomalie en Alpha.

---

## 8. Modèles horaires

La page **Modèles horaires** remplace fonctionnellement l'ancien terme Templates.

Périmètre V1 / Alpha :

- liste des modèles horaires ;
- création ;
- modification ;
- duplication ;
- désactivation ;
- réactivation ;
- archivage ;
- consultation des archivés ;
- désarchivage / restauration ;
- aucune suppression physique ;
- nom complet de gestion ;
- libellé court Planning ;
- type de véhicule ;
- horaires ;
- composition attendue ;
- base / dépôt facultative ;
- statut ;
- compteur "Nb utilisé" ;
- actions sensibles tracées dans l'audit.

Règles Planning :

- un modèle sert de base de création pour une affectation Planning ;
- une affectation créée reste indépendante du modèle ;
- modifier un modèle ne modifie pas automatiquement les affectations déjà créées ;
- seuls les modèles actifs et non archivés sont proposés normalement ;
- le compteur "Nb utilisé" augmente quand une affectation est créée depuis le modèle.

Jours actifs et horaires par jour :

- un modèle peut définir facultativement les jours où il est actif ;
- un modèle peut définir des horaires différents selon les jours ;
- ces informations restent facultatives pour les modèles génériques ;
- si un modèle avec jours actifs est appliqué à une semaine, les jours travaillés et repos peuvent être déduits automatiquement dans la vue semaine.

Exemple :

- jeudi : 21h → 7h J+1 ;
- vendredi : 21h → 7h J+1 ;
- samedi : 19h → 5h J+1 ;
- dimanche : 19h → 5h J+1 ;
- lundi à mercredi : repos automatiquement déduit.

Distinction TPMR à prévoir :

- TPMR VSL ;
- TPMR TAXI.

La couleur ne doit pas être définie rigidement par le modèle.  
La couleur sert de repère visuel choisi par l'utilisateur qui fait le planning.

---

## 9. Société

La page **Société** est le profil permanent de la société.

Périmètre V1 / Alpha :

- consultation du profil société ;
- mode consultation séparé du mode modification ;
- informations générales ;
- adresse principale ;
- contacts société multiples ;
- paramètres généraux ;
- informations métier confirmées ;
- résumé simple de configuration avec accès "Continuer la mise en route" ;
- responsables applicatifs affichés automatiquement depuis les utilisateurs Admin / Gérant ;
- contact administratif ou représentant légal renseigné manuellement ;
- plusieurs contacts société dès l'Alpha ;
- types de contacts possibles : représentant légal, contact administratif, contact facturation, responsable exploitation ou autre contact utile ;
- modifications sensibles tracées dans l'audit.

Règles importantes :

- un contact société n'est pas automatiquement un utilisateur applicatif ;
- responsables applicatifs non modifiés depuis Société ;
- désactivation, suspension, archivage ou suppression d'une société exclus de l'Alpha ;
- utilisateurs terrain sans accès par défaut à Société.

---

## 10. Dépôts / Bases

La page **Dépôts / Bases** gère les lieux de référence de la société.

Périmètre V1 / Alpha :

- notion simple base / dépôt ;
- pas de distinction technique obligatoire entre Base, Dépôt, Point d'exploitation ou Autre ;
- liste principale ;
- création ;
- modification ;
- responsable local optionnel ;
- compteur utilisateurs rattachés ;
- compteur véhicules rattachés ;
- statut actif / inactif ;
- archivage ;
- consultation des archivés ;
- désarchivage / restauration ;
- aucune suppression physique ;
- actions sensibles tracées dans l'audit.

Règles importantes :

- nom obligatoire et unique dans la société ;
- adresse recommandée mais non obligatoire ;
- responsable local = utilisateur existant, sans permissions automatiques ;
- rattachements principalement gérés depuis Utilisateurs et Véhicules ;
- modification d'un dépôt / base ne détache pas automatiquement les éléments rattachés ;
- base / dépôt guide le Planning mais ne bloque pas automatiquement les affectations ;
- archivage ou désactivation possible même avec rattachements, avec avertissement simple.

---

## 11. Mise en route

La page **Mise en route** remplace l'ancien nom Onboarding.

Elle reste séparée de la page Société.

Périmètre V1 / Alpha :

- assistant / checklist de configuration initiale ;
- suivi d'avancement ;
- accès rapides vers les pages métier ;
- profil société ;
- dépôts / bases ;
- utilisateurs ;
- véhicules ;
- modèles horaires ;
- planning initial ;
- import éventuel non bloquant ;
- vérification finale simple.

Règles importantes :

- Mise en route ne remplace pas les pages métier ;
- Société reste le profil permanent ;
- Mise en route reste l'assistant de configuration initiale ;
- les formulaires complets restent dans les pages concernées ;
- Admin / Gérant par défaut ;
- utilisateur autorisé si permission dédiée ;
- utilisateurs terrain sans accès par défaut.

Statuts possibles :

- À faire ;
- En cours ;
- Complété ;
- À vérifier ;
- Ignoré / reporté si utile.

---

## 12. Audit

La page **Audit** centralise la traçabilité des actions importantes.

Périmètre V1 / Alpha :

- consultation des événements d'audit ;
- filtre par période ;
- filtre par module ;
- filtre par action ;
- filtre par auteur ;
- filtre par élément concerné ;
- recherche rapide ;
- détail d'une entrée ;
- contrôle d'accès par rôle et permission ;
- cloisonnement société ;
- audit des actions sensibles ;
- audit support renforcé si rôle support utilisé.

Actions tracées selon modules :

- connexions et accès si disponibles ;
- actions utilisateurs ;
- actions véhicules ;
- suivi des véhicules ;
- modèles horaires ;
- société ;
- dépôts / bases ;
- planning ;
- mise en route si applicable.

Règles importantes :

- Audit ne modifie pas les données métier ;
- les pages métier peuvent afficher un historique minimal ;
- Audit centralise la consultation plus complète ;
- informations sensibles masquées selon permissions ;
- accès par défaut Admin / Gérant ;
- permission dédiée pour les autres profils.

---

## 13. Pages / modules futurs identifiés

Modules ou pages futurs à garder en mémoire :

- Heures / Horaires ;
- gestion avancée des heures pour Alpha mobile ;
- planification automatique en Beta ;
- affectation automatique optimisée en Beta ;
- scoring / équilibrage / optimisation plus tard ;
- missions / courses / transports patients en très long terme ;
- régulation opérationnelle temps réel en très long terme ;
- facturation en très long terme ;
- paie / RH avancée en long terme ;
- notifications avancées ;
- confirmation de lecture ;
- version mobile ;
- signature électronique ;
- preuve mobile ;
- maintenance avancée / entretiens véhicules.

---

## 14. Points à confirmer

Points transverses restant à confirmer :

- INFORMATION NON FOURNIE — À CONFIRMER : gestion exacte des années avec semaine 53 et règle de numérotation des semaines.
- INFORMATION NON FOURNIE — À CONFIRMER : comportement exact lors de la publication d'une semaine contenant encore un besoin obligatoire non couvert.
- INFORMATION NON FOURNIE — À CONFIRMER : règles précises de compatibilité entre rôles utilisateurs, modèles horaires et types de véhicules.
- INFORMATION NON FOURNIE — À CONFIRMER : règles exactes de traitement, suivi ou équilibrage des samedis, dimanches, week-ends complets et jours fériés.
- INFORMATION NON FOURNIE — À CONFIRMER : détail exact des informations sensibles visibles ou masquées dans chaque vue Planning selon permissions.
- INFORMATION NON FOURNIE — À CONFIRMER : règles ARS exactes pour vérifications et désinfections.
- INFORMATION NON FOURNIE — À CONFIRMER : formalisation exacte du champ ou sous-type permettant de distinguer TPMR VSL et TPMR TAXI dans le référentiel Véhicules.
- INFORMATION NON FOURNIE — À CONFIRMER : noms techniques définitifs des permissions par module.
- INFORMATION NON FOURNIE — À CONFIRMER : durée de conservation des événements d'audit.
- INFORMATION NON FOURNIE — À CONFIRMER : périmètre exact des imports en Alpha.

