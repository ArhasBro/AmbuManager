# EVIDENCES

## Sources utilisées

### Documentation projet
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`

### Sessions / patchs A11 relus
- `docs/2-sessions/1-ALPHA/BLOC_A11/SESSION-20260416-05_A11_AUDIT-01/*`
- `docs/2-sessions/1-ALPHA/BLOC_A11/SESSION-20260416-06_A11_AUDIT-LOT-02-09/*`
- `docs/2-sessions/1-ALPHA/BLOC_A11/SESSION-20260416-07_A11_AUDIT-10/*`
- `docs/2-sessions/1-ALPHA/BLOC_A11/SESSION-20260416-08_A11_CLOTURE_A11/*`
- `docs/3-patches/1-ALPHA/BLOC_A11/SESSION-20260416-05_A11_AUDIT-01/*`
- `docs/3-patches/1-ALPHA/BLOC_A11/SESSION-20260416-06_A11_AUDIT-LOT-02-09/*`
- `docs/3-patches/1-ALPHA/BLOC_A11/SESSION-20260416-07_A11_AUDIT-10/*`
- `docs/3-patches/1-ALPHA/BLOC_A11/SESSION-20260416-08_A11_CLOTURE_A11/*`

### Code contrôlé
- accès / permissions / support : `lib/permission-catalog.ts`, `lib/permissions.ts`, `lib/rbac.ts`, `lib/auth.ts`, `prisma/seed.ts`
- infrastructure / audit : `prisma/schema.prisma`, `prisma/migrations/20260306221500_add_planning_audit_log/migration.sql`, `prisma/migrations/20260416143000_add_login_audit_log/migration.sql`, `lib/services/planning/planning-audit.ts`, `lib/services/audit/audit-context.ts`, `lib/services/audit/login-audit.ts`, `lib/services/audit/support-action-trace.ts`
- lecture audit / page dédiée audit : `app/api/audit/route.ts`, `app/audit/page.tsx`, `app/audit/audit-client.tsx`, `app/api/planning/autoschedule/runs/[id]/route.ts`, `app/api/planning/shifts/route.ts`, `app/planning/page.tsx`, `app/planning/planning-client.tsx`, `app/planning/manual-planning-panel.tsx`
- couverture planning : routes autoschedule, routes shifts, `lib/services/planning/assign-draftshift.ts`, `lib/services/planning/assign-shift.ts`
- users / vehicles / depots : routes et services listés dans l’ouverture officielle

## Preuves factuelles structurées

### 1. Infrastructure persistante audit réellement exploitable
- `PlanningAuditLog` existe réellement dans `prisma/schema.prisma` et sa migration dédiée existe.
- `LoginAuditLog` existe réellement dans `prisma/schema.prisma` et sa migration dédiée existe.
- `writePlanningAudit(...)` et `writeLoginAudit(...)` écrivent réellement en base.

### 2. Audit planning réellement exploitable
- Des écritures d’audit planning sont réellement présentes pour :
  - `AUTOSCHEDULE_RUN_CREATED`
  - `AUTOSCHEDULE_MATCH_APPLIED`
  - `AUTOSCHEDULE_RUN_PUBLISHED`
  - `AUTOSCHEDULE_RUN_CANCELLED`
  - `SHIFT_CREATED_MANUALLY`
  - `SHIFT_UPDATED_MANUALLY`
  - `SHIFT_CANCELLED_MANUALLY`
  - `SHIFT_ASSIGNED_MANUALLY`
  - `DRAFT_SHIFT_ASSIGNED_MANUALLY`

### 3. Lecture d’audit du run courant réellement exploitable
- `app/api/planning/autoschedule/runs/[id]/route.ts` expose réellement `auditLogs` si `canViewAudit(...)` est vrai.
- `app/planning/planning-client.tsx` affiche réellement l’historique du run courant.

### 4. Lecture audit dédiée unifiée réellement présente, mais minimale
- `app/api/audit/route.ts` agrège réellement `PlanningAuditLog` et `LoginAuditLog`.
- La lecture est unifiée, filtrable minimalement, mais reste un écran de consultation simple.

### 5. Page dédiée audit réellement présente, mais minimale
- `app/audit/page.tsx` existe réellement et protège l’accès par `canViewAudit(...)`.
- `app/audit/audit-client.tsx` charge réellement `/api/audit` et affiche les entrées.

### 6. Audit des connexions réellement persistant
- `lib/auth.ts` écrit réellement des entrées d’audit pour :
  - utilisateur inactif ;
  - mot de passe invalide ;
  - connexion réussie.

### 7. Modèle d’accès audit partiellement cohérent
- `AUDIT_VIEW` existe réellement dans `lib/permission-catalog.ts`.
- `canViewAudit(...)` existe réellement dans `lib/permissions.ts` et ouvre la lecture au support global.
- L’historique shift est désormais réellement conditionné par `canViewAudit(...)`.
- La cohérence complète du modèle `06.6` n’est toutefois pas matérialisée de bout en bout hors lecture.

### 8. Support propriétaire / support global non cohérent de bout en bout
- `prisma/seed.ts` matérialise un support global `platformRole=SUPPORT`, `role=null`, `companyId=null`.
- Aucun modèle distinct et réellement opérable de “support propriétaire” n’est matérialisé au-delà de cette logique globale.
- Plusieurs routes métier exigent `companyId` non nul en session, ce qui bloque nativement le support global.

### 9. Lectures d’audit actuellement exposées correctement protégées
- `/api/audit` est protégé par `canViewAudit(...)`.
- `GET /api/planning/autoschedule/runs/[id]` n’expose `auditLogs` que si audit autorisé.
- `GET /api/planning/shifts?includeHistory=1` ne lit les logs que si `includeHistory === "1" && canReadAudit`.

### 10. Couverture planning réellement prouvée
- Le sous-périmètre planning est celui qui atteint la meilleure homogénéité réelle du bloc A11.
- La traçabilité après publication y est réelle sur création, édition, annulation et assignation.

### 11. Audit utilisateurs seulement partiellement prouvé
- `app/api/users/route.ts` et `app/api/users/[id]/route.ts` ne montrent pas d’écriture audit standard prouvée pour création / modification.
- Seules certaines opérations orientées support sont préparées : archivage, affectation dépôt, reset password.

### 12. Audit véhicules seulement partiellement prouvé
- Des traces `SUPPORT_*` existent pour création, suppression, mise à jour, archivage, affectation dépôt.
- Cette couverture n’est pas homogène pour les acteurs métier standards, car `traceSupportAction(...)` ne journalise que `PlatformRole.SUPPORT`.

### 13. Audit dépôts seulement partiellement prouvé
- Des traces `SUPPORT_*` existent pour création, mise à jour et archivage de dépôt.
- Même limite réelle : pas de couverture homogène des acteurs métier standards.

### 14. Audit renforcé des actions support non réellement opérable
- `traceSupportAction(...)` exige `supportReason` obligatoire.
- Les appels contrôlés à `traceSupportAction(...)` ne transmettent pas `supportReason`.
- Plusieurs routes qui déclenchent ces services ne sont pas réellement ouvertes au support global.

### 15. Transparence support / client seulement partielle
- Le client autorisé peut lire les entrées exposées.
- Mais l’opérabilité réelle des actions support modifiant les données n’est pas cohérente de bout en bout ; la transparence complète attendue n’est donc pas atteinte.

### 16. Traçabilité détaillée après publication partielle mais réelle sur planning
- Le périmètre shifts publiés est mieux tracé qu’en `AUDIT-01`.
- L’homogénéité globale du bloc A11 reste non atteinte en dehors du planning.

### 17. Cohérence code / patchs / documentation / validations
- **Code courant** : noyau A11 réellement présent.
- **Patchs A11** : `AUDIT-LOT-02-09` a effectivement ajouté le noyau minimal manquant.
- **Documentation A11** : `AUDIT-10` conclut correctement `NON VALIDÉ`, mais la présentation des validations terminales est incohérente avec la logique `NO_PATCH` et avec les validations finales documentées dans `AUDIT-LOT-02-09`.
- **Validations terminales réellement acquises** : celles de `AUDIT-LOT-02-09` prouvent la livrabilité du patch livré ; la présente session n’a relancé aucune commande.

### 18. Écarts résiduels bloquants pour la clôture définitive
Écarts strictement prouvés restant bloquants :
- modèle d’accès audit encore partiel ;
- support propriétaire / support global non cohérent de bout en bout ;
- actions support non réellement opérables ;
- `supportReason` obligatoire non câblé ;
- audit users / vehicles / depots non homogène ;
- documentation finale A11 pas totalement cohérente sur les validations terminales.

## Validations terminales réellement exécutées

### Dans la présente session `CLOTURE_A11`
Aucune commande n’a été relancée.

### Validations réellement prouvées et réutilisées pour le bloc A11
Retenues depuis `SESSION-20260416-06_A11_AUDIT-LOT-02-09` / `README_PATCH.md` :
- `git apply --check` patch principal : **OK**
- `git apply` patch principal : **OK**
- `npx prisma generate` : **OK**
- `npx prisma validate` : **OK**
- `npm run lint` : **OK**
- `npm run build` : **OK**
- `FIX-03` : `npm run build` **KO** sur `canViewAudit` manquant
- `FIX-04` : `npm run build` **OK**

### Observations sur `AUDIT-10`
`SESSION-20260416-07_A11_AUDIT-10` documente aussi une relance locale avec :
- `npx prisma validate` : **KO** (`prisma: not found`)
- `npx prisma generate` : **KO** (`prisma: not found`)
- `npm run lint` : **KO** (`eslint: not found`)
- `npm run build` : **KO** (`next: not found`)

Ces traces existent réellement dans la documentation A11, mais elles ne remplacent pas la preuve de livrabilité déjà acquise sur `AUDIT-LOT-02-09`.
