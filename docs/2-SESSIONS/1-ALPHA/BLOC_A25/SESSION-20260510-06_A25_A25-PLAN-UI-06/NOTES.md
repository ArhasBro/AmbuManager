# NOTES

## Resume audit Phase 1

- Audit de coherence documentaire A25 effectue.
- Audit de faisabilite code pour reproduire la maquette Planning effectue.
- Aucun code modifie.
- Aucun patch code produit.

## Matrice de coherence documentaire

| Point controle | Statut | Observation |
|---|---|---|
| Autorite visuelle = images Planning V1.2 | Conforme | References prioritaires confirmees : `Planning_V1.2.png`, `Planning_V1.2_INFO_DETAIL.png`. |
| Autorite fonctionnelle = code > documentation | Conforme | Priorite fonctionnelle appliquee selon la regle A25. |
| A25-06 = audit+cadrage sans patch | Conforme | Session traitee en AUDIT+CADRAGE uniquement. |
| Interdiction de capture automatique | Conforme | Aucune capture automatique produite. |
| Onglets internes conformes a la cible maquette | Non conforme | Dans le code actuel, les onglets pilotent surtout le focus/navigation, pas strictement le workspace violet+vert. |
| Risque double header Planning | Non conforme | Header Planning present a la fois en page et dans le client Planning. |

## Matrice de faisabilite code

| Element cible | Faisabilite | Etat actuel |
|---|---|---|
| Salarie | Haute | Donnees utilisateur presentes et exploitables. |
| Role | Haute | Donnee role disponible cote API; integration UI partielle. |
| Base / depot | Haute | Donnees et affectation depot disponibles. |
| Statut | Moyenne | Badges presents; alignement maquette a completer. |
| Semaines / colonnes | Moyenne | Grille hebdomadaire existante, mais pas encore matrice salarie x semaines cible. |
| Shifts / badges | Haute | Elements deja presents, stylage a rapprocher de la maquette. |
| Absences | Moyenne | Regles/conflits absences disponibles; rendu panneau droit a confirmer. |
| Conflits / alertes | Moyenne | Gestion existante; presentation maquette non finalisee. |
| Affectations E1/E2/vehicule/base | Haute | Affectations unitaires et groupees deja presentes. |
| Selection cellule | Faible a moyenne | Selection actuelle centree shift/checkbox, pas selection cellule maquette. |
| Actions groupees basses | Haute | Barre et actions presentes; placement/style a aligner. |
| Panneau droit contextuel fixe | Moyenne | Informations partielles, pilotage onglet a renforcer. |

## Risques pour A25-07 a A25-10

### Bloquants

- Double header Planning (duplication visuelle de la zone titre).
- Logique onglets non alignee avec le pilotage strict contenu principal + panneau droit.
- Structure verticale legacy au lieu d'un workspace desktop stable en 2 colonnes.

### Non bloquants

- Exports, impression, autoschedule, matching et affectations deja disponibles en socle.
- Base CSS Planning deja presente (clair/sombre).
- Donnees API riches et reutilisables pour la reproduction cible.

### A confirmer

- Couverture exacte du rendu absences dans le panneau droit final : INFORMATION NON FOURNIE — À CONFIRMER.
- Niveau de fidelite visuelle final (cible ~99 %) apres corrections A25-07 a A25-10 : INFORMATION NON FOURNIE — À CONFIRMER.

## Checklist visuelle manuelle Nathan

- Verifier presence d'un seul header Planning visible.
- Verifier toolbar horizontale unique.
- Verifier onglet actif pilotant vraiment contenu principal + panneau droit.
- Verifier workspace desktop en 2 colonnes stables.
- Verifier matrice salarie x semaines.
- Verifier selection cellule visuelle.
- Verifier panneau droit : identite, semaine, affectations, absences, conflits, actions.
- Verifier barre basse actions groupees sous matrice.
- Verifier coherence claire/sombre.
- Verifier proximite visuelle avec `Planning_V1.2.png` et `Planning_V1.2_INFO_DETAIL.png`.