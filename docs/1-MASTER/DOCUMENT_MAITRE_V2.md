# Ambulance Manager — DOCUMENT_MAITRE_V2

Version : V2.0.0  
Date : 22/05/2026

## Sommaire

- [1. Vision du projet](#1-vision-du-projet)
- [2. Statut actuel du projet](#2-statut-actuel-du-projet)
- [3. Références officielles du projet](#3-références-officielles-du-projet)
- [4. Rôle des fiches fonctionnalités](#4-rôle-des-fiches-fonctionnalités)
- [5. Rôle des maquettes et références UI/UX](#5-rôle-des-maquettes-et-références-uiux)
- [6. Principes non négociables](#6-principes-non-négociables)
- [7. Architecture fonctionnelle cible](#7-architecture-fonctionnelle-cible)
- [8. Méthode de reprise actuelle](#8-méthode-de-reprise-actuelle)
- [9. Ordre de travail validé](#9-ordre-de-travail-validé)
- [10. Règles documentaires](#10-règles-documentaires)
- [11. Éléments historiques et archives](#11-éléments-historiques-et-archives)
- [12. Prochaines étapes](#12-prochaines-étapes)

## 1. Vision du projet

Ambulance Manager est un SaaS métier de gestion opérationnelle pour sociétés de transport sanitaire.

Le produit couvre notamment :

- utilisateurs / salariés ;
- véhicules ;
- suivi des véhicules ;
- modèles horaires ;
- planning ;
- société ;
- dépôts / bases ;
- tableau de bord ;
- audit ;
- mise en route ;
- navigation globale.

Le produit n’est pas présenté comme terminé. Le projet est en phase de reprise méthodologique.

## 2. Statut actuel du projet

Le projet ne repart pas de zéro techniquement.  
Le projet repart de zéro méthodologiquement.

Le code existant peut être conservé, corrigé ou remplacé selon les écarts constatés.

Le projet est actuellement dans une phase de :

- nettoyage documentaire ;
- réalignement fonctionnel ;
- préparation des nouvelles maquettes ;
- future reprise du codage.

## 3. Références officielles du projet

Références actives ou prévues :

- `docs/1-MASTER/DOCUMENT_MAITRE_V2.md` ;
- `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL_V2.md` — À créer / à compléter ;
- `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT_V2.md` ;
- `docs/1-MASTER/ETAT_GLOBAL_PROJET_V2.md` — À créer / à compléter ;
- `docs/1-MASTER/REGISTRE_DECISIONS_V2.md` — À créer / à compléter ;
- `docs/1-MASTER/RECAP_DISCUSSIONS_V2.md` — À créer / à compléter ;
- `docs/1-MASTER/3-FONCTIONNALITES/`.

## 4. Rôle des fiches fonctionnalités

Les fiches de `docs/1-MASTER/3-FONCTIONNALITES/` sont la source détaillée récente pour réaligner les documents maîtres.

Elles ne remplacent pas les documents maîtres.  
Elles servent à les mettre à jour.

Règle : en cas d’écart entre un ancien document maître et une fiche fonctionnalités validée récemment, l’écart doit être analysé et corrigé dans le document maître V2 concerné.

## 5. Rôle des maquettes et références UI/UX

Les dossiers suivants sont des références UI/UX transitoires / historiques :

- `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/` ;
- `docs/1-MASTER/2-REFERENCE_UI_UX/`.

Ils sont conservés comme mémoire visuelle et base de comparaison.  
Ils ne doivent pas primer sur les fiches fonctionnalités validées.

Ils seront refaits ou remplacés après validation des nouvelles maquettes.  
Après validation des nouvelles maquettes, ils serviront à produire des références UI/UX propres destinées à guider le codage des pages.

## 6. Principes non négociables

- multi-tenant strict ;
- séparation par société ;
- rôles et permissions ;
- traçabilité ;
- pas de suppression physique métier sans validation ;
- archivage logique privilégié ;
- aucune validation implicite ;
- toute information incertaine doit être marquée exactement : `INFORMATION NON FOURNIE — À CONFIRMER`.

## 7. Architecture fonctionnelle cible

Modules validés au niveau gouvernance :

- Shell global / navigation ;
- Login ;
- Tableau de bord ;
- Utilisateurs ;
- Véhicules ;
- Suivi des véhicules ;
- Modèles horaires ;
- Société ;
- Dépôts / Bases ;
- Planning ;
- Audit ;
- Mise en route ;
- Heures / Horaires en futur cadrage ;
- version mobile future.

Le détail fonctionnel est porté par les fiches de `docs/1-MASTER/3-FONCTIONNALITES/`.

## 8. Méthode de reprise actuelle

Ordre méthodologique actuel :

1. Nettoyer et stabiliser la documentation.
2. Reprendre les documents maîtres V2 un par un.
3. Finaliser les nouvelles maquettes.
4. Créer les références UI/UX propres après les maquettes.
5. Reprendre le codage avec une base documentaire stable.

## 9. Ordre de travail validé

1. `DOCUMENT_MAITRE_V2.md`
2. `DOCUMENT_CADRAGE_FONCTIONNEL_V2.md`
3. `ETAT_GLOBAL_PROJET_V2.md`
4. `REGISTRE_DECISIONS_V2.md`
5. `RECAP_DISCUSSIONS_V2.md`
6. finalisation / cadrage maquettes
7. documentation UI/UX post-maquettes
8. reprise du codage

## 10. Règles documentaires

- ne pas créer plusieurs plans concurrents ;
- ne pas modifier les documents maîtres sans validation ;
- ne pas mélanger historique et actif ;
- archiver au lieu de supprimer ;
- conserver UTF-8 sans BOM ;
- préserver les accents français ;
- éviter les fichiers énormes non utiles ;
- éviter les refontes massives non contrôlées.

## 11. Éléments historiques et archives

Les anciens documents ou fichiers obsolètes sont conservés dans :

- `docs/4-ARCHIVES/1-MASTER_HISTORIQUE/`.

Les anciennes sessions restent dans :

- `docs/2-SESSIONS/`.

Leur gouvernance est portée par :

- `docs/2-SESSIONS/README_SESSIONS.md`.

## 12. Prochaines étapes

Après création de `DOCUMENT_MAITRE_V2.md`, la prochaine étape est :

1. validation humaine du document ;
2. création / reprise de `DOCUMENT_CADRAGE_FONCTIONNEL_V2.md` ;
3. poursuite du réalignement des documents maîtres V2 fichier par fichier.

