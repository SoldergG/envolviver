"use client";

import { useSyncExternalStore } from "react";
import type { Theme } from "@/lib/theme";
import {
  getServerSnapshot, getSnapshot, setTheme, subscribe,
} from "@/lib/theme-store";

const OPTIONS: { id: Theme; label: string; icon: React.ReactNode }[] = [
  {
    id: "system",
    label: "Sistema",
    icon: (
      <path
        d="M2.5 3.5h11v7h-11zM6 13h4M8 10.5V13"
        fill="none" stroke="currentColor" strokeWidth="1.3"
        strokeLinecap="round" strokeLinejoin="round"
      />
    ),
  },
  {
    id: "light",
    label: "Claro",
    icon: (
      <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <circle cx="8" cy="8" r="3" />
        <path d="M8 1.5v1.4M8 13.1v1.4M14.5 8h-1.4M2.9 8H1.5M12.6 3.4l-1 1M4.4 11.6l-1 1M12.6 12.6l-1-1M4.4 4.4l-1-1" />
      </g>
    ),
  },
  {
    id: "dark",
    label: "Escuro",
    icon: (
      <path
        d="M13 9.4A5.6 5.6 0 1 1 6.6 3a4.6 4.6 0 0 0 6.4 6.4Z"
        fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"
      />
    ),
  },
];

/**
 * Três estados, como no macOS: seguir o sistema, forçar claro, forçar escuro.
 * Um interruptor de dois estados não deixaria voltar a seguir o sistema.
 */
export function ThemeToggle() {
  // No servidor devolve sempre "system", por isso a hidratação bate certo;
  // no cliente lê o localStorage e volta a pintar com a escolha real.
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div
      role="radiogroup"
      aria-label="Aspeto do site"
      className="inline-flex rounded-full border rule p-0.5"
    >
      {OPTIONS.map((o) => {
        const active = theme === o.id;
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setTheme(o.id)}
            title={o.label}
            className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-[0.8125rem] transition-colors"
            style={
              active
                ? { background: "var(--fg)", color: "var(--shell)" }
                : { color: "var(--fg-2)" }
            }
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              {o.icon}
            </svg>
            <span>{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}
