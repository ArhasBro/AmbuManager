# README_PATCH — SESSION-20260319-19_A3_USERS-11

## Patch retenu
- `PATCH__SESSION-20260319-19_A3_USERS-11.diff`

## Objet
Finaliser le flux réel de rattachement utilisateur à une base en corrigeant uniquement la resynchronisation UI après changement de base dans `/users`.

## Point de départ réel
Avant patch, le flux USERS-11 existait déjà presque entièrement :
- backend déjà en place ;
- bornage multi-tenant déjà en place ;
- exclusion des comptes support globaux déjà en place ;
- garde-fous métier déjà en place ;
- UI de rattachement déjà intégrée.

## Contenu exact du patch
Le correctif appliqué dans `app/users/user-depot-assignment-client.tsx` consiste à :
- republier la sélection utilisateur mise à jour ;
- relancer le refresh partagé du module users.

## Portée
- un seul fichier applicatif modifié ;
- aucun changement backend ;
- aucune refonte ;
- aucun élargissement hors USERS-11.

## Validation retenue
- patch applicable ;
- lint OK ;
- build OK.
