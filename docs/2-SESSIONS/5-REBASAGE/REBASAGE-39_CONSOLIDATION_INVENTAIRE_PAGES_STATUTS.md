# REBASAGE-39 — Consolidation de l’inventaire des pages et statuts

## 1. Objet du document
Ce document consolide les audits page par page déjà réalisés dans le cadre du rebasage global Alpha.

Il ne remplace pas :
- `PLAN_DE_DEVELOPPEMENT.md` ;
- `DOCUMENT_CADRAGE_FONCTIONNEL.md` ;
- les audits individuels ;
- la matrice page / fonctionnalités / code / documentation / maquette.

## 2. Règles de lecture
- Consolidation documentaire uniquement.
- Lecture seule (aucune correction code).
- En cas de contradiction : code réel > documentation.
- Aucun ancien livrable REBASAGE n’est modifié.
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

## 4. Synthèse globale des pages auditées
| ID audit | Page / module | Route principale | Fichiers principaux | Livrable d’audit source | Verdict d’audit | Statut actuel consolidé | Points clés restants | Prochaine action recommandée | Priorité indicative |
|---|---|---|---|---|---|---|---|---|---|
| REBASAGE-27 | Login | `/login` | `app/login/page.tsx`, `app/api/auth/[...nextauth]/route.ts`, `lib/auth.ts` | `REBASAGE-27_AUDIT_PAGE_LOGIN.md` | incomplet | audit initial consolidé | sécurité avancée et tenant login à confirmer | audit complémentaire ciblé auth/login | Important |
| REBASAGE-28 | Dashboard | `/dashboard` | `app/dashboard/page.tsx`, `app/layout.tsx` | `REBASAGE-28_AUDIT_PAGE_DASHBOARD.md` | incomplet | audit initial consolidé | fiabilité KPI et scénarios permissions à confirmer | vérification métier KPI/permissions | Important |
| REBASAGE-29 | Planning | `/planning` | `app/planning/page.tsx`, `app/planning/planning-client.tsx`, `app/api/planning/**` | `REBASAGE-29_AUDIT_PAGE_PLANNING.md` | incomplet | audit initial consolidé | preuves e2e vues/actions, règles métier détaillées | audit complémentaire planning e2e | Important |
| REBASAGE-30 | Utilisateurs / RH | `/users` | `app/users/page.tsx`, `app/api/users/**`, `lib/services/users/**` | `REBASAGE-30_AUDIT_PAGE_UTILISATEURS_RH.md` | incomplet | audit initial consolidé | couverture permissionnelle exhaustive et scénarios RH | audit complémentaire users/RH | Important |
| REBASAGE-31 | Véhicules / Flotte | `/vehicles` | `app/vehicles/page.tsx`, `app/api/vehicles/**`, `lib/services/vehicles/**` | `REBASAGE-31_AUDIT_PAGE_VEHICULES_FLOTTE.md` | incomplet | audit initial consolidé | conformité opérationnelle et indisponibilités véhicule à confirmer | audit complémentaire flotte | Important |
| REBASAGE-32 | Templates / Modèles | `/templates` | `app/templates/page.tsx`, `app/api/templates/**`, `lib/templates/**` | `REBASAGE-32_AUDIT_PAGE_TEMPLATES_MODELES_SHIFTS.md` | incomplet | audit initial consolidé | règles avancées composition/archivage à confirmer | audit complémentaire templates | Important |
| REBASAGE-33 | Société / Profil | `/company` | `app/company/page.tsx`, `app/api/company/**` | `REBASAGE-33_AUDIT_PAGE_SOCIETE_PROFIL_BASES_DEPOTS.md` | incomplet | audit initial consolidé | alignement profil/règles et périmètre gouvernance à confirmer | audit complémentaire société | Important |
| REBASAGE-34 | Dépôts / Bases | `/depots` | `app/depots/page.tsx`, `app/api/depots/**`, liens `users/vehicles/planning` | `REBASAGE-34_AUDIT_PAGE_DEPOTS_BASES.md` | incomplet | audit initial consolidé | cycle de vie dépôt et impacts inter-modules à stabiliser | audit complémentaire dépôts | Important |
| REBASAGE-35 | Onboarding | `/onboarding` | `app/onboarding/page.tsx`, `app/onboarding/onboarding-client.tsx`, `app/api/imports/route.ts` | `REBASAGE-35_AUDIT_PAGE_ONBOARDING.md` | incomplet | audit initial consolidé | rôle produit exact onboarding/imports à confirmer | audit complémentaire onboarding | À confirmer |
| REBASAGE-36 | Audit / Traçabilité | `/audit` | `app/audit/page.tsx`, `app/audit/audit-client.tsx`, `app/api/audit/route.ts` | `REBASAGE-36_AUDIT_PAGE_AUDIT_TRACABILITE.md` | incomplet | audit initial consolidé | couverture réelle des événements multi-modules incomplète | audit complémentaire traçabilité | Important |
| REBASAGE-37 | Privacy / Mentions | `/privacy` | `app/privacy/page.tsx`, lien `app/login/page.tsx` | `REBASAGE-37_AUDIT_PAGE_PRIVACY_MENTIONS_INFORMATION.md` | incomplet | audit initial consolidé | liens opérationnels RGPD (export/correction/suppression) non prouvés | clarification RGPD applicative | À confirmer |
| REBASAGE-38 | Pages techniques / secondaires | `/`, routes techniques annexes | `app/page.tsx`, `app/app-shell.tsx`, `app/layout.tsx`, `app/api/health/prisma/route.ts` | `REBASAGE-38_AUDIT_PAGES_TECHNIQUES_SECONDAIRES.md` | incomplet | audit initial consolidé | fallback UI non prouvés (`error/not-found/loading`) | audit technique ciblé shell/fallback | Amélioration |

