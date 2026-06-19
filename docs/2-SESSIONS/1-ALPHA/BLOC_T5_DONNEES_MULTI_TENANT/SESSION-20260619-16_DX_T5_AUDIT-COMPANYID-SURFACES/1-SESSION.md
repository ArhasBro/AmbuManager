# 1 - Session

## 1. Identification

- Session : AUDIT-COMPANYID-SURFACES
- Identifiant dossier : SESSION-20260619-16_DX_T5_AUDIT-COMPANYID-SURFACES
- Date : 19/06/2026
- Phase : 1-ALPHA
- Bloc : BLOC_T5_DONNEES_MULTI_TENANT
- Nature : DX
- Type metier : AUDIT
- Intitule : Cartographie des surfaces companyId avant correction multi-tenant

## 2. Contexte

Projet : Ambulance Manager.

Le repo officiel reste la source technique de verite. Base44 reste une reference fonctionnelle, metier et visuelle seulement.

Cette session produit une cartographie des surfaces `companyId` avant toute correction multi-tenant. Elle ne corrige rien, ne modifie pas Prisma, ne modifie pas le MASTER et ne touche pas au code applicatif.

## 3. Objectif unique

Cartographier les surfaces `companyId` avant correction multi-tenant, avec les routes, services, validators, helpers et relations Prisma concernes, sans appliquer de recommandation ni modifier le code.

## 4. Perimetre autorise

- Lire les documents MASTER actifs utiles au T5.
- Lire la methode de travail, le plan de developpement, le plan des blocs et la gouvernance des sessions.
- Lire `prisma/schema.prisma`.
- Lire les routes et handlers concernes par `companyId` dans `app/api/`.
- Lire les services concernes par `companyId` dans `lib/services/`.
- Lire les validators concernes par `companyId` dans `lib/validators/`.
- Lire les helpers utiles si la verification tenant est centralisee.
- Lire les helpers RBAC uniquement si une surface auditee croise explicitement une permission ou une action sensible.
- Classer les surfaces `companyId` par statut d audit et produire une matrice exploitable.
- Renseigner uniquement les fichiers de la session courante.

## 5. Perimetre interdit

- Correction de code.
- Creation de code.
- Modification applicative.
- Modification de `prisma/schema.prisma`.
- Toute commande Prisma.
- Modification des documents MASTER.
- Modification des fiches fonctionnelles.
- Lancement navigateur, connexion app web, captures, Playwright.
- `npm install`, `npm run dev`, `npm run build`, `npm run lint`, `npm run test:quality`.
- Creation d une session CX, FIX ou d un patch applicatif `.diff`.
- Toute modification hors du dossier de session courant.

## 6. Fichiers a lire

- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/1-MASTER/01-APPLICATION_WEB.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `prisma/schema.prisma`
- `app/api/`
- `lib/services/`
- `lib/validators/`
- `lib/permissions.ts`, `lib/rbac.ts`, `lib/permission-catalog.ts` si la surface auditee croise une action sensible ou une permission.
- `lib/company-rules/*`, `lib/planning/export.ts`, `lib/imports/import-engine.ts` et autres helpers strictement utiles a la comprehension d une surface tenant.

## 7. Fichiers modifiables

- `1-SESSION.md`
- `2-PREUVES.md`
- `3-FIN_DE_SESSION.md`
- `PATCH/NO_PATCH.md` uniquement si la convention ou l outillage l impose.

## 8. Livrable attendu

- Matrice des surfaces `companyId` avec les colonnes demandees.
- Synthese des risques multi-tenant.
- Liste des surfaces prioritaires pour futures CX de correction.
- Liste des informations non fournies.
- Questions d arbitrage si necessaire.
- Confirmation explicite qu aucune correction n a ete effectuee.

## 9. Controles attendus

- Verifier que la session est creee dans le bon bloc `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/`.
- Verifier que le champ `Session` vaut exactement `AUDIT-COMPANYID-SURFACES`.
- Verifier l absence de doublon de type `DX_T5_DX_T5`.
- Verifier que le type de session est `DX`.
- Verifier que le type metier est `AUDIT`.
- Verifier que `prisma/schema.prisma` est lu.
- Verifier que les routes, services et validators concernes par `companyId` sont lus.
- Verifier que T4/RBAC n est lu que si necessaire et justifie.
- Verifier qu aucun fichier applicatif n est modifie.
- Verifier qu aucun fichier Prisma n est modifie.
- Verifier qu aucune migration n est creee.
- Verifier qu aucune commande Prisma n est executee.
- Verifier qu aucune commande npm n est executee.
- Verifier qu aucun navigateur, capture, Playwright ou dev server n est utilise.
- Verifier que la matrice des surfaces `companyId` est produite.
- Verifier que chaque surface auditee a un statut.
- Verifier que les risques tenant sont identifies.
- Verifier que les informations non fournies sont listees.
- Verifier que les questions d arbitrage sont produites si necessaire.
- Verifier que `git status --short` est fourni avant et apres.

## 10. Criteres de validation

- La cartographie `companyId` est exploitable et prouvee.
- Les surfaces sensibles sont classees avec un statut.
- Les risques tenant sont nommes sans correction.
- Les informations non fournies restent explicites.
- Les questions d arbitrage restent ouvertes si une decision manque.
- Le perimetre reste strictement documentaire.

## 11. Points a confirmer

- Semantique de `User.companyId` nullable pour comptes globaux ou support.
- Portee globale ou tenant de `User.email` (`@unique`).
- Politique de support cross-company pour les routes `audit` et `autoschedule runs/[id]`.
- Faut-il conserver `MaintenanceType` sans surface applicative pendant cette phase.
- Faut-il laisser `health/prisma` hors perimetre d audit tenant.
