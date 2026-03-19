# SESSION.md

## Identification
- Projet : `Investissement`
- Sous-projet : `Ambulance Manager`
- Stage : `1-ALPHA`
- Bloc : `A2`
- Session : `SESSION-20260318-06_A2_SUP-06`
- Type : `VALIDATION`
- Intitulé : `Validation du bloc support propriétaire`

## Objectif unique
Valider l’état réel du bloc support propriétaire à partir des sessions `SUP-01` à `SUP-05`, en croisant le code réellement présent, les patchs présents, les documents de session existants et les validations terminales relancées dans l’environnement courant.

## Périmètre effectivement contrôlé
- documentation maître : `docs/1-master/*`
- templates et protocole : `docs/4-templates/*`, `docs/PROTOCOLE_SESSION.md`, `docs/SOURCES_AUTORISEES.md`
- sessions : `docs/2-sessions/1-ALPHA/BLOC_A2/3-SUP/SESSION-20260318-01_A2_SUP-01` à `...05...`
- patchs : `docs/3-patches/1-ALPHA/BLOC_A2/3-SUP/SESSION-20260318-01_A2_SUP-01` à `...05...`
- code : `prisma/schema.prisma`, `prisma/seed.ts`, `lib/auth.ts`, `types/next-auth.d.ts`, `lib/rbac.ts`, `lib/permissions.ts`, `lib/permission-catalog.ts`, `lib/services/audit/support-action-trace.ts`, routes et services support touchés par `SUP-04` et `SUP-05`

## Méthode de validation
1. Relire le cadrage et le plan pour le bloc support.
2. Contrôler les documents et patchs des sessions `SUP-01` à `SUP-05`.
3. Vérifier dans le code réel :
   - rôle plateforme distinct
   - compte support nominatif hors société
   - invisibilité côté client
   - journalisation support
   - absence de droits support implicites
   - absence de cross-company implicite non maîtrisé
4. Relancer honnêtement les validations terminales disponibles dans l’environnement courant.

## Résumé exécutif
Le dépôt contient bien la modélisation minimale du rôle plateforme `SUPPORT`, le seed nominatif hors société et l’exclusion des comptes support des flux client. En revanche, le support global reste non opérationnel sur les routes métier existantes, car les garde-fous exigent encore `companyId` et refusent explicitement le support global ; la journalisation SUP-05 est donc présente en code mais non effectivement atteignable par le compte support global nominal. Les validations terminales relancées dans cet environnement ne sont pas toutes vertes.
