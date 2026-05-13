# ANOMALIES CONSOLIDÉES — SESSION-20260503_TEST-LOCAL-02

## Grille utilisée
- `A` : BUG BLOQUANT
- `B` : BUG NON BLOQUANT
- `C` : INCOHÉRENCE UI/UX
- `D` : PROBLÈME MÉTIER
- `E` : PROBLÈME DE PERMISSION / SÉCURITÉ
- `F` : FONCTIONNALITÉ MANQUANTE
- `G` : AMÉLIORATION FUTURE
- `H` : À CONFIRMER

---

## ANO-ADMIN-001 — Session non correctement hydratée après connexion

- Module : Auth / Session / Dashboard / Shell
- Page : `/dashboard`
- Constat : après connexion, dashboard affiché mais sidebar absente et topbar indiquant session / utilisateur / profil incohérents.
- Preuve : `TEST_01`, puis correction visuelle après refresh dans `TEST_02`.
- Catégorie : `B — BUG NON BLOQUANT`
- Gravité : forte
- Décision : `CORRECTION IMMÉDIATE`
- Statut : nouveau
- Commentaire : mauvaise première impression et risque de confusion pour une société pilote.

---

## ANO-ADMIN-002 — Module utilisateurs non exploitable

- Module : Utilisateurs
- Page : `/users`
- Constat : utilisateurs existants non visibles, recherche/filtre KO, création utilisateur impossible, édition/archivage/rôle/base KO.
- Preuve : `TEST_05`, `TEST_06`.
- Catégorie : `A — BUG BLOQUANT`
- Gravité : bloquante
- Décision : `CORRECTION IMMÉDIATE`
- Statut : nouveau
- Commentaire : bloque utilisateurs, absences, planning, permissions et parcours société pilote.

---

## ANO-ADMIN-003 — Absences / indisponibilités non testables

- Module : Absences / RH
- Page : `/users`
- Constat : non testable car le module utilisateurs ne fonctionne pas correctement.
- Catégorie : `H — À CONFIRMER`
- Gravité : moyenne
- Décision : `À RETESTER APRÈS CORRECTION UTILISATEURS`
- Statut : bloqué par ANO-ADMIN-002

---

## ANO-ADMIN-004 — Planning manuel partiellement inutilisable

- Module : Planning manuel
- Page : `/planning`
- Constat :
  - le template choisi ne modifie pas les horaires du shift ;
  - aucun utilisateur disponible pour affectation ;
  - modification shift KO ;
  - annulation / suppression logique KO ;
  - planning ressenti comme à revoir complètement.
- Catégorie : `A — BUG BLOQUANT` + `D — PROBLÈME MÉTIER`
- Gravité : bloquante
- Décision : `SESSION DÉDIÉE À CRÉER`
- Statut : nouveau
- Commentaire : à traiter après correction utilisateurs.

---

## ANO-ADMIN-005 — Règles métier société préparées mais non éditables

- Module : Société / Paramètres / Règles métier
- Page : `/company`
- Constat : certaines règles sont bloquées avec un message indiquant que le paramètre est préparé uniquement.
- Preuve : `TEST_04`.
- Catégorie : `F — FONCTIONNALITÉ MANQUANTE` + `H — À CONFIRMER`
- Gravité : moyenne à forte
- Décision : `SESSION DÉDIÉE À CRÉER`
- Statut : nouveau

---

## ANO-ADMIN-006 — Responsive mobile à améliorer

- Module : UI/UX responsive
- Page : `/dashboard` puis pages principales à confirmer
- Constat : affichage mobile à optimiser ou à reporter vers stratégie app mobile.
- Catégorie : `C — INCOHÉRENCE UI/UX` + `G — AMÉLIORATION FUTURE`
- Gravité : faible à moyenne
- Décision : `BACKLOG FUTUR`
- Statut : nouveau

---

## ANO-ADMIN-007 — Accents et libellés français à corriger

- Module : UI/UX globale
- Page : plusieurs pages
- Constat : accents manquants, libellés français à revoir.
- Catégorie : `C — INCOHÉRENCE UI/UX`
- Gravité : faible
- Décision : `BACKLOG COURT / SESSION UI TEXTES`
- Statut : nouveau

---

## ANO-ADMIN-008 — Option de suppression souhaitée sur les dépôts

