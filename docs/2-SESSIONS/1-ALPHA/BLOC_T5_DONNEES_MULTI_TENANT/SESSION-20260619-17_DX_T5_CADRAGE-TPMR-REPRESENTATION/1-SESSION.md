# 1 - Session

## 1. Identification

- Session : CADRAGE-TPMR-REPRESENTATION
- Identifiant dossier : SESSION-20260619-17_DX_T5_CADRAGE-TPMR-REPRESENTATION
- Date : 19/06/2026
- Phase : 1-ALPHA
- Bloc : BLOC_T5_DONNEES_MULTI_TENANT
- Nature : DX
- Type metier : CADRAGE
- Intitule : Cadrage de la representation metier et technique TPMR / TPMR VSL / TPMR TAXI

## 2. Contexte

Projet : Ambulance Manager.

Le repo officiel reste la source technique de verite. Base44 reste une reference fonctionnelle, metier et visuelle seulement.

Cette session cadre la representation de `TPMR` avant toute creation Prisma. Elle ne doit ni trancher a la place de l utilisateur, ni appliquer automatiquement une recommandation.

## 3. Objectif unique

Comparer les options de representation de `TPMR` / `TPMR VSL` / `TPMR TAXI` avant toute creation Prisma, identifier les impacts sur `P-VEHICULES`, `P-PLANNING`, le schema futur, les API futures, les UI futures, les regles metier, les compatibilites role / activite / vehicule, les seeds et imports eventuels, puis poser les questions d arbitrage necessaires a une decision humaine.

## 4. Perimetre autorise

- Lire la gouvernance des sessions et les MASTER actifs utiles au T5.
- Lire les sessions T5 amont utiles, y compris les audits de mapping et de surfaces `companyId`.
- Lire `prisma/schema.prisma` uniquement pour cadrer l existant et les modeles impactes.
- Lire les fiches fonctionnelles vehicles et planning.
- Lire les routes, services, validators et helpers strictement utiles pour comprendre les impacts futurs.
- Comparer les options de representation sans appliquer de changement.
- Produire uniquement les fichiers de session du dossier courant.

## 5. Perimetre interdit

- Correction de code.
- Creation de code.
- Modification applicative.
- Modification de `prisma/schema.prisma`.
- Creation de modele Prisma, enum Prisma ou migration.
- Toute commande Prisma.
- Toute commande npm.
- Lancement navigateur, connexion application, Playwright, captures.
- Modification des MASTER, des fiches fonctionnelles ou des scripts.
- Application automatique de recommandations.
- Production d un patch applicatif `.diff`.

## 6. Fichiers a lire

- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-14_DX_T5_CADRAGE-BLOC-SESSIONS/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-14_DX_T5_CADRAGE-BLOC-SESSIONS/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-14_DX_T5_CADRAGE-BLOC-SESSIONS/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-15_DX_T5_AUDIT-MAPPING-ENTITES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-15_DX_T5_AUDIT-MAPPING-ENTITES/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-15_DX_T5_AUDIT-MAPPING-ENTITES/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-16_DX_T5_AUDIT-COMPANYID-SURFACES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-16_DX_T5_AUDIT-COMPANYID-SURFACES/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-16_DX_T5_AUDIT-COMPANYID-SURFACES/3-FIN_DE_SESSION.md`
- `prisma/schema.prisma`
- `docs/1-MASTER/3-FONCTIONNALITES/6-FONCTIONNALITES_DETAILLEES_VEHICULES_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/4-FONCTIONNALITES_DETAILLEES_PLANNING_V1.1.md`
- `app/vehicles/vehicles-client.tsx`
- `app/templates/templates-client.tsx`
- `app/api/planning/shifts/[id]/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `lib/templates/template-rules.ts`
- `lib/company-rules/catalog.ts`
- `prisma/seed.ts`
- `lib/imports/import-engine.ts`

## 7. Fichiers modifiables

- `1-SESSION.md`
- `2-PREUVES.md`
- `3-FIN_DE_SESSION.md`
- `PATCH/NO_PATCH.md` si la convention ou l outillage l impose.

## 8. Livrable attendu

- Cadrage comparatif des options A a E.
- Impacts separes sur `P-VEHICULES` et `P-PLANNING`.
- Impacts Prisma futurs, API futures, UI futures, regles metier, seed et imports.
- Risques, dependances, questions d arbitrage et informations non fournies.
- Recommendation preparatoire non appliquee si les elements sont suffisants.

## 9. Controles attendus

- Verifier que la session est creee dans le bon bloc T5.
- Verifier que le champ `Session` vaut exactement `CADRAGE-TPMR-REPRESENTATION`.
- Verifier l absence de doublon `DX_T5_DX_T5`.
- Verifier que le type de session est `DX`.
- Verifier que le type metier est `CADRAGE` et non `AUDIT+CADRAGE`.
- Verifier que `prisma/schema.prisma` est lu uniquement pour le cadrage.
- Verifier que les fiches vehicles et planning utiles sont lues.
- Verifier que les options de representation sont comparees.
- Verifier que les impacts `P-VEHICULES` et `P-PLANNING` sont explicites et separes.
- Verifier que les risques, dependances, questions d arbitrage et informations non fournies sont listes.
- Verifier que `git status --short` est fourni avant et apres.
- Verifier qu aucune commande Prisma, npm, navigateur ou Playwright n est executee.
- Verifier qu aucun fichier applicatif, Prisma, MASTER ou script n est modifie.
- Verifier qu aucun patch applicatif `.diff` n est cree.

## 10. Criteres de validation

- Le cadrage est exploitable pour une decision humaine.
- Les options A a E sont comparees sans decision appliquee.
- Les impacts sont distingues entre vehicule, planning, schema, API, UI, regles, seed et import.
- Les risques, dependances et questions d arbitrage sont visibles.
- Les informations non fournies restent marquees comme telles.

## 11. Points a confirmer

- `TPMR` designe-t-il un type de vehicule, une capacite, une activite, une prestation ou une contrainte de planning ? `INFORMATION NON FOURNIE - A CONFIRMER`
- `TPMR VSL` et `TPMR TAXI` doivent-ils etre representes comme deux types distincts ou comme `TPMR` + categorie vehicule existante ? `INFORMATION NON FOURNIE - A CONFIRMER`
- Le planning doit-il planifier une mission `TPMR` independamment du vehicule ? `INFORMATION NON FOURNIE - A CONFIRMER`
- Les compatibilites role / activite / vehicule doivent-elles integrer `TPMR` ? `INFORMATION NON FOURNIE - A CONFIRMER`
- Les regles societe doivent-elles piloter l autorisation ou le blocage des affectations `TPMR` ? `INFORMATION NON FOURNIE - A CONFIRMER`
- Les imports ou seeds doivent-ils prevoir cette representation ? `INFORMATION NON FOURNIE - A CONFIRMER`
- Une decision Prisma est-elle necessaire avant les futurs blocs vehicules / planning ? `INFORMATION NON FOURNIE - A CONFIRMER`
- Quelles corrections futures relevent de T5, de `P-VEHICULES`, de `P-PLANNING` ou d un bloc metier ulterieur ? `INFORMATION NON FOURNIE - A CONFIRMER`
