# NOTES

## Méthode / observations

- audit du ZIP actuel MAJ réellement fourni ;
- constat : le code `ORG-03` est déjà présent dans le dépôt (`app/company/page.tsx`, `app/company/company-profile-form.tsx`, `app/api/company/profile/route.ts`, `lib/validators/company-profile.ts`) ;
- constat : le build casse sur `managerNames` dans `app/api/company/profile/route.ts` à cause d'un `select` Prisma typé non aligné avec `CompanySelect<DefaultArgs>` ;
- hotfix incrémental minimal : suppression de l'accès Prisma typé sur `managerNames` dans la route API, et réalignement de la lecture serveur `app/company/page.tsx` pour éviter un rebloquage immédiat sur le même champ ;
- aucun élargissement à `ORG-04`, `BASE-*`, `SUP-*`, onboarding, multi-sociétés, migration ou schéma Prisma.
