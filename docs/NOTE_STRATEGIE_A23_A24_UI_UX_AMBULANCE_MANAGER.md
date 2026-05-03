# NOTE STRATÉGIQUE — BLOC A23 PUIS BLOC A24

Projet : Investissement  
Sous-projet : Ambulance Manager  
Objet : cadrer la suite après les tests manuels ADMIN ALPHA  
Date : 03/05/2026  

---

# 1. Décision de principe

Les constats issus de la deuxième phase de test manuel ADMIN doivent être traités en deux temps distincts.

## Temps 1 — Bloc A23

Le bloc A23 doit traiter en priorité les problèmes qui empêchent de continuer correctement les tests ou qui bloquent la présentabilité minimale de l’ALPHA.

Le bloc A23 doit rester centré sur la stabilisation post-test manuel ADMIN.

Il ne doit pas devenir une refonte UI/UX complète.

## Temps 2 — Bloc A24

Le bloc A24 devra être dédié au réalignement UI/UX strict de l’application avec les maquettes visuelles validées.

Ce sujet est majeur, mais il doit être traité dans un bloc séparé pour éviter de mélanger :

- corrections fonctionnelles bloquantes ;
- reprise métier ;
- refonte visuelle ;
- alignement maquettes ;
- corrections de composants globaux.

---

# 2. Pourquoi séparer A23 et A24

Le test manuel ADMIN a fait ressortir deux familles de problèmes différentes.

## Famille 1 — Problèmes bloquants ou structurants

À traiter dans A23 :

- session post-login mal hydratée ;
- sidebar/topbar incohérentes juste après connexion ;
- module utilisateurs cassé ;
- création utilisateur impossible ;
- utilisateurs non visibles ;
- absences non testables à cause du module utilisateurs ;
- planning manuel partiellement inutilisable ;
- affectation personnel trop lourde ou non exploitable ;
- modification/annulation de shift KO ;
- rôle PSC1 manquant ou à cadrer ;
- règles métier société partiellement bloquées ;
- verdict actuel : NO-GO temporaire société pilote.

## Famille 2 — Non-conformité UI/UX par rapport aux maquettes

À traiter dans A24 :

- UI réelle non alignée avec les maquettes validées ;
- densité visuelle différente ;
- structure de certaines pages non conforme ;
- composants pas assez proches de la DA validée ;
- planning visuellement en retrait ;
- détails de libellés, accents, hiérarchie, cartes, tableaux, badges ;
- dark/light mode absent ;
- responsive mobile à cadrer.

---

# 3. Bloc A23 — Stabilisation post-test manuel ADMIN

## Nom conseillé

`BLOC A23 — Stabilisation post-test manuel ADMIN / Go-No-Go société pilote`

## Objectif

Corriger ou cadrer les anomalies principales issues du test manuel ADMIN afin de rendre l’ALPHA retestable proprement.

Le bloc A23 doit permettre de répondre à cette question :

> Est-ce que l’ALPHA peut redevenir testable sérieusement côté ADMIN avant réalignement visuel complet ?

## Périmètre recommandé

### A23-01 — AUDIT

Audit post-test manuel ADMIN.

À vérifier :

- comportement post-login ;
- hydratation session ;
- cohérence sidebar/topbar après connexion ;
- module utilisateurs ;
- erreurs `SERVER_ERROR` et `VALIDATION_ERROR` sur `/users` ;
- dépendance entre users, absences et planning ;
- état réel du planning manuel ;
- impact du problème UI/UX sur la suite ;
- statut réel Go / No-Go société pilote.

### A23-LOT-02 — CORRECTION+COMPLÉTION

Correction prioritaire des points bloquants.

À traiter :

- session post-login ;
- état utilisateur/société/profil après connexion ;
- liste utilisateurs ;
- création utilisateur ;
- messages d’erreur utilisateurs ;
- édition utilisateur si nécessaire ;
- rattachement utilisateur à une base ;
- disponibilité utilisateur dans le planning ;
- corrections minimales du planning uniquement si nécessaires pour retester.

Important : ne pas lancer ici une refonte complète du planning ou de l’UI.

### A23-03 — VALIDATION

Validation ciblée après correction.

À vérifier :

- connexion ADMIN ;
- dashboard après connexion sans refresh obligatoire ;
- sidebar/topbar cohérentes ;
- liste utilisateurs visible ;
- création utilisateur OK ;
- utilisateur disponible dans planning ;
- absences au moins testables ;
- planning manuel retestable ;
- absence de régression véhicules/templates/audit.

### CLOTURE_A23 — AUDIT+CORRECTION+COMPLÉTION+VALIDATION

Clôture du bloc A23.

