# Ambulance Manager — PLAN_DE_DEVELOPPEMENT_V2

Version : V2.0  
Date : 26/05/2026

## Sommaire

- 1. Rôle du document
- 2. Références utilisées
- 3. État actuel après audit Alpha V2
- 4. Objectif de la reprise du code en Phase 6
- 5. Principes de découpage
- 6. Ordre global de reprise
- 7. Blocs de développement DEV-V2
- 8. Règles de validation
- 9. Règles de commit
- 10. Contrôles obligatoires par type de changement
- 11. Gouvernance documentaire
- 12. Documents MASTER à mettre à jour
- 13. Éléments hors périmètre immédiat / Beta
- 14. Règles de session Codex en Phase 6
- 15. Points de vigilance à confirmer pendant la Phase 6
- 16. Conclusion
- 17. Statut documentaire et contrôle final du document

## 1. Rôle du document

Ce plan pilote la reprise du code après l’audit Alpha V2.  
Il sert de cadre opérationnel pour exécuter la Phase 6 par blocs courts, traçables et validables, sans relancer une refonte globale.

## 2. Références utilisées

- `docs/1-MASTER/AUDIT_CODE_EXISTANT_ALPHA_V2.md`
- `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT_V2.md` — plan actif de pilotage de la reprise Phase 6.
- `docs/1-MASTER/DOCUMENT_MAITRE_V2.md`
- `docs/1-MASTER/_INDEX_MASTER.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/` (références V2 par module, en appui)
- `docs/1-MASTER/3-FONCTIONNALITES/` (fiches détaillées, en appui)
- `docs/1-MASTER/1-MAQUETTE/` (maquettes V2 si arbitrage visuel nécessaire)

## 3. État actuel après audit Alpha V2

Verdict consolidé : **repo exploitable avec corrections majeures**.  
Points utiles pour la reprise :

- base Next.js/React/Prisma réutilisable ;
- écarts transverses forts sur shell, nomenclature, accès refusé, permissions front/API ;
- modules métier à corriger/compléter avec priorité élevée (`Véhicules`, `Suivi des véhicules`, `Utilisateurs/RH`, `Modèles horaires`, `Planning`) ;
- ne valide aucune page individuellement à ce stade.

## 4. Objectif de la reprise du code en Phase 6

La Phase 6 doit :

- corriger les écarts non conformes ;
- compléter les modules incomplets ;
- conserver ce qui est déjà exploitable ;
- éviter les refontes inutiles ;
- stabiliser la base Alpha V2 avant toute évolution Beta.

## 5. Principes de découpage

- découpage logique par dépendances réelles ;
- blocs cohérents, logiques, structurés et centrés sur un objectif clair ;
- sessions courtes, ciblées, contrôlables et exécutables ;
- ne pas créer de bloc artificiellement court ;
- éviter les sessions fourre-tout ;
- conserver un livrable principal clair par session ;
- limiter le risque de dérive Codex ;
- traiter la dette technique utile à la reprise (duplications évidentes, factorisation ciblée, lisibilité, maintenabilité) sans créer de refonte technique globale ;
- `AUDIT ciblé` avant correction quand le périmètre exact est incertain ;
- `CORRECTION` avant `COMPLÉTION` si l’existant est erroné ;
- `VALIDATION` systématique avant bloc suivant ;
- `CLOTURE` obligatoire de chaque bloc ;
- aucun glissement vers refonte massive.

## 6. Ordre global de reprise

Ordre retenu (dépendances + risque) :

1. socle transverse : shell/navigation/nomenclature/accès refusé ;
2. permissions front/API transverses ;
3. modules opérationnels cœur : véhicules puis suivi des véhicules ;
4. ressources et structures : utilisateurs/RH, dépôts/bases, modèles horaires, société ;
5. module dépendant : planning ;
6. écrans de synthèse et accès : dashboard puis login ;
7. transverse de confiance : audit/traçabilité ;
8. flux d’initialisation : mise en route ;
9. validation finale Alpha V2.

Justification : ce séquencement réduit les régressions, car planning/dashboard/login/audit dépendent d’une base permissionnelle, nomenclature et données métier déjà stabilisées.

## 7. Blocs de développement DEV-V2

### BLOC DEV-V2-01 — Shell global / navigation / nomenclature V2 / accès refusé

#### Objectif du bloc
Stabiliser le socle visuel commun et la terminologie V2 (`Modèles horaires`, `Mise en route`) avec une stratégie claire d’état `Accès refusé`.

