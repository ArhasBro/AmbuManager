# A21-UX-05 — Prompts de génération

## 1. Prompt Login_V1.0

```text
Tu es expert en maquette graphique pour web app SaaS, spécialisé dans les interfaces modernes, métier santé / ambulancier, et faisables en code avec VS Code / Codex.

Nous continuons le travail UI/UX sur la WebApp "Ambulance Manager".

IMPORTANT :
- Ne repars pas de zéro.
- Ne propose pas une nouvelle direction artistique.
- Tu dois t’aligner strictement sur les maquettes déjà validées dans les ZIP.
- La version la plus haute de chaque écran est la version validée ou la plus récente.
- La nouvelle page doit donner l’impression qu’elle appartient exactement à la même application.

Je te joins les ZIP d’images :
1. A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0 : maquettes fondatrices validées, référence visuelle principale.
2. A21-UX-04_MAQUETTES_COMPLEMENTAIRES_IMAGES_V1.0 : maquettes complémentaires validées, dont Onboarding_V1.2 et Audit_V1.0.

Pages déjà validées visuellement :
- Dashboard portail
- Planning compact
- Utilisateurs / RH
- Véhicules / flotte
- Templates_V1.1
- Société_V1.0
- Dépôts_V1.0
- Onboarding_V1.2
- Audit_V1.0

Objectif maintenant :
Générer les maquettes des pages simples / finitions.

On commence par une seule maquette :
LOGIN_V1.0

## DA à respecter strictement

- même palette blanc / bleu médical / turquoise / vert santé ;
- même ambiance SaaS métier santé / ambulancier ;
- rendu clair, professionnel, légèrement premium ;
- mêmes arrondis ;
- mêmes cards ;
- mêmes boutons ;
- mêmes badges si utiles ;
- même niveau de finition visuelle ;
- faisable en React / Next.js / Tailwind ;
- desktop 16:10.

## Page Login — périmètre réel

La page doit rester simple.

Ce qu’on peut faire actuellement :
- se connecter avec email ;
- se connecter avec mot de passe ;
- être redirigé vers le dashboard si connexion réussie ;
- afficher une erreur si identifiants invalides, compte inactif ou problème de connexion ;
- accéder aux mentions d’information via un lien vers /privacy.

## Contenu attendu

Titre ou nom produit :
Ambulance Manager

Sous-titre possible :
Gestion opérationnelle pour sociétés de transport sanitaire

Formulaire :
- champ email ;
- champ mot de passe ;
- bouton Connexion ;
- message d’erreur discret mais visible ;
- lien Mentions d’information ;
- éventuellement un petit rappel “Accès réservé aux utilisateurs autorisés”.

## Structure visuelle attendue

Créer une page de connexion moderne, sobre, professionnelle :
- côté gauche : identité produit / illustration abstraite médicale ou bloc de présentation sobre ;
- côté droit : card de connexion ;
- pas de dashboard complet ;
- pas de sidebar applicative connectée ;
- pas de menu complet ;
- pas de marketing excessif.

## Ne pas afficher

- inscription ;
- essai gratuit ;
- abonnement ;
- paiement ;
- mot de passe oublié si ce n’est pas prévu ;
- IA ;
- chatbot ;
- landing page commerciale ;
- témoignages client ;
- multi-société avancée ;
- modules hors périmètre.

Génère directement la maquette :
Login_V1.0
```

---

## 2. Prompt Privacy_V1.0

```text
Très bien, on continue avec la deuxième page simple :

Privacy_V1.0

IMPORTANT :
- Garde strictement la même DA validée.
- Ne repars pas sur une nouvelle direction.
- Cette page doit être simple, lisible et cohérente avec Ambulance Manager.
- Elle doit rester réaliste à coder en React / Next.js / Tailwind.
- Desktop 16:10.

## Page Privacy — périmètre réel

La page /privacy est une page informative de mentions données personnelles.

Elle affiche :
- catégories de données traitées ;
- finalités ;
- accès observés ;
- conservation et suppression ;
- droits RGPD ;
- mentions à confirmer.

Ce qu’elle ne fait pas :
- pas de formulaire RGPD ;
- pas de demande export données ;
- pas de demande suppression ;
- pas d’espace utilisateur privacy ;
- pas de gestion avancée RGPD.

## Contenu attendu

Titre :
Mentions données personnelles

Sous-titre :
Informations relatives au traitement des données dans Ambulance Manager.

Structure :
- header simple ;
- card principale avec sections lisibles ;
- sommaire ou navigation interne légère à gauche ;
- contenu textuel structuré à droite ;
- bouton ou lien retour connexion / retour dashboard selon contexte ;
- badges discrets pour les catégories : Utilisateurs, Planning, Véhicules, Audit, Absences.

Sections à afficher :
1. Données traitées
2. Finalités
3. Accès observés
4. Conservation
5. Droits RGPD
6. Mentions à confirmer

## Style

- clair ;
- professionnel ;
- rassurant ;
- sobre ;
- pas trop dense ;
- cohérent avec la DA santé / ambulancier ;
- pas une page juridique brute illisible.

## Ne pas afficher

- formulaire de demande RGPD ;
- export de données ;
- suppression de compte ;
- gestion des consentements avancée ;
- cookie banner ;
- billing ;
- IA ;
- chatbot ;
- modules hors périmètre.

Génère directement la maquette :
Privacy_V1.0
```
