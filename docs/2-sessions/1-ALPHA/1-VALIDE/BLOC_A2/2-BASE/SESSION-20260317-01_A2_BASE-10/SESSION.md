# SESSION

## ID SESSION

`SESSION-20260317-01_A2_BASE-10`

## Date

`2026-03-17`

## Contexte

Projet : `Investissement`  
Sous-projet : `Ambulance Manager`  
Stage : `1-ALPHA`  
Bloc : `A2`  
Type : `AUDIT`  
Intitulé : `Arbitrage technique et produit du lien template ↔ base`

## Références de travail retenues

### Références documentaires prioritaires
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`
- `docs/4-templates/TEMPLATE_FIN_SESSION.md`
- `docs/3-patches/README.md`

### Références de bornage déjà acquises
- `BASE-02` : modèle Prisma `Depot`
- `BASE-03` : `POST /api/depots`
- `BASE-04` : `PATCH /api/depots/[id]`
- `BASE-05` : archivage dépôt
- `BASE-06` : UI minimale dépôts
- `BASE-07` : rattachement minimal `Vehicle -> Depot`
- `BASE-08` : rattachement minimal `User -> Depot`
- `BASE-09` : rattachement minimal `Shift -> Depot`

## Objectif exact de BASE-10

Trancher, à partir du cadrage validé et du code réel, si l’ouverture d’un lien `ShiftTemplate ↔ Depot` est :
- nécessaire maintenant ;
- utile mais prématurée ;
- inutile dans l’état actuel ;
- ou à recadrer vers un besoin plus large.

L’objectif de la session n’est pas d’implémenter, mais d’établir un arbitrage technique et produit formel.

## Périmètre exact traité

### Travail effectivement retenu
- vérification de l’existence réelle du concept `template` dans le dépôt ;
- vérification de l’état réel des modèles `ShiftTemplate`, `DraftShift`, `Shift`, `Depot` et routes planning associées ;
- comparaison métier entre `Shift -> Depot` et `ShiftTemplate -> Depot` ;
- évaluation de l’impact sur autoschedule, brouillons (`DraftShift`), publication (`Shift`), multi-tenant, auth, RBAC et UX ;
- décision d’arbitrage sur l’opportunité d’ouvrir ou non une future session d’implémentation.

### Hors périmètre explicite
- toute implémentation Prisma, API ou UI ;
- toute réouverture fonctionnelle de `BASE-01` à `BASE-09` ;
- toute ouverture directe de `BASE-11+` ;
- toute modification des documents master ;
- toute généralisation vers une refonte complète du module templates ;
- toute migration ou patch code.

## Résultat synthétique de session

Le dépôt contient bien un concept réel de template via `ShiftTemplate`, utilisé par l’autoschedule pour générer des `DraftShift`, puis par la publication pour produire des `Shift`.

En revanche, le dépôt ne montre aujourd’hui aucun lien réel `ShiftTemplate -> Depot` et aucun lien `DraftShift -> Depot`.
Le dépôt ne permet actuellement l’affectation d’un dépôt qu’au niveau du `Shift` publié.

Conséquence directe :
- un lien `template ↔ depot` ajouté seul serait techniquement possible ;
- mais il serait fonctionnellement faible tant que l’autoschedule et le niveau `DraftShift` ne deviennent pas eux aussi `depot-aware`.

L’arbitrage recommandé n’est donc **pas** “implémenter maintenant”, mais **reporter et recadrer** le sujet.

## Verdict retenu

Verdict final de la session : **`conforme`**.

### Sens du verdict retenu
Le verdict `conforme` signifie ici que :
- l’état actuel du dépôt reste compatible avec le cadrage officiel ;
- le point `04.8 Rattachement d’un template à une base` est bien identifié comme **`À CONFIRMER`** dans le cadrage ;
- l’absence actuelle de lien `template ↔ depot` n’est pas un écart à corriger immédiatement ;
- l’audit apporte une décision exploitable : **ne pas ouvrir une complétion autonome sur ce lien à ce stade**.
