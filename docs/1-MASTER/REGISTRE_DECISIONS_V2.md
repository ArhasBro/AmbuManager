# Ambulance Manager — REGISTRE_DECISIONS_V2

Version : V2.0.2
Date : 07/06/2026

## 1. Rôle du registre

Ce document centralise les décisions V2 actives et validées pour la reprise, selon le périmètre documenté.

Les anciennes décisions restent consultables dans les documents historiques et sessions, mais elles sont non prioritaires face à la base V2 active.

## 2. Décisions de gouvernance documentaire

- les documents V2 constituent la gouvernance active de référence pour la reprise ;
- les versions non V2 sont historiques, archivées et non prioritaires ;
- les fiches de `docs/1-MASTER/3-FONCTIONNALITES/` restent actives comme référence détaillée de cadrage fonctionnel cible ;
- `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT_V2.md` est le plan actif de reprise en Phase 6 ;
- `docs/1-MASTER/RECAP_DISCUSSIONS_V2.md` est contextuel / mémoriel et non normatif ;
- les fichiers liés à REBASAGE sont supprimés du repo actif.

## 2.1 Décision structurante — Base44 et bloc DEV-B44-00

- Base44 est clôturé comme prototype fonctionnel, visuel et métier.
- Base44 sert de référence de comparaison et d'inspiration UX/métier, sans devenir source technique finale.
- Le repo officiel reste la source finale pour l'architecture, le modèle de données, le RBAC serveur, les API, Prisma, Next.js et les validations.
- Le bloc `DEV-B44-00` est ajouté avant toute reprise code issue de Base44.
- Aucune reprise code issue de Base44 ne commence avant `DEV-B44-00-03 — VALIDATION` puis `CLOTURE_DEV-B44-00 — VALIDATION`.
- Toute reprise ultérieure doit partir de `docs/1-MASTER/AUDIT_COMPARAISON_BASE44_OFFICIEL_V1.md`, adapter les idées au repo officiel et refuser toute copie directe du code Base44.
- Les renommages documentaires sont autorisés uniquement s'ils améliorent clairement la cohérence, avec justification, conservation du contenu utile et mise à jour des liens, index, sommaires et références.

## 3. Décisions de statut fonctionnel

- Login : non validée à ce stade, à auditer, cadrer, confirmer puis valider explicitement ;
- autres pages : décisions partielles existantes, mais statut global à auditer / à cadrer / à confirmer ;
- Planning : non validé, en cours de cadrage.

## 4. Terminologie active

- utiliser `Modèles horaires` ;
- utiliser `Mise en route`.

## 5. Règle de mise à jour

- les ajouts doivent rester ciblés, cohérents avec la base V2 active et ajoutés uniquement après validation humaine.
