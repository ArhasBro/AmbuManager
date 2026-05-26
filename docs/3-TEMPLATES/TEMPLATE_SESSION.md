# TEMPLATE_SESSION.md

## Session

- Session : `SESSION-YYYYMMDD-XX`
- Type : `AUDIT | CORRECTION | COMPLÉTION | VALIDATION | CLOTURE | DOCUMENTAIRE | REBASAGE`
- Objectif unique : à renseigner

## Contexte

- Contexte utile : à renseigner
- Sessions précédentes utiles : à renseigner / Sans objet
- Source de contrôle complémentaire : ZIP versionné `AmbuManager-main (x).zip` fourni ensuite par Nathan si applicable

## Règles absolues

- 1 session = 1 objectif clair
- 1 livrable principal
- 1 DoD
- 1 validation
- Ne pas créer de plan parallèle
- Ne pas modifier `PLAN_DE_DEVELOPPEMENT_V2.md` sans autorisation explicite
- Si session documentaire : ne pas modifier le code applicatif
- Ne pas générer de patch par défaut
- Ne pas créer de fichier `.diff` par défaut
- Pas de capture automatique Codex sauf demande explicite
- Économie Codex : lire uniquement les fichiers utiles
- Modifications documentaires directes : uniquement si autorisées
- Maquettes : aucun déplacement sans décision explicite
- Encodage : aucune correction massive sans preuve fichier par fichier
- Séparation des rôles : production Codex / contrôle ChatGPT
- Pour les sessions de production en deux temps : la documentation finale n'est rédigée qu'après autorisation explicite Nathan : `AUTORISÉ : DOCUMENTATION`
- Pour les prompts de contrôle ChatGPT : attendre le retour complet de Codex avant tout contrôle ; tant que le retour Codex, les preuves terminales, les fichiers modifiés/diff attendus ou les confirmations demandées ne sont pas fournis, le contrôle reste en attente
- Toute information non prouvée : `INFORMATION NON FOURNIE — À CONFIRMER`

## Fichiers à lire

- Fichiers obligatoires : à renseigner
- Fichiers complémentaires (si utiles) : à renseigner

## Fichiers autorisés à modifier

- À renseigner explicitement

## Fichiers interdits

- À renseigner explicitement

## Périmètre

- Inclus : à renseigner
- Exclus : à renseigner

## Travail demandé

- Tâches attendues : à renseigner
- Contraintes spécifiques : à renseigner

## Validations à effectuer

- `git status --short`
- Commandes techniques utiles au périmètre : à renseigner
- Si code modifié : validations réelles (ex: lint/build/tests) selon périmètre

## Preuves attendues

- Résumé des actions réalisées
- Liste des fichiers lus
- Liste des fichiers modifiés
- Liste des fichiers créés/supprimés/déplacés
- Sortie complète `git status --short`
- Si modification : sortie `git diff -- <chemins concernés>`

## Règles patch / .diff

- Patch/diff uniquement si explicitement demandé
- Aucun `.diff` créé par défaut dans le repo
- Le `git diff` doit être fourni dans la réponse si modification
- Si des fichiers nouveaux non suivis doivent apparaître dans le diff : `git add -N <fichiers nouveaux>` puis `git diff --find-renames -- docs/3-TEMPLATES` puis `git reset -- <fichiers nouveaux>`

## Format de réponse attendu

1. Résumé de session
2. Fichiers lus
3. Fichiers modifiés
4. Fichiers créés/supprimés/déplacés
5. Résumé des changements
6. Points à confirmer
7. Sortie `git status --short`
8. Sortie `git diff` si modification
9. Vérification des interdictions
10. Prochaine étape recommandée
11. Verdict final

## Verdict final (gabarit)

- `<SESSION> — <INTITULÉ> : OUI / NON`
- `MODIFICATIONS EFFECTUÉES : OUI / NON`
- `MODIFICATIONS LIMITÉES AU PÉRIMÈTRE AUTORISÉ : OUI / NON`
- `CODE APPLICATIF MODIFIÉ : OUI / NON`
- `PLAN OFFICIEL MODIFIÉ : OUI / NON`
- `MAQUETTES MODIFIÉES OU DÉPLACÉES : OUI / NON`
- `PLAN PARALLÈLE CRÉÉ : OUI / NON`
- `FICHIER .diff CRÉÉ : OUI / NON`
- `PASSAGE À LA SESSION SUIVANTE RECOMMANDÉ : OUI / NON / À CONFIRMER`
