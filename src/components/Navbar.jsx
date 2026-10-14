import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, profile } from "../data/profile.js";
import { useActiveSection } from "../hooks/useActiveSection.js";
import ResumeButton from "./ResumeButton.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import "./Navbar.css";

// "home" is tracked too so no nav item is highlighted while the hero is in view.
const sectionIds = ["home", ...navLinks.map((link) => link.id)];
const MOBILE_BREAKPOINT = 900;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event) => event.key === "Escape" && setMenuOpen(false);
    const onResize = () => window.innerWidth > MOBILE_BREAKPOINT && setMenuOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar ${scrolled || menuOpen ? "navbar--solid" : ""}`}>
      <nav className="navbar__inner container" aria-label="Primary">
        <a href="#home" className="navbar__brand" onClick={closeMenu} aria-label={`${profile.name} — back to top`}>
          <span className="navbar__logo" aria-hidden="true">
            {profile.initials}
          </span>
          <span className="navbar__name">{profile.name}</span>
        </a>

        <ul className="navbar__links" role="list">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className="navbar__link"
                aria-current={activeId === link.id ? "true" : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <ThemeToggle />
          <ResumeButton className="btn btn--primary btn--sm navbar__resume" />
          <button
            type="button"
            className="navbar__toggle icon-btn"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "is-open" : ""}`} hidden={!menuOpen}>
        <ul className="mobile-menu__links container" role="list">
          {navLinks.map((link, index) => (
            <li key={link.id} style={{ "--i": index }}>
              <a
                href={`#${link.id}`}
                className="mobile-menu__link"
                aria-current={activeId === link.id ? "true" : undefined}
                onClick={closeMenu}
              >
                <span className="mobile-menu__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {link.label}
              </a>
            </li>
          ))}
          <li style={{ "--i": navLinks.length }} className="mobile-menu__cta">
            <ResumeButton className="btn btn--primary" />
          </li>
        </ul>
      </div>
    </header>
  );
}
