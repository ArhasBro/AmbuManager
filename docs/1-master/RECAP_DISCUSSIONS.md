# Ambulance Manager — RECAP_DISCUSSIONS

Version : V1.6.0 (MASTER)  
Date : 20/04/2026

## Sommaire
- [0. Gouvernance anti-reconstruction](#0-gouvernance-anti-reconstruction)
- [1. Récapitulatif historique conservé](#1-récapitulatif-historique-conservé)
- [2. Validation du cadrage fonctionnel — 09/03/2026](#2-validation-du-cadrage-fonctionnel--09032026)
- [3. Clôture des tests ALPHA 1.0 et suite du projet — 20/04/2026](#3-clôture-des-tests-alpha-10-et-suite-du-projet--20042026)

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
