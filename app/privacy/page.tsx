import {
  Building2,
  CalendarDays,
  Cloud,
  FileText,
  Home,
  IdCard,
  Lock,
  ShieldCheck,
  Target,
  UserRound,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { PageHeader } from "@/app/ui";

type PrivacySection = {
  id: string;
  navLabel: string;
  title: string;
  intro: string;
  items: string[];
  Icon: LucideIcon;
};

const sections: PrivacySection[] = [
  {
    id: "editeur",
    navLabel: "Editeur du site",
    title: "Editeur du site",
    Icon: Building2,
    intro: "Le present site et l'application Ambulance Manager sont edites par :",
    items: ["SC Ambulances", "Societe de transport sanitaire", "SIREN : 123 456 789", "Email : contact@sc-ambulances.fr"],
  },
  {
    id: "hebergement",
    navLabel: "Hebergement",
    title: "Hebergement",
    Icon: Cloud,
    intro: "L'application Ambulance Manager est hebergee par :",
    items: ["OVHcloud", "2 rue Kellermann, 59100 Roubaix, France", "Site : www.ovhcloud.com"],
  },
  {
    id: "donnees",
    navLabel: "Donnees collectees",
    title: "Donnees collectees",
    Icon: IdCard,
    intro: "Nous collectons uniquement les donnees necessaires au fonctionnement de l'application.",
    items: ["Identite utilisateur (nom, prenom, email)", "Donnees liees a l'utilisation de l'application", "Donnees relatives a la societe et a l'activite"],
  },
  {
    id: "finalites",
    navLabel: "Finalites de traitement",
    title: "Finalites de traitement",
    Icon: Target,
    intro: "Les donnees collectees sont utilisees pour :",
    items: ["Fournir et maintenir les services de l'application", "Gerer les comptes utilisateurs et les acces", "Assurer la securite et la fiabilite", "Respecter les obligations legales et reglementaires"],
  },
  {
    id: "base-legale",
    navLabel: "Base legale",
    title: "Base legale",
    Icon: ShieldCheck,
    intro: "Le traitement est fonde sur l'interet legitime d'exploitation et les obligations legales applicables.",
    items: ["Execution des services demandee par la societe cliente", "Interet legitime de securisation de la plateforme", "Respect des obligations comptables et legales"],
  },
  {
    id: "destinataires",
    navLabel: "Destinataires des donnees",
    title: "Destinataires des donnees",
    Icon: UsersRound,
    intro: "Les donnees sont accessibles uniquement aux personnes habilitees.",
    items: ["Equipe interne habilitee de la societe cliente", "Support technique autorise", "Sous-traitants techniques strictement necessaires"],
  },
  {
    id: "conservation",
    navLabel: "Duree de conservation",
    title: "Duree de conservation",
    Icon: CalendarDays,
    intro: "Les donnees sont conservees pour la duree strictement necessaire aux finalites de traitement.",
    items: ["Comptes actifs : pendant la duree d'utilisation", "Historique d'audit : selon les obligations de tracabilite", "Donnees archivees : purge reguliere selon la politique interne"],
  },
  {
    id: "droits",
    navLabel: "Vos droits",
    title: "Vos droits",
    Icon: ShieldCheck,
    intro: "Vous pouvez exercer vos droits d'acces, rectification et suppression.",
    items: ["Demande d'acces", "Demande de rectification", "Demande de suppression", "Demande de limitation si applicable"],
  },
  {
    id: "securite",
    navLabel: "Securite des donnees",
    title: "Securite des donnees",
    Icon: Lock,
    intro: "Des mesures techniques et organisationnelles sont appliquees pour proteger les donnees personnelles.",
    items: ["Controle d'acces et authentification", "Journalisation des actions sensibles", "Sauvegardes et suivi de disponibilite"],
  },
  {
    id: "cookies",
    navLabel: "Cookies",
    title: "Cookies",
    Icon: FileText,
    intro: "L'application utilise des cookies techniques necessaires au fonctionnement de la session.",
    items: ["Cookies de session", "Cookies de preferences d'affichage", "Aucun cookie publicitaire actif par defaut"],
  },
  {
    id: "modifications",
    navLabel: "Modifications",
    title: "Modifications",
    Icon: CalendarDays,
    intro: "La presente mention peut etre mise a jour pour refleter les evolutions legales ou techniques.",
    items: ["Date de derniere mise a jour affichee en haut de page", "Historique conserve selon les procedures internes"],
  },
  {
    id: "contact",
    navLabel: "Contact",
    title: "Contact",
    Icon: UserRound,
    intro: "Pour toute question relative aux donnees personnelles :",
    items: ["Email : contact@sc-ambulances.fr", "Adresse : SC Ambulances, France", "Objet recommande : Donnees personnelles - Ambulance Manager"],
  },
];

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <div className="privacy-page__wrap">
        <nav aria-label="Fil d'ariane" className="privacy-page__breadcrumb">
          <Link href="/dashboard">
            <Home size={14} aria-hidden="true" />
            Accueil
          </Link>
          <span>/</span>
          <span>Mentions d&apos;information</span>
        </nav>

        <div className="privacy-page__header-row">
          <PageHeader
            title="Mentions d'information"
            description="Cette page vous informe sur la collecte, l'utilisation et la protection de vos donnees personnelles conformement a la reglementation en vigueur."
          />
          <p className="privacy-page__updated">
            <CalendarDays size={16} aria-hidden="true" />
            Derniere mise a jour : 18 avr. 2024
          </p>
        </div>

        <section className="privacy-page__layout" aria-label="Contenu des mentions d'information">
          <aside className="privacy-summary" aria-label="Sommaire">
            <h2 className="privacy-summary__title">Sommaire</h2>
            <ol className="privacy-summary__list">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className={index === 0 ? "is-active" : undefined}>
                    {index + 1}. {section.navLabel}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <div className="privacy-content">
            {sections.map((section, index) => (
              <article key={section.id} id={section.id} className="privacy-card" aria-labelledby={`${section.id}-title`}>
                <div className="privacy-card__icon" aria-hidden="true">
                  <section.Icon size={28} strokeWidth={2.1} />
                </div>
                <div className="privacy-card__body">
                  <h2 id={`${section.id}-title`} className="privacy-card__title">
                    {index + 1}. {section.title}
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
          <p>Acces reserve aux utilisateurs autorises</p>
          <p>© 2024 SC Ambulances - Tous droits reserves</p>
          <Link href="/privacy">Mentions d&apos;information</Link>
        </footer>
      </div>
    </main>
  );
}
