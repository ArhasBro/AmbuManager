# EVIDENCES — SESSION-20260319-23_A3_USERS-15

## Sources relues pour la session
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/4-templates/*`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A1/3-RBAC/SESSION-20260313-10_A1_RBAC-09/*`
- `docs/2-sessions/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-09_A3_USERS-01/*`
- `docs/2-sessions/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-22_A3_USERS-14/*`

## Références documentaires de cadrage
- `DOCUMENT_CADRAGE_FONCTIONNEL.md` : consultation du planning utilisateur, avec ouverture collègues selon permissions.
- `PLAN_DE_DEVELOPPEMENT.md` : `USERS-15 — COMPLÉTION — Consultation du planning utilisateur / collègues selon permissions`.
- les sessions précédentes montrent que la lecture planning existante devait encore être réellement bornée par permissions.

## Fichiers applicatifs réellement modifiés par USERS-15
- `lib/permissions.ts`
- `app/api/planning/shifts/route.ts`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`

## Preuves fonctionnelles issues du code produit
- `lib/permissions.ts` : helpers dédiés pour la lecture planning selon permissions.
- `app/api/planning/shifts/route.ts` : refus explicite si l’utilisateur ne dispose pas des droits de lecture planning attendus.
- `app/api/planning/shifts/route.ts` : filtrage des shifts sur l’utilisateur cible, avec blocage d’une consultation collègue sans permission globale.
- `app/planning/page.tsx` : préparation des droits réels et de la liste consultable côté serveur.
- `app/planning/planning-client.tsx` : consultation centrée utilisateur avec sélecteur collègue uniquement si autorisé.

## Validations terminales réelles retenues
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK

## Interprétation retenue
- le patch code USERS-15 est valide et appliquable ;
- la consultation planning est désormais bornée par permissions et par utilisateur cible ;
- la validation terminale finale est confirmée conforme.
