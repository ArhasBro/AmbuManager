# RESULTATS

## Résultats obtenus

### Verdict global retenu

La cohérence API/UI sur les modules réellement présents est retenue **`partiellement conforme`**.

### Pourquoi ce verdict

Le dépôt prouve simultanément :
- une compatibilité structurelle globale avec le contrat `{ ok:true, data } / { ok:false, error, details? }` sur les modules réellement branchés ;
- une consommation correcte de `ok` et `data` sur la majorité des flux inspectés ;
- une exploitation réelle de `details` sur certains cas critiques du planning ;
- mais aussi des fragilités frontend encore ouvertes quand l’API expose une information plus riche ou des codes plus précis que ce que l’UI lit réellement.

Le verdict n’est pas `conforme` car deux incohérences API/UI sont factuellement prouvées :
- `DRAFT_ALREADY_EXISTS` expose `details.runId`, alors que l’UI attend `runId` à la racine pour la génération jour/semaine ;
- l’assignation planning renvoie `USER_OVERLAP_CONFLICT` / `VEHICLE_OVERLAP_CONFLICT`, alors que l’UI teste `USER_CONFLICT` / `VEHICLE_CONFLICT`.

Le verdict n’est pas `non conforme` car :
- la majorité des flux réels inspectés restent compatibles et exploitables ;
- les écarts prouvés ne constituent pas une rupture généralisée du socle API/UI ;
- plusieurs points relèvent d’une exploitation partielle des erreurs, non d’un contrat brisé.

## Réponses factuelles aux questions de session

### 1. Les modules UI déjà présents consomment-ils des réponses au format compatible avec le contrat API validé ?
Réponse : **oui, globalement**.

Constat :
- `reset-password-client`, `vehicles-client` et surtout `planning-client` attendent bien des réponses JSON structurées autour de `ok`, `data` et `error` ;
- aucune dépendance majeure à un ancien format pré-`API-02` n’a été prouvée sur les modules réellement présents.

### 2. L’UI teste-t-elle correctement `ok`, `data`, `error`, `details` quand ces champs existent ?
Réponse : **partiellement**.

Constat :
- `ok` et `data` sont majoritairement bien gérés ;
- `error` est bien lu ;
- `details` n’est exploité que sur certains flux du planning, surtout publish ;
- plusieurs modules ignorent `details` alors que l’API fournit une information plus précise.

### 3. Existe-t-il des modules UI qui dépendent encore d’anciens formats, de messages libres, ou d’hypothèses non garanties ?
Réponse : **oui, sur quelques hypothèses non garanties**.

Cas prouvés :
- génération jour/semaine : hypothèse `json.runId` au lieu de `json.details.runId` ;
- assignation planning : hypothèse `USER_CONFLICT` / `VEHICLE_CONFLICT` au lieu des codes réellement renvoyés ;
- `reset-password` et `vehicles` dépendent encore surtout du `error` brut et non des détails utiles.

### 4. Les erreurs API harmonisées sont-elles exploitées de façon cohérente dans l’UI, ou simplement affichées comme texte brut ?
Réponse : **les deux selon les modules**.

Constat :
- côté planning publish, plusieurs erreurs harmonisées sont réellement interprétées et converties en messages métier ;
- côté `reset-password` et `vehicles`, le plus fréquent reste l’affichage du code `error` brut (`VALIDATION_ERROR`, `BAD_REQUEST`, `CONFLICT`, etc.).

### 5. Certaines routes API sont-elles cohérentes mais leur consommation UI reste fragile ?
Réponse : **oui**.

Cas prouvés :
- `POST /api/planning/autoschedule/day`
- `POST /api/planning/autoschedule/week`
- `PATCH /api/planning/shifts/[id]/assign`
- `GET /api/planning/autoschedule/runs/[id]`

Motif :
- les routes respectent le contrat, mais certaines branches UI n’exploitent pas la bonne forme ou perdent l’information utile.

### 6. Certaines incohérences apparentes relèvent-elles d’un simple wording UI et non d’une rupture de contrat ?
Réponse : **oui**.

Exemples :
- `reset-password-client` qui affiche `BAD_REQUEST` ou `VALIDATION_ERROR` au lieu d’un message utilisateur ;
- `vehicles-client` qui affiche `CONFLICT` au lieu de `details.message = "Véhicule déjà existant"`.

Nuance :
- ces cas restent peu ergonomiques ;
- mais ils ne suffisent pas à prouver une rupture structurelle du contrat API/UI.

### 7. La cohérence API/UI est-elle globalement acceptable sur les modules réellement présents, sans exiger de refonte ?
Réponse : **oui, mais seulement partiellement**.

Constat :
- aucune refonte générale n’est justifiée par le code inspecté ;
- le socle est exploitable ;
- quelques fragilités ciblées empêchent néanmoins un verdict `conforme`.

## Routes couvertes / non couvertes UI

### Couvertes UI sur le périmètre inspecté
- `users`
- `users/[id]/reset-password`
- `vehicles`
- `company/rules`
- `planning/shifts`
- `planning/shifts/[id]/assign`
- `planning/autoschedule/day`
- `planning/autoschedule/week`
- `planning/autoschedule/runs/[id]`
- `planning/autoschedule/runs/[id]/match/preview`
- `planning/autoschedule/runs/[id]/match/apply`
- `planning/autoschedule/runs/[id]/publish`
- `planning/autoschedule/runs/[id]/cancel`

### Relues mais non couvertes UI
- `planning/autoschedule/runs`
- `planning/autoschedule/runs/[id]/match`

Statut retenu :
- **non couvert UI**, pas défaut retenu à ce titre pour `API-05`.

## Liste exacte des fichiers code modifiés

Aucun fichier code modifié.

## Documents produits / mis à jour

### Documentation de session
- `docs/2-sessions/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-15_A1_API-05/SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-15_A1_API-05/NOTES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-15_A1_API-05/EVIDENCES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-15_A1_API-05/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-15_A1_API-05/FIN_SESSION.md`

### Dossier patch
- maintien du mode `NO_PATCH`
- `docs/3-patches/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-15_A1_API-05/NO_PATCH.md`

## Patch / contenu produit

Mode retenu : **`NO_PATCH`**.

Aucun contenu patch produit :
- aucun fichier code corrigé ;
- aucun `.diff` fonctionnel ;
- aucun `README_PATCH.md` supplémentaire.

## Vérifications techniques et état de preuve

- Relecture documentaire ciblée réalisée sur les documents pertinents de `./docs`, avec priorité donnée au dossier `./docs/1-master` conformément aux règles du dépôt ;
- cartographie des appels API réellement branchés à l’UI ;
- inspection statique croisée des réponses API et de leur consommation UI.

Tentative d'exécution de vérification technique dans l'environnement extrait :
- `npm run lint` → échec (`eslint: not found`)
- `npm run build` → échec (`next: not found`)

Ces vérifications n'ont donc pas pu être exécutées dans cet environnement.

L’analyse finale repose donc sur le code réel et non sur un run applicatif exécuté.

## Conclusion

`API-05` valide un point important :
- après `API-04`, le socle métier API et la consommation UI des modules présents sont majoritairement compatibles ;
- le planning exploite réellement une partie des `details` structurés sur les cas critiques ;
- la cohérence n’est toutefois pas complète, car certaines branches UI reposent encore sur des hypothèses de forme ou de code non garanties par l’API réelle.

Verdict final retenu : **`partiellement conforme`**.
