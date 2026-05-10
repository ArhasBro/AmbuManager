# SESSION

## ID SESSION

SESSION-20260510-08_A25_A25-PLAN-UI-08

## Date

10/05/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A25  
Type : CORRECTION+COMPLÉTION  
Intitulé : Matrice salariés × semaines, cellules et badges

## Objectif de la session

Reproduire la zone centrale violette du Planning : matrice salariés × semaines, cellules, avatars, statuts et badges, sans hardcoder de données de maquette.

## Périmètre exact traité

- Construction de la matrice sur `app/planning/planning-client.tsx` avec colonnes sélection/salarié/rôle/base/statut/semaines.
- Affichage ligne salarié avec avatar initiales + nom + téléphone (`Téléphone non renseigné` si absent).
- Lecture rôle/base/statut depuis données utilisateur réellement chargées.
- Cellules semaine limitées à 1 shift principal + annotation week-end (`Samedi`/`Dimanche`) + `+N autres` si applicable.
- Ajustements CSS ciblés dans `app/globals.css`.

## Résultat synthétique de session

- Patch principal produit : `PATCH__SESSION-20260510-08_A25_A25-PLAN-UI-08.diff`.
- Correctif QA produit : `PATCH__SESSION-20260510-08_A25_A25-PLAN-UI-08_FIX-01.diff`.
- Vérifications terminales réelles exécutées : `git apply --check` (patch principal en worktree propre + patch FIX-01 sur base patch principal), `npm run lint`, `npm run build`.
- Résultat : conforme aux contraintes de session, sans modification API/Prisma/RBAC/autoschedule/matching.

## Dossiers liés

- Session : `docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-08_A25_A25-PLAN-UI-08`
- PATCH : `docs/2-sessions/1-ALPHA/BLOC_A25/SESSION-20260510-08_A25_A25-PLAN-UI-08/PATCH`