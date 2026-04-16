# NOTES

Notes de travail de la session.

---

## Méthode / observations

### Méthode réellement suivie
1. Relecture des documents maîtres et du cadrage A10 (`Module 12`, `12.1`, `12.2`, `12.3`, `12.4`).
2. Relecture des constats prouvés dans `MATCH-01`.
3. Relecture des correctifs réellement livrés dans `MATCH-LOT-02-09`, y compris `README_PATCH.md`, patch principal et `FIX-01`.
4. Contrôle ciblé du code réel des routes preview/apply/run, du service de matching, du calcul qualité et de l’UI `/planning`.
5. Qualification stricte de chacun des points attendus par la session.
6. Vérification de l’existence ou non d’un écart code résiduel nécessitant un patch minimal.

### Observations factuelles principales
- Les trois variantes simples sont réellement codées dans `MATCHING_VARIANTS` et transitent entre service, API preview/apply, lecture run et UI.
- Le moteur de matching exploite réellement :
  - `minStaffCount` ;
  - `requiredRole` ;
  - `secondaryAllowedRoles` ;
  - `requiredVehicleType` ;
  - les indisponibilités utilisateur ;
  - le repos minimum ;
  - les restrictions rôle ↔ véhicule ;
  - des compteurs d’affectation pour l’équilibrage de charge.
- Le score qualité global et les scores par shift sont réellement calculés dans `matching-quality.ts` puis réutilisés par les routes et l’UI.
- La lecture du run courant expose un bloc `matching` avec `{ variant, quality }`.
- L’UI `/planning` affiche :
  - un score matching du run ;
  - un score qualité planning de la simulation ;
  - un score par shift dans le tableau de simulation ;
  - une liste synthétique des scores de shift côté run.
- Aucun écart code strictement prouvé n’a été trouvé sur le périmètre A10 validé.

### Observation résiduelle
- `docs/1-master/REGISTRE_DECISIONS.md` décrit encore un historique 4.6 avec pondérations `coverage=0.5`, `stability=0.3`, `equity=0.2` et sans `vehicleCoverage`, alors que le code réel A10 utilise désormais `coverage=0.4`, `vehicleCoverage=0.2`, `stability=0.25`, `equity=0.15`.
- Ce résiduel est documentaire et externe à la décision de patch ; la session ne justifie pas de patch code.
