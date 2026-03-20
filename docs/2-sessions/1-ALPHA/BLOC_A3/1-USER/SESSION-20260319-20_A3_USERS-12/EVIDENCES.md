# EVIDENCES — SESSION-20260319-20_A3_USERS-12

## Sources relues pour la session
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/4-templates/*`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- sessions `USERS-01` à `USERS-11`

## Preuves documentaires de cadrage
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:314-321`
  - `05.6 Gestion des indisponibilités / absences` ;
  - description : `gérer les indisponibilités utilisateurs` ;
  - objectif métier : `empêcher l’affectation d’une personne indisponible` ;
  - statut actuel documenté : `manquant`.
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:555-569`
  - les règles métier ALPHA déjà cadrées citent explicitement `indisponibilité salarié`.
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:805-815`
  - l’autoschedule doit tenir compte au minimum de l’`indisponibilité salarié`.
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:1014-1021`
  - l’import initial de données mentionne les `indisponibilités utilisateurs`.
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md:410-425`
  - séquence prévue : `USERS-12` audit, `USERS-13` API absences, `USERS-14` UI absences ;
  - résultat attendu du bloc A3 : `absences intégrées`.

## Preuves d’absence de modèle métier dédié
- `prisma/schema.prisma:142-173`
  - le modèle `User` contient `role`, `platformRole`, `companyId`, `depotId`, `isActive`, timestamps et relations permissions/planning ;
  - aucun champ ni relation d’absences / indisponibilités.
- `prisma/schema.prisma:337-423`
  - les modèles `DraftShift` et `Shift` portent `userId`, `user2Id`, `vehicleId`, `depotId`, `startAt`, `endAt` et des index de conflits ;
  - aucune table ni relation d’indisponibilités utilisateur.
- recherche ciblée exécutée sur le dépôt :
  - `rg -n "absence|absences|indisponibil|indispon|congé|conges|congés|unavail" prisma/schema.prisma app/api/users app/users app/api/planning lib/services/planning lib/types/planning.ts lib/validators/planning-assign.ts lib/permission-catalog.ts -S`
  - résultat : **aucune occurrence** sur le périmètre code inspecté.

## Preuves d’absence d’API / UI dédiées users absences
- arborescence réelle `app/api/users/**`
  - `app/api/users/route.ts`
  - `app/api/users/[id]/route.ts`
  - `app/api/users/[id]/archive/route.ts`
  - `app/api/users/[id]/depot/route.ts`
  - `app/api/users/[id]/reset-password/route.ts`
  - aucune route `absence`, `absences`, `availability`, `unavailability`.
- arborescence réelle `app/users/**`
  - `page.tsx`, `users-list-client.tsx`, `user-creation-client.tsx`, `user-edit-client.tsx`, `user-archive-client.tsx`, `user-depot-assignment-client.tsx`, `reset-password-client.tsx` ;
  - aucun écran ou composant dédié aux absences.
- `lib/validators/user.ts:23-54`
  - schémas dédiés à `depotId`, création utilisateur, édition utilisateur et permissions ;
  - aucun payload d’absence / indisponibilité.
- `app/users/page.tsx:46-51`
  - la page users assemble uniquement création, liste, édition, archivage, dépôt et reset mot de passe.

## Preuves des mécanismes planning déjà existants mais indirects
- `lib/types/planning.ts:3-15`
  - codes d’issues présents : `USER_OVERLAP_CONFLICT`, `VEHICLE_OVERLAP_CONFLICT`, `MIN_REST_VIOLATION`, `RULE_BLOCKED` ;
  - aucun code d’issue lié à une indisponibilité déclarative.
- `lib/services/planning/assign-draftshift.ts:107-145`
  - contrôle des conflits utilisateur par chevauchement sur brouillons et shifts publiés.
- `lib/services/planning/assign-draftshift.ts:148-181`
  - contrôle des conflits véhicule.
- `lib/services/planning/assign-draftshift.ts:184-235`
  - contrôle du repos minimum via `PLANNING_MIN_REST_HOURS`.
- `lib/services/planning/assign-shift.ts:105-143`
  - contrôle des conflits utilisateur côté shifts publiés.
- `lib/services/planning/assign-shift.ts:146-172`
  - contrôle des conflits véhicule côté shifts publiés.
- `lib/services/planning/assign-shift.ts:175-220`
  - contrôle du repos minimum côté shifts publiés.
- `lib/services/planning/matching.service.ts:84-96`
  - matching annoncé sur `requiredRole`, conflits internes run, équité simple ;
  - aucune mention d’indisponibilités.
- `lib/services/planning/matching.service.ts:133-149`
  - matching basé sur les utilisateurs trouvés par rôle ;
  - aucune exclusion par absence.
- `lib/services/planning/matching.service.ts:214-249`
  - sélection des candidats libres uniquement au regard des créneaux déjà occupés.
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts:392-420`
  - publication contrôlée sur conflits + repos minimum ;
  - aucune lecture d’une source d’indisponibilités utilisateur.
- `lib/permission-catalog.ts:1-79`
  - catalogue permissions ALPHA présent (`USERS_MANAGE`, `PLANNING_*`, etc.) ;
  - aucune permission dédiée aux absences utilisateur.

## Preuves de continuité avec USERS-01
- `docs/2-sessions/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-09_A3_USERS-01/EVIDENCES.md:220-226`
  - USERS-01 concluait déjà à l’absence de modèle/API/UI absences et à la présence de seuls contrôles planning indirects.
- `docs/2-sessions/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-09_A3_USERS-01/NOTES.md:71-77`
  - USERS-01 distinguait déjà absence déclarative et contrôles de conflits/repos.
- contrôle courant après USERS-11 : même constat confirmé.

## Points de vigilance documentaires
- `docs/2-sessions/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-21_A3_USERS-13/SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-22_A3_USERS-14/SESSION.md`
- `docs/3-patches/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-21_A3_USERS-13/README_PATCH.md`
- `docs/3-patches/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-22_A3_USERS-14/README_PATCH.md`

Ces dossiers existent mais restent initialisés / non probants. Ils ne prouvent aucune implémentation réelle sur le code audité.

## Validation technique
- aucun patch code produit ;
- aucune commande `lint`, `build`, `tests` ou `prisma` lancée pour cette session d’audit ;
- aucune sortie terminale applicative à consigner.
