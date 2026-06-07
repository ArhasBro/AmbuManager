# Ambulance Manager — Index officiel des références UI/UX

Version : V2  
Statut : index officiel actif des références UI/UX  
Objectif : registre fiable des sources à utiliser avant toute session de codage UI

## Sommaire
- [1. Objectif de l’index](#1-objectif-de-lindex)
- [2. Liste exacte des 15 fichiers actifs](#2-liste-exacte-des-15-fichiers-actifs)
- [3. Registre officiel fichier par fichier](#3-registre-officiel-fichier-par-fichier)
- [4. Ordre conseillé de lecture](#4-ordre-conseillé-de-lecture)
- [5. Pages simples](#5-pages-simples)
- [6. Pages complexes](#6-pages-complexes)
- [7. Pages avec vues multiples](#7-pages-avec-vues-multiples)
- [8. Pages avec onglets](#8-pages-avec-onglets)
- [9. Fichiers transversaux](#9-fichiers-transversaux)
- [10. Rappels de gouvernance documentaire](#10-rappels-de-gouvernance-documentaire)

## 1. Objectif de l’index
Cet index est la référence de navigation officielle du dossier UI/UX. Il centralise les fichiers actifs, leurs rôles et leurs sources d’autorité visuelle/fonctionnelle. Il ne vaut pas validation fonctionnelle définitive.

## 2. Liste exacte des 15 fichiers actifs
- `REFERENCE_UI_UX_GLOBALE.md`
- `0-REFERENCE_UI_UX_SHELL_GLOBAL.md`
- `1-REFERENCE_UI_UX_LOGIN.md`
- `2-REFERENCE_UI_UX_DASHBOARD.md`
- `3-REFERENCE_UI_UX_MODELES_HORAIRES.md`
- `4-REFERENCE_UI_UX_PLANNING.md`
- `5-REFERENCE_UI_UX_UTILISATEURS_RH.md`
- `6-REFERENCE_UI_UX_VEHICULES.md`
- `6.1-REFERENCE_UI_UX_SUIVI_DES_VEHICULES.md`
- `7-REFERENCE_UI_UX_DEPOTS_BASES.md`
- `8-REFERENCE_UI_UX_SOCIETE.md`
- `9-REFERENCE_UI_UX_MISE_EN_ROUTE.md`
- `10-REFERENCE_UI_UX_AUDIT.md`
- `REFERENCE_UI_UX_INDEX.md`
- `REFERENCE_UI_UX_CHECKLIST_CODEX.md`

## 3. Registre officiel fichier par fichier
| Fichier actif | Rôle | Source visuelle | Source fonctionnelle |
|---|---|---|---|
| `REFERENCE_UI_UX_GLOBALE.md` | Référence design system et DA codable transverse | Ensemble des maquettes V2 de `docs/1-MASTER/1-MAQUETTE/` | Ensemble des fiches détaillées de `docs/1-MASTER/3-FONCTIONNALITES/` |
| `0-REFERENCE_UI_UX_SHELL_GLOBAL.md` | Référence Shell, navigation et structure connectée | `docs/1-MASTER/1-MAQUETTE/0-Shell-Global/Shell-Global_V2.png` | `docs/1-MASTER/3-FONCTIONNALITES/0-FONCTIONNALITES_DETAILLEES_SHELL_GLOBAL_NAVIGATION_V1.md` |
| `1-REFERENCE_UI_UX_LOGIN.md` | Référence page Login | `docs/1-MASTER/1-MAQUETTE/1-Login/Login_V2.png` | `docs/1-MASTER/3-FONCTIONNALITES/1-FONCTIONNALITES_DETAILLEES_LOGIN_V1.1.md` |
| `2-REFERENCE_UI_UX_DASHBOARD.md` | Référence page Tableau de bord | `docs/1-MASTER/1-MAQUETTE/2-Dashboard/Dashboard_V2.png` | `docs/1-MASTER/3-FONCTIONNALITES/2-FONCTIONNALITES_DETAILLEES_TABLEAU_DE_BORD_V1.1.md` |
| `3-REFERENCE_UI_UX_MODELES_HORAIRES.md` | Référence page Modèles horaires | `docs/1-MASTER/1-MAQUETTE/3-Modèles-Horaire/Modèles-Horaire_V2.png` | `docs/1-MASTER/3-FONCTIONNALITES/3-FONCTIONNALITES_DETAILLEES_MODELES_HORAIRES_V1.1.md` |
| `4-REFERENCE_UI_UX_PLANNING.md` | Référence page Planning (vues multiples) | `docs/1-MASTER/1-MAQUETTE/4-Planning/Planning_Vue-Global_V2.2.png` ; `docs/1-MASTER/1-MAQUETTE/4-Planning/Planning_Vue-Personnelle_V2.1.png` ; `docs/1-MASTER/1-MAQUETTE/4-Planning/Planning_Vue-Mois_V2.1.png` ; `docs/1-MASTER/1-MAQUETTE/4-Planning/Planning_Vue-Semaine_V2.2.png` ; `docs/1-MASTER/1-MAQUETTE/4-Planning/Planning_Vue-Jour_V2.png` | `docs/1-MASTER/3-FONCTIONNALITES/4-FONCTIONNALITES_DETAILLEES_PLANNING_V1.1.md` |
| `5-REFERENCE_UI_UX_UTILISATEURS_RH.md` | Référence page Utilisateurs / RH | `docs/1-MASTER/1-MAQUETTE/5-Utilisateurs-RH/Utilisateurs_V2.png` | `docs/1-MASTER/3-FONCTIONNALITES/5-FONCTIONNALITES_DETAILLEES_UTILISATEURS_V1.1.md` |
| `6-REFERENCE_UI_UX_VEHICULES.md` | Référence page Véhicules | `docs/1-MASTER/1-MAQUETTE/6-Véhicules/Véhicules_V2.png` | `docs/1-MASTER/3-FONCTIONNALITES/6-FONCTIONNALITES_DETAILLEES_VEHICULES_V1.1.md` |
| `6.1-REFERENCE_UI_UX_SUIVI_DES_VEHICULES.md` | Référence page Suivi des véhicules (onglets) | `docs/1-MASTER/1-MAQUETTE/6.1-Suivi-des-véhicules/Suivi-des-véhicules_Vue-ensemble_V2.png` ; `docs/1-MASTER/1-MAQUETTE/6.1-Suivi-des-véhicules/Suivi-des-véhicules_Vérification_V2.png` ; `docs/1-MASTER/1-MAQUETTE/6.1-Suivi-des-véhicules/Suivi-des-véhicules_Désinfection_V2.png` ; `docs/1-MASTER/1-MAQUETTE/6.1-Suivi-des-véhicules/Suivi-des-véhicules_Anomalies_V2.png` | `docs/1-MASTER/3-FONCTIONNALITES/6.1-FONCTIONNALITES_DETAILLEES_SUIVI_DES_VEHICULES_V1.md` |
| `7-REFERENCE_UI_UX_DEPOTS_BASES.md` | Référence page Dépôts / Bases | `docs/1-MASTER/1-MAQUETTE/7-Dépôts-bases/Dépôts -Bases_V2.png` | `docs/1-MASTER/3-FONCTIONNALITES/7-FONCTIONNALITES_DETAILLEES_DEPOTS_BASES_V1.md` |
| `8-REFERENCE_UI_UX_SOCIETE.md` | Référence page Société | `docs/1-MASTER/1-MAQUETTE/8-Société/Société_V2.png` | `docs/1-MASTER/3-FONCTIONNALITES/8-FONCTIONNALITES_DETAILLEES_SOCIETE_V1.1.md` |
| `9-REFERENCE_UI_UX_MISE_EN_ROUTE.md` | Référence page Mise en route | `docs/1-MASTER/1-MAQUETTE/9-Mise en route/Mise-En-Route_V2.png` | `docs/1-MASTER/3-FONCTIONNALITES/9-FONCTIONNALITES_DETAILLEES_MISE_EN_ROUTE_V1.1.md` |
| `10-REFERENCE_UI_UX_AUDIT.md` | Référence page Audit | `docs/1-MASTER/1-MAQUETTE/10-Audit/Audit_V2.png` | `docs/1-MASTER/3-FONCTIONNALITES/10-FONCTIONNALITES_DETAILLEES_AUDIT_V1.md` |
| `REFERENCE_UI_UX_INDEX.md` | Index officiel du pack UI/UX | Ensemble des maquettes V2 du dossier maquettes | Ensemble des fiches détaillées + références UI/UX page |
| `REFERENCE_UI_UX_CHECKLIST_CODEX.md` | Checklist opérationnelle Codex pour intégration UI | Ensemble des maquettes V2 du dossier maquettes | Ensemble des fiches détaillées + références UI/UX page |

## 4. Ordre conseillé de lecture
1. `REFERENCE_UI_UX_GLOBALE.md`
2. `0-REFERENCE_UI_UX_SHELL_GLOBAL.md`
3. La référence de la page ciblée
4. `REFERENCE_UI_UX_CHECKLIST_CODEX.md`
5. `REFERENCE_UI_UX_INDEX.md` (contrôle final du cadre documentaire)

## 5. Pages simples
- Login
- Shell global
- Audit

## 6. Pages complexes
- Tableau de bord
- Planning
- Utilisateurs / RH
- Véhicules
- Suivi des véhicules
- Société
- Dépôts / Bases
- Mise en route

## 7. Pages avec vues multiples
- Planning : Vue globale, Vue personnelle, Vue mois, Vue semaine, Vue jour.

## 8. Pages avec onglets
- Suivi des véhicules : Vue d’ensemble, Vérifications, Désinfections, Anomalies des véhicules.

## 9. Fichiers transversaux
- `REFERENCE_UI_UX_GLOBALE.md`
- `REFERENCE_UI_UX_INDEX.md`
- `REFERENCE_UI_UX_CHECKLIST_CODEX.md`

## 10. Rappels de gouvernance documentaire
- Les anciens fichiers UI/UX retirés ou remplacés ne sont plus des références actives.
- `Privacy` n’est pas une entrée métier principale et ne bloque pas la production des maquettes métier immédiates.
- Les libellés actifs validés sont `Modèles horaires` et `Mise en route`.
- Les anciens libellés `Templates` et `Onboarding` ne sont pas actifs.
- Les références UI/UX codables orientent la reproduction visuelle et ergonomique ; elles ne valent pas validation fonctionnelle définitive.
