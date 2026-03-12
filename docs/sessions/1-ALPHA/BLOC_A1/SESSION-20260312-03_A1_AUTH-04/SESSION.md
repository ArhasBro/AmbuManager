# SESSION

## ID SESSION

SESSION-20260312-03_A1_AUTH-04

## Date

12/03/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A1  
Type : COMPLÉTION  
Intitulé : Création/validation du mot de passe initial côté produit

Références officielles utilisées :
- `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/master/ETAT_GLOBAL_PROJET.md`
- `docs/master/REGISTRE_DECISIONS.md`
- `docs/master/DOCUMENT_MAITRE.md`
- `docs/master/RECAP_DISCUSSIONS.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260310-01_A1_AUTH-01/RESULTATS.md`
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260312-01_A1_AUTH-02/RESULTATS.md`
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260312-02_A1_AUTH-03/RESULTATS.md`
- code réel du dépôt

Contexte utile rappelé :
- `AUTH-01` : le socle login existe ; verdict global auth `incomplet`
- `AUTH-02` : correction du flux de connexion
- `AUTH-03` : validation `role` + `companyId` conforme
- `AUTH-04` : sujet strict = mot de passe initial côté produit

## Objectif de la session

Vérifier factuellement :
1. ce que le cadrage officiel attend du mot de passe initial,
2. ce que le dépôt implémente réellement,
3. si un mécanisme produit autonome de définition / attribution / validation du mot de passe initial existe,
4. si une complétion minimale strictement `AUTH-04` est possible sans ouvrir un autre périmètre.

## Périmètre exact traité

### Documentation
- `docs/master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/master/ETAT_GLOBAL_PROJET.md`
- `docs/master/REGISTRE_DECISIONS.md`
- `docs/master/DOCUMENT_MAITRE.md`
- `docs/master/RECAP_DISCUSSIONS.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- sessions précédentes utiles `AUTH-01`, `AUTH-02`, `AUTH-03`

### Code inspecté
- `lib/auth.ts`
- `app/api/auth/[...nextauth]/route.ts`
- `app/api/users/route.ts`
- `app/login/page.tsx`
- `prisma/schema.prisma`
- `prisma/seed.ts`
- `prisma/test-login.ts`
- arborescence `app/`
- routes `app/api/`

### Hors périmètre explicitement respecté
- redirection post-login
- RBAC détaillé
- permissions fines
- multi-tenant global complet
- reset password complet
- module users complet
- onboarding complet hors sujet strict

## Résultat synthétique de session

Constat validé :
- le dépôt contient un support technique du mot de passe :
  - champ `User.password`
  - hash bcrypt au seed
  - validation au login
- mais aucun flux produit autonome de mot de passe initial n’a été trouvé dans le périmètre inspecté :
  - aucune API de création utilisateur trouvée dans le périmètre inspecté
  - aucune UI de création utilisateur trouvée dans les fichiers inspectés
  - aucun état ou logique explicite “mot de passe initial” trouvé dans les fichiers inspectés

## Décision de session

Décision retenue :
- **NO_PATCH**

Justification méthodologique spécifique au type `COMPLÉTION` :
- une session `COMPLÉTION` doit produire un patch si une complétion minimale autonome existe réellement dans son périmètre ;
- ici, le comportement produit attendu implique au minimum un point d’entrée produit permettant d’attribuer ou définir un mot de passe initial pour un utilisateur nouvellement créé ;
- aucun tel point d’entrée n’a été trouvé dans le périmètre inspecté ;
- ajouter seulement une logique technique isolée (helper, validation, champ interne, seed supplémentaire, documentation) ne rendrait pas le comportement “côté produit” conforme ;
- créer ce point d’entrée imposerait d’ouvrir la création utilisateur côté produit, déjà portée par :
  - `USERS-04 — COMPLÉTION — API création utilisateur`
  - `USERS-05 — COMPLÉTION — UI création utilisateur`

Conclusion :
- aucune complétion minimale strictement autonome `AUTH-04` n’a été démontrée comme faisable sans déborder du périmètre.

## Verdict retenu

**partiellement conforme**

## État final attendu du dossier patch

Dossier patch attendu :
- `NO_PATCH.md` : présent
- `README_PATCH.md` : non applicable, à supprimer s’il est encore présent comme gabarit initial
- aucun fichier `.diff`

## Dossiers liés

- Session : `./docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260312-03_A1_AUTH-04`
- Patch : `./docs/patches/1-ALPHA/BLOC_A1/SESSION-20260312-03_A1_AUTH-04`