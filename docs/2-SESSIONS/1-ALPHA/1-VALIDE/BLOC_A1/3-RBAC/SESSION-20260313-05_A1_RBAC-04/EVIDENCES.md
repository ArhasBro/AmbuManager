# EVIDENCES

## Preuves documentaires utilisées

### 1. Cadrage fonctionnel `06.5`
Preuves :
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:385-410`

Constat retenu :
- le cadrage valide 18 permissions fines ALPHA ;
- `consulter audit` fait partie de cette liste mais doit être traitée séparément ;
- `RBAC-04` doit donc couvrir les 17 autres permissions hors audit.

### 2. Cadrage du plan officiel
Preuves :
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md:247-255`

Constat retenu :
- `RBAC-03` précède `RBAC-04` ;
- `RBAC-05` et `RBAC-06` réservent explicitement l’audit ;
- le séquencement officiel confirme que `RBAC-04` ne doit pas ouvrir l’audit.

### 3. Registre des décisions déjà validées
Preuves :
- `docs/1-master/REGISTRE_DECISIONS.md:28-34`

Constat retenu :
- la session enrichie `role` + `companyId` est bien validée ;
- seules les permissions `PLANNING_AUTOSCHEDULE` et `PLANNING_AUTOSCHEDULE_PUBLISH` étaient explicitement confirmées à ce stade.

### 4. Constat d’entrée hérité de `RBAC-03`
Preuves :
- `docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260313-04_A1_RBAC-03/RESULTATS.md:11-19`
- `docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260313-04_A1_RBAC-03/RESULTATS.md:25-71`

Constat retenu :
- deux permissions seulement étaient alors réellement matérialisées ;
- `annuler un run`, `gérer utilisateurs`, `gérer véhicules`, `gérer règles métier`, `modifier le planning` et `dashboard admin` restaient partiels ;
- plusieurs permissions restaient absentes ou non prouvées.

## Preuves code produites par la session

### 5. Catalogue central des permissions ALPHA hors audit
Preuves :
- `lib/permission-catalog.ts:1-91`
- `prisma/seed.ts:89-102`
- `prisma/seed.ts:170-172`

Constat retenu :
- 17 permissions hors audit sont désormais cataloguées de manière centralisée ;
- le seed les garantit toutes en base ;
- la permission dédiée audit n’est pas présente dans ce catalogue.

### 6. Absence d’invention d’une matrice seed complète
Preuves :
- `prisma/seed.ts:181-195`
- `prisma/seed.ts:223-229`
- `prisma/seed.ts:249-272`

Constat retenu :
- le seed conserve seulement les attributions déjà utiles aux scénarios existants ;
- aucune distribution arbitraire de toutes les nouvelles permissions à des rôles/utilisateurs n’a été ajoutée ;
- l’existant autoschedule reste inchangé côté seed métier.

### 7. Helpers permissionnels ajoutés / réalignés
Preuves :
- `lib/permissions.ts:4-77`

Constat retenu :
- les helpers centralisent l’accès natif `ADMIN` / `GERANT` ;
- des contrôles dédiés existent désormais pour `USERS_MANAGE`, `VEHICLES_MANAGE`, `COMPANY_RULES_MANAGE`, `PLANNING_EDIT`, `DASHBOARD_ADMIN_ACCESS` et `PLANNING_AUTOSCHEDULE_CANCEL` ;
- `PLANNING_AUTOSCHEDULE_CANCEL` conserve un fallback sur `PLANNING_AUTOSCHEDULE` pour compatibilité.

### 8. Réalignement gestion utilisateurs
Preuves :
- `app/users/page.tsx:10-30`
- `app/api/users/route.ts:24-59`
- `app/api/users/[id]/reset-password/route.ts:36-43`

Constat retenu :
- la page users, la liste users et le reset password passent désormais par `USERS_MANAGE` ;
- le bornage tenant et le périmètre fonctionnel existant sont conservés.

### 9. Réalignement gestion véhicules
Preuves :
- `app/vehicles/page.tsx:9-41`
- `app/api/vehicles/route.ts:26-61`
- `app/api/vehicles/route.ts:64-132`

Constat retenu :
- l’accès module / lecture véhicules est réaligné sur `VEHICLES_MANAGE` ;
- les mutations `POST` / `DELETE` restent `ADMIN` only ;
- la session ne surqualifie donc pas `VEHICLES_MANAGE` comme une gestion complète déjà homogène.

### 10. Réalignement règles métier
Preuves :
- `app/api/company/rules/route.ts:77-132`

Constat retenu :
- l’écriture des règles métier passe désormais par `COMPANY_RULES_MANAGE` ;
- la lecture authentifiée reste inchangée.

### 11. Réalignement modification planning
Preuves :
- `app/api/planning/shifts/[id]/assign/route.ts:31-45`

Constat retenu :
- l’assignation planning existante n’est plus seulement hardcodée par rôle ;
- elle passe désormais par `PLANNING_EDIT` ;
- cela ne suffit pas à prouver une permission distincte complète `modifier un shift publié`.

### 12. Réalignement annulation d’un run
Preuves :
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts:43-59`

Constat retenu :
- l’endpoint cancel consomme désormais un helper dédié `canCancelAutoSchedule()` ;
- la nouvelle permission distincte `PLANNING_AUTOSCHEDULE_CANCEL` est matérialisée ;
- la compatibilité avec l’ancien comportement autoschedule est conservée.

### 13. Réalignement dashboard admin
Preuves :
- `app/dashboard/page.tsx:17-47`

Constat retenu :
- le dashboard consomme désormais `DASHBOARD_ADMIN_ACCESS` pour afficher une zone admin ;
- les liens users / véhicules restent eux-mêmes conditionnés par leurs permissions respectives ;
- aucun dashboard terrain distinct n’est inventé.

## Vérifications techniques réellement exécutées

### 14. Commandes de validation usuelles
Preuves :
- exécution réelle `npm run lint`
- exécution réelle `npm run build`

Résultat :
- `npm run lint` : `OK`
- `npm run build` : `OK`

### 15. Contrôle syntaxique local complémentaire
Preuve :
- exécution réelle d’un contrôle `TypeScript transpileModule` sur tous les fichiers modifiés

Résultat :
- `OK` sur les 12 fichiers de code modifiés

Conclusion honnête :
- la syntaxe locale du patch est recontrôlée ;
- la validation complète `lint/build` est désormais prouvée sur le dépôt cible.
