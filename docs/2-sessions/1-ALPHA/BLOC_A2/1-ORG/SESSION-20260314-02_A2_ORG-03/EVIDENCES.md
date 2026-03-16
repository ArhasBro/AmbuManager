# EVIDENCES

## Sources utilisées

### Documentation
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`

### Code réel inspecté
- `app/dashboard/page.tsx`
- `app/company/page.tsx`
- `app/company/company-profile-form.tsx`
- `app/api/company/profile/route.ts`
- `lib/validators/company-profile.ts`
- `prisma/schema.prisma`

## État réel du ZIP avant hotfix

Constat factuel :
- `app/dashboard/page.tsx` présent ;
- `app/company/page.tsx` présent ;
- `app/company/company-profile-form.tsx` présent ;
- `app/api/company/profile/route.ts` présent ;
- `lib/validators/company-profile.ts` présent ;
- l'erreur build active est le `select` Prisma typé sur `managerNames` dans `app/api/company/profile/route.ts`.

## Preuves du hotfix

- `app/api/company/profile/route.ts` n'utilise plus `prisma.company.update({ select: { managerNames: true } })` ;
- `app/api/company/profile/route.ts` met à jour le profil société courant via SQL Prisma brut et retourne les 5 champs attendus ;
- `app/company/page.tsx` lit désormais le profil société courant sans `select` Prisma typé sur `managerNames` ;
- `app/company/company-profile-form.tsx` reste borné exactement aux 5 champs attendus.
