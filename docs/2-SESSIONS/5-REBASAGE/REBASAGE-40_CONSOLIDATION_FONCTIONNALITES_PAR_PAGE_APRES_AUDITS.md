# REBASAGE-40 — Consolidation des fonctionnalités par page après audits

## 1. Objet du document
Ce document consolide les fonctionnalités identifiées page par page après les audits du rebasage global Alpha.

Il ne remplace pas :
- `PLAN_DE_DEVELOPPEMENT.md` ;
- `DOCUMENT_CADRAGE_FONCTIONNEL.md` ;
- les audits individuels ;
- la matrice page / fonctionnalités / code / documentation / maquette ;
- la consolidation d’inventaire REBASAGE-39.

## 2. Règles de lecture
- Consolidation documentaire uniquement.
- Lecture seule.
- En cas de contradiction : code réel > documentation.
- Aucune correction code pendant cette session.
- Aucune modification des anciens livrables.
- Toute information non prouvée reste `INFORMATION NON FOURNIE — À CONFIRMER`.
- Les accents français normaux sont conservés lorsque l’encodage est propre.

## 3. Sources lues
- `docs/1-MASTER/DOCUMENT_MAITRE.md`
- `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE_GLOBAL_ALPHA.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-23_CARTOGRAPHIE_GLOBALE_PROJET.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-24_MATRICE_PAGE_FONCTIONNALITES_CODE_DOCUMENTATION_MAQUETTE.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-25_CLASSEMENT_DETTES_PRIORITES.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-26_INVENTAIRE_PAGES_ROUTES_APPLICATIVES.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-39_CONSOLIDATION_INVENTAIRE_PAGES_STATUTS.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-27_AUDIT_PAGE_LOGIN.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-28_AUDIT_PAGE_DASHBOARD.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-29_AUDIT_PAGE_PLANNING.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-30_AUDIT_PAGE_UTILISATEURS_RH.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-31_AUDIT_PAGE_VEHICULES_FLOTTE.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-32_AUDIT_PAGE_TEMPLATES_MODELES_SHIFTS.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-33_AUDIT_PAGE_SOCIETE_PROFIL_BASES_DEPOTS.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-34_AUDIT_PAGE_DEPOTS_BASES.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-35_AUDIT_PAGE_ONBOARDING.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-36_AUDIT_PAGE_AUDIT_TRACABILITE.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-37_AUDIT_PAGE_PRIVACY_MENTIONS_INFORMATION.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-38_AUDIT_PAGES_TECHNIQUES_SECONDAIRES.md`

## 4. Synthèse globale des fonctionnalités par page
| Page / module | Route principale | Fonctionnalité | Présence UI | Présence API | Présence service / logique métier | Dépendances inter-modules | Statut consolidé | Preuve ou source | Action future recommandée | Priorité indicative |
|---|---|---|---|---|---|---|---|---|---|---|
| Login | `/login` | Authentification credentials + redirection sécurisée | OUI | OUI | OUI | Auth/session/shell | incomplet | REBASAGE-27 | audit complémentaire sécurité auth | Important |
| Dashboard | `/dashboard` | Hub modules + KPI conditionnés par permissions | OUI | PARTIEL | OUI | RBAC + modules métier | incomplet | REBASAGE-28 | vérification métier KPI/permissions | Important |
| Planning | `/planning` | Consultation/édition shifts, autoschedule, export, audit contextuel | OUI | OUI | OUI | Users/Véhicules/Templates/Dépôts/Audit | incomplet | REBASAGE-29 | audit e2e planning | Important |
| Utilisateurs / RH | `/users` | CRUD users, absences, permissions, rattachement dépôt, reset password | OUI | OUI | OUI | Dépôts/Planning/RBAC/Audit | incomplet | REBASAGE-30 | audit complémentaire scénarios RH | Important |
| Véhicules / Flotte | `/vehicles` | CRUD véhicules, archivage logique, rattachement dépôt | OUI | OUI | OUI | Dépôts/Planning/Audit | incomplet | REBASAGE-31 | audit complémentaire conformité flotte | Important |
| Templates / Modèles | `/templates` | CRUD templates, archivage logique, règles de templates | OUI | OUI | OUI | Planning/Autoschedule/Matching | incomplet | REBASAGE-32 | audit complémentaire templates | Important |
| Société / Profil | `/company` | Profil société + règles métier société | OUI | OUI | OUI | RBAC/Planning/Onboarding | incomplet | REBASAGE-33 | clarification gouvernance/règles | Important |
| Dépôts / Bases | `/depots` | CRUD dépôts, archivage logique, rattachements inter-modules | OUI | OUI | OUI | Users/Véhicules/Planning/Templates | incomplet | REBASAGE-34 | audit impacts post-archivage | Important |
| Onboarding | `/onboarding` | Checklist préparation société pilote | OUI | PARTIEL | PARTIEL | Société/Dépôts/Users/Véhicules/Templates/Imports | incomplet | REBASAGE-35 | clarifier périmètre onboarding/imports | À confirmer |
| Audit / Traçabilité | `/audit` | Consultation journaux + filtres | OUI | OUI | OUI | Tous modules métier + auth | incomplet | REBASAGE-36 | compléter couverture événements | Important |
| Privacy / Mentions d’information | `/privacy` | Information RGPD/mentions | OUI | NON PROUVÉ | NON PROUVÉ | Login/Support/Audit (liens partiels) | incomplet | REBASAGE-37 | clarifier workflow RGPD opérationnel | À confirmer |
| Pages techniques / secondaires | `/`, routes techniques | Redirection racine + routes techniques de santé | OUI/PARTIEL | OUI | PARTIEL | Shell/Auth/observabilité | incomplet | REBASAGE-38 | audit fallback et gouvernance routes techniques | Amélioration |

