# README_PATCH — SESSION-20260319-23_A3_USERS-15

## Patch retenu
- `PATCH__SESSION-20260319-23_A3_USERS-15.diff`

## Objet
Compléter la consultation du planning utilisateur / collègues selon permissions, sans refonte globale du module planning.

## Contenu exact du patch principal
- ajout des helpers de lecture planning dans `lib/permissions.ts` ;
- verrouillage réel de `GET /api/planning/shifts` selon `PLANNING_VIEW_SELF` / `PLANNING_VIEW_GLOBAL` ;
- filtrage du flux planning sur un utilisateur cible unique (`userId`) avec fallback sur l’utilisateur courant ;
- blocage explicite des demandes collègue si la permission globale est absente ;
- branchement serveur de `app/planning/page.tsx` pour calculer les droits réels et préparer la liste des utilisateurs consultables ;
- ajout dans `app/planning/planning-client.tsx` d’une consultation centrée utilisateur avec sélecteur collègue uniquement si autorisé.

## Portée retenue
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/api/planning/shifts/route.ts`
- `lib/permissions.ts`

## Hors périmètre conservé
- aucune refonte globale du module planning ;
- aucune extension vers exports, dashboard, RH avancées ou USERS-16 ;
- aucune modification hors du besoin de consultation planning selon permissions.

## Validation terminale finale
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK

## Commandes d’application de référence
```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-23_A3_USERS-15/PATCH__SESSION-20260319-23_A3_USERS-15.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-23_A3_USERS-15/PATCH__SESSION-20260319-23_A3_USERS-15.diff"
```
