import { Download, FileText } from "lucide-react";
import { profile } from "../data/profile.js";
import { useResumeAvailable } from "../hooks/useResumeAvailable.js";
import { showToast } from "../toast.js";

const MISSING_MESSAGE = import.meta.env.DEV
  ? "Resume not found — add your PDF at public/resume.pdf."
  : "My resume is being updated. Please reach out by email for the latest copy.";

/** Opens (`mode="view"`) or downloads (`mode="download"`) the resume PDF. */
export default function ResumeButton({ mode = "view", className = "btn btn--secondary", children }) {
  const available = useResumeAvailable(profile.resumeUrl);
  const isDownload = mode === "download";
  const Icon = isDownload ? Download : FileText;

  function handleClick(event) {
    if (available === false) {
      event.preventDefault();
      showToast(MISSING_MESSAGE);
    }
  }

  return (
    <a
      className={className}
      href={profile.resumeUrl}
      onClick={handleClick}
      {...(isDownload
        ? { download: `${profile.name.replace(/\s+/g, "-")}-Resume.pdf` }
        : { target: "_blank", rel: "noopener noreferrer" })}
    >
      <Icon size={17} aria-hidden="true" />
      {children ?? (isDownload ? "Download Resume" : "View Resume")}
    </a>
  );
}