## 5. Fonctionnalités par statut consolidé
### 5.1 Fonctionnalités conformes
`INFORMATION NON FOURNIE — À CONFIRMER`

### 5.2 Fonctionnalités non conformes
`INFORMATION NON FOURNIE — À CONFIRMER`

### 5.3 Fonctionnalités incomplètes
- Auth login avancée (au-delà du flux nominal)
- KPI Dashboard et cohérence des conditions d’accès
- Scénarios e2e Planning (édition, publication, matching, export)
- Scénarios complets Users/RH (permissions fines, absences, gouvernance)
- Conformité opérationnelle Véhicules
- Liaisons Templates ↔ autoschedule/matching
- Impacts inter-modules des Dépôts (post-archivage)
- Couverture traçabilité multi-modules
- Rôle produit final de l’Onboarding

### 5.4 Fonctionnalités à confirmer
- Workflow RGPD opérationnel (export/correction/suppression) depuis la sphère Privacy
- Couverture exhaustive des événements Audit
- Stratégie pages fallback (`error/not-found/loading`)
- Exposition et gouvernance des routes techniques secondaires

### 5.5 Fonctionnalités absentes ou non prouvées
- Pages fallback App Router dédiées (`error.tsx`, `not-found.tsx`, `loading.tsx`) : non prouvées dans REBASAGE-38
- API/privacy dédiée au traitement des demandes RGPD : `INFORMATION NON FOURNIE — À CONFIRMER`

## 6. Fonctionnalités transverses
| Fonctionnalité transverse | Modules concernés | Niveau de preuve | Statut | Risque | Action recommandée |
|---|---|---|---|---|---|
| Multi-tenant / `companyId` | Login, Dashboard, Planning, Users, Véhicules, Dépôts, Audit | PARTIEL | incomplet | Cloisonnement incomplet mal vérifié | audit de preuves transverses |
| Permissions / RBAC | Dashboard, Planning, Users, Véhicules, Templates, Audit | OUI (partiel e2e) | incomplet | Accès incohérents selon profils | scénarios droits par rôle |
| Audit / Traçabilité | Audit + modules métier + auth | PARTIEL | incomplet | Couverture événements partielle | cartographie fine des événements |
| Archivage logique | Users, Véhicules, Dépôts, Templates | PARTIEL | incomplet | Effets secondaires post-archivage | scénarios d’intégrité inter-modules |
| Rattachements dépôts | Users, Véhicules, Planning, Dépôts | PARTIEL | incomplet | Incohérences métier en chaîne | audit inter-modules ciblé |
| Imports | Onboarding, Planning | À confirmer | à confirmer | Mauvaise interprétation du périmètre | clarification Nathan + preuve code |
| Navigation / accès | Shell, Login, Dashboard, Privacy | PARTIEL | incomplet | Découvrabilité inégale | validation navigation globale |

## 7. Fonctionnalités critiques à ne pas considérer comme validées trop vite
- Planning : module riche mais validation métier e2e incomplète.
- Users/RH : couverture fonctionnelle large, scénarios complets non prouvés.
- Onboarding : présence UI sans preuve complète de statut persistant et de finalisation.
- Privacy : page présente sans preuve de workflow RGPD opérationnel.
- Audit : consultation présente, couverture des événements partielle.
- Dépôts : gestion présente, impacts post-archivage à confirmer.
- Templates : présents, liens complets autoschedule/matching partiels.

