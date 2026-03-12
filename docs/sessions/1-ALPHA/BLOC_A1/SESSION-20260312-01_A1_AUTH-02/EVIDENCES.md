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

### Retour d’exécution utilisateur
- `npm run lint` : OK
- `npm run build` : ÉCHEC
- erreur :
  - `useSearchParams() should be wrapped in a suspense boundary at page "/login"`
  - `Error occurred prerendering page "/login"`

### Code réel concerné
- `app/login/page.tsx`
- `lib/auth.ts`
- `app/api/auth/[...nextauth]/route.ts`
- `proxy.ts`
- `app/providers.tsx`

---

## 1. Diagnostic AUTH-02 conservé

### Défaut AUTH-02 déjà retenu
Le défaut fonctionnel retenu reste :
- redirection post-connexion figée vers `/dashboard`

Justification code :
- `proxy.ts` protège `/dashboard`, `/vehicles`, `/planning`
- `app/login/page.tsx` forçait `/dashboard` si déjà connecté
- `app/login/page.tsx` forçait `/dashboard` après succès du login

Conséquence :
- le diagnostic AUTH-02 n’est pas remis en cause

---

## 2. Nouvelle preuve de régression build

### Régression introduite par le précédent patch AUTH-02
Preuve utilisateur :
- `npm run build` échoue
- erreur explicite sur `useSearchParams()` et `Suspense` à la page `/login`

Constat précis :
- le problème n’est pas la logique de sécurisation de `callbackUrl`
- le problème est l’emplacement de `useSearchParams()` dans `app/login/page.tsx`

---

## 3. Justification du correctif complémentaire

### Fichier code réellement nécessaire
Fichier concerné :
- `app/login/page.tsx`

Constat précis :
- la régression build est localisée dans ce fichier
- aucune preuve n’impose un second fichier code

### Correction minimale retenue
Correction :
- transformer le composant exporté en wrapper
- créer un sous-composant `LoginPageContent`
- déplacer `useSearchParams()` dans ce sous-composant
- envelopper ce sous-composant dans `<Suspense>`

Conséquence :
- la logique de redirection sécurisée est conservée
- la correction reste locale
- le patch reste strictement dans AUTH-02

---

## 4. Éléments explicitement conservés

Sont conservés sans remise en cause :
- `DEFAULT_LOGIN_REDIRECT = "/dashboard"`
- la validation d’un chemin interne sûr
- le rejet des destinations non internes sûres
- la normalisation de `res.url`
- l’appel `signIn(..., { redirect: false, callbackUrl })`

---

## 5. Preuve de validité du patch complémentaire

Vérification locale réalisée :
- `git apply --check` du patch complémentaire : OK

Constat précis :
- le `.diff` complémentaire est syntaxiquement applicable sur un état correspondant au dépôt avec le précédent patch AUTH-02 déjà appliqué

---

## 6. Limites explicites

- patch non appliqué dans le dépôt utilisateur dans cette session
- nouveau `lint` non relancé dans cette session
- nouveau `build` non relancé dans cette session
- test manuel non relancé dans cette session