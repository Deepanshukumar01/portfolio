import { ArrowUpRight, ExternalLink, Target } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import LinkButton from "./LinkButton.jsx";

export default function ProjectCard({ project, onViewDetails }) {
  const { title, tagline, description, problem, image, imageAlt, tech, status, featured, links } = project;

  return (
    <article className={`project-card card ${featured ? "project-card--featured" : ""}`}>
      <div className="project-card__media">
        <img src={image} alt={imageAlt} loading="lazy" decoding="async" width="800" height="500" />
        <span className="project-card__status">{status}</span>
      </div>

      <div className="project-card__body">
        <p className="project-card__tagline">{tagline}</p>
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__desc">{description}</p>

        <div className="project-card__problem">
          <Target size={16} aria-hidden="true" />
          <p>
            <span className="project-card__problem-label">Problem solved: </span>
            {problem}
          </p>
        </div>

        <ul role="list" className="tag-list" aria-label={`${title} tech stack`}>
          {tech.map((item) => (
            <li key={item} className="tag">
              {item}
            </li>
          ))}
        </ul>

        <div className="project-card__actions">
          <button type="button" className="btn btn--primary btn--sm" onClick={() => onViewDetails(project)}>
            View Details
            <ArrowUpRight size={16} aria-hidden="true" />
            <span className="visually-hidden"> about {title}</span>
          </button>
          <LinkButton href={links.github} icon={FaGithub} unavailableLabel="Repository link coming soon">
            GitHub
          </LinkButton>
          <LinkButton href={links.live} icon={ExternalLink} unavailableLabel="Live demo coming soon">
            Live Demo
          </LinkButton>
        </div>
      </div>
    </article>
  );
}
