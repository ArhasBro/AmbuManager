# RESULTATS

## Resultats obtenus

### 1) Decision patch
- `NO_PATCH` applique.
- Justification : session `AUDIT` de cadrage metier ; aucune evolution code demandee ni autorisee.

### 2) Tableau d'arbitrage

| Sujet | Besoin metier | Etat actuel constate | Decision | Justification | Suite recommandee |
|---|---|---|---|---|---|
| PSC1 | Determiner si PSC1 est un role, une qualification ou une competence | `PSC1` absent du role enum/code ; cadrage roles officiel sans PSC1 ; RH avance hors ALPHA immediat | BACKLOG | Risque de confusion RBAC/planning/permissions si ajoute comme role ALPHA sans modelisation metier | Ouvrir une session de cadrage RH+RBAC dediee pour definir PSC1 en qualification/competence, pas en role principal par defaut |
| Plusieurs gerants | Autoriser plusieurs gerants dans la meme societe | Role `GERANT` existant ; aucune contrainte d'unicite sur role par societe ; `managerNames` deja editable en profil societe | ALPHA | Capacite deja disponible sans patch code ; besoin surtout de regle metier/documentaire explicite | Documenter la gouvernance (delegation, responsabilites, maintien d'au moins un compte de pilotage actif) |
| Fiche salarie enrichie | Ajouter date entree, taux horaire, primes, infos RH utiles | Fiche actuelle = identite + contact + role + stagiaire + horaires journaliers ; pas de remuneration/contrat | BACKLOG | Cadrage RH avance hors ALPHA immediat ; impact RGPD et gouvernance donnees | Cadrer un lot RH avance (donnees, base legale, retention, droits d'acces, audit) avant toute implementation |
| Suppression definitive controlee | Autoriser suppression physique sous controles | Doctrine code majoritaire = archivage logique ; suppression physique quasi absente (hors absences users) | BETA | Besoin de garde-fous transverses (permission, confirmation forte, criteres d'eligibilite, audit, integrite multi-tenant) | Preparer spec BETA de suppression definitive controlee par entite avec matrice des preconditions |

---

## Decisions formelles

- DECISION A23-ROLES-RH-09-01 — PSC1 : classe en `BACKLOG`; interpretation cible = qualification/competence RH a confirmer, pas un role ALPHA immediat.
- DECISION A23-ROLES-RH-09-02 — Plusieurs gerants : classe en `ALPHA` (capacite deja disponible, sans patch code).
- DECISION A23-ROLES-RH-09-03 — Fiche salarie enrichie : classe en `BACKLOG` (hors ALPHA immediat, cadrage RGPD necessaire).
- DECISION A23-ROLES-RH-09-04 — Suppression definitive controlee : classe en `BETA` (specification de garde-fous requise avant implementation).

---

## Documents modifies

- `docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-09_A23_A23-ROLES-RH-09/SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-09_A23_A23-ROLES-RH-09/NOTES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-09_A23_A23-ROLES-RH-09/EVIDENCES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-09_A23_A23-ROLES-RH-09/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-09_A23_A23-ROLES-RH-09/FIN_SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-09_A23_A23-ROLES-RH-09/PATCH/NO_PATCH.md`
