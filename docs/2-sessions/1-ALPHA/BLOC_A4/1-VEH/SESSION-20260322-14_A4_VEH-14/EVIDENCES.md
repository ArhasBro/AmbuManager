# EVIDENCES — SESSION-20260322-14_A4_VEH-14

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
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md` : `07.9 Conformité documentaire flotte minimale` vise explicitement le stockage minimal de : assurance, contrôle technique, carte grise, agrément sanitaire.
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md` : `07.10` est un sujet distinct d’état visuel simple, non traité ici.
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md` : `VEH-14` porte l’ajout des champs ; `VEH-15` porte l’UI d’édition, à ne pas anticiper.

### État réel du code avant correction
- `prisma/schema.prisma` avant patch : `model Vehicle` ne contenait pas les champs documentaires minimaux attendus.
- `lib/validators/vehicle.ts` avant patch : seuls les champs véhicule déjà existants étaient gérés sur création / modification.
- `app/api/vehicles/route.ts` avant patch : le `select` liste / création n’exposait aucun champ documentaire.
- `app/api/vehicles/[id]/route.ts` avant patch : la modification véhicule ne connaissait aucun champ documentaire minimal.

### Correctif validé
- `prisma/schema.prisma` après patch : ajout de `insuranceExpiresAt`, `technicalInspectionExpiresAt`, `registrationDocumentPresent`, `sanitaryApprovalExpiresAt` sur `Vehicle`.
- `prisma/migrations/20260326155000_veh14_add_vehicle_documentary_fields/migration.sql` : migration SQL minimale correspondant exactement à ces 4 champs.
- `lib/validators/vehicle.ts` après patch : création et modification acceptent désormais ces champs, sans imposer leur présence.
- `app/api/vehicles/route.ts` après patch : `GET` et `POST` exposent / enregistrent les champs documentaires.
- `app/api/vehicles/[id]/route.ts` après patch : `PATCH` modifie ces champs.

## Validations réellement constatées
Les validations réellement passées pour la session sont :
- `git apply --check "docs/3-patches/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-14_A4_VEH-14/PATCH__SESSION-20260322-14_A4_VEH-14.diff"` → OK ;
- `git apply "docs/3-patches/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-14_A4_VEH-14/PATCH__SESSION-20260322-14_A4_VEH-14.diff"` → OK ;
- `npx prisma validate` → OK ;
- `npx prisma generate` → OK ;
- `npm run lint` → OK ;
- `npm run build` → OK.
