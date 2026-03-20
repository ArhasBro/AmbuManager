# NOTES — SESSION-20260319-17_A3_USERS-09

## Rappel méthodologique
Session strictement bornée à une validation ciblée de l’absence de suppression physique non souhaitée dans le module `users`.
Aucune complétion fonctionnelle supplémentaire n’est autorisée si aucun résiduel réel n’est prouvé.

## Méthode appliquée
- relecture des documents maîtres, templates et protocole ;
- relecture des sessions USERS-01 à USERS-08 côté dossier ;
- recherche ciblée de routes `DELETE` et d’appels `prisma.user.delete` / `deleteMany` ;
- vérification des flux adjacents : liste, création, édition, archivage, reset password, rattachement dépôt, auth ;
- exécution des commandes de validation demandées ;
- clôture documentaire en mode `NO_PATCH` si absence de résiduel.

## Constats de travail retenus
- aucune route `DELETE` n’existe dans `app/api/users/**` ;
- aucune occurrence `prisma.user.delete(...)` ou `prisma.user.deleteMany(...)` n’a été trouvée ;
- le flux standard `/users` parle explicitement d’archivage logique et de comptes actifs ;
- le service `archiveUser` passe par `tx.user.update({ data: { isActive: false } })` ;
- les flux adjacents (`édition`, `reset password`, `dépôt`, `auth`) ne réintroduisent pas de suppression physique.

## Point de vigilance hors périmètre session
Les validations terminales montrent un échec `prisma validate` / `prisma generate` lié au téléchargement réseau des binaires Prisma et un échec `npm run build` sur `app/api/company/rules/route.ts` (`RuleMode` non exporté). Ces échecs ne sont pas causés par USERS-09 et aucun correctif n’a été introduit dans cette session pour sortir de son périmètre.
