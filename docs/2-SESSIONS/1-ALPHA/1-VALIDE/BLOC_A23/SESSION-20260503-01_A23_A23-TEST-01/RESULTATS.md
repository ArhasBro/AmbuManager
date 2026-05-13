# RESULTATS

## Decision patch

`NO_PATCH`

Justification : session de type `AUDIT` uniquement (reproduction, qualification, priorisation, documentation), sans correction code autorisee dans le perimetre A23-TEST-01.

## Matrice de qualification des anomalies

| ID | Anomalie | Statut | Categorie | Gravite | Preuve | Session suivante recommandee |
|---|---|---|---|---|---|---|
| 1 | Post-login shell incoherent avant refresh | a confirmer | bug technique (session/hydratation) | forte | Repro visuelle non instrumentee ici; analyse code `app/layout.tsx` + `app/login/page.tsx` | A23-LOGIN-02 |
| 2 | `/users` charge mais liste users non exploitable | confirmee | bug bloquant | bloquante | `GET /api/users` => 500 `SERVER_ERROR` | A23-USERS-03 |
| 3 | `SERVER_ERROR` users interface/API | confirmee | bug bloquant | bloquante | `GET /api/users`, `GET /api/users/{id}`, `POST /api/users` => 500 | A23-USERS-03 |
| 4 | Creation utilisateur impossible | confirmee | bug bloquant | bloquante | `POST /api/users` => 500, colonne `firstName` absente | A23-USERS-03 |
| 5 | `VALIDATION_ERROR` non exploitable | partiellement confirmee | UX/erreur API | moyenne | API renvoie details 400; client creation affiche surtout erreur generique | A23-USERS-04 |
| 6 | Edition/role/base/archivage non testables ou KO via module users | partiellement confirmee | blocage fonctionnel | forte | Detail users KO (500) bloque parcours UI principal; endpoints annexes partiels | A23-USERS-04 |
| 7 | Absences non testables car users invisibles | partiellement confirmee | dependance blocante | moyenne | `GET /api/users/{id}/absences` => 200 mais selection users UI bloquee par module users | A23-USERS-04 |
| 8 | Choix template ne met pas correctement a jour les horaires | confirmee | bug fonctionnel UI planning | forte | `manual-planning-panel.tsx`: template sans `startTime/endTime` + aucun sync horaire | A23-PLAN-07 |
| 9 | Aucun utilisateur disponible pour affectation planning | non confirmee | consequence potentielle users | moyenne | Repro API assign OK (`PATCH /api/planning/shifts/{id}/assign` => 200) | A23-PLAN-07 (retest UI) |
| 10 | Modification shift KO | non confirmee | bug planning | forte | `PATCH /api/planning/shifts/{id}` => 200 | A23-PLAN-07 (retest UI) |
| 11 | Annulation/suppression logique shift KO | non confirmee | bug planning | forte | `POST /api/planning/shifts/{id}/cancel` => 200 | A23-PLAN-07 (retest UI) |
| 12 | Planning manuel non exploitable parcours pilote | partiellement confirmee | blocage mixte (users + UX planning) | forte | Users KO + bug template horaires; autres APIs planning fonctionnent | A23-PLAN-08 |
| 13 | Regles metier "prepare uniquement" bloquees | confirmee | fonctionnalite manquante/incomplete | moyenne | UI + catalog: `PREPARED`, `isWritable:false`, `storage.key:null` | A23-PLAN-08 |
| 14 | UI non alignee maquettes A21/A22 | a confirmer | anomalie UI/UX majeure documentee | forte | References A21/A22 presentes + anomalie deja documentee; audit visuel complet non fait | A23-UI-05 |
| 15 | Dark/light mode absent | confirmee | fonctionnalite manquante | faible/moyenne | Aucun mecanisme theme produit exploitable detecte | Backlog (A23-UI-05 ou BETA) |
| 16 | Role `PSC1` manquant | confirmee | besoin metier manquant | moyenne/forte | Enum `Role` Prisma sans `PSC1` | A23-ROLES-RH-09 |
| 17 | Affectation personnel planning trop complexe | partiellement confirmee | UX/metier | forte | UI planning dense et multi-flux; simplification non traitee ici | A23-PLAN-08 + A23-UI-05 |
| 18 | Saisie horaires reels/pauses utilisateurs | confirmee | fonctionnalite future | faible ALPHA / forte BETA | Pas de module de pointage reel/pauses observe | Backlog BETA |
| 19 | Fiche salarie: date entree / taux horaire / prime | confirmee | fonctionnalite RH manquante | moyenne | Champs absents schema/API users | A23-ROLES-RH-09 |
| 20 | Plusieurs gerants meme entreprise | partiellement confirmee | besoin metier partiel | moyenne | `managerNames` texte existe, pas de modelisation multi-comptes gerants dediee | A23-ROLES-RH-09 |
| 21 | Suppression definitive elements archivables | confirmee | gouvernance donnee manquante | moyenne | Services archives en soft delete (`isActive=false`/`archivedAt`), pas de hard delete dedie | Session gouvernance suppression |

## Analyse technique courte

- Defaut principal confirme : incompatibilite code/base sur `User` (migration RH non appliquee) qui casse le module users en cascade.
- Planning manuel est globalement operationnel en API sur les flux critiques testes, mais l'UX template->horaires est incoherente.
- Le bloc absences existe techniquement et repond en API, mais le parcours ADMIN reste bride par le module users.
- Les regles metier "preparees" sont volontairement visibles mais bloquees tant que la cle/format reel ne sont pas prouves.

## Classification ALPHA / suite

- ALPHA immediate : 1 (a confirmer visuel), 2, 3, 4, 5, 6, 7, 8, 12, 13
- Session dediee proche : 14, 16, 17, 19, 20, 21
- Backlog/BETA : 15, 18

## Information non prouvee

INFORMATION NON FOURNIE — À CONFIRMER

