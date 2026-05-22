# Ambulance Manager — RÉFÉRENCE UI/UX LOGIN

Version : V1.0.0 — SPÉCIFICATION VISUELLE MAQUETTE 99 %  
Date : 13/05/2026  
Chantier concerné : `Documentation transversale UI/UX — hors bloc applicatif`  
Document cible à déposer dans le repo : `docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_LOGIN.md`

---

## 0. Statut du document

Ce document est une référence UI/UX codable pour la page `Login` d’Ambulance Manager.

Il est rédigé dans le cadre du chantier documentaire transversal UI/UX, hors bloc applicatif.

Il ne crée pas de nouveau bloc de développement.

Il ne demande pas de refonte fonctionnelle.

Il sert à préparer une future production Codex dont l’objectif sera uniquement :

```txt
Reproduire visuellement la maquette officielle Login à environ 99 %.
```

La page Login doit donc être évaluée sur sa fidélité visuelle à la maquette, pas sur l’ajout ou la conservation de fonctionnalités non visibles.

---

## 1. Règle d’autorité

### 1.1 Référence visuelle officielle

La référence officielle de la page Login est l’image située dans :

```txt
docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG/1-Login/Login_V1.1.png
```

Image analysée :

```txt
Login_V1.1.png
```

Cette image est la vérité visuelle de la page Login.

### 1.2 Règle d’autorité visuelle

```txt
Image Login_V1.1.png > documents généraux MAQUETTE > anciennes captures > code actuel
```

La page doit être reproduite en priorité selon l’image officielle.

Les documents généraux de maquette servent uniquement de contexte de direction artistique.

Les anciennes captures de sessions ne doivent pas servir de référence cible.

### 1.3 Règle d’autorité fonctionnelle

```txt
Code réel du repo > documentation produit > hypothèses
```

Le code réel fixe ce qui existe fonctionnellement.

Mais dans cette phase UI/UX, la priorité est exclusivement visuelle.

Conséquence :

- le comportement de connexion existant peut être conservé s’il ne gêne pas la reproduction visuelle ;
- aucun flux d’authentification, NextAuth, session, RBAC, API ou redirection ne doit être refondu pour cette phase ;
- si un élément fonctionnel visible dans le code actuel empêche de reproduire la maquette, il peut être masqué, déplacé, simplifié ou supprimé visuellement ;
- les arbitrages fonctionnels seront repris plus tard dans des sessions dédiées.

### 1.4 Règle sur `INFORMATION NON FOURNIE — À CONFIRMER`

La formule :

```txt
INFORMATION NON FOURNIE — À CONFIRMER
```

est autorisée dans ce document de référence ou dans les contrôles QA.

Elle ne doit jamais être affichée dans l’interface utilisateur.

### 1.5 Dossier ICONE / ICONES

Le dossier historique `ICONE` / `ICONES` est neutralisé et ne doit pas être utilisé comme source de vérité.

Pour la page Login, la référence visuelle reste uniquement :

```txt
Login_V1.1.png
```

Si des icônes sont nécessaires côté code, Codex doit utiliser les icônes déjà disponibles dans le projet ou des composants existants, mais uniquement pour reproduire le rendu visible de la maquette.

---

## 2. Périmètre de la page Login

### 2.1 Route réelle concernée

Route :

```txt
/login
```

### 2.2 Fichiers code probables

Fichiers principaux à lire avant production :

```txt
app/login/page.tsx
app/globals.css
app/layout.tsx
app/app-shell.tsx
```

Fichiers secondaires à consulter seulement si nécessaire :

```txt
app/page.tsx
lib/auth.ts
types/next-auth.d.ts
```

### 2.3 Limite stricte du périmètre

La future session Codex ne doit pas modifier volontairement :

```txt
NextAuth
CredentialsProvider
callbackUrl
session
RBAC
Prisma
API
redirections serveur
sécurité réelle de connexion
```

Sauf si le code ne compile plus après correction visuelle, ces éléments ne doivent pas être touchés.

### 2.4 Nature de la page

La page Login est une page publique autonome.

Elle n’hérite pas du Shell global connecté.

Elle ne doit pas afficher :

