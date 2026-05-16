# REBASAGE-24 — Matrice page / fonctionnalités / code / documentation / maquette

## 1. Résumé de la session

Objectif : produire une matrice opérationnelle reliant pages, code, API, documentation et maquettes, sans correction applicative.

Résultat : matrice créée en lecture documentaire, avec statut provisoire par page/groupe et zones à confirmer explicites.

## 2. Périmètre lu

- `docs/1-MASTER/DOCUMENT_MAITRE.md`
- `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-19_FONCTIONNALITES_PAR_PAGE.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-23_CARTOGRAPHIE_GLOBALE_PROJET.md`
- Lecture ciblée complémentaire : `app/`, `app/api/`, `lib/`, `prisma/`, `docs/1-MASTER/2-REFERENCE_UI_UX/`, `docs/1-MASTER/1-MAQUETTE/`.

## 3. Règles de lecture de la matrice

- Cette matrice est un support d’audit, pas un plan de développement.
- Le plan officiel reste `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md`.
- La base produit officielle reste `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md`.
- Les statuts sont provisoires : `clair`, `partiel`, `à confirmer`.
- Toute donnée non prouvée est notée : `INFORMATION NON FOURNIE — À CONFIRMER`.

## 4. Matrice globale page / fonctionnalités / code / documentation / maquette

