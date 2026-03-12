# RESULTATS

## Résultats finaux de la session TENANT-01

La session `TENANT-01` conclut à un **cloisonnement multi-tenant réel mais non uniforme** sur le périmètre inspecté, avec un état final retenu à **partiellement conforme**.

---

## 1. Ce qui est réellement conforme sur le périmètre inspecté

### 1.1 Portage du tenant
Validation :
- conforme

Constat :
- le tenant réel du dépôt est `companyId` ;
- il est chargé depuis la base au login ;
- il est propagé dans le JWT puis dans `session.user` ;
- il est effectivement consommé côté serveur dans les routes et pages inspectées.

### 1.2 Persistance métier principale
Validation :
- conforme sur le périmètre audité

Constat :
- les principales entités métier déjà livrées (`User`, `Vehicle`, `CompanyRule`, `ShiftTemplate`, `MaintenanceType`, `AutoScheduleRun`, `DraftShift`, `Shift`, `PlanningAuditLog`) portent toutes `companyId`.

### 1.3 APIs métier inspectées
Validation :
- globalement conformes sur le périmètre audité

Constat :
- users, véhicules, règles société et planning relisent le `companyId` depuis la session ;
- les lectures sont majoritairement bornées par `where: { companyId }` ;
- les créations métier inspectées injectent `companyId` côté serveur ;
- les services planning propagent aussi `companyId` dans leurs contrôles de conflits et leurs écritures d’audit.

---

## 2. Ce qui est seulement partiellement conforme

### 2.1 Mutations finales parfois protégées de façon implicite
Validation :
- partiellement conforme

Constat :
- plusieurs écritures finales sont précédées d’une lecture bornée au tenant, puis exécutées avec `id` seul ;
- ce n’est pas une fuite inter-tenant prouvée en l’état ;
- ce n’est toutefois pas un bornage tenant uniforme dans la requête d’écriture elle-même.

Exemples :
- reset password utilisateur
- suppression véhicule
- cancel run
- assignations planning côté services

### 2.2 UI planning
Validation :
- partiellement conforme

Constat :
- `/planning` ne consomme pas directement `companyId` côté page ;
- la protection repose sur `proxy.ts` et sur les APIs planning ;
- le cloisonnement y est réel sur le périmètre inspecté, mais plus indirect que sur `/vehicles`.

### 2.3 Permissions
Validation :
- partiellement conforme

Constat :
- `Permission` et `UserPermission` ne portent pas `companyId` en persistance ;
- leur rattachement au tenant est indirect via `userId`.

---

## 3. Non-conformité réelle prouvée dans le périmètre inspecté

### 3.1 Route health Prisma
Validation :
- non conforme au cloisonnement uniforme attendu

Preuve :
- `app/api/health/prisma/route.ts` renvoie `prisma.company.count()` et `prisma.user.count()` sans filtre `companyId`.

Conclusion :
- un admin authentifié d’une société peut obtenir des agrégats globaux sur l’ensemble du système ;
- cela constitue une fuite inter-tenant de métadonnées agrégées.

---

## 4. Ce qui n’est pas prouvé dans cette session

### 4.1 Uniformité sur tout le futur périmètre produit
État :
- non prouvé

Raison :
- la session auditait uniquement les routes et modules réellement présents dans le dépôt fourni.

### 4.2 Protections base de données externes
État :
- `INFORMATION NON FOURNIE — À CONFIRMER`

Raison :
- aucune policy SQL / RLS / contrainte infra externe n’a été auditée ici.

### 4.3 Validation E2E multi-sociétés rejouée dans cette session
État :
- non prouvé dans cette session

Raison :
- l’audit s’appuie sur le code réel et sur les traces documentaires existantes, pas sur une campagne de test relancée ici.

---

## 5. Documents modifiés

Fichiers session mis à jour :
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260312-06_A1_TENANT-01/SESSION.md`
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260312-06_A1_TENANT-01/NOTES.md`
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260312-06_A1_TENANT-01/EVIDENCES.md`
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260312-06_A1_TENANT-01/RESULTATS.md`
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260312-06_A1_TENANT-01/FIN_SESSION.md`

Fichier patch conservé pour traçabilité documentaire :
- `docs/patches/1-ALPHA/BLOC_A1/SESSION-20260312-06_A1_TENANT-01/NO_PATCH.md`

Aucun fichier `.diff` produit.

---

## 6. Verdict final

**partiellement conforme**

### Justification du verdict
Le dépôt montre un cloisonnement multi-tenant réel sur une grande partie du périmètre ALPHA inspecté : `companyId` est propagé correctement, les principaux modèles métier sont tenantisés et les routes métier principales sont filtrées par société.

Le verdict n’est cependant pas `conforme` car l’uniformité attendue par le cadrage n’est pas atteinte :
- une route inspectée expose des agrégats globaux sans filtre tenant ;
- certaines écritures restent sécurisées surtout par pré-vérification applicative ;
- la persistance permissions n’exprime pas le tenant aussi explicitement que les autres modèles métier.
