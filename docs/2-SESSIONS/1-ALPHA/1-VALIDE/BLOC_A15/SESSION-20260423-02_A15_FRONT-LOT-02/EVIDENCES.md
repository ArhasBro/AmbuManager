# EVIDENCES

Elements factuels utilises pendant la session.

---

## Sources utilisees

Sources documentaires maitres :

- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`

Audit precedent A15 utilise :

- `docs/2-sessions/1-ALPHA/BLOC_A15/SESSION-20260423-01_A15_FRONT-01/SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A15/SESSION-20260423-01_A15_FRONT-01/NOTES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A15/SESSION-20260423-01_A15_FRONT-01/RESULTATS.md`

Code frontend modifie (preuve patch) :

- `app/app-shell.tsx`
- `app/layout.tsx`
- `app/globals.css`
- `app/dashboard/page.tsx`
- `app/dashboard/logout-button.tsx`
- `app/users/page.tsx`
- `app/users/users-list-client.tsx`
- `app/vehicles/page.tsx`
- `app/vehicles/vehicles-client.tsx`
- `app/templates/page.tsx`
- `app/templates/templates-client.tsx`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/planning/manual-planning-panel.tsx`

## Validations terminales executees

Commandes lancees et resultats reels :

1. `npm run lint`
   - resultat : ECHEC
   - motif factuel : blocage PowerShell `npm.ps1` (ExecutionPolicy).

2. `npm run build`
   - resultat : ECHEC
   - motif factuel : meme blocage PowerShell `npm.ps1` (ExecutionPolicy).

3. `npm.cmd run lint`
   - resultat : OK
   - sortie utile : `eslint .` sans erreur.

4. `npm.cmd run build` (sandbox standard)
   - resultat : ECHEC
   - motif factuel : `Error: spawn EPERM` pendant `Running TypeScript`.

5. `npm.cmd run build` (relance hors sandbox)
   - resultat : OK
   - sortie utile :
     - build Next compile : OK
     - TypeScript : OK
     - generation des pages : OK.

## Applicabilite patch

Commandes executees :

1. `git apply --check "docs/2-sessions/1-ALPHA/BLOC_A15/SESSION-20260423-02_A15_FRONT-LOT-02/PATCH/PATCH__SESSION-20260423-02_A15_FRONT-LOT-02.diff"`
   - resultat reel final : ECHEC
   - sortie utile : `patch does not apply` sur les fichiers frontend modifies.

2. `git apply "docs/2-sessions/1-ALPHA/BLOC_A15/SESSION-20260423-02_A15_FRONT-LOT-02/PATCH/PATCH__SESSION-20260423-02_A15_FRONT-LOT-02.diff"`
   - resultat reel final : ECHEC
   - sortie utile : `patch does not apply` sur les memes fichiers + `trailing whitespace` signale ligne 1302 du diff.

Contexte factuel :

- un premier essai des memes commandes a retourne `No valid patches in input`, lie a un encodage non compatible du fichier diff apres redirection PowerShell ;
- le fichier diff a ensuite ete normalise en UTF-8 sans BOM ;
- apres normalisation, les commandes ont bien ete interpretees et ont echoue logiquement car les modifications du patch sont deja presentes dans l'arbre courant.
- Le patch correspond aux modifications effectivement appliquees manuellement.
- Les commandes `git apply --check` et `git apply` ont ete relancees apres application des changements, ce qui explique l'echec `patch does not apply` sur un depot deja patche.
