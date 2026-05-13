# README_DOCS.md

Projet: Investissement / Ambulance Manager  
Mise à jour: 2026-05-13  
Statut: OFFICIEL - A CONSERVER

## 1. Rôle du dossier `docs/`

Ce dossier centralise la documentation de pilotage, de sessions, de templates et d'archives du projet.

Il constitue l’espace documentaire officiel du projet Ambulance Manager.

## 2. Règle racine `docs/` (validée)

Seuls les éléments suivants doivent rester directement à la racine de `docs/`:

- `README_DOCS.md`
- `README.md`
- `CMD.md`
- `1-MASTER/`
- `2-SESSIONS/`
- `3-TEMPLATES/`
- `4-ARCHIVES/`

Tout autre fichier ou dossier racine doit être déplacé vers `docs/4-ARCHIVES/` selon son classement.

## 3. Grands dossiers et rôle

- `docs/1-MASTER/`: documents maîtres officiels de référence.
- `docs/2-SESSIONS/`: historique des sessions, preuves, patchs et clôtures.
- `docs/3-TEMPLATES/`: templates de démarrage, récap et fin de session.
- `docs/4-ARCHIVES/`: zone d'archivage documentaire.
  - `brouillons/`
  - `anciens-zips/`
  - `notes-historiques/`
  - `a-confirmer/`

## 4. Chemins officiels stables (ne pas déplacer)

- `docs/1-MASTER/DOCUMENT_MAITRE.md`
- `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-MASTER/ETAT_GLOBAL_PROJET.md`
- `docs/1-MASTER/REGISTRE_DECISIONS.md`
- `docs/1-MASTER/RECAP_DISCUSSIONS.md`
- `docs/1-MASTER/STRUCTURE_PROJET.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_A24.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_INDEX_MAQUETTES.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_SHELL_GLOBAL.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_CODEX_UI_UX_VISUEL_99.md`
- `docs/1-MASTER/1-MAQUETTE/`
- `docs/1-MASTER/1-MAQUETTE/MAQUETTE_DA/`
- `docs/2-SESSIONS/`
- `docs/3-TEMPLATES/`
- `docs/4-ARCHIVES/`

## 5. Règle de priorité UI/UX

La direction artistique officielle est exclusivement:

```txt
docs/1-MASTER/1-MAQUETTE/MAQUETTE_DA
```

En cas de contradiction entre anciens documents, anciennes captures, anciens prompts ou interprétations précédentes, `MAQUETTE_DA` prime comme source visuelle.

Pour le chantier documentaire transversal UI/UX :

```txt
Image officielle = vérité visuelle
REFERENCE_UI_UX_<PAGE>.md = traduction codable pour Codex
Code réel = vérité fonctionnelle
```

La phase actuelle est strictement visuelle : l’objectif est la reproduction à environ 99 % des maquettes officielles. Le fonctionnel existant ne doit pas bloquer cette phase ; les éléments fonctionnels gênants peuvent être masqués, déplacés, repliés, simplifiés ou supprimés visuellement. Les arbitrages fonctionnels seront traités plus tard dans des sessions applicatives dédiées.

## 6. Rôle de `README.md` et `CMD.md`

- `docs/README.md`: README historique conservé pour compatibilité et contexte legacy.
- `docs/CMD.md`: aide opérationnelle de commandes/documentation d'exécution.

Ces deux fichiers ne sont pas des documents maîtres et ne remplacent pas `docs/1-MASTER/*`.

## 7. Règle de prudence documentaire

- Ne rien supprimer sans validation explicite.
- En cas de doute de classement, classer en `docs/4-ARCHIVES/a-confirmer/`.
- Toute information non prouvée doit être notée exactement:

```txt
INFORMATION NON FOURNIE — À CONFIRMER
```

Cette formule est réservée aux documents, audits et contrôles QA. Elle ne doit jamais être affichée telle quelle dans l’interface utilisateur finale.

## Règle officielle — casse des dossiers documentaires

La casse officielle des dossiers documentaires du projet est la suivante :

```txt
docs/1-MASTER/
docs/2-SESSIONS/
docs/3-TEMPLATES/
docs/4-ARCHIVES/
```

Les anciennes variantes en minuscules ne doivent plus être utilisées dans les nouveaux documents, prompts, preuves, références ou livrables documentaires :

```txt
docs/1-master/
docs/2-sessions/
docs/3-templates/
docs/4-archives/
```

Les chemins documentaires actifs doivent toujours utiliser la casse officielle.

Exception : les anciens fichiers historiques, anciens patchs `.diff`, anciennes preuves terminales, anciens rapports de session et archives peuvent conserver les anciens chemins s’ils décrivent l’état réel du projet au moment où ils ont été produits.

Aucune correction rétroactive massive ne doit être faite dans les anciens livrables historiques si cela risque de dénaturer la traçabilité.

## 9. Référence Codex UI/UX visuelle

Pour toute future production Codex visant l’alignement visuel d’une page avec sa maquette, lire prioritairement :

```txt
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_INDEX_MAQUETTES.md
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_SHELL_GLOBAL.md
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_CODEX_UI_UX_VISUEL_99.md
```

Puis lire uniquement le document `REFERENCE_UI_UX_<PAGE>.md` de la page concernée et les fichiers code utiles à cette page.
