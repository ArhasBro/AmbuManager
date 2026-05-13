# SESSION-20260506-05_A24_A24-UI-05

Stage : 1-ALPHA
Bloc : A24 - Realignement UI/UX global sur MAQUETTE
Type : CORRECTION+COMPLETION
Intitule : A24-UI-05 - Vehicules et Templates

## Objectif unique

Realigner visuellement les pages Vehicules et Templates sur les references UI/UX A24, sans refonte metier.

## Sources lues

- docs/1-master/DOCUMENT_MAITRE.md
- docs/1-master/PLAN_DE_DEVELOPPEMENT.md
- docs/3-templates/TEMPLATE_DEBUT_SESSION.md
- docs/1-master/REFERENCE_UI_UX_A24.md
- docs/1-master/MAQUETTE/README_MAQUETTES_A24.md
- docs/1-master/MAQUETTE/SPEC_UI_UX_MAQUETTES_AMBULANCE_MANAGER.md (sections Vehicules/Templates)
- docs/1-master/MAQUETTE/MAQUETTE_DA/.../4-Vehicules/Vehicules_V1.2.png
- docs/1-master/MAQUETTE/MAQUETTE_DA/.../1-Templates/Templates_V1.1.png

## Perimetre traite

- pages Vehicules (`/vehicles`)
- pages Templates (`/templates`)
- tableaux
- filtres
- badges
- formulaires
- details
- etats visuels
- actions principales et secondaires

## Livrable code

- patch principal unique : PATCH/PATCH__SESSION-20260506-05_A24_A24-UI-05.diff
- correctif : aucun

## Fichiers code modifies

- app/a24-vehicles-templates.css
- app/vehicles/page.tsx
- app/vehicles/vehicles-client.tsx
- app/templates/page.tsx
- app/templates/templates-client.tsx