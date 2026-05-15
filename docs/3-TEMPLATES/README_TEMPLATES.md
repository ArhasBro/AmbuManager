# README_TEMPLATES.md

## Rôle du dossier

Le dossier `docs/3-TEMPLATES/` contient les modèles de session réutilisables pour cadrer les demandes Codex.

Ces templates servent de base de rédaction. Ils doivent toujours être adaptés au contexte réel de la session.

## Templates actifs

- `TEMPLATE_SESSION.md`
- `TEMPLATE_DOD_SESSION.md`
- `TEMPLATE_RECAP_SESSION.md`

## Règles d'usage

- Ne pas utiliser les anciens noms de templates remplacés.
- Adapter le template au type de session (audit, correction, complétion, validation, clôture, documentaire, rebasage).
- Un template n'autorise jamais une action interdite par le prompt de session actif.
- `docs/README_DOCS.md` reste la gouvernance documentaire principale.
- `docs/CMD.md` est personnel Nathan et non officiel.

## Migration templates

| Ancien fichier | Nouveau fichier | Statut | Remarque |
|---|---|---|---|
| `TEMPLATE_DEBUT_SESSION.md` | `TEMPLATE_SESSION.md` | Remplacé | Consolidation du démarrage et des règles globales |
| `TEMPLATE_FIN_SESSION.md` | `TEMPLATE_SESSION.md` | Remplacé | La clôture est intégrée dans le template principal |
| `TEMPLATE_DOD_4_4.md` | `TEMPLATE_DOD_SESSION.md` | Remplacé | DoD généralisée, plus liée à une phase historique |
| `TEMPLATE_RECAP_SESSION.md` | `TEMPLATE_RECAP_SESSION.md` | Conservé / modernisé | Format court aligné règles actuelles |
