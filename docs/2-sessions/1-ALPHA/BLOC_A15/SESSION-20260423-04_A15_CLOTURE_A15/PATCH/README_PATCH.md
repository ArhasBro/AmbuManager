# README_PATCH

## Session liee

SESSION-20260423-04_A15_CLOTURE_A15

## Type

AUDIT+CORRECTION+COMPLETION+VALIDATION

## Dossier PATCH

`docs/2-sessions/1-ALPHA/BLOC_A15/SESSION-20260423-04_A15_CLOTURE_A15/PATCH`

## Patch principal code

`PATCH__SESSION-20260423-04_A15_CLOTURE_A15.diff`

## Objet

Correctif final minimal A15 :

- remplacement de styles frontend locaux codes en dur par les tokens de theme existants ;
- alignement des panneaux utilisateurs, messages d'etat, badges vehicules/templates et messages planning avec le theme A15 ;
- aucune modification de logique metier, de route API ou de parcours fonctionnel.

## Commandes d'application

```bash
git apply --check "docs/2-sessions/1-ALPHA/BLOC_A15/SESSION-20260423-04_A15_CLOTURE_A15/PATCH/PATCH__SESSION-20260423-04_A15_CLOTURE_A15.diff"
git apply "docs/2-sessions/1-ALPHA/BLOC_A15/SESSION-20260423-04_A15_CLOTURE_A15/PATCH/PATCH__SESSION-20260423-04_A15_CLOTURE_A15.diff"
```

## Statut production

- Patch principal produit.
- `git apply --check` : OK apres correction des en-tetes du fichier patch.
- `git apply` : OK.
- `git apply --check --reverse` : OK apres application.
- `npm.cmd run lint` : OK.
- `npm.cmd run build` : OK hors sandbox apres echec sandbox `spawn EPERM`.
- Aucun ZIP documentaire produit dans cette discussion de production.
