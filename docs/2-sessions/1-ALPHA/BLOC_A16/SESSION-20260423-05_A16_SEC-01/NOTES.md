# NOTES

Notes de travail de la session.

---

## Methode / observations

Methode appliquee :
- lecture documentaire ciblee ;
- inspection du code reel ;
- aucune correction applicative ;
- validations terminales non destructives ;
- production des livrables documentaires et du ZIP final.

Observations structurantes :
- Le depot contient deja des mecanismes securite reels.
- Les controles d'acces sont presents mais pas totalement homogenes.
- Le multi-tenant par companyId est largement applique dans les routes observees.
- Les mots de passe sont hashes, mais la politique de mot de passe est trop
  faible dans les schemas audites.
- L'audit log existe, mais il ne couvre pas uniformement les operations sensibles.
- La presence d'un .env local avec secrets/identifiants en clair impose un
  traitement methodologique dans SEC-LOT-02, meme si le fichier n'est pas suivi
  par Git d'apres la commande executee.

Decision de ne pas patcher :
- aucun fichier applicatif n'etait illisible ;
- aucune erreur bloquante n'empechait l'audit ;
- une session AUDIT ne doit pas forcer artificiellement un correctif.
