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

### Code réel inspecté
- `app/dashboard/page.tsx`
- `prisma/schema.prisma`
- `app/api/company/rules/route.ts`

## État réel du ZIP reçu avant modification

Constat factuel :
- `app/api/company/profile/route.ts` absent ;
- `app/company/page.tsx` absent ;
- `app/company/company-profile-form.tsx` absent ;
- `lib/validators/company-profile.ts` absent.

Conclusion : le ZIP reçu ne contenait pas encore le code applicatif `ORG-03` annoncé dans le message.

## Preuves de la complétion apportée

### 1. Point d'entrée dashboard
`app/dashboard/page.tsx` expose désormais le lien `Profil société` pour `ADMIN` / `GERANT`.

### 2. Page dédiée
`app/company/page.tsx` lit la société courante via `session.user.companyId` et affiche les 5 champs requis.

### 3. Formulaire client
`app/company/company-profile-form.tsx` permet la consultation et l'édition de :
- `name`
- `managerNames`
- `address`
- `phone`
- `siret`

### 4. Route API minimale
`app/api/company/profile/route.ts` :
- exige une session ;
- borne l'accès à `ADMIN` / `GERANT` ;
- borne la mise à jour à `companyId` ;
- conserve le contrat API `{ ok:true, data } / { ok:false, error, details? }`.

### 5. Validation d'entrée minimale
`lib/validators/company-profile.ts` borne strictement les 5 champs attendus.

## Vérifications techniques réellement exécutées

- `npm run lint` : **OK**
- `npm run build` : **ECHEC**

### Détail du blocage build
Le build ne bloque pas sur `managerNames` dans le code ajouté pour `ORG-03`.
Premier blocage observé ensuite :
- `./app/api/company/rules/route.ts:4:10`
- `Module '"@prisma/client"' has no exported member 'RuleMode'`
