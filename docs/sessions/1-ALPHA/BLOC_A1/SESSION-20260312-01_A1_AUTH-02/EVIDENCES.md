# EVIDENCES

## Sources utilisées

### Documentation officielle projet
- `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/master/ETAT_GLOBAL_PROJET.md`
- `docs/master/REGISTRE_DECISIONS.md`
- `docs/master/DOCUMENT_MAITRE.md`
- `docs/master/RECAP_DISCUSSIONS.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`

### Session de reprise
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260310-01_A1_AUTH-01/RESULTATS.md`

### Retour d’exécution utilisateur désormais prouvé
- patch AUTH-02 appliqué dans le dépôt
- patch BUILD-FIX appliqué dans le dépôt
- `git apply --check` : OK
- `npm run lint` : OK
- `npm run build` : OK

### Code réel concerné
- `app/login/page.tsx`
- `lib/auth.ts`
- `app/api/auth/[...nextauth]/route.ts`
- `proxy.ts`
- `app/providers.tsx`

---

## 1. Diagnostic AUTH-02 conservé

### Défaut AUTH-02 retenu
Le défaut fonctionnel traité par la session reste :
- redirection post-connexion figée vers `/dashboard`

Justification code initiale :
- `proxy.ts` protège `/dashboard`, `/vehicles`, `/planning`
- `app/login/page.tsx` forçait `/dashboard` si déjà connecté
- `app/login/page.tsx` forçait `/dashboard` après succès du login

Conséquence :
- le diagnostic AUTH-02 n’est pas rouvert
- il reste le fond technique officiel de la session

---

## 2. Correctif AUTH-02 effectivement appliqué

### Portée réelle du correctif
Fichier code concerné :
- `app/login/page.tsx`

Correctif appliqué :
- lecture d’un `callbackUrl` éventuel
- fallback conservé sur `/dashboard`
- sécurisation explicite de la destination interne
- réutilisation d’une cible normalisée après succès du login
- absence d’élargissement hors flux de connexion

Constat précis :
- le défaut AUTH-02 a été corrigé dans le dépôt

---

## 3. Correctif BUILD-FIX effectivement appliqué

### Cause de la régression build traitée
Preuve précédente prise en compte :
- `useSearchParams() should be wrapped in a suspense boundary at page "/login"`
- `Error occurred prerendering page "/login"`

Correctif appliqué :
- déplacement de `useSearchParams()` dans un sous-composant enfant
- enveloppement dans `Suspense`
- conservation de la logique de redirection sécurisée
- maintien du correctif dans `app/login/page.tsx` uniquement

Constat précis :
- la régression build liée au patch AUTH-02 a été corrigée dans le dépôt

---

## 4. Preuves techniques désormais validées

### Applicabilité des patchs
- `git apply --check` : OK

Constat précis :
- les patchs produits sont cohérents avec le dépôt

### Validation statique
- `npm run lint` : OK
- `npm run build` : OK

Constat précis :
- aucun échec lint restant sur le périmètre AUTH-02
- aucune régression build restante sur `/login`

---

## 5. Périmètre strictement respecté

Constat précis :
- un seul fichier code a été modifié dans toute la correction AUTH-02 : `app/login/page.tsx`
- aucun autre fichier code n’a été justifié ni requis

Fichiers explicitement non touchés par le fond technique de la correction :
- `lib/auth.ts`
- `app/api/auth/[...nextauth]/route.ts`
- `proxy.ts`
- `app/providers.tsx`

Conséquence :
- la session reste strictement dans le périmètre autorisé de `AUTH-02`

---

## 6. Réserve restante explicite

Élément restant à confirmer :
- test manuel fonctionnel de redirection post-login sur :
  - `/dashboard`
  - `/vehicles`
  - `/planning`

Constat précis :
- la réserve restante n’est plus technique de build ou de lint
- la seule réserve finale est fonctionnelle