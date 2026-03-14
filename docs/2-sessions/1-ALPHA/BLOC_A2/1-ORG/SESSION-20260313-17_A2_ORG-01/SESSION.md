# SESSION

## ID SESSION

`SESSION-20260313-17_A2_ORG-01`

## Date

`2026-03-13`

## Contexte

Projet : `Investissement`  
Sous-projet : `Ambulance Manager`  
Maturité : `1-ALPHA`  
Bloc : `A2`  
Type : `AUDIT`  
Intitulé : `Audit du modèle société existant`

Cette session est un **audit documentaire et factuel** strictement borné à `ORG-01`.
Elle ne doit pas corriger le code, ne doit produire aucun `.diff`, ne doit pas rouvrir `A1`, ne doit pas ouvrir `ORG-02`, `ORG-03`, `ORG-04`, `BASE-*` ou `SUP-*`, et doit conclure sur l’état réel du modèle société actuellement visible dans le dépôt.

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
- acquis `A1` utilisés uniquement comme base de lecture : auth/session enrichie (`role`, `companyId`), multi-tenant ALPHA, RBAC, contrat API officiel
- aucune session `A1` n’est rouverte dans `ORG-01`

### Code réel inspecté
- `prisma/schema.prisma`
- `prisma/migrations/20260224175839_init/migration.sql`
- `prisma/seed.ts`
- `lib/auth.ts`
- `types/next-auth.d.ts`
- `app/api/company/rules/route.ts`
- `app/api/health/prisma/route.ts`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- recherche transversale de tout fichier réellement présent lié à `company` / `Company`

## Objectif exact

Vérifier, à partir du code réel et du cadrage validé, l’état réel du modèle `Company` actuellement présent dans le dépôt afin de déterminer s’il couvre déjà, totalement, partiellement ou pas du tout, le besoin minimal de **profil société** prévu pour l’ALPHA.

## Questions d’audit à trancher

- quel est le modèle de données société réellement présent ?
- quels champs sont réellement portés par l’entité `Company` ?
- les champs minimaux du cadrage produit sont-ils présents ou absents :
  - nom société
  - nom des gérants
  - adresse
  - téléphone
  - SIRET
- comment la société est-elle aujourd’hui utilisée dans l’auth / session / multi-tenant ?
- existe-t-il une API dédiée au profil société ?
- existe-t-il une UI dédiée au profil société ?
- existe-t-il un seed / bootstrap société utile ?
- que faut-il classer en :
  - existant réel
  - partiel
  - manquant
- quel est le verdict final : `conforme`, `non conforme`, `incomplet` ou `à confirmer` ?

## Bornage de session

Hors périmètre strict :
- correction du schéma Prisma ;
- ajout des champs manquants ;
- création d’API profil société ;
- création d’UI profil société ;
- ouverture des bases / dépôts ;
- ouverture du rôle support ;
- modification des documents master ;
- toute validation par hypothèse.

## Méthode appliquée

1. relecture du pack documentaire demandé avec priorité absolue au cadrage fonctionnel ;
2. extraction du besoin minimal de `03.2 Profil société` ;
3. vérification du plan officiel `A2 / ORG-01` pour confirmer le type de verdict attendu ;
4. inspection statique du schéma Prisma et des migrations initiales ;
5. inspection ciblée du seed société et de l’usage réel de `companyId` dans auth/session ;
6. inspection des routes `company/*` réellement présentes ;
7. recherche transversale de toute UI, API ou lib dédiée au profil société ;
8. séparation explicite entre :
   - structure société existante ;
   - usage multi-tenant existant ;
   - réglages société existants ;
   - profil société minimal manquant.

## Résultat synthétique de session

Le dépôt prouve bien l’existence d’une **entité technique `Company`** réellement utilisée comme pivot de cloisonnement multi-tenant, de seed et de rattachement des données métier.

En revanche, le dépôt ne prouve pas l’existence d’un **profil société ALPHA exploitable** au sens du cadrage produit :
- `Company` ne porte actuellement que `id`, `name`, `createdAt`, `updatedAt` ;
- les champs minimaux attendus pour le profil société (`nom des gérants`, `adresse`, `téléphone`, `SIRET`) ne sont pas visibles dans le schéma ;
- l’auth/session ne transporte que `companyId`, pas un profil société ;
- la seule API `company` réellement visible est `app/api/company/rules/route.ts`, qui gère des règles clé/valeur et non la fiche société ;
- aucune page ou UI dédiée au profil société n’est visible dans le dépôt inspecté.

## Verdict retenu

Verdict final de la session : **`incomplet`**.