#### Pourquoi ce bloc existe
L’audit signale ce point comme transverse, non conforme et prioritaire.

#### Périmètre
Navigation privée, libellés modules, routage visible, comportement non autorisé côté UI.

#### Exclusions
Correction métier fine des modules.

#### Sessions prévues
- DEV-V2-01-01 — AUDIT ciblé — Cartographier shell actuel, libellés legacy et cas non autorisés.
- DEV-V2-01-02 — AUDIT ciblé / CADRAGE technique léger — Confirmer la structure frontend partagée (`app/ui` et existence/absence de `components/`), puis valider la cible de structure à conserver ou à créer selon le repo réel.
- DEV-V2-01-03 — AUDIT ciblé / CADRAGE technique léger — Fixer les conventions d’usage des composants partagés et identifier les composants réutilisables prioritaires (shell/layout, navigation, bouton, badge, tableau, filtres, état vide, état erreur/accès refusé, panneau de détail), avec factorisation progressive uniquement si utile aux blocs DEV-V2.
- DEV-V2-01-04 — AUDIT ciblé / CADRAGE technique léger — Confirmer la stratégie Tailwind v4 en place (`@tailwindcss/postcss`, `@import "tailwindcss"`), décider si `tailwind.config.*` est utile ou non, et cadrer les tokens/classes utilitaires minimaux pour la cohérence UI sans refonte graphique.
- DEV-V2-01-05 — CORRECTION — Aligner nomenclature V2 dans navigation et entêtes.
- DEV-V2-01-06 — CORRECTION — Harmoniser le pattern `Accès refusé` pour utilisateur authentifié non autorisé.
- DEV-V2-01-07 — VALIDATION — Vérifier cohérence routes/navigation/labels, application du socle frontend validé et absence de dérive vers refonte UI massive.
- CLOTURE_DEV-V2-01 — VALIDATION — clôture finale du bloc.

#### Livrables attendus
Shell cohérent V2, terminologie unifiée, comportement non autorisé homogène, conventions frontend partagées validées et base de composants réutilisables cadrée.

#### Contrôles obligatoires
`npm run lint`, `npm run build`, contrôle visuel manuel navigation + états non autorisés, vérification documentaire de la décision `app/ui` vs `components/` et de la décision Tailwind v4 (`tailwind.config.*` créé ou non).

#### Critère de validation du bloc
Aucun libellé legacy résiduel dans le shell actif ; pattern d’accès refusé appliqué ; conventions de socle frontend explicites et réutilisables pour les blocs suivants.

#### Documentation à mettre à jour si nécessaire
`PLAN_DE_DEVELOPPEMENT_V2.md`, référence UI/UX shell si ajustement validé.

---

### BLOC DEV-V2-02 — Permissions front/API transverses

#### Objectif du bloc
Aligner les permissions UI et API avant reprise métier détaillée.

#### Pourquoi ce bloc existe
Risque bloquant identifié dans l’audit (écarts front/API).

#### Périmètre
RBAC/guards, contrôles d’accès API, cohérence messages d’erreur et non-contournement.

#### Exclusions
Évolutions fonctionnelles métier non liées aux droits.

#### Sessions prévues
- DEV-V2-02-01 — AUDIT ciblé — Cartographier permissions par module critique (RH, Véhicules, Planning).
- DEV-V2-02-02 — CORRECTION — Aligner restrictions API avec actions réellement exposées.
- DEV-V2-02-03 — CORRECTION — Aligner états UI (boutons/menus/actions) avec droits réels.
- DEV-V2-02-04 — VALIDATION — Contrôles manuels multi-rôles sur parcours sensibles.
- CLOTURE_DEV-V2-02 — VALIDATION — clôture finale du bloc.

#### Livrables attendus
Base permissionnelle transverse fiable pour les blocs métier.

#### Contrôles obligatoires
`npm run lint`, `npm run build`, tests manuels par rôle, vérification UI/API non contournable.

#### Critère de validation du bloc
Aucune action sensible accessible en UI si interdite en API.

#### Documentation à mettre à jour si nécessaire
`REGISTRE_DECISIONS_V2.md` (si arbitrage de matrice), documentation session.

---

### BLOC DEV-V2-03 — Véhicules

#### Objectif du bloc
Corriger le module Véhicules existant : permissions, données, cycle de vie, conformité V2.

#### Pourquoi ce bloc existe
Module non conforme à très haute priorité selon audit.

