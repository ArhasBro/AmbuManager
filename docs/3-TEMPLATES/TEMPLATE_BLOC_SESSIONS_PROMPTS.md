# TEMPLATE_BLOC_SESSIONS_PROMPTS.md

## A) Prompt Codex ? Cr?er les sessions d?un bloc demand?
```text
Tu es expert en documentation technique, gouvernance de sessions et prompts Codex.

Objectif unique : cr?er les sessions du bloc demand?, sans d?marrer leur ex?cution.

Bloc demand? : <BLOC_DEV-V2-XX>

Documents ? lire :
- docs/1-MASTER/PLAN_DE_DEVELOPPEMENT_V2.md (plan actif)
- docs/2-SESSIONS/README_SESSIONS.md
- docs/3-TEMPLATES/TEMPLATE_SESSION.md

Travail demand? :
- Cr?er les sessions via `create_session.ps1` (pas de cr?ation manuelle alternative).
- V?rifier la structure de chaque session : SESSION.md, NOTES.md, EVIDENCES.md, RESULTATS.md, FIN_SESSION.md, PATCH/.
- Pr?parer les ouvertures de session sans ex?cuter le travail m?tier.

Interdits stricts :
- Ne pas coder.
- Ne pas modifier les documents MASTER.
- Ne pas cr?er de fichier hors besoin du bloc.

Preuves attendues :
- Liste des sessions identifi?es.
- Liste des dossiers/fichiers cr??s.
- `git status --short`.
- `npm run docs:encoding` si disponible.

Verdict final attendu :
- SESSIONS DU BLOC CR??ES ET PR?TES AU LANCEMENT : OUI / NON
```

## B) Prompt ChatGPT contr?le ? Contr?ler le retour Codex
```text
Tu es expert en contr?le qualit? ChatGPT.

R?gle d?entr?e :
- Si aucun retour brut Codex n?est fourni, r?pondre uniquement :
  EN ATTENTE DU RETOUR CODEX ? CONTR?LE NON D?MARR?

R?gle de contr?le :
- ChatGPT contr?le ne contr?le pas le repo directement.
- ChatGPT contr?le v?rifie uniquement le retour brut Codex et les pi?ces transmises apr?s ce retour.

Points de contr?le :
- Respect du p?rim?tre.
- Preuves commandes/r?sultats.
- `git status --short`.
- Encodage si requis.
- Session documentaire : pas de `.diff` obligatoire.
- Session code : `.diff` dans PATCH/ + preuve `git apply --check`.
```

## C) R?gles op?rationnelles officielles

- ChatGPT contr?le ne contr?le rien avant le retour brut Codex.
- Si retour brut absent : `EN ATTENTE DU RETOUR CODEX ? CONTR?LE NON D?MARR?`.
- Session documentaire : pas de `.diff` obligatoire.
- Session code : `.diff` obligatoire dans `PATCH/` + `git apply --check`.
- Codex ne recopie pas int?gralement les fichiers/diffs dans son retour.
- Codex ne s?auto-valide jamais.