| Page / groupe | Route applicative | Fichiers code principaux | Module fonctionnel | Fonctionnalités attendues (docs) | Fonctionnalités présentes dans le code (lecture rapide) | Fonctionnalités absentes / à confirmer | Routes API liées | Documents de référence liés | Maquettes / références UI/UX | Statut provisoire | Écarts / risques | Action recommandée |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Login | `/login` | `app/login/page.tsx` | Auth / session | Authentifier et rediriger selon rôle/session | Formulaire login, `next-auth` credentials, callback sécurisée, redirection | MFA, récupération avancée, règles exactes de sécurité métier : INFORMATION NON FOURNIE — À CONFIRMER | `/api/auth/[...nextauth]` | `DOCUMENT_CADRAGE_FONCTIONNEL.md`, `DOCUMENT_MAITRE.md` | `REFERENCE_UI_UX_LOGIN.md`, `Login_V1.1.png` | clair | Écart possible entre UX cible et logique erreurs réelle | auditer |
| Dashboard | `/dashboard` | `app/dashboard/page.tsx` | Dashboard / RBAC | Point d’entrée métier avec accès conditionnels | Cartes modules, KPI, contrôles permissions, liens vers modules | Définition complète des KPI attendus : INFORMATION NON FOURNIE — À CONFIRMER | APIs modules consommées indirectement | `DOCUMENT_CADRAGE_FONCTIONNEL.md`, `PLAN_DE_DEVELOPPEMENT.md` | `REFERENCE_UI_UX_DASHBOARD.md`, `Dashboard_V1.png` | partiel | Risque d’écart entre promesse produit et disponibilité module | auditer |
| Planning | `/planning` | `app/planning/page.tsx`, `app/planning/planning-client.tsx` | Planning / autoschedule / export | Planifier, visualiser, ajuster, exporter | Permissions fines, chargement users/depots, capacités autoschedule/export/audit | Couverture complète matching et règles de publication : INFORMATION NON FOURNIE — À CONFIRMER | `/api/planning/shifts/**`, `/api/planning/autoschedule/**`, `/api/planning/exports` | `DOCUMENT_CADRAGE_FONCTIONNEL.md`, `PLAN_DE_DEVELOPPEMENT.md` | `REFERENCE_UI_UX_A25_PLANNING.md`, `Planning_V1.2.png`, `Planning_V1.2_INFO_DETAIL.png` | partiel | Zone la plus dense, forte dette de vérification fonctionnelle | auditer |
| Utilisateurs / RH | `/users` | `app/users/page.tsx` + clients RH | Users / RH / permissions | Gérer comptes, rôles, absences, rattachement dépôts | KPI RH, liste + opérations avancées (create/edit/archive/absence/reset/depot), contrôle permissions | Matrice permissionnelle exhaustive attendue : INFORMATION NON FOURNIE — À CONFIRMER | `/api/users`, `/api/users/[id]/**` | `DOCUMENT_CADRAGE_FONCTIONNEL.md`, `REGISTRE_DECISIONS.md` | `REFERENCE_UI_UX_USERS_RH.md`, `Utilisateurs-RH_V1.png` | partiel | Complexité RBAC potentiellement supérieure à la doc synthèse | auditer |
| Véhicules | `/vehicles` | `app/vehicles/page.tsx`, `app/vehicles/vehicles-client.tsx` | Véhicules / flotte | Gérer flotte, statut, conformité, dépôt | Chargement véhicules/depôts, gestion create/update/archive/depot via API | Règles métier de conformité détaillées : INFORMATION NON FOURNIE — À CONFIRMER | `/api/vehicles`, `/api/vehicles/[id]/**` | `DOCUMENT_CADRAGE_FONCTIONNEL.md` | `REFERENCE_UI_UX_VEHICLES.md`, `Véhicules_V1.2.png` | partiel | Écart possible sur indicateurs conformité vs besoins métier | auditer |
| Templates | `/templates` | `app/templates/page.tsx`, `app/templates/templates-client.tsx` | Templates de shifts | Créer/éditer/archiver templates planning | Chargement templates, tri actif/archivé, règles de template via lib | Règles métier avancées de composition : INFORMATION NON FOURNIE — À CONFIRMER | `/api/templates`, `/api/templates/[id]/**` | `DOCUMENT_CADRAGE_FONCTIONNEL.md` | `REFERENCE_UI_UX_TEMPLATES.md`, `Templates_V1.1.png` | partiel | Dépendance forte aux règles runtime lib | auditer |
| Société | `/company` | `app/company/page.tsx` + formulaires | Société / règles métier | Gérer profil société et paramètres métier | Vérification droit profile/rules, profil + panel rules, KPI société | Périmètre exact règles support global : INFORMATION NON FOURNIE — À CONFIRMER | `/api/company/profile`, `/api/company/rules` | `DOCUMENT_CADRAGE_FONCTIONNEL.md`, `REGISTRE_DECISIONS.md` | `REFERENCE_UI_UX_COMPANY.md`, `Société_V1.0.png` | partiel | Risque de confusion profil société vs gouvernance règles | clarifier |
| Dépôts / Bases | `/depots` | `app/depots/page.tsx`, `app/depots/depots-client.tsx` | Dépôts / bases | Gérer bases de rattachement users/véhicules | Liste, KPI, création/édition/archive, comptages usages | Politique d’archivage et impacts inter-modules : INFORMATION NON FOURNIE — À CONFIRMER | `/api/depots`, `/api/depots/[id]`, `/api/depots/[id]/archive` | `DOCUMENT_CADRAGE_FONCTIONNEL.md` | `REFERENCE_UI_UX_DEPOTS_BASES.md`, `Dépôts-bases_V1.0.png` | clair | Fonction transverse pouvant impacter RH/flotte | auditer |
| Onboarding | `/onboarding` | `app/onboarding/page.tsx`, `app/onboarding/onboarding-client.tsx` | Onboarding société pilote | Vérifier prérequis de démarrage exploitation | Checklist fondée sur compteurs (company/depots/users/vehicles/templates/absences), liens modules | Critères d’acceptation fin onboarding : INFORMATION NON FOURNIE — À CONFIRMER | APIs modules reliées indirectement | `DOCUMENT_CADRAGE_FONCTIONNEL.md`, `ETAT_GLOBAL_PROJET.md` | `REFERENCE_UI_UX_ONBOARDING.md`, `Onboarding_V1.2.png` | partiel | Dépend de la cohérence des autres modules | compléter plus tard |
| Audit | `/audit` | `app/audit/page.tsx`, `app/audit/audit-client.tsx` | Audit / traçabilité | Consulter journal d’audit unifié | Contrôle d’accès, filtres companyId, lecture audit dédiée | Étendue exacte événements audités : INFORMATION NON FOURNIE — À CONFIRMER | `/api/audit` | `DOCUMENT_CADRAGE_FONCTIONNEL.md`, `REGISTRE_DECISIONS.md` | `REFERENCE_UI_UX_AUDIT.md`, `Audit_V1.0.png` | partiel | Risque de couverture partielle des événements sensibles | auditer |
| Privacy / Mentions | `/privacy` | `app/privacy/page.tsx` | Privacy / RGPD information | Informer sur éditeur, données, droits, sécurité | Page statique structurée en sections | Lien explicite vers workflows RGPD opérationnels : INFORMATION NON FOURNIE — À CONFIRMER | INFORMATION NON FOURNIE — À CONFIRMER | `DOCUMENT_CADRAGE_FONCTIONNEL.md`, `RGPD_BASE_MINIMALE.md` | `REFERENCE_UI_UX_PRIVACY.md`, `Privacy_V1.0.png` | clair | Peut être conforme UI mais incomplet juridiquement | à confirmer |
| Shell global | INFORMATION NON FOURNIE — À CONFIRMER (transverse) | `app/layout.tsx`, `app/app-shell.tsx`, `app/providers.tsx` | Navigation / contexte session | Structurer navigation et accès contextuels | Nav dynamique selon permissions, contexte société/user | Règles UX globales exhaustives : INFORMATION NON FOURNIE — À CONFIRMER | Consommation indirecte APIs modules | `DOCUMENT_MAITRE.md`, `_INDEX_MASTER.md` | `REFERENCE_UI_UX_SHELL_GLOBAL.md` | partiel | Impacte toutes les pages; dette de cohérence transversale | auditer |
| Route racine technique | `/` | `app/page.tsx` | Routage technique | Rediriger vers bonne entrée | Redirection session vers `/dashboard` ou `/login` | INFORMATION NON FOURNIE — À CONFIRMER | `/api/auth/[...nextauth]` indirect | `DOCUMENT_MAITRE.md` | INFORMATION NON FOURNIE — À CONFIRMER | clair | Risque faible | conserver |

