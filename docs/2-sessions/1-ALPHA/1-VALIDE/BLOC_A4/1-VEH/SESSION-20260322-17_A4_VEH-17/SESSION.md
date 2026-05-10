# SESSION — SESSION-20260322-17_A4_VEH-17

## Date
26/03/2026

## Contexte
Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A4  
Type : VALIDATION  
Intitulé : Validation du bloc flotte ALPHA

## Objectif de la session
Valider l’état réel du bloc A4 post-VEH-16 à partir du code actuel, des patchs réels `VEH-01` à `VEH-16`, de la documentation réelle de ces sessions et du cadrage officiel, afin de déterminer si le bloc flotte ALPHA est conforme, partiellement conforme ou non conforme au cadrage et au résultat attendu du plan.

## Périmètre exact traité
### Documentation relue
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
- `docs/2-sessions/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-01_A4_VEH-01/` à `SESSION-20260322-16_A4_VEH-16/`
- `docs/3-patches/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-01_A4_VEH-01/` à `SESSION-20260322-16_A4_VEH-16/`

### Code contrôlé
- `prisma/schema.prisma`
- `app/vehicles/page.tsx`
- `app/vehicles/vehicles-client.tsx`
- `app/api/vehicles/route.ts`
- `app/api/vehicles/[id]/route.ts`
- `app/api/vehicles/[id]/archive/route.ts`
- `app/api/vehicles/[id]/depot/route.ts`
- `lib/services/vehicles/archive-vehicle.ts`
- `lib/services/vehicles/assign-vehicle-depot.ts`
- `lib/validators/vehicle.ts`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/planning/planning-client.tsx`
- `lib/services/planning/assign-draftshift.ts`
- `lib/services/planning/assign-shift.ts`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`

## Résultat synthétique
Le bloc A4 post-VEH-16 est **exploitable en ALPHA mais pas pleinement conforme** au cadrage officiel.

Constat réel retenu :
- le registre flotte, la création, l’édition, l’archivage logique, le rattachement à une base active, les types `AMBULANCE / VSL / TAXI`, ainsi que la conformité documentaire minimale et son état visuel simple sont réellement présents dans le code actuel ;
- le flux d’affectation véhicule → planning est réel et utilisable, avec contrôle d’appartenance société, conflits utilisateurs / véhicules, absences et repos minimum ;
- `VEH-13` a bien corrigé le résiduel ciblé de `VEH-12` sur l’accès à la liste véhicules depuis le planning et l’alignement UI/API des erreurs de conflit ;
- `VEH-14` à `VEH-16` ont bien ajouté puis exposé les 4 données minimales de conformité documentaire et l’état simple `conforme / bientôt expiré / expiré` ;
- le résiduel constaté en `VEH-10` reste réel : `DELETE /api/vehicles` supprime physiquement un véhicule sans garde-fou visible « jamais utilisé », et l’UI `/vehicles` expose toujours l’action `Supprimer` ;
- ce résiduel `07.5` n’est pas à lui seul bloquant pour une appréciation ALPHA, car le cadrage le classe « IMPORTANT MAIS NON BLOQUANT », mais il empêche un verdict global « conforme » ;
- un second résiduel persiste sur `07.7 Statut véhicule` : le statut existe bien (`ACTIVE`, `MAINTENANCE`, `OUT_OF_SERVICE`), mais aucun garde-fou ni signal réel n’empêche dans le flux d’affectation planning l’usage d’un véhicule indisponible.

Conclusion de session : `VEH-17` se clôture en `NO_PATCH` avec verdict **PARTIELLEMENT CONFORME**. Le bloc flotte A4 est globalement remis à niveau sur le socle attendu en ALPHA, mais il n’est pas totalement conforme au cadrage à cause du résiduel de suppression physique non encadrée et de l’absence de garde-fou / signal sur le statut véhicule indisponible dans l’affectation planning.

## Emplacements de référence
- Session : `docs/2-sessions/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-17_A4_VEH-17/`
- Patchs : `docs/3-patches/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-17_A4_VEH-17/`
