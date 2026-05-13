# EVIDENCES

Elements factuels utilises pendant la session.

---

## Sources utilisees

### Documentation officielle lue

- docs/1-master/DOCUMENT_MAITRE.md
- docs/1-master/PLAN_DE_DEVELOPPEMENT.md
- docs/3-templates/TEMPLATE_DEBUT_SESSION.md
- docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md
- docs/1-master/ETAT_GLOBAL_PROJET.md
- docs/1-master/REGISTRE_DECISIONS.md

Constats documentaires utiles :
- DOCUMENT_MAITRE : multi-tenant strict via companyId, authentification/session
  enrichie, RBAC/permissions, convention API.
- PLAN_DE_DEVELOPPEMENT : SEC-01 est l'audit securite ; SEC-LOT-02 est la suite
  correction/completion ; une session AUDIT doit sortir un verdict formel.
- REGISTRE_DECISIONS : NO_PATCH est valide lorsqu'aucun patch repo officiel
  n'est produit.

### Code et configurations examines

- lib/auth.ts : NextAuth Credentials, bcrypt.compare, session JWT, enrichissement
  role/platformRole/companyId, login audit.
- app/api/auth/[...nextauth]/route.ts : handler NextAuth.
- types/next-auth.d.ts : extension Session/JWT.
- proxy.ts : matcher observe sur /dashboard, /vehicles, /planning, /users.
- lib/rbac.ts, lib/permissions.ts, lib/permission-catalog.ts : RBAC et
  permissions ALPHA.
- prisma/schema.prisma : Role, PlatformRole, User, Permission, UserPermission,
  PlanningAuditLog, LoginAuditLog, companyId.
- app/api/**/route.ts : routes sensibles API.
- app/**/page.tsx : gardes serveur des pages applicatives.
- lib/services/audit/* et lib/services/planning/planning-audit.ts : logs audit.
- prisma/seed.ts : seeds, hash bcrypt, fallback dev conditionnel.
- .env et .gitignore : variables locales et regles d'ignore.

### Elements observes par commandes

- `Get-ChildItem app/api -Recurse -Filter route.ts` :
  - total routes API : 37
  - routes avec getServerSession : 36
  - route sans getServerSession : app/api/auth/[...nextauth]/route.ts
- `Get-ChildItem app -Recurse -Filter page.tsx` :
  - total pages : 11
  - pages avec getServerSession : 10
  - page sans getServerSession : app/login/page.tsx
- `git ls-files -- .env .env*` :
  - aucun fichier .env suivi par Git observe.
- `.gitignore` :
  - `.env*` ignore.

### Validations terminales

- `npm.cmd run lint` : OK.
- `npx.cmd prisma validate` : OK apres relance autorisee hors sandbox, le premier
  essai ayant echoue sur telechargement/acces au binaire Prisma.
- `npm.cmd run test:quality` : OK apres relance autorisee hors sandbox, le
  premier essai ayant echoue avec `spawn EPERM`.

Commandes non executees :
- `npm run build` : non execute, aucun patch code n'ayant ete produit et les
  validations non destructives ci-dessus suffisant a documenter l'etat d'audit.

### Secrets

Le fichier .env local contient des valeurs sensibles ou assimilables a des
secrets. Les valeurs exactes ne sont pas reproduites dans ce livrable.
