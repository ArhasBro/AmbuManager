# EVIDENCES

Elements factuels utilises pendant la session.

---

## Sources utilisees

- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/3-templates/TEMPLATE_DEBUT_SESSION.md`
- `docs/1-master/REFERENCE_UI_UX_A24.md`
- `docs/1-master/MAQUETTE/README_MAQUETTES_A24.md`
- `docs/1-master/MAQUETTE/SPEC_UI_UX_MAQUETTES_AMBULANCE_MANAGER.md`
- `docs/1-master/MAQUETTE/CADRAGE_UI_UX_ALPHA_MAQUETTE_V0.2.md`
- `docs/1-master/MAQUETTE/ICONES/LISTE_ICONES_EXPORTEES_V1_1.md` (reference issuee de la spec)
- `docs/1-master/MAQUETTE/ICONES/TABLE_MAPPING_ICONES_V1_1.csv` (reference issuee de la spec)
- `docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-01_A24_A24-UI-01/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-01_A24_A24-UI-01/EVIDENCES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-01_A24_A24-UI-01/NOTES.md`

## Fichiers inspectes cote code

- `app/layout.tsx`
- `app/app-shell.tsx`
- `app/globals.css`
- `app/dashboard/page.tsx`
- `app/login/page.tsx`
- `app/privacy/page.tsx`
- `app/ui/action-button.tsx`
- `app/ui/stat-card.tsx`
- `app/ui/empty-state.tsx`
- `app/ui/error-message.tsx`
- `app/ui/data-table.tsx`
- `app/ui/filter-bar.tsx`
- `package.json`

## Commandes executees

- `npm install lucide-react`
- `npm run lint`
- `npm run build`
- `git diff -- ... > PATCH/PATCH__SESSION-20260506-02_A24_A24-UI-02.diff`

## Preuves post-correction documentaire

### Controle encodage patchs (premiers octets)

Commande :
- `Get-Content -Encoding Byte -TotalCount 4 <patch>`

Sorties reelles :
- `P1 bytes: 100 105 102 102`
- `P2 bytes: 100 105 102 102`

Interpretation :
- patch principal et patch documentaire en texte standard (debut `diff`), sans BOM UTF-16.

### Verification applicabilite patch principal

Commande :
- `git apply --check "docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-02_A24_A24-UI-02/PATCH/PATCH__SESSION-20260506-02_A24_A24-UI-02.diff"`

Sortie reelle :
- `exit_code=0`

### Verification applicabilite patch documentaire

Commande :
- `git apply --check "docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-02_A24_A24-UI-02/PATCH/PATCH__SESSION-20260506-02_A24_A24-UI-02_DOCS.diff"`

Sortie reelle :
- `exit_code=0`

Note execution :
- verification `git apply --check` effectuee dans un worktree propre (`HEAD`) pour eviter un echec logique de re-application sur un arbre deja modifie.

## Resultats validations terminales

### `npm run lint`

Sortie reelle :
```text
> ambulance-manager@0.1.0 lint
> eslint .
```
Resultat : `exit_code=0`

### `npm run build`

Sortie reelle (extrait) :
```text
> ambulance-manager@0.1.0 build
> next build

▲ Next.js 16.1.6 (Turbopack)
...
✓ Compiled successfully in 4.4s
...
✓ Generating static pages using 15 workers (29/29)
```
Resultat : `exit_code=0`

## Captures avant/apres

INFORMATION NON FOURNIE — À CONFIRMER

Raison : aucune chaine de capture navigateur exploitable n'a ete utilisee dans cette execution terminale.
