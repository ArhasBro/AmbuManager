# README_DOCS.md

Projet: Investissement / Ambulance Manager
Mise a jour: 2026-05-06
Statut: OFFICIEL - A CONSERVER

## 1. Role du dossier `docs/`
Ce dossier centralise la documentation de pilotage, de sessions, de templates et d'archives du projet.

## 2. Regle racine `docs/` (validee)
Seuls les elements suivants doivent rester directement a la racine de `docs/`:
- `README_DOCS.md`
- `README.md`
- `CMD.md`
- `1-master/`
- `2-sessions/`
- `3-templates/`
- `4-archives/`

Tout autre fichier ou dossier racine doit etre deplace vers `docs/4-archives/` selon son classement.

## 3. Grands dossiers et role
- `docs/1-master/`: documents maitres officiels de reference.
- `docs/2-sessions/`: historique des sessions, preuves, patchs et clotures.
- `docs/3-templates/`: templates de demarrage, recap et fin de session.
- `docs/4-archives/`: zone d'archivage documentaire.
  - `brouillons/`
  - `anciens-zips/`
  - `notes-historiques/`
  - `a-confirmer/`

## 4. Chemins officiels stables (ne pas deplacer)
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/1-master/REFERENCE_UI_UX_A24.md`
- `docs/1-master/MAQUETTE/`
- `docs/1-master/MAQUETTE/MAQUETTE_DA/`
- `docs/2-sessions/`
- `docs/3-templates/`

## 5. Regle de priorite UI/UX
La direction artistique officielle est exclusivement:

`docs/1-master/MAQUETTE/MAQUETTE_DA`

En cas de contradiction entre anciens documents, anciennes captures, anciens prompts ou interpretations precedentes, `MAQUETTE_DA` prime.

## 6. Role de `README.md` et `CMD.md`
- `docs/README.md`: README historique conserve pour compatibilite et contexte legacy.
- `docs/CMD.md`: aide operationnelle de commandes/documentation d'execution.

Ces deux fichiers ne sont pas des documents maitres et ne remplacent pas `docs/1-master/*`.

## 7. Regle de prudence documentaire
- Ne rien supprimer sans validation explicite.
- En cas de doute de classement, classer en `docs/4-archives/a-confirmer/`.
- Toute information non prouvee doit etre notee exactement:

`INFORMATION NON FOURNIE — À CONFIRMER`
