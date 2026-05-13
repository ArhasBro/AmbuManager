# RESULTATS

## 1. Analyse rapide

Le planning manuel existant est **PARTIELLEMENT exploitable**.

Il fournit déjà :
- une vraie consultation semaine ;
- une sélection utilisateur quand la vue globale est autorisée ;
- une présentation métier lisible des shifts ;
- une modification partielle des affectations sur shift publié ;
- une traçabilité minimale existante.

Il ne fournit pas encore :
- une vraie vue jour en UI ;
- une vue mois ;
- une navigation mensuelle ;
- une création manuelle de shift publié ;
- une suppression métier / annulation logique d’un shift publié ;
- un historique planning général réellement séparé du support autoschedule.

## 2. Périmètre réellement contrôlé

### Documentation
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`

### Code
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/planning-audit.ts`
- `lib/types/planning.ts`
- `prisma/schema.prisma`

### Consultation ponctuelle hors périmètre A8 strict, uniquement pour comprendre le mélange réel exposé par l’écran
- `app/api/planning/autoschedule/runs/[id]/route.ts`

## 3. État réel du planning manuel existant

### 3.1 Vue semaine : OUI
La page `/planning` repose sur une semaine glissante de 7 jours avec navigation précédente / actuelle / suivante et rendu en 7 colonnes.

### 3.2 Vue jour : PARTIEL
Une capacité API existe via le paramètre `day`, mais aucune vraie vue jour dédiée n’est exposée dans l’UI actuelle. Le produit visible reste une vue semaine.

### 3.3 Vue mois : NON
Aucune vue mois n’a été trouvée en UI ni en API sur le périmètre contrôlé.

### 3.4 Navigation mensuelle : NON
Aucune navigation par mois n’existe. Les seuls contrôles de navigation portent sur la semaine.

### 3.5 Lisibilité métier globale : PARTIEL
Points positifs :
- cartes lisibles ;
- horaires visibles ;
- personnel / véhicule / base / mission affichés ;
- deux modes de lecture (`Simple` / `Ambulance`) ;
- regroupement par jour.

Limites prouvées :
- la consultation est centrée sur un utilisateur sélectionné, pas sur une vraie grille opérationnelle globale ;
- l’écran mélange le manuel et plusieurs commandes autoschedule, ce qui brouille le périmètre ;
- absence de vraie bascule jour / semaine / mois.

### 3.6 Ajout manuel de shift publié : NON
Aucune route de création manuelle de `Shift` publié ni aucun formulaire d’ajout manuel n’ont été trouvés. Les créations visibles passent par la génération de brouillons autoschedule puis par publication, ce qui n’est pas un ajout manuel au sens du bloc A8.

### 3.7 Modification de shift publié : PARTIEL
La modification existe pour les affectations d’un shift publié :
- employé 1 ;
- employé 2 ;
- véhicule ;
- base.

Elle n’existe pas réellement, sur le périmètre contrôlé, pour :
- date ;
- horaires ;
- template ;
- notes ;
- annulation structurelle du shift.

### 3.8 Suppression métier / annulation logique d’un shift publié : NON
Aucune route ni aucun champ métier prouvant une annulation logique ou une suppression métier d’un `Shift` publié n’ont été trouvés. L’annulation visible concerne uniquement les runs autoschedule en brouillon.

### 3.9 Historique minimal planning : PARTIEL
Un bloc `Historique du run courant` existe et peut afficher des logs d’audit. Cet historique reste toutefois :
- conditionné à l’existence d’un `lastRunId` ;
- attaché au run courant ;
- limité à 20 lignes ;
- mélangé au support autoschedule.

Il ne constitue donc pas encore un historique planning manuel global réellement exploitable.

### 3.10 Traçabilité après publication : PARTIEL
La traçabilité minimale existe réellement :
- modèle Prisma dédié ;
- helper d’écriture ;
- log d’audit lors des modifications d’affectation sur shift publié ;
- payload `previous` / `next`.

Mais la consultation visible dans `/planning` reste centrée sur l’audit d’un run, pas sur une traçabilité générale et autonome de toutes les modifications après publication.

## 4. Résiduel / écarts strictement prouvés

### Écart 1 — La vraie vue jour UI n’est pas livrée
Le backend accepte `day`, mais l’écran charge uniquement `weekStart` et rend toujours une semaine complète.

### Écart 2 — La vue mois et la navigation mensuelle sont absentes
Aucun état, aucun contrôle, aucun rendu mois n’a été trouvé sur le périmètre réel.

### Écart 3 — L’ajout manuel de shift publié n’est pas livré
Aucune route `POST /api/planning/shifts` ni aucun formulaire d’ajout n’existent.

### Écart 4 — La modification publiée est limitée aux affectations
La seule mutation réelle du shift publié passe par `PATCH /api/planning/shifts/[id]/assign` et ne couvre que `userId`, `user2Id`, `vehicleId`, `depotId`.

### Écart 5 — L’annulation logique d’un shift publié n’est pas livrée
Le dépôt expose l’annulation d’un run autoschedule, pas celle d’un shift publié.

### Écart 6 — Historique et traçabilité restent liés au run courant
L’historique visible dans `/planning` est libellé `Historique du run courant` et la lecture API correspondante prend les logs sur un `run` avec une limite de 20 entrées. Ce n’est pas encore un historique manuel général du planning.

## 5. Fichiers inspectés

### Applicatif
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`

### Services / types
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/planning-audit.ts`
- `lib/types/planning.ts`

### Data
- `prisma/schema.prisma`

## 6. Validations réellement exécutées

Aucune validation terminale applicative n’a été exécutée dans cette session.

Précision :
- pas de `git apply --check`
- pas de `git apply`
- pas de `npx prisma validate`
- pas de `npx prisma generate`
- pas de `npm run lint`
- pas de `npm run build`

La session a reposé sur :
- relecture documentaire ;
- inspection structurée du code réel ;
- vérification des routes, composants et modèles présents.

## 7. Décision patch

**`NO_PATCH`**

Motif :
- session de type `AUDIT` ;
- aucune correction autorisée dans `PLAN-01` ;
- les écarts identifiés alimentent `PLAN-LOT-02-18`.

## 8. Synthèse obligatoire des verdicts

- vue semaine : **OUI**
- vue jour : **PARTIEL**
- vue mois : **NON**
- navigation mensuelle : **NON**
- lisibilité métier globale : **PARTIEL**
- ajout manuel de shift publié : **NON**
- modification de shift publié : **PARTIEL**
- suppression métier / annulation logique : **NON**
- historique minimal planning : **PARTIEL**
- traçabilité après publication : **PARTIEL**

## 9. Documents modifiés

### Documents de session mis à jour
- `docs/2-sessions/1-ALPHA/BLOC_A8/SESSION-20260415-01_A8_PLAN-01/SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A8/SESSION-20260415-01_A8_PLAN-01/NOTES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A8/SESSION-20260415-01_A8_PLAN-01/EVIDENCES.md`
- `docs/2-sessions/1-ALPHA/BLOC_A8/SESSION-20260415-01_A8_PLAN-01/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A8/SESSION-20260415-01_A8_PLAN-01/FIN_SESSION.md`
- `docs/3-patches/1-ALPHA/BLOC_A8/SESSION-20260415-01_A8_PLAN-01/NO_PATCH.md`

### Code applicatif
Aucun fichier applicatif modifié.
