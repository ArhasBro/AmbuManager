# README_PATCH

## Session liée
SESSION-20260414-02_A7_DASH-LOT-02-07

## Type
LOT CORRECTION + COMPLÉTION

## Dossier patch
`docs/3-patches/1-ALPHA/BLOC_A7/SESSION-20260414-02_A7_DASH-LOT-02-07`

## Patch officiel
`PATCH__SESSION-20260414-02_A7_DASH-LOT-02-07.diff`

## Périmètre du patch
- `app/dashboard/page.tsx`
- `app/page.tsx`
- `lib/permissions.ts`

## Objet du patch
- correction du lien planning non filtré ;
- transformation du dashboard en portail d’accueil ALPHA ;
- différenciation `Vue terrain` / `Vue admin / gérance` ;
- ajout d’indicateurs simples admin / gérant sur données stables ;
- matérialisation de `DASHBOARD_TERRAIN_ACCESS` via helper dédié ;
- suppression des liens modules société lorsque la session n’a pas de `companyId`.

## Commandes d’application

```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A7/SESSION-20260414-02_A7_DASH-LOT-02-07/PATCH__SESSION-20260414-02_A7_DASH-LOT-02-07.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A7/SESSION-20260414-02_A7_DASH-LOT-02-07/PATCH__SESSION-20260414-02_A7_DASH-LOT-02-07.diff"
```

## Contrôle patch réellement exécuté

```bash
git apply --check /mnt/data/patches/PATCH__SESSION-20260414-02_A7_DASH-LOT-02-07.diff
```

Résultat : **OK** sur une extraction propre du ZIP fourni.

## Validations applicatives réellement exécutées
- `npm run lint` : **OK**
- `npm run build` : **OK**

## Statut
- patch principal produit : **OUI**
- correctif séparé produit : **NON**
- documentation finale mise à jour : **OUI**
