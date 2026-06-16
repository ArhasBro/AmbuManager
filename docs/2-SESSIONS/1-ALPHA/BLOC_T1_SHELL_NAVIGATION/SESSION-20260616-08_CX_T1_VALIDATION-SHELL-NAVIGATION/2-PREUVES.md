# 2 - Preuves

## 1. Fichiers lus

Documents MASTER :

- `docs/1-MASTER/02-DOCUMENT_MAITRE_PROJET.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`

Sessions T1 :

- `SESSION-20260616-02_DX_T1_AUDIT-SHELL-NAVIGATION`
- `SESSION-20260616-03_CX_T1_RENOMMAGE-LIBELLES-NAVIGATION`
- `SESSION-20260616-05_CX_T1_CORRECTION-SHELL-ACTIONS-CONTEXTE`
- `SESSION-20260616-06_CX_T1_CREATION-ACCES-REFUSE`
- `SESSION-20260616-07_CX_T1_COMPLETION-NAVIGATION-DROITS`

Code lu en lecture seule :

- `app/layout.tsx`
- `app/app-shell.tsx`
- `app/ui/access-denied-state.tsx`
- `app/dashboard/page.tsx`
- `app/planning/page.tsx`
- `app/users/page.tsx`
- `app/vehicles/page.tsx`
- `app/templates/page.tsx`
- `app/company/page.tsx`
- `app/depots/page.tsx`
- `app/onboarding/page.tsx`
- `app/audit/page.tsx`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `lib/rbac.ts`
- `lib/auth.ts`
- `proxy.ts`
- `prisma/seed.ts`
- `package.json`

## 2. Session créée

Commande :

```powershell
.\create_session.ps1 -Stage 1-ALPHA -Block T1 -SessionCode VALIDATION-SHELL-NAVIGATION -Type CX+VALIDATION -Title "Validation shell navigation"
```

Résultat :

- Session : `SESSION-20260616-08_CX_T1_VALIDATION-SHELL-NAVIGATION`
- Dossier : `docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION/SESSION-20260616-08_CX_T1_VALIDATION-SHELL-NAVIGATION`
- Dossier `PATCH` créé.
- Une seule session nouvelle créée.
- Aucune session FIX créée.

## 3. Contrôle structure documentaire

Fichiers présents :

- `1-SESSION.md`
- `2-PREUVES.md`
- `3-FIN_DE_SESSION.md`
- `PATCH/README_PATCH.md`
- `PATCH/NO_PATCH`

Nature et type :

- Nature : CX
- Type métier : VALIDATION

## 4. Contrôle shell connecté

Navigateur intégré sur `http://localhost:3000`.

Profil viewer déjà connecté au démarrage du contrôle :

- URL : `http://localhost:3000/dashboard`
- Utilisateur : `Viewer`
- Société visible dans le shell : `SC Ambulances`
- Navigation visible : aucune entrée.
- Message sidebar : `Aucun module disponible.`

Profil admin :

- Login : `admin@ambulance.local` / `admin123`
- URL après connexion : `http://localhost:3000/dashboard`
- Utilisateur visible : `Nathan`
- Société visible : `SC Ambulances`
- Rôle visible : `Administration`
- Déconnexion visible et fonctionnelle.
- Thème visible et fonctionnel.
- Société et utilisateur rendus en `DIV`, pas en bouton trompeur.
- Boutons shell relevés : thème sidebar, thème topbar, déconnexion.

Contrôle thème :

- Avant clic : `dark`
- Après clic : `light`
- Après second clic : `dark`

## 5. Contrôle libellés navigation

Libellés admin relevés dans la sidebar :

- `Tableau de bord`
- `Planning`
- `Utilisateurs / RH`
- `Véhicules`
- `Modèles horaires`
- `Société`
- `Dépôts / Bases`
- `Mise en route`
- `Audit`

Preuve code : `app/layout.tsx` contient les labels attendus sur les routes `/dashboard`, `/planning`, `/users`, `/vehicles`, `/templates`, `/company`, `/depots`, `/onboarding`, `/audit`.

Résultat :

- Aucun retour à `Dashboard`.
- Aucun retour à `Templates`.
- Aucun retour à `Onboarding`.
- Aucun renommage technique de route constaté.
- Accents visibles corrects au navigateur.

## 6. Contrôle navigation visible selon droits disponibles

Profil admin :

- 9 entrées visibles.
- Entrées cohérentes avec les droits natifs `ADMIN` et permissions existantes.
- Aucune entrée fantôme détectée.
- Aucun lien `Suivi des véhicules` ajouté.

Profil viewer :

- 0 entrée visible.
- Message `Aucun module disponible.` affiché.
- Accès direct `/users` affiche `Accès refusé`.

Rappel obligatoire :

MATRICE MODULE-PERMISSION NON STABILISÉE — VALIDATION LIMITÉE AUX DROITS DISPONIBLES.

## 7. Contrôle routes visibles

Clics navigateur admin sur les entrées visibles :

