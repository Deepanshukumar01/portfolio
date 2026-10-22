import { useEffect, useState } from "react";

/**
 * Tracks which section id is currently in the middle band of the viewport.
 * Two neighbouring sections can share the band, so every section inside it is remembered —
 * otherwise, when one of them leaves, the other (already inside, so no new event) is missed.
 */
export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    const inBand = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        });
        const current = sectionIds.find((id) => inBand.has(id));
        if (current) setActiveId(current);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
