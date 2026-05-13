# NOTES.md

## Notes de périmètre
La session `SESSION-20260407-06_A6_TPL-06` traite exclusivement l’ajout de l’API de modification template.

Périmètre strictement retenu :
- route `PATCH /api/templates/[id]`
- fichier : `app/api/templates/[id]/route.ts`

## Limites de périmètre
N’ont pas été intégrés dans `TPL-06` :
- aucune UI templates ;
- aucune API d’archivage dédiée ;
- aucune extension métier vers `TPL-07+` ;
- aucune modification de la liste templates au-delà du strict nécessaire ;
- aucune modification de la création template au-delà du strict nécessaire ;
- aucune refonte planning / autoschedule / matching.

## Hypothèses interdites / non retenues
Hypothèses explicitement non retenues :
- aucun `companyId` transmis par le client ;
- aucune ouverture support global ;
- aucun champ métier hors champs réellement présents ;
- aucune anticipation d’un modèle template enrichi non prouvé par le dépôt.

## Rappel de gouvernance
La gouvernance retenue est celle déjà cohérente avec l’existant :
- `ADMIN` / `GERANT`
- sinon permission `TEMPLATES_MANAGE`

## Rappel multi-tenant
Le `companyId` provient exclusivement de la session :
- source : `session.user.companyId`
- aucune confiance accordée à une valeur cliente

## Note sur l’identifiant template
L’identifiant template est cohérent avec un `cuid()` dans le schéma réel. En conséquence, le paramètre `id` est validé comme chaîne non vide, et non comme UUID.

## Rappel méthodologique
`TPL-06` couvre uniquement la modification template. Aucun scope `TPL-07+` n’a été intégré dans cette session documentaire.
