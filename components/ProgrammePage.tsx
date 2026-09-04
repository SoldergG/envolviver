import Link from "next/link";
import type { Activity } from "@/lib/content";
import { Reveal } from "./Reveal";
import { ActivityCard } from "./ActivityCard";
import { Prose } from "./Section";
import { Arrow } from "./Arrow";

export function ProgrammePage({
  eyebrow,
  title,
  lead,
  body,
  activities,
  base,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  body: string[];
  activities: Activity[];
  base: string;
}) {
  return (
    <>
      <section className="shell pb-16 pt-16 md:pb-20 md:pt-24">
        <Reveal>
          <p className="muted text-[0.8125rem] font-semibold uppercase tracking-[0.08em]">
            {eyebrow}
          </p>
          <h1 className="text-hero balance mt-4 max-w-[18ch]">{title}</h1>
          <p className="muted text-lead pretty mt-7 max-w-[52ch]">{lead}</p>
        </Reveal>
      </section>

      <section className="border-t rule surface-2 stack">
        <div className="shell">
          <Reveal>
            <Prose>
              {body.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </Prose>
          </Reveal>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 80}>
                <ActivityCard activity={a} base={base} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="stack">
        <div className="shell">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-display balance">
                Quer este programa na sua escola?
              </h2>
              <p className="muted text-lead pretty mt-6">
                Elaboramos propostas adaptadas à realidade de cada escola e
                jardim de infância, em qualquer ponto do país.
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
