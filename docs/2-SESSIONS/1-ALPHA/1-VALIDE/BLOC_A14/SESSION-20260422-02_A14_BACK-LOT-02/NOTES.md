# NOTES — SESSION-20260422-02_A14_BACK-LOT-02

## Bornage réel
- backend uniquement ;
- aucun changement frontend ;
- aucun changement Prisma schema ;
- aucune ouverture de clôture de bloc ;
- aucun glissement vers `BACK-03`.

## Arbitrages techniques réels
- `app/api/company/profile/route.ts` a été réalignée vers un service dédié sans modifier le contrat API attendu ;
- `app/api/company/rules/route.ts` a été réalignée vers un validateur partagé et vers les helpers de réponse backend ;
- `app/api/planning/shifts/[id]/assign/route.ts` a été réalignée vers le validateur partagé d’assignation, avec prise en charge de `depotId` ;
- les routes `planning/autoschedule` ciblées ont été réalignées pour supprimer les mappings Prisma locaux redondants et propager `platformRole` là où l’écart était confirmé ;
- `FIX-01` a été volontairement borné à la seule erreur de build prouvée : réintroduction des helpers de cursor manquants dans `app/api/planning/autoschedule/runs/route.ts`.

## Remarque de méthode
Le fix `FIX-01` complète le patch principal sans élargir le périmètre fonctionnel de la session. Il corrige uniquement le blocage build démontré après application du patch principal.
