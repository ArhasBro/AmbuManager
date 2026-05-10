# EVIDENCES — SESSION-20260319-18_A3_USERS-10

## Sources utilisées
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- code réellement présent dans le ZIP de travail
- sessions antérieures `USERS-01` à `USERS-09`
- validation qualité finale explicitement confirmée dans l’échange utilisateur

## Fichiers applicatifs concernés par la session validée
### Patch principal
- `app/api/users/[id]/route.ts`
- `app/users/user-edit-client.tsx`
- `lib/validators/user.ts`

### Fix 01
- `app/api/users/[id]/route.ts`

### Fix 02
- `app/users/user-edit-client.tsx`

## Éléments fonctionnels probants
- l’API d’édition accepte le rôle principal et les permissions ALPHA ;
- l’état réel des permissions du compte édité peut être lu avant modification ;
- l’UI d’édition affiche les permissions ALPHA du compte sélectionné ;
- l’UI permet de modifier ces permissions et le rôle principal ;
- l’enregistrement côté API synchronise `UserPermission` dans le périmètre du tenant courant ;
- les comptes support globaux restent exclus du flux standard.

## Preuves terminal confirmées pour la session validée
Validation qualité finale confirmée :
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK

## Patches retenus
- `PATCH__SESSION-20260319-18_A3_USERS-10.diff`
- `PATCH__SESSION-20260319-18_A3_USERS-10_FIX-01.diff`
- `PATCH__SESSION-20260319-18_A3_USERS-10_FIX-02.diff`