## 8. Fonctionnalités liées aux dettes consolidées
| Page / module | Fonctionnalité concernée | Dette constatée | Preuve ou source | Priorité | Action recommandée | Statut |
|---|---|---|---|---|---|---|
| Planning | Parcours planning complet | Validation e2e incomplète | REBASAGE-29 | Important | audit complémentaire ciblé | À VALIDER AVANT ACTION |
| Users/RH | Permissions + scénarios RH | Couverture permissionnelle non figée | REBASAGE-30 | Important | compléter preuves scénarios | À VALIDER AVANT ACTION |
| Audit | Couverture événements | Traçabilité partielle selon modules | REBASAGE-36 | Important | cartographier événements manquants | À VALIDER AVANT ACTION |
| Dépôts | Impacts inter-modules | Effets post-archivage à confirmer | REBASAGE-34 | Important | audit inter-modules | À VALIDER AVANT ACTION |
| Privacy | RGPD opérationnel | Mentions sans workflow prouvé | REBASAGE-37 | À confirmer | clarification + preuves techniques | À VALIDER AVANT ACTION |
| Onboarding | Rôle produit exact | Périmètre imports/onboarding partiel | REBASAGE-35 | À confirmer | cadrage fonctionnel ciblé | À VALIDER AVANT ACTION |
| Pages techniques | Fallback/secondaire | Fallback non prouvé | REBASAGE-38 | Amélioration | audit technique ciblé | À VALIDER AVANT ACTION |

## 9. Actions futures recommandées par page
| Page | Action recommandée | Type probable | Priorité indicative | Dépendance éventuelle |
|---|---|---|---|---|
| Login | Vérifier exigences sécurité avancées | audit complémentaire | Important | RBAC/auth globale |
| Dashboard | Valider KPI et gating permissions | complétion de preuve | Important | RBAC + modules métier |
| Planning | Prouver parcours e2e majeurs | audit complémentaire | Important | Users/Véhicules/Templates |
| Users/RH | Stabiliser scénarios complets RH | audit complémentaire | Important | Dépôts + permissions |
| Véhicules | Valider conformité et flux archivage | audit complémentaire | Important | Dépôts + audit |
| Templates | Valider liens autoschedule/matching | audit complémentaire | Important | Planning |
| Société | Clarifier gouvernance règles | clarification | Important | RBAC |
| Dépôts | Vérifier effets post-archivage | audit complémentaire | Important | Users/Véhicules/Planning |
| Onboarding | Clarifier objectifs et sorties | à confirmer | À confirmer | Imports + société |
| Audit | Compléter couverture événements | complétion de preuve | Important | Tous modules |
| Privacy | Clarifier volet RGPD opérationnel | à confirmer | À confirmer | Support + audit |
| Techniques/secondaires | Évaluer fallback et routes techniques | audit complémentaire | Amélioration | Shell/navigation |

## 10. Cohérence avec la matrice page / fonctionnalités / code / documentation / maquette
- Cette consolidation confirme globalement la matrice REBASAGE-24 sur l’existence des pages/modules.
- Elle complète la matrice en ajoutant une vue “fonctionnalité par statut” issue des audits 27→38.
- Elle met en tension les zones où UI/API existent sans preuve de scénario métier complet.
- Elle ne remplace pas la matrice et conserve le principe de preuve progressive.

## 11. Écarts méthodologiques ou risques de mauvaise direction
- Risque d’assimiler “présent dans le code” à “fonctionnel validé”.
- Risque de statut trop optimiste sur modules à forte densité (Planning, Users/RH).
- Risque de confusion entre mentions documentaires et workflows opérationnels (Privacy/RGPD).
- Risque d’oublier les dépendances inter-modules dans les corrections futures.
- Risque de créer un plan parallèle si les actions futures ne restent pas rattachées au plan officiel.

## 12. Ce qui semble prêt pour une future correction / complétion
- Planning : scénarios e2e prioritaires à cadrage déjà suffisant.
- Users/RH : complétion de preuves fonctionnelles et permissionnelles.
- Audit / Traçabilité : extension de couverture événements.
- Dépôts : vérification impacts inter-modules post-archivage.

Tous ces éléments restent : `À VALIDER AVANT ACTION`.

## 13. Ce qui nécessite encore clarification avant toute correction
- Workflow RGPD opérationnel complet lié à Privacy : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Périmètre exact Onboarding ↔ Imports : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Stratégie fallback App Router cible : `À VALIDER AVANT ACTION`.
- Politique d’exposition des routes techniques secondaires : `À VALIDER AVANT ACTION`.

## 14. Verdict de consolidation des fonctionnalités
Verdict global : **incomplet**.

Justification :
- la consolidation est cohérente et exploitable ;
- mais la majorité des fonctionnalités critiques restent partiellement prouvées au niveau parcours métier complet ;
- plusieurs dépendances transverses clés restent à confirmer avant toute correction.

## 15. Prochaine étape recommandée
REBASAGE-41 — Préparation de la future refonte du plan officiel.
