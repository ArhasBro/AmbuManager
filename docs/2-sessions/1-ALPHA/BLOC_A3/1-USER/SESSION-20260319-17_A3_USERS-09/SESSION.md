# SESSION — SESSION-20260319-17_A3_USERS-09

## Date
20/03/2026

## Contexte
Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A3  
Type : VALIDATION  
Intitulé : Vérification de l’absence de suppression physique non souhaitée

## Objet de la session
Valider, sur l’état réel du module `users` après USERS-01 à USERS-08, qu’aucun flux standard société n’introduit de suppression physique d’utilisateur et que le comportement attendu reste l’archivage logique.

## Périmètre retenu
- `app/api/users/**` ;
- `app/users/**` lié aux actions utilisateurs ;
- `lib/services/users/**` ;
- `lib/auth.ts` ;
- `lib/permissions.ts` ;
- `lib/validators/user.ts` ;
- `prisma/schema.prisma` ;
- patch réel de USERS-08.

## Hors périmètre confirmé
- aucune refonte de USERS-08 ;
- aucun traitement de USERS-10 ;
- aucune refonte Prisma ;
- aucune extension vers absences, planning utilisateur ou permissions avancées ;
- aucun correctif applicatif si aucune suppression physique non souhaitée n’est prouvée.

## Résultat synthétique
Aucune suppression physique non souhaitée d’utilisateur n’a été prouvée dans le flux réel contrôlé. Le module `users` expose un archivage logique (`isActive: false`) et filtre les comptes standards actifs sans exposer de suppression définitive. La session est donc livrée en mode `NO_PATCH` documentaire.

## Emplacements de référence
- session : `docs/2-sessions/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-17_A3_USERS-09/`
- patch : `docs/3-patches/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-17_A3_USERS-09/`
