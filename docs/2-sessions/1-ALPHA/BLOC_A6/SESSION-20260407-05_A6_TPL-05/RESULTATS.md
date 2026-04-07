# RESULTATS

## Résultat principal
**PATCH MINIMAL FOURNI — API DE CRÉATION TEMPLATES AJOUTÉE SANS ROUVRIR LA LISTE EXISTANTE**

## 1. Analyse rapide
Le dépôt contenait déjà :
- le modèle `ShiftTemplate` ;
- la permission catalogue `TEMPLATES_MANAGE` ;
- le helper runtime `canManageTemplates(...)` ;
- la route `GET /api/templates` livrée par `TPL-04`.

Le manque réel de `TPL-05` était donc uniquement l’ajout d’une création template bornée à la société courante.

## 2. Périmètre réellement traité
- `app/api/templates/route.ts`

## 3. API création template ajoutée
### Route livrée
- `POST /api/templates`

### Contrôles appliqués
- auth obligatoire via `getServerSession(authOptions)` ;
- multi-tenant strict via `companyId` de session ;
- refus de tout `companyId` client ;
- gouvernance via `canManageTemplates(...)` déjà existant ;
- body JSON obligatoire avec `INVALID_JSON` si parsing impossible ;
- validation stricte Zod avec refus des champs hors scope.

### Champs acceptés
- `name`
- `category`
- `requiredRole`
- `isActive`
- `startTime`
- `endTime`
- `crossesMidnight`

### Valeurs par défaut appliquées
- `requiredRole` → `null` si absent
- `isActive` → `true` si absent
- `crossesMidnight` → `false` si absent

### Réponse de succès
Champs renvoyés uniquement :
- `id`
- `name`
- `category`
- `requiredRole`
- `isActive`
- `startTime`
- `endTime`
- `crossesMidnight`
- `createdAt`
- `updatedAt`

`companyId` n’est pas exposé car non justifié sur ce point de création.

### Conflit métier traité
- unicité `companyId + name` mappée en `409 CONFLICT` avec message explicite.

## 4. Gouvernance d’accès réellement branchée
Aucun élargissement n’a été ajouté.
Le `POST` réutilise la gouvernance runtime déjà présente :
- accès natif `ADMIN` / `GERANT` ;
- sinon permission explicite `TEMPLATES_MANAGE` ;
- support global non ouvert.

## 5. Fichiers modifiés
- `app/api/templates/route.ts`

## 6. Validations réellement exécutées
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK

## 7. Verdict de session
**PATCH TPL-05 FOURNI — PÉRIMÈTRE CODE LIVRÉ, APPLICATION DU PATCH PROUVÉE, LINT OK, BUILD OK**

## 8. Génération des docs finaux
Livrables documentaires générés en ZIP à plat :
- `SESSION.md`
- `NOTES.md`
- `EVIDENCES.md`
- `RESULTATS.md`
- `FIN_SESSION.md`
- `README_PATCH.md`

## 9. README patch
`README_PATCH.md` généré pour formaliser :
- le patch principal code ;
- les commandes d’application ;
- la portée exacte ;
- l’état réel des validations.
