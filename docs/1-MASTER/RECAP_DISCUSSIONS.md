# Ambulance Manager — RECAP_DISCUSSIONS

Version : V1.9.0 (MASTER)  
Date : 13/05/2026

## Sommaire
- [0. Gouvernance anti-reconstruction](#0-gouvernance-anti-reconstruction)
- [1. Récapitulatif historique conservé](#1-récapitulatif-historique-conservé)
- [2. Validation du cadrage fonctionnel — 09/03/2026](#2-validation-du-cadrage-fonctionnel--09032026)
- [3. Clôture des tests ALPHA 1.0 et suite du projet — 20/04/2026](#3-clôture-des-tests-alpha-10-et-suite-du-projet--20042026)
- [4. Phase 2 de test manuel ADMIN — 03/05/2026](#4-phase-2-de-test-manuel-admin--03052026)
- [5. Clôture A23 et cadrage A24-A26 initial — 04/05/2026](#5-clôture-a23-et-cadrage-a24-a26-initial--04052026)
- [6. Recadrage A25 Planning — 10/05/2026](#6-recadrage-a25-planning--10052026)
- [7. Chantier documentaire transversal UI/UX et structuration A26/A27 — 13/05/2026](#7-chantier-documentaire-transversal-uiux-et-structuration-a26a27--13052026)

## 0. Gouvernance anti-reconstruction
Règle : ce document contient uniquement ce qui est présent dans les discussions, sessions et décisions réellement observées.  
Si une information n’est pas prouvée : `RECONSTRUCTION — À CONFIRMER`.

Ce document n’est pas un plan d’exécution. Il sert à conserver la continuité des échanges et décisions de pilotage.  
Le plan officiel reste `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md`.

## 1. Récapitulatif historique conservé
Les échanges et sessions historiques antérieurs à mars 2026 restent conservés dans les documents de session et les documents maîtres associés.  
Ils ne sont pas annulés par la présente mise à jour.

Les anciens chemins documentaires en minuscules peuvent rester présents dans les anciens livrables historiques lorsqu’ils décrivent l’état réel du projet au moment de leur production.  
Les nouveaux documents actifs doivent utiliser la casse officielle :

```txt
docs/1-MASTER/
docs/2-SESSIONS/
docs/3-TEMPLATES/
docs/4-ARCHIVES/
```

## 2. Validation du cadrage fonctionnel — 09/03/2026
### Métadonnées
- Date : 09/03/2026
- Statut de source : **EXTRAIT CONFIRMÉ**

### Synthèse dérivée
- `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md` est validé comme base officielle produit.
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
- Le plan maître officiel reste `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md`.
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
  - défaut mode sombre identifié comme sujet thème / frontend.

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

### Suites recommandées à ce stade
1. Corriger l’hydratation session / shell après login.
2. Corriger le module utilisateurs ADMIN.
3. Retester utilisateurs + absences.
4. Auditer et réaligner l’UI réelle avec les maquettes validées si l’écart est confirmé.
5. Reprendre le planning manuel.
6. Reprendre autoschedule / matching seulement après stabilisation utilisateurs + planning.

## 5. Clôture A23 et cadrage A24-A26 initial — 04/05/2026
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
- La suite officielle initiale était structurée en trois blocs :
  1. `A24 — Réalignement UI/UX global sur MAQUETTE_DA` ;
  2. `A25 — Planning UI/UX & ergonomie métier` ;
  3. `A26 — Stabilisation / non-régression post UI/UX`.
- Cette structuration initiale est ensuite actualisée le 13/05/2026 : A26 devient le bloc d’exécution UI/UX visuelle 99 %, et l’ancien rôle de filet de sécurité est décalé en A27.
- La direction artistique officielle est exclusivement :

```txt
docs/1-MASTER/1-MAQUETTE/MAQUETTE_DA
```

- Les anciennes interprétations UI/UX, anciens prompts, anciennes captures ou anciens documents ne priment pas sur `MAQUETTE_DA` en cas de contradiction.
- Le bloc A24 doit viser une interface pure, simple, lisible et très proche des maquettes.
- Le mode sombre est intégré dans A24 comme déclinaison sobre de `MAQUETTE_DA`, avec bouton clair/sombre visible.
- Lucide React est autorisé pour les icônes génériques, sous réserve d’un audit qualité des icônes.
- Les captures restent utiles aux étapes majeures, mais Codex ne doit pas générer automatiquement des captures à chaque session.
- Le planning est reconnu comme un sujet majeur et ne doit pas être noyé dans A24 : il est traité dans A25.

### Suites recommandées à ce stade
1. Traiter A24 globalement.
2. Traiter A25 Planning comme bloc dédié.
3. Sécuriser la suite par un bloc post-UI/UX.
4. Après stabilisation, décider entre relancer un bloc de développement ou ouvrir une nouvelle campagne de tests.

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
- Le document `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_A25_PLANNING.md` devient la référence opérationnelle du bloc A25.
- Les images `Planning_V1.2.png` et `Planning_V1.2_INFO_DETAIL.png` deviennent les références visuelles concrètes à reproduire au plus proche.
- L’encadré orange de la maquette Planning n’est pas seulement une ligne d’onglets décorative. Il pilote le contenu de l’encadré violet et les informations du panneau vert.
- Le mode visible `Planning manuel` doit donc être traité comme un état actif : matrice Planning + détail cellule.
- Les autres onglets ne doivent pas être inventés si leur contenu n’est pas visible.
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

## 7. Chantier documentaire transversal UI/UX et structuration A26/A27 — 13/05/2026
### Métadonnées
- Date : 13/05/2026
- Source : chantier documentaire transversal UI/UX hors bloc applicatif + mise à jour du plan + registre de décisions
- Statut de source : **DÉCISION UTILISATEUR + DOCUMENTATION MAÎTRE MISE À JOUR**

### Constat
- Après A24 et A25, la méthode validée sur Planning doit être reproduite pour toutes les pages disposant d’une maquette officielle.
- Les blocs applicatifs doivent rester réservés à la production code.
- Un chantier documentaire transversal est donc ouvert hors bloc applicatif pour cadrer les références page par page avant exécution code.
- Les images officielles sont confirmées comme vérité visuelle.
- Les documents `REFERENCE_UI_UX_<PAGE>.md` sont confirmés comme traduction codable pour Codex.
- Le code réel reste la vérité fonctionnelle.
- La documentation MAQUETTE générale reste un contexte DA uniquement.

### Décisions documentaires
- La casse officielle des dossiers documentaires est :

```txt
docs/1-MASTER/
docs/2-SESSIONS/
docs/3-TEMPLATES/
docs/4-ARCHIVES/
```

- Les anciennes variantes en minuscules sont obsolètes pour les nouveaux documents, prompts, preuves et références.
- Les anciens livrables historiques peuvent conserver les anciens chemins si cela préserve la traçabilité.
- Le dossier transversal officiel des références UI/UX est :

```txt
docs/1-MASTER/2-REFERENCE_UI_UX/
```

- Le document `REFERENCE_UI_UX_A24.md` est replacé dans ce dossier comme contexte historique A24.
- Le document `REFERENCE_UI_UX_A25_PLANNING.md` est ajouté au même dossier comme référence Planning déjà validée.
- Le document `REFERENCE_CODEX_UI_UX_VISUEL_99.md` est créé comme référence courte et opérationnelle pour Codex.
- Le dossier `ICONE` / `ICONES` est neutralisé : il ne doit pas redevenir une dépendance bloquante.
- La formule `INFORMATION NON FOURNIE — À CONFIRMER` reste réservée aux documents, audits et contrôles QA ; elle ne doit jamais être affichée telle quelle dans l’interface utilisateur finale.

### Références créées ou confirmées
Le dossier `docs/1-MASTER/2-REFERENCE_UI_UX/` contient notamment :

```txt
REFERENCE_UI_UX_INDEX_MAQUETTES.md
REFERENCE_UI_UX_SHELL_GLOBAL.md
REFERENCE_CODEX_UI_UX_VISUEL_99.md
REFERENCE_UI_UX_A24.md
REFERENCE_UI_UX_A25_PLANNING.md
REFERENCE_UI_UX_LOGIN.md
REFERENCE_UI_UX_DASHBOARD.md
REFERENCE_UI_UX_COMPANY.md
REFERENCE_UI_UX_DEPOTS_BASES.md
REFERENCE_UI_UX_VEHICLES.md
REFERENCE_UI_UX_TEMPLATES.md
REFERENCE_UI_UX_USERS_RH.md
REFERENCE_UI_UX_ONBOARDING.md
REFERENCE_UI_UX_AUDIT.md
REFERENCE_UI_UX_PRIVACY.md
```

### Décisions A26/A27
- `A26` devient le bloc applicatif suivant :

```txt
BLOC A26 — Exécution UI/UX visuelle 99 % sur références officielles
```

- A26 n’est pas un bloc documentaire : il exécute en code les références déjà préparées.
- A26 commence uniquement par :

```txt
A26-UI-01 — AUDIT+CADRAGE — Audit d’exécution visuelle page par page
```

- Cette session est créée sous :

```txt
docs/2-SESSIONS/1-ALPHA/BLOC_A26/SESSION-20260513-01_A26_A26-UI-01/
```

- Le découpage définitif d’A26 (`A26-UI-02` à `A26-UI-XX`) sera établi uniquement après le retour complet de `A26-UI-01`.
- L’ancien rôle d’A26 comme filet de sécurité post UI/UX est décalé en `A27`.
- L’objectif officiel d’A27 devient :

```txt
Vérifier que les réalignements UI/UX réalisés en A24, A25 et A26 n’ont pas introduit de régressions visuelles, fonctionnelles ou de navigation, puis corriger uniquement les régressions prouvées.
```

### Conséquence opérationnelle
La suite immédiate est :

1. finaliser la synchronisation documentaire maître ;
2. produire puis contrôler `A26-UI-01` ;
3. utiliser le retour de `A26-UI-01` pour structurer définitivement `A26-UI-02` à `A26-UI-XX` ;
4. exécuter les corrections visuelles page par page ou par regroupements justifiés ;
5. clôturer A26 ;
6. ouvrir A27 uniquement comme contrôle de non-régression post A24/A25/A26.
