# SESSION

## ID SESSION

SESSION-20260506-04_A24_A24-UI-04

## Date

06/05/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturite : 1-ALPHA  
Bloc : A24 — Realignement UI/UX global sur MAQUETTE  
Type : CORRECTION+COMPLETION  
Intitule : A24-UI-04 — Societe et Depots

## Objectif de la session

Realigner visuellement les pages `/company` et `/depots` sur la reference `docs/1-master/MAQUETTE/`, sans ajout de fonctionnalite metier hors perimetre.

## Perimetre exact traite

- page Societe (`app/company/page.tsx`) ;
- composants/formulaires Societe (`app/company/company-profile-form.tsx`, `app/company/company-rules-panel.tsx`) ;
- page Depots (`app/depots/page.tsx`) ;
- composant client Depots (`app/depots/depots-client.tsx`) ;
- harmonisation CSS ciblee (`app/globals.css`, blocs `company-*` et `depots-*`) ;
- captures avant/apres `/company` et `/depots` en mode clair et mode sombre.

## Perimetre explicitement exclu

- Prisma schema/migrations ;
- API/services metier ;
- pages hors Societe + Depots ;
- refonte AppShell globale.

## Resultat synthetique de session

Patch code cible produit sur Societe + Depots, valide par lint/build, avec captures AVANT/APRES (clair/sombre), documentation de preuves et ZIP documentaire final.

## Dossiers lies

- Session : `docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-04_A24_A24-UI-04`
- PATCH   : `docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-04_A24_A24-UI-04/PATCH`
