# EVIDENCES

## Sources utilisées

### Documentation produit / pilotage
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`

### Code réel contrôlé
- `app/dashboard/page.tsx`
- `app/company/page.tsx`
- `app/company/company-profile-form.tsx`
- `app/company/company-rules-panel.tsx`
- `app/users/page.tsx`
- `app/api/users/route.ts`
- `app/api/users/[id]/route.ts`
- `app/api/users/[id]/archive/route.ts`
- `app/api/users/[id]/depot/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/api/users/[id]/absences/route.ts`
- `app/api/users/[id]/absences/[absenceId]/route.ts`
- `app/vehicles/page.tsx`
- `app/api/vehicles/route.ts`
- `app/api/vehicles/[id]/route.ts`
- `app/api/vehicles/[id]/archive/route.ts`
- `app/api/vehicles/[id]/depot/route.ts`
- `app/depots/page.tsx`
- `app/api/depots/route.ts`
- `app/api/depots/[id]/route.ts`
- `app/api/depots/[id]/archive/route.ts`
- `app/templates/page.tsx`
- `app/templates/templates-client.tsx`
- `app/api/templates/route.ts`
- `app/api/templates/[id]/route.ts`
- `app/api/templates/[id]/archive/route.ts`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/planning/manual-planning-panel.tsx`
- `lib/permission-catalog.ts`
- `lib/permissions.ts`
- `lib/rbac.ts`
- `lib/auth.ts`
- `prisma/schema.prisma`
- `prisma/seed.ts`

---

## Extraits documentaires retenus

### Cadrage produit A12
Dans `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md` :
- `15.1 Export PDF planning` : statut actuel `manquant`
- `15.2 Export Excel / CSV planning` : statut actuel `manquant`
- `15.3 Impression simple planning` : statut actuel `manquant`
- `15.4 Politique de conservation des exports générés` : statut actuel `à confirmer`
- `16.1 Onboarding autonome société pilote` : statut actuel `manquant`
- `16.2 Import initial de données` : statut actuel `manquant`
- `16.3 Formats d’import` : `CSV` et `Excel .xlsx` uniquement, statut `manquant`
- `16.4 Logique d’import simple` : aperçu avant import, validation manuelle, rapport d’erreurs, statut `manquant`
- `16.5 Type d’import ALPHA` : import initial uniquement, sans synchronisation continue

### Plan A12
Dans `docs/1-master/PLAN_DE_DEVELOPPEMENT.md` :
- `A12-01 — AUDIT`
- `A12-LOT-02-15 — CORRECTION-COMPLÉTION`
- `A12-16 — VALIDATION`
- `CLOTURE_A12 — VALIDATION+CORRECTION+COMPLÉTION`

Le plan confirme que :
- l’audit est distinct de la complétion ;
- les exports / imports et l’onboarding complet restent à traiter dans les sessions suivantes.

---

## Preuves code retenues

### 1. Dashboard = orientation réelle, pas onboarding dédié
Dans `app/dashboard/page.tsx` :
- la page est présentée comme un **“Dashboard ALPHA centré sur l’orientation vers les modules réellement accessibles”** ;
- elle publie des liens vers :
  - `/company`
  - `/depots`
  - `/users`
  - `/vehicles`
  - `/templates`
  - `/planning`
- les liens sont filtrés selon les droits réellement détectés.

Le dashboard fournit donc une orientation réelle vers les modules utiles à la mise en place, mais aucun wizard d’onboarding ni contrôle de complétude.

### 2. Profil société réellement exploitable
Preuves :
- `app/company/page.tsx` : chargement du profil société courant ;
- `app/company/company-profile-form.tsx` : formulaire d’édition du nom, gérants, adresse, téléphone, SIRET ;
- `app/api/company/profile/route.ts` : `PATCH` réel du profil société.

### 3. Dépôts / bases réellement exploitables
Preuves :
- `app/depots/page.tsx` : page de gestion des bases / dépôts ;
- `app/depots/depots-client.tsx` : création, édition, archivage logique ;
- `app/api/depots/route.ts` : `POST`
- `app/api/depots/[id]/route.ts` : `PATCH`
- `app/api/depots/[id]/archive/route.ts` : `POST`

### 4. Utilisateurs réellement exploitables
Preuves :
- `app/users/page.tsx` assemble :
  - création ;
  - liste ;
  - édition ;
  - archivage ;
  - affectation dépôt ;
  - reset mot de passe ;
  - indisponibilités.
