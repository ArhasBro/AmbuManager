# NOTES

## Nature de la session

Session de type **AUDIT**.
Aucun patch code n’est autorisé dans `BASE-10`.
Le travail consiste uniquement à qualifier la pertinence réelle d’un futur lien `template ↔ depot`.

## Rappel du cadrage utile

Le cadrage officiel mentionne en `04.8` :
- `Rattachement d’un template à une base` ;
- priorité : **`À CONFIRMER`** ;
- statut : **`à confirmer`** ;
- arbitrage : **point contradictoire dans l’historique, non figé**.

Conséquence méthodologique :
- l’absence actuelle de lien `template ↔ depot` n’est pas en soi une non-conformité ;
- il faut d’abord vérifier si le besoin produit est réellement mûr dans l’état actuel du planning.

## Observations sur le code réel

### 1. Le concept de template existe réellement, mais comme socle planning interne
Le dépôt contient un vrai modèle `ShiftTemplate` utilisé par :
- le seed ;
- des scripts de création / listing ;
- l’autoschedule DAY ;
- l’autoschedule WEEK ;
- la publication des runs via la trace `templateId` ;
- l’affichage du planning.

Conclusion :
- le mot `template` n’est pas théorique ;
- mais il est actuellement utilisé surtout comme **source de génération de shifts**, pas comme entité d’administration métier complète.

### 2. Il n’existe aujourd’hui aucun lien Prisma `ShiftTemplate -> Depot`
Le schéma montre :
- `Depot` relié à `Vehicle`, `User` et `Shift` ;
- `ShiftTemplate` relié à `DraftShift` et `Shift` ;
- aucun `depotId` sur `ShiftTemplate`.

Conclusion :
- aucun rattachement template/base n’existe actuellement dans le modèle.

### 3. Le dépôt n’est pris en charge qu’au niveau du shift publié
Le schéma et les routes montrent :
- `Shift.depotId` existe ;
- `PATCH /api/planning/shifts/[id]/assign` accepte `depotId` uniquement pour un `Shift` publié ;
- le même endpoint refuse explicitement `depotId` sur `DraftShift` avec `DEPOT_ASSIGNMENT_NOT_SUPPORTED_ON_DRAFT` ;
- `GET /api/planning/shifts` expose le dépôt courant ;
- `/planning` permet d’affecter une base sur le shift publié.

Conclusion :
- l’exploitation “par base” commence aujourd’hui au niveau du shift final ;
- la couche brouillon n’est pas encore base-aware.

### 4. L’autoschedule n’est pas construit autour d’un axe dépôt
Les routes d’autoschedule DAY/WEEK :
- chargent les templates actifs par `companyId` ;
- filtrent éventuellement par `category` ;
- ne prennent pas `depotId` en entrée ;
- créent des `DraftShift` sans dépôt.

Conclusion :
- le moteur courant sait générer par catégorie et période ;
- il ne sait pas générer ou segmenter par base.

### 5. Il n’existe pas encore de vrai module d’administration des templates
Le dépôt montre :
- une permission catalogue `TEMPLATES_MANAGE` ;
- aucun helper dédié dans `lib/permissions.ts` ;
- aucune page UI templates ;
- aucune route CRUD templates visible dans `app/api/**`.

Conclusion :
- ouvrir maintenant `template ↔ depot` ajouterait une dépendance sur un module encore non exposé côté produit.

## Différence métier à ne pas confondre

### Affectation d’un shift publié à une base
C’est une décision d’exploitation sur une occurrence réelle du planning.
Elle peut rester souple, être ajustée après génération, et dépendre du contexte opérationnel du jour.

### Affectation d’un template à une base
C’est une contrainte ou spécialisation structurelle en amont.
Elle influence potentiellement toutes les générations futures issues de ce template.

Conclusion :
- `Shift -> Depot` = affectation opérationnelle concrète ;
- `ShiftTemplate -> Depot` = configuration structurante de génération.

## Bénéfices produit possibles si un jour le lien est ouvert

Le lien pourrait devenir utile pour :
- spécialiser des modèles d’horaires par base ;
- réduire les affectations manuelles de dépôt après publication ;
- préparer un autoschedule multi-bases plus propre ;
- rendre le planning plus lisible si certaines tournées sont intrinsèquement rattachées à un lieu.

Mais ces bénéfices n’existent réellement que si la chaîne devient cohérente jusqu’au brouillon et à la publication.

## Risques majeurs identifiés

### Risque 1 — lien peu utile s’il reste isolé sur `ShiftTemplate`
Si seul `ShiftTemplate.depotId` est ajouté :
- les `DraftShift` générés restent sans dépôt ;
- le run brouillon n’expose pas la base ;
- la publication ne copie rien automatiquement vers `Shift.depotId` ;
- la valeur resterait surtout décorative.

### Risque 2 — duplication implicite des templates
Aujourd’hui `ShiftTemplate` est unique par `[companyId, name]`.
Si on veut des templates “mêmes noms mais bases différentes”, l’unicité actuelle devient un sujet.
Il faudrait trancher entre :
- noms globalement uniques dans la société ;
- ou nouvelle règle d’unicité intégrant le dépôt.

### Risque 3 — confusion UX
Sans module templates exploitable :
- l’utilisateur ne comprend pas où gérer ce rattachement ;
- il risque de croire que le dépôt s’appliquera automatiquement partout ;
- alors que le planning courant ne le propagerait pas jusqu’aux brouillons.

### Risque 4 — faux sentiment de compatibilité planning
Le planning actuel supporte le dépôt sur `Shift` publié, pas sur la chaîne complète `Template -> DraftShift -> Shift`.
Ajouter seulement l’amont créerait une compatibilité partielle et trompeuse.

## Arbitrage recommandé

Le sujet ne doit **pas** être ouvert maintenant comme une simple session de complétion “ajout d’un `depotId` sur `ShiftTemplate`”.

Le bon arbitrage est :
- **reporter** ;
- **recadrer** ;
- et ne rouvrir le sujet que si un besoin produit explicite de planning multi-bases basé sur les templates est confirmé.

## Ouverture éventuelle de `DraftShift`

### Si l’objectif futur est seulement documentaire
Alors `DraftShift` n’a pas besoin d’être ouvert.
Mais la valeur produit restera faible.

### Si l’objectif futur est opérationnel
Alors il faut **ouvrir aussi `DraftShift`**.
Sans cela, le dépôt ne circule pas dans le flux réel de génération.

Conclusion :
- pour un vrai usage produit, `Template ↔ Depot` implique très probablement un recadrage plus large :
  - `ShiftTemplate`
  - `DraftShift`
  - publication vers `Shift`
  - lecture UI des runs
  - éventuellement filtrage de génération.
