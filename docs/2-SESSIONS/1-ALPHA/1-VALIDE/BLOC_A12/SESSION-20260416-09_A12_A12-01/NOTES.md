# NOTES

## Méthode / observations

### Méthode suivie
- relecture du cadrage produit A12, en particulier `MODULE 15` et `MODULE 16` ;
- relecture du plan A12 ;
- contrôle du code réel sur les pages, composants et routes explicitement demandés ;
- recherche ciblée de preuves réelles d’import, d’export, d’impression et d’onboarding ;
- requalification documentaire de la session à partir du code réel, sans élargissement de scope.

### Observations majeures

1. **Le bloc A12 n’est pas vide côté onboarding manuel.**  
   Le dépôt contient déjà plusieurs briques exploitables :
   - profil société ;
   - dépôts ;
   - utilisateurs ;
   - affectation utilisateur ↔ dépôt ;
   - reset mot de passe ;
   - indisponibilités utilisateur ;
   - véhicules ;
   - affectation véhicule ↔ dépôt ;
   - templates.

2. **Il n’existe pas de module onboarding dédié.**  
   L’onboarding actuel repose sur un ensemble de modules d’administration dispersés, orientés depuis le dashboard, et non sur un parcours autonome centralisé ou guidé.

3. **Le dashboard joue un rôle d’orientation réel, mais pas de wizard.**  
   Il expose les liens vers `/company`, `/depots`, `/users`, `/vehicles`, `/templates` selon les droits réellement détectés, mais il ne fournit ni checklist d’onboarding, ni état d’avancement, ni validation de complétude.

4. **Aucun import initial n’a été trouvé.**  
   Aucun dossier, aucune route, aucun composant, aucun parsing `CSV` / `XLSX`, aucun aperçu avant import, aucune validation manuelle et aucun rapport d’erreurs d’import n’ont été trouvés dans le dépôt.

5. **Aucun export planning ni impression simple n’a été trouvé.**  
   La permission `PLANNING_EXPORT` existe au catalogue, mais aucune route, aucun bouton, aucun téléchargement, aucune génération `PDF` / `CSV` / `XLSX` et aucun `window.print()` n’ont été trouvés.

6. **Le besoin import initial reste justifié, mais non bloquant à court terme.**  
   Le manuel permet déjà une mise en place partielle d’une société pilote, mais les imports restent utiles pour accélérer le chargement initial de données et éviter une saisie répétitive.

7. **Risque documentaire principal : sur-promettre l’existant.**  
   Le dépôt permet une administration manuelle réelle, mais pas encore un bloc A12 livré au sens large. Il faut éviter de présenter :
   - les modules admin existants comme un onboarding manuel “complet” ;
   - la permission `PLANNING_EXPORT` comme une preuve d’export ;
   - les intitulés de sessions A12 futures comme une preuve de livraison ;
   - le cadrage / le plan comme une preuve de présence effective dans le code.

## Commandes / validations

Aucune validation terminale applicative n’a été relancée dans cette session d’audit.  
Aucun `git apply`, `prisma validate`, `prisma generate`, `lint` ou `build` n’a été exécuté dans la présente session.
