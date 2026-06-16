# TEMPLATE_CREATION_BLOC_SESSIONS.md

~~~text
Tu es expert en prompts Codex et gouvernance documentaire pour Ambulance Manager.

OBJECTIF
Créer les prompts d'un bloc de sessions, sans exécuter les sessions.

PARAMÈTRES À REMPLACER
- Bloc concerné : <BLOC_ID>
- Objectif du bloc : <OBJECTIF>
- Périmètre autorisé : <PÉRIMÈTRE_AUTORISÉ>
- Périmètre interdit : <PÉRIMÈTRE_INTERDIT>
- Fichiers à lire : <FICHIERS_À_LIRE>
- Fichiers modifiables : <FICHIERS_MODIFIABLES>
- Contrôles attendus : <CONTRÔLES_ATTENDUS>
- Verdict attendu : <VERDICT_ATTENDU>

DOCUMENTS À LIRE
- `docs/1-MASTER/01-APPLICATION_WEB.md`
- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/2-SESSIONS/README_SESSIONS.md`

CONTRAINTES
- Produire uniquement des prompts.
- Ne pas exécuter les sessions.
- Ne pas modifier le repo.
- Ne pas créer de fichiers.
- Ne pas inventer de preuves.
- Ne pas valider une session à l'avance.
- Garder 1 session = 1 objectif.
- Garder 1 session = 1 dossier unique.
- Respecter les types DX / CX.
- Limiter DX à audit + cadrage sous validation, ou clôture.
- Refuser DX_DOCUMENTATION et DX_CORRECTION_DOCUMENTAIRE.
- Ne jamais créer de session FIX séparée.
- Appliquer les règles de patch selon DX / CX.

SESSIONS À PRODUIRE
<LISTE_DES_SESSIONS_ATTENDUES>

FORMAT ATTENDU POUR CHAQUE SESSION
## <SESSION_ID> — <TITRE_SESSION>

### Prompt Codex de lancement
```text
Session : <SESSION_ID>
Bloc : <BLOC_ID>
Type : <DX_OU_CX>
Objectif unique : <OBJECTIF>
Périmètre autorisé : <PÉRIMÈTRE_AUTORISÉ>
Périmètre interdit : <PÉRIMÈTRE_INTERDIT>
Fichiers à lire : <FICHIERS_À_LIRE>
Fichiers modifiables : <FICHIERS_MODIFIABLES>
Contrôles attendus : <CONTRÔLES_ATTENDUS>
Verdict attendu : <VERDICT_ATTENDU>
```

### Prompt ChatGPT de contrôle
```text
Contrôle le retour brut Codex de la session <SESSION_ID>.
Objectif attendu : <OBJECTIF>
Contrôler uniquement le retour brut fourni et les fichiers joints au prompt courant.
Toute commande non montrée = non prouvée.
Toute information absente = INFORMATION NON FOURNIE — À CONFIRMER.
Un fix ne crée jamais une nouvelle session.
DX_DOCUMENTATION et DX_CORRECTION_DOCUMENTAIRE sont refusées.
Verdict attendu : VALIDABLE / VALIDABLE SOUS RÉSERVE / NON VALIDABLE.
```

### Verdict de contrôlabilité
OUI / NON

CONTRÔLABILITÉ
- Le prompt Codex doit être exécutable sans contexte implicite.
- Le prompt ChatGPT doit pouvoir contrôler avec les seules preuves fournies.
- Tout manque doit être marqué : INFORMATION NON FOURNIE — À CONFIRMER.

INTERDICTIONS
- Ne pas lancer `create_session.ps1`.
- Ne pas créer de vraie session.
- Ne pas modifier `docs/1-MASTER/**`.
- Ne pas modifier `docs/2-SESSIONS/**`.
- Ne pas modifier `docs/3-TEMPLATES/**`.
- Ne pas modifier le code applicatif.
- Ne pas produire de verdict de validation finale.
- Ne pas produire de session séparée `FIX-01`.
~~~
