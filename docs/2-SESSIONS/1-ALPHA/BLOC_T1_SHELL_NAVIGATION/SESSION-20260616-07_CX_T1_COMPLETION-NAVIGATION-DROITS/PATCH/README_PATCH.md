# README_PATCH

## Session liee

SESSION-20260616-07_CX_T1_COMPLETION-NAVIGATION-DROITS

## Type

CX+COMPLETION

## Patch officiel

`PATCH__SESSION-20260616-07_CX_T1_COMPLETION-NAVIGATION-DROITS.diff`

## Fichier applicatif concerne

- `app/layout.tsx`

## Objet

Completion minimale de la navigation visible selon les droits existants :

- integration de `canAccessAdminDashboard`;
- integration de `canAccessTerrainDashboard`;
- suppression de l'ajout inconditionnel du lien `Tableau de bord`;
- affichage du dashboard uniquement si un droit dashboard dedie existe ou si au moins un module visible est autorise.

## Commandes d'application

```bash
git apply --check "docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-07_CX_T1_COMPLETION-NAVIGATION-DROITS/PATCH/PATCH__SESSION-20260616-07_CX_T1_COMPLETION-NAVIGATION-DROITS.diff"
git apply         "docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-07_CX_T1_COMPLETION-NAVIGATION-DROITS/PATCH/PATCH__SESSION-20260616-07_CX_T1_COMPLETION-NAVIGATION-DROITS.diff"
```

## Controle realise

`git apply --reverse --check` execute avec succes sur l'etat applique.
