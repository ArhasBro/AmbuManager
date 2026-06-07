# Ambulance Manager - Plan de développement

Date de refonte : 07/06/2026

## Sommaire

1. [Rôle du document](#1-rôle-du-document)
2. [Principe de lecture du plan](#2-principe-de-lecture-du-plan)
3. [État de départ de la reprise](#3-état-de-départ-de-la-reprise)
4. [Règles opérationnelles du plan](#4-règles-opérationnelles-du-plan)
5. [Phases globales du projet](#5-phases-globales-du-projet)
6. [Phase actuelle](#6-phase-actuelle)
7. [Blocs de reprise prévus](#7-blocs-de-reprise-prévus)
   - [BLOC 1 — Socle de reprise et règles transverses](#bloc-1-socle-de-reprise-et-règles-transverses)
   - [BLOC 2 — Shell global / navigation / nomenclature / accès refusé](#bloc-2-shell-global-navigation-nomenclature-accès-refusé)
   - [BLOC 3 — RBAC UI/API transverse](#bloc-3-rbac-uiapi-transverse)
   - [BLOC 4 — Véhicules](#bloc-4-véhicules)
   - [BLOC 5 — Suivi des véhicules](#bloc-5-suivi-des-véhicules)
   - [BLOC 6 — Utilisateurs / RH](#bloc-6-utilisateurs-rh)
   - [BLOC 7 — Dépôts / Bases](#bloc-7-dépôts-bases)
   - [BLOC 8 — Modèles horaires](#bloc-8-modèles-horaires)
   - [BLOC 9 — Société](#bloc-9-société)
   - [BLOC 10 — Planning](#bloc-10-planning)
   - [BLOC 11 — Tableau de bord](#bloc-11-tableau-de-bord)
   - [BLOC 12 — Login](#bloc-12-login)
   - [BLOC 13 — Audit / traçabilité](#bloc-13-audit-traçabilité)
   - [BLOC 14 — Mise en route](#bloc-14-mise-en-route)
   - [BLOC 15 — Validation finale Alpha](#bloc-15-validation-finale-alpha)
8. [Statut des blocs](#8-statut-des-blocs)
9. [Dépendances importantes](#9-dépendances-importantes)
10. [Contrôles attendus par type de bloc](#10-contrôles-attendus-par-type-de-bloc)
11. [Prochaine session à préparer](#11-prochaine-session-à-préparer)
12. [Prochaines décisions à prendre](#12-prochaines-décisions-à-prendre)
13. [Règles de mise à jour du plan](#13-règles-de-mise-à-jour-du-plan)

## 1. Rôle du document

Ce document est le plan de route opérationnel du projet Ambulance Manager.

Il fixe l'ordre des phases, les blocs de reprise, les dépendances, les contrôles attendus et la prochaine session à préparer.

## 2. Principe de lecture du plan

Le plan commence par `PHASE 1 — Structuration du plan de reprise`.

La refonte `docs/1-MASTER` est un préambule hors phase. Elle prépare la reprise, mais ne constitue pas une phase opérationnelle du plan de développement.

## 3. État de départ de la reprise

État consolidé :

- repo officiel exploitable avec corrections majeures ;
- Base44 exploitable comme prototype, non comme source technique ;
- documents actifs consolidés ;
- fiches fonctionnalités, références UI/UX, maquettes, audits et synthèse Base44 conservés comme supports ;
- aucune page applicative validée automatiquement ;
- aucune reprise code autorisée sans bloc et session dédiés.

## 4. Règles opérationnelles du plan

- Une session = un objectif.
- Un bloc doit avoir un objectif, un périmètre, des dépendances et des contrôles.
- `AUDIT` avant correction si le périmètre exact est incertain.
- `CORRECTION` avant `COMPLÉTION` si l'existant est erroné.
- `VALIDATION` avant passage au bloc suivant.
- `CLÔTURE` pour fermer un bloc.
- Aucun code Base44 copié directement.
- Aucun passage implicite en phase suivante.

## 5. Phases globales du projet

Préambule hors phase — Refonte `docs/1-MASTER`

`PHASE 1 — Structuration du plan de reprise`

`PHASE 2 — Audit comparatif Base44 vs repo officiel`

`PHASE 3 — Réalignement des références projet`

`PHASE 4 — Reprise code par blocs`

`PHASE 5 — Stabilisation Alpha`

`PHASE 6 — Préparation Beta / évolutions`

## 6. Phase actuelle

Phase actuelle après cette refonte :

`PHASE 1 — Structuration du plan de reprise`

Objectif : créer les blocs de développement, confirmer l'ordre, les dépendances, les sessions attendues et les critères de validation.

## 7. Blocs de reprise prévus

### BLOC 1 — Socle de reprise et règles transverses

Objectif : confirmer l'ordre des blocs, les contrôles, la matrice de statut et les règles de session.

Statut : à préparer.

### BLOC 2 — Shell global / navigation / nomenclature / accès refusé

Objectif : stabiliser la base commune avant les modules métier.

Dépendance : Bloc 1.

### BLOC 3 — RBAC UI/API transverse

Objectif : établir et contrôler la cohérence permissions front/API.

Dépendance : Bloc 2.

### BLOC 4 — Véhicules

Objectif : corriger le référentiel véhicules, les statuts, la disponibilité, l'archive/restauration et les droits.

Dépendance : Bloc 3.

### BLOC 5 — Suivi des véhicules

Objectif : cadrer puis matérialiser le module officiel : vue d'ensemble, vérifications, désinfections, anomalies.

Dépendances : Blocs 3 et 4.

### BLOC 6 — Utilisateurs / RH

Objectif : réaligner utilisateurs, statuts, rôles, permissions, absences et accès applicatif.

Dépendance : Bloc 3.

### BLOC 7 — Dépôts / Bases

Objectif : stabiliser les lieux de référence, rattachements, archive/restauration et compteurs calculés.

Dépendances : Blocs 3 et 6 si rattachements RH impactés.

### BLOC 8 — Modèles horaires

Objectif : aligner terminologie, cycle de vie et dépendances planning.

Dépendances : Blocs 3 et 7.

### BLOC 9 — Société

Objectif : stabiliser profil société, règles, contacts éventuels et multi-tenant.

Dépendance : Bloc 3.

### BLOC 10 — Planning

Objectif : reprendre le planning après stabilisation des données critiques.

Dépendances : Blocs 3, 4, 6, 7 et 8.

### BLOC 11 — Tableau de bord

Objectif : réaligner widgets, raccourcis, KPI et données après stabilisation des modules.

Dépendance : Bloc 10 ou état suffisant des modules sources.

### BLOC 12 — Login

Objectif : finaliser session, `Se souvenir de moi`, redirections et messages d'accès.

Dépendances : Blocs 2 et 3.

### BLOC 13 — Audit / traçabilité

Objectif : normaliser la traçabilité serveur des actions sensibles.

Dépendance : cartographie des actions sensibles des blocs métier.

### BLOC 14 — Mise en route

Objectif : reprendre l'assistant de configuration initiale après stabilisation des référentiels.

Dépendances : Blocs 6, 7, 8, 9 et 10.

### BLOC 15 — Validation finale Alpha

Objectif : vérifier cohérence système, non-régression, droits, audit, documentation et restes à traiter.

Dépendance : blocs précédents validés ou restes explicitement acceptés.

## 8. Statut des blocs

| Bloc | Statut | Priorité | Commentaire |
|---|---|---|---|
| Préambule hors phase | réalisé par refonte documentaire | haute | ne compte pas comme phase opérationnelle |
| Bloc 1 | à préparer | très haute | première session opérationnelle |
| Bloc 2 | prévu | très haute | socle commun |
| Bloc 3 | prévu | très haute | sécurité et droits |
| Bloc 4 | prévu | très haute | dépendance suivi/planning |
| Bloc 5 | prévu | très haute | module critique à cadrer |
| Bloc 6 | prévu | très haute | RH et permissions |
| Bloc 7 | prévu | haute | dépendances planning |
| Bloc 8 | prévu | haute | dépendance planning |
| Bloc 9 | prévu | haute | multi-tenant et règles |
| Bloc 10 | prévu | très haute | module complexe |
| Bloc 11 | prévu | moyenne | après données stabilisées |
| Bloc 12 | prévu | haute | auth/session |
| Bloc 13 | prévu | haute | confiance et traçabilité |
| Bloc 14 | prévu | moyenne | synthèse initialisation |
| Bloc 15 | prévu | très haute | clôture Alpha |

## 9. Dépendances importantes

- Shell et accès refusé avant modules métier.
- RBAC UI/API avant actions sensibles.
- Véhicules avant suivi véhicules et planning.
- Utilisateurs/RH, dépôts/bases et modèles horaires avant planning.
- Audit final après cartographie des actions sensibles.
- Mise en route après stabilisation des référentiels qu'elle résume.
- Dashboard après données source stabilisées.

## 10. Contrôles attendus par type de bloc

### Documentation

- cohérence Markdown ;
- liens internes ;
- UTF-8 sans BOM ;
- absence de mojibake ;
- absence de modification code.

### Code UI

- `npm run lint` ;
- `npm run build` ;
- contrôle visuel si UI modifiée ;
- contrôle responsive si concerné ;
- contrôle permissions si actions conditionnelles.

### API / RBAC

- `npm run lint` ;
- `npm run build` ;
- contrôle API ;
- contrôle non-contournement ;
- vérification multi-tenant `companyId`.

### Prisma

- `npx prisma validate` ;
- `npx prisma generate` ;
- impact migration documenté ;
- contrôles lint/build.

### Audit / traçabilité

- action sensible tracée ;
- acteur identifiable ;
- société identifiable ;
- contexte suffisant ;
- absence de donnée sensible inutile.

## 11. Prochaine session à préparer

Prochaine session recommandée :

`PHASE 1 — SESSION 1 — Structuration des blocs de reprise`

Objectif :

- transformer les blocs ci-dessus en sessions opérationnelles ;
- confirmer l'ordre ;
- identifier les fichiers sources à lire par bloc ;
- définir les critères de validation ;
- confirmer les décisions à obtenir avant code.

Type : DOCUMENTATION / CADRAGE.

Patch code : interdit.

## 12. Prochaines décisions à prendre

- Matrice RBAC officielle minimale.
- Périmètre officiel de `Suivi des véhicules`.
- Politique archive/restauration par module.
- Comportement exact de `Se souvenir de moi`.
- Besoin Alpha de `CompanyContact`.
- Besoin Alpha de `DashboardPreference`.
- Granularité audit et support.
- Périmètre RGPD détaillé et responsable conformité.

## 13. Règles de mise à jour du plan

Le plan est mis à jour quand :

- un bloc change d'ordre ;
- une dépendance change ;
- une session est ajoutée, retirée ou validée ;
- une décision structurante modifie le périmètre ;
- la phase actuelle change.

Le plan ne doit pas devenir un audit détaillé, un journal de session ou une fiche fonctionnelle.
