# NOTES

## Méthode / observations

- Relecture préalable des sources autorisées :
  - `docs/1-master/DOCUMENT_MAITRE.md`
  - `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
  - `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
  - `docs/1-master/ETAT_GLOBAL_PROJET.md`
  - `docs/1-master/REGISTRE_DECISIONS.md`
  - `docs/1-master/RECAP_DISCUSSIONS.md`
  - `docs/1-master/STRUCTURE_PROJET.md`
  - `docs/PROTOCOLE_SESSION.md`
  - `docs/SOURCES_AUTORISEES.md`
  - `docs/STRUCTURE_DOCS.md`
  - `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`
- Contrôle prioritaire du code réel demandé par l’ouverture de session.
- Vérification séparée de chaque point du périmètre :
  1. vue semaine
  2. vue jour
  3. vue mois
  4. navigation mensuelle
  5. lisibilité métier
  6. ajout manuel de shift publié
  7. modification de shift publié
  8. suppression métier / annulation logique
  9. historique minimal
  10. traçabilité après publication
- Constat de structure : l’écran `/planning` mélange déjà le planning manuel et des actions autoschedule (`generate`, `publish`, `cancel`, `match`), mais l’audit n’a retenu ces éléments que comme faits réels d’exposition UI/API, sans ouvrir le bloc A9.
- Aucune correction de code réalisée.
- Aucune validation terminale applicative de type `git apply`, `prisma validate`, `prisma generate`, `npm run lint`, `npm run build` n’a été exécutée dans cette session d’audit.