- `app/api/users/route.ts` :
  - `GET` liste paginée + filtres
  - `POST` création
- `app/api/users/[id]/route.ts` :
  - `GET` détail éditable
  - `PATCH` modification
- `app/api/users/[id]/archive/route.ts` : archivage logique
- `app/api/users/[id]/depot/route.ts` : affectation à un dépôt
- `app/api/users/[id]/reset-password/route.ts` : reset mot de passe

### 5. Indisponibilités utilisateurs réellement exploitables
Preuves :
- `app/users/page.tsx` monte `UserAbsenceClient`
- `app/api/users/[id]/absences/route.ts` :
  - `GET`
  - `POST`
- `app/api/users/[id]/absences/[absenceId]/route.ts` :
  - `PATCH`
  - `DELETE`
- `prisma/schema.prisma` : modèle `UserAbsence`

### 6. Véhicules réellement exploitables
Preuves :
- `app/vehicles/page.tsx` : page de gestion de flotte
- `app/vehicles/vehicles-client.tsx` : création, édition, affectation base, archivage logique, suppression physique
- `app/api/vehicles/route.ts` :
  - `GET`
  - `POST`
  - `DELETE`
- `app/api/vehicles/[id]/route.ts` : `PATCH`
- `app/api/vehicles/[id]/depot/route.ts` : `PATCH`
- `app/api/vehicles/[id]/archive/route.ts` : `POST`

### 7. Templates réellement exploitables
Preuves :
- `app/templates/page.tsx` : page de gestion des templates
- `app/templates/templates-client.tsx` : création, édition, archivage logique
- `app/api/templates/route.ts` :
  - `GET`
  - `POST`
- `app/api/templates/[id]/route.ts` : `PATCH`
- `app/api/templates/[id]/archive/route.ts` : `POST`
- `prisma/schema.prisma` : modèle `ShiftTemplate`

### 8. Aucun import initial réel trouvé
Constats négatifs retenus :
- aucun dossier `app/api/import*`
- aucun composant d’import dédié
- aucun parsing `CSV`
- aucun parsing `XLSX`
- aucune UI d’upload/import
- aucun aperçu avant import
- aucune validation manuelle d’import
- aucun rapport d’erreurs d’import

La recherche dépôt ne montre aucune implémentation réelle d’import.

### 9. Aucun export / téléchargement / impression planning réel trouvé
Constats négatifs retenus sur `app/planning/page.tsx`, `app/planning/planning-client.tsx`, `app/planning/manual-planning-panel.tsx` et recherche dépôt :
- aucune occurrence fonctionnelle `pdf`
- aucune occurrence fonctionnelle `csv`
- aucune occurrence fonctionnelle `xlsx`
- aucune route d’export
- aucun bouton d’export
- aucun `window.print()`
- aucun téléchargement fichier planning

### 10. Permission export non branchée
`PLANNING_EXPORT` existe dans `lib/permission-catalog.ts`, mais aucune consommation réelle n’a été trouvée hors catalogue documentaire / historique RBAC.  
Aucun helper `canExportPlanning`, aucune route protégée par cette permission et aucun composant ne l’exploite.

### 11. Support / assistance propriétaire non prouvée comme parcours onboarding standard
Constats :
- les pages société A12 exigent presque toutes un `companyId` de session ;
- les helpers `canManageUsers`, `canManageVehicles`, `canManageTemplates`, `canManageCompanyRules` n’ouvrent pas nativement ces modules au support global ;
- `prisma/seed.ts` crée un support global hors société ;
- aucun parcours onboarding support inter-société dédié n’a été trouvé dans A12.

Conclusion : l’assistance du propriétaire reste possible au cadrage, mais n’est pas prouvée comme parcours A12 standard déjà livré.

### 12. Politique de conservation des exports non cadrée en code
Constats :
- aucun modèle `Export*` dans `prisma/schema.prisma`
- aucun stockage d’exports générés
- aucun mécanisme de purge / conservation
- le cadrage produit lui-même laisse le sujet `à confirmer`

---

## Validations terminales réellement prouvées

Pour la présente session d’audit :
- `git apply --check` : NON EXÉCUTÉ
- `git apply` : NON EXÉCUTÉ
- `npx prisma validate` : NON EXÉCUTÉ
- `npx prisma generate` : NON EXÉCUTÉ
- `npm run lint` : NON EXÉCUTÉ
- `npm run build` : NON EXÉCUTÉ