#### Périmètre
Liste/détail/actions véhicule, statut et archivage si existants, cohérence UI/API.

#### Exclusions
Fonctionnalités du module `Suivi des véhicules` dédiées.

#### Sessions prévues
- DEV-V2-03-01 — AUDIT ciblé — Cartographier écarts UI/API et cycle de vie véhicule.
- DEV-V2-03-02 — CORRECTION — Corriger permissions front/API incohérentes.
- DEV-V2-03-03 — CORRECTION — Corriger données affichées et statuts non conformes.
- DEV-V2-03-04 — COMPLÉTION — Compléter actions manquantes de cycle de vie validées en V2.
- DEV-V2-03-05 — VALIDATION — Vérifier non-régression CRUD/permissions/états.
- CLOTURE_DEV-V2-03 — VALIDATION — clôture finale du bloc.

#### Livrables attendus
Module Véhicules conforme V2 exploitable en production Alpha.

#### Contrôles obligatoires
`lint`, `build`, contrôle permissions, contrôle API, contrôle visuel manuel.

#### Critère de validation du bloc
Parcours véhicule critique complet sans incohérence de droits ni de statut.

#### Documentation à mettre à jour si nécessaire
Fiche fonctionnelle véhicules uniquement si décision métier modifiée.

---

### BLOC DEV-V2-04 — Suivi des véhicules

#### Objectif du bloc
Créer/structurer le module selon périmètre validé : vue d’ensemble, vérifications, désinfections, anomalies.

#### Pourquoi ce bloc existe
Module dédié non matérialisé ou non prouvé dans l’audit.

#### Périmètre
Structure module, routes, états UI, modèle de données/API minimal validé.

#### Exclusions
Optimisations avancées de maintenance prédictive (Beta).

#### Sessions prévues
- DEV-V2-04-01 — AUDIT ciblé — Confirmer périmètre exact cible et existant réutilisable.
- DEV-V2-04-02 — COMPLÉTION — Structurer la vue d’ensemble côté UI/navigation (écran, sections, états).
- DEV-V2-04-03 — COMPLÉTION — Structurer la vue d’ensemble côté données/API minimal validé.
- DEV-V2-04-04 — COMPLÉTION — Structurer le sous-flux Vérifications côté UI/états.
- DEV-V2-04-05 — COMPLÉTION — Structurer le sous-flux Vérifications côté API/permissions.
- DEV-V2-04-06 — COMPLÉTION — Structurer le sous-flux Désinfections côté UI/états.
- DEV-V2-04-07 — COMPLÉTION — Structurer le sous-flux Désinfections côté API/permissions.
- DEV-V2-04-08 — COMPLÉTION — Structurer le sous-flux Anomalies (UI/API/permissions) avec traçabilité minimale si action sensible.
- DEV-V2-04-09 — VALIDATION — Vérifier cohérence permissions, données et navigation.
- CLOTURE_DEV-V2-04 — VALIDATION — clôture finale du bloc.

#### Livrables attendus
Module `Suivi des véhicules` opérationnel au périmètre Alpha V2 validé.

#### Contrôles obligatoires
`lint`, `build`, preuve terminale de session, contrôle visuel, contrôle API si route modifiée, contrôle permissions, contrôle non-régression ciblé, documentation de session.

#### Critère de validation du bloc
Les 4 sous-vues cibles sont accessibles, cohérentes et non contournables.

#### Documentation à mettre à jour si nécessaire
Référence UI/UX 6.1 et fiche fonctionnelle 6.1 uniquement si arbitrage fonctionnel.

---

### BLOC DEV-V2-05 — Utilisateurs / RH

#### Objectif du bloc
Corriger filtres/statuts/actions RH et aligner UI/API.

#### Pourquoi ce bloc existe
Écarts critiques de cohérence signalés par audit.

#### Périmètre
Listing, filtres actifs/inactifs, statuts, actions RH principales, droits associés.

#### Exclusions
Nouveaux workflows RH non prévus Alpha.

#### Sessions prévues
- DEV-V2-05-01 — AUDIT ciblé — Cartographier mismatch filtres UI vs filtrage API.
- DEV-V2-05-02 — CORRECTION — Corriger filtres/statuts incohérents.
- DEV-V2-05-03 — CORRECTION — Corriger permissions/actions RH.
- DEV-V2-05-04 — COMPLÉTION — Compléter flux RH incomplets validés.
- DEV-V2-05-05 — VALIDATION — Vérifier parcours par rôle et non-régression.
- CLOTURE_DEV-V2-05 — VALIDATION — clôture finale du bloc.

