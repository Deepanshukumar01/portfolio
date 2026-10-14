import { Globe, Server, Database, Hammer, GraduationCap, MapPin, CalendarDays } from "lucide-react";
import { profile } from "../data/profile.js";
import { education } from "../data/education.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import "./About.css";

const interests = [
  { label: "Web development", icon: Globe },
  { label: "Backend & APIs", icon: Server },
  { label: "Databases", icon: Database },
  { label: "Practical projects", icon: Hammer },
];

function EducationCard({ entry, id }) {
  return (
    <article className="edu card" aria-labelledby={id}>
      <header className="edu__head">
        <span className="edu__icon" aria-hidden="true">
          <GraduationCap size={20} />
        </span>
        <div className="edu__titles">
          <p className="kicker">Education</p>
          <h3 className="edu__degree" id={id}>
            {entry.degree}
          </h3>
          <p className="edu__institution">{entry.institution}</p>
        </div>
        {entry.score && (
          <p className="edu__score">
            <span className="edu__score-value">{entry.score.value}</span>
            <span className="edu__score-label">{entry.score.label}</span>
          </p>
        )}
      </header>

      <ul role="list" className="edu__meta">
        <li>
          <CalendarDays size={14} aria-hidden="true" />
          {entry.period}
        </li>
        <li>
          <MapPin size={14} aria-hidden="true" />
          {entry.location}
        </li>
        <li className="edu__status">{entry.status}</li>
      </ul>

      {entry.coursework?.length > 0 && (
        <div className="edu__block">
          <h4 className="kicker">Relevant coursework</h4>
          <ul role="list" className="tag-list">
            {entry.coursework.map((course) => (
              <li key={course} className="tag">
                {course}
              </li>
            ))}
          </ul>
        </div>
      )}

      {entry.milestones?.length > 0 && (
        <div className="edu__block">
          <h4 className="kicker">Journey so far</h4>
          <ol role="list" className="journey">
            {entry.milestones.map((milestone) => (
              <li key={milestone.text} className={`journey__step ${milestone.when === "Now" ? "is-current" : ""}`}>
                <span className="journey__when">{milestone.when}</span>
                <span className="journey__text">{milestone.text}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </article>
  );
}

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading
          section="about"
          id="about-title"
          eyebrow="About"
          title="A student who learns by building"
          lead="Web, backend and the databases behind them — learned one practical project at a time."
        />

        <div className="about">
          <Reveal className="about__story">
            {profile.photo && (
              <img
                className="about__photo"
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                width="72"
                height="72"
                loading="lazy"
              />
            )}
            <div className="about__text">
              <p className="about__lede">
                I&apos;m a <strong>{profile.currentYear} B.Tech Computer Science &amp; Engineering</strong> student with a
                CGPA of <strong>{profile.cgpa}</strong>, most interested in software development — especially web and
                backend development.
              </p>
              <p>
                I enjoy turning ideas into practical projects: designing a schema, writing an API, and building an
                interface people can actually use. Every project teaches me something new, and I&apos;m continuously
                working on my problem-solving and fundamentals.
              </p>
              <p>
                Right now I&apos;m <strong>looking for software development or web development internships</strong> where I
                can contribute, learn from experienced engineers, and grow.
              </p>
            </div>

            <ul role="list" className="about__interests" aria-label="Areas of interest">
              {interests.map(({ label, icon: Icon }) => (
                <li key={label}>
                  <Icon size={16} aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="about__education" delay={100}>
            {education.map((entry, index) => (
              <EducationCard key={entry.degree} entry={entry} id={`education-${index}`} />
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
