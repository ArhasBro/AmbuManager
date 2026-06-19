# 3 - Fin de session

## 1. Resume court

Le bloc T5 est coherent sur le fond, mais son decoupage n est pas encore assez fin pour demarrer les creations data sans recadrage. Les modeles candidats sont regroupes trop large, la correction multi-tenant doit attendre un audit de surfaces `companyId`, et `TPMR` reste un point de schema a trancher.

## 2. Objectif traite

Analyser la coherence du bloc T5 et de ses sessions avant demarrage, verifier si le decoupage est suffisant, identifier les sessions manquantes, trop larges, redondantes ou a reporter, puis produire les questions d arbitrage necessaires.

## 3. Livrable produit

Plan de sessions recommande pour T5 + questions d arbitrage classees.

## 4. Analyse du decoupage

| Session | Statut recommande | Lecture |
| --- | --- | --- |
| `DX_T5_CADRAGE-BLOC-SESSIONS` | CONSERVER | Gate utile et bien calibre. |
| `DX_T5_AUDIT-MAPPING-ENTITES` | CONSERVER | Necessaire pour la matrice Base44 -> Prisma officiel et pour marquer les refus. |
| `DX_T5_CADRAGE-MODELES-CANDIDATS` | DECOUPER | Trop large : melange Societe/Dashboard, Suivi vehicules, Mise en route et TPMR. |
| `CX_T5_CORRECTION-MULTITENANT-CRITIQUE` | REPORTER | A lancer seulement apres audit de surfaces `companyId` avec findings valides. |
| `CX_T5_CREATION-MODELE-CANDIDAT` | DECOUPER | Doit etre instancie par famille de modele, pas comme session fourre-tout. |
| `DX_T5_VALIDATION-CLOTURE-DONNEES-TENANT` | CONSERVER | Bon verrou final, a conserver en fin de chaine. |

## 5. Sessions a decouper ou a instancier

- `DX_T5_CADRAGE-MODELES-CANDIDATS` doit etre split au minimum en :
  - cadrage `CompanyContact` et `DashboardPreference` ;
  - cadrage `VehicleCheck`, `Disinfection`, `VehicleAnomaly` ;
  - cadrage `OnboardingStep` si le modele reste envisageable ;
  - cadrage `TPMR` si la representation schema n est pas deja fixee ailleurs.
- `CX_T5_CREATION-MODELE-CANDIDAT` doit etre instancie en sessions concretes, au minimum :
  - `CX_T5_CREATION-COMPANYCONTACT`
  - `CX_T5_CREATION-DASHBOARDPREFERENCE`
  - `CX_T5_CREATION-SUIVI-VEHICULES-MODELES`
  - `CX_T5_CREATION-ONBOARDINGSTEP` uniquement si le cadrage le retient

## 6. Sessions manquantes proposees

| Session proposee | Priorite | Raison |
| --- | --- | --- |
| `DX_T5_AUDIT-COMPANYID-SURFACES` | P0 | Il faut un audit de surfaces tenant avant toute correction multi-tenant. |
| `DX_T5_CADRAGE-TPMR-REPRESENTATION` | P0 | `TPMR` / `TPMR VSL` / `TPMR TAXI` restent non statures dans les fiches. |
| `CX_T5_CREATION-COMPANYCONTACT` | P1 | Creation ciblee si le modele est valide. |
| `CX_T5_CREATION-DASHBOARDPREFERENCE` | P1 | Creation ciblee si la persistence serveur est retenue. |
| `CX_T5_CREATION-SUIVI-VEHICULES-MODELES` | P1 | Groupe coherent pour les modeles du suivi vehicules. |

## 7. Questions d arbitrage

### P0 - bloquant avant demarrage

