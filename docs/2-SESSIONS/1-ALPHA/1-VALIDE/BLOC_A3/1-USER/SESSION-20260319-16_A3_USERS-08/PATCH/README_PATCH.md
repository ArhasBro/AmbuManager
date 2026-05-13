# README_PATCH — SESSION-20260319-16_A3_USERS-08

## Patch concerné
`PATCH__SESSION-20260319-16_A3_USERS-08.diff`

## Objet
Documenter le patch applicatif retenu pour USERS-08 : désactivation / archivage logique d’un utilisateur, sans suppression physique.

## Périmètre couvert
- archivage logique utilisateur ;
- conservation de l’historique en base ;
- exclusion du flux standard des comptes actifs ;
- intégration cohérente avec le module users existant ;
- absence de suppression physique ;
- absence d’élargissement hors USERS-08.

## Hors périmètre confirmé
- aucune route `DELETE` ;
- aucune purge ;
- aucun traitement USERS-09 ;
- aucune refonte large du module users ;
- aucune extension vers permissions avancées, absences ou archivage global.

## Commandes de validation retenues
```bash
git apply --check "docs/3-patches/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-16_A3_USERS-08/PATCH__SESSION-20260319-16_A3_USERS-08.diff"
git apply "docs/3-patches/1-ALPHA/BLOC_A3/1-USER/SESSION-20260319-16_A3_USERS-08/PATCH__SESSION-20260319-16_A3_USERS-08.diff"
npx prisma validate
npx prisma generate
npm run lint
npm run build
```

## Validation retenue
- `git apply --check` : OK
- `git apply` : OK
- `npx prisma validate` : OK
- `npx prisma generate` : OK
- `npm run lint` : OK
- `npm run build` : OK

## Statut
README patch finalisé sans régénération du patch applicatif.
