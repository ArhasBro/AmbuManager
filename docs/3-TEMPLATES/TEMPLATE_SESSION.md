# TEMPLATE_SESSION.md

## Identité de session
- Session : `SESSION-YYYYMMDD-XX`
- Type : `AUDIT | CORRECTION | COMPLÉTION | VALIDATION | CLOTURE | DOCUMENTATION`
- Responsable : `Codex`

## Rôle attendu de Codex
- Produire dans le repo, strictement dans le périmètre autorisé.
- Appliquer `1 session = 1 objectif unique`.
- Ne jamais conclure par validation implicite.

## Objectif unique
- Objectif : `<à renseigner, unique et testable>`

## Documents à lire
- Obligatoires :
  - `<fichier 1>`
  - `<fichier 2>`
- Complémentaires (si nécessaires) :
  - `<fichier n>`

## Périmètre autorisé
- Fichiers autorisés à modifier :
  - `<liste explicite>`
- Limites :
  - `<ce qui est inclus>`
  - `<ce qui est exclu>`

## Interdits stricts
- Modifier un fichier hors périmètre autorisé.
- Changer l’objectif de session.
- Lancer une refonte globale.
- Valider sans preuves.
- Modifier les documents MASTER sauf autorisation explicite.
- Modifier le code si la session est documentaire.
- Créer un fichier non demandé.
- Proposer une amélioration hors périmètre ailleurs que dans `Points à confirmer`.
- Omettre une information manquante : écrire `INFORMATION NON FOURNIE — À CONFIRMER`.

## Travail demandé
- Tâches :
  - `<tâche 1>`
  - `<tâche 2>`
- Contraintes spécifiques :
  - `<contrainte 1>`

## Contrôles à exécuter
- `git status --short`
- Contrôles techniques selon le périmètre : `<commande(s)>` (exemples : `npm run lint`, `npm run build`, `npx prisma validate` si Prisma concerné, `npx prisma generate` si Prisma concerné)
- Contrôle de diff : `git diff -- <chemins concernés>`
- Contrôle encodage docs : `npm run docs:encoding` si disponible

## Preuves attendues
- Liste des fichiers lus.
- Liste des fichiers modifiés/créés/supprimés.
- Résultat des commandes exécutées.
- Extrait de diff des fichiers concernés.
- Signalement explicite des informations non fournies.

## Format de réponse obligatoire
1. Résumé court
2. Fichiers lus
3. Fichiers modifiés
4. Fichiers créés
5. Fichiers non modifiés
6. Changements réalisés
7. Contrôles exécutés avec résultats
8. Séquences suspectes restantes (mojibake) avec fichier/ligne
9. `git status --short`
10. Points à confirmer
11. Verdict final

## Verdict final obligatoire
- `OBJECTIF UNIQUE ATTEINT : OUI / NON`
- `PÉRIMÈTRE RESPECTÉ : OUI / NON`
- `PREUVES FOURNIES ET VÉRIFIABLES : OUI / NON`
- `VALIDATION EXPLICITE (AUCUNE IMPLICITE) : OUI / NON`