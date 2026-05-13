# SESSION-20260424-10_A20_RH-LOT-02

## Ouverture

Projet : Investissement  
Sous-projet : Ambulance Manager

Stage : `1-ALPHA`  
Bloc : `A20 - RH / Utilisateurs avances`  
Type : `CORRECTION+COMPLETION`  
Intitule : Correction et/ou completion du module RH : demandes d'absence, nom/prenom/initiales, gestion des stagiaires, premiers elements d'horaires journaliers selon cadrage valide

## Sources obligatoires relues

- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md` : absent lors du controle

## Base methodologique

La session s'appuie sur l'audit valide `SESSION-20260424-09_A20_RH-01`.

Verdict RH-01 retenu : `incomplet`.

Ecarts RH-01 repris strictement pour RH-LOT-02 :

- creation utilisateur enrichie absente ou incomplete : nom/prenom/initiales/telephone/base/statut/permissions ;
- aucun mecanisme dedie aux stagiaires ;
- aucun champ RH utilisateur pour premiers horaires journaliers ;
- absences deja presentes, mais pas de definition fournie pour un workflow complet de demande avec statut/validation/refus.

## Perimetre exclu

- refonte globale du module utilisateurs ;
- workflow legal complet d'horaires journaliers ;
- workflow complet de demandes d'absence avec statut, validation ou refus ;
- blocs A19, A21 ou cloture A20.