#### Livrables attendus
Module RH lisible, fiable et aligné avec l’API.

#### Contrôles obligatoires
`lint`, `build`, tests manuels par rôle, vérification permissions UI/API, contrôle explicite restore/unarchive (API existante ou à créer, UI associée, permissions, audit si action sensible).

#### Critère de validation du bloc
Lecture et action RH cohérentes pour tous statuts affichés.

#### Documentation à mettre à jour si nécessaire
Fiche utilisateurs/RH si décision métier modifiée.

---

### BLOC DEV-V2-06 — Dépôts / Bases

#### Objectif du bloc
Compléter champs attendus, archive/restauration et cohérence inter-modules.

#### Pourquoi ce bloc existe
Cycle archive/restauration jugé non conforme/incomplet.

#### Périmètre
CRUD, archive, restauration, liens avec utilisateurs/véhicules/planning si impact direct.

#### Exclusions
Refonte d’architecture des dépôts.

#### Sessions prévues
- DEV-V2-06-01 — AUDIT ciblé — Vérifier cycle de vie complet et champs attendus.
- DEV-V2-06-02 — CORRECTION — Corriger flux d’archive non conformes.
- DEV-V2-06-03 — COMPLÉTION — Ajouter restauration/désarchivage manquants si validés.
- DEV-V2-06-04 — VALIDATION — Vérifier impacts sur filtres et dépendances modules.
- CLOTURE_DEV-V2-06 — VALIDATION — clôture finale du bloc.

#### Livrables attendus
Cycle de vie Dépôts/Bases maîtrisé et traçable.

#### Contrôles obligatoires
`lint`, `build`, contrôle API, contrôle permissions, contrôle explicite restore/unarchive (API existante ou à créer, UI associée, permissions, audit si action sensible).

#### Critère de validation du bloc
Archive/restauration fonctionnels sans rupture dépendante.

#### Documentation à mettre à jour si nécessaire
Fiche dépôts/bases si règle métier ajustée.

---

### BLOC DEV-V2-07 — Modèles horaires

#### Objectif du bloc
Renommer correctement, corriger le module existant et stabiliser ses dépendances planning.

#### Pourquoi ce bloc existe
Nomenclature legacy + non-conformités fonctionnelles fortes.

#### Périmètre
Terminologie, liste/édition/archive/restauration (si validée), dépendances vers planning.

#### Exclusions
Nouveaux algorithmes avancés de modèle horaire.

#### Sessions prévues
- DEV-V2-07-01 — AUDIT ciblé — Cartographier écarts `Templates` vs `Modèles horaires`.
- DEV-V2-07-02 — CORRECTION — Aligner nomenclature UI/routes/labels techniques exposés.
- DEV-V2-07-03 — CORRECTION — Corriger flux existants non conformes.
- DEV-V2-07-04 — COMPLÉTION — Compléter cycle de vie manquant validé.
- DEV-V2-07-05 — VALIDATION — Vérifier cohérence avec planning.
- CLOTURE_DEV-V2-07 — VALIDATION — clôture finale du bloc.

#### Livrables attendus
Module Modèles horaires stable et prêt pour planning.

#### Contrôles obligatoires
`lint`, `build`, contrôle visuel, contrôle API/permissions, contrôle explicite restore/unarchive (API existante ou à créer, UI associée, permissions, audit si action sensible).

#### Critère de validation du bloc
Aucun point bloquant restant côté planning dépendant.

#### Documentation à mettre à jour si nécessaire
Référence UI/UX modèles horaires si ajustement validé.

---

### BLOC DEV-V2-08 — Société / règles / modes

#### Objectif du bloc
Raccorder les règles société et modes exploitables UI/API.

#### Pourquoi ce bloc existe
Raccord partiel signalé, avec impact transverse sur comportements métier.

#### Périmètre
Profil société, règles, modes, capacités associées visibles.

#### Exclusions
Règles avancées non nécessaires à Alpha V2.

#### Sessions prévues
- DEV-V2-08-01 — AUDIT ciblé — Lister règles/modes déjà stockés vs réellement appliqués.
- DEV-V2-08-02 — CORRECTION — Corriger incohérences UI/API.
- DEV-V2-08-03 — COMPLÉTION — Compléter raccords manquants validés.
- DEV-V2-08-04 — VALIDATION — Vérifier impacts sur RH/ops/planning.
- CLOTURE_DEV-V2-08 — VALIDATION — clôture finale du bloc.

