# NOTES

Notes de travail de la session.

---

## Methode / observations

Sequence appliquee :

1. Relecture des documents maitres `docs/1-master`.
2. Relecture ciblee des constats valides `FRONT-01`.
3. Cartographie du perimetre strict `FRONT-LOT-02` dans le code.
4. Patch principal code (frontend uniquement).
5. Validation terminale reelle.
6. Documentation finale de session.

Choix de correction retenus :

- corriger l'absence de shell global frontend via un composant `app/app-shell.tsx` ;
- mettre en place des tokens UI et une gestion de theme coherente dans `app/globals.css` ;
- harmoniser les structures de pages critiques avec un layout commun (`page-wrap`, `page-head`, `panel`) ;
- ameliorer la lisibilite metier de textes et de zones d'etat sur dashboard/users/vehicles/templates/planning ;
- conserver les logiques metier existantes sans changement backend.

Elements explicitement exclus (hors session) :

- aucune refonte UX globale type A21 ;
- aucune modification de cadrage produit ;
- aucune correction backend non necessaire au frontend ;
- aucune cloture de bloc A15 dans cette session.

Point environnement constate :

- `npm run *` est bloque par ExecutionPolicy PowerShell dans ce contexte ; utilisation de `npm.cmd` requise.
