# RESULTATS

## Résultats obtenus

### Verdict global retenu

La session `SESSION-20260317-02_A2_BASE-11` est retenue **`partiellement conforme`**.

### Pourquoi ce verdict

Le bloc bases/dépôts n’est pas homogène dans son état réel :
- plusieurs sous-sessions sont effectivement livrées et exploitables ;
- mais le dépôt réel contient encore des écarts formels majeurs par rapport à ce qui est documenté ;
- ces écarts empêchent une validation globale `conforme` du bloc `BASE-02` à `BASE-10`.

---

## Contrôle BASE-02 à BASE-10

### BASE-02 — modèle Prisma `Depot`

**Verdict : conforme**

Constats :
- modèle `Depot` réellement présent dans `prisma/schema.prisma` ;
- relation `Company -> Depot` réellement présente ;
- unicité tenant cohérente : `@@unique([companyId, name])` ;
- migration réellement présente : `prisma/migrations/20260316153000_base02_create_depot_model/migration.sql`.

### BASE-03 — `POST /api/depots`

**Verdict : conforme**

Constats :
- route `app/api/depots/route.ts` réellement présente ;
- auth / tenant via session ;
- RBAC limité à `ADMIN` / `GERANT` ;
- validation Zod stricte ;
- contrat API respecté : `{ ok:true,data }` / `{ ok:false,error,details? }`.

### BASE-04 — `PATCH /api/depots/[id]`

**Verdict : non conforme**

Constats :
- route réellement présente ;
- bornage tenant correct ;
- contrat API correct ;
- **écart majeur** : la modification n’est pas bornée à `name` et `address` seulement.

Preuves dans l’état réel :
- `lib/validators/depot.ts` accepte encore `isActive` ;
- `app/api/depots/[id]/route.ts` transmet encore `isActive` ;
- `lib/services/depots/update-depot.ts` applique encore `isActive`.

Conséquence :
- la session `BASE-04` est contradictoire avec son propre bornage documentaire.

### BASE-05 — archivage dépôt

**Verdict : conforme**

Constats :
- route `app/api/depots/[id]/archive/route.ts` réellement présente ;
- désactivation logique cohérente par passage à `isActive:false` ;
- aucune suppression physique détectée ;
- bornage tenant respecté.

### BASE-06 — UI `/depots`

**Verdict : conforme**

Constats :
- page `app/depots/page.tsx` réellement présente ;
- client `app/depots/depots-client.tsx` réellement présent ;
- accès borné côté page à `ADMIN` / `GERANT` ;
- création / édition / archivage cohérents avec les routes réelles du module dépôts.

### BASE-07 — rattachement `Vehicle -> Depot`

**Verdict : non conforme**

Constats :
- le schéma Prisma contient bien `Vehicle.depotId` et `Vehicle.depot` ;
- l’UI véhicules expose un sélecteur de base ;
- **mais l’implémentation réellement requise n’est pas complète dans le dépôt**.

Écarts réels :
- route dédiée annoncée absente : `app/api/vehicles/[id]/depot/route.ts` introuvable ;
- service annoncé absent : `lib/services/vehicles/assign-vehicle-depot.ts` introuvable ;
- migration annoncée absente : `prisma/migrations/20260316193000_base07_attach_vehicle_to_depot/migration.sql` introuvable ;
- l’UI `app/vehicles/vehicles-client.tsx` appelle pourtant `/api/vehicles/[id]/depot`.

Conséquence :
- le rattachement véhicule → dépôt n’est pas validable comme livré dans l’état réel du dépôt.

### BASE-08 — rattachement `User -> Depot`

**Verdict : conforme**

Constats :
- `User.depotId` et `User.depot` réellement présents ;
- migration réellement présente ;
- route `app/api/users/[id]/depot/route.ts` réellement présente ;
- UI dédiée réellement présente ;
- tenant / RBAC cohérents avec le module utilisateurs.

### BASE-09 — rattachement `Shift -> Depot`

**Verdict : partiellement conforme**

Constats positifs :
- `Shift.depotId` et `Shift.depot` sont présents dans le schéma ;
- la route `app/api/planning/shifts/[id]/assign/route.ts` gère `depotId` sur shift publié ;
- les dépôts sont chargés dans `app/planning/page.tsx` ;
- l’UI planning expose le champ base ;
- `DraftShift` n’est pas étendu ;
- la route refuse explicitement `depotId` sur draft : `DEPOT_ASSIGNMENT_NOT_SUPPORTED_ON_DRAFT`.

Écart majeur :
- migration annoncée absente : `prisma/migrations/20260316213000_base09_attach_shift_to_depot/migration.sql` introuvable.

Conséquence :
- l’intention fonctionnelle existe dans le code, mais la preuve de livraison data/migration n’est pas cohérente avec la documentation de session.

### BASE-10 — audit `template ↔ base`

**Verdict : conforme**

Constats :
- audit bien borné ;
- aucun patch code produit ;
- artefact `NO_PATCH.md` réellement présent ;
- pas de réouverture abusive du périmètre planning/templates.

---

## Écarts entre documentation et code réel

### Écart 1 — BASE-04

La documentation de session affirme que `isActive` a été retiré du périmètre de modification, mais le code réel l’accepte toujours.

### Écart 2 — BASE-07

La documentation de session liste comme présents :
- une migration dédiée ;
- une route dédiée ;
- un service dédié.

Ces fichiers ne sont pas présents dans l’état réel inspecté.

### Écart 3 — BASE-09

La documentation de session liste une migration dédiée `BASE-09`, mais cette migration n’existe pas dans l’état réel inspecté.

### Écart 4 — validations terminales historiques

Les sessions précédentes documentent des validations terminales vertes, mais elles n’ont pas pu être réattestées proprement dans cet environnement d’analyse.
Ce point ne renverse pas à lui seul les constats code, mais interdit de s’en servir comme preuve principale dans `BASE-11`.

---

## Risques / impacts / dépendances

### Risques immédiats

1. **Risque fonctionnel BASE-07**
   - l’UI véhicules appelle une route absente ;
   - le flux de rattachement véhicule → dépôt n’est donc pas fiabilisé.

2. **Risque de dérive de périmètre BASE-04**
   - la route d’édition dépôt permet encore de modifier `isActive` hors route d’archivage dédiée ;
   - cela affaiblit le bornage méthodologique du bloc.

3. **Risque data BASE-09**
   - absence de migration dédiée pour `Shift.depotId` ;
   - incohérence potentielle entre schéma Prisma, base réelle et récit documentaire.

### Dépendances impactées

- module véhicules
- module planning
- cohérence patchs / sessions / état réel du dépôt
- fiabilité des validations ultérieures du bloc A2 BASE

---

## Liste exacte des fichiers documentaires générés

- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260317-02_A2_BASE-11/SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260317-02_A2_BASE-11/NOTES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260317-02_A2_BASE-11/EVIDENCES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260317-02_A2_BASE-11/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260317-02_A2_BASE-11/FIN_SESSION.md`
- `docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260317-02_A2_BASE-11/NO_PATCH.md`

## Conclusion

Le bloc `BASE-02` à `BASE-10` n’est pas rejeté en totalité, mais il ne peut pas être validé `conforme` en l’état réel du dépôt.

La validation BASE-11 confirme que les écarts identifiés sont structurels et nécessitent des sessions correctives dédiées, sans remise en cause du cadre méthodologique du bloc.

Le verdict formel retenu pour `BASE-11` est donc :

**`partiellement conforme`**
