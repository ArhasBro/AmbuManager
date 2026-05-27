# TEMPLATE_BLOC_SESSIONS_PROMPTS.md

## A) Prompt Codex — Créer les sessions d’un bloc demandé
```text
Tu es expert en documentation technique, gouvernance de sessions et prompts Codex.

Objectif unique : créer les sessions du bloc demandé, sans démarrer leur exécution.

Bloc demandé : <BLOC_DEV-V2-XX>

Documents à lire :
- docs/1-MASTER/PLAN_DE_DEVELOPPEMENT_V2.md (plan actif)
- docs/2-SESSIONS/README_SESSIONS.md
- docs/3-TEMPLATES/TEMPLATE_SESSION.md

Travail demandé :
- Identifier les sessions prévues du bloc demandé.
- Créer uniquement les dossiers/fichiers nécessaires dans docs/2-SESSIONS.
- Rédiger chaque ouverture de session en utilisant TEMPLATE_SESSION.md comme base.
- Préparer les sessions, sans les démarrer.

Interdits stricts :
- Ne pas coder.
- Ne pas modifier les documents MASTER.
- Ne pas modifier d’autres templates.
- Ne pas créer de fichier hors besoin du bloc.
- Ne pas lancer l’exécution des sessions.

Preuves attendues :
- Liste des sessions identifiées.
- Liste des dossiers/fichiers créés.
- Vérification UTF-8 sans BOM.
- Vérification absence de séquences suspectes (mojibake) : `U+00C3`, `U+00C2`, `U+00E2 U+20AC`, `U+FFFD`.
- `npm run docs:encoding` si disponible.
- `git status --short`.
- Diff ciblé docs/2-SESSIONS.

Verdict final obligatoire :
- SESSIONS DU BLOC CRÉÉES ET PRÊTES AU LANCEMENT : OUI / NON
```

## B) Prompt ChatGPT — Générer les prompts de lancement et de contrôle
```text
Tu es expert en contrôle qualité ChatGPT et prompts de session.

Contexte d’entrée :
- Bloc : <BLOC_DEV-V2-XX>
- Sessions créées :
  - <SESSION-YYYYMMDD-XX — intitulé>
  - <SESSION-YYYYMMDD-XX — intitulé>

Travail demandé :
Pour chaque session, génère :
1) Un prompt Codex de lancement (production dans le repo, objectif unique, périmètre fermé, contrôles et preuves obligatoires).
2) Un prompt ChatGPT de contrôle du retour Codex (contrôle uniquement sur preuves fournies, aucune validation implicite).

Contraintes :
- Format court, strict, directement copiable.
- Une commande non montrée = non prouvée.
- Toute information manquante : INFORMATION NON FOURNIE — À CONFIRMER.

Format de sortie :
- Session <id>
- Prompt Codex (bloc texte)
- Prompt ChatGPT (bloc texte)
- Verdict de contrôlabilité : OUI / NON
```
