# README_PATCH — SESSION-20260319-11_A3_USERS-03

## Session
- Projet : Investissement
- Sous-projet : Ambulance Manager
- Maturité : 1-ALPHA
- Bloc : A3
- Code session : USERS-03
- Type : CORRECTION
- Intitulé : Correction / stabilisation de la liste utilisateurs

## Patch code retenu
- `PATCH__SESSION-20260319-11_A3_USERS-03_FIX_APPLICABLE.diff`

## Objet du patch
Ce patch stabilise la liste utilisateurs existante sans ouvrir encore un module users complet.

Il couvre :
- la route `app/api/users/route.ts`
- la page `app/users/page.tsx`
- le composant de liste users
- l’adaptation des consommateurs existants au nouveau format API

## Contenu fonctionnel
- pagination réelle
- recherche simple
- filtre rôle simple
- réponse API normalisée
- vraie liste tabulaire côté `/users`
- états loading / vide / erreur
- pagination UI simple
- sélection utilisateur claire

## Correctif d’applicabilité
Le patch principal initial ciblait des chemins tronqués.
Le patch retenu corrige les chemins du diff pour viser les chemins réels du dépôt sous `app/...`.

## Validation prouvée
Commandes validées :
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK
