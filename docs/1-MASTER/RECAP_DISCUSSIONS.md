# Ambulance Manager — RECAP_DISCUSSIONS

Version : V1.8.0 (MASTER)  
Date : 04/05/2026

## Sommaire
- [0. Gouvernance anti-reconstruction](#0-gouvernance-anti-reconstruction)
- [1. Récapitulatif historique conservé](#1-récapitulatif-historique-conservé)
- [2. Validation du cadrage fonctionnel — 09/03/2026](#2-validation-du-cadrage-fonctionnel--09032026)
- [3. Clôture des tests ALPHA 1.0 et suite du projet — 20/04/2026](#3-clôture-des-tests-alpha-10-et-suite-du-projet--20042026)
- [4. Phase 2 de test manuel ADMIN — 03/05/2026](#4-phase-2-de-test-manuel-admin--03052026)
- [5. Clôture A23 et cadrage A24-A26 — 04/05/2026](#5-clôture-a23-et-cadrage-a24-a26--04052026)

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


## 5. Clôture A23 et cadrage A24-A26 — 04/05/2026
### Métadonnées
- Date : 04/05/2026
- Source : clôture contrôlée du bloc A23 + arbitrages utilisateur sur A24/A25/A26
- Statut de source : **DÉCISIONS UTILISATEUR + PLAN DE DÉVELOPPEMENT MIS À JOUR**

### Synthèse dérivée
- Le bloc A23 est clôturé définitivement avec le verdict :

```txt
BLOC A23 CLÔTURABLE DÉFINITIVEMENT : OUI
```

- La suite immédiate du développement ne consiste pas à lancer directement les tests société pilote.
- La suite officielle est structurée en trois blocs :
  1. `A24 — Réalignement UI/UX global sur MAQUETTE_DA` ;
  2. `A25 — Planning UI/UX & ergonomie métier` ;
  3. `A26 — Stabilisation / non-régression post UI/UX`.
- La direction artistique officielle est exclusivement :

```txt
docs/1-master/MAQUETTE/MAQUETTE_DA
```

- Les anciennes interprétations UI/UX, anciens prompts, anciennes captures ou anciens documents ne priment pas sur `MAQUETTE_DA` en cas de contradiction.
- Le bloc A24 doit viser une interface pure, simple, lisible et très proche des maquettes.
- Le mode sombre est intégré dans A24 comme déclinaison sobre de `MAQUETTE_DA`, avec bouton clair/sombre visible.
- Lucide React est autorisé pour les icônes génériques, sous réserve d’un audit qualité des icônes.
- Les captures restent utiles aux étapes majeures. Pour A25 recadré, elles ne sont pas obligatoires à chaque session : une capture avant peut être réalisée manuellement lors de A25-PLAN-UI-06 et une capture après lors de A25-PLAN-UI-11 ou `CLOTURE_A25`.
- Le planning est reconnu comme un sujet majeur et ne doit pas être noyé dans A24 : il est traité dans A25.
- A26 sert de filet de sécurité après A24 et A25 pour corriger uniquement les régressions prouvées.

### Suites recommandées
1. Ouvrir `A24-UI-01 — AUDIT` avec lecture du noyau documentaire minimal et de `REFERENCE_UI_UX_A24.md`.
2. Ne pas lancer de correction globale UI sans audit A24 préalable.
3. Préparer les captures avant uniquement pour les étapes majeures ou les pages concernées, de préférence manuellement par Nathan lorsque cela apporte une preuve utile.
4. Traiter A24 globalement, puis A25 planning, puis A26 stabilisation.
5. Après A26, décider entre :
   - relancer un bloc de développement ;
   - ou lancer une nouvelle campagne de tests.

## 6. Recadrage A25 Planning — 10/05/2026
### Métadonnées
- Date : 10/05/2026
- Source : retour manuel utilisateur après contrôle A25 et analyse des images Planning
- Statut de source : **DÉCISION UTILISATEUR + RECADRAGE DOCUMENTAIRE A25**

### Constat
- Les corrections A25 partielles peuvent être techniquement propres sans produire une page réellement fidèle à la maquette.
- Le retour manuel utilisateur indique que le rendu doit être recadré au niveau de la page complète, pas au niveau de zones isolées.
- Le bloc A25 doit être traité comme une refonte globale de la page Planning.

### Décision
- Le document `docs/1-master/REFERENCE_UI_UX_A25_PLANNING.md` est réécrit pour devenir la référence opérationnelle du bloc A25.
- Les images `Planning_V1.2.png` et `Planning_V1.2_INFO_DETAIL.png` deviennent les références visuelles concrètes à reproduire au plus proche.

Clarification ajoutée : l’encadré orange de la maquette Planning n’est pas seulement une ligne d’onglets décorative. Il pilote le contenu de l’encadré violet et les informations du panneau vert. Le mode visible `Planning manuel` doit donc être traité comme un état actif : matrice Planning + détail cellule. Les autres onglets ne doivent pas être inventés si leur contenu n’est pas visible.
- La cible est une reproduction très fidèle de la maquette visible, environ 99 % lorsque le code et les données réelles le permettent.
- La validation technique d'un patch ne suffit plus : la validation visuelle manuelle par Nathan est obligatoire avant clôture A25.

### Conséquence opérationnelle
La suite de A25 doit être pilotée dans cet ordre :
1. recadrage visuel global et documentation A25 ;
2. refonte globale de la structure Planning ;
3. reproduction de la matrice salariés × semaines ;
4. reproduction du panneau détail cellule et de la barre basse d'actions groupées ;
5. validation visuelle globale ;
6. clôture A25 uniquement si la page Planning est jugée suffisamment fidèle à la maquette.

