# SESSION

## ID SESSION

SESSION-20260415-05_A9_AUTO-01

## Date

15/04/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A9 — Autoschedule  
Type : AUDIT  
Intitulé : Audit complet de l’autoschedule existant

## Objectif de la session

Auditer complètement l’autoschedule existant sur le code réel et la documentation officielle disponible, sans correction de code, afin de statuer sur l’état réellement prouvé du bloc A9 pour alimenter la session `AUTO-LOT-02-14`.

## Périmètre exact traité

- routes API autoschedule DAY / WEEK ;
- liste et détail des runs autoschedule ;
- publication et annulation des runs ;
- endpoints `match`, `match/preview`, `match/apply` ;
- surface `/planning` et client associé ;
- services `matching`, `matching-quality`, `user-absence`, `planning-audit` ;
- règles société runtime / catalogue ;
- types planning ;
- schéma Prisma autoschedule / draft / shift / audit ;
- documentation maîtresse A9 et dossier de session courant.

## Résultat synthétique de session

L’autoschedule existant est **PARTIELLEMENT conforme** au cadrage ALPHA : la génération `JOUR` et `SEMAINE` existe réellement, le lancement est disponible depuis `/planning`, les templates actifs sont bien pris en compte, l’auto-affectation utilisateurs existe via `match/preview` et `match/apply`, et la publication contrôle réellement les absences utilisateur, les chevauchements et le repos minimum. En revanche, le choix produit « shifts seuls ou génération avec affectation automatique employés + véhicules » n’est que partiellement livré, l’auto-affectation véhicule n’a pas été prouvée, l’indisponibilité véhicule reste seulement partiellement couverte, les contraintes de rôles sur véhicules ne sont pas démontrées, et la traduction / lisibilité des signalements restent mixtes.

## Dossiers liés

- Session : `docs/2-sessions/1-ALPHA/BLOC_A9/SESSION-20260415-05_A9_AUTO-01`
- Patchs  : `docs/3-patches/1-ALPHA/BLOC_A9/SESSION-20260415-05_A9_AUTO-01`
