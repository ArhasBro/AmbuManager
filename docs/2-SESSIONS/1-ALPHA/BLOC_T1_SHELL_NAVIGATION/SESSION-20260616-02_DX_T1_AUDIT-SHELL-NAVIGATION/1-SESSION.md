# 1 - Session

## 1. Identification

- Session : SESSION-20260616-02_DX_T1_AUDIT-SHELL-NAVIGATION
- Date : 16/06/2026
- Phase : 1-ALPHA
- Bloc : T1
- Type : DX
- Intitule : Audit shell navigation

## 2. Contexte

Projet : Ambulance Manager

Cette session DX audite le shell global, la navigation connectee, le contexte utilisateur/societe, les acces visibles selon droits, les libelles, les routes et l'etat Acces refuse. Elle prepare le decoupage fin des futures sessions CX du bloc T1 sans modifier le code applicatif.

## 3. Objectif unique

Produire un audit exploitable du bloc T1 permettant de decider les prochaines sessions courtes de correction, completion, creation, renommage, validation ou cloture.

## 4. Perimetre autorise

Lecture :

- documents MASTER `01` a `05`, avec focus `04` et `05`;
- session precedente `SESSION-20260616-01_DX_T7_AUDIT-GLOBAL-REPRISE`;
- references UI/UX Shell, Dashboard, Login, permissions, Acces refuse si presentes;
- references fonctionnelles Shell, Login, Dashboard, Utilisateurs/RH, Audit, Privacy/RGPD si utiles;
- maquettes Shell, Login, Dashboard et navigation;
- Base44 en reference prototype uniquement;
- code officiel en lecture seule : `app/`, `lib/`, `types/`, `prisma/`, `package.json`, configuration utile.

Ecriture :

- uniquement ce dossier de session T1;
- `1-SESSION.md`;
- `2-PREUVES.md`;
- `3-FIN_DE_SESSION.md`;
- `PATCH/NO_PATCH.md`;
- `PATCH/README_PATCH.md`.

## 5. Perimetre interdit

- code applicatif;
- `app/`;
- `src/`;
- `lib/`;
- `prisma/`;
- `package.json`;
- `package-lock.json`;
- fichiers Base44;
- PNG et maquettes;
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`;
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`;
- templates;
- `create_session.ps1`;
- session FIX;
- patch applicatif `.diff`.

## 6. Livrables attendus

- cartographie shell/navigation du repo officiel;
- matrice routes/libelles;
- analyse utilisateur courant et societe courante;
- analyse RBAC visible et acces directs;
- comparaison Base44 utile;
- liste des ecarts T1;
- proposition de decoupage futur T1;
- recommandation de prochaine session;
- preuves, limites et controles.

## 7. Regles de preuve

Toute information non prouvee est marquee :

INFORMATION NON FOURNIE — À CONFIRMER

## 8. Patch

Session DX sans patch applicatif. Le dossier `PATCH/` contient uniquement la justification d'absence de patch.

## 9. Complement documentaire post-audit

Après contrôle intermédiaire, la session est complétée par une mise à jour ciblée de `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md` pour remplacer le placeholder des CX prévisionnelles T1 par le découpage issu de l'audit.

Cette mise à jour ne valide pas la session. Elle prépare le contrôle final ChatGPT.
