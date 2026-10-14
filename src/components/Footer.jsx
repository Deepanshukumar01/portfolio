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
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <span className="footer__logo" aria-hidden="true">
              {profile.initials}
            </span>
            <div>
              <p className="footer__name">{profile.name}</p>
              <p className="footer__tagline">Computer Science student · Open to internships</p>
            </div>
          </div>

          <nav aria-label="Footer">
            <ul role="list" className="footer__links">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <ul role="list" className="footer__socials">
            {socials.map(({ label, href, icon: Icon, external }) => (
              <li key={label}>
                <a
                  className="icon-btn"
                  href={href}
                  aria-label={external ? `${label} (opens in a new tab)` : label}
                  {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  <Icon size={17} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__bottom">
          <p>
            © {new Date().getFullYear()} {profile.name}. Built with React &amp; Vite.
          </p>
          <a href="#home" className="footer__top">
            Back to top
            <ArrowUp size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
