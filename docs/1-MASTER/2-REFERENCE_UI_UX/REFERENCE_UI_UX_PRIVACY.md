# Ambulance Manager — RÉFÉRENCE UI/UX PRIVACY / MENTIONS D’INFORMATION

Version : V1.0.0 — SPÉCIFICATION VISUELLE MAQUETTE 99 %  
Date : 13/05/2026  
Chantier concerné : `Documentation transversale UI/UX — hors bloc applicatif`  
Document cible à déposer dans le repo : `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_PRIVACY.md`

---

## 0. Statut du document

Ce document fait partie du chantier documentaire transversal UI/UX hors bloc applicatif.

Il reprend la méthode validée sur `REFERENCE_UI_UX_A25_PLANNING.md` : partir de l'image officielle, décrire le rendu visible, traduire la maquette en consignes codables pour Codex, puis fournir une DoD visuelle contrôlable manuellement.

Ce document ne doit pas être lu comme une inspiration générale. Il doit servir de spécification visuelle à reproduire au plus près.

Objectif principal : permettre une future production Codex orientée uniquement vers la fidélité visuelle à environ 99 % de la maquette officielle, sans traiter le fonctionnel métier.


## 1. Règle d'autorité

### 1.1 Autorité visuelle

La vérité visuelle prioritaire est le PNG officiel de la page, indiqué avec son chemin exact en section 2.2.

Règle de priorité :

```txt
Image PNG officielle > REFERENCE_UI_UX_<PAGE>.md > documentation MAQUETTE générale > anciennes captures > récit de production
```

En cas de contradiction visuelle, l'image officielle prévaut.

### 1.2 Autorité codable

Ce document est la traduction codable de la maquette pour Codex.

Il doit guider :

- la structure visible ;
- les proportions approximatives ;
- les alignements ;
- les espacements ;
- les composants communs ;
- les éléments à masquer, déplacer ou simplifier si le code réel affiche trop de fonctionnel ;
- la checklist de contrôle manuel.

### 1.3 Autorité fonctionnelle

Le code réel reste la vérité fonctionnelle.

Mais cette phase est strictement visuelle.

Règle verrouillée :

```txt
PRIORITÉ ACTUELLE = FIDÉLITÉ VISUELLE À 99 % AUX MAQUETTES OFFICIELLES.
```

Conséquences :

- le fonctionnel existant ne doit pas bloquer la reproduction visuelle ;
- si une action, un bouton, un formulaire, une donnée ou un bloc fonctionnel gêne la fidélité maquette, il peut être masqué, déplacé, replié, simplifié ou supprimé visuellement ;
- les arbitrages fonctionnels seront repris plus tard dans des sessions applicatives dédiées ;
- aucune API, Prisma, RBAC, moteur métier, logique serveur, autoschedule ou matching ne doit être modifié dans ce chantier documentaire ;
- les données visibles dans la maquette peuvent être remplacées par les données réelles, mais la structure visuelle doit rester la même.

### 1.4 Formule `INFORMATION NON FOURNIE — À CONFIRMER`

La formule exacte `INFORMATION NON FOURNIE — À CONFIRMER` est réservée aux documents, audits et contrôles QA.

Elle ne doit jamais être affichée telle quelle dans l'interface utilisateur finale.

## 2. Page concernée

### 2.1 Route réelle

```txt
/privacy
```

### 2.2 Fichiers code probables

```txt
app/privacy/page.tsx
app/a24-complementary-pages.css
app/app-shell.tsx
app/globals.css
app/ui/*
```

### 2.3 Maquette officielle

```txt
docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/11-Privacy/Privacy_V1.0.png
```

## 3. Nature visuelle de la page

La page `Mentions d'information` est une page simple de contenu légal/RGPD.

Elle hérite du Shell global mais ne doit pas ressembler à une page de gestion métier.

La maquette montre :

- breadcrumb discret ;
- titre et introduction ;
- badge `Dernière mise à jour` ;
- sommaire latéral gauche ;
- contenu principal sous forme de grandes cartes ;
- footer discret.

## 4. Structure visible à reproduire

### 4.1 Breadcrumb

Éléments visibles :

```txt
Accueil > Mention d'information
```

Rendu :

- très discret ;
- petites icônes ;
- bleu/gris ;
- situé au-dessus du titre.

### 4.2 Header contenu

Éléments :

- titre `Mentions d'information` ;
- paragraphe : information sur la collecte, l'utilisation et la protection des données personnelles ;
- badge/carte `Dernière mise à jour : 18 avr. 2024` à droite.

### 4.3 Sommaire latéral

Carte gauche avec 12 entrées :

```txt
1. Éditeur du site
2. Hébergement
3. Données collectées
4. Finalités de traitement
5. Base légale
6. Destinataires des données
7. Durée de conservation
8. Vos droits
9. Sécurité des données
10. Cookies
11. Modifications
12. Contact
```

Rendu :

- carte blanche ;
- item actif avec fond bleu pâle et bord gauche bleu ;
- items non actifs gris/bleu ;
- pas de surcharge visuelle.

### 4.4 Contenu principal

Les sections visibles dans la maquette :

