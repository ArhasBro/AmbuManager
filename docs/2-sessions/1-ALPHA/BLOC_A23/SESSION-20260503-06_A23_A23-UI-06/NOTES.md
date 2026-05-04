# NOTES

## Methode reelle
1. Lecture documentaire minimale obligatoire:
   - `docs/1-master/DOCUMENT_MAITRE.md`
   - `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
   - `docs/3-templates/TEMPLATE_DEBUT_SESSION.md`
2. Lecture ciblee maquettes et etat avant correction:
   - `docs/1-master/MAQUETTE/README_MAQUETTES_A23.md` (INFORMATION NON FOURNIE — À CONFIRMER si absent)
   - PNG maquettes de `docs/1-master/MAQUETTE/`
   - captures avant: `docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-05_A23_A23-UI-05/CAPTURES/`
   - documents finaux A23-UI-05
3. Corrections code UI ciblees (sans changement metier/backend non necessaire).
4. Production d'un correctif separe `FIX-01` sans regeneration du patch principal.
5. Revalidation technique et regeneration des captures apres.
6. Mise a jour documentaire et generation du ZIP final.

## Matrice prealable obligatoire (avant correction)

| Page | Maquette attendue | Capture avant | Ecart visuel constate | Correction prevue | Fichier(s) code concernes |
|---|---|---|---|---|---|
| /login | `docs/1-master/MAQUETTE/.../1-Login/Login_V1.1.png` | `docs/2-sessions/1-ALPHA/BLOC_A23/SESSION-20260503-05_A23_A23-UI-05/CAPTURES/login.png` | Capture invalide en post-correction precedente (affichage `Chargement...`), preuve ecran login non conforme. | Retirer blocage loading, forcer rendu ecran login complet. | `app/login/page.tsx` |
| /dashboard | `docs/1-master/MAQUETTE/.../1-Dashboard/Dashboard_V1.png` | `.../CAPTURES/dashboard.png` | Ecart mineur shell/densite. | Maintenir alignement shell global. | `app/globals.css` |
| /users | `docs/1-master/MAQUETTE/.../3-Utilisateurs-RH/Utilisateurs-RH_V1.png` | `.../CAPTURES/users.png` | Page verticale CRUD lourde, absence de vrai panneau lateral maquette. | Mettre table + panneau lateral, compacter operations avancees. | `app/users/page.tsx`, `app/users/users-list-client.tsx`, `app/users/users-client-shared.ts`, `app/users/users-side-panel-client.tsx`, `app/globals.css` |
| /vehicles | `docs/1-master/MAQUETTE/.../4-Vehicules/Vehicules_V1.2.png` | `.../CAPTURES/vehicles.png` | Ecart mineur densite/rythme. | Stabilisation shell/styles. | `app/globals.css` |
| /templates | `docs/1-master/MAQUETTE/.../1-Templates/Templates_V1.1.png` | `.../CAPTURES/templates.png` | Ecart mineur densite. | Stabilisation shell/styles. | `app/globals.css` |
| /company | `docs/1-master/MAQUETTE/.../2-Societe-parametres-metier/Societe_V1.0.png` | `.../CAPTURES/company.png` | Densite massive, blocs de preuve trop visibles, structure non compacte. | Table compacte + rail resume + mode expert replie. | `app/company/page.tsx`, `app/company/company-rules-panel.tsx`, `app/globals.css` |
| /depots | `docs/1-master/MAQUETTE/.../3-Depots-bases/Depots-bases_V1.0.png` | `.../CAPTURES/depots.png` | Ecart mineur. | Stabilisation shell/styles. | `app/globals.css` |
| /planning | `docs/1-master/MAQUETTE/.../2-Planning/Planning_V1.2.png` | `.../CAPTURES/planning.png` | Preuve insuffisante de grille cible, zone manuelle dominante. | Afficher grille operationnelle, replier manuel avance. | `app/planning/page.tsx`, `app/planning/planning-client.tsx`, `app/globals.css` |
| /audit | `docs/1-master/MAQUETTE/.../5-Audit/Audit_V1.0.png` | `.../CAPTURES/audit.png` | Manque d'organisation tableau + detail/drawer conforme. | Construire layout tableau gauche + drawer detail droite. | `app/audit/audit-client.tsx`, `app/globals.css` |
| /onboarding | `docs/1-master/MAQUETTE/.../4-Onboarding/Onboarding_V1.2.png` | `.../CAPTURES/onboarding.png` | Ecart mineur densite. | Stabilisation shell/styles. | `app/globals.css` |
| /privacy | `docs/1-master/MAQUETTE/.../2-Privacy/Privacy_V1.0.png` | `.../CAPTURES/privacy.png` | Structure visuelle eloignee de la maquette prioritaire. | Recomposer page (sommaire + cartes compactes + footer). | `app/privacy/page.tsx`, `app/app-shell.tsx`, `app/globals.css` |
