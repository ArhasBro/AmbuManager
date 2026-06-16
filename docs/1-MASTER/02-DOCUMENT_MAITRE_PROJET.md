# Ambulance Manager - Document maître projet

Date de refonte : 07/06/2026

## Sommaire

1. [Rôle du document](#1-rôle-du-document)
2. [Identité du projet](#2-identité-du-projet)
3. [Références actives du projet](#3-références-actives-du-projet)
4. [État global actuel](#4-état-global-actuel)
5. [Historique synthétique utile](#5-historique-synthétique-utile)
6. [Décisions structurantes validées](#6-décisions-structurantes-validées)
7. [Ce qui est fait](#7-ce-qui-est-fait)
8. [Ce qui manque](#8-ce-qui-manque)
9. [Ce qui est validé](#9-ce-qui-est-validé)
10. [Ce qui n'est pas encore validé](#10-ce-qui-nest-pas-encore-validé)
11. [État du repo officiel](#11-état-du-repo-officiel)
12. [État du prototype Base44](#12-état-du-prototype-base44)
13. [Règles globales non négociables](#13-règles-globales-non-négociables)
14. [Points de vigilance](#14-points-de-vigilance)
15. [Prochaine grande étape](#15-prochaine-grande-étape)
16. [Règles de mise à jour du document](#16-règles-de-mise-à-jour-du-document)

## 1. Rôle du document

Ce document est le document vivant de pilotage du projet Ambulance Manager.

Il consolide l'état courant, les décisions structurantes, les points validés, les manques, les règles globales et la prochaine grande étape. Il remplace les anciens documents maîtres séparés de type état global, registre de décisions et récapitulatif actif.

## 2. Identité du projet

- Nom : Ambulance Manager.
- Nature : SaaS métier de gestion opérationnelle pour sociétés de transport sanitaire.
- Source technique finale : repo officiel Ambulance Manager.
- Stack officielle connue : Next.js, React, Prisma, PostgreSQL, RBAC serveur.
- Prototype de référence : Base44, uniquement comme support métier, visuel et ergonomique.

## 3. Références actives du projet

Les cinq documents MASTER actifs de `docs/1-MASTER` sont :

- `docs/1-MASTER/01-APPLICATION_WEB.md` : décrit l'application web, son périmètre produit et ses modules.
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md` : pilote l'état du projet, l'historique utile et les décisions structurantes.
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md` : définit la méthode de travail, les preuves, les contrôles et les règles de session.
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md` : définit le plan maître court, l'ordre de reprise, les blocs, les principes et les dépendances.
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md` : définit le détail opérationnel officiel des blocs et sessions de production.

Références supports conservées :

- `docs/1-MASTER/1-MAQUETTE/`
- `docs/1-MASTER/2-REFERENCE_UI_UX/`
- `docs/1-MASTER/3-FONCTIONNALITES/`
- `docs/1-MASTER/4-BASE44_REFERENCE/`
- `docs/1-MASTER/5-AUDIT/`

## 4. État global actuel

Le projet ne repart pas de zéro techniquement. Il repart sur une gouvernance documentaire simplifiée.

État consolidé :

- le repo officiel est exploitable avec corrections majeures ;
- aucune page n'est validée automatiquement ;
- le prototype Base44 est clôturable comme prototype fonctionnel sous réserves, mais il n'est pas une source technique finale ;
- le dossier `docs/1-MASTER` est refondu autour de cinq documents MASTER actifs ;
- les dossiers supports restent conservés ;
- la prochaine reprise opérationnelle doit commencer par la structuration du plan de reprise, pas par du code.

## 5. Historique synthétique utile

Historique retenu :

- des documents V2 existaient comme gouvernance active temporaire ;
- un audit du code officiel a conclu que la base est réutilisable mais nécessite des corrections majeures ;
- un prototype Base44 a permis de clarifier des parcours, des libellés et des réserves métier ;
- un audit comparatif Base44 / repo officiel a posé la règle : adapter les idées Base44, ne jamais copier le code Base44 ;
- la présente refonte remplace les suffixes documentaires actifs par cinq noms simples.

## 6. Décisions structurantes validées

- L'historique est conservé par Git, pas par suffixes `_V2`, `_FINAL` ou équivalents dans les noms actifs.
- Base44 est une référence prototype, pas la source technique finale.
- Le repo officiel reste la source finale pour l'architecture, Prisma, RBAC, API, contrôles et validations.
- Les fiches de `docs/1-MASTER/3-FONCTIONNALITES/` restent des références détaillées, sans valider automatiquement les pages.
- Les références UI/UX et maquettes restent des supports, sans remplacement du cadrage projet.
- La terminologie active est `Modèles horaires` et `Mise en route`.
- Les actions sensibles doivent être tracées.
- Le multi-tenant par société est non négociable.
- Aucune reprise code inspirée de Base44 ne doit commencer sans validation documentaire préalable.
- 2026-06-16 — Décision qualité : le référentiel `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44` est une source documentaire Base44 intouchable. Les échecs build/lint exclusivement liés à ce dossier ne bloquent pas une session applicative, si le patch ne le modifie pas, si les erreurs ne concernent pas les fichiers modifiés et si l'exception est documentée.

## 7. Ce qui est fait

- Prototype Base44 stabilisé comme référence métier/visuelle sous réserves.
- Audit du code officiel disponible dans `docs/1-MASTER/5-AUDIT/`.
- Audit comparatif Base44 / repo officiel disponible dans `docs/1-MASTER/5-AUDIT/`.
- Fiches fonctionnalités disponibles dans `docs/1-MASTER/3-FONCTIONNALITES/`.
- Références UI/UX disponibles dans `docs/1-MASTER/2-REFERENCE_UI_UX/`.
- Maquettes disponibles dans `docs/1-MASTER/1-MAQUETTE/`.
- Documents MASTER racine consolidés en cinq fichiers actifs.

## 8. Ce qui manque

- Validation explicite des blocs de reprise.
- Matrice RBAC officielle complète UI/API.
- Validation visuelle navigateur contre maquettes V2.
- Cadrage final du module `Suivi des véhicules` côté repo officiel.
- Arbitrages sur restauration/désarchivage par module.
- Décision exacte sur `Se souvenir de moi`.
- Décisions précises sur contacts société, préférences dashboard, permissions fines et audit support.
- Stratégie RGPD complète : INFORMATION NON FOURNIE — À CONFIRMER.

## 9. Ce qui est validé

Validé à ce stade :

- la refonte documentaire doit être limitée à `docs/1-MASTER` ;
- les dossiers `docs/2-SESSIONS/` et `docs/3-TEMPLATES/` ne sont pas modifiés dans cette intervention ;
- les cinq documents MASTER actifs sont la nouvelle référence racine ;
- Base44 est utilisable comme prototype, pas comme code à copier ;
- les libellés `Modèles horaires` et `Mise en route` sont actifs ;
- le plan de développement doit repartir par une Phase 1 de structuration du plan de reprise.

## 10. Ce qui n'est pas encore validé

Non validé :

- aucune page applicative n'est validée individuellement ;
- aucune reprise code n'est autorisée par cette refonte ;
- le statut final de plusieurs rôles/permissions : INFORMATION NON FOURNIE — À CONFIRMER ;
- les règles ARS exactes pour vérifications/désinfections : INFORMATION NON FOURNIE — À CONFIRMER ;
- la politique complète de conservation RGPD : INFORMATION NON FOURNIE — À CONFIRMER ;
- la cible finale Beta/V1 détaillée : INFORMATION NON FOURNIE — À CONFIRMER.

## 11. État du repo officiel

État issu des audits disponibles :

- base Next.js/React/Prisma exploitable ;
- corrections majeures nécessaires ;
- risques transverses : permissions front/API, nomenclature, accès refusé, audit, cohérence UI/API ;
- modules prioritaires : shell/navigation, permissions, véhicules, suivi des véhicules, utilisateurs/RH, modèles horaires, planning.

Cette refonte documentaire ne modifie pas le code.

## 12. État du prototype Base44

Base44 est considéré comme prototype fonctionnel, visuel et métier exploitable sous réserves.

À retenir :

- utile pour visualiser les parcours ;
- utile pour comparer les modules ;
- utile pour inspirer certaines ergonomies ;
- non utilisable comme architecture cible ;
- non copiable directement ;
- non probant pour audit serveur, sécurité backend ou conformité réglementaire complète.

## 13. Règles globales non négociables

- Une validation doit être explicite.
- Une information absente doit être notée `INFORMATION NON FOURNIE — À CONFIRMER`.
- Une session opérationnelle future doit avoir un objectif unique.
- Les preuves doivent être fournies par chemins, extraits et commandes.
- Aucun code Base44 ne doit être copié directement.
- Aucun changement de code sans périmètre et contrôles.
- Pas de refonte massive non demandée.
- UTF-8 sans BOM pour les Markdown.
- Pas de suffixe de version dans les noms des documents actifs.

## 14. Points de vigilance

- Ne pas transformer les fiches détaillées en validation implicite.
- Ne pas transformer Base44 en source de vérité.
- Ne pas mélanger reprise documentaire et reprise code.
- Ne pas ouvrir de session dans `docs/2-SESSIONS/` pendant cette refonte.
- Ne pas modifier les templates pendant cette refonte.
- Ne pas perdre les réserves RGPD détaillées.
- Ne pas masquer les incertitudes.

## 15. Prochaine grande étape

La prochaine grande étape est la reprise opérationnelle par blocs, à partir du plan court `04` et du détail opérationnel `05`.

Objectif : exécuter des sessions courtes, fermées, contrôlables et validables, sans copie technique directe de Base44 et sans patch applicatif hors session CX.

## 16. Règles de mise à jour du document

Ce document est mis à jour uniquement quand un élément de pilotage global change :

- statut général du projet ;
- décision structurante validée ;
- changement de source active ;
- changement de prochaine grande étape ;
- risque ou réserve majeure.

Il ne doit pas devenir un journal de session, un audit détaillé ou un plan de développement.
