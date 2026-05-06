# REFONTE — Audit global par patches

## Patch 1 — Core sécurité / build / UI

- Ajout de `DATABASE_URL` dans `prisma/schema.prisma`
- Suppression du fallback ADMIN dans `lib/auth.ts`
- Typage NextAuth assoupli pour refléter les champs réellement potentiellement absents
- `serverError()` masque les détails en production
- `npm run lint` cible désormais le projet (`eslint .`)
- Suppression des identifiants préremplis sur `/login`
- `/dashboard` redirige vers `/login` si non connecté
- `/vehicles` autorise `ADMIN` et `GERANT`
- `vehicles-client` respecte le contrat API `{ ok, data }`
- `/api/health/prisma` est protégé par auth + rôle ADMIN

## Patch 2 — Permissions / middleware / autoschedule

- Création de `lib/permissions.ts`
- Routes `match/preview`, `match/apply`, `match` et `runs` branchées sur un helper permission centralisé
- Renommage `proxy.ts` vers `middleware.ts` pour activation réelle du middleware Next.js
- Réduction d’une partie de la dépendance à `session.user.permissions` non hydraté

## Patch 3 — Docs / structure / outillage

- `docs/patches/README.md` corrigé et documente l’exception audit global
- `docs/patches/general/README.md`, `4.4/README.md`, `4.7/README.md` remplis
- `docs/STRUCTURE_DOCS.md` remplacé par un vrai Markdown
- `STRUCTURE_PROJET.md` et `docs/master/STRUCTURE_PROJET.md` convertis en UTF-8
- Templates de session corrigés
- `docs.zip` supprimé et `*.zip` ajouté à `.gitignore`
- `CMD.txt` enrichi en fin de fichier uniquement

## Mouvements / renommages

- `proxy.ts` → `middleware.ts`
- `docs.zip` → supprimé du repo

## Checklist d’application

- Appliquer les patches dans l’ordre : 1, 2, 3
- Lancer `npm install` si nécessaire
- Vérifier `npx prisma generate`
- Vérifier `npm run lint`
- Vérifier `npm run build`

Dernière validation obtenue :  
- PATCH_1_CORE_SECURITE appliqué  
- PATCH_2_PERMISSIONS_MIDDLEWARE appliqué  
- PATCH_3B_DOCS_COMPAT appliqué  
- PATCH_4_TECHNIQUE_FINAL appliqué  
- PATCH_5A_ROUTE_ONLY appliqué  
- PATCH_5B_README_COMPAT appliqué  
- `npm run lint` : VALIDÉ  
- `npm run build` : VALIDÉ  
- `npx prisma validate` : VALIDÉ  
- `prisma/test-login.ts` : VALIDÉ  
  - `DB email: admin@ambulance.local`  
  - `Password is hashed: true`  
  - `bcrypt.compare: true`
  