- Faut-il creer `CompanyContact` maintenant ou le reporter ?
- Faut-il persister `DashboardPreference` cote serveur ou garder un etat UI/local en Alpha ?
- Faut-il creer `VehicleCheck`, `Disinfection` et `VehicleAnomaly` comme groupe officiel maintenant ou reporter le bloc au module P-SUIVI-VEHICULES ?
- Faut-il conserver `OnboardingStep` ou le refuser au profit d une progression calculee ?
- Comment represente-t-on `TPMR` / `TPMR VSL` / `TPMR TAXI` dans le schema officiel ?
- Faut-il une session de lecture des surfaces `companyId` avant toute correction multi-tenant ?

### P1 - important avant toute session CX

- Les modeles de suivi vehicules doivent-ils etre crees ensemble ou en trois tables distinctes ?
- `CompanyContact` et `DashboardPreference` doivent-ils partir dans le meme train de creation ou dans deux sessions separees ?
- Faut-il valider d abord `OnboardingStep` ou le garder comme refus documentaire ?

### P2 - peut etre decide plus tard

- Les modeles candidats refuses doivent-ils etre traces explicitement comme reports dans la synthese de bloc ?
- Le cadrage TPMR doit-il vivre dans T5 ou etre reporte au bloc P-VEHICULES / P-PLANNING ?

## 8. Ordre d execution recommande

1. `DX_T5_CADRAGE-BLOC-SESSIONS`
2. `DX_T5_AUDIT-MAPPING-ENTITES`
3. `DX_T5_AUDIT-COMPANYID-SURFACES` si le besoin de correction tenant reste confirme
4. `DX_T5_CADRAGE-TPMR-REPRESENTATION`
5. `DX_T5_CADRAGE-MODELES-CANDIDATS` decoupe en sous-sessions de cadrage
6. `CX_T5_CREATION-COMPANYCONTACT` si valide
7. `CX_T5_CREATION-DASHBOARDPREFERENCE` si valide
8. `CX_T5_CREATION-SUIVI-VEHICULES-MODELES` si valide
9. `CX_T5_CORRECTION-MULTITENANT-CRITIQUE` uniquement si un audit a produit des findings validables
10. `DX_T5_VALIDATION-CLOTURE-DONNEES-TENANT`

## 9. Risques de perimetre

- Copier une entite Base44 denormalisee au lieu de la rebatir proprement dans Prisma.
- Confondre `PlanningEntry` avec `Shift`, `DraftShift` ou `AutoScheduleRun`.
- Lancer une creation avant d avoir tranche `companyId`, relations et index.
- Garder un seul gros lot de creation et exploser la consommation de credits en rework.
- Laisser `TPMR` hors arbitrage et devoir rebasculer plus tard sur les blocs Vehicules / Planning.

## 10. Risques de surconsommation de credits

- Une session unique de creation pour tous les candidats ferait monter la taille des diffs et des revues.
- Une correction multi-tenant sans audit `companyId` serait probablement retournee en rework.
- Un cadrage `OnboardingStep` melange avec le suivi vehicules ferait doubler les lectures de fond.
- Ne pas decouper `CompanyContact` et `DashboardPreference` ferait perdre le benefice d une creation ciblee.

## 11. Points de vigilance

- Aucune modification applicative n a ete faite.
- Aucune modification Prisma n a ete faite.
- Aucune modification du MASTER n a ete faite.
- Aucun patch applicatif `.diff` n a ete produit.
- Les modeles candidats restent absents du schema officiel lu.
- Les surfaces `companyId` doivent etre auditees avant toute correction.

## 12. Reste a faire

- Le status Git final est renseigne dans `2-PREUVES.md`.
- Lancer, si besoin, la suite du cadrage avec les sessions decoupees proposees.

## 13. Recommandation pour la suite

Le bloc ne doit pas partir en production de cadrage tel quel. Il faut d abord decouper les modeles candidats, ouvrir un audit tenant sur les surfaces `companyId`, trancher TPMR, puis seulement instancier les sessions de creation valides.

## 14. Verdict final

BLOC A RECADRER AVANT PRODUCTION

SESSION DX_T5_CADRAGE-BLOC-SESSIONS TERMINEE - EN ATTENTE CONTROLE GPT