#### Livrables attendus
Règles société opérationnelles et cohérentes.

#### Contrôles obligatoires
`lint`, `build`, contrôle API, contrôle permissions.

#### Critère de validation du bloc
Règle activée = comportement attendu observable en UI/API.

#### Documentation à mettre à jour si nécessaire
Fiche société, registre décisions si arbitrage structurant.

---

### BLOC DEV-V2-09 — Planning

#### Objectif du bloc
Reprendre le planning après stabilisation de ses dépendances critiques.

#### Pourquoi ce bloc existe
Module riche mais incomplet, sensible aux régressions.

#### Périmètre
Flux actifs (publication/annulation/export/affectation), permissions, états UI homogènes.

#### Exclusions
Refonte profonde moteur avancé hors besoins Alpha.

#### Sessions prévues
- DEV-V2-09-01 — AUDIT ciblé — Cartographier flux actifs vs legacy et priorités de correction.
- DEV-V2-09-02 — CORRECTION — Corriger le flux Publication/Annulation (cas critiques).
- DEV-V2-09-03 — CORRECTION — Nettoyer les éléments legacy bloquants (routes, handlers, panneaux) si nécessaire.
- DEV-V2-09-04 — COMPLÉTION — Finaliser les flux Autoschedule/Matching réellement actifs au périmètre Alpha.
- DEV-V2-09-05 — COMPLÉTION — Finaliser les flux Export/Affectation réellement actifs au périmètre Alpha.
- DEV-V2-09-06 — CORRECTION — Uniformiser permissions/états UI sur les flux planning actifs.
- DEV-V2-09-07 — VALIDATION — Vérifier non-régression publication/annulation/export et flux planning actifs validés.
- CLOTURE_DEV-V2-09 — VALIDATION — clôture finale du bloc.

#### Livrables attendus
Planning Alpha V2 stabilisé sans dette critique ouverte.

#### Contrôles obligatoires
`lint`, `build`, preuve terminale de session, contrôle visuel manuel, contrôle API si route modifiée, contrôle permissions, contrôle non-régression, contrôle interactions modules dépendants, documentation de session.

#### Critère de validation du bloc
Parcours planning critiques exécutables de bout en bout.

#### Documentation à mettre à jour si nécessaire
Fiche planning si décision métier modifiée.

---

### BLOC DEV-V2-10 — Tableau de bord

#### Objectif du bloc
Réaligner le dashboard après stabilisation des données modules.

#### Pourquoi ce bloc existe
Écarts UI/UX et actions attendues manquantes.

#### Périmètre
Header/actions dashboard, widgets essentiels, cohérence des libellés et permissions d’affichage.

#### Exclusions
Personnalisation avancée Beta non validée.

#### Sessions prévues
- DEV-V2-10-01 — AUDIT ciblé — Vérifier écarts dashboard vs référence V2.
- DEV-V2-10-02 — CORRECTION — Aligner header/actions et structure de widgets.
- DEV-V2-10-03 — COMPLÉTION — Compléter éléments indispensables manquants validés.
- DEV-V2-10-04 — VALIDATION — Vérifier cohérence données avec modules stabilisés.
- CLOTURE_DEV-V2-10 — VALIDATION — clôture finale du bloc.

#### Livrables attendus
Dashboard cohérent, lisible et aligné V2.

#### Contrôles obligatoires
`lint`, `build`, contrôle visuel manuel, contrôle permissions d’accès à la page.

#### Critère de validation du bloc
Dashboard sans divergence majeure de nomenclature, données ou actions.

#### Documentation à mettre à jour si nécessaire
Référence UI/UX dashboard si arbitrage visuel validé.

---

### BLOC DEV-V2-11 — Login

#### Objectif du bloc
Finaliser `Se souvenir de moi`, session, accès et détails UI restants.

#### Pourquoi ce bloc existe
Module incomplet selon audit, mais dépend de la stratégie globale d’accès.

#### Périmètre
Formulaire login, persistance session attendue, redirections et messages d’accès.

#### Exclusions
Refonte UX complète de la page hors besoins Alpha.

#### Sessions prévues
- DEV-V2-11-01 — AUDIT ciblé — Confirmer comportement attendu `Se souvenir de moi`.
- DEV-V2-11-02 — CORRECTION — Aligner logique session avec la décision validée.
- DEV-V2-11-03 — CORRECTION — Harmoniser états d’erreur/accès en cohérence shell.
- DEV-V2-11-04 — VALIDATION — Vérifier parcours connexion/déconnexion/session.
- CLOTURE_DEV-V2-11 — VALIDATION — clôture finale du bloc.

