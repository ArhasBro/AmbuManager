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
Compléter le flux réel d’édition utilisateur existant pour permettre la lecture et la mise à jour du rôle principal et des permissions applicatives ALPHA d’un utilisateur déjà existant, sans ouvrir de chantier RBAC global ni créer de module séparé.

## Périmètre exact traité
- extension du flux d’édition utilisateur existant ;
- lecture du détail du compte édité et de ses permissions ALPHA ;
- mise à jour du rôle principal via le champ `role` existant ;
- synchronisation des permissions applicatives ALPHA via `UserPermission` ;
- correction ciblée des résiduels TypeScript apparus pendant la validation technique de la session.

## Patches retenus pour la session validée
La session validée comprend explicitement les trois patches suivants :
- `PATCH__SESSION-20260319-18_A3_USERS-10.diff`
- `PATCH__SESSION-20260319-18_A3_USERS-10_FIX-01.diff`
- `PATCH__SESSION-20260319-18_A3_USERS-10_FIX-02.diff`

## Résultat synthétique
Le flux d’édition utilisateur permet désormais d’afficher l’état réel des permissions ALPHA d’un utilisateur existant, de modifier son rôle principal et ses permissions depuis l’UI d’édition, puis d’enregistrer proprement le nouvel état côté API dans le tenant courant, hors comptes support globaux.

## Hors périmètre confirmé
- création utilisateur ;
- archivage / désactivation ;
- reset password ;
- rattachement dépôt ;
- RBAC global ;
- création de nouvelles permissions ;
- USERS-11.
