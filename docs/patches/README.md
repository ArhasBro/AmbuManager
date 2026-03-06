# Patches — Ambulance Manager

Ce dossier contient les patchs (`.diff`) produits et appliqués pendant le projet.

## Règles

- Un patch est rattaché à une session (`SESSION-YYYYMMDD-XX`) et à un bloc/phase (ex: `4.4`).
- Chaque patch doit être traçable : session, objectif, fichiers impactés, statut d’application.
- Les patchs doivent être appliqués depuis la racine du projet.
- Les patchs servent à rejouer une modification, auditer, ou partager un changement.

## Structure

```text
docs/patches/
├── README.md
├── <phase>/
│   └── SESSION-YYYYMMDD-XX__<phase>__<short-title>.diff
└── general/
    └── PATCH_<nom>.diff
```

## Convention de nommage

Format standard :

`SESSION-YYYYMMDD-XX__PHASE__short-title.diff`

## Application d’un patch

Depuis la racine :

```bash
git apply -p1 --check <chemin_du_patch>
git apply -p1 <chemin_du_patch>

# si conflit
git apply -p1 --reject <chemin_du_patch>
```

## Exception — Audit global / maintenance

Des patchs non rattachés à une session unique peuvent être stockés dans `docs/patches/general/`.

Exemples :

- `PATCH_1_CORE_SECURITE.diff`