Verdict attendu :

- `BLOC A23 CLÔTURABLE DÉFINITIVEMENT : OUI`
- ou
- `BLOC A23 CLÔTURABLE DÉFINITIVEMENT : NON`

La clôture doit aussi décider :

- si l’ALPHA peut passer au bloc A24 ;
- si un nouveau test manuel ADMIN partiel est nécessaire ;
- si le verdict société pilote reste NO-GO ou devient GO avec réserves.

---

# 4. Ce qui ne doit PAS être fait dans A23

Le bloc A23 ne doit pas traiter :

- la refonte visuelle complète ;
- le réalignement exact de toutes les pages sur maquettes ;
- le dark/light mode ;
- la future application mobile ;
- la saisie des horaires réels par les utilisateurs ;
- la paie complète ;
- les primes avancées ;
- la suppression définitive généralisée ;
- une refonte profonde autoschedule/matching sans retest préalable.

Ces sujets doivent être cadrés plus tard.

---

# 5. Bloc A24 — Réalignement UI/UX strict sur maquettes validées

## Nom conseillé

`BLOC A24 — Réalignement UI/UX sur maquettes validées`

## Objectif

Réaligner l’application intégrée sur les maquettes visuelles validées.

Le bloc A24 doit partir du principe suivant :

> Les maquettes validées ne sont pas une inspiration. Elles sont la référence visuelle officielle à reproduire au plus près.

## Règle fondamentale

Aucune nouvelle direction artistique ne doit être introduite.

Le travail doit consister à rapprocher l’existant des maquettes validées, page par page, sans réinventer le produit.

---

# 6. Méthode obligatoire pour A24

## Étape 1 — Audit d’écart visuel

Avant toute correction, Codex doit comparer :

- l’écran réel actuel ;
- la maquette validée correspondante ;
- la référence UI/UX officielle si disponible.

L’audit doit produire :

- un verdict par page : conforme / non conforme / incomplet / à confirmer ;
- la liste des écarts majeurs ;
- la liste des écarts secondaires ;
- les composants à réaligner ;
- les risques de régression ;
- la recommandation de correction.

## Étape 2 — Correction page par page ou lot cohérent

Ne pas demander à Codex de “corriger toute l’UI” en une seule fois.

Découpage recommandé :

### A24-01 — AUDIT global UI/UX

- shell ;
- sidebar ;
- topbar ;
- dashboard ;
- cohérence globale ;
- inventaire des écarts avec maquettes.

### A24-LOT-02 — Shell + Dashboard

- sidebar ;
- topbar ;
- layout général ;
- dashboard ;
- cartes ;
- raccourcis ;
- header ;
- fond ;
- densité.

### A24-LOT-03 — Pages référentielles simples

- société ;
- dépôts ;
- véhicules ;
- templates ;
- tableaux ;
- formulaires ;
- badges ;
- boutons.

### A24-LOT-04 — Users / RH

- page utilisateurs ;
- liste ;
- filtres ;
- création ;
- édition ;
- fiche utilisateur ;
- cohérence RH.

### A24-LOT-05 — Planning

- vue jour ;
- vue semaine ;
- vue mois ;
- panneaux ;
- affectation ;
- densité métier ;
- lisibilité terrain.

### A24-LOT-06 — Audit / Onboarding / Privacy

- audit ;
- onboarding ;
- confidentialité ;
- pages simples ;
- finitions.

### A24-VALIDATION

Validation globale UI/UX.

À vérifier :

- cohérence visuelle globale ;
- respect des maquettes ;
- absence de nouvelle DA ;
- pages sœurs cohérentes ;
- lisibilité métier ;
- absence de régression fonctionnelle.

### CLOTURE_A24

Clôture finale du bloc UI/UX.

Verdict attendu :

- `BLOC A24 CLÔTURABLE DÉFINITIVEMENT : OUI`
- ou
- `BLOC A24 CLÔTURABLE DÉFINITIVEMENT : NON`

---

# 7. Règles à imposer à Codex pour les maquettes

À utiliser dans chaque prompt A24 :

```txt
Les maquettes validées constituent la référence visuelle officielle.
Elles ne sont pas une inspiration.
Aucune nouvelle direction artistique n’est autorisée.
Codex doit reproduire la structure, la hiérarchie, la densité, les composants, les espacements, les couleurs, les badges, les boutons, les tableaux et l’ambiance globale au plus près.
Toute divergence volontaire doit être justifiée.
Toute information non prouvée doit être notée : INFORMATION NON FOURNIE — À CONFIRMER.
```

---

# 8. Ce que Codex doit recevoir pour bien reproduire les maquettes

Pour chaque session A24, fournir si possible :

