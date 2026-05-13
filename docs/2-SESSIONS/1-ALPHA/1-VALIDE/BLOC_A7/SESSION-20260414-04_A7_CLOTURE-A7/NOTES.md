# NOTES

## Méthode / observations

Méthode appliquée :
1. relecture des documents maîtres obligatoires et du protocole
2. contrôle du code réel A7 uniquement sur le périmètre demandé
3. comparaison avec les patchs réels et la documentation réelle A7
4. vérification de la preuve disponible sur les validations terminales
5. décision finale `NO_PATCH` ou correctif minimal selon résiduel strict prouvé

Principes appliqués :
- `CODE > DOCUMENTATION`
- pas de rejeu des sessions précédentes comme travail de production
- pas d’élargissement hors dashboard ALPHA
- pas de refonte UI globale
- pas d’analytics avancées
- documentation finale hors patch code

Observations déterminantes :
- `app/page.tsx` fait de `/dashboard` l’entrée authentifiée réelle.
- `app/login/page.tsx` conserve `/dashboard` comme redirection interne sûre par défaut.
- `app/dashboard/page.tsx` consomme désormais les helpers de permissions utiles au portail réel.
- le lien planning n’est publié que si `companyId` existe et si `PLANNING_VIEW_SELF` ou `PLANNING_VIEW_GLOBAL` sont réellement accordées.
- les liens `/company`, `/depots`, `/users`, `/vehicles`, `/templates` sont alignés avec les gardes observées sur les pages cibles.
- la différenciation par rôle est matérialisée par :
  - résumé de profil
  - `Vue terrain`
  - `Vue admin / gérance`
  - message explicite si la session n’a pas de société
  - message explicite si aucun module n’est exploitable
- les indicateurs restent limités à 4 compteurs stables (`user`, `vehicle`, `depot`, `shiftTemplate`) pour `ADMIN` / `GERANT` avec `companyId`.
- aucun reporting riche ni calcul analytique dépendant du planning n’est exposé.
- le patch du lot `DASH-02` à `DASH-07` est déjà intégré dans le code courant :
  - `git apply --check` échoue car le patch est déjà appliqué
  - `git apply --reverse --check` réussit
- l’environnement ZIP fourni ne contient pas `node_modules` :
  - `npm run lint` ne peut pas re-prouver `OK`
  - `npm run build` ne peut pas re-prouver `OK`
  - cela limite le rejeu local, sans prouver un résiduel dashboard

Conclusion de travail :
- aucun écart final strict ne justifie un patch code supplémentaire
- la fermeture du bloc A7 peut être prononcée avec `NO_PATCH`
- la documentation de clôture doit expliciter la limite de rejeu local des validations applicatives
