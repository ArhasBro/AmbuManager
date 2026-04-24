# SESSION

## ID SESSION

SESSION-20260424-09_A20_RH-01

## Date

24/04/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturite : 1-ALPHA  
Bloc : A20  
Type : AUDIT  
Intitule : Audit complet des besoins RH restants : demandes d'absence, creation utilisateur enrichie, stagiaires, horaires journaliers, contraintes metier associees

## Objectif de la session

Auditer l'etat reel des besoins RH restants du bloc A20, sans correction code :

- demandes d'absence ;
- creation utilisateur enrichie ;
- stagiaires ;
- horaires journaliers ;
- contraintes metier associees.

## Perimetre exact traite

Perimetre reellement audite :

- documentation maitre obligatoire : `docs/1-master/DOCUMENT_MAITRE.md`, `docs/1-master/PLAN_DE_DEVELOPPEMENT.md` ;
- cadrage produit utile : `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`, `docs/1-master/RECAP_DISCUSSIONS.md`, `docs/1-master/REGISTRE_DECISIONS.md` ;
- schema Prisma : `prisma/schema.prisma` ;
- module utilisateurs : `app/users/page.tsx`, `app/users/user-creation-client.tsx`, `app/users/user-edit-client.tsx`, `app/users/user-absence-client.tsx`, `app/users/users-client-shared.ts` ;
- routes API users et absences : `app/api/users/route.ts`, `app/api/users/[id]/route.ts`, `app/api/users/[id]/absences/route.ts`, `app/api/users/[id]/absences/[absenceId]/route.ts` ;
- validateurs et services : `lib/validators/user.ts`, `lib/validators/user-absence.ts`, `lib/services/users/user-absence.ts` ;
- mecanismes planning lies aux contraintes RH : `lib/services/planning/user-absence.ts`, `lib/services/planning/assign-shift.ts`, `lib/services/planning/assign-draftshift.ts`, `lib/services/planning/matching.service.ts`, `lib/company-rules/catalog.ts`.

Hors perimetre volontaire :

- correction complete du module RH ;
- validation complete du bloc A20 ;
- cloture du bloc A20 ;
- blocs A19, A21 ou autres.

## Resultat synthetique de session

Decision patch : `NO_PATCH`.

Verdict formel d'audit : `incomplet`.

L'existant couvre une base exploitable pour les indisponibilites / absences utilisateur, avec modele Prisma, API, UI minimale, audit personnel et prise en compte dans certains mecanismes planning. En revanche, la creation utilisateur enrichie attendue par A20 n'est pas couverte : le code observe conserve un champ `name` unique, sans prenom, nom separe, initiales ni telephone utilisateur. Aucun mecanisme de gestion des stagiaires n'a ete observe. Aucun modele RH d'horaires journaliers rattache a l'utilisateur n'a ete observe ; les horaires presents concernent les templates et les shifts de planning. Les contraintes metier associees existent partiellement mais restent incompletes ou a confirmer selon le cadrage exact.

## Dossiers lies

- Session : docs/2-sessions/1-ALPHA/BLOC_A20/SESSION-20260424-09_A20_RH-01
- PATCH   : docs/2-sessions/1-ALPHA/BLOC_A20/SESSION-20260424-09_A20_RH-01/PATCH
