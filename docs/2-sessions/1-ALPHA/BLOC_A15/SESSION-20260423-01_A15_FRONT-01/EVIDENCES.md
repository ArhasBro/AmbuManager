# EVIDENCES

Éléments factuels utilisés pendant la session.

---

## Sources utilisées

Sources documentaires maître :

- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`

Preuves code principales :

- Absence de shell global :
  - `app/layout.tsx`
  - `app/providers.tsx`
- Thème light only :
  - `app/globals.css`
- Dashboard :
  - `app/dashboard/page.tsx`
  - `app/dashboard/logout-button.tsx`
- Users :
  - `app/users/page.tsx`
  - `app/users/users-list-client.tsx`
  - `app/users/user-creation-client.tsx`
  - `app/users/user-edit-client.tsx`
  - `app/users/user-archive-client.tsx`
  - `app/users/user-absence-client.tsx`
  - `app/users/user-depot-assignment-client.tsx`
  - `app/users/reset-password-client.tsx`
- Vehicles :
  - `app/vehicles/page.tsx`
  - `app/vehicles/vehicles-client.tsx`
  - `app/vehicles/add-vehicle-form.tsx`
- Templates :
  - `app/templates/page.tsx`
  - `app/templates/templates-client.tsx`
- Planning :
  - `app/planning/page.tsx`
  - `app/planning/planning-client.tsx`
  - `app/planning/manual-planning-panel.tsx`

Éléments explicitement non produits :

- aucun build ;
- aucun lint ;
- aucun test automatisé ;
- aucune capture navigateur ;
- aucune validation responsive réelle ;
- aucune preuve de rendu navigateur exact.

