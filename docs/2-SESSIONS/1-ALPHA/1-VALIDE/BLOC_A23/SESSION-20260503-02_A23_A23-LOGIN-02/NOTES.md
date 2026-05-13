# NOTES

## Methode / observations

- Lecture documentaire ciblee executee selon la consigne (noyau obligatoire + session precedente + fichiers session courante utiles).
- Analyse code reelle concentree sur `app/layout.tsx`, `app/app-shell.tsx`, `app/login/page.tsx`, `app/providers.tsx`, `app/dashboard/page.tsx`, `lib/auth.ts`, `types/next-auth.d.ts`.
- Strategie patch-first respectee : patch principal produit avant application.

## Cause technique identifiee

- `app/layout.tsx` calcule le shell via `getServerSession(authOptions)` et transmet `navLinks/context` a `AppShell`.
- `/login` et `/dashboard` partagent ce layout racine.
- Le flux de login utilisait `signIn(..., redirect:false)` puis `router.push(...)`, ce qui peut conserver un rendu layout partage stale au premier affichage post-login (jusqu'au refresh manuel).

## Correction minimale retenue

Dans `app/login/page.tsx` :
- suppression de `useRouter` ;
- remplacement des navigations post-auth (`router.replace`/`router.push`) par `window.location.replace(...)`.

Effet attendu :
- navigation post-login en chargement navigateur (nouvelle requete serveur) ;
- shell reconstruit immediatement avec session hydratee ;
- disparition du besoin de refresh manuel.

## Hors perimetre constate

- `npm run test:smoke` et `npm run test:quality` restent KO sur un test privacy (`privacy mentions stay reachable from login`) : non lie au patch login/session.
- INFORMATION NON FOURNIE — À CONFIRMER : validation visuelle navigateur automatisee (Playwright absent dans ce depot au moment de la session).