# EVIDENCES

## Sources documentaires relues

- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`

## Besoin produit de référence

`docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md` :

- `03.2 Profil société`
- gestion de la société avec au minimum :
  - `name`
  - nom des gérants
  - `address`
  - `phone`
  - `siret`
- utilisateur cible : `gérant, admin`

## Fichiers code inspectés

- `app/dashboard/page.tsx`
- `app/company/page.tsx`
- `app/company/company-profile-form.tsx`
- `app/api/company/profile/route.ts`
- `lib/validators/company-profile.ts`
- `lib/auth.ts`
- `lib/permissions.ts`
- `lib/api/response.ts`
- `types/next-auth.d.ts`
- `prisma/schema.prisma`

## Preuves fonctionnelles directes

### UI dédiée
`app/company/page.tsx`
- page dédiée `Profil société`
- initialisation du formulaire avec les 5 champs minimaux
- lecture limitée à `WHERE "id" = session.user.companyId`

### Formulaire
`app/company/company-profile-form.tsx`
- champs éditables exposés :
  - `name`
  - `managerNames`
  - `address`
  - `phone`
  - `siret`
- soumission vers `PATCH /api/company/profile`

### API
`app/api/company/profile/route.ts`
- contrôle session :
  - `userId`
  - `companyId`
  - `role`
- refus si absence de session société ;
- refus si rôle non autorisé ;
- mise à jour bornée à `WHERE "id" = companyId`
- réponse succès au format `{ ok:true, data }`
- réponses erreur au format `{ ok:false, error, details? }`

### Validation d’entrée
`lib/validators/company-profile.ts`
- les 5 champs minimaux sont exigés côté validation.

### Modèle
`prisma/schema.prisma`
- `Company` porte :
  - `name`
  - `managerNames`
  - `address`
  - `phone`
  - `siret`

## Vérifications terminales tentées

### `npm run lint`
- résultat : `OK`

### `npm run build`
- résultat : `ECHEC`
- blocage observé :
  - fichier : `app/api/company/rules/route.ts`
  - erreur : `Module "@prisma/client" has no exported member 'RuleMode'`

## Interprétation probante retenue

Le profil société ALPHA minimal est prouvé dans le code réel.
La non-validation du build observée ici est réelle, mais elle porte sur un point hors périmètre direct `ORG-04`.
