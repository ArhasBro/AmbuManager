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
- `prisma/schema.prisma`
- `lib/permissions.ts`
- `app/api/company/rules/route.ts`

## État réel du ZIP avant correction

Constat factuel :
- `app/dashboard/page.tsx` présent ;
- `app/company/page.tsx` absent ;
- `app/company/company-profile-form.tsx` absent ;
- `app/api/company/profile/route.ts` absent ;
- `lib/validators/company-profile.ts` absent ;
- les fichiers de session `.md` existaient déjà au format placeholder.

## Audit des patchs précédents

Patchs audités hors ZIP :
- `ORG-03.diff`
- `ORG-03-rectif-01.diff`
- `ORG-03-rectif-02.diff`
- `ORG-03-rectif-03.diff`

Constat :
- `ORG-03.diff` installe la session depuis un état sans code `ORG-03`, mais utilise Prisma typé sur `managerNames` ;
- `ORG-03-rectif-01.diff` suppose que `ORG-03.diff` a déjà été appliqué ;
- `ORG-03-rectif-02.diff` et `ORG-03-rectif-03.diff` sont calculés contre d'autres working trees documentaires ;
- ces patches ne peuvent donc pas être présumés applicables sur un dépôt local déjà divergent du ZIP reçu.

## Preuves de la correction finale

- `app/company/page.tsx` lit le profil société courant via `companyId` ;
- `app/company/company-profile-form.tsx` expose exactement les 5 champs attendus ;
- `app/api/company/profile/route.ts` met à jour le profil société courant sans `select` Prisma typé sur `managerNames` ;
- `app/dashboard/page.tsx` expose le lien `Profil société` pour `ADMIN` / `GERANT`.
