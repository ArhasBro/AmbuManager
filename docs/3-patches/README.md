# Patches — Ambulance Manager

Ce dossier contient les artefacts de patch officiels rattachés aux sessions du projet.

## Règles

- **1 session = 1 patch officiel maximum**.
- Les dossiers `docs/patches/` reflètent la même arborescence que `docs/sessions/`.
- Les sessions de type **AUDIT** ou **VALIDATION** ne produisent pas de patch code : elles contiennent un `NO_PATCH.md`.
- Les sessions de type **CORRECTION** ou **COMPLÉTION** utilisent un dossier de patch dédié avec un `README_PATCH.md`, puis un patch officiel unique quand il existe.
- Les patchs doivent être appliqués depuis la racine du projet.
- Les anciens patchs restent archivés dans `docs/patches/ANCIENS_PATCHS/`.
### Rappel patch
- 1er patch = patch principal
- jamais de régénération complète d’un patch déjà appliqué
- toute correction = fix minimal séparé
- documentation `.md` = patch documentaire final séparé après validation code

## Structure cible

```text
docs/patches/
├── README.md
├── 1-ALPHA/
│   ├── BLOC_A1/
│   │   └── SESSION-YYYYMMDD-XX_A1_AUTH-01/
│   │       └── NO_PATCH.md
│   └── BLOC_A2/
├── 2-BETA/
│   ├── BLOC_B1/
│   ├── BLOC_B2/
│   ├── BLOC_B3/
│   └── BLOC_B4/
└── ANCIENS_PATCHS/
```

Pour une session de **CORRECTION** ou **COMPLÉTION**, le dossier de session patch contient au minimum :

```text
README_PATCH.md
PATCH__SESSION-YYYYMMDD-XX_<BLOC>_<SESSION-CODE>.diff
```

## Convention de nommage

### Dossier de session patch

`SESSION-YYYYMMDD-XX_<BLOC>_<SESSION-CODE>`

Exemple :

`SESSION-20260310-01_A1_AUTH-01`

### Patch officiel

`PATCH__SESSION-YYYYMMDD-XX_<BLOC>_<SESSION-CODE>.diff`

Exemple :

`PATCH__SESSION-20260312-01_A1_AUTH-04.diff`

## Application d’un patch

Depuis la racine du projet :

```bash
git apply --check "docs/patches/1-ALPHA/BLOC_A1/SESSION-20260312-01_A1_AUTH-04/PATCH__SESSION-20260312-01_A1_AUTH-04.diff"
git apply         "docs/patches/1-ALPHA/BLOC_A1/SESSION-20260312-01_A1_AUTH-04/PATCH__SESSION-20260312-01_A1_AUTH-04.diff"
```

## Notes

- `NO_PATCH.md` est le statut attendu pour les sessions sans modification code.
- `README_PATCH.md` sert de fiche locale pour documenter le patch attendu, son chemin et ses commandes.
- Un même dossier de session patch ne doit pas contenir plusieurs patchs officiels validés.
