import Image from "next/image";
import Link from "next/link";
import type { Activity } from "@/lib/content";
import { accentVars } from "@/lib/color";
import { Reveal } from "./Reveal";
import { Arrow } from "./Arrow";

export function ActivityDetail({
  activity,
  programme,
  programmeHref,
  siblings,
}: {
  activity: Activity;
  programme: string;
  programmeHref: string;
  siblings: Activity[];
}) {
  const objectives = activity.bullets ?? [];
  const paragraphs = activity.paragraphs ?? [];

  return (
    <>
      <section className="shell pb-14 pt-10 md:pt-14">
        <Reveal>
          <nav aria-label="Trilho" className="muted text-[0.8125rem]">
            <Link href={programmeHref} className="transition-colors hover:text-[var(--fg)]">
              {programme}
            </Link>
            <span aria-hidden="true"> / </span>
            <span>{activity.name}</span>
          </nav>

          <div className="mt-8 flex items-center gap-3">
            <span
              className="accent h-2.5 w-2.5 rounded-full"
              style={accentVars(activity.color)}
              aria-hidden="true"
            />
            <p className="muted text-[0.9375rem] font-medium">{programme}</p>
          </div>

          <h1 className="text-hero balance mt-4 max-w-[16ch]">{activity.name}</h1>
          <p className="muted text-lead pretty mt-6 max-w-[48ch]">
            {activity.summary}
          </p>
        </Reveal>
      </section>

      <section className="shell">
        <Reveal delay={100}>
          {/* Foto de origem com 290×208 — apresentada com largura
              contida para não perder nitidez. */}
          <div className="relative mx-auto aspect-[290/208] w-full max-w-[580px] overflow-hidden rounded-[24px] surface-2">
            <Image
              src={activity.photo}
              alt={`Atividade de ${activity.name}`}
              fill
              priority
              sizes="(max-width: 640px) 92vw, 580px"
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>

      <section className="stack">
        <div className="shell">
          {paragraphs.length > 0 && (
            <Reveal>
              <div className="text-lead pretty mx-auto max-w-[64ch] space-y-6">
                {paragraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            </Reveal>
          )}

          {objectives.length > 0 && (
            <Reveal>
              <div className="mx-auto max-w-[64ch]">
                <h2 className="text-title">Objetivos</h2>
                <ul className="mt-8 space-y-6">
                  {objectives.map((o) => (
                    <li key={o.slice(0, 40)} className="flex gap-4">
                      <span
                        className="accent mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full"
                        style={accentVars(activity.color)}
                        aria-hidden="true"
                      />
                      <span className="pretty text-[1.0625rem] leading-relaxed">
                        {o}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {siblings.length > 0 && (
        <section className="border-t rule surface-2 stack">
          <div className="shell">
            <h2 className="text-title">Outras atividades</h2>
            <ul className="mt-8 grid gap-px overflow-hidden rounded-[22px] border rule bg-[var(--rule)] sm:grid-cols-2">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`${programmeHref}/${s.slug}`}
                    className="flex h-full items-center gap-4 p-6 transition-colors surface hover:bg-[var(--shell-2)]"
                  >
                    <span
                      className="accent h-2.5 w-2.5 shrink-0 rounded-full"
                      style={accentVars(s.color)}
                      aria-hidden="true"
                    />
                    <span className="flex-1 font-medium">{s.name}</span>
                    <Arrow className="muted" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
