# RESULTATS — SESSION-20260319-25_A3_CLOTURE-A3

## 1. Patch principal retenu

`PATCH__SESSION-20260319-25_A3_CLOTURE-A3.diff`

## 2. Effet métier prouvé par le code

Le code réel couvre désormais le résiduel officiel `UserAbsence` sur les flux suivants :
- assignation manuelle d’un shift publié ;
- assignation manuelle d’un draft shift ;
- calcul des candidats de matching ;
- application du matching ;
- publication d’un run autoschedule déjà assigné.

## 3. Effet fonctionnel minimal obtenu

1. un utilisateur absent sur un créneau ne peut plus être affecté manuellement sur ce créneau ;
2. un utilisateur absent est exclu des candidats proposés par le matching ;
3. l’auto-match ne peut plus appliquer une proposition devenue invalide après création d’une absence ;
4. un run DRAFT contenant un utilisateur absent ne peut plus être publié en planning réel.

## 4. Validations terminales retenues

- application réelle du patch principal : OK ;
- `npm run lint` : OK ;
- `npm run build` : OK.

## 5. Verdict de résultat

Le résiduel officiel du bloc A3 est traité suffisamment pour permettre la clôture définitive du bloc, aucun autre blocant n’étant prouvé dans le code réel à l’issue des validations terminales transmises.
