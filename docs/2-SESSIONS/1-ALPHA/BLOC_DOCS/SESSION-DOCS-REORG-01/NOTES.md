# NOTES.md

## Observations d'audit
- Les documents maitres obligatoires sont presents dans `docs/1-master/`.
- `docs/1-master/MAQUETTE/MAQUETTE_DA/` est present et stable.
- La racine `docs/` contenait des fichiers historiques hors politique racine propre.

## Probleme de classement traite
La regle racine validee impose que seuls restent a la racine:
- `README_DOCS.md`
- `README.md`
- `CMD.md`
- `1-master/`
- `2-sessions/`
- `3-templates/`
- `4-archives/`

Tous les autres elements ont ete reclasses via `git mv`.

## Arbitrages de classement
- `notes-historiques/`: anciens guides d'usage et notes de realignement.
- `a-confirmer/`: documents au statut ambigu (`BDD_OPERATIONS_SENSIBLES`, `SOURCES_AUTORISEES`, `STRUCTURE_DOCS`).
- `brouillons/`: dossier `REFONTE` reclasse.

## Cas particuliers
- `docs/README.md` conserve comme README historique et compatibilite legacy.
- `docs/README_DOCS.md` conserve comme point d'entree documentaire officiel courant.
- `docs/CMD.md` conserve comme aide operationnelle de commandes.

## Prudence et limites
- Aucun fichier supprime.
- Aucun chemin maitre officiel deplace.
- Aucun deplacement de `docs/1-master/MAQUETTE/MAQUETTE_DA`.
- Aucune modification applicative.

## Point restant
- INFORMATION NON FOURNIE — À CONFIRMER: decision de re-ecriture retroactive de tous les anciens chemins de sessions historiques.
