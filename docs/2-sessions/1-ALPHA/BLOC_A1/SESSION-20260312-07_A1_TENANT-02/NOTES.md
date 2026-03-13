# NOTES

## Rappel méthodologique

Cette session est une session de **CORRECTION**.

Elle ne doit :
- corriger que les défauts multi-tenant réellement prouvés ;
- ne pas ouvrir de refonte ;
- ne pas traiter d’autres sujets ;
- ne pas modifier des zones déjà conformes sans nécessité prouvée.

Règle appliquée :
`CODE > DOCUMENTATION`

## Base de travail retenue

La correction a été menée à partir :
- du constat formalisé par `TENANT-01` ;
- du code réel du dépôt ;
- du périmètre strict imposé par la session `TENANT-02`.

## Défaut réellement retenu

Le défaut réellement visé n’était pas un problème multi-tenant global généralisé sur tout le dépôt, mais un ensemble restreint de points concrets :

- une lecture globale non bornée par tenant dans `app/api/health/prisma/route.ts` ;
- des mutations finales sur quelques routes où la borne tenant existait surtout en pré-vérification, tandis que l’écriture finale restait portée par `id` seul.

## Principe de correction retenu

Le correctif appliqué est volontairement minimal :

- aucune abstraction nouvelle ;
- aucune refonte ;
- aucun changement de comportement produit non nécessaire ;
- ajout uniquement de la contrainte tenant à l’endroit final où elle devait être portée.

## Point documentaire important

Lors du contrôle sur le dépôt cible, le patch code a été appliqué avec exclusion volontaire des fichiers de documentation, afin de ne pas bloquer l’application du correctif à cause d’un décalage de base sur les `.md`.

Commandes utilisées sur le dépôt cible :

```powershell
git apply -p1 --check --exclude="docs/sessions/**" --exclude="docs/patches/**" .\docs\patches\1-ALPHA\BLOC_A1\SESSION-20260312-07_A1_TENANT-02\PATCH__SESSION-20260312-07_A1_TENANT-02.diff
git apply -p1 --exclude="docs/sessions/**" --exclude="docs/patches/**" .\docs\patches\1-ALPHA\BLOC_A1\SESSION-20260312-07_A1_TENANT-02\PATCH__SESSION-20260312-07_A1_TENANT-02.diff