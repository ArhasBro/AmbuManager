# NOTES

Notes de travail de la session.

---

## Methode / observations

1. Lecture du noyau documentaire obligatoire :
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`

2. Lecture du template de demarrage de session (utile a la gouvernance documentaire) :
- `docs/3-templates/TEMPLATE_DEBUT_SESSION.md`

3. Lecture documentaire complementaire strictement utile a A24-UI-01 :
- `docs/1-master/REFERENCE_UI_UX_A24.md`
- `docs/1-master/MAQUETTE/README_MAQUETTES_A24.md`
- `docs/1-master/MAQUETTE/SPEC_UI_UX_MAQUETTES_AMBULANCE_MANAGER.md`
- `docs/1-master/MAQUETTE/CADRAGE_UI_UX_ALPHA_MAQUETTE_V0.2.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/1-master/_INDEX_MASTER.md`

4. Inventaire des references maquettes et icones :
- 11 PNG de reference UI dans `MAQUETTE_DA`.
- mappings icones V1.1 (`LISTE_ICONES...`, `TABLE_MAPPING_ICONES...`).

5. Audit depot reel :
- routes applicatives depuis `app/**/page.tsx`.
- shell global (`app-shell.tsx`) et styles globaux (`globals.css`).
- composants transverses (`app/ui/*`).
- clients pages metier (`users`, `vehicles`, `templates`, `planning`, `audit`, `onboarding`, `depots`, `company`).

6. Appui visuel :
- utilisation des comparatifs deja presents dans `.codex-temp/comparisons/*_compare.png` (maquette gauche / rendu reel droite).

## Point de vigilance

- La doc maquette historique utilise parfois les statuts `CONFORME / PARTIEL / NON CONFORME`.
- La session A24-UI-01 impose les verdicts : `conforme / non conforme / incomplet / à confirmer`.
- Arbitrage retenu : respect strict des verdicts imposes par la session.
