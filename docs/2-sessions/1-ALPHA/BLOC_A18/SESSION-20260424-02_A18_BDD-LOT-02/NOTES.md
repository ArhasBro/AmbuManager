# NOTES

## Methode / observations

### 1. Base documentaire reellement relue
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/3-templates/TEMPLATE_DEBUT_SESSION.md`
- documentation validee de `SESSION-20260424-01_A18_BDD-01` :
  - `SESSION.md`
  - `NOTES.md`
  - `EVIDENCES.md`
  - `RESULTATS.md`
  - `FIN_SESSION.md`

### 2. Logique de traitement appliquee
1. Relire les constats formels de `BDD-01` pour ne pas rejouer l'audit complet.
2. Verifier en code et en base uniquement les points necessaires au lot :
   - derive `schema.prisma` vs migrations/base ;
   - rejouabilite du seed ;
   - variables d'environnement BDD ;
   - documentation des operations sensibles.
3. Generer d'abord un patch principal `.diff`, puis l'appliquer avec `git apply`.
4. Relancer les validations Prisma, seed, lint et build sur le depot reel.
5. Finaliser ensuite la documentation de session dans un diff documentaire separe.

### 3. Ecart `schema.prisma` corrige
`BDD-01` avait prouve deux derives reelles, toutes deux corrigees ici :
- `User.company` : ajout explicite de `onDelete: Restrict` pour realigner le schema Prisma sur la FK `User_companyId_fkey` des migrations / de la base locale ;
- `ShiftTemplate.secondaryAllowedRoles` : ajout de `@default([])` pour realigner le schema Prisma sur la migration `20260407120000_tpl07_13_templates_admin_module`.

### 4. Seed complete sans doublon local
Le seed ne devait pas recreer une societe `Ambulance Manager` supplementaire sur la base locale auditee, qui contient deja `SC Ambulances`.

Correction appliquee :
- resolution prealable du tenant par `adminEmail` ;
- reutilisation d'un alias de societe deja present (`SC Ambulances`) au lieu de creer un doublon ;
- ajout de `SEED_USER_PASSWORD` dans `.env` pour rendre le seed rejouable dans l'environnement courant sans activer `ALLOW_INSECURE_SEED_DEFAULTS=true`.

### 5. Environnements et operations sensibles
- `prisma.config.ts` accepte maintenant `SHADOW_DATABASE_URL` quand elle est fournie ;
- `docs/BDD_OPERATIONS_SENSIBLES.md` documente les variables BDD, la sauvegarde, la restauration, le reset et le diff Prisma qui requiert une shadow database dediee ;
- aucune nouvelle migration SQL n'a ete creee car `BDD-01` avait deja etabli que migrations et base locale etaient alignees ; la derive etait dans `schema.prisma`, pas dans l'historique SQL.