- sidebar ;
- topbar ;
- navigation principale ;
- nom société connecté ;
- utilisateur connecté ;
- bouton déconnexion ;
- cartes dashboard ;
- layout interne app.

La page doit rester une page d’entrée simple, premium, centrée sur la connexion.

---

## 3. Lecture générale de la maquette

### 3.1 Format de référence

L’image officielle `Login_V1.1.png` mesure approximativement :

```txt
Largeur : 1536 px
Hauteur : 1024 px
```

La maquette représente une vue desktop large.

Responsive mobile :

```txt
INFORMATION NON FOURNIE — À CONFIRMER
```

Codex peut prévoir un responsive propre, mais il ne doit pas inventer une nouvelle expérience mobile au détriment de la fidélité desktop.

### 3.2 Organisation macro

La page est divisée en deux zones verticales principales :

```txt
┌──────────────────────────────────────┬──────────────────────────────────────────────┐
│ Zone gauche immersive                │ Zone droite formulaire                       │
│                                      │                                              │
│ Branding                             │ Carte de connexion centrée                   │
│ Promesse produit                     │ Formulaire email / mot de passe              │
│ Liste de bénéfices                   │ Checkbox souvenir                            │
│ Ambulance photo + overlay bleu       │ Bouton connexion                             │
│ Carte sécurité basse                 │ Message erreur visible                       │
│                                      │ Mentions d’information                       │
│                                      │ Badges bas Hébergé France / RGPD             │
└──────────────────────────────────────┴──────────────────────────────────────────────┘
```

### 3.3 Répartition visuelle approximative

| Zone | X approx. | Y approx. | Largeur approx. | Hauteur approx. | Commentaire |
|---|---:|---:|---:|---:|---|
| Zone gauche | 0 | 0 | 720 px | 1024 px | Panneau bleu profond avec photo ambulance |
| Zone droite | 720 px | 0 | 816 px | 1024 px | Fond clair avec carte centrée |
| Carte login | 875 px | 150 px | 500 px | 720 px | Carte blanche centrale |
| Badge bas | 948 px | 918 px | 338 px | 45 px | Hébergé France / Conforme RGPD |

Les valeurs sont approximatives. Elles servent à guider la reproduction, pas à imposer une grille CSS au pixel strict.

---

## 4. Objectif visuel principal

La page doit donner immédiatement l’impression suivante :

```txt
SaaS métier santé / ambulancier, moderne, fiable, sécurisé, premium, clair.
```

La maquette combine :

- un côté gauche très immersif et émotionnel ;
- un côté droit très clair et fonctionnel ;
- un branding ambulance fort ;
- une impression de conformité, sécurité et hébergement français ;
- une interface simple et rassurante.

La future intégration doit éviter :

- une page login trop générique ;
- une simple carte centrée sur fond blanc ;
- un rendu trop sombre partout ;
- un rendu trop chargé ;
- une conservation d’éléments fonctionnels non visibles qui casseraient l’équilibre de la maquette.

---

## 5. Zone gauche immersive

### 5.1 Structure générale

La zone gauche occupe environ 47 % de la largeur desktop.

Elle est pleine hauteur.

Elle utilise un fond bleu nuit très profond avec :

- un overlay sombre ;
- une photo d’ambulance en bas/milieu ;
- un effet lumineux bleu au centre de l’image ;
- des formes géométriques très discrètes en arrière-plan ;
- une ambiance nocturne, professionnelle et médicale.

### 5.2 Fond visuel

La maquette montre clairement une ambulance réelle en arrière-plan.

Point important : un simple dégradé bleu ne suffit pas pour atteindre 99 %.

La future production doit donc prévoir l’un des deux choix suivants :

1. utiliser une image déjà présente ou autorisée dans le repo si disponible ;
2. à défaut, reproduire au plus proche l’effet avec un fond sombre, une silhouette ou un visuel métier intégré.

Si aucune image ambulance n’est disponible dans le repo :

```txt
INFORMATION NON FOURNIE — À CONFIRMER
```

Dans ce cas, Codex doit documenter le manque et produire la meilleure approximation visuelle possible sans inventer de ressource externe non fournie.

### 5.3 Couleurs de fond approximatives

