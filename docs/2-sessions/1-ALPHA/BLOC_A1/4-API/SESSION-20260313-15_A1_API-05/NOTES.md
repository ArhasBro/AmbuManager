# NOTES

## Méthode / observations

### 1. Relecture documentaire préalable
- Relecture documentaire ciblée réalisée sur les documents pertinents de `./docs`, avec priorité donnée au dossier `./docs/1-master` conformément aux règles du dépôt ;
- priorité absolue donnée à `docs/1-master` conformément aux règles de session ;
- rappel du protocole : `CODE > DOCUMENTATION` en cas de contradiction ;
- rappel du plan officiel : `API-05` est une **VALIDATION** de cohérence API/UI après `API-04`, pas une correction.

### 2. Point de départ factuel retenu
Les documents amont imposent :
- un contrat API cible unique `{ ok:true, data } / { ok:false, error, details? }` ;
- une doctrine dominante `error = code symbolique uppercase` après `API-04` ;
- une session `API-05` bornée à la consommation réelle par l’UI existante.

Conséquence méthodologique :
- seules les routes réellement appelées depuis les modules présents sont évaluées comme couvertes UI ;
- une route relue mais non consommée n’est pas comptée comme défaut API/UI ;
- une route auxiliaire externe au socle API métier (`/api/auth/session`) n’est pas traitée comme non-conformité du contrat `API-01`.

### 3. Cartographie UI réellement trouvée
Les consommateurs réels identifiés dans le dépôt sont :
- `app/users/reset-password-client.tsx` pour `GET /api/users` et `POST /api/users/[id]/reset-password` ;
- `app/vehicles/vehicles-client.tsx` pour `POST /api/vehicles` et `DELETE /api/vehicles?id=...` ;
- `app/planning/planning-client.tsx` pour le reste du périmètre utile : `shifts`, `company/rules`, `autoschedule/day`, `autoschedule/week`, `runs/[id]`, `match/preview`, `match/apply`, `publish`, `cancel`, ainsi que les listes `users` et `vehicles`.

Absences constatées sur le périmètre inspecté :
- aucun consommateur UI trouvé pour `GET /api/planning/autoschedule/runs` ;
- aucun consommateur UI trouvé pour `GET /api/planning/autoschedule/runs/[id]/match`.

### 4. Zone globalement cohérente
#### 4.1 Users / vehicles / company rules
La consommation de base est compatible avec le contrat :
- les clients attendent un JSON avec `ok` et `data` sur succès ;
- les clients lisent `error` sur échec ;
- l’absence de lecture détaillée de `details` n’empêche pas la compatibilité structurelle.

#### 4.2 Planning — vérifications positives
`planning-client` :
- parse le JSON de façon défensive (`fetchJson`) ;
- distingue `json.ok === true` et `json.ok === false` ;
- lit réellement `details` sur les cas critiques de publish (`MIN_REST_BLOCKED`, `CONFLICT_USER`, `CONFLICT_VEHICLE`) ;
- s’aligne correctement sur le format `data.plan` + `data.quality` pour le preview matching ;
- s’aligne correctement sur le format `data` renvoyé par `GET /api/planning/autoschedule/runs/[id]` pour `status`, `_count`, `draftShifts`, `access`, `auditLogs`.

### 5. Fragilités API/UI réellement prouvées
#### 5.1 Génération jour/semaine — récupération du brouillon existant non alignée
Le client planning traite le cas `DRAFT_ALREADY_EXISTS` en cherchant `runId` au niveau racine du JSON.

Or les routes `autoschedule/day` et `autoschedule/week` renvoient `runId` sous `details.runId`.

Conséquence :
- la branche de récupération rapide du run existant ne peut pas s’exécuter telle qu’écrite ;
- l’UI bascule alors sur un message d’erreur générique alors que l’API fournit bien l’information utile.

Cette incohérence est une vraie fragilité de contrat API/UI, et pas un simple problème de wording.

#### 5.2 Assignation planning — codes d’erreur de conflit non alignés
Le client planning attend :
- `USER_CONFLICT`
- `VEHICLE_CONFLICT`

La route d’assignation renvoie pourtant, via ses services :
- `USER_OVERLAP_CONFLICT`
- `VEHICLE_OVERLAP_CONFLICT`

Conséquence :
- les messages UI spécialisés prévus pour les conflits d’affectation ne sont pas activés ;
- l’utilisateur reçoit un message générique sur ces cas, malgré un code d’erreur structuré côté API.

Là encore, la structure globale reste compatible, mais l’exploitation UI n’est pas correctement alignée.

#### 5.3 `loadRunInfo()` reste compatible mais peu exploitatif
Sur `GET /api/planning/autoschedule/runs/[id]`, le client :
- valide bien `res.ok` et `json.ok` ;
- mais remplace toute erreur détaillée par `RUN_INFO_ERROR`.

Conséquence :
- pas de rupture de contrat ;
- mais perte d’information et débogage UI plus fragile qu’il ne pourrait l’être.

### 6. Cas seulement partiels mais non bloquants
#### 6.1 Reset password
Le client reset password n’utilise pas `details` :
- `INVALID_JSON`, `VALIDATION_ERROR` ou `BAD_REQUEST` sont affichés comme texte brut ;
- les messages utiles portés par `details.message` ou `details.flatten()` ne sont pas remontés.

Constat :
- compatibilité structurelle : oui ;
- exploitation fine des erreurs : non.

#### 6.2 Vehicles
Le module véhicules lit seulement `error` et ignore `details.message`.

Exemple notable :
- le conflit véhicule renvoie `error: "CONFLICT"` avec `details.message = "Véhicule déjà existant"` ;
- l’UI affichera `CONFLICT` et non le message métier.

Constat :
- ce n’est pas une rupture du contrat ;
- c’est une consommation partielle et peu ergonomique des erreurs harmonisées.

### 7. Conclusion méthodologique
Le dépôt prouve pour `API-05` :
- une base API/UI largement compatible sur les modules réellement présents ;
- une consommation correcte du schéma `{ ok, data }` dans la majorité des appels ;
- une consommation réelle de `details` sur certains cas critiques du planning ;
- mais aussi des écarts UI encore ouverts quand l’API fournit une information plus riche que ce que le frontend exploite.

Verdict retenu :
- **partiellement conforme**

Motif central :
- la cohérence est globalement acceptable sans refonte ;
- elle n’est pas totalement robuste ni uniformément exploitée sur tous les flux réels inspectés.
