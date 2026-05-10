# EVIDENCES — SESSION-20260319-22_A3_USERS-14

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
- `docs/2-sessions/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-21_A3_USERS-13/*`

## Références documentaires de cadrage
- `PLAN_DE_DEVELOPPEMENT.md` : `USERS-14` est la session `UI indisponibilités / absences`.
- `DOCUMENT_CADRAGE_FONCTIONNEL.md` : le module users doit couvrir la gestion des indisponibilités / absences.
- `USERS-13` : l’API absences existe déjà et constitue le point d’appui backend de la présente session.

## Fichiers applicatifs réellement ajoutés / modifiés par USERS-14
- `app/users/page.tsx`
- `app/users/user-absence-client.tsx`

## Preuves fonctionnelles issues du code produit
- `app/users/page.tsx` : insertion de `UserAbsenceClient` dans la page users existante.
- `app/users/user-absence-client.tsx` : écoute de `USERS_SELECTION_EVENT` pour récupérer le salarié sélectionné sans refondre la liste users.
- `app/users/user-absence-client.tsx` : appel réel à `GET /api/users/[id]/absences?limit=200` pour charger les absences.
- `app/users/user-absence-client.tsx` : appel réel à `POST /api/users/[id]/absences` pour la création.
- `app/users/user-absence-client.tsx` : appel réel à `PATCH /api/users/[id]/absences/[absenceId]` pour la modification.
- `app/users/user-absence-client.tsx` : appel réel à `DELETE /api/users/[id]/absences/[absenceId]` pour la suppression.
- `app/users/user-absence-client.tsx` : garde-fou UI local sur l’intervalle (`fin > début`) et restitution spécifique du conflit `ABSENCE_OVERLAP`.

## Validations réellement exécutées
### Rejouabilité du patch
- `git apply --check "docs/3-patches/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-22_A3_USERS-14/PATCH__SESSION-20260319-22_A3_USERS-14.diff"` : OK sur copie propre.
- `git apply "docs/3-patches/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-22_A3_USERS-14/PATCH__SESSION-20260319-22_A3_USERS-14.diff"` : OK sur copie propre.

### Validation technique demandée
- `npm run lint` : OK
- `npm run build` : OK

## Interprétation retenue
- le patch principal code est rejouable ;
- les validations terminales demandées sont conformes ;
- aucune sortie terminale positive n’a été inventée ;
- la session est documentée avec l’état final validé des contrôles exécutés.
