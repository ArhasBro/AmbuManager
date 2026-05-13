# _INDEX_MASTER.md

Projet: Investissement / Ambulance Manager  
Mise à jour: 2026-05-13  
Statut: OFFICIEL - A CONSERVER

## 1. Documents maîtres officiels

| Document | Rôle | Statut |
|---|---|---|
| `DOCUMENT_MAITRE.md` | Cadre global technique et méthodologique | OFFICIEL - A CONSERVER |
| `PLAN_DE_DEVELOPPEMENT.md` | Plan officiel unique des blocs et sessions | OFFICIEL - A CONSERVER |
| `DOCUMENT_CADRAGE_FONCTIONNEL.md` | Cadrage produit officiel (figé) | OFFICIEL - A CONSERVER |
| `ETAT_GLOBAL_PROJET.md` | Statut global officiel et prochaine étape | OFFICIEL - A CONSERVER |
| `REGISTRE_DECISIONS.md` | Registre des décisions validées | OFFICIEL - A CONSERVER |
| `RECAP_DISCUSSIONS.md` | Synthèse tracée des échanges et arbitrages | OFFICIEL - A CONSERVER |
| `STRUCTURE_PROJET.md` | Structure documentaire officielle et cible | OFFICIEL - A CONSERVER |
| `2-REFERENCE_UI_UX/REFERENCE_UI_UX_A24.md` | Contexte historique UI/UX A24 | CONTEXTE - NE PRIME PAS SUR LES RÉFÉRENCES PAGE |
| `2-REFERENCE_UI_UX/REFERENCE_UI_UX_INDEX_MAQUETTES.md` | Table de vérité documentaire UI/UX transversale | OFFICIEL - UI/UX VISUEL |
| `2-REFERENCE_UI_UX/REFERENCE_UI_UX_SHELL_GLOBAL.md` | Référence visuelle du shell connecté | OFFICIEL - UI/UX VISUEL |
| `2-REFERENCE_UI_UX/REFERENCE_CODEX_UI_UX_VISUEL_99.md` | Règles Codex pour les futures sessions UI visuelles | OFFICIEL - PRODUCTION CODEX |

## 2. Référence UI/UX officielle

La direction artistique officielle est exclusivement:

```txt
docs/1-MASTER/1-MAQUETTE/MAQUETTE_DA
```

Règle prioritaire: en cas de contradiction visuelle, `MAQUETTE_DA` prime.

Les documents `REFERENCE_UI_UX_<PAGE>.md` ne remplacent pas les images officielles : ils traduisent les images en consignes codables pour Codex.

## 3. Règle racine `docs/`

Éléments autorisés directement à la racine:

- `README_DOCS.md`
- `README.md`
- `CMD.md`
- `1-MASTER/`
- `2-SESSIONS/`
- `3-TEMPLATES/`
- `4-ARCHIVES/`

## 4. Fichiers et dossiers à ne pas déplacer

- `docs/1-MASTER/DOCUMENT_MAITRE.md`
- `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-MASTER/ETAT_GLOBAL_PROJET.md`
- `docs/1-MASTER/REGISTRE_DECISIONS.md`
- `docs/1-MASTER/RECAP_DISCUSSIONS.md`
- `docs/1-MASTER/STRUCTURE_PROJET.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_A24.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_A25_PLANNING.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_INDEX_MAQUETTES.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_SHELL_GLOBAL.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_CODEX_UI_UX_VISUEL_99.md`
- `docs/1-MASTER/1-MAQUETTE/`
- `docs/1-MASTER/1-MAQUETTE/MAQUETTE_DA/`
- `docs/2-SESSIONS/`
- `docs/3-TEMPLATES/`
- `docs/4-ARCHIVES/`

## 5. Fichiers à mettre à jour seulement après validation

- `DOCUMENT_CADRAGE_FONCTIONNEL.md` (document figé)
- `DOCUMENT_MAITRE.md`
- `PLAN_DE_DEVELOPPEMENT.md`
- `ETAT_GLOBAL_PROJET.md`
- `REGISTRE_DECISIONS.md`
- `RECAP_DISCUSSIONS.md`
- `REFERENCE_UI_UX_A24.md`

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

## 7. Règle de preuve

Toute information non prouvée doit être notée exactement:

```txt
INFORMATION NON FOURNIE — À CONFIRMER
```

Cette formule est documentaire et QA uniquement. Elle ne doit jamais être affichée dans l’interface utilisateur finale.
