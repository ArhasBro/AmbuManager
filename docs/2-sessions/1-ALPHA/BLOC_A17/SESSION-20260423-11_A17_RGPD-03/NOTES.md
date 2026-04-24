# NOTES

Notes de travail de la session.

---

## Méthode / observations

- Lecture documentaire ciblee uniquement :
  - noyau obligatoire `DOCUMENT_MAITRE.md` et `PLAN_DE_DEVELOPPEMENT.md` ;
  - base RGPD `RGPD_BASE_MINIMALE.md` ;
  - historique utile `RGPD-01` et `RGPD-LOT-02`.
- Regle de source appliquee strictement :
  - documentation officielle + code reel du depot ;
  - en cas de contradiction : `CODE > DOCUMENTATION`.
- Controle technique cible sur les preuves RGPD minimales :
  - cartographie de donnees dans `prisma/schema.prisma` ;
  - finalites et mentions dans `docs/1-master/RGPD_BASE_MINIMALE.md` et
    `app/privacy/page.tsx` ;
  - controles d'acces via `lib/auth.ts`, `lib/permissions.ts`, `lib/rbac.ts` ;
  - traces de mutations personnelles via `writePersonalDataAudit(...)` ;
  - flux export/import via `app/api/planning/exports/route.ts`,
    `lib/planning/export.ts`, `app/api/imports/route.ts`,
    `lib/imports/import-engine.ts`.
- Residuel reel detecte pendant validation :
  - `npm run test:quality` echouait sur un test statique qui attendait le texte
    source `Mentions d'information - Donnees personnelles` alors que
    `app/privacy/page.tsx` expose `d&apos;information` pour rester conforme au
    lint JSX.
- Arbitrage retenu :
  - correctif minimal sur le test statique uniquement ;
  - pas de modification de la page applicative ni du registre RGPD ;
  - patch-first respecte avec creation du diff avant application.

