# Ambulance Manager — DOCUMENT_MAITRE

Version : V1.5.7 (MASTER)  
Date : 09/03/2026

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
- [9. Roadmap technique 4.4 → 5.0](#9-roadmap-technique-44--50)
- [10. Documentation de référence](#10-documentation-de-référence)

## 1. Vision du projet
Ambulance Manager est un SaaS de gestion opérationnelle pour société de transport sanitaire.  
Le produit vise un fonctionnement multi-tenant strict, avec une base exploitable en interne par une société pilote avant montée en version commerciale plus large.

Le cœur du produit est structuré autour de :
- planning
- flotte
- utilisateurs
- règles métier
- dashboard

## 2. Référence produit officielle
Le document suivant constitue la base officielle produit :

`docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md`

Ce document :
- est validé comme base officielle de référence
- est figé
- ne doit pas être modifié sans validation explicite
- porte le détail du périmètre produit validé

Conséquence :
- le présent document reste un document maître de cadrage global
- le détail fonctionnel produit ne doit plus être redéfini ici s’il est déjà fixé dans `DOCUMENT_CADRAGE_FONCTIONNEL.md`

## 3. Principes non négociables
- Multi-tenant strict via `companyId`
- Authentification et session enrichie
- Cloisonnement par société
- RBAC / permissions
- Convention API homogène
- Structure documentaire pilotée
- Aucune validation implicite sans preuve
- Toute information non prouvée : **INFORMATION NON FOURNIE — À CONFIRMER**

## 4. Architecture technique cible
Ordre cible :
- Data
- Services
- API
- UI

Principe :
- éviter les accès directs dispersés
- centraliser la logique métier
- conserver une architecture maintenable

## 5. Stack technologique
Socle technique actuel du projet :
- Next.js
- TypeScript
- Prisma
- PostgreSQL
- NextAuth

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

Cela permet d’éviter les erreurs TypeScript du type :

`Property 'model' does not exist on type PrismaClient`


## 7. Conventions API (format unique)
Format attendu :
- succès : `{ ok:true, data }`
- erreur : `{ ok:false, error, details? }`

## 8. Modules fonctionnels (périmètre)
Le périmètre fonctionnel détaillé n’est plus redéfini ici.  
Il est désormais porté par :

`docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md`

Les modules couverts par le produit incluent au minimum :
- rôle support propriétaire / assistance globale
- auth
- multi-tenant
- bases / dépôts
- users
- rôles / permissions
- véhicules / flotte
- règles métier
- templates
- planning
- autoschedule
- matching
- audit
- dashboard
- exports
- onboarding / import
- alertes applicatives
- API / conventions
- tests / qualité
- documentation

## 9. Roadmap technique 4.4 → 5.0
Les statuts officiels doivent s’aligner sur :
- `docs/master/ETAT_GLOBAL_PROJET.md`
- `docs/master/REGISTRE_DECISIONS.md`

Le cadrage produit officiel est porté par :
- `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md`

La prochaine étape attendue est :
- la refonte du plan de développement

## 10. Documentation de référence
Documents de référence principaux :
- `docs/master/DOCUMENT_MAITRE.md`
- `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/master/ETAT_GLOBAL_PROJET.md`
- `docs/master/REGISTRE_DECISIONS.md`
- `docs/master/RECAP_DISCUSSIONS.md`
- `docs/master/STRUCTURE_PROJET.md`

Règle :
- `DOCUMENT_CADRAGE_FONCTIONNEL.md` = base officielle produit
- `PLAN_DE_DEVELOPPEMENT.md` sera refondu ensuite sur cette base