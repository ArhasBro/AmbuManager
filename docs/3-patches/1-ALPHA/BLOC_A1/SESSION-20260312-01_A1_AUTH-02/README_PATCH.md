# README_PATCH

## Session liée

`SESSION-20260312-01_A1_AUTH-02`

## Objet

Documentation finale des correctifs appliqués pour la session AUTH-02 :
- correctif AUTH-02 sur la redirection post-connexion
- correctif BUILD-FIX sur l’usage de `useSearchParams()` à la page `/login`

## Fichiers patchs

- `PATCH__SESSION-20260312-01_A1_AUTH-02.diff`
- `PATCH__SESSION-20260312-01_A1_AUTH-02_BUILD-FIX.diff`

## Fichier code touché

- `app/login/page.tsx`

## Portée exacte

Les correctifs appliqués :
- conservent la sécurisation de `callbackUrl`
- conservent le fallback `/dashboard`
- normalisent la destination de retour après connexion
- corrigent l’usage de `useSearchParams()` via un sous-composant enfant
- ajoutent un wrapper `Suspense`
- restent limités à `app/login/page.tsx`

Les correctifs ne touchent pas :
- `lib/auth.ts`
- `app/api/auth/[...nextauth]/route.ts`
- `proxy.ts`
- `app/providers.tsx`

## Pourquoi cela reste dans AUTH-02

La correction :
- ne traite que le flux de connexion
- ne modifie pas le backend auth
- ne modifie pas la route auth
- ne modifie pas le middleware
- ne sort pas du périmètre autorisé de la session

## État réel désormais validé

- patch AUTH-02 appliqué : Oui
- patch BUILD-FIX appliqué : Oui
- `git apply --check` : OK
- `npm run lint` : OK
- `npm run build` : OK

## Réserve restante

Seule réserve restante :
- test manuel fonctionnel de redirection post-login à confirmer sur :
  - `/dashboard`
  - `/vehicles`
  - `/planning`

## Verdict documentaire

**VALIDABLE SOUS RÉSERVE**