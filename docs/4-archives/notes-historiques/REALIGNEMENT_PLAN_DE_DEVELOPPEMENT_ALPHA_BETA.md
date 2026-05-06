# RÉALIGNEMENT — PLAN_DE_DEVELOPPEMENT.md — Ordre ALPHA / BETA

## 1. Décision

```text
Réorganisation documentaire simple du PLAN_DE_DEVELOPPEMENT.md
Patch code requis : NON
```

## 2. Objectif

Remettre le plan dans un ordre de lecture clair :

```text
A1 à A21 = ALPHA
B1 à BX = BETA
V2 = version officielle / long terme
```

## 3. Correction appliquée

Le plan conserve un seul fichier officiel :

```text
docs/1-master/PLAN_DE_DEVELOPPEMENT.md
```

La structure a été réordonnée ainsi :

```text
11. ALPHA V1.0 — Socle et blocs historiques A1 à A13
12. ALPHA — Suite active / consolidation A14 à A21
13. BETA V1.x — Plan prévisionnel
14. VERSION OFFICIELLE V2.x — Plan prévisionnel
15. Règle de maintenance du plan
```

## 4. Pourquoi ne pas créer deux plans officiels

Aucun `PLAN_ALPHA.md` ou `PLAN_BETA.md` officiel séparé n’a été créé.

Raison :

```text
PLAN_DE_DEVELOPPEMENT.md doit rester le plan officiel unique.
```

Cela évite la création de deux sources de vérité concurrentes.

## 5. Clarification ajoutée

Une note de lecture précise que :

- l’ALPHA regroupe les blocs A1 à A21 ;
- la BETA arrive après stabilisation ALPHA ;
- la V2 reste long terme ;
- la BETA ne doit pas être lancée tant que l’ALPHA n’est pas stabilisée et validée.

## 6. Verdict

```text
PLAN_DE_DEVELOPPEMENT.md réaligné : OUI
Patch code requis : NON
Documentation plus lisible pour la suite : OUI
```
