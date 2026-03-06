# Ambulance Manager — REGISTRE_DECISIONS

Version : V1.5.7 (MASTER)  
Date : 06/03/2026

## Sommaire
- [1. Rôle](#1-rôle)
- [2. Conventions API (format unique)](#2-conventions-api-format-unique)
- [3. Décisions validées](#3-décisions-validées)
- [4. Décisions en attente](#4-décisions-en-attente)
- [5. Alignement statuts (référence ETAT_GLOBAL_PROJET)](#5-alignement-statuts-référence-etat_global_projet)
- [6. Gouvernance de mise à jour](#6-gouvernance-de-mise-à-jour)
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

## 4. Décisions en attente
- PEND-20260306-01 — Suite 4.7 hors 4.7.1 : périmètre exact à confirmer.
- Consultation UI/API de l’historique planning : niveau minimal à définir.
- Flotte & conformité : périmètre data + priorisation.

## 5. Alignement statuts (référence ETAT_GLOBAL_PROJET)
- 4.4 : VALIDÉ (DoD cochée, preuves `docs/sessions/SESSION-20260304-01/EVIDENCES.md`).
- 4.5 : VALIDÉ.
- 4.6 : VALIDÉ (session `docs/sessions/SESSION-20260305-01/EVIDENCES.md`).
- 4.7 : EN COURS (4.7.1 validé, session `docs/sessions/SESSION-20260306-01/EVIDENCES.md`).
- 5.0 : À FAIRE.

## 6. Gouvernance de mise à jour
- Mettre à jour `ETAT_GLOBAL_PROJET.md` puis aligner les autres.
- Toute info non prouvée : **À CONFIRMER**.

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
