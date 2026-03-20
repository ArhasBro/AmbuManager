# SESSION — SESSION-20260319-18_A3_USERS-10

## Date
20/03/2026

## Contexte
Projet : Investissement
Sous-projet : Ambulance Manager
Maturité : 1-ALPHA
Bloc : A3
Type : COMPLETION
Intitulé : Affectation rôle principal + permissions lors de l’édition

## Objectif unique de la session
Compléter le flux réel d’édition utilisateur existant pour permettre la lecture et la mise à jour du rôle principal et des permissions applicatives ALPHA d’un utilisateur déjà existant, sans élargissement vers un module RBAC séparé.

## Périmètre exact traité
- extension de l’API `app/api/users/[id]/route.ts` avec lecture détaillée et synchronisation des permissions ALPHA ;
- extension de `lib/validators/user.ts` pour accepter `permissionCodes` ;
- enrichissement de `app/users/user-edit-client.tsx` pour charger, afficher et modifier les permissions ALPHA du compte sélectionné ;
- maintien du bornage multi-tenant, de l’exclusion des comptes support globaux et du rôle principal unique via `role`.

## Hors périmètre confirmé
- création utilisateur ;
- archivage / désactivation ;
- reset password ;
- rattachement dépôt ;
- refonte RBAC ;
- création de nouvelles permissions ;
- modification du schéma Prisma.

## Résultat synthétique
La session USERS-10 ajoute le chaînage minimal manquant entre l’édition utilisateur existante et les permissions applicatives ALPHA : lecture du détail du compte, affichage des permissions réelles, édition UI, puis synchronisation côté API. Le patch reste borné au flux d’édition déjà existant.

## Dossiers liés
- session : `docs/2-sessions/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-18_A3_USERS-10/`
- patch : `docs/3-patches/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-18_A3_USERS-10/`
