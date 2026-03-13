# NOTES

## Méthode / observations

### 1. Relecture documentaire préalable
- priorité absolue donnée à `docs/1-master` conformément aux règles de session ;
- rappel du protocole : `CODE > DOCUMENTATION` en cas de contradiction ;
- rappel du cadre : `1 session = 1 point clair` ;
- confirmation dans le plan officiel que `API-02` est une **CORRECTION** bornée aux routes non conformes au format API cible.

### 2. Point de départ factuel repris depuis `API-01`
`API-01` a déjà établi que :
- le contrat cible existe réellement ;
- les succès sont globalement plus homogènes que les erreurs ;
- les écarts structurels encore visibles sont concentrés sur quelques routes autoschedule ;
- les champs top-level problématiques sont surtout `runId`, `message` et `debug`.

### 3. Décision de bornage pour `API-02`
Ont été retenus comme **écarts de structure** à corriger maintenant :
- `runId` au niveau racine d’une erreur `DRAFT_ALREADY_EXISTS` ;
- `message` au niveau racine d’une erreur ;
- `debug` au niveau racine d’une erreur.

N’ont pas été retenus comme cible `API-02` :
- le choix exact des libellés d’erreur (`UNAUTHORIZED` vs `Unauthorized`, etc.) ;
- l’unification exhaustive des payloads Zod ;
- la politique `422` ;
- la migration généralisée vers `lib/api/response.ts` ;
- les différences fines entre mappers Prisma locaux.

### 4. Routes réellement non conformes retenues
Routes effectivement corrigées après relecture du code réel :
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/route.ts`

Constats exacts :
- `day` et `week` exposaient `runId` au top-level sur `DRAFT_ALREADY_EXISTS` ;
- `runs/[id]`, `cancel`, `publish` exposaient `debug` au top-level sur `VALIDATION_ERROR` ;
- `publish` exposait `message` au top-level sur `RULE_CONFIG_ERROR` ;
- `match` exposait `message` au top-level sur `401`, `403` et `410 GONE`.

### 5. Stratégie de correction retenue
Patch minimal et localisé :
- conservation des statuts HTTP existants ;
- conservation des branches métier existantes ;
- déplacement sous `details` de toute information additionnelle utile au client ;
- absence de refactor transversal des helpers pour éviter d’ouvrir une refonte non demandée.

Choix concrets :
- `runId` devient `details.runId` ;
- `message` devient `details` ou `details.message` selon le cas ;
- `debug` est conservé mais déplacé sous `details.debug`.

### 6. Routes relues mais laissées intactes
Aucune modification sur :
- `company/rules`
- `planning/shifts`
- `planning/shifts/[id]/assign`
- `planning/autoschedule/runs`
- `match/preview`
- `match/apply`
- `health/prisma`
- `users`
- `users/[id]/reset-password`
- `vehicles`

Motif :
- structure déjà compatible avec `{ ok:true, data }` / `{ ok:false, error, details? }` ;
- ou différences restantes limitées au wording, non à la structure contractuelle.

### 7. Point de vigilance volontairement hors périmètre
Le code UI existant lit encore, sur certains flux planning, un `runId` top-level en cas de `DRAFT_ALREADY_EXISTS`.
Cette session ne rouvre pas l’UI conformément au périmètre imposé.
La cohérence API/UI devra donc être revalidée séparément, sans empêcher ici la remise au contrat cible côté routes.

### 8. Vérifications réellement exécutées
- relecture des documents maîtres et des sessions utiles ;
- inspection statique ciblée des routes API ;
- recherche textuelle des champs top-level non conformes ;
- correction code locale ;
- génération du patch officiel `.diff` ;
- `git apply --check` du patch sur une copie propre : `OK` ;
- application du patch sur cette copie de contrôle : `OK` ;
- `npm run lint` : `OK` ;
- `npm run build` : `OK`.
