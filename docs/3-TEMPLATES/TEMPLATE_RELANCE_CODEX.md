# TEMPLATE_RELANCE_CODEX.md

```text
Tu es Codex. Relance limitée pour Ambulance Manager.

OBJECTIF
Corriger uniquement les points bloquants du retour précédent.

PARAMÈTRES À REMPLACER
- Session : <SESSION_ID>
- Bloc : <BLOC_ID>
- Type : <DX_OU_CX>
- Objectif initial : <OBJECTIF>
- Périmètre autorisé : <PÉRIMÈTRE_AUTORISÉ>
- Périmètre interdit : <PÉRIMÈTRE_INTERDIT>
- Fichiers à lire : <FICHIERS_À_LIRE>
- Fichiers modifiables : <FICHIERS_MODIFIABLES>
- Contrôles attendus : <CONTRÔLES_ATTENDUS>
- Verdict attendu : <VERDICT_ATTENDU>

POINTS BLOQUANTS À TRAITER
- Preuves manquantes : <À_RENSEIGNER_OU_SANS_OBJET>
- Commandes non montrées : <À_RENSEIGNER_OU_SANS_OBJET>
- Fichiers hors périmètre : <À_RENSEIGNER_OU_SANS_OBJET>
- Patch trop large : <À_RENSEIGNER_OU_SANS_OBJET>
- Modification non autorisée : <À_RENSEIGNER_OU_SANS_OBJET>
- Encodage non prouvé : <À_RENSEIGNER_OU_SANS_OBJET>
- Test non exécuté : <À_RENSEIGNER_OU_SANS_OBJET>
- Retour incomplet : <À_RENSEIGNER_OU_SANS_OBJET>
- Correction minimale demandée : <À_RENSEIGNER_OU_SANS_OBJET>

RÈGLES DE RELANCE
- Ne pas refaire toute la session.
- Produire un correctif minimal.
- Ne pas régénérer un patch complet déjà appliqué.
- Ne pas créer une nouvelle session pour un fix.
- Intégrer le correctif au dossier de session original.
- Respecter la doctrine DX stricte : audit + cadrage sous validation, ou clôture uniquement.
- Refuser DX_DOCUMENTATION et DX_CORRECTION_DOCUMENTAIRE.
- Une session DX ne produit pas de patch applicatif `.diff`.
- Une session CX qui modifie du code, des scripts, la structure technique, Prisma, Tailwind, API, UI, composants ou fichiers applicatifs doit produire un patch `.diff` dans `PATCH/`.
- Répondre uniquement aux points bloquants.
- Fournir les preuves manquantes.
- Ne modifier que les fichiers autorisés.
- Ne pas créer de fichier hors périmètre.
- Toute commande non montrée = non prouvée.
- Toute information absente = INFORMATION NON FOURNIE — À CONFIRMER.

TRAVAIL DEMANDÉ
1. Lire uniquement les fichiers nécessaires.
2. Corriger uniquement ce qui est bloquant.
3. Exécuter uniquement les contrôles demandés ou justifier l'impossibilité.
4. Fournir les preuves manquantes.
5. Terminer par un verdict.

STRUCTURE DE RETOUR ATTENDUE
1. Points bloquants traités
2. Fichiers lus
3. Fichiers modifiés
4. Correctif minimal appliqué
5. Commandes exécutées
6. Résultats des commandes
7. Preuves complétées
8. Points encore non prouvés
9. Verdict final

VERDICTS POSSIBLES
- CORRECTION VALIDABLE
- CORRECTION VALIDABLE SOUS RÉSERVE
- CORRECTION NON VALIDABLE
- PREUVES COMPLÉTÉES
- PREUVES INSUFFISANTES
```