| Élément | Couleur cible approximative |
|---|---|
| Bleu nuit principal | `#06275A` à `#082F6B` |
| Bleu très profond overlay | `#021B3F` |
| Cyan accent | `#19D3E6` |
| Texte blanc | `#FFFFFF` / `#F5FAFF` |
| Texte secondaire | `rgba(255,255,255,0.82)` |

### 5.4 Branding haut gauche

La zone branding est en haut à gauche, avec une marge importante.

Elle comprend :

- une icône ambulance blanche et cyan ;
- un petit symbole rouge au-dessus ;
- le texte `Ambulance` en blanc ;
- le texte `Manager` en cyan ;
- un badge `ALPHA` bleu sous le titre.

Structure visible :

```txt
[icône ambulance] Ambulance
                 Manager
                 [ALPHA]
```

Contraintes :

- l’icône doit être plus grande que dans le code actuel ;
- le texte doit être très lisible ;
- `Ambulance` et `Manager` doivent être sur deux lignes ;
- `Manager` doit utiliser le cyan de marque ;
- le badge `ALPHA` est petit, arrondi, bleu vif, avec texte blanc.

### 5.5 Promesse principale

Texte visible dans la maquette :

```txt
Simplifiez la gestion
opérationnelle de votre
société de transport
sanitaire.
```

Contraintes :

- texte en blanc ;
- graisse forte ;
- gros corps ;
- alignement gauche ;
- largeur limitée pour forcer les retours à la ligne ;
- pas de paragraphe explicatif supplémentaire visible sous le titre ;
- petit trait cyan horizontal sous la promesse.

Écart actuel probable : le code contient une description supplémentaire sous le titre. Si cette description apparaît à l’écran, elle doit être supprimée ou masquée pour coller à la maquette.

### 5.6 Liste des bénéfices

La maquette affiche quatre bénéfices, verticalement, avec icône cyan à gauche et texte à droite.

Bénéfices visibles :

```txt
Planning intelligent
Organisez vos équipes
et vos interventions

Flotte optimisée
Suivez vos véhicules
et équipements

Équipes connectées
Gérez vos utilisateurs
et compétences

Conformité & sécurité
Données sécurisées
et tracées
```

Contraintes visuelles :

- pas de cartes individuelles autour de chaque bénéfice ;
- pas de fond opaque par item ;
- icônes cyan simples ;
- titre blanc semi-gras ;
- description blanche atténuée ;
- espacement vertical régulier ;
- liste alignée avec la promesse principale.

Écart actuel probable : le code peut afficher chaque bénéfice dans une petite carte avec bordure/fond. Pour coller à la maquette, ces fonds doivent être retirés.

### 5.7 Carte sécurité basse

En bas à gauche, la maquette affiche une carte translucide.

Contenu visible :

```txt
Accès réservé aux utilisateurs autorisés
Vos données sont hébergées en France
et protégées conformément au RGPD.
```

Contraintes :

- carte large mais pas pleine largeur ;
- fond bleu translucide ;
- bordure subtile cyan/bleu ;
- icône cadenas cyan dans un cercle ou carré arrondi ;
- titre blanc ;
- texte secondaire blanc atténué ;
- position basse, alignée avec les autres contenus.

Écart actuel probable : le code actuel affiche une note sécurité plus courte. Elle doit être remplacée visuellement par la carte complète de la maquette.

---

## 6. Zone droite formulaire

### 6.1 Structure générale

La zone droite occupe environ 53 % de la largeur desktop.

Elle utilise un fond très clair :

- blanc cassé ;
- très léger bleu ;
- motifs hexagonaux très discrets ;
- texture pointillée subtile sur la partie haute/gauche ;
- ombres douces.

Le fond ne doit pas être un simple gris plat.

### 6.2 Motifs décoratifs

La maquette montre des formes hexagonales très pâles sur le fond droit.

Contraintes :

- motifs très discrets ;
- faible contraste ;
- pas de surcharge ;
- ne doivent jamais gêner la lecture du formulaire ;
- peuvent être réalisés en CSS si aucune image n’est disponible.

### 6.3 Carte de connexion

La carte est centrée dans la zone droite, légèrement au-dessus du centre vertical.

Caractéristiques :

