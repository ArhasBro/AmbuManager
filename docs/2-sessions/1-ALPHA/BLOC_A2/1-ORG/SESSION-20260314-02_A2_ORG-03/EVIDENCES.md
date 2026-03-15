# EVIDENCES

## Sources utilisées

### Documentation
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
- sessions antérieures acquises : `ORG-01`, `ORG-02`

### Code réel modifié
- `app/dashboard/page.tsx`
- `app/company/page.tsx`
- `app/company/company-profile-form.tsx`
- `app/api/company/profile/route.ts`
- `lib/validators/company-profile.ts`

## Références documentaires déterminantes

### Cadrage officiel du profil société
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
  - module `03 — Multi-tenant / sociétés / profil société`
  - `03.2 Profil société`
  - besoin minimal explicite :
    - `nom société`
    - `nom des gérants`
    - `adresse`
    - `téléphone`
    - `SIRET`

### Ordonnancement officiel du bloc A2
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
  - `ORG-02 — COMPLÉTION`
  - `ORG-03 — COMPLÉTION`
  - `ORG-04 — VALIDATION`

## Rappel acquis repris comme base

### `ORG-01`
- aucune UI profil société visible dans le dépôt inspecté ;
- aucune API dédiée au profil société visible.

### `ORG-02`
- `Company` porte désormais `name`, `managerNames`, `address`, `phone`, `siret`.

## Preuves de complétion apportée

### 1. Point d’entrée UI ajouté au dashboard admin
`app/dashboard/page.tsx` expose désormais un lien `Profil société` dans le dashboard admin lorsque le rôle est `ADMIN` ou `GERANT`.

Conclusion probante :
- l’UI n’est plus cachée ni inexistante ;
- le point d’entrée demandé côté admin/dashboard existe réellement.

### 2. Page dédiée de profil société ajoutée
`app/company/page.tsx` lit la société courante via `session.user.companyId` et affiche une page dédiée contenant les 5 champs requis.

Conclusion probante :
- la consultation minimale du profil société existe réellement ;
- l’écran est borné à la société courante.

### 3. Formulaire client minimal de consultation / édition ajouté
`app/company/company-profile-form.tsx` expose l’édition des champs :
- `name`
- `managerNames`
- `address`
- `phone`
- `siret`

Conclusion probante :
- les 5 champs attendus sont bien consultables et modifiables dans l’UI.

### 4. Route API minimale de mise à jour ajoutée
`app/api/company/profile/route.ts` :
- récupère `companyId` depuis la session ;
- refuse l’accès sans session ;
- refuse l’accès hors `ADMIN` / `GERANT` ;
- met à jour uniquement la société courante ;
- renvoie le contrat API officiel.

Conclusion probante :
- l’écriture technique strictement nécessaire à la UI existe réellement ;
- la mise à jour est bornée à `companyId`.

### 5. Validation d’entrée minimale ajoutée
`lib/validators/company-profile.ts` valide les 5 champs comme chaînes non vides, simples et bornées.

Conclusion probante :
- l’API de profil société ne reçoit pas de payload libre ;
- aucun champ hors périmètre n’est accepté.

## Fichiers réellement modifiés

- `app/dashboard/page.tsx`
- `app/company/page.tsx`
- `app/company/company-profile-form.tsx`
- `app/api/company/profile/route.ts`
- `lib/validators/company-profile.ts`

## Fichiers volontairement non ouverts

- schéma Prisma et migrations
- seed
- rôles / permissions fines nouvelles
- support propriétaire
- bases / dépôts
- documents master
- `ORG-04`, `BASE-*`, `SUP-*`

## Vérifications techniques réellement exécutées

- `npm run lint` : **OK**
- `npm run build` : **échec**

### Détail de l’échec build
Premier blocage remonté en build :
- `./app/api/company/rules/route.ts:4:10`
- `Module '"@prisma/client"' has no exported member 'RuleMode'`

## Conclusion de preuve

La matière probante suffit à conclure que `ORG-03` a bien livré, et seulement livré, les éléments suivants :
- point d’entrée dashboard ;
- page dédiée profil société ;
- formulaire minimal d’édition ;
- route API minimale de mise à jour ;
- bornage `companyId` + accès `ADMIN` / `GERANT`.
