# EVIDENCES — SESSION-20260322-16_A4_VEH-16

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
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md` : `07.10 État visuel simple de conformité documentaire` impose un affichage simple `conforme / bientôt expiré / expiré`.
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md` : les alertes avancées restent hors ALPHA sur ce sujet.
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md` : `VEH-14` = socle documentaire, `VEH-15` = UI d’édition, `VEH-16` = état visuel simple.

### État réel du code avant correction
- `app/vehicles/page.tsx` sélectionne déjà `insuranceExpiresAt`, `technicalInspectionExpiresAt`, `registrationDocumentPresent`, `sanitaryApprovalExpiresAt` dans la liste initiale.
- `app/vehicles/vehicles-client.tsx` affiche déjà chaque donnée documentaire individuellement après `VEH-15`.
- `app/vehicles/vehicles-client.tsx` ne calcule pas encore d’état global `conforme / bientôt expiré / expiré`.
- `app/api/vehicles/route.ts` et `app/api/vehicles/[id]/route.ts` n’ont pas besoin d’être modifiés pour alimenter l’UI réelle de cette session.

### Correctif validé
- `app/vehicles/vehicles-client.tsx` après patch :
  - ajout d’un type local `VehicleDocumentStatus` ;
  - ajout d’un seuil local UI `DOCUMENT_WARNING_WINDOW_DAYS = 30` ;
  - ajout de helpers locaux de normalisation/calcul des dates ;
  - calcul du statut `expiré / bientôt expiré / conforme` à partir des 4 champs existants ;
  - affichage d’un badge visuel simple dans la ligne véhicule ;
  - affichage explicite dans l’UI du seuil local de 30 jours.

## Validations réellement constatées
- `git apply --check "docs/3-patches/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-16_A4_VEH-16/PATCH__SESSION-20260322-16_A4_VEH-16.diff"` → OK ;
- `git apply "docs/3-patches/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-16_A4_VEH-16/PATCH__SESSION-20260322-16_A4_VEH-16.diff"` → OK ;
- `npm run lint` → OK ;
- `npm run build` → OK.
