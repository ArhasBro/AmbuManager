# NOTES

## Méthode / observations

### 1. Sources relues avant audit
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

### 2. Axe réel de l’audit
L’audit a été conduit selon la règle `CODE > DOCUMENTATION`, sans correction de code, avec vérification prioritaire des routes et services listés dans l’ouverture officielle de session.

### 3. Observations structurantes

#### Génération DAY / WEEK
- Les routes `POST /api/planning/autoschedule/day` et `POST /api/planning/autoschedule/week` existent réellement.
- Elles créent un `AutoScheduleRun` en statut `DRAFT` puis des `DraftShift` à partir des templates actifs, non archivés et à horaires définis.
- La génération n’affecte pas automatiquement des utilisateurs ou des véhicules à ce stade.

#### Accès depuis le planning
- La page `app/planning/page.tsx` calcule réellement `canAutoSchedule` côté serveur.
- `app/planning/planning-client.tsx` affiche des boutons autoschedule réels : `Générer cette semaine`, `Générer ce jour`, `Simuler auto-assign`, `Appliquer auto-assign`, `Publier le brouillon`, `Annuler le brouillon`.

#### Choix « shifts seuls / avec affectation automatique »
- Le produit permet bien une génération de brouillon seule.
- Il permet ensuite une simulation puis une application d’auto-assign.
- En revanche, cette auto-assign porte sur les utilisateurs du `DraftShift`, pas sur les véhicules ; elle n’est donc pas équivalente à une génération complète « employés + véhicules » telle que cadrée.

#### Contraintes réellement prises en compte
- Templates actifs : oui, directement à la génération DAY / WEEK.
- Rôles requis : oui, dans `matching.service.ts` via `requiredRole`, `secondaryAllowedRoles` et `minStaffCount`.
- Indisponibilités utilisateurs : oui dans le matching, et oui au publish pour les drafts déjà affectés.
- Repos minimum : oui au publish via `loadMinRestCompanyRule` et `computeMinRestWarnings`.
- Indisponibilités véhicules : seulement partiellement, via les conflits de chevauchement véhicule au publish et en affectation manuelle ; aucune logique moteur explicite de disponibilité / statut véhicule n’a été prouvée dans le matching autoschedule.
- Contraintes de rôles sur véhicules : non prouvées dans le moteur autoschedule ; le catalogue société les marque encore comme `PREPARED`, pas `BRANCHED`.

#### Signalements métier et traduction
- Le système produit des codes et messages utiles : `USER_ABSENCE_CONFLICT`, `CONFLICT_USER`, `CONFLICT_VEHICLE`, `MIN_REST_BLOCKED`, score qualité, logs d’audit du run.
- La lisibilité reste partielle car plusieurs messages UI exposent encore des codes bruts (`MATCHED`, `NO_REQUIRED_ROLE`, `USER_CONFLICT`, `run.status=...`) et les résumés d’audit sont majoritairement en anglais (`Autoschedule run published`, `Autoschedule matching applied`, etc.).

### 4. Conclusion de travail
Le bloc A9 n’est pas vide ni purement préparatoire : il existe un autoschedule exploitable en brouillon, publication, annulation et auto-affectation utilisateur. Mais l’ensemble reste incomplet au regard du cadrage officiel A9, surtout sur l’axe véhicule, sur le mode « avec affectation automatique employés + véhicules » et sur la qualité finale des signalements / libellés français.
