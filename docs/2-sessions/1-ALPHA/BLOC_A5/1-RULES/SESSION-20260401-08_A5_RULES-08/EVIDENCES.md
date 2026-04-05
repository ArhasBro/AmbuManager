# EVIDENCES

## Sources documentaires utilisées
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`

## Éléments prouvés par le code contrôlé
### Porte d’écriture réelle des règles
- `app/api/company/rules/route.ts` continue d’exiger `canManageCompanyRules(...)` pour le `PATCH`.
- `lib/permissions.ts` continue d’associer cette capacité à `COMPANY_RULES_MANAGE` ou à l’accès natif `ADMIN` / `GERANT`.
- `app/planning/page.tsx` et `app/planning/planning-client.tsx` prouvent que cette permission est déjà consommée côté produit pour l’édition du `PLANNING_VIEW_MODE`.

### Défaut réel de gouvernance avant correction
- `app/api/users/route.ts` autorisait la création de n’importe quel rôle couvert par le formulaire, donc aussi `ADMIN` / `GERANT`, dès qu’un acteur disposait de `canManageUsers(...)`.
- `app/api/users/[id]/route.ts` autorisait la modification libre de `role` et de `permissionCodes`, donc aussi l’attribution ou le retrait de `COMPANY_RULES_MANAGE`.
- `app/users/user-creation-client.tsx` et `app/users/user-edit-client.tsx` exposaient ces capacités sans signalement spécifique sur la délégation du droit de modifier les règles.

### Complétion minimale réellement ajoutée
Le résultat final retenu repose sur :
- `lib/company-rules/governance.ts`
- `app/api/users/route.ts`
- `app/api/users/[id]/route.ts`
- `app/users/page.tsx`
- `app/users/user-creation-client.tsx`
- `app/users/user-edit-client.tsx`

Ces fichiers ajoutent un encadrement ciblé qui réserve aux comptes natifs `ADMIN` / `GERANT` :
- la création d’un utilisateur avec rôle `ADMIN` / `GERANT` ;
- les changements de rôle qui confèrent ou retirent un accès natif à la modification des règles ;
- l’attribution ou le retrait de `COMPANY_RULES_MANAGE`.

## Chaîne de patchs finale retenue
### Patch principal
- `PATCH__SESSION-20260401-08_A5_RULES-08.diff`
- objet : encadrer minimalement la délégation du droit de modification des règles métier via le module utilisateurs existant, sans refonte globale du RBAC.

### Patch documentaire final
- `PATCH__SESSION-20260401-08_A5_RULES-08_DOCS.diff`
- objet : consigner les faits prouvés, le périmètre, les validations et le verdict final de session.

### Correctif documentaire minimal
- `PATCH__SESSION-20260401-08_A5_RULES-08_DOCS_FIX-01.diff`
- objet : corriger les validations terminales finales et supprimer toute mention erronée d’une limite environnementale sur `lint` / `build`.

## Éléments prouvés par terminal
- `git apply --check ".\docs\3-patches\1-ALPHA\BLOC_A5\1-RULES\SESSION-20260401-08_A5_RULES-08\PATCH__SESSION-20260401-08_A5_RULES-08.diff"` : OK
- `git apply ".\docs\3-patches\1-ALPHA\BLOC_A5\1-RULES\SESSION-20260401-08_A5_RULES-08\PATCH__SESSION-20260401-08_A5_RULES-08.diff"` : OK
- `npm run lint` : OK
- `npm run build` : OK

## Interprétations à ne pas écrire comme faits prouvés
- que toute la gouvernance des rôles serait désormais complète ;
- que la session aurait absorbé une refonte du module utilisateurs ;
- que `RULES-08` aurait validé toute la sécurité du compte administrateur au sens large ;
- que `RULES-09` serait implicitement traité.
