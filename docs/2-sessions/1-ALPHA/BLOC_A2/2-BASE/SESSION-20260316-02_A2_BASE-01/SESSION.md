# SESSION

## ID SESSION

`SESSION-20260316-02_A2_BASE-01`

## Date

`2026-03-16`

## Contexte

Projet : `Investissement`  
Sous-projet : `Ambulance Manager`  
Maturité : `1-ALPHA`  
Bloc : `A2`  
Type : `AUDIT`  
Intitulé : `Audit de l’absence / présence partielle des bases/dépôts`

Cette session est un **audit documentaire et factuel** strictement borné à `BASE-01`.
Elle ne doit pas corriger le code, ne doit pas ouvrir `BASE-02+`, ne doit pas rouvrir `A1`, ne doit pas ouvrir `SUP-*`, ne doit pas traiter le multi-agences et doit conclure uniquement sur l’état réellement visible du dépôt.

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

### Historique repris sans réouverture
- acquis `ORG-*` utilisés uniquement comme bornage méthodologique ;
- aucune session `A1` n’est rouverte ;
- aucune session `BASE-02+` n’est ouverte implicitement.

### Code réel inspecté
- `prisma/schema.prisma`
- `app/api/company/profile/route.ts`
- `app/api/company/rules/route.ts`
- `app/api/users/route.ts`
- `app/api/vehicles/route.ts`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/company/page.tsx`
- `app/company/company-profile-form.tsx`
- `app/users/page.tsx`
- `app/vehicles/page.tsx`
- `app/vehicles/add-vehicle-form.tsx`
- `app/vehicles/vehicles-client.tsx`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/dashboard/page.tsx`
- `lib/permission-catalog.ts`
- `lib/permissions.ts`
- `scripts/create-shift-template.ts`
- `scripts/list-shift-templates.ts`

## Objectif exact

Établir, à partir du cadrage officiel et du code réel, si une **entité base/dépôt**, des **API dédiées**, une **UI dédiée**, des **rattachements visibles** depuis véhicules / utilisateurs / planning / templates, ou seulement des **traces partielles / ambiguës** existent déjà dans le dépôt actuel.

## Questions d’audit à trancher

- existe-t-il un modèle Prisma dédié aux bases/dépôts ?
- existe-t-il des routes API dédiées aux bases/dépôts ?
- existe-t-il une UI dédiée aux bases/dépôts ?
- existe-t-il un rattachement visible `vehicle -> base`, `user -> base`, `shift -> base` ou `template -> base` ?
- existe-t-il des noms ambigus, placeholders, reliquats legacy ou vocabulaire voisin exploitables ?
- le cadrage officiel `MODULE 04 — Bases / dépôts` est-il cohérent avec l’état réel du code ?

## Bornage de session

Hors périmètre strict :
- création du modèle `Base` / `Depot` ;
- création d’API bases/dépôts ;
- création d’UI bases/dépôts ;
- ajout de champs `baseId` sur véhicules, utilisateurs, shifts ou templates ;
- arbitrage produit du lien template ↔ base ;
- multi-agences ;
- rôle support ;
- patch de développement hors nécessité technique directe.

## Méthode appliquée

1. relecture du pack documentaire imposé avec priorité au cadrage fonctionnel ;
2. extraction du besoin officiel du `MODULE 04 — Bases / dépôts` ;
3. vérification du plan officiel `BASE-01` pour confirmer le type d’audit attendu ;
4. inspection du schéma Prisma complet pour rechercher un modèle dédié, des champs `baseId` / `depotId` / équivalents et des relations visibles ;
5. inspection ciblée des routes API réellement présentes dans `app/api/**` ;
6. inspection ciblée des écrans et formulaires réellement présents dans `app/**` ;
7. inspection du catalogue de permissions et du dashboard pour détecter un module non encore exploré ;
8. inspection des scripts templates pour vérifier l’absence de rattachement template ↔ base ;
9. recherche textuelle transversale sur le dépôt autour de `base`, `bases`, `dépôt`, `depot`, `agence`, `agency`, `site`, `location`, `branch`, `baseId`, `depotId`, `agencyId`, `siteId`, `locationId`.

## Résultat synthétique de session

Le dépôt actuel ne prouve **aucune implémentation métier exploitable** des bases/dépôts sur le périmètre `BASE-01`.

Constat consolidé :
- aucun modèle Prisma `Base`, `Depot` ou équivalent n’est visible ;
- aucun champ `baseId` / `depotId` / équivalent n’est visible sur `Vehicle`, `User`, `Shift`, `DraftShift` ou `ShiftTemplate` ;
- aucune route API dédiée aux bases/dépôts n’est visible dans `app/api/**` ;
- aucune page ou UI dédiée aux bases/dépôts n’est visible dans `app/**` ;
- aucun rattachement visible n’est matérialisé depuis véhicules, utilisateurs, planning ou templates ;
- les seules occurrences résiduelles du mot `base` dans le code inspecté sont techniques et non métier.

## Verdict retenu

Verdict final de la session : **`absent`**.
