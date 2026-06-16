# README PATCH

Session : `SESSION-20260616-05_CX_T1_CORRECTION-SHELL-ACTIONS-CONTEXTE`

Patch applicatif :

- `PATCH__SESSION-20260616-05_CX_T1_CORRECTION-SHELL-ACTIONS-CONTEXTE.diff`

Contenu du patch :

- `app/app-shell.tsx`
- `app/globals.css`

Objet :

- retirer les fausses affordances de menu societe/profil ;
- conserver uniquement les actions visibles fonctionnelles du shell/topbar ;
- ajuster le style minimalement apres suppression du chevron profil sidebar.

Application :

```powershell
git apply --check "docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-05_CX_T1_CORRECTION-SHELL-ACTIONS-CONTEXTE/PATCH/PATCH__SESSION-20260616-05_CX_T1_CORRECTION-SHELL-ACTIONS-CONTEXTE.diff"
git apply "docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-05_CX_T1_CORRECTION-SHELL-ACTIONS-CONTEXTE/PATCH/PATCH__SESSION-20260616-05_CX_T1_CORRECTION-SHELL-ACTIONS-CONTEXTE.diff"
```
