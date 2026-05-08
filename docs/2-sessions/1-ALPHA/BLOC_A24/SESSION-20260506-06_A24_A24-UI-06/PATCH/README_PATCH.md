# README_PATCH - SESSION-20260506-06_A24_A24-UI-06

## Patch principal

- `PATCH__SESSION-20260506-06_A24_A24-UI-06.diff`

## Portee

Patch code cible A24-UI-06 (Utilisateurs/RH visuel) :

- `app/layout.tsx`
- `app/users/page.tsx`
- `app/users/users-list-client.tsx`
- `app/users/users-side-panel-client.tsx`
- `app/a24-users-rh.css`

## Verification patch

Commande executee :

```powershell
git apply --check "C:/Users/arche/ambulance-manager/docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-06_A24_A24-UI-06/PATCH/PATCH__SESSION-20260506-06_A24_A24-UI-06.diff"
```

Resultat : `OK` (code retour `0`) sur worktree propre.

## Encodage patch

- UTF-8 sans BOM
- premier octets : `64 69 66 66 ...`
- premiere ligne : `diff --git ...`
- aucun caractere nul
