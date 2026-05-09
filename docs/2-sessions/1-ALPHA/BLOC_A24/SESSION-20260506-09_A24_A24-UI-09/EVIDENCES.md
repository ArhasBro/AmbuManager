# EVIDENCES

Elements factuels utilises pendant la session.

---

## 1. Lecture documentaire obligatoire

### Commande
`Get-Content docs/1-master/DOCUMENT_MAITRE.md -Encoding UTF8`

### Extrait terminal reel
`# Ambulance Manager â€” DOCUMENT_MAITRE`

### Resultat
Lecture effectuee.

### Code retour
`0`

---

### Commande
`Get-Content docs/1-master/PLAN_DE_DEVELOPPEMENT.md -Encoding UTF8`

### Extrait terminal reel
`# Ambulance Manager â€” PLAN_DE_DEVELOPPEMENT`

### Resultat
Lecture effectuee.

### Code retour
`0`

---

## 2. Lecture references A24

### Commandes
- `Get-Content docs/1-master/REFERENCE_UI_UX_A24.md -Encoding UTF8`
- `Get-Content docs/1-master/MAQUETTE/README_MAQUETTES_A24.md -Encoding UTF8`
- `Get-Content docs/1-master/MAQUETTE/SPEC_UI_UX_MAQUETTES_AMBULANCE_MANAGER.md -Encoding UTF8`

### Extrait terminal reel
- `# Ambulance Manager â€” RÃ‰FÃ‰RENCE UI/UX A24`
- `# README â€” Maquettes officielles A24`
- `# SpÃ©cification UI/UX codable â€” Maquettes PNG Ambulance Manager`

### Resultat
References A24 lues.

### Code retour
`0`

---

## 3. Consolidation sessions A24-UI-01 -> A24-UI-08

### Commande
Boucle de lecture des `RESULTATS.md` + `FIN_SESSION.md` des sessions 01 a 08.

### Extrait terminal reel
- `===== docs/.../A24-UI-08/RESULTATS.md =====`
- `Verdict : NON CONFORME (UI/UX) vis-a-vis de Planning_V1.2.png`

### Resultat
Perimetre deja traite et residuels historiques consolides.

### Code retour
`0`

---

## 4. Demarrage application locale

### Commande
`npm run dev -- --hostname 127.0.0.1 --port 3200`

### Extrait terminal reel
- `Next.js 16.1.6 (Turbopack)`
- `Local:         http://127.0.0.1:3200`
- `Ready in 2.2s`

### Resultat
Application disponible pour captures runtime.

### Code retour
`0`

---

## 5. Generation session authentifiee technique

### Commandes
- `Invoke-WebRequest http://127.0.0.1:3200/api/auth/csrf`
- `Invoke-WebRequest -Method Post http://127.0.0.1:3200/api/auth/callback/credentials`

### Extrait terminal reel
- `CSRF_STATUS=200`
- `LOGIN_STATUS=200`
- `next-auth.session-token=...`

### Resultat
Cookie de session obtenu pour captures connectees.

### Code retour
`0`

---

## 6. Incident technique capture (encodage JSON)

### Commande
`npx playwright screenshot ... --load-storage=.codex-temp/storage-auth-light-ui09.json ...`

### Extrait terminal reel
`SyntaxError: Error reading storage state ... Unexpected token '﻿' ... is not valid JSON`

### Resultat
Premier essai en echec (BOM). Correction appliquee par reecriture UTF-8 sans BOM, puis relance.

### Code retour
`1`

---

## 7. Captures reelles produites

### Commandes
- `npx playwright screenshot --device="Desktop Chrome" --wait-for-timeout=1800 --full-page http://127.0.0.1:3200/login .../CAPTURES/login_light_ui09.png`
- `npx playwright screenshot --device="Desktop Chrome" --wait-for-timeout=1800 --full-page --load-storage=.codex-temp/storage-auth-light-ui09.json http://127.0.0.1:3200/dashboard .../CAPTURES/LIGHT/dashboard_light_ui09.png`
- `npx playwright screenshot --device="Desktop Chrome" --wait-for-timeout=1800 --full-page --load-storage=.codex-temp/storage-auth-dark-ui09.json http://127.0.0.1:3200/dashboard .../CAPTURES/DARK/dashboard_dark_ui09.png`
- idem sur : planning, users, vehicles, templates, company, depots, audit, onboarding, privacy.

