# EVIDENCES

## Sources utilisées

### Documentation
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
- session antérieure acquise : `ORG-01`

### Code réel modifié
- `prisma/schema.prisma`
- `prisma/seed.ts`
- `prisma/migrations/20260314143000_org02_company_profile/migration.sql`

## Références documentaires déterminantes

### Cadrage officiel du profil société
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
  - module `03 — Multi-tenant / sociétés / profil société`
  - `03.2 Profil société`
  - besoin minimal explicite :
    - `nom société`
    - `nom des gérants`
    - `adresse`
    - `téléphone`
    - `SIRET`

### Ordonnancement officiel du bloc A2
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
  - `ORG-01 — AUDIT`
  - `ORG-02 — COMPLÉTION`
  - `ORG-03 — COMPLÉTION`
  - `ORG-04 — VALIDATION`

## Rappel acquis de `ORG-01`

Le constat d’audit repris comme base de vérité est le suivant :
- `Company` existait déjà réellement ;
- `name` existait déjà ;
- le profil société minimal ALPHA était insuffisamment couvert ;
- les champs manquants identifiés étaient :
  - gérants ;
  - adresse ;
  - téléphone ;
  - SIRET.

## Preuves de correction apportée

### 1. Schéma Prisma complété sur `Company`
Le modèle `Company` porte désormais explicitement les champs suivants en plus du `name` déjà existant :
- `managerNames`
- `address`
- `phone`
- `siret`

Conclusion probante :
- le modèle société couvre désormais le profil société minimal ALPHA côté schéma.

### 2. Stockage aligné par migration dédiée
Une migration Prisma dédiée a été ajoutée :
- `prisma/migrations/20260314143000_org02_company_profile/migration.sql`

Contenu fonctionnel attendu de la migration :
- ajout des colonnes `managerNames`, `address`, `phone`, `siret` sur la table `Company`.

Conclusion probante :
- le stockage est aligné sur le schéma courant dans le périmètre strict de `ORG-02`.

### 3. Seed / bootstrap réaligné
`prisma/seed.ts` a été mis à jour pour rester cohérent avec l’évolution du modèle :
- le type `SeedCompany` porte les nouveaux champs ;
- la création / mise à jour société via l’upsert inclut les nouveaux champs ;
- les sociétés seedées disposent désormais d’un profil minimal renseigné.

Conclusion probante :
- le bootstrap société reste cohérent après modification du schéma.

## Fichiers réellement modifiés

- `prisma/schema.prisma`
- `prisma/seed.ts`
- `prisma/migrations/20260314143000_org02_company_profile/migration.sql`

## Fichiers volontairement non ouverts

- toute UI liée au profil société
- toute API dédiée au profil société
- tout fichier hors besoin technique direct
- toute documentation master
- tout périmètre `ORG-03`, `ORG-04`, `BASE-*`, `SUP-*`

## Vérifications techniques validées

Résultats validés comme état réel de fin de session :
- `git apply` : **OK**
- `npm run lint` : **OK**
- `npm run build` : **OK**

## Conclusion de preuve

La matière probante suffit à conclure que `ORG-02` a bien réalisé, et seulement réalisé, les éléments suivants :
- complétion minimale de `Company` ;
- alignement stockage via migration ;
- réalignement seed ;
- aucune UI/API profil société.
