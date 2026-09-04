import type { Metadata } from "next";
import Link from "next/link";
import { getSite } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { Prose } from "@/components/Section";
import { Arrow } from "@/components/Arrow";

export async function generateMetadata(): Promise<Metadata> {
  const { ferias } = await getSite();
  return { title: ferias.title, description: ferias.lead };
}

export default async function Page() {
  const { ferias } = await getSite();
  return (
    <>
      <section className="shell pb-16 pt-16 md:pb-20 md:pt-24">
        <Reveal>
          <p className="muted text-[0.8125rem] font-semibold uppercase tracking-[0.08em]">
            Férias
          </p>
          <h1 className="text-hero balance mt-4 max-w-[16ch]">{ferias.title}</h1>
          <p className="muted text-lead pretty mt-7 max-w-[50ch]">{ferias.lead}</p>
        </Reveal>
      </section>

      <section className="border-t rule surface-2 stack">
        <div className="shell">
          <Reveal>
            <Prose>
              {ferias.body.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </Prose>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-16">
              <h2 className="text-title">Documentos</h2>
              <ul className="mt-6 grid gap-px overflow-hidden rounded-[22px] border rule bg-[var(--rule)] sm:grid-cols-2">
                {ferias.docs.map((d) => (
                  <li key={d.href}>
                    <a
                      href={d.href}
                      className="flex h-full min-h-[76px] items-center gap-4 p-6 transition-colors surface hover:bg-[var(--shell-2)]"
                    >
                      <svg
                        width="20" height="20" viewBox="0 0 20 20"
                        fill="none" aria-hidden="true" className="muted shrink-0"
                      >
                        <path
                          d="M11.5 2H5.5A1.5 1.5 0 0 0 4 3.5v13A1.5 1.5 0 0 0 5.5 18h9a1.5 1.5 0 0 0 1.5-1.5V6.5L11.5 2Z"
                          stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"
                        />
                        <path d="M11.5 2v4.5H16" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                      </svg>
                      <span className="flex-1 font-medium">{d.label}</span>
                      <span className="muted text-[0.8125rem]">PDF</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="stack">
        <div className="shell">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-display balance">
                Precisa de um programa de férias?
              </h2>
              <p className="muted text-lead pretty mt-6">
                Elaboramos propostas para qualquer local do país.
              </p>
              <Link href="/contactos" className="btn btn-fill mt-9">
                Pedir uma proposta <Arrow />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
