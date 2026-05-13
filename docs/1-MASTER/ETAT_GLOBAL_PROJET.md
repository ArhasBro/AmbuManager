# Ambulance Manager — ETAT_GLOBAL_PROJET

Version : V1.9.0 (MASTER)  
Date : 10/05/2026

## Sommaire
- [1. Rôle](#1-rôle)
- [2. Décision de pilotage au 06/03/2026](#2-décision-de-pilotage-au-06032026)
- [3. Décision de pilotage au 09/03/2026](#3-décision-de-pilotage-au-09032026)
- [4. Décision de pilotage au 19/03/2026](#4-décision-de-pilotage-au-19032026)
- [5. Décision de pilotage au 20/04/2026](#5-décision-de-pilotage-au-20042026)
- [6. Statut officiel global](#6-statut-officiel-global)
- [6.5 Constat de test manuel ADMIN au 03/05/2026](#65-constat-de-test-manuel-admin-au-03052026)
- [6.6 Clôture du bloc A23 au 04/05/2026](#66-clôture-du-bloc-a23-au-04052026)
- [6.7 Suite ALPHA officielle A24 à A26](#67-suite-alpha-officielle-a24-à-a26)
- [7. Points à confirmer](#7-points-à-confirmer)
- [8. Prochaine étape logique officielle](#8-prochaine-étape-logique-officielle)

## 1. Rôle
Document **autonome** de **statut officiel** (source de vérité).  
Les autres documents maîtres (Document maître, Plan, Registre, Récap) s’alignent sur ces statuts.

## 2. Décision de pilotage au 06/03/2026
Les statuts historiques ci-dessous ont été fixés selon :
- état de livraison observable ;
- présence/absence de DoD formalisée ;
- validations manuelles non formalisées.

## 3. Décision de pilotage au 09/03/2026
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md` est validé comme base officielle produit.
- Ce document est figé et ne doit pas être modifié sans validation explicite.
- Pour la suite, ne pas revenir sur ce cadrage sans demande explicite.
- La refonte du plan de développement devait respecter strictement :
  - 1 session = 1 point clair ;
  - 1 fonctionnalité ;
  - 1 patch ;
  - 1 DoD ;
  - 1 validation.

## 4. Décision de pilotage au 19/03/2026
- chaque bloc du plan doit se terminer par une session dédiée de clôture de bloc ;
- cette session contrôle le code réel, les patchs réels, la documentation finale et les validations terminales ;
- cette session rend un verdict explicite de clôture définitive ;
- aucun passage au bloc suivant n’est autorisé sans verdict explicite de clôture.

## 5. Décision de pilotage au 20/04/2026
- l’ALPHA 1.0 est considérée comme clôturée sur son cycle de tests locaux ;
- le produit ALPHA n’est pas terminé ;
- la campagne `2-TEST-ALPHA` est désormais une source de vérité complémentaire pour l’état réel observé en local ;
- la priorité de suite ne consiste plus à rejouer l’ouverture du bloc historique A1, mais à consolider le socle existant ;
- la suite prioritaire de l’ALPHA devient :
  - backend ;
  - frontend ;
  - sécurité ;
  - BDD ;
  - base RGPD ;
  - puis reprise des évolutions fonctionnelles ALPHA restantes ;
- le plan officiel reste `docs/1-master/PLAN_DE_DEVELOPPEMENT.md` ;
- `PLAN_DEVELOPPEMENT_ALPHA.md` n’a pas vocation à rester autonome après fusion.

## 6. Statut officiel global
### 6.1 Références produit et pilotage
- **DOCUMENT_CADRAGE_FONCTIONNEL** : **VALIDÉ**
- **PLAN_DE_DEVELOPPEMENT** : **VALIDÉ — V2.4.1**
- **ETAT_GLOBAL_PROJET** : **VALIDÉ — V1.8.0**
- **REGISTRE_DECISIONS** : **VALIDÉ — V1.8.0**
- **DOCUMENT_MAITRE** : **VALIDÉ**
- **RECAP_DISCUSSIONS** : **VALIDÉ — V1.8.0**
- **REFERENCE_UI_UX_A24** : **CRÉÉE / VALIDÉE COMME RÉFÉRENCE D’EXÉCUTION A24**

### 6.2 ALPHA historique
- **A1 à A13** : **TRAITÉS DANS LE CYCLE ALPHA 1.0**
- **Campagne de test local ALPHA 1.0** : **CLÔTURÉE MÉTHODOLOGIQUEMENT**
- **Produit ALPHA** : **NON TERMINÉ**

### 6.3 Constat de test local officiel
Les constats suivants sont officiellement retenus au titre de la campagne `2-TEST-ALPHA` :
- le dépôt démarre en local ;
- Prisma nécessite un réalignement rigoureux de la base locale avant usage ;
- des écarts schéma / base réelle peuvent encore exister sur l’environnement local ;
- le dashboard a été rendu fonctionnel après réalignement local de la base ;
- un défaut UI de lisibilité en environnement mode sombre a été constaté comme sujet thème / frontend, non comme bug métier ;
- aucune refonte du cadrage produit n’est décidée à ce stade.

### 6.4 Suite prioritaire officielle
Ordre officiel de suite, actualisé après clôture A23 :
1. réalignement UI/UX global sur `MAQUETTE_DA` ;
2. planning UI/UX & ergonomie métier ;
3. stabilisation / non-régression post UI/UX ;
4. reprise des tests selon décision utilisateur ;
5. poursuite des blocs fonctionnels ou techniques suivants selon résultats de stabilisation.

### 6.5 Constat de test manuel ADMIN au 03/05/2026
Les constats suivants sont désormais officiellement retenus au titre de `SESSION-20260503_TEST-LOCAL-02` :
- test manuel ADMIN partiel exécuté sur les fonctionnalités principales ;
- session post-login / hydratation du shell instable avant rafraîchissement ;
- module utilisateurs non exploitable côté ADMIN au moment du test ;
- absences / indisponibilités non testables tant que le module utilisateurs reste non exploitable ;
- planning manuel partiellement inutilisable, avec affectation utilisateur KO, modification / annulation KO et application des horaires template à revoir ;
- règles métier société partiellement préparées mais non éditables ;
- UI réelle jugée non suffisamment alignée avec les maquettes visuelles validées A21, point majeur de non-présentabilité ;
- besoins complémentaires à cadrer : rôle `PSC1`, affectation planning simplifiée, enrichissement RH salarié, plusieurs gérants, gouvernance suppression / archivage ;
- verdict produit temporaire initial : `NO-GO TEMPORAIRE SOCIÉTÉ PILOTE`.

Conséquence : la campagne `2-TEST-ALPHA` n’a pas remis en cause les validations terminales locales précédentes, mais elle a imposé une reprise de correction / complétion ciblée avant toute présentation société pilote.

### 6.6 Clôture du bloc A23 au 04/05/2026
Le bloc `A23 — Stabilisation post-test manuel ADMIN / Go-No-Go société pilote` est considéré comme clôturé définitivement après contrôle qualité de `SESSION-20260503-11_A23_CLOTURE_A23`.

Verdict officiel :

```txt
BLOC A23 CLÔTURABLE DÉFINITIVEMENT : OUI
```

Points retenus :
- session post-login stabilisée ;
- module utilisateurs ADMIN stabilisé ;
- absences / indisponibilités retestées ou classées ;
- planning manuel ADMIN stabilisé sur les usages essentiels ;
- résiduel `privacy/RGPD` du smoke test corrigé ;
- validations terminales finales prouvées ;
- navigation connectée et shell applicatif prouvés ;
- affectation dépôt utilisateur prouvée ;
- documentation finale et ZIP documentaire produits ;
- passage à la suite autorisé.

Le verdict société pilote reste à traiter dans la logique de suite du projet. La clôture A23 autorise la poursuite de l’ALPHA, mais ne constitue pas à elle seule un déploiement société pilote.

### 6.7 Suite ALPHA officielle A24 à A26
La suite officielle immédiatement validée dans `PLAN_DE_DEVELOPPEMENT.md` est :

1. **A24 — Réalignement UI/UX global sur `MAQUETTE_DA`**  
   Objectif : réaligner l’application sur la direction artistique officielle, avec interface pure, simple, lisible, mode clair/sombre, icônes propres, captures ciblées aux étapes majeures et exclusion du planning profond.

2. **A25 — Planning UI/UX & ergonomie métier**  
   Objectif : refondre la page Planning comme écran central complet, avec une priorité de fidélité visuelle à `Planning_V1.2.png`, `Planning_V1.2_INFO_DETAIL.png` et `REFERENCE_UI_UX_A25_PLANNING.md`, sans refonte fonctionnelle lourde.

3. **A26 — Stabilisation / non-régression post UI/UX**  
   Objectif : vérifier et corriger uniquement les régressions prouvées après A24 et A25.

La direction artistique officielle pour A24, A25 et A26 est exclusivement :

```txt
docs/1-master/MAQUETTE/MAQUETTE_DA
```


### 6.8 Recadrage A25 Planning au 10/05/2026

Le bloc A25 est recadré après constat manuel que des corrections techniques partielles peuvent rester insuffisantes si la page Planning finale ne ressemble pas à la maquette officielle.

Décision officielle :
- `docs/1-master/REFERENCE_UI_UX_A25_PLANNING.md` devient la référence détaillée prioritaire pour A25 ;
- les images `Planning_V1.2.png` et `Planning_V1.2_INFO_DETAIL.png` sont la cible visuelle concrète ;
- A25 doit viser une reproduction aussi fidèle que possible de la maquette visible, avec une cible d'environ 99 % sur les éléments visibles ;
- l’encadré orange de la maquette est une navigation active : il pilote l’encadré violet et le panneau vert selon l’onglet actif ;
- la fin du bloc A25 est recadrée en sessions A25-PLAN-UI-06 à A25-PLAN-UI-11, puis `CLOTURE_A25` ;
- `A25-PLAN-UI-10` porte les finitions visuelles, états, mode sombre et responsive minimal ;
- `A25-PLAN-UI-11` porte la validation visuelle globale ;
- la validation technique d'un patch ne vaut pas validation visuelle ;
- les captures A25 ne sont pas obligatoires à chaque session : capture avant et capture après peuvent être réalisées manuellement par Nathan aux étapes majeures ;
- la clôture A25 exige un retour manuel utilisateur favorable sur la fidélité visuelle.

Conséquence : la fin de A25 doit être pilotée comme une refonte globale de la page Planning, et non comme une suite de micro-corrections isolées.

## 7. Points à confirmer
- niveau réel de proximité atteint par A24 avec `MAQUETTE_DA` après captures avant/après ;
- qualité finale des icônes génériques et spécifiques après audit A24 ;
- comportement exact du mode sombre après intégration A24 ;
- validation visuelle finale du Planning A25 par comparaison avec `Planning_V1.2.png` / `Planning_V1.2_INFO_DETAIL.png` ;
- régressions éventuelles post UI/UX à traiter en A26 ;
- décision après A26 : relancer un bloc de développement ou ouvrir une nouvelle campagne de tests.

Ne sont plus des points à confirmer pour l’ouverture A24 :
- l’ordre A24 / A25 / A26 ;
- la priorité de `MAQUETTE_DA` ;
- le principe de captures ciblées aux étapes majeures ;
- l’intégration du mode sombre dans A24 ;
- l’autorisation de Lucide React pour les icônes génériques.

## 8. Prochaine étape logique officielle
La prochaine étape logique officielle, après clôture du bloc A23, est :

```txt
BLOC A24 — Réalignement UI/UX global sur MAQUETTE_DA
```

Priorités A24 :
- officialiser et appliquer `MAQUETTE_DA` comme direction artistique unique ;
- corriger le socle UI partagé ;
- intégrer le mode clair / mode sombre avec bouton visible ;
- traiter les icônes génériques via Lucide React ou équivalent ;
- conserver uniquement les assets réellement spécifiques et propres ;
- réaligner Login, Dashboard, Société, Dépôts, Véhicules, Templates, Utilisateurs/RH, Audit, Onboarding, Privacy et pages simples ;
- produire ou collecter des captures seulement aux étapes majeures lorsque cela apporte une preuve utile ;
- auditer le planning pour préparer A25 sans le traiter profondément dans A24.

Le passage à A25 n’est autorisé qu’après clôture explicite de A24.