- la maquette validée de la page concernée ;
- le nom exact de la version validée ;
- une capture de l’écran réel actuel ;
- la page ou le fichier React concerné ;
- la référence UI/UX officielle si elle existe ;
- la liste des écarts visibles déjà remarqués ;
- la définition d’acceptation visuelle.

Exemple de définition d’acceptation :

```txt
La correction est considérée acceptable uniquement si :
- la structure générale correspond à la maquette ;
- la sidebar et la topbar reprennent la logique validée ;
- les cards, tableaux, boutons, badges et filtres sont visuellement cohérents ;
- la densité et les espacements sont proches de la maquette ;
- aucune nouvelle direction artistique n’est introduite ;
- la page reste fonctionnelle après correction.
```

---

# 9. Prompt type — Audit visuel A24

```txt
Session validée, nous passons à la suite.

Objectif : réaliser un AUDIT VISUEL STRICT entre l’écran réel et la maquette validée.

RÈGLES IMPÉRATIVES
- Les maquettes validées constituent la référence visuelle officielle.
- Elles ne sont pas une inspiration mais la cible à reproduire.
- Aucune nouvelle direction artistique n’est autorisée.
- Ne pas réinventer les composants.
- Ne pas mélanger correction visuelle et refonte produit non demandée.
- Ne pas toucher au métier ou au backend sauf nécessité strictement démontrée.
- Toute information non prouvée doit être notée : INFORMATION NON FOURNIE — À CONFIRMER.

PÉRIMÈTRE
Réaliser un audit comparatif de la page [NOM_PAGE] entre :
- l’écran réel actuel ;
- la maquette validée correspondante.

À analyser obligatoirement :
1. structure générale ;
2. sidebar ;
3. topbar ;
4. hiérarchie visuelle ;
5. cartes ;
6. boutons ;
7. badges ;
8. tableaux ;
9. filtres ;
10. drawers / panneaux ;
11. espacements ;
12. densité ;
13. cohérence métier ;
14. cohérence avec la DA validée.

LIVRABLE ATTENDU
Tu dois produire :
1. un verdict : conforme / non conforme / incomplet / à confirmer ;
2. une liste précise des écarts visuels ;
3. une synthèse claire des corrections nécessaires ;
4. une recommandation de session suivante.

IMPORTANT
Aucune correction de code dans cette session si ce n’est pas explicitement demandé.
Ici, on veut d’abord un audit visuel propre.
```

---

# 10. Prompt type — Correction visuelle A24

```txt
Session validée, nous passons à la suite.

Objectif : corriger l’écran [NOM_PAGE] pour l’aligner au plus près de la maquette validée.

RÈGLES IMPÉRATIVES
- La maquette validée est la référence visuelle officielle.
- Aucune nouvelle DA n’est autorisée.
- Reprendre la structure, la densité, la hiérarchie visuelle et les composants au plus près.
- Ne pas modifier inutilement la logique métier.
- Ne pas élargir le périmètre.
- Une session = un point clair.
- Toute information non prouvée : INFORMATION NON FOURNIE — À CONFIRMER.

PÉRIMÈTRE
Corriger uniquement :
- [page concernée]
- [composants concernés si besoin]

ÉLÉMENTS À RÉALIGNER
- sidebar ;
- topbar ;
- header de page ;
- cards ;
- boutons ;
- badges ;
- tableaux ;
- filtres ;
- drawers ;
- spacing ;
- lisibilité générale ;
- cohérence avec les maquettes validées.

INTERDICTIONS
- Ne pas inventer une nouvelle structure visuelle.
- Ne pas introduire un style générique différent des maquettes.
- Ne pas mélanger avec une autre page.
- Ne pas faire de refonte technique inutile.

LIVRABLE ATTENDU
- patch code principal ;
- éventuel patch docs séparé ;
- validation terminale ;
- synthèse des éléments réalignés ;
- points résiduels s’il en reste.

CRITÈRE DE VALIDATION
La page finale doit être visuellement cohérente avec la maquette validée sur :
- structure ;
- proportions ;
- composants ;
- hiérarchie ;
- densité ;
- ambiance globale.
```

---

# 11. Recommandation finale

L’ordre recommandé est :

1. terminer le bloc A23 ;
2. refaire un test ADMIN ciblé après A23 ;
3. ouvrir A24 uniquement quand les écrans principaux ne sont plus bloqués fonctionnellement ;
4. traiter A24 comme un vrai bloc UI/UX structuré ;
5. ne pas mélanger A24 avec les sujets RH, rôles avancés, horaires réels ou mobile.

Le point UI/UX est majeur, mais il sera mieux traité après les corrections bloquantes A23.
