# NOTES

## Sources lues (reelles)

Noyau documentaire obligatoire :
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`

Lecture complementaire ciblee A24-UI-04 :
- `docs/3-templates/TEMPLATE_DEBUT_SESSION.md`
- `docs/1-master/REFERENCE_UI_UX_A24.md`
- `docs/1-master/MAQUETTE/README_MAQUETTES_A24.md`
- `docs/1-master/MAQUETTE/SPEC_UI_UX_MAQUETTES_AMBULANCE_MANAGER.md`
- `docs/1-master/MAQUETTE/ICONES/LISTE_ICONES_EXPORTEES_V1_1.md`
- `docs/1-master/MAQUETTE/ICONES/TABLE_MAPPING_ICONES_V1_1.csv`
- `docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-02_A24_A24-UI-02/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-03_A24_A24-UI-03/RESULTATS.md`
- maquettes DA consultees :
  - `docs/1-master/MAQUETTE/MAQUETTE_DA/A21-UX-04_MAQUETTES_COMPLEMENTAIRES_IMAGES_V1.0/2-Société-paramètres-métier/Société_V1.0.png`
  - `docs/1-master/MAQUETTE/MAQUETTE_DA/A21-UX-04_MAQUETTES_COMPLEMENTAIRES_IMAGES_V1.0/3-Dépôts-bases/Dépôts-bases_V1.0.png`

## Decision UI/UX appliquee

- mode clair conserve comme reference principale ;
- mode sombre maintenu exploitable via tokens existants ;
- icones generiques Societe/Depots remplacees ou alignees via Lucide (`Building2`, `Landmark`, `Ambulance`, `UsersRound`, `Search`, `Filter`, `Info`, `Save`, `Archive`) ;
- aucune creation d'asset metier specifique (logo/PNG) dans ce lot.

## Points de vigilance

- donnees de rattachement vehicules/utilisateurs par depot affichees via `_count` sur le fetch serveur de la page Depots ;
- aucune modification de logique API CRUD Depots ;
- aucune modification Prisma/migration.