| Propriété | Valeur cible approximative |
|---|---|
| Largeur | 500 px |
| Hauteur | 715 px environ avec erreur visible |
| Fond | blanc |
| Bordure | bleu-gris très pâle |
| Radius | 12 à 16 px |
| Ombre | douce, diffuse, légère |
| Padding horizontal | 40 à 42 px |
| Padding vertical | 80 px haut environ à cause de l’icône flottante |

La carte ne doit pas être trop petite.

Elle ne doit pas être collée en haut.

Elle ne doit pas être trop arrondie.

### 6.4 Icône flottante au-dessus de la carte

La maquette affiche une icône ambulance ronde, centrée au-dessus de la carte, qui chevauche son bord supérieur.

Contraintes :

- position centrée horizontalement ;
- cercle blanc ;
- taille approximative 105 à 115 px ;
- ombre douce ;
- bordure légère ;
- icône ambulance cyan avec petit détail rouge ;
- la carte commence visuellement sous ce cercle.

Écart actuel probable : le code positionne l’icône à gauche de la carte. Elle doit être recentrée en haut.

### 6.5 Titre et sous-titre

Titre visible :

```txt
Connexion
```

Sous-titre visible :

```txt
Accédez à votre espace Ambulance Manager
```

Contraintes :

- titre centré ;
- couleur bleu nuit ;
- graisse forte ;
- taille importante ;
- sous-titre centré ;
- gris/bleu atténué ;
- pas de point final dans la maquette ;
- séparateur horizontal fin sous le sous-titre.

Écart actuel probable : le code ajoute un point final au sous-titre. Il doit être supprimé visuellement.

### 6.6 Séparateur horizontal supérieur

Un trait horizontal pâle sépare le titre/sous-titre du formulaire.

Contraintes :

- largeur pleine à l’intérieur de la carte ;
- couleur bleu-gris très claire ;
- marge haute et basse équilibrée.

---

## 7. Formulaire

### 7.1 Champ email

Label visible :

```txt
Adresse email
```

Placeholder visible :

```txt
exemple@ambulances.fr
```

Contraintes :

- label au-dessus du champ ;
- label bleu nuit ;
- champ blanc ;
- bordure bleu-gris pâle ;
- radius environ 8 à 10 px ;
- hauteur environ 46 à 48 px ;
- icône mail à gauche ;
- placeholder gris/bleu ;
- espacement interne confortable.

### 7.2 Champ mot de passe

Label visible :

```txt
Mot de passe
```

Placeholder visible :

```txt
Votre mot de passe
```

Contraintes :

- même style que l’email ;
- icône cadenas à gauche ;
- icône œil à droite ;
- l’icône œil est discrète ;
- l’alignement vertical doit être parfaitement centré.

### 7.3 Checkbox souvenir

Texte visible :

```txt
Se souvenir de moi
```

Contraintes :

- checkbox bleue cochée par défaut dans la maquette ;
- position sous le champ mot de passe ;
- alignement à gauche ;
- taille discrète ;
- texte bleu/gris.

### 7.4 Bouton principal

Texte visible :

```txt
Connexion
```

Contraintes :

- bouton pleine largeur ;
- bleu vif ;
- texte blanc ;
- icône cadenas blanche à gauche du texte ;
- hauteur environ 48 px ;
- radius environ 8 px ;
- espacement avant/après conforme à la maquette ;
- pas de bouton secondaire visible.

### 7.5 Message d’erreur

La maquette montre l’état erreur visible.

Titre visible :

```txt
Identifiants invalides
```

Description visible :

```txt
L’adresse email ou le mot de passe est incorrect.
```

Contraintes :

- bloc erreur sous le bouton `Connexion` ;
- fond rouge très pâle ;
- bordure rouge pâle ;
- icône alerte rouge à gauche ;
- titre rouge gras ;
- description bleu nuit / gris foncé ;
- padding confortable ;
- radius 8 à 10 px.

Écart actuel probable : le code affiche l’erreur avant la checkbox et avant le bouton. Pour coller à la maquette, l’erreur doit être placée après le bouton.

### 7.6 État erreur permanent ou conditionnel

La maquette montre l’erreur pour illustrer l’état.

En code réel, le message doit rester conditionnel selon l’état d’erreur.

Mais la structure visuelle doit être prévue pour reproduire exactement l’état visible quand une erreur existe.

---

## 8. Bas de carte

