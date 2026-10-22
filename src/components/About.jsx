import { Globe, Server, Database, Hammer, GraduationCap, MapPin, CalendarDays } from "lucide-react";
import { profile } from "../data/profile.js";
import { education } from "../data/education.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import "./About.css";

const interests = [
  { label: "Web development", text: "Responsive, accessible interfaces", icon: Globe },
  { label: "Backend & APIs", text: "REST APIs and server-side logic", icon: Server },
  { label: "Databases", text: "Schema design and SQL queries", icon: Database },
  { label: "Practical projects", text: "Ideas turned into usable apps", icon: Hammer },
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
        <li className="edu__status">
          {entry.status}
          {entry.score && (
            <>
              {" · "}
              {entry.score.label} <strong>{entry.score.value}</strong>
            </>
          )}
        </li>
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
            <div className="about__header">
              {profile.photo && (
                <img
                  className="about__photo"
                  src={profile.photo}
                  alt={`Portrait of ${profile.name}`}
                  width="56"
                  height="56"
                  loading="lazy"
                />
              )}
              <div>
                <p className="about__name">{profile.name}</p>
                <p className="about__meta">
                  {profile.degree} · {profile.location}
                </p>
              </div>
            </div>
            <div className="about__text">
              <p className="about__lede">
                I&apos;m a <strong>{profile.currentYear} B.Tech Computer Science &amp; Engineering</strong> student, most
                interested in software development — especially web and backend development.
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

            <div className="about__focus">
              <h3 className="kicker">What I focus on</h3>
              <ul role="list" className="about__interests">
                {interests.map(({ label, text, icon: Icon }) => (
                  <li key={label}>
                    <span className="about__interest-icon" aria-hidden="true">
                      <Icon size={16} />
                    </span>
                    <span>
                      <span className="about__interest-label">{label}</span>
                      <span className="about__interest-text">{text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
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
