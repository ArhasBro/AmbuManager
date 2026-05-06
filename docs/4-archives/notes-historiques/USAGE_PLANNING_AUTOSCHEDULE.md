# Guide d’usage ALPHA — Planning / Autoschedule

## Objectif

Le périmètre **Planning / Autoschedule** couvre deux usages complémentaires :
- le **planning manuel** pour créer, modifier, annuler et exporter des shifts publiés ;
- l’**autoschedule** pour générer un brouillon, prévisualiser les propositions, appliquer l’auto-affectation, publier ou annuler un run.

## Pré-requis

- être connecté ;
- disposer des droits réels de consultation planning ;
- pour créer ou modifier : disposer du droit d’édition planning ;
- pour autoschedule : disposer du droit de lancement dédié ;
- pour export : disposer du droit d’export planning.

## Accéder au module

1. Ouvrir `/planning`.
2. Selon les permissions, la page affiche :
   - le planning manuel ;
   - le panneau autoschedule ;
   - l’accès audit dédié ;
   - les exports planning.

## Planning manuel

### Fonctions visibles

- navigation **Jour / Semaine / Mois** ;
- sélection d’un utilisateur cible selon le niveau d’accès ;
- chargement des shifts publiés sur le scope choisi ;
- création d’un shift manuel via un template actif ;
- modification d’un shift publié ;
- annulation d’un shift ;
- affichage de l’historique si l’utilisateur peut lire l’audit ;
- export `PDF`, `XLSX`, `CSV` et impression.

### Données utilisées

La création manuelle demande au minimum :
- date ;
- heure de début ;
- heure de fin ;
- template ;
- base éventuelle ;
- notes éventuelles.

### Contrôles réellement présents

Lors de la création ou modification d’un shift, le dépôt courant contrôle notamment :
- présence du template dans la société ;
- présence éventuelle du dépôt dans la société ;
- cohérence horaire ;
- conflits d’absence utilisateur ;
- conflits de chevauchement utilisateurs ;
- repos minimum si la règle société est active ;
- conflits de chevauchement véhicule ;
- incompatibilité rôle/template ou véhicule/template selon le cas.

## Autoschedule

### Fonctions visibles

Le panneau autoschedule permet de :
- générer un brouillon à la journée ;
- générer un brouillon à la semaine ;
- choisir un mode d’affectation / variante de matching ;
- consulter le run courant ;
- charger une prévisualisation d’auto-affectation ;
- lire un score qualité planning ;
- appliquer l’auto-affectation ;
- publier le brouillon ;
- annuler le brouillon.

### Variantes visibles

Le dépôt courant expose trois variantes :
- `Variante 1 — équilibrée` ;
- `Variante 2 — stable` ;
- `Variante 3 — inverse`.

### États à surveiller

- génération réussie du run ;
- prévisualisation disponible ;
- brouillons présents ;
- publication effectuée ;
- annulation effectuée ;
- score qualité et explications cohérents avec les propositions.

## Exports planning

Le flux export repose sur `/api/planning/exports` et permet :
- `CSV` ;
- `XLSX` ;
- `PDF`.

Un seul scope doit être utilisé à la fois :
- `day` ;
- `weekStart` ;
- `month`.

## Points de contrôle utiles

- sans droit de consultation, la page ne doit pas exposer le planning ;
- sans droit d’édition, les actions manuelles ne doivent pas être opérables ;
- sans droit d’export, le téléchargement doit être refusé ;
- un run autoschedule doit rester cloisonné à la société courante ;
- une prévisualisation d’auto-affectation doit rester cohérente avec la variante choisie.

## Limites honnêtes à connaître

- le guide décrit l’outillage ALPHA visible, pas une optimisation finale ;
- les messages d’erreur planning peuvent rester techniques ;
- le niveau d’automatisation dépend fortement de la qualité des templates, disponibilités et ressources présentes.
