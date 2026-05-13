# SESSION

## ID SESSION

SESSION-20260425-11_A22_UIINT-02

## Date

25/04/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturite : 1-ALPHA  
Bloc : A22  
Type : CORRECTION+COMPLETION  
Intitule : Navigation complete permissions - entrees de navigation, etats actifs et affichage selon permissions

## Objectif de la session

Corriger et completer la navigation de l'application connectee apres A22-UIINT-01, sans refaire le shell structurel.

## Documents relus

- docs/1-master/DOCUMENT_MAITRE.md
- docs/1-master/PLAN_DE_DEVELOPPEMENT.md
- docs/3-templates/TEMPLATE_DEBUT_SESSION.md
- docs/2-sessions/1-ALPHA/BLOC_A21/SESSION-20260425-06_A21_UX-06/REFERENCE_UI_UX_ALPHA_V1.0.md
- docs/2-sessions/1-ALPHA/BLOC_A21/SESSION-20260425-07_A21_UX-07/A21-UX-07_CLOTURE_DOCUMENTAIRE_UI_UX.md
- docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-10_A22_UIINT-01/SESSION.md
- docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-10_A22_UIINT-01/RESULTATS.md
- docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-10_A22_UIINT-01/FIN_SESSION.md
- docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-10_A22_UIINT-01/PATCH/README_PATCH.md

## Perimetre exact traite

Perimetre code traite uniquement pour A22-UIINT-02 :
- `app/layout.tsx`
- `app/app-shell.tsx`

Perimetre documentaire traite :
- `SESSION.md`
- `NOTES.md`
- `EVIDENCES.md`
- `RESULTATS.md`
- `FIN_SESSION.md`
- `PATCH/README_PATCH.md`

Patch principal produit :
- `PATCH/SESSION-20260425-11_A22_UIINT-02.diff`

## Resultat synthetique de session

- Navigation sidebar alignee sur les routes reelles connectees (`/dashboard`, `/planning`, `/users`, `/vehicles`, `/templates`, `/company`, `/depots`, `/onboarding`, `/audit`).
- Suppression d'un cas de lien potentiellement mort : affichage `Audit` conditionne a `companyId` ou profil `SUPPORT` global, sans ouvrir les autres liens societes sans `companyId`.
- Etats actifs rendus plus robustes (selection du prefixe le plus specifique) + `aria-current` sur l'entree active.
- Pages `/login` et `/privacy` conservees hors shell (non regression).

## Exclusions respectees

- Aucune creation de route metier.
- Aucune modification Prisma/migrations.
- Aucune modification RBAC/permissions catalogue.
- Aucune refonte visuelle globale.
- Aucune refonte du shell structurel.

## Dossiers lies

- Session : docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-11_A22_UIINT-02
- PATCH   : docs/2-sessions/1-ALPHA/BLOC_A22/SESSION-20260425-11_A22_UIINT-02/PATCH
