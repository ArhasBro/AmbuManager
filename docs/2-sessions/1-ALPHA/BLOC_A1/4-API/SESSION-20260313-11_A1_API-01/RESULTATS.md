# RESULTATS

## Résultats obtenus

### Verdict global retenu

Le socle API ALPHA inspecté est retenu **`partiellement conforme`**.

### Pourquoi ce verdict

Le dépôt prouve un noyau de cohérence réel :
- le cadrage officiel fixe explicitement un format cible unique ;
- un helper partagé `lib/api/response.ts` matérialise bien ce format ;
- les réponses de succès des routes métier inspectées suivent globalement `{ ok: true, data }` ;
- plusieurs routes réutilisent déjà ce helper ou sa structure.

Le verdict n’est pas `conforme` car l’audit prouve aussi :
- une adoption seulement partielle du helper partagé ;
- plusieurs chaînes concurrentes de construction d’erreurs ;
- une hétérogénéité de vocabulaire (`Unauthorized` vs `UNAUTHORIZED`, `Not found` vs `NOT_FOUND`, `Server error` vs `SERVER_ERROR`) ;
- une hétérogénéité de structure (`details`, `message`, `debug`, parfois sans enrichissement) ;
- des mappings Prisma dupliqués dans plusieurs routes ;
- l’absence totale de stratégie visible pour `422`, les validations étant renvoyées en `400`.

Le verdict n’est pas `non conforme` car :
- un format identifiable existe réellement déjà ;
- la structure de succès est déjà largement cohérente ;
- la structure globale `ok / data / error` reste dominante sur le périmètre inspecté.

Le verdict n’est pas `incomplet` car :
- les routes métier présentes sont suffisamment nombreuses pour juger l’état réel du socle API ;
- la matière probante est suffisante pour trancher.

## Réponses factuelles aux questions de session

### 1. Existe-t-il un format API homogène réellement identifiable sur le dépôt ?
Réponse : **oui, mais seulement partiellement industrialisé**.

Constat :
- le format cible est documenté ;
- un helper partagé le matérialise ;
- mais il n’est pas utilisé partout.

### 2. Les réponses de succès utilisent-elles une structure cohérente ?
Réponse : **oui, globalement**.

Constat :
- sur les routes métier inspectées, les succès suivent très majoritairement `{ ok: true, data }` ;
- ce point est nettement plus homogène que le traitement des erreurs.

### 3. Les réponses d’erreur utilisent-elles une structure cohérente ?
Réponse : **non, pas totalement**.

Constat :
- plusieurs formats concurrents coexistent ;
- les champs `details`, `message`, `debug` ne sont pas uniformisés ;
- le vocabulaire d’erreur varie selon les routes.

### 4. Les statuts HTTP réellement utilisés sont-ils cohérents avec les cas traités ?
Réponse : **globalement oui sur l’intention, mais pas homogènes sur l’implémentation**.

Constat :
- `401`, `403`, `404`, `409`, `500` sont globalement employés sur des cas pertinents ;
- mais leur payload n’est pas uniformisé.

### 5. Les cas `401`, `403`, `404`, `409`, `422`, `500` sont-ils homogènes ?
Réponse : **non**.

Constat :
- `401`, `403`, `404`, `409`, `500` existent mais avec payloads concurrents ;
- `422` n’est pas utilisé sur le périmètre inspecté.

### 6. Les validations d’entrée produisent-elles un format d’erreur cohérent ?
Réponse : **non**.

Constat :
- Zod est réellement utilisé ;
- mais il n’existe pas de mapper central ;
- les sorties observées varient entre `flatten()`, `issues`, `INVALID_BODY`, `INVALID_JSON`, `VALIDATION_ERROR`, `details.message`.

### 7. Les erreurs Prisma / base / métier réellement mappées produisent-elles un format cohérent ?
Réponse : **partiellement**.

Constat :
- des mappings existent réellement ;
- mais ils sont répartis entre un helper partagé et plusieurs implémentations locales ;
- le résultat n’est donc pas homogène.

### 8. Existe-t-il des helpers partagés de réponse API, d’erreurs API ou de mapping d’erreurs ?
Réponse : **oui, mais partiellement utilisés**.

Helpers prouvés :
- `lib/api/response.ts`
- `lib/api/prisma-error.ts`

Limite :
- plusieurs routes ne les utilisent pas et redéfinissent localement leur propre format.

### 9. Certaines routes sont-elles déjà standardisées alors que d’autres restent hétérogènes ?
Réponse : **oui**.

Routes plus standardisées :
- `health/prisma`
- `users`
- `users/[id]/reset-password`
- `vehicles`
- `match/preview`
- `match/apply`

Routes encore hétérogènes :
- `company/rules`
- `planning/shifts`
- `planning/shifts/[id]/assign`
- la majorité du bloc `planning/autoschedule/*`

### 10. Existe-t-il une contradiction prouvée entre le cadrage officiel et le code réel ?
Réponse : **oui, partielle mais réelle**.

Constat :
- le cadrage officiel attend un format unique ;
- le code réel montre encore plusieurs styles de réponses, surtout côté erreurs.

## Liste exacte des fichiers code modifiés

Aucun fichier code modifié.

## Documents produits / mis à jour

### Documentation de session
- `docs/2-sessions/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-11_A1_API-01/SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-11_A1_API-01/NOTES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-11_A1_API-01/EVIDENCES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-11_A1_API-01/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-11_A1_API-01/FIN_SESSION.md`

### Dossier patch
- `docs/3-patches/1-ALPHA/BLOC_A1/4-API/SESSION-20260313-11_A1_API-01/NO_PATCH.md`

## Patch / contenu produit

Mode retenu : **`NO_PATCH`**.

Aucun contenu patch produit :
- aucun `.diff` ;
- aucun `README_PATCH.md` ;
- aucune correction code.

## Vérifications techniques réellement exécutées

- relecture des documents `.md` demandés avec priorité à `docs/1-master` ;
- inspection statique du code réel ;
- recherche textuelle ciblée des formes de réponses API ;
- `npm run lint` ;
- `npm run build`.

## Vérifications techniques et résultats réels

- `npm run lint` : **échec**
  - `sh: 1: eslint: not found`
- `npm run build` : **échec**
  - `sh: 1: next: not found`

## Conclusion

Le dépôt a déjà commencé à converger vers un format API commun, surtout sur la structure de succès et sur quelques routes helperisées.
En revanche, le traitement des erreurs reste encore trop hétérogène pour parler d’un socle API pleinement unifié sur ALPHA.

Verdict final retenu : **`partiellement conforme`**.
