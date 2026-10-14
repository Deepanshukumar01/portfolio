export const TOAST_EVENT = "portfolio:toast";

/** Show a short, non-blocking message (rendered by <Toaster />). */
export function showToast(message) {
  window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: message }));
}
