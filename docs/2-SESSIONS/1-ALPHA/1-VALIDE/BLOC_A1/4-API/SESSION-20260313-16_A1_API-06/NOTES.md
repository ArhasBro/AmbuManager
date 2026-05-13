# NOTES

## Méthode / observations

### 1. Relecture documentaire préalable
- priorité absolue donnée à `./docs/1-master` conformément aux consignes de session ;
- prise en compte du fait que certains documents historiques mentionnent encore `docs/master` ou `docs/sessions`, mais que la structure réelle du dépôt fait foi pour cette session ;
- rappel du protocole : en cas de contradiction, `CODE > DOCUMENTATION` ;
- rappel du plan officiel : `API-06` est une **VALIDATION** du socle API ALPHA, pas une session de correction.

### 2. Point de départ factuel retenu
Les sessions antérieures imposent le cadre suivant :
- `AUTH-03` valide `role` et `companyId` dans la chaîne auth/JWT/session ;
- `TENANT-04` valide le cloisonnement multi-tenant sur le périmètre ALPHA inspecté ;
- `RBAC-09` reste `partiellement conforme`, mais sans contradiction bloquante prouvée sur les routes API du périmètre ;
- `API-01` a fixé le contrat cible ;
- `API-02` a corrigé les écarts structurels réellement ouverts ;
- `API-03` a pointé une hétérogénéité sémantique résiduelle des erreurs ;
- `API-04` a réaligné minimalement ces incohérences critiques ;
- `API-05` a laissé deux incohérences API/UI locales prouvées côté planning.

Conséquence méthodologique :
- `API-06` ne doit pas réauditer à zéro les sessions précédentes ;
- `API-06` doit seulement vérifier si, après ces jalons, le socle API ALPHA réellement présent peut être jugé globalement validé.

### 3. Lecture du code réellement ciblé
Démarche appliquée :
1. relire les deux helpers partagés `lib/api/response.ts` et `lib/api/prisma-error.ts` ;
2. relire toutes les routes API métier listées dans le cadrage de session ;
3. vérifier si les réponses renvoyées restent compatibles avec le contrat cible ;
4. contrôler ponctuellement les deux incohérences résiduelles déjà prouvées par `API-05` dans `planning-client` ;
5. distinguer les écarts de structure API des écarts de consommation UI.

### 4. Constat sur les helpers partagés
#### 4.1 `lib/api/response.ts`
Le helper définit explicitement :
- le type succès `ApiOk<T> = { ok: true; data: T }` ;
- le type erreur `ApiErr = { ok: false; error: string; details?: unknown }` ;
- les helpers `ok`, `badRequest`, `unauthorized`, `forbidden`, `notFound`, `conflict`, `serverError`.

Constat :
- le socle contractuel est explicite, stable et réutilisable ;
- plusieurs routes l’utilisent réellement ;
- ce helper suffit à matérialiser un noyau de réponse API identifiable.

#### 4.2 `lib/api/prisma-error.ts`
Le helper mappe minimalement :
- `P2002` → `409 / CONFLICT`
- `P2025` → `404 / NOT_FOUND`
- `duplicate key` → `409 / CONFLICT`

Constat :
- le mapping partagé est minimal mais cohérent avec la doctrine `API-04` ;
- son usage n’est pas universel ;
- l’existence de mappers locaux alignés dans certaines routes autoschedule n’empêche pas de reconnaître un socle commun.

### 5. Constat sur les routes métier inspectées
#### 5.1 Zone clairement alignée avec le socle
Les routes suivantes utilisent directement le helper de réponse partagé ou une structure équivalente sans écart probant de contrat :
- `health/prisma`
- `users`
- `users/[id]/reset-password`
- `vehicles`
- `planning/autoschedule/runs/[id]/match/preview`
- `planning/autoschedule/runs/[id]/match/apply`

#### 5.2 Zone non helperisée mais structurellement alignée
Les routes suivantes continuent d’utiliser `NextResponse.json` ou un mapper local, mais restent cohérentes avec le même contrat :
- `company/rules`
- `planning/shifts`
- `planning/shifts/[id]/assign`
- `planning/autoschedule/day`
- `planning/autoschedule/week`
- `planning/autoschedule/runs`
- `planning/autoschedule/runs/[id]`
- `planning/autoschedule/runs/[id]/publish`
- `planning/autoschedule/runs/[id]/cancel`
- `planning/autoschedule/runs/[id]/match` (route dépréciée mais toujours dans le contrat d’erreur)

Constat :
- l’usage du helper n’est pas exclusif ;
- mais le contrat global reste stable et identifiable ;
- les divergences restantes sont surtout d’implémentation interne, pas de forme externe du payload.

### 6. Fragilités résiduelles réellement constatées
#### 6.1 Fragilités encore présentes après `API-05`
Les deux écarts prouvés par `API-05` sont toujours visibles dans le code réel :
- `DRAFT_ALREADY_EXISTS` renvoie `details.runId` côté API, alors que `planning-client` cherche `runId` à la racine ;
- l’assignation planning renvoie `USER_OVERLAP_CONFLICT` / `VEHICLE_OVERLAP_CONFLICT`, alors que l’UI teste `USER_CONFLICT` / `VEHICLE_CONFLICT`.

Qualification retenue :
- ces écarts restent réels ;
- ils dégradent la cohérence API/UI du planning ;
- ils ne démontrent pas une rupture structurante du socle API lui-même.

#### 6.2 Dispersion résiduelle des implémentations
Constat supplémentaire :
- plusieurs routes autoschedule gardent leur fonction locale `prismaToApiError()` ;
- `company/rules` et `planning/shifts` utilisent encore `NextResponse.json` directement ;
- cette dispersion n’introduit toutefois pas, sur le périmètre inspecté, de format concurrent avéré au contrat cible.

### 7. Point de bascule du verdict
La question décisive pour `API-06` n’est pas :
- « tout est-il uniformisé parfaitement ? »

La question décisive est :
- « les fragilités restantes empêchent-elles encore de reconnaître un socle API ALPHA globalement stable et identifiable ? »

Réponse retenue après inspection :
- non.

Motif :
- les blocages structurels avaient déjà été traités par `API-02` et `API-04` ;
- `API-05` a mis en évidence des fragilités locales de consommation UI, pas une rupture du socle API ;
- sur les routes métier réellement présentes et relues, le contrat commun est désormais assez stable pour un verdict global `conforme` sur le socle API ALPHA.
