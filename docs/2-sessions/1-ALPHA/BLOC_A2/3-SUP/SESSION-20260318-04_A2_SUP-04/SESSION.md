# SESSION-20260318-04_A2_SUP-04

## Identification
- Projet : Investissement  
- Sous-projet : Ambulance Manager  
- Stage : 1-ALPHA  
- Bloc : A2  
- Type : COMPLETION  
- Intitulé : Gestion de la visibilité support côté client  

## Périmètre SUP-04
Session dédiée à la gestion de la visibilité du support côté client.

Objectifs :
- ne pas exposer le support comme rôle client attribuable
- ne pas exposer le support comme utilisateur client administrable
- maintenir la cohérence multi-tenant

## Surfaces concernées
- routes API users
- flux reset password
- assignation dépôt utilisateur
- listing utilisateurs côté client

## Exclusions
- aucun changement Prisma
- aucun changement auth / NextAuth
- aucun ajout de droits support
- aucune traçabilité SUP-05
- aucun back-office support
