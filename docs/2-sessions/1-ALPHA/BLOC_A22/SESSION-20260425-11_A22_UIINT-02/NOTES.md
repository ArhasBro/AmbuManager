# NOTES

## Decision patch

PATCH

## Justification courte

Une correction code etait necessaire pour couvrir le cas support global sans `companyId` et fiabiliser l'etat actif de navigation sans modifier le shell structurel.

## Points d'attention

- Le compte `SUPPORT` seed est explicitement hors societe (`companyId=null`) dans `prisma/seed.ts`; la navigation devait donc exposer `Audit` sans exposer les modules societes.
- Les liens societes restent strictement conditionnes a `companyId` + droits associes.
- Aucun patch correctif separe n'a ete necessaire apres application du patch principal.

## Limites

- Verification manuelle visuelle navigateur non executee dans cette session.
- Validation fonctionnelle role-par-role en UI reelle : INFORMATION NON FOURNIE — À CONFIRMER.
