# NOTES

## Méthode / observations

- audit du ZIP actuel réellement disponible ;
- constat : `app/company/page.tsx`, `app/company/company-profile-form.tsx`, `app/api/company/profile/route.ts` et `lib/validators/company-profile.ts` étaient absents du ZIP ;
- audit des patchs précédemment générés hors ZIP pour identifier leur base de calcul ;
- constat : les patchs précédents avaient été calculés contre des working trees différents, ce qui explique leurs échecs sur un dépôt local déjà divergent ;
- choix de mise en oeuvre : lecture / écriture minimales via SQL brut Prisma (`$queryRaw` / `$executeRaw`) pour éviter le blocage TypeScript observé sur `managerNames` dans `CompanySelect<DefaultArgs>` ;
- aucun élargissement à `ORG-04`, `BASE-*`, `SUP-*`, onboarding, multi-sociétés ou migrations.
