import { Mail, Phone } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { profile, socialLinks } from "../data/profile.js";
import "./SocialRail.css";

const connectLinks = [
  {
    id: "github",
    label: "GitHub",
    href: socialLinks.github,
    icon: FaGithub,
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: socialLinks.linkedin,
    icon: FaLinkedinIn,
    external: true,
  },
  {
    id: "email",
    label: "Email",
    href: `mailto:${profile.email}`,
    icon: Mail,
    external: false,
  },
  {
    id: "phone",
    label: "Phone",
    href: `tel:${profile.phoneHref}`,
    icon: Phone,
    external: false,
  },
];

export default function SocialRail() {
  return (
    <aside className="social-rail" aria-label="Social connect links">
      <ul role="list" className="social-rail__list">
        {connectLinks.map(({ id, label, href, icon: Icon, external }) => (
          <li key={id} className="social-rail__item">
            <a
              className="social-rail__btn"
              href={href}
              aria-label={external ? `${label} (opens in a new tab)` : label}
              {...(external && { target: "_blank", rel: "noopener noreferrer" })}
            >
              <Icon size={18} aria-hidden="true" />
              <span className="social-rail__label">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
