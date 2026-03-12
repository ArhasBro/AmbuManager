# NOTES

Notes de travail de la session.

---

## Méthode retenue

Session de type **AUDIT** avec contrainte forte de périmètre.

Méthode appliquée :
1. relire l’attendu officiel sur le multi-tenant et le cloisonnement uniforme ;
2. cartographier la représentation réelle du tenant dans le code ;
3. suivre la chaîne complète `auth -> JWT -> session -> pages/API/services -> Prisma` ;
4. inspecter uniquement les routes réellement présentes dans le dépôt et portant des données métier ou utilisateurs ;
5. distinguer précisément :
   - mécanisme existant,
   - preuve réelle,
   - manque réel,
   - risque réel,
   - hors périmètre.

Règles appliquées :
- `CODE > DOCUMENTATION` en cas de contradiction ;
- ne pas présumer qu’un champ `companyId` suffit à lui seul ;
- ne pas conclure à une sécurité uniforme sans preuve route par route ;
- ne produire aucun correctif.

## Cadrage officiel utile

### 1. Le produit exige un multi-tenant strict
Dans `DOCUMENT_MAITRE.md` :
- le produit vise un fonctionnement multi-tenant strict ;
- principe non négociable : `Multi-tenant strict via companyId` ;
- principe non négociable : `Cloisonnement par société`.

### 2. Le registre des décisions impose le portage tenant via la session
Dans `REGISTRE_DECISIONS.md` :
- décision validée : `Multi-tenant strict via companyId` ;
- décision validée : `NextAuth (JWT) session enrichie (role, companyId)`.

### 3. Le cadrage fonctionnel confirme que l’isolation n’est pas encore prouvée partout
Dans `DOCUMENT_CADRAGE_FONCTIONNEL.md` :
- `03.1 Isolation stricte par société` = statut `partiel` ;
- arbitrage : présent dans le dépôt, mais non encore prouvé uniformément partout ;
- `18.2 Cloisonnement multi-tenant uniforme` = statut `partiel` ;
- attendu : chaque API critique doit respecter le cloisonnement société.

## Représentation réelle du tenant dans le code

### 1. Identifiant tenant observé
Constat :
- l’identifiant tenant réellement trouvé dans le dépôt est `companyId` ;
- aucune autre clé tenant active n’a été prouvée sur le périmètre inspecté.

### 2. Portage auth / JWT / session
Constat :
- `authorize()` charge `companyId` depuis Prisma ;
- le callback `jwt` hydrate `token.companyId` ;
- le callback `session` expose `session.user.companyId` ;
- `types/next-auth.d.ts` déclare `companyId` sur `Session`, `User`, `JWT`.

Conséquence :
- le tenant n’est pas seulement présent en base ;
- il est réellement propagé jusqu’aux contrôles serveur.

## Cloisonnement réellement prouvé

### 1. Persistance métier Prisma
Les modèles métier inspectés portent un `companyId` explicite :
- `User`
- `Vehicle`
- `CompanyRule`
- `ShiftTemplate`
- `MaintenanceType`
- `AutoScheduleRun`
- `DraftShift`
- `Shift`
- `PlanningAuditLog`

Constat :
- sur le périmètre métier actuellement livré, la persistance principale est largement structurée autour de `companyId`.

### 2. API users / véhicules / règles société
Constat :
- les routes inspectées exigent une session valide et un `companyId` ;
- les lectures utilisent `where: { companyId }` ou équivalent ;
- les créations prennent `companyId` depuis la session et non depuis le client ;
- les routes de reset / delete commencent par vérifier que la cible appartient bien à la société courante.

### 3. API planning
Constat :
- les routes planning inspectées relisent systématiquement `companyId` depuis la session ;
- les listes et détails sont bornés sur `companyId` ;
- les créations de runs / drafts injectent `companyId` côté serveur ;
- les services d’assignation et de matching propagent aussi `companyId` dans leurs requêtes ;
- la publication de run crée des `Shift` avec `companyId` déjà porté par les drafts.

### 4. UI réellement présente
Constat :
- `proxy.ts` protège `/dashboard`, `/vehicles`, `/planning`, `/users` ;
- `/vehicles` consomme directement `companyId` côté serveur avant lecture Prisma ;
- `/users` exige une session avec `companyId` et passe ensuite par des APIs tenantisées ;
- `/planning` ne lit pas directement la base côté page, et s’appuie donc sur le middleware + les APIs.

## Zones partielles / non uniformes

### 1. Fuite inter-tenant réellement prouvée sur la route health
Constat :
- `app/api/health/prisma/route.ts` exige bien une session admin avec `companyId` ;
- mais les données retournées proviennent de `prisma.company.count()` et `prisma.user.count()` sans filtre tenant.

Conséquence :
- un admin d’une société peut obtenir des agrégats globaux sur toutes les sociétés / tous les utilisateurs ;
- cela constitue une preuve réelle de cloisonnement non uniforme.

### 2. Mutations finales parfois bornées implicitement plutôt qu’explicitement
Exemples observés :
- reset password utilisateur : lecture cible bornée par `companyId`, puis `update({ where: { id } })` ;
- suppression véhicule : lecture bornée par `companyId`, puis `delete({ where: { id } })` ;
- cancel run : lecture bornée par `companyId`, puis `update({ where: { id } })` ;
- assignations planning : chargement borné par `companyId`, puis `update` final par `id` seul dans le service.

Constat :
- aucune fuite inter-tenant n’est prouvée par ces écritures dans l’état actuel ;
- la protection repose néanmoins sur une pré-vérification applicative et non sur un bornage uniforme de la mutation finale elle-même.

### 3. Persistance permissions non tenantisée directement
Constat :
- `Permission` et `UserPermission` ne portent pas `companyId` dans `schema.prisma` ;
- le rattachement au tenant est indirect via `userId` et le modèle `User`.

Conclusion :
- aucun accès croisé n’est prouvé ici sur le périmètre inspecté ;
- mais la persistance permissions n’exprime pas le tenant aussi explicitement que les autres modèles métier.

### 4. Cloisonnement UI partiellement délégué au middleware et aux APIs
Constat :
- `app/planning/page.tsx` ne fait pas de contrôle direct `companyId` ;
- la protection repose sur `proxy.ts` et sur les APIs planning.

Conclusion :
- la donnée n’est pas exposée directement sur cette page ;
- le cloisonnement UI y est réel mais plus indirect que sur `/vehicles`.

## Classement méthodologique final

### Conforme sur le périmètre inspecté
- portage de `companyId` dans auth / JWT / session ;
- présence de `companyId` dans la majorité des modèles métier clés ;
- lectures métier users / véhicules / règles / planning majoritairement bornées ;
- créations de données planning et véhicules basées sur le `companyId` serveur ;
- preuve réelle de consommation de `companyId` dans les pages et services inspectés.

### Partiellement conforme
- cloisonnement UI `/planning` surtout porté par middleware + APIs ;
- mutations finales parfois non bornées par `companyId` dans la requête d’écriture elle-même ;
- persistance permissions indirecte.

### Non conforme / non uniforme prouvé
- route `app/api/health/prisma/route.ts` : compteurs globaux non filtrés par tenant.

### Non prouvé dans cette session
- exhaustivité sur des modules non présents ou non encore livrés ;
- protections base de données externes (RLS, policies SQL, etc.) ;
- scénarios E2E complets multi-sociétés rejoués dans cette session.
