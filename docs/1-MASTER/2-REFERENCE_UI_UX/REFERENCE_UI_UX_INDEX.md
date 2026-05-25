# Ambulance Manager — Index officiel des références UI/UX

Version : V2
Statut : index actif du dossier
Dossier concerné : docs/1-MASTER/2-REFERENCE_UI_UX/

## Sommaire
- [Objectif du fichier](#objectif-du-fichier)
- [Liste des fichiers actifs](#liste-des-fichiers-actifs)
- [Rôle de chaque fichier](#role-de-chaque-fichier)
- [Sources visuelles utilisées](#sources-visuelles-utilisees)
- [Sources fonctionnelles utilisées](#sources-fonctionnelles-utilisees)
- [Version de maquette retenue](#version-de-maquette-retenue)
- [Ordre recommandé de lecture](#ordre-recommande-de-lecture)
- [Pages simples](#pages-simples)
- [Pages complexes](#pages-complexes)
- [Pages avec vues ou onglets](#pages-avec-vues-ou-onglets)
- [Fichiers à utiliser prioritairement avant codage](#fichiers-a-utiliser-prioritairement-avant-codage)
- [Rappel sur les anciennes références UI/UX](#rappel-sur-les-anciennes-references-uiux)
- [Rappel des sources actives](#rappel-des-sources-actives)

## Objectif du fichier
Fournir la liste officielle des références UI/UX actives à utiliser avant toute session de codage frontend.

## Liste des fichiers actifs
- `REFERENCE_UI_UX_GLOBALE.md`
- `0-REFERENCE_UI_UX_SHELL_GLOBAL.md`
- `1-REFERENCE_UI_UX_LOGIN.md`
- `2-REFERENCE_UI_UX_DASHBOARD.md`
- `8-REFERENCE_UI_UX_SOCIETE.md`
- `7-REFERENCE_UI_UX_DEPOTS_BASES.md`
- `3-REFERENCE_UI_UX_MODELES_HORAIRES.md`
- `5-REFERENCE_UI_UX_UTILISATEURS_RH.md`
- `6-REFERENCE_UI_UX_VEHICULES.md`
- `6.1-REFERENCE_UI_UX_SUIVI_DES_VEHICULES.md`
- `4-REFERENCE_UI_UX_PLANNING.md`
- `10-REFERENCE_UI_UX_AUDIT.md`
- `9-REFERENCE_UI_UX_MISE_EN_ROUTE.md`
- `REFERENCE_UI_UX_INDEX.md`
- `REFERENCE_UI_UX_CHECKLIST_CODEX.md`

## Rôle de chaque fichier
- `REFERENCE_UI_UX_GLOBALE.md` : direction UI/UX transversale, tokens cibles, règles anti-dérive.
- `0-REFERENCE_UI_UX_SHELL_GLOBAL.md` : structure shell, navigation, header, permissions visibles.
- `1-REFERENCE_UI_UX_LOGIN.md` : page d’authentification V2.
- `2-REFERENCE_UI_UX_DASHBOARD.md` : portail widgets/KPI/raccourcis.
- `8-REFERENCE_UI_UX_SOCIETE.md` : profil société permanent.
- `7-REFERENCE_UI_UX_DEPOTS_BASES.md` : référentiel lieux d’exploitation.
- `3-REFERENCE_UI_UX_MODELES_HORAIRES.md` : référentiel modèles planning.
- `5-REFERENCE_UI_UX_UTILISATEURS_RH.md` : gestion comptes/rôles/statuts.
- `6-REFERENCE_UI_UX_VEHICULES.md` : référentiel administratif flotte.
- `6.1-REFERENCE_UI_UX_SUIVI_DES_VEHICULES.md` : suivi opérationnel (4 onglets).
- `4-REFERENCE_UI_UX_PLANNING.md` : planning (5 vues) + publication/couverture.
- `10-REFERENCE_UI_UX_AUDIT.md` : journal transversal de traçabilité.
- `9-REFERENCE_UI_UX_MISE_EN_ROUTE.md` : checklist de configuration initiale.
- `REFERENCE_UI_UX_INDEX.md` : présent index officiel.
- `REFERENCE_UI_UX_CHECKLIST_CODEX.md` : checklist opérationnelle de codage.

## Sources visuelles utilisées
- `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/0-Shell-Global/Shell-Global_V2.png`
- `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/1-Login/Login_V2.png`
- `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/2-Dashboard/Dashboard_V2.png`
- `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/3-Modèles-Horaire/Modèles-Horaire_V2.png`
- `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/4-Planning/Planning_Vue-Global_V2.2.png`
- `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/4-Planning/Planning_Vue-Personnelle_V2.1.png`
- `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/4-Planning/Planning_Vue-Mois_V2.1.png`
- `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/4-Planning/Planning_Vue-Semaine_V2.2.png`
- `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/4-Planning/Planning_Vue-Jour_V2.png`
- `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/5-Utilisateurs-RH/Utilisateurs_V2.png`
- `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/6-Véhicules/Véhicules_V2.png`
- `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/6.1-Suivi-des-véhicules/Suivi-des-véhicules_Vue-ensemble_V2.png`
- `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/6.1-Suivi-des-véhicules/Suivi-des-véhicules_Vérification_V2.png`
- `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/6.1-Suivi-des-véhicules/Suivi-des-véhicules_Désinfection_V2.png`
- `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/6.1-Suivi-des-véhicules/Suivi-des-véhicules_Anomalies_V2.png`
- `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/7-Dépôts-bases/Dépôts -Bases_V2.png`
- `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/8-Société/Société_V2.png`
- `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/9-Mise en route/Mise-En-Route_V2.png`
- `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/10-Audit/Audit_V2.png`

## Sources fonctionnelles utilisées
- `docs/1-MASTER/3-FONCTIONNALITES/0-FONCTIONNALITES_DETAILLEES_SHELL_GLOBAL_NAVIGATION_V1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/1-FONCTIONNALITES_DETAILLEES_LOGIN_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/2-FONCTIONNALITES_DETAILLEES_TABLEAU_DE_BORD_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/3-FONCTIONNALITES_DETAILLEES_MODELES_HORAIRES_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/4-FONCTIONNALITES_DETAILLEES_PLANNING_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/5-FONCTIONNALITES_DETAILLEES_UTILISATEURS_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/6-FONCTIONNALITES_DETAILLEES_VEHICULES_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/6.1-FONCTIONNALITES_DETAILLEES_SUIVI_DES_VEHICULES_V1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/7-FONCTIONNALITES_DETAILLEES_DEPOTS_BASES_V1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/8-FONCTIONNALITES_DETAILLEES_SOCIETE_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/9-FONCTIONNALITES_DETAILLEES_MISE_EN_ROUTE_V1.1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/10-FONCTIONNALITES_DETAILLEES_AUDIT_V1.md`
- `docs/1-MASTER/3-FONCTIONNALITES/LISTE_FONCTIONNALITES_V1.1.md` (complément de cohérence globale)

## Version de maquette retenue
- Shell/Login/Dashboard/Société/Dépôts-Bases/Modèles horaires/Utilisateurs/Véhicules/Audit/Mise en route : V2.
- Planning : V2.2 (globale annuelle + semaine), V2.1 (personnelle + mois), V2 (jour).
- Suivi des véhicules : V2 (4 onglets).

## Ordre recommandé de lecture
1. `REFERENCE_UI_UX_GLOBALE.md`
2. `0-REFERENCE_UI_UX_SHELL_GLOBAL.md`
3. `1-REFERENCE_UI_UX_LOGIN.md`
4. `2-REFERENCE_UI_UX_DASHBOARD.md`
5. `8-REFERENCE_UI_UX_SOCIETE.md`
6. `7-REFERENCE_UI_UX_DEPOTS_BASES.md`
7. `3-REFERENCE_UI_UX_MODELES_HORAIRES.md`
8. `5-REFERENCE_UI_UX_UTILISATEURS_RH.md`
9. `6-REFERENCE_UI_UX_VEHICULES.md`
10. `6.1-REFERENCE_UI_UX_SUIVI_DES_VEHICULES.md`
11. `4-REFERENCE_UI_UX_PLANNING.md`
12. `10-REFERENCE_UI_UX_AUDIT.md`
13. `9-REFERENCE_UI_UX_MISE_EN_ROUTE.md`
14. `REFERENCE_UI_UX_CHECKLIST_CODEX.md`

## Pages simples
- Login
- Shell global
- Audit

## Pages complexes
- Planning
- Suivi des véhicules
- Utilisateurs / RH
- Véhicules
- Société

## Pages avec vues ou onglets
- Planning (5 vues)
- Suivi des véhicules (4 onglets)

## Fichiers à utiliser prioritairement avant codage
1. `REFERENCE_UI_UX_GLOBALE.md`
2. `0-REFERENCE_UI_UX_SHELL_GLOBAL.md`
3. La référence de la page concernée
4. `REFERENCE_UI_UX_CHECKLIST_CODEX.md`

## Rappel sur les anciennes références UI/UX
Les anciens fichiers UI/UX précédemment présents dans ce dossier ne sont plus des références actives.

## Rappel des sources actives
Les seules sources actives sont :
1. Maquettes de version la plus élevée.
2. Fiches fonctionnalités détaillées correspondantes.
