# SESSION

Projet : Investissement
Sous-projet : Ambulance Manager
Session : SESSION-20260401-08_A5_RULES-08
Bloc : A5 — Règles métier et paramètres société
Type : COMPLÉTION
Version cible : 1-ALPHA

## Objectif unique
Compléter la gouvernance du droit de modification des règles métier pour que seuls les comptes natifs de gouvernance puissent décider qui reçoit un accès réel à la modification des règles, sans refondre le RBAC global ni le module utilisateurs.

## Périmètre exact traité
### Code modifié
- `app/api/users/route.ts`
- `app/api/users/[id]/route.ts`
- `app/users/page.tsx`
- `app/users/user-creation-client.tsx`
- `app/users/user-edit-client.tsx`
- `lib/company-rules/governance.ts`

### Code contrôlé
- `app/company/page.tsx`
- `app/company/company-rules-panel.tsx`
- `app/api/company/rules/route.ts`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `lib/company-rules/api.ts`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `lib/validators/user.ts`

### Documentation finale
- `docs/2-sessions/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-08_A5_RULES-08/*`
- `docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-08_A5_RULES-08/README_PATCH.md`

## Résultat synthétique de session
Le défaut réel retenu est confirmé : un acteur disposant déjà de la gestion utilisateurs pouvait encore décider indirectement qui modifie les règles métier, soit en attribuant `COMPANY_RULES_MANAGE`, soit en créant ou en promouvant un compte `ADMIN` / `GERANT`, alors que `COMPANY_RULES_MANAGE` reste bien la porte d’écriture réelle de l’API `company rules`.

La complétion minimale retenue ajoute donc une gouvernance ciblée sur ce seul sujet :
- seuls les comptes natifs `ADMIN` ou `GERANT` peuvent créer un utilisateur avec un rôle donnant nativement accès à la modification des règles métier ;
- seuls les comptes natifs `ADMIN` ou `GERANT` peuvent attribuer, retirer ou conférer ce droit via `COMPANY_RULES_MANAGE` ou via un changement de rôle `ADMIN` / `GERANT` ;
- l’UI utilisateurs rend cette contrainte lisible sans ouvrir une refonte générale des rôles / permissions ;
- l’API `company rules` reste inchangée et continue d’utiliser `COMPANY_RULES_MANAGE` comme autorité d’écriture réelle.

La chaîne finale retenue pour la session est la suivante :
1. `PATCH__SESSION-20260401-08_A5_RULES-08.diff`
2. `PATCH__SESSION-20260401-08_A5_RULES-08_DOCS.diff`
3. `PATCH__SESSION-20260401-08_A5_RULES-08_DOCS_FIX-01.diff`

## Validations terminales réelles finales retenues
- `git apply --check ".\docs\3-patches\1-ALPHA\BLOC_A5\1-RULES\SESSION-20260401-08_A5_RULES-08\PATCH__SESSION-20260401-08_A5_RULES-08.diff"` : OK
- `git apply ".\docs\3-patches\1-ALPHA\BLOC_A5\1-RULES\SESSION-20260401-08_A5_RULES-08\PATCH__SESSION-20260401-08_A5_RULES-08.diff"` : OK
- `npm run lint` : OK
- `npm run build` : OK

## Dossiers liés
- Session : `docs/2-sessions/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-08_A5_RULES-08`
- Patchs  : `docs/3-patches/1-ALPHA/BLOC_A5/1-RULES/SESSION-20260401-08_A5_RULES-08`
