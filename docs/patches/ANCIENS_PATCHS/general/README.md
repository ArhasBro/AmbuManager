# Patches généraux — Historique

Ce dossier contient les patchs généraux appliqués hors logique stricte "1 session = 1 patch de phase".

## Règles

- Les patchs de ce dossier sont à appliquer depuis la racine du projet.
- Vérification recommandée avant application :

```bash
git apply -p1 --check docs/patches/general/NOM_DU_PATCH.diff
```

- Application :

```bash
git apply -p1 docs/patches/general/NOM_DU_PATCH.diff
```

## Historique des patchs

### PATCH_1_CORE_SECURITE.diff
- Objectif : corriger les points cœur sécurité / auth / compatibilité API.
- Fichiers principaux : `lib/auth.ts`, `lib/api/response.ts`, `app/login/page.tsx`, `app/dashboard/page.tsx`, `app/vehicles/*`, `app/api/health/prisma/route.ts`, `types/next-auth.d.ts`, `prisma/schema.prisma`, `package.json`.
- Résultat : suppression du fallback ADMIN, erreurs 500 moins bavardes, login plus propre, véhicules alignés sur le contrat API.
- Statut : APPLIQUÉ

### PATCH_2_PERMISSIONS_MIDDLEWARE.diff
- Objectif : centraliser les permissions autoschedule et activer correctement le proxy Next.
- Fichiers principaux : `lib/permissions.ts`, `app/api/planning/autoschedule/runs/[id]/match/*`, `proxy.ts`.
- Résultat : suppression de la dépendance à `session.user.permissions` non alimenté, contrôles centralisés, proxy actif.
- Statut : APPLIQUÉ

### PATCH_3B_DOCS_COMPAT.diff
- Objectif : remettre la documentation et les templates en cohérence avec l'état réel du dépôt.
- Fichiers principaux : `docs/STRUCTURE_DOCS.md`, `docs/patches/README.md`, `docs/patches/general/README.md`, `docs/patches/4.4/README.md`, `docs/patches/4.7/README.md`, `docs/sessions/SESSION-20260305-02/SESSION.md`, `docs/sessions/SESSION-YYYYMMDD-XX/SESSION.md`.
- Résultat : docs manquantes recréées, templates réparés, structure plus lisible pour reprise IA.
- Statut : APPLIQUÉ

### PATCH_4_TECHNIQUE_FINAL.diff
- Objectif : finaliser les points techniques restants identifiés à l'audit.
- Fichiers principaux : `app/api/planning/autoschedule/runs/route.ts`, `lib/permissions.ts`, `prisma/seed.ts`, `prisma/test-login.ts`, routes App Router restantes.
- Résultat : pagination stabilisée, permissions corrigées, seed et test-login sécurisés.
- Statut : APPLIQUÉ

### PATCH_5A_ROUTE_ONLY.diff
- Objectif : corriger la publication autoschedule sans dépendre du README général.
- Fichier principal : `app/api/planning/autoschedule/runs/[id]/publish/route.ts`.
- Résultat : prise en compte de `user2Id`, contrôles de conflits sur les deux slots employés, contrôles de repos minimum sur les deux slots, publication finale avec conservation de `user2Id`.
- Statut : APPLIQUÉ

### PATCH_5B_README_COMPAT.diff
- Objectif : documenter proprement les patchs généraux déjà réalisés dans un README compatible avec le dépôt actuel.
- Fichier principal : `docs/patches/general/README.md`.
- Résultat : historique lisible des patchs 1, 2, 3B, 4 et 5.
- Statut : APPLIQUÉ

## Remarque
