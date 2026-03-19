# NOTES.md

## Points de contrôle retenus

### SUP-01
- L’audit de départ identifiait correctement l’absence initiale d’un rôle support global et d’un compte hors société.
- Cette session sert de référence historique cohérente avec l’état pré-SUP-02.

### SUP-02
- `PlatformRole.SUPPORT` existe dans le schéma.
- `User.role` et `User.companyId` sont optionnels.
- la contrainte SQL impose bien une séparation entre compte tenant et compte plateforme global.
- la session NextAuth expose `platformRole` et `isGlobalSupport`.
- aucun droit global implicite n’a été ajouté.

### SUP-03
- le seed support nominatif est présent ; il repose sur `SEED_SUPPORT_NAME`, `SEED_SUPPORT_EMAIL`, `SEED_SUPPORT_PASSWORD`.
- le compte support seedé est bien prévu avec `platformRole=SUPPORT`, `role=null`, `companyId=null`, `depotId=null`.
- la création est optionnelle si les variables support sont absentes.
- un warning explicite est prévu si la colonne `platformRole` manque en base.

### SUP-04
- les comptes support ne remontent pas dans `GET /api/users`.
- les flux client de rattachement base et de reset mot de passe ne ciblent que les utilisateurs de société (`platformRole: null` et `role != null`).
- les textes UI indiquent explicitement l’exclusion des comptes support globaux.

### SUP-05
- la fonction `traceSupportAction` existe et écrit dans `PlanningAuditLog`.
- elle ne trace que si `actorPlatformRole === SUPPORT`.
- les routes/services ciblés appellent bien cette fonction.
- mais le compte support global seedé a `companyId = null` et `role = null`.
- or les routes ciblées exigent `companyId` et refusent le support global via `requireRole(...)` sans `allowGlobalSupport` ou via `canManage*()` qui retourne `false` pour `isGlobalSupport`.
- conséquence : la traçabilité SUP-05 est câblée mais non opérationnelle pour le compte support global nominal.

## Contrôles terminaux réellement relancés
- `npx prisma validate` : échec dans cet environnement (`schema-engine` non récupérable ; erreur réseau Prisma)
- `npx prisma generate` : échec dans cet environnement (même cause)
- `npm run lint` : OK
- `npm run build` : NOK après l’échec de génération Prisma ; erreur visible sur `RuleMode` non exporté par `@prisma/client`

## Lecture de cohérence globale
- Le bloc respecte bien la séparation “support identifié mais sans droits globaux implicites”.
- Le bloc ne respecte pas encore le résultat attendu du plan sur la partie “support cadré et traçable” au sens opérable de bout en bout.
- Les documents `SUP-02` à `SUP-05` annonçant une chaîne terminale totalement verte ne sont pas reproductibles dans l’environnement courant de validation.
