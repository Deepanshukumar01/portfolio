import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "theme";
const META_COLORS = { dark: "#090c14", light: "#f5f7fb" };
const systemQuery = "(prefers-color-scheme: light)";

function readStoredTheme() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", META_COLORS[theme]);
}

/**
 * Current theme plus a toggle. The initial value is set before first paint by the
 * inline script in index.html; this hook keeps it in sync and follows the OS
 * setting until the visitor picks a theme themselves.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "dark");

  useEffect(() => {
    const media = window.matchMedia(systemQuery);
    const onChange = (event) => {
      if (readStoredTheme()) return;
      const next = event.matches ? "light" : "dark";
      applyTheme(next);
      setTheme(next);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  // `origin` is the {x, y} point the reveal circle grows from (the toggle button).
  const toggleTheme = useCallback(
    (origin) => {
      const next = theme === "dark" ? "light" : "dark";
      const commit = () => {
        applyTheme(next);
        setTheme(next);
      };

      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Storage blocked — the theme still switches for this visit.
      }

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!document.startViewTransition || reduceMotion || !origin) {
        commit();
        return;
      }

      const { x, y } = origin;
      const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      const transition = document.startViewTransition(commit);
      transition.ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 550, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" }
        );
      });
    },
    [theme]
  );

  return { theme, toggleTheme };
}