#### Livrables attendus
Login fiable, cohérent avec la politique d’accès globale.

#### Contrôles obligatoires
`lint`, `build`, tests manuels session, contrôle UX des messages.

#### Critère de validation du bloc
Comportement `Se souvenir de moi` conforme à la décision humaine validée.

#### Documentation à mettre à jour si nécessaire
Fiche login si règle métier de session modifiée.

---

### BLOC DEV-V2-12 — Audit / traçabilité

#### Objectif du bloc
Étendre et normaliser l’audit après reprise des modules.

#### Pourquoi ce bloc existe
L’audit actuel est présent mais incomplet en normalisation de contexte.

#### Périmètre
Traçabilité actions sensibles, acteur/société/contexte, filtrage minimal utile.

#### Exclusions
Reporting analytique avancé Beta.

#### Sessions prévues
- DEV-V2-12-01 — AUDIT ciblé — Cartographier actions sensibles à tracer module par module.
- DEV-V2-12-02 — CORRECTION — Normaliser structure des événements d’audit.
- DEV-V2-12-03 — COMPLÉTION — Compléter traces manquantes critiques.
- DEV-V2-12-04 — VALIDATION — Vérifier lisibilité, filtrage et absence de données sensibles inutiles.
- CLOTURE_DEV-V2-12 — VALIDATION — clôture finale du bloc.

#### Livrables attendus
Traçabilité homogène des actions critiques Alpha V2.

#### Contrôles obligatoires
`lint`, `build`, contrôle audit sur actions sensibles, contrôle confidentialité minimale.

#### Critère de validation du bloc
Action sensible critique toujours traçable avec contexte exploitable.

#### Documentation à mettre à jour si nécessaire
Fiche audit, registre décisions si politique modifiée.

---

### BLOC DEV-V2-13 — Mise en route

#### Objectif du bloc
Réaligner l’ancien onboarding vers `Mise en route` après stabilisation des dépendances.

#### Pourquoi ce bloc existe
Non-conformité de nomenclature et de positionnement relevée.

#### Périmètre
Parcours mise en route, terminologie, dépendances Société/Dépôts/Utilisateurs/Véhicules/Modèles horaires.

#### Exclusions
Imports avancés non nécessaires Alpha.

#### Sessions prévues
- DEV-V2-13-01 — AUDIT ciblé — Confirmer périmètre exact `Mise en route` et dépendances.
- DEV-V2-13-02 — CORRECTION — Aligner nomenclature et positionnement module.
- DEV-V2-13-03 — COMPLÉTION — Compléter étapes manquantes strictement Alpha.
- DEV-V2-13-04 — VALIDATION — Vérifier parcours initial de bout en bout.
- CLOTURE_DEV-V2-13 — VALIDATION — clôture finale du bloc.

#### Livrables attendus
Module `Mise en route` cohérent et actionnable pour démarrage société.

#### Contrôles obligatoires
`lint`, `build`, contrôle visuel, contrôle dépendances données.

#### Critère de validation du bloc
Parcours mise en route exécutable sans blocage critique ni incohérence terminologique.

#### Documentation à mettre à jour si nécessaire
Référence UI/UX mise en route, fiche fonctionnelle dédiée si décision métier.

---

### BLOC DEV-V2-14 — Validation finale Alpha V2

#### Objectif du bloc
Contrôler l’ensemble avant clôture de la reprise Alpha V2.

#### Pourquoi ce bloc existe
Garantir qu’aucun bloc n’est validé isolément sans cohérence système globale.

#### Périmètre
Validation transversale finale UI/API/permissions/audit/doc minimale.

#### Exclusions
Évolutions Beta.

#### Sessions prévues
- DEV-V2-14-01 — AUDIT ciblé — Relecture finale des écarts ouverts et dépendances.
- DEV-V2-14-02 — VALIDATION — Campagne de contrôles terminaux multi-modules.
- DEV-V2-14-03 — CLOTURE — Décision de clôture Phase 6 Alpha V2 ou liste courte de restes à traiter.
- CLOTURE_DEV-V2-14 — VALIDATION — clôture finale du bloc.

#### Livrables attendus
Bilan final de reprise Alpha V2 et état prêt pour phase suivante.

