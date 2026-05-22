# Matrice canonique UI/UX — Ambulance Manager

## Rôle

Ce document relie la chaîne canonique suivante :

`Page / zone -> PNG officiel -> dossier réel -> référence UI/UX -> route app -> fichier app`

Objectif : réduire les ambiguïtés entre maquettes, références UI/UX et implémentation App Router.

## Règles

- Ce fichier est une matrice de correspondance.
- Il ne remplace pas les références UI/UX détaillées.
- Il ne remplace pas les maquettes PNG.
- Il ne modifie pas le plan officiel.
- Il ne déplace aucun fichier.
- Les anciens chemins `MAQUETTE_DA` sont traités comme héritage historique à confirmer, pas comme chemins actifs de référence.
- En cas de doute : `INFORMATION NON FOURNIE — À CONFIRMER`.

## Nomenclature fonctionnelle

- Ancien nom historique : `Templates` ; nom fonctionnel actuel : `Modèles horaires`.
- Ancien nom historique : `Onboarding` ; nom fonctionnel actuel : `Mise en route`.
- Les routes techniques restent `/templates` et `/onboarding`.

## Règle de priorité

1. Code réel du dépôt pour l'état technique présent.
2. `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md` pour le périmètre produit validé.
3. `docs/1-MASTER/DOCUMENT_MAITRE.md` pour les principes globaux.
4. `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md` pour l'ordre officiel.
5. Références UI/UX (`docs/1-MASTER/2-REFERENCE_UI_UX/`) pour le codable visuel.
6. PNG officiels (`docs/1-MASTER/1-MAQUETTE/...`) pour la vérité visuelle.
7. Sessions historiques comme preuve, sans autorité supérieure.

## Matrice principale

