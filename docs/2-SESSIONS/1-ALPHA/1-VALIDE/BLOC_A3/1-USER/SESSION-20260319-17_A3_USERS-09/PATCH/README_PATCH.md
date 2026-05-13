# README_PATCH — SESSION-20260319-17_A3_USERS-09

## Mode retenu
`NO_PATCH`

## Objet
Tracer proprement l’absence justifiée de patch applicatif pour USERS-09 : vérification de l’absence de suppression physique non souhaitée d’utilisateur.

## Périmètre couvert
- contrôle de `app/api/users/**` ;
- contrôle de `app/users/**` sur les actions exposées ;
- contrôle de `lib/services/users/**` ;
- vérification de cohérence avec `lib/auth.ts` et le statut `isActive` ;
- vérification de l’exclusion des comptes support globaux du flux standard société.

## Constat retenu
Le dépôt inspecté n’expose pas de suppression physique d’utilisateur dans le flux standard users :
- aucune route `DELETE` côté users ;
- aucune suppression Prisma de type `user.delete` / `user.deleteMany` ;
- archivage logique via `isActive: false` ;
- UI explicitement orientée vers l’archivage logique.

## Fichiers patch retenus
- `NO_PATCH.md`
- `README_PATCH.md`

## Commandes exécutées pour la session
```bash
npx prisma validate
npx prisma generate
npm run lint
npm run build
```

## Résultat des commandes
- `npx prisma validate` : ÉCHEC réseau Prisma (`getaddrinfo EAI_AGAIN binaries.prisma.sh`)
- `npx prisma generate` : ÉCHEC réseau Prisma (`getaddrinfo EAI_AGAIN binaries.prisma.sh`)
- `npm run lint` : OK
- `npm run build` : ÉCHEC hors périmètre USERS-09 sur `app/api/company/rules/route.ts` (`RuleMode` non exporté)

## Statut
Aucun patch applicatif à produire pour USERS-09. Le dossier patch documente explicitement cette absence.
