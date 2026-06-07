# Export Base44 — Prototype Ambulance Manager

## Rôle

Ce dossier contient les fichiers utiles du prototype Base44 pour audit comparatif.

Il sert à lire le prototype, pas à l’exécuter comme application officielle.

## Contenu inclus

- `src/` : pages, composants, hooks, API client et logique frontend du prototype.
- `base44/entities/` : entités Base44 du prototype.
- `base44/functions/` : fonctions Base44 exportées.
- fichiers de configuration utiles à la compréhension du prototype : `package.json`, `vite.config.js`, `tailwind.config.js`, `components.json`, etc.

## Contenu exclu volontairement

- `base44/.app.jsonc` : identifiant d’application Base44, non nécessaire à la comparaison.
- `package-lock.json` : lockfile non nécessaire pour la référence documentaire.
- `.gitignore` : règles Git du prototype non nécessaires.
- `node_modules/`, `dist/`, `build/`, `.env*` : absents du ZIP fourni.

## Règles

- Ne pas copier directement le code Base44 dans le repo officiel.
- Toute reprise doit passer par un audit comparatif, un arbitrage documentaire, puis une session Codex dédiée.
- En cas de conflit, le repo officiel et les documents MASTER actifs priment.