1. `Éditeur du site`
   - grande icône bâtiment dans carré pâle ;
   - texte SC Ambulances ;
   - SIREN ;
   - email.

2. `Hébergement`
   - icône cloud ;
   - OVHcloud ;
   - adresse ;
   - site web.

3. `Données collectées`
   - icône carte/identité ;
   - paragraphe ;
   - liste à puces avec checks verts.

4. `Finalités de traitement`
   - icône cible ;
   - paragraphe ;
   - liste à checks verts.

La maquette ne montre que les 4 premières sections dans la hauteur visible, même si le sommaire en annonce 12.

### 4.5 Footer

Footer visible en bas :

- texte gauche `Accès réservé aux utilisateurs autorisés` avec icône shield ;
- texte central/droit `© 2024 SC Ambulances — Tous droits réservés` ;
- lien `Mentions d'information`.

## 5. Proportions et rythme visuel

| Zone | Cible |
|---|---|
| Sommaire | environ 260–300 px |
| Contenu principal | largeur restante |
| Cartes sections | grande largeur, hauteur confortable |
| Icône section | carré pâle 90–110 px |
| Footer | très discret, sur une ligne |

La page doit être sobre, claire et rassurante.

## 6. Éléments à masquer, simplifier ou reporter

Autorisé :

- texte juridique trop long si la maquette visible est plus compacte ;
- sections 5 à 12 si elles sont plus bas dans la page, hors viewport ;
- liens techniques ;
- données légales non confirmées visuellement ;
- alertes ou mentions non visibles ;
- style de page article classique si non aligné avec les cartes.

Attention : le contenu légal pourra être repris plus tard. Ici, l'objectif est la structure visuelle.

## 7. Interdictions

Ne pas :

- supprimer le sommaire latéral ;
- remplacer les cartes par du texte brut ;
- ajouter un tableau juridique ;
- supprimer le badge dernière mise à jour ;
- afficher des placeholders documentaires ;
- modifier le fondement RGPD fonctionnel ;
- ouvrir un formulaire de contact non visible.

## 8. DoD visuelle 99 %

La page est conforme si :

- le breadcrumb est visible ;
- le titre et le paragraphe intro sont conformes ;
- le badge dernière mise à jour est à droite ;
- le sommaire latéral contient les 12 entrées ;
- l'entrée active est visuellement bleue ;
- les sections principales sont en grandes cartes ;
- les icônes sont dans des carrés pâles ;
- les listes utilisent des checks verts ;
- le footer discret est présent ;
- la page reste alignée avec le Shell global.

## 9. Checklist de contrôle manuel Nathan

```txt
[ ] Le breadcrumb Accueil > Mention d'information est visible.
[ ] Le titre Mentions d'information est conforme.
[ ] Le badge Dernière mise à jour est à droite.
[ ] Le sommaire latéral contient 12 entrées.
[ ] L'entrée Éditeur du site est active visuellement.
[ ] Les sections sont des grandes cartes blanches.
[ ] Les icônes de sections sont grandes, bleues et sur fond pâle.
[ ] Les listes utilisent des checks verts.
[ ] Le footer est visible en bas.
[ ] Aucun placeholder documentaire n'apparaît.
```

## 10. Écarts connus à contrôler dans le code

- le contenu actuel peut être plus textuel que la maquette ;
- les corrections de nomination des sociétés peuvent être à prévoir avant intégration finale ;
- les sections 5 à 12 peuvent exister dans le code mais ne sont pas visibles dans le viewport maquette ;
- il faut préserver le style card/sommaire plutôt qu'un rendu article classique.

## 11. Règles futures pour Codex

Lors d'une future session de production UI :

- lire d'abord `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_INDEX_MAQUETTES.md` ;
- lire ensuite `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_SHELL_GLOBAL.md` ;
- lire ce document de page ;
- lire uniquement les fichiers code utiles à cette page ;
- ne pas scanner inutilement tout le dépôt ;
- ne pas produire de capture automatique ;
- fournir une checklist claire pour la vérification visuelle manuelle par Nathan ;
- ne pas transformer la session UI en session fonctionnelle ;
- ne pas modifier Prisma, API, RBAC, services métier ou logique serveur sauf nécessité explicitement demandée dans une session ultérieure.

Livrable attendu lors d'une future production code : un patch visuel ciblé, sobre, contrôlable, aligné sur la maquette.

## 12. Prompt court futur pour Codex

```txt
Tu travailles sur Ambulance Manager.

Objectif : réaligner uniquement le visuel de la page concernée avec sa maquette officielle à 99 %, sans traiter le fonctionnel métier.

Lis d'abord :
- docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_INDEX_MAQUETTES.md
- docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_SHELL_GLOBAL.md
- ce document REFERENCE_UI_UX_PRIVACY.md

Puis lis uniquement les fichiers code utiles à cette page.

Règles :
- image officielle = vérité visuelle ;
- code réel = vérité fonctionnelle ;
- fonctionnel non bloquant pour cette phase ;
- masquer, déplacer, replier ou simplifier les éléments fonctionnels qui empêchent la fidélité maquette ;
- ne pas modifier API, Prisma, RBAC, services métier ou logique serveur ;
- ne pas produire de captures ;
- fournir une checklist de contrôle visuel manuel.
```
