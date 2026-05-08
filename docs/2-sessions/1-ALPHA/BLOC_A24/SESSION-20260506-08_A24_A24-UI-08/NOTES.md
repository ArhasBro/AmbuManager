# NOTES

Notes de travail de la session.

---

## Méthode / observations

Méthode appliquée :
1. Lecture du noyau documentaire minimal.
2. Lecture des références UI/UX A24 utiles au planning.
3. Lecture statique des fichiers planning réellement disponibles sur GitHub.
4. Cartographie des écarts par rapport à la cible `Planning_V1.2`.
5. Production d’un rapport préparatoire A25.
6. Décision `NO_PATCH_CODE`.

## Observation documentaire

Le dossier de session existait déjà sur GitHub avec des fichiers squelettes. Plusieurs fichiers contenaient :
- placeholders `INFORMATION NON FOURNIE`;
- caractères mojibake visibles ;
- marque BOM visible au début de fichiers.

Le présent patch documentaire vise à remplacer ces squelettes par une documentation finale propre en UTF-8 sans BOM dans les fichiers générés localement.

## Limite importante

L’environnement disponible ici n’est pas le dépôt Windows réel de l’utilisateur. Les commandes terminales et captures ne doivent donc pas être considérées comme exécutées localement.

Toute preuve manquante est indiquée exactement :
`INFORMATION NON FOURNIE — À CONFIRMER`
