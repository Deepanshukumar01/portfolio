import { useEffect, useRef } from "react";
import { X, ExternalLink } from "lucide-react";

/** Full-size certificate viewer; shares the dialog shell styles with ProjectModal. */
export default function CertificateModal({ item, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (item && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [item]);

  // Clicking the backdrop (the dialog element itself, outside the panel) closes it.
  function handleClick(event) {
    if (event.target === dialogRef.current) dialogRef.current.close();
  }

  return (
    <dialog
      ref={dialogRef}
      className="project-modal cert-modal"
      aria-labelledby="cert-modal-title"
      onClose={onClose}
      onClick={handleClick}
    >
      {item && (
        <div className="project-modal__panel">
          <header className="project-modal__header">
            <div>
              <p className="project-modal__eyebrow">
                {item.organization}
                {item.platform && ` · via ${item.platform}`}
                {item.date && ` · ${item.date}`}
              </p>
              <h2 id="cert-modal-title" className="project-modal__title cert-modal__title">
                {item.title}
              </h2>
            </div>
            <button
              type="button"
              className="icon-btn project-modal__close"
              aria-label="Close certificate"
              onClick={() => dialogRef.current.close()}
            >
              <X size={20} aria-hidden="true" />
            </button>
          </header>

          <img
            className="cert-modal__image"
            src={item.certificate}
            alt={`Certificate for ${item.title}`}
            width="1606"
            height="1135"
            decoding="async"
          />

          <footer className="project-modal__footer">
            <a className="btn btn--secondary" href={item.certificate} target="_blank" rel="noopener noreferrer">
              Open full size
              <ExternalLink size={16} aria-hidden="true" />
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </footer>
        </div>
      )}
    </dialog>
  );
}
