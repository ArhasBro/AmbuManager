# README_PATCH

## Session liée

`SESSION-20260312-01_A1_AUTH-02`

## Objet

Correctif complémentaire du patch AUTH-02 pour supprimer la régression build liée à `useSearchParams()` sur `/login`, tout en conservant la redirection sécurisée.

## Fichier patch

`PATCH__SESSION-20260312-01_A1_AUTH-02_BUILD-FIX.diff`

## Fichier code touché

- `app/login/page.tsx`

## Portée exacte

Le patch :
- conserve la sécurisation de `callbackUrl`
- conserve le fallback `/dashboard`
- corrige uniquement l’usage de `useSearchParams()`
- ajoute un wrapper `Suspense`
- déplace le hook dans un composant enfant local au même fichier

Le patch ne touche pas :
- `lib/auth.ts`
- `app/api/auth/[...nextauth]/route.ts`
- `proxy.ts`
- `app/providers.tsx`

## Pourquoi ce patch reste dans AUTH-02

La correction :
- ne traite que le flux de connexion
- ne modifie pas le backend auth
- ne modifie pas la route auth
- ne modifie pas le middleware
- ne sort pas du périmètre autorisé de la session

## Vérification locale

- `git apply --check` : OK

## Commandes d’application

```bash
git apply --check "docs/patches/1-ALPHA/BLOC_A1/SESSION-20260312-01_A1_AUTH-02/PATCH__SESSION-20260312-01_A1_AUTH-02_BUILD-FIX.diff"
git apply "docs/patches/1-ALPHA/BLOC_A1/SESSION-20260312-01_A1_AUTH-02/PATCH__SESSION-20260312-01_A1_AUTH-02_BUILD-FIX.diff"