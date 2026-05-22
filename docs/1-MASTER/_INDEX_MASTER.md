# Index master — Ambulance Manager

## Rôle du dossier `docs/1-MASTER`

Le dossier `docs/1-MASTER` regroupe les documents de référence prioritaires du projet, ainsi que les sous-dossiers de maquettes, de références UI/UX et de fiches fonctionnelles.

## Règle de priorité documentaire

1. Code réel du dépôt.
2. `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md`.
3. `docs/1-MASTER/DOCUMENT_MAITRE.md`.
4. `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md`.
5. `docs/1-MASTER/REGISTRE_DECISIONS.md`.
6. `docs/1-MASTER/ETAT_GLOBAL_PROJET.md`.
7. Références UI/UX (`docs/1-MASTER/2-REFERENCE_UI_UX/`).
8. Maquettes PNG officielles (`docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/`).
9. Sessions historiques (`docs/2-SESSIONS/`) comme preuve.

## Structure réelle de `docs/1-MASTER`

| Élément | Rôle |
|---|---|
| `docs/1-MASTER/1-MAQUETTE/` | Dossier source des maquettes et specs de maquettes |
| `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/` | Emplacement réel actuel des PNG officiels |
| `docs/1-MASTER/2-REFERENCE_UI_UX/` | Références UI/UX codables par page et transversales |
| `docs/1-MASTER/3-FONCTIONNALITES/` | Fiches fonctionnelles détaillées par module/page |
| `docs/1-MASTER/DOCUMENT_MAITRE.md` | Cadre global non négociable |
| `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md` | Plan officiel unique |
| `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md` | Base produit officielle validée |
| `docs/1-MASTER/_INDEX_MASTER.md` | Présent index de lecture |

## Maquettes PNG officielles

Racine active :

```txt
docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/
```

Sous-dossiers réels :

```txt
1-Login/
2-Dashboard/
3-Modèles-Horaire/
4-Planning/
5-Utilisateurs-RH/
6-Véhicules/
7-Dépôts-bases/
8-Société-paramètres-métier/
9-Onboarding société pilote/
10-Audit/
11-Privacy/
```

## Correspondance noms historiques / noms fonctionnels actuels

| Route | Nom historique | Nom fonctionnel actuel | Référence documentaire |
|---|---|---|---|
| `/templates` | `Templates` | `Modèles horaires` | `docs/1-MASTER/3-FONCTIONNALITES/3-FONCTIONNALITES_DETAILLEES_MODELES_HORAIRES_V1.1.md` |
| `/onboarding` | `Onboarding` | `Mise en route` | `docs/1-MASTER/3-FONCTIONNALITES/9-FONCTIONNALITES_DETAILLEES_MISE_EN_ROUTE_V1.1.md` |

Note : les noms de fichiers historiques peuvent conserver `TEMPLATES` ou `ONBOARDING` tant que la clarification ci-dessus est présente dans les index/références.

## Doublon `CADRAGE_UI_UX_ALPHA_MAQUETTE_V0.2.md`

| Fichier | Statut | Rôle |
|---|---|---|
| `docs/1-MASTER/CADRAGE_UI_UX_ALPHA_MAQUETTE_V0.2.md` | Actif | Référence principale de cadrage UI/UX Alpha (version la plus complète) |
| `docs/1-MASTER/1-MAQUETTE/CADRAGE_UI_UX_ALPHA_MAQUETTE_V0.2.md` | Historique | Copie historique conservée pour traçabilité, non prioritaire |

## Références UI/UX clés

- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_INDEX_MAQUETTES.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/MATRICE_CANONIQUE_UI_UX.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_SHELL_GLOBAL.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_CODEX_UI_UX_VISUEL_99.md`

## Fiches fonctionnelles clés

- `docs/1-MASTER/3-FONCTIONNALITES/LISTE_FONCTIONNALITES_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/3-FONCTIONNALITES_DETAILLEES_MODELES_HORAIRES_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/9-FONCTIONNALITES_DETAILLEES_MISE_EN_ROUTE_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/FONCTIONNALITES_DETAILLEES_SHELL_GLOBAL_NAVIGATION_V1.md`

## Points à confirmer

- Niveau d’actualisation détaillé de `RGPD_BASE_MINIMALE.md` : INFORMATION NON FOURNIE — À CONFIRMER.
- Stratégie finale d’archivage des copies historiques UI/UX : INFORMATION NON FOURNIE — À CONFIRMER.
