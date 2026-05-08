# EVIDENCES - SESSION-20260506-05_A24_A24-UI-05

## 1) Validation patch principal (applicabilite)

Commande exacte :

```bash
git apply --check "C:\Users\arche\ambulance-manager\docs\2-sessions\1-ALPHA\BLOC_A24\SESSION-20260506-05_A24_A24-UI-05\PATCH\PATCH__SESSION-20260506-05_A24_A24-UI-05.diff"
```

Contexte d'execution : worktree propre temporaire `C:\Users\arche\ambulance-manager\.codex-temp\apply-check-A24UI05`.

Extrait terminal reel :

```txt
HEAD is now at 39d36fe update
APPLY_CHECK_EXIT=0
```

Resultat : patch applicable.
Code retour : 0.

## 2) Lint

Commande exacte :

```bash
npm run lint
```

Extrait terminal reel (premiere execution, echec) :

```txt
app\templates\templates-client.tsx
  854:77  error  'Filter' is not defined  react/jsx-no-undef
```

Resultat : KO initial, correction appliquee (import `Filter`).
Code retour : 1.

Extrait terminal reel (seconde execution) :

```txt
> ambulance-manager@0.1.0 lint
> eslint .
```

Resultat : OK.
Code retour : 0.

## 3) Build

Commande exacte :

```bash
npm run build
```

Extrait terminal reel (premiere execution, echec) :

```txt
Type error: Cannot find name 'Filter'. Did you mean 'File'?
./app/templates/templates-client.tsx:854:77
```

Resultat : KO initial, corrige avec import manquant.
Code retour : 1.

Extrait terminal reel (seconde execution) :

```txt
Creating an optimized production build ...
Compiled successfully
Running TypeScript ...
Generating static pages ...
```

Resultat : OK.
Code retour : 0.

## 4) Encodage et integrite du patch

Commande exacte :

```bash
# lecture binaire du patch principal
```

Extrait terminal reel :

```txt
FIRST_BYTES=64 69 66 66 20 2D 2D 67 69 74 20 61 2F 61 70 70
FIRST_LINE=diff --git a/app/a24-vehicles-templates.css b/app/a24-vehicles-templates.css
ENCODING_CHECK=UTF-8/ASCII without BOM (heuristic)
HAS_NUL=False
```

Resultat :
- premiere ligne valide `diff --git ...`
- pas de BOM UTF-8
- aucun caractere nul
- pas d'UTF-16 detecte

## 5) Prisma

Non touche.
Commandes Prisma non requises pour cette session.

## 6) Captures visuelles

Captures avant/apres pour cette execution : INFORMATION NON FOURNIE - A CONFIRMER.

## 7) Relance finale apres ajustement des titres pages

Commande exacte :

```bash
npm run lint
npm run build
```

Extrait terminal reel :

```txt
> ambulance-manager@0.1.0 lint
> eslint .

> ambulance-manager@0.1.0 build
> next build
Compiled successfully
Running TypeScript ...
Generating static pages ... (29/29)
```

Resultat : OK.
Codes retour : 0 et 0.
