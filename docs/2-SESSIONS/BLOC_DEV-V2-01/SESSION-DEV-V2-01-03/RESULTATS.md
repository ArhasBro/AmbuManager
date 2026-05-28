# RESULTATS

## Resultats obtenus

Decision patch: NO_PATCH_CODE (applicatif).

1. Conventions de nommage et de placement fixees

- Dossier de reference confirme: `app/ui` pour les composants transverses reutilisables.
- Convention fichier: `kebab-case.tsx`.
- Convention composant exporte: `PascalCase`.
- Convention classes CSS: base `ui-*`, variantes `--*`, etats `is-*`.
- Convention de sortie publique: export via `app/ui/index.ts` uniquement.
- Convention de frontiere: un composant metier ne monte dans `app/ui` que si reutilisation prouvee et absence de couplage metier fort.

2. Priorisation des composants du socle

Priorite P1 (immediate, transverse bloc DEV-V2):
- Shell layout: `AppShell`.
- Navigation shell: liens, etat actif, labels V2.
- Bouton: `ActionButton`.
- Badge statut: `StatusBadge`.
- Tableau: `DataTable`.
- Filtres: `FilterBar`.
- Etat vide: `EmptyState`.
- Etat erreur et acces refuse: pattern unifie a converger sur `ErrorMessage` + variante acces refuse.

Priorite P2 (prochaine etape utile):
- Panneau detail: converger vers un composant partage de type `DetailPanel` en partant des patterns modules existants.

3. Strategie de factorisation progressive definie

- Etape 1: corriger d abord l usage des composants existants dans les zones du bloc DEV-V2-01.
- Etape 2: extraire vers `app/ui` uniquement les structures dupliquees observees au moins sur 2 zones actives du scope.
- Etape 3: ne factoriser que les APIs minimales necessaires a la session de correction en cours.
- Etape 4: repousser toute abstraction speculative ou design system global hors scope.
- Etape 5: tracer chaque decision de non-factorisation pour permettre une reprise dans un bloc ulterieur.

4. Criteres d adoption des composants partages

- C1 Reutilisation: besoin present sur au moins 2 zones actives.
- C2 Neutralite metier: pas de logique metier specifique embarquee.
- C3 API stable: props claires, limitees, et nommage coherent.
- C4 Accessibilite minimale: roles/labels/etat focus geres quand applicable.
- C5 Theming existant: compatibilite avec classes et tokens deja en place, sans refonte graphique.
- C6 Effort ratio: gain de maintenance superieur au cout de migration locale.
- C7 Non-regression: integration possible sans modifier le contrat metier ni le comportement fonctionnel.

---

## Documents modifies

- `docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-03/SESSION.md`
- `docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-03/NOTES.md`
- `docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-03/EVIDENCES.md`
- `docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-03/RESULTATS.md`
- `docs/2-SESSIONS/BLOC_DEV-V2-01/SESSION-DEV-V2-01-03/FIN_SESSION.md`
