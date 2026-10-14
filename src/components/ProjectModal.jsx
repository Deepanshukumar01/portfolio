import { useEffect, useRef } from "react";
import { X, FileText, AlertCircle, Lightbulb, ListChecks, Layers, User, Mountain, Rocket, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import LinkButton from "./LinkButton.jsx";

function DetailBlock({ icon: Icon, title, children }) {
  return (
    <section className="modal-block">
      <h3 className="modal-block__title">
        <Icon size={16} aria-hidden="true" />
        {title}
      </h3>
      {children}
    </section>
  );
}

function BulletList({ items }) {
  return (
    <ul className="modal-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (project && !dialog.open) {
      dialog.showModal();
      dialog.scrollTop = 0;
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  // Clicking the backdrop (the dialog element itself, outside the panel) closes it.
  function handleClick(event) {
    if (event.target === dialogRef.current) dialogRef.current.close();
  }

  const details = project?.details;

  return (
    <dialog
      ref={dialogRef}
      className="project-modal"
      aria-labelledby="project-modal-title"
      onClose={onClose}
      onClick={handleClick}
    >
      {project && (
        <div className="project-modal__panel">
          <header className="project-modal__header">
            <div>
              <p className="project-modal__eyebrow">
                <span className="label">{project.status}</span>
                {project.tagline}
              </p>
              <h2 id="project-modal-title" className="project-modal__title">
                {project.title}
              </h2>
            </div>
            <button
              type="button"
              className="icon-btn project-modal__close"
              aria-label="Close project details"
              onClick={() => dialogRef.current.close()}
            >
              <X size={20} aria-hidden="true" />
            </button>
          </header>

          <img
            className="project-modal__image"
            src={project.image}
            alt={project.imageAlt}
            width="800"
            height="500"
            decoding="async"
          />

          <div className="project-modal__content">
            <DetailBlock icon={FileText} title="Project Overview">
              <p>{details.overview}</p>
            </DetailBlock>

            <div className="project-modal__split">
              <DetailBlock icon={AlertCircle} title="Problem">
                <p>{details.problem}</p>
              </DetailBlock>
              <DetailBlock icon={Lightbulb} title="Solution">
                <p>{details.solution}</p>
              </DetailBlock>
            </div>

            <DetailBlock icon={ListChecks} title="Features">
              <BulletList items={details.features} />
            </DetailBlock>

            <DetailBlock icon={Layers} title="Technologies Used">
              <ul role="list" className="tag-list">
                {project.tech.map((item) => (
                  <li key={item} className="tag">
                    {item}
                  </li>
                ))}
              </ul>
            </DetailBlock>

            <DetailBlock icon={User} title="My Contribution">
              <p>{details.contribution}</p>
            </DetailBlock>

            <div className="project-modal__split">
              <DetailBlock icon={Mountain} title="Challenges">
                <BulletList items={details.challenges} />
              </DetailBlock>
              <DetailBlock icon={Rocket} title="Future Improvements">
                <BulletList items={details.future} />
              </DetailBlock>
            </div>
          </div>

          <footer className="project-modal__footer">
            <LinkButton
              href={project.links.github}
              icon={FaGithub}
              unavailableLabel="Repository link coming soon"
              className="btn btn--secondary"
            >
              View Code
            </LinkButton>
            <LinkButton
              href={project.links.live}
              icon={ExternalLink}
              unavailableLabel="Live demo coming soon"
              className="btn btn--primary"
            >
              Live Demo
            </LinkButton>
          </footer>
        </div>
      )}
    </dialog>
  );
}
