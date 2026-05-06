import {
  Building2,
  CalendarDays,
  Cloud,
  Home,
  IdCard,
  ShieldCheck,
  Target,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { PageHeader } from "@/app/ui";

type PrivacySection = {
  id: string;
  title: string;
  intro: string;
  items: string[];
  Icon: LucideIcon;
};

const sections: PrivacySection[] = [
  {
    id: "editeur",
    title: "Editeur du site",
    Icon: Building2,
    intro: "Le present site et l'application Ambulance Manager sont edites par :",
    items: ["SC Ambulances", "Societe de transport sanitaire", "SIREN : 123 456 789", "Email : contact@sc-ambulances.fr"],
  },
  {
    id: "hebergement",
    title: "Hebergement",
    Icon: Cloud,
    intro: "L'application Ambulance Manager est hebergee par :",
    items: ["OVHcloud", "2 rue Kellermann, 59100 Roubaix, France", "Site : www.ovhcloud.com"],
  },
  {
    id: "donnees",
    title: "Donnees collectees",
    Icon: IdCard,
    intro: "Nous collectons uniquement les donnees necessaires au fonctionnement de l'application.",
    items: ["Identite utilisateur (nom, prenom, email)", "Donnees liees a l'utilisation de l'application", "Donnees de societe et d'activite"],
  },
  {
    id: "finalites",
    title: "Finalites de traitement",
    Icon: Target,
    intro: "Les donnees collectees sont utilisees pour :",
    items: ["Fournir et maintenir les services", "Gerer les comptes utilisateurs et les acces", "Assurer la securite et la fiabilite"],
  },
  {
    id: "droits",
    title: "Vos droits",
    Icon: ShieldCheck,
    intro: "Vous pouvez exercer vos droits d'acces, rectification et suppression.",
    items: ["Demande d'acces", "Demande de rectification", "Demande de suppression"],
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
          <span>Mention d&apos;information</span>
        </nav>

        <div className="privacy-page__header-row">
          <PageHeader
            title="Mentions d'information - Donnees personnelles"
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
                <a href={`#${section.id}`}>{index + 1}. {section.title}</a>
              </li>
            ))}
          </ol>
          <p className="privacy-summary__note">Ces informations sont fournies pour un usage professionnel interne.</p>
        </aside>

        <div className="privacy-content">
          {sections.map((section) => (
            <article key={section.id} id={section.id} className="privacy-card" aria-labelledby={`${section.id}-title`}>
              <div className="privacy-card__icon" aria-hidden="true">
                <section.Icon size={26} strokeWidth={2.1} />
              </div>
              <div className="privacy-card__body">
                <h2 id={`${section.id}-title`} className="privacy-card__title">{section.title}</h2>
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
        <Link href="/privacy">Mentions d&apos;information</Link>
      </footer>
      </div>
    </main>
  );
}
