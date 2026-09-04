"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, external } from "@/lib/content";
import { Wordmark } from "./Logo";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Trava o scroll do body enquanto o menu está aberto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape fecha o menu
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <div className="material-bar border-b rule backdrop-blur-xl backdrop-saturate-150">
        <nav
          aria-label="Navegação principal"
          className="shell flex h-14 items-center justify-between gap-4"
        >
          <Link
            href="/"
            className="-ml-1 rounded-lg px-1 py-1"
            aria-label="Envolviver — página inicial"
          >
            <Wordmark size={24} />
          </Link>

          {/* Desktop */}
          <ul className="hidden items-center lg:flex">
            {nav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="inline-flex h-11 items-center whitespace-nowrap rounded-lg px-2.5 text-[0.875rem] transition-opacity hover:opacity-60"
                    style={{ opacity: active ? 1 : 0.72 }}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center lg:flex">
            <a
              href={external.areaEncEducacao}
              className="inline-flex h-11 items-center whitespace-nowrap rounded-lg px-2.5 text-[0.875rem] opacity-72 transition-opacity hover:opacity-100"
            >
              Área reservada
            </a>
          </div>

          {/* Botão do menu — alvo de 44px (HIG) */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movel"
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-lg lg:hidden"
          >
            <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <path
                d={open ? "M4 4 16 16 M16 4 4 16" : "M2.5 6.5h15 M2.5 13.5h15"}
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </nav>
      </div>

      <div className="brand-rule" aria-hidden="true" />

      {/* Menu móvel */}
      {open && (
        <div
          id="menu-movel"
          className="material-bar fixed inset-x-0 bottom-0 top-[calc(3.5rem+3px)] overflow-y-auto backdrop-blur-xl backdrop-saturate-150 lg:hidden"
        >
          <ul className="shell flex flex-col py-4">
            {nav.map((item) => (
              <li key={item.href} className="border-b rule">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[56px] items-center text-[1.375rem] font-medium tracking-[-0.02em]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-6">
              <a
                href={external.areaEncEducacao}
                onClick={() => setOpen(false)}
                className="btn btn-ghost w-full"
              >
                Área reservada
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
