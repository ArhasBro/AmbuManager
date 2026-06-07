# Ambulance Manager — Référence UI/UX — Login

Version : V2  
Statut : référence UI/UX codable  
Objectif : reproduction visuelle 99 %  
Source visuelle : docs/1-MASTER/1-MAQUETTE/1-Login/Login_V2.png  
Source fonctionnelle : docs/1-MASTER/3-FONCTIONNALITES/1-FONCTIONNALITES_DETAILLEES_LOGIN_V1.1.md

## Sommaire
- [1. Objectif du document](#1-objectif-du-document)
- [2. Sources utilisées](#2-sources-utilisées)
- [3. Règle d’autorité](#3-règle-dautorité)
- [4. Rôle de la page Login](#4-rôle-de-la-page-login)
- [5. Objectif UX de la page](#5-objectif-ux-de-la-page)
- [6. Structure générale de l’écran](#6-structure-générale-de-lécran)
- [7. Layout desktop attendu](#7-layout-desktop-attendu)
- [8. Zone visuelle gauche](#8-zone-visuelle-gauche)
- [9. Image d’ambiance et overlay](#9-image-dambiance-et-overlay)
- [10. Zone formulaire droite](#10-zone-formulaire-droite)
- [11. Identité produit](#11-identité-produit)
- [12. Titre et sous-titre](#12-titre-et-sous-titre)
- [13. Champs de formulaire](#13-champs-de-formulaire)
- [14. Champ mot de passe et affichage masqué](#14-champ-mot-de-passe-et-affichage-masqué)
- [15. Option Se souvenir de moi](#15-option-se-souvenir-de-moi)
- [16. Bouton de connexion](#16-bouton-de-connexion)
- [17. États visuels du formulaire](#17-états-visuels-du-formulaire)
- [18. Messages d’erreur](#18-messages-derreur)
- [19. Règles de sécurité visibles](#19-règles-de-sécurité-visibles)
- [20. Hiérarchie visuelle](#20-hiérarchie-visuelle)
- [21. Espacements, dimensions et densité](#21-espacements-dimensions-et-densité)
- [22. Couleurs et ambiance visuelle](#22-couleurs-et-ambiance-visuelle)
- [23. Typographie](#23-typographie)
- [24. Icônes](#24-icônes)
- [25. Composants réutilisables futurs](#25-composants-réutilisables-futurs)
- [26. Stratégie Tailwind future](#26-stratégie-tailwind-future)
- [27. Responsive futur](#27-responsive-futur)
- [28. Accessibilité minimale](#28-accessibilité-minimale)
- [29. Ce qui doit être codé plus tard](#29-ce-qui-doit-être-codé-plus-tard)
- [30. Ce qui ne doit pas être codé](#30-ce-qui-ne-doit-pas-être-codé)
- [31. Interdictions de dérive](#31-interdictions-de-dérive)
- [32. Checklist de conformité visuelle 99 %](#32-checklist-de-conformité-visuelle-99-)

## 1. Objectif du document
Ce document définit la référence UI/UX codable de la page Login à reproduire visuellement à 99 % sur base de la maquette Login_V2.png.

Il ne valide pas définitivement la fonctionnalité métier. Il sert à cadrer une implémentation fidèle, mesurable et non interprétative.

## 2. Sources utilisées
- Source visuelle unique : docs/1-MASTER/1-MAQUETTE/1-Login/Login_V2.png.
- Source fonctionnelle unique : docs/1-MASTER/3-FONCTIONNALITES/1-FONCTIONNALITES_DETAILLEES_LOGIN_V1.1.md.

## 3. Règle d’autorité
1. Maquette Login_V2.png.
2. Fiche fonctionnalités Login V1.1.

Aucune autre source n’est autorisée pour définir l’UI/UX de cette page.

## 4. Rôle de la page Login
La page Login est une porte d’entrée d’authentification.

Rôle attendu :
- permettre la connexion par email + mot de passe ;
- empêcher toute entrée non authentifiée ;
- rediriger après succès vers le Tableau de bord ;
- ne pas porter de parcours métier additionnel.

## 5. Objectif UX de la page
Objectif UX principal : inspirer confiance, rendre l’action de connexion immédiate et réduire la charge cognitive.

Objectifs UX secondaires :
- lisibilité forte du formulaire ;
- hiérarchie claire entre contenu visuel et action principale ;
- feedback d’état explicite (disabled, loading, erreur) ;
- perception de sécurité (mentions, ton sobre, absence de détails techniques).

## 6. Structure générale de l’écran
Écran pleine hauteur, hors Shell global.

Structure en deux zones verticales :
- zone visuelle gauche immersive ;
- zone formulaire droite sur fond clair.

Le Shell global ne doit pas être visible sur la page Login.

## 7. Layout desktop attendu
Référence de composition observée sur maquette : 1920 x 978.

Attendu desktop :
- découpe visuelle gauche/droite proche de 50/50 ;
- panneau gauche occupant toute la hauteur avec image de fond ;
- panneau droit occupant toute la hauteur avec carte de connexion centrée ;
- badges de conformité en bas de zone droite ;
- aucune barre de navigation applicative.

## 8. Zone visuelle gauche
Éléments visibles obligatoires :
- logo pictogramme ambulance en haut à gauche ;
- nom produit sur deux lignes : Ambulance puis Manager ;
- badge ALPHA sous le nom produit ;
- promesse textuelle grande taille :
  Simplifiez la gestion opérationnelle de votre société de transport sanitaire.
- liste de 4 bénéfices avec icône + titre + sous-texte :
  - Planning intelligent / Organisez vos équipes et vos interventions
  - Flotte optimisée / Suivez vos véhicules et équipements
  - Équipes connectées / Gérez vos utilisateurs et compétences
  - Conformité & sécurité / Données sécurisées et tracées
- carte de réassurance en bas :
  - titre : Accès réservé aux utilisateurs autorisés
  - texte : Vos données sont hébergées en France et protégées conformément au RGPD.

## 9. Image d’ambiance et overlay
Image d’ambiance : scène opérationnelle de flotte d’ambulances et environnement de supervision numérique.

Overlay attendu :
- voile sombre bleuté sur l’image pour augmenter le contraste du texte blanc/cyan ;
- gradient latéral renforcé côté texte ;
- conservation de la lecture des ambulances et de l’environnement sans écraser les détails lumineux.

Exigence de lisibilité :
- le texte principal gauche doit rester lisible en un seul balayage visuel ;
- les listes et la carte de réassurance doivent rester lisibles sans zoom.

## 10. Zone formulaire droite
Fond clair texturé (grille de points et traits diagonaux subtils).

Bloc principal :
- une carte de connexion rectangulaire à coins arrondis, centrée dans la moitié droite ;
- un médaillon logo circulaire qui chevauche le haut de la carte ;
- une zone basse dédiée aux mentions de conformité (Hébergé en France, Conforme RGPD).

## 11. Identité produit
Identité visible côté gauche :
- composition logo + mot-symbole ;
- contraste bicolore du nom produit (Ambulance en clair, Manager en cyan) ;
- badge ALPHA comme niveau/version visuelle.

Identité côté formulaire :
- rappel visuel par médaillon logo en tête de carte.

## 12. Titre et sous-titre
Dans la carte de connexion :
- titre principal : Connexion ;
- sous-titre : Accédez à votre espace Ambulance Manager.

Règles :
- titre centré, dominant, sans parasite ;
- sous-titre plus léger et immédiatement sous le titre ;
- séparation horizontale discrète avant les champs.

## 13. Champs de formulaire
Champs visibles :
- Adresse email ;
- Mot de passe.

Règles de structure :
- label au-dessus de chaque champ ;
- icône discrète à gauche dans l’input ;
- champ à fond clair bleuté, bordure fine, coins arrondis ;
- largeur des champs alignée avec la largeur utile de la carte ;
- aucune aide technique, aucun placeholder métier inventé.

Note de maquette : une valeur dmin@ambulance.local est visible dans le champ email en démonstration visuelle ; cela ne vaut pas exigence fonctionnelle de préremplissage.

## 14. Champ mot de passe et affichage masqué
Contraintes visibles et fonctionnelles :
- mot de passe masqué par défaut ;
- action afficher/masquer présente dans le champ mot de passe ;
- action rendue par une icône œil discrète en extrémité droite ;
- l’icône ne doit pas concurrencer visuellement le bouton principal.

## 15. Option Se souvenir de moi
Dans la maquette V2, l’option est visible et cochable : Se souvenir de moi.

Règles UI :
- case à cocher carrée/arrondie discrète, alignée à gauche du libellé ;
- libellé lisible et cliquable ;
- placement entre le champ mot de passe et le bouton de connexion.

## 16. Bouton de connexion
Bouton primaire unique : Connexion.

Règles UI :
- largeur pleine de la zone formulaire ;
- fond bleu d’accent ;
- texte blanc fort contraste ;
- icône cadenas discrète avant le texte ;
- coins arrondis cohérents avec le reste du formulaire.

## 17. États visuels du formulaire
États à documenter et à coder plus tard :
- Initial : champs vides, bouton de connexion inactif.
- Saisie partielle : au moins un champ renseigné, bouton encore inactif.
- Prêt : email et mot de passe renseignés, bouton actif.
- Loading : bouton en état de traitement, double soumission empêchée.
- Erreur : message visible, ton sobre, pas de détails techniques.
- Succès : transition vers le Tableau de bord.

Règle visible obligatoire : blocage clair si email ou mot de passe vide.

## 18. Messages d’erreur
Messages attendus : sobres, génériques, sécurisés.

Principes :
- ne jamais préciser si l’erreur vient de l’email ou du mot de passe ;
- ne jamais afficher stack trace, JSON, code serveur, nom de table ou info interne ;
- rester orienté utilisateur.

Exemples de tonalité conforme :
- Identifiants invalides.
- Connexion impossible. Veuillez réessayer.

## 19. Règles de sécurité visibles
Règles à respecter dans l’UI Login :
- connexion uniquement par email + mot de passe ;
- absence d’inscription libre ;
- absence de choix manuel de rôle ;
- absence de choix manuel de société ;
- absence de choix manuel de dépôt/base ;
- absence de mot de passe oublié dans le périmètre actif ;
- absence de debug visible ;
- redirection post-connexion vers Tableau de bord ;
- messages d’erreur non techniques.

## 20. Hiérarchie visuelle
Ordre de lecture attendu :
1. Identité produit (gauche) + contexte confiance.
2. Titre Connexion (droite).
3. Champs email et mot de passe.
4. Option Se souvenir de moi.
5. Bouton Connexion.
6. Mentions d’information et badges RGPD.

La hiérarchie doit garder l’action de connexion au centre du parcours visuel.

## 21. Espacements, dimensions et densité
Référentiel de densité visuelle :
- marge confortable autour de la carte de connexion ;
- espacement régulier vertical entre label, champ, checkbox et bouton ;
- interlignage ample dans la promesse gauche ;
- densité contrôlée dans la liste bénéfices (lisible sans compacter).

Contraintes de cohérence :
- alignements verticaux stricts dans la carte ;
- rayons homogènes (champs, bouton, carte, badges) ;
- séparateurs fins et peu contrastés.

## 22. Couleurs et ambiance visuelle
Direction colorimétrique de la maquette :
- gauche : dominante bleu nuit / cyan lumineux ;
- droite : fond gris très clair avec nuances bleutées ;
- action primaire : bleu saturé ;
- textes principaux : bleu marine foncé sur fond clair ;
- textes secondaires : gris bleuté.

Ambiance visuelle attendue :
- professionnelle SaaS B2B ;
- médicale/opérationnelle sans surcharge ;
- crédible, sécurisante, sobre.

## 23. Typographie
Style typographique observé : sans serif moderne.

Règles UI :
- grand titre de carte (Connexion) clairement dominant ;
- labels de champs plus petits mais contrastés ;
- texte des bénéfices gauche hiérarchisé (titre puis description) ;
- aucune fantaisie typographique non présente sur la maquette.

## 24. Icônes
Icônes visibles :
- ambulance/logo ;
- email ;
- cadenas (mot de passe et bouton) ;
- œil (afficher/masquer) ;
- pictos de bénéfices ;
- sécurité/RGPD.

Règles :
- style linéaire cohérent ;
- taille discrète ;
- rôle de renfort visuel, pas d’ornement dominant.

## 25. Composants réutilisables futurs
Composants à documenter pour implémentation ultérieure (sans les créer ici) :
- components/auth/LoginPage
- components/auth/LoginForm
- components/auth/LoginField
- components/auth/PasswordField
- components/auth/RememberMeCheckbox
- components/auth/LoginSubmitButton
- components/auth/LoginErrorMessage
- components/ui/Button
- components/ui/Input
- components/ui/Checkbox
- components/ui/Card

## 26. Stratégie Tailwind future
Stratégie à documenter pour implémentation future, sans config complète :
- fond plein écran ;
- grille deux colonnes desktop ;
- largeur zone image ;
- largeur zone formulaire ;
- couleurs de fond ;
- overlay image ;
- couleurs de texte ;
- couleur d’accent bleu ;
- bordures ;
- rayons ;
- ombres légères ;
- espacements ;
- états focus ;
- états disabled ;
- états erreur ;
- responsive mobile futur.

Règle : rester aligné à la maquette V2, sans dérive décorative.

## 27. Responsive futur
Le responsive n’est pas la cible principale de la maquette desktop V2, mais doit être anticipé.

Cadre futur :
- bascule en colonne unique ;
- priorité au formulaire ;
- conservation lisible de l’identité visuelle ;
- maintien des mentions conformité ;
- aucune perte de clarté des états de formulaire.

## 28. Accessibilité minimale
Niveau minimal attendu à la future implémentation :
- labels explicites et associés aux champs ;
- contraste texte/fond suffisant ;
- focus visible sur champs, checkbox et bouton ;
- action afficher/masquer actionnable clavier ;
- messages d’erreur compréhensibles, non techniques ;
- ordre de tabulation logique.

## 29. Ce qui doit être codé plus tard
À coder plus tard, selon cette référence UI/UX :
- layout split final fidèle à la maquette ;
- carte de connexion avec médaillon logo ;
- champs email/mot de passe + toggle visibilité ;
- checkbox Se souvenir de moi ;
- bouton Connexion avec états disabled, loading, ctif ;
- gestion visuelle des erreurs génériques ;
- redirection vers Tableau de bord après succès ;
- mentions légales et badges conformité visibles.

## 30. Ce qui ne doit pas être codé
Éléments interdits hors périmètre actif :
- inscription libre ;
- création de compte depuis Login ;
- mot de passe oublié si non validé dans le périmètre actif ;
- 2FA ;
- SSO ;
- choix manuel de rôle ;
- choix manuel de société ;
- choix manuel de dépôt/base ;
- debug visible ;
- affichage d’erreur technique détaillée ;
- cockpit ou données métier sur l’écran Login ;
- Shell global sur la page Login.

## 31. Interdictions de dérive
Interdictions de dérive UI/UX :
- ne pas remplacer la composition split par une autre structure ;
- ne pas déplacer l’action principale hors carte de connexion ;
- ne pas surcharger la page avec liens secondaires non validés ;
- ne pas introduire de parcours non autorisés ;
- ne pas modifier la tonalité visuelle sécurisante (bleu professionnel, contraste maîtrisé) ;
- ne pas introduire d’éléments visuels absents des sources ;
- ne jamais considérer ce document comme validation fonctionnelle définitive.

## 32. Checklist de conformité visuelle 99 %
- [ ] Split écran gauche/droite conforme à la maquette V2.
- [ ] Zone gauche avec logo, Ambulance Manager, badge ALPHA, promesse, 4 bénéfices et carte de réassurance.
- [ ] Image d’ambiance ambulance conservée avec overlay lisible.
- [ ] Zone droite avec fond clair texturé et carte centrale.
- [ ] Médaillon logo circulaire au sommet de la carte.
- [ ] Titre Connexion et sous-titre conformes.
- [ ] Champs Adresse email et Mot de passe correctement hiérarchisés.
- [ ] Mot de passe masqué par défaut.
- [ ] Bouton discret afficher/masquer présent dans le champ mot de passe.
- [ ] Option Se souvenir de moi présente.
- [ ] Bouton Connexion plein largeur, accent bleu, état disabled documenté.
- [ ] États loading et erreur documentés sans message technique.
- [ ] Mention En vous connectant, vous acceptez les Mentions d’information visible.
- [ ] Badge bas droit Hébergé en France | Conforme RGPD visible.
- [ ] Aucune inscription libre.
- [ ] Aucun mot de passe oublié (périmètre actif).
- [ ] Aucun choix manuel de rôle/société/dépôt-base.
- [ ] Aucune information technique exposée à l’utilisateur.
- [ ] Redirection attendue vers Tableau de bord après connexion réussie.
- [ ] Aucun Shell global visible.
- [ ] Référence UI/UX codable distinguée de la validation fonctionnelle définitive.
