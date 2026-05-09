# EVIDENCES - SESSION-20260506-07_A24_A24-UI-07

## Sources reellement lues
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/3-templates/TEMPLATE_DEBUT_SESSION.md`
- `docs/1-master/REFERENCE_UI_UX_A24.md`
- `docs/1-master/MAQUETTE/README_MAQUETTES_A24.md`
- `docs/1-master/MAQUETTE/SPEC_UI_UX_MAQUETTES_AMBULANCE_MANAGER.md`
- `docs/1-master/MAQUETTE/MAQUETTE_DA/.../Audit_V1.0.png`
- `docs/1-master/MAQUETTE/MAQUETTE_DA/.../Onboarding_V1.2.png`
- `docs/1-master/MAQUETTE/MAQUETTE_DA/.../Privacy_V1.0.png`
- `app/audit/audit-client.tsx`
- `app/onboarding/page.tsx`
- `app/onboarding/onboarding-client.tsx`
- `app/privacy/page.tsx`
- `app/a24-complementary-pages.css`

## Validations terminales - preuves reelles

### 1) Applicabilite patch principal
Commande :
```bash
git apply --check "docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-07_A24_A24-UI-07/PATCH/PATCH__SESSION-20260506-07_A24_A24-UI-07.diff"
```
Extrait terminal :
```txt
(sans sortie)
```
Resultat : succes  
Code retour : `0`

### 2) Lint
Commande :
```bash
npm run lint
```
Extrait terminal :
```txt
> ambulance-manager@0.1.0 lint
> eslint .
```
Resultat : succes  
Code retour : `0`

### 3) Build
Commande :
```bash
npm run build
```
Extrait terminal :
```txt
> ambulance-manager@0.1.0 build
> next build

Compiled successfully
Generating static pages ... (29/29)
```
Resultat : succes  
Code retour : `0`

## Preuves d'encodage et d'integrite du patch principal
Fichier :
`docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-07_A24_A24-UI-07/PATCH/PATCH__SESSION-20260506-07_A24_A24-UI-07.diff`

Commande de controle (octets/ligne/BOM/null) :
```powershell
FIRST24=64 69 66 66 20 2D 2D 67 69 74 20 61 2F 61 70 70 2F 61 32 34 2D 63 6F 6D
FIRST_LINE=diff --git a/app/a24-complementary-pages.css b/app/a24-complementary-pages.css
HAS_BOM=False
HAS_NULL=False
BYTE_COUNT=57640
UTF8_VALID=True
```

Conclusion :
- premiere ligne valide `diff --git ...` ;
- encodage UTF-8 sans BOM ;
- aucun caractere nul ;
- patch compatible `git apply --check`.

## Validations Prisma
Prisma non touche dans ce patch.  
`npx prisma validate` : non lance (hors perimetre)  
`npx prisma generate` : non lance (hors perimetre)

## Encodage UTF-8 sans BOM - documentation finale
Controle execute :
```txt
docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-07_A24_A24-UI-07/SESSION.md|BOM=False|NULL=False|UTF8_VALID=True
docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-07_A24_A24-UI-07/NOTES.md|BOM=False|NULL=False|UTF8_VALID=True
docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-07_A24_A24-UI-07/EVIDENCES.md|BOM=False|NULL=False|UTF8_VALID=True
docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-07_A24_A24-UI-07/RESULTATS.md|BOM=False|NULL=False|UTF8_VALID=True
docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-07_A24_A24-UI-07/FIN_SESSION.md|BOM=False|NULL=False|UTF8_VALID=True
docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-07_A24_A24-UI-07/PATCH/README_PATCH.md|BOM=False|NULL=False|UTF8_VALID=True
```
