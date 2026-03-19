# RESULTATS

## Verdict global retenu

Verdict : **`partiellement conforme`**.

## Pourquoi ce verdict

La session est `partiellement conforme` car :
- le patch code `SUP-04` est produit, borné et cohérent avec le cadrage produit ;
- les surfaces client réellement présentes dans le dépôt ont été corrigées sans ouverture de droits support supplémentaires ;
- les validations terminales obligatoires n’ont pas pu être confirmées dans ce conteneur, à cause d’un blocage `npm ci` interrompu par `SIGTERM`.

## Réponses factuelles aux attendus de session

### 1. Le support remonte-t-il encore comme utilisateur client “normal” sur les flux users réellement présents ?
Réponse : **non**.

Le filtrage `/api/users` exclut désormais explicitement :
- les comptes avec `platformRole` non nul ;
- les comptes sans rôle tenant (`role = null`).

### 2. Le support reste-t-il manipulable via les flux client existants de reset mot de passe et de rattachement dépôt ?
Réponse : **non**.

Les routes ciblées et le service `assignUserDepot()` refusent désormais implicitement toute cible qui ne serait pas un utilisateur de société administrable.

### 3. Des droits globaux implicites supplémentaires ont-ils été accordés au support ?
Réponse : **non**.

Le patch ne crée ni bypass global, ni accès cross-company, ni exception RBAC supplémentaire.

### 4. Une UI future de gestion complète des rôles a-t-elle été inventée ?
Réponse : **non**.

La session reste bornée aux surfaces réellement présentes dans le dépôt.

### 5. Prisma schema, auth / NextAuth ou audit renforcé `SUP-05` ont-ils été modifiés ?
Réponse : **non**.

### 6. Les validations terminales obligatoires sont-elles validées dans ce conteneur ?
Réponse : **non**.

Motif constaté :
- `npm ci` a été interrompu par `SIGTERM` pendant `reify` ;
- les commandes `npx prisma validate`, `npx prisma generate`, `npm run lint` et `npm run build` ne sont donc pas confirmées ici.

## Patch officiel retenu

- `SUP-04.diff`

## Validation d’application du patch

- `git apply --check` : **OK**
- `git apply` : **OK**

## Fichiers code réellement modifiés

- `app/api/users/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/api/users/[id]/depot/route.ts`
- `lib/services/users/assign-user-depot.ts`
- `app/users/page.tsx`
- `app/users/reset-password-client.tsx`
- `app/users/user-depot-assignment-client.tsx`

## Conclusion

Le correctif `SUP-04` traite correctement la visibilité support côté client sur les surfaces users réellement présentes, sans extension de périmètre et sans droit support supplémentaire.  
Le point bloquant restant est strictement la validation terminale locale dans ce conteneur, pas l’intention fonctionnelle du patch.
