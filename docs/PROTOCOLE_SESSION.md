# PROTOCOLE_SESSION

Version : V1.5.8 
Date : 19/03/2026
Ce document décrit le protocole standard pour les sessions de travail du projet.

## Structure d'une session

Chaque session doit utiliser la structure suivante :

docs/sessions/SESSION-YYYYMMDD-XX/

et contenir les fichiers :

SESSION.md  
NOTES.md  
FIN_SESSION.md
EVIDENCES.md  
RESULTATS.md  

## Rôle des fichiers

SESSION.md  
Résumé structuré de la session.

NOTES.md  
Notes de travail pendant la session.

FIN_SESSION.md
Résumé final, Verdict final, Prochaine étape logique, autre.

EVIDENCES.md  
Éléments factuels utilisés pendant la session :
extraits de code, extraits documentaires, logs, etc.

RESULTATS.md  
Résultats obtenus et modifications réalisées.

## Règles

Les informations doivent provenir uniquement des documents autorisés.

Si une information manque :

INFORMATION NON FOURNIE — À CONFIRMER

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
