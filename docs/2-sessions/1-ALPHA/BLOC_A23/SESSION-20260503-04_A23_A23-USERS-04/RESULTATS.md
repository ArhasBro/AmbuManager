# RESULTATS

## Decision patch

`NO_PATCH`

Justification : session de type `VALIDATION`, objectif de retest/proof/verdict atteint sans necessite de correction applicative.

---

## Distinction corrige / KO / a confirmer

### Corrige depuis USERS-03 (confirme en A23-USERS-04)

- Fin des erreurs 500 sur flux users API (`GET list`, `POST create`, `GET detail`).
- Creation user valide operationnelle.
- Edition user et role principal operationnels.
- Archivage logique operationnel (`isActive=false`) sans suppression physique.
- Flux absences API operationnel (liste/create/update + validations + overlap).
- Cloisonnement tenant users/absences confirme.

### Reste KO

- Acces `/users` non obtenu en session HTTP scriptable (`307` vers login).

### A confirmer

- Validation navigateur manuel de l'acces `/users` (cookie/session UI interactive) :

INFORMATION NON FOURNIE — À CONFIRMER

### Hors perimetre

- KO `privacy` detecte dans `test:smoke` et `test:quality` (RGPD wording) : hors users/absences.

---

## Tableau users ADMIN

| Point teste | Statut | Preuve | Commentaire |
|---|---|---|---|
| Auth ADMIN utilisable | OK | `login_status=200`, `session_status=200` | Session ADMIN A exploitable |
| Acces `/users` | PARTIEL | `307 -> /login?callbackUrl=%2Fusers` | Reserve a confirmer en test navigateur manuel |
| Liste users active | OK | `GET /api/users?page=1&pageSize=100 -> 200` | Liste chargee sans 500 |
| Creation user valide | OK | `POST /api/users -> 201` | User test cree |
| Creation user invalide | OK | `POST /api/users invalide -> 400 VALIDATION_ERROR` | Messages de validation exploitables |
| Visibilite user cree en liste active | OK | `GET /api/users?q=<email> -> q_found=true` | User retrouve |
| Lecture detail user | OK | `GET /api/users/{id} -> 200` | Detail accessible |
| Edition user | OK | `PATCH /api/users/{id} -> 200` | Champs maj confirmes |
| Role principal | OK | `role ADE -> BUREAU` via `PATCH` | Exploitable |
| Rattachement base/depot | OK | `PATCH /api/users/{id}/depot -> 200` | Depot actif `Lamballe` affecte |
| Archivage logique | OK | `POST /api/users/{id}/archive -> 200`, `isActive=false` | Soft archive confirme |
| Absence suppression physique user | OK | DB check: user encore present | `isActive=false`, ligne conservee |
| Disponibilite module dependant | OK | `POST /api/planning/shifts -> 201` + `PATCH assign -> 200` | User actif assignable au planning |

---

## Tableau absences / indisponibilites

| Point teste | Statut | Preuve | Commentaire |
|---|---|---|---|
| Presence modele/routes reelles | OK | `prisma UserAbsence` + routes `/api/users/{id}/absences*` | Fonctionnalite presente |
| Liste absences | OK | `GET /api/users/{id}/absences -> 200` | Liste chargee |
| Creation absence valide | OK | `POST -> 201` | Absence creee |
| Validation champs obligatoires | OK | `POST dates incoherentes -> 400 VALIDATION_ERROR` | Validation exploitable |
| Chevauchement dates | OK | `POST overlap -> 409 ABSENCE_OVERLAP` | Controle metier present |
| Edition absence | OK | `PATCH /absences/{absenceId} -> 200` | Mise a jour valide |
| Rattachement user actif | OK | `userId` de l'absence = user cree actif | Lien correct |
| Cloisonnement companyId | OK | ADMIN B sur user A => `404` | Isolation tenant confirmee |
| Comportement apres archivage user | OK | `GET absences user archive -> 404` | User archive exclu du scope actif |
| Validation UI absences | A CONFIRMER | Test API only | INFORMATION NON FOURNIE — À CONFIRMER |
