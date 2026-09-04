import type { Metadata } from "next";
import Link from "next/link";
import { getSite } from "@/lib/site";
import { accentVars } from "@/lib/color";
import { Reveal } from "@/components/Reveal";
import { Arrow } from "@/components/Arrow";

export async function generateMetadata(): Promise<Metadata> {
  const { about } = await getSite();
  return { title: "A Envolviver", description: about.intro };
}

export default async function Page() {
  const { about, brand } = await getSite();
  return (
    <>
      <section className="shell pb-16 pt-16 md:pb-24 md:pt-24">
        <Reveal>
          <p className="muted text-[0.8125rem] font-semibold uppercase tracking-[0.08em]">
            A Envolviver
          </p>
          <h1 className="text-hero balance mt-4 max-w-[15ch]">
            Uma equipa que vive o tempo livre a sério.
          </h1>
          <p className="muted text-lead pretty mt-7 max-w-[52ch]">{about.intro}</p>
        </Reveal>
      </section>

      {/* Faixa arco-íris como elemento de marca, não como decoração */}
      <div className="shell">
        <Reveal>
          <div className="flex h-1.5 overflow-hidden rounded-full" aria-hidden="true">
            {brand.rainbow.map((hex) => (
              <span key={hex} className="flex-1" style={{ background: hex }} />
            ))}
          </div>
        </Reveal>
      </div>

      {about.sections.map((s, i) => (
        <section
          key={s.slug}
          id={s.slug}
          className={i % 2 === 1 ? "surface-2 border-y rule stack" : "stack"}
        >
          <div className="shell">
            <div className="grid gap-10 md:grid-cols-[minmax(0,20ch)_1fr] md:gap-16">
              <Reveal>
                <h2 className="text-title md:sticky md:top-28">{s.title}</h2>
              </Reveal>
              <Reveal delay={80}>
                <div className="text-lead pretty max-w-[62ch] space-y-6">
                  {s.body.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                  {s.list && (
                    <ul className="space-y-5 pt-2">
                      {s.list.map((item, k) => (
                        <li key={item.slice(0, 30)} className="flex gap-4">
                          <span
                            className="accent mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full"
                            style={accentVars(brand.rainbow[k % 9])}
                            aria-hidden="true"
                          />
                          <span className="text-[1.0625rem] leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <section className="stack">
        <div className="shell">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-display balance">
                Vamos falar sobre a sua escola?
              </h2>
              <Link href="/contactos" className="btn btn-fill mt-8">
                Contactar <Arrow />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
