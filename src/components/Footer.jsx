import { ArrowUp, Mail, Phone } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { navLinks, profile, socialLinks } from "../data/profile.js";
import "./Footer.css";

const socials = [
  { label: "GitHub", href: socialLinks.github, icon: FaGithub, external: true },
  { label: "LinkedIn", href: socialLinks.linkedin, icon: FaLinkedinIn, external: true },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail, external: false },
  { label: "Phone", href: `tel:${profile.phoneHref}`, icon: Phone, external: false },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <ul role="list" className="footer__socials">
          {socials.map(({ label, href, icon: Icon, external }) => (
            <li key={label}>
              <a
                className="icon-btn icon-btn--lg"
                href={href}
                aria-label={external ? `${label} (opens in a new tab)` : label}
                {...(external && { target: "_blank", rel: "noopener noreferrer" })}
              >
                <Icon size={18} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        <nav aria-label="Footer">
          <ul role="list" className="footer__links">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#home" className="btn btn--secondary btn--sm footer__top">
          Back to top
          <ArrowUp size={15} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
