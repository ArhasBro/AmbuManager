# EVIDENCES — SESSION-20260319-17_A3_USERS-09

## Sources de référence relues pour la session
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/4-templates/*`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- sessions antérieures `USERS-01` à `USERS-08`

## Preuves code retenues
- `app/api/users/route.ts`
  - la liste filtre `isActive: true`, `platformRole: null`, `role: { not: null }` ;
  - aucune route `DELETE`, uniquement `GET` et `POST`.
- `app/api/users/[id]/route.ts`
  - seule la méthode `PATCH` est exposée ;
  - recherche de l’utilisateur bornée à `isActive: true`, `platformRole: null`, `role: { not: null }`.
- `app/api/users/[id]/archive/route.ts`
  - flux d’archivage via `POST` uniquement ;
  - l’auto-archivage est explicitement refusé.
- `lib/services/users/archive-user.ts`
  - archivage réalisé via `tx.user.update({ data: { isActive: false } })` ;
  - aucune suppression physique.
- `app/api/users/[id]/reset-password/route.ts`
  - mise à jour du mot de passe via `updateMany`, jamais via suppression.
- `lib/services/users/assign-user-depot.ts`
  - mise à jour du `depotId`, jamais suppression.
- `app/users/user-archive-client.tsx`
  - UI explicitement orientée vers « Archivage logique uniquement » ;
  - aucun bouton de suppression définitive.
- `lib/auth.ts`
  - login refusé si `!user.isActive`, cohérent avec l’archivage logique.

## Résultat des recherches ciblées
- recherche `export async function DELETE` dans `app/api/users/**` : aucune occurrence ;
- recherche `prisma.user.delete` / `prisma.user.deleteMany` : aucune occurrence ;
- recherche UI `supprimer` / `delete` dans le module `users` : aucune action de suppression physique trouvée.

## Preuves terminales retenues
- `npx prisma validate` : ÉCHEC réseau Prisma (`getaddrinfo EAI_AGAIN binaries.prisma.sh`)
- `npx prisma generate` : ÉCHEC réseau Prisma (`getaddrinfo EAI_AGAIN binaries.prisma.sh`)
- `npm run lint` : OK
- `npm run build` : ÉCHEC hors périmètre USERS-09 sur `app/api/company/rules/route.ts` (`RuleMode` non exporté par `@prisma/client`)

## Conclusion probante
Aucune suppression physique non souhaitée d’utilisateur n’a été démontrée dans le périmètre users inspecté. Le flux réel reste un archivage logique et la session est recevable en `NO_PATCH`.
