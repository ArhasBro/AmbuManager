# README_PATCH

## Session liée
`SESSION-20260318-02_A2_SUP-02`

## Type
`COMPLETION`

## Dossier patch
`docs/3-patches/1-ALPHA/BLOC_A2/3-SUP/SESSION-20260318-02_A2_SUP-02`

## Patch officiel
`SUP-02.diff`

## Portée du patch

Patch unique strictement borné à `SUP-02` :
- modélisation du rôle support global distinct des rôles client ;
- enrichissement auth/session ;
- adaptation minimale RBAC ;
- maintien du cloisonnement multi-tenant ;
- aucune logique support métier `SUP-03+`.

## Commandes d’application

```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A2/3-SUP/SESSION-20260318-02_A2_SUP-02/SUP-02.diff"
git apply         "docs/3-patches/1-ALPHA/BLOC_A2/3-SUP/SESSION-20260318-02_A2_SUP-02/SUP-02.diff"
```

## Validations à rejouer localement

```bash
npx prisma validate
npx prisma generate
npm run lint
npm run build
```

## Statut

- patch produit ;
- documentation de session produite ;
- validations terminales locales à confirmer sur le dépôt réel.
