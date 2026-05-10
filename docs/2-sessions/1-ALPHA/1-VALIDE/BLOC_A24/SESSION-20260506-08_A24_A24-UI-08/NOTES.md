# NOTES

## Methode

1. Lecture obligatoire : `DOCUMENT_MAITRE.md`, `PLAN_DE_DEVELOPPEMENT.md`.
2. Lecture ciblee A24 : `REFERENCE_UI_UX_A24.md`, `README_MAQUETTES_A24.md`, `SPEC_UI_UX_MAQUETTES_AMBULANCE_MANAGER.md`.
3. Lecture ciblee sessions precedentes utile :
   - `SESSION-20260506-01_A24_A24-UI-01/RESULTATS.md`
   - `SESSION-20260506-07_A24_A24-UI-07/FIN_SESSION.md`
4. Inspection code planning :
   - `app/planning/page.tsx`
   - `app/planning/planning-client.tsx`
   - `app/planning/manual-planning-panel.tsx`
   - `app/globals.css`
5. Production de captures reelles `/planning` (clair/sombre) via Playwright.
6. Cartographie des ecarts UI/UX et preparation du decoupage A25.
7. Decision patch : `NO_PATCH_CODE`.

## Observations principales

- Le planning actuel expose une surface fonctionnelle riche (legacy semaine + manuel + autoschedule/matching) dans un meme ecran.
- La maquette `Planning_V1.2` attend une structure plus maitrisee : filtres, tabs metier, matrice personnel, drawer detail, barre bulk basse.
- L'ecart principal est structurel/ergonomique, pas l'absence de fonctionnalites.

## Limites assumees

- Captures interactives des vues manuel `day/week/month` non produites automatiquement dans cette session.
- Etat visuel de ces vues en capture : INFORMATION NON FOURNIE — À CONFIRMER.