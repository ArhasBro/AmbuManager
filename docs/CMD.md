# CMD — Mémo historique / brouillon opérationnel

> Document informatif uniquement.
>
> Ce fichier peut contenir des commandes, notes, prompts ou règles anciennes.
> Il ne constitue pas une source de vérité de gouvernance.
> Avant toute décision, se référer aux documents maîtres et au protocole de session.
> A NE PAS SUPPRIMER

---

tree .\docs /F /A | Out-File -FilePath .\docs\STRUCTURE_DOCS.md -Encoding utf8
tree /F /A | Out-File -FilePath .\docs\1-master\STRUCTURE_PROJET.md -Encoding utf8
git add .
git commit -m "update"
git push

git status
git diff -- <fichiers_modifiés>

# GPT
--------------------------

------------------------------------

git apply --check ".\"
git apply ".\"
npx prisma generate
npx prisma validate
npm run lint
npm run build

# Git
git fetch --all --prune
git log --oneline -n 20
git apply --check ".\"
git apply ".\"
git apply -p1 --check docs/patches/general/PATCH_GLOBAL.diff
git apply -p1 docs/patches/general/PATCH_GLOBAL.diff
git apply -p1 --reject docs/patches/general/PATCH_GLOBAL.diff

# Node / Next
npm install
npm run dev
npm run lint
npm run build

# Prisma
npx prisma generate
npx prisma validate
npm run db:migrate
npm run db:seed
npm run db:reset
npm run db:studio

# Identifiants

Identifiants: 

Admin
admin@ambulance.local
admin123

Planner 
planner@ambulance.local
user123

Viewer
viewer@ambulance.local
user123

REBASAGE-01 — Audit global repo/docs
REBASAGE-01-BIS — Complément audit ciblé
REBASAGE-02 — Clarification docs racine + gouvernance
REBASAGE-03 — Classification documentaire détaillée
REBASAGE-04 — Audit des templates de session docs/3-TEMPLATES
REBASAGE-05 — Correction / mise à jour des templates si nécessaire
REBASAGE-06 — Matrice canonique Page -> PNG -> référence UI/UX -> route -> fichier app
REBASAGE-07 — Audit encodage ciblé avec preuves fichier par fichier
REBASAGE-08 — Correction encodage ciblée V1
REBASAGE-09 — Décision STRUCTURE_DOCS.md / STRUCTURE_PROJET.md
REBASAGE-10 — Index consolidé docs/1-MASTER
REBASAGE-11 — Index sessions historiques par bloc
REBASAGE-12 — Préparation du futur nettoyage/reclassement