# SESSION

## ID SESSION

SESSION-20260322-03_A4_VEH-03

## Date

22/03/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A4  
Type : CORRECTION  
Intitulé : Correction / stabilisation du listing véhicules si nécessaire

## Objectif de la session

Corriger uniquement le résiduel prouvé par `VEH-02` sur le listing véhicules, sans ouvrir les autres sujets du module flotte : homogénéiser le contrat réel API/UI du listing là où c’est utile, réaligner le tri, préciser le contrôle d’accès réel côté page `/vehicles`, et stabiliser le rendu minimal de la liste.

## Périmètre exact traité

- `app/vehicles/page.tsx`
- `app/vehicles/vehicles-client.tsx`
- `app/api/vehicles/route.ts` (lecture / borne de contrat uniquement)
- `lib/permissions.ts` (lecture / borne du contrôle d’accès)
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/2-sessions/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-02_A4_VEH-02/*`
- `docs/4-templates/*`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`

## Résultat synthétique de session

Le résiduel `VEH-02` a été corrigé de manière minimale et traçable, sans refonte du module véhicules.

Corrections réellement appliquées :
- la page `/vehicles` réutilise désormais le même tri que l’API de listing (`immatriculation asc`) ;
- la page SSR expose désormais la même shape utile que l’API pour le listing initial, avec `updatedAt` sérialisé comme `createdAt` ;
- le contrôle d’accès côté page passe désormais aussi `platformRole` à `canManageVehicles(...)`, comme l’API ;
- le rendu client trie désormais la liste affichée par immatriculation, ce qui évite qu’une création casse l’ordre visible.

Aucun élargissement n’a été fait vers création métier, édition, archivage, suppression fond métier, rattachement base hors impact collatéral déjà présent.

## Validations finales retenues

```bash
git apply --check ".\\docs\\3-patches\\1-ALPHA\\BLOC_A4\\1-VEH\\SESSION-20260322-03_A4_VEH-03\\PATCH__SESSION-20260322-03_A4_VEH-03.diff"
git apply ".\\docs\\3-patches\\1-ALPHA\\BLOC_A4\\1-VEH\\SESSION-20260322-03_A4_VEH-03\\PATCH__SESSION-20260322-03_A4_VEH-03.diff"
npm run lint
npm run build
```

Résultats réels à consigner :
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK

## Dossiers liés

- Session : `docs/2-sessions/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-03_A4_VEH-03`
- Patchs  : `docs/3-patches/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-03_A4_VEH-03`
