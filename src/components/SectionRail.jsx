import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { navLinks } from "../data/profile.js";
import { useActiveSection } from "../hooks/useActiveSection.js";
import "./SectionRail.css";

const sections = [{ id: "home", label: "Home" }, ...navLinks];
const sectionIds = sections.map((section) => section.id);

/** How far a section's top is from where scrollIntoView() would park it (0 = parked there). */
function distanceFromLanding(element) {
  const scrollPadding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const scrollMargin = parseFloat(getComputedStyle(element).scrollMarginTop) || 0;
  return element.getBoundingClientRect().top - scrollPadding - scrollMargin;
}

/**
 * Previous / next go by scroll position rather than the highlighted dot, so "next" from
 * the last section continues to the footer and "previous" first returns to the start of
 * a section you have scrolled into.
 */
function step(direction) {
  const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
  const distances = elements.map(distanceFromLanding);

  if (direction > 0) {
    const next = elements.find((_, i) => distances[i] > 4);
    if (next) next.scrollIntoView();
    else window.scrollTo({ top: document.documentElement.scrollHeight });
  } else {
    const previous = elements.findLast((_, i) => distances[i] < -4);
    if (previous) previous.scrollIntoView();
    else window.scrollTo({ top: 0 });
  }
}

/** Fixed side navigator: previous / next section buttons with one dot per section. */
export default function SectionRail() {
  const activeId = useActiveSection(sectionIds);
  const activeIndex = sectionIds.indexOf(activeId);
  const [edges, setEdges] = useState({ atTop: true, atBottom: false });

  useEffect(() => {
    const update = () => {
      const { scrollHeight } = document.documentElement;
      setEdges({
        atTop: window.scrollY < 2,
        atBottom: window.scrollY + window.innerHeight >= scrollHeight - 2,
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <nav className="rail" aria-label="Section navigation">
      <button
        type="button"
        className="rail__step"
        onClick={() => step(-1)}
        disabled={edges.atTop}
        aria-label="Previous section"
      >
        <ChevronUp size={16} aria-hidden="true" />
      </button>

      <ol className="rail__dots" role="list">
        {sections.map(({ id, label }, index) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`rail__dot ${index === activeIndex ? "is-active" : ""}`}
              aria-current={index === activeIndex ? "true" : undefined}
            >
              <span className="rail__label">
                {index > 0 && <span className="rail__index">{String(index).padStart(2, "0")}</span>}
                {label}
              </span>
            </a>
          </li>
        ))}
      </ol>

      <button
        type="button"
        className="rail__step"
        onClick={() => step(1)}
        disabled={edges.atBottom}
        aria-label="Next section"
      >
        <ChevronDown size={16} aria-hidden="true" />
      </button>
    </nav>
  );
}
