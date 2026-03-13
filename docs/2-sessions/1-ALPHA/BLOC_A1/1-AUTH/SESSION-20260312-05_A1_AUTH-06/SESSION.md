# SESSION

## ID SESSION

SESSION-20260312-05_A1_AUTH-06

## Date

12/03/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A1  
Type : COMPLÉTION  
Intitulé : Réinitialisation de mot de passe par support propriétaire

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
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260312-03_A1_AUTH-04/RESULTATS.md`
- `docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260312-04_A1_AUTH-05/RESULTATS.md`
- code réel du dépôt

Contexte utile rappelé :
- `AUTH-01` : socle login existant ; verdict global auth `incomplet`
- `AUTH-02` : correction du flux de connexion
- `AUTH-03` : validation `role` + `companyId` conforme
- `AUTH-04` : support technique du mot de passe existant mais pas de flux produit autonome de mot de passe initial ; `NO_PATCH` recevable
- `AUTH-05` : reset par admin/gérant d’un autre utilisateur désormais livré côté produit
- `AUTH-06` : sujet strict = reset par support propriétaire d’un autre utilisateur

## Objectif de la session

Vérifier factuellement :
1. ce que le cadrage officiel attend du reset par support propriétaire,
2. ce que le dépôt implémente réellement,
3. si un mécanisme produit de reset par support propriétaire existe,
4. si une complétion minimale strictement `AUTH-06` est possible sans ouvrir un autre périmètre.

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
- sessions précédentes utiles `AUTH-01`, `AUTH-04`, `AUTH-05`

### Code inspecté
- `lib/auth.ts`
- `app/api/auth/[...nextauth]/route.ts`
- `prisma/schema.prisma`
- `types/next-auth.d.ts`
- `proxy.ts`
- `app/api/users/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/users/page.tsx`
- `app/users/reset-password-client.tsx`
- `app/dashboard/page.tsx`
- recherche textuelle ciblée dans `app/`, `lib/`, `prisma/`, `docs/master/`

### Hors périmètre explicitement respecté
- mot de passe initial
- création utilisateur complète
- reset par admin/gérant déjà traité par `AUTH-05`
- self-service / mot de passe oublié par email
- changement de son propre mot de passe
- multi-tenant global complet
- RBAC global complet
- audit support complet

## Résultat synthétique de session

Constat validé :
- le dépôt contient désormais un reset produit par `ADMIN` / `GERANT` pour un autre utilisateur de la même société ;
- en revanche, aucun rôle, compte, route, écran ou règle d’accès exploitable comme `support propriétaire` n’a été trouvé dans le code réel ;
- le cadrage officiel prévoit bien ce support propriétaire, mais le marque encore comme manquant ;
- le nom exact du rôle support n’est pas figé dans le cadrage : `INFORMATION NON FOURNIE — À CONFIRMER`.

## Décision de session

Décision retenue :
- **NO_PATCH**

Justification méthodologique spécifique au type `COMPLÉTION` :
- une session `COMPLÉTION` doit produire un patch si une complétion minimale autonome existe réellement dans son périmètre ;
- ici, le comportement attendu suppose au minimum un support propriétaire identifiable et autorisable côté produit ;
- or le code réel ne contient pas :
  - de rôle support distinct dans `Role`,
  - de compte support nominatif prouvé,
  - de logique d’auth ou de session dédiée au support,
  - de règle d’accès support sur la route de reset,
  - de point d’entrée UI support ;
- ajouter seulement un contournement local sur la route existante reviendrait soit à inventer un mécanisme support non cadré, soit à ouvrir la modélisation du rôle support et de son accès global.

Conclusion :
- aucune complétion minimale strictement autonome `AUTH-06` n’a été démontrée comme faisable sans déborder vers le bloc support propriétaire déjà planifié (`SUP-02`, `SUP-03`, `SUP-04`, `SUP-05`).

## Verdict retenu

**partiellement conforme**

## État final attendu du dossier patch

Dossier patch attendu :
- `NO_PATCH.md` : présent
- `README_PATCH.md` : non applicable, à supprimer s’il est encore présent comme gabarit initial
- aucun fichier `.diff`

## Dossiers liés

- Session : `./docs/sessions/1-ALPHA/BLOC_A1/SESSION-20260312-05_A1_AUTH-06`
- Patch : `./docs/patches/1-ALPHA/BLOC_A1/SESSION-20260312-05_A1_AUTH-06`
