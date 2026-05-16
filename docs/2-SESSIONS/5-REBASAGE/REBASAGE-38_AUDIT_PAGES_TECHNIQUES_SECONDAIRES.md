# REBASAGE-38 — Audit pages techniques / secondaires

## 1. Objet du document
Ce document audite l’état réel des pages techniques / secondaires dans le cadre du rebasage global Alpha.

Il ne remplace pas les audits détaillés des grandes pages métier déjà réalisés.

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
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE_GLOBAL_ALPHA.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-23_CARTOGRAPHIE_GLOBALE_PROJET.md`
- `docs/2-SESSIONS/5-REBASAGE/REBASAGE-24_MATRICE_PAGE_FONCTIONNALITES_CODE_DOCUMENTATION_MAQUETTE.md`
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

### Code
- `app/page.tsx`
- `app/layout.tsx`
- `app/app-shell.tsx`
- `app/dashboard/page.tsx`
- `app/login/page.tsx`
- `app/api/health/prisma/route.ts`
- inventaire structurel `app/**/*.tsx`

## 4. Pages / routes secondaires identifiées
| Route | Fichier | Rôle constaté | Accès connu | Reliée navigation | Statut | Commentaire |
|---|---|---|---|---|---|---|
| `/` | `app/page.tsx` | Redirection technique vers `/dashboard` ou `/login` selon session | oui | non (route d’entrée) | utile | Point d’entrée applicatif, non métier. |
| `/api/health/prisma` | `app/api/health/prisma/route.ts` | Vérification technique Prisma (compteurs simples) | partiel | non | utile | Route API technique, pas une page UI. |

Autres pages secondaires applicatives non trouvées explicitement dans `app/` :
`INFORMATION NON FOURNIE — À CONFIRMER`.

## 5. Pages déjà auditées à exclure de cette session
- `/login`
- `/dashboard`
- `/planning`
- `/users`
- `/vehicles`
- `/templates`
- `/company`
- `/depots`
- `/onboarding`
- `/audit`
- `/privacy`

## 6. Pages orphelines ou non reliées à la navigation
| Page | Preuve d’existence | Preuve d’accès | Risque | Statut |
|---|---|---|---|---|
| `/` | `app/page.tsx` | accès direct URL racine | faible | utile |
| `/privacy` | `app/privacy/page.tsx` | lien depuis `/login` prouvé, entrée shell non prouvée | modéré (visibilité partielle) | à confirmer |
| `/api/health/prisma` | `app/api/health/prisma/route.ts` | accès applicatif indirect non prouvé | faible | à confirmer |

## 7. Pages techniques / fallback / erreur
| Type | Présence code | Rôle réel | Statut | Commentaire |
|---|---|---|---|---|
| `error.tsx` | NON TROUVÉ | INFORMATION NON FOURNIE — À CONFIRMER | à confirmer | Aucun fichier détecté dans `app/`. |
| `not-found.tsx` | NON TROUVÉ | INFORMATION NON FOURNIE — À CONFIRMER | à confirmer | Aucun fichier détecté dans `app/`. |
| `loading.tsx` | NON TROUVÉ | INFORMATION NON FOURNIE — À CONFIRMER | à confirmer | Aucun fichier détecté dans `app/`. |
| `unauthorized` / `forbidden` page dédiée | NON TROUVÉ | INFORMATION NON FOURNIE — À CONFIRMER | à confirmer | Gestion observée surtout côté API/redirect. |
| redirection racine | OUI (`app/page.tsx`) | Redirection session-aware | utile | Technique maîtrisée et claire. |

## 8. Pages temporaires / test / debug / démo
Aucune page `test/debug/demo` explicite trouvée dans `app/` (en tant que route `page.tsx` dédiée).

Route technique détectée :
- `/api/health/prisma` : usage de supervision interne plausible ; statut `À VALIDER AVANT ACTION` pour toute décision de conservation/masquage future.

## 9. Cohérence navigation / accès
- Accès shell prouvé vers : `/dashboard`, `/planning`, `/users`, `/vehicles`, `/templates`, `/company`, `/depots`, `/onboarding`, `/audit` (selon permissions/session).
- `/login` est route publique explicitement gérée (`PUBLIC_ROUTES` dans `app/app-shell.tsx`).
- `/privacy` : accessible par URL directe et lien prouvé depuis `/login`, mais non intégré dans la navigation shell observée.
- `/` : route technique de redirection, accessible par URL directe.
- Pages accessibles uniquement URL directe (preuve actuelle) : `/privacy` (hors login), `/` technique.

## 10. Écarts et risques méthodologiques
- Faible volume de pages secondaires réellement présentes : risque de surestimer un “sous-système secondaire” qui n’existe pas.
- Absence de pages fallback dédiées (`error/not-found/loading`) : risque UX en cas d’erreur non couverte.
- `/privacy` non visible dans le shell : risque de découvrabilité limitée hors parcours login.
- Dette documentaire légère sur les routes techniques non UI (`/api/health/prisma`).
- Élément à ne pas supprimer sans validation : toute route technique de redirection/santé.

## 11. Ce qui semble à conserver
- `app/page.tsx` (redirection racine claire).
- `app/app-shell.tsx` + logique `PUBLIC_ROUTES` pour séparation login/shell.
- `/api/health/prisma` comme point technique, sous réserve de gouvernance d’exposition.

## 12. Ce qui semble à corriger plus tard
- Clarifier la stratégie UX pour pages fallback (`error/not-found/loading`) si attendues produit.
- Clarifier la place de `/privacy` dans la navigation globale (si exigence de visibilité permanente).

## 13. Ce qui semble à compléter plus tard
- Ajouter une preuve explicite de politique d’accès pour routes techniques secondaires.
- Compléter la cartographie “page secondaire vs accès utilisateur réel” par tests runtime contrôlés.

## 14. Ce qui pourrait être supprimé, archivé ou simplifié plus tard
- `/api/health/prisma` : candidat à restreindre/masquer selon politique d’exploitation ; `À VALIDER AVANT ACTION`.
- Routes secondaires non reliées et non utilisées (si découvertes ultérieures) : `À VALIDER AVANT ACTION`.

## 15. Synthèse globale des pages secondaires
- Nombre de pages secondaires identifiées : 2 (dont 1 route UI technique `/`, 1 route API technique `/api/health/prisma`).
- Pages utiles : 2.
- Pages à confirmer : 1 (`/api/health/prisma` pour mode d’exposition exact).
- Pages potentiellement orphelines : 1 (`/privacy` dans le shell global, hors lien login).
- Pages potentiellement obsolètes : aucune preuve directe.
- Pages méritant un audit dédié : aucune page UI secondaire supplémentaire prouvée à ce stade.

## 16. Verdict d’audit pages techniques / secondaires
Verdict : **incomplet**.

Justification :
- l’inventaire secondaire est clair mais très limité ;
- plusieurs éléments techniques utiles sont présents, mais les pages fallback dédiées ne sont pas prouvées ;
- la couverture “secondaire” reste partielle tant que l’accessibilité runtime et la gouvernance des routes techniques ne sont pas validées.

## 17. Prochaine étape recommandée
REBASAGE-39 — consolidation de l’inventaire des pages et statuts après audits page par page.
