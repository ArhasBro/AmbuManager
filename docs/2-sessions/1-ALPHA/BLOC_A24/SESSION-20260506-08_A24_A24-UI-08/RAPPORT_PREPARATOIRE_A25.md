# RAPPORT_PREPARATOIRE_A25

## 1. Synthese generale

L'ecran `/planning` est fonctionnellement riche mais visuellement et structurellement eloigne de la cible maquette `Planning_V1.2`.

Verdict audit : NON CONFORME (UI/UX).

Ce constat est base sur :
- lecture des references A24 et maquette planning ;
- inspection du code planning ;
- captures reelles avant (clair/sombre) de `/planning`.

## 2. References A24 utilisees

- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/REFERENCE_UI_UX_A24.md`
- `docs/1-master/MAQUETTE/README_MAQUETTES_A24.md`
- `docs/1-master/MAQUETTE/SPEC_UI_UX_MAQUETTES_AMBULANCE_MANAGER.md`
- `docs/1-master/MAQUETTE/MAQUETTE_DA/.../2-Planning/Planning_V1.2.png`

## 3. Vues Planning inspectees

Vues prouvees par capture :
- vue planning principale semaine (legacy weekly grid)
- etat mode clair
- etat mode sombre

Vues declarees presentes dans le code mais non capturees en interaction dans cette session :
- `day` (manual planning)
- `week` (manual planning)
- `month` (manual planning)

Statut des preuves de ces trois vues :
INFORMATION NON FOURNIE — À CONFIRMER

## 4. Ecarts UI/UX constates

1. Structure principale non alignee maquette
- Maquette : header + filtres + tabs + matrice personnel/semaine + panneau detail droit + barre bulk basse.
- Reel : empilement de zones (legacy + autoschedule/matching + bulk + cartes jour), forte densite verticale.

2. Matrice metier
- Maquette : tableau par salaries avec colonnes semaine 1..4.
- Reel : colonnes par jours (7 colonnes) avec cartes shifts detaillees dans chaque jour.

3. Panneau detail cellule
- Maquette : panneau detail droit toujours visible.
- Reel : panneau equivalent non visible dans la capture principale.

4. Hierarchie filtres/actions
- Maquette : filtre metier compact en haut + actions export clairement isolees.
- Reel : controles nombreux et melanges (visibilite, mode, matching, autoschedule, bulk).

5. Densite visuelle
- Maquette : dense mais ordonnee.
- Reel : dense et surchargee, lecture metier immediate degradee.

6. Cohabitation legacy/manual
- Reel : `planning-client.tsx` combine legacy weekly grid + details manual avancé dans `<details>`.
- Effet : experience discontinue.

## 5. Cartographie des zones a traiter en A25

| Zone | Ecart | Severite | Cible A25 |
|---|---|---|---|
| Header planning | action primaire et hierarchy differente | Haute | header conforme maquette + action principale claire |
| Bloc filtres | structure metier non homogene | Haute | filtre unifie (periode, depot, role, user, switch vue) |
| Tabs metier | absence/visibilite incoherente | Haute | tabs explicites (manuel, affectations, autoschedule, matching, historique, exports) |
| Matrice centrale | representation differente de la maquette | Critique | composant matrice personnel/semaine lisible |
| Panneau detail | absence de panneau droit equivalent | Critique | drawer/panneau detail cellule |
| Barre bulk | actions noyées dans la page | Haute | barre basse dediee selection/bulk |
| Manual advanced | place et presentation non maquette | Moyenne | integration visuelle plus discretes et coherente |
| Mode sombre planning | rendu present mais a revalider sur nouvelles zones | Moyenne | declinaison sobre lisible |

## 6. Zones sensibles fonctionnelles

A proteger en A25 (pas de regression):
- permissions `canViewSelfPlanning` / `canViewGlobalPlanning` / `canEditPlanning` / `canAutoSchedule` / `canExportPlanning`
- affectation employe 1/2, vehicule, base
- publication/annulation de brouillon autoschedule
- preview/apply matching
- exports PDF/XLSX/CSV et impression
- historique/audit run

## 7. Risques de regression

| Risque | Niveau | Description | Garde-fou |
|---|---|---|---|
| Rupture droits planning | Eleve | changement UI masque des controles par role | tests par profil avant merge |
| Regressions autoschedule | Eleve | UI modifiee sur zone generation/publication | ne pas changer logique API/service |
| Regressions matching | Eleve | perte de commandes simulate/apply | conserver callbacks existants |
| Perte lisibilite metier | Eleve | simplification visuelle excessive | comparer systematiquement a maquette |
| Incoherence dark mode | Moyen | contrastes insuffisants sur nouvelles zones | captures clair/sombre a chaque lot |

## 8. Priorisation recommandee

- P0 : matrice centrale + panneau detail + barre bulk
- P1 : header/filtres/tabs
- P2 : integration zone manual advanced et etats visuels
- P3 : harmonisation fine icones/libelles

## 9. Decoupage propose pour A25

1. A25-PLAN-UI-01 : audit visuel interactif complet (captures jour/semaine/mois, clair/sombre)
2. A25-PLAN-UI-02 : header + filtres + actions export
3. A25-PLAN-UI-03 : tabs metier + matrice centrale
4. A25-PLAN-UI-04 : panneau detail cellule + etats absences/alertes
5. A25-PLAN-UI-05 : barre bulk + selection multiple
6. A25-PLAN-UI-06 : integration manuel/jour-semaine-mois dans l'ensemble visuel
7. A25-PLAN-UI-07 : harmonisation sombre + validations finales

## 10. Points a ne pas traiter en A25 ou a repousser

Ne pas traiter dans A25 :
- nouveau moteur planning
- refonte autoschedule/matching metier
- modifications RBAC/Prisma/API profondes
- RH avancee, paie, primes, heures reelles
- securite avancee, RGPD complet, mobile complet

## Conclusion

Le lot A25 peut etre lance immediatement sur base de cette cartographie.
Condition initiale : produire des captures interactives manquantes (`day/week/month`) et conserver le scope purement UI/UX.