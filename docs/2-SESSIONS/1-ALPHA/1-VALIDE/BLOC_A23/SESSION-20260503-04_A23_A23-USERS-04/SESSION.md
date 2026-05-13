# SESSION

## ID SESSION

SESSION-20260503-04_A23_A23-USERS-04

## Date

03/05/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturite : 1-ALPHA  
Bloc : A23  
Type : VALIDATION  
Intitule : Retest cible utilisateurs + absences / indisponibilites

## Objectif de la session

Rendre un verdict factuel sur l'etat reel du module users ADMIN et des absences/indisponibilites apres la session corrective `A23-USERS-03`, sans correction applicative supplementaire.

## Perimetre exact traite

- Validation API et donnees du module users ADMIN :
  - auth ADMIN necessaire au test ;
  - liste users active ;
  - creation valide / invalide ;
  - detail ;
  - edition ;
  - role principal ;
  - rattachement depot ;
  - archivage logique ;
  - verification absence de suppression physique.
- Validation API et donnees du module absences/indisponibilites :
  - presence routes + modele ;
  - liste ;
  - creation valide ;
  - creation invalide ;
  - conflit de chevauchement ;
  - edition ;
  - rattachement user actif ;
  - cloisonnement `companyId`.
- Verification disponibilite user actif pour module dependant :
  - affectation planning (`/api/planning/shifts/{id}/assign`).
- Commandes terminales obligatoires de validation.

## Resultat synthetique de session

- Les corrections majeures de `A23-USERS-03` sont confirmees cote API users/absences.
- Le flux users API est exploitable (liste, creation, edition, role, depot, archivage).
- Le flux absences API est exploitable (liste, creation, validation, overlap, edition) avec cloisonnement tenant confirme.
- Point de reserve : acces `/users` non confirme en session HTTP scriptable (redirection 307 vers login), a confirmer en test navigateur manuel.
- Decision session : `NO_PATCH` (validation pure, pas de correction appliquee).

## Dossiers lies

- Session : docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-04_A23_A23-USERS-04
- PATCH   : docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-04_A23_A23-USERS-04/PATCH
