# SESSION — SESSION-20260322-12_A4_VEH-12

## Date
26/03/2026

## Contexte
Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A4  
Type : AUDIT  
Intitulé : Audit de l’affectation véhicule au planning existant

## Objectif de la session
Auditer uniquement l’état réel de l’affectation véhicule → planning existante, qualifier ce qui fonctionne réellement sur `Shift` et `DraftShift`, identifier les limites exactes exploitables pour VEH-13, puis conclure sans corriger le dépôt dans cette session.

## Périmètre exact traité
### Code contrôlé
- `app/api/planning/shifts/[id]/assign/route.ts`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/assign-draftshift.ts`
- `app/planning/planning-client.tsx`
- `lib/validators/planning-assign.ts`
- `app/planning/page.tsx`
- `app/api/planning/shifts/route.ts` (lecture utile au bornage de l’UI)
- `app/api/vehicles/route.ts` (lecture utile sur la source de liste véhicules)
- `lib/permissions.ts` (lecture)
- `lib/permission-catalog.ts` (lecture)
- `prisma/schema.prisma` (lecture)
- `app/api/planning/autoschedule/runs/[id]/route.ts` (lecture utile au bornage draft)

### Documentation relue
- `docs/1-master/*`
- `docs/4-templates/*`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`

## Résultat synthétique
Le flux d’affectation véhicule → planning existe réellement dans le dépôt, mais sa couverture observable côté `/planning` reste **partielle**.

Constat réel retenu :
- un endpoint `PATCH /api/planning/shifts/[id]/assign` existe réellement et traite aussi bien `DraftShift` que `Shift` selon l’identifiant trouvé ;
- les services `assignDraftShift(...)` et `assignShift(...)` existent réellement, gèrent les conflits utilisateurs / véhicules, les absences, le repos minimum, et écrivent un audit planning en cas de modification réelle ;
- le contrôle multi-tenant est effectivement présent via `companyId` sur les lectures et validations d’appartenance société ;
- le contrôle de permission réellement appliqué pour modifier le planning est `canEditPlanning(...)` ;
- l’UI `/planning` expose bien des sélecteurs permettant d’affecter, modifier et retirer un véhicule sur les shifts affichés ;
- en revanche, la page `/planning` charge uniquement des `Shift` publiés centrés sur un utilisateur sélectionné ; elle ne prouve pas une édition manuelle directe des `DraftShift` dans le flux standard de la page ;
- la source de liste véhicules côté planning est bien `/api/vehicles?limit=500`, mais cet endpoint exige `canManageVehicles(...)`, ce qui n’est pas aligné avec le droit utilisé pour éditer le planning ;
- aucun garde-fou réel n’empêche ici l’affectation d’un véhicule `MAINTENANCE` ou `OUT_OF_SERVICE` ;
- l’UI attend encore des codes d’erreur `USER_CONFLICT` / `VEHICLE_CONFLICT` alors que l’API renvoie `USER_OVERLAP_CONFLICT` / `VEHICLE_OVERLAP_CONFLICT`.

Conclusion de session : VEH-12 se clôture en `NO_PATCH` avec verdict **PARTIELLEMENT CONFORME SUR LE PÉRIMÈTRE CONTRÔLÉ**. Le backend d’affectation existe réellement et fonctionne sur le principe, mais la couverture visible côté `/planning` reste incomplète et doit être reprise en VEH-13 sans rouvrir le reste du module planning.

## Emplacements de référence
- Session : `docs/2-sessions/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-12_A4_VEH-12/`
- Patchs : `docs/3-patches/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-12_A4_VEH-12/`
