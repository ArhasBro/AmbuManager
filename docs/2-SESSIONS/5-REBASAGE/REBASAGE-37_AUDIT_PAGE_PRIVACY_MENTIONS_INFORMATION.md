# REBASAGE-37 — Audit page Privacy / Mentions d’information

## 1. Objet du document
Ce document audite l’état réel de la page Privacy / Mentions d’information dans le cadre du rebasage global Alpha.

L’audit porte sur le rôle réel d’information utilisateur, et non sur une refonte juridique complète.

## 2. Règles de lecture
- Audit en lecture seule.
- En cas de contradiction : code réel > documentation.
- Aucune correction code pendant cette session.
- Toute information non prouvée reste `INFORMATION NON FOURNIE — À CONFIRMER`.
- Les accents français normaux sont conservés lorsque l’encodage est propre.

## 3. Sources lues
### Documentation
- `docs/1-MASTER/DOCUMENT_MAITRE.md`
- `docs/1-MASTER/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_PRIVACY.md`
- `docs/1-MASTER/RGPD_BASE_MINIMALE.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE_GLOBAL_ALPHA.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-23_CARTOGRAPHIE_GLOBALE_PROJET.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-24_MATRICE_PAGE_FONCTIONNALITES_CODE_DOCUMENTATION_MAQUETTE.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-25_CLASSEMENT_DETTES_PRIORITES.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-26_INVENTAIRE_PAGES_ROUTES_APPLICATIVES.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-30_AUDIT_PAGE_UTILISATEURS_RH.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-35_AUDIT_PAGE_ONBOARDING.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-36_AUDIT_PAGE_AUDIT_TRACABILITE.md`

### Code
- `app/privacy/page.tsx`
- `app/login/page.tsx`
- `app/layout.tsx`
- `app/globals.css`
- `app/a24-complementary-pages.css`
- `lib/services/audit/personal-data-audit.ts`
- `lib/permissions.ts`
- `prisma/schema.prisma`

## 4. Routes / pages identifiées
- `/privacy` : page de mentions d’information structurée en sections statiques ; statut : confirmé.
- `/login` : lien explicite vers `/privacy` dans la note de conformité ; statut : confirmé.
- `/confidentialite` : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Route API dédiée privacy/RGPD : `INFORMATION NON FOURNIE — À CONFIRMER`.

## 5. Fichiers principaux identifiés
- Page : `app/privacy/page.tsx`
- Client component éventuel : `INFORMATION NON FOURNIE — À CONFIRMER` (page server statique observée).
- Composants : `PageHeader` via `@/app/ui`, `Link`, icônes `lucide-react`.
- API éventuelle : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Services/helpers éventuels : aucun service privacy dédié observé ; helper lié données personnelles détecté hors page (`lib/services/audit/personal-data-audit.ts`).
- Permissions/RBAC éventuels : aucun contrôle d’accès spécifique sur `/privacy` observé.
- Modèles Prisma concernés : aucun modèle privacy dédié ; contexte global RGPD indirect via `PlanningAuditLog` et `LoginAuditLog`.

## 6. Rôle réel de la page Privacy / Mentions d’information
Rôle observé dans le code :
- information générale sur éditeur, hébergement, données collectées, finalités, base légale, destinataires ;
- information sur durée de conservation, droits, sécurité, cookies, contact ;
- affichage d’un sommaire interne et de sections statiques.

La page ne fournit pas, à ce stade, de mécanisme opérationnel (demande RGPD, export, suppression, ticket support) directement exécutable depuis l’UI.

## 7. Fonctionnalités observées
| Fonctionnalité | Présence code | Présence UI | Présence API | Dépendances | Statut | Commentaire |
|---|---|---|---|---|---|---|
| Accès à la page Privacy | OUI | OUI | NON | Route `/privacy` | conforme | Route réelle trouvée. |
| Page publique ou protégée | OUI | OUI | NON | `app/layout.tsx` (aucune garde privacy) | à confirmer | Aucun verrou explicite observé ; comportement public supposé. |
| Visibilité depuis navigation/footer/menu | OUI | OUI | NON | lien login + footer privacy | incomplet | Lien explicite côté login ; entrée shell globale non observée. |
| Information sur données personnelles | OUI | OUI | NON | contenu statique sections | incomplet | Présente, non reliée à flux RGPD opérationnel. |
| Information sur finalités | OUI | OUI | NON | contenu statique | incomplet | Présente textuellement. |
| Information sur droits utilisateurs | OUI | OUI | NON | contenu statique | incomplet | Mention des droits sans workflow concret. |
| Information sur conservation des données | OUI | OUI | NON | contenu statique | à confirmer | Mention générale sans politique technique prouvée. |
| Information sur contact/support | OUI | OUI | NON | email + adresse statiques | conforme | Contact explicite affiché. |
| Lien avec utilisateurs | PARTIEL | PARTIEL | PARTIEL | `personal-data-audit`, modules users | à confirmer | Pas de liaison UI active privacy -> users. |
| Lien avec auth/session | PARTIEL | PARTIEL | NON | lien depuis login | à confirmer | Pas de contrôle session dédié sur `/privacy`. |
| Lien avec audit/traçabilité | PARTIEL | PARTIEL | PARTIEL | mention “journalisation” + logs existants | à confirmer | Mention textuelle sans consultation directe depuis page privacy. |
| Lien export/correction/suppression données | NON PROUVÉ | NON PROUVÉ | NON PROUVÉ | INFORMATION NON FOURNIE — À CONFIRMER | à confirmer | Aucun bouton ou endpoint dédié privacy observé. |
| Cohérence multi-tenant / companyId | PARTIEL | PARTIEL | NON | logique globale app | à confirmer | Page générique, non contextualisée société. |
| Cohérence documentation RGPD | PARTIEL | PARTIEL | NON | `RGPD_BASE_MINIMALE.md` | incomplet | Alignement partiel, granularité juridique/opérationnelle limitée. |

