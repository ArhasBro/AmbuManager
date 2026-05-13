# RESULTATS

## Résultat principal
Verdict de validation du bloc :
**NO_PATCH — BLOC A5 PARTIELLEMENT CONFORME**

## État réel du bloc A5 après `RULES-01` à `RULES-08`

### 1. Ce que le bloc A5 a réellement apporté
Le dépôt contrôlé prouve maintenant :
- une couche métier A5 dédiée au-dessus de `CompanyRule` ;
- une API paramètres métier ALPHA lisible ;
- une UI société dédiée pour exposer les paramètres métier ALPHA ;
- une séparation explicite entre règle moteur réellement branchée et réglage UI / exploitation ;
- une gouvernance minimale ciblée du droit `COMPANY_RULES_MANAGE`.

### 2. Ce qui est réellement utilisable côté produit
#### Règle métier réellement branchée
- `PLANNING_MIN_REST_HOURS`
  - configurable via la couche A5 ;
  - consommée sur les flux manuels ;
  - consommée à la publication autoschedule ;
  - sévérité pilotée par `RuleMode`.

#### Réglage UI / exploitation réellement branché
- `PLANNING_VIEW_MODE`
  - configurable via la couche A5 ;
  - consommé par l’UI planning ;
  - explicitement conservé hors moteur.

#### Paramètres préparés mais non branchés
- composition équipage ambulance / garde ;
- composition équipage VSL ;
- composition équipage taxi ;
- indisponibilité véhicule ;
- indisponibilité salarié ;
- interdiction de certains rôles sur certains véhicules.

Ces paramètres sont visibles comme préparés, sans faux enforcement moteur.

## Réponses consolidées aux questions de session
- transformation `CompanyRule` -> paramètres métier utilisables : **oui, partiellement** ;
- cohérence moteur / UI / permissions sur le périmètre livré : **partiellement atteinte** ;
- cohérence `PLANNING_MIN_REST_HOURS` entre manuel / API / autoschedule : **oui** ;
- maintien de `PLANNING_VIEW_MODE` comme réglage UI hors moteur : **oui** ;
- alignement API / UI société sur la couche A5 : **partiel** ;
- gouvernance `COMPANY_RULES_MANAGE` traitée sans refonte globale : **oui** ;
- résiduel bloquant le verdict `conforme` : **oui**.

## Résiduel retenu
Résiduel unique retenu pour `RULES-09` :
- la permission d’écriture réelle du bloc A5 est `COMPANY_RULES_MANAGE` ;
- mais l’UI société qui porte `CompanyRulesPanel` reste verrouillée par rôle natif `ADMIN` / `GERANT` dans `app/company/page.tsx` ;
- le bloc atteint donc une cohérence réelle sur le moteur, l’API et la gouvernance, mais pas une cohérence complète UI / permissions sur l’ensemble du périmètre livré.

## Justification du `NO_PATCH`
Aucun patch code minimal n’est légitime dans `RULES-09` car :
- la session est une **VALIDATION** et non une session de correction ;
- le résiduel retenu est réel mais relève d’une décision de correction éventuelle à traiter explicitement dans une session dédiée si le bloc doit être amené au niveau `conforme` ;
- inventer un patch pendant `RULES-09` reviendrait à absorber une correction hors scope.

## Fichiers documentaires corrigés
- `docs/2-sessions/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-09_A5_RULES-09/SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-09_A5_RULES-09/NOTES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-09_A5_RULES-09/EVIDENCES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-09_A5_RULES-09/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-09_A5_RULES-09/FIN_SESSION.md`
- `docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-09_A5_RULES-09/NO_PATCH.md`

## Validations réellement constatées
### Constatées dans la chaîne finale déjà validée du bloc A5
- `npm run lint` : OK
- `npm run build` : OK

### Relancées localement pendant `RULES-09`
- `npm run lint` : échec d’environnement (`eslint: not found`)
- `npm run build` : échec d’environnement (`next: not found`)

## Verdict de session
**PARTIELLEMENT CONFORME**
