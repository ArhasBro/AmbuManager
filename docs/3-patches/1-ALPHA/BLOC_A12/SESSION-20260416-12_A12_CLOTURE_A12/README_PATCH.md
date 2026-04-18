# README_PATCH

## Référence
- Session : `SESSION-20260416-12_A12_CLOTURE_A12`
- Bloc : `A12 — Exports / onboarding / imports`
- Stage : `1-ALPHA`
- Type : `VALIDATION+CORRECTION+COMPLÉTION`

## Décision patch
`NO_PATCH`

## Motif
La présente session est une vraie clôture de bloc.

Après revérification :
- du cadrage produit réel A12 ;
- des sessions `A12-01`, `A12-LOT-02-15`, `A12-16` ;
- des patchs réels `PATCH__SESSION-20260416-10_A12_A12-LOT-02-15.diff`, `FIX-01`, `FIX-02` ;
- du code réel du dépôt sur l’onboarding, l’import, l’export, l’impression et la permission `PLANNING_EXPORT` ;

aucun résiduel code A12 strictement prouvé ne justifie un correctif final minimal unique.

## Périmètre réellement confirmé
- onboarding manuel guidé sans import obligatoire ;
- import initial simple ALPHA pour `depots`, `users`, `vehicles`, `templates`, `user-absences` ;
- formats `CSV` et `XLSX` ;
- aperçu avant import ;
- validation manuelle d’import ;
- rapport d’erreurs ;
- logique `add-only` ;
- exports planning `PDF`, `XLSX`, `CSV` ;
- impression simple depuis l’UI ;
- permission `PLANNING_EXPORT` réellement branchée ;
- point `15.4` non bloquant en ALPHA faute de conservation serveur mise en place.

## Validations réellement exécutées dans cette clôture
- `npm run lint` : `KO` — `sh: 1: eslint: not found`
- `npm run build` : `KO` — `sh: 1: next: not found`

## Dernières validations positives retenues comme preuves du bloc
Depuis `A12-LOT-02-15` :
- `git apply --check` : `OK`
- `git apply` : `OK`
- `npm run lint` : `OK`
- `npm run build` : `OK`

## État final retenu
- `SESSION CLOTURE_A12 TERMINÉE : OUI`
- `ONBOARDING MANUEL COMPLET GARANTI : OUI`
- `IMPORTS INITIAUX SIMPLES RÉELLEMENT EXPLOITABLES : OUI`
- `EXPORTS ALPHA RÉELLEMENT DISPONIBLES : OUI`
- `IMPRESSION SIMPLE RÉELLE : OUI`
- `PERMISSION PLANNING_EXPORT RÉELLEMENT BRANCHÉE : OUI`
- `POLITIQUE DE CONSERVATION DES EXPORTS TRAITÉE OU NON-BLOQUANTE EN ALPHA : OUI`
- `SOCIÉTÉ PILOTE RÉELLEMENT INSTALLABLE : OUI`
- `BLOC A12 CLÔTURABLE DÉFINITIVEMENT : OUI`
- `PASSAGE AU BLOC SUIVANT AUTORISÉ : OUI`

## Livrable documentaire
ZIP final à plat :
- `SESSION.md`
- `NOTES.md`
- `EVIDENCES.md`
- `RESULTATS.md`
- `FIN_SESSION.md`
- `README_PATCH.md`
- `NO_PATCH.md`
