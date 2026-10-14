/**
 * External link styled as a button. When `href` is empty it renders a
 * disabled placeholder so unfinished links never point nowhere.
 */
export default function LinkButton({ href, icon: Icon, children, unavailableLabel, className = "btn btn--secondary btn--sm" }) {
  if (!href) {
    return (
      <span className={className} aria-disabled="true" title={unavailableLabel}>
        {Icon && <Icon size={16} aria-hidden="true" />}
        {children}
        <span className="visually-hidden"> ({unavailableLabel})</span>
      </span>
    );
  }

  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {Icon && <Icon size={16} aria-hidden="true" />}
      {children}
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}
