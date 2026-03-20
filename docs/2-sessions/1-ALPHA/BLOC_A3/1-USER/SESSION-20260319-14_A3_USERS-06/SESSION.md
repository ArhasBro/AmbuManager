# SESSION — SESSION-20260319-14_A3_USERS-06

## ID session
`SESSION-20260319-14_A3_USERS-06`

## Date
19/03/2026

## Contexte
Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A3  
Type : COMPLETION  
Intitulé : API modification utilisateur

## Objectif de la session
Ajouter une route API minimale de modification utilisateur, strictement limitée au périmètre USERS-06, en continuité de USERS-04 et USERS-05.

## Périmètre exact traité
- ajout de `PATCH /api/users/[id]` ;
- validation Zod stricte du corps de requête ;
- édition limitée à `name`, `email`, `role` ;
- refus implicite des champs hors périmètre (`password`, `depotId`, `platformRole`, etc.) ;
- contrôle multi-tenant par `companyId` ;
- exclusion des comptes support globaux via `platformRole: null` et `role != null`.

## Hors périmètre confirmé
- UI de modification ;
- mot de passe ;
- rattachement dépôt ;
- archivage / désactivation ;
- création utilisateur ;
- modification Prisma.

## Résultat synthétique
La route API de modification utilisateur a été ajoutée dans le périmètre minimal attendu. Le patch s’applique correctement. La chaîne de validation terminale finale communiquée localement est conforme : `git apply --check`, `git apply`, `npx prisma validate`, `npx prisma generate`, `npm run lint` et `npm run build` sont validés.

## Dossiers liés
- Session : `docs/2-sessions/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-14_A3_USERS-06/`
- Patch : `docs/3-patches/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-14_A3_USERS-06/`
