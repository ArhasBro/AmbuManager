# NOTES

Notes de travail de la session.

---

## Methode / observations

- Verification structure: `app/ui` present avec 9 fichiers (`index.ts` + 8 composants).
- Verification structure: dossier `components/` absent a la racine du repo.
- Verification usage: 26 imports `@/app/ui` detectes dans des pages/clients actifs (`users`, `vehicles`, `planning`, `depots`, `company`, `dashboard`, etc.).
- Verification usage `components`: aucune occurrence `@/components`, `../components`, `./components` detectee dans `app/` et `lib/`.
- Verification shell/navigation: la navigation privee est construite dans `app/layout.tsx` (`navLinks.push(...)`) et rendue dans `app/app-shell.tsx` (`NAV_ICON_BY_ROUTE`, `PUBLIC_ROUTES`).
- Conclusion technique: la structure partagee reelle est `app/ui`, sans couche partagee `components/` actuellement dependante.