- Module : Dépôts / gouvernance archivage
- Page : `/depots`
- Constat : souhait utilisateur d’ajouter une option supprimer.
- Catégorie : `G — AMÉLIORATION FUTURE`
- Gravité : faible
- Décision : `BACKLOG FUTUR`
- Statut : nouveau
- Commentaire : suppression physique à gouverner strictement pour éviter de casser l’historique.

---

## ANO-ADMIN-009 — Dark mode / light mode indisponible

- Module : UI/UX globale
- Constat : fonctionnalité dark / light mode non disponible.
- Catégorie : `G — AMÉLIORATION FUTURE` ou `F — FONCTIONNALITÉ MANQUANTE`
- Gravité : faible
- Décision : `BACKLOG FUTUR`
- Statut : nouveau

---

## ANO-ADMIN-010 — Rôle PSC1 manquant

- Module : Rôles / utilisateurs / planning
- Constat : rôle `PSC1` absent.
- Catégorie : `F — FONCTIONNALITÉ MANQUANTE` + `D — PROBLÈME MÉTIER`
- Gravité : moyenne à forte
- Décision : `SESSION DÉDIÉE À CRÉER`
- Statut : nouveau
- Commentaire : cadrer si `PSC1` est un rôle principal, une qualification ou une compétence.

---

## ANO-ADMIN-011 — Affectation du personnel au planning pas assez simple

- Module : Planning manuel
- Page : `/planning`
- Constat : l’affectation du personnel au planning doit être simplifiée.
- Catégorie : `C — INCOHÉRENCE UI/UX` + `D — PROBLÈME MÉTIER`
- Gravité : forte
- Décision : `SESSION DÉDIÉE À CRÉER`
- Statut : nouveau

---

## ANO-ADMIN-012 — Saisie des horaires réels / pauses par les utilisateurs

- Module : RH / temps de travail
- Constat : nouvelle fonctionnalité envisagée pour que les utilisateurs saisissent leurs horaires réels, pauses, etc.
- Catégorie : `G — AMÉLIORATION FUTURE`
- Gravité ALPHA : faible
- Gravité future : forte
- Décision : `BACKLOG FUTUR — BETA`
- Statut : backlog

---

## ANO-ADMIN-013 — Données RH salarié à enrichir

- Module : Utilisateurs / RH
- Constat : ajouter date d’entrée, taux horaire et primes à la fiche salarié.
- Catégorie : `F — FONCTIONNALITÉ MANQUANTE` + `G — AMÉLIORATION FUTURE`
- Gravité : moyenne
- Décision : `SESSION DÉDIÉE À CRÉER`
- Statut : nouveau
- Commentaire : à traiter après réparation du module utilisateurs.

---

## ANO-ADMIN-014 — Plusieurs gérants pour une même entreprise

- Module : Rôles / permissions / société
- Constat : besoin de pouvoir avoir plusieurs gérants pour une même entreprise.
- Catégorie : `H — À CONFIRMER` + `F — FONCTIONNALITÉ MANQUANTE` si non disponible
- Gravité : moyenne à forte
- Décision : `À CONFIRMER APRÈS CORRECTION UTILISATEURS`
- Statut : à confirmer

---

## ANO-ADMIN-015 — Suppression définitive des éléments archivables

- Module : Gouvernance données / archivage
- Constat : souhait de pouvoir supprimer les éléments archivables.
- Catégorie : `G — AMÉLIORATION FUTURE`
- Gravité : faible à moyenne
- Décision : `SESSION DÉDIÉE À CRÉER`
- Statut : nouveau
- Commentaire : supprimer uniquement si l’élément n’a jamais été utilisé ; sinon archivage obligatoire.

---

## ANO-ADMIN-016 — UI réelle non alignée avec les maquettes visuelles validées

- Module : UI/UX globale
- Pages : dashboard, users, planning et potentiellement toutes les pages principales
- Constat : l’interface intégrée ne respecte pas suffisamment les maquettes visuelles validées.
- Catégorie : `C — INCOHÉRENCE UI/UX`
- Gravité : forte
- Décision : `SESSION DÉDIÉE À CRÉER`
- Statut : nouveau
- Commentaire : point majeur pour la présentabilité société pilote. Ce n’est pas une simple finition cosmétique.
