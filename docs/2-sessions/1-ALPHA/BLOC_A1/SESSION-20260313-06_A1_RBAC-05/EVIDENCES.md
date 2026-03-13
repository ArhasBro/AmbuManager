# EVIDENCES

## Preuves factuelles — RBAC-05

---

## 1. Cadrage officiel utile à la session

### 1.1 Références maîtres relues
Preuves documentaires :
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`

Constat :
- la session s’inscrit bien dans le cadre maître du projet ;
- la traçabilité discussionnelle et documentaire a été relue avant conclusion.

### 1.2 Permission dédiée attendue
Preuves documentaires :
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:385-410`

Constat :
- `06.5` liste explicitement `consulter audit` parmi les permissions fines applicatives ALPHA ;
- son ajout est donc bien attendu sur le produit.

### 1.3 Modèle d’accès audit attendu
Preuves documentaires :
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:412-420`

Constat :
- `06.6` prévoit un accès natif `GERANT` / `ADMIN` / support propriétaire ;
- les autres profils doivent pouvoir passer par la permission dédiée `consulter audit`.

### 1.4 Séquencement officiel
Preuves documentaires :
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md:247-252`

Constat :
- `RBAC-05` traite bien l’ajout de la permission dédiée ;
- `RBAC-06` traite ensuite la mise à niveau du modèle complet d’accès à l’audit.

---

## 2. Support audit réellement présent avant patch

### 2.1 Traçabilité planning persistante
Preuves documentaires :
- `docs/1-master/REGISTRE_DECISIONS.md:44-49`
- `docs/1-master/RECAP_DISCUSSIONS.md:204-221`

Preuves code :
- `prisma/schema.prisma`
- `lib/services/planning/planning-audit.ts`

Constat :
- le dépôt possède déjà un modèle persistant `PlanningAuditLog` ;
- l’écriture d’audit planning existe réellement.

### 2.2 Consultation minimale de l’audit run courant
Preuves documentaires :
- `docs/1-master/REGISTRE_DECISIONS.md:50-55`
- `docs/1-master/ETAT_GLOBAL_PROJET.md:55-57`

Preuves code :
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/planning/planning-client.tsx`

Constat :
- la consultation read-only de l’audit planning du run courant existe déjà réellement ;
- elle ne nécessitait pas la création d’un nouveau support produit pour matérialiser `RBAC-05`.

---

## 3. Point de départ hérité des sessions précédentes

### 3.1 Constat `RBAC-03`
Preuves documentaires :
- `docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260313-04_A1_RBAC-03/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260313-04_A1_RBAC-03/EVIDENCES.md`

Constat :
- l’audit du run courant existait déjà ;
- son accès restait alors limité à `ADMIN` / `GERANT` ;
- aucune permission dédiée `consulter audit` n’était encore matérialisée.

### 3.2 Constat `RBAC-04`
Preuves documentaires :
- `docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260313-05_A1_RBAC-04/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A1/SESSION-20260313-05_A1_RBAC-04/EVIDENCES.md`

Constat :
- le catalogue ALPHA hors audit a été réaligné ;
- la permission `consulter audit` a été volontairement laissée à `RBAC-05`.

---

## 4. Complétion réellement produite par RBAC-05

### 4.1 Permission ajoutée au catalogue
Preuves code / patch :
- `lib/permission-catalog.ts`
- `docs/3-patches/1-ALPHA/BLOC_A1/SESSION-20260313-06_A1_RBAC-05/PATCH__SESSION-20260313-06_A1_RBAC-05.diff`

Constat :
- la permission dédiée est ajoutée sous le code `AUDIT_VIEW` ;
- son libellé fonctionnel est `Consulter audit`.

### 4.2 Matérialisation seed sans matrice inventée
Preuves code / patch :
- `prisma/seed.ts`
- `docs/3-patches/1-ALPHA/BLOC_A1/SESSION-20260313-06_A1_RBAC-05/PATCH__SESSION-20260313-06_A1_RBAC-05.diff`

Constat :
- le seed continue d’upsert tout le catalogue via `ensurePermissions()` ;
- l’ajout au catalogue suffit donc à faire exister `AUDIT_VIEW` en base lors du seed ;
- aucune attribution utilisateur supplémentaire n’est forcée dans cette session.

### 4.3 Helper dédié ajouté
Preuves code / patch :
- `lib/permissions.ts`
- `docs/3-patches/1-ALPHA/BLOC_A1/SESSION-20260313-06_A1_RBAC-05/PATCH__SESSION-20260313-06_A1_RBAC-05.diff`

Constat :
- un helper dédié `canViewAudit()` est désormais présent ;
- il conserve l’accès natif `ADMIN` / `GERANT` et permet le passage par la permission `AUDIT_VIEW` pour les autres profils.

### 4.4 Contrôle réel réaligné
Preuves code / patch :
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `docs/3-patches/1-ALPHA/BLOC_A1/SESSION-20260313-06_A1_RBAC-05/PATCH__SESSION-20260313-06_A1_RBAC-05.diff`

Constat :
- le détail run / audit n’est plus limité en dur à `ADMIN` / `GERANT` ;
- il passe désormais par `canViewAudit()` ;
- le filtre multi-tenant `companyId` est conservé.

---

## 5. Qualification exacte du résultat

### 5.1 Ce qui est réellement ajouté et prouvé
- la permission dédiée `consulter audit` est réellement ajoutée au catalogue ;
- cette permission est réellement prise en compte par le seed existant ;
- cette permission est réellement consommée par un contrôle produit existant.

### 5.2 Ce qui reste volontairement borné
- le support propriétaire n’est pas implémenté ;
- aucune matrice d’attribution globale n’est fournie ;
- aucune page audit globale n’est créée ;
- le support de consommation retenu reste un endpoint mixte de détail run, pas un endpoint purement audit.

Qualification honnête :
- complétion minimale autonome `RBAC-05` : **oui** ;
- conformité sur le périmètre exact de la session : **oui** ;
- modèle d’accès audit complet `06.6` : **non** ;
- `RBAC-06` implicitement réalisé : **non**.

---

## 6. Vérifications techniques réellement exécutées

État réel désormais prouvé sur le dépôt cible :
- le `.diff` a bien été appliqué sans erreur ;
- `npm run lint` : `OK` ;
- `npm run build` : `OK`.

Conclusion :
- les preuves techniques finales sont désormais positives ;
- la session est cohérente à la fois sur le fond fonctionnel et sur l’état réel du dépôt cible.
