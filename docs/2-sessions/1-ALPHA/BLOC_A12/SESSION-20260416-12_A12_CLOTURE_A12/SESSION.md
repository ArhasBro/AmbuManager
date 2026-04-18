# SESSION

## ID SESSION

`SESSION-20260416-12_A12_CLOTURE_A12`

## Date

16/04/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : `1-ALPHA`  
Bloc : `A12 — Exports / onboarding / imports`  
Type : `VALIDATION+CORRECTION+COMPLÉTION`  
Intitulé : clôture finale du bloc A12

## Objectif de la session

Rendre le verdict final de clôture du bloc A12 en revérifiant, sur le code réel et la documentation réelle :
- l’état initial documenté par `A12-01` ;
- le lot de complétion `A12-LOT-02-15` avec son patch principal et ses correctifs `FIX-01` / `FIX-02` ;
- la validation `A12-16` ;
- la cohérence finale entre cadrage produit, code réel, patchs réels, documentation réelle et validations terminales réellement prouvées ;
- le statut réel du point `15.4 Politique de conservation des exports générés`.

## Périmètre exact traité

### Documentation / gouvernance
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

### Sessions / patchs A12 contrôlés
- `docs/2-sessions/1-ALPHA/BLOC_A12/SESSION-20260416-09_A12_A12-01/*`
- `docs/2-sessions/1-ALPHA/BLOC_A12/SESSION-20260416-10_A12_A12-LOT-02-15/*`
- `docs/2-sessions/1-ALPHA/BLOC_A12/SESSION-20260416-11_A12_A12-16/*`
- `docs/2-sessions/1-ALPHA/BLOC_A12/SESSION-20260416-12_A12_CLOTURE_A12/*`
- `docs/3-patches/1-ALPHA/BLOC_A12/SESSION-20260416-09_A12_A12-01/*`
- `docs/3-patches/1-ALPHA/BLOC_A12/SESSION-20260416-10_A12_A12-LOT-02-15/*`
- `docs/3-patches/1-ALPHA/BLOC_A12/SESSION-20260416-11_A12_A12-16/*`
- `docs/3-patches/1-ALPHA/BLOC_A12/SESSION-20260416-12_A12_CLOTURE_A12/*`

### Code réel revérifié
- gouvernance / permissions / accès ;
- onboarding manuel société pilote ;
- imports initiaux simples ALPHA ;
- exports planning + impression ;
- statut réel de la conservation des exports.

## Résultat synthétique de session

Aucun résiduel code A12 strictement prouvé n’a été trouvé sur le périmètre de clôture contrôlé.

Le code réel confirme :
- un onboarding manuel guidé et exploitable via `/onboarding` ;
- un import initial simple `CSV` / `XLSX` sur `depots`, `users`, `vehicles`, `templates`, `user-absences`, avec aperçu, validation manuelle, rapport d’erreurs et logique `add-only` ;
- des exports planning `PDF` / `XLSX` / `CSV` réellement branchés ;
- une impression simple réellement branchée depuis l’UI ;
- une permission `PLANNING_EXPORT` réellement consommée côté UI et côté API.

Le point `15.4 Politique de conservation des exports générés` n’est pas traité comme une fonctionnalité persistante dédiée, mais il n’est pas bloquant pour la clôture ALPHA :
- aucun stockage d’export généré n’existe dans le code ;
- la route d’export livre un fichier à la demande ;
- la réponse force `Cache-Control: no-store`.

Décision retenue : `NO_PATCH`

## Dossiers liés

- Session : `docs/2-sessions/1-ALPHA/BLOC_A12/SESSION-20260416-12_A12_CLOTURE_A12`
- Patchs : `docs/3-patches/1-ALPHA/BLOC_A12/SESSION-20260416-12_A12_CLOTURE_A12`
