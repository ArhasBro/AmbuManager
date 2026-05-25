# Ambulance Manager — Fonctionnalités détaillées — Shell Global / navigation V1

> Statut : référence fonctionnelle cible — page non validée à ce stade.

Version : V1.1  
Date : 24/05/2026

## Sommaire

- [1. Objectif du document](#1-objectif-du-document)
- [2. Objectif du Shell global](#2-objectif-du-shell-global)
- [3. Structure globale attendue](#3-structure-globale-attendue)
- [4. Décisions de cadrage Shell V1](#4-décisions-de-cadrage-shell-v1)
- [5. Éléments de navigation](#5-éléments-de-navigation)
- [6. Header](#6-header)
- [7. Sidebar](#7-sidebar)
- [8. Utilisateur connecté](#8-utilisateur-connecté)
- [9. Accès selon permissions](#9-accès-selon-permissions)
- [10. États simples](#10-états-simples)
- [11. Éléments à ne pas afficher](#11-éléments-à-ne-pas-afficher)
- [12. Évolutions futures / à ne pas oublier](#12-évolutions-futures--à-ne-pas-oublier)
- [13. Points à confirmer](#13-points-à-confirmer)

## 1. Objectif du document

Cadrer le périmètre fonctionnel du Shell global et de la navigation transverse des pages connectées, sans détailler une maquette visuelle complète.

## 2. Objectif du Shell global

Le Shell global sert à :

- fournir une structure commune des pages connectées ;
- centraliser la navigation principale ;
- afficher le contexte utilisateur connecté ;
- maintenir une expérience cohérente entre modules.

## 3. Structure globale attendue

Le Shell global comprend au minimum :

- une zone `header` globale (haut) ;
- une zone `sidebar` de navigation (gauche) ;
- une zone `contenu principal` pour la page active ;
- un menu utilisateur ;
- une action de déconnexion.

Le Shell global ne remplace pas la logique métier des pages.

## 4. Décisions de cadrage Shell V1

Décisions humaines validées pour le Shell V1 :

- Shell V1 = structure connectée commune de l'application ;
- navigation conditionnelle selon permissions ;
- modules non autorisés masqués dans le menu ;
- accès direct non autorisé à une route = page `Accès refusé` ;
- header = contexte de page + identité minimale utilisateur ;
- pas de recherche globale en V1 ;
- pas de notifications globales en V1 ;
- pas de bouton de création rapide en V1 ;
- pas de debug visible ;
- `Privacy` ne doit pas être une entrée métier principale de la sidebar.

`Privacy` peut rester accessible ailleurs de manière discrète hors navigation métier principale.

Le Shell global / navigation reste non validé fonctionnellement à ce stade. Cette fiche reste une référence fonctionnelle cible à auditer, cadrer, confirmer puis valider explicitement.

## 5. Éléments de navigation

La navigation principale doit inclure les entrées métier prévues dans les documents fonctionnels et UI/UX actifs.

Correspondances de nomenclature à respecter :

- Ancien nom historique : `Templates` ; nom fonctionnel actuel : `Modèles horaires`.
- Ancien nom historique : `Onboarding` ; nom fonctionnel actuel : `Mise en route`.

Les routes techniques peuvent rester historiques (`/templates`, `/onboarding`) tant que les libellés fonctionnels affichés sont cohérents avec la nomenclature actuelle.

## 6. Header

Le header doit permettre au minimum :

- l'identification rapide du contexte de page ;
- l'affichage de l'identité minimale utilisateur ;
- l'accès au menu utilisateur ;
- l'accès à la déconnexion.

Le header V1 n'intègre pas :

- recherche globale ;
- notifications globales ;
- création rapide transverse.

## 7. Sidebar

La sidebar doit permettre au minimum :

- l'accès direct aux modules principaux autorisés ;
- l'indication du module actif ;
- la gestion d'items masqués/non visibles selon permissions.

Les libellés visibles côté navigation doivent privilégier les noms fonctionnels actuels.

La sidebar métier ne doit pas inclure `Privacy` comme module principal.

## 8. Utilisateur connecté

Le Shell global doit afficher les informations minimales de session utiles à la navigation :

- identité minimale utilisateur ;
- rattachement société ;
- action de déconnexion.

`Mon profil` peut exister uniquement si une page dédiée ou un panneau profil est prévu. Sinon, le menu utilisateur reste minimal avec la déconnexion.

INFORMATION NON FOURNIE — À CONFIRMER : niveau exact de détail d'identité à afficher en permanence (nom complet, rôle principal, avatar, etc.).

## 9. Accès selon permissions

Le Shell global doit appliquer les permissions de navigation :

- affichage conditionnel des entrées non autorisées (masquées) ;
- blocage d'accès direct si route non autorisée avec page `Accès refusé` ;
- cohérence entre visibilité menu et autorisation réelle.

INFORMATION NON FOURNIE — À CONFIRMER : matrice exhaustive module ↔ permission pour le Shell global V1.

## 10. États simples

Le Shell global doit prévoir des états simples :

- état standard connecté ;
- état chargement de session/navigation ;
- état erreur de chargement de navigation ;
- état sans accès à un module ;
- état `Accès refusé` pour route non autorisée.

INFORMATION NON FOURNIE — À CONFIRMER : comportement UX exact attendu pour chaque état en V1.

## 11. Éléments à ne pas afficher

Le Shell global ne doit pas afficher :

- des messages de contrôle QA/documentaire ;
- des informations techniques internes non utiles à l'utilisateur ;
- des éléments de debug en production ;
- des entrées UI V1 non retenues (recherche globale, notifications, création rapide).

Rappel explicite : la formule `INFORMATION NON FOURNIE — À CONFIRMER` est documentaire et ne doit pas être affichée dans l'interface utilisateur.

## 12. Évolutions futures / à ne pas oublier

- harmonisation finale des libellés navigation avec les noms fonctionnels validés ;
- clarification définitive des droits de navigation fins par profil ;
- standardisation des états d'erreur/navigation vide à l'échelle produit.

## 13. Points à confirmer

- INFORMATION NON FOURNIE — À CONFIRMER : modèle final des permissions de navigation par rôle.
- INFORMATION NON FOURNIE — À CONFIRMER : matrice détaillée module ↔ permission à appliquer dans le Shell V1.
- INFORMATION NON FOURNIE — À CONFIRMER : règles de fallback quand un utilisateur perd un droit en session active.
- INFORMATION NON FOURNIE — À CONFIRMER : exigences d'accessibilité détaillées du Shell global V1.
- INFORMATION NON FOURNIE — À CONFIRMER : disponibilité d'une page/panneau `Mon profil` en V1.
