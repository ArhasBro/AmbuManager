# NOTES

Notes de travail — SESSION-20260304-01 (DoD 4.4)

---

## 1) Pré-requis DoD (à exécuter + prouver)

### 1.1 Reset / migrate / seed (procédure max 5 lignes)
Procédure proposée (à confirmer) :
1) Démarrer PostgreSQL (Docker/Service) — INFORMATION NON FOURNIE — À CONFIRMER
2) npx prisma migrate reset
3) npx prisma generate
4) npx prisma db seed
5) Démarrer l’app (dev) — INFORMATION NON FOURNIE — À CONFIRMER

Preuve attendue : logs console + (optionnel) capture `npx prisma migrate status`.

### 1.2 Tenants (A/B) + comptes ADMIN (A/B)
- Tenant A + Admin A : seed fournit 1 tenant "Ambulance Manager" + admin@ambulance.local (prisma/seed.ts).
- Tenant B + Admin B : INFORMATION NON FOURNIE — À CONFIRMER (méthode actuelle absente du seed).

Preuve attendue : IDs company A/B + email admin A/B + preuve connexion UI sur A/B.

### 1.3 ShiftTemplates actifs (indispensable à autoschedule)
- Sans ShiftTemplate actif : API renvoie `NO_TEMPLATES` (autoschedule day/week).
- Méthode de création actuelle : scripts `/scripts/*` existent mais companyId hardcodé → INFORMATION NON FOURNIE — À CONFIRMER (reproductibilité).

Preuve attendue : liste templates actifs (log script / API / DB) + au moins 1 template actif par tenant testé.

---

## 2) Scénarios DoD 4.4 (à exécuter + prouver)

### 2.1 DAY (flux complet)
1) UI `/planning` : bouton génération DAY sur une date YYYY-MM-DD
2) Attendu : message UI "Jour généré ✅ ... runId"
3) Publier le run
4) Attendu : "Brouillon publié ✅" + refresh (les shifts réels s’affichent)

Preuves : runId + capture UI + réponse API publish (status + warnings éventuels).

### 2.2 WEEK (flux complet)
1) UI `/planning` : génération WEEK (weekStart affiché)
2) Attendu : "Brouillon généré ✅ (runId: ...)" + draftCount > 0
3) Publier le run
4) Attendu : "Brouillon publié ✅" + refresh shifts

Preuves : runId + draftCount + capture UI + réponse API publish.

### 2.3 Cancel (DRAFT → CANCELLED)
1) Avoir un run en DRAFT (DAY ou WEEK)
2) UI : Annuler
3) Attendu : "Run annulé ✅ (status: CANCELLED)"

Preuves : réponse API cancel + rechargement run info (status=CANCELLED).

### 2.4 DRAFT_ALREADY_EXISTS (reprise runId)
1) Relancer autoschedule (DAY ou WEEK) sur même périmètre (même jour / même semaine)
2) Attendu API : `{ ok:false, error:"DRAFT_ALREADY_EXISTS", runId }`
3) Attendu UI : message "Brouillon déjà existant ↩️ (runId: ...)" + run chargé

Preuves : runId retourné + run info accessible.

---

## 3) Edge cases DoD 4.4 (à vérifier)

- Routes dynamiques `[id]` robustes :
  - preuve : appel runId + publish/cancel sans crash
- Timezone/ISO :
  - preuve : cohérence affichage heures vs stockage (ISO)
- Templates invalides/corrompus :
  - preuve : erreur claire / pas de corruption (INFORMATION NON FOURNIE — À CONFIRMER)

---

## 4) Sécurité DoD 4.4 (tenant-safety + RBAC/permissions)

### 4.1 Cross-tenant (A vs B)
- Tenant A ne peut pas lire un run tenant B : attendu 404 NOT_FOUND (filtre companyId).
- Tenant A ne peut pas publish/cancel un run tenant B : attendu 404 NOT_FOUND (filtre companyId).

Preuves : appels API depuis session A sur runId B.

### 4.2 Sans session / sans droits
- Sans session : attendu 401 UNAUTHORIZED.
- Sans permission : attendu 403 FORBIDDEN.

Note : publish vérifie actuellement `PLANNING_AUTOSCHEDULE` (pas `PLANNING_AUTOSCHEDULE_PUBLISH`) → INFORMATION NON FOURNIE — À CONFIRMER (attendu exact DoD).

---

## 5) Clôture documentaire (à faire uniquement après preuves OK)

- Mettre à jour ETAT_GLOBAL_PROJET.md : 4.4 → VALIDÉ
- Aligner DOCUMENT_MAITRE.md / PLAN_DE_DEVELOPPEMENT.md si nécessaire
- Ajouter décision dans REGISTRE_DECISIONS.md si une correction de sécurité/outil est faite