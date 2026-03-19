# RESULTATS.md

## Verdict par sous-session

### SUP-01 — AUDIT
Verdict sous-session : **cohérent comme audit de référence**.

L’audit initial identifiait correctement un besoin support propriétaire absent dans l’existant. Il reste cohérent comme photographie de départ et ne contredit pas les évolutions ultérieures du dépôt.

### SUP-02 — COMPLÉTION
Verdict sous-session : **conforme sur le code réel**.

Constats validés :
- rôle plateforme `SUPPORT` distinct des rôles client ;
- compte plateforme hors société rendu possible par le schéma et verrouillé par contrainte SQL ;
- session NextAuth enrichie avec `platformRole` et `isGlobalSupport` ;
- aucun droit global implicite ajouté ;
- aucun cross-company implicite ouvert.

### SUP-03 — COMPLÉTION
Verdict sous-session : **globalement cohérent sur le dépôt, avec réserve runtime héritée**.

Constats validés :
- seed nominatif support présent ;
- compte support prévu hors société et non mutualisé ;
- activation optionnelle via variables dédiées ;
- garde explicite si la base n’est pas alignée sur `platformRole`.

Réserve : `db:seed` n’a pas été relancé dans cette session de validation et le verdict historique `partiellement conforme` de SUP-03 n’est donc pas ré-ouvert ici.

### SUP-04 — COMPLÉTION
Verdict sous-session : **conforme sur le code réel**.

Constats validés :
- support absent des listes utilisateurs client ;
- support non ciblable par les flux client de reset mot de passe / rattachement dépôt ;
- aucune permission support attribuable côté client ;
- aucun droit supplémentaire introduit.

### SUP-05 — COMPLÉTION
Verdict sous-session : **partiellement conforme**.

Ce qui est effectivement présent :
- fonction de traçabilité dédiée ;
- appel sur les mutations ciblées ;
- acteur, action, cible et payload structurés ;
- aucun nouveau droit global ;
- aucune logique cross-company implicite.

Écart majeur :
- le déclenchement est conditionné à `actorPlatformRole === SUPPORT` ;
- les routes ciblées exigent en parallèle un `companyId` et des droits tenant que le compte support global nominal n’a pas ;
- la traçabilité support est donc câblée mais non effectivement opérable par le support global tel que modélisé par `SUP-02` + `SUP-03`.

## Vérification bloc

### 1. Rôle support global distinct des rôles client
**Oui** — validé.

### 2. Compte support nominatif
**Oui** — validé au niveau du dépôt / seed.

### 3. Absence d’exposition client comme rôle attribuable / administrable
**Oui** — validé.

### 4. Traçabilité support minimale effectivement en place
**Partiellement**.

Le câblage de journalisation existe, mais l’enchaînement fonctionnel complet n’est pas atteignable avec le compte support global nominal actuel.

### 5. Absence de nouveaux droits non cadrés
**Oui** — validé.

### 6. Absence de logique cross-company implicite non maîtrisée
**Oui** — validé.

Le support n’obtient aucun bypass implicite. Ce point est sain du point de vue cloisonnement, mais il laisse aussi le support global non opérable sur les mutations contrôlées.

### 7. Cohérence entre code, patchs, sessions et validations terminales
**Non totalement**.

Le code est cohérent sur la structure du bloc, mais les validations terminales entièrement vertes sont documentées explicitement dans les dossiers de session `SUP-02`, `SUP-03`, `SUP-04` et `SUP-05`, sans être reproduites dans l’environnement courant de validation.

## Validations terminales réellement observées dans cette session
- `npx prisma validate` : **NOK dans l’environnement courant**
- `npx prisma generate` : **NOK dans l’environnement courant**
- `npm run lint` : **OK**
- `npm run build` : **NOK dans l’environnement courant**

## Verdict final du bloc
Verdict bloc : **`partiellement conforme`**.

## Motif du verdict
Le bloc support propriétaire est **structurellement bien avancé** : rôle distinct, compte nominatif hors société, invisibilité côté client, absence de droits implicites et absence de cross-company sauvage sont bien visibles dans le dépôt.

Le bloc n’est toutefois **pas pleinement conforme** pour deux raisons :
1. la traçabilité support SUP-05 n’est pas effectivement opérable par le compte support global nominal tel qu’il est modélisé ;
2. les validations terminales documentées dans `SUP-02`, `SUP-03`, `SUP-04` et `SUP-05` ne sont pas reproductibles telles quelles dans l’environnement courant.

## Prochaine étape logique
Ouvrir une session corrective dédiée, bornée et distincte, pour traiter l’un des deux axes suivants sans réélargir le scope :
- soit rendre opérable une intervention support tracée sur les mutations ciblées, dans un cadre multi-tenant explicite et maîtrisé ;
- soit réaligner la chaîne Prisma / génération client / build afin que les validations terminales soient réellement reproductibles en environnement propre.