### 8.1 Séparateur bas

La maquette affiche un séparateur horizontal entre l’erreur et les mentions.

Contraintes :

- trait fin ;
- bleu-gris très pâle ;
- marge verticale suffisante ;
- aligné avec la largeur interne de la carte.

### 8.2 Mentions d’information

Texte visible :

```txt
En vous connectant, vous acceptez les
Mentions d’information
```

Contraintes :

- centré ;
- première ligne gris/bleu ;
- lien bleu ;
- pas de formulation différente ;
- pas de simple phrase `Consultez les mentions...` si elle ne correspond pas à la maquette.

Écart actuel probable : le code affiche `Consultez les mentions d'information.` Cette formulation doit être remplacée visuellement par celle de la maquette.

---

## 9. Badge bas de page

### 9.1 Contenu visible

En bas de la zone droite, centré sous la carte :

```txt
🇫🇷 Hébergé en France | Conforme RGPD
```

La maquette montre :

- un pictogramme drapeau français ;
- le texte `Hébergé en France` ;
- un séparateur vertical ;
- une icône bouclier bleue ;
- le texte `Conforme RGPD`.

### 9.2 Contraintes visuelles

- badge horizontal ;
- fond blanc ou blanc très légèrement bleuté ;
- bordure bleu-gris pâle ;
- radius moyen ;
- hauteur environ 44 px ;
- largeur environ 330 à 340 px ;
- position basse mais pas collée au bord inférieur ;
- centré horizontalement dans la zone droite.

Écart actuel probable : le code affiche `Application professionnelle de transport sanitaire`. Ce texte doit être remplacé visuellement par le badge `Hébergé en France | Conforme RGPD`.

---

## 10. Écarts connus entre code actuel et maquette

Cette section prépare le travail Codex. Elle ne constitue pas une demande de correction immédiate.

### 10.1 Écarts visuels probables dans `app/login/page.tsx`

| Zone | Code actuel probable | Maquette cible | Action visuelle future |
|---|---|---|---|
| Fond gauche | Dégradé bleu / pas de photo évidente | Photo ambulance sombre + overlay | Ajouter/approcher le visuel ambulance |
| Branding | Icône plus petite, structure moins proche | Icône grande + titre en deux lignes + badge dessous | Recomposer le bloc marque |
| Texte gauche | Titre + description | Titre seul + trait cyan | Masquer/supprimer description |
| Bénéfices | Items possiblement en cartes | Liste simple sans cartes | Retirer fonds/bordures d’items |
| Carte sécurité | Note courte | Carte RGPD complète | Recomposer la carte basse |
| Icône carte login | Icône en haut gauche | Icône ronde centrée et flottante | Repositionner au centre |
| Sous-titre | Point final possible | Pas de point final | Ajuster le texte |
| Erreur | Avant checkbox/bouton | Après bouton | Déplacer l’erreur visuellement |
| Mentions | Formulation différente | “En vous connectant…” | Modifier la formulation visible |
| Badge bas | Texte professionnel générique | Hébergé France / RGPD | Recomposer le badge |

### 10.2 Écarts de textes et accents

Le code actuel peut contenir des chaînes sans accents, par exemple :

```txt
operationnelle
societe
equipes
vehicules
securite
Accedez
```

La maquette utilise des textes accentués.

Pour une fidélité 99 %, les libellés visibles doivent être corrigés en français accentué.

### 10.3 Éléments fonctionnels non bloquants

La checkbox `Se souvenir de moi` est visible dans la maquette. Elle peut rester.

Le toggle mot de passe est visible dans la maquette. Il peut rester.

Le comportement réel de l’erreur peut rester conditionnel.

Les redirections existantes peuvent rester.

La logique NextAuth ne doit pas être touchée.

---

## 11. Ce qui peut être masqué ou supprimé visuellement

Pour respecter la maquette à 99 %, Codex pourra masquer, supprimer ou déplacer visuellement :

- texte descriptif supplémentaire sous la promesse gauche ;
- fonds ou bordures autour des bénéfices ;
- texte bas de page non conforme ;
- phrase de mentions non conforme ;
- éléments de loading visibles non prévus par la maquette ;
- toute décoration ou carte absente de l’image officielle ;
- tout bouton secondaire absent de la maquette.

