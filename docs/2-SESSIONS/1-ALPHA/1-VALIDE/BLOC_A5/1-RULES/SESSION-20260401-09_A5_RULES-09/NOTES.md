# NOTES

## Méthode retenue
La session `RULES-09` est traitée comme une **validation de bloc hors clôture**, sans rejouer `RULES-01` à `RULES-08` et sans ouvrir `CLOTURE_A5`.

La validation a été conduite selon l’ordre suivant :
1. relecture des documents maîtres et méthodologiques requis ;
2. relecture des sessions `RULES-01` à `RULES-08` et de leur chaîne réelle de patchs ;
3. contrôle du code final réellement présent dans le ZIP ;
4. distinction stricte entre validations terminales anciennement prouvées et validations relancées localement pendant `RULES-09`.

## Réponses factuelles aux questions obligatoires

### 1. Le bloc A5 a-t-il réellement transformé `CompanyRule` en paramètres métier utilisables côté produit au niveau ALPHA ?
**Oui, partiellement.**

Transformation réellement prouvée :
- `lib/company-rules/catalog.ts` introduit une représentation produit explicite des paramètres A5 ;
- `lib/company-rules/api.ts` expose une vue lisible `CompanyParameterView` au-dessus du stockage `CompanyRule` ;
- `app/api/company/rules/route.ts` sert cette vue produit et encadre l’écriture réelle ;
- `app/company/company-rules-panel.tsx` rend les paramètres lisibles et éditables quand un stockage réel est prouvé.

Limite retenue :
- côté règles métier effectivement branchées, seule `PLANNING_MIN_REST_HOURS` est réellement moteur ;
- `PLANNING_VIEW_MODE` est volontairement maintenu comme réglage UI / exploitation ;
- les autres règles A5 restent préparées, visibles et non artificiellement présentées comme branchées.

### 2. La cohérence moteur / UI / permissions est-elle réellement atteinte sur le périmètre livré ?
**Oui sur le périmètre branché, mais pas complètement sur tout le bloc livré.**

Cohérences prouvées :
- la même clé `PLANNING_MIN_REST_HOURS` est chargée par `loadMinRestCompanyRule(...)` et consommée par les flux manuels et autoschedule ;
- `PLANNING_VIEW_MODE` reste distingué du moteur et consommé comme préférence d’entreprise dans le planning ;
- `COMPANY_RULES_MANAGE` reste la porte d’écriture réelle et sa délégation est encadrée via le module utilisateurs.

Résiduel retenu :
- l’UI société qui porte le panneau A5 est encore conditionnée par `role === "ADMIN" || role === "GERANT"` dans `app/company/page.tsx` ;
- la permission réelle d’écriture est pourtant `COMPANY_RULES_MANAGE` dans `app/api/company/rules/route.ts` / `lib/permissions.ts` ;
- le bloc n’atteint donc pas une cohérence complète UI / permission sur toute l’UI A5 livrée.

### 3. `PLANNING_MIN_REST_HOURS` est-il réellement cohérent entre manuel, API et autoschedule ?
**Oui, sur l’état final contrôlé.**

Éléments prouvés :
- l’API A5 valide et normalise la valeur via `resolveCompanyParameterWrite(...)` ;
- `loadMinRestCompanyRule(...)` centralise la lecture et le contrôle de configuration ;
- `assign-shift` et `assign-draftshift` consomment cette lecture centralisée ;
- `publish/route.ts` consomme la même lecture centralisée pour la publication autoschedule ;
- après `RULES-04`, une configuration active invalide remonte bien une erreur explicite sur les flux manuels et sur la publication.

### 4. `PLANNING_VIEW_MODE` est-il bien conservé comme réglage UI / exploitation hors moteur ?
**Oui.**

Éléments prouvés :
- `catalog.ts` le classe en `UI_SETTING` avec `modeUsage: "FIXED_OFF"` ;
- `planning-client.tsx` le lit et l’écrit comme préférence d’affichage ;
- aucun usage moteur de cette clé n’est prouvé dans les flux planning / autoschedule contrôlés.

### 5. L’API et l’UI société sont-elles réellement alignées sur la couche métier A5 ?
**Partiellement.**

Oui pour :
- la représentation métier ;
- la séparation entre règle métier branchée, réglage UI et règles préparées ;
- l’édition réelle quand une clé de stockage prouvée existe.

Non complètement pour :
- l’alignement permission / accessibilité de l’écran société ;
- un titulaire délégué de `COMPANY_RULES_MANAGE` peut disposer du droit d’écriture réel sans disposer automatiquement de l’accès à la page société qui expose le panneau A5.

### 6. La gouvernance de `COMPANY_RULES_MANAGE` est-elle réellement traitée sans refonte globale du RBAC ?
**Oui.**

Le code final prouve un encadrement ciblé et minimal :
- création / promotion `ADMIN` ou `GERANT` réservée aux gouverneurs natifs ;
- attribution / retrait de `COMPANY_RULES_MANAGE` réservée aux gouverneurs natifs ;
- l’UI utilisateurs rend cette limite visible ;
- aucune refonte générale du RBAC n’a été introduite.

### 7. Existe-t-il encore un résiduel prouvé qui empêche de considérer le bloc A5 comme conforme au résultat attendu du plan ?
**Oui.**

Résiduel retenu :
- le panneau société A5 n’est pas pleinement aligné sur la permission réelle `COMPANY_RULES_MANAGE` ;
- cette désynchronisation suffit à empêcher le verdict `conforme` pour `RULES-09`.

## Portée exacte validée
- base stable prouvée pour planning et autoschedule sur la règle réellement branchée `PLANNING_MIN_REST_HOURS` ;
- réglage d’exploitation `PLANNING_VIEW_MODE` réellement conservé hors moteur ;
- séparation lisible entre paramètres branchés et paramètres préparés ;
- gouvernance minimale du droit d’écriture réellement encadrée.

## Hors scope maintenu
- pas de clôture de bloc ;
- pas de nouvelle règle moteur ;
- pas de refonte RBAC ;
- pas d’ouverture du bloc A6 ;
- pas de rejeu des sessions `RULES-05` à `RULES-08`.
