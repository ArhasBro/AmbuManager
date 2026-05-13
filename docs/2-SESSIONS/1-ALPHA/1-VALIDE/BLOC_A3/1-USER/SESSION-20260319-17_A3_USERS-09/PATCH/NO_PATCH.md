# NO_PATCH

Session : `SESSION-20260319-17_A3_USERS-09`

Type : `VALIDATION`

## Décision
Aucun correctif code supplémentaire n’est retenu.

## Raisons
- la session vérifie un point ciblé de validation, pas une nouvelle complétion ;
- aucune route `DELETE` n’a été trouvée dans `app/api/users/**` ;
- aucune occurrence `prisma.user.delete(...)` ou `prisma.user.deleteMany(...)` n’a été trouvée ;
- le flux réel d’archivage passe par `isActive: false` ;
- aucune action UI de suppression définitive n’est exposée.

## Conséquences
- aucun fichier `.diff` ;
- `git apply --check` : non applicable ;
- `git apply` : non applicable ;
- le dossier patch est conservé pour la traçabilité documentaire.
