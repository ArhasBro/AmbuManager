# RESULTATS

## Resultats obtenus

### Decision patch

NO_PATCH.

Aucun blocage materiel n'a empeche l'audit. Aucun patch code n'a ete produit ni
applique.

### Analyse rapide

Le socle securite existe mais il n'est pas suffisamment durci :
- authentification presente via NextAuth Credentials ;
- session enrichie avec role, platformRole et companyId ;
- routes API majoritairement protegees par getServerSession ;
- scoping tenant largement present via companyId ;
- RBAC/permissions disponibles ;
- audit logs presents pour connexions et planning/autoschedule ;
- protections de base encore incompletes.

### Points conformes constates

- Authentification Credentials presente dans lib/auth.ts.
- Mot de passe compare avec bcrypt.
- Utilisateur inactif refuse a la connexion.
- Session JWT enrichie avec role, platformRole et companyId.
- Modele Prisma contenant Role, PlatformRole, User, Permission,
  UserPermission, PlanningAuditLog et LoginAuditLog.
- 37 routes API observees ; 36 utilisent getServerSession, la seule exception
  etant la route NextAuth app/api/auth/[...nextauth]/route.ts.
- 11 pages app observees ; 10 utilisent getServerSession, la seule exception
  etant app/login/page.tsx.
- Les principales routes sensibles verifiees filtrent par companyId.
- La route audit applique canViewAudit et resout le companyId via la session ou
  le cas support global.
- .env* est ignore par .gitignore et git ls-files ne remonte pas .env.

### Points non conformes constates

- Les schemas de creation et reset de mot de passe acceptent une longueur
  minimale de 1 caractere.
- La configuration locale .env contient des valeurs sensibles ou assimilables a
  des secrets en clair : URL BDD avec identifiants, secret NextAuth, mot de
  passe seed admin. Les valeurs exactes ne sont pas reprises ici.
- Le proxy applicatif ne couvre que /dashboard, /vehicles, /planning et /users ;
  plusieurs pages protegees reposent uniquement sur leurs gardes serveur.
- Les protections anti-bruteforce, verrouillage de compte, rotation de session,
  duree explicite de session, politique cookie explicite et CSRF applicatif
  hors mecanismes NextAuth ne sont pas observees dans le code audite.
- Certains controles d'acces restent heterogenes : permissions centralisees pour
  plusieurs modules, mais roles durs pour d'autres operations sensibles
  (exemples : vehicules POST ADMIN, depots ADMIN/GERANT, profil societe
  ADMIN/GERANT, imports ADMIN/GERANT).

### Points incomplets constates

- Couverture audit incomplete : les logs couvrent login et planning/autoschedule,
  mais pas uniformement les changements users, vehicles, templates, company
  profile, company rules, depots et imports.
- La fonction traceSupportAction existe mais n'ecrit que pour PlatformRole.SUPPORT
  avec supportReason obligatoire ; les routes observees ne fournissent pas ce
  supportReason.
- La gestion des secrets/environnements n'est pas formalisee dans un livrable
  observe pendant cette session.
- La politique de mot de passe initial et de reset est fonctionnelle mais pas
  durcie.
- La sauvegarde/restauration, mentionnee comme suite A16 dans le plan, n'a pas
  de mecanisme observe dans le perimetre SEC-01.

### Points a confirmer

- Environnement cible de production, source reelle des secrets et rotation du
  NEXTAUTH_SECRET : INFORMATION NON FOURNIE — À CONFIRMER.
- Politique produit attendue pour longueur/complexite/expiration des mots de
  passe : INFORMATION NON FOURNIE — À CONFIRMER.
- Niveau attendu de protection CSRF hors NextAuth : INFORMATION NON FOURNIE — À CONFIRMER.
- Role exact du support global hors consultation audit : INFORMATION NON FOURNIE — À CONFIRMER.
- Strategie de sauvegarde/restauration : INFORMATION NON FOURNIE — À CONFIRMER.

### Verdict formel d'audit

non conforme.

### Consequence methodologique

La suite logique du bloc est SEC-LOT-02.

Motif : l'audit constate a la fois des corrections necessaires (mots de passe,
secrets, durcissement de protections) et des completions necessaires (audit logs,
homogeneisation des controles, documentation/env, protections de base). SEC-LOT-02
est la session prevue par le plan officiel pour correction et/ou completion du
socle securite.

---

## Documents modifies

- docs/2-sessions/1-ALPHA/BLOC_A16/SESSION-20260423-05_A16_SEC-01/SESSION.md
- docs/2-sessions/1-ALPHA/BLOC_A16/SESSION-20260423-05_A16_SEC-01/RESULTATS.md
- docs/2-sessions/1-ALPHA/BLOC_A16/SESSION-20260423-05_A16_SEC-01/EVIDENCES.md
- docs/2-sessions/1-ALPHA/BLOC_A16/SESSION-20260423-05_A16_SEC-01/NOTES.md
- docs/2-sessions/1-ALPHA/BLOC_A16/SESSION-20260423-05_A16_SEC-01/FIN_SESSION.md
- docs/2-sessions/1-ALPHA/BLOC_A16/SESSION-20260423-05_A16_SEC-01/PATCH/NO_PATCH.md
