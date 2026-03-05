# Ambulance Manager — REGISTRE_DECISIONS

Version : V1.5.7 (MASTER)  
Date : 04/03/2026

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
- Autres permissions historiquement citées (ex : `PLANNING_EDIT`, `RULES_EDIT`, `FLEET_EDIT`, `USERS_MANAGE`) : **À CONFIRMER / non présentes dans le seed actuel**.

## 4. Décisions en attente
- Clôture 4.4 : VALIDÉ (preuves en session SESSION-20260304-01).
- Audit/logging : niveau minimal + implémentation.
- Score qualité planning : métriques + implémentation.
- Flotte & conformité : périmètre data + priorisation.

## 5. Alignement statuts (référence ETAT_GLOBAL_PROJET)
- 4.4 : VALIDÉ (DoD cochée, preuves `docs/sessions/SESSION-20260304-01/EVIDENCES.md`).
- 4.5 : VALIDÉ.
- 4.6 : EN COURS.
- 4.7 / 5.0 : À FAIRE.

## 6. Gouvernance de mise à jour
- Mettre à jour `ETAT_GLOBAL_PROJET.md` puis aligner les autres.
- Toute info non prouvée : **À CONFIRMER**.