# RESULTATS

## Résultat principal
Verdict d’audit :
**NO_PATCH — USAGE RÉEL PARTIEL ET HÉTÉROGÈNE DES RÈGLES DANS LE MOTEUR**

## 1. Usages réels du modèle `CompanyRule`
Le code contrôlé prouve exactement quatre points d’accès réels à `CompanyRule` :
- lecture/écriture API générale : `app/api/company/rules/route.ts`
- lecture moteur manuelle : `lib/services/planning/assign-shift.ts`
- lecture moteur manuelle draft : `lib/services/planning/assign-draftshift.ts`
- lecture moteur publication : `app/api/planning/autoschedule/runs/[id]/publish/route.ts`

Aucune autre lecture/écriture réelle de `CompanyRule` n’a été trouvée par recherche dans le dépôt contrôlé.

## 2. Liste exacte des clés réellement utilisées
### Clés prouvées
- `PLANNING_MIN_REST_HOURS`
- `PLANNING_VIEW_MODE`

### Clés non prouvées
Aucune autre clé de règle n’est réellement branchée dans le code contrôlé.

## 3. Règle moteur vs préférence UI
### Vraie règle moteur
`PLANNING_MIN_REST_HOURS`
- impacte réellement le comportement planning
- lue dans les services moteur et à la publication
- s’appuie réellement sur `RuleMode`

### Simple réglage UI
`PLANNING_VIEW_MODE`
- ne pilote pas le moteur planning
- choisit seulement une variante d’affichage du planning
- reste stocké dans `CompanyRule`, mais comme préférence d’entreprise

## 4. Comportement réel de `PLANNING_MIN_REST_HOURS`
### `assign-shift`
- lit la règle dans `CompanyRule`
- convertit `value` en nombre d’heures
- compare uniquement le repos avant le shift courant
- `ALERT` ajoute un `issue`
- `BLOCK` renvoie `RULE_BLOCKED`
- valeur absente ou invalide : règle ignorée silencieusement

### `assign-draftshift`
- même logique métier que `assign-shift`
- même portée limitée au repos avant le draft courant
- même traitement silencieux des valeurs invalides

### publication autoschedule
- lit la règle dans `CompanyRule`
- `OFF` désactive explicitement la règle
- valeur invalide => `RULE_CONFIG_ERROR`
- calcule les warnings sur la timeline adjacente complète
- `BLOCK` / `BOTH` bloquent la publication
- `ALERT` autorise la publication avec warnings renvoyés

## 5. Cohérence ou divergence entre `assign-shift`, `assign-draftshift` et `publish`
### Points cohérents
- même clé `PLANNING_MIN_REST_HOURS`
- même source de données `CompanyRule`
- même idée générale de sévérité `ALERT/BLOCK/BOTH`
- même intégration multi-tenant via `companyId`

### Divergences réelles
- portée de contrôle différente :
  - manuel = repos avant le shift courant seulement
  - publish = contrôle des écarts adjacents sur la timeline
- gestion des valeurs invalides différente :
  - manuel = ignore
  - publish = erreur explicite
- exposition des alertes différente :
  - manuel = alertes calculées mais non réellement exposées au client
  - publish = warnings réellement renvoyés et affichables

## 6. Usage réel de `RuleMode`
### Réellement opérant aujourd’hui
- `BLOCK` : oui
- `BOTH` : oui, mais surtout par sa partie blocage
- `OFF` : oui comme désactivation

### Partiellement opérant aujourd’hui
- `ALERT` :
  - opérant en publication autoschedule
  - non réellement opérant côté affectation manuelle UI/API actuelle

## 7. Permission réelle nécessaire pour modifier une règle
Modification d’une règle via `PATCH /api/company/rules` :
- accès natif : `ADMIN` / `GERANT`
- sinon permission explicite : `COMPANY_RULES_MANAGE`

Lecture d’une règle via `GET /api/company/rules` :
- pas de permission de gestion requise
- session authentifiée avec `companyId` suffisante

## 8. Écarts réels avec le cadrage module 08
Le cadrage module 08 attend davantage que l’existant prouvé :
- écran métier compréhensible
- ensemble de règles ALPHA plus large
- gouvernance plus riche des règles
- modes de sévérité exploitables de façon cohérente

Dans le dépôt contrôlé :
- indisponibilité salarié : existe, mais via `UserAbsence`
- composition équipage : existe partiellement, mais en logique codée en dur selon la catégorie
- contraintes de rôle : existent partiellement via `requiredRole`
- indisponibilité véhicule / interdictions de rôles sur véhicules : non prouvées via `CompanyRule`

## 9. Fichiers contrôlés
- `prisma/schema.prisma`
- `prisma/migrations/20260226173427_add_company_rules/migration.sql`
- `app/api/company/rules/route.ts`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/assign-draftshift.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `lib/services/planning/matching.service.ts`
- `lib/services/planning/user-absence.ts`
- documents maîtres et documents méthodologiques requis

## 10. Fichiers modifiés
Aucun fichier code du dépôt n’a été modifié dans cette session d’audit.

Documents générés pour le livrable de session :
- `SESSION.md`
- `NOTES.md`
- `EVIDENCES.md`
- `RESULTATS.md`
- `FIN_SESSION.md`
- `NO_PATCH.md`

## 11. Patch retenu
Aucun patch code officiel n’est produit dans `RULES-03`.

### Pourquoi `NO_PATCH` est retenu malgré les écarts réels
- la session est une **session d’audit factuel** ;
- les écarts constatés touchent plusieurs niveaux à la fois : service moteur, contrat API, retour UI ;
- un correctif cohérent ne serait plus un simple constat d’audit, mais une vraie session de correction ciblée.

## 12. Qualification finale
### État réel retenu
**PARTIEL**

### Sens précis de ce verdict
- il existe un usage moteur réel et non théorique ;
- cet usage est limité à une seule vraie règle moteur prouvée ;
- `RuleMode` n’est pas exploité de façon homogène sur tous les chemins réellement exécutés.
