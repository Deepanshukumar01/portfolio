import { ArrowRight, MapPin } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { profile, socialLinks } from "../data/profile.js";
import { projects } from "../data/projects.js";
import ResumeButton from "./ResumeButton.jsx";
import "./Hero.css";

const codeLines = [
  [{ t: "kw", v: "const " }, { t: "var", v: "deepanshu" }, { t: "p", v: " = {" }],
  [{ t: "key", v: "  role" }, { t: "p", v: ": " }, { t: "str", v: `"CSE Student · ${profile.currentYear}"` }, { t: "p", v: "," }],
  [{ t: "key", v: "  focus" }, { t: "p", v: ": [" }, { t: "str", v: '"Web"' }, { t: "p", v: ", " }, { t: "str", v: '"Backend"' }, { t: "p", v: ", " }, { t: "str", v: '"Databases"' }, { t: "p", v: "]," }],
  [{ t: "key", v: "  cgpa" }, { t: "p", v: ": " }, { t: "num", v: profile.cgpa }, { t: "p", v: "," }],
  [{ t: "key", v: "  graduating" }, { t: "p", v: ": " }, { t: "num", v: String(profile.graduationYear) }, { t: "p", v: "," }],
  [{ t: "key", v: "  learning" }, { t: "p", v: ": " }, { t: "kw", v: "true" }, { t: "p", v: "," }],
  [{ t: "key", v: "  openTo" }, { t: "p", v: ": " }, { t: "str", v: '"SDE / Web Dev Internships"' }],
  [{ t: "p", v: "};" }],
];

const facts = [
  { label: "CGPA", value: profile.cgpa },
  { label: "Degree", value: profile.degree },
  { label: "Currently", value: profile.currentYear },
  { label: "Projects built", value: projects.length },
  { label: "Graduating", value: profile.graduationYear },
];

export default function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero__grid">
          <div className="hero__content">
            <p className="hero__status hero__reveal" style={{ "--d": 0 }}>
              <span className="hero__status-dot" aria-hidden="true" />
              {profile.availability}
              <span className="hero__status-location">
                <span className="hero__status-divider" aria-hidden="true" />
                <MapPin size={14} aria-hidden="true" />
                {profile.location}
              </span>
            </p>

            <h1 id="hero-title" className="hero__title hero__reveal" style={{ "--d": 1 }}>
              Hi, I&apos;m <span className="gradient-text">{profile.name}</span>
            </h1>

            <p className="hero__role hero__reveal" style={{ "--d": 2 }}>
              {profile.role}
            </p>

            <p className="hero__intro hero__reveal" style={{ "--d": 3 }}>
              {profile.intro}
            </p>

            <div className="hero__actions hero__reveal" style={{ "--d": 4 }}>
              <a href="#projects" className="btn btn--primary">
                View My Projects
                <ArrowRight size={17} aria-hidden="true" />
              </a>
              <ResumeButton mode="download" />
              <span className="hero__socials">
                <a
                  className="icon-btn icon-btn--lg"
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub (opens in a new tab)"
                >
                  <FaGithub size={18} aria-hidden="true" />
                </a>
                <a
                  className="icon-btn icon-btn--lg"
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn (opens in a new tab)"
                >
                  <FaLinkedinIn size={18} aria-hidden="true" />
                </a>
              </span>
            </div>
          </div>

          <figure
            className="hero__code card hero__reveal"
            style={{ "--d": 3 }}
            aria-label="Profile summary written as a JavaScript object"
          >
            <div className="hero__code-bar">
              <span className="hero__code-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="hero__code-file">about.js</span>
            </div>
            <pre className="hero__code-body">
              <code>
                {codeLines.map((tokens, lineIndex) => (
                  <span className="hero__code-line" key={lineIndex}>
                    <span className="hero__code-ln" aria-hidden="true">
                      {lineIndex + 1}
                    </span>
                    {tokens.map((token, i) => (
                      <span key={i} className={`tok-${token.t}`}>
                        {token.v}
                      </span>
                    ))}
                  </span>
                ))}
              </code>
            </pre>
          </figure>
        </div>

        <dl className="hero__facts hero__reveal" style={{ "--d": 5 }}>
          {facts.map(({ label, value }) => (
            <div key={label} className="hero__fact">
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
