# EVIDENCES — SESSION-20260319-19_A3_USERS-11

## Réalité fonctionnelle retenue
- USERS-11 portait uniquement sur le rattachement utilisateur à une base.
- Le flux existait déjà presque entièrement avant correction.
- Le backend, le multi-tenant, l'exclusion des comptes support globaux et les garde-fous métier existaient déjà.
- Le seul correctif appliqué a concerné la resynchronisation UI après changement de base.

## Fichier applicatif modifié
- `app/users/user-depot-assignment-client.tsx`

## Nature exacte du correctif
Le correctif a consisté à :
- republier la sélection utilisateur mise à jour ;
- relancer le refresh partagé du module users ;
- laisser inchangés le service, la route API, la validation et le modèle existants.

## Patch de référence
- `PATCH__SESSION-20260319-19_A3_USERS-11.diff`

## Validation retenue
- patch applicable ;
- lint OK ;
- build OK.
