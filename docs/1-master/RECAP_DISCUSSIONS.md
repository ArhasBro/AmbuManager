# Ambulance Manager — RECAP_DISCUSSIONS

Version : V1.7.0 (MASTER)  
Date : 03/05/2026

## Sommaire
- [0. Gouvernance anti-reconstruction](#0-gouvernance-anti-reconstruction)
- [1. Récapitulatif historique conservé](#1-récapitulatif-historique-conservé)
- [2. Validation du cadrage fonctionnel — 09/03/2026](#2-validation-du-cadrage-fonctionnel--09032026)
- [3. Clôture des tests ALPHA 1.0 et suite du projet — 20/04/2026](#3-clôture-des-tests-alpha-10-et-suite-du-projet--20042026)
- [4. Phase 2 de test manuel ADMIN — 03/05/2026](#4-phase-2-de-test-manuel-admin--03052026)

## 0. Gouvernance anti-reconstruction
Règle : ce document contient uniquement ce qui est présent dans les discussions, sessions et décisions réellement observées.  
Si une information n’est pas prouvée : `RECONSTRUCTION — À CONFIRMER`.

## 1. Récapitulatif historique conservé
Les échanges et sessions historiques antérieurs à mars 2026 restent conservés dans les documents de session et les documents maîtres associés.  
Ils ne sont pas annulés par la présente mise à jour.

## 2. Validation du cadrage fonctionnel — 09/03/2026
### Métadonnées
- Date : 09/03/2026
- Statut de source : **EXTRAIT CONFIRMÉ**

### Synthèse dérivée
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md` est validé comme base officielle produit.
- Ce document est figé et ne doit pas être modifié sans validation explicite.
- Pour la suite, ne pas revenir en arrière sur ce cadrage sans demande explicite.
- La refonte du plan de développement doit respecter strictement :
  - 1 session = 1 point clair ;
  - 1 fonctionnalité ;
  - 1 patch + `git apply` ;
  - 1 DoD ;
  - 1 validation.

## 3. Clôture des tests ALPHA 1.0 et suite du projet — 20/04/2026
### Métadonnées
- Date : 20/04/2026
- Statut de source : **EXTRAIT CONFIRMÉ**

### Synthèse dérivée
- Les tests locaux de l’ALPHA 1.0 sont considérés comme clôturés.
- Le produit ALPHA n’est pas terminé.
- La suite du projet doit être pensée comme une poursuite de l’ALPHA, non comme une refonte brutale.
- La priorité de suite validée devient :
  - backend ;
  - frontend ;
  - sécurité ;
  - BDD ;
  - RGPD ;
  - puis backlog fonctionnel priorisé.
- Le plan maître officiel reste `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`.
- `PLAN_DEVELOPPEMENT_ALPHA.md` est absorbé dans le plan maître.
- La liste priorisée de besoins remontés comprend notamment :
  - affectation utilisateur à un shift ;
  - demandes d’absence ;
  - sélection multiple dans le planning ;
  - vues multiples du planning ;
  - vue globale / personnelle / binôme ;
  - gestion des stagiaires ;
  - navigation latérale ;
  - création utilisateur avec nom / prénom / initiales ;
  - refonte UI / graphisme ;
  - horaires journaliers avec cadrage légal séparé.
- La campagne `2-TEST-ALPHA` a montré plusieurs constats réels :
  - migrations Prisma non appliquées au départ sur la base locale ;
  - exécution réussie de `npx prisma migrate deploy` ;
  - absence locale de `Vehicle.isActive` avant réalignement ;
  - dashboard fonctionnel après correction locale de la base ;
  - défaut dark mode identifié comme sujet thème / frontend.


## 4. Phase 2 de test manuel ADMIN — 03/05/2026
### Métadonnées
- Date : 03/05/2026
- Session : `SESSION-20260503_TEST-LOCAL-02`
- Statut de source : **RETOUR UTILISATEUR + DOCUMENTATION DE SESSION**

### Synthèse dérivée
- La deuxième phase de test local ALPHA porte sur un test manuel ADMIN partiel, centré sur les fonctionnalités principales.
- La session précédente `SESSION-20260418_TEST-LOCAL-01` reste conservée comme phase technique locale clôturée en `NO_PATCH`.
- La phase 2 confirme que l’ALPHA est testable, mais pas encore présentable sereinement à une société pilote.
- Les principaux points positifs observés sont : login, déconnexion, dashboard après rafraîchissement, navigation après hydratation correcte, société, dépôts, véhicules, conformité, templates, audit et sécurité interface de base.
- Les principaux points non conformes observés sont :
  - session / shell incorrectement hydraté juste après connexion ;
  - module utilisateurs non exploitable ;
  - absences non testables car dépendantes des utilisateurs ;
  - planning manuel partiellement inutilisable ;
  - règles métier société partiellement préparées mais non éditables ;
  - UI réelle non suffisamment alignée avec les maquettes visuelles validées ;
  - autoschedule et matching non validés dans cette phase.
- Les besoins complémentaires remontés sont : dark/light mode, rôle `PSC1`, affectation planning simplifiée, horaires réels / pauses, fiche salarié enrichie, plusieurs gérants et suppression définitive contrôlée des éléments archivables.
- Verdict temporaire issu de la phase : `NO-GO TEMPORAIRE SOCIÉTÉ PILOTE`.

### Suites recommandées
1. Corriger l’hydratation session / shell après login.
2. Corriger le module utilisateurs ADMIN.
3. Retester utilisateurs + absences.
4. Auditer et réaligner l’UI réelle avec les maquettes validées si l’écart est confirmé.
5. Reprendre le planning manuel.
6. Reprendre autoschedule / matching seulement après stabilisation utilisateurs + planning.
