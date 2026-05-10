# EVIDENCES — SESSION-20260322-15_A4_VEH-15

## Sources documentaires relues
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`
- `docs/4-templates/TEMPLATE_FIN_SESSION.md`
- `docs/4-templates/TEMPLATE_DOD_4_4.md`
- `docs/4-templates/TEMPLATE_RECAP_SESSION.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`

## Extraits factuels retenus

### Base produit
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md` : `07.9 Conformité documentaire flotte minimale` impose un stockage minimal de l’assurance, du contrôle technique, de la carte grise et de l’agrément sanitaire.
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md` : `07.10 État visuel simple de conformité documentaire` est un sujet séparé, hors périmètre de `VEH-15`.
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md` : `VEH-14` porte le socle documentaire, `VEH-15` porte l’UI d’édition, `VEH-16` porte l’état visuel simple.

### État réel du code avant correction
- `app/api/vehicles/route.ts` et `app/api/vehicles/[id]/route.ts` exposent déjà les champs `insuranceExpiresAt`, `technicalInspectionExpiresAt`, `registrationDocumentPresent`, `sanitaryApprovalExpiresAt`.
- `lib/validators/vehicle.ts` accepte déjà ces champs sur création et modification.
- `app/vehicles/page.tsx` avant patch ne sélectionnait pas encore ces champs pour la liste initiale des véhicules.
- `app/vehicles/vehicles-client.tsx` avant patch ne portait pas ces champs dans son type `Vehicle`, ne les affichait pas et ne les envoyait pas dans le flux `PATCH` existant.

### Correctif validé
- `app/vehicles/page.tsx` après patch : ajout des 4 champs documentaires dans le `select` de `prisma.vehicle.findMany` pour hydrater correctement l’UI.
- `app/vehicles/vehicles-client.tsx` après patch :
  - extension du type `Vehicle` ;
  - ajout d’un affichage simple des 4 données documentaires dans la liste ;
  - ajout d’états locaux d’édition pour les 4 champs ;
  - préremplissage du formulaire d’édition existant ;
  - envoi de ces valeurs au `PATCH /api/vehicles/[id]` ;
  - rafraîchissement de l’état UI après sauvegarde via `setVehicles(...data.data...)`.

## Validations réellement constatées
- `git apply --check "docs/3-patches/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-15_A4_VEH-15/PATCH__SESSION-20260322-15_A4_VEH-15.diff"` → OK ;
- `git apply "docs/3-patches/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-15_A4_VEH-15/PATCH__SESSION-20260322-15_A4_VEH-15.diff"` → OK ;
- `npx prisma validate` → INFORMATION NON FOURNIE — À CONFIRMER ;
- `npx prisma generate` → INFORMATION NON FOURNIE — À CONFIRMER ;
- `npm run lint` → OK ;
- `npm run build` → OK.
