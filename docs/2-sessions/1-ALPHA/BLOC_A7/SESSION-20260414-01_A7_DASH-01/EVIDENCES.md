# EVIDENCES

## Sources utilisées

### Documentation officielle
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`

### Code réellement inspecté
- `app/page.tsx`
- `app/login/page.tsx`
- `app/dashboard/page.tsx`
- `proxy.ts`
- `lib/auth.ts`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `lib/rbac.ts`
- `app/planning/page.tsx`
- `app/company/page.tsx`
- `app/depots/page.tsx`
- `app/users/page.tsx`
- `app/vehicles/page.tsx`
- `app/templates/page.tsx`

## Extraits documentaires déterminants

### Cadrage officiel dashboard
`docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:931-959`
- 14.1 : le dashboard doit être une page d’accueil donnant accès aux modules autorisés et orientant l’utilisateur selon ses permissions.
- 14.2 : les indicateurs simples sont encore indiqués comme manquants.
- 14.3 : le dashboard différencié par rôle est indiqué comme manquant.

### Règle verrouillée du bloc A7
`docs/1-master/PLAN_DE_DEVELOPPEMENT.md:513-544`
- le dashboard ALPHA doit commencer comme portail d’accès, point d’entrée, distribution des accès selon permissions, orientation utilisateur selon rôle ;
- il ne doit pas commencer comme cockpit analytique dépendant de données instables.

## Extraits de code déterminants

### 1. Le dashboard existe bien comme entrée post-login
`app/login/page.tsx:7-15, 43-52, 60-75`
- fallback de connexion : `"/dashboard"`
- redirection du login vers une destination interne sûre, défaut `"/dashboard"`

### 2. Le dashboard actuel affiche un lien planning non filtré
`app/dashboard/page.tsx:40-42`
```tsx
<div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
  <Link href="/planning">Planning</Link>
</div>
```

### 3. Le dashboard admin est partiellement piloté par permissions
`app/dashboard/page.tsx:21-31, 44-55`
- `canAccessAdminDashboard`
- `canManageUsers`
- `canManageVehicles`
- `canManageTemplates`
- `companyProfileAllowed` et `depotsAllowed` restent pilotés par rôle natif `ADMIN` / `GERANT`

### 4. Le planning n’est pas ouvert à toute session
`app/planning/page.tsx:20-21, 22-41`
- la page exige `user.id` **et** `user.companyId`
- elle refuse la consultation si l’utilisateur ne possède ni `PLANNING_VIEW_SELF` ni `PLANNING_VIEW_GLOBAL`

### 5. Le moteur permissions nie l’accès support global
`lib/permissions.ts:36-45`
- `isGlobalSupport(platformRole) => false` sur les accès à permissions
- `ADMIN` / `GERANT` gardent un accès natif

### 6. Le catalogue de permissions prévoit déjà plus que le dashboard livré
`lib/permission-catalog.ts:82-91`
- permission `DASHBOARD_ADMIN_ACCESS`
- permission `DASHBOARD_TERRAIN_ACCESS`

### 7. Aucune vue dashboard terrain distincte n’a été trouvée
- recherche code : aucune consommation de `DASHBOARD_TERRAIN_ACCESS`
- seule page dashboard observée : `app/dashboard/page.tsx`

### 8. Le root applicatif redirige d’abord vers login
`app/page.tsx:1-4`
```tsx
export default function Home() {
  redirect("/login");
}
```

## Validations terminales réellement exécutées

### `npm run lint`
Exécutée : OUI  
Résultat : KO  
Sortie réelle :
```text
> ambulance-manager@0.1.0 lint
> eslint .

sh: 1: eslint: not found
```

### `npm run build`
Exécutée : OUI  
Résultat : KO  
Sortie réelle :
```text
> ambulance-manager@0.1.0 build
> next build

sh: 1: next: not found
```

### Interprétation de validation
Les validations ont bien été tentées, mais l’environnement d’audit fourni ne contient pas les dépendances d’exécution (`node_modules` absent), ce qui empêche toute conclusion de conformité build/lint à partir de cette exécution locale.
