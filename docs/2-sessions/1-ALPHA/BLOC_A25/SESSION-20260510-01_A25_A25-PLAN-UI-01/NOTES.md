# NOTES

Notes de travail de la session.

---

## Methode / observations

1. Lecture documentaire obligatoire effectuee:
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/REFERENCE_UI_UX_A24.md`
- `docs/1-master/REFERENCE_UI_UX_A25_PLANNING.md`
- `docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-08_A24_A24-UI-08/RAPPORT_PREPARATOIRE_A25.md`
- `docs/1-master/MAQUETTE/README_MAQUETTES_A24.md`
- `docs/1-master/MAQUETTE/SPEC_UI_UX_MAQUETTES_AMBULANCE_MANAGER.md`
- `docs/3-templates/TEMPLATE_DEBUT_SESSION.md`

2. Reference visuelle prioritaire lue:
- `docs/1-master/MAQUETTE/MAQUETTE_DA/.../2-Planning/Planning_V1.2_INFO_DETAIL.png`

3. Inspection code planning realisee:
- route serveur planning ;
- client planning ;
- panneau manuel jour/semaine/mois ;
- endpoints planning exports/shifts/assign/cancel ;
- styles planning + media queries.

4. Captures avant de session produites:
- mode clair ;
- mode sombre ;
- vue jour ;
- vue semaine ;
- vue mois.

5. Point bloquant rencontre puis resolu pendant session:
- instabilite temporaire runtime (erreurs 500 en local) pendant la tentative d'automatisation capture ;
- regeneration dependances (`npm ci`) + regeneration client Prisma (`npx prisma generate`) ;
- captures relancees avec succes ensuite.

6. Constat principal:
- le planning reel expose des fonctionnalites metier larges ;
- l'architecture visuelle reste orientee "legacy + controle operationnel" ;
- la maquette A25 attend une structuration differente (zones separables, tabs explicites, panneau detail droit, matrice personnel/semaine).
