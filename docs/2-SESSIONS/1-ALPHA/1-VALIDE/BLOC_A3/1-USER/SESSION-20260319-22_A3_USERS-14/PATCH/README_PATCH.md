# README_PATCH — SESSION-20260319-22_A3_USERS-14

## Patch retenu
- `PATCH__SESSION-20260319-22_A3_USERS-14.diff`

## Objet
Ajouter l’UI minimale réelle des indisponibilités / absences dans `app/users/**`, en s’appuyant strictement sur l’API validée de USERS-13, sans refaire le backend ni élargir vers le planning.

## Contenu exact du patch principal
- insertion du composant absences dans `app/users/page.tsx` ;
- ajout du composant `app/users/user-absence-client.tsx` ;
- branchement sur la sélection existante de `UsersListClient` via `USERS_SELECTION_EVENT` ;
- lecture des absences du salarié sélectionné via `GET /api/users/[id]/absences` ;
- création via `POST /api/users/[id]/absences` ;
- modification via `PATCH /api/users/[id]/absences/[absenceId]` ;
- suppression via `DELETE /api/users/[id]/absences/[absenceId]`.

## Garde-fous UI inclus
- aucune action possible sans utilisateur sélectionné dans la liste existante ;
- contrôle UI minimal sur les dates (`fin > début`) avant appel API ;
- affichage des erreurs backend pertinentes, dont chevauchement d’absence ;
- possibilité d’annuler l’édition en cours ;
- aucune refonte du module users hors ajout de la brique absences.

## Portée
- UI `users` uniquement ;
- aucune modification des routes API USERS-13 ;
- aucune intégration planning / autoschedule ;
- aucune refonte globale de la page users ;
- aucune extension vers USERS-15.

## Validation réelle exécutée
- `git apply --check` du patch sur copie propre : OK ;
- `git apply` du patch sur copie propre : OK ;
- `npm run lint` : OK ;
- `npm run build` : OK.

## Commandes d’application de référence
```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-22_A3_USERS-14/PATCH__SESSION-20260319-22_A3_USERS-14.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-22_A3_USERS-14/PATCH__SESSION-20260319-22_A3_USERS-14.diff"
```
