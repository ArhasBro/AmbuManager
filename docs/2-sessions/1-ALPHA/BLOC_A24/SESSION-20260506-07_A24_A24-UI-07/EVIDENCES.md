# EVIDENCES — SESSION-20260506-07_A24_A24-UI-07

## Sources réellement lues
- `docs/1-master/DOCUMENT_MAITRE.md` — fourni dans la conversation.
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md` — fourni dans la conversation.
- `docs/1-master/REFERENCE_UI_UX_A24.md` — GitHub `main`.
- `docs/1-master/MAQUETTE/README_MAQUETTES_A24.md` — GitHub `main`.
- `docs/1-master/MAQUETTE/SPEC_UI_UX_MAQUETTES_AMBULANCE_MANAGER.md` — GitHub `main`, partie transversale visible via outil.
- `app/layout.tsx` — GitHub `main`.
- `app/audit/page.tsx` — GitHub `main`.
- `app/audit/audit-client.tsx` — GitHub `main`.
- `app/onboarding/page.tsx` — GitHub `main`.
- `app/onboarding/onboarding-client.tsx` — GitHub `main`.
- `app/privacy/page.tsx` — GitHub `main`.
- `app/a24-vehicles-templates.css` — GitHub `main`, continuité A24.

## Fichiers inspectés
- `app/layout.tsx`
- `app/audit/page.tsx`
- `app/audit/audit-client.tsx`
- `app/onboarding/page.tsx`
- `app/onboarding/onboarding-client.tsx`
- `app/privacy/page.tsx`
- `app/a24-vehicles-templates.css`

## Fichiers modifiés proposés
- `app/layout.tsx`
- `app/a24-complementary-pages.css`

## Patch principal — preuves d'encodage
- premiers octets : `100 105 102 102`
- première ligne : `diff --git a/app/a24-complementary-pages.css b/app/a24-complementary-pages.css`
- encodage : UTF-8 sans BOM
- caractères nuls : non
- retour ligne final : oui

## Patch documentaire — preuves d'encodage
- premiers octets : `100 105 102 102`
- première ligne : `diff --git a/docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-07_A24_A24-UI-07/EVIDENCES.md b/docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-07_A24_A24-UI-07/EVIDENCES.md`
- encodage : UTF-8 sans BOM
- caractères nuls : non
- retour ligne final : oui

## Validations terminales
Les validations ci-dessous ont été exécutées dans une reproduction partielle de l'état GitHub `main`, pas dans le dépôt local réel.

```bash
git apply --check "docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-07_A24_A24-UI-07/PATCH/PATCH__SESSION-20260506-07_A24_A24-UI-07.diff"
```

Résultat : OK, exit code 0.

```bash
git apply --check "docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-07_A24_A24-UI-07/PATCH/PATCH__SESSION-20260506-07_A24_A24-UI-07_DOCS.diff"
```

Résultat : OK, exit code 0.

## Commandes non exécutées dans le dépôt réel
```bash
git apply --check "docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-07_A24_A24-UI-07/PATCH/PATCH__SESSION-20260506-07_A24_A24-UI-07.diff"
git apply "docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-07_A24_A24-UI-07/PATCH/PATCH__SESSION-20260506-07_A24_A24-UI-07.diff"
npm run lint
npm run build
```

Statut : INFORMATION NON FOURNIE — À CONFIRMER.

## Captures
Captures avant/après non produites : INFORMATION NON FOURNIE — À CONFIRMER.

## Risques résiduels
- Le patch est basé sur GitHub `main`.
- Conformité visuelle complète non déclarable sans captures.
- Conflit possible sur `app/layout.tsx` si une session locale non poussée a déjà ajouté des imports CSS.


## Validation patch documentaire corrigée

Commande exécutée dans une reproduction documentaire locale :

```bash
git apply --check "docs/2-sessions/1-ALPHA/BLOC_A24/SESSION-20260506-07_A24_A24-UI-07/PATCH/PATCH__SESSION-20260506-07_A24_A24-UI-07_DOCS.diff"
```

Sortie réelle :

```txt
exit code: 0
```
