# REBASAGE-18 — Cadrage audit page par page + futur document fonctionnalités par page

## 1) Résumé de la session

Cette session REBASAGE-18 est une session de cadrage documentaire de méthode.

Objectif atteint dans cette session :
- définir une méthode stable d'audit fonctionnel page par page ;
- fixer une grille d'analyse réutilisable ;
- cadrer le format cible du futur document `fonctionnalités par page` ;
- préparer la reprise des audits produit sans relancer A26 comme bloc actif.

Rappels de gouvernance appliqués :
- `PLAN_DE_DEVELOPPEMENT.md` reste le seul plan officiel ;
- `DOCUMENT_CADRAGE_FONCTIONNEL.md` reste la base produit officielle ;
- A26 est traité comme historique / transitionnel ;
- aucun changement code n'est autorisé dans ce cadrage.

## 2) Méthode d'audit page par page (cadre opérationnel)

### 2.1 Ordre de lecture obligatoire par page

Pour chaque page auditée, lire dans cet ordre :
1. code réel de la page (`app/<route>/page.tsx`, composants clients associés, CSS associé) ;
2. routes/API réellement consommées (fichiers `app/api/**/route.ts`, appels fetch côté client, modules lib/services liés) ;
3. permissions et rôles appliqués (`lib/permissions.ts`, contrôles session/RBAC) ;
4. modèle de données concerné (`prisma/schema.prisma`, validateurs) ;
5. références documentaires master (cadrage fonctionnel, plan officiel, état global, registre décisions) ;
6. références UI/UX et maquettes disponibles pour la page.

Principe d'autorité pendant l'audit :
- état technique réel : code > documentation ;
- périmètre produit attendu : `DOCUMENT_CADRAGE_FONCTIONNEL.md` > plan/sessions historiques ;
- priorités d'exécution : `PLAN_DE_DEVELOPPEMENT.md` (sans modification).

### 2.2 Processus d'audit pour une page

Pour chaque page :
1. identifier la route et le fichier principal ;
2. décrire le rôle métier réel observé ;
3. lister les fonctionnalités présentes et prouvées ;
4. lister les fonctionnalités absentes ou partielles ;
5. rattacher les APIs/modules/services réellement liés ;
6. identifier les permissions/rôles qui conditionnent l'usage ;
7. comparer à la cible documentaire (cadrage, plan, décisions, UI/UX) ;
8. statuer : `CONFORME APPARENT` / `PARTIEL` / `INCOMPLET` / `MANQUANT` / `A CONFIRMER`.

### 2.3 Règles de preuve

Toute conclusion doit être traçable par :
- chemin fichier précis ;
- comportement observé dans le code ;
- source documentaire de comparaison.

Si la preuve manque :
- utiliser exactement `INFORMATION NON FOURNIE — À CONFIRMER`.

## 3) Grille d'audit proposée (modèle réutilisable)

### 3.1 Grille page unitaire

Colonnes recommandées :
- Page / route ;
- Fichier page ;
- Composant(s) client(s) lié(s) ;
- CSS associé ;
- Rôle métier de la page ;
- Fonctionnalités attendues (doc) ;
- Fonctionnalités présentes (code) ;
- Fonctionnalités absentes ;
- Fonctionnalités à masquer / reporter ;
- APIs/modules liés ;
- Permissions / rôles ;
- Statut ;
- Priorité de reprise ;
- Remarques courtes.

### 3.2 Grille écart documentaire

Colonnes recommandées :
- Zone (page/module) ;
- Écart constaté ;
- Source code ;
- Source doc ;
- Gravité (`bloquant`, `important`, `moyen`, `faible`, `à confirmer`) ;
- Recommandation session suivante.

## 4) Format cible du futur document "fonctionnalités par page"

## 4.1 Rôle du futur document

Le futur document `fonctionnalités par page` est une synthèse opérationnelle courte pour exécution propre des sessions page par page.

Ce document ne remplace pas :
- `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md` ;
- `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md` ;
- les références UI/UX ;
- les documents maîtres.

## 4.2 Structure cible recommandée

Pour chaque page :
- Page / route ;
- rôle de la page ;
- fonctionnalités attendues ;
- fonctionnalités présentes dans le code ;
- fonctionnalités absentes ;
- fonctionnalités à supprimer / masquer / reporter ;
- APIs ou modules liés ;
- permissions / rôles concernés ;
- statut : conforme / non conforme / incomplet / à confirmer ;
- priorité de reprise ;
- remarques courtes.

## 4.3 Limites du futur document

Le futur document :
- ne crée pas de plan parallèle ;
- ne décide pas seul des priorités officielles ;
- ne remplace pas les arbitrages Nathan ;
- ne fige pas les décisions produit sans preuve.

## 5) Liste initiale des pages/modules à auditer

Périmètre initial recommandé (ordre pragmatique) :
1. `/login` ;
2. `/dashboard` ;
3. `/company` ;
4. `/depots` ;
5. `/users` ;
6. `/vehicles` ;
7. `/templates` ;
8. `/planning` ;
9. `/onboarding` ;
10. `/audit` ;
11. `/privacy` ;
12. shell global (`app/layout.tsx`, `app/app-shell.tsx`) ;
13. routes API principales par module (auth, users, depots, vehicles, templates, planning, autoschedule, matching, exports, imports, audit, company).

## 6) Périmètre interdit (rappel session REBASAGE-18)

Interdit dans ce cadrage :
- modifier le code ;
- corriger le code ;
- modifier les pages applicatives ;
- modifier `PLAN_DE_DEVELOPPEMENT.md` ;
- modifier `DOCUMENT_MAITRE.md` ;
- modifier `DOCUMENT_CADRAGE_FONCTIONNEL.md` ;
- réécrire le cadrage fonctionnel ;
- relancer A26 comme bloc actif ;
- déplacer/supprimer/renommer des fichiers ;
- créer un nouveau plan parallèle.

## 7) Prochaines étapes recommandées

1. Ouvrir une session dédiée de production documentaire pour créer le document `fonctionnalités par page` selon la grille ci-dessus.
2. Exécuter l'audit page par page dans l'ordre initial recommandé.
3. Produire une matrice d'écarts consolidée (code réel vs cadrage vs plan vs UI/UX).
4. Soumettre les écarts importants à validation Nathan avant toute reprise de production fonctionnelle.

## 8) Verdict de cadrage REBASAGE-18

- REBASAGE-18 VALIDABLE : OUI
- DOCUMENT "FONCTIONNALITÉS PAR PAGE" À CRÉER DANS UNE SESSION SUIVANTE : OUI
- AUDIT PAGE PAR PAGE PRÊT À DÉMARRER : OUI
