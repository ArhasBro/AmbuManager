# EVIDENCES

## Sources utilisées

### Documentation
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`
- sessions utiles `AUTH-03`, `TENANT-04`, `RBAC-09`, `API-01`

### Code
- `lib/api/response.ts`
- `lib/api/prisma-error.ts`
- `app/api/company/rules/route.ts`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`
- `app/api/planning/autoschedule/runs/route.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
- `app/planning/planning-client.tsx`
- `lib/services/planning/autoschedule-match.ts`

---

## 1. Cadrage officiel retenu

### 1.1 Règles de source et d’autorité
Le template de début de session impose :
- usage prioritaire de la documentation projet et du code réel ;
- `CODE > DOCUMENTATION` en cas de contradiction ;
- `1 session = 1 point clair`.

### 1.2 Bornage planifié
Le plan officiel prévoit explicitement :
- `API-01 — AUDIT` ;
- `API-02 — CORRECTION` ;
- `API-03 — AUDIT` ;
- `API-04 — CORRECTION` ;
- `API-05 — VALIDATION`.

Conséquence :
- `API-02` ne doit corriger que les routes réellement non conformes au contrat cible ;
- l’harmonisation fine des erreurs ne doit pas être anticipée ici.

### 1.3 Historique prouvé à reprendre sans réouverture
Les sessions précédentes utiles établissent que :
- `AUTH-03` a validé `role` + `companyId` en session ;
- `TENANT-04` a validé le cloisonnement multi-tenant sur le périmètre inspecté ;
- `RBAC-09` a retenu le bloc rôles / permissions ALPHA comme `partiellement conforme` ;
- `API-01` a retenu le socle API ALPHA comme `partiellement conforme` et a isolé les écarts de structure encore visibles.

---

## 2. Preuve du contrat cible réellement existant

### 2.1 Helper partagé
`lib/api/response.ts` matérialise bien un contrat cible :
- `ok(data)` renvoie `{ ok: true, data }` ;
- les helpers d’erreur renvoient `{ ok: false, error, details? }`.

### 2.2 Conclusion de `API-01`
`API-01` a déjà prouvé que :
- les succès étaient largement alignés sur `{ ok:true, data }` ;
- les erreurs restaient hétérogènes ;
- les champs `runId`, `message`, `debug` au top-level faisaient partie des écarts structurels encore visibles.

---

## 3. Écarts de structure réellement corrigés dans `API-02`

### 3.1 `day` et `week`
Dans `app/api/planning/autoschedule/day/route.ts` et `week/route.ts` :
- le cas `DRAFT_ALREADY_EXISTS` renvoie désormais `details: { runId }` ;
- le `runId` n’est plus exposé au top-level de l’erreur.

### 3.2 `runs/[id]`, `cancel`, `publish`
Dans :
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`

le contexte de diagnostic n’est plus exposé via un champ top-level `debug`.
Il est désormais encapsulé sous `details.debug`.

### 3.3 `publish`
Dans `app/api/planning/autoschedule/runs/[id]/publish/route.ts` :
- le cas `RULE_CONFIG_ERROR` n’expose plus `message` au top-level ;
- le texte explicatif est désormais conservé sous `details.message`.

### 3.4 `match`
Dans `app/api/planning/autoschedule/runs/[id]/match/route.ts` :
- `401`, `403` et `410` n’exposent plus `message` au top-level ;
- l’information explicative est déplacée sous `details`.

---

## 4. Routes relues mais laissées intactes

### 4.1 Routes déjà structurellement compatibles
Aucune correction nécessaire sur :
- `app/api/company/rules/route.ts`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/api/planning/autoschedule/runs/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
- `app/api/health/prisma/route.ts`
- `app/api/users/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/api/vehicles/route.ts`

Motif factuel :
- ces routes renvoient déjà des succès sous `data` et des erreurs structurées autour de `error` avec `details` éventuel ;
- les différences restantes relèvent du wording ou de l’harmonisation fine, pas d’un champ top-level hors contrat.

### 4.2 Helper partagé réutilisable mais non imposé ici
`lib/api/response.ts` peut être réutilisé tel quel sur certaines routes.
Cependant, l’imposer partout dans `API-02` aurait élargi artificiellement la correction.
Le patch retenu reste donc local et borné aux payloads réellement non conformes.

---

## 5. Point de vigilance hors périmètre immédiat

### 5.1 Consommation UI legacy
Dans `app/planning/planning-client.tsx`, le flux de génération planning lit encore un `runId` top-level pour `DRAFT_ALREADY_EXISTS`.

### 5.2 Client service legacy
Dans `lib/services/planning/autoschedule-match.ts`, le schéma client legacy tolère encore `message` / `issues` plutôt que `details`.

Conclusion :
- ces éléments ne sont pas des routes API serveur ;
- ils ne relèvent pas de la correction structurelle stricte demandée à `API-02` ;
- leur cohérence avec les routes corrigées devra être revalidée hors de cette session.

---

## 6. Vérifications techniques réellement prouvées

Vérifications prouvées :
- patch officiel `.diff` généré ;
- `git apply --check` sur une copie propre du dépôt : `OK` ;
- application du patch sur cette copie de contrôle : `OK` ;
- `npm run lint` : `OK` ;
- `npm run build` : `OK`.
