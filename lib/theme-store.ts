"use client";

import { DEFAULT_THEME, THEME_KEY, type Theme } from "./theme";

/**
 * Store mínimo para o tema. Existe porque ler o localStorage num
 * useEffect e chamar setState dispara renders em cascata — o
 * useSyncExternalStore é o primitivo próprio para isto, e ainda dá
 * sincronização entre separadores de borla (evento `storage`).
 */

const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

export function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function getSnapshot(): Theme {
  try {
    const v = localStorage.getItem(THEME_KEY);
    if (v === "light" || v === "dark" || v === "system") return v;
  } catch {
    /* localStorage bloqueado — fica no tema de origem */
  }
  return DEFAULT_THEME;
}

/** No servidor não há escolha guardada: vale o tema de origem. */
export function getServerSnapshot(): Theme {
  return DEFAULT_THEME;
}

export function setTheme(next: Theme) {
  document.documentElement.setAttribute("data-theme", next);

  const dark =
    next === "dark" ||
    (next === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", dark ? "#000000" : "#ffffff");

  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {
    /* sem persistência, mas a escolha vale para esta sessão */
  }
  emit();
}
