# EVIDENCES

Elements factuels utilises pendant la session.

---

## Sources utilisees

### Documentation officielle relue

- docs/1-master/DOCUMENT_MAITRE.md
- docs/1-master/PLAN_DE_DEVELOPPEMENT.md
- docs/3-templates/TEMPLATE_DEBUT_SESSION.md
- docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md
- docs/1-master/ETAT_GLOBAL_PROJET.md

Constats documentaires utiles :
- `PLAN_DE_DEVELOPPEMENT.md` : `RGPD-LOT-02` est la session
  `CORRECTION+COMPLETION` du bloc A17 ;
- `ETAT_GLOBAL_PROJET.md` : la base RGPD fait partie des priorites de
  consolidation du socle ALPHA ;
- `DOCUMENT_CADRAGE_FONCTIONNEL.md` :
  - gestion des indisponibilites / absences ;
  - audit renforce des actions support ;
  - archivage utilisateur sans suppression d'historique ;
  - suppression definitive utilisateur exceptionnelle et encadree.

### Session precedente validee relue

- docs/2-sessions/1-ALPHA/BLOC_A17/SESSION-20260423-09_A17_RGPD-01/SESSION.md
- docs/2-sessions/1-ALPHA/BLOC_A17/SESSION-20260423-09_A17_RGPD-01/RESULTATS.md
- docs/2-sessions/1-ALPHA/BLOC_A17/SESSION-20260423-09_A17_RGPD-01/EVIDENCES.md

Constats repris :
- absence de registre explicite des finalites/categories/acces/conservation ;
- creation/modification users non tracees de maniere homogene ;
- archivage user non trace pour les acteurs metier standards ;
- suppression d'absence physique sans gouvernance documentaire associee ;
- absence de mentions d'information observees dans le depot.

### Code reel modifie

- `app/api/users/route.ts`
  - audit applicatif sur creation user.
- `app/api/users/[id]/route.ts`
  - audit applicatif sur modification user.
- `app/api/users/[id]/reset-password/route.ts`
  - audit applicatif sur reset password.
- `app/api/users/[id]/absences/route.ts`
  - propagation de `actorUserId` au service d'absence.
- `app/api/users/[id]/absences/[absenceId]/route.ts`
  - propagation de `actorUserId` au service d'absence.
- `lib/services/users/archive-user.ts`
  - audit applicatif sur archivage user.
- `lib/services/users/assign-user-depot.ts`
  - audit applicatif sur affectation depot user.
- `lib/services/users/user-absence.ts`
  - audit applicatif sur creation/modification/suppression absence.
- `lib/services/audit/personal-data-audit.ts`
  - nouveau helper dedie a l'audit des donnees personnelles.
- `docs/1-master/RGPD_BASE_MINIMALE.md`
  - registre/document de base RGPD minimal.
- `app/privacy/page.tsx`
  - page de mention d'information minimale.
- `app/login/page.tsx`
  - lien vers `/privacy`.
- `scripts/quality/smoke-api-critical-contracts.test.mjs`
  - tests statiques du patch RGPD.

---

## Patch principal produit

- Fichier :
  `docs/2-sessions/1-ALPHA/BLOC_A17/SESSION-20260423-10_A17_RGPD-LOT-02/PATCH/PATCH__SESSION-20260423-10_A17_RGPD-LOT-02.diff`
- Taille observee : `37079` octets.

Controle effectue :
- le patch principal couvre uniquement le code reel, la doc produit RGPD et la
  mention applicative ;
- les `.md` de session restent hors patch principal.

---

## Validations terminales reellement executees

### `npm run test:quality`

Resultat observe :
- `test:smoke` : `8` passes / `0` fail ;
- `test:targeted` : `7` passes / `0` fail ;
- warning Node observe :
  `MODULE_TYPELESS_PACKAGE_JSON`, non bloquant.

### `npm run lint`

Resultat observe :
- premier passage KO a cause de `react/no-unescaped-entities` sur les nouveaux
  textes JSX ;
- correction appliquee dans le patch final ;
- second passage OK sans erreur.

### `npm run build`

Resultat observe :
- compilation Next.js OK ;
- verification TypeScript OK ;
- generation statique OK ;
- route `/privacy` visible dans le recapitulatif de build.

### Commandes non executees

- `npx prisma validate`
- `npx prisma generate`

Motif :
- aucun changement Prisma/migration/schema dans cette session.
