# Ambulance Manager — REGISTRE_DECISIONS_V2

Version : V2.0.0  
Date : 22/05/2026

## Sommaire

- [1. Rôle du registre](#1-rôle-du-registre)
- [2. Statut des décisions V2](#2-statut-des-décisions-v2)
- [3. Décisions de gouvernance documentaire](#3-décisions-de-gouvernance-documentaire)
- [4. Décisions de méthode projet](#4-décisions-de-méthode-projet)
- [5. Décisions fonctionnelles globales](#5-décisions-fonctionnelles-globales)
- [6. Décisions par module](#6-décisions-par-module)
- [7. Décisions UI/UX et maquettes](#7-décisions-uiux-et-maquettes)
- [8. Décisions techniques transverses](#8-décisions-techniques-transverses)
- [9. Décisions reportées / futures](#9-décisions-reportées--futures)
- [10. Points à confirmer](#10-points-à-confirmer)
- [11. Règles de mise à jour du registre](#11-règles-de-mise-à-jour-du-registre)
- [12. Prochaines étapes](#12-prochaines-étapes)

## 1. Rôle du registre

Ce document centralise les décisions validées qui doivent guider la suite du projet Ambulance Manager.

Ce registre ne remplace pas :

- `docs/1-MASTER/DOCUMENT_MAITRE_V2.md` ;
- `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL_V2.md` ;
- les fiches fonctionnalités détaillées de `docs/1-MASTER/3-FONCTIONNALITES/`.

Il sert à éviter la perte des arbitrages importants et à fournir une base de décision synthétique pour les prochaines sessions.

## 2. Statut des décisions V2

Le registre V2 est créé dans le cadre de la reprise méthodologique propre du projet.

Il reprend uniquement les décisions utiles pour la suite.

Les anciennes décisions restent consultables dans les documents historiques et les sessions, mais elles ne doivent pas primer automatiquement sur la base V2 validée.

## 3. Décisions de gouvernance documentaire

- création d’une base documentaire V2 ;
- conservation de l’existant en historique ;
- archivage au lieu de suppression ;
- `docs/1-MASTER/3-FONCTIONNALITES/` comme base récente détaillée ;
- les documents maîtres V2 deviennent la nouvelle référence officielle ;
- les anciens documents maîtres restent historiques tant que les V2 sont créés ;
- `docs/2-SESSIONS/` conserve l’historique et les preuves ;
- les futures modifications doivent rester courtes, contrôlées et validées.

## 4. Décisions de méthode projet

- documentation avant maquettes ;
- maquettes avant reprise du codage ;
- validation humaine avant demande à Codex ;
- travail fichier par fichier pour les documents maîtres ;
- pas de réécriture massive non contrôlée ;
- pas de correction automatique massive du mojibake ;
- pas de modification code pendant la phase documentaire ;
- les futures sessions Codex doivent être courtes et ciblées.

## 5. Décisions fonctionnelles globales

- Ambulance Manager est un SaaS métier pour sociétés de transport sanitaire ;
- fonctionnement multi-tenant strict ;
- séparation par société ;
- rôles et permissions ;
- actions sensibles tracées dans l’audit ;
- archivage logique privilégié ;
- pas de suppression physique métier en Alpha ;
- les utilisateurs terrain ont des droits limités selon permissions ;
- les anciennes maquettes ne priment pas sur les fiches fonctionnalités.

## 6. Décisions par module

### 6.1 Shell global / navigation

- fiche créée en `docs/1-MASTER/3-FONCTIONNALITES/0-FONCTIONNALITES_DETAILLEES_SHELL_GLOBAL_NAVIGATION_V1.md` ;
- le Shell global est traité avant les pages métier ;
- la navigation globale doit être cadrée avant les maquettes.

### 6.2 Login

- page considérée comme validée à 100 % dans le cadrage précédent ;
- reste à aligner visuellement avec les nouvelles maquettes si nécessaire.

### 6.3 Tableau de bord

- page d’accueil après connexion ;
- widgets prédéfinis selon permissions ;
- personnalisation simple par utilisateur ;
- pas de reporting analytique complexe en Alpha.

### 6.4 Utilisateurs

- distinction entre compte actif/inactif, archivage et état opérationnel ;
- rôle principal obligatoire ;
- multi-rôle prévu ;
- permissions fines par module ;
- demandes d’absence / indisponibilité prévues ;
- pas de suppression physique.

### 6.5 Véhicules

- page Véhicules = référentiel administratif de la flotte ;
- statut administratif, disponibilité générale et archivage séparés ;
- pas de suppression physique ;
- base/dépôt informatif, non bloquant pour le planning.

### 6.6 Suivi des véhicules

- page séparée de Véhicules ;
- onglets : vue d’ensemble, vérifications, désinfections, anomalies, entretiens futurs ;
- anomalies centralisées ;
- aucune indisponibilité automatique sans action autorisée ;
- règles ARS à confirmer.

### 6.7 Modèles horaires

- ancien nom "Templates" remplacé par "Modèles horaires" ;
- modèle utilisé comme base de création pour le planning ;
- modification d’un modèle ne modifie pas les créneaux déjà créés ;
- libellé court Planning prévu ;
- couleur non imposée rigidement par le modèle ;
- base/dépôt facultatif.

### 6.8 Société

- Société et Mise en route restent séparées ;
- Société = profil permanent ;
- Mise en route = assistant / checklist initiale ;
- contacts société multiples ;
- responsables applicatifs issus des Admin / Gérant.

### 6.9 Dépôts / Bases

- notion simple base/dépôt en Alpha ;
- pas de distinction technique avancée des types de lieux en Alpha ;
- responsable local optionnel ;
- base/dépôt guide mais ne bloque pas automatiquement le planning.

### 6.10 Planning

- planning manuel métier en Alpha ;
- vues synthétiques, pas de vue globale détaillée heure par heure ;
- matrice annuelle utilisateurs × semaines ;
- préparation hebdomadaire des besoins ;
- affectation utilisateurs et véhicules manuelle ;
- publication par semaine ;
- modifications après publication tracées ;
- missions / courses / régulation / facturation hors Alpha.

### 6.11 Audit

- actions sensibles tracées ;
- audit complet dans une page dédiée ;
- historique minimal visible selon permissions.

### 6.12 Mise en route

- nouveau nom fonctionnel de l’ancien Onboarding ;
- ne doit pas être fusionnée avec Société.

### 6.13 Heures / Horaires futur cadrage

- page future à cadrer ;
- prévue plus tard, notamment pour les heures journalières et pauses.

## 7. Décisions UI/UX et maquettes

- les anciennes maquettes sont conservées comme mémoire visuelle ;
- elles sont dans `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/` ;
- les références UI/UX sont transitoires dans `docs/1-MASTER/2-REFERENCE_UI_UX/` ;
- les nouvelles maquettes seront produites après stabilisation documentaire ;
- après validation des nouvelles maquettes, les références UI/UX seront refaites pour guider le codage.

## 8. Décisions techniques transverses

- multi-tenant strict via société ;
- RBAC / permissions ;
- audit des actions sensibles ;
- conservation historique ;
- aucun code modifié pendant la phase documentaire ;
- reprise du code uniquement après documentation et maquettes.

Ce registre ne détaille pas l’architecture technique.

## 9. Décisions reportées / futures

- version mobile ;
- Heures / Horaires ;
- planification automatique ;
- affectation automatique optimisée ;
- reporting avancé ;
- facturation ;
- régulation temps réel ;
- courses / transports patients ;
- signature / preuve mobile ;
- notifications avancées ;
- maintenance avancée véhicules.

## 10. Points à confirmer

- documents ARS vérifications / désinfections : INFORMATION NON FOURNIE — À CONFIRMER ;
- règles exactes de semaine 53 : INFORMATION NON FOURNIE — À CONFIRMER ;
- détail final de Heures / Horaires : INFORMATION NON FOURNIE — À CONFIRMER ;
- statut exact de certains rôles si besoin : INFORMATION NON FOURNIE — À CONFIRMER ;
- niveau de version mobile : INFORMATION NON FOURNIE — À CONFIRMER ;
- niveau futur de l’automatisation : INFORMATION NON FOURNIE — À CONFIRMER.

## 11. Règles de mise à jour du registre

- toute décision ajoutée doit être validée ;
- ne pas transformer le registre en journal de discussion ;
- ne noter que les décisions structurantes ;
- indiquer clairement les décisions reportées ;
- mettre à jour le registre après validation importante.

## 12. Prochaines étapes

Après ce document, les prochaines étapes sont :

- validation humaine de `REGISTRE_DECISIONS_V2.md` ;
- création de `RECAP_DISCUSSIONS_V2.md` ;
- point sur les fiches fonctionnalités ;
- préparation de la phase maquettes.
