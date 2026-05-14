# README_PATCH

## Session liée

SESSION-20260513-02_A26_A26-UI-02

## Type

CORRECTION+COMPLÉTION

## Dossier PATCH

`docs/2-SESSIONS/1-ALPHA/BLOC_A26/SESSION-20260513-02_A26_A26-UI-02/PATCH`

## Patch final de référence (source finale à utiliser)

`PATCH__SESSION-20260513-02_A26_A26-UI-02_FINAL_VALIDABLE.diff`

Ce patch FINAL_VALIDABLE représente l'état final validé de la session, incluant :
- réalignement Shell global ;
- fluidité responsive multi-écrans ;
- correction sidebar 1920×1080 (scroll interne maîtrisé).

## Chronologie patchs de session

1. `PATCH__SESSION-20260513-02_A26_A26-UI-02.diff` : patch principal intermédiaire.
2. `PATCH__SESSION-20260513-02_A26_A26-UI-02_FIX-01.diff` : patch correctif intermédiaire (sidebar 1920×1080).
3. `PATCH__SESSION-20260513-02_A26_A26-UI-02_FINAL_VALIDABLE.diff` : patch final consolidé et validé.

## Règle d'usage

- Le patch de référence final est `FINAL_VALIDABLE`.
- Les anciens patchs intermédiaires ne doivent pas être utilisés comme source finale.
- Les patchs intermédiaires ne doivent pas être appliqués en plus du `FINAL_VALIDABLE`.
- Le correctif sidebar est intégré dans l'état final validé.

## Gouvernance `.diff` renforcée

- 1 patch principal par session.
- Si correction après patch principal : `FIX-01`, puis `FIX-02`, etc.
- Chaque patch FIX doit être minimal, ciblé et applicable après le patch précédent.
- Ne jamais remplacer silencieusement un patch déjà transmis avec le même nom sans le documenter.
- Si un patch complet final est nécessaire pour clarifier la session : nommer explicitement `FINAL_VALIDABLE`.

## Commandes d'application (patch final)

```bash
git apply --check "docs/2-SESSIONS/1-ALPHA/BLOC_A26/SESSION-20260513-02_A26_A26-UI-02/PATCH/PATCH__SESSION-20260513-02_A26_A26-UI-02_FINAL_VALIDABLE.diff"
git apply         "docs/2-SESSIONS/1-ALPHA/BLOC_A26/SESSION-20260513-02_A26_A26-UI-02/PATCH/PATCH__SESSION-20260513-02_A26_A26-UI-02_FINAL_VALIDABLE.diff"
```