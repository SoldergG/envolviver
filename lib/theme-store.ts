"use client";

import { THEME_KEY, type Theme } from "./theme";

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
    return v === "light" || v === "dark" ? v : "system";
  } catch {
    return "system";
  }
}

/** No servidor não há escolha guardada: assume-se o sistema. */
export function getServerSnapshot(): Theme {
  return "system";
}

export function setTheme(next: Theme) {
  const root = document.documentElement;
  if (next === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", next);

  try {
    if (next === "system") localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, next);
  } catch {
    /* sem persistência, mas a escolha vale para esta sessão */
  }
  emit();
}
