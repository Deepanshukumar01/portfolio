import { useEffect, useState } from "react";

let availabilityCheck;

/**
 * Checks once whether the resume PDF actually exists.
 * Dev servers and SPA hosts may answer missing files with index.html (200),
 * so the content type is checked too.
 */
function checkResume(url) {
  availabilityCheck ??= fetch(url, { method: "HEAD" })
    .then((res) => res.ok && (res.headers.get("content-type") ?? "").includes("pdf"))
    .catch(() => false);
  return availabilityCheck;
}

/** Returns true / false once known, or null while checking. */
export function useResumeAvailable(url) {
  const [available, setAvailable] = useState(null);

  useEffect(() => {
    let active = true;
    checkResume(url).then((result) => active && setAvailable(result));
    return () => {
      active = false;
    };
  }, [url]);

  return available;
}