## 5. Zones à confirmer

- Couverture fonctionnelle exacte des modules `imports`, `exports` et `matching` côté expérience page complète.
- Cartographie preuve page ↔ API pour routes techniques de santé (`/api/health/prisma`).
- Exigences métier détaillées de conformité RGPD opérationnelle au-delà de la page `/privacy`.
- Existence/absence d’un dossier `components/` comme choix architectural durable.
- Rattachement exhaustif des règles `company-rules` aux écrans de configuration et au planning.

## 6. Premiers écarts ou risques détectés

- **Important** : forte densité fonctionnelle sur `/planning` et `/users`, risque d’écarts entre attentes documentaires et comportements réels sans audit détaillé.
- **Important** : héritage documentaire ancien (`MAQUETTE_DA`) dans l’historique sessions, risque de confusion de chemin de référence UI.
- **Amélioration** : certaines relations API ↔ pages restent implicites (imports, audit étendu, santé technique).
- **À confirmer** : périmètre final des fonctionnalités attendues page par page dans le cadrage produit détaillé.

## 7. Limites de la matrice

- Lecture transversale, non audit exhaustif ligne à ligne de chaque composant client.
- Aucun test runtime exécuté pendant cette session.
- Statuts volontairement prudents (`partiel`, `à confirmer`) dès qu’une preuve complète n’est pas disponible.

## 8. Recommandations pour REBASAGE-25

1. Classer les dettes par priorité (bloquant/important/amélioration) à partir de cette matrice.
2. Séparer dettes `fonctionnelles`, `documentation`, `UI/UX`, `traçabilité API`.
3. Définir un ordre d’audit page par page : `planning` et `users` en premier, puis `company`, `depots`, `templates`, `vehicles`.
4. Isoler les éléments `INFORMATION NON FOURNIE — À CONFIRMER` à valider avant toute correction.

## 9. Verdicts de sortie

- REBASAGE-24 VALIDABLE : OUI
- MATRICE PAGE / FONCTIONNALITÉS / CODE / DOCUMENTATION / MAQUETTE CRÉÉE : OUI
- CODE MODIFIÉ : NON
- DOCUMENTS MAÎTRES MODIFIÉS : NON
- CLASSEMENT DES DETTES REBASAGE-25 PRÊT : OUI
