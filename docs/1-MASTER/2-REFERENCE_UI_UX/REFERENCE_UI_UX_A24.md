# Ambulance Manager — RÉFÉRENCE UI/UX A24

Version : V1.0.0 (MASTER)  
Date : 04/05/2026  
Bloc concerné : `A24 — Réalignement UI/UX global sur MAQUETTES PNG OFFICIELLES`

## Avertissement de statut — contexte uniquement

Ce document est conservé dans `docs/1-MASTER/2-REFERENCE_UI_UX/` pour mémoire et contexte A24.

Pour le chantier documentaire transversal UI/UX actuel, il ne prime pas sur :
- les images officielles dans `docs/1-MASTER/1-MAQUETTE/` ;
- les documents `REFERENCE_UI_UX_<PAGE>.md` ;
- la règle actuelle : reproduction visuelle à 99 % des maquettes ;
- la règle actuelle : le fonctionnel ne bloque pas la validation visuelle.

En cas de contradiction, ce document doit être lu comme contexte historique A24 uniquement.

## Sommaire
- [1. Rôle du document](#1-rôle-du-document)
- [2. Source officielle de direction artistique](#2-source-officielle-de-direction-artistique)
- [3. Objectif visuel A24](#3-objectif-visuel-a24)
- [4. Périmètre A24](#4-périmètre-a24)
- [5. Exclusions A24](#5-exclusions-a24)
- [6. Mode clair / mode sombre](#6-mode-clair--mode-sombre)
- [7. Icônes et assets](#7-icônes-et-assets)
- [8. Captures avant / après](#8-captures-avant--après)
- [9. Responsive minimal](#9-responsive-minimal)
- [10. Règles d’intégration](#10-règles-dintégration)
- [11. Pages couvertes par A24](#11-pages-couvertes-par-a24)
- [12. Planning et lien avec A25](#12-planning-et-lien-avec-a25)
- [13. Critères de validation](#13-critères-de-validation)
- [14. Règles pour Codex](#14-règles-pour-codex)

## 1. Rôle du document
Ce document fixe la référence d’exécution du bloc :

```txt
A24 — Réalignement UI/UX global sur MAQUETTES PNG OFFICIELLES
```

Il complète le plan de développement et évite de rediscuter la direction artistique à chaque session A24.

Il doit être utilisé par :
- les sessions de production A24 ;
- les sessions de contrôle A24 ;
- les éventuelles validations globales A24 ;
- les sessions A25 et A26 lorsque la cohérence avec A24 est nécessaire.

## 2. Source officielle de direction artistique
La direction artistique officielle est exclusivement :

```txt
docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG
docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG
docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG
```

En cas de contradiction entre :
- anciens documents ;
- anciennes captures ;
- anciens prompts ;
- anciens ZIP ;
- anciennes interprétations ;
- documentation A21/A22 antérieure ;
- captures réelles non encore réalignées ;

la référence prioritaire est toujours :

```txt
docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG
docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG
docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG
```

Les autres fichiers du dossier `docs/1-MASTER/1-MAQUETTE/` peuvent servir de supports complémentaires, mais ils ne priment pas sur `MAQUETTES PNG OFFICIELLES`.

## 3. Objectif visuel A24
A24 doit rapprocher l’application réelle de la maquette officielle avec un niveau d’exigence élevé.

L’objectif utilisateur est une interface :
- pure ;
- simple ;
- lisible ;
- professionnelle ;
- proche de la maquette ;
- cohérente sur toutes les pages ;
- adaptée au métier ambulancier sans devenir une page CRUD brute.

Quand l’application réelle contient plus d’informations que la maquette, Codex ne doit pas tout afficher en bloc. Il doit privilégier :
- hiérarchie visuelle ;
- repli ;
- panneau droit ;
- drawer ;
- section secondaire ;
- onglets simples si déjà cohérents avec le produit.

Aucune information métier ne doit être supprimée silencieusement.

## 4. Périmètre A24
A24 peut traiter :
- socle UI partagé ;
- AppShell ;
- Sidebar ;
- Topbar ;
- PageHeader ;
- boutons ;
- cards ;
- badges ;
- tables ;
- filtres ;
- drawers / panneaux droits ;
- mode clair ;
- mode sombre ;
- icônes ;
- Login ;
- Dashboard ;
- Société ;
- Dépôts ;
- Véhicules ;
- Templates ;
- Utilisateurs / RH visible ;
- Audit ;
- Onboarding ;
- Privacy ;
- pages simples ;
- audit préparatoire du Planning pour A25.

## 5. Exclusions A24
A24 ne doit pas traiter :
- refonte fonctionnelle métier ;
- nouveau module ;
- refonte RBAC ;
- rôle `PSC1` réel ;
- RH avancée ;
- planning profond ;
- autoschedule complet ;
- matching complet ;
- règles métier avancées ;
- RGPD complet ;
- sécurité avancée ;
- préparation société pilote ;
- déploiement ;
- vraie adaptation mobile complète.

Le planning profond est reporté dans :

```txt
A25 — Planning UI/UX & ergonomie métier
```

## 6. Mode clair / mode sombre
Le mode sombre fait partie du périmètre A24.

Règles :
- le libellé documentaire retenu est **mode sombre** ;
- le mode clair reste la référence principale ;
- un bouton visible clair/sombre est attendu ;
- le mode sombre doit être une déclinaison sobre de `MAQUETTES PNG OFFICIELLES` ;
- il ne doit pas créer une nouvelle direction artistique ;
- il ne doit pas être une simple inversion automatique noir/blanc.

Principe attendu :
- fond général sombre ;
- textes clairs ;
- cartes et panneaux légèrement différenciés du fond ;
- bordures sobres ;
- boutons lisibles ;
- badges lisibles ;
- tableaux lisibles ;
- conservation de l’identité visuelle de la maquette.

## 7. Icônes et assets
Lucide React est autorisé pour les icônes génériques.

Les icônes issues des maquettes doivent être auditées et classées en trois catégories :

1. **Icônes spécifiques à conserver comme assets**  
   Exemple : logo ambulance, pictogrammes réellement spécifiques à Ambulance Manager.

2. **Icônes génériques à remplacer par Lucide React**  
   Exemple : dashboard, calendrier, utilisateurs, véhicule, paramètres, audit, filtre, recherche, action.

3. **Icônes à refaire ou abandonner**  
   Icônes de qualité insuffisante, trop floues, mal détourées, ou non utiles en intégration.

Les PNG ne doivent pas être intégrés automatiquement dans le code.

## 8. Captures avant / après
Les captures avant/après sont obligatoires pour les sessions de correction A24.

Objectifs :
- prouver l’état initial ;
- prouver l’état final ;
- comparer avec `MAQUETTES PNG OFFICIELLES` ;
- éviter une conformité déclarative ;
- éviter de reproduire les écarts UI déjà constatés.

Chaque session de correction A24 doit documenter :
- capture avant ;
- capture après ;
- maquette de référence ;
- verdict visuel ;
- écarts résiduels ;
- caractère bloquant ou non bloquant des écarts.

## 9. Responsive minimal
A24 doit éviter les grosses casses responsive, mais ne doit pas créer une vraie application mobile.

Règles :
- desktop prioritaire ;
- tablette / largeur intermédiaire à préserver autant que possible ;
- mobile complet reporté après l’ALPHA ;
- aucun redesign mobile complet dans A24.

## 10. Règles d’intégration
A24 peut réorganiser visuellement l’information pour se rapprocher de la maquette.

A24 ne doit pas :
- casser un flux validé ;
- supprimer une donnée métier sans justification ;
- modifier le backend sans nécessité stricte ;
- modifier Prisma sans nécessité stricte ;
- modifier RBAC sans nécessité stricte ;
- transformer une correction UI en refonte métier ;
- créer une nouvelle direction artistique ;
- valider une page sans preuve visuelle.

## 11. Pages couvertes par A24
Pages couvertes par A24 :

| Page | Route probable | Statut A24 |
|---|---|---|
| Login | `/login` | À réaligner |
| Dashboard | `/dashboard` | À réaligner |
| Société | `/company` | À réaligner |
| Dépôts | `/depots` | À réaligner |
| Véhicules | `/vehicles` | À réaligner |
| Templates | `/templates` | À réaligner |
| Utilisateurs / RH visible | `/users` | À réaligner sans RH avancée |
| Audit | `/audit` | À réaligner |
| Onboarding | `/onboarding` | À réaligner |
| Privacy | `/privacy` | À réaligner |
| Planning | `/planning` | Audit préparatoire seulement, correction profonde en A25 |

## 12. Planning et lien avec A25
Le planning est un écran central et ne doit pas être noyé dans A24.

A24 doit :
- auditer le planning ;
- produire des captures avant ;
- vérifier l’effet du socle UI A24 sur le planning ;
- documenter les écarts restants ;
- préparer A25.

A24 ne doit pas :
- refaire profondément les vues jour/semaine/mois ;
- modifier la logique d’affectation ;
- transformer l’ergonomie planning en bloc fonctionnel avancé ;
- toucher autoschedule / matching.

## 13. Critères de validation
Une page A24 peut être validée uniquement si :
- la structure générale est proche de `MAQUETTES PNG OFFICIELLES` ;
- les composants sont cohérents ;
- la densité est maîtrisée ;
- la hiérarchie visuelle est claire ;
- les icônes sont propres ;
- le mode clair fonctionne ;
- le mode sombre fonctionne si concerné ;
- la page reste fonctionnelle ;
- les captures avant/après sont fournies ;
- les validations terminales requises sont exécutées et prouvées.

Statuts de contrôle :

```txt
CONFORME
PARTIEL
NON CONFORME
INFORMATION NON FOURNIE — À CONFIRMER
```

## 14. Règles pour Codex
À rappeler dans chaque session A24 :

```txt
La direction artistique officielle est exclusivement :
docs/1-MASTER/1-MAQUETTE

Les maquettes ne sont pas une inspiration.
Elles constituent la cible visuelle officielle.

Objectif : interface pure, simple, lisible, professionnelle, proche maquette.

Le mode sombre est intégré comme déclinaison sobre de MAQUETTES PNG OFFICIELLES.
Lucide React est autorisé pour les icônes génériques.
Les captures avant/après sont obligatoires.
Le planning profond est reporté en A25.

Ne pas ajouter de fonctionnalité métier.
Ne pas refaire le backend.
Ne pas modifier Prisma sans nécessité stricte.
Ne pas créer une nouvelle DA.
Toute information non prouvée : INFORMATION NON FOURNIE — À CONFIRMER.
```
