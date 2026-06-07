# Templates Ambulance Manager

## Sommaire

1. [Rôle du dossier](#1-rôle-du-dossier)
2. [Règle générale](#2-règle-générale)
3. [Templates actifs](#3-templates-actifs)
4. [Templates supprimés / remplacés](#4-templates-supprimés--remplacés)
5. [Règles de rédaction des prompts](#5-règles-de-rédaction-des-prompts)
6. [Références liées](#6-références-liées)

## 1. Rôle du dossier

`docs/3-TEMPLATES/` contient uniquement des templates de prompts et exemples de prompts.

## 2. Règle générale

Un template sert à préparer une demande Codex ou un contrôle ChatGPT. Il ne remplace pas les documents MASTER, les sessions ou les preuves.

## 3. Templates actifs

- `TEMPLATE_SESSION_CODEX.md` : lancer une session Codex.
- `TEMPLATE_CONTROLE_CHATGPT.md` : contrôler un retour brut Codex.
- `TEMPLATE_CREATION_BLOC_SESSIONS.md` : produire les prompts d'un bloc de sessions, sans exécuter le bloc.
- `TEMPLATE_RELANCE_CODEX.md` : relancer Codex après retour incomplet, non prouvé ou hors périmètre.

## 4. Templates supprimés / remplacés

Les anciens fichiers suivants sont retirés du modèle actif :

- `TEMPLATE_SESSION.md`
- `TEMPLATE_DOD_SESSION.md`
- `TEMPLATE_RECAP_SESSION.md`
- `TEMPLATE_BLOC_SESSIONS_PROMPTS.md`

## 5. Règles de rédaction des prompts

- Prompt court.
- Périmètre fermé.
- Livrable unique.
- Preuves obligatoires.
- Verdict explicite.
- Aucune validation implicite.
- Fichiers du prompt courant prioritaires.
- Sortie structurée obligatoire.

## 6. Références liées

- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/2-SESSIONS/README_SESSIONS.md`
