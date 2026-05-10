# EVIDENCES

## Sources documentaires utilisées
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

## Éléments prouvés par les documents maîtres
### Résultat attendu du bloc A5
Le plan de développement fixe pour le bloc A5 :
- règles utilisables côté produit ;
- cohérence moteur / UI / permissions ;
- base stable pour planning et autoschedule.

Le cadrage module 08 maintient cependant un état global encore **partiel** pour :
- paramètres métier en français ;
- règles métier ALPHA cadrées ;
- modes avancés `OFF / ALERT / BLOCK / BOTH` comme système cible plus large.

## Éléments prouvés par les sessions `RULES-01` à `RULES-08`
- `RULES-01` : module `company rules` réellement présent mais partiel.
- `RULES-02` : modèle `CompanyRule` / `RuleMode` conforme pour les usages réellement branchés.
- `RULES-03` : usages réels limités à `PLANNING_MIN_REST_HOURS` et `PLANNING_VIEW_MODE`.
- `RULES-04` : homogénéisation réelle de `PLANNING_MIN_REST_HOURS` entre flux manuels et publication.
- `RULES-05` : couche métier centrale minimale réellement introduite.
- `RULES-06` : API paramètres métier ALPHA réellement exposée via une couche dédiée.
- `RULES-07` : UI société réellement ajoutée pour exposer les paramètres métier ALPHA.
- `RULES-08` : gouvernance minimale réelle de `COMPANY_RULES_MANAGE` ajoutée dans le module utilisateurs.

## Éléments prouvés par le code final contrôlé

### 1. Transformation produit de `CompanyRule`
Les fichiers suivants prouvent la transformation du stockage technique vers une couche produit A5 :
- `lib/company-rules/catalog.ts`
- `lib/company-rules/api.ts`
- `app/api/company/rules/route.ts`
- `app/company/company-rules-panel.tsx`

Faits prouvés :
- existence d’un catalogue de paramètres métier A5 ;
- séparation explicite `BUSINESS_RULE` / `UI_SETTING` ;
- exposition d’une vue lisible `CompanyParameterView` ;
- édition réelle uniquement quand une clé de stockage est prouvée.

### 2. Cohérence réelle sur `PLANNING_MIN_REST_HOURS`
Les fichiers suivants prouvent l’alignement réel sur la règle métier branchée :
- `lib/company-rules/runtime.ts`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/assign-draftshift.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/company/rules/route.ts`

Faits prouvés :
- lecture centralisée par `loadMinRestCompanyRule(...)` ;
- consommation réelle dans les flux manuels et autoschedule ;
- gestion explicite des configurations invalides en mode actif ;
- persistance pilotée via la couche A5.

### 3. Conservation de `PLANNING_VIEW_MODE` hors moteur
Les fichiers suivants le prouvent :
- `lib/company-rules/catalog.ts`
- `app/planning/planning-client.tsx`
- `app/planning/page.tsx`

Faits prouvés :
- classement en `UI_SETTING` ;
- `modeUsage: FIXED_OFF` ;
- lecture / écriture comme préférence d’affichage d’entreprise ;
- absence de preuve d’un enforcement moteur lié à cette clé.

### 4. Gouvernance minimale réelle de `COMPANY_RULES_MANAGE`
Les fichiers suivants le prouvent :
- `lib/company-rules/governance.ts`
- `app/api/users/route.ts`
- `app/api/users/[id]/route.ts`
- `app/users/page.tsx`
- `app/users/user-creation-client.tsx`
- `app/users/user-edit-client.tsx`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`

Faits prouvés :
- `COMPANY_RULES_MANAGE` reste la porte d’écriture réelle ;
- la délégation de ce droit est réservée aux comptes natifs `ADMIN` / `GERANT` ;
- le flux utilisateurs rend cette gouvernance visible ;
- aucune refonte générale RBAC n’est introduite.

### 5. Résiduel prouvé retenu
Les fichiers suivants prouvent le résiduel final retenu :
- `app/company/page.tsx`
- `app/api/company/rules/route.ts`
- `lib/permissions.ts`
- `app/planning/page.tsx`

Faits prouvés :
- la page société qui embarque `CompanyRulesPanel` reste verrouillée par `role === "ADMIN" || role === "GERANT"` ;
- l’écriture réelle des règles reste pourtant pilotée par `canManageCompanyRules(...)`, donc par `COMPANY_RULES_MANAGE` ou accès natif ;
- la permission est déjà consommée côté produit dans le planning pour `PLANNING_VIEW_MODE` ;
- l’UI société A5 n’est donc pas totalement alignée sur l’autorité d’écriture réelle du bloc.

## Validations terminales réellement prouvées / relancées

### Validations terminales historiquement prouvées dans la chaîne finale A5
Sur la dernière complétion retenue du bloc (`RULES-08`) :
- `git apply --check` patch principal : OK
- `git apply` patch principal : OK
- `npm run lint` : OK
- `npm run build` : OK

### Validations relancées localement pendant `RULES-09`
Dans le ZIP fourni pour cette session :
- `npm run lint` : échec d’environnement (`eslint: not found`)
- `npm run build` : échec d’environnement (`next: not found`)

Conclusion retenue :
- les validations finales du bloc A5 restent **prouvées** par la chaîne documentaire précédente ;
- le ZIP local contrôlé pendant `RULES-09` ne permet pas de les rejouer faute de dépendances installées ;
- aucun échec relancé localement ne prouve ici un nouveau défaut code spécifique au bloc A5.
