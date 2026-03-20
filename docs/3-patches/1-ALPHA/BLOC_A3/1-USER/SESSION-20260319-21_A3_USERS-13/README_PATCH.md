# README_PATCH — SESSION-20260319-21_A3_USERS-13

## Patch retenu
- `PATCH__SESSION-20260319-21_A3_USERS-13.diff`

## Objet
Créer la brique backend minimale réelle des indisponibilités / absences utilisateur, strictement bornée au module `users`, sans UI ni intégration planning complète.

## Contenu exact du patch principal
- ajout du modèle Prisma `UserAbsence` ;
- ajout de la migration SQL dédiée ;
- ajout du validateur `lib/validators/user-absence.ts` ;
- ajout du service `lib/services/users/user-absence.ts` ;
- ajout des routes API :
  - `GET/POST app/api/users/[id]/absences/route.ts`
  - `PATCH/DELETE app/api/users/[id]/absences/[absenceId]/route.ts`

## Garde-fous inclus
- multi-tenant strict via `companyId` ;
- utilisateur cible actif réel uniquement ;
- RBAC réutilisé via `canManageUsers` ;
- refus des intervalles invalides ;
- refus des chevauchements d’absences pour un même utilisateur.

## Portée
- backend uniquement ;
- aucune UI ;
- aucune intégration autoschedule ;
- aucune refonte planning ;
- aucune permission nouvelle.

## Validation finale retenue
Selon le contrôle réel final validé :
- `npx prisma validate` : OK ;
- `npx prisma generate` : OK ;
- `npm run lint` : OK ;
- `npm run build` : OK.

## Note sur les messages de réapplication
Les messages `patch does not apply` / `already exists in working directory` constatés lors d’un contrôle de réapplication correspondent à une tentative d’appliquer un diff déjà intégré. Ils n’invalident pas le patch principal ni la validation du code présent dans le dépôt.

## Commandes d’application de référence
```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-21_A3_USERS-13/PATCH__SESSION-20260319-21_A3_USERS-13.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-21_A3_USERS-13/PATCH__SESSION-20260319-21_A3_USERS-13.diff"
```

## Statut final
Patch documentaire de clôture effectué. Le diff principal reste inchangé. Aucun fichier code n’a été modifié dans cette mise à jour documentaire.
