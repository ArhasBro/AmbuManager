# Ambulance Manager — REGISTRE_DECISIONS

Version : V1.5.7 (MASTER)  
Date : 09/03/2026

## Sommaire
- [1. Rôle](#1-rôle)
- [2. Conventions API (format unique)](#2-conventions-api-format-unique)
- [3. Décisions validées](#3-décisions-validées)
- [4. Décisions en attente](#4-décisions-en-attente)
- [5. Alignement statuts (référence ETAT_GLOBAL_PROJET)](#5-alignement-statuts-référence-etat_global_projet)
- [6. Gouvernance de mise à jour](#6-gouvernance-de-mise-à-jour)
- [7. Gouvernance des patchs de session](#7-Gouvernance-des-patchs-de-session)
- [Vérifications par le code (ZIP)](#vérifications-par-le-code-zip)

## 1. Rôle
Registre unique des décisions techniques/fonctionnelles.  
Les statuts s’alignent sur `ETAT_GLOBAL_PROJET.md`.

## 2. Conventions API (format unique)
Format unique attendu :
- **Succès** : `{ ok:true, data }`
- **Erreur** : `{ ok:false, error, details? }`

## 3. Décisions validées
- Multi-tenant strict via `companyId`.
- Ordre obligatoire : **Data → Services → API → UI**.
- Format API : `{ ok:true, data } / { ok:false, error, details? }`.
- NextAuth (JWT) session enrichie (`role`, `companyId`) + RBAC/permissions.
- Planning : cancel run, reprise `runId` sur `DRAFT_ALREADY_EXISTS`, assignation validée (4.5).
- Permissions confirmées seed :
  - `PLANNING_AUTOSCHEDULE`
  - `PLANNING_AUTOSCHEDULE_PUBLISH`
- RBAC Planning (4.4) : l’endpoint publish exige la permission `PLANNING_AUTOSCHEDULE_PUBLISH` pour les rôles hors ADMIN/GERANT (référence: SESSION-20260304-01).
- UI Planning (4.4) : boutons autoschedule/publish/cancel affichés pour rôles non-admin afin de permettre les tests DoD ; l’autorité reste l’API (RBAC/401/403).
- Clôture 4.4 : VALIDÉ (preuves en session SESSION-20260304-01).
- Score qualité planning (4.6) : métriques + implémentation VALIDÉES.
  - Implémentation : `lib/services/planning/matching-quality.ts` (`computePlanningQuality`).
  - Pondérations par défaut : coverage=0.5, stability=0.3, equity=0.2.
  - Couverture : % des shifts avec `requiredRole` assignés (`MATCHED` ou `ALREADY_ASSIGNED`).
  - Stabilité : 100 - % de `USER_CONFLICT` sur shifts avec `requiredRole`.
  - Équité : score = `100 * (1 / (1 + CV))` sur la distribution des assignations par user.
  - API preview : renvoie `{ plan, quality }`.
  - UI `/planning` : affiche score + sous-scores + explications.
- DEC-20260306-01 — 4.7.1 : traçabilité planning minimale persistante VALIDÉE.
  - Modèle dédié : `PlanningAuditLog`.
  - Helper centralisé : `lib/services/planning/planning-audit.ts`.
  - Actions tracées : `AUTOSCHEDULE_RUN_CREATED`, `AUTOSCHEDULE_RUN_PUBLISHED`, `AUTOSCHEDULE_RUN_CANCELLED`, `AUTOSCHEDULE_MATCH_APPLIED`, `DRAFT_SHIFT_ASSIGNED_MANUALLY`, `SHIFT_ASSIGNED_MANUALLY`.
  - Données minimales : `companyId`, `actorUserId`, `runId`, `action`, `entityType`, `entityId`, `summary`, `payload`, `createdAt`.
  - Écriture d’audit dans la même transaction que la mutation pour les actions concernées par transaction (`publish`, `cancel`, assignations manuelles).
- DEC-20260307-01 — 4.7.2 : consultation minimale de l’audit planning VALIDÉE.
  - Lecture read-only des logs récents du run courant via enrichissement de `GET /api/planning/autoschedule/runs/[id]`.
  - Pas de route dédiée supplémentaire au premier bloc 4.7.2.
  - Pas de page historique globale au premier bloc 4.7.2.
  - Affichage UI minimal read-only de l’historique du run courant dans `/planning`.
  - Informations exposées : `createdAt`, `action`, `summary`, `actorUser`, `payload`, tri décroissant, limite courte.
- DEC-20260309-01 — Cadrage fonctionnel VALIDÉ comme base officielle produit.
  - Le document `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md` devient la base officielle produit.
  - Ce document est figé et ne doit pas être modifié sans validation explicite.
  - Pour la suite, ne pas revenir sur ce cadrage sans demande explicite.
  - La prochaine étape attendue est la refonte du plan de développement.
  - Cette refonte devra respecter strictement :
    - 1 session = 1 point clair
    - 1 fonctionnalité
    - 1 patch
    - 1 DoD
    - 1 validation

## 4. Décisions en attente
- PEND-20260306-01 — Suite 4.7 hors 4.7.2 : périmètre exact à confirmer.
- Historique/versioning planning global au-delà du run courant : niveau minimal à définir.
- Flotte & conformité : périmètre data + priorisation.
- Refonte complète de `docs/master/PLAN_DE_DEVELOPPEMENT.md` : à faire plus tard, sur la base du cadrage validé.
- Les points restant réellement ouverts du cadrage fonctionnel demeurent portés par `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md`.

## 5. Alignement statuts (référence ETAT_GLOBAL_PROJET)
- 4.4 : VALIDÉ (DoD cochée, preuves `docs/sessions/SESSION-20260304-01/EVIDENCES.md`).
- 4.5 : VALIDÉ.
- 4.6 : VALIDÉ (session `docs/sessions/SESSION-20260305-01/EVIDENCES.md`).
- 4.7 : EN COURS (4.7.1 et 4.7.2 validés, sessions `docs/sessions/SESSION-20260306-01/EVIDENCES.md` et `docs/sessions/SESSION-20260307-01/EVIDENCES.md`).
- Le cadrage fonctionnel est VALIDÉ comme base officielle produit.
- La prochaine étape attendue est la refonte du plan de développement.
- 5.0 : À FAIRE.

## 6. Gouvernance de mise à jour
- Mettre à jour `ETAT_GLOBAL_PROJET.md` puis aligner les autres.
- Toute info non prouvée : **À CONFIRMER**.
- `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md` est figé et ne doit pas être modifié sans validation explicite.

## 7. Gouvernance des patchs de session

### Statut
Validée

### Contexte
Lors des sessions de production, le patch initial peut être appliqué puis nécessiter un ou plusieurs correctifs.
La régénération d’un patch complet déjà appliqué crée un risque de double application, de conflits Git, de mauvaise traçabilité et de confusion entre code validé, correctifs résiduels et documentation finale.

### Décision
Les règles suivantes deviennent obligatoires pour toutes les sessions :

1. **Le premier patch produit pour une session est le patch principal de référence.**
   - Il correspond au livrable initial de code de la session.
   - Une fois appliqué, il ne doit pas être régénéré intégralement.

2. **Toute correction ultérieure doit être fournie sous forme de patch correctif minimal séparé.**
   - Un correctif ne doit contenir que les différences restantes à apporter.
   - Il est interdit de rejouer toute la session dans un patch complet de remplacement.

3. **Les fichiers documentaires `.md` ne doivent pas être mélangés au patch principal code.**
   - Le patch principal doit rester centré sur le code et les fichiers strictement nécessaires à l’implémentation.

4. **La documentation de session doit être livrée à la fin dans un patch documentaire séparé.**
   - Ce patch documentaire final ne doit être produit qu’après validation complète du code.
   - Il regroupe uniquement les fichiers documentaires attendus de la session.
   -Précision importante :
les fichiers documentaires de session (`SESSION.md`, `NOTES.md`, `EVIDENCES.md`, `RESULTATS.md`, `FIN_SESSION.md`) sont créés automatiquement lors de l’ouverture de session.
le fichier documentaire de patches (`README.md`) est créé automatiquement lors de l’ouverture de session.

### Conséquences
Cette règle impose désormais une séparation stricte entre :
- le patch principal code ;
- les éventuels patchs correctifs minimaux ;
- le patch documentaire final.

### Convention de nommage recommandée
- Patch principal :
  - `BASE-04.diff`
- Correctif :
  - `BASE-04_FIX-01.diff`
  - `BASE-04_FIX-02.diff`
- Documentation finale :
  - `BASE-04_DOCS.diff`

### Objectif
- éviter les conflits de réapplication ;
- améliorer la traçabilité ;
- isoler clairement les correctifs ;
- sécuriser la validation ;
- séparer proprement code et documentation.

## Vérifications par le code (ZIP)
- Matching preview/apply + UI présents (4.6) :
  - `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
  - `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
  - `app/planning/planning-client.tsx`
  - `lib/services/planning/matching-quality.ts`
- Audit planning minimal présent (4.7.1) :
  - `prisma/schema.prisma`
  - `lib/services/planning/planning-audit.ts`
  - `app/api/planning/autoschedule/day/route.ts`
  - `app/api/planning/autoschedule/week/route.ts`
  - `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
  - `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`
  - `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
  - `lib/services/planning/assign-draftshift.ts`
  - `lib/services/planning/assign-shift.ts`
- Consultation minimale audit run présente (4.7.2) :
  - `app/api/planning/autoschedule/runs/[id]/route.ts`
  - `app/planning/planning-client.tsx`