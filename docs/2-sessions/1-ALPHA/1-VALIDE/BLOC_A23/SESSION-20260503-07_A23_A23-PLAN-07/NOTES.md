# NOTES

Notes de travail de la session.

---

## Methode / observations

1. Lecture documentaire ciblee
- Noyau obligatoire lu : `DOCUMENT_MAITRE.md`, `PLAN_DE_DEVELOPPEMENT.md`.
- Template ouverture lu : `TEMPLATE_DEBUT_SESSION.md`.
- Complements A23 utiles lus : A23-TEST-01, A23-USERS-03, A23-USERS-04, A23-UI-06, puis dossier session A23-PLAN-07.

2. Inspection technique planning
- Verification des composants et routes planning manuelles.
- Constat code : le panel manuel recupere les templates mais ne consomme pas `startTime/endTime/crossesMidnight` pour synchroniser les champs horaires.

3. Execution reelle des flux
- Serveur local lance (`npm run dev`) puis tests HTTP authentifies ADMIN executes via script Node.
- Flux testes :
  - template -> horaires (template nuit + creation sur horaires non alignes) ;
  - affectation personnel (`assign`) ;
  - modification (`PATCH shift`) ;
  - annulation logique (`cancel`) ;
  - persistance (relecture API + verification DB).

4. Limites de la session
- Pas d'automatisation navigateur disponible dans cette execution ; verification UI fine non instrumentee.
- Aucune base active (`depots_count=0`) sur ce jeu de donnees, donc affectation base/depot non testable ici.

## Constats de fond

- Le backend accepte des horaires manuels qui peuvent diverger des horaires du template.
- Le frontend manuel ne synchronise pas automatiquement les horaires lors du choix d'un template.
- Les flux edition et annulation logique sont fonctionnels en API sur ce dataset.
- Le flux affectation personnel n'est pas valide sur la preuve brute retenue (`assign_status=400`) et la cause exacte du `400` n'est pas demontree dans ce dossier :
INFORMATION NON FOURNIE — À CONFIRMER
