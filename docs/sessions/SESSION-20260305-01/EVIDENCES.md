# EVIDENCES

Éléments factuels utilisés pendant la session.

---

## Patches

- Patch principal (artefact rejouable) :
  - Chemin : `docs/patches/4.6/SESSION-20260305-01__4.6__planning-quality-score-v3.diff`
  - Statut : PRÊT 

## Vérifications techniques

- Commandes exécutées :
  - `npm run build` : OK (build validé)

## Preuves Git (session)

- Commits associés à `SESSION-20260305-01` :
  - `69e7a6d` — SESSION-20260305-01 - 4.6 - planning quality score + explanations
  - `3b4b648` — SESSION-20260305-01 - 4.6 - match preview returns quality
  - `996ed20` — SESSION-20260305-01 - 4.6 - fix planning-client types + build

## Preuves de rejouabilité du patch

- Reverse-check sur HEAD :
  - `git apply -p1 --reverse --check docs/patches/4.6/SESSION-20260305-01__4.6__planning-quality-score-v3.diff` : OK
- Check + application sur base via worktree :
  - `git worktree add <temp> 69e7a6d^`
  - `git apply -p1 --check <patch>` : OK
  - `git apply -p1 <patch>` : OK