### Extrait terminal reel
- `Capturing screenshot into ...\CAPTURES\LIGHT\planning_light_ui09.png`
- `Capturing screenshot into ...\CAPTURES\DARK\planning_dark_ui09.png`
- `Capturing screenshot into ...\CAPTURES\login_dark_ui09.png`

### Resultat
22 captures produites (11 pages x clair/sombre, login inclus).

### Code retour
`0`

---

## 8. Arret serveur local

### Commandes
- `Get-NetTCPConnection -LocalPort 3200 -State Listen`
- `Stop-Process -Id <pid>`
- verification: `Invoke-WebRequest http://127.0.0.1:3200/login`

### Extrait terminal reel
- `KILLED_PIDS=57008`
- `SERVER_DOWN`

### Resultat
Serveur de validation arrete proprement.

### Code retour
`0`

---

## 9. Etat git final

### Commande
`git status --short`

### Extrait terminal reel
```txt
 M docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-09_A24_A24-UI-09/EVIDENCES.md
 M docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-09_A24_A24-UI-09/FIN_SESSION.md
 M docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-09_A24_A24-UI-09/NOTES.md
 M docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-09_A24_A24-UI-09/PATCH/NO_PATCH.md
 M docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-09_A24_A24-UI-09/RESULTATS.md
 M docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-09_A24_A24-UI-09/SESSION.md
?? docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-09_A24_A24-UI-09/CAPTURES/
?? docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-09_A24_A24-UI-09/PATCH/NO_PATCH_CODE.md
?? docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-09_A24_A24-UI-09/PATCH/README_PATCH.md
?? docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-09_A24_A24-UI-09/RAPPORT_VALIDATION_UI_UX_A24.md
```

### Resultat
Modifications limitees au dossier session A24-UI-09.

### Code retour
`0`

---

## 10. Controle encodage des .md produits (UTF-8 sans BOM)

### Commande
Lecture des 3 premiers octets des `.md` produits.

### Extrait terminal reel
```txt
docs/.../SESSION.md => FIRST_BYTES=35,32,83
docs/.../NOTES.md => FIRST_BYTES=35,32,78
docs/.../EVIDENCES.md => FIRST_BYTES=35,32,69
docs/.../RESULTATS.md => FIRST_BYTES=35,32,82
docs/.../FIN_SESSION.md => FIRST_BYTES=35,32,70
docs/.../RAPPORT_VALIDATION_UI_UX_A24.md => FIRST_BYTES=35,32,82
docs/.../PATCH/README_PATCH.md => FIRST_BYTES=35,32,82
docs/.../PATCH/NO_PATCH_CODE.md => FIRST_BYTES=35,32,78
docs/.../PATCH/NO_PATCH.md => FIRST_BYTES=35,32,78
```

### Resultat
Aucun fichier `.md` produit ne commence par `239,187,191` (BOM UTF-8). Encodage valide.

### Code retour
`0`

---

## 11. Creation et verification ZIP final

### Commande
`Compress-Archive -Path <session/*> -DestinationPath SESSION-20260506-09_A24_A24-UI-09_DOCS_FINAL.zip`

### Extrait terminal reel
- `ZIP_CREATED=C:\Users\arche\ambulance-manager\docs\2-sessions\1-ALPHA\BLOC_A24\SESSION-20260506-09_A24_A24-UI-09\SESSION-20260506-09_A24_A24-UI-09_DOCS_FINAL.zip`
- Entrees ZIP (extrait):
  - `CAPTURES\login_dark_ui09.png`
  - `CAPTURES\login_light_ui09.png`
  - `CAPTURES\DARK\planning_dark_ui09.png`
  - `CAPTURES\LIGHT\planning_light_ui09.png`
  - `PATCH\NO_PATCH.md`
  - `PATCH\NO_PATCH_CODE.md`
  - `PATCH\README_PATCH.md`
  - `EVIDENCES.md`
  - `FIN_SESSION.md`
  - `NOTES.md`
  - `RAPPORT_VALIDATION_UI_UX_A24.md`
  - `RESULTATS.md`
  - `SESSION.md`

### Resultat
ZIP documentaire final cree et contenu verifie.

### Code retour
`0`

---

## 12. Applicabilite patchs

- Session sans patch code.
- Justification tracee dans : `PATCH/NO_PATCH_CODE.md`.

Mention obligatoire :
`INFORMATION NON FOURNIE — À CONFIRMER` uniquement lorsque la preuve n'existe pas dans les sources controlees.