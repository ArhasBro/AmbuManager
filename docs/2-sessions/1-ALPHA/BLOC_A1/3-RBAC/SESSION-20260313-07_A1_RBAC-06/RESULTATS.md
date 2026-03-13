# RESULTATS

## Résultats finaux de la session RBAC-06

La session `RBAC-06` produit une complétion minimale réelle et strictement bornée du modèle d’accès à l’audit sur le support existant `détail run + audit`.

---

## 1. Résultat global retenu

Résultat réellement prouvé :
- un patch code minimal existe ;
- l’exposition audit continue d’utiliser le support existant `GET /api/planning/autoschedule/runs/[id]` ;
- l’accès run et l’accès audit y sont désormais distingués ;
- `ADMIN` / `GERANT` conservent l’accès natif via les helpers existants ;
- le filtre multi-tenant `companyId` est conservé ;
- l’UI `/planning` reflète explicitement l’absence d’accès audit au lieu d’afficher un faux état “aucun log”.

---

## 2. Correction réellement apportée côté API

Fichier corrigé :
- `app/api/planning/autoschedule/runs/[id]/route.ts`

Correction réelle :
- calcul séparé de `canViewRun` via `canAutoSchedule()` ;
- calcul séparé de `canReadAudit` via `canViewAudit()` ;
- refus seulement si les deux accès sont absents ;
- réponse enrichie avec un bloc `access` ;
- `draftShifts` et `_count` limités aux profils disposant de l’accès run ;
- `auditLogs` limités aux profils disposant de l’accès audit.

Effet réel :
- un profil avec accès run mais sans `AUDIT_VIEW` lit le run sans recevoir l’audit ;
- un profil avec `AUDIT_VIEW` mais sans accès run lit la partie audit exposée sans recevoir les `draftShifts`.

---

## 3. Correction réellement apportée côté UI

Fichier corrigé :
- `app/planning/planning-client.tsx`

Correction réelle :
- lecture du bloc `access` renvoyé par l’API ;
- stockage séparé de l’état `runCanViewRun` / `runCanViewAudit` ;
- affichage explicite `Accès audit non autorisé sur ce run.` quand l’audit n’est pas accessible ;
- affichage explicite `Mode audit seul : détail complet du run masqué.` quand le support est consulté en mode audit seul.

---

## 4. Ce que la session ne prétend pas réaliser

`RBAC-06` ne prétend pas réaliser :
- le support propriétaire ;
- une page audit globale ;
- une route audit dédiée ;
- une refonte complète du module audit ;
- le multi-rôle ;
- une matrice complète rôles/permissions ;
- les sessions `AUDIT-07`, `AUDIT-08`, `RBAC-07`, `RBAC-08`, `RBAC-09`, `SUP-*`.

---

## 5. Décision patch

- patch code produit
- `README_PATCH.md` produit
- `.diff` produit
- aucun `NO_PATCH.md`

Justification :
- une complétion minimale autonome strictement `RBAC-06` était prouvable ;
- elle a été réalisée sans ouvrir de nouveau support ;
- le patch officiel est applicable et a été appliqué avec succès.

---

## 6. Vérifications techniques réellement prouvées

État réel désormais prouvé sur le dépôt cible :
- `git apply --check` du patch officiel : `OK` ;
- application du patch officiel : `OK` ;
- `npm run lint` : `OK` ;
- `npm run build` : `OK`.

Conséquence :
- la version finale corrigée est documentée en cohérence avec l’état réellement testé ;
- aucune réserve méthodologique antérieure sur `lint/build` ne subsiste dans la clôture finale.

---

## 7. Verdict final

**conforme**

### Justification du verdict

`RBAC-06` est `conforme` sur son périmètre exact parce que :
- le dépôt corrige réellement le défaut laissé par le support mixte de `RBAC-05` ;
- la distinction accès run / accès audit est désormais assurée sur le support réel existant ;
- l’accès natif `ADMIN` / `GERANT` reste conservé ;
- aucun débordement hors périmètre n’est introduit ;
- le patch a été contrôlé applicable, appliqué, puis validé par `npm run lint` et `npm run build` ;
- les limites structurelles restantes sont documentées comme hors périmètre, notamment l’absence persistante de support propriétaire dans le dépôt réel.
