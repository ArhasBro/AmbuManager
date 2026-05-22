# Ambulance Manager — REGISTRE_DECISIONS

Version : V1.9.0 (MASTER)  
Date : 13/05/2026

## Sommaire
- [1. Rôle](#1-rôle)
- [2. Décisions validées historiques conservées](#2-décisions-validées-historiques-conservées)
- [3. Décisions validées au 20/04/2026](#3-décisions-validées-au-20042026)
- [3.1 Décisions validées au 03/05/2026](#31-décisions-validées-au-03052026)
- [3.2 Décisions validées au 04/05/2026](#32-décisions-validées-au-04052026)
- [3.3 Décisions validées au 13/05/2026](#33-décisions-validées-au-13052026)
- [4. Décisions en attente](#4-décisions-en-attente)
- [5. Gouvernance documentaire](#5-gouvernance-documentaire)
- [6. Gouvernance des patchs et sessions](#6-gouvernance-des-patchs-et-sessions)

## 1. Rôle
Registre unique des décisions techniques, méthodologiques et fonctionnelles validées.  
Les statuts globaux s’alignent sur `docs/1-MASTER/ETAT_GLOBAL_PROJET.md`.

Ce registre ne remplace pas le plan officiel. Il trace les décisions validées qui orientent :
- le plan de développement ;
- les documents maîtres ;
- les sessions ;
- les arbitrages UI/UX ;
- la gouvernance documentaire ;
- la production Codex ;
- le contrôle qualité ChatGPT.

## 2. Décisions validées historiques conservées
- Multi-tenant strict via `companyId`.
- Ordre cible : **Data → Services → API → UI**.
- Format API attendu : `{ ok:true, data } / { ok:false, error, details? }`.
- Session NextAuth enrichie (`role`, `companyId`) + RBAC / permissions.
- Une session validée n’annule jamais la nécessité d’une validation explicite utilisateur.
- Chaque bloc du plan doit se terminer par une session de clôture explicite `CLOTURE_<BLOC>`.
- Le cadrage produit officiel est porté par `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md`.

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
- Le plan officiel reste `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md`.
- `docs/1-MASTER/PLAN_DEVELOPPEMENT_ALPHA.md` est absorbé dans le plan maître et n’a pas vocation à rester autonome.
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
- La suite immédiate n’est pas une préparation société pilote directe : elle passe d’abord par A24, A25 et la suite UI/UX validée dans le plan.

### 3.2.2 Ordre officiel post-A23 initial
L’ordre officiel post-A23 initial était validé ainsi :

1. **A24 — Réalignement UI/UX global sur `MAQUETTES PNG OFFICIELLES`**
2. **A25 — Planning UI/UX & ergonomie métier**
3. **A26 — Stabilisation / non-régression post UI/UX**

Décision actualisée au 13/05/2026 : cet ordre est complété et remplacé pour la suite par la nouvelle structuration A26/A27 décrite en section 3.3.

A24 ne doit pas absorber le planning profond.  
A25 est réservé au planning comme sujet central.

### 3.2.3 Direction artistique officielle
La direction artistique officielle est exclusivement :

```txt
docs/1-MASTER/1-MAQUETTE
```

En cas de contradiction entre anciens documents, anciennes captures, anciens prompts, anciens ZIP ou interprétations précédentes, la référence prioritaire est :

```txt
docs/1-MASTER/1-MAQUETTE
```

Les autres éléments du dossier `docs/1-MASTER/1-MAQUETTE/` peuvent servir de supports complémentaires, mais ils ne priment pas sur `MAQUETTES PNG OFFICIELLES`.

### 3.2.4 Niveau d’exigence visuelle A24
- A24 vise une fidélité forte à la maquette.
- L’interface cible doit être pure, simple, lisible et professionnelle.
- Les éléments secondaires peuvent être repliés, hiérarchisés ou déplacés en panneaux/drawers si la page réelle est trop chargée.
- A24 ne doit pas supprimer silencieusement une information métier existante.

### 3.2.5 Mode sombre
- Le mode sombre est intégré dans A24.
- Le libellé documentaire retenu est **mode sombre**.
- Un bouton visible clair/sombre est attendu.
- Le mode sombre doit être une déclinaison sobre des maquettes PNG officielles, pas une nouvelle direction artistique.
- Le mode clair reste la référence principale sauf décision contraire explicite.

### 3.2.6 Icônes
- Lucide React est autorisé pour les icônes génériques.
- Les icônes PNG/SVG issues des maquettes sont principalement des références visuelles.
- Les assets spécifiques ambulance / marque peuvent être conservés uniquement s’ils sont propres, lisibles et réellement spécifiques.
- Les icônes doivent être classées pendant A24 en :
  1. icônes spécifiques à conserver ;
  2. icônes génériques à remplacer par Lucide React ;
  3. icônes à refaire ou abandonner si qualité insuffisante.

Décision actualisée au 13/05/2026 : le dossier `ICONE` / `ICONES` est neutralisé pour le chantier UI/UX transversal. Il ne doit pas redevenir une dépendance bloquante pour Codex.

### 3.2.7 Responsive
- A24 doit prendre en compte un responsive minimal afin d’éviter les grosses casses.
- La vraie adaptation mobile est reportée après l’ALPHA.

### 3.2.8 Captures et preuves visuelles
- Les captures restent utiles pour les étapes majeures de comparaison visuelle.
- Pour A25 recadré, les captures ne sont pas obligatoires à chaque session.
- Codex ne doit pas produire de captures automatiquement afin d’éviter une consommation inutile de crédits.
- Une capture avant peut être réalisée manuellement par Nathan au moment de l’audit/cadrage A25-PLAN-UI-06.
- Une capture après peut être réalisée manuellement par Nathan au moment de A25-PLAN-UI-11 ou de `CLOTURE_A25`.
- Pour les sessions intermédiaires, une documentation structurée et une checklist de vérification visuelle manuelle suffisent.
- Une page ne peut pas être déclarée conforme si la comparaison visuelle ou le retour manuel utilisateur n’est pas démontré.

Décision actualisée au 13/05/2026 : pour la phase UI/UX visuelle 99 %, Codex ne doit pas générer automatiquement de captures. Nathan réalise les vérifications visuelles manuellement à partir des checklists fournies.

### 3.2.9 Documentation de référence A24
- Le fichier `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_A24.md` est conservé comme contexte historique UI/UX A24.
- Ce fichier peut servir de contexte complémentaire, mais ne prime pas sur les images officielles ni sur les références page par page.

### 3.2.10 Recadrage A25 Planning — fidélité maquette
Décision validée au 10/05/2026 : le bloc A25 ne doit plus être jugé uniquement sur des corrections locales ou sur la propreté technique des patchs.

A25 doit viser une refonte globale de la page Planning en se rapprochant le plus possible des images officielles :

```txt
docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/4-Planning/Planning_V1.2.png
docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/4-Planning/Planning_V1.2_INFO_DETAIL.png
```

La référence documentaire officielle du bloc A25 est :

```txt
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_A25_PLANNING.md
```

Cette référence doit décrire précisément la structure attendue : header, toolbar filtres/vue/exports, onglets, matrice salariés × semaines, panneau droit de détail cellule, barre basse d'actions groupées, badges, états visuels et compatibilité clair/sombre.

Décision complémentaire : dans `Planning_V1.2_INFO_DETAIL.png`, l’encadré orange correspond à une navigation par onglets qui pilote à la fois l’encadré violet et l’encadré vert. Le contenu violet et le panneau vert doivent donc changer ensemble selon l’onglet actif. Pour l’image visible, `Planning manuel` affiche la matrice salariés × semaines et le détail de cellule. Les contenus des autres onglets ne doivent pas être inventés si leur contenu n’est pas visible ou prouvé par le code.

Décision complémentaire : la formule `INFORMATION NON FOURNIE — À CONFIRMER` est réservée à la documentation, aux rapports, aux prompts et aux contrôles qualité. Elle ne doit jamais être affichée telle quelle dans l’interface utilisateur finale. Côté interface, utiliser un libellé métier sobre comme `Aucun élément à afficher`, `Contenu non disponible`, `Donnée non renseignée` ou `Configuration à compléter`.

Décision complémentaire : la fin de A25 est recadrée en sessions `A25-PLAN-UI-06` à `A25-PLAN-UI-11`, puis `CLOTURE_A25`. `A25-PLAN-UI-10` devient une session de finitions visuelles, états, mode sombre et responsive minimal. `A25-PLAN-UI-11` porte la validation visuelle globale.

La validation A25 exige une conformité visuelle globale. Un patch peut être techniquement valide mais non validé visuellement si le rendu ne correspond pas suffisamment à la maquette.

## 3.3 Décisions validées au 13/05/2026

### 3.3.1 Normalisation officielle de la casse documentaire
La casse officielle des dossiers documentaires est :

```txt
docs/1-MASTER/
docs/2-SESSIONS/
docs/3-TEMPLATES/
docs/4-ARCHIVES/
```

Les anciennes variantes en minuscules ne doivent plus être utilisées dans les nouveaux documents, prompts, preuves, références ou livrables documentaires :

```txt
docs/1-MASTER/
docs/2-SESSIONS/
docs/3-templates/
docs/4-archives/
```

Exception : les anciens fichiers historiques, anciens patchs `.diff`, anciennes preuves terminales, anciens rapports de session et archives peuvent conserver les anciens chemins s’ils décrivent l’état réel du projet au moment où ils ont été produits.

Aucune correction rétroactive massive ne doit être faite dans les anciens livrables historiques si cela risque de dénaturer la traçabilité.

### 3.3.2 Création du dossier transversal de références UI/UX
Le dossier transversal officiel des références UI/UX est :

```txt
docs/1-MASTER/2-REFERENCE_UI_UX/
```

Ce dossier regroupe :

```txt
REFERENCE_UI_UX_INDEX_MAQUETTES.md
REFERENCE_UI_UX_SHELL_GLOBAL.md
REFERENCE_CODEX_UI_UX_VISUEL_99.md
REFERENCE_UI_UX_<PAGE>.md
REFERENCE_UI_UX_A25_PLANNING.md
REFERENCE_UI_UX_A24.md
```

Le fichier `REFERENCE_UI_UX_A24.md` est conservé comme contexte historique. Il ne prime pas sur les images officielles ni sur les références page par page.

### 3.3.3 Priorité visuelle 99 %
Le chantier UI/UX transversal est verrouillé comme phase visuelle.

Règle de vérité :

```txt
IMAGE OFFICIELLE = VÉRITÉ VISUELLE
REFERENCE_UI_UX_<PAGE>.md = TRADUCTION CODABLE POUR CODEX
CODE RÉEL = VÉRITÉ FONCTIONNELLE
DOCUMENTATION MAQUETTE GÉNÉRALE = CONTEXTE DA UNIQUEMENT
```

Objectif : reproduire les maquettes officielles à environ 99 %.

Le fonctionnel existant ne doit pas bloquer cette phase visuelle. Si un élément fonctionnel existant gêne la fidélité à la maquette, il peut être :

```txt
masqué visuellement
déplacé
replié
simplifié
supprimé de l’affichage par défaut
```

Les arbitrages fonctionnels seront traités plus tard dans des sessions applicatives dédiées.

### 3.3.4 Neutralisation du dossier ICONE / ICONES
Le dossier `ICONE` / `ICONES` est supprimé, neutralisé ou considéré inutile pour le chantier UI/UX transversal.

Conséquences :
- Codex ne doit pas dépendre de ce dossier ;
- aucune session ne doit recréer de dépendance bloquante à ce dossier ;
- les icônes visibles dans les maquettes servent de repères visuels ;
- Lucide React reste autorisé pour les icônes génériques ;
- les assets spécifiques ambulance / marque peuvent être traités uniquement s’ils sont nécessaires et propres.

### 3.3.5 Référence Codex UI/UX visuel 99 %
Le document suivant est créé comme référence courte et opérationnelle pour Codex :

```txt
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_CODEX_UI_UX_VISUEL_99.md
```

Il doit être lu dans les futures sessions UI/UX visuelles avec :

```txt
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_INDEX_MAQUETTES.md
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_SHELL_GLOBAL.md
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_<PAGE>.md
```

### 3.3.6 A26 devient le bloc d’exécution UI/UX visuelle 99 %
Décision validée : A26 devient le bloc applicatif de production visuelle suivant :

```txt
BLOC A26 — Exécution UI/UX visuelle 99 % sur références officielles
```

A26 n’est pas un bloc documentaire.  
A26 exécute en code les références déjà préparées dans `docs/1-MASTER/2-REFERENCE_UI_UX/`.

A26 ne doit pas :
- créer une nouvelle direction artistique ;
- refaire les documents de référence ;
- ajouter du fonctionnel métier ;
- modifier API, Prisma, RBAC, services métier, logique serveur, autoschedule ou matching ;
- scanner inutilement tout le dépôt ;
- générer automatiquement des captures.

### 3.3.7 A26 commence par une session d’audit obligatoire
Décision validée : A26 commence uniquement par :

```txt
A26-UI-01 — AUDIT+CADRAGE — Audit d’exécution visuelle page par page
```

La session est créée sous :

```txt
docs/2-SESSIONS/1-ALPHA/BLOC_A26/SESSION-20260513-01_A26_A26-UI-01/
```

Objectif de cette session : auditer l’existant réel après A24 et A25, comparer chaque page aux références UI/UX officielles, identifier les écarts visuels restants, puis proposer le découpage exact du bloc A26.

A26-UI-01 doit produire :
- inventaire page par page ;
- état réel du code ;
- écart visuel avec chaque maquette ;
- fichiers code réellement concernés ;
- niveau d’effort estimé ;
- risques ;
- proposition de découpage A26 ;
- ordre recommandé de production ;
- regroupements possibles ;
- pages à traiter seules ;
- pages à traiter après Shell global ;
- éléments fonctionnels à masquer / déplacer / replier / simplifier visuellement.

### 3.3.8 Découpage final d’A26 reporté après A26-UI-01
Décision validée : les sessions `A26-UI-02` à `A26-UI-XX` ne sont pas figées avant l’audit.

Le découpage définitif du bloc A26 sera établi uniquement après le retour complet de `A26-UI-01`.

Cette décision évite :
- un découpage théorique non fondé sur le code réel ;
- des sessions trop larges ;
- des sessions trop petites ;
- des regroupements incohérents ;
- une mauvaise estimation du Shell global ;
- une production Codex trop coûteuse.

### 3.3.9 A27 devient le bloc de stabilisation / non-régression post UI/UX
L’ancien rôle de A26 est décalé en A27.

Objectif officiel A27 :

```txt
Vérifier que les réalignements UI/UX réalisés en A24, A25 et A26 n’ont pas introduit de régressions visuelles, fonctionnelles ou de navigation, puis corriger uniquement les régressions prouvées.
```

A27 ne doit pas refaire A26.  
A27 est un bloc de sécurisation finale après les réalignements UI/UX A24, A25 et A26.

### 3.3.10 Mise à jour du plan de développement
Le plan officiel est mis à jour en :

```txt
Version : V2.4.2 (MASTER)
Date : 13/05/2026
```

Il porte désormais :

```txt
A26 = Exécution UI/UX visuelle 99 % sur références officielles
A27 = Stabilisation / non-régression post UI/UX A24-A25-A26
```

Le point 1 de la séquence de préparation est considéré validable après intégration du plan et création de `A26-UI-01`.

## 4. Décisions en attente
- résultat de l’audit `A26-UI-01` ;
- découpage définitif des sessions `A26-UI-02` à `A26-UI-XX` ;
- ordre exact de production A26 après audit ;
- éventuels regroupements de pages A26 si justifiés par le code réel ;
- éventuelles pages A26 à traiter seules si trop lourdes ;
- éventuels résiduels visuels à reporter hors A26 ;
- conformité visuelle finale des pages traitées en A26 ;
- ouverture effective du bloc A27 après clôture A26 ;
- régressions éventuelles à corriger en A27 ;
- décision après A27 : relancer un bloc de développement, ouvrir une nouvelle campagne de tests ou préparer une étape de stabilisation société pilote.

Les points suivants sont explicitement sortis des décisions en attente :
- ordre A24 / A25 / A26 / A27 ;
- priorité des maquettes PNG officielles ;
- intégration du mode sombre dans A24 ;
- autorisation de Lucide React pour les icônes génériques ;
- neutralisation du dossier `ICONE` / `ICONES` ;
- règle de captures non automatiques par Codex ;
- destination officielle `docs/1-MASTER/2-REFERENCE_UI_UX/` ;
- création de `REFERENCE_CODEX_UI_UX_VISUEL_99.md` ;
- création de la session `A26-UI-01`.

## 5. Gouvernance documentaire
- `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md` reste figé tant qu’aucun arbitrage explicite produit n’est demandé.
- `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md` reste le plan officiel unique.
- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_A24.md` est conservé comme contexte historique UI/UX A24.
- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_A25_PLANNING.md` devient la référence documentaire d’exécution pour A25 Planning.
- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_INDEX_MAQUETTES.md` devient l’index transversal des maquettes officielles.
- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_SHELL_GLOBAL.md` devient la référence du Shell global connecté.
- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_CODEX_UI_UX_VISUEL_99.md` devient la référence courte Codex pour les futures productions UI/UX visuelles.
- Les documents maîtres doivent utiliser la structure réelle :
  - `docs/1-MASTER/*`
  - `docs/1-MASTER/1-MAQUETTE/*`
  - `docs/1-MASTER/1-MAQUETTE/*`
  - `docs/1-MASTER/2-REFERENCE_UI_UX/*`
  - `docs/2-SESSIONS/*`
  - `docs/2-SESSIONS/*/SESSION-*/PATCH/*`
  - `docs/3-TEMPLATES/*`
  - `docs/4-ARCHIVES/*`
- `docs/3-patches/*` devient un emplacement legacy toléré pour l'historique déjà existant, mais n'est plus la cible canonique des nouvelles sessions.

## 6. Gouvernance des patchs et sessions
- `NO_PATCH` reste valide lorsqu’aucun patch repo officiel n’est produit, même si la session a comporté des constats ou actions locales.
- Une correction locale manuelle effectuée pour poursuivre un test doit être documentée honnêtement si elle n’a pas encore été transformée en patch repo.
- Aucun patch ne doit être régénéré artificiellement s’il n’existe pas de diff réel dans le dépôt courant.
- Une session documentaire de test manuel clôturée en `NO_PATCH` doit disposer d’un marqueur documentaire cohérent côté `docs/2-SESSIONS/.../PATCH/NO_PATCH.md` si elle est intégrée au dépôt.
- Les sessions A24/A25/A26/A27 doivent produire des patchs code uniquement s’ils modifient réellement le dépôt applicatif.
- Les sessions A24/A25/A26/A27 doivent conserver une séparation claire entre patch code, patch correctif minimal et patch documentaire final.
- Pour les sessions UI/UX visuelles, Codex doit lire uniquement les références utiles à la page traitée et les fichiers code strictement nécessaires.
- Pour les sessions UI/UX visuelles, Codex ne doit pas générer de captures automatiquement.
- Toute production UI/UX visuelle doit fournir une checklist de contrôle manuel Nathan.
- Si un patch code est produit, la preuve `git apply --check`, les sorties complètes `npm run lint` et `npm run build` avec codes retour, et l’encodage UTF-8 sans BOM restent attendus.
