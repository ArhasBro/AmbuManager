# SESSION

## ID SESSION

SESSION-20260414-02_A7_DASH-LOT-02-07

## Date

15/04/2026

## Contexte

Projet : Investissement  
Sous-projet : Ambulance Manager  
Maturité : 1-ALPHA  
Bloc : A7 — Dashboard  
Type : LOT CORRECTION + COMPLÉTION  
Intitulé : Correction et complétion du dashboard ALPHA sur le périmètre cumulé `DASH-02` à `DASH-07`

## Objectif de la session

Corriger les écarts strictement prouvés du dashboard existant puis livrer une base dashboard ALPHA conforme au cadrage officiel sur le périmètre cumulé suivant :
- `DASH-02` — correction du dashboard actuel si nécessaire ;
- `DASH-03` — dashboard portail d’accueil ;
- `DASH-04` — gestion d’accès aux modules selon permissions ;
- `DASH-05` — dashboard différencié par rôle ;
- `DASH-06` — indicateurs simples admin / gérant si les données sont stables ;
- `DASH-07` — vue dashboard terrain selon permissions.

## Périmètre exact traité

### Code réellement modifié
- `app/dashboard/page.tsx`
- `app/page.tsx`
- `lib/permissions.ts`

### Code réellement contrôlé pour justifier les liens
- `app/login/page.tsx`
- `app/planning/page.tsx`
- `app/company/page.tsx`
- `app/depots/page.tsx`
- `app/users/page.tsx`
- `app/vehicles/page.tsx`
- `app/templates/page.tsx`
- `lib/permission-catalog.ts`

### Documentation relue avant travail
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`

## Résultat synthétique de session

Le dashboard a été transformé en **portail d’accueil ALPHA réellement orienté par accès**, avec :
- redirection racine contextualisée vers `/dashboard` quand une session existe ;
- filtrage réel du lien planning selon les permissions réellement nécessaires à la page cible ;
- vue terrain distincte, simple et non analytique ;
- vue admin / gérance structurée par permission d’entrée dashboard admin puis par permissions / rôles réellement consommés par les pages cibles ;
- indicateurs simples limités aux données stables déjà présentes dans Prisma (`users`, `vehicles`, `depots`, `shiftTemplates`) pour les comptes natifs `ADMIN` / `GERANT` ;
- traitement propre des sessions sans `companyId` pour éviter les liens morts.

## Dossiers liés

- Session : `docs/2-sessions/1-ALPHA/BLOC_A7/SESSION-20260414-02_A7_DASH-LOT-02-07`
- Patchs  : `docs/3-patches/1-ALPHA/BLOC_A7/SESSION-20260414-02_A7_DASH-LOT-02-07`
