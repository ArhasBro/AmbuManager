const dataCategories = [
  "Comptes utilisateurs : email, nom, role, rattachement societe/depot, statut actif, permissions.",
  "Authentification : mot de passe hache, traces de connexion reussie ou echouee.",
  "Absences : motif, date/heure de debut et de fin, utilisateur rattache.",
  "Audit planning/login : acteur, action, entite, resume, charge utile d'audit, horodatage.",
  "Exports planning : nom et email des agents presents dans les exports planning.",
  "Imports initiaux : utilisateurs et absences importes depuis CSV/XLSX via les routes admin.",
];

const purposes = [
  "Authentifier les utilisateurs et securiser l'acces a l'application.",
  "Administrer les comptes, roles, permissions et rattachements metier.",
  "Gerer les indisponibilites utilisateurs pour la planification.",
  "Produire, consulter et exporter un planning nominatif selon les permissions reelles.",
  "Tracer les connexions et les operations critiques visibles dans l'audit applicatif.",
  "Initialiser les donnees users/absences via les imports admin du depot.",
];

const accessRules = [
  "Les acces observes dans le depot reposent sur la session enrichie, `companyId`, les roles et les permissions.",
  "Les roles `ADMIN` et `GERANT` disposent des acces de gestion les plus larges dans les flux users observes.",
  "La consultation d'audit repose sur les roles natifs admin/gerant, la permission `AUDIT_VIEW` et le support global pour la lecture.",
  "Les exports planning sont bornes au tenant courant et, sans droit global, a l'utilisateur courant.",
];

const retentionRules = [
  "Archivage utilisateur observe : desactivation logique via `isActive = false`.",
  "Suppression definitive utilisateur : INFORMATION NON FOURNIE — À CONFIRMER hors cas exceptionnel cadre.",
  "Retention automatisee des logs d'audit, exports generes et absences : INFORMATION NON FOURNIE — À CONFIRMER.",
  "Suppression d'absence observee : suppression metier physique avec trace d'audit applicative.",
];

const rightsRules = [
  "Droit d'acces / export RGPD dedie : INFORMATION NON FOURNIE — À CONFIRMER.",
  "Mecanismes observes dans le depot : APIs users/absences pour lecture/correction metier, page audit pour les lecteurs autorises, export planning non equivalent a un export RGPD dedie.",
  "Contact DPO ou canal privacy officiel : INFORMATION NON FOURNIE — À CONFIRMER.",
];

export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: 860, margin: "0 auto", padding: "32px 16px 56px" }}>
      <h1>Mentions d&apos;information - Donnees personnelles</h1>
      <p>
        Cette page expose la base RGPD minimale actuellement formalisee dans le depot pour Ambulance Manager.
        Elle decrit exclusivement les traitements et mecanismes observes dans le code et la documentation du
        projet au 23/04/2026.
      </p>
      <p>
        Si une information organisationnelle n&apos;est pas prouvee dans le depot, elle est maintenue sous la forme
        <strong> INFORMATION NON FOURNIE — À CONFIRMER</strong>.
      </p>

      <section style={{ marginTop: 28 }}>
        <h2>Categories de donnees observees</h2>
        <ul>
          {dataCategories.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2>Finalites observees</h2>
        <ul>
          {purposes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2>Acces observes</h2>
        <ul>
          {accessRules.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2>Conservation et suppression</h2>
        <ul>
          {retentionRules.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2>Droits, export, correction, suppression</h2>
        <ul>
          {rightsRules.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
