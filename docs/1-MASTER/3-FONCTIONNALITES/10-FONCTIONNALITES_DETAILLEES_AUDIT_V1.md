# Ambulance Manager — Fonctionnalités détaillées — Audit V1

> Statut : référence fonctionnelle cible — page non validée à ce stade.

Version : V1 (MASTER)  
Date : 18/05/2026

## Sommaire

- [1. Objectif de la page](#1-objectif-de-la-page)
- [2. Positionnement fonctionnel](#2-positionnement-fonctionnel)
- [3. Utilisateurs concernés](#3-utilisateurs-concernés)
- [4. Structure générale de la page](#4-structure-générale-de-la-page)
- [5. Entrée d'audit](#5-entrée-daudit)
- [6. Actions tracées par module](#6-actions-tracées-par-module)
- [7. Filtres et recherche](#7-filtres-et-recherche)
- [8. Visibilité et confidentialité](#8-visibilité-et-confidentialité)
- [9. Permissions et accès](#9-permissions-et-accès)
- [10. Audit support](#10-audit-support)
- [11. Historique minimal dans les pages métier](#11-historique-minimal-dans-les-pages-métier)
- [12. Éléments exclus de l'Alpha](#12-éléments-exclus-de-lalpha)
- [13. Évolutions futures / à ne pas oublier](#13-évolutions-futures--à -ne-pas-oublier)
- [14. Points à confirmer](#14-points-à -confirmer)

---

## 1. Objectif de la page

La page **Audit** centralise la traçabilité des actions importantes réalisées dans Ambulance Manager.

Elle sert à répondre aux questions suivantes :

- qui a fait une action ;
- quand l'action a été faite ;
- sur quel module ;
- sur quel élément ;
- quelle action a été réalisée ;
- quelles informations importantes ont été modifiées ;
- quel motif a été renseigné si un motif était obligatoire ou utile.

La page **Audit** ne sert pas à modifier les données métier.  
Elle sert uniquement à consulter, filtrer et contrôler les traces disponibles.

---

## 2. Positionnement fonctionnel

La page **Audit** est une page transversale.

Elle ne remplace pas les historiques minimaux visibles dans certaines pages métier.

Exemples :

- le Planning peut afficher un historique minimal dans le détail d'une affectation ;
- les Véhicules peuvent afficher un historique récent si autorisé ;
- le Suivi des véhicules peut afficher les actions liées aux vérifications, désinfections et anomalies ;
- la page Audit permet une consultation plus globale et filtrable.

Règle fonctionnelle :

> Les pages métier peuvent afficher un historique minimal utile. La page Audit centralise la traçabilité complète accessible selon permissions.

La page Audit doit rester sobre, claire et exploitable.  
Elle ne doit pas devenir un outil d'analyse complexe en Alpha.

---

## 3. Utilisateurs concernés

### 3.1 Utilisateurs principaux

La page Audit concerne principalement :

- Admin ;
- Gérant ;
- utilisateur autorisé à consulter l'audit.

Ces profils peuvent consulter les traces selon leurs permissions.

### 3.2 Utilisateurs terrain

Les utilisateurs terrain n'ont pas accès à la page Audit par défaut.

Ils ne doivent pas voir les journaux détaillés d'actions internes, les motifs sensibles, les actions d'autres utilisateurs ou les informations réservées à la gestion.

### 3.3 Support propriétaire

Si un rôle support propriétaire existe ou intervient dans le projet, ses actions doivent être tracées de manière renforcée.

Les actions support doivent rester visibles selon les règles de confidentialité et de gouvernance validées.

---

## 4. Structure générale de la page

La page Audit V1 / Alpha doit contenir une structure simple.

### 4.1 En-tête

L'en-tête peut afficher :

- titre de la page ;
- description courte ;
- rappel du périmètre consulté ;
- accès aux filtres principaux.

Exemple :

```txt
Audit
Consultez les actions importantes réalisées sur la société courante.
```

### 4.2 Zone de filtres

La zone de filtres permet de réduire la liste des événements.

Filtres principaux à prévoir :

- période ;
- module ;
- type d'action ;
- utilisateur auteur ;
- élément concerné ;
- criticité ou sensibilité si disponible ;
- action support si applicable.

### 4.3 Liste des événements

La liste affiche les entrées d'audit sous forme de tableau ou de liste structurée.

Colonnes possibles :

- date / heure ;
- module ;
- action ;
- auteur ;
- élément concerné ;
- résumé ;
- motif si disponible et autorisé ;
- accès au détail.

### 4.4 Détail d'une entrée

Un panneau ou une vue de détail peut afficher les informations plus complètes d'une entrée d'audit.

Le détail reste soumis aux permissions.

---

## 5. Entrée d'audit

Une entrée d'audit doit contenir les informations nécessaires pour comprendre l'action.

### 5.1 Informations minimales

Une entrée d'audit doit contenir au minimum :

- identifiant de l'événement ;
- date et heure ;
- société concernée ;
- module concerné ;
- type d'action ;
- utilisateur auteur de l'action ;
- élément concerné ;
- résumé lisible de l'action.

### 5.2 Informations complémentaires

Selon le module et l'action, l'entrée peut contenir :

- ancienne valeur ;
- nouvelle valeur ;
- statut précédent ;
- nouveau statut ;
- motif ;
- commentaire ;
- niveau de sensibilité ;
- origine de l'action ;
- indication action support ;
- contexte utile.

### 5.3 Lisibilité

Le résumé d'une entrée d'audit doit être compréhensible.

Exemples :

```txt
Utilisateur modifié : rôle principal changé de AA à ADE.
```

```txt
Planning S21 publié par Gérant.
```

```txt
Véhicule VSL 12 passé indisponible avec motif.
```

L'audit ne doit pas afficher uniquement des données techniques incompréhensibles pour l'utilisateur métier.

---

## 6. Actions tracées par module

Les actions tracées doivent correspondre aux décisions validées dans les fiches métier.

### 6.1 Authentification / accès

Actions à tracer si disponibles :

- connexion réussie ;
- tentative de connexion refusée si utile ;
- blocage lié à compte inactif ;
- blocage lié à absence de société valide ;
- blocage lié à absence de rôle valide.

Règle :

> Les événements d'accès sensibles doivent pouvoir être audités si le périmètre technique le permet.

### 6.2 Utilisateurs

Actions importantes à tracer :

- création d'un utilisateur ;
- modification générale d'un utilisateur ;
- modification du rôle principal ;
- modification des rôles complémentaires ;
- modification des permissions fines ;
- réinitialisation / modification du mot de passe par action autorisée ;
- désactivation ;
- réactivation ;
- archivage ;
- désarchivage / restauration ;
- modification du rattachement société ou base / dépôt si applicable ;
- création d'une demande d'absence / indisponibilité ;
- validation d'une demande d'absence / indisponibilité ;
- refus d'une demande ;
- annulation d'une demande ;
- modification d'une information sensible si autorisée.

### 6.3 Véhicules

Actions importantes à tracer :

- création d'un véhicule ;
- modification des informations générales ;
- changement de statut administratif actif / inactif ;
- changement de disponibilité disponible / indisponible ;
- motif de passage indisponible ou disponible si requis ;
- archivage ;
- désarchivage / restauration ;
- modification du rattachement base / dépôt ;
- modification d'informations de conformité si concerné.

Rappel :

> Un véhicule ne devient pas indisponible automatiquement à cause d'une anomalie, vérification ou désinfection. Le changement de disponibilité reste une action explicite autorisée, avec motif obligatoire en Alpha.

### 6.4 Suivi des véhicules

Actions importantes à tracer :

- création d'une vérification ;
- résultat d'une vérification ;
- vérification conforme ;
- vérification non conforme ;
- vérification sous réserve ;
- vérification à vérifier ;
- création d'une désinfection ;
- résultat de désinfection ;
- désinfection réalisée avec réserve ;
- désinfection non réalisée ;
- désinfection à refaire ;
- contre-vérification si applicable ;
- déclaration d'une anomalie ;
- modification du statut d'une anomalie ;
- modification de la criticité d'une anomalie ;
- résolution d'une anomalie ;
- classement sans suite ;
- passage explicite d'un véhicule indisponible ou disponible depuis le suivi si autorisé.

Les actions critiques doivent conserver l'auteur, la date, le contexte et le motif si requis.

### 6.5 Modèles horaires

Actions importantes à tracer :

- création d'un modèle horaire ;
- modification d'un modèle horaire ;
- modification du libellé court Planning ;
- modification du type de véhicule attendu ;
- modification de la composition attendue ;
- modification de la base / dépôt associée ;
- désactivation ;
- réactivation ;
- archivage ;
- désarchivage / restauration ;
- duplication d'un modèle ;
- utilisation d'un modèle dans le Planning si cette information est remontée dans l'audit.

Point à reprendre lors de la relecture globale :

- jours actifs facultatifs ;
- horaires par jour si différents ;
- impact sur les modèles de garde.

### 6.6 Société

Actions importantes à tracer :

- modification des informations générales ;
- modification de l'adresse principale ;
- ajout / modification / retrait d'un contact société ;
- modification des paramètres généraux ;
- modification d'informations métier importantes ;
- modification d'un contact administratif ou représentant légal ;
- modification d'un contact facturation ou exploitation si applicable.

Rappel :

> Les responsables applicatifs sont affichés automatiquement depuis les utilisateurs Admin / Gérant et ne sont pas modifiés directement depuis Société.

### 6.7 Dépôts / Bases

Actions importantes à tracer :

- création d'une base / dépôt ;
- modification du nom ;
- modification de l'adresse ;
- modification du responsable local ;
- désactivation ;
- réactivation ;
- archivage ;
- désarchivage / restauration.

Rappel :

> Modifier, désactiver ou archiver une base / dépôt ne détache pas automatiquement les utilisateurs, véhicules ou modèles horaires rattachés.

### 6.8 Planning

Actions importantes à tracer :

- création d'une affectation Planning ;
- modification d'une affectation ;
- vidage / suppression d'une affectation en brouillon si tracé ;
- préparation ou modification des besoins hebdomadaires ;
- publication d'une semaine ;
- modification après publication ;
- annulation logique après publication ;
- changement de modèle ;
- changement d'utilisateur ;
- changement de véhicule ;
- changement d'état : REPOS, ABSENT, INDISPONIBLE, NON PLANIFIÉ, À AFFECTER ;
- changement de statut : Brouillon, Publié, Modifié après publication, Annulé, À vérifier ;
- modification sensible après publication avec motif ;
- action réalisée malgré une alerte forte si cette logique est prévue.

Rappel :

> Après publication, toute modification importante doit être tracée. Les motifs sont obligatoires pour les annulations après publication et les modifications sensibles.

### 6.9 Mise en route

Actions possibles à tracer :

- changement manuel du statut d'une étape ;
- étape marquée comme ignorée / reportée ;
- étape marquée comme vérifiée ;
- modification d'un paramètre de mise en route si applicable.

Les créations réelles restent auditées dans les modules concernés.

Exemples :

- création utilisateur → audit Utilisateurs ;
- création véhicule → audit Véhicules ;
- création modèle horaire → audit Modèles horaires.

---

## 7. Filtres et recherche

### 7.1 Filtres principaux

La page Audit doit permettre de filtrer les événements.

Filtres Alpha proposés :

- période ;
- module ;
- type d'action ;
- auteur ;
- élément concerné ;
- action sensible ;
- action support si applicable.

### 7.2 Modules filtrables

Modules possibles :

- Authentification / accès ;
- Utilisateurs ;
- Véhicules ;
- Suivi des véhicules ;
- Modèles horaires ;
- Société ;
- Dépôts / Bases ;
- Planning ;
- Mise en route ;
- Support si applicable.

### 7.3 Recherche rapide

Une recherche rapide peut permettre de chercher :

- nom d'utilisateur ;
- véhicule ;
- immatriculation ;
- modèle horaire ;
- semaine Planning ;
- base / dépôt ;
- action ;
- motif si autorisé.

La recherche ne doit pas contourner les permissions.

### 7.4 Tri

La liste doit être triée par défaut du plus récent au plus ancien.

Tri possible :

- date ;
- module ;
- auteur ;
- type d'action.

---

## 8. Visibilité et confidentialité

La page Audit peut contenir des informations sensibles.

### 8.1 Informations sensibles

Peuvent être sensibles :

- motifs d'absence ;
- données utilisateurs ;
- modifications de permissions ;
- changement de mot de passe ou réinitialisation ;
- motifs internes ;
- actions support ;
- anciennes et nouvelles valeurs ;
- informations liées aux indisponibilités ;
- actions après publication du Planning.

### 8.2 Masquage selon permissions

Les informations sensibles doivent être masquées si l'utilisateur n'a pas les permissions nécessaires.

Exemples :

- un utilisateur peut voir qu'une action a eu lieu sans voir le motif détaillé ;
- un utilisateur peut voir le module concerné sans voir les anciennes / nouvelles valeurs sensibles ;
- les détails d'absence restent soumis aux permissions validées.

### 8.3 Cloisonnement société

La page Audit doit respecter le multi-tenant strict.

Règle :

> Un utilisateur ne doit voir que les événements d'audit de sa société, sauf rôle support propriétaire explicitement autorisé.

---

## 9. Permissions et accès

### 9.1 Accès par défaut

En Alpha, la page Audit est accessible à :

- Admin ;
- Gérant.

### 9.2 Permission dédiée

Un autre utilisateur peut accéder à la page uniquement via permission dédiée.

Permission prévue :

- consulter audit.

Le nom exact de la permission reste à confirmer si une convention technique stricte doit être appliquée.

### 9.3 Droits possibles

Droits possibles à prévoir :

- consulter la page Audit ;
- consulter les détails d'une entrée ;
- consulter les informations sensibles ;
- filtrer les événements ;
- consulter les actions support si autorisé.

### 9.4 Absence de modification métier

La page Audit ne donne pas le droit de modifier les objets métier.

Elle permet uniquement la consultation de traces.

---

## 10. Audit support

Si un rôle support propriétaire intervient, ses actions doivent être clairement traçables.

À tracer pour une action support :

- auteur support ;
- société concernée ;
- module concerné ;
- élément concerné ;
- type d'action ;
- date / heure ;
- motif ou contexte si requis ;
- indication que l'action vient du support.

Règle :

> Les actions support doivent être plus transparentes que les actions internes classiques, car elles interviennent hors hiérarchie directe de la société cliente.

La visibilité exacte des actions support reste soumise aux règles de permissions et aux décisions de gouvernance validées.

---

## 11. Historique minimal dans les pages métier

Certaines pages métier peuvent afficher un historique minimal.

Exemples :

- Planning : historique minimal dans le panneau de détail ;
- Véhicules : historique récent si autorisé ;
- Suivi des véhicules : historique des vérifications, désinfections et anomalies ;
- Utilisateurs : actions sensibles visibles selon permissions.

Règle :

> L'historique minimal sert à comprendre rapidement l'objet courant. La page Audit sert à consulter l'historique complet et filtrable.

Les pages métier ne doivent pas dupliquer toute la page Audit.

---

## 12. Éléments exclus de l'Alpha

Sont exclus de la V1 / Alpha :

- reporting analytique avancé ;
- tableaux de bord statistiques d'audit ;
- export légal complet sans cadrage ;
- système de conservation réglementaire complet sans décision validée ;
- restauration automatique depuis l'audit ;
- versioning complet de tous les objets ;
- comparaison visuelle avancée avant / après ;
- alertes automatiques de sécurité avancées ;
- détection automatique d'anomalies comportementales ;
- audit prédictif ;
- interface d'investigation complexe ;
- consultation libre des données sensibles sans permission.

Ces éléments ne sont pas abandonnés.  
Ils pourront être étudiés en Beta, version finale ou évolution ultérieure.

---

## 13. Évolutions futures / à ne pas oublier

Évolutions possibles à étudier plus tard :

- export audit filtré ;
- export audit PDF / CSV ;
- durée de conservation configurable ;
- règles de conservation selon type d'événement ;
- tableau de bord sécurité ;
- alertes sur actions sensibles ;
- détection de comportements inhabituels ;
- comparaison avant / après plus lisible ;
- versioning complet ;
- restauration d'une ancienne version si validée ;
- preuve renforcée pour actions critiques ;
- signature électronique pour actions très sensibles ;
- supervision renforcée des actions support ;
- recherche avancée multi-critères ;
- audit RGPD plus détaillé ;
- lien avec une future documentation d'exploitation.

---

## 14. Points à confirmer

Les points suivants restent à confirmer :

- INFORMATION NON FOURNIE — À CONFIRMER : nom exact de la permission dédiée à la consultation Audit.
- INFORMATION NON FOURNIE — À CONFIRMER : durée de conservation des événements d'audit.
- INFORMATION NON FOURNIE — À CONFIRMER : niveau exact de détail conservé pour les anciennes et nouvelles valeurs.
- INFORMATION NON FOURNIE — À CONFIRMER : liste technique exacte des modules et actions audités en Alpha.
- INFORMATION NON FOURNIE — À CONFIRMER : périmètre exact de l'audit des connexions.
- INFORMATION NON FOURNIE — À CONFIRMER : règles exactes de visibilité des actions support.
- INFORMATION NON FOURNIE — À CONFIRMER : possibilité ou non d'exporter les journaux d'audit en Alpha.
- INFORMATION NON FOURNIE — À CONFIRMER : règles RGPD liées à la conservation, consultation et éventuelle purge des traces d'audit.
