# Documentation officielle - Ambulance Manager (README historique)

Ce fichier reste à la racine de `docs/` comme point d'entrée historique.
Le point d'entrée documentaire officiel courant est `docs/README_DOCS.md`.

## Sources de vérité

1. `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md`
2. `docs/1-MASTER/DOCUMENT_MAITRE.md`
3. `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md`
4. `docs/1-MASTER/ETAT_GLOBAL_PROJET.md`
5. `docs/1-MASTER/REGISTRE_DECISIONS.md`
6. `docs/1-MASTER/RECAP_DISCUSSIONS.md`
7. `docs/1-MASTER/STRUCTURE_PROJET.md`

Rappel:

- `DOCUMENT_CADRAGE_FONCTIONNEL.md` = base officielle produit
- `CODE > DOCUMENTATION` en cas de contradiction fonctionnelle
- `MAQUETTE_DA > documentation générale` en cas de contradiction visuelle UI/UX
- aucune validation implicite sans preuve

## Arborescence courante

- `docs/1-MASTER/` : documents maîtres
- `docs/2-SESSIONS/` : historique des sessions
- `docs/3-TEMPLATES/` : templates
- `docs/4-ARCHIVES/` : archives documentaires

## Références UI/UX transversales

Les références UI/UX codables sont centralisées ici :

```txt
docs/1-MASTER/2-REFERENCE_UI_UX/
```

Le chantier UI/UX transversal est visuel uniquement : la cible est une reproduction à environ 99 % des maquettes officielles. Le fonctionnel non visible ou gênant peut être masqué, déplacé, replié, simplifié ou supprimé visuellement ; les sujets fonctionnels seront traités dans des sessions applicatives ultérieures.

## Guides et documents historiques de racine

Les anciens documents de racine `docs/*.md` non autorisés à la racine ont été déplacés en archives.
Emplacements principaux:

- `docs/4-ARCHIVES/notes-historiques/`
- `docs/4-ARCHIVES/a-confirmer/`
- `docs/4-ARCHIVES/brouillons/`

## Fichier CMD

- `docs/CMD.md` reste à la racine comme aide opérationnelle de commandes.
- Ce fichier n'est pas un document maître.

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
