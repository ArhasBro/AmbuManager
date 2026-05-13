# RESULTATS

## 1. Analyse rapide

Le matching existant est **partiellement conforme** au cadrage A10 sur le code réel contrôlé.

Le cœur matching est bien présent :
- preview matching réel ;
- apply matching réel ;
- score qualité réel ;
- logique d’équilibrage réelle ;
- exploitation réelle de la composition minimale d’équipe ;
- exploitation réelle des véhicules requis ;
- affichage UI réel du score global avec sous-scores et explications.

Les écarts strictement prouvés restent :
- aucune variante simple 1 / 2 / 3 ;
- pas de score matérialisé au niveau du shift ;
- score run visible seulement dans le flux preview UI, pas comme donnée durable portée par le run ;
- décalage documentaire entre `REGISTRE_DECISIONS.md` / historique 4.6 et l’implémentation actuelle de `computePlanningQuality`.

## 2. Périmètre réellement contrôlé

### Documentation relue
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

### Code contrôlé en priorité
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
- `app/planning/planning-client.tsx`
- `lib/services/planning/matching.service.ts`
- `lib/services/planning/matching-quality.ts`
- `lib/templates/template-rules.ts`
- `prisma/schema.prisma`

### Complément contrôlé pour qualification stricte
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `lib/services/planning/planning-audit.ts`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `lib/company-rules/runtime.ts`
- `lib/types/planning.ts`

## 3. Conformité réelle du matching existant

### Verdicts obligatoires
- scoring qualité existant : **OUI**
- logique d’équilibre de charge : **OUI**
- composition minimale d’équipe : **OUI**
- véhicules requis : **OUI**
- variantes simples : **NON**
- score qualité visible niveau run : **PARTIEL**
- score qualité visible niveau shift : **NON**
- cohérence multi-tenant / permissions : **OUI**
- matching existant cohérent avec l’ALPHA : **PARTIEL**

### Motifs de qualification

#### Scoring qualité existant : OUI
Le scoring est réellement codé et renvoyé par la route preview.

#### Logique d’équilibre de charge : OUI
Le moteur trie les candidats employés et véhicules selon les compteurs d’affectations déjà portées par l’état courant.

#### Composition minimale d’équipe : OUI
Le moteur exploite réellement `minStaffCount`, `requiredRole` et `secondaryAllowedRoles` pour déterminer les slots requis et les pools de rôles compatibles.

#### Véhicules requis : OUI
Le moteur exploite réellement `requiredVehicleType`, la disponibilité véhicule, l’état actif et les restrictions rôle ↔ véhicule.

#### Variantes simples : NON
Le dépôt ne produit qu’un seul plan de matching. Aucune sortie multi-variantes n’est présente.

#### Score qualité visible niveau run : PARTIEL
Le score global, les sous-scores et les explications sont bien visibles dans `/planning` après preview, mais ce score n’est pas exposé comme donnée durable du run courant via `GET /api/planning/autoschedule/runs/[id]`.

#### Score qualité visible niveau shift : NON
La UI expose bien des lignes détaillées par shift/cible avec besoins, propositions et signalements, mais aucun score qualité visible par shift comme demandé par `12.4`.

#### Cohérence multi-tenant / permissions : OUI
Le matching reste borné par session, `companyId`, permissions autoschedule et filtres DB tenant-scopés.

#### Matching existant cohérent avec l’ALPHA : PARTIEL
Le cœur existe, mais le périmètre A10 n’est pas entièrement au niveau attendu par le cadrage A10 en raison des variantes absentes, de l’absence de visibilité du score au niveau shift et du décalage documentaire du score.

## 4. Écarts strictement prouvés

1. **Variantes simples absentes**
   - aucune variante 1 / 2 / 3 ;
   - aucun comparateur ;
   - aucun tableau de solutions alternatives ;
   - aucun paramètre de stratégie multiple.

2. **Score qualité par shift absent**
   - aucun objet de score par shift dans `matching-quality.ts` ;
   - aucun rendu numérique de score par shift dans `planning-client.tsx`.

3. **Score run non durable**
   - le score est calculé à la preview ;
   - il n’est pas restitué dans la lecture du run courant.

4. **Documentation historique partiellement désalignée**
   - `REGISTRE_DECISIONS.md` documente encore :
     - pondérations `coverage=0.5`, `stability=0.3`, `equity=0.2`
     - sans `vehicleCoverage`
     - stabilité historiquement décrite autour de `USER_CONFLICT`
   - le code réel calcule désormais :
     - `coverage=0.4`
     - `vehicleCoverage=0.2`
     - `stability=0.25`
     - `equity=0.15`
     - stabilité basée sur `USER_UNAVAILABLE`, `MIN_REST_CONFLICT`, `VEHICLE_UNAVAILABLE`, `ROLE_VEHICLE_RESTRICTION`

## 5. Fichiers modifiés

### Documents de session mis à jour
- `docs/2-sessions/1-ALPHA/BLOC_A10/SESSION-20260416-01_A10_MATCH-01/SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A10/SESSION-20260416-01_A10_MATCH-01/NOTES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A10/SESSION-20260416-01_A10_MATCH-01/EVIDENCES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A10/SESSION-20260416-01_A10_MATCH-01/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A10/SESSION-20260416-01_A10_MATCH-01/FIN_SESSION.md`

### Dossier patch
- `docs/3-patches/1-ALPHA/BLOC_A10/SESSION-20260416-01_A10_MATCH-01/NO_PATCH.md`
- `docs/3-patches/1-ALPHA/BLOC_A10/SESSION-20260416-01_A10_MATCH-01/README_PATCH.md`

### Code applicatif
Aucun fichier applicatif modifié.

## 6. Validations réellement exécutées

Dans cette session d’audit :
- aucune validation terminale applicative relancée ;
- aucun `git apply --check "<PATCH>"`
- aucun `git apply "<PATCH>"`
- aucun `npx prisma validate`
- aucun `npx prisma generate`
- aucun `npm run lint`
- aucun `npm run build`

Travail réellement exécuté :
- relecture documentaire maître ;
- inspection ciblée du code réel du ZIP ;
- mise à jour documentaire de session ;
- génération du ZIP documentaire final.

## 7. Prochaine étape logique

La prochaine étape logique est **`MATCH-LOT-02-09 — CORRECTION-COMPLÉTION`** avec périmètre strictement borné aux écarts prouvés par cet audit :
- réaligner la documentation et/ou le calcul du score pour supprimer le décalage réel code / docs ;
- décider puis implémenter la visibilité du score au niveau shift ;
- décider puis implémenter la visibilité durable du score au niveau run si retenue ;
- ajouter les variantes simples 1 / 2 / 3 ;
- conserver le cloisonnement multi-tenant / permissions existant.

## 8. Verdict final

- `SESSION MATCH-01 TERMINÉE : OUI`
- `NO_PATCH : OUI`
