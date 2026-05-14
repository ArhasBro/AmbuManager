# EVIDENCES

Elements factuels utilises pendant la session.

---

## Sources utilisees

- Code UI cible :
  - `app/vehicles/vehicles-client.tsx`
  - `app/a24-vehicles-templates.css`
  - `app/vehicles/page.tsx` (controle uniquement)
- Patches session :
  - `PATCH/PATCH__SESSION-20260513-06_A26_A26-UI-06.diff`
  - `PATCH/PATCH__SESSION-20260513-06_A26_A26-UI-06_FIX-01.diff`
  - `PATCH/PATCH__SESSION-20260513-06_A26_A26-UI-06_FIX-02.diff`
  - `PATCH/PATCH__SESSION-20260513-06_A26_A26-UI-06_FIX-03.diff`

## Preuve patch FIX-03 (UTF-8 sans BOM)

- Chemin : `docs/2-SESSIONS/1-ALPHA/BLOC_A26/SESSION-20260513-06_A26_A26-UI-06/PATCH/PATCH__SESSION-20260513-06_A26_A26-UI-06_FIX-03.diff`
- Taille : `8844` octets
- UTF8_BOM=False
- Debut du fichier :

```diff
diff --git a/app/a24-vehicles-templates.css b/app/a24-vehicles-templates.css
index 798e23b..b801bcd 100644
--- a/app/a24-vehicles-templates.css
+++ b/app/a24-vehicles-templates.css
```

## Preuve git apply --check (chaine complete)

Commande sequencee executee :

```powershell
git -C C:\Users\arche\ambulance-manager worktree add --detach C:\Users\arche\ambulance-manager\.tmp_fix03_check2 HEAD
git -C C:\Users\arche\ambulance-manager\.tmp_fix03_check2 apply --whitespace=nowarn C:\Users\arche\ambulance-manager\docs\2-SESSIONS\1-ALPHA\BLOC_A26\SESSION-20260513-06_A26_A26-UI-06\PATCH\PATCH__SESSION-20260513-06_A26_A26-UI-06.diff
git -C C:\Users\arche\ambulance-manager\.tmp_fix03_check2 apply --whitespace=nowarn C:\Users\arche\ambulance-manager\docs\2-SESSIONS\1-ALPHA\BLOC_A26\SESSION-20260513-06_A26_A26-UI-06\PATCH\PATCH__SESSION-20260513-06_A26_A26-UI-06_FIX-01.diff
git -C C:\Users\arche\ambulance-manager\.tmp_fix03_check2 apply --whitespace=nowarn C:\Users\arche\ambulance-manager\docs\2-SESSIONS\1-ALPHA\BLOC_A26\SESSION-20260513-06_A26_A26-UI-06\PATCH\PATCH__SESSION-20260513-06_A26_A26-UI-06_FIX-02.diff
git -C C:\Users\arche\ambulance-manager\.tmp_fix03_check2 apply --check C:\Users\arche\ambulance-manager\docs\2-SESSIONS\1-ALPHA\BLOC_A26\SESSION-20260513-06_A26_A26-UI-06\PATCH\PATCH__SESSION-20260513-06_A26_A26-UI-06_FIX-03.diff
```

Sortie utile :

```text
RC=0 (worktree add)
RC=0 (apply principal)
RC=0 (apply FIX-01)
RC=0 (apply FIX-02)
RC=0 (apply --check FIX-03)
```

## Preuve npm run lint

Commande :

```powershell
npm run lint
```

Resultat :

```text
Code retour: 0
18 warnings eslint dans app/planning/planning-client.tsx (hors perimetre session)
0 error
```

## Preuve npm run build

Commande :

```powershell
npm run build
```

Resultat :

```text
Code retour: 0
Next.js build compile successfully
Routes generees incluant /vehicles et /api/vehicles
```