Ces suppressions sont acceptables dans cette phase, car le fonctionnel n’est pas prioritaire.

---

## 12. Ce qui ne doit pas être inventé

Codex ne doit pas ajouter :

- inscription / création de compte ;
- mot de passe oublié ;
- SSO ;
- connexion Google / Microsoft ;
- choix de société ;
- choix de rôle ;
- QR code ;
- démo publique ;
- lien commercial ;
- carrousel marketing ;
- animations complexes non visibles ;
- nouveau thème de marque.

Si un élément n’est pas visible dans la maquette, il ne doit pas être ajouté pour “améliorer” la page.

---

## 13. Recommandations CSS / intégration

### 13.1 Structure de classes recommandée

La structure actuelle peut être conservée si elle permet la reproduction visuelle.

Classes probables :

```txt
.login-page
.login-page__showcase
.login-page__brand
.login-page__brand-icon
.login-page__brand-title
.login-page__brand-chip
.login-page__intro
.login-page__intro-title
.login-page__highlights
.login-page__security-note
.login-page__form-area
.login-card
.login-card__icon
.login-card__title
.login-card__subtitle
.login-form
.login-field
.login-field__control
.login-checkbox
.login-submit
.login-error
.login-card__privacy-note
.login-page__bottom-note
```

Codex peut renommer ou compléter les classes si cela améliore la lisibilité, mais il doit éviter une refonte inutile.

### 13.2 Layout recommandé

CSS cible :

```txt
.login-page
  display: grid
  grid-template-columns: 720px 1fr sur desktop large
  min-height: 100vh
```

ou équivalent responsive :

```txt
grid-template-columns: minmax(560px, 47vw) 1fr
```

La zone gauche doit rester visuellement large, immersive, et pleine hauteur.

### 13.3 Positionnement de la carte

La carte ne doit pas être simplement placée au centre absolu vertical parfait.

Elle doit être légèrement haute, comme dans la maquette.

Approche possible :

```txt
.login-page__form-area
  display: grid
  align-content: center
  justify-items: center
  padding-top légèrement négocié
```

ou :

```txt
.login-card-wrapper
  transform: translateY(-20px)
```

### 13.4 Décorations de fond

Les motifs hexagonaux peuvent être faits en CSS :

- pseudo-éléments ;
- background radial/linear ;
- border polygon approximatif ;
- SVG inline si déjà autorisé.

Ils doivent rester très subtils.

### 13.5 Image ambulance

Si une image est ajoutée, elle doit :

- être sombre ;
- être recouverte par un overlay bleu ;
- ne pas gêner la lisibilité ;
- être située principalement en bas/milieu gauche ;
- conserver une ambiance ambulance réaliste.

Si aucune image n’est disponible, ne pas télécharger automatiquement une image externe sans validation.

---

## 14. Accessibilité minimale à conserver

Même si la phase est visuelle, il faut conserver :

- labels de champs ;
- `type="email"` ;
- `type="password"` ou toggle existant ;
- `autoComplete="email"` ;
- `autoComplete="current-password"` ;
- bouton submit réel ;
- message d’erreur avec `role="alert"` si existant ;
- lien réel vers les mentions d’information.

La fidélité visuelle ne doit pas casser l’usage minimal du formulaire.

---

## 15. Responsive

La maquette officielle disponible est desktop.

Responsive cible :

```txt
INFORMATION NON FOURNIE — À CONFIRMER
```

Recommandation minimale :

- en dessous d’environ 1100 px, empiler la zone gauche puis la carte ;
- réduire la hauteur de la zone gauche ;
- conserver le branding et la promesse ;
- éviter les débordements ;
- ne pas chercher une version mobile inventive non validée.

Le contrôle de fidélité 99 % s’applique d’abord au desktop large.

---

## 16. Checklist de contrôle manuel Nathan

Après production Codex future, Nathan devra vérifier visuellement :

### 16.1 Vue globale

- [ ] La page est bien divisée en deux grandes zones gauche/droite.
- [ ] La zone gauche occupe environ 45–50 % de la largeur.
- [ ] La zone droite est claire, calme et centrée sur la carte.
- [ ] Aucun shell connecté n’apparaît.
- [ ] La page donne une impression SaaS santé premium.

