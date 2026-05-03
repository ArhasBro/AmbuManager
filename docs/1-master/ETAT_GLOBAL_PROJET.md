# Ambulance Manager — ETAT_GLOBAL_PROJET

Version : V1.7.0 (MASTER)  
Date : 03/05/2026

## Sommaire
- [1. Rôle](#1-rôle)
- [2. Décision de pilotage au 06/03/2026](#2-décision-de-pilotage-au-06032026)
- [3. Décision de pilotage au 09/03/2026](#3-décision-de-pilotage-au-09032026)
- [4. Décision de pilotage au 19/03/2026](#4-décision-de-pilotage-au-19032026)
- [5. Décision de pilotage au 20/04/2026](#5-décision-de-pilotage-au-20042026)
- [6. Statut officiel global](#6-statut-officiel-global)
- [6.5 Constat de test manuel ADMIN au 03/05/2026](#65-constat-de-test-manuel-admin-au-03052026)
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
- **PLAN_DE_DEVELOPPEMENT** : **VALIDÉ**
- **ETAT_GLOBAL_PROJET** : **VALIDÉ**
- **REGISTRE_DECISIONS** : **VALIDÉ**
- **DOCUMENT_MAITRE** : **VALIDÉ**
- **RECAP_DISCUSSIONS** : **VALIDÉ**

### 6.2 ALPHA historique
- **A1 à A13** : **TRAITÉS DANS LE CYCLE ALPHA 1.0**
- **Campagne de test local ALPHA 1.0** : **CLÔTURÉE MÉTHODOLOGIQUEMENT**
- **Produit ALPHA** : **NON TERMINÉ**

### 6.3 Constat de test local officiel
Les constats suivants sont désormais officiellement retenus au titre de la campagne `2-TEST-ALPHA` :
- le dépôt démarre en local ;
- Prisma nécessite un réalignement rigoureux de la base locale avant usage ;
- des écarts schéma / base réelle peuvent encore exister sur l’environnement local ;
- le dashboard a été rendu fonctionnel après réalignement local de la base ;
- un défaut UI de lisibilité en environnement dark mode a été constaté comme sujet thème / frontend, non comme bug métier ;
- aucune refonte du cadrage produit n’est décidée à ce stade.

### 6.4 Suite prioritaire officielle
Ordre officiel de suite :
1. consolidation du socle ;
2. sécurité minimale ;
3. fiabilisation BDD / Prisma / migrations / environnements ;
4. base RGPD ;
5. reprise des priorités fonctionnelles ALPHA ;
6. amélioration UX / navigation / graphisme ;
7. sujets métier sensibles à cadrer séparément.

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
- verdict produit temporaire : `NO-GO TEMPORAIRE SOCIÉTÉ PILOTE`.

Conséquence : la campagne `2-TEST-ALPHA` ne remet pas en cause les validations terminales locales précédentes, mais elle impose une reprise de correction / complétion ciblée avant présentation société pilote.

## 7. Points à confirmer
- le traitement définitif à retenir pour l’écart `Vehicle.isActive` : correction repo dédiée ou simple réalignement environnemental documenté ;
- le périmètre exact des prochaines sessions de consolidation du socle ;
- la profondeur de traitement du dark mode dans l’ALPHA ;
- la reproduction technique du défaut utilisateurs observé en test manuel ADMIN ;
- la cause exacte de l’écart UI/UX ressenti entre application intégrée et maquettes validées ;
- le statut exact de `PSC1` : rôle principal, qualification ou compétence ;
- la possibilité réelle de plusieurs gérants par entreprise ;
- la politique de suppression définitive des éléments archivables ;
- les besoins oubliés ou encore non remontés dans le backlog ALPHA.

## 8. Prochaine étape logique officielle
La prochaine étape logique officielle, après `SESSION-20260503_TEST-LOCAL-02`, est une phase de **stabilisation post-test manuel ADMIN**, avant tout nouveau test société pilote, avec priorité donnée à :
- correction de l’hydratation session / shell après login ;
- correction du module utilisateurs ADMIN ;
- retest ciblé utilisateurs + absences ;
- audit d’écart UI/UX réel versus maquettes validées A21 / intégration A22 ;
- reprise ciblée du planning manuel ;
- décision Go / No-Go société pilote après retest.
