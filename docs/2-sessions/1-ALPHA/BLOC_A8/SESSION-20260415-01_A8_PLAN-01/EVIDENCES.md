# EVIDENCES

## Sources utilisées

### Documentation maîtresse
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`

### Protocole / structure
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`

### Code réellement contrôlé
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/planning-audit.ts`
- `lib/types/planning.ts`
- `prisma/schema.prisma`
- `app/api/planning/autoschedule/runs/[id]/route.ts` (consulté uniquement pour comprendre l’historique/audit déjà exposé dans l’écran)

---

## Preuves factuelles

### 1. Vue semaine réellement présente
- `app/planning/planning-client.tsx:339-396` : état `weekStart`, calcul `weekDays` sur 7 jours.
- `app/planning/planning-client.tsx:455-466` : chargement des shifts avec `weekStart`.
- `app/planning/planning-client.tsx:1273-1275` : navigation `Semaine -1`, `Aujourd’hui`, `Semaine +1`.
- `app/planning/planning-client.tsx:1610-1688` : rendu en grille 7 colonnes, une colonne par jour.

### 2. Vue jour seulement partielle
- `app/api/planning/shifts/route.ts:13-16` : le schéma de requête accepte `day`.
- `app/api/planning/shifts/route.ts:103-107` : filtrage par journée côté API quand `day` est fourni.
- `app/planning/planning-client.tsx:455-460` : l’écran charge uniquement `weekStart`, pas `day`.
- `app/planning/planning-client.tsx:1610-1688` : aucun mode UI “jour”, seulement la grille semaine.

### 3. Vue mois absente
- Aucun état mois, aucune route mois, aucun rendu mois n’ont été trouvés dans :
  - `app/planning/planning-client.tsx`
  - `app/api/planning/shifts/route.ts`
  - `app/planning/page.tsx`

### 4. Navigation mensuelle absente
- `app/planning/planning-client.tsx:1273-1275` : uniquement navigation hebdomadaire.
- Aucun contrôle `mois précédent`, `mois suivant` ou date pivot mensuelle trouvé dans le client.

### 5. Lisibilité métier réelle mais partielle
- `app/planning/planning-client.tsx:1313-1338` : deux modes d’affichage (`Simple`, `Ambulance`).
- `app/planning/planning-client.tsx:1439-1442` : la consultation est explicitement “centrée utilisateur”.
- `app/planning/planning-client.tsx:1720-1808` et `1840-1964` : cartes lisibles avec horaires, personnel, véhicule, base, mission, catégories/couleurs.
- `app/planning/planning-client.tsx:1357-1433` : l’écran mélange aussi des commandes autoschedule (`Simuler auto-assign`, `Appliquer auto-assign`, `Générer cette semaine`, `Publier le brouillon`, `Annuler le brouillon`).

### 6. Ajout manuel de shift publié non trouvé
- `app/api/planning/shifts/route.ts` : seule fonction exportée `GET`.
- Aucun `POST` sur `app/api/planning/shifts/route.ts`.
- Aucune UI de création manuelle de shift publié trouvée dans `app/planning/planning-client.tsx`.
- Les actions de création visibles concernent uniquement l’autoschedule (`Générer ce jour`, `Générer cette semaine`) puis publication de brouillon.

### 7. Modification de shift publié présente mais partielle
- `app/api/planning/shifts/[id]/assign/route.ts:1-324` : route `PATCH` dédiée à l’affectation.
- `app/api/planning/shifts/[id]/assign/route.ts:239-246` : le service `assignShift` met à jour un shift publié.
- `lib/services/planning/assign-shift.ts:295-326` : seuls `userId`, `user2Id`, `vehicleId`, `depotId` sont comparés puis mis à jour.
- `app/planning/planning-client.tsx:1734-1808` et `1886-1964` : l’UI permet de changer employé 1, employé 2, véhicule et base sur les cartes.
- Aucune édition d’horaire, de date, de template, de notes ou de structure du shift publié n’a été trouvée.

### 8. Suppression métier / annulation logique d’un shift publié non trouvée
- Arborescence réelle `app/api/planning/*` :
  - `app/api/planning/shifts/route.ts`
  - `app/api/planning/shifts/[id]/assign/route.ts`
  - routes autoschedule `day`, `week`, `runs`, `publish`, `cancel`
- Aucune route `DELETE`, `PATCH cancel`, `archive` ou `cancel` pour un `Shift` publié.
- `prisma/schema.prisma:418-463` : le modèle `Shift` ne possède pas de champ de type `status`, `cancelledAt`, `archivedAt` ou équivalent.
- `prisma/schema.prisma:53-62` : le statut `CANCELLED` existe pour `AutoScheduleRun`, pas pour `Shift`.

### 9. Historique minimal planning présent seulement de façon partielle
- `app/planning/planning-client.tsx:1450-1492` : bloc UI `Historique du run courant`.
- `app/api/planning/autoschedule/runs/[id]/route.ts:117-129` : récupération de `planningAuditLogs`.
- `app/api/planning/autoschedule/runs/[id]/route.ts:117-120` : historique limité à 20 lignes.
- `app/planning/planning-client.tsx:1450` : l’historique n’apparaît que si `lastRunId` existe.
- `app/planning/planning-client.tsx:734-748` et `794-808` : `lastRunId` est alimenté à partir des actions autoschedule jour/semaine ou d’un brouillon déjà existant.

### 10. Traçabilité après publication présente seulement de façon partielle
- `lib/services/planning/planning-audit.ts:3-24` : helper central d’écriture d’audit.
- `prisma/schema.prisma:64-89` : modèle `PlanningAuditLog` avec acteur, run, action, entité, résumé, payload.
- `lib/services/planning/assign-shift.ts:308-326` : écriture d’un log `SHIFT_ASSIGNED_MANUALLY` avec `changedFields`, `previous`, `next`.
- `app/api/planning/autoschedule/runs/[id]/route.ts:162-166` : la consultation de l’audit depuis l’écran passe par le run.
- Conséquence prouvée : la traçabilité existe pour certaines modifications publiées, mais la consultation visible dans `/planning` reste attachée au `run` courant, pas à un historique global du planning manuel.