### 16.2 Zone gauche

- [ ] Le fond est bleu nuit profond.
- [ ] L’ambiance ambulance est visible ou approximée proprement.
- [ ] Le branding `Ambulance Manager` est en haut à gauche.
- [ ] `Manager` est cyan.
- [ ] Le badge `ALPHA` est visible sous le logo/texte.
- [ ] La promesse principale correspond à la maquette.
- [ ] Le petit trait cyan sous la promesse est présent.
- [ ] Les 4 bénéfices sont alignés verticalement.
- [ ] Les bénéfices n’ont pas de cartes individuelles visibles.
- [ ] La carte sécurité basse reprend le texte RGPD complet.

### 16.3 Carte de connexion

- [ ] La carte est centrée dans la zone droite.
- [ ] L’icône ambulance ronde est centrée au-dessus de la carte.
- [ ] Le titre `Connexion` est centré.
- [ ] Le sous-titre correspond à la maquette.
- [ ] Le séparateur horizontal supérieur est présent.
- [ ] Les champs ont la bonne hauteur, bordure et rondeur.
- [ ] Le bouton bleu pleine largeur correspond à la maquette.
- [ ] L’erreur est sous le bouton.
- [ ] Le bloc erreur est rouge pâle avec icône et texte conforme.
- [ ] Les mentions sont centrées et en deux lignes.

### 16.4 Bas de page

- [ ] Le badge `Hébergé en France | Conforme RGPD` est présent.
- [ ] Le badge est centré sous la carte.
- [ ] Il remplace tout texte générique non visible dans la maquette.

### 16.5 Non-régression visuelle

- [ ] Aucun lien ou bouton non visible dans la maquette n’a été ajouté.
- [ ] Aucun bloc fonctionnel parasite n’apparaît.
- [ ] La page reste lisible et alignée à la maquette officielle.

---

## 17. Definition of Done visuelle

La page Login pourra être considérée conforme visuellement si :

```txt
- le rendu desktop est fidèle à Login_V1.1.png à environ 99 % ;
- la division gauche/droite est respectée ;
- le panneau gauche est immersif, bleu, ambulance, sécurité ;
- la carte de connexion est centrée, claire et conforme ;
- les textes visibles correspondent à la maquette ;
- les éléments non visibles dans la maquette sont absents ou masqués ;
- la logique fonctionnelle de connexion existante n’a pas été refondue ;
- aucune phrase documentaire type INFORMATION NON FOURNIE — À CONFIRMER n’apparaît dans l’interface.
```

---

## 18. Prompt court futur pour Codex

À utiliser plus tard, dans une session de production code dédiée :

```txt
Tu dois réaligner uniquement le visuel de la page Login sur la maquette officielle Login_V1.1.png.

Référence obligatoire :
docs/1-MASTER/2-REFERENCE_UI_UX/REFERENCE_UI_UX_LOGIN.md

Objectif : reproduction visuelle à 99 %.

Priorité : image officielle > document REFERENCE_UI_UX_LOGIN.md > code actuel.

Ne refonds pas NextAuth, RBAC, Prisma, API, session ou redirections.

Le fonctionnel n’est pas prioritaire dans cette phase : si un élément visible existant gêne la fidélité à la maquette, il peut être masqué, déplacé, simplifié ou supprimé visuellement.

Tu dois fournir un patch ciblé, une preuve git apply --check, npm run lint, npm run build, et une checklist de contrôle visuel manuel à effectuer par Nathan.
```

---

## 19. Verdict documentaire

```txt
DOCUMENT REFERENCE_UI_UX_LOGIN.md CRÉÉ : OUI
PAGE CONCERNÉE IDENTIFIÉE : OUI
MAQUETTE OFFICIELLE IDENTIFIÉE : OUI
ROUTE CODE IDENTIFIÉE : OUI
FICHIERS CODE PROBABLES IDENTIFIÉS : OUI
PRIORITÉ VISUELLE 99 % VERROUILLÉE : OUI
FONCTIONNEL NON BLOQUANT VERROUILLÉ : OUI
SUPPRESSION / MASQUAGE VISUEL AUTORISÉ SI NÉCESSAIRE : OUI
PRODUCTION CODE DEMANDÉE MAINTENANT : NON
```
