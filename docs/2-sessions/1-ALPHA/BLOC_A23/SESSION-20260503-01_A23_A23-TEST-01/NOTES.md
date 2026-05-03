# NOTES

## Methode / observations

- Lecture documentaire ciblee appliquee (noyau obligatoire + documents strictement utiles).
- Reproduction executee sur depot reel via serveur Next local et appels API authentifies ADMIN.
- Aucune correction code appliquee.

## Constats techniques majeurs

1. Module utilisateurs KO par ecart schema/base
- `GET /api/users` => `500 SERVER_ERROR`
- `GET /api/users/{id}` => `500 SERVER_ERROR`
- `POST /api/users` => `500 SERVER_ERROR`
- Detail erreur : colonnes User absentes en base (`firstName`, etc.).

2. Cause probable etayee
- `npx prisma migrate status` indique migration non appliquee :
  `20260424100000_a20_rh_lot02_user_rh_fields`
- Verification SQL information_schema : table `User` ne contient pas les colonnes RH attendues par le code.

3. Absences
- API absences existe et repond (GET 200).
- Blocage fonctionnel principal : module users non exploitable en UI (selection/liste).

4. Planning manuel
- API planning manuel operationnelle sur les flux testes : create/patch/cancel/assign.
- Anomalie template/horaires confirmee par le code UI : selection template ne pilote pas les horaires du formulaire.

5. Session post-login / shell
- Repro visuelle directe non executee faute scenario navigateur instrumente dans cette session.
- Analyse code : zone probable dans `app/layout.tsx` + navigation client login (`router.push`) + persistance layout.

6. Regles metier societe
- Message "Parametre prepare uniquement..." confirme dans UI + catalog definitions (`engineStatus: PREPARED`, `storage.key: null`, `isWritable: false`).
- Classement : comportement volontaire/incomplet, pas un crash.

## Informations non prouvees

- Reproduction visuelle exacte du defaut post-login avant refresh : INFORMATION NON FOURNIE — À CONFIRMER
- Audit visuel complet ecart UI integree vs maquettes A21/A22 : INFORMATION NON FOURNIE — À CONFIRMER

