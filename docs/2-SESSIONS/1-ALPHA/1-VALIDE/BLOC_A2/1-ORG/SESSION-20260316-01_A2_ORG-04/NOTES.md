# NOTES

## Méthode

Validation strictement bornée à `ORG-04` :
1. relecture du pack documentaire imposé ;
2. extraction du besoin produit depuis `03.2 Profil société` ;
3. inspection ciblée du code listé dans l’ouverture de session ;
4. vérification du bornage `companyId` et du contrôle d’accès ;
5. tentative finale de `npm run lint` puis `npm run build`.

## Observations de fond

Le besoin minimal officiel de `03.2 Profil société` est :
- nom société ;
- nom des gérants ;
- adresse ;
- téléphone ;
- SIRET.

Le dépôt actuel matérialise ce besoin par :
- une page dédiée `app/company/page.tsx` ;
- un formulaire client `app/company/company-profile-form.tsx` ;
- un endpoint `PATCH /api/company/profile` ;
- un validateur Zod `lib/validators/company-profile.ts` ;
- les champs correspondants dans `Company`.

## Bornage réellement observé

### Société courante
- la page `/company` lit uniquement la société du `session.user.companyId` ;
- la route `PATCH /api/company/profile` met à jour uniquement la ligne `Company` dont `id = companyId` issu de la session.

### Rôles
- la page `/company` autorise uniquement `ADMIN` ou `GERANT` ;
- la route `PATCH /api/company/profile` autorise uniquement `ADMIN` ou `GERANT`.

### Multi-sociétés
- aucun sélecteur de société ;
- aucun paramètre de société côté client ;
- aucune route ouvrant une autre société dans ce périmètre.

## Réserve technique observée

La tentative de build ne valide pas l’état global du dépôt dans cet environnement de contrôle.
Le blocage constaté est hors périmètre direct `ORG-04` :
- fichier en erreur : `app/api/company/rules/route.ts`
- message principal : `Module "@prisma/client" has no exported member 'RuleMode'`

Cette réserve n’invalide pas la preuve fonctionnelle locale du profil société, mais empêche une conclusion `conforme` sans nuance sur l’état global vérifié ici.
