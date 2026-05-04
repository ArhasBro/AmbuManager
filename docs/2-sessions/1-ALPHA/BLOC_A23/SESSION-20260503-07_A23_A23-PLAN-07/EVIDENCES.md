# EVIDENCES

Elements factuels utilises pendant la session.

---

## Sources utilisees

### Noyau documentaire obligatoire
- docs/1-master/DOCUMENT_MAITRE.md
- docs/1-master/PLAN_DE_DEVELOPPEMENT.md
- docs/3-templates/TEMPLATE_DEBUT_SESSION.md

### Documentation A23 utile
- docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-01_A23_A23-TEST-01/RESULTATS.md
- docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-03_A23_A23-USERS-03/RESULTATS.md
- docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-04_A23_A23-USERS-04/RESULTATS.md
- docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-06_A23_A23-UI-06/RESULTATS.md
- docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-07_A23_A23-PLAN-07/SESSION.md

### Code inspecte (planning)
- app/planning/page.tsx
- app/planning/planning-client.tsx
- app/planning/manual-planning-panel.tsx
- app/api/planning/shifts/route.ts
- app/api/planning/shifts/[id]/route.ts
- app/api/planning/shifts/[id]/assign/route.ts
- app/api/planning/shifts/[id]/cancel/route.ts
- lib/services/planning/assign-shift.ts
- lib/templates/template-api.ts
- prisma/schema.prisma
- prisma/seed.ts

---

## Commandes executees (preuves)

| Commande | Statut | Sortie / preuve | Commentaire |
|---|---|---|---|
| `git status --short` | OK | sortie vide | Worktree propre avant audit |
| `Get-Content -Raw docs/1-master/DOCUMENT_MAITRE.md` | OK | contenu lu | Lecture obligatoire |
| `Get-Content -Raw docs/1-master/PLAN_DE_DEVELOPPEMENT.md` | OK | contenu lu | Lecture obligatoire |
| `Get-Content -Raw docs/3-templates/TEMPLATE_DEBUT_SESSION.md` | OK | contenu lu | Base ouverture session |
| `npm run dev` | OK | `Local: http://localhost:3000` | Serveur local pour audit |
| `$env:DATABASE_URL='postgresql://admin:admin123@localhost:5432/ambulance_db?schema=public'; node .codex-temp/a23-plan07-audit.mjs` | OK | JSON complet flux planning (sortie brute) | Preuve terminale brute (annexe) |
| `Get-Content ... | Select-String` (fichiers planning) | OK | lignes references extraites | Preuves code line-level |
| `Stop-Process ...` + check `localhost:3000` | OK | serveur inaccessible ensuite | Arret propre environnement |

---

## Preuve execution principale

Annexe documentaire brute :
- `docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-07_A23_A23-PLAN-07/ANNEXE_PREUVE_BRUTE_NODE.md`

Clarification de nom de script :
- script reel present dans le depot : `.codex-temp/a23-plan07-audit.mjs` ;
- cette session utilise uniquement cette commande pour la preuve terminale brute.

Elements extraits :
- `planning_status=200`
- `planning_has_manual_label=true`
- `template_cross_midnight = AMB Nuit 16:00-00:00`
- `create_status=201`
- `assign_status=400`
- `assign_ok=false`
- `assign_payload={}`
- `shift_before_cancel.userId=null`
- `shift_before_cancel.user2Id=null`
- `shift_before_cancel.user=null`
- `shift_before_cancel.user2=null`
- `edit_status=200`
- `cancel_status=200`
- `shift_after_cancel.isCancelled=true`
- `db_shift_record` present avec meme `id`

---

## Informations non demontrees

- Validation ergonomique UI fine sur navigateur interactif (selection template avec capture avant/apres dans le formulaire manuel) :

INFORMATION NON FOURNIE — À CONFIRMER

- Test affectation base/depot en contexte de depot actif (`depots_count=0` sur ce dataset) :

INFORMATION NON FOURNIE — À CONFIRMER
