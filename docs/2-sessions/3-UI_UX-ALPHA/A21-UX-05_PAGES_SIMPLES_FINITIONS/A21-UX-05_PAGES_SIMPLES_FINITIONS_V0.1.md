# A21-UX-05 — PAGES SIMPLES / FINITIONS UI-UX

## 1. Identification

- **Projet** : Ambulance Manager
- **Bloc** : A21 — UI / UX / Navigation
- **Session** : A21-UX-05 — Pages simples / finitions
- **Type** : cadrage UI/UX + préparation maquettes
- **Décision patch code** : `NO_PATCH`
- **Statut initial** : `EN COURS`
- **Livrable principal attendu** : maquettes visuelles `Login_V1.1` et `Privacy_V1.0`, puis validation documentaire.

---

## 2. Contexte

Les sessions précédentes ont permis de valider la direction artistique principale d’Ambulance Manager.

### Déjà intégré

```text
A21-UX-02 — Design System UI/UX ALPHA : validé documentairement / NO_PATCH
A21-UX-03 — maquettes fondatrices : validé documentairement / NO_PATCH
A21-UX-04 — maquettes métier complémentaires : validé documentairement / NO_PATCH
```

### Pages déjà validées visuellement

```text
Dashboard portail      — validé visuellement
Planning compact       — validé visuellement
Utilisateurs / RH      — validé visuellement
Véhicules / flotte     — validé visuellement
Templates_V1.1         — validé visuellement
Société_V1.0           — validé visuellement avec réserve
Dépôts_V1.0            — validé visuellement
Onboarding_V1.2        — validé visuellement
Audit_V1.0             — validé visuellement
```

A21-UX-05 vise à terminer les pages simples et les finitions restantes.

---

## 3. Objectif de la session

Produire et valider les maquettes des pages simples suivantes :

1. `Login_V1.1`
2. `Privacy_V1.0`

Ces pages ne doivent pas réouvrir la direction artistique.  
Elles doivent uniquement appliquer la DA validée aux écrans simples non encore maquettés.

---

## 4. Direction artistique à conserver

Les maquettes A21-UX-05 doivent conserver strictement :

- palette blanc / bleu médical / turquoise / vert santé ;
- ambiance SaaS métier santé / ambulancier ;
- rendu clair, professionnel, légèrement premium ;
- cards blanches arrondies ;
- boutons sobres ;
- badges discrets si utiles ;
- typographie visuelle cohérente ;
- densité professionnelle ;
- faisabilité React / Next.js / Tailwind ;
- format desktop 16:10.

---

## 5. Références visuelles à fournir à l’outil de génération

À transmettre avec le prompt :

```text
A21-UX-03_MAQUETTES_FONDATRICES_IMAGES_V1.0.zip
A21-UX-04_MAQUETTES_COMPLEMENTAIRES_IMAGES_V1.0.zip
```

Règle :

```text
La version la plus haute de chaque écran est la version validée ou la plus récente.
```

Référence principale pour continuité visuelle :

- Dashboard ;
- Templates ;
- Société ;
- Onboarding ;
- Audit.

---

## 6. Périmètre fonctionnel — Login

### Page

```text
/login — Connexion
```

### Ce que la page permet actuellement

- connexion avec email ;
- connexion avec mot de passe ;
- redirection vers `/dashboard` si connexion réussie ;
- affichage d’une erreur si :
  - identifiants invalides ;
  - compte inactif ;
  - problème de connexion ;
- accès aux mentions d’information via lien vers `/privacy`.

### Contenu attendu dans la maquette

- nom produit : `Ambulance Manager` ;
- sous-titre possible : `Gestion opérationnelle pour sociétés de transport sanitaire` ;
- champ email ;
- champ mot de passe ;
- bouton `Connexion` ;
- message d’erreur discret mais visible ;
- lien `Mentions d’information` ;
- rappel éventuel : `Accès réservé aux utilisateurs autorisés`.

### Structure recommandée

- page simple non connectée ;
- pas de sidebar applicative connectée ;
- côté gauche : identité produit / bloc de présentation sobre ;
- côté droit : card de connexion ;
- rendu clair et professionnel.

### Exclusions Login

Ne pas afficher :

- inscription ;
- essai gratuit ;
- abonnement ;
- paiement ;
- mot de passe oublié si non prévu ;
- IA ;
- chatbot ;
- landing page commerciale ;
- témoignages client ;
- multi-société avancée ;
- modules hors périmètre.

---

## 7. Périmètre fonctionnel — Privacy

### Page

```text
/privacy — Mentions données personnelles
```

### Ce que la page permet actuellement

Page informative uniquement.

Elle affiche :

- catégories de données traitées ;
- finalités ;
- accès observés ;
- conservation et suppression ;
- droits RGPD ;
- mentions à confirmer.

### Ce que la page ne permet pas

- pas de formulaire RGPD ;
- pas de demande export données ;
- pas de demande suppression ;
- pas d’espace utilisateur privacy ;
- pas de gestion RGPD avancée.

### Contenu attendu dans la maquette

Titre :

```text
Mentions données personnelles
```

Sous-titre :

```text
Informations relatives au traitement des données dans Ambulance Manager.
```

Sections à afficher :

1. Données traitées
2. Finalités
3. Accès observés
4. Conservation
5. Droits RGPD
6. Mentions à confirmer

Badges possibles :

- Utilisateurs
- Planning
- Véhicules
- Audit
- Absences

### Structure recommandée

- header simple ;
- card principale ;
- sommaire ou navigation interne légère à gauche ;
- contenu textuel structuré à droite ;
- bouton ou lien retour connexion / retour dashboard selon contexte ;
- page lisible, rassurante, non juridique brute.

### Exclusions Privacy

Ne pas afficher :

- formulaire de demande RGPD ;
- export de données ;
- suppression de compte ;
- gestion des consentements avancée ;
- cookie banner ;
- billing ;
- IA ;
- chatbot ;
- modules hors périmètre.

---

## 8. Prompts transmis / à transmettre

Les prompts de génération sont documentés séparément dans :

```text
PROMPTS_GENERATION_A21-UX-05.md
```

---

## 9. DoD — Definition of Done

La session A21-UX-05 sera considérée validée lorsque :

- `Login_V1.1` aura été générée ;
- `Privacy_V1.0` aura été générée ;
- les deux maquettes auront été comparées à la DA validée ;
- les éventuelles réserves auront été tracées ;
- la documentation finale aura été produite ;
- aucun patch code n’aura été produit.

---

## 10. Décision initiale

```text
NO_PATCH
```

Aucune modification du code applicatif n’est prévue dans cette session.

---

## 11. Statut initial

```text
A21-UX-05 — PAGES SIMPLES / FINITIONS : EN COURS
```

La validation finale sera produite après réception des maquettes `Login_V1.1` et `Privacy_V1.0`.