## 8. Données personnelles et mentions constatées
- Catégories de données mentionnées : identité utilisateur, données d’usage application, données société/activité.
- Finalités mentionnées : service, gestion accès, sécurité/fiabilité, obligations légales.
- Droits utilisateurs mentionnés : accès, rectification, suppression, limitation (si applicable).
- Durée de conservation mentionnée : formulations générales (actifs, audit, archivage).
- Responsable ou contact mentionné : SC Ambulances + email contact.
- Base légale mentionnée : intérêt légitime, obligations légales, exécution des services.
- Actions disponibles depuis la page : consultation statique et navigation interne uniquement.

Éléments non prouvés dans la page :
- mécanisme formel de demande RGPD outillé (export/correction/suppression) : `INFORMATION NON FOURNIE — À CONFIRMER`.
- preuve d’application automatique des durées annoncées : `INFORMATION NON FOURNIE — À CONFIRMER`.

## 9. Impacts et liens inter-modules
### 9.1 Utilisateurs / RH
- Données utilisateurs mentionnées textuellement.
- Aucun workflow UI privacy vers gestion users observé.
- Statut : partiel.

### 9.2 Auth / Connexions
- Lien depuis `/login` vers `/privacy` observé.
- Données de connexion évoquées indirectement via sécurité/cookies.
- Statut : partiel.

### 9.3 Audit / Traçabilité
- Mention de journalisation des actions sensibles dans la page.
- Journaux réels existants dans d’autres modules (`PlanningAuditLog`, `LoginAuditLog`), sans pont direct depuis `/privacy`.
- Statut : partiel.

### 9.4 Support
- Contact support/information affiché (email/adresse).
- Processus support outillé depuis la page : `INFORMATION NON FOURNIE — À CONFIRMER`.
- Statut : partiel.

### 9.5 Export / Correction / Suppression de données
- Mention des droits présente.
- Fonctionnalité opérationnelle depuis la page non observée.
- Statut : à confirmer.

## 10. Écarts et risques méthodologiques
- Page existante et structurée, mais majoritairement statique.
- Risque de considérer la conformité RGPD comme acquise alors que les workflows opérationnels ne sont pas prouvés.
- Absence de preuve de liaison explicite entre mentions affichées et mécanismes applicatifs (export/correction/suppression).
- Absence de contextualisation multi-tenant (mentions génériques non paramétrées société).
- Dette documentaire : vocabulaire légal présent, mais granularité de preuve technique limitée.
- Dette code visible : pas d’API/privacy dédiée observée.
- Risque de mauvaise direction : transformer trop tôt cet audit en chantier juridique complet.

## 11. Ce qui semble à conserver
- La route `/privacy` existante et accessible.
- La structure claire en sections + sommaire.
- Le lien explicite depuis la page `/login`.
- Le contenu de base d’information utilisateur (éditeur, finalités, droits, contact).

## 12. Ce qui semble à corriger plus tard
- Harmoniser les textes d’information avec les capacités réellement implémentées et prouvées.
- Clarifier les mentions “conservation” avec des règles techniques démontrables.
- Corriger les incohérences de formulation si des flux RGPD réels diffèrent.

## 13. Ce qui semble à compléter plus tard
- Définir/brancher un mécanisme explicite de demande utilisateur (export, rectification, suppression) si attendu produit.
- Ajouter la traçabilité de traitement des demandes RGPD si ces flux sont implémentés.
- Documenter explicitement la responsabilité et le circuit support RGPD côté application.

## 14. Ce qui pourrait être supprimé ou simplifié plus tard
- Libellés trop génériques non alignés avec le périmètre réellement supporté : `À VALIDER AVANT ACTION`.
- Sections redondantes entre politique affichée et autres documents si doublons confirmés : `À VALIDER AVANT ACTION`.

## 15. Verdict d’audit page Privacy / Mentions d’information
Verdict : **incomplet**.

Justification :
- la page existe, est lisible et couvre un socle d’information utilisateur ;
- mais la preuve d’un lien opérationnel entre mentions affichées et droits RGPD exécutables dans le produit n’est pas établie ;
- la couverture multi-tenant et le rattachement à des flux applicatifs dédiés restent partiels ou à confirmer.

## 16. Prochaine étape recommandée
REBASAGE-38 — audit pages techniques / secondaires.
