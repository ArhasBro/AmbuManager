# NOTES

## Méthode / observations

### 1. Base documentaire relue avant correction
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`

### 2. Stratégie retenue
Le correctif a été conduit selon la règle `CODE > DOCUMENTATION` et strictement borné au périmètre `AUTO-LOT-02-14`.

Choix structurants :
- ne pas toucher le schéma Prisma ;
- ne pas ouvrir une complétion générale du matching A10 ;
- réutiliser les règles réelles déjà présentes côté templates et company rules ;
- compléter l’autoschedule en priorité là où l’audit `AUTO-01` avait prouvé un manque réel ;
- traiter séparément le fix de build strictement local sans rejouer la session ni élargir le périmètre.

### 3. Observations structurantes de correction

#### Choix gérant « shifts seuls » / « auto-affectation »
- ajout d’un `assignmentMode` sur les routes JOUR / SEMAINE ;
- ajout d’un sélecteur UI dans `/planning` ;
- branchement réel du mode `AUTO_ASSIGN` pour lancer le matching immédiatement après génération.

#### Matching étendu aux véhicules
- le service `matching.service.ts` ne se limite plus aux utilisateurs ;
- il calcule désormais des cibles `USER_1`, `USER_2` et `VEHICLE` ;
- il affecte réellement `vehicleId` au même titre que `userId` / `user2Id` lorsqu’une proposition est valide.

#### Indisponibilités utilisateurs
- maintien de la lecture des absences utilisateur ;
- ajout de la prise en compte des shifts publiés existants dans le matching, en plus des conflits internes au run ;
- conservation du blocage au publish en cas d’absence chevauchée.

#### Indisponibilités véhicules
- extension du matching pour prendre en compte l’occupation véhicule interne au run et les shifts publiés existants ;
- filtrage des véhicules candidats sur `isActive=true` et `status=ACTIVE` ;
- revalidation au publish de l’état du véhicule et du type attendu par le template.

#### Contraintes rôles / véhicules
- ajout de helpers dédiés dans `lib/templates/template-rules.ts` ;
- utilisation réelle de ces règles dans le matching et au publish ;
- contrôle borné à la logique métier réellement dérivable des presets ALPHA existants.

#### Repos minimum
- conservation du contrôle existant au publish ;
- ajout d’un filtrage des candidats du matching selon la règle de repos minimum quand elle est disponible côté société.

#### Lisibilité métier / français
- traduction des messages principaux côté UI autoschedule ;
- amélioration du tableau de simulation pour afficher des cibles, besoins, propositions et messages lisibles ;
- traduction des résumés d’audit `match/apply`, `publish` et `cancel`.

### 4. Fix complémentaire `FIX-01`
Le patch principal a introduit une erreur de build strictement locale dans `lib/services/planning/matching.service.ts` : la fonction `chooseBestVehicle(...)` utilisait `draftState` sans l’avoir dans sa portée.

Le fix `PATCH__SESSION-20260415-06_A9_AUTO-LOT-02-14_FIX-01.diff` corrige uniquement ce point en :
- ajoutant `draftState` à la signature de `chooseBestVehicle(...)` ;
- transmettant `draftState` depuis l’appelant `computeDraftShiftMatchingByRole(...)`.

Aucun autre changement fonctionnel n’a été ajouté par ce fix.

### 5. Limites prouvées restant hors patch
- aucun modèle `VehicleAbsence` ou équivalent n’existe dans le schéma courant ;
- la notion d’indisponibilité véhicule déclarative reste donc non matérialisée ;
- la colonne `action` des logs d’audit reste un code technique interne, même si les résumés associés sont passés en français.
