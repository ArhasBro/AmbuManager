# Ambulance Manager — DOCUMENT_CADRAGE_FONCTIONNEL_V2

Version : V2.0.0  
Date : 22/05/2026

## Sommaire

- [1. Rôle du document](#1-rôle-du-document)
- [2. Vision fonctionnelle du produit](#2-vision-fonctionnelle-du-produit)
- [3. Statut actuel du périmètre](#3-statut-actuel-du-périmètre)
- [4. Références fonctionnelles détaillées](#4-références-fonctionnelles-détaillées)
- [5. Utilisateurs, rôles et permissions](#5-utilisateurs-rôles-et-permissions)
- [6. Modules fonctionnels validés](#6-modules-fonctionnels-validés)
- [7. Règles transverses validées](#7-règles-transverses-validées)
- [8. Périmètre Alpha actuel](#8-périmètre-alpha-actuel)
- [9. Éléments hors périmètre Alpha](#9-éléments-hors-périmètre-alpha)
- [10. Évolutions futures connues](#10-évolutions-futures-connues)
- [11. Lien avec les maquettes](#11-lien-avec-les-maquettes)
- [12. Lien avec le développement](#12-lien-avec-le-développement)
- [13. Points à confirmer](#13-points-à-confirmer)
- [14. Prochaines étapes](#14-prochaines-étapes)

## 1. Rôle du document

Ce document est la référence fonctionnelle officielle V2 du produit Ambulance Manager.

Il remplace progressivement l’ancien document :

- `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md`.

L’ancien document reste historique pour le moment.

Ce document ne remplace pas les fiches fonctionnalités détaillées.
Il les synthétise et les organise.

## 2. Vision fonctionnelle du produit

Ambulance Manager est un SaaS métier de gestion opérationnelle pour sociétés de transport sanitaire.

Le produit doit permettre de gérer principalement :

- l’accès utilisateur ;
- la navigation globale ;
- les utilisateurs / salariés ;
- les véhicules ;
- le suivi des véhicules ;
- les modèles horaires ;
- le planning ;
- la société ;
- les dépôts / bases ;
- le tableau de bord ;
- l’audit ;
- la mise en route ;
- les futures heures / horaires.

Le produit n’est pas présenté comme terminé.
Le projet est en reprise méthodologique.

## 3. Statut actuel du périmètre

Le produit est en reprise méthodologique.

Le périmètre fonctionnel est en cours de réalignement à partir des fiches fonctionnalités détaillées.

Les fiches déjà cadrées servent de base récente.

Le code existant ne fait pas foi à lui seul.

## 4. Références fonctionnelles détaillées

Référence détaillée principale :

- `docs/1-MASTER/3-FONCTIONNALITES/`.

Fiches principales existantes :

- Shell global / navigation : `docs/1-MASTER/3-FONCTIONNALITES/0-FONCTIONNALITES_DETAILLEES_SHELL_GLOBAL_NAVIGATION_V1.md` ;
- Login : `docs/1-MASTER/3-FONCTIONNALITES/1-FONCTIONNALITES_DETAILLEES_LOGIN_V1.1.md` ;
- Tableau de bord : `docs/1-MASTER/3-FONCTIONNALITES/2-FONCTIONNALITES_DETAILLEES_TABLEAU_DE_BORD_V1.1.md` ;
- Utilisateurs : `docs/1-MASTER/3-FONCTIONNALITES/5-FONCTIONNALITES_DETAILLEES_UTILISATEURS_V1.1.md` ;
- Véhicules : `docs/1-MASTER/3-FONCTIONNALITES/6-FONCTIONNALITES_DETAILLEES_VEHICULES_V1.1.md` ;
- Suivi des véhicules : `docs/1-MASTER/3-FONCTIONNALITES/6.1-FONCTIONNALITES_DETAILLEES_SUIVI_DES_VEHICULES_V1.md` ;
- Modèles horaires : `docs/1-MASTER/3-FONCTIONNALITES/3-FONCTIONNALITES_DETAILLEES_MODELES_HORAIRES_V1.1.md` ;
- Société : `docs/1-MASTER/3-FONCTIONNALITES/8-FONCTIONNALITES_DETAILLEES_SOCIETE_V1.1.md` ;
- Dépôts / Bases : `docs/1-MASTER/3-FONCTIONNALITES/7-FONCTIONNALITES_DETAILLEES_DEPOTS_BASES_V1.md` ;
- Planning : `docs/1-MASTER/3-FONCTIONNALITES/4-FONCTIONNALITES_DETAILLEES_PLANNING_V1.1.md` ;
- Audit : `docs/1-MASTER/3-FONCTIONNALITES/10-FONCTIONNALITES_DETAILLEES_AUDIT_V1.md` ;
- Mise en route : `docs/1-MASTER/3-FONCTIONNALITES/9-FONCTIONNALITES_DETAILLEES_MISE_EN_ROUTE_V1.1.md` ;
- Heures / Horaires : INFORMATION NON FOURNIE — À CONFIRMER.

## 5. Utilisateurs, rôles et permissions

Rôles principaux validés ou prévus :

- Admin ;
- Gérant ;
- ADE ;
- AA ;
- PSC1 ;
- TAXI ;
- Bureau ;
- Régulateur ;
- Support propriétaire.

Règles globales :

- rôle principal obligatoire ;
- multi-rôle prévu selon cadrage validé ;
- permissions fines par module ;
- aucun utilisateur ne peut s’attribuer seul des droits supérieurs ;
- actions sensibles tracées dans l’audit.

Statut de certains rôles : INFORMATION NON FOURNIE — À CONFIRMER.

## 6. Modules fonctionnels validés

- Shell global / navigation : rôle = structure et navigation du produit ; statut = validé ; fiche = `docs/1-MASTER/3-FONCTIONNALITES/0-FONCTIONNALITES_DETAILLEES_SHELL_GLOBAL_NAVIGATION_V1.md`.
- Login : rôle = accès sécurisé et chargement de session ; statut = validé ; fiche = `docs/1-MASTER/3-FONCTIONNALITES/1-FONCTIONNALITES_DETAILLEES_LOGIN_V1.1.md`.
- Tableau de bord : rôle = page d’accueil opérationnelle par profil ; statut = validé ; fiche = `docs/1-MASTER/3-FONCTIONNALITES/2-FONCTIONNALITES_DETAILLEES_TABLEAU_DE_BORD_V1.1.md`.
- Utilisateurs : rôle = gestion des comptes, rôles, permissions et statuts ; statut = validé ; fiche = `docs/1-MASTER/3-FONCTIONNALITES/5-FONCTIONNALITES_DETAILLEES_UTILISATEURS_V1.1.md`.
- Véhicules : rôle = référentiel administratif de flotte ; statut = validé ; fiche = `docs/1-MASTER/3-FONCTIONNALITES/6-FONCTIONNALITES_DETAILLEES_VEHICULES_V1.1.md`.
- Suivi des véhicules : rôle = suivi opérationnel (vérifications, désinfections, anomalies) ; statut = validé ; fiche = `docs/1-MASTER/3-FONCTIONNALITES/6.1-FONCTIONNALITES_DETAILLEES_SUIVI_DES_VEHICULES_V1.md`.
- Modèles horaires : rôle = référentiel de modèles pour le planning ; statut = validé ; fiche = `docs/1-MASTER/3-FONCTIONNALITES/3-FONCTIONNALITES_DETAILLEES_MODELES_HORAIRES_V1.1.md`.
- Société : rôle = profil permanent de la société ; statut = validé ; fiche = `docs/1-MASTER/3-FONCTIONNALITES/8-FONCTIONNALITES_DETAILLEES_SOCIETE_V1.1.md`.
- Dépôts / Bases : rôle = gestion des lieux de référence ; statut = validé ; fiche = `docs/1-MASTER/3-FONCTIONNALITES/7-FONCTIONNALITES_DETAILLEES_DEPOTS_BASES_V1.md`.
- Planning : rôle = planification manuelle métier ; statut = à compléter ; fiche = `docs/1-MASTER/3-FONCTIONNALITES/4-FONCTIONNALITES_DETAILLEES_PLANNING_V1.1.md`.
- Audit : rôle = traçabilité centralisée des actions sensibles ; statut = validé ; fiche = `docs/1-MASTER/3-FONCTIONNALITES/10-FONCTIONNALITES_DETAILLEES_AUDIT_V1.md`.
- Mise en route : rôle = assistant de configuration initiale ; statut = validé ; fiche = `docs/1-MASTER/3-FONCTIONNALITES/9-FONCTIONNALITES_DETAILLEES_MISE_EN_ROUTE_V1.1.md`.
- Heures / Horaires : rôle = gestion avancée des heures et horaires ; statut = futur ; fiche = INFORMATION NON FOURNIE — À CONFIRMER.

## 7. Règles transverses validées

- multi-tenant strict ;
- séparation par société ;
- archivage logique ;
- pas de suppression physique métier en Alpha ;
- statuts séparés actif / inactif / archivé quand applicable ;
- droits par rôle et permissions ;
- audit des actions sensibles ;
- les utilisateurs terrain ont des accès en lecture ou actions limitées selon permissions ;
- les anciennes maquettes ne priment pas sur les fiches fonctionnalités.

## 8. Périmètre Alpha actuel

L’Alpha actuelle vise :

- une base produit exploitable ;
- une documentation propre ;
- des maquettes réalignées ;
- une reprise du codage sur base claire ;
- pas encore une version commerciale complète.

Modules Alpha principaux :

- accès ;
- tableau de bord ;
- utilisateurs ;
- véhicules ;
- suivi des véhicules ;
- modèles horaires ;
- société ;
- dépôts / bases ;
- planning manuel ;
- audit ;
- mise en route.

## 9. Éléments hors périmètre Alpha

- facturation ;
- paie ;
- RH avancée ;
- régulation temps réel ;
- courses / transports patients ;
- optimisation avancée ;
- géolocalisation ;
- maintenance avancée complète ;
- reporting analytique avancé ;
- notifications avancées ;
- version mobile complète ;
- autoschedule avancé ;
- matching automatique avancé.

Certains éléments sont hors Alpha mais non abandonnés.

## 10. Évolutions futures connues

- Heures / Horaires ;
- version mobile ;
- planification automatique ;
- affectation automatique optimisée ;
- maintenance / entretien avancé véhicules ;
- reporting ;
- facturation très long terme ;
- régulation très long terme ;
- notifications avancées ;
- signature / preuve mobile ;
- confirmation de lecture.

## 11. Lien avec les maquettes

Les nouvelles maquettes seront réalisées après validation documentaire.

Les anciennes maquettes sont dans :

- `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/`.

Les anciennes références UI/UX sont dans :

- `docs/1-MASTER/2-REFERENCE_UI_UX/`.

Ces éléments sont transitoires / historiques.
Ils servent de mémoire visuelle et de base de comparaison.
Ils ne constituent pas la vérité finale.
Ils ne doivent pas primer sur les fiches fonctionnalités validées.

## 12. Lien avec le développement

Le codage reprendra après :

- documents maîtres V2 ;
- fiches fonctionnalités stabilisées ;
- nouvelles maquettes ;
- références UI/UX propres.

Codex ne doit pas coder depuis les anciennes maquettes seules.

## 13. Points à confirmer

- documents ARS officiels pour vérifications / désinfections : INFORMATION NON FOURNIE — À CONFIRMER ;
- détail exact de la page Heures / Horaires : INFORMATION NON FOURNIE — À CONFIRMER ;
- statut final de certains rôles si besoin : INFORMATION NON FOURNIE — À CONFIRMER ;
- règles exactes semaine 53 / numérotation semaines : INFORMATION NON FOURNIE — À CONFIRMER ;
- niveau futur de version mobile : INFORMATION NON FOURNIE — À CONFIRMER ;
- arbitrages non encore validés : INFORMATION NON FOURNIE — À CONFIRMER.

## 14. Prochaines étapes

- validation humaine du document ;
- création / mise à jour de `ETAT_GLOBAL_PROJET_V2.md` ;
- création / mise à jour de `REGISTRE_DECISIONS_V2.md` ;
- création / mise à jour de `RECAP_DISCUSSIONS_V2.md` ;
- finalisation documentaire avant maquettes.
