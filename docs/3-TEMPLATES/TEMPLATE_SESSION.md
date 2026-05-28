# TEMPLATE_SESSION.md

## Identit? de session
- Session : `SESSION-YYYYMMDD-XX`
- Type : `AUDIT | CORRECTION | CORRECTION_DOCUMENTAIRE | COMPLETION | VALIDATION | CLOTURE | DOCUMENTATION`
- Responsable : `Codex`

## R?le attendu de Codex
- Produire dans le repo, strictement dans le p?rim?tre autoris?.
- Appliquer `1 session = 1 objectif unique`.
- Ne pas s?auto-valider.

## Objectif unique
- Objectif : `<? renseigner, unique et testable>`

## Documents ? lire
- Obligatoires :
  - `<fichier 1>`
  - `<fichier 2>`
- Compl?mentaires (si n?cessaires) :
  - `<fichier n>`

## P?rim?tre autoris?
- Fichiers autoris?s ? modifier :
  - `<liste explicite>`
- Limites :
  - `<ce qui est inclus>`
  - `<ce qui est exclu>`

## Interdits stricts
- Modifier un fichier hors p?rim?tre autoris?.
- Changer l?objectif de session.
- Lancer une refonte globale.
- Valider sans preuves.
- Modifier les documents MASTER sauf autorisation explicite.
- Modifier le code si la session est documentaire.
- Cr?er un fichier non demand?.
- Proposer une am?lioration hors p?rim?tre ailleurs que dans `Points ? confirmer`.
- Omettre une information manquante : ?crire `INFORMATION NON FOURNIE ? ? CONFIRMER`.

## Travail demand?
- T?ches :
  - `<t?che 1>`
  - `<t?che 2>`
- Contraintes sp?cifiques :
  - `<contrainte 1>`

## Contr?les ? ex?cuter
- `git status --short`
- Contr?les techniques selon le p?rim?tre : `<commande(s)>` (exemples : `npm run lint`, `npm run build`, `npx prisma validate` si Prisma concern?, `npx prisma generate` si Prisma concern?)
- Contr?le de diff :
  - Session documentaire : non obligatoire.
  - Session code : `git diff -- <chemins concernes>` + patch `.diff` dans `PATCH/` + `git apply --check <chemin_du_patch>`.
- Contr?le encodage docs : `npm run docs:encoding` si disponible

## Preuves attendues
- Liste des fichiers lus.
- Liste des fichiers modifi?s/cr??s/supprim?s.
- R?sultat des commandes ex?cut?es.
- Extrait de diff des fichiers concern?s (session code uniquement).
- Signalement explicite des informations non fournies.

## Format de r?ponse obligatoire
1. R?sum? court
2. Fichiers lus
3. Fichiers modifi?s
4. Fichiers cr??s
5. Fichiers non modifi?s
6. Changements r?alis?s
7. Contr?les ex?cut?s avec r?sultats
8. S?quences suspectes restantes (mojibake) avec fichier/ligne
9. `git status --short`
10. Points ? confirmer
11. Conclusion

## Conclusion attendue
- `Travail termin? c?t? Codex, en attente de contr?le ChatGPT / validation humaine.`

## R?gles officielles Codex / ChatGPT contr?le

## R?gle de continuit? documentaire du bloc

- Avant d'agir, relire les sessions pr?c?dentes utiles du m?me bloc quand c'est n?cessaire.
- Objectif : comprendre ce qui est d?j? fait, les d?cisions prises, les garde-fous valid?s, les limites pos?es, les ?carts identifi?s et les validations obtenues.
- Relecture obligatoire si la session d?pend d'un cadrage, d'une d?cision, d'un garde-fou ou d'un r?sultat ant?rieur.
- Relecture cibl?e : ne pas relire tout le repo, ne pas refaire un audit complet, ne pas refaire un cadrage valid?, ne pas contredire une session valid?e sans preuve, signaler toute contradiction avant modification.
- ChatGPT contr?le : si aucun retour brut Codex n?est fourni, r?pondre uniquement : `EN ATTENTE DU RETOUR CODEX ? CONTR?LE NON D?MARR?`.
- Cr?ation de session : utiliser `create_session.ps1` et v?rifier la pr?sence de `SESSION.md`, `NOTES.md`, `EVIDENCES.md`, `RESULTATS.md`, `FIN_SESSION.md`, `PATCH/`.
- Retour Codex : ne pas recopier int?gralement les `.md` ou `.diff` ; fournir un r?sum? court et des preuves command?es.
- Session documentaire : pas de `.diff` obligatoire.
- Session code : `.diff` obligatoire dans `PATCH/` + preuve `git apply --check <chemin_du_patch>`.
- Validation : Codex ne s?auto-valide jamais.

