# Ambulance Manager — DOCUMENT_MAITRE

Version : V1.6.0 (MASTER)  
Date : 20/04/2026

## Sommaire
- [1. Vision du projet](#1-vision-du-projet)
- [2. Référence produit officielle](#2-référence-produit-officielle)
- [3. Principes non négociables](#3-principes-non-négociables)
- [4. Architecture technique cible](#4-architecture-technique-cible)
- [5. Stack technologique](#5-stack-technologique)
- [6. Modélisation des données (Prisma)](#6-modélisation-des-données-prisma)
- [6.1 Règle Prisma Client](#61-règle-prisma-client)
- [7. Conventions API (format unique)](#7-conventions-api-format-unique)
- [8. Modules fonctionnels (périmètre)](#8-modules-fonctionnels-périmètre)
- [9. Roadmap de pilotage actuelle](#9-roadmap-de-pilotage-actuelle)
- [10. Documentation de référence](#10-documentation-de-référence)

## 1. Vision du projet
Ambulance Manager est un SaaS de gestion opérationnelle pour société de transport sanitaire.  
Le produit vise un fonctionnement multi-tenant strict, avec une base exploitable en interne par une société pilote avant montée en version commerciale plus large.

Le cœur du produit est structuré autour de :
- planning ;
- flotte ;
- utilisateurs ;
- règles métier ;
- dashboard.

## 2. Référence produit officielle
Le document suivant constitue la base officielle produit :

`docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`

Ce document :
- est validé comme base officielle de référence ;
- est figé ;
- ne doit pas être modifié sans validation explicite ;
- porte le détail du périmètre produit validé.

## 3. Principes non négociables
- multi-tenant strict via `companyId` ;
- authentification et session enrichie ;
- cloisonnement par société ;
- RBAC / permissions ;
- convention API homogène ;
- structure documentaire pilotée ;
- aucune validation implicite sans preuve ;
- toute information non prouvée : `INFORMATION NON FOURNIE — À CONFIRMER`.

### 3.1 Règle obligatoire de clôture de bloc
Chaque bloc du plan de développement doit se terminer par une **session dédiée de clôture de bloc**.

Cette session de clôture vérifie obligatoirement :
- le code réel du bloc ;
- les patchs réellement produits ;
- la documentation finale du bloc ;
- les validations terminales réellement relancées ou constatées.

Conséquence :
- aucun passage au bloc suivant sans verdict explicite de clôture ;
- le verdict final de clôture doit être formulé sous la forme :
  - `BLOC <ID> CLÔTURABLE DÉFINITIVEMENT : OUI` ;
  - ou `BLOC <ID> CLÔTURABLE DÉFINITIVEMENT : NON`.

### 3.2 Convention documentaire associée
La clôture de bloc doit disposer d’un dossier dédié en fin de bloc, par exemple :
- `docs/2-sessions/1-ALPHA/BLOC_A2/4-CLOTURE_A2/` ;
- `docs/2-sessions/1-ALPHA/BLOC_A2/4-CLOTURE_A2/SESSION-.../PATCH/` pour les patchs associés à chaque session.

Compatibilité historique : les anciens chemins `docs/3-patches/...` peuvent subsister tant que l'historique n'a pas été migré.

## 4. Architecture technique cible
Ordre cible :
- Data ;
- Services ;
- API ;
- UI.

Principe :
- éviter les accès directs dispersés ;
- centraliser la logique métier ;
- conserver une architecture maintenable.

## 5. Stack technologique
Socle technique actuel du projet :
- Next.js ;
- TypeScript ;
- Prisma ;
- PostgreSQL ;
- NextAuth.

## 6. Modélisation des données (Prisma)
Le modèle Prisma constitue la référence de structure côté données.  
La logique métier observée dans le code et les documents validés prime sur toute hypothèse non prouvée.

### 6.1 Règle Prisma Client
Toute session introduisant un nouveau modèle Prisma ou utilisant un modèle nouvellement ajouté doit inclure dans la vérification terminale :

```bash
npx prisma validate
npx prisma generate
npm run lint
npm run build
```

## 7. Conventions API (format unique)
Format attendu :
- succès : `{ ok:true, data }` ;
- erreur : `{ ok:false, error, details? }`.

## 8. Modules fonctionnels (périmètre)
Le périmètre fonctionnel détaillé n’est pas redéfini ici.  
Il est porté par :

`docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`

Les modules couverts par le produit incluent au minimum :
- auth ;
- multi-tenant ;
- bases / dépôts ;
- users ;
- rôles / permissions ;
- véhicules / flotte ;
- règles métier ;
- templates ;
- planning ;
- autoschedule ;
- matching ;
- audit ;
- dashboard ;
- exports ;
- onboarding / import ;
- alertes applicatives ;
- API / conventions ;
- tests / qualité ;
- documentation.

## 9. Roadmap de pilotage actuelle
Les statuts officiels doivent s’aligner sur :
- `docs/1-master/ETAT_GLOBAL_PROJET.md` ;
- `docs/1-master/REGISTRE_DECISIONS.md`.

Le cadrage produit officiel est porté par :
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`.

La prochaine étape de pilotage n’est plus l’ouverture du premier bloc historique, mais la **consolidation du socle ALPHA**, avec priorité donnée à :
- backend ;
- frontend ;
- sécurité ;
- BDD ;
- RGPD ;
- puis backlog fonctionnel priorisé.

## 10. Documentation de référence
Documents de référence principaux :
- `docs/1-master/DOCUMENT_MAITRE.md` ;
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md` ;
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md` ;
- `docs/1-master/ETAT_GLOBAL_PROJET.md` ;
- `docs/1-master/REGISTRE_DECISIONS.md` ;
- `docs/1-master/RECAP_DISCUSSIONS.md` ;
- `docs/1-master/STRUCTURE_PROJET.md`.

Règle :
- `DOCUMENT_CADRAGE_FONCTIONNEL.md` = base officielle produit ;
- `PLAN_DE_DEVELOPPEMENT.md` reste le plan officiel unique ;
- le passage à la suite de l’ALPHA s’effectue désormais par consolidation du socle, puis reprise des priorités fonctionnelles.

### 10.1 Référence opérationnelle A25 Planning
Le détail d’exécution UI/UX du bloc `A25 — Planning UI/UX & ergonomie métier` est porté par :

`docs/1-master/REFERENCE_UI_UX_A25_PLANNING.md`

Ce document constitue la référence opérationnelle du réalignement visuel Planning, en complément du plan de développement et des images Planning officielles conservées dans `docs/1-master/MAQUETTE/MAQUETTE_DA`.

