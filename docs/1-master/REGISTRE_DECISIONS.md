# Ambulance Manager — REGISTRE_DECISIONS

Version : V1.7.0 (MASTER)  
Date : 03/05/2026

## Sommaire
- [1. Rôle](#1-rôle)
- [2. Décisions validées historiques conservées](#2-décisions-validées-historiques-conservées)
- [3. Décisions validées au 20/04/2026](#3-décisions-validées-au-20042026)
- [3.1 Décisions validées au 03/05/2026](#31-décisions-validées-au-03052026)
- [4. Décisions en attente](#4-décisions-en-attente)
- [5. Gouvernance documentaire](#5-gouvernance-documentaire)
- [6. Gouvernance des patchs et sessions](#6-gouvernance-des-patchs-et-sessions)

## 1. Rôle
Registre unique des décisions techniques, méthodologiques et fonctionnelles validées.  
Les statuts globaux s’alignent sur `docs/1-master/ETAT_GLOBAL_PROJET.md`.

## 2. Décisions validées historiques conservées
- Multi-tenant strict via `companyId`.
- Ordre cible : **Data → Services → API → UI**.
- Format API attendu : `{ ok:true, data } / { ok:false, error, details? }`.
- Session NextAuth enrichie (`role`, `companyId`) + RBAC / permissions.
- Une session validée n’annule jamais la nécessité d’une validation explicite utilisateur.
- Chaque bloc du plan doit se terminer par une session de clôture explicite `CLOTURE_<BLOC>`.
- Le cadrage produit officiel est porté par `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`.

## 3. Décisions validées au 20/04/2026
- L’ALPHA 1.0 est considérée comme clôturée sur son cycle de tests locaux.
- Le produit ALPHA n’est pas terminé.
- La suite prioritaire du projet devient une **consolidation du socle** avant une partie des nouvelles fonctionnalités.
- Les axes de travail prioritaires à intégrer dans la suite de l’ALPHA sont :
  - backend ;
  - frontend ;
  - sécurité ;
  - BDD ;
  - RGPD ;
  - puis backlog fonctionnel priorisé.
- Le plan officiel reste `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`.
- `docs/1-master/PLAN_DEVELOPPEMENT_ALPHA.md` est absorbé dans le plan maître et n’a pas vocation à rester autonome.
- Les sessions historiques clôturées ne doivent pas être mass-modifiées uniquement pour corriger d’anciens chemins documentaires.
- La campagne `2-TEST-ALPHA` est une source de vérité complémentaire pour les constats réels locaux.
- Les constats locaux suivants sont retenus comme réels :
  - migrations Prisma non appliquées au départ sur l’environnement local ;
  - exécution réussie de `npx prisma migrate deploy` ;
  - absence locale de la colonne `Vehicle.isActive` avant réalignement ;
  - dashboard fonctionnel après correction locale de la base ;
  - défaut dark mode identifié comme sujet frontend / thème.
- À ce stade, ces constats ne valent pas à eux seuls refonte du cadrage produit.

## 3.1 Décisions validées au 03/05/2026
- `SESSION-20260503_TEST-LOCAL-02` est retenue comme deuxième phase officielle de test local ALPHA, centrée sur le rôle ADMIN.
- La session est documentaire et se clôture en `NO_PATCH` : aucune correction code n’a été appliquée dans cette session.
- Le verdict produit temporaire issu du test manuel ADMIN est : `NO-GO TEMPORAIRE SOCIÉTÉ PILOTE`.
- Les constats de test manuel ADMIN deviennent une source de priorisation pour les prochaines sessions.
- Les priorités immédiates validées pour la suite sont :
  1. corriger l’hydratation session / shell après login ;
  2. corriger le module utilisateurs ADMIN ;
  3. retester utilisateurs + absences ;
  4. auditer l’écart UI/UX réel par rapport aux maquettes validées ;
  5. reprendre le planning manuel après stabilisation utilisateurs ;
  6. reporter les besoins BETA / backlog non bloquants.
- L’écart UI/UX ressenti par l’utilisateur entre l’application intégrée et les maquettes validées est traité comme un sujet majeur de non-présentabilité, à auditer dans une session dédiée.

## 4. Décisions en attente
- faut-il transformer l’écart `Vehicle.isActive` en correctif repo / migration dédié(e) ou le documenter seulement comme anomalie locale constatée ;
- niveau de profondeur à traiter immédiatement sur le dark mode ;
- reproduction technique et cause racine du `SERVER_ERROR` / `VALIDATION_ERROR` observé sur `/users` ;
- cause exacte de l’hydratation session / shell incorrecte juste après connexion ;
- niveau réel d’écart entre UI intégrée A22 et maquettes validées A21 ;
- statut métier de `PSC1` : rôle principal, qualification ou compétence ;
- possibilité réelle de plusieurs gérants dans une même société ;
- gouvernance de suppression définitive des éléments archivables ;
- découpage précis des futures sessions de stabilisation post-test manuel ;
- intégration future des sujets : demandes d’absence, affectation à un shift, sélection multiple, planning avancé, stagiaires, navigation latérale, enrichissement utilisateurs, horaires journaliers.

## 5. Gouvernance documentaire
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md` reste figé tant qu’aucun arbitrage explicite produit n’est demandé.
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md` reste le plan officiel unique.
- Les documents maîtres doivent utiliser la structure réelle :
  - `docs/1-master/*`
  - `docs/2-sessions/*`
  - `docs/2-sessions/*/SESSION-*/PATCH/*`
  - `docs/3-templates/*`
- `docs/3-patches/*` devient un emplacement legacy toléré pour l'historique déjà existant, mais n'est plus la cible canonique des nouvelles sessions.

## 6. Gouvernance des patchs et sessions
- `NO_PATCH` reste valide lorsqu’aucun patch repo officiel n’est produit, même si la session a comporté des constats ou actions locales.
- Une correction locale manuelle effectuée pour poursuivre un test doit être documentée honnêtement si elle n’a pas encore été transformée en patch repo.
- Aucun patch ne doit être régénéré artificiellement s’il n’existe pas de diff réel dans le dépôt courant.
- Une session documentaire de test manuel clôturée en `NO_PATCH` doit disposer d’un marqueur documentaire cohérent côté `docs/2-sessions/2-TEST-ALPHA/2-PATCHS/<SESSION_ID>/NO_PATCH.md` si elle est intégrée au dépôt.
