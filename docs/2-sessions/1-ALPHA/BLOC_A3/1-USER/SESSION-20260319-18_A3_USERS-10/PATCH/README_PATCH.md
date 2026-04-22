# README_PATCH — SESSION-20260319-18_A3_USERS-10

## Ensemble de patches retenus
La session validée comprend explicitement :
- `PATCH__SESSION-20260319-18_A3_USERS-10.diff`
- `PATCH__SESSION-20260319-18_A3_USERS-10_FIX-01.diff`
- `PATCH__SESSION-20260319-18_A3_USERS-10_FIX-02.diff`

## Objet
Compléter le flux réel d’édition utilisateur pour permettre l’affectation du rôle principal et des permissions applicatives ALPHA lors de la modification d’un utilisateur existant, puis absorber les deux résiduels TypeScript apparus pendant la validation technique.

## Contenu couvert
### Patch principal
- lecture détaillée d’un utilisateur éditable ;
- extension de la mise à jour utilisateur pour les permissions ALPHA ;
- affichage et édition des permissions ALPHA dans l’UI ;
- extension du schéma de validation pour `permissionCodes`.

### Fix 01
- correction minimale de typage Prisma/TypeScript dans `app/api/users/[id]/route.ts`.

### Fix 02
- correction minimale de nullabilité TypeScript dans `app/users/user-edit-client.tsx`.

## Hors périmètre confirmé
- création utilisateur ;
- reset password ;
- rattachement dépôt ;
- archivage ;
- refonte RBAC globale ;
- création de nouvelles permissions ;
- USERS-11.

## Validation retenue
Preuves terminal confirmées sur la session validée :
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK

## Statut
Session USERS-10 validée avec patch principal + FIX-01 + FIX-02.
