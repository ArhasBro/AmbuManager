# NOTES

Notes de travail de la session.

---

## Methode / observations

- Lecture documentaire restee ciblee :
  - noyau minimal relu ;
  - template de debut de session relu dans `docs/3-templates` car
    `docs/4-templates/TEMPLATE_DEBUT_SESSION.md` n'existe pas dans le depot
    courant ;
  - seuls les complements strictement utiles au cadrage RGPD ont ete relus.
- Audit mene uniquement sur le code reel du depot et la documentation officielle
  relue pour cette session.
- Regle appliquee explicitement : `CODE > DOCUMENTATION`.
  Exemple observe :
  - le cadrage marque encore certains points `manquant` ou `prevu`
    (archivage user, absences, audit connexions, page audit),
    mais le code montre une implementation reelle partielle ; le verdict
    retient donc l'etat du code, pas le statut documentaire historique.
- Aucune session future du bloc A17 n'a ete utilisee comme source pour
  reconstruire le contexte de RGPD-01.
- Les finalites citees dans les livrables sont des inferences explicites du
  code, jamais presentees comme un registre formel deja existant.
- Le depot montre un socle metier exploitable mais pas une base RGPD
  exploitable en l'etat :
  - il existe des donnees personnelles ;
  - il existe des roles d'acces ;
  - il existe des traces et des exports ;
  - il manque la formalisation RGPD transverse et homogene.
- Aucun patch repo officiel n'etait necessaire pour constater ces elements.