| Page / zone | Statut | PNG officiel | Dossier réel PNG | Référence UI/UX | Route app | Fichier app principal | Fichier client / composant associé | CSS associé | Niveau de confiance | Problèmes / remarques |
|---|---|---|---|---|---|---|---|---|---|---|
| Login | CANONIQUE | `Login_V1.1.png` | `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/1-Login` | `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_LOGIN.md` | `/login` | `app/login/page.tsx` | INFORMATION NON FOURNIE — À CONFIRMER | `app/globals.css` | Élevé | Lien complet présent (PNG + ref + route). |
| Shell global connecté | PARTIEL | `Dashboard_V1.png`, `Planning_V1.2.png`, `Utilisateurs-RH_V1.png`, `Véhicules_V1.2.png`, `Modèles_horaires_V1.1.png`, `Société_V1.0.png`, `Dépôts-bases_V1.0.png`, `Onboarding_V1.2.png`, `Audit_V1.0.png`, `Privacy_V1.0.png` | `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/` | `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_SHELL_GLOBAL.md` | toutes hors `/login` | `app/app-shell.tsx`, `app/layout.tsx` | `app/ui/*` | `app/globals.css`, `app/a24-vehicles-templates.css`, `app/a24-complementary-pages.css`, `app/a24-users-rh.css` | Élevé | Pas de PNG dédié unique du shell, construit transversalement. |
| Dashboard | CANONIQUE | `Dashboard_V1.png` | `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/2-Dashboard` | `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_DASHBOARD.md` | `/dashboard` | `app/dashboard/page.tsx` | `app/ui/page-header.tsx`, `app/ui/stat-card.tsx`, `app/ui/status-badge.tsx`, `app/ui/action-button.tsx` | `app/globals.css` | Élevé | Référence très détaillée. |
| Planning | CANONIQUE | `Planning_V1.2.png` + `Planning_V1.2_INFO_DETAIL.png` | `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/4-Planning` | `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_A25_PLANNING.md` | `/planning` | `app/planning/page.tsx` | `app/planning/planning-client.tsx`, `app/planning/manual-planning-panel.tsx` | `app/globals.css` | Élevé | PNG détail présent et référencé. |
| Utilisateurs / RH | CANONIQUE | `Utilisateurs-RH_V1.png` | `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/5-Utilisateurs-RH` | `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_USERS_RH.md` | `/users` | `app/users/page.tsx` | `app/users/users-list-client.tsx`, `app/users/users-side-panel-client.tsx` | `app/a24-users-rh.css`, `app/globals.css` | Élevé | Référence avec route et fichiers explicites. |
| Véhicules | CANONIQUE | `Véhicules_V1.2.png` | `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/6-Véhicules` | `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_VEHICLES.md` | `/vehicles` | `app/vehicles/page.tsx` | `app/vehicles/vehicles-client.tsx`, `app/vehicles/add-vehicle-form.tsx` | `app/a24-vehicles-templates.css`, `app/globals.css` | Élevé | Alignement complet PNG/ref/route. |
| Modèles horaires (ancien nom historique : Templates) | CANONIQUE | `Modèles_horaires_V1.1.png` | `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/3-Modèles-Horaire` | `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_TEMPLATES.md` | `/templates` | `app/templates/page.tsx` | `app/templates/templates-client.tsx` | `app/a24-vehicles-templates.css`, `app/globals.css` | Élevé | Alignement complet PNG/ref/route. |
| Société | CANONIQUE | `Société_V1.0.png` | `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/8-Société-paramètres-métier` | `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_COMPANY.md` | `/company` | `app/company/page.tsx` | `app/company/company-profile-form.tsx`, `app/company/company-rules-panel.tsx` | `app/a24-complementary-pages.css`, `app/globals.css` | Élevé | Alignement complet PNG/ref/route. |
| Dépôts / Bases | CANONIQUE | `Dépôts-bases_V1.0.png` | `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/7-Dépôts-bases` | `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_DEPOTS_BASES.md` | `/depots` | `app/depots/page.tsx` | `app/depots/depots-client.tsx` | `app/a24-complementary-pages.css`, `app/globals.css` | Élevé | Alignement complet PNG/ref/route. |
| Mise en route (ancien nom historique : Onboarding) | CANONIQUE | `Onboarding_V1.2.png` | `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/9-Onboarding société pilote` | `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_ONBOARDING.md` | `/onboarding` | `app/onboarding/page.tsx` | `app/onboarding/onboarding-client.tsx` | `app/a24-complementary-pages.css`, `app/globals.css` | Élevé | Alignement complet PNG/ref/route. |
| Audit | CANONIQUE | `Audit_V1.0.png` | `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/10-Audit` | `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_AUDIT.md` | `/audit` | `app/audit/page.tsx` | `app/audit/audit-client.tsx` | `app/a24-complementary-pages.css`, `app/globals.css` | Élevé | Alignement complet PNG/ref/route. |
| Privacy | CANONIQUE | `Privacy_V1.0.png` | `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/11-Privacy` | `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_PRIVACY.md` | `/privacy` | `app/privacy/page.tsx` | INFORMATION NON FOURNIE — À CONFIRMER | `app/globals.css` | Élevé | Alignement complet PNG/ref/route. |
| Imports (UI) | TECHNIQUE / API | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | API détectée : `app/api/imports/route.ts` | INFORMATION NON FOURNIE — À CONFIRMER | Moyen | Surface API présente, page UI dédiée non identifiée. |
| Exports (UI) | TECHNIQUE / API | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | API détectée : `app/api/planning/exports/route.ts` | INFORMATION NON FOURNIE — À CONFIRMER | Moyen | Surface API présente, page UI dédiée non identifiée. |
| Autoschedule | TECHNIQUE / API | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | API détectée : `app/api/planning/autoschedule/**` | INFORMATION NON FOURNIE — À CONFIRMER | Moyen | Back-end présent, mapping UI canonique manquant. |
| Matching | TECHNIQUE / API | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | API détectée : `app/api/planning/autoschedule/runs/[id]/match/**` | INFORMATION NON FOURNIE — À CONFIRMER | Moyen | Back-end présent, mapping UI canonique manquant. |
| RGPD | PARTIEL | `Privacy_V1.0.png` (information) | `docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/11-Privacy` | `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_PRIVACY.md` | `/privacy` | `app/privacy/page.tsx` | INFORMATION NON FOURNIE — À CONFIRMER | `app/globals.css` | Moyen | Couverture RGPD partielle via page Privacy; périmètre RGPD complet non cartographié UI. |
| Sécurité (UI) | À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | API auth détectée : `app/api/auth/[...nextauth]/route.ts` | INFORMATION NON FOURNIE — À CONFIRMER | Faible | Module surtout transversal technique, pas de page UI dédiée identifiée. |
| Documentation / pages simples | PARTIEL | `Login_V1.1.png`, `Privacy_V1.0.png` | `.../MAQUETTE_PNG` | `REFERENCE_UI_UX_LOGIN.md`, `REFERENCE_UI_UX_PRIVACY.md` | `/login`, `/privacy` | `app/login/page.tsx`, `app/privacy/page.tsx` | INFORMATION NON FOURNIE — À CONFIRMER | `app/globals.css` | Élevé | Sous-ensemble simple bien couvert, pas de route `/documentation` détectée. |

