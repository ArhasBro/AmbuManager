# NOTES

Notes de travail de la session.

---

## Methode / observations

- Relecture ciblee des documents obligatoires et strictement utiles au bloc A18.
- Relecture des resultats `BDD-01`, `BDD-LOT-02` et `BDD-03` pour partir des
  constats valides du bloc et ne pas rejouer inutilement tout A18.
- Verification du code reel actuellement present dans le depot sur :
  `prisma/schema.prisma`, `prisma/seed.ts`, `prisma.config.ts`, `.env`,
  `docs/BDD_OPERATIONS_SENSIBLES.md`, `scripts/db-backup.ps1`,
  `scripts/db-restore.ps1`.
- Relance des validations terminales pertinentes :
  `prisma validate`, `prisma generate`, `prisma migrate status`,
  `prisma migrate diff` schema vs datasource, `prisma db seed`, `lint`,
  `build`.
- Lecture SQL en lecture seule pour confirmer le nombre de tables, le nombre de
  migrations appliquees, les societes presentes et l'absence de compte support
  seed par defaut.

Observations utiles :

- Le correctif `BDD-LOT-02` est bien present dans le code reel ; aucune derive
  schema/base analogue a `BDD-01` n'a ete retrouvee.
- Le seed reste rejouable dans l'environnement local courant grace a
  `SEED_USER_PASSWORD` present dans `.env`.
- Le point `SHADOW_DATABASE_URL` reste un sujet de gouvernance optionnel deja
  documente, pas un residuel bloquant de cloture.
- Aucun patch code n'est justifie pour cette cloture.
