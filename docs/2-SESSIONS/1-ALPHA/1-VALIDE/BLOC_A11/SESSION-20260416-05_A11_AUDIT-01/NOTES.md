# NOTES

## Méthode / observations

Session menée strictement en mode **AUDIT** :

- relecture des documents maîtres et du protocole ;
- contrôle du code réel du ZIP fourni ;
- aucun patch code produit ;
- aucune validation terminale applicative relancée.

## Références documentaires relues

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

## Exigences cadrage A11 retenues

- `01.5 Audit renforcé des actions support`
- `06.6 Modèle d’accès à l’audit`
- `13.1 Audit planning et opérations critiques`
- `13.2 Audit des connexions`
- `13.3 Page dédiée audit`
- `13.4 Traçabilité détaillée des modifications après publication`

## Observations structurantes

### 1. Infrastructure audit réelle

Une persistance réelle existe via `PlanningAuditLog` :

- modèle Prisma présent ;
- migration SQL présente ;
- helper d’écriture central `writePlanningAudit(...)` présent.

L’audit support réutilise cette même table via `traceSupportAction(...)`.

### 2. Lecture audit run courant

La lecture d’audit du run courant est réellement exposée :

- route `GET /api/planning/autoschedule/runs/[id]` ;
- retour conditionnel de `auditLogs` ;
- affichage UI dans `app/planning/planning-client.tsx` sous “Historique du run courant”.

### 3. Couverture planning réelle

Écritures d’audit réellement trouvées pour :

- création de run autoschedule ;
- application matching auto ;
- publication de run ;
- annulation de run ;
- création manuelle de shift publié ;
- modification manuelle de shift publié ;
- annulation logique de shift publié ;
- affectation / désaffectation manuelle de `Shift` ;
- affectation / désaffectation manuelle de `DraftShift`.

### 4. Lecture audit hors run

Un historique minimal par shift existe aussi via `GET /api/planning/shifts?includeHistory=1`.

Point critique : ce flux n’est pas protégé par `AUDIT_VIEW` ; il dépend seulement des droits de consultation planning.

### 5. Modèle d’accès audit

Le dépôt contient :

- une permission dédiée `AUDIT_VIEW` ;
- un helper `canViewAudit(...)`.

Mais la cohérence est partielle :

- accès natif `ADMIN` / `GERANT` : oui ;
- accès natif support propriétaire : non prouvé et même contredit par les helpers actuels ;
- délégation `AUDIT_VIEW` : oui, mais seulement utilisée pour la lecture du run courant ;
- historique shift : exposé sans `AUDIT_VIEW`.

### 6. Audit des connexions

Aucune écriture d’audit des connexions n’a été trouvée :

- pas de table dédiée ;
- pas d’écriture d’audit au login dans `lib/auth.ts` ;
- pas de lecture dédiée associée.

### 7. Page dédiée audit

Aucune page autonome de type `app/audit/*` ou équivalent n’a été trouvée.

Le dépôt n’expose que :

- l’historique du run courant dans `/planning` ;
- l’historique minimal des shifts dans la surface planning manuel.

### 8. Audit support

Un mécanisme partiel existe :

- helper `traceSupportAction(...)` ;
- actions support sur véhicules, utilisateurs et dépôts ;
- payloads souvent détaillés avec `module`, `changedFields`, `previous`, `next`, `details`.

Mais l’ensemble reste incomplet / incohérent :

- aucune preuve d’accès natif support cohérent ;
- les helpers de permissions refusent explicitement le support global ;
- le seed support crée un compte `platformRole=SUPPORT`, `role=null`, `companyId=null` ;
- plusieurs routes exigent `companyId` et/ou un rôle métier client ;
- aucun `motif obligatoire` n’est imposé pour les actions support.

### 9. Traçabilité détaillée après publication

La traçabilité après publication est partielle :

- `SHIFT_UPDATED_MANUALLY` contient `previous` / `next` ;
- `SHIFT_ASSIGNED_MANUALLY` contient `changedFields`, `previous`, `next` ;
- `SHIFT_CANCELLED_MANUALLY` ne stocke qu’un `reason` ;
- `SHIFT_CREATED_MANUALLY` ne contient pas de bloc `previous` / `next`.

Conclusion de méthode : l’existant doit être décrit comme **partiel**, sans correction déguisée dans cette session.