| Route | Résultat |
|---|---|
| `/dashboard` | Page `Tableau de bord`, shell présent, pas de 404 |
| `/planning` | Page applicative planning, shell présent, pas de 404 |
| `/users` | Page `Utilisateurs / RH`, shell présent, pas de 404 |
| `/vehicles` | Page `Véhicules`, shell présent, pas de 404 |
| `/templates` | Page `Modèles horaires`, shell présent, pas de 404 |
| `/company` | Page `Société`, shell présent, pas de 404 |
| `/depots` | Page `Dépôts / bases`, shell présent, pas de 404 |
| `/onboarding` | Page `Mise en route société pilote`, shell présent, pas de 404 |
| `/audit` | Page `Journal d'audit`, shell présent, pas de 404 |

Écart mineur hors shell :

- Le titre de page `/depots` reste `Dépôts / bases` alors que le libellé de navigation est `Dépôts / Bases`.
- Cette session ne corrige pas les pages métier.

## 8. Contrôle accès direct non autorisé

Profil testé :

- `viewer@ambulance.local`
- Session authentifiée.
- Route directe : `http://localhost:3000/users`

Résultat navigateur :

- URL conservée : `/users`
- `Accès refusé` affiché.
- `Retour au tableau de bord` affiché.
- Action sensible `Créer un utilisateur` absente.
- Aucune redirection incohérente vers `/login` pour cet utilisateur authentifié.

## 9. Contrôle RBAC / permissions

Fichiers lus sans modification :

- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `lib/rbac.ts`
- `proxy.ts`

Résultat :

- Aucun fichier RBAC modifié.
- Aucune matrice module-permission créée.
- Aucune logique T4 complète ajoutée.
- Aucune modification Prisma liée aux droits.
- Aucune modification des droits fins des modules.
- Protections métier non refondues.

## 10. Contrôle hors périmètre

Contrôles Git et lecture :

- Aucun fichier Base44 modifié.
- Aucune maquette ou PNG modifiée.
- Aucun template modifié.
- `create_session.ps1` non modifié.
- `04-PLAN_DE_DEVELOPPEMENT.md` non modifié.
- `05-BLOCS_SESSIONS_PRODUCTION.md` non modifié.
- Aucun fichier Prisma modifié.
- Aucune page métier profondément modifiée.
- Aucune correction lourde réalisée.

## 11. Build / lint

Commande :

```powershell
npm run lint
```

Résultat :

- Échec.
- `90 problems (48 errors, 42 warnings)`.
- Erreurs bloquantes dans `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44`.
- Warnings applicatifs préexistants dans `app/planning/planning-client.tsx`.
- Aucun fichier modifié par cette session cité en erreur.

Commande :

```powershell
npm run build
```

Résultat :

- Échec.
- Compilation Next réussie.
- Échec TypeScript sur `docs/1-MASTER/4-BASE44_REFERENCE/EXPORT_BASE44/base44/functions/fixNathanRole/entry.ts`.
- Erreur : module `npm:@base44/sdk@0.8.31` introuvable.

Exception Base44 appliquée :

- Aucun fichier Base44 modifié.
- Les erreurs bloquantes citent le référentiel documentaire Base44.
- Aucun fichier modifié par cette session n'est cité.
- Aucune correction Base44 effectuée.

## 12. Contrôle navigateur

Serveur :

- URL testée : `http://localhost:3000`
- Port : 3000
- État : serveur déjà en écoute, process Node `13700`.

Profils testés :

- `viewer@ambulance.local` / session déjà active au démarrage du contrôle.
- `admin@ambulance.local` / `admin123`.

Contrôles réalisés :

- Shell connecté visible.
- Topbar stable.
- Sidebar stable.
- Contexte utilisateur/société visible.
- Navigation admin visible et cliquée.
- Navigation viewer masquée avec `Aucun module disponible.`
- Déconnexion viewer et admin fonctionnelle vers `/login`.
- Thème fonctionnel.
- Accès direct non autorisé `/users` pour viewer.
- `Accès refusé` affiché sans action métier sensible.

## 13. Encodage

Contrôle final exécuté après écriture des fichiers de session :

- `1-SESSION.md` : `UTF8_OK`, `BOM=False`, `Suspect=NONE`
- `2-PREUVES.md` : `UTF8_OK`, `BOM=False`, `Suspect=NONE`
- `3-FIN_DE_SESSION.md` : `UTF8_OK`, `BOM=False`, `Suspect=NONE`
- `PATCH/README_PATCH.md` : `UTF8_OK`, `BOM=False`, `Suspect=NONE`
- `PATCH/NO_PATCH` : `UTF8_OK`, `BOM=False`, `Suspect=NONE`

Les séquences suspectes demandées sont exprimées ici par code point pour ne pas les réintroduire dans le fichier : U+00C3, U+00C2, U+00E2 U+20AC, U+FFFD.

## 14. Patch

Aucun code applicatif modifié.

Résultat attendu :

- `PATCH/NO_PATCH` présent.
- Aucun patch `.diff`.
- `PATCH/README_PATCH.md` explique l'absence de patch applicatif.

## 15. Limites

- Matrice module-permission complète non stabilisée.
- Validation RBAC limitée aux droits existants et aux profils seed disponibles.
- Le navigateur a testé `viewer` et `admin`; aucun profil support global n'a été testé, faute d'identité support fournie dans l'environnement de session.
