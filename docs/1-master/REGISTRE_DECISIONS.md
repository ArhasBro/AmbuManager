# Ambulance Manager — REGISTRE_DECISIONS

Version : V1.8.0 (MASTER)  
Date : 04/05/2026

## Sommaire
- [1. Rôle](#1-rôle)
- [2. Décisions validées historiques conservées](#2-décisions-validées-historiques-conservées)
- [3. Décisions validées au 20/04/2026](#3-décisions-validées-au-20042026)
- [3.1 Décisions validées au 03/05/2026](#31-décisions-validées-au-03052026)
- [3.2 Décisions validées au 04/05/2026](#32-décisions-validées-au-04052026)
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
  - défaut mode sombre identifié comme sujet frontend / thème.
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
  4. auditer l’écart UI/UX réel avec les maquettes validées ;
  5. reprendre le planning manuel prioritaire ;
  6. reporter les besoins BETA / backlog non bloquants.
- L’écart UI/UX ressenti par l’utilisateur entre l’application intégrée et les maquettes validées est traité comme un sujet majeur de non-présentabilité, à auditer dans une session dédiée.

## 3.2 Décisions validées au 04/05/2026
### 3.2.1 Clôture A23
- Le bloc `A23 — Stabilisation post-test manuel ADMIN / Go-No-Go société pilote` est clôturé définitivement.
- Verdict officiel :

```txt
BLOC A23 CLÔTURABLE DÉFINITIVEMENT : OUI
```

- Le passage à la suite est autorisé.
- La suite immédiate n’est pas une préparation société pilote directe : elle passe d’abord par A24, A25 et A26.

### 3.2.2 Ordre officiel post-A23
L’ordre officiel post-A23 est validé ainsi :

1. **A24 — Réalignement UI/UX global sur `MAQUETTE_DA`**
2. **A25 — Planning UI/UX & ergonomie métier**
3. **A26 — Stabilisation / non-régression post UI/UX**

A24 ne doit pas absorber le planning profond.  
A25 est réservé au planning comme sujet central.  
A26 sert de filet de sécurité après les travaux UI/UX.

### 3.2.3 Direction artistique officielle
La direction artistique officielle est exclusivement :

```txt
docs/1-master/MAQUETTE/MAQUETTE_DA
```

En cas de contradiction entre anciens documents, anciennes captures, anciens prompts, anciens ZIP ou interprétations précédentes, la référence prioritaire est :

```txt
docs/1-master/MAQUETTE/MAQUETTE_DA
```

Les autres éléments du dossier `docs/1-master/MAQUETTE/` peuvent servir de supports complémentaires, mais ils ne priment pas sur `MAQUETTE_DA`.

### 3.2.4 Niveau d’exigence visuelle A24
- A24 vise une fidélité forte à la maquette.
- L’interface cible doit être pure, simple, lisible et professionnelle.
- Les éléments secondaires peuvent être repliés, hiérarchisés ou déplacés en panneaux/drawers si la page réelle est trop chargée.
- A24 ne doit pas supprimer silencieusement une information métier existante.

### 3.2.5 Mode sombre
- Le mode sombre est intégré dans A24.
- Le libellé documentaire retenu est **mode sombre**.
- Un bouton visible clair/sombre est attendu.
- Le mode sombre doit être une déclinaison sobre de `MAQUETTE_DA`, pas une nouvelle direction artistique.
- Le mode clair reste la référence principale sauf décision contraire explicite.

### 3.2.6 Icônes
- Lucide React est autorisé pour les icônes génériques.
- Les icônes PNG/SVG issues des maquettes sont principalement des références visuelles.
- Les assets spécifiques ambulance / marque peuvent être conservés uniquement s’ils sont propres, lisibles et réellement spécifiques.
- Les icônes doivent être classées pendant A24 en :
  1. icônes spécifiques à conserver ;
  2. icônes génériques à remplacer par Lucide React ;
  3. icônes à refaire ou abandonner si qualité insuffisante.

### 3.2.7 Responsive
- A24 doit prendre en compte un responsive minimal afin d’éviter les grosses casses.
- La vraie adaptation mobile est reportée après l’ALPHA.

### 3.2.8 Captures et preuves visuelles
- Les sessions A24 et A25 doivent produire des captures avant/après.
- Les captures servent à vérifier que l’intégration ne s’éloigne pas à nouveau des maquettes.
- Une page ne peut pas être déclarée conforme si la comparaison visuelle n’est pas démontrée.

### 3.2.9 Documentation de référence A24
- Le fichier `docs/1-master/REFERENCE_UI_UX_A24.md` est créé comme document de référence pour l’exécution A24.
- Ce fichier doit être lu pour les sessions A24 et peut servir de référence complémentaire pour A25 et A26.

## 4. Décisions en attente
- niveau réel de conformité atteint par A24 après comparaison avant/après ;
- arbitrages concrets d’icônes après audit A24 ;
- éventuels résiduels visuels à reporter hors A24 ;
- périmètre exact des corrections planning A25 après audit préparatoire A24 ;
- régressions éventuelles à corriger en A26 ;
- décision après A26 : relancer un bloc de développement ou ouvrir une nouvelle campagne de tests.

Les points suivants sont explicitement sortis des décisions en attente pour l’ouverture A24 :
- ordre A24 / A25 / A26 ;
- priorité de `MAQUETTE_DA` ;
- intégration du mode sombre dans A24 ;
- autorisation de Lucide React pour les icônes génériques ;
- obligation de captures avant/après.

## 5. Gouvernance documentaire
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md` reste figé tant qu’aucun arbitrage explicite produit n’est demandé.
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md` reste le plan officiel unique.
- `docs/1-master/REFERENCE_UI_UX_A24.md` devient la référence documentaire d’exécution pour A24.
- Les documents maîtres doivent utiliser la structure réelle :
  - `docs/1-master/*`
  - `docs/1-master/MAQUETTE/*`
  - `docs/1-master/MAQUETTE/MAQUETTE_DA/*`
  - `docs/2-sessions/*`
  - `docs/2-sessions/*/SESSION-*/PATCH/*`
  - `docs/3-templates/*`
- `docs/3-patches/*` devient un emplacement legacy toléré pour l'historique déjà existant, mais n'est plus la cible canonique des nouvelles sessions.

## 6. Gouvernance des patchs et sessions
- `NO_PATCH` reste valide lorsqu’aucun patch repo officiel n’est produit, même si la session a comporté des constats ou actions locales.
- Une correction locale manuelle effectuée pour poursuivre un test doit être documentée honnêtement si elle n’a pas encore été transformée en patch repo.
- Aucun patch ne doit être régénéré artificiellement s’il n’existe pas de diff réel dans le dépôt courant.
- Une session documentaire de test manuel clôturée en `NO_PATCH` doit disposer d’un marqueur documentaire cohérent côté `docs/2-sessions/.../PATCH/NO_PATCH.md` si elle est intégrée au dépôt.
- Les sessions A24/A25 doivent produire des patchs code uniquement s’ils modifient réellement le dépôt applicatif.
- Les sessions A24/A25/A26 doivent conserver une séparation claire entre patch code, patch correctif minimal et patch documentaire final.