#### Contrôles obligatoires
Tous contrôles de section 8 + preuve terminale consolidée.

#### Critère de validation du bloc
Aucun écart critique ouvert bloquant l’exploitation Alpha V2.

#### Documentation à mettre à jour si nécessaire
`ETAT_GLOBAL_PROJET_V2.md`, `PLAN_DE_DEVELOPPEMENT_V2.md`, `_INDEX_MASTER.md` si statut changé.

## 8. Règles de validation

- preuve terminale obligatoire à chaque session de correction/complétion ;
- `npm run lint` obligatoire ;
- `npm run build` obligatoire ;
- `npx prisma validate` si Prisma/schema/migrations touchés ;
- `npx prisma generate` si Prisma/schema/migrations touchés ;
- contrôle visuel manuel si UI modifiée ;
- contrôle permissions si RBAC/guards/API touchés ;
- contrôle API si route modifiée ;
- contrôle audit si action sensible modifiée ;
- aucun passage au bloc suivant sans validation explicite.

## 9. Règles de commit

- un bloc validé = un commit possible ;
- un commit reste cohérent et traçable ;
- pas de commit mélangeant code sans lien et mise à jour documentaire massive ;
- message de commit explicite (bloc + objectif + nature) ;
- pas de commit si `lint/build` non contrôlés, sauf échec documenté et validé ;
- pas de commit de fichiers temporaires ;
- pas de commit de patchs générés inutilement.

## 10. Contrôles obligatoires par type de changement

### Documentation seule
Contrôles :
- cohérence Markdown ;
- UTF-8 sans BOM ;
- absence de mojibake ;
- liens/chemins vérifiés ;
- pas de modification code.

### UI seule
Contrôles :
- `npm run lint` ;
- `npm run build` ;
- contrôle visuel manuel ;
- conformité maquette/référence UI/UX ;
- responsive si concerné.

### API/backend
Contrôles :
- `npm run lint` ;
- `npm run build` ;
- vérification format API `{ ok:true, data }` / `{ ok:false, error, details? }` si applicable ;
- contrôle permissions ;
- contrôle multi-tenant `companyId`.

### Prisma/schema
Contrôles :
- `npx prisma validate` ;
- `npx prisma generate` ;
- `npm run lint` ;
- `npm run build` ;
- impact migrations documenté.

### Permissions/RBAC
Contrôles :
- cohérence front/API ;
- tests manuels par rôle si possible ;
- vérification non-contournement UI/API ;
- audit des actions sensibles.

### Planning
Contrôles :
- `npm run lint` ;
- `npm run build` ;
- non-régression publication/annulation/export ;
- contrôle permissions ;
- contrôle interactions utilisateurs/véhicules/modèles/dépôts.

### Audit/traçabilité
Contrôles :
- action sensible tracée ;
- acteur identifiable ;
- société identifiable ;
- contexte suffisant ;
- pas de donnée sensible inutile.

## 11. Gouvernance documentaire

- Fiche fonctionnelle : mise à jour seulement si décision métier change.
- Référence UI/UX : mise à jour seulement si maquette validée/modifiée.
- Registre des décisions : mise à jour pour toute décision structurante validée.
- État global projet : mise à jour à chaque fin de phase importante.
- Plan de développement : mise à jour si bloc, ordre ou jalon évolue.
- Documentation de session : mise à jour en fin de session Codex importante.
- `DOCUMENT_MAITRE_V2.md` : mise à jour uniquement si un principe structurant du projet change.

Règle stricte : aucune mise à jour documentaire massive pendant une session de code, sauf nécessité clairement identifiée.

## 12. Documents MASTER à mettre à jour

| Document | Pourquoi il pourrait être mis à jour | Quand le faire | Ce qu’il ne faut pas modifier |
|---|---|---|---|
| `PLAN_DE_DEVELOPPEMENT_V2.md` | ajustement blocs/sessions/ordre | après validation humaine d’un changement de pilotage | ne pas transformer en audit détaillé |
| `DOCUMENT_MAITRE_V2.md` | évolution d’un principe structurant du projet (méthode, gouvernance, périmètre directeur) | uniquement après validation humaine explicite de ce changement structurant | ne pas l’utiliser pour des corrections UI, navigation, libellés ou maquettes |
| `ETAT_GLOBAL_PROJET_V2.md` | statut d’avancement consolidé | fin de bloc majeur ou fin de phase | ne pas détailler chaque patch technique |
| `REGISTRE_DECISIONS_V2.md` | arbitrages structurants validés | immédiatement après validation humaine | ne pas y mettre des hypothèses non validées |
| `_INDEX_MASTER.md` | mise à jour navigation documentaire active | quand arborescence/rôle des docs change | ne pas reclassifier l’historique sans validation |
| `2-REFERENCE_UI_UX/*` | changement de maquette/référence validé | après validation visuelle officielle | ne pas corriger en masse pendant session code |
| `3-FONCTIONNALITES/*` | évolution de règle métier validée | après décision métier explicite | ne pas réécrire toutes les fiches |