## 5. Pages par statut consolidé
### 5.1 Pages conformes
`INFORMATION NON FOURNIE — À CONFIRMER`

### 5.2 Pages non conformes
`INFORMATION NON FOURNIE — À CONFIRMER`

### 5.3 Pages incomplètes
- Login
- Dashboard
- Planning
- Utilisateurs / RH
- Véhicules / Flotte
- Templates / Modèles de shifts
- Société / Profil société
- Dépôts / Bases
- Onboarding
- Audit / Traçabilité
- Privacy / Mentions d’information
- Pages techniques / secondaires

### 5.4 Pages à confirmer
- Rôle et périmètre exact onboarding/imports
- Couverture RGPD opérationnelle associée à `/privacy`
- Couverture exhaustive des événements audit par module
- Présence/stratégie des pages fallback (`error/not-found/loading`)

### 5.5 Pages non encore auditées
`INFORMATION NON FOURNIE — À CONFIRMER`

## 6. Routes applicatives consolidées
| Route | Page associée | Fichier | Statut d’audit | Accès/navigation | Commentaire |
|---|---|---|---|---|---|
| `/` | Entrée technique | `app/page.tsx` | incomplet (REBASAGE-38) | URL directe | redirection vers login/dashboard |
| `/login` | Login | `app/login/page.tsx` | incomplet | publique | lien vers `/privacy` |
| `/dashboard` | Dashboard | `app/dashboard/page.tsx` | incomplet | shell | hub modules par permissions |
| `/planning` | Planning | `app/planning/page.tsx` | incomplet | shell | module cœur |
| `/users` | Utilisateurs / RH | `app/users/page.tsx` | incomplet | shell | module cœur |
| `/vehicles` | Véhicules / Flotte | `app/vehicles/page.tsx` | incomplet | shell | module cœur |
| `/templates` | Templates | `app/templates/page.tsx` | incomplet | shell | module cœur |
| `/company` | Société / Profil | `app/company/page.tsx` | incomplet | shell (permissions) | module cœur |
| `/depots` | Dépôts / Bases | `app/depots/page.tsx` | incomplet | shell (permissions) | module cœur |
| `/onboarding` | Onboarding | `app/onboarding/page.tsx` | incomplet | shell (permissions) | module de préparation |
| `/audit` | Audit / Traçabilité | `app/audit/page.tsx` | incomplet | shell (permissions) | module transversal |
| `/privacy` | Mentions d’information | `app/privacy/page.tsx` | incomplet | lien login + URL directe | visibilité shell à confirmer |

