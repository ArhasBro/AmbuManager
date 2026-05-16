# REBASAGE-27 - Audit page Login

## 1. Resume de la session

Objectif : auditer la page Login reelle sans correction, pour verifier le role, les fonctionnalites, les dependances auth/API et les ecarts documentaires.

Resultat : page Login identifiee, flux auth principal confirme, dettes qualifiees et priorisees.

## 2. Perimetre lu

- `docs/1-MASTER/DOCUMENT_MAITRE.md`
- `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE_GLOBAL_ALPHA.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-19_FONCTIONNALITES_PAR_PAGE.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-23_CARTOGRAPHIE_GLOBALE_PROJET.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-24_MATRICE_PAGE_FONCTIONNALITES_CODE_DOCUMENTATION_MAQUETTE.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-25_CLASSEMENT_DETTES_PRIORITES.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-26_INVENTAIRE_PAGES_ROUTES_APPLICATIVES.md`
- Code lu : `app/login/page.tsx`, `app/api/auth/[...nextauth]/route.ts`, `lib/auth.ts`, `app/page.tsx`, `app/layout.tsx`, `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_LOGIN.md`.

## 3. Route et fichiers Login identifies

- Route applicative : `/login`
- Fichier principal : `app/login/page.tsx`
- Fichiers associes :
  - `app/page.tsx` (redirection vers `/login` ou `/dashboard`)
  - `app/api/auth/[...nextauth]/route.ts`
  - `lib/auth.ts`
  - `app/layout.tsx` (shell global)
- Composants/fichiers clients utilises : page client unique (`"use client"`), pas de fichier `login-client.tsx` dedie detecte.

## 4. Role reel de la page Login

- Entrer les identifiants utilisateur (email/mot de passe).
- Lancer l'authentification credentials via NextAuth.
- Gerer erreur utilisateur en cas d'echec.
- Rediriger apres succes vers callback interne securisee ou fallback `/dashboard`.

## 5. Fonctionnalites attendues

Attendus prouvables via documents et cartographie :
- Acces utilisateur via page publique `/login` : OUI
- Authentification : OUI
- Redirection post-login : OUI
- Gestion d'erreur de connexion : OUI
- Session active utilisateur : OUI
- UX login dediee : OUI
- Lien vers mentions d'information (`/privacy`) : OUI

Attendus non prouves explicitement dans ce perimetre :
- Multi-tenant au niveau UI Login : INFORMATION NON FOURNIE — À CONFIRMER
- Gestion role/permissions affichee sur la page Login : INFORMATION NON FOURNIE — À CONFIRMER
- Exigences MFA / recuperation compte / anti-bruteforce UI : INFORMATION NON FOURNIE — À CONFIRMER

## 6. Fonctionnalites presentes dans le code

Dans `app/login/page.tsx` :
- Formulaire email/mot de passe : OUI
- Bouton submit avec etat chargement : OUI
- Toggle afficher/masquer mot de passe : OUI
- Gestion erreur utilisateur : OUI
- Checkbox "Se souvenir de moi" visuelle : OUI (pas de preuve d'effet fonctionnel cote session dans cette page)
- Appel auth : `signIn("credentials", { redirect: false, callbackUrl })`
- Sanitisation callback : OUI (`isSafeInternalPath`, controle origin)
- Redirection succes : OUI (`window.location.replace(target)`)
- Redirection si session deja auth : OUI (`useSession` + `window.location.replace(callbackUrl)`)
- Indices UX responsive/theme : classes CSS dediees login ; details responsives explicites INFORMATION NON FOURNIE — À CONFIRMER

## 7. APIs / services / modules lies

- Route API auth : `app/api/auth/[...nextauth]/route.ts` (NextAuth handler GET/POST)
- Config auth : `lib/auth.ts`
  - provider credentials
  - validation credentials (zod)
  - verification mot de passe (bcrypt)
  - gestion session JWT
  - callbacks `jwt` / `session`
  - enrichissement `role`, `platformRole`, `companyId`
  - `pages.signIn = "/login"`
  - audit login (`writeLoginAudit`)
- Dependances principales : `next-auth`, `zod`, `bcrypt`, `prisma`, `@prisma/client`

## 8. Comparaison avec REBASAGE-23 / 24 / 25 / 26

- REBASAGE-23 confirme : route `/login` et liaison auth/global shell coherentes.
- REBASAGE-24 confirme : statut `clair` pour presence route/login, mais zones de securite avancee restent partiellement documentees.
- REBASAGE-25 confirme : dette API/auth non totalement explicitee reste dans le cadre "a confirmer".
- REBASAGE-26 confirme : inventaire pages/routes/API coherent avec cet audit Login.

Aucun ecart majeur nouveau qui invalide les constats precedents.

## 9. Ecarts, dettes et points a confirmer

| Priorite | Perimetre | Constat | Risque | Action recommandee |
|---|---|---|---|---|
| Important | Auth/Login | Exigences securite avancee (MFA, lockout, rate-limit explicite) non prouvees dans ce perimetre | Sous-specification securite fonctionnelle | clarifier avec Nathan |
| Important | UX/Login | Checkbox "Se souvenir de moi" visible sans preuve d'impact fonctionnel explicite au niveau page | Incomprehension utilisateur/fonctionnelle | auditer |
| Amelioration | Documentation UI | Reference login tres orientee visuel ; articulation visuel/fonctionnel peut rester ambiguë | Confusion entre fidelity UI et exigences auth | documenter |
| À confirmer | Multi-tenant | Role de `companyId` dans le flux login UI non explicite | Ambiguite de perimetre tenant au login | a confirmer |
| Plus tard | Qualite UX | Ajustements ergonomiques fins (microcopy/etats) | Impact faible court terme | completer plus tard |

## 10. Verdict d'audit de la page Login

- Statut d'audit page Login : **incomplet**

Justification : le flux principal est present et coherent, mais plusieurs attentes securite/tenant restent non prouvees dans ce perimetre d'audit.

## 11. Recommandations pour la suite

- Page Login : a valider plus tard apres clarification des exigences securite minimales attendues.
- Correction immediate : NON (session audit uniquement).
- Prochaine page recommandee : **REBASAGE-28 - Audit page Dashboard**.

## 12. Verdicts de sortie

- REBASAGE-27 VALIDABLE : OUI
- AUDIT PAGE LOGIN CRÉÉ : OUI
- CODE MODIFIÉ : NON
- DOCUMENTS MAÎTRES MODIFIÉS : NON
- PAGE LOGIN STATUT AUDIT : incomplet
- SUITE RECOMMANDÉE : REBASAGE-28
