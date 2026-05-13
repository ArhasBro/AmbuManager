# EVIDENCES

Éléments factuels utilisés pendant la session.

---

## Sources utilisées

- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`
- `docs/4-templates/TEMPLATE_FIN_SESSION.md`
- `README.md`
- `docs/README.md`
- `package.json`
- `package-lock.json`
- `prisma/schema.prisma`
- `prisma/seed.ts`
- `prisma/test-login.ts`
- `app/*`
- `app/api/*`
- `lib/*`
- `docs/2-sessions/1-ALPHA/BLOC_A10/*`
- `docs/2-sessions/1-ALPHA/BLOC_A11/*`
- `docs/2-sessions/1-ALPHA/BLOC_A12/*`

## Preuves factuelles retenues

### Scripts qualité réellement présents
- `package.json` contient les scripts `lint` et `build`.

### Preuves terminales récentes réellement exploitables
- bloc `A10` : validations positives documentées ;
- bloc `A11` : validations positives documentées sur `AUDIT-LOT-02-09` ;
- bloc `A12` : validations positives documentées sur `A12-LOT-02-15`.

### Absence de relance terminale dans A13-01
- aucune commande relancée dans la présente session ;
- aucun succès terminal nouveau déclaré.

### Smoke tests API et tests automatisés ciblés
- aucun répertoire ou convention de tests dédiée n’a été trouvé dans le ZIP courant ;
- aucun jeu de smoke tests API exploitable n’a été trouvé ;
- aucun outillage de tests ciblés exploitable n’a été trouvé.

### Fichiers protégés existants réellement présents (module 20.3)
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`
- `docs/4-templates/TEMPLATE_FIN_SESSION.md`
- `docs/4-templates/TEMPLATE_DOD_4_4.md`
- `docs/4-templates/TEMPLATE_RECAP_SESSION.md`

### Fichiers à protéger s’ils existent ou sont créés (module 20.4)
- `README_PROJET.md` : absent du ZIP courant / `À CONFIRMER`
- `CHANGELOG.md` : absent du ZIP courant / `À CONFIRMER`

### Documentation produit
- `README.md` racine : présent mais générique ;
- guides d’usage dédiés `users`, `vehicles`, `templates`, `planning/autoschedule` : non trouvés.
