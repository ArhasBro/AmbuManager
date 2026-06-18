# 1 - Session

## 1. Identification

- Session : AUDIT-MATRICE-RBAC
- Date : 18/06/2026
- Phase : 1-ALPHA
- Bloc : BLOC_T4_RBAC_UI_API
- Nature : DX
- Type metier : AUDIT
- Intitule : Audit matrice RBAC UI/API T4

## 2. Contexte

Projet : Ambulance Manager.

Le repo officiel reste la source technique de verite. Base44 reste une reference fonctionnelle, metier et visuelle uniquement.

Les blocs T1, T2 et T3 restent hors reouverture. Cette session ne touche ni au code ni au MASTER.

## 3. Objectif unique

Auditer la matrice RBAC UI/API existante du bloc T4, cartographier les permissions, roles, pages, actions UI et endpoints API sensibles, relever les incoherences UI/API et confirmer que l API reste la barriere reelle de securite, sans modifier le code.

## 4. Perimetre autorise

- Lire les documents MASTER lies au plan, au decoupage des blocs et aux fonctionnalites.
- Lire les sessions amont utiles pour le cadrage T4.
- Lire `lib/permissions.ts`, `lib/permission-catalog.ts`, `lib/rbac.ts`, les helpers audit/support et les pages/API T4 en lecture seule.
- Lire `scripts/quality/` uniquement comme reference de contrat.
- Lire Base44 uniquement comme reference fonctionnelle, metier et visuelle.
- Produire les preuves d audit, les matrices RBAC et les recommandations de corrections futures ciblees.

## 5. Perimetre interdit

- Aucun correctif code.
- Aucun patch applicatif.
- Aucune modification de `app/`, `app/api/`, `lib/`, `scripts/quality/`, `docs/1-MASTER/`.
- Aucun build, aucun dev server, aucun navigateur, aucune capture.
- Aucune modification du RBAC effectif.

## 6. Livrable attendu

Cette session produit une session documentaire d audit complete avec preuves, matrices, ecarts classes, risques, recommandations futures et `PATCH/NO_PATCH.md`.

