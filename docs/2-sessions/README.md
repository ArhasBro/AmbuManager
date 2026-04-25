# Sessions — Ambulance Manager

Ce dossier contient les traces documentaires officielles des sessions de travail.

## Règles

- **1 session = 1 point clair, 1 fonctionnalité, 1 DoD, 1 validation**.
- Chaque bloc se termine par une **session dédiée de clôture de bloc**.
- Les sessions actives sont classées par maturité puis par bloc.
- Les sessions historiques au format précédent restent archivées dans `ANCIEN_FORMAT_SESSION/`.
- Le dossier `SESSION-YYYYMMDD-XX/` sert de modèle de fichiers pour `create_session.ps1`.

## Structure cible

```text
docs/2-sessions/
├── README.md
├── 1-ALPHA/
│   ├── BLOC_A1/
│   │   ├── 1-AUTH/
│   │   ├── 2-TENANT/
│   │   ├── 3-RBAC/
│   │   ├── 4-API/
│   │   └── 5-CLOTURE_A1/
│   │       └── SESSION-YYYYMMDD-XX_A1_CLOTURE_A1/
│   │           ├── SESSION.md
│   │           ├── NOTES.md
│   │           ├── EVIDENCES.md
│   │           ├── RESULTATS.md
│   │           └── FIN_SESSION.md
│   └── BLOC_A2/
│       └── 4-CLOTURE_A2/
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

## Clôture de bloc

La fin de chaque bloc doit disposer d’un sous-dossier dédié de type :
- `4-CLOTURE_A2`

La session de clôture :
- vérifie le code réel, les patchs réels, la documentation finale et les validations terminales ;
- rend obligatoirement le verdict :
  - `BLOC <ID> CLÔTURABLE DÉFINITIVEMENT : OUI`
  - ou `BLOC <ID> CLÔTURABLE DÉFINITIVEMENT : NON`

Aucun bloc suivant ne doit être ouvert sans ce verdict explicite.


## Dossier UI/UX documentaire séparé

Le dossier suivant contient la référence documentaire UI/UX validée :

```text
docs/2-sessions/3-UI_UX-ALPHA/
```

Rôle de ce dossier :

- conserver le cadrage UI/UX ;
- conserver le design system ;
- conserver les maquettes validées ;
- conserver la référence UI/UX ALPHA exploitable pour Codex ;
- conserver la clôture documentaire UI/UX.

Ce dossier ne constitue pas une intégration code.

La future intégration UI/UX devra être ouverte dans un dossier de session code séparé, par exemple :

```text
docs/2-sessions/1-ALPHA/BLOC_A21/1-INTEGRATION_UI/SESSION-YYYYMMDD-XX_A21_UI-INT-01/
```