## Incohérences relevées

| zone | type d'incohérence | preuve / chemin | impact | recommandation future |
|---|---|---|---|---|
| Historique maquettes | Ancien chemin MAQUETTE_DA encore présent dans sessions | `docs/2-SESSIONS/**` (multiples occurrences `MAQUETTE_DA`) | Risque de confusion de chemin pour Codex | Normaliser les prompts futurs vers `docs/1-MASTER/1-MAQUETTE/...` uniquement. |
| Shell global | Pas de PNG unique dédié | `REFERENCE_UI_UX_SHELL_GLOBAL.md` + index maquettes | Ambiguïté possible sur la source visuelle prioritaire | Conserver règle « shell transversal » + liste de PNG de référence. |
| Imports/Exports/Autoschedule/Matching | Présence API sans route UI canonique explicite | `app/api/imports/route.ts`, `app/api/planning/exports/route.ts`, `app/api/planning/autoschedule/**` | Difficile de relier UI/UX aux fonctions techniques | Créer matrice complémentaire UI-vers-API en session dédiée après REBASAGE-07. |
| Documentation de gouvernance | Encodage hétérogène dans certains docs maîtres/références | Sorties terminal montrant mojibake ponctuel | Risque d'interprétation sur accents/casse | Traiter dans audit encodage ciblé REBASAGE-07, fichier par fichier. |
| Casse historique | Variantes `docs/1-master` encore présentes en historique | Sessions A24/A25/BLOC_DOCS | Risque de copier-coller de mauvais chemins | Conserver l'historique, imposer la casse officielle dans nouveaux documents. |

## Pages sans maquette claire

- `/` (route racine de redirection : `app/page.tsx`) — INFORMATION NON FOURNIE — À CONFIRMER
- Surfaces UI explicites pour Imports / Exports / Autoschedule / Matching — INFORMATION NON FOURNIE — À CONFIRMER

## Maquettes sans route claire

- Aucune parmi les 11 PNG officiels inventoriés dans `REFERENCE_UI_UX_INDEX_MAQUETTES.md`.
- Cas particulier : `Planning_V1.2_INFO_DETAIL.png` est un support d'analyse de `/planning`, pas une route distincte.

## Références UI/UX sans lien complet

- `REFERENCE_UI_UX_A24.md` : référence historique globale, non page-canonique.
- `REFERENCE_CODEX_UI_UX_VISUEL_99.md` : cadre transversal de production, non associé à une route unique.
- `README_PACK_REFERENCE_UI_UX.md` : document de pack/gouvernance, non route.

## Prochaine étape recommandée

`REBASAGE-07` : audit encodage ciblé, avec preuves fichier par fichier (fichier, exemple, encodage constaté, correction éventuelle, vérification après correction), sans correction massive.
