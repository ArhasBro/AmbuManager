# Sessions — Ambulance Manager

Ce dossier contient les traces documentaires officielles des sessions de travail.

## Règles

- **1 session = 1 point clair, 1 fonctionnalité, 1 DoD, 1 validation**.
- Les sessions actives sont classées par maturité puis par bloc.
- Les sessions historiques au format précédent restent archivées dans `ANCIEN_FORMAT_SESSION/`.
- Le dossier `SESSION-YYYYMMDD-XX/` sert de modèle de fichiers pour `create_session.ps1`.

## Structure cible

```text
docs/sessions/
├── README.md
├── 1-ALPHA/
│   ├── BLOC_A1/
│   │   └── SESSION-YYYYMMDD-XX_A1_AUTH-01/
│   │       ├── SESSION.md
│   │       ├── NOTES.md
│   │       ├── EVIDENCES.md
│   │       ├── RESULTATS.md
│   │       └── FIN_SESSION.md
│   └── BLOC_A2/
├── 2-BETA/
│   ├── BLOC_B1/
│   ├── BLOC_B2/
│   ├── BLOC_B3/
│   └── BLOC_B4/
├── ANCIEN_FORMAT_SESSION/
└── SESSION-YYYYMMDD-XX/
```

## Convention de nommage

### Dossier de session

`SESSION-YYYYMMDD-XX_<BLOC>_<SESSION-CODE>`

Exemple :

`SESSION-20260310-01_A1_AUTH-01`

### Bloc

- `1-ALPHA` : `BLOC_A1` à `BLOC_A13`
- `2-BETA` : `BLOC_B1` à `BLOC_B4`

### Maturité

- `1-ALPHA`
- `2-BETA`
