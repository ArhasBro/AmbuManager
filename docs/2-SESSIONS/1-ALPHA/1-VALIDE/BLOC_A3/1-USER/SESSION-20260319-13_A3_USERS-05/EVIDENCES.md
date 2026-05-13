# EVIDENCES — SESSION-20260319-13_A3_USERS-05

## Sources de référence
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
- sessions antérieures du bloc : `USERS-01`, `USERS-02`, `USERS-03`, `USERS-04`
- code réel du dépôt sur le périmètre users

## Périmètre applicatif réellement concerné
- page `/users` ;
- composants client associés à la gestion utilisateurs ;
- intégration cliente de l’API `POST /api/users` déjà existante.

## Validation retenue
Le patch USERS-05 a été intégré dans le dépôt et la validation terminale réelle retenue est :
- `git apply --check` : OK ;
- `git apply` : OK ;
- `npm run lint` : OK ;
- `npm run build` : OK.

## Traçabilité de session
- patch principal retenu : `PATCH__SESSION-20260319-13_A3_USERS-05.diff` ;
- périmètre confirmé : UI création utilisateur uniquement ;
- absence de dérive confirmée vers édition, archivage, Prisma, RBAC ou refonte large.