import Link from "next/link";
import { PageHeader } from "@/app/ui";

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

type PrivacySection = {
  id: string;
  title: string;
  intro: string;
  items: readonly string[];
};

const privacySections: readonly PrivacySection[] = [
  {
    id: "categories-donnees",
    title: "Categories de donnees observees",
    intro: "Donnees strictement necessaires a l'administration et au suivi operationnel.",
    items: dataCategories,
  },
  {
    id: "finalites-observees",
    title: "Finalites observees",
    intro: "Finalites constatees dans le depot et la documentation de reference.",
    items: purposes,
  },
  {
    id: "acces-observes",
    title: "Acces observes",
    intro: "Regles d'acces reliees a la session, aux roles et aux permissions.",
    items: accessRules,
  },
  {
    id: "conservation-suppression",
    title: "Conservation et suppression",
    intro: "Etat des informations prouvees sur la retention et l'archivage.",
    items: retentionRules,
  },
  {
    id: "droits-rgpd",
    title: "Droits, export, correction, suppression",
    intro: "Elements disponibles pour l'exercice des droits et limites de preuve actuelles.",
    items: rightsRules,
  },
];

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <div className="privacy-page__wrap">
        <nav aria-label="Fil d&apos;ariane" className="privacy-page__breadcrumb">
          <Link href="/login">Connexion</Link>
          <span>/</span>
          <span>Mention d&apos;information</span>
        </nav>

        <div className="privacy-page__header-row">
          <PageHeader
            title="Mentions d'information"
            description="Cette page presente les traitements observes dans le depot pour Ambulance Manager, en restant strictement alignee sur les preuves disponibles."
          />
          <p className="privacy-page__updated">Derniere mise a jour : INFORMATION NON FOURNIE — À CONFIRMER</p>
        </div>

        <section className="privacy-page__layout" aria-label="Contenu des mentions d'information">
          <aside className="privacy-summary" aria-label="Sommaire de la page">
            <h2 className="privacy-summary__title">Sommaire</h2>
            <ol className="privacy-summary__list">
              {privacySections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
            </ol>
            <p className="privacy-summary__note">Information non prouvee : INFORMATION NON FOURNIE — À CONFIRMER.</p>
          </aside>

          <div className="privacy-content">
            {privacySections.map((section, index) => (
              <article key={section.id} id={section.id} className="privacy-card" aria-labelledby={`${section.id}-title`}>
                <div className="privacy-card__icon" aria-hidden="true">
                  {index + 1}
                </div>
                <div className="privacy-card__body">
                  <h2 id={`${section.id}-title`} className="privacy-card__title">
                    {section.title}
                  </h2>
                  <p className="privacy-card__intro">{section.intro}</p>
                  <ul className="privacy-card__list">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="privacy-page__footer">
          <p>Mentions d&apos;information RGPD du projet Ambulance Manager.</p>
          <Link href="/login">Retour a la connexion</Link>
        </footer>
      </div>
    </main>
  );
}

