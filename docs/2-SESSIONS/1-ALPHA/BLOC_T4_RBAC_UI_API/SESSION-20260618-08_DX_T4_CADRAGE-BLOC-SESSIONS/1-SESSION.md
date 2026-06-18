# 1 - Session

## 1. Identification

- Session : CADRAGE-BLOC-SESSIONS
- Date : 18/06/2026
- Phase : 1-ALPHA
- Bloc : BLOC_T4_RBAC_UI_API
- Nature : DX
- Type metier : AUDIT+CADRAGE
- Intitule : Cadrage du bloc T4 et de ses sessions

## 2. Contexte

Projet : Ambulance Manager.

Le repo officiel reste la source technique de verite. Base44 reste une reference fonctionnelle, visuelle et metier uniquement.

Les blocs T1, T2 et T3 sont consideres comme clotures ou valides par decision projet. Cette session ne les reouvre pas.

## 3. Objectif unique

Analyser la coherence du bloc T4 et de ses sessions avant demarrage, verifier si le decoupage est suffisant, identifier les sessions manquantes, trop larges, redondantes ou a reporter, puis produire les questions d arbitrage necessaires.

## 4. Perimetre autorise

- Lire les documents MASTER lies au plan, au decoupage des blocs et aux fonctionnalites.
- Lire les sessions amont utiles pour comprendre le niveau de granularite attendu.
- Lire `lib/permission-catalog.ts`, `lib/permissions.ts`, `lib/rbac.ts` et les helpers de support / audit.
- Lire les routes et pages sensibles de `app/` et `app/api/` en lecture seule.
- Lire `scripts/quality/` pour comprendre les controles disponibles.
- Lire Base44 comme reference fonctionnelle, metier et visuelle uniquement.
- Produire une recommandation de plan de sessions et une liste de questions d arbitrage.

## 5. Perimetre interdit

- Aucun correctif code.
- Aucun patch applicatif.
- Aucune modification de `app/`, `app/api/`, `lib/`, `scripts/quality/`, `docs/1-MASTER/`.
- Aucun build, aucun dev server, aucun navigateur, aucune capture.
- Aucune modification du RBAC effectif.

## 6. Livrable attendu

Cette session produit un plan de sessions recommande + questions a arbitrer.

Le dossier de session contient uniquement :

- `1-SESSION.md`
- `2-PREUVES.md`
- `3-FIN_DE_SESSION.md`
- `PATCH/NO_PATCH.md`

