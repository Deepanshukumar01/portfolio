import { navLinks } from "../data/profile.js";
import Reveal from "./Reveal.jsx";

/**
 * Numbered chapter heading. `section` is the nav id, so the number always
 * matches the section's position in the navbar.
 */
export default function SectionHeading({ section, eyebrow, title, lead, id, stacked = false }) {
  const index = navLinks.findIndex((link) => link.id === section) + 1;

  return (
    <Reveal as="header" className={`section-head ${stacked ? "section-head--stacked" : ""}`}>
      <div>
        <p className="section-head__eyebrow">
          {index > 0 && <span className="section-head__index">{String(index).padStart(2, "0")}</span>}
          {eyebrow}
        </p>
        <h2 className="section-head__title" id={id}>
          {title}
        </h2>
      </div>
      {lead && <p className="section-head__lead">{lead}</p>}
    </Reveal>
  );
}
