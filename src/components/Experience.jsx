import { Briefcase, Presentation, CalendarDays, BadgeCheck, Users, ExternalLink } from "lucide-react";
import { experiences, experienceTypes } from "../data/experience.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import "./Experience.css";

const typeIcons = {
  simulation: Briefcase,
  workshop: Presentation,
  event: CalendarDays,
  certification: BadgeCheck,
  activity: Users,
};

const groups = [
  { title: "Job simulations & certifications", types: ["simulation", "certification"] },
  { title: "Workshops, events & community", types: ["workshop", "event", "activity"] },
]
  .map((group) => ({ ...group, items: experiences.filter((item) => group.types.includes(item.type)) }))
  .filter((group) => group.items.length > 0);

function ExperienceRow({ item }) {
  const Icon = typeIcons[item.type];

  return (
    <li className="exp-row">
      <span className="exp-row__icon" aria-hidden="true">
        <Icon size={18} />
      </span>

      <div className="exp-row__main">
        <div className="exp-row__top">
          <h4 className="exp-row__title">{item.title}</h4>
          <span className={`exp-type exp-type--${item.type}`}>{experienceTypes[item.type]}</span>
        </div>
        <p className="exp-row__org">
          {item.organization}
          {item.platform && <span> · via {item.platform}</span>}
          {item.date && <span> · {item.date}</span>}
        </p>
        <p className="exp-row__desc">{item.description}</p>
        <ul role="list" className="tag-list exp-row__skills" aria-label="Skills practised">
          {item.skills.map((skill) => (
            <li key={skill} className="tag">
              {skill}
            </li>
          ))}
        </ul>
        {item.credentialUrl && (
          <a className="exp-row__credential" href={item.credentialUrl} target="_blank" rel="noopener noreferrer">
            View credential
            <ExternalLink size={14} aria-hidden="true" />
            <span className="visually-hidden"> for {item.title} (opens in a new tab)</span>
          </a>
        )}
      </div>
    </li>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeading
          section="experience"
          id="experience-title"
          eyebrow="Experience & activities"
          title="Learning beyond the classroom"
          lead="As a student, my experience comes from virtual job simulations, workshops, technical events and developer communities — each labelled for what it is."
        />

        <div className="exp-groups">
          {groups.map((group, groupIndex) => (
            <Reveal key={group.title} className="exp-group card" delay={groupIndex * 80}>
              <h3 className="exp-group__title">
                <span className="kicker">{group.title}</span>
                <span className="exp-group__count">{group.items.length}</span>
              </h3>
              <ul role="list" className="exp-group__list">
                {group.items.map((item) => (
                  <ExperienceRow key={item.title} item={item} />
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
