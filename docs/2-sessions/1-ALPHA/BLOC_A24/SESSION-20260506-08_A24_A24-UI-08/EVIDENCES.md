# EVIDENCES

Éléments factuels utilisés pendant la session.

---

## Preuves réellement obtenues

### Lecture documentaire

Sources lues :
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/REFERENCE_UI_UX_A24.md`
- `docs/1-master/MAQUETTE/README_MAQUETTES_A24.md`
- `docs/1-master/MAQUETTE/SPEC_UI_UX_MAQUETTES_AMBULANCE_MANAGER.md`

Constats :
- le projet impose multi-tenant strict, RBAC, conventions API, documentation et preuve ;
- le plan impose 1 session = 1 livrable, et un verdict formel pour toute session AUDIT ;
- A24 exclut le planning profond et prépare A25 ;
- la maquette planning officielle référencée est `Planning_V1.2.png`.

### Lecture code

Fichiers inspectés :
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/planning/manual-planning-panel.tsx`
- `app/globals.css`
- `package.json`

Constats statiques :
- `/planning` existe ;
- `page.tsx` charge session, permissions, dépôts, utilisateurs, puis rend `PlanningClient`;
- `planning-client.tsx` contient des états pour semaine, visibilité, bulk assign, autoschedule, publication, matching et qualité ;
- `manual-planning-panel.tsx` contient les vues `day`, `week`, `month`, création/modification/annulation et exports ;
- `globals.css` contient les tokens A24 clair/sombre et les composants UI partagés ;
- `package.json` contient les scripts `lint` et `build`.

---

## Captures produites

Aucune capture produite.

## Captures absentes

- `/planning` mode clair : INFORMATION NON FOURNIE — À CONFIRMER
- `/planning` mode sombre : INFORMATION NON FOURNIE — À CONFIRMER
- vues jour/semaine/mois : INFORMATION NON FOURNIE — À CONFIRMER
- état vide : INFORMATION NON FOURNIE — À CONFIRMER
- état avec données : INFORMATION NON FOURNIE — À CONFIRMER
- drawer/modal/panneau : INFORMATION NON FOURNIE — À CONFIRMER

Raison :
l’environnement disponible ne permet pas de lancer le dépôt réel avec navigateur, base locale et session authentifiée.

---

## Validations exécutées

Validation réellement exécutée ici :
- applicabilité du patch documentaire dans une reconstruction locale temporaire des fichiers squelettes GitHub.

Commande :
```bash
git apply --check docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-08_A24_A24-UI-08/PATCH/PATCH__SESSION-20260506-08_A24_A24-UI-08_DOCS.diff
```

Résultat :
- OK dans reconstruction locale temporaire.

Important :
- cette preuve n’est pas une preuve d’applicabilité dans le dépôt Windows réel de l’utilisateur si l’état local diffère de GitHub `main`.

---

## Validations non exécutées

Commandes demandées mais non exécutées dans le dépôt réel :

```bash
git status --short
npm run lint
npm run build
```

Résultat :
INFORMATION NON FOURNIE — À CONFIRMER

Raison :
pas d’accès au dépôt Windows local réel ni à son environnement Node/Prisma/base.

---

## Informations non fournies

- état local réel après application des sessions A24-UI-05/06/07 ;
- captures réelles ;
- logs `npm run lint`;
- logs `npm run build`;
- preuve de navigation `/planning` authentifiée ;
- preuve de mode sombre sur planning ;
- preuve d’état avec données.

---

## Risques résiduels

- divergence entre GitHub `main` et le dépôt local ;
- patch documentaire à contrôler avec `git apply --check` dans le dépôt réel ;
- captures à produire impérativement au début d’A25 ;
- possible écart entre analyse statique et rendu réel.
