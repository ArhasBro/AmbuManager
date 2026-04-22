# PROTOCOLE_SESSION

Version : V1.6.0  
Date : 20/04/2026

Ce document décrit le protocole standard pour les sessions de travail du projet.

## Structure d'une session

Chaque session doit utiliser une structure documentaire explicite dans `docs/2-sessions/`.

Structure attendue :

`docs/2-sessions/<STAGE>/<BLOC>/<LOT>/SESSION-YYYYMMDD-XX/`

et contenir les fichiers :

- `SESSION.md`
- `NOTES.md`
- `FIN_SESSION.md`
- `EVIDENCES.md`
- `RESULTATS.md`

Les patchs associés à la session doivent être rangés dans :

`docs/3-patches/<STAGE>/<BLOC>/<LOT>/SESSION-YYYYMMDD-XX/`

avec, selon le cas :

- `PATCH__<ID_SESSION>.diff`
- `README_PATCH.md`
- `NO_PATCH.md`

## Rôle des fichiers

### `SESSION.md`
Résumé structuré de la session.

### `NOTES.md`
Notes de travail pendant la session.

### `FIN_SESSION.md`
Résumé final, verdict final, prochaine étape logique, autre.

### `EVIDENCES.md`
Éléments factuels utilisés pendant la session :
extraits de code, extraits documentaires, logs, retours terminaux, captures ou constats observés.

### `RESULTATS.md`
Résultats obtenus et modifications réalisées.

## Règles

Les informations doivent provenir uniquement des documents autorisés, du code réel et, lorsque la session le prévoit, des constats réellement observés.

Si une information manque :

`INFORMATION NON FOURNIE — À CONFIRMER`

## Clôture de bloc

En fin de bloc, une session dédiée de clôture devient obligatoire.

Cette session doit :
- vérifier le code réel du bloc ;
- vérifier les patchs réels du bloc ;
- vérifier la documentation finale du bloc ;
- vérifier les validations terminales du bloc ;
- rendre un verdict explicite de clôture définitive.

Convention attendue :
- dossier dédié de fin de bloc, par exemple `4-CLOTURE_A2` ;
- session nommée `CLOTURE_<BLOC>` dans le plan ;
- verdict final obligatoire :
  - `BLOC <ID> CLÔTURABLE DÉFINITIVEMENT : OUI`
  - `BLOC <ID> CLÔTURABLE DÉFINITIVEMENT : NON`

Aucun passage au bloc suivant n’est autorisé sans ce verdict explicite.
