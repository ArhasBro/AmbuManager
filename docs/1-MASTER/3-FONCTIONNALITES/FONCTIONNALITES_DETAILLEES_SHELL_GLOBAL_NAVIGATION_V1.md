# Ambulance Manager — Fonctionnalités détaillées — Shell global / navigation V1

Version : V1.0  
Date : 22/05/2026

## Sommaire

- [1. Objectif du document](#1-objectif-du-document)
- [2. Objectif du Shell global](#2-objectif-du-shell-global)
- [3. Structure globale attendue](#3-structure-globale-attendue)
- [4. Éléments de navigation](#4-éléments-de-navigation)
- [5. Header](#5-header)
- [6. Sidebar](#6-sidebar)
- [7. Utilisateur connecté](#7-utilisateur-connecté)
- [8. Accès selon permissions](#8-accès-selon-permissions)
- [9. États simples](#9-états-simples)
- [10. Éléments à ne pas afficher](#10-éléments-à-ne-pas-afficher)
- [11. Évolutions futures / à ne pas oublier](#11-évolutions-futures--à-ne-pas-oublier)
- [12. Points à confirmer](#12-points-à-confirmer)

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

- une zone `header` globale ;
- une zone `sidebar` de navigation ;
- une zone `contenu principal` pour la page active.

Le Shell global ne remplace pas la logique métier des pages.

## 4. Éléments de navigation

La navigation principale doit inclure les entrées métier prévues dans les documents fonctionnels et UI/UX actifs.

Correspondances de nomenclature à respecter :

- Ancien nom historique : `Templates` ; nom fonctionnel actuel : `Modèles horaires`.
- Ancien nom historique : `Onboarding` ; nom fonctionnel actuel : `Mise en route`.

Les routes techniques peuvent rester historiques (`/templates`, `/onboarding`) tant que les libellés fonctionnels affichés sont cohérents avec la nomenclature actuelle.

## 5. Header

Le header doit permettre au minimum :

- l’identification rapide du contexte de page ;
- l’accès aux actions globales autorisées ;
- l’accès au profil utilisateur et à la déconnexion.

INFORMATION NON FOURNIE — À CONFIRMER : liste exacte des actions globales obligatoires dans le header V1.

## 6. Sidebar

La sidebar doit permettre au minimum :

- l’accès direct aux modules principaux ;
- l’indication du module actif ;
- la gestion d’items masqués/non visibles selon permissions.

Les libellés visibles côté navigation doivent privilégier les noms fonctionnels actuels.

## 7. Utilisateur connecté

Le Shell global doit afficher les informations minimales de session utiles à la navigation :

- identité utilisateur ;
- rattachement société ;
- action de déconnexion.

INFORMATION NON FOURNIE — À CONFIRMER : niveau exact de détail d’identité à afficher en permanence (nom complet, rôle principal, avatar, etc.).

## 8. Accès selon permissions

Le Shell global doit appliquer les permissions de navigation :

- affichage conditionnel des entrées non autorisées ;
- blocage d’accès direct si route non autorisée ;
- cohérence entre visibilité menu et autorisation réelle.

INFORMATION NON FOURNIE — À CONFIRMER : matrice exhaustive module ↔ permission pour le Shell global V1.

## 9. États simples

Le Shell global doit prévoir des états simples :

- état standard connecté ;
- état chargement minimal ;
- état erreur de chargement de navigation ;
- état sans accès à un module.

INFORMATION NON FOURNIE — À CONFIRMER : comportement UX exact attendu pour chaque état en V1.

## 10. Éléments à ne pas afficher

Le Shell global ne doit pas afficher :

- des messages de contrôle QA/documentaire ;
- des informations techniques internes non utiles à l’utilisateur ;
- des éléments de debug en production.

Rappel explicite : la formule `INFORMATION NON FOURNIE — À CONFIRMER` est documentaire et ne doit pas être affichée dans l’interface utilisateur.

## 11. Évolutions futures / à ne pas oublier

- harmonisation finale des libellés navigation avec les noms fonctionnels validés ;
- clarification définitive des droits de navigation fins par profil ;
- standardisation des états d’erreur/navigation vide à l’échelle produit.

## 12. Points à confirmer

- INFORMATION NON FOURNIE — À CONFIRMER : modèle final des permissions de navigation par rôle.
- INFORMATION NON FOURNIE — À CONFIRMER : règles de fallback quand un utilisateur perd un droit en session active.
- INFORMATION NON FOURNIE — À CONFIRMER : exigences d’accessibilité détaillées du Shell global V1.
