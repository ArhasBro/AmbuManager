# NOTES

## Notes de travail

- Le patch conserve `User.name` pour compatibilite avec l'existant, l'authentification, les seeds, les imports et les ecrans deja branches.
- `firstName`, `lastName`, `initials` et `phone` sont optionnels afin de ne pas casser les utilisateurs existants.
- `isTrainee` est un marqueur minimal dedie aux stagiaires. Aucune regle de supervision, tutorat ou restriction de planning n'a ete inventee.
- `dailyWorkStartTime` et `dailyWorkEndTime` sont de premiers champs horaires RH simples au format `HH:mm`. Aucune regle legale n'est ajoutee car le cadrage legal detaille est indique comme separe et non fourni.
- Les absences existantes ne sont pas modifiees : le code couvre deja l'indisponibilite utilisateur, mais pas un workflow complet de demande.
- Les permissions ALPHA peuvent etre affectees des la creation utilisateur, avec conservation du verrou sur la permission sensible de gouvernance des regles metier pour les acteurs non autorises.

## Point a confirmer

Definition exacte d'un workflow de "demande d'absence" :

- statut attendu ;
- acteur demandeur ;
- acteur validateur ;
- transitions autorisees ;
- effet planning avant/apres validation.

Etat : `INFORMATION NON FOURNIE — À CONFIRMER`.

## Note de tracabilite archive

`AmbuManager-main.zip` est une archive source pre-patch.

Le patch RH-LOT-02 est donc attendu en application normale sur cette archive. Le controle `git apply --check --reverse` documente precedemment correspond au depot local post-patch, pas a l'archive source pre-patch.
