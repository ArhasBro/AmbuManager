# RESULTATS

## 1. Analyse rapide

Le matching réel a été corrigé et complété dans le périmètre strict de `MATCH-LOT-02-09`.

Le patch principal complété par le correctif minimal `FIX-01` livre :
- les variantes simples 1 / 2 / 3 ;
- un score qualité par shift ;
- un score qualité relisible au niveau du run ;
- une cohérence de variante run basée sur la dernière variante appliquée prouvable ;
- la visibilité UI correspondante.

Le cœur existant est conservé :
- équilibrage de charge ;
- composition minimale d’équipe ;
- véhicules requis ;
- multi-tenant / permissions.

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
- documents de `MATCH-01`

### Code modifié en priorité
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/planning/planning-client.tsx`
- `lib/services/planning/matching.service.ts`
- `lib/services/planning/matching-quality.ts`

### Code relu sans modification
- `lib/templates/template-rules.ts`
- `prisma/schema.prisma`
- `lib/services/planning/planning-audit.ts`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `lib/company-rules/runtime.ts`
- `lib/types/planning.ts`

## 3. Corrections / complétions réellement livrées

### Variantes simples : OUI
Le moteur et les routes prennent désormais en charge :
- `VARIANT_1`
- `VARIANT_2`
- `VARIANT_3`

`FIX-01` réaligne le libellé `VARIANT_2` avec son comportement réel : ordre stable par identifiant.

### Score qualité visible niveau run : OUI
Le run courant expose maintenant un bloc `matching` avec :
- la variante ;
- le score qualité global ;
- les sous-scores ;
- les explications ;
- les scores par shift.

La variante run est désormais résolue à partir de la dernière variante appliquée prouvable dans l’audit existant, avec fallback strict `VARIANT_1` si aucune preuve n’est disponible.

### Score qualité visible niveau shift : OUI
Le service calcule les scores par shift et la UI affiche une colonne `Score shift` dans le tableau détaillé.

### Équilibrage de charge : OUI
La logique de charge existante est maintenue et utilisée par les variantes équilibrées.

### Composition minimale d’équipe : OUI
Le patch ne supprime pas cette logique et continue d’exploiter les règles template déjà présentes.

### Véhicules requis : OUI
Le patch ne supprime pas cette logique et continue d’exploiter les contrôles de type véhicule et de restriction rôle ↔ véhicule.

### Cohérence multi-tenant / permissions : OUI
Le patch reste borné aux permissions autoschedule et au `companyId` du run.

## 4. Écarts résiduels strictement prouvés

1. La visibilité run repose sur un recalcul à la lecture du run, sans persistance dédiée en base.
2. La variante run est déduite de la dernière preuve d’application disponible dans l’audit existant ; en absence de preuve exploitable, le fallback strict reste `VARIANT_1`.
3. Le réalignement documentaire historique du registre des décisions n’est pas traité dans cette session, conformément au périmètre strict de correction code + docs de session.

## 5. Fichiers modifiés

### Code applicatif
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/planning/planning-client.tsx`
- `lib/services/planning/matching.service.ts`
- `lib/services/planning/matching-quality.ts`

### Patch
- `docs/3-patches/1-ALPHA/BLOC_A10/SESSION-20260416-02_A10_MATCH-LOT-02-09/PATCH__SESSION-20260416-02_A10_MATCH-LOT-02-09.diff`
- `docs/3-patches/1-ALPHA/BLOC_A10/SESSION-20260416-02_A10_MATCH-LOT-02-09/PATCH__SESSION-20260416-02_A10_MATCH-LOT-02-09_FIX-01.diff`
- `docs/3-patches/1-ALPHA/BLOC_A10/SESSION-20260416-02_A10_MATCH-LOT-02-09/README_PATCH.md`

### Documents de session
- `docs/2-sessions/1-ALPHA/BLOC_A10/SESSION-20260416-02_A10_MATCH-LOT-02-09/SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A10/SESSION-20260416-02_A10_MATCH-LOT-02-09/NOTES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A10/SESSION-20260416-02_A10_MATCH-LOT-02-09/EVIDENCES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A10/SESSION-20260416-02_A10_MATCH-LOT-02-09/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A10/SESSION-20260416-02_A10_MATCH-LOT-02-09/FIN_SESSION.md`

## 6. Validations réellement exécutées

Validations terminales réelles prouvées pour la session :

1. `git apply --check "docs/3-patches/1-ALPHA/BLOC_A10/SESSION-20260416-02_A10_MATCH-LOT-02-09/PATCH__SESSION-20260416-02_A10_MATCH-LOT-02-09.diff"` → **OK**
2. `git apply "docs/3-patches/1-ALPHA/BLOC_A10/SESSION-20260416-02_A10_MATCH-LOT-02-09/PATCH__SESSION-20260416-02_A10_MATCH-LOT-02-09.diff"` → **OK**
3. `npx prisma generate` → **OK**
4. `npx prisma validate` → **OK**
5. `npm run lint` → **OK**
6. `npm run build` → **OK**

## 7. Prochaine étape logique

INFORMATION NON FOURNIE — À CONFIRMER
