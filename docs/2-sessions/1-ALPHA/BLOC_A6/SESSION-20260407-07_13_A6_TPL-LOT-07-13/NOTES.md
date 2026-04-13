# NOTES

## Règles appliquées
- Aucun nouveau patch code au stade documentaire final.
- Aucune réouverture du lot.
- Aucune documentation patchée via diff documentaire.
- Documentation unique de lot, alignée sur l’état final validé.

## Synthèse des ajustements retenus
Le lot a été finalisé par un patch principal puis deux correctifs minimaux :

### Patch principal
Couvre le cœur fonctionnel `TPL-07` à `TPL-13` :
- archivage logique template ;
- UI réelle de gestion des templates ;
- nouveaux champs métier du modèle template ;
- support des templates non horodatés au niveau modèle/API/UI ;
- support de couleur et amélioration de lisibilité bornée.

### FIX-01
Correctif minimal ciblé sur la nullabilité des templates non horodatés avant usage de `buildDateTimeLocal`.

Portée strictement retenue :
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`

### FIX-02
Correctif minimal ciblé sur la signature TypeScript du prédicat utilisé pour `timedTemplates`.

Portée strictement retenue :
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`

## État final documentaire retenu
Les preuves finales retenues pour cette documentation sont :
- patch principal appliqué ;
- `FIX-01` appliqué ;
- `FIX-02` appliqué ;
- `npx prisma validate` OK ;
- `npx prisma generate` OK ;
- `npm run lint` OK ;
- `npm run build` OK.
