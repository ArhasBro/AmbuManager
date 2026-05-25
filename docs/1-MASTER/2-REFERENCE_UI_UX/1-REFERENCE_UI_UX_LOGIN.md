# Ambulance Manager — Référence UI/UX — Login

Version : V2
Statut : référence UI/UX codable
Objectif : reproduction visuelle 99 %
Source visuelle : docs/1-MASTER/1-MAQUETTE/MAQUETTE_PNG_V2/1-Login/Login_V2.png
Source fonctionnelle : docs/1-MASTER/3-FONCTIONNALITES/1-FONCTIONNALITES_DETAILLEES_LOGIN_V1.1.md

## Sommaire
- [1. Objectif du document](#1-objectif-du-document)
- [2. Sources utilisées](#2-sources-utilisees)
- [3. Règle d’autorité](#3-regle-dautorite)
- [4. Objectif UX de la page](#4-objectif-ux-de-la-page)
- [5. Rôle métier de la page](#5-role-metier-de-la-page)
- [6. Structure générale de l’écran](#6-structure-generale-de-lecran)
- [7. Layout desktop attendu](#7-layout-desktop-attendu)
- [8. Hiérarchie visuelle](#8-hierarchie-visuelle)
- [9. Zones principales de l’écran](#9-zones-principales-de-lecran)
- [10. Détail de chaque zone](#10-detail-de-chaque-zone)
- [11. Composants visibles](#11-composants-visibles)
- [12. Composants réutilisables à prévoir](#12-composants-reutilisables-a-prevoir)
- [13. Cards](#13-cards)
- [14. Tableaux / listes](#14-tableaux-listes)
- [15. Filtres / recherche](#15-filtres-recherche)
- [16. Boutons / actions](#16-boutons-actions)
- [17. Badges / statuts](#17-badges-statuts)
- [18. Panneaux de détail](#18-panneaux-de-detail)
- [19. Onglets, si applicable](#19-onglets-si-applicable)
- [20. États visuels à prévoir](#20-etats-visuels-a-prevoir)
- [21. Règles d’ergonomie métier](#21-regles-dergonomie-metier)
- [22. Règles de permissions visibles](#22-regles-de-permissions-visibles)
- [23. Responsive futur](#23-responsive-futur)
- [24. Ce qui doit être codé plus tard](#24-ce-qui-doit-etre-code-plus-tard)
- [25. Ce qui ne doit pas être codé](#25-ce-qui-ne-doit-pas-etre-code)
- [26. Interdictions de dérive](#26-interdictions-de-derive)
- [27. Checklist de conformité visuelle 99 %](#27-checklist-de-conformite-visuelle-99)

## 1. Objectif du document
Décrire précisément la page de connexion afin de reproduire le split visuel gauche/droite, la hiérarchie et les états du formulaire sans interprétation libre.

## 2. Sources utilisées
- Maquette active `Login_V2.png`.
- Fiche détaillée Login V1.1.

## 3. Règle d’autorité
1. Maquette Login V2.
2. Fiche fonctionnalités Login.

## 4. Objectif UX de la page
Donner une entrée claire, fiable et rassurante vers l’application, avec effort cognitif minimal.

## 5. Rôle métier de la page
Authentifier l’utilisateur, charger session/rôle/société/permissions, rediriger vers le Tableau de bord.

## 6. Structure générale de l’écran
- Écran split 50/50 approximatif.
- Colonne gauche : branding + message + points clés + bloc sécurité.
- Colonne droite : carte de connexion centrée sur fond clair texturé.

## 7. Layout desktop attendu
- Colonne gauche en visuel immersif sombre (photo ambulance + overlay bleu).
- Colonne droite lumineuse avec carte blanche/gris très clair.
- Carte login verticalement centrée.

## 8. Hiérarchie visuelle
- Priorité 1 : titre `Connexion`.
- Priorité 2 : champs email/mot de passe.
- Priorité 3 : checkbox `Se souvenir de moi`.
- Priorité 4 : bouton primaire `Connexion`.
- Priorité 5 : mentions légales et labels conformité.

## 9. Zones principales de l’écran
- Bloc identité produit gauche (`Ambulance Manager`, `ALPHA`).
- Bloc promesse produit (texte multi-lignes).
- Liste de bénéfices (planning, flotte, équipes, conformité).
- Cartouche sécurité bas gauche.
- Carte formulaire à droite.
- Ruban bas droit `Hébergé en France` / `Conforme RGPD`.

## 10. Détail de chaque zone
- Titre gauche sur deux couleurs (blanc + cyan/bleu).
- Phrase d’accroche très grande et aérée.
- Bénéfices affichés avec icônes ligne.
- Carte de formulaire avec logo rond chevauchant le haut.
- Champs avec icône à gauche, style sobre, bordure fine.

## 11. Composants visibles
- `LoginHeroPanel`
- `LoginBenefitList`
- `LoginSecurityCard`
- `LoginFormCard`
- `TextFieldWithIcon`
- `PasswordFieldWithToggle`
- `RememberMeCheckbox`
- `PrimarySubmitButton`
- `CompliancePills`

## 12. Composants réutilisables à prévoir
- `AuthLayoutSplit`.
- `AuthCard`.
- `FormMessage` pour erreurs.
- `ComplianceBadge`.

## 13. Cards
- Carte principale formulaire.
- Carte sécurité en pied gauche.
- Petits badges conformité en pied droit.

## 14. Tableaux / listes
- Liste de bénéfices gauche uniquement (liste statique).
- Aucun tableau.

## 15. Filtres / recherche
Non applicable.

## 16. Boutons / actions
- Action primaire unique : `Connexion`.
- Action secondaire intégrée : afficher/masquer mot de passe (icône œil).

## 17. Badges / statuts
- Badge `ALPHA` sur marque.
- Label conformité RGPD en bas de page.

## 18. Panneaux de détail
Non applicable.

## 19. Onglets, si applicable
Non applicable.

## 20. États visuels à prévoir
- Initial : champs vides, bouton désactivé.
- Saisie : bouton activé si email + mot de passe.
- Soumission : état chargement, anti double-clic.
- Erreur : message sobre, sans fuite d’information sensible.
- Succès : redirection dashboard.

## 21. Règles d’ergonomie métier
- Pas de friction inutile.
- Libellés explicites `Adresse email`, `Mot de passe`.
- Checkbox `Se souvenir de moi` visible et fonctionnelle.

## 22. Règles de permissions visibles
- Aucune gestion de permissions par UI sur cette page.
- Les permissions sont chargées après authentification validée.

## 23. Responsive futur
- Empiler visuel puis formulaire sur mobile.
- Préserver lisibilité du formulaire et CTA.
- Conserver conformité/mentions en bas de page.

## 24. Ce qui doit être codé plus tard
- Gestion session expirée avec message dédié.
- États d’erreur standardisés.
- Layout auth responsive complet.

## 25. Ce qui ne doit pas être codé
- Inscription libre.
- Mot de passe oublié.
- SSO Google/Microsoft.
- Sélection manuelle rôle/société/base.
- Parcours Mise en route depuis Login.

## 26. Interdictions de dérive
- Ne pas ajouter de lien secondaire non validé fonctionnellement.
- Ne pas afficher des messages d’erreur trop précis (`email incorrect` vs `mot de passe incorrect`).

## 27. Checklist de conformité visuelle 99 %
- Split gauche/droite strictement respecté.
- Carte `Connexion` centrée avec logo rond en surplomb.
- Checkbox `Se souvenir de moi` présente.
- Bouton primaire bleu plein de grande largeur.
- Bloc sécurité gauche + badges conformité bas droit.
- Aucune action non prévue par le périmètre Login V1.
