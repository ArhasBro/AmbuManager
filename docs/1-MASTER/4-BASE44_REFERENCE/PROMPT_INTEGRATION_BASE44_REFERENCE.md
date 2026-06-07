Tu es expert en intégration documentaire, contrôle Git, audit de prototype Base44 et gouvernance Ambulance Manager.

Objectif : intégrer dans le repo le dossier préparé `docs/1-MASTER/4-BASE44_REFERENCE/` contenant `README_BASE44_REFERENCE.md` et `EXPORT_BASE44/`, sans modifier le code applicatif.

Périmètre autorisé :
- `docs/1-MASTER/4-BASE44_REFERENCE/**`

Périmètre interdit :
- code applicatif ;
- `app/**`, `components/**`, `lib/**`, `prisma/**` ;
- `docs/1-MASTER` hors `4-BASE44_REFERENCE/**` ;
- `docs/2-SESSIONS/**` ;
- `docs/3-TEMPLATES/**` ;
- `create_session.ps1`.

Règles :
- Base44 est une référence prototype, pas une source technique finale.
- Ne jamais copier directement le code Base44 vers l’application officielle.
- Ne pas créer de session.
- Ne pas modifier les fichiers déjà validés.

Contrôles attendus :
- `git status --short` ;
- inventaire de `docs/1-MASTER/4-BASE44_REFERENCE/` ;
- contrôle absence `.env`, `node_modules`, `dist`, `build` ;
- contrôle UTF-8 sans BOM pour les fichiers Markdown ajoutés ;
- contrôle absence de modification code.

Retour attendu :
1. Résumé court
2. Fichiers ajoutés
3. Fichiers modifiés
4. Fichiers exclus
5. Contrôles exécutés
6. Résultats des contrôles
7. Points de vigilance
8. Verdict final

Verdict final attendu :
- `INTÉGRATION BASE44 REFERENCE VALIDABLE`
- `INTÉGRATION BASE44 REFERENCE VALIDABLE SOUS RÉSERVE`
- `INTÉGRATION BASE44 REFERENCE NON VALIDABLE`
