# 1 - Session

## 1. Identification

- Session : CADRAGE-PERMISSIONS-MANQUANTES
- Date : 18/06/2026
- Phase : 1-ALPHA
- Bloc : BLOC_T4_RBAC_UI_API
- Nature : DX
- Type metier : CADRAGE
- Intitule : Cadrage permissions manquantes

## 2. Contexte

Projet : Ambulance Manager.

Le repo officiel reste la source technique de verite. Base44 sert uniquement de reference fonctionnelle et visuelle.

Cette session est un cadrage documentaire. Elle fige les arbitrages T4 restants sur les permissions manquantes, dormantes ou reportees, sans modifier le catalogue, le code, l'API, Prisma, les routes, les MASTER ou le RBAC effectif.

## 3. Objectif unique

Documenter les decisions T4 restantes, rattacher les sujets hors perimetre aux blocs futurs concernes, et preparer les corrections ciblees sans produire de correction applicative.

## 4. Perimetre autorise

- Lire les MASTER utiles au cadrage T4.
- Lire la session d'audit T4 precedente.
- Lire les fiches fonctionnelles utiles pour societes, depots/bases, utilisateurs, vehicules, planning et audit.
- Lire la reference Base44 `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/lib/userPermissions.js`.
- Produire une synthese des arbitrages, un tableau de decision par sujet, un tableau des impacts, un tableau des reports hors T4 et une recommandation de rattachement futur.
- Modifier uniquement les fichiers de cette nouvelle session.

## 5. Perimetre interdit

- Toute correction de code ou de documentation maitresse.
- Toute modification de `app/`, `app/api/`, `lib/`, `prisma/`, `scripts/`, `docs/1-MASTER/`, `package.json`, `package-lock.json` ou `next.config.ts`.
- Toute modification du RBAC effectif.
- Toute creation de permission.
- Toute reouverture des arbitrages T4 deja valides hors points explicitement demandes.

## 6. Fichiers a lire

- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-09_DX_T4_AUDIT-MATRICE-RBAC/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-09_DX_T4_AUDIT-MATRICE-RBAC/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-09_DX_T4_AUDIT-MATRICE-RBAC/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T4_RBAC_UI_API/SESSION-20260618-09_DX_T4_AUDIT-MATRICE-RBAC/PATCH/NO_PATCH.md`
- `docs/1-MASTER/3-FONCTIONNALITES/LISTE_FONCTIONNALITES_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/4-FONCTIONNALITES_DETAILLEES_PLANNING_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/5-FONCTIONNALITES_DETAILLEES_UTILISATEURS_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/6-FONCTIONNALITES_DETAILLEES_VEHICULES_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/7-FONCTIONNALITES_DETAILLEES_DEPOTS_BASES_V1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/8-FONCTIONNALITES_DETAILLEES_SOCIETE_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/10-FONCTIONNALITES_DETAILLEES_AUDIT_V1.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/README_BASE44_REFERENCE.md`
- `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/src/lib/userPermissions.js`

## 7. Fichiers modifiables

- `1-SESSION.md`
- `2-PREUVES.md`
- `3-FIN_DE_SESSION.md`
- `PATCH/NO_PATCH.md`

## 8. Fichiers a ne pas modifier

- `app/**`
- `app/api/**`
- `lib/**`
- `prisma/**`
- `scripts/**`
- `docs/1-MASTER/**`
- `package.json`
- `package-lock.json`
- `next.config.ts`
- toute session precedente
- tout fichier hors dossier de la nouvelle session

## 9. Livrable attendu

Une session DX de cadrage complete contenant :

- une synthese des arbitrages T4 restants ;
- un tableau de decision par sujet ;
- un cadrage specifique pour `DEPOTS_MANAGE` ;
- un cadrage specifique pour `COMPANY_MANAGE` ;
- un cadrage specifique pour le reset password administratif ;
- un cadrage specifique pour la regle `archive-only` ;
- un cadrage specifique pour la disponibilite vehicule avancee ;
- un cadrage specifique pour `ROLES_PERMISSIONS_MANAGE` ;
- un tableau des reports hors T4 ;
- une orientation des corrections futures vers `CX_T4_CORRECTION-RBAC-REFERENTIELS` et `CX_T4_CORRECTION-RBAC-VEHICULES` ;
- une justification claire de non-production de patch dans `PATCH/NO_PATCH.md` ;
- un verdict final explicite.

## 10. Controles attendus

- Verifier que l'objectif unique est respecte.
- Verifier que la session est bien DX.
- Verifier que le type metier est bien CADRAGE.
- Verifier que le champ `Session` vaut exactement `CADRAGE-PERMISSIONS-MANQUANTES`.
- Verifier l'absence de prefixe `DX_T4_` dans le champ `Session`.
- Verifier l'absence de doublon `DX_T4_DX_T4`.
- Verifier que la session est creee dans `BLOC_T4_RBAC_UI_API`.
- Verifier qu'aucun code applicatif n'est modifie.
- Verifier que `PATCH/NO_PATCH.md` existe.
- Verifier qu'aucun `.diff` applicatif n'est produit.
- Verifier que `git status --short` est fourni avant et apres.
- Verifier que les arbitrages sont classes et rattaches aux blocs futurs.
- Verifier que `DEPOTS_MANAGE`, `COMPANY_MANAGE`, le reset password, la regle archive-only, la disponibilite vehicule avancee et `ROLES_PERMISSIONS_MANAGE` sont cadres.

## 11. Criteres de validation

- Session DX creee au bon emplacement.
- Session code conforme.
- Aucun fichier applicatif ou MASTER modifie.
- Aucun patch applicatif produit.
- Dossier de session complet avec preuves et verdict.

## 12. Points a confirmer

- Les corrections futures n'ont pas vocation a etre executees dans cette session.
- Les decisions qui restent en `INFORMATION NON FOURNIE — À CONFIRMER` devront etre traitees dans les blocs futurs concernes.
