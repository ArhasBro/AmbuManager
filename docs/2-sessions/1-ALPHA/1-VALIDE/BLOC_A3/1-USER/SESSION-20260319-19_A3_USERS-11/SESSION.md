# SESSION — SESSION-20260319-19_A3_USERS-11

## Date
20/03/2026

## Contexte
Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A3  
Type : COMPLÉTION  
Intitulé : Rattachement utilisateur à une base

## Objectif unique de la session
Finaliser proprement le rattachement utilisateur ↔ base dans le flux réel `/users`, sans élargir le périmètre à d'autres sujets du module users.

## Périmètre exact traité
- vérification du flux existant de rattachement utilisateur à une base ;
- confirmation du bornage existant côté backend et multi-tenant ;
- correction du seul résiduel retenu dans `app/users/user-depot-assignment-client.tsx` ;
- resynchronisation de l'UI après changement de base.

## Résultat synthétique
Le flux USERS-11 existait déjà presque entièrement avant intervention. Le backend, le multi-tenant, l'exclusion des comptes support globaux et les garde-fous métier étaient déjà présents. Le seul correctif appliqué a consisté à republier la sélection utilisateur mise à jour puis à relancer le refresh partagé du module users après changement de base, afin de resynchroniser immédiatement l'écran `/users`.

## Hors périmètre confirmé
- création utilisateur ;
- édition utilisateur hors base ;
- reset password ;
- archivage ;
- RBAC global ;
- USERS-12 et la suite.
