# NOTES

## Methode / observations

- Session traitee en `patch-first` sur copie de travail temporaire, puis application par `git apply`.
- Aucun backend supplementaire n'a ete ajoute : la correction est restee sur `planning-client.tsx`, en reutilisant l'API d'affectation existante.
- Choix de mise en oeuvre minimal pour la vue binome : implementation retenue = filtre des shifts communs entre un utilisateur cible et un binome selectionne.
- Clarification post-controle qualite : cette implementation ne documente pas une vue binome metier enrichie ; elle couvre uniquement le filtre commun prouve dans le patch.
- La selection multiple est limitee a la vue hebdomadaire avancee legacy / autoschedule, qui etait deja la zone d'affectation unitaire prouvee.
- `docs/CMD.md` etait deja modifie hors scope dans le worktree et n'a pas ete altere par cette session.

## Correctifs minimaux

- `FIX-01` : suppression d'une balise JSX fermante en trop dans la zone de commandes du planning avance.
- `FIX-02` : echappement de deux apostrophes JSX pour satisfaire `react/no-unescaped-entities`.
