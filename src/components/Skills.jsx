import { skillCategories, skillLevels } from "../data/skills.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import "./Skills.css";

function LevelMeter({ level }) {
  const { rank } = skillLevels[level];
  return (
    <span className="level-meter" aria-hidden="true">
      {[1, 2, 3].map((step) => (
        <i key={step} className={step <= rank ? "is-filled" : ""} />
      ))}
    </span>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading
          section="skills"
          id="skills-title"
          eyebrow="Skills & tech stack"
          title="Tools I build with"
          lead="An honest snapshot — what I use confidently, what I have working knowledge of, and what I'm actively learning."
        />

        <Reveal className="skills card">
          <div className="skills__toolbar">
            <p className="kicker">{skillCategories.length} areas</p>
            <ul role="list" className="skills__legend" aria-label="Proficiency legend">
              {Object.entries(skillLevels).map(([key, level]) => (
                <li key={key}>
                  <LevelMeter level={key} />
                  {level.label}
                </li>
              ))}
            </ul>
          </div>

          <ul role="list" className="skills__rows">
            {skillCategories.map(({ title, icon: CategoryIcon, description, skills }, index) => (
              <li key={title} className="skills__row">
                <div className="skills__category">
                  <span className="skills__category-icon" aria-hidden="true">
                    <CategoryIcon size={18} />
                  </span>
                  <div>
                    <h3 id={`skills-${index}`} className="skills__category-title">
                      {title}
                    </h3>
                    <p className="skills__category-desc">{description}</p>
                  </div>
                </div>

                <ul role="list" className="skills__list" aria-labelledby={`skills-${index}`}>
                  {skills.map(({ name, icon: SkillIcon, level }) => (
                    <li key={name} className="skill">
                      <SkillIcon className="skill__logo" size={16} aria-hidden="true" />
                      <span className="skill__name">{name}</span>
                      <LevelMeter level={level} />
                      <span className="visually-hidden">— {skillLevels[level].label}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