## 13. Éléments hors périmètre immédiat / Beta

Hors Phase 6 immédiate, sauf validation contraire :

- planification automatique avancée ;
- affectation automatique optimisée avancée ;
- scoring avancé ;
- notifications avancées ;
- version mobile complète ;
- signature électronique ;
- preuve mobile ;
- reporting avancé ;
- maintenance avancée ;
- facturation / abonnement ;
- multi-agence avancé ;
- imports avancés non nécessaires à l’Alpha ;
- toute évolution non nécessaire à la stabilisation Alpha V2.

Ces éléments restent tracés comme backlog Beta et ne deviennent pas des blocs actifs DEV-V2 de reprise Alpha.

## 14. Règles de session Codex en Phase 6

- une session = un objectif clair ;
- lire uniquement les fichiers nécessaires ;
- produire un patch minimal ;
- ne pas faire de refonte non demandée ;
- ne pas modifier les documents non concernés ;
- fournir les preuves terminales ;
- documenter les échecs si un contrôle ne passe pas ;
- mettre à jour la documentation de session en fin de session importante ;
- ne jamais mélanger grosse correction code et refonte documentaire.

## 15. Points de vigilance à confirmer pendant la Phase 6

Ces points sont traités dans les blocs DEV-V2 concernés, en priorité pendant les audits ciblés et validations de bloc.  
Ils ne bloquent pas l'ouverture de la Phase 6 si le présent plan est validé.

- comportement exact de `Se souvenir de moi` ;
- stratégie `Accès refusé` ;
- portée exacte du module `Suivi des véhicules` ;
- politique de restauration/désarchivage ;
- matrice permissions officielle ;
- place exacte de `Mise en route` et des imports ;
- règles audit/support.

## 16. Conclusion

Ce plan cadre la reprise du code en Phase 6 par blocs maîtrisés, sans valider automatiquement les pages ni relancer une refonte globale.  
La validation reste séquentielle, explicite et pilotée par preuves de contrôle.

## 17. Statut documentaire et contrôle final du document

- statut : document actif de pilotage de la reprise Phase 6 ;
- ordre des blocs DEV-V2 : conservé sans modification ;
- périmètre fonctionnel : conservé sans extension ;
- validations de pages : aucune validation automatique ;
- stratégie : inchangée, reprise par blocs cohérents et structurés, avec sessions courtes, traçables et validables ;
- points de vigilance : suivis dans les blocs DEV-V2 concernés.


### BLOC T1 - Shell global, navigation et contexte connecté

#### *Identifiant**
T1

#### *Type de bloc**
Transverse

#### *Dossier cible**
`docs/2-SESSIONS/1-ALPHA/BLOC_T1_SHELL_NAVIGATION`

#### *Objectif**
Stabiliser sidebar, topbar, société courante, utilisateur courant, filtrage visible par droits et accès refusé.

#### *Dépendances**
- T2 si une convention de nommage bloque.
- T4 pour les permissions fines.

#### *Hors périmètre**
- Reprise profonde des pages métier.
- RBAC complet.
- Design system complet.

#### *SESSIONS PREVUE**
- DX audit + cadrage : cartographier shell/navigation, écarts, risques et questions bloquantes.
- CX prévisionnelles : `INFORMATION NON FOURNIE — À CONFIRMER APRÈS AUDIT CIBLÉ`.
- Clôture : DX si synthèse documentaire seule ; CX uniquement si un contrôle technique ou script est réellement modifié.

#### *Contrôles obligatoires**
Git, preuves de lecture, absence de patch applicatif en DX, contrôle navigateur/lint/build uniquement pour une CX qui modifie le code.

#### *Critère de sortie**
Le shell permet d'accéder aux modules autorisés et de refuser proprement les accès interdits, ou les écarts restants sont reportés explicitement.

#### *Documentation à mettre à jour**
`05`, références UI/UX, matrice RBAC si impact.

#### *Statut**
À faire.