## 7. Routes API associées aux pages
| Route API | Module | Page liée | Statut dans l’audit | Commentaire |
|---|---|---|---|---|
| `/api/auth/[...nextauth]` | Auth/session | Login | partiel | handlers présents ; exigences avancées à confirmer |
| `/api/planning/**` | Planning/autoschedule/exports | Planning | partiel | densité fonctionnelle élevée |
| `/api/users/**` | Users/RH | Utilisateurs / RH | partiel | périmètre large, validations e2e à compléter |
| `/api/vehicles/**` | Véhicules | Véhicules / Flotte | partiel | conformité/indisponibilités à confirmer |
| `/api/templates/**` | Templates | Templates | partiel | règles métier avancées à confirmer |
| `/api/company/profile`, `/api/company/rules` | Société/règles | Société / Profil | partiel | gouvernance/règles à consolider |
| `/api/depots/**` | Dépôts | Dépôts / Bases | partiel | impacts inter-modules à stabiliser |
| `/api/imports` | Imports initiaux | Onboarding (lien partiel) | à confirmer | liaison exacte onboarding/import à confirmer |
| `/api/audit` | Audit | Audit / Traçabilité | partiel | couverture des événements incomplète |
| `/api/health/prisma` | Technique/santé | Pages techniques / secondaires | à confirmer | route technique non métier |

## 8. Points transverses récurrents
- Modules présents mais validation métier e2e encore incomplète.
- Liens inter-modules partiellement prouvés (planning ↔ users/vehicles/depots/templates).
- Couverture audit / traçabilité partielle selon modules.
- Exposition navigation de certaines pages secondaires à confirmer (`/privacy` dans shell).
- Absence de preuve sur certains comportements post-archivage.
- Présence UI sans validation finale de statut métier.

## 9. Dettes consolidées par priorité
| Priorité | Page/module | Description | Preuve/source | Action recommandée | Statut |
|---|---|---|---|---|---|
| Important | Planning | Validation e2e des vues/actions/règles incomplète | REBASAGE-29 | audit complémentaire ciblé | À VALIDER AVANT ACTION |
| Important | Users/RH | Complexité permissions/absences/rattachements à sécuriser | REBASAGE-30 | audit complémentaire + scénarios de preuve | À VALIDER AVANT ACTION |
| Important | Audit / Traçabilité | Couverture des événements multi-modules incomplète | REBASAGE-36 | compléter la cartographie des événements tracés | À VALIDER AVANT ACTION |
| Important | Dépôts/Bases | Impacts inter-modules et cycle de vie à fiabiliser | REBASAGE-34 | audit complémentaire inter-modules | À VALIDER AVANT ACTION |
| À confirmer | Privacy / RGPD | Mentions présentes mais workflows opérationnels non prouvés | REBASAGE-37 | clarification produit + preuve technique | À VALIDER AVANT ACTION |
| Amélioration | Pages techniques | Stratégie fallback (`error/not-found/loading`) non prouvée | REBASAGE-38 | audit technique ciblé shell/fallback | À VALIDER AVANT ACTION |
| Plus tard | Harmonisation docs historiques | Cohérence terminologique et traçabilité documentaire étendue | REBASAGE-23/24/25 | consolidation documentaire progressive | À VALIDER AVANT ACTION |

## 10. Pages ou éléments à ne pas considérer comme validés trop vite
- `/planning` : présence forte, mais validation métier complète non prouvée.
- `/users` : UI/API présentes, mais scénarios RH complets et permissions exhaustives non figés.
- `/audit` : page opérationnelle, mais couverture globale des événements incomplète.
- `/privacy` : page informative présente, mais workflows RGPD opérationnels non prouvés.
- Routes techniques : présence détectée ne vaut pas validation d’exploitation.

## 11. Pages ou éléments qui pourraient nécessiter un audit dédié futur
- Stratégie fallback App Router (`error/not-found/loading`) : `À VALIDER AVANT ACTION`.
- Gouvernance de la route technique `/api/health/prisma` : `À VALIDER AVANT ACTION`.
- Liaisons onboarding ↔ imports (périmètre exact) : `À VALIDER AVANT ACTION`.
- Couverture RGPD opérationnelle (au-delà des mentions) : `À VALIDER AVANT ACTION`.

## 12. Cohérence avec l’objectif global du rebasage
La consolidation améliore la lisibilité globale :
- pages existantes clarifiées ;
- statuts harmonisés (tous les audits actuels en `incomplet`) ;
- doublons évités en centralisant les verdicts ;
- continuité documentaire préservée sans créer de plan parallèle ;
- articulation code/doc/audits mieux explicitée pour préparer les futures corrections ciblées.

## 13. Verdict de consolidation
Verdict global de consolidation : **incomplet**.

Justification :
- la consolidation est exploitable et cohérente ;
- mais plusieurs zones restent explicitement à confirmer, et aucune page auditée n’a encore atteint un statut final `conforme`.

## 14. Prochaine étape recommandée
REBASAGE-40 — consolidation des fonctionnalités par page après